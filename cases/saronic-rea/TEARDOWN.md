# Saronic.com — REA 全盘拆解 (2026-11-04)

> 工具：REA 6.8.0（`capture-browser-scenario` launch/headless Chromium 156、`inspect-web-page`、`analyze-web-bundle`、`export-web-scripts`）+ 直接抓取其公开 CSS/JS bundle 静态分析。
> 证据：`evidence/`（scenario Evidence JSON、逐页 DOM/screenshot/a11y）、`css/`（5 个线上样式表原文）、`scripts/home/`（REA 导出的 12 个 JS chunk + manifest.json）、`scenarios/`（场景定义）。
> 红线：未复制对方图片/视频/字体文件进本仓；字体结论依据 `@font-face` 与 next/font 命名（与既有 CDP rendered-font 实测一致）。
> 取样：1440×900 dsf1 与 390×844 dsf2、reduced_motion=no-preference、service_workers=block。

---

## 0. 一页结论

Saronic 是 **Next.js App Router + React 重交互营销站**：GSAP 3.12.5 ScrollTrigger（scrub/pin/snap 动态开关）驱动全屏影像叙事，自托管 Suisse Int'l（400/450/500 + italic）+ Suisse Int'l Mono 双族，域内隐喻色板（midnight/sunlight/twilight/**sonar 荧光绿**/beacon 橙），单一 "hamburger 抽屉菜单" 导航（无常驻平铺 nav），无站内搜索/AI/询盘表单（唯一表单是 /contact 联系表）。CTA 藏得很深——「Contact」只是菜单第 5 张卡，「Request a quote」全站不存在。

---

## 1. 信息架构与页面清单

### 1.1 路由（REA bundle 静态路由证据 + DOM 交叉验证）

| 路由 | 页型 | 主题 | 首屏 |
|---|---|---|---|
| `/` | 影像叙事首页 | 深（#1B2733 inline 覆盖） | 全屏视频 hero + 巨标 SARONIC + 右下 mono kicker/H1/双 CTA |
| `/vessels` | 舰队总览（含 #corsair/#marauder/#mirage 锚点） | 深（slate midnight200） | PageTitle "Vessels" + spear 导语 + 3 张规格格卡 |
| `/echelon` | C2 软件产品页 | 深（midnight400 近黑） | "ECHELON" 巨标 + 十字线 + mono 眉标 + 产品截图 |
| `/portalpha` | 长文叙事（船厂） | 浅（sunlight100） | mono 眉标 + "The Future of American Shipbuilding" |
| `/mission` | 宣言页 | 浅 + 方格纸纹理 | "Mission" 巨标 + beacon spear + 宣言段 |
| `/team` | 团队页 | 浅 + 方格纸纹理 | "Team" 巨标 + 导语 + Leadership 轮播 |
| `/careers` | 招聘长页 | 混合深浅交替 | HeroBig 视频 + AnchorBar 锚点导航 |
| `/newsroom` | 新闻列表 | 浅 | PageTitle + 导语（列表在 fold 下） |
| `/contact` | 联系表单 | 深 | PageTitle + intro + Form + Captcha |
| `/privacy` | 法务页 | 浅 | ContentGrid 双栏条文 |

**菜单未列页面**：`/echelon`、`/portalpha` 不在抽屉菜单（菜单只有 Newsroom/Vessels/Mission/Team/Contact/Join Our Mission 6 卡），靠首页叙事 section 与 footer 进入；footer `Technology` 栏反而有 Echelon。`/privacy` 只在 footer。另有隐藏模板：`EulaDocumentViewer`（PDF 门控+EULA 接受流程）、`PasswordGate`（整页密码锁）、`Next250`（创始人信长文模板，路由未见）。

### 1.2 导航机制（不是扁平 nav）

