# vercel.com 间距实测表（2026-11-07）

工具：playwright 1.64.1 + getComputedStyle 实数（`scripts/measure.mjs`、`scripts/probe-deep.mjs`），
代理 `http://127.0.0.1:7890`。页面：`/`(home)、`/pricing`、`/docs`；宽度 1280/1440/1920/2560。
原始 JSON 见同目录 `*-{宽}.json` / `*-deep.json`，截图在 `../shots/`。

**测量注意**：DOM 内有 `visibility:hidden` 的 nav 副本（mega-menu/mobile 变体，有布局矩形）和
`.sr-only` 文本（footer 主题切换 legend）。下表均已剔除——用 text-node 边缘量"一把尺"时
必须过滤 `visibility:hidden` / `sr-only` / `display:none`，否则边缘值被隐藏副本拉飞。

## 1. 一把尺（可见文字左右缘）

### marketing（home / pricing 完全同轨）

机制：`max-w: var(--ds-page-width-with-margin)` = `1400px + 2×24px` = 1448 触发容器，
内层 `padding: var(--geist-page-margin)` = 24px。header / 所有 section / footer 全部消费同一个容器类。

| 视口 | 左缘 | 右缘（轨值） | 容器形态 |
|---|---|---|---|
| 1280 | 24 | 1256 | 容器全宽（<1448），gutter 24 |
| 1440 | 24 | 1416 | 同上（1440<1448 仍 bleed） |
| 1920 | 260 | 1660 | (1920−1400)/2 = 260 |
| 2560 | 580 | 1980 | (2560−1400)/2 = 580 |

- 内容宽恒定 1400px，左缘 = `max(24, (vw−1400)/2)`——maxw+gutter 形态，与 Fugro（1344+48）同构。
- header / main 各 section / footer / legal 行实测全部同轨；footer 底栏(legal/状态行)内缩
  +16（轨内缩进，合法）。
- 每侧解析值 = 1（隐藏副本剔除后）。**一把尺在 marketing surface 上严格成立。**

### docs（第二把尺，共存于同一站点）

| 视口 | header | main(article) | footer |
|---|---|---|---|
| 1440 | 24..1389（全宽 bleed） | 20..1343（fluid grid） | 24..1400 轨 |
| 1920 | 24..1869（全宽） | 20..1583（fluid） | 252.5..1652.5（1400 轨，按 1905 内容宽居中） |

- docs header 无 maxw（`maxW=none`），main 为 `grid-cols-[300px]` 全宽 fluid，footer 仍是
  marketing 1400 轨——**同一页三条文字边并存**：header 贴视口、main 贴视口、footer 居中容器。
- 即：Vercel 的"一把尺"是**按 surface 划分**的，不是全站唯一。docs 作为 app 型 surface
  用全宽框架；但 footer 组件跨 surface 复用 marketing 轨，在 docs 页上产生真双轨。

## 2. 纵向节奏

| 层 | 实测 |
|---|---|
| home hero 高度 | 836px @1440/1920（`min-h:100svh−64` 变体），header 高 64 |
| home section 间距 | `mt-40`→`@md:mt-52` = 160→**208px**（Tailwind 4px 基） |
| pricing section padding | pt 144 / 72，pb 96 |
| docs 内容区 padding | 24 / 64 |
| 卡片 padding | pricing 套餐卡 32；docs 链接卡 24；chip 16；复制块 0(内件自控) |
| 相关对 | H3→P gap=8；H1→内容块 gap=24；docs 侧栏组 H3→items 8 / 20 / 40 |

层级检验（1920 marketing）：外层有效缘 260 ≥ 区块 208 > 卡片 32 > 相关对 8 —— **成立**。
注意点：视口 <1448 时外层塌缩为 gutter 24，与卡片 padding（24–32）持平甚至倒挂——
`外层≥区块>卡片` 在容器断点以下不成立，属 gutter 触底的自然结果而非违规。

## 3. 取值刻度

- CSS 变量实锤：`--geist-space-{2,4,8,16,24,32,48,64}x` = 8/16/32/64/96/128/192/256px，
  即 `Nx = N×4px`；`--geist-gap: 24px`，`--geist-page-margin: 24px`，`--ds-page-width: 1400px`。
- 间距普查（home+docs，computed px 直方图 top 值）：2, 4, 6, 8, 10, 12, 16, 24 为主；
  大值 40/48/64/96/144/160/208 全是 4/8 倍数。宏观层级走 4/8，微层（border 补偿、图标
  nudge、负 margin -1/-60/-64 对齐 hairline）有 1–2px 粒度。
- token 化程度高：Tailwind 任意值直接写 `px-(--geist-page-margin)` /
  `max-w-(--ds-page-width-with-margin)`，组件不造新字面边距。

## 4. 密度：marketing vs docs

同一刻度系（都是 Geist 4px 基），密度差体现在取值档位不在刻度本身：
marketing 区块间距 96–208、卡 32；docs 内容 pad 24/64、卡 24、侧栏相关对 8–40——
docs 明显更紧，但没有任何值落在刻度外。
