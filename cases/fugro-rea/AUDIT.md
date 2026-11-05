# AUDIT — worker A（fugro.com REA 拆解）对照审查

> 审查人：worker B · 2026-11-05 · 审查对象：`TEARDOWN.md` + `CFE-IMPLICATIONS.md` + 顶层 `evidence/` `css/` `scripts/` `shots/`
> 对照清单：anduril-rea / saronic-rea TEARDOWN 章节结构抽出的 12 章 checklist
> 本审全部原始证据在 `evidence/audit/`（独立采集，不依赖 A 的产物）

**总评**：A 的拆解整体质量高——技术栈、页型清单、字体版权实测、色彩频次、组件 schema、a11y 观察都有实证支撑，页型覆盖（12 种）和 taxonomy 分析超出 checklist 要求。但有 **1 处明确错误**（动效库漏检）、**2 处部分错误**（移动菜单二级钻取、字族分工）、**若干小缺口**（路由全表未入库、资产管线无专节、Workday 漏记）。`CFE-IMPLICATIONS.md` 继承了动效库错误（"零动效库"写进了开头和结论语境）。

---

## 一、Checklist 逐条核对

| # | 章节 | 结果 | 说明与证据 |
|---|---|---|---|
| 1 | 一页结论 | **部分** | 结构、字体、色板、转化机制结论全部成立；但"零动效库"错误（见错误 E1），结论句"几乎零滚动叙事/零动效库"需修正为"无 GSAP/Lenis/scroll-snap，但存在 framer-motion whileInView/whileHover 系统"。证据：`evidence/audit/framer-fingerprint.txt`、`evidence/audit/shots-desktop/*-dom.html` |
| 2 | 技术栈 | **部分** | Next.js Pages Router+SSG、Storyblok、styled-components 5.3.11、Vercel、Algolia、Vimeo、Marketo、Beamery、Q4、Mapbox、Mailchimp、GTM/VWO/Hotjar/Ortto/Leadinfo/RequestMetrics、llms.txt、next-i18next(en only)——全部独立复证成立（`evidence/audit/next-data-home.json`、`buildManifest.js`、`app.js`、`scenario-pages-desktop.json` 网络事件）。**两处漏**：① Workday——`myworkdayjobs.com` jobAlerts 登录跳转在 `next-data-home.json` 中实测存在，A 的招聘行只写 Beamery；② framer-motion 漏检（E1）。Hotjar/Leadinfo/Bing 在我的首页网络采集中未见实际请求（CSP 白名单层面成立），建议 A 标注"配置允许 vs 实测发出"的区别 |
| 3 | 信息架构 | **部分** | 顶导 6 项+Search/Profile/Get in touch、12 页型表、URL 分类学、metaCategory 6 轴、footer 结构——均复证成立（`evidence/audit/shots-desktop/*-a11y.json`、`next-data-home.json`、`all-routes.txt`）。**缺口**：① §2.1 移动菜单"chevron 钻二级"无证据且被反证（E2）；② 路由全表 1162 URL 未入库（A 自己标"如需逐 URL 全表可重拉"，证据只在 /tmp）——已补 `evidence/audit/all-routes.txt`+`sitemap-*.xml`；③ `navItems` 三层树（primary/secondary/tertiary）在 pageProps 中完整内嵌但未见任何 UI 消费——A 说"无 mega 菜单"对桌面成立，但未指出这份休眠导航数据的存在（对 CFE 是有价值的反面教材：数据建了三层、UI 只用了平铺） |
| 4 | 排版系统 | **部分** | next/font 双族、10px root、断点阶梯、Review/Aktiv 分工大方向、sentence case、零大写——成立（`css-home-extracted.css`、`font-names.json`、`type-styles-*.json`）。**两处需修**：① "Review 只做巨标、Aktiv 做一切功能层（body…）"过强——实测 `body{font-family:var(--font-review)}`，Review 是全站基底字族；CMS `BODY_*` token 渲染 Aktiv、`HEADING_04/05`（28–30px）渲染 Review。准确表述应为"Review=基底+展示层，Aktiv=CMS 正文/UI 控件层"（E3）；② 字号实测混有 px 值（12/13/14/15/16/18/20/24/29/37/56px，部分来自 cookie-script/MUI 注入层），"全 rem 阶梯"的表述建议限定站点 JSS 层。零大写标签复证成立——css-home-extracted.css 中全部 9 条 `text-transform:uppercase` 均属 `#cookiescript_*` 选择器，站点样式零大写 ✓ |
| 5 | 色彩与材质 | **✓** | #011E41 主墨、#FF3300/#E52E00 唯一 accent、#9CD4E5 案例页底、#c5ccd5 发丝线、2px radius、scrim 语法、CMS backgroundColor/textColor 页级 token——全部复证（`css-home-extracted.css` 中 `rgb(1,30,65)`/`rgb(255,51,0)`/`rgb(156,212,229)`/`rgb(129,142,160)` 均落在站点类名上；`cssom-careers.css` 有 `position:sticky` 实例佐证 sticky 机制）。我初扫 CSSOM 频次表里出现的绿 #6BBE6B/蓝 #3FB6EE 经核实全部来自 CookieScript/MDC 注入样式，A 的色板未受污染，正确 |
| 6 | 布局网格与节奏 | **✓** | 1440 容器、gutter 20→32→40→48、断点 0/640/1024/1250/1600、sticky Jump-to 条（`css/cssom-careers.css:491` `.eHYTEp{position:sticky;top:0}` 实证）、左 label 右正文、书签-内容节拍——复证成立。补充：careers cssom 还有 `position:sticky;top:65px;height:calc(100vh-65px)` 的整屏 sticky 展示卡（`.jPuvSt`/`.gEXqgB`），A 未提，属 careers 页独有机制 |
| 7 | 组件与交互 | **部分** | hero 4 变体、anchorBarBookmark、卡片族、lifeCycle 手风琴、keyMetrics、pageLinkList、contactFormSection 专家卡、按钮 3.2/4.8rem+签名缓动——DOM/a11y/组件清单全部复证（`shots-desktop/*-dom.html` 的 NEXT_DATA story 组件统计、`type-styles-*.json`）。**动效小节（§6.5）错误**（E1）："无 IntersectionObserver reveal（入场即静态）"被 bundle 指纹和 DOM 初态双重反证。轮播自研 grab/overflow-x、scrollIntoView 平滑滚动——成立。第三方集成点清单成立但见技术栈行 Hotjar/Leadinfo 备注 |
| 8 | 内容策略 | **✓** | 宣言式 H1+解释句双轨、Challenge/Solution/Outcome、真人专家名片、Key Metrics、111 案例、5 轨新闻、CTA 收敛 /contact——a11y 树与 DOM 复证（`shots-desktop/goto-*-a11y.json`，H1/统计带/新闻分轨均见）。CTA 密度判断合理 |
| 9 | SEO/GEO | **✓** | llms.txt、sitemap 12 分片+vacancies.xml、语义 URL、面包屑、metaCategory taxonomy、next-seo——复证（`evidence/audit/llms.txt`、`robots.txt`、`sitemap-*.xml` 原文已存档）。补充：A 的 §10 路由清单指向 /tmp 未入库，已由 `evidence/audit/all-routes.txt`（1162 行）+ sitemap 原件补齐 |
| 10 | 移动差异 | **部分** | header 收缩、全屏白底菜单、Jump-to 横滚、单栏降级、断点降档——方向成立（`shots-mobile/`、`menu-probe-mobile.json`）。**错误**：菜单"chevron 钻二级"无证实（E2）；移动端实际只覆盖 4 页（home/industries/careers/contact），expertise/news/investors/about/contact/investors/jobs/search 的 390 证据缺失——A 的 mobile-390 scenario 是否覆盖更多页我未逐一核对，如只 4 页则 §8 中"卡阵降单列"等概括超出取样（标【缺：移动端内页覆盖不足】） |
| 11 | a11y | **✓** | landmark、面包屑、button 锚点、dialog 角色、alt 文本、quote-as-h2、同意前营销脚本——全部复证且观察质量高（`shots-desktop/*-a11y.json`、网络事件时间线）。reduced-motion 一项 A 自己诚实标【缺】，审查确认属实：bundle 中虽有 `shouldReduceMotion` 指纹（framer-motion 内建处理），但站点级 `@media (prefers-reduced-motion)` 规则未做全量审计，维持【缺】 |
| 12 | 证据索引 | **部分** | A 的索引本身完整自洽；唯一硬伤是"路由全表"在 /tmp 不在仓内（已补）。A 的 `css/cssom-sheet-{2,3}.css` 把 CookieScript 样式单独分离存档，做法正确——这也解释了为何 A 的色板干净 |

