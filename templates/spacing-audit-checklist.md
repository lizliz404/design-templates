---
name: spacing-audit-checklist
description: >-
  “大概率是间距问题”：用灰块审一遍布局，按 外层 > 区块 > 卡片 > 元素 的顺序排间距，大多数留白放大、紧密相关的成对元素反而收紧，并用 4/8 token 与 comfortable/compact 密度模式落地；另含"一把尺"检查——全站文字共用同一条左右内容边，组件私设页边距即违规。Use when 页面“说不上哪里不对”但字体颜色都没问题; 审 dashboard / 后台 / landing 的布局节奏; 页面各区块左右边缘参差不齐对不齐; 需要给 agent 一个可复制的间距审计 prompt。
---

# 大概率是间距问题（Spacing audit）

一行定位：界面“感觉不对”时先查间距，不先换字体和颜色。来源：[Michael Filipiuk 的视频帖](https://x.com/MichaelFilipiuk/status/2111383736243859714)（2026-10-17，约 2.3k 赞、1.9k 收藏）。

## 原作拆解：灰块 dashboard 前后对比

线框只有灰块：侧栏、页头、3 张指标卡、主图表、右侧列表，加一个 5 个滑杆的间距面板。

| 控件 | 前 | 后 | 方向 |
|---|---|---|---|
| 侧栏宽度 | 184 | 248 | 放大 |
| 页面外边距 | 20 | 40 | 放大 |
| 行 / 区块间距 | 20 | 48 | 放大 |
| 图表与右侧列表的列间距 | 20 | **12** | **收紧** |
| 卡片内边距 | 12 | 24 | 放大 |

原则：**大多数留白放大，但紧密相关的元素之间反而收紧**，用间距表达层级与亲疏（接近性原则）。所有值一样大（全是 20）就等于没有层级。

## 流程

1. **灰块化。** 截图后把文字换成灰条、图片换成灰块，去掉颜色（或直接在 DevTools 里 `* { color: transparent !important; background: #ddd }` 临时看）。灰块去掉字体和颜色的干扰，间距问题会一下子显形。
2. **量出现状。** 列出 5 个关键值：侧栏 / 主内容宽度、页面外边距、区块间距、相关元素之间的间距、卡片内边距。把它们写成表，和上面的样例对照。
3. **排层级。** 目标顺序：**外层外边距 ≥ 区块间距 > 卡片内边距 > 卡片之间 / 相关元素之间 > 元素内部间距**。任何两层相等或倒挂，都是需要修的地方。
4. **找“相关对”并收紧。** 图表 + 它的说明列表、标签 + 输入框、标题 + 它的正文、指标 + 它的趋势：成对出现的东西间距应当明显小于与旁边无关块的间距。
5. **其余放大。** 外边距、区块间距、卡片内边距通常可以 1.5–2.5 倍；一次放一层，看灰块图是否更“好读”。
6. **查比例。** 侧栏与内容区的比例（样例 248 : 余下宽度），在 1280 / 1440 / 1920 宽度下都看一遍；侧栏过窄会显得局促，过宽会挤压主内容。
7. **落 token。** 只用 4/8 刻度（4, 8, 12, 16, 24, 32, 40, 48, 64），把第 3 步的层级映射成语义 token：`space-page`、`space-section`、`space-card`、`space-related`、`space-inline`。
8. **做密度模式。** comfortable（默认）与 compact 两套映射同一组语义 token；数据密集的 dashboard 默认可选 compact，让用户自己切。
9. **回归。** 恢复真实字体颜色，再截图对比；桌面与窄屏各一张。

## 机制依据

- **Tokens, not opinions**（[@jamalavedra](https://x.com/jamalavedra)）：间距由 token 驱动，密度才能变成一个设置项（[@JonSchubbe](https://x.com/JonSchubbe)）。作者回复说**没有一个指定的刻度**；重点是有刻度并且一致，4/8 是最省心的起点，锁定刻度胜过逐个凭眼感调（[@ravixalgorithm](https://x.com/ravixalgorithm)）。
- **密度是真实需求**：dashboard 常常需要一屏装下（[@SergeiChyrkov](https://x.com/SergeiChyrkov)）。所以不是一味加留白，而是保持层级比例，同时提供 compact 模式。
- **灰块审计**：去掉字体和颜色后，间距问题变得一目了然（[@dilemma017](https://x.com/dilemma017)）。
- **用户感觉得到、却说不出来**：间距是用户能感到却叫不出名字的 bug，所以它永远不会出现在反馈里，只能主动审。
- 回复区的总结：间距之于设计，就像“永远是 DNS 的问题”之于运维。

## 边界

- 不靠放大所有间距解决问题；层级比绝对值重要。
- 密度切换只改间距 token，不改字号层级与点击区域（触控目标仍 ≥ 40–44px）。
- 不引入刻度外的魔法数字；确需例外时写进 token 并注明原因。
- 与 [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md) 一起用时，以本清单定节奏、以它定表格与筛选语法。

## 页框尺与"一把尺"（page frame / single text edge）

### 已试并撤回：四角 chrome 内收尺（Liz 2026-11-06 终审）

曾试验：官网 chrome（header/nav/footer/浮动丸）四角用一把对称内收尺（`--frame-inset ≈ 16vw`），四角全部收进 inset 框内，只管 chrome 不管正文。**终审撤回**：Liz 实测后令 header/footer 颜色布局整体回滚到远端版（"越改越丑"），只保留归组类文字改动。教训：

- 对存量站，chrome 几何（带宽、内收、四角落点）属于高辨识度的骨架特征——改动前先问"她要的到底是文字位置还是版式"，别把归组类反馈扩成全局尺规重构。
- 事后复盘（11-07）：失败的真正原因**不是"立了尺"，而是立了第二把尺**——`16vw` 与正文轨（maxw 容器 + gutter）是两个不同的边缘值，双尺比无尺更乱；外加顺手改了颜色/带宽，属范围蔓延。不是"尺规不能动"，是"不许出现与全站轨不同的局部边距值"。

### 定稿规则：一把尺（Liz 2026-11-07，对标实测定案）

好站"规整、被尺子量过"的感觉，来源不是百分比外边距，而是**全站文字性内容共用同一条左右内容边**：

- **数值形态 = max-width 容器 + 最小 gutter，不是 vw 百分比**。证据：Fugro 实测内容宽 1344px（1440 容器 − 2×48 gutter）；1920 屏边距 288px≈15%、2504 超宽屏 580px——边距随视口增大而增大，内容宽恒定。vw 边距在超宽屏会等比放大内容区、拉长行宽，且永远和容器边对不齐。**不要用 `vw` 当页边距值。**
- **规则四条**：
  1. 一切文字性内容（header / 各 section 正文 / footer / legal 行 / 摄影面 scrim 上的字 / 弹层内文字）左右缘不得越过这条线；
  2. 轨内允许更深的缩进（label rail、栅格列、为浮动件预留的 `max()` 兜底），**禁止出现与轨不同的第二套页边距**——任何组件私设 `vw` 或字面值 inset 即违规；
  3. 摄影面 / 色带 / 1px hairline / 背景可 bleed 至视口边，但**其上文字仍守轨**；
  4. 贴视口边的浮动 UI chrome（聊天丸、cookie consent、抽屉 dock）是登记的**唯一例外**——它是控件不是正文，但应写进合同而不是悄悄豁免。
- **落地形态**：一个 token（如 `--frame-pad: max(gutter, (100vw − maxw)/2 + gutter)`）被 header / wrap / footer / scrim 字全部消费；新增组件只消费该 token，不新造边距值。
- **审计步（新增）**：数尺子。在 1280 / 1440 / 1920（有超宽条件再加 2560）逐条量 header、各 section、footer、legal 行的左右文字边缘——每侧必须解析为**同一个值**（轨内缩进合法，多套外边距非法）。最常见的病灶就是"某个组件带了自己的 inset"，典型如 footer 单独 `16vw`、legal 行单独 `9vw`。

## 复制给 Agent 的间距审计 prompt

```text
Audit the spacing of <page/URL/screenshot>. Do not change fonts, colors or copy.
1. Grey-block pass: describe the layout as blocks (sidebar, header, cards, main, side list) and ignore type/color.
2. Measure and list in a table: sidebar width, page padding, section/row gap, gap between closely related
   elements (e.g. chart and its list, label and input), card inner padding, gaps between cards.
3. Check the hierarchy: page padding >= section gap > card padding > related-pair gap > inline gap.
   Flag every tie or inversion.
3b. Count the rulers: measure the left and right text edges of the header, every section, the footer
   and the legal bar at 1280 / 1440 / 1920. Each side must resolve to ONE value — deeper inner
   indents (label rails, grid columns) are legal, a second page-margin is not. Flag any component
   carrying its own inset (a footer-only vw padding is the classic offender).
4. Propose new values on a 4/8 scale (4, 8, 12, 16, 24, 32, 40, 48, 64): enlarge most whitespace,
   TIGHTEN gaps between closely related pairs. Check sidebar/content proportion at 1280, 1440 and 1920.
5. Map values to semantic tokens (space-page, space-section, space-card, space-related, space-inline)
   with a comfortable and a compact density.
6. Output: before/after table, the token diff, and the exact CSS/Tailwind changes. Then screenshot
   before and after (desktop + 390px) and say which change made the biggest difference.
```

## 验收

- before/after 表与 token diff 齐全；没有刻度外的值。
- 全页文字左右缘各自只解析为一个值（轨内缩进除外）；无任何组件私设 vw/字面页边距。
- 层级顺序成立，至少一处“相关对”被收紧。
- comfortable / compact 两套都截图，compact 下一屏能放下关键信息。
- 1280 / 1440 / 1920 与 390px 宽度都检查过侧栏比例与溢出。

## 实测案例：Vercel（2026-11-07，证据 `cases/vercel-rea/`）

playwright + getComputedStyle 实测 `vercel.com` / /pricing /docs × 1280/1440/1920/2560，对三条规则的对照如下。

**确认了什么**

- **一把尺 = maxw+gutter，且由单一容器类实现**。机制实锤：`--ds-page-width: 1400px`、`--geist-page-margin: 24px`，合成 `max-w: calc(1400px + 2×24px)`（1448px 触发点），header / 全部 section / footer / legal 行全部消费同一容器类。左缘实测 `max(24, (vw−1400)/2)`：1280→24、1440→24、1920→260、2560→580。与 Fugro（1344+48）同构，进一步坐实"不要用 vw 当页边距值"。
- **层级顺序在断点以上严格成立**（1920 marketing）：外层有效缘 260 ≥ 区块间距 208（`mt-52`）> 卡片 padding 32 > 相关对 8（H3→P）。相关对收紧实锤：标题↔正文固定 8px。
- **刻度系**：Geist token `--geist-space-Nx = N×4px`（8/16/32/64/96/128/192/256），间距普查主值 2/4/6/8/10/12/16/24，宏观值全在 4/8 刻度；组件用 Tailwind 任意值直接消费 CSS 变量（`px-(--geist-page-margin)`），不造字面边距——"tokens, not opinions"的完整落地形态。
- **密度同一刻度系**：docs 比 marketing 明显更紧（内容 pad 24/64、卡 24 vs 卡 32、区块 96–208），但所有值仍在同一 4px 基刻度上——密度差靠换档不靠换刻度。

**补充了什么**

- **容器断点以下，外层 gutter 会触底**。视口 <1448 时外层塌缩为 24px，与卡片 padding（24–32）持平甚至倒挂；`外层≥区块>卡片` 的层级只在容器生效区严格成立。审计时对"外层"应取 `max(gutter, auto-margin)` 的感知值，而非 padding 字面值。
- **宏观刻度下存在 1–2px 微层**：负 margin（-1/-60/-64）做 hairline 对齐、2px 图标补偿。审计放行：刻度纪律管正空间，hairline 补偿不计入刻度违规。

**反例 / 边界（待 Liz 裁决）**

- **"一把尺"实测是 per-surface 而非全站唯一**。docs 面 header 无 maxw、main 为 `grid-cols-[300px]` 全宽 fluid（文字 20px 贴视口），footer 仍挂 marketing 1400 轨——**同一 docs 页三条文字边并存**（header 24..满宽 / main 20..fluid / footer 居中 1400 轨）。可以理解为 app 型 surface 有第二把尺的正当性，但 footer 跨 surface 复用 marketing 轨造成页内双轨，属于 Vercel 自己也没收干净的例子。审计启示：先划分 surface（marketing / app / docs），尺按 surface 计；同一页内仍应收敛为一条。
- **探针陷阱**：DOM 含 `visibility:hidden` 的 nav 副本（有布局矩形，会把左缘拉到视口边）和 `.sr-only` 文本（把右缘拉出轨外）。数尺子前必须剔除 `visibility:hidden` / `sr-only` / `display:none` 节点，否则量到隐藏副本。审计 prompt 3b 执行时建议先过滤可见性再取 min/max。
