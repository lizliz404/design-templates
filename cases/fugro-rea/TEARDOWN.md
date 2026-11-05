# Fugro.com — REA 全盘拆解 (2026-11-05)

> 工具：REA 6.8.0（`capture-browser-scenario` launch/headless Chromium 156、`inspect-web-page`、`export-web-scripts`）+ 自写 Node CDP 客户端 dump CSSOM + 直接抓取线上 CSS/JS/字体做静态分析。
> 证据：`evidence/`（6 个 scenario Evidence JSON + 逐页 DOM/screenshot/a11y + CDP inspect）、`css/`（1 个静态 CSS + 4 份运行时 CSSOM dump 原文）、`scripts/home/`（REA 导出的 13 个脚本 + manifest.json）、`scenarios/`（6 个场景定义）、`shots/`（19 张精选截图）。
> 红线：未复制对方图片/视频/字体文件进本仓；字体结论依据 `@font-face` + woff2 name 表实测（Dalton Maag / Commercial Type 版权串），字体验证后文件已删不入库。
> 取样：1440×900 dsf1 与 390×844 dsf2、reduced_motion=no-preference、service_workers=block；cookie 同意条已点 Decline（原始含横幅态也保留在 evidence）。

---

## 0. 一页结论

Fugro 是 **Next.js Pages Router + Storyblok CMS + styled-components 5 的企业内容站**，与 Anduril（自研渲染引擎）/Saronic（GSAP 叙事站）完全不同的物种：**一套 CMS 驱动的"组件库 + 编辑排版系统"**，全站 SSG。动效上无 GSAP/Lenis/scroll-snap 这类滚动叙事栈，但存在 **framer-motion whileInView/whileHover 进场体系**（每页型 12–33 个元素带 opacity:0+translateY 内联初态，viewport 触发）——不是"入场即静态"。视觉系统 = **Review（Commercial Type）基底+巨标 + Aktiv Grotesk（Dalton Maag）正文/UI 双族 + 单墨蓝 #011E41 + 单橙红 #FF3300 accent + 2px 直角纪律**。叙事武器不是动效而是**结构纪律**：每个长页一条 sticky "Jump to" 锚点子导航 + 右侧橙色情境 CTA；每个行业/案例页末尾挂"真人专家名片 + Marketo 表单"转化件；案例研究走 Challenge/Solution/Outcome + Key Metrics + lifeCycle 编号手风琴的标准工程叙事骨架。这是**上市公司级 B2B 内容工厂**，体量 1162 URL，与 CFE 同赛道（海工/地质勘察）直接可对标。

---

## 1. 技术栈（证据级）

