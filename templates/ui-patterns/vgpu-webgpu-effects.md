---
name: vgpu-webgpu-effects
category: design
description: >-
  [design] vgpu — vercel-labs 的 WebGPU 渲染库（typed WGSL 导入、单 Gpu 上下文、
  25KB gz 预算、browser / node / mock 三运行时）。Use when building 自定义
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

vgpu 只在**自定义特效**时上场：上述资产覆盖不到的 fullscreen shader、生成式背景、GPU 粒子、math viz。选它的机制理由：typed WGSL 导入（`.wgsl` 当 TS 模块 import/export，反射自动保住 binding 名与布局）+ 未用声明剪枝（完整 fullscreen effect 25KB gzipped，CI 强制预算）——比拖整个 three.js 或手写裸 WebGPU 便宜得多。

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
- 25KB gz 预算是硬约束：新特效先估包体，别把 three.js 混进来。

## 反模式

- orb / Paper / ThreeUI 已有现成效果却用 vgpu 重写一遍（先查 pack 主路由）
- 后台表格页 / 数据密集界面挂 GPU 大气
- 同一视图叠两套动态大气
- 不做 WebGPU 能力检测就上线
- 把整个 vgpu 库 vendor 进 pack（npm 按项目装即可）
- 装成独立 user skill（家在本 pack，同 Paper Shaders 规矩）
