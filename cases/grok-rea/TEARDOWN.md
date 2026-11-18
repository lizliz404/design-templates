# grok.com — 公开 Web 产品拆解

> 调研日期 2026-11-18，Asia/Shanghai（UTC+8）。工具：公开发布的 REA CLI **rea-agents 6.9.0**（`npx -y rea-agents@latest analyze-javascript-application`），加上 urlscan.io 公开扫描、Jina/WebFetch 文本，以及从 `cdn.grok.com` 下载的代表性静态资源。
> 证据：`evidence/`（脱敏 CSP 与头、CSS token、公开 JS/CSS 子集、REA 摘要）、`shots/`（9 张 1600×1200 截图）。方法与限制见 `evidence/CAPTURE.md`。
> 全程只读。没有登录，没有发送消息，没有请求 `robots.txt` 禁止的 `/rest`。

---

## 0. 一页结论

grok.com 的公开 Web 不是「先营销、再进应用」的两段式站点，而是**把访客直接放进聊天画布**。未登录的 `/` 没有左侧会话栏：左上角只有标志，右上角是设置、登录、注册；画面中轴是一句会本地化、并且会轮换措辞的问候（英文「What's on the agenda today?」），下面是一条大圆角 composer。Composer 内部从左到右是「+」、可选的技能芯片（Writing、网页搜索、邮箱与日历等）、占位符、**Fast / Schnell / Rapide** 模式菜单，以及发送箭头。技能一亮起，下方建议列表会换成该技能的问题。页脚是条款/隐私微文案；许多地区会叠一层 OneTrust cookie 横幅——正文常常仍是英文，按钮跟界面语言走。

Imagine 是另一张画布：问候改成「What should we imagine?」，composer 更厚，带媒体类型、Speed、Quality 2.0、画幅，下面是能力示例的 masonry。营销与公司叙事在 **x.ai**，不在 grok.com 首页；x.ai 是 Next.js 预渲染的产品站，英雄句「Frontier AI models for everything you build。」，卡片展示 Chat / Build / Bot / Imagine / Voice。2026-11-18 官方法人名称在条款与页脚里是 SpaceX Super Intelligence LLC（SpaceXSI），产品仍叫 Grok。

前端上，grok.com 与 x.ai 都是 **Next.js App Router + Turbopack + React**。应用 HTML 的 `vary` 头带 `rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch`；静态块在 `cdn.grok.com/_next/static/chunks/`（Cloudflare R2，CORS `*`）。字体是两套并存：Grok 令牌层写 `"X-VF"` / `"X-VF Display"` / `"X Mono"`，首页却预加载 Universal Sans 400 与 **550**；字重档是 425 / 525 / 650，不是 400/500/700。强调色声明为 `#1084fe`。CSS 里已有 `--sidebar-width: 15.5rem` 和一套 `--incognito-*`，但访客截图里看不到侧栏——登录后的壳，本轮没有证据。

本轮被挡住的是：box 出口访问 grok.com HTML 会遇到 Cloudflare 托管质询；登录墙后的会话栏、模式菜单的完整选项、thinking/流式输出、分享以外的 artifacts，都没有实测。公开 JS 里有大量 `/rest/...` 字面量，只当作信息架构线索，没有去请求。

## 1. 方法与边界

- **做了**：读公开 HTML 头与 CSP、robots、sitemap、营销站文案与官方 User Guide / 条款；下载首页预加载的 JS/CSS 与字体；用 REA 6.9.0 对子集做静态分析；归档第三方公开扫描截图。
- **没做**：登录、发消息、创建账号、打开模式下拉或设置面板、本机多宽度测量、请求 `/rest`。
- **截图来源**是 urlscan 公开扫描，视口统一 1600×1200，不是本机 Playwright 多宽。Cookie 横幅未能由我们点拒绝。详见 `shots/SOURCES.md`。
- REA 解析了 20/21 个 JS 文件（`1icmc4mcrtc5t.js` 因 worker 1024 MiB 堆限制未完成），完整 Evidence 约 191MB，只保留摘要。结论里凡是「JS 字面量」都标明是静态候选。

