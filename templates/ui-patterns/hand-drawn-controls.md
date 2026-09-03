---
name: hand-drawn-controls
description: >-
  Hand-drawn boiling sketch controls drawn as seeded SVG strokes layered
  under real controls (npm drawably, MIT). Use on playful landing, demo, or
  brand surfaces when the UI reads as too perfect; skip for dense B2B admin.
---

# Hand-drawn controls（drawably 蒸馏）

mount 时用 seeded RNG 现画一张「钢笔草图」SVG，笔画带 boiling 抖动；草图叠在真控件下面，键盘 / 表单 / 读屏照常工作——a11y 来自真控件，手感来自草图。上游：[npm drawably](https://www.npmjs.com/package/drawably)（MIT，v0.3.10，API 仍在动，锁版本再进项目）· [drawably.dev](https://drawably.dev/)。

## 流程

```text
1. 仅在消费项目：npm i drawably
2. 挑控件：vanilla 11 个 attach 函数（button / checkbox / radio / toggle / input / textarea / select / divider / card / badge / list）+ 4 个文字装饰（underline / highlight / circle / arrow），或 drawably/react 全套组件
3. 状态色走 CSS 变量 --drawably-error / --drawably-success；状态切换只换色，seed 不动，loading 时 boil 加速
4. 体积预算 ~10 KB gz + 31 KB 可选 pen 字体；zero deps
5. select 预留最宽 option 宽度防 layout shift；Chromium 走 appearance: base-select，其余保 OS 弹层
6. 验收：真控件可聚焦可操作（Tab + 读屏）；boiling 遵守 reduced-motion
```

## 机制（自研复刻时读）

- seeded RNG → sketchy SVG path；hover 重掷 seed，`sketch.resketch(42)` 复现指定 seed。
- boiling 走 CSS keyframes，非 canvas 逐帧、非 SVG filter displacement——渲染便宜、随时可停。
- React 版同构：sketch stays put, only state changes。
- `npm exports` 自带 `./agent.md`：面向 coding agent 的上游用法文档，接入项目先读它。

## 边界

- 适用面：playful / landing / demo / brand surface；dense B2B admin 换资产。
- boiling 算一套动态大气：同一视图最多一套，与 live shader / orb 互斥。
