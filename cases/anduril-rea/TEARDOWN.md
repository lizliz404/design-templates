# Anduril.com — REA 全盘拆解

> 抓取日期 2026-11-04 · 工具 REA 6.8.0（rea-agents）· 方法：CDP 被动检查 + Playwright 场景捕获 + 静态 JS/CSS 分析
> 证据目录：`evidence/`（inspect-home.json, bundle-home.json, js-app-analysis.json, scenario-*.json, style.css, uil.json, home.html）· `a11y/`（12 页无障碍树）· `shots/`（14 张视口截图 1440×900 / 390×844）· `scripts-export/`（10 个捕获脚本 + manifest）

---

## 0. 一句话结论

anduril.com 不是"做了些动效的营销站"，而是一套**自研客户端渲染引擎**：静态 HTML 壳 + 自研 SPA runtime + 自研 WebGL 场景引擎 + Sanity 内容源。设计上是一套**黑底瑞士编辑系统**：Helvetica Now Display 全字重族 + Elios 工程标签字 + 唯一功能强调色 volt `#dff140` + 严格 12 列网格 + 全大写排版纪律。所有"酷"都来自工程手段（WebGL/MSDF 字体/场景数据管线），不是视觉花招。

## 1. 技术栈（证据级）

| 层 | 事实 | 证据 |
|---|---|---|
| 渲染模型 | **纯客户端 SPA**：`<body>` 只有 noscript + loading bar + `window._CONFIG_.ASSETS_MANIFEST` + boot 脚本；无 JS 全站不可读 | evidence/home.html |
| JS 框架 | **自研**，无 React/Vue/webpack/vite 指纹；app.js 开头自带 `window.defer`、自定义 `Math.rand/round`、`Timer` patch；构建戳 `// 10/29/26 03:12PM` | scripts-export app.xxR_cdSYJQ.js；bundle-home.json |
| 资产管线 | `ASSETS_MANIFEST` 345 条，全部 `xx<hash>` 指纹化（自研 hash 方案，非 webpack）；preload 精选 | home.html manifest |
| WebGL | 自研引擎：`compiled.vs` 顶点着色器 preload、`uil.json`（490KB 场景清单，106 个命名元素：`Product3DScene_*` 覆盖几乎每个产品 + `PointGlobeScene` + `SpiralGraph`）、93 个 JSON 几何体、PBR 纹理组（albedo/ao/diffuse/normal/roughness/specular）、`_scenelayout/` cube map | uil.json、manifest |
| WebGL 文字 | 字体同时发 **MSDF/位图 atlas**（HelveticaNowDisplay-*.json + .png）→ canvas/GL 内渲染标题 | manifest |
| 平滑滚动 | **lenis**（独立 lib 17.7KB，非 scroll-jacking；无 scroll-snap） | resources |
| 时间轴动效 | **theatre.js**（98KB lib） | resources |
| 站内搜索 | **Algolia**（独立 esm lib 37.7KB；`AlgoliaPagination` 等类） | resources、style.css |
| CMS | **Sanity**（`cdn.sanity.io/images/61nocsj5/`，preconnect） | og:image、preconnect |
| 分析 | GA4 `G-CH6GNPSEPE`（gtag 内联异步） | home.html |
| 加载器 | 顶部 3px volt 进度条 `#DFF140` + 发光 peg（内联手写） | home.html |
| 无障碍 | `.GLA11y` 隐藏镜像层 — WebGL 画布内容有独立 a11y DOM（场景里的文字/标签可被读屏） | style.css |

含意：它的 hero 巨大标题、产品 3D 查看器、滚动叙事全部是**运行时渲染**；SEO 靠静态 og/标题/描述兜底 + a11y 镜像。这套是"站点即引擎"，预算与团队量级远超一般企业站。

## 2. 信息架构

### 2.1 顶层导航（桌面）

```
ANDURIL logo | Sea · Land · Air · Space · Lattice · Arsenal | Search · Company +
```

- 中央 = **域导航**（6 个 mission domain），不是产品列表；右端 Search（Algolia overlay）+ Company 下拉。
- 结构证据：`.HeaderDesktop .top-nav` = 12 列 grid，`padding:1.5rem 2rem`，logo 左 col 1/3，域居中绝对定位，右 col 12/13。
- 导航项 `.HeaderDomainLink` = `.name` + `.hiddenName` 双文本叠放 + `mask-image:var(--maskId)` → hover 做遮罩文字翻滚，不只是下划线。
- 滚动后 `.navWrapper:after` 用 `--frosted` 变量驱动 `backdrop-filter:blur(4rem)` 毛玻璃底板。
- 移动端 = `HeaderMobile` 双屏（menuScreen ⇄ subMenuScreen，`transform .3s ease-out`），域 → 子页两级钻取。