## 2. 产品面：营销站和应用站是分开的

| 面 | 域 | 公开入口 | 这一轮看见什么 |
|---|---|---|---|
| 应用 / 聊天 | grok.com | `/`（也是访客聊天）、sitemap 中的 `/chat` `/plans` `/plans/business` `/imagine` `/project` `/automations` | 访客聊天画布、Imagine 画布与公开分享播放器。`/project` 与 `/automations` 的抓取器只拿到标题和「Skip to main content」，正文是客户端渲染，本轮没有截到已登录或完整空态 |
| 营销 / 公司 / API | x.ai、docs.x.ai、console.x.ai | `/`、`/grok`、`/api`、`/news`、`/company`、法律页 | Next 预渲染长页；产品卡 Chat / Build / Bot / Imagine / Voice；文档与定价在 docs.x.ai |
| 其它出口 | Grokipedia、X 上的 Grok、iOS/Android | 页脚与 CSP/商店链 | 只记录存在，未拆 |

x.ai 首页截图见 `shots/xai-home-2026-11-17-1600.png`。英雄区下方三张产品卡已经在「画」产品自己的 chrome：Chat 气泡、Build 里的 thinking + 工具芯片（grep / read_file）+ 「Thought for 2.8s」、Bot 的消息卡片。这是营销插图，不是 grok.com 运行时截图，不能当成应用里已实测的流式样式。

