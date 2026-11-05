# Worker B 独立拆解笔记 — fugro.com（审查前自建证据）

> 采集时间 2026-11-05 · REA 6.8.0（inspect-web-page CDP + analyze-web-bundle + capture-browser-scenario）+ curl 静态抓取 + CDP Runtime.evaluate 自写脚本
> 视口：1440×900 dsf1（12 页）+ 390×844 dsf2（5 页）· Chrome 156 headless

## 技术栈（独立实测）

| 层 | 事实 | 证据 |
|---|---|---|
| 框架 | **Next.js Pages Router**（`pages/_app`、`pages/[[...slug]]` catch-all CMS 路由 + 独立 `/search`、`/careers/jobs`、`/llms.txt`、`/robots.txt`、`/sitemap*`），`__NEXT_DATA__` 全量 SSR | home-curl.html、buildManifest.js、shots-desktop/*-dom.html |
| CMS | **Storyblok**：`pageProps.story` 含 `full_slug/is_startpage/content/component` 结构；组件名如 `heroWithVideo/landingPage/featuredCardGrid/caseStudy/vacancyOverview` | next-data-home.json、各页 dom 内嵌 NEXT_DATA（extract 见 audit-notes 组件统计）|
| i18n | next-i18next，仅 `en` locale（`locales:['en']`），但有荷兰语未本地化弹窗文案（unlocalised.popup）| next-data-home.json |
| 样式 | **styled-components**（DOM 类名 `sc-xxxxxxxx-N` 大量出现 + `@emotion/is-prop-valid`）+ 部分 **Material-UI**（keyframes `mdc-ripple-*`）+ emotion 哈希类；JSS 运行时注入 `<style>`，全站仅 1 个 1.3KB 外链 css（`e560ccebbdcb3971.css`，只含 @font-face）| css-dump-home.json、app.js、shots-desktop/settle-home-dom.html |
| 字体 | next/font local 双族：`__aktivGrotesk`（400/500）与 `__review`（400/500/700），woff2 自托管 `/_next/static/media/`，Arial 度量 fallback；**html 根字号 10px**（62.5% trick，1rem=10px）| css-main.css、css-dump-home.json |
| 搜索 | **Algolia**（app.js 62 处 algolia / 48 处 instantsearch；insights.algolia.io + d2pntoovk5-*.algolianet.com 实际请求）| app.js、scenario 网络事件 |
| 分析/营销 | **GTM-PXJ7KT5**（googletagmanager ×33）、**VWO**（dev.visualwebsiteoptimizer.com ×36，A/B 测试）、**Request Metrics** RUM（cdn+in ×62）、**CookieScript**（cdn.cookie-script.com）、**bc0a autopilot** 聊天组件（cdn/app-cf/ixfd2-api.bc0a.com ×99）、reCAPTCHA、Marketo、Mailchimp（us13.list-manage.com）| scenario-pages-desktop.json events |
| 媒体 | 图床 **CloudFront `d3rwfsce0vn25a.cloudfront.net`**（Sitecore-style media URL `image/<id>/image_<hash>/-C<W>x<H>` 裁剪 + `-FWEBP/-FJPG` 格式后缀）+ **Canto DAM** `fugro.canto.global` 预览；视频 **Vimeo**（player.vimeo.com m3u8）| home-curl.html、网络事件 |
| 招聘 | Workday `fugro.wd3.myworkdayjobs.com` + Beamery talent community 外链；`/careers/jobs` 独立页型（141 职位、faceted filters）| next-data、a11y goto-jobs |
| 移动端 | 无独立 m 站；同一响应式 | shots-mobile |

## 排版系统（css-dump-home.json 实测，812 条 JSS 规则 / 117KB）

- `html` font-size **10px** → 字阶用 rem：实测字号档 1.4/1.6/1.8rem(14/16/18px)、2.1/2.4/2.6/2.8/3/3.6rem、56px、62.5%
- 字族分工：`var(--font-aktiv)`（标题 h2 24px/500、按钮 14px/500、nav 之外）vs `var(--font-review)`（body、h1 36px/400、nav）；**h1 letter-spacing -1%、h2 -2%**（负百分比字距）；uppercase ×9 处（标签/eyebrow）
- 字重实测分布：400×27、500×15、600×8、700×8 —— 比 Anduril 三档略多
- 行高样例：h1 43.2px/36px=120%、h2 32.4/24=135%

## 色彩（cssText 频次 top，rgb 值）

- `rgb(1,30,65)` #011E41 ×70 —— Fugro 深海军蓝，主文字/标题色
- `rgb(255,255,255)` ×60
- `rgb(107,190,107)` #6BBE6B ×19、`rgb(104,185,104)` ×6 —— 柔绿（疑 status/success 或品牌次色）
- `rgb(63,182,238)` #3FB6EE ×12、`rgb(156,212,229)` ×4 —— 亮蓝
- `rgb(255,51,0)` #FF3300 ×9、`rgb(255,68,21)` ×4 —— 橙红强调
- 灰阶：#1C1C1C/#424242/#212121/#485D76/#54667E/#D7DBE1/#E0E0E0

## 动效（cssText 实测）

- 关键帧仅 5 个：`dLTjhF`（1s 入场，easing `cubic-bezier(0.465,0.183,0.153,0.946)` ≈ easeOutQuint 家族，forwards）+ `expandBox` + 3 个 `mdc-ripple-*`（MUI ripple 75/150/225ms）
- 过渡主力时长：75/90/100/150/180/200/250/300ms + 450ms ease-in-out；easing 高频 `cubic-bezier(0.4,0,0.6,1)`×12、`(0.45,0,0.55,1)`×11、Material `(0,0,0.2,1)`×11、`(0.4,0,0.2,1)`×6、签名 `(0.465,0.183,0.153,0.946)`×4
- **动效克制**：无 scroll-jacking 证据、无 GSAP/lenis 指纹；入场=1s 淡入上移为主

## 信息架构（__NEXT_DATA__ nav + sitemap 1162 路由）

- 顶导 6 项 + 右侧 Search(button)/Profile(→/portals)/Get in touch(→/contact)；mega menu 三级（primary→secondary→tertiary，nav JSON 全量内嵌）
- sitemap 分布：news 779（business-news 363/press 157/podcasts 138/long-reads 112）、expertise 187（case-studies 111）、contact 61（locations 59 国别页）、careers 48、about-us 38、investors 22、industries 10
- 独立页型：`/search`（Algolia 全屏搜索页）、`/careers/jobs`（职位列表+facets）、`/llms.txt`（GEO/LLM 友好清单，手工策展）
- AnchorBar "Jump to" 页内锚点导航出现在几乎所有内页（industries/news/investors/about/careers）
- Footer：logo + primaryList 6 链 + Social + Contact 组 + Subscribe-to-news(Mailchimp) + footNoteLinks 4 法律链

## 组件（Storyblok component 清单，按页 uniq）

home 30 种 / careers 30 / investors 26 / industries 15 / about 19 / contact 9 / expertise 9 / news 18 / jobs 4。
高频：`link`、`crossLinkFooter`、`anchorBarBookmark`、`hrContent`、`heroTitle`、`landingPage`；特色：`heroWithVideo`（Vimeo 背景）、`imageReelCarousel`、`masonryContentGrid`、`sharePriceCard`+`q4Config`（股价卡）、`vacancyFilter/vacancyOverview`、`countryDetail/countrySpecificContent`（careers 国别页）、`numbers/counterList`（统计数字）、`storyTelling/horizontalStoryTelling`（叙事滚动块）、`contactFormSection`（Marketo 表单）、`employeeStory`、`podcastPage`、`publicationList`。

## 内容策略（a11y 实测）

- H1 全站使命句式："Creating a safe and liveable world"（home/about）、"We transform Geo-data into actionable insights"（expertise）、"Latest news and articles"、"Investing in a safe and liveable world"、"Create positive impact on a global scale"（careers）、"Contact us"
- 首屏：巨标 H1 + 一句 Geo-data 定义句 + "Watch our story (2 minutes)" Vimeo + Jump-to 锚点条 + 画册式图片区
- CTA 词汇极简：`Read more` / `Discover more` / `Get in touch` / `Contact <人名>`（contact 页是**实名卡片**：3 个行业负责人 + 2 个媒体/IR 联系人，无通用询盘表单——表单在 news/subscribe 与 contactFormSection 里走 Marketo）
- 统计带：Employees 11219 / Countries 52 / "#1 in many of our markets"（about 页 numbers 组件）
- 新闻=业务新闻+新闻稿+播客+长文+published articles 五轨；careers/jobs 141 职位实时列表

## 移动（390×844）

- header 收为 logo + Search + Menu 按钮；菜单=全宽 list（Industries…Get in touch 7 项带箭头图标），无 hamburger 抽屉层级——a11y 树直接列出
- 正文结构与桌面一致（同一 DOM 顺序），无独立移动页型

## 证据清单（本目录）

- inspect-home.json（CDP 全量 1.9MB）、bundle-home.evidence.json + bundle-home-summary.json（analyze-web-bundle）
- scenario-pages-desktop.json / scenario-pages-mobile.json（REA scenario Evidence 原件）
- shots-desktop/ shots-mobile/（每步 png+dom+a11y+manifest.json）
- css-dump-home.json + css-home-extracted.css（CDP 抽取的全部生效 JSS 样式表文本）
- next-data-home.json（__NEXT_DATA__ 全量）、home-curl.html、buildManifest.js
- all-routes.txt + sitemap-*.xml（1162 路由）、robots.txt、llms.txt、sitemap.xml
- app.js、chunk-*.js、slug-page.js、css-main.css（公开 bundle 原文，仅引用未复制进仓的说明：JS/CSS 是文本代码非图片字体，留存供静态分析）
- cdp-eval.mjs + dump-styles.expr.js + extract-scenario.py（可复跑脚本）
- scenarios-audit/pages-1440.json、pages-390.json（场景定义）