### 2.2 页型清单（61 路由实测，来源首页 DOM 链接 + 逐页捕获）

| 页型 | 路由 | 骨架（a11y 实测） |
|---|---|---|
| 首页 | `/` | WebGL hero（大写 display + Elios 标签行）→ 产品卡轨（figure + h2 名 + h4 标语 ×8）→ 特性链卡（h3+描述）→ footer |
| 产品页 | `/ghost` `/fury` `/roadrunner` `/barracuda` `/anvil` `/pulsar` `/menace-{i,t,x}` `/dive-{ld,xl}` `/sentry` `/wisp` `/spyglass` `/spark` `/bolt` `/copperhead` `/altius` `/thunder` `/steelfin` `/voyager` `/eagleeye` `/seabed-sentry` `/omen` `/bluechip` | h1 巨标 + shortTitle 眉标 + [tag] Elios + 大写描述 → ScrollToButton → 变体选择 + 规格 dl → **Product3D dialog**（"TAKE CONTROL" WebGL 交互查看器）→ Build Qualities 编号 tab（01/04 + h1 序号 + figure）→ NextLink |
| 域页 | `/air/air-dominance-and-strike` `/air/maneuver-dominance` `/air/tactical-reconnaissance-and-strike` `/land/counter-intrusion` `/sea/seapower` `/space/space` `/subterranean/future-state` `/connected-warfare` `/air-defense` | banner 锚点子导航（产品 #anchor）→ 域眉标 + h1 + [tag] + 使命陈述 → 产品块（h5 名 + 段 + Discover 链 + 图）|
| 平台页 | `/lattice/command-and-control` `/lattice/lattice-mesh` `/lattice/mission-autonomy` `/lattice/lattice-sdk` `/lattice/lattice-partner-program` | 眉标 + h1 + 双段陈述 → Kill Chain 编号序列（01 Understand / 02 Decide / 03 Act + figure）→ h2 主张 → Features 网格 → 编号深描 + 内联交叉链接 → 资源 CTA（外链 developer portal）|
| 制造 | `/arsenal` `/arsenal/arsenal-1` `/arsenal/arsenal-2` `/arsenal/arsenalos` | h1 + 口号拆行 + figure → 发现段 → 子产品链卡（h3 + 句 + 链）|
| 宣言 | `/mission` `/rebooting-the-arsenal` `/rebuild-the-arsenal` | mission: h1 + h2 宣言 + 章节卡（Our Technology/Business/Team + PT-01/02 书籍入口）；rebuild = **BookPageView** 独立微站（章节头 ChapterHeaderOne/Two/Three、BookHeader 专用导航、Elios 章节信息）|
| 新闻 | `/news` + `/news/{slug}` | NEWSROOM 眉标 + h3 题 + featured 大卡 + "All articles" + Algolia 搜索框 + 日期/题/Read more 列表行 |
| 文章 | `/news/*` | h1 + 日期 + byline + hero 图 + Share（X/LI/RD 文本按钮）→ RichText 长文（strong/em 小节头 + 引用块）|
| 招聘 | `/careers` `/early-careers` `/veteran-careers` `/open-roles` | h5 眉标 + h3 + CTA → WHO WE ARE → 价值 tab（Autonomy/Speed/Scale/Impact/Grit，01/05 编号）→ OpenRoles 列表 + MobileFilter + LocationAccordion |
| 公司 | `/anduril-leadership` `/investor-relations` `/supplier-relations` | — |
| 法律 | `/privacy-policy` `/terms-of-use` `/modern-anti-slavery-policy` `/uk-carbon-reduction-plan` | RichText |

### 2.3 Footer

logo + 3 组 accordion（Company: Mission/Newsroom/Leadership/Gear Store 外链；Work with us: Careers/Early/Veteran/Open Roles；Social: X/YT/IG/FB/LinkedIn）→ 法律链接行（Privacy/Terms/Anti-Slavery/Investor/Supplier/UK Carbon）→ `contact@anduril.com`。克制、工具化，无巨型 sitemap。

## 3. 排版系统

### 3.1 字族（@font-face + 网络加载实测）

| 族 | 声明字重 | 首页实际加载 | 角色 |
|---|---|---|---|
| **Helvetica Now Display** | 50–950 共 10 档（Hairline/Thin/ExtLt/Light/Reg/Medium/Bold/ExtBold/Black/ExtBlk）+ woff 兜底 | Regular 44.9KB / Medium 48.4KB / Bold 48.5KB | 一切（标题正文导航按钮）|
| **Elios** | 400 单档 | 12.2KB | 工程标签：产品 tag `[AAV]`、3D 点标、index 编号、quote 标记、书籍章节信息 |