官方 [Grok.com User Guide](https://docs.x.ai/grok/user-guide)（页上写 last updated October 10, 2026）只覆盖 **Grok Business 工作区**：个人/团队工作区、左下角工作区切换、团队内分享、`https://grok.com/history?tab=shared-with-me`。这是登录后商务面的文档，不能用来描写访客首页。

## 3. 信息架构与 chrome

### 3.1 访客首页（未登录的 `/`）

证据：`shots/grok-home-en-2026-11-14-1600.png`（英文、无横幅）、`shots/grok-home-en-writing-2026-11-16-1600.png`、`shots/grok-home-de-2026-11-17-1600.png`、`shots/grok-home-fr-email-2026-11-16-1600.png`、`shots/grok-home-de-websearch-2026-11-16-1600.png`，以及 `evidence/grok.com/homepage-jina.md`。

```
[标志]                                      [设置] [Sign in] [Sign up]
                      What's on the agenda today?
         [ + ]  [技能芯片?]  占位符…                    [Fast ▾] [↑]
                      建议列表（随技能变化）
         条款微文案                                      [OneTrust 横幅]
```

稳定结构：

- **没有侧栏**。会话历史、项目、工作区切换在访客态不可见。
- 问候本地化：英文 What's on the agenda today? / 德文 Was steht heute auf dem Programm? / 法文 Qu'y a-t-il à l'ordre du jour aujourd'hui ?。WebFetch 同一天抓到问候处于轮换动画中（agenda ↔ your mind），说明这不是一句死标题。
- Composer 是大圆角条，不是多行文本框（Imagine 才是更厚的一块）。默认占位符可以是 “Ask, create images, or build anything…”，有时带 “(AI Agent)” / “(KI-Agent)”。
- **技能住在 composer 里面**，不是顶栏。已见到 Writing（改 X 帖、写邮件、校对、写文档）、Websuche / 网页搜索、E-mail et calendrier。点亮后占位符改成该技能的提示，建议列表整组替换。
- 右侧模式菜单在三种语言里都是「快」：Fast / Schnell / Rapide。下拉里还有什么（是否有 Thinking / Expert 等），本轮没有打开，未知。
- 设置齿轮在未登录时就出现，功能未知。
- 登录 / 注册是右上角两个 pill；Jina 给出 ` /sign-in?return_to=/ ` 与 `/sign-up?return_to=/`。这是登录墙的入口，不是把整页换成登录页——访客已经能看见并（从 UI 上看）使用 composer。我们没有提交。
- 页脚同意文案链到 x.ai 的条款与隐私。Jina/WebFetch 还抽出一句临时会话声明：「This chat won't appear in your history and will not be used to train models。」这句没有出现在 1600×1200 截图里，位置未知；CSS 里有完整的 `--incognito-*` 主题，说明「隐身/临时」是一等皮肤，不只是一句文案。

### 3.2 Imagine

证据：`shots/grok-imagine-en-2026-10-19-1600.png`、`shots/grok-imagine-de-2026-11-10-1600.png`、`shots/grok-imagine-share-de-2026-10-26-1600.png`。

- 顶栏多了到 Chat 的入口，其它登录/注册/设置仍在。
- 问候：「What should we imagine?」/「Was sollen wir Imagine?」
- Composer 是圆角卡片：占位「Type to imagine」或「Lass deiner Fantasie freien Lauf (KI-Agent)」；工具行有 +、Image/Bild、另外两个媒体图标、Speed / Geschwindigkeit、Quality 2.0 / Qualität 2.0、画幅 2:3、亮蓝发送。
- 下方 masonry 展示能力：Text Edit、Precise Edit、Photo Edit（BETA）、Loop、Reimagine、Smart Resize、BG Removal 等。德文扫描是同一套图的本地化标签。
- 公开分享页是「大预览 + 底部生成条」：可见 480p/720p、6s/10s/15s、取消静音。用来看播放器壳，不讨论用户生成内容本身。

### 3.3 站点地图里有、本轮没看清的面

`/plans`、`/plans/business`、`/project`、`/automations`、`/chat` 都在 sitemap 里。公开 JS 还出现 `/history`、`/plans/referral`、`/imagine/canvas/*`、`/imagine/director/*`、`/share/:id`。这些要么被登录墙挡住，要么是客户端渲染而抓取器只剩 skip-link。官方商务文档提到的左下角工作区切换，属于登录后壳，本轮不可见。

## 4. 字体、间距、token

详见 `evidence/css-tokens.md`。这里只放对设计判断有用的数。它们是 CSS 声明，不是 computed style。

- 字体两套并存：令牌层是 **X-VF / X-VF Display / X Mono**；首页预加载的是 **Universal Sans Text 400 与 550**。不要把两套合并成「只用其中一套」。
- 字重档 **425 / 525 / 650**（外加 700/800），和 550 字重文件是同一套非常规刻度。
- 常用字号：chrome 14、正文 15、display 28。内容栏 `--content-max-width: 44rem`，gutter 1.5rem。
- 间距是 4px 刻度（`--spacing: .25rem`，`--grok-space-1: 4px` 起）。
- Composer 相关圆角声明有三个：`--composer-radius: 24px`、`--grok-radius-composer: 28px`、`--page-composer-radius` 默认 29px。截图里的条确实是大圆角 pill，本轮没有测量实际像素。
- 侧栏宽度声明 `--sidebar-width: 15.5rem`。
- 强调色 `#1084fe`；浅色页面底 `#e6e5e3`（wash 为白）。
- 运动：框架 `.3s cubic-bezier(.23, 1, .32, 1)`，滑动 `.25s cubic-bezier(.22, 1, .36, 1)`。毛玻璃 `blur(36px) saturate(180%)`。隐身色相 268。

CSS 里同时能看到 `--tw-*`（Tailwind）、`--x-*` / `.x-commerce`（X 设计系统痕迹）和一组像 shadcn 的 `--background` / `--sidebar-*`。这是「仓里叠了几层系统」，不等于页面上同时用三套皮。

## 5. 前端栈与路由（从公开头和 JS 恢复）

| 层 | 事实 | 证据 |
|---|---|---|
| 应用渲染 | 动态 HTML（`cache-control: private, no-cache...`），按地区发 `x-country-code` / `x-region`（该次扫描为 CH / Zurich，界面为德文） | `evidence/urlscan/homepage-2026-11-17-ch.json` |
| 框架 | Next.js App Router：`vary` 含 rsc 与 next-router-*；JS 中有 `createInitialRSCPayloadFromFallbackPrerender`、`incomplete-app-router-transaction`、`window.next.turbopack=!0` | 脱敏响应头；预加载 JS 字符串 |
| 打包 | Turbopack：`turbopack-3mgj8ibfq21wg.js`，另有 `turbopack-worker-...` 引用 | 已下载 runtime；urlscan 观察到 worker 脚本 |
| UI 库 | React DOM（`rendererPackageName:"react-dom"`、`useState`、`react.memo_cache_sentinel`） | 预加载 JS |
| 样式 | 大量 `--tw-*` + `lightningcss` 字样，推断 Tailwind 4 / Lightning CSS 管线（推断） | 公开 CSS |
| 静态 CDN | `cdn.grok.com` 为 Cloudflare R2 公共桶，`/_next/static/chunks|media/`，immutable 一年 | 直接 GET 200；对象不存在时是 R2 404 页 |
| 安全头 | CSP `strict-dynamic` + 单次 nonce；`x-frame-options: DENY`；`frame-ancestors` 例外是 `https://x.com` 与 `https://starfleet.teachx.ai`；`permissions-policy` 允许自身 camera / microphone / pointer-lock | 脱敏 CSP |
| 边缘 | Cloudflare（HTML 对部分数据中心 IP 发托管质询；静态资源可直接下）。HTML 走 HTTP/3 | urlscan 头；本机 curl 403 |
| 营销站 x.ai | 同样是 Next + Turbopack；预渲染（`x-nextjs-prerender: 1`）；字体是 Geist Mono + XVF Variable | `evidence/x.ai/homepage-stack-notes.md` |

urlscan 结果页的 Wappalyzer 标记还有：Google Sign-in、Snowplow、Stripe、OneTrust、Google Tag Manager、Cloudflare Bot Management / Browser Insights、p5.js。这些是扫描器指纹，需与 CSP 交叉看：CSP 确实允许 Google、Stripe、OneTrust、Cloudflare Insights；p5.js 未在本轮 CSS/预加载 JS 里单独证实，保持「扫描器声称」。

客户端路由字面量（公开 JS，不是一次完整的路由表）包括 `/`、`/chat`、`/chat/:chatId`、`/imagine` 及其 `canvas` / `director` 子面、`/plans`、`/plans/business`、`/plans/referral`、`/project`、`/automations`、`/history`、`/share/:id`、`/sign-in`、`/sign-up`。分组见 `evidence/rea/static-path-groups.md`。

## 6. 网络与可见的 API 形状

只根据**公开页面自己会请求的路径**、**CSP allowlist**和**公开 JS 字面量**来说。没有对 `/rest` 做探测。

访客首页在 urlscan 网络列表里出现过的第一方路径（该次扫描自己发出，不是我们发的）：

- `/api/auth/session`
- `/api/auth/oauth/id-token/nonce`
- `/api/log_metric`
- `/_data/v1/exp/exposures`
- `/monitoring`
- `/rest/automations`（出现在扫描的请求列表里；按 robots，本案例不再请求它）

CSP `connect-src` 还允许：`wss://*.grok.com`、`wss://*.x.ai`、`wss://*.grok-sandbox.com`、`https://assets.grok.com`、`https://assets.grokusercontent.com`，以及 `wss://*.cursorvm.com` 与 `ws://localhost:*` / `ws://127.0.0.1:*`。后两项只作为允许名单事实记下，本轮没有观察到实际连接，也不解释成可利用的本地接口。

CSP 里能看出产品准备对接的第三方（同样不是一份调用教程）：Google（登录与 Drive picker）、Microsoft / OneDrive / SharePoint、Box、Plaid、PayPal / Braintree、Stripe、GitHub 头像、YouTube、Reddit、X、OneTrust、hCaptcha、Mixpanel、Hightouch、TikTok 分析，以及 `mcp-sandbox.grokusercontent.com`、`artifacts.grokusercontent.com`。`media-src` 含 `wss://*.x.ai`。这些说明产品面很宽（文件连接器、支付、语音/视频、MCP 沙箱），不能当成「访客首页已经加载了全部」。

公开 JS 里还有大批 `/rest/app-chat/conversations...`、`/rest/workspaces...`、`/rest/user-skills`、`/rest/voice/...`、app-deployer / sandbox 等字面量。它们被收在 `evidence/rea/static-path-groups.md`，用来理解登录后可能有的面（会话、工作区、技能、语音、构建与部署），**不是**一份可以打的 API 说明书。

## 7. 交互与运动

有截图或文本证据的：

- 问候语轮换/打字动画（WebFetch 抓到字母散开的中间态）。
- 技能芯片会改写 composer 占位符和其下建议列表，不像另开一页。
- 语言随 `x-country-code` 变；cookie 政策正文可保持英文，按钮本地化。这是一个值得记下的 i18n 裂缝，不是推荐。
- Imagine 与 Chat 是顶栏可切换的兄弟面，composer 形态故意不同（细 pill vs 带参数的厚卡片）。
- 声明的页面运动曲线见第 4 节；本轮没有录到滚动或侧栏开合。

没有证据、不能写进结论的：流式 token 的 caret 行为、thinking 折叠成 “Thought for Ns”（只在 x.ai 营销插图里出现）、消息列表 stick-to-bottom、登录后侧栏手势。

## 8. 未知与挡住的东西

- **Cloudflare 托管质询**挡住了从本 box 直接打开 grok.com HTML，因此没有本机 1280/1920 测量，也没有我们自己点拒绝 cookie。
- **登录墙**：会话历史、工作区切换、Projects / Automations 的完整界面、付费/Plans 页、模式菜单的其它项、设置面板，都未观察。
- 临时会话声明的屏幕位置与出现条件。
- Universal Sans 与 X-VF 在实际渲染时谁覆盖谁（只看到两套声明和谁被 preload）。
- p5.js、以及 CSP 中 `cursorvm.com` / localhost WebSocket 的运行时用途。
- 未登录用户能否真正发出一条消息、发出后会不会被拉去登录——UI 看像可以，我们没有试。

## 9. 截图索引

| 图 | 用来说明 |
|---|---|
| [grok-home-en-2026-11-14-1600.png](./shots/grok-home-en-2026-11-14-1600.png) | 英文访客首页的干净壳（无横幅） |
| [grok-home-en-writing-2026-11-16-1600.png](./shots/grok-home-en-writing-2026-11-16-1600.png) | Writing 技能芯片 + 建议列表 + 英文横幅 |
| [grok-home-fr-email-2026-11-16-1600.png](./shots/grok-home-fr-email-2026-11-16-1600.png) | 法文本地化 + 邮箱/日历技能 |
| [grok-home-de-websearch-2026-11-16-1600.png](./shots/grok-home-de-websearch-2026-11-16-1600.png) | 德文 + 网页搜索技能 |
| [grok-home-de-2026-11-17-1600.png](./shots/grok-home-de-2026-11-17-1600.png) | 最接近调研日的德文首页（对应脱敏 CSP 的那次扫描） |
| [grok-imagine-en-2026-10-19-1600.png](./shots/grok-imagine-en-2026-10-19-1600.png) | 英文 Imagine 落地与能力画廊 |
| [grok-imagine-de-2026-11-10-1600.png](./shots/grok-imagine-de-2026-11-10-1600.png) | 德文 Imagine |
| [grok-imagine-share-de-2026-10-26-1600.png](./shots/grok-imagine-share-de-2026-10-26-1600.png) | 公开分享/播放器壳 |
| [xai-home-2026-11-17-1600.png](./shots/xai-home-2026-11-17-1600.png) | x.ai 营销首页 |

来源与时间戳见 `shots/SOURCES.md`。
