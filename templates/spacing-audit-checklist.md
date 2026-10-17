---
name: spacing-audit-checklist
description: >-
  “大概率是间距问题”：用灰块审一遍布局，按 外层 > 区块 > 卡片 > 元素 的顺序排间距，大多数留白放大、紧密相关的成对元素反而收紧，并用 4/8 token 与 comfortable/compact 密度模式落地。Use when 页面“说不上哪里不对”但字体颜色都没问题; 审 dashboard / 后台 / landing 的布局节奏; 需要给 agent 一个可复制的间距审计 prompt。
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

## 复制给 Agent 的间距审计 prompt

```text
Audit the spacing of <page/URL/screenshot>. Do not change fonts, colors or copy.
1. Grey-block pass: describe the layout as blocks (sidebar, header, cards, main, side list) and ignore type/color.
2. Measure and list in a table: sidebar width, page padding, section/row gap, gap between closely related
   elements (e.g. chart and its list, label and input), card inner padding, gaps between cards.
3. Check the hierarchy: page padding >= section gap > card padding > related-pair gap > inline gap.
   Flag every tie or inversion.
4. Propose new values on a 4/8 scale (4, 8, 12, 16, 24, 32, 40, 48, 64): enlarge most whitespace,
   TIGHTEN gaps between closely related pairs. Check sidebar/content proportion at 1280, 1440 and 1920.
5. Map values to semantic tokens (space-page, space-section, space-card, space-related, space-inline)
   with a comfortable and a compact density.
6. Output: before/after table, the token diff, and the exact CSS/Tailwind changes. Then screenshot
   before and after (desktop + 390px) and say which change made the biggest difference.
```

## 验收

- before/after 表与 token diff 齐全；没有刻度外的值。
- 层级顺序成立，至少一处“相关对”被收紧。
- comfortable / compact 两套都截图，compact 下一屏能放下关键信息。
- 1280 / 1440 / 1920 与 390px 宽度都检查过侧栏比例与溢出。