- `SiteHeader`：64px、grid 1fr 1fr、主题变量注入（每页 inline `<style>` 覆盖 `--fg-color/--border-color/--hover-color` 适配深浅底）。左：logo；右：`CAREERS | MENU ☰`（JobsLink+mono divider+MenuButton；窄屏 JobsLink/divider `display:none`）。
- `SiteHeader_Menu`：原生 `<dialog>`（有 `::backdrop` rgba(0,0,0,.333)），右侧滑入 `.5s cubic-bezier(.25,.25,0,1)`，关闭 `.25s cubic-bezier(.5,0,.75,1)`；宽度 `clamp(960px,55%,100vw)` → 75% → 100%。菜单本体 midnight300 底、网格 rows `64px 1fr auto`。
- `MenuLink` 卡：`aspect-ratio:1.75`、`border-radius:4px`、各自带底色（截图可见 slate/浅蓝/twilight/sonar 六色卡），标题 + hover 才浮出的描述（`opacity .8→1`、desc `translateY(5%)→0` `.125s ease-out`）；当前页卡 `box-shadow: 0 0 0 4px midnight300, 0 0 0 5px sunlight100` 双圈 + 白点。
- `MouseTracker`：header/menu/footer 的 mono 微标 `span`（sunlight-5% 底、50% 字）——实时鼠标坐标 HUD，工程感细节。
- `AnnouncementBar`：sonar 底 4 主题之一（white/midnight/sonar/beacon 全支持），grid `1fr auto`，初始 `translateY(-100%)+opacity:0` 后滑入；横向 overflow 隐藏滚动条；右侧 ×（12/20px padding）。

### 1.3 Footer

`SiteFooter`：midnight400 底（desktop 为 `position:fixed` 背景层，内容 grid `gap:1px` 露缝 = 1px 分割线视觉），cell bg midnight300；列：Logo / Technology（Vessels, Echelon）/ Company（Mission, Team, Newsroom, Contact）/ Address / connect（LinkedIn, X 外链）/ "Join Our Mission"（jobs.ashbyhq.com 外链）/ Privacy + ©2026。PrimaryNav 链接 `opacity:.5→.75` hover、current 1。

---

## 2. 排版系统（CSS 实测，非猜测）

### 2.1 字族与部署

- `next/font/local` 双族（`d7356b1e8a30747b.css`）：
  - `__Suisse_ddcbba`（Suisse Int'l）：**400 / 450(Book) / 500(Medium) × normal/italic 各 2 subset** = 12 woff2，`font-display:swap`，fallback = `local("Arial")` + `ascent-override 98.6%/descent-override 31.1%/size-adjust 100%`。
  - `__SuisseMono_68313c`（Suisse Int'l Mono）：2 woff2（单字重），同 fallback 机制。
  - 14 个 woff2 全部 `<link rel=preload>`（首屏预载全部字重——重但快）。
  - Token：`--font-weight-suisse-regular:400 / book:450 / medium:500`。

### 2.2 流式字阶（`.type--*` 工具类，`a032f8d5ce1467b6.css`）

| 档 | clamp（min→max） | lh | ls | 用途 |
|---|---|---|---|---|
| display-large | 64→300px | 1 | -.04em | 页巨标（Vessels/Mission/Team/ECHELON） |
| display-small | 40→96 | 1.1 | -.04em | 次级巨标/ClosingLine 类 |
| heading-large | 32→64 | 1.12 | -.02em | section 大标 |
| heading-small | 24→40 | 1.2 | -.02em | 卡/块标题 |
| title-large | 20→32 | 1.25 | -.02em | 卡内标题 |
| title-small | 18→24 | 1.33 | -.04em | 小标题 |
| body-large | 14→20 | 1.4 | -.01em | 正文 |
| body-small / caption-large | 14→16 | 1.5 | 0 | 辅助 |
| caption-small | 12 | 1.5 | 0 | **mono+uppercase** 全站标签声部 |
| weight utilities | — | — | — | regular/book/medium 三档 |

