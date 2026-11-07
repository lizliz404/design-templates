# vercel.com 间距体系实测（2026-11-07）

> 工具：playwright 1.64.1 headless Chromium（代理 127.0.0.1:7890）+ `getComputedStyle` 实数。
> 证据：`evidence/`（12 组 JSON + DOM dump + measurements.md + 5 组 deep probe）、`shots/`（3 页 × 4 宽全页截图）、`scripts/`（两个可复跑探针）。
> 取样：1280 / 1440 / 1920 / 2560 × home / pricing / docs。cookie 横幅已尝试点拒。
> 结论仅针对间距；未复制对方任何资产文件。

## 一页结论

Vercel marketing 面的间距是**一把尺的教科书实现**：`--ds-page-width: 1400px` +
`--geist-page-margin: 24px` 合成 `1448px` 触发容器，header / 全部 section / footer /
legal 行全部消费同一容器类，任一宽度下左右文字缘各只解析为一个值（轨内缩进合法）。

docs 面是另一把尺：header/main 全宽 fluid（20–24px 贴视口），footer 仍挂 marketing
1400 轨——**同一页上三条文字边并存**。所以 Vercel 的规则实际是"一把尺 **per surface**"，
marketing rail 与 app 型 docs rail 共存，footer 作为跨 surface 复用件在 docs 页上形成双轨。

刻度 = Geist 4px 基 token 系（`--geist-space-Nx = N×4px`，8/16/32/64/96/128/192/256），
Tailwind 任意值直消费 CSS 变量，宏观间距全在 4/8 刻度上；微层有 1–2px 负 margin 做
hairline 对齐。纵向层级 `外层(260@1920) ≥ 区块(208) > 卡片(32) > 相关对(8)` 成立；
视口 <1448 时外层塌缩成 gutter 24 与卡片持平，是断点以下必然。

密度（marketing 松 / docs 紧）用同一刻度的不同档实现，不开第二套刻度。

## 测量方法学收获

DOM 里存在 `visibility:hidden` 的 nav 副本（mega-menu / mobile 变体，有真实布局矩形，
会把左缘拉到视口边）和 `.sr-only` 文本（footer 主题切换 legend，把右缘拉出轨外）。
**任何"数尺子"探针必须先剔除 hidden / sr-only / display:none 节点**，否则量到的是隐藏副本。
