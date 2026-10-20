# Interface Cheat Sheet 要点

来源：[interfaces.dev/cheat-sheet](https://interfaces.dev/cheat-sheet)（Jakub Krehel，每条配可交互对比 demo，看 demo 去原站）。以下为转述，抓取 2026-10-20。与 pack 交叉：间距见 [`../spacing-audit-checklist.md`](../spacing-audit-checklist.md)，色彩 token 见 [`../design-color-surface-preferences.md`](../design-color-surface-preferences.md)。

## UI
- 嵌套圆角要同心：外圆角 = 内圆角 + 间距。
- 光学对齐优先于几何对齐。
- 文字 + 图标按钮，图标那侧 padding 略小。
- 用分层 box-shadow 做深度，少用 border。
- 图片加 1px、offset -1px 的 outline：浅色黑 8%，深色白 8%。
- 图标线宽与旁边文字粗细匹配。

## 动效
- 从触发点展开：按触发位置设 `transform-origin`，不从中心。
- 高频菜单开时不动画，只给关闭动画。
- 退场比入场更轻：位移更短，opacity + 4px blur。
- transition 写明具体属性，禁用 `transition: all`。
- 按下缩到 0.95–0.98，`scale 200ms ease-out`。
- 图标切换交叉淡入：新图标 scale 0.25→1、opacity 0→1、blur 4px→0，旧图标反向。
- 交互用 transition（可中途反向），一次性序列用 keyframes。
- 切换明暗主题时禁用所有 transition。
- 动画时 1–2px 抖动 → 加 `will-change: transform`（iOS Safari 尤其）。
- 入场按小组错开，不整块一起进。
- 页面加载时不要动画（除非有意为之）。
- 高频交互（hover 变色）保持即时。

## 排版
- 网页只用 `.woff2`。
- 计时器 / 价格 / 表格用 `font-variant-numeric: tabular-nums`（已用等宽字体可跳过）。
- 长文行宽 60–75 字符。
- 标题 `text-wrap: balance`，描述 `text-wrap: pretty`，长文都不用。
- 长词 / 链接 / ID 用 `overflow-wrap: break-word`；标签徽章 `white-space: nowrap`。
- 根节点开 `-webkit-font-smoothing: antialiased` / `-moz-osx-font-smoothing: grayscale`。
- 原文正常大小写，大写用 `text-transform`。
- 智能标点：弯引号、范围用 en dash、插入语用 em dash、省略号用 `…`。
- 下划线避开降部：`text-underline-position: from-font` + `text-decoration-skip-ink: auto`。
- 省略截断的文字要能在 tooltip 或展开视图里读全。

## 色彩
- 色阶每一档都要有用途（页面底、hover、边框、实心填充、正文），没人用的档删掉。
- 组件只用语义 token，不直接用 primitive。
- token 按用途命名（`--color-accent-solid`），不按颜色或位置命名。
- accent 专留给品牌色，别让 primary 同时指品牌和正文。
- 对比度按元素正后方的背景测。
- 暗色单独做色板，不反转亮色。
- 主题切换只选一种机制：`prefers-color-scheme` 或 `.dark`，不混用。
- 渐变插值：`in oklab` 亮度均匀，`in oklch` 中段更艳，`in srgb` 中间调更灰。

## 无障碍
- 用原生元素（`<button>`、`<a>`）。
- 样式写 `:focus-visible`；去掉 outline 必须给替代。
- `tabindex` 只用 0 和 -1。
- 纯图标按钮给 `aria-label`；可聚焦元素不加 `aria-hidden`。
- alt 写用途与内容；装饰图 `alt=""`。
- 每个输入框有可见 `<label>`，`type` / `inputmode` 对应输入。
- 永远不禁粘贴。
- 提交按钮在请求开始前保持可点；提交时校验，`aria-invalid` + `aria-describedby`，焦点移到第一个错误字段。
- 命中区 ≥24×24，触屏尽量 44×44、桌面 40×40，且不重叠。
- 装饰性光晕 / 渐变加 `pointer-events: none`。
- hover 样式包进 `@media (hover: hover)`。
- 动画包进 `@media (prefers-reduced-motion: no-preference)`。
- 常规更新 `role="status"`，紧急错误才 `role="alert"`。
- 状态变化不只靠颜色，补图标 / 文字 / 下划线。
- Tab 第一站是 skip-to-content。

## 布局
- 锚点跳转用 `scroll-margin-top` 给标题留空。
- 组间距 ≥ 组内间距 2 倍（如 8px / 16px+）。

## 文案
- 按钮以动词开头（Save draft），不用 OK / Yes。
- 确认按钮写明后果（Delete project + Cancel）。
- 同一流程的下一步按钮统一一个词（全用 Continue）。
- 链接文字说清去哪，不写 click here。
- 大小写全站统一，默认 sentence case。
- 开关按「开启时发生什么」命名（Send read receipts）。
- 空状态说明这里放什么，并给一个起步动作。
- 称呼读者用「you」，不用「the user」。