- caption 两档强制 `font-family:mono + text-transform:uppercase`；mono 用法 = eyebrow/kicker/spec 标签/表单元信息/MouseTracker，与 DESIGN.md §3.1 既有实测一致。
- 正文行长：`PageIntroParagraph max-width:40ch`、`NewsSection_Body 56ch`、`description p 45ch`、`Accordion content 40ch` —— 30–56ch 短行长。
- `text-wrap:balance` 广泛用于标题/引文。

### 2.3 字族分工规则（从组件反推）

- display/heading/正文/按钮/nav = Suisse；caption/kicker/eyebrow/规格标签/meta/MouseTracker/页码 = Suisse Mono uppercase。
- 桌面规格数值用 Suisse（非 mono）；mobile `SpecsList_SubValue` 改 12px mono —— 与 DESIGN.md 既有实测一致。
- italic 只存在于字体文件，页面未见使用。

---

## 3. 色彩与材质（`a032f8d5ce1467b6.css` :root）

| 族 | 值 | 角色 |
|---|---|---|
| midnight | `000:#848b92` `100:#79848f` `200:#44505c` `300:#162029`(ink) `400:#0f161c`(+rgba -3/-10/-50/-70) | 深底、深字、深灰阶 |
| sunlight | `100:#f2f6fa`(paper) `200:#d8e4eb` `300:#afc2cc`(+rgba -5/-20/-35/-50/-70) | 浅底、深底上的字 |
| twilight | `100:#89a2b0` `300:#1d4d68` | 中间蓝灰、Contact 卡等 |
| **sonar** | `#acff24` | 荧光绿：announcement bar、CTA 实底、spear、status 点、focus、JobsBanner 面板 |
| **beacon** | `#fb6b3c` | 橙：浅页 spear、表单 invalid、次要 announcement 主题 |
| `--body-bg` | `#fff` 默认，首页 inline 覆盖 `#1B2733` | 页面底色按页注入 |

- 灰阶双轨制：深底上的"灰"全部用 sunlight100 透明度派生（-5/-20/-35/-50/-70），浅底用 midnight300 透明度派生 —— 与 CFE "灰=墨/暖白派生" 同构。
- 强调色只有 2 个高饱和（sonar 绿、beacon 橙），都走"小而准"：状态点、spear、focus、按钮实底、announcement；不大面积铺底（sonar 唯一例外 = JobsBanner 面板 + menu 里 careers 卡 + announcement bar）。
- 表面质感：`border-radius` 主用 4px（按钮/菜单卡/accordion/media 卡）与 spacing-02(4px)/spacing-03(8px 大卡= VesselShowcase, 16px EulaCard)；几乎无阴影（MediaCard hover 才出 `0 2px 0 rgba(0,0,0,.06),0 14px 36px rgba(0,0,0,.16)`；menu 卡 current 用双圈 outline 不是阴影）。
- 纹理：浅页（mission/team）底为**方格纸网格**（Hero_HeroContent:before 的 inline SVG 40×40 grid path，sunlight100 低透明度）——"工程图纸"气质靠这个不是靠插画。
- scrim 语法固定：hero `linear-gradient(180deg, rgba(22,32,41,.5)→.2→.2→.9→#162029)`（渐落到页面底色）；video section `90deg .78→.55→.15`；media card `180deg transparent 45%→rgba(0,0,0,.55)`。

---

## 4. 布局网格与节奏