---

## 二、确认的错误（按严重度）

### E1【明确错误】动效库漏检："无动效库"不成立

- A 原文（§1 表 + §0 + §6.5 + CFE-IMPLICATIONS 开头）："无动效库（无 GSAP/framer-motion/lenis/scroll-snap）"、"无 IntersectionObserver reveal 证据（入场即静态）"、"零动效库"。
- 反证（`evidence/audit/framer-fingerprint.txt`，源 `app.js`=_app chunk 原文）：
  - `framerAppearId`、`motionContainerHidden`/`motionContainerVisible`（framer-motion appear/viewport 容器状态机）
  - `shouldReduceMotion`×4、`useAnimation`×2、`animate(`×1
  - **`whileInView`×5、`whileHover`×6、`variants`×47、`initial=`×2** —— motion props 真实出现在 bundle 中，非死代码残留
- DOM 佐证：`evidence/audit/shots-desktop/goto-*-dom.html` 每页 12–33 个元素带内联 `opacity:0`（伴随 translateY 初态）——这是 framer-motion `initial`/`whileInView` 的典型输出形态，且**全站每个页型都有**，不是个别组件。
- 精确修正：无 GSAP/Lenis/scroll-snap 证据 ✓；但 **framer-motion（或其等价 motion runtime）确实在用**，"入场即静态"不成立——入场初态是 JS 写入的 opacity/transform，触发机制为 viewport 进场。headless 滚动下 reveal 是否全部触发未能完全证实（我的滚动探针超时未完成，标【缺】），但"无动效库/入场即静态"的表述必须改。
- 影响面：`TEARDOWN.md` §0/§1/§6.5、`CFE-IMPLICATIONS.md` 第 3 行"零动效库"与第 12 条相关语境。

