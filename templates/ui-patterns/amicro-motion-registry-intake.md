---
name: amicro-motion-registry-intake
description: >-
  A selective-intake guide for Amicro's MIT React motion registry. Use when a
  React/shadcn project has a named state-transition gap and wants one owned
  source component; reject decorative loaders, cursor tricks, and whole-library
  installation by default.
---

# Amicro motion registry intake

类型：source registry selection guide（不 mirror 全库）  
上游：[amicro.vercel.app](https://amicro.vercel.app/) · [Subhan-code/Amicro--Micro-transitions-](https://github.com/Subhan-code/Amicro--Micro-transitions-) · MIT  
核验版本：`86b55340bfb939b8e93bb53aa46ba017c3449f1c`（2026-08-30）；npm `@subhanhq/amicro` 1.0.1。

## 先纠正来源

`amicro.vercel.app` 不是无元信息 demo。它是 Syed Subhan 的 React micro-interaction / transition library，仓库有 MIT LICENSE、npm 包与 shadcn registry。核验快照的 registry 有 162 items，含入口 transition、hover/cursor、scroll、hooks/presets 以及大量 loading primitives。

## 决策

**把它当按件抄源码的目录，不当全局 motion system。** 项目已有 `motion`、tokens 与 reduced-motion 合同时，只选一个能填真实状态缺口的 component / hook，把源码收归项目所有并重写成项目 token；不要 `npm install` 全包来换一颗 spinner。

## 三档筛选

### A · 可优先审计

- `use-reduced-motion`：监听 media-query change 的最小 hook；若项目已有同源能力则不重复。
- `fade-in` / `fade-up`：只用于一次性的新增结果或 route entrance；把默认 600ms / 20px 收到项目时长与位移。
- `skeleton` / `fluid-skeleton`：布局已知且加载超过 delay-show 门槛时考虑。
- `progress-indicator`：只有真实、可计算的长页或任务进度才用。

### B · 只在语义吻合时

- `text-dots` / `typing-indicator`：只表示“对方正在回应”，旁边必须有人话状态；完成立即卸载。
- `shimmer-line`、`line-spinner`、`morph-loader`：只选一个作为局部未知进度，不在同屏轮换皮肤。
- `text-reveal`：只用于新到达内容一次；历史内容恢复时不得重播。
- Web haptics：仅触屏、明确用户手势与可关闭偏好；桌面视觉润色不用。

### C · product UI 默认拒绝

`card-hover`、`tilt-card`、`magnetic-button`、`glow-button`、cursor trail / spotlight / mouse-follow、全页 scroll reveal、glassmorphic loader，以及 bounce / elastic / endless morph 的 loader 大军。它们大多是 showcase，不是状态合同。

## 接入流程

1. 先写 gap：哪个真实状态不清楚，现有 CSS / shadcn / Motion 为什么表达不了。
2. 在官网看 live behavior，再读对应 `registry/ui/**.tsx` 和 JSON dependency。
3. 用 shadcn registry URL 或手动取**单件**源码；保留 MIT notice 与固定 commit。
4. 统一 import：上游 package 使用 `motion`，但 registry 快照多处声明/源码使用 `framer-motion`；消费项目必须选自己现有的一条，不能因此装两份 Motion runtime。
5. 删除 zinc / white 等 demo 色、固定宽度和营销文案；改用项目 tokens、aria 与状态文案。
6. 补 `prefers-reduced-motion`、卸载清理、hidden/offscreen pause，以及 fast completion 的 delay-show（约 150ms）/ minimum-visible（约 300ms）。
7. 验证真实 default / loading / success / error，不只开 gallery 看循环动画。

## 边界

- 一项真实缺口最多引一件 Amicro primitive；不得“既然有 100 多个就多挑几个”。
- 不允许动画冒充后端进度；unknown progress 就诚实显示 unknown。
- focus ring 立即出现，不能套 fade。
- loading 动画不能成为唯一状态通道，必须有可读 label / `aria-live`。
- reduced-motion 是静态可读状态，不是把元素隐藏。

## 验收

- [ ] 组件源码已归项目所有，未引第二套 token / reset / Motion runtime。
- [ ] 首次渲染、恢复历史、快速完成、失败、卸载五条路径都跑过。
- [ ] 没有 `transition-all`、hover-only 关键含义或无限动画泄漏。
- [ ] 320px、键盘、reduced-motion 下信息等价。