- **断点**：Tailwind 默认（sm640/md768/lg1024/xl1280/2xl1536）+ 设计层自定义 **960**（主桌面断点，大量 max-width:959/min-width:960）与 1280。窄屏 = ≤959（即平板也算"mobile"）。
- **spacing 刻度**：`--spacing-01..12` = 2/4/8/16/24/32/40/64/80/120/160/200px；`--spacing-section` 80→120→160 响应式；`--page-margin` 16→24→32→40 响应式（移动 16，桌面 40）。
- **容器**：HomeSection_Inner `max-width:1280px` 居中；Menu 内 nav padding spacing-05；全站边距 = page-margin 变量统一。
- **视口单位**：JS 写 `--vw/--vh`（=innerWidth/100, innerHeight/100），`--100vh/--100vw` 全屏尺寸绕开移动 URL bar；动画位移也用 vh 单位（h1 从 2vh、p 从 4vh、按钮从 8vh 升起）。
- **1px cell 网格**：VesselShowcase/SiteFooter/Accordion 都用 `display:grid; gap:1px; background:border色` 产生发丝分割 —— 全站统一的"工程蓝图"分割语法。
- 分栏规律：50/50 split（NewsSection 文/图、VesselShowcase canvas/详情、split-image 双栏）、grid 1fr+2.4fr（portalpha 编辑页 aside/content）、stat grid 2/3/4 列可配。

---

## 5. 组件与交互机制（JS/CSS 证据）

### 5.1 Hero（首页）

- `ExperienceRenderer_VideoBackground` = `position:fixed` 全屏视频底层 + `VideoColorer` 渐变；`LogoContainer` 初始 `translateY(75%) scale(.75)` → `body[data-home-ready=true]` 时 `1s cubic-bezier(.25,.25,0,1)` 升起（巨标 SARONIC 从底部放大的标志性入场）。
- `Hero` `min-height:var(--100vh)`、`margin-top:calc(page-header-height*-1)`（钻到 header 下）、`scroll-snap-align:start`；h1 是 mono kicker（"REDEFINING MARITIME SUPERIORITY"），说明句 max-width:26ch。
- 入场瀑布：h1 `.3s`、p `.4s`、buttons `.5s` 延迟 + `1~1.2s cubic-bezier(.25,.25,0,1)`，`translateY(2/4/8vh)→0`。
- `scroll-snap-align:start` + JS 动态 `scrollSnapType` 开关（chunks 里有 removeProperty/set "none" 逻辑）= 首屏向下有"吸附到下一屏"的叙事控制；`ScrollSmoother` 打进 bundle 但 DOM 无 smooth-wrapper/content（未激活实例）——**不是全程 scroll-jacking，是 scroll-snap + scrub**。
- VideoColorer/Background 的 scrim 把视频顶部压到页面底色（无缝过渡到内容区）。

### 5.2 页面入场（全站同一套）

- `PageTitle`：`clip-path:inset(0 0 100%)` + `translateY(100%)` → shown `inset(0 0 0)` `1s`（curtain-wipe 巨标揭幕）。
- `PageContent[data-shown]`：inner `translateY(10vh)+opacity` → 1s 延迟 1s。
- `Page_Headline`（portalpha）：同款 clip-path wipe `.1s` 延迟更长。
- IntersectionObserver + `data-shown` 属性是全站 reveal 机制；`PageContent` 先 `overflow:hidden` 防闪。

### 5.3 规格格卡（VesselShowcase）——A2 证据本体

- 大卡：`border-radius:spacing-03(8px)`、`overflow:hidden`、外容器 `grid 2col × 4row gap:1px bg:border#424b53`；cell bg midnight300。
- 左 Canvas cell（跨 row1-5）：产品渲染图 `width:80% margin:10% mix-blend-mode:luminosity`（去色融进深色 cell）。
- 右列：DESCRIPTION mono eyebrow → 45ch 描述 → SPECS eyebrow → SpecsList。
- SpecsList（dl/dt/dd 语义）：每项 = twilight100/sonar 小圆点 + dt 标签（sunlight100-70）+ dd 值；项间 `border-block-end:1px`（移动纵向）→ 桌面改横向多列 `border-inline-end`；状态点（sonar 实心圆）浮在卡角。
- 空规格位 = `EmptyLabel` mono 小章（sunlight-5 底 50% 字）——"参数未公开"也做成设计件。

### 5.4 按钮与 CTA