### E2【部分错误】移动端菜单"chevron 钻二级"无证据

- A 原文（§2.1、§8）：移动菜单 = "6 大项右排 chevron 钻二级 + Get in touch 平级大字"。
- 反证：`evidence/audit/menu-probe-mobile.json` —— 移动视口下菜单浮层与桌面完全同构，为 7 个平铺直链（Industries/Expertise/Careers/Investors/News/About us/Get in touch），无二级容器；`evidence/audit/menu-probe-desktop.json`、`hover-probe2.json` 同样显示 hover/点击均不展开面板，菜单项点击直接导航（menu-drill 探针点击 Industries 后页面跳转，证实是 `<a>` 直链非手风琴）。
- 准确表述：移动菜单 = 桌面平铺 nav 的全屏大字版，无钻取层级。`navItems` 三层数据休眠未用（见 G3）。
- 附带：A 称"6 大项"，实测浮层含 7 项（6 主项 + Get in touch），措辞小疵。

### E3【部分错误】字族分工"Review 只做巨标"过强

- A 原文（§3.1）："Review 只做展示层巨标…Aktiv 做一切功能层（body/导航/按钮/卡片文/h3 级以下标题）"。
- 实测（`evidence/audit/css-home-extracted.css`、`type-styles-home.json`）：
  - `body { font-family: var(--font-review) }` —— **Review 是全站基底字族**，任何未覆写文本默认 Review；
  - CMS `BODY_01~04`/`HEADING_07/08` token 实测渲染 `__aktivGrotesk_92419b`；`HEADING_04/05`（28–30px）渲染 `__review_39e939`。
- 准确表述：**Review = 基底字族 + 展示层（巨标/中大标题/lede），Aktiv = CMS 正文与 UI 控件层**。A 的方向（display/UI 分职）对，但"body=Aktiv""Review 只做巨标"两点与实测不符。CFE-IMPLICATIONS 第 12 条"Review 只做展示巨标、Aktiv 做一切功能层"同错。

---

## 三、缺口与补扒记录（本审新增证据）

