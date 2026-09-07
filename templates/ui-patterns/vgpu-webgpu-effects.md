---
name: vgpu-webgpu-effects
category: design
description: >-
  [design] vgpu — vercel-labs 的 WebGPU 渲染库（typed WGSL 导入、单 Gpu 上下文、
  版本化 gzip 预算、browser / node / mock 三运行时）。Use when building 自定义
  fullscreen / GPU shader 特效（生成式背景、math viz、GPU 粒子）且 pack 内
  vendored 资产（orb / Paper / ThreeUI / theater）覆盖不到时。Lives inside the
  design-templates pack — 按项目 `pnpm add vgpu` 安装，不 vendor 进包。
---

# vgpu — 自研 WebGPU 特效的施工层

上游：[vercel-labs/vgpu](https://github.com/vercel-labs/vgpu)（MIT）· 文档与示例画廊：[vgpu.sh](https://vgpu.sh)（发布 `agents.md` 与 `llms.txt`，LLM 可直接消费）。

## 定位：先查 pack，再上手 vgpu

Pack 里已有 vendored 默认答案，**先走它们**：

| 需求 | 默认答案 |
|---|---|
| 单个环境状态球 | [ai-thinking-orb](../ai-thinking-orb/SKILL.md)（源码已收进包） |
| 纸感 / mesh 大气背景 | [Paper Shaders](../../paper-shaders/SKILL.md) |
| 现成 3D product hero | [ThreeUI hero adapter](./threeui-hero-adapter.md) |
| 静图转交互 WebGL theater | [still-to-webgl-theater](../../still-to-webgl-theater/SKILL.md) |

vgpu 只在**自定义特效**时上场：上述资产覆盖不到的 fullscreen shader、生成式背景、GPU 粒子、math viz。选它的机制理由：typed WGSL 导入（`.wgsl` 当 TS 模块 import/export，反射自动保住 binding 名与布局）+ 未用声明剪枝。包体由实际入口、shader 与消费项目构建决定，不能把上游某一 fixture 的预算当成所有特效的体积承诺。

## 安装与最小用法

```bash
pnpm add vgpu
pnpm add -D @webgpu/types
```

```ts
import { clock, init, effect, frameLoop, surface } from "vgpu";
import waveShader from "./wave.wgsl";

const gpu = await init();
const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] }); // dpr 钳在 1–2
const wave = effect(gpu, waveShader, { set: { speed: 2 } });
const time = clock(gpu);

frameLoop(gpu, (frame) => {
  wave.set({ time: time.time }); // 每帧只写变化的 uniform
  frame.pass(canvasSurface, wave);
});
```

要点：`init()` 返回唯一 `Gpu` 上下文，所有入口（`draw` / `effect` / `frame` / `surface` / `target`）第一参都是它，无隐藏全局态；pass / clear / draw 全是显式调用，没有隐式场景图。

可复用 WGSL 声明（hash / noise / color / sampling…）在 `@vgpu/wgsl-std`，不要每个项目重写噪声函数。

## 可直接取得的官方示例

[Triangle LED Hero](https://vgpu.sh/examples/triangle-led-front) 提供可复制的官方示例源码，examples API 可取得完整 **17 件** TypeScript / TSX / WGSL 文件，采用 MIT 许可。它包含 LED 发光源、近远距离衰减、地面与三角几何；需要品牌灯光时可先复用这些机制，再替换形状。

OrgBrain 已将这一版存于消费项目 `docs/design/reference/brand-light/`，包括 `triangle-led-front/`、MIT notice、不可变 artifact URL / SHA-256 清单及核验脚本。API revision 为 `69160a127bc8c2b54c5963763469d55909a349857129d91b3bc76c10839222a9`。产品适配保留自己的 SVG 几何单一来源；参考原件与实际运行代码分别记录，不将改写实现称为原件逐字复制。

**参考站与许可源码要分开。** 2026-09-07 对 `vercel.com` 首页部署包的检查发现 `canvas.getContext("webgl2")` 与 GLSL `#version 300 es`，这是 WebGL2 证据，不能证明该首页使用 vgpu。首页视觉可作参考；可按 MIT 复用的代码来源是上面的官方 vgpu 示例。检查证据与说明保存在 OrgBrain 同目录 README。

## 三个运行时

| 运行时 | 用途 |
|---|---|
| 浏览器（默认入口） | 产品页面 |
| `vgpu/node`（Dawn 后端） | headless 渲染、出静图 |
| `vgpu/mock`（确定性软件适配器） | 测试与 CI，不需要真 GPU |

Agent 自举：`npx vgpu docs` / `npx vgpu examples` / `npx vgpu check`（shader 校验）。

## 纪律

- **WebGPU-only，无自动兜底**。老浏览器没有 WebGPU；落地前确认目标浏览器面，需要全量兼容就回 three.js / WebGL 方案。
- 同一视图**最多一套动态大气**——orb / Paper / vgpu 互相都互斥，规矩不变。
- 动画不受 CSS `prefers-reduced-motion` 管，必须在 `frameLoop` 层杀（`reduced ? 停 : 跑`）。
- shader 层 `pointer-events: none` + `aria-hidden`，指针交互在 `window` 上监听后 lerp 进 uniform，不吞页面点击。
- 预算按锁定版本和实际构建核对。`vgpu@0.4.0` 的 `package.json` 中，`vgpuExportBundleBudgetsGzipBytes["."]` 是 **38,912 bytes**；`vgpuExperienceBundleBudgetsGzipBytes["effect-only"]` 是 **25,600 bytes**。后者只是特定测试 fixture，不是通用 25KB 保证。OrgBrain 的品牌光效异步入口实测约 **43KB gzip**，包含消费端集成；不能拿库入口预算代替产品测量。更新依赖后重新记录异步 chunk 和初始加载体积。

## 反模式

- orb / Paper / ThreeUI 已有现成效果却用 vgpu 重写一遍（先查 pack 主路由）
- 后台表格页 / 数据密集界面挂 GPU 大气
- 同一视图叠两套动态大气
- 不做 WebGPU 能力检测就上线
- 把整个 vgpu 库 vendor 进 pack（npm 按项目装即可）
- 装成独立 user skill（家在本 pack，同 Paper Shaders 规矩）