- `Button`：`border-radius:4px`、高度档 `small 2.667em / large 4em / xlarge 5em`、`padding-inline 1/2/2.5em`；hover `scale(1.02)` + **双层文字滚动**：`buttonA/buttonB` 两 span `translateY(-100%/100%)` 接力，缓动 `cubic-bezier(.87,.01,1,1)`+`cubic-bezier(.06,1.02,.12,1.02)`（带回弹的 roll）；disabled `opacity:.5`。
- CTA 体系实色：sonar 实底（"CAPABILITIES ↓"）、midnight200 实底（"SPECIFICATIONS →"）、beacon（浅页次要）、text-link 下划线；`focus-visible` = `2px sonar + 3px offset`。
- MenuLink/MediaCard CTA 文字同款 roll 动画（复用机制）。

### 5.5 叙事与媒体组件

- `HomeSection`：`data-theme=light|dark` 换整套 placeholder 变量；layouts：`stacked`（居中）/`split-image-left|right`（1fr 1fr gap80）/`header-row`/`video-background-left`（min-height 360/480/640）/`split-image-bleed-left`（min-height 720 满幅）。
- `MediaCard`：aspect 4/3、1/1 可选 + `data-span=full` 通栏；hover 图片 `scale(1.03)` `.6s`、出阴影、CTA roll。
- `NewsSection`/`TestimonialSection`：midnight200 底上 1px 边 + radius4 的"报卡"：50/50 文图、h3 24→40、header 后 sonar 点。
- `JobsBanner`：满幅摄影 + sonar 面板盖在 grid-column 3/4（面板上有装饰圆 .33em/.667em），TeamPage 变体同构。
- `AccordionSection`：midnight200 带、accordion = 2col grid gap1px 发卡、child 头 `justify-between` + sonar 点、可挂 media/video 栏。
- `LeadershipCarousel`（team）：**Splide**（`splide__track/slide` 类名）循环轮播 + 自绘 ←→ 箭头。
- `LocationsGlobe`（careers）：canvas 地球 + `Coords` 坐标层 + 卡片（Kicker/City/Region/Role/Nav/Counter）——交互地图件。
- `Form/FormFields`（contact）：InputWrapper 巨型输入（label 12→16px、input 18→**36px**）、`focus-within` sonar 边 + 右上 sonar 圆点、invalid = beacon、select 透明覆盖 + svg 箭头；`Captcha_CaptchaWrapper`。
- `EulaDocumentViewer`（未路由）：16px 圆角大卡 + iframe PDF 560px + sonar Accept/灰 Decline + 下载区 —— 已有"文档门"组件。
- `PasswordGate`（未路由）：#f2f6fa 全屏锁 + 420px 白卡。
- `VideoModalButton`：弹层视频模态（Frame + Close）。

### 5.6 动效体系

| 用途 | 时长 | 缓动 |
|---|---|---|
| 电影级入场/揭幕/图片位移 | `.8–1.2s` | `cubic-bezier(.25,.25,0,1)`（签名缓动，全站出现最密） |
| UI 过渡（卡 hover、菜单卡、按钮 scale） | `.25–.4s` | `cubic-bezier(.165,.84,.44,1)`（easeOutQuart）/ Material `(0,0,.2,1)` `(.4,0,.2,1)` |
| 文字 roll 出/入 | `.3s/.6s` | `cubic-bezier(.87,.01,1,1)` + `cubic-bezier(.06,1.02,.12,1.02)` |
| 微反馈 | `.125–.2s` | ease/ease-out |
| 菜单 | in `.5s` / out `.25s` | 签名缓动 / `(.5,0,.75,1)` |

- `prefers-reduced-motion` 有媒体查询兜底（PRM 有处理，具体覆盖未逐条审计）。
- 位移几乎全部 `translateY` + `opacity` + `clip-path` —— 无 blur/旋转噱头。

---

## 6. 内容策略

