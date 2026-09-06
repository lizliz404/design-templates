---
name: brand-logo-sources
description: >-
  Sourcing map for ready-made brand and logo SVG marks — real-brand logo
  libraries (Simple Icons, theSVG, SVGL, Devicon, Super Tiny Icons,
  developer-icons, logos-apps, Iconify) and fictional placeholder logo sets
  for mockups and trusted-by walls (Hugeicons Logos, Untitled UI Logos,
  uilogos, fakelogo, FreeLogo.me), each with license verified from the
  LICENSE file, measured scale, variants, and agent channels, plus trademark
  and build-time offline discipline. Use when adding integration / provider /
  tech-stack logos to a product UI, building mockups or a trusted-by wall,
  or verifying a logo-library name before it enters the toolbox. Not for
  designing your own mark (brand-identity/SKILL.md), not for functional UI
  icon systems (icon-system-craft), not for the product icon-library decision
  (ui-stack-decision §5).
---

# Brand & logo SVG sources · 现成品牌标消费源头

一行定位：pack 图标三腿的第三腿——功能图标走 [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)（Iconoir 拍板在 [`ui-stack-decision.md`](./ui-stack-decision.md) §5），自研 mark 走 [`brand-identity/SKILL.md`](./brand-identity/SKILL.md)（16px gate 在那）；本资产只管**拿现成的品牌标**——真品牌标（别人的 logo）与虚构占位标（mockup / 客户墙）。Simple Icons 此前只在 brand-identity Tier 2 出现过一行，这里是它的主场。

## 1 · 两种标先分清

| 类 | 用途 | 典型场景 | 约束 |
|---|---|---|---|
| **真品牌标** | 标识该品牌本身 | integration / provider / model 选择器、技术栈展示、社媒链接 | 商标 nominative use：只指认，不当自家 logo、不暗示背书、不改形重绘 |
| **虚构占位标** | 假装是某公司 | mockup、"Trusted by" 客户墙、demo 数据、设计系统演示 | 零商标风险；禁止拿真实品牌标充客户 |

与功能图标的分界（icon-system-craft 已裁定）：品牌标不进 chrome 线标混排；品牌标允许多色，功能线标的单色纪律不约束它。

## 2 · 验真结论表（2026-09-06 · Exa + GitHub API + 页面/数据实测）

二手转述的数字与定性多处夸大或错判，本表数字全部实测。

### A · 真品牌标库