- 声明 10 字重但 CSS `font-weight` 实测：**400×180、500×115、700×21**，其余零星 → 实际三档在用。
- Elios 只承担"标识与参数"，与 Saronic Suisse Mono、CFE Geist Mono 同机制。
- 自托管 `/assets/fonts/*.woff2` + woff 兜底；preload 仅 Regular + Elios。

### 3.2 根字号与流动性

- `html,body{font-size:14px}` → **1rem = 14px**。
- 断点处改根字号做流式缩放：`calc(1.25vw - 2px)`、`calc(.416667vw + 10px)`、超宽屏 24px —— rem 全站跟着走，不是每处写死。

### 3.3 核心字阶（桌面值，root 14px）

| 元素 | 字号 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| h1 | 5rem = **70px** | 700 | 105% | −.1rem (−1.4px) |
| h2 | 4rem = 56px | 400 | 105% | −.08rem |
| h3 | 3.5rem = 49px | 400 | 110% | −.07rem |
| h4 | 2.5rem = 35px | 400 | 115% | −.05rem |
| h5 | 2rem = 28px | 400 | 115% | −.02rem |
| h6 | 1.5rem = 21px | 400 | 115% | −.015rem |
| h7 | 1.25rem = 17.5px | 400 | 115% | −.013rem |
| p | 1.05rem ≈ 14.7px | 400 | 120% | −.009rem |
| button | .875rem = 12.25px | 400 | 105% | −.009rem |
| label/眉标 | .75rem→.929rem (10.5→13px) | 400/500 | 105% | **+.03/.037rem + uppercase** |

- display 越级档：`.RichText h2.display1`=16rem(224px)、`.display2`=9rem(126)、`.display3`=8.75rem(122.5)、`.display4`=7.5rem(105)；`ProductHeaderSlice h1`=9rem(126px, 700, ls **−.25rem**)；OpenRolesHero RollerCounter=16rem。
- 纪律：**全站负字距，越大越紧**；标签族反而正字距+大写。**只有 h1 用 700**，其余标题全 400 —— 层级靠字号+位置，不靠字重堆。
- 产品页描述段落 `text-transform:uppercase`（大写正文是他们风格，可读性代价自知）。
- 移动端（≤768px）字距单独收紧一档（h1 −.054rem 等），字号靠根 rem 缩放。

## 4. 色彩与材质

### 4.1 色板（CSS 实测频次）

| 色 | 值 | 用途 |
|---|---|---|
| 墨黑 | `#010101` ×132 | 全局底色（dark-first，html/body 直接黑）|
| 白 | `#fff` ×161 | 主文字 |
| **volt** | `#dff140` ×47 | **唯一强调色**，且只给功能/交互态 |
| 暖纸 | `#f1f0ea` ×20 | 浅底区块（Reboot/书页、表单）|
| 暖灰 | `#b0b0a9` ×20 | 次级文字/侧边面板 |
| 深灰面 | `#2f3234` / `#565654` / `#6c6e6b` | 卡片底、scrollbar、弱文 |
| 警示红 | `#ff3535` ×8 | 3D 警告/unsupported 状态 |
| 橄榄 | `#505544` ×3 | BookHeader 移动菜单底 |

- `--theme-color-background:#010101; --theme-color-text:#fff`（:root 只有这对 + `--is-mob` 开关）。
- **volt 纪律**：滚动按钮底、加载条、3D 激活点、选中态、开着的菜单钮、pagination/位置 pin、RichText highlight —— 全是可以点击/激活/进行中的语义，**从不做大底色块、不做装饰**。对比 CFE 钢蓝"只给动作/选中态"是同一条纪律。
- 材质 = 摄影/3D 渲染 + 噪点（`nscr_grunge_19` roughness 纹理）+ 毛玻璃（nav blur 4rem、按钮 backdrop-filter）。

## 5. 布局网格

- **12 列 grid 是绝对骨架**：`repeat(12,1fr)` 出现 73 次（header、details、footer、各 slice 全用），gutter `.357rem`=5px，页边距 `0 2rem`（28px）/ 移动 `0 1.428rem`（20px）。
- 无固定 max-width 容器 —— 全幅出血网格，文字容器用 `max(360px,25vw)` 这类视口比例限宽。
- 断点：`400 / 768(主) / 960 / 1280 / 1440 / 1920 / 2400`，其中 `max-width:768px` 出现 778 次（桌面优先，移动覆盖）。
- 间距节奏：gap 高频值 `.357rem(5) / 1rem(14) / 2rem(28) / .5rem(7) / 3rem(42) / 4rem(56)` —— 以 7px 为基元的倍数系。
- `.GridOverlay` 调试网格存在 → 网格是先做进工具链的。