- **首屏结构**：Announcement（合同/新闻 ticker 常驻）→ 全屏视频 + 巨标 + mono kicker + 一句自解释 + 双 CTA → NewsSection（最新战报/合同）→ HomeSection 产品叙事（"Dual Use by Design" / "Introducing Port Alpha" / "One layer. Total command." / "Built to go where people shouldn't have to."）→ JobsBanner → Footer。`【观察：h2 顺序来自 home DOM】`
- H1 = mono kicker 宣言式（"Redefining Maritime Superiority"），真正大白话解释在 `<p>`（"Providing the most advanced…"）——声明式 kicker + 解释段，不是无解释的酷标题。
- CTA 密度极低：首页双 CTA 都是页内跳转（capabilities→vessels、specifications→specs 锚点）；全站无 RFQ/无 demo request/无定价——B2B 但走"品牌势能"路线，询盘收敛到 /contact 一张表 + careers。
- 产品叙事 = 逐 section 大图/大视频 + 宣言句；portalpha 页是全量长文（section number 巨标 + sticky aside + stat cells + pull quote + endnotes 学术引用装置）。
- 信任表达：合同战报走 AnnouncementBar + NewsSection（WSJ/Medium 外链），不靠 logo 墙/数字带（portalpha stat grid 有数字但是叙事用）。

---

## 7. 技术栈

- **Next.js App Router + React**（`/_next/static/chunks/app/*`、RSC `?_rsc=` prefetch；webpack runtime `webpack-*.js`；CSS Modules 哈希类名）。
- **GSAP 3.12.5**：ScrollTrigger + ScrollSmoother + Observer 打进 chunk；scrub timeline（layout/logo 渐隐）、scrollSnapType 动态开关；IntersectionObserver 做 data-shown reveal。
- **Splide** 轮播（team leadership）。
- **Tailwind**（`--tw-*` 变量群 + utility 层）与 CSS Modules 混用：token 层自定义，布局用 tailwind utility。
- 字体：next/font local woff2 ×14 全 preload + Arial 度量 fallback。
- 媒体：本地 mp4（`hero-marauder.mp4`、`Echelon-Hero.mp4`、`RoughSeas.mp4`、`pa-dissolve.mp4`，range 206 分段加载）+ jpg/png 摄影，无 CDN 三方图床。
- 分析：GA4 `G-NFG2S41SWJ`（gtag.js）。
- 表单：contact 页有 captcha 组件；招聘外链 Ashby。
- OG/分享：既有实测 og:title=`Home`（弱项，DESIGN.md 已记）。

---

## 8. 移动（390）差异

- JobsLink/divider 隐藏（只剩 MENU）；Menu 宽度 100%。
- Hero 视频 `min-width:175%` 裁切（桌面 130%）；h1 16px；page-margin 16px。
- VesselShowcase 降单列：canvas `aspect-ratio:1.2` 顶部 + 下挂描述/specs；specs 改纵向行式（dot+dt+dd 行、`border-block-end`）。
- SpecsList 数值改 12px mono；表单 input 18px（桌面 36px）。
- Footer Background 层 `display:none`（≤639）。

---

## 9. 证据索引

- Scenario Evidence JSON：`evidence/home-1440.json`、`pages-1440.json`、`batch2-1440.json`、`batch3-1440.json`、`menu-1440.json`、`mobile-390.json`
- DOM：`evidence/*-dom.html`、`menu-open-dom.html`、`{home,vessels}-390-dom.html`
- 截图：`evidence/*-1440.png`、`menu-open-1440.png`、`{home,vessels}-390.png`
- a11y：`vessels/echelon/portalpha/mission/team-1440-a11y.json`
- bundle：`bundle-home.evidence.json`（路由清单）+ `bundle-home-summary.json`
- 脚本：`scripts/home/files/.../_next/static/chunks/`（12 chunks + `manifest.json`）
- CSS：`css/{d7356b1e8a30747b,3dcc14c5e1ce1ff3,a032f8d5ce1467b6,5a3f5dc07eead32e,e95320ffc54c7cbd}.css`
- CDP inspect：`page-inspect-home.json`
