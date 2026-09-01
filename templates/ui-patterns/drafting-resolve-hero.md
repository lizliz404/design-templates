---
name: drafting-resolve-hero
category: design
description: >-
  [design] Attention-driven drafting resolve hero — three.js batched 线稿：
  虚线草图 = 未确认方案，hover/click 注意力 = 人工确认，实线成稿 = 可交付。
  Use when landing 的产品承诺本身是「先确认、后生成」类叙事（AI 建站、合同、
  审批流），需要一个把承诺画出来的 hero；不要当纯装饰氛围用。完整机制与
  三源考察在 webgl-threejs-background-animation skill 的 references。
---

# Drafting resolve hero — 虚线待确认 → 实线已确认

one动态线稿 hero，交互隐喻与产品承诺同构：页面加载是一张虚线草图
（未确认的设计方案），访客的 hover / click 注意力把线「确认」成实线
（可生成交付），无人交互时以 idle 底噪缓慢半解析，保证短停留也看得到回报。

出处谱系：shelfplan 蓝图（机制源头）→ lizliz.xyz Paper Ink Garden（plant-plate
精修）→ dieline-generator（time-driven 折叠变体，非注意力驱动）→
inquiry-foundry `FoundryDraftingCanvas`（V3 色板 + 面板级落位，2026-08-30）。

## 机制一句话

每类线一个 dashed + 一个 solid 材质；`progress`（0→0.7）由
hover 速率 + click boost + idle floor 三通道累积，`applyVisualState` 交叉淡化
dashed↔solid 并收窄 dash gap；全套常数收在 TUNING 单点。

## When / when not

- **用**：产品叙事里有「草稿 → 确认 → 成稿」弧线；hero 有一块无点击元素的
  空白区可安全捕获 pointer；色板能给出「确认色」（如 Foundry 的 #2b6bff 蓝）。
- **不用**：同一视图已有另一套动态大气（orb / mesh shader）；产品故事没有
  确认弧线（老实用纯视差线稿）；目标区放着主 CTA（pointer capture 会抢点击，
  改 window 级监听并砍掉 click 通道）。

## 落地纪律（细节见 skill reference）

- 照搬生命周期合同：low-power、pixelRatio ≤1.5、`depth:false`、IO +
  visibilitychange 门控、context-loss → dispose + 组件返回 null、完整
  dispose（含 `forceContextLoss`）、StrictMode `initedRef` 防重挂。
- idle floor 不可省；**注意算术陷阱**：原版增益（0.015/s + 0.06/次）在
  小面板上一次交互爆发（~+0.18）低于底噪 0.32，注意力白付——面板级落位把
  增益调 ~2x（0.028/s + 0.07/次），floor 不动。
- resolve 的「确认色」只在 solid 材质上出现：虚线态保持中性墨色，确认这一
  步才有颜色奖励；amber 之类第二强调色只允许焦点小点/角标。
- 实测参考（Foundry，Edge headless rAF 60 帧均值）：hero 10.1ms、滚出视口
  8.8ms（loop 已停）——不劣化于无此层的页面。

完整三源对比、progress 公式、V3 色板映射表与槽位决策记录：
`webgl-threejs-background-animation` skill →
`references/attention-driven-drafting-resolve.md`。