| 层 | 事实 | 证据 |
|---|---|---|
| 渲染模型 | **Next.js Pages Router，全站 SSG**（`__N_SSG:true`；`/[[...slug]]` 单 catch-all 渲染所有 CMS 页） | evidence/*.html `__NEXT_DATA__`、slug chunk |
| CMS | **Storyblok**（story 对象全字段在 `__NEXT_DATA__`；CSP `api.storyblok.com`/`app.storyblok.com`/`a.storyblok.com/f/192811/`；块字段如 `anchorBarBookmark`/`heroWithVideo` 直出） | CSP 头、`__NEXT_DATA__.pageProps.story` |
| 托管 | **Vercel**（`server: Vercel`、`x-vercel-cache: HIT`、`x-matched-path: /en/[[...slug]]`、`/_vercel/speed-insights/script.js`） | 响应头、scripts/home |
| 样式 | **styled-components 5.3.11**（`data-styled-version`，`sc-*` 类名，CSSOM 注入；SSR 外联 CSS 只有 1.3KB 字体文件） | home DOM、`css/` |
| 设计 token | 断点 `{XS:0,SM:640,MD:1024,LG:1250,XL:1600}`、1rem=10px | `_app` chunk `BREAKPOINT:{XS:0,SM:640,MD:1024,LG:1250,XL:1600}`、CDP getComputedStyle |
| 动效 | **framer-motion 体系在用**（bundle 实测 `whileInView`×5/`whileHover`×6/`variants`×47/`shouldReduceMotion`×4/`useAnimation`/`animate(` + appear 容器状态机）；无 GSAP/Lenis/scroll-snap 证据。各页型 12–33 个元素带 `opacity:0`+translateY 内联初态（whileInView 典型输出）；whileInView 实际触发率未量化【缺：headless 滚动探针未完成】。UI 态另走 CSS transition 250ms 档 | `evidence/audit/framer-fingerprint.txt`、`evidence/audit/shots-desktop/*-dom.html`、CSSOM |
| 轮播/滑动 | 自研：`cursor:grab/grabbing` + `overflow-x` 滑动轨（News highlights、crossLinkCarousel） | CSSOM `.jzjpsJ` scrollbar 样式、a11y Prev/Next |
| 搜索 | **Algolia InstantSearch SSR**（`/search` pageProps `indexName/searchServerState/initialUiState`；careers jobs 同构 `InstantSearchSSRProvider`） | /search pageProps、slug chunk `i.ah` |
| 视频 | **Vimeo external**（`player.vimeo.com/external/*.m3u8` + `i.vimeocdn.com` poster，__NEXT_DATA__ 内嵌） | home DOM |
| 表单 | **Marketo**（explore.fugro.com forms2.min.js，`marketoLoadFormId:1007`/`marketoLoadFormCode:309-GAQ-925`，CMS 按专家卡片配置） | contact DOM `__NEXT_DATA__` |
| 招聘 | **Beamery**（expert 对象带 `beameryCompanyId/beameryFlowId`；flows.beamery.eu Talent Community 外链） + **Workday**（`myworkdayjobs.com/en-US/Careers/login?redirect=…jobAlerts` 职位提醒登录跳转，`__NEXT_DATA__` 实测） + Algolia 职位搜索 | contact/home DOM、`evidence/audit/next-data-home.json` |
| 投资者 | **Q4 Inc**（`sharePriceCard` + `q4Config` 组件；connect-src `fugro2024eutfm.q4web.com` 实时行情） | home/investors story blocks、CSP |
| 地图 | **Mapbox**（connect-src `*.mapbox.com`；locations 页 "Map view" 橙按钮切地图视图） | CSP、locations 截图 |
| 资产管线 | 图片走 CloudFront `d3rwfsce0vn25a.cloudfront.net/image/<assetId>/image_<hash>/` + URL 语法裁剪：`-C<W>x<H>,<x>,<y>` 裁切 + `-B<宽>` 带宽 + `-FWEBP/-FJPG` 格式后缀（thumbor/imgproxy 式）；DAM 为 **Canto**（`fugro.canto.global` 预览域）；`<picture>` 按 BREAKPOINT 出 4 档 + retina `-B` 变体 | home network events、`evidence/audit/independent-notes.md` §媒体、`evidence/audit/home-curl.html` |
| 营销栈 | **实测发出请求**：GTM `GTM-PXJ7KT5`、DoubleClick、VWO、**Ortto Autopilot**（cdn.bc0a.com + app-cf/ixfd2-api.bc0a.com）、Request Metrics、cookie-script；**CSP 白名单允许但首页未见实测请求**：Hotjar、Leadinfo、LinkedIn、Bing ads、Marketo munchkin（区分"允许"与"实测"） | CSP、home-1440 network events、`evidence/audit/scenario-pages-desktop.json` |
| 订阅 | **Mailchimp**（mc-validate.js + cdn-images.mailchimp.com embed CSS 白名单） | CSP script/style-src |
| 客服 | Microsoft Dynamics svc（`*.svc.dynamics.com` connect-src，speak-up/支持面） | CSP |
| GEO | **`/llms.txt` 已上线**（全站导航+页面摘要 markdown 给 LLM 爬取）；sitemap 12 分片 + `/sitemap/vacancies.xml` 职位分片 | llms.txt、buildManifest |
| i18n | next-i18next 设施在（LOCALES/DEFAULT_LOCALE/`previousLocale` sessionStorage、unlocalised 弹窗组件），但 `locales:['en']` 仅英语上线；story 有 `NL_version` 字段 = 荷兰语版走另一站 | `__NEXT_DATA__`、slug chunk |

含意：这是**营销内容平台不是体验站**——技术选型全部服务"全球编辑团队规模化发内容"（Storyblok 块 + Algolia + Marketo/Beamery/Q4 集成），视觉一致性靠 styled-components 组件库的 token 纪律，不靠动效。

---

## 2. 信息架构与页面清单

### 2.1 顶层导航（桌面实测，平铺式无 mega-menu）

```
FUGRO logo | Industries Expertise Careers Investors News About us | 🔍Search  👤Profile | [Get in touch]
```

- header = logo(108×48 svg) + `<ul>` 6 直链 + Search button + Profile 链接(/portals) + 竖分隔线 + "Get in touch" 描边按钮 → `/contact`。
- **无下拉/无 mega 菜单**——所有二级入口靠页内锚点条和 footer。导航项 hover 无面板，纯直链。
- header 透明浮在 hero 上（`isTransparent`+`invertedHeader` CMS 旗标），浅页反转为 navy 文字。
- 搜索：点 🔍 在 header 下展开一条白色面板（"Search" + × + 大输入框 + → 提交钮），背后页面压暗（截图 search-panel.png）；提交跳 `/search`（Algolia SSR）。
- 移动端 ≤1024 左右折叠：logo + 🔍 + ☰；☰ 开**全屏白底菜单浮层**——与桌面平铺 nav 完全同构的 **7 项直链**（Industries/Expertise/Careers/Investors/News/About us/Get in touch），**无二级钻取**，点击直接导航（menu-390.png，menu-drill 探针实证）；× 关闭。
- **休眠导航数据**：`pageProps.navItems` 内嵌完整三层树（primary/secondary/tertiary，search 页 NEXT_DATA 可见 careers 二级树全文），但实测桌面 hover/点击与移动浮层均无任何 UI 消费——数据建了三层、UI 只用了平铺（`evidence/audit/menu-probe-{desktop,mobile}.json` 实证无面板）。

### 2.2 页型清单（sitemap 1162 URL + 12 页型实测）

| 页型 | Storyblok component | 代表路由 | Hero 变体 | 骨架（a11y/story 实测） |
|---|---|---|---|---|
| 首页 | `commerceHomePage` | `/` | `heroWithVideo` | hero(图+Vimeo弹层) → Jump-to 条 → intro(What we do) → imageReelCarousel(3 行业卡) → featuredCardGrid(3 案例卡) → masonryContentGrid(组织 4 卡含股价卡) → crossLink(招聘横幅) → imageContentCarouselStatic(新闻轮播) → intro(Our history) |
| 行业总览 | `commerceHomePage` | `/industries` | 同首页（photo hero） | 与首页同构 |
| 行业页 | `industry` | `/industries/energy` `/water` `/infrastructure` | `heroDefault`（photo+eyebrow+巨标） | hero → 锚点条(Our view/Case studies/News/Technical papers/Sub industries + 橙色 Contact) → intro → storyCard → featuredCardGrid → crossLinkCarouselStatic → publicationList → featuredCardGrid → **contactFormSection(行业主管名片)** |
| 专业页 | `landingPage` | `/expertise` `/contact/locations` `/investors` | heroDefault/heroTitle | expertise = `pageLinkList` 20+ 条"标题+描述+Read more"平铺列表；locations = 4 组 region pageLinkList + Map view 切换；investors = intro + masonryContentGrid(含股价卡) + publicationList + 2×highlightCard + crossLinkCarousel + events + latestArticles + contactFormSection |
| 案例总览 | `articleOverview` | `/expertise/case-studies` | `heroTitle` | 标题页 + `contentCategoryFilter`×3（筛选器）+ highlightedStory + 111 案例列表 |
| 案例详情 | `caseStudy` | `/expertise/case-studies/*` ×111 | `heroFramedPicture`（纯色底+右列照片） | 面包屑+■标签+巨标+副标+地点 → metaIntro(左 meta 轨/右 lede) → **lifeCycle**（01-04 项目阶段手风琴）→ richText(Challenge/Solution/Outcome + h3) → imageWithCaption → quoteBlock → **keyMetrics**(数字卡) → "Expertise applied" 交叉链 → crossLinkFooter |
| 内容/正文页 | `hrContent` | `/about-us/our-purpose` `/contact` | heroTitle/heroDefault | metaIntro/intro + richText + contactFormSection（contact 页 = 行业主管 3 卡 + 媒体/投资者关系 2 卡） |
| 招聘 | `careerOverview` | `/careers` | `heroDefault`（image+textColor 配置） | **countrySpecificContent ×2**（国别版内容变体）→ intro + videoWithCaption + crossLinkCarousel(What makes us Fugro 5 卡) + **storyTelling**（员工故事横向件）→ imageContentCarouselOverview → numbersSectionOverview(Fugro in numbers) → crossLink(发展路径 3 卡) → featuredCountries 4 卡 → **relatedJobsOverview**(Algolia 职位) + vacancyFilter×2 |
| 新闻总览 | `mediaOverview` | `/news` | heroDefault | masonryContentGrid(Highlights) + latestArticles×5(Latest developments/Press releases/Podcasts/Long reads/Published articles) + contactFormSection |
| 新闻稿 | `pressRelease` | `/news/press-releases/YYYY/*` | heroTitle（米色底） | 面包屑+巨标 → metaIntro(Published/Location 左轨 + lede) → richText → inPageDownload → cta → contactFormSection |
| 搜索 | — | `/search` | — | Algolia InstantSearch SSR（indexName+serverState+initialUiState） |
| 职位 | — | `/careers/jobs` `/careers/jobs/[...slug]` | — | 独立路由 chunk（48+fec483df）+ Algolia vacancyFilter |
| 法律 | `landingPage` | privacy/cookie/disclaimer/purchase-terms | heroTitle | pageLinkList/richText |
| 隐藏 | — | `/llms.txt` `/robots.txt` `/sitemap.xml` `/quickscan-foundation-assessment` | — | llms.txt 是 Next page 渲染的 LLM 地图；QuickScan = €325 定价直连产品页 |

### 2.3 结构规律

- **URL 即分类学**：`/industries/{energy,water,infrastructure}`、`/expertise/{case-studies,other-expertise,satellite-positioning,...}`、`/news/{business-news,press-releases,podcasts,long-reads,events}`、`/about-us/{history,governance,sustainability,hsse}`、`/investors/*`、`/careers/*`、`/contact/*`——树形语义 URL + 面包屑同步渲染。
- **每页末尾 crossLinkFooter/crossLinkAlt**——统一"下一跳"导流区。
- **metaCategory* 分类标签 6 轴**（Region/Industry/Expertise/Technology/SubIndustry/LifeCycleStage）挂在每个 story 上，案例总览的筛选器直接吃这套 taxonomy。
- footer：logo + 6 主链列 + "Subscribe to news alerts →Sign up" + Social 4 链 + Contact 4 链 + 法务行；`dynamicFooter:true`——CMS 可配 secondaryItems 树（search 页 NEXT_DATA 可见 careers 二级树：Search jobs/Employee stories/Highlighted countries/Working at Fugro）。

---

## 3. 排版系统（CSSOM + woff2 name 表实测）

### 3.1 字族与部署

- next/font local 双族 5 文件（全部 preload，`font-display:swap`，Arial 度量 fallback：`ascent-override ~97-98%/descent-override ~20-31%/size-adjust ~102%`）：

| 族 | 文件 | 字重 | 出品方（name 表版权实测） | 角色 |
|---|---|---|---|---|
| `__aktivGrotesk_92419b` = **Aktiv Grotesk** | 2 woff2 (~10KB subset) | 400 / 500 | **Dalton Maag** ©2019-2020 | 正文、UI、按钮、导航、标签、次级标题 |
| `__review_39e939` = **Review** | 3 woff2 (~10KB subset) | 400 / Medium 500 / Bold 700 | **Commercial Type** ©2020 | 一切巨标/页标题/大数字 |

- CSS 变量 `--font-aktiv` `--font-review`；html font-size 10px（1rem=10px）。
- 分工（B 审修正后实测）：**Review = 全站基底字族 + 展示层**——`body{font-family:var(--font-review)}`，任何未覆写文本默认 Review；同时承载巨标/中大标题（CMS `HEADING_04/05` 28–30px 档也渲染 Review）。**Aktiv = CMS 正文与 UI 控件层**——`BODY_01~04`/`HEADING_07/08` token、导航/按钮/卡片文/表单。mono 缺席——全站无等宽字体。

### 3.2 字阶（3 个页型 CSSOM 全量扫描去重后）

| 声部 | 族 | 字重 | size（base→MD/LG） | lh | ls |
|---|---|---|---|---|---|
| hero 巨标 | Review | 400 | 4→7.2→**8.8rem**(=88px) | 110% | -1% |
| 页巨标 | Review | 400 | 3.6→5.8→6.8rem / 3.2→4.6→5.6rem | 110-120% | -1% |
| section 大标 | Review | 400 | 3→4→4.8rem | 120% | -1% |
| 卡/组件标 | Review | 400 | 2.8→3.2→3.6rem / 2.6→2.8→3rem | 120-130% | -1% |
| 文章节标 | Aktiv | 500 | 2.4→2.6rem（ls-2%）/ 2.1→2.4rem（ls-1%） | 135% | -1~-2% |
| lede/大正文 | Aktiv | 400 | 1.8→2.4rem | 160% | 0 |
| 正文 | Aktiv | 400/500 | 1.4 / 1.6 / 1.8rem | 140-160% | 0 |
| 按钮/标签 | Aktiv | 500 | 1.4/1.6rem | 100% | 0 |
| 小字 | Aktiv | 400 | 1.2rem | 160% | 0 |

- 规律：**每类组件字号 3 档阶梯**（XS/640→1024→1250 递进），无 clamp 流式——纯断点阶梯。注：全站 DOM 字号实测混有 px 值（12/13/14/15/18/20/24px 等），全部来自 cookie-script/MUI 等第三方注入层——**站点 JSS 层全 rem**。
- 行长：intro/正文段落在 50-65ch 栏内（2 栏布局右侧栏）；正文全是 sentence case、零大写标签（与 Saronic/Anduril 全大写 kicker 风格相反——**Fugro 的"工程感"靠排版纪律不靠全大写**）。

---

## 4. 色彩与材质（CSSOM 实测频次）

| 色 | hex | 次数 | 角色 |
|---|---|---|---|
| **墨蓝** | `rgb(1,30,65)` = `#011E41` | 193 | 主墨：正文/标题/深底/品牌底 |
| 白 | `#fff` | 74 | 浅底、深底上的字 |
| 边灰 | `#c5ccd5` / `#d7dbe1` | 72 | 1px 发丝线、描边按钮 |
| 中灰文 | `#818ea0` / `#485d76` / `#54667e` | 50 | 次级文字/breadcrumb/meta |
| **橙红** | `#FF3300` / `#E52E00` | 17 | **唯一 accent**：Contact 钮、锚点条当前态下划线、链接箭头、按钮实底、专家卡 CTA |
| 浅蓝 | `#9CD4E5` | 8 | 案例页 CMS 背景色（per-story backgroundColor） |
| 米沙 | `#eddac8` | （JS token） | 新闻稿 hero 底色（同 CMS 字段） |
| 米白 | `#f5f4f2` / `#f0f2f5` | （JS+实测） | 浅页底色（contact/locations 页） |
| 辅助 | `#41af42`/`#009D5C`/`#9d8300`/`#571825`/`#00453d` | 零星 | 状态绿/金/酒红/墨绿散件 |

- **双 accent 纪律比 Saronic 还狠**：全站实色 accent 只有橙红一个（#FF3300 主、#E52E00 hover 态）；其余全是墨蓝阶 + 灰阶 + 白。
- 表面：**radius 全站 = 2px（0.2rem）一把尺**（按钮/输入/卡片/对话框），个别 1px；无阴影文化（hover 靠变色/位移不靠投影）。
- 分割 = `border-bottom:1px solid #c5ccd5` + sticky 锚点条同款描边；无 gap:1px 工艺（与 Saronic 不同招）。
- scrim 语法：hero = 顶 `linear-gradient(#000 0→rgba(0,0,0,0) 22.4rem)` + 底 50% `rgba(0,0,0,0)→#000` opacity .7；卡片覆盖层 `rgba(0,0,0,0) 59.44%→rgba(0,0,0,.75) 93.87%`。
- **CMS 级页面底色**：每个 story 可配 `backgroundColor`/`textColor`/`invertedHeader` → 案例页浅蓝、新闻稿米沙、行业页 photo hero——同组件库不同皮肤，由编辑驱动。

---

## 5. 布局网格与节奏

- **容器**：`max-width:1440px` 居中；page gutter 响应式 **20→32(640)→40(1024)→48(1250/1600)**。
- **断点**：0 / 640 / 1024 / 1250 / 1600（mobile-first min-width；1024 是主桌面断点，202 处规则引用）。
- **2 栏编辑布局**：intro/metaIntro = 左栏 label/meta（约 1/4 宽）+ 右栏正文（约 1/2 宽 50-65ch）；全站长文页通用。
- **sticky Jump-to 条**：`position:sticky; top:0; z-index:2; 白底 + 底 1px 边`——长页必备件，左 "Jump to" 标签 + 锚点项（`<button>`，当前项橙色下划线）+ 右端可挂橙色 CTA（Contact/Map view）。移动端变横向滚动条 + CTA 下沉独立行。
- **网格**：masonryContentGrid（masonry 卡阵）、featuredCardGrid（3 列）、pageLinkList（分隔线列表行）、crossLinkCarousel（横向滑轨）。媒体卡 aspect-ratio 固定，object-fit:cover。
- **节奏**：长页 = 锚点书签块 → 内容块 → 锚点书签块 → 内容块的"书签-内容"交替节拍（anchorBarBookmark 组件就是书签哨兵），全站统一。

---

## 6. 组件与交互机制（按证据）

### 6.1 Hero 家族（4 变体，CMS 可选）

- `heroWithVideo`（首页）：满幅摄影 + 顶/底双层 scrim + 左下 Review 巨标 + 右下"使命句 + ▶ Watch our story (2 minutes)"（Vimeo m3u8 弹层）。
- `heroDefault`（行业/新闻/招聘页）：满幅摄影 + eyebrow（小字 "Energy"/"Our expertise"）+ Review 巨标。
- `heroTitle`（文本页）：CMS 底色（米白/米沙）+ 面包屑 + Review 巨标，无图。
- `heroFramedPicture`（案例页）：**CMS 底色（浅蓝）满铺** + 左列 ■标签/巨标/副标/地点 + 右列矩形照片——图文编辑版式而非照片 hero。

### 6.2 锚点叙事（全站签名机制）

`anchorBarBookmark`（隐形锚点哨兵）+ Jump-to 条按钮 → scrollIntoView 平滑滚动；当前 section 橙线下标。桌面 sticky top:0 常驻——**把长页做成"册页目录"**。

### 6.3 卡片件

- `imageReelCarousel`（首页行业）：3 大影卡（标题+描述整卡可点）。
- `featuredCardGrid`（案例/新闻）：图 + "Case study"类型标签 + h2 题 + 日期 + "All case studies →"。
- `masonryContentGrid`：异构卡阵——含 **`sharePriceCard`（实时股价：8.57 EUR +0.29(3.51%) + 时间戳，Q4 平台 feed）**、Annual report 卡、Leadership 卡、Our purpose 图卡。
- `pageLinkList`：发丝线分隔的"标题+描述+Read more"列表行（expertise/locations）。
- `keyMetrics`：number+prefix/suffix+title 数字卡（"18 Borings / 9 SCPTs / 6 weeks"）。
- `lifeCycle`："01 Planning, feasibility, conceptual design / 02 Design / 03 Construction / 04 Operations" 编号手风琴 + Show more/less + 关联 expertise 链。
- `quoteBlock`：客户引文做成 h2 级巨段（配图 variant 有）。
- `contactFormSection`：专家名片卡（照片+姓名+职务+"Contact {Name}"钮 → Marketo 表单弹层）；investors/news/行业页尾标配。
- `numbersSectionOverview`/`horizontalStoryTelling`/`storyTelling`：招聘页叙事件（员工故事滑轨/数字带）。
- **careers 整屏 sticky 展示卡**：careers 页独有机制——`position:sticky; top:65px; height:calc(100vh - 65px)` 的全视口展示卡（`.jPuvSt`/`.gEXqgB`，`css/cssom-careers.css:800-804`），滚过时卡位钉住换内容，是全站唯一接近"scroll pinning"的件。
- `cta`/`inPageDownload`/`publicationList`/`latestArticles`/`events`/`highlightCard`：出版/下载/事件标准件。

### 6.4 按钮与链接语法

- 按钮：height 3.2rem（icon 钮 32px）/4.8rem（主钮 48px）；`radius 2px`；实底橙 `#FF3300` hover `#E52E00`、描边白/灰 `#c5ccd5` 边款；`transition: background 0.2s cubic-bezier(0.45,0,0.55,1)`——**签名缓动 easeInOutSine 0.2s 全站一把尺**。
- 文本链：`Read more →` 橙色箭头链（aktiv 500 + svg arrow）；面包屑 nav 灰字 `/` 分隔。
- 表单件：Marketo 弹层（不在站内 CSS 体系）；新闻订阅走 Mailchimp。

### 6.5 动效体系

- **framer-motion 进场层**（B 审反证后在用，见 §1）：`whileInView`×5/`whileHover`×6/`variants`×47 + `useAnimation`/`animate(`/`shouldReduceMotion` + appear 容器状态机（`framerAppearId`/`motionContainerHidden|Visible`）；全站每页型 12–33 个元素带 JS 写入的 `opacity:0`+translateY 内联初态——**入场 reveal 走 viewport 触发，不是静态**。实际触发率/覆盖未量化【缺：headless 滚动探针未完成】。
- **CSS transition 层（UI 态）**：**0.2-0.25s / 0.35s（transform 滑入）/ 450ms** 三档；缓动 `cubic-bezier(0.45,0,0.55,1)`（签名）与 `cubic-bezier(0.465,0.183,0.153,0.946)`。
- `transform` 用于菜单/轮播位移；`cursor:grab` 自研滑轨；**无 scroll-snap、无 GSAP/Lenis/ScrollSmoother 证据**。
- 全站体感：轻 reveal + 快 UI 态——动效预算给"viewport 进场淡入上移 + 菜单开合 + hover 变色 + 滑轨惯性"，不做滚动叙事。

### 6.6 第三方集成点（页面内）

- Vimeo 视频弹层；Mapbox 地图视图（locations "Map view"钮）；Q4 股价卡；Algolia 搜索×2（站搜 + 职位）；Marketo 表单弹层；Beamery 人才社区；Speak Up 举报页（Dyanmics svc）。

---

## 7. 内容策略

- **首屏公式**：满幅真实现场摄影（滩涂 CPT 钻机车/USV/隧道测量/风电海缆——**不卖渲染图卖工地照**）+ Review 巨标口号（"Creating a safe and liveable world"）+ 右下使命句 + 视频入口。h1 是品牌宣言，解释在段落里——与 Saronic 同款"宣言+解释"双轨，但字体是无衬线编辑体不是字标。
- **叙事骨架**：每页 = hero → Jump-to 目录条 → intro（左 label 右段落）→ 证据件（案例卡/数字/引文/列表）→ **真人 CTA**（行业主管名片+Marketo）→ 下一跳 crossLinkFooter。"Challenge→Solution→Outcome + Key Metrics"是案例固定章法。
- **信任表达**：真人专家名片（姓名+职务+照片，比 logo 墙硬）、实时股价卡（上市公司透明感）、111 个具名客户案例（Petrobras/Codelco/Tennet/Ørsted/National Highways/KYTC）、Founded 1962 历史带、Key Metrics 硬数字。
- **CTA 密度**：中高——每长页尾必有"Get in touch for {Industry} services"专家卡，锚点条右端常挂橙 Contact；全站入口统一收敛到 `/contact` + 专家直连 + careers + portals。B2B 询盘轨完整（比 Saronic 深得多）。
- **GEO/SEO**：llms.txt、语义 URL、面包屑、metaCategory 6 轴 taxonomy、next-seo 全量 OG、多 locale 设施已备（仅 en 上线）。

---

## 8. 移动（390）差异

- header：logo + 🔍 + ☰（Get in touch/Profile 隐藏进菜单）；菜单 = 全屏白底大字列表，7 项平铺直链无钻取（同桌面）。
- **取样覆盖**：本节仅实测 home/menu/industries-energy/contact 4 个移动页型证据；expertise/news/investors/about/jobs/search 等内页 390 覆盖【缺】——"卡阵降单列""2 栏降单栏"等概括基于断点规则 + 已取样页推断。
- hero：同款满幅（高度自适应、图裁切），巨标 4rem 档。
- Jump-to 条：横向溢出滚动（overflow-x），右端 CTA（Contact/Map view）下沉为独立整行橙钮。
- 2 栏编辑布局降单栏（label 上正文下）；卡阵降单列。
- 字体阶梯全站按断点降档（无单独 mobile-only 样式面）。

---

## 9. a11y 观察（a11y 树 + DOM 实测）

- 好：语义 landmark 齐（banner/main/contentinfo）、面包屑 nav、列表语义、跳转条按钮是真 `<button>`、轮播 Prev/Next 有 disabled 态、对话框 dialog 角色（cookie 设置/视频弹层）、alt 文本真实描述（"CPT beach survey 20.jpg" 文件名级、人物照片带名）。
- 瑕疵：锚点跳转用 `<button>` 而非锚链（键盘可达但无语义目的地）；pull quote 做成 `h2` 把引文当标题级（语义怪）；案例页 metaIntro 左轨 dt/dd 未见（label/值纯视觉对）；headless 实测**同意前已加载 GTM/VWO/DoubleClick/Autopilot 等营销脚本**（同意条后到时，合规疑点值得记录，别学）。
- reduced-motion 兜底未见显式 media 查询证据【缺：全量规则未逐条审计】。

---

## 10. 证据索引

- Scenario Evidence：`evidence/{home-1440,pages-1440,pages2-1440,menu-1440,search-1440,mobile-390}.json`
- CDP inspect：`evidence/page-inspect-home.json`
- DOM：`evidence/*-dom.html`（含 menu/search 开态 DOM、390 DOM）
- 截图：`shots/*.png`（19 张精选）+ `evidence/*-{step}.png`（全量）
- a11y：`evidence/*-a11y.json`
- CSS：`css/e560ccebbdcb3971.css`（@font-face 原文）、`css/cssom-sheet-1.css`（首页运行时 516 规则原文）、`css/cssom-{casestudy,careers}.css`（页型样式原文）、`css/cssom-sheet-{2,3}.css`（cookie-script 注入，留档对照）
- JS：`scripts/home/files/origins/*/_next/static/chunks/`（13 脚本 + manifest.json；`_app` chunk = 组件库+token 全集、slug chunk = 页壳+SEO+Storyblok 接线）
- 路由/SEO 原件：`evidence/audit/all-routes.txt`（1162 URL 全表）+ `sitemap.xml`+`sitemap-1~12.xml`+`robots.txt`+`llms.txt` 原文
- 交叉审查：`AUDIT.md` + `evidence/audit/`（worker B 独立采集：framer 指纹 `framer-fingerprint.txt`、菜单探针 `menu-probe-*`/`menu-drill`、NEXT_DATA 原件 `next-data-home.json`、JSS 全量 `css-home-extracted.css`、探针脚本 `*.expr.js`/`cdp-eval.mjs`、笔记 `independent-notes.md`）