## 6. 组件与交互（机制级）

| 组件 | 机制（CSS/JS 证据） |
|---|---|
| Hero | WebGL 场景（首页产品剪影/水下镜头）+ DOM 大写 display 文字层 + Elios 标签行；`.GLA11y` 镜像供读屏 |
| ScrollToButton | fixed volt 圆钮，"Scroll to next section"，分区跳转 |
| LinkButton | 文字链：opacity .6→1；`p:after` 1px 下划线，`linkbutton-underline-in` .3s ease-out + `replay` .6s（hover 丝滑下划线）；`.secondary` = 描边 pill，hover 反色填充 |
| 域导航 | HeaderDomainLink 双文本 + mask 翻滚；hover 不跳色靠透明度 |
| 编号叙事 | 产品/价值页统一 `01 / 04` 计数 + h1 大序号 + tab 切换（tab=段名，a11y 真 tab）|
| 规格表 | dl 式 label/值对（Endurance 80min / Range 15.5mi / Payload 25lbs），label 小号大写 |
| Product3D | `<dialog>` 全屏 WebGL 查看器："UNSUPPORTED DEVICE DETECTED / TAKE CONTROL / Launch Interactive View"，变体选择器，热点 `.Product3DPoint`（激活=volt）|
| 拖拽图表 | `DragBranchChartDesktop` sticky scrubContainer — 滚动 scrub 的分支图 |
| 手风琴 | `AccordionSliceItem`（volt 背景展开）+ `KeyFeatureAccordion` + `LocationAccordion` |
| 轮播 | `LinkCarousel` / `QuoteCarouselSlice` / `ProductCarouselSlice`（hover 按钮 volt）|
| 动效语言 | UI 过渡 `.3s ease-out` 为主（transform/color/opacity），.5s 次之；ambient 3–25s keyframes（inView 入场、rotation、slider、loading）；无 scroll-snap、无视差 CSS |
| 页面过渡 | `.PageTransition` fixed 层 + `.LoaderView` + volt 进度条 — SPA 导航接管 |
| 表单 | `FormInput` 自制 + multiselect 下拉（黑底白边）；checked=volt |
| Cookie/提示 | `CookieBanner` fixed、`PreviewBannerView` volt 横幅 |

## 7. 内容策略

- **文案层级**：域眉标（Elios/大写小字）→ h1 名（巨型）→ [tag]（如 `[AAV]`）→ 一段式使命陈述（大写，1–2 句，断言式，≤20 词）→ 证据/特性块 → Discover/Join CTA。
- **标语风格**：每产品一句战斗口号作 h4（"Refit the Fleet" / "Bring Mass to the Fight" / "Fight Unfair" / "Own the Edge" / "A League of Its Own"）— 产品卡 = 名字 + 口号，不解释参数。
- **CTA 克制**：页内 CTA 都是 `Discover`/`Read More`/`Explore`/`Join` 文字链；无 "Request a quote"/"Contact sales" 轨 —— B2G 军工不走询盘，唯一转化口是 contact@ 邮箱 + careers + developer portal。
- **编号系统**：01/04 计数 + 大序号贯穿产品特性、价值观、Kill Chain —— 编辑感"章节化"叙事。
- **书籍化内容**：Rebuild the Arsenal 是完整章节微站（BookPageView + 章节头 + 独立 BookHeader + Elios 元信息）— 思想领导力做成出版物不是博客。
- **新闻**：日期/题/Read more 三件套列表 + featured 大卡；文章 = 新闻稿长文 + 社交分享文本钮。
- **主体归属**：页脚法律行完整（Investor/Supplier/Anti-Slavery/UK Carbon）；Gear Store 外链独立域。

## 8. 证据索引

| 内容 | 路径 |
|---|---|
| 首页 CDP 全量（DOM 1797 节点/脚本/资源/元数据/存储键） | `evidence/inspect-home.json` |
| Web bundle 静态分析（路由视图 + 完整证据） | `evidence/bundle-home.json`（parent ev_db9ef…）|
| JS 应用静态分析（4737 findings，133MB） | `evidence/js-app-analysis.json` |
| 桌面 12 页场景（a11y+截图+URL） | `evidence/scenario-pages-desktop.json` → `a11y/*.json`、`shots/*.png` |
| 移动 3 页场景 | `evidence/scenario-pages-mobile.json` → `shots/*-390.png` |
| 全站 CSS（380KB 已美化留存） | `evidence/style.css` |
| WebGL 场景清单 | `evidence/uil.json` |
| HTML 壳 + 资产 manifest | `evidence/home.html` |
| 导出脚本 + manifest | `scripts-export/` |
| 场景定义 | `scenarios/*.json` |