| # | A 的缺口 | 严重度 | 补扒结果（证据路径） |
|---|---|---|---|
| G1 | 路由全表未入库（指向 /tmp） | 中 | `evidence/audit/all-routes.txt`（1162 URL）+ `sitemap.xml`+`sitemap-1~12.xml`+`robots.txt`+`llms.txt` 原件 |
| G2 | 动效库漏检（E1） | **高** | `framer-fingerprint.txt` + `app.js`/`chunk-*.js` 原文 + 各页 DOM 内联初态统计 |
| G3 | navItems 三层树休眠未指出 | 低 | `next-data-home.json`（navItems primary/secondary/tertiary 全量）+ `hover-probe2.json`/`menu-probe-*.json`（无 UI 消费实证） |
| G4 | 资产管线无专节（对照 Anduril/Saronic 均有媒体/资产行） | 中 | CloudFront `d3rwfsce0vn25a.cloudfront.net` Sitecore 式 URL 语法 `image/<id>/image_<hash>/-C<W>x<H>` 裁剪 + `-FWEBP/-FJPG` 格式后缀；Canto DAM `fugro.canto.global` 预览；`evidence/audit/independent-notes.md` §媒体、`home-curl.html`、scenario 网络事件 |
| G5 | Workday 招聘入口漏记 | 低 | `next-data-home.json`：`myworkdayjobs.com/en-US/Careers/login?redirect=...jobAlerts`（职位提醒登录跳转）；A 仅记 Beamery |
| G6 | careers 页 sticky 整屏展示卡未提 | 低 | `css/cssom-careers.css:800-804`（`.jPuvSt`/`.gEXqgB` sticky 100vh 卡）——注：此文件属 A 的 css/ 产物，我的复证在 `css-dump-home.json` 与 careers DOM |
| G7 | `/careers/jobs/[slug]` 职位详情页、podcast/published-article 详情页型无实测页 | 低 | **【缺】**——A 与本审均未采集详情页实例；页型推断自 sitemap/组件名，标未知而非不存在 |
| G8 | 移动端内页覆盖 | 低 | 本审移动端仅采 home/industries/careers/contact 4 页（`shots-mobile/`）；其余页型 390 证据【缺】，如需可在后续轮次补 |
| G9 | reveal 触发实证 | 低 | 【缺】headless 滚动探针超时未完成；bundle 指纹+DOM 初态已足以推翻"无动效库"，但 whileInView 实际触发率未量化 |
| G10 | Hotjar/Leadinfo/Bing 实际发请求与否 | 低 | 本审首页网络事件未见这三家实际请求（CSP 白名单在）；A 列入营销栈建议区分"允许"与"实测" |

## 四、审查确认无误的关键结论（抽样复核通过）

- 全站 SSG + `__N_SSG:true` + `[[...slug]]` catch-all（`next-data-home.json`、`buildManifest.js`）
- Storyblok story 结构与组件清单、metaCategory 6 轴（各页 `*-dom.html` 内嵌 NEXT_DATA）
- 字体出品方：Aktiv Grotesk/Dalton Maag、Review/Commercial Type（`font-names.json`，woff2 name 表版权串）
- 断点 token `{0,640,1024,1250,1600}`、1rem=10px（`css-home-extracted.css`、`css-dump-home.json`）
- Algolia InstantSearch SSR、Marketo 表单 ID、Beamery、Q4 股价卡、Vimeo、Mapbox（`next-data-home.json`、a11y、CSP/网络事件）
- "同意前已发营销请求"合规瑕疵（scenario 网络时间线复证）
- sentence case/零站点大写、2px radius、单 accent、scrim 双带（CSSOM 复证）

## 五、本审证据清单（`evidence/audit/`）

- 场景与抓取：`scenario-pages-desktop.json`、`scenario-pages-mobile.json`（REA Evidence 原件）+ `pages-1440.json`、`pages-390.json`（场景定义）
- 页面产物：`shots-desktop/`（11 页 × png/dom/a11y + manifest）、`shots-mobile/`（4 页同构）
- 静态原件：`app.js`、`chunk-545/962-*.js`、`slug-page.js`、`buildManifest.js`、`css-main.css`、`home-curl.html`
- 运行时样式：`css-dump-home.json`、`css-home-extracted.css`（812 条 JSS 全量）、`type-styles-{home,about,careers,jobs,news}.json`
- 数据原件：`next-data-home.json`、`inspect-home.json`、`bundle-home.evidence.json`+`bundle-home-summary.json`
- 路由/SEO：`all-routes.txt`、`sitemap.xml`、`sitemap-1~12.xml`、`robots.txt`、`llms.txt`
- 探针：`cdp-eval.mjs`+各 `*.expr.js`（可复跑）、`hover-probe{,2}.json`、`menu-probe-{desktop,mobile}.json`、`menu-drill.expr.js`（点击导航实证）、`framer-fingerprint.txt`、`font-names.json`、`scroll-reveal.expr.js`（未完成，留档）
- 笔记：`independent-notes.md`（独立拆解，审查前所写）
- 工具脚本：`extract-scenario.py`、`dump-styles.expr.js`、`type-styles.expr.js`、`mobile-menu-probe.mjs`
