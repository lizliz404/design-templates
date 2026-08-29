---
name: thinking-orb
category: design
description: >-
  [design] One decorative thinking/status orb per view: Rare UI FluidOrb
  (WebGL1) or LerSent Liquid Orb (WebGPU). Use when a landing, agent voice
  affordance, or brand hero needs a single ambient sphere. Lives in
  design-templates — do not vendor upstream source or install a second orb kit.
---

# Thinking orb

家在 `templates/ui-patterns/thinking-orb/`。

**软路由：** 若任务是「复刻某站到可测量保真」而不是「只要一颗球」，先加载 sibling pipeline  
[landing-page-replication-v5](https://github.com/lizliz404/agent-skills/tree/main/skills/landing-page-replication-v5)  
（本地：`D:\dev\repos\agent-skills\skills\landing-page-replication-v5`）。全图见 [`../../sibling-routes.md`](../../sibling-routes.md)。

纸纹 / mesh 大气走 [`../../paper-shaders/SKILL.md`](../../paper-shaders/SKILL.md)，不要用 orb 顶替。

## 先选哪一套

每个视图最多 **一个** live orb。禁止同屏叠 Paper live shader、第二个 orb、或 ThreeUI hero。

| 场合 | 用什么 | 取件 | 别干什么 |
|---|---|---|---|
| React/Tailwind 页上的小状态/品牌球 | **FluidOrb**（WebGL1） | `npx shadcn@latest add swamimalode07/rare-ui/fluid-orb` | 当 ChatGPT voice 替身；后台表格旁一排球 |
| 旗舰 hero 玻璃折射 / 外发光 | **Liquid Orb**（WebGPU） | 已抓着色器：[`upstream/lersent-orb/`](./upstream/lersent-orb/)；参数在 [live editor](https://lersent001.github.io/orb/) 调完再 `createWebExport()` | 登录、密集后台、必须兼容旧浏览器的面 |

没有 WebGL / WebGPU → 静态 CSS radial / 同构图 poster，不许留透明空洞。

## 1. FluidOrb（低门槛）

上游：[Rare UI Fluid Orb](https://www.rareui.com/components/fluidorb) · 源码在 [swamimalode07/rare-ui](https://github.com/swamimalode07/rare-ui)（**2026-08-26 无 repo-level `LICENSE`**；站点写个人/商用可改，不得当 kit 转售）。**不要把该 tsx 再发布进本 pack。**

1. 只在消费项目跑上面的 shadcn 命令；审查写入的那一个文件和 `cn`/Tailwind 依赖。
2. 只调 `size`（建议 96–360）和 `color`（一个品牌强调色）。保留上游 `min(devicePixelRatio, 2)`。
3. 放在语义内容旁的装饰层：`aria-hidden="true"`、`pointer-events: none`，不盖按钮/表单。
4. 上游已在 `prefers-reduced-motion: reduce` 时固定 `u_time=0` 并停 rAF；接入时不得重新开动画。
5. Canvas 失败 → 静态 radial-gradient fallback。

## 2. Liquid Orb（WebGPU opt-in）

上游：[LerSent001/orb](https://github.com/LerSent001/orb)（**MIT**）。pack 已收入着色器，**没有**收入 React editor：

- Web：[`upstream/lersent-orb/effect.wgsl`](./upstream/lersent-orb/effect.wgsl)
- 原生孪生：[`upstream/lersent-orb/effect.metal`](./upstream/lersent-orb/effect.metal)（从 WGSL 生成；这是 Metal 抓取，**不是** MetalForge）
- 许可证：[`upstream/lersent-orb/LICENSE`](./upstream/lersent-orb/LICENSE)

Editor 仍在 https://lersent001.github.io/orb/ 。网站运行时用 editor 的 `createWebExport()` 产出独立 HTML，不要把 Vite/`node_modules` 带进站。

1. 先查 `navigator.gpu`；缺失、`requestAdapter()` 失败或 device lost → 同构静态 poster。
2. Editor 里选定预设后只调 color / speed / shape / refraction / outer glow；把 URL hash 记进项目 evidence。
3. Canvas 在装饰容器，DPR 上限 2，`aria-hidden="true"`、`pointer-events: none`；文案和 CTA 必须是普通 DOM。
4. 上游 renderer **没处理** `prefers-reduced-motion`：reduce 时停 rAF，用 `time=0` 的同一帧 poster。
5. 复制导出代码时随交付保留 MIT notice。

**MetalForge**（https://metalforge.xyz/）是付费 SwiftUI / RN Skia 目录，不进 pack。需要原生液态球时用本目录的 `effect.metal`，不要去镜像 MetalForge 的 52 个效果。

## 验证

- 桌面 + 窄屏各一张；reduce-motion 必须静止且仍能认形。
- 点击主 CTA / 表单时 orb 不得吞指针。
- 同页只有一套动态：orb **或** Paper live shader，二选一。

## 反模式

- 第三个 orb、orb gallery、把 Rare UI / Liquid **editor** 整库 vendor 进 pack（着色器已经在 `upstream/lersent-orb/`）
- 把 MetalForge 目录当开源包
- 后台、登录、长列表、核心流程默认挂 orb
- 把 `tdimino/paper-design` 再装成 user skill
