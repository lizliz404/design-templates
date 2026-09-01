---
name: ai-thinking-orb
category: design
description: >-
  [design] AI thinking/status orb — one ambient sphere per view as an agent
  voice/status affordance: Rare UI FluidOrb (WebGL1, source vendored) or
  LerSent Liquid Orb (WebGPU, MIT shader vendored). Use when a landing, agent
  activity surface, or brand hero needs a single ambient sphere. Lives in
  design-templates — do not install a second orb kit or re-fetch upstream.
---

# AI thinking orb

家在 `templates/ui-patterns/ai-thinking-orb/`。**两套上游源码都已收入本包**，正常情况下不需要联网取货。

**软路由：** 若任务是「复刻某站到可测量保真」而不是「只要一颗球」，先加载 sibling pipeline
[landing-page-replication-v5](https://github.com/lizliz404/agent-skills/tree/main/skills/landing-page-replication-v5)。
全图见 [`../../sibling-routes.md`](../../sibling-routes.md)。

纸纹 / mesh 大气走 [`../../paper-shaders/SKILL.md`](../../paper-shaders/SKILL.md)，不要用 orb 顶替。

## 先选哪一套

每个视图最多 **一个** live orb。禁止同屏叠 Paper live shader、第二个 orb、或 ThreeUI hero。

| 场合 | 用什么 | 取件 | 别干什么 |
|---|---|---|---|
| React 页上的小状态/品牌球、**agent 工作中 affordance** | **FluidOrb**（WebGL1） | 已抓源码：[`upstream/rare-ui-fluid-orb/fluid-orb.tsx`](./upstream/rare-ui-fluid-orb/fluid-orb.tsx)（见其 PROVENANCE.md）；非 Tailwind 项目直接用现成移植 [`recipes/agent-orb-plain-react.tsx`](./recipes/agent-orb-plain-react.tsx) | 当 ChatGPT voice 替身；后台表格旁一排球 |
| 旗舰 hero 玻璃折射 / 外发光 | **Liquid Orb**（WebGPU opt-in） | 已抓着色器：[`upstream/lersent-orb/`](./upstream/lersent-orb/)；参数在 [live editor](https://lersent001.github.io/orb/) 调完再 `createWebExport()` | 登录、密集后台、必须兼容旧浏览器的面 |

没有 WebGL / WebGPU → 静态 CSS radial / 同构图 poster，不许留透明空洞。

## 1. FluidOrb（低门槛，WebGL1）

上游：[Rare UI Fluid Orb](https://www.rareui.com/components/fluidorb)，源码 repo
[swamimalode07/rare-ui](https://github.com/swamimalode07/rare-ui)（**2026-08 无 repo-level `LICENSE`**；站点写个人/商用可改，不得当 kit 转售）。**参考拷贝已收入本包**（`upstream/rare-ui-fluid-orb/`，带 PROVENANCE），保留署名、不再转售即可在消费项目内使用与修改。

**纠偏（2026-08-28 实测）：** `npx shadcn@latest add swamimalode07/rare-ui/fluid-orb` 在非 shadcn/Tailwind 项目（甚至 scratch 目录）会因 `FileSystem.access` 校验直接失败。可靠路线二选一：
1. 直接读本包已收的上游文件（推荐，零网络依赖）；
2. 从 `raw.githubusercontent.com/swamimalode07/rare-ui/main/components/ui/fluid-orb.tsx` 拉（仅当本包不可用时）。

两条路线：
- **Tailwind/shadcn 项目**：拷 `upstream/rare-ui-fluid-orb/fluid-orb.tsx` 进项目，只调 `size`（建议 96–360）和 `color`（一个品牌强调色）。保留上游 `min(devicePixelRatio, 2)`。
- **普通 React 项目（无 Tailwind）**：直接用 [`recipes/agent-orb-plain-react.tsx`](./recipes/agent-orb-plain-react.tsx) —— 依赖-free 手工移植，已上生产。亮点：CSS token 取色（1px canvas probe，支持 `oklch()`）、`webglcontextlost`/编译失败 → 静态 radial 兜底、reduced-motion 挂载时与**运行中监听**双保险、卸载全量清理。移植细节见 [`recipes/README.md`](./recipes/README.md)。

摆放规则：装饰层 `aria-hidden="true"`、`pointer-events: none`，不盖按钮/表单；`prefers-reduced-motion: reduce` 时 `u_time=0` 静止且不得重新开动画；canvas 失败 → 静态 radial-gradient fallback。

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

## 实战记录（integration evidence）

**inquiry-foundry builder（2026-08-28，生产）：** Codex 生成任务运行中，在 SSE 工具活动流头部放**一颗** FluidOrb 移植版（`recipes/agent-orb-plain-react.tsx`）作为 agent-voice affordance——这是「agent 工作中」的合法用例；管理表格、landing、登录面均未放（遵守反模式）。全部规则通过：每视图一颗、不吞指针、reduced-motion 冻结、失败兜底、DPR≤2、token 取色。

## 验证

- 桌面 + 窄屏各一张；reduce-motion 必须静止且仍能认形（含**运行中切换** reduce 设置的场景）。
- 点击主 CTA / 表单时 orb 不得吞指针。
- 同页只有一套动态：orb **或** Paper live shader，二选一。
- 断网/禁 WebGL 打开：静态 fallback 出现，无透明空洞。

## 反模式

- 第三个 orb、orb gallery、把 Rare UI / Liquid **editor** 整库 vendor 进 pack（两个上游的该收部分已在本包 `upstream/`）
- 把 MetalForge 目录当开源包
- 后台、登录、长列表、核心流程默认挂 orb（例外：agent 活动/语音 affordance 处的**一颗**状态球）
- 把 `tdimino/paper-design` 再装成 user skill
- 丢失 Rare UI 拷贝的 PROVENANCE 署名，或把上游 tsx 当作可再授权代码转售