| 源 | repo / 入口 | license（实核口径） | 规模（实测） | 变体 | 消费通道 | 定位 |
|---|---|---|---|---|---|---|
| **Simple Icons** | [simpleicons.org](https://simpleicons.org) · `simple-icons/simple-icons` | CC0-1.0 | **3307**（npm `_data/simple-icons.json` 计数） | 单色 only（附官方 hex） | npm `simple-icons` · Iconify · 生态 wrapper 最全 | 品牌标事实标准，生态最深（25.8k★） |
| **theSVG** | [thesvg.org](https://thesvg.org) · `glincker/thesvg` | MIT | 6500+ 图标总量 = 4600+ brand + AWS 739 / Azure 626 / GCP 214 架构图标 | 7 变体：default / mono / light / dark / wordmark ± light/dark | npm tree-shakeable · `@thesvg/react` · CLI `npx @thesvg/cli add` · MCP server · Iconify sets | 2026-03 新；通道最全但下载量尚小（CLI ~212/周），观察池 |
| **SVGL** | [svgl.app](https://svgl.app) · `pheralb/svgl` | MIT | **668**（`api.svgl.app` 计数） | 彩色 + light/dark、部分 wordmark | 站点复制 · 公开 API（JSON：title/category/route/brandUrl） | 审美基准位、策展精选（6.3k★，活跃） |
| **Devicon** | [devicon.dev](https://devicon.dev) · `devicons/devicon` | MIT | **578** techs（`devicon.json` 计数） | 原始 / 平 / 线多版本 | npm · font | 开发者技术栈专用老牌（11.8k★） |
| **Super Tiny Icons** | `edent/SuperTinyIcons` | MIT（LICENSE 实核 2017 Terence Eden；API 报 NOASSERTION 是误报） | ~475 | 彩色 | raw SVG | 每 icon <1KB，极致体积位（15.4k★） |
| **developer-icons** | `xandemon/developer-icons` | MIT | 精选科技标 | light/dark 变体 | npm React 组件 | DX 好的 React 消费位（2.6k★） |
| **logos-apps** | `ln-dev7/logos-apps` | MIT（LICENSE 实核 2026 Leonel Ngoya；API 误报 NOASSERTION） | 自称 15000+ | 彩色为主 | raw SVG | 冷门 SaaS 标兜底，质量自评（252★） |
| **Iconify** | `iconify/iconify` + `@iconify/json` | MIT | 聚合器：Simple Icons / theSVG / Devicon 全在内 | 继承各 set | 统一 API / 组件 | 总入口；**只许构建期**，runtime CDN 禁 |
| Font Awesome Brands | fontawesome.com | free 集 CC BY 4.0（通行口径） | ~500 | 单色为主 | npm / font / svg | 已用 FA 才顺手，不为它新增依赖 |
| Supercons | `lachlanjc/supercons` | BSD-3-Clause | 数百 glyphs | fill 变体 | npm React | **定性修正**：friendly UI 图标集，品牌标只有社媒位，不是 logo 库 |

### B · 虚构占位标（mockup / Trusted by 墙）

| 源 | 入口 | license | 规模 | 定位 |
|---|---|---|---|---|
| **Hugeicons Logos** | [hugeicons.com/logos](https://hugeicons.com/logos) | 页面未明示条款，用前核 Hugeicons license | 上百个，点击即复制 | 实锤为**占位标**：页面标题 "Free SVG Logos for Design Mockups"；审美基准位 |
| **Untitled UI Logos** | [untitledui.com/logos](https://www.untitledui.com/logos) | 站方标 FREE（条款以站为准） | **180+**（页面实标），SVG + Figma 文件 | 占位标质量最高位：虚构公司名、光学统一 |
| **uilogos.co** | [uilogos.co](https://uilogos.co/) | CC-BY-4.0（FAQ 实核，需署名） | 25+，SVG/PNG + Figma 插件 | "lorem ipsum for logos" |
| **fakelogo** | [fakelogo.com](https://fakelogo.com) · `Fushey/fakelogo-logos` | **无 license 检出** | 200 个 | Free API（no auth、CORS 开）；license 未给，商用前必须核 |
| FreeLogo.me | [freelogo.me](https://freelogo.me/) | 免费无署名（站方 FAQ） | ~40 可编辑模板 + 在线 maker | 偏 logo 模板/生成器，量小 |
| Imperfect Logos | `bryanthaboi/imperfectlogos` | 无 license 检出 | 3800 个 | 2024-08 停更、0★，存档位 |

### C · 未证实与出界（明确剔除，不礼貌保留）

- **Iconstica** placeholder logos：查无实证，疑似幻觉——不入池
- **logosear.ch**：curl HEAD 530，存活未确认；vectorlogo.zone（307 存活）为老牌聚合，未逐项核
- **Brandfetch**：真实产品但非开源、商业 API——出界
- Boxicons logos / openlogos / libre-logos：未核，不入池

## 3 · 选型阶梯

先三问定位，再按序取源：

1. **这标是标识该品牌本身吗？** 是 → A 列；是 mockup / 客户墙 / demo → B 列。
2. **什么形态**：单色统一线 → Simple Icons；彩色 + 多变体 → theSVG / SVGL；极致体积 → Super Tiny Icons；开发者栈 → Devicon；冷门品牌找不到 → logos-apps 兜底，Iconify 总搜。
3. **什么交付**：一次性用 → 站点复制 / API 拉取；进产品 bundle → **一律构建期**（npm + lockfile + tree-shake / `@iconify/json`），禁 runtime CDN hotlink（ui-stack-decision §5 离线纪律同线）。

orgbrain 落点：集成 / provider 选择器默认 **Simple Icons mono**（与 Iconoir 线标形成「线 + mono 实心」双色制，quiet chrome 纪律）；需要官方彩色品牌呈现（provider 卡、技术栈墙）再上 **theSVG / SVGL** 彩标；Trusted by / mockup 一律 **Untitled UI Logos** 或 **Hugeicons Logos**。

判定问题：① 商标合规（只指认该品牌）② mono 还是官方彩 ③ 尺寸/体积 ④ 冷门品牌覆盖 ⑤ license 实核了吗——本次实测 GitHub API license 字段 **三次 NOASSERTION 全是误报**（ai-elements 实为 Apache-2.0、SuperTinyIcons 实为 MIT、logos-apps 实为 MIT）：**API 字段只当线索，license 只认 LICENSE 文件实读**。

## 4 · 边界（硬闸 + 反模式）

硬闸：

1. 真品牌标只作「标识该品牌本身」用途；禁止当自家 logo、暗示合作背书、改形重绘为自有资产。
2. Trusted by / 客户墙 / mockup 一律虚构占位标；真实品牌 logo 充假客户 = 商标欺诈味。
3. 品牌 SVG 进 bundle 一律构建期（npm + lockfile + tree-shake）；runtime CDN / Iconify API hotlink 禁。
4. 功能图标与品牌标不占同一语义位（icon-system-craft 裁定）；同区块品牌标统一变体——要么全 mono 要么全官方彩，禁混。
5. 新源进池先过 §2 验真三件套：repo 实测 + LICENSE 文件实读 + 规模实测计数；API 字段与转述数字均不作数。
6. 外部源只有书签与拉取价值，不 vendor 进 pack——本资产是路由表，缺哪个标当场按 §3 拉哪个。

反模式：

- Google 图片搜 logo 直接用（来源、授权、裁剪全不可溯）——一律走验真过的库。
- Simple Icons 单色标手动上色冒充官方彩标——官方品牌色以 brand 页为准；SVGL / theSVG 的 color 变体是官方色来源。
- 为一两个 logo 引入整个 icon font 或全量包。
- 把第三方品牌标缩到 16px 当自家 favicon——自研 favicon 的 16px gate 见 brand-identity；第三方标仅限「指向该品牌」的快捷入口场景。
- 把 Supercons 当 logo 库用（它是 UI 图标集，品牌覆盖只有社媒位）。

## 5 · 产地

2026-09-06，orgbrain 集成 / provider 选择器需求触发（同批：[`agentic-ui-primitives.md`](./agentic-ui-primitives.md)、[`chrome-controls-placement.md`](./chrome-controls-placement.md)）。两份二手调研对 Hugeicons Logos 定性互相矛盾（"design system" vs "占位 logo"）——fetch 页面实锤为后者；theSVG 验真为真但规模数字有夸大（"6500 品牌" 实为 4600 品牌 / 6500 总量）；Supercons 验真但降级定性；Simple Icons 计数实核 3307、SVGL 668、Devicon 578。最有价值的发现是 license 反模式素材：GitHub API license 字段三次 NOASSERTION 全为误报，LICENSE 文件实读才是唯一口径。
