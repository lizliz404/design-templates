# grok.com — 公开 + 登录态完整拆解（v2）

> 调研日期 2026-11-18，Asia/Shanghai（UTC+8）。工具：REA CLI **rea-agents 6.9.0**。
> 第一轮：公开态拆解（urlscan 公开扫描 + Jina/WebFetch + cdn.grok.com 静态资源静态分析）。
> 第二轮（本版新增）：**登录态运行时拆解** — 克隆 Grok 域会话态到一次性 CDP profile（未打印/解密任何凭据），Chrome 157 headless 1440×913，`rea capture-browser-scenario` connect 模式跑了 13 个有界场景（s0–s12），外加 `inspect-web-page` 与 `analyze-javascript-application`（456 个已加载 chunk，28MB）。
> 证据：`evidence/`（脱敏头/CSS token/静态 JS 子集）、`shots/`、`evidence/rea-runtime/`（场景 JSON + 完整 REA Evidence JSON）。方法见 `evidence/CAPTURE.md`。
> 对 Grok 本体只读：除了一条明确授权的、可丢弃的合成测试消息外没有写操作；`/rest` 只记录浏览器自己发的请求，不主动调用。

---

## 0. 一页结论

**登录后的 grok.com 是一个三栏工作台，不是聊天页。** 左栏 15.5rem 固定导航（New chat / Library / Bots / Projects / Chats 分区 + 底部账户），中栏是会话画布，右栏是一个**多标签工作台**（可开 App preview / Open a file… / Open Canvas，带命令面板式启动器「Search or type an action」）。三个栏的边界各自可拖拽（`Resize sidebar` / `Resize right pane`）。信息架构本质上是「会话」与「产物」分栏：左边管历史与对象（bots、projects），右边管这次会话产出的文件、画布、预览的应用。

**聊天发送不走 HTTP，走 WebSocket。** `wss://grok.com/ws/mgw/` 是会话网关：`session.create` 声明模型与全部能力位（`is_temporary`、`disable_artifact`、`enable_side_by_side`、`client_side_toolsets:["connectors-v3"]`），`response.create` 投递消息并带一个每次生成的 `castle_request_token` 反爬凭证；服务端用 `conversation.live.snapshot/updated` 与一串 `response.*` 事件流式回推。另有一条 `wss://grok.com/ws/bot/` JSON-RPC 通道（`bot.roster`、`bot.command`）服务 Grok Bot 生态。REST 只做数据水合（会话树 `response-node`、分页 `load-responses`、文件系统 `files/list`、每响应 `sharing?responseId=`）。

**Private（隐身）模式是协议级而不是皮肤级。** 切换后 composer 变虚线、问候换成「What's on your mind today?」、建议列表整体替换、内联提示「不进历史、不用于训练」，且 `session.create` 里 `is_temporary:true` + `disable_artifact:true` —— 能力位由服务器协商，UI 只是反映。

**模型选择被抽象成意图档。** 模式下拉是 Auto✓ / Fast / Expert / Build / Heavy 五档，默认 Auto 把路由决策留给服务端；流式期间出现「Think Harder」付费升级 chip —— 把能力缺口做成变现点。思考过程有专门 UX：流式时状态词轮换（实测「Weighing the options」），消息定格为可折叠的「Thought for 39s / 3m 47s」。

**会话支持版本分支。** 用户消息自带「Previous message 2/2 Next message」分页 —— 编辑过的消息就地分叉成版本，不离开线程；每条响应可通过 `?rid=` 深链。

**订阅结构是周配额制。** Usage 页显示「Weekly SuperGrok Limit 11%」与独立的「Weekly Grok Bot Limit 45%」（2026-11-22 重置），另有 Extra Usage Credits + Auto Top-Up；`/plans` 会 302 到 `accounts.x.ai/unify?src=grok_web_legacy_paywall_redirect` —— 付费墙由统一账户域承接，不在 grok.com 内。账号菜单极简：Settings / Help / Sign out。

公开态结论（v1 保留，未受影响）：访客首页仍是满幅聊天空态，无侧栏，问候本地化+轮换，技能芯片住在 composer 里；Imagine 是另一张画布；营销在 x.ai；Next.js App Router + Turbopack；字体 X-VF/X Mono + Universal Sans；强调色 `#1084fe`。

---

## 1. 方法与边界（v2）

**会话态获取**：桌面 Chrome 已有 grok.com 登录。把 Grok/X 域的会话状态（cookie/存储加密 blob 原样复制，不经解密、不打印值）克隆到一次性 profile `/tmp/grok-rea-profile`，以 `--remote-debugging-port=9444` 起 Chrome 157 headless，`rea list-browser-targets` 确认 target `8494FE3F…` → `https://grok.com/`。headless 直接走 `accounts.x.ai` 登录会被 Cloudflare 拦住 —— 克隆会话是绕过质询的唯一干净路径（没有尝试绕质询本身）。

**场景方式**：`capture-browser-scenario` connect 模式，每个场景一个 JSON 文件（存于 `evidence/rea-runtime/scenarios/`），逐步骤 capture screenshot+accessibility+url，事件面含 console/page-errors/network/websockets。每场景跑前验证 target identity；connect 模式不拥有浏览器、结束后留在原页面。

| 场景 | 目标 | 结果 |
|---|---|---|
| s0-smoke | connect 模式通路 | ✅ |
| s1-home-menus | 模式下拉 / + 菜单 / Connect apps | ✅ 全部菜单项 |
| s2-private-chat | Private 模式 + 发合成消息 + 流式 + 中断 | ✅（事件量超限，1676 保留/1031 丢弃 → 触发 s8 补采） |
| s3-sidebar | 侧栏分区展开 | 部分（`Show more` 重名 ×2 撞 strict mode） |
| s4-account-and-nav | 账户菜单 / Library | ✅ 账户菜单；Library 点后主区清空、URL 不变（异常，见 §8） |
| s5-routes | /imagine /history /project /automations /plans | ✅ 全路由 |
| s6-settings | Settings 12 分区逐个打开 | ✅ 全部捕获 |
| s7-plus-submenus | + 子菜单 Skills/Files/Projects | Skills ✅；Files 超时（菜单被前一步 Esc 关掉） |
| s8-send-traffic | 低体量重采发送流量 | ✅ 3044 事件 0 丢弃，WS 协议全貌 |
| s9-workbench | Toggle right pane | ✅ 工作台空态 |
| s11-pane-deep | Open a file / New tab / Open Canvas | ✅ 文件选择器、Canvas 空态 |
| s12-conversation | 打开真实会话 + 右栏 + 上下文菜单 | ✅ 完整会话解剖 |

**补采原则**：body 全开会爆事件分配上限；第二轮把 `request_body/response_body` 关掉（只留方法/URL/状态/头），0 丢弃拿到完整端点面。body 形状以 s8 保留的 WS 帧为准。

## 2. 信息架构（登录态全图）

```
┌─ 左栏 complementary "App navigation" (15.5rem) ─┬─ main ───────────────┬─ 右栏 complementary "Right pane" ─┐
│ New chat                                        │ Private ⌄(顶右)       │ Search or type an action        │
│ Library                                         │ [问候 + composer]      │ toolbar: New tab / Hide pane    │
│ Bots ▸ (New bot / Group by section /            │ 或 log "Conversation"  │ tablist "Open tabs"             │
│   Primary Bot <Bot A> / Orion / Alpha /        │                      │ New tab 组:                     │
│   Steel·Dev …)                                  │                      │   App preview* / Open a file… / │
│ Projects ▸ (New Project / Projects options)     │                      │   Open Canvas                   │
│ Chats ▸ (New chat / 会话列表 / Show more /      │                      │                                 │
│   Chats options)                                │                      │                                 │
│ ──                                              │                      │                                 │
│ [账户] <用户名> (Settings/Help/Sign out)         │                      │                                 │
│ Connect apps                                    │ Search   Notify ⌥T    │                                 │
│ ‖ Resize sidebar                                │ Toggle sidebar ⌄     │ ‖ Resize right pane             │
└─────────────────────────────────────────────────┴──────────────────────┴─────────────────────────────────┘
* App preview 只在会话上下文出现
```

设计读法：**「对象/历史在左、对话在中、产物在右」**。这和 IDE/Slack 的三栏同源，但右栏不是详情面板而是**多标签工作台**——每个 tab 是一种产物容器（文件、画布、应用预览），会话产出被明确地放进了另一个空间。这让「聊天」退回到「指挥层」的位置：生成的东西不堆在对话流里，而去右栏落位。

## 3. 左栏：导航与对象模型

- **Bots 是一级对象**：分区自带 `New bot` 与 `Group by section`，列表项有主从标记（`img "Primary Bot"` 标记 + 名称 · 职能）。每个 bot 行有 `Actions for …` 上下文按钮。Bot 不是「预设 prompt」而是具名角色（命名模式 = 名 · 职能），与用户自建并列。
- **Projects 与 Chats 平级**：各带 `New …` 快捷与 `… options`；Projects 空态在 `/project` 路由下有 All/Chats/Imagine 三个 tab —— **项目可以横跨聊天和 Imagine 两类资产**。
- **Chats 列表是分页窗口**：`Show more` 增量展开；`Actions for {title}` 菜单 = **Share / Pin / Rename / Add to Project / Mark as Unread / Copy Conversation ID / Open in new tab / Archive**（9 项，分享置顶都在就地）。
- **底部只有两个固定物**：账户菜单（极简三项）与 `Connect apps`（直接开 Settings → Connect Apps）——把「扩展能力」钉在了导航最显眼处。
- 侧栏可拖拽（`separator "Resize sidebar"`）；`Toggle sidebar [expanded]` 在顶右，意味着侧栏可以完全收起让位给中栏。

## 4. 中栏：composer 即命令面

### 4.1 Composer 构成（a11y 实测序）

`+`（"Add files, skills, and connectors"）→ `Model: Auto ⌄` → `Dictate` → `Voice mode` / `Send`；上方 `Private` 切换；下方 `list "Suggested"`。

- **`+` 菜单**：Upload a file / Projects / Skills / Add connector / Files —— 输入物的三类来源（本机文件、项目上下文、连接器数据）被收敛进一个菜单，而不是平铺在输入条上。技能住在这里而不在顶栏：能力发现在输入点完成。
- **模型档**：`Auto✓ / Fast / Expert / Build / Heavy`。五档是**意图词**不是模型号——Build 对应工程任务、Heavy 对应深推理，服务端再做路由。默认 Auto = 默认不让你选模型。
- **建议列表随模式整体替换**：普通态是 Create an image / Check email and calendar / Search the web（也随上下文轮换）；Private 态换成 Create an image / Write or edit / Design a presentation；Imagine 态换成 `list "Image and video templates"`（Segmentation、Photo edit、Reimagine、Smart resize、Background removal、E-commerce photos、Photo collage、Profile picture、Hero product reveal、Icon maker、Product copy…）——**建议即模式说明书**。
- `Dictate` 与 `Voice mode` 是两个不同入口：听写（进 composer 文本）与通话式 voice。
- 发送态下 `Send` 替代 `Voice mode` 出现在最右槽位 —— 同一位置按上下文换键。

### 4.2 Private 模式（协议级）

切换按钮的可访问名在 `Switch to Private Chat` ↔ `Exit Private Chat [pressed]` 间翻转。进入后：

- composer 变**虚线边框**（视觉层）；
- 内联文案：「This chat won't appear in your history and will not be used to train models.」（诚实条款写在输入点，不在 FAQ）；
- 问候与建议整组替换；
- `session.create.x_grok`：`is_temporary:true` + `disable_artifact:true` —— 服务器知情且禁用产物生成，不是前端遮罩。

### 4.3 流式与中断（实测）

- 发送后状态词轮换显示思考阶段：实测 `Weighing the options`（s2/s8 均见）。
- 流式期间 composer 上方出现 **`Think Harder` 付费 chip** —— 在能力缺口出现的瞬间做 upsell。
- 消息定格后，思考块折叠为 `button "Thought for 39s"`（实测最久 `3m 47s`）。
- **发送新消息即中断旧响应**：s2 中第二条发送后，第一条以 `Request was interrupted by the user` 收尾 —— 中断是隐式的（新消息优先），没有独立 stop 按钮被 a11y 暴露。

## 5. 右栏：工作台（产物空间）

空态结构：

```
complementary "Right pane"
  button "Search or type an action"      ← 命令面板入口（pane 级 cmd-K）
  toolbar "Pane actions": New tab / Hide pane
  group "New tab": Open a file… / Open Canvas   （会话内多一项 App preview）
  separator "Resize right pane"
```

- **多标签**：`tablist "Open tabs"`，tab 可独立 Close；`New tab` 回到三选一空态 —— 工作台是「一窗多产物」。
- **Open Canvas** 空态文案：*No canvas yet — Open or start a chat conversation to use the Imagine canvas.* → Canvas 是**绑定会话的**产物（Imagine 画布挂在对话上，不是独立白板）。
- **App preview** 只在会话上下文出现：与 `/rest/app-chat/app-deployments?latestByConversationId=` 对应 —— 会话若产出了可部署应用，工作台直接给预览位（本例 404 = 无部署，按钮仍在）。
- **Open a file…** 点了无 a11y 变化（系统文件选择器，不在 DOM 里）；会话级文件走 `/rest/conversations/files/list?conversationId=&path=/` —— **每个会话有一棵虚拟文件树**（对应 localStorage `filesystem-unread`）。
- `Hide pane` 是按钮名（开启态下 `Toggle right pane` 从 a11y 消失）——toggle 的 name 是状态相关的。

## 6. 会话页解剖

URL：`/c/{conversationId}?rid={responseId}` —— 响应级深链。

- `h1` 会话标题 + `Conversation Actions` 按钮；`log "Conversation"` 里 `article "You"` / `article "Grok"` 成对。
- 用户消息：`Edit message` / `Copy message` + **版本分页器**（`Previous message` `2 / 2` `Next message [disabled]`）——编辑产生分支版本，左右翻，不离开线程。
- Grok 消息：`Thought for Ns` 折叠块 + 完整 markdown（h3 / strong / inline code / 嵌套列表实测渲染）。
- 会话水合调用链（实测时序）：`conversations_v2/{id}?includeWorkspaces&includeTaskResult` → `conversations/files/list` → `app-deployments?latestByConversationId` → `conversations/{id}/response-node`（**会话是树结构**，response-node 即分支图）→ `POST …/load-responses`（分页）→ `conversations/{id}/sharing?responseId=` **逐条响应**查分享态。

## 7. 路由面（实测）

| 路由 | 实测 |
|---|---|
| `/` | 登录态主画布（问候轮换：agenda ↔ your mind） |
| `/imagine` | **重定向到 `/`**，composer 切 Image and Video 模式 + 模板建议组 —— Imagine 不是独立页面，是 composer 的一个模式（`useImagineModeStore` 持久化） |
| `/history` | 全量历史：h1 History + `Delete All` + searchbox + `/c/{id}` 链接列表（相对时间 2h/1d/2d）+ 行级 Actions |
| `/project` | Projects 页：排序（Last edited）、`Create new`、`tablist "Project kinds": All/Chats/Imagine`、空态 + 模板画廊（Legal Document Reviewer / Cover Letter Writer / Writing Assistant / Fitness Advice） |
| `/automations` | **无页面**，302 行为是打开 Settings dialog 的 Automations 分区 |
| `/plans` | 302 → `accounts.x.ai/unify?redirect=grok-com&src=grok_web_legacy_paywall_redirect` —— 付费墙在统一账户域；本 profile 被 Cloudflare 拦在 accounts.x.ai（记录为边界） |
| `/c/{id}` | 会话页（§6） |

- `Library`（侧栏）点击后主区清空、URL 不变 —— 疑似面板态/空态或导航未生效，标为**未解决**（§8）。
- 顶右 `Search` 与 `region "Notifications alt+T"` 是全局命令/通知入口。

## 8. Settings 架构（单 dialog，12 分区）

Settings 是一个模态 dialog（`dialog "Settings"`，`/automations` 之类的路由直接落到对应分区）：

| 分区 | 实测内容 |
|---|---|
| Account / Appearance / Notifications / Billing | 常规（本轮截图存证） |
| **Behavior** | `Require Ctrl+Enter to Submit`、`Auto-Scroll`（跟随流式到底）；Voice：**声音 Ara**、Speed、**Personality: Assistant**、Dictation Refinement: Tidy up（听写润色档） |
| **Customize** | `Customize Grok's Response`（人格/回复定制，档 Default）+ **Agent Library**（保存的自定义 agents，可 Create） |
| **Connect Apps** | 连接器目录实测：Gmail / Drive / Calendar / GitHub / Finance / Notion / X Ads / BigQuery（`connectors/list-v2` + `list-available-v2`） |
| **Skills** | Personal：`New Skill`（「teach Grok a repeatable task it follows whenever a request matches」—— 声明式技能）；Built-in：**docx / pdf / pptx / xlsx** —— 内置办公文档生成技能 |
| **Automations** | searchbox + 类目 tablist（All/News/Productivity/Finance/Research/Lifestyle）+ `Your automations`（本号 3 个在跑）+ Featured 画廊（Custom/Morning Brief/Daily Stock Tracker/AI News Digest/Daily Planner…，逐个 Add）—— **定时任务是模板市场制** |
| **Bots** | Bot 管理（与左栏 Bots 分区对应） |
| **Data Controls** | `Improve the model`（训练数据开关，默认开）、`Personalize with conversation history`（**明示「Private chats are never stored」**）、`View memory from your chats`、**`Import memory from other AI providers`**（把别家 AI 的记忆迁过来 —— 抢用户沉没成本的设计） |
| **Usage** | `Weekly SuperGrok Limit` 11%（2026-11-22 重置）+ `Weekly Grok Bot Limit` 45%（**Bot 独立配额**）+ Extra Usage Credits 余额 $0.00 + Buy Credits + Auto Top-Up —— 周配额 + 信用点双轨 |

## 9. 运行时协议面（s8 零丢弃实测）

### 9.1 WebSocket（两条）

**`wss://grok.com/ws/mgw/?uid={userId}`** —— 会话网关，事件协议：

- 客户端 → `session.create`：`{model:"auto", x_grok:{protocol_capabilities:["conversation_attached","custom_methods_v1","workspace_servers_v1"], use_chunk:true, accept_interleaved_phases:true, client_side_toolsets:["connectors-v3"], keep_context:false, is_temporary, enable_side_by_side, force_side_by_side, enable_image_generation, image_generation_count:2, disable_text_follow_ups, disable_artifact, force_concise}}` —— **全套特性协商在会话建立时一次性声明**。
- 客户端 → `response.create`：`{item:{type:"message",role:"user",x_grok:{client_message_id,input_chunks:[{text:{text:"…"}}]}}, castle_request_token:"…"}` —— 消息分块输入 + 每次发送一个 Castle 式反爬 token。
- 客户端 → `presence.update {visible:true}` —— 在线心跳。
- 服务端 → `conversation.live.snapshot` / `conversation.live.updated` / `session.*` / 一串 `response.*` 增量帧（约 300B/帧的 token 流）。

**`wss://grok.com/ws/bot/?uid={userId}`** —— Bot 通道，JSON-RPC 2.0：`bot.roster`（agent 列表）、`bot.command`（按 agentId 下发）；首帧声明 `{protocol_version:"1.0.0",kind:"bot_client",capabilities:["grok-bot-…"]}`。

### 9.2 REST（浏览器自发，/rest/*）

会话：`app-chat/conversations`（pageSize/kind=IMAGINE|IMAGINE_DIRECTOR/filterIsStarred/excludeProjects 四组参数证明会话有类型与星标维度）、`conversations_v2/{id}`、`response-node`、`load-responses`、`sharing`、`conversations/files/list`、`app-deployments`。
外围：`workspaces`+`workspaces/shared`、`skills`/`user-skills`、`assets`、`automations`、`user-settings`、`system-prompt/list`(POST)、`suggestions/profile`、`notifications/list`、`plan/profile`、`products?provider=SUBSCRIPTION_PROVIDER_STRIPE`、`grok-business/manageable-admin-teams`+`personal-team-conversion`、`connectors/list-v2`/`list-available-v2`/`finance/connections`。
平台：`/api/auth/session`、`/api/experimentation/config`、`/api/log_metric`。

### 9.3 Connect-RPC

`grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig`、`commerce.prepurchase.v1.PrePurchaseService/CreateCheckoutSession` —— 计费/结算走 protobuf-over-HTTP 服务风格，与 REST 并存。

### 9.4 遥测（一方域代理）

`/mp/track` `/mp/engage`（Mixpanel 走自家域名反代理）、`t.co` + `analytics.twitter.com`（X 广告像素）、`wa.appsflyersdk.com`、`tags.srv.stackadapt.com`、`m.stripe.com/6`（Stripe 风控指纹）、Sentry replay。第三方遥测全部做了域归一或 CDN 化。

## 10. 前端与存储

- Next.js App Router + Turbopack（v1 已证），登录态懒加载量巨大：**456 个 JS chunk、28MB**（清单 `evidence/rea-runtime/bundle-manifest.tsv`，源码在 `bundle/`）。`analyze-javascript-application` 全量分析在跑（~160/456 时内存受限推进缓慢）；结论标注「进行中」。
- localStorage（键名，值未打印）：`chat-preferences`、`settings-store`、`useImagineModeStore`、`filesystem-unread`、`build-mode-intro-dismissed`、`xai-ff-bu`（feature-flag bucket）、`chat_message_count`、`visited-imagine3`、`desktop-shell.bots-section-shown:<uid>`、`grok-bot-mention-directory:<uid>` —— UI 态与偏好全部本地持久化；Imagine 模式状态有独立 store。
- IndexedDB：`atlas-kv`（大概率本地 KV 层）、`mixpanelBrowserDb`。
- 设计 token（v2 系统抽取，`evidence/rea-runtime/css-tokens-authed.md`）：登录态 14 个 CSS chunk 共 **1008 个自定义属性**。UI accent 是 **`#299fff`** 族（hover `#47acff`；v1 的 `#1084fe` 实为联系人蓝）；三族灰阶并存（neutral 纯灰 / gray 冷板岩 / warm-gray 暖灰）；暗色表面是**暖黑** `#131211→#23211f` 独立系统（294 个 dark 块）；incognito = `--incognito-hue` 参数化紫色族；联系人 8 色用 **OKLab** 定义；边框三级透明发线（l1/l2/l3 = 6/10/15%）；composer 圆角 12px；问候轮换动画 token 化（blur 1.5px + 上移 3px + 150ms quint）；`--x-*` 是 X commerce 内嵌的整套 Chirp 设计系统。字体令牌绑定 Universal Sans + **IBM Plex Mono**。

## 11. UX 决策读法（expert-designer 视角）

1. **三栏 = 对象 / 对话 / 产物分层**。把文件、画布、应用预览收进右栏 tab，对话流保持纯文本流 —— 防止「产物混进对话」造成的长上下文滚动负担。Canvas 空态文案明确告诉你「它属于某个对话」，产物不脱离来源。
2. **Composer 收敛所有输入通道**。技能、文件、项目、连接器全在 `+` 一个入口，模式在右侧一档菜单 —— 输入条是唯一命令面，顶栏保持干净。代价是发现层数 +1，用建议列表补回。
3. **模式 = 意图词，不是模型号**。Auto 默认把路由留给服务端；Build/Heavy 描述任务形态。配合流式中的 `Think Harder` upsell，把「想要更多算力」变成就地转化点 —— 这是把定价档嵌进任务流而非定价页的做法。
4. **Private 模式的诚实设计**。虚线 composer + 问候替换 + 建议替换 + 内联条款 + 协议级 `is_temporary`/`disable_artifact` —— 五个信号通道同时变，用户不会误以为自己还在普通会话。Data Controls 里再写一遍「Private chats are never stored」——条款在触点重复而非集中藏。
5. **消息版本分页器**。编辑不覆盖、左右翻版本 —— 把「分支对话」这个 agent 产品的核心复杂度压缩成 `2 / 2` 两个键，门槛极低；`response-node`/`?rid=` 证明底层就是图结构，分页器是图的平民化表达。
6. **Automations/Skills/Bots 模板市场制**。Featured 画廊 + 类目 tab + 一键 Add —— 用内容产品的冷启动打法做 agent 能力分发；「New Skill = 描述一个可重复任务」把技能创建门槛压到一句话。
7. **周配额 + 双轨计量**。Weekly limit 而非月额度 → 制造每周回流节奏；Grok Bot 单列配额 → Bot 是第二增长曲线的独立账本；credits + auto top-up 兜底超用。
8. **Import memory from other AI providers**。在数据控制里放「把别家记忆迁过来」—— 主动消解迁移成本，抢的是竞品积累的用户上下文，这是增长设计里少有的攻击性入口。
9. **中断 = 新消息优先**。没有独立 stop 键的 a11y 暴露，发送即中断（`Request was interrupted by the user`）—— 极简交互，代价是无法「停止并保留」；适合快迭代对话，弱于长任务。
10. **付费墙外迁**。`/plans` 跳 `accounts.x.ai/unify` —— 统一账户域承接所有付费转化，grok.com 本体只管产品面；工程上把支付/合规域从产品域剥离。

## 12. 未知与没采到的

- **`/plans` / 付费流**：accounts.x.ai 对 headless profile 出 Cloudflare 拦截页（Ray ID 已存档），未进入结算流程。
- **Library 点击后主区空、URL 不变**：疑似面板态或空态；未解。
- **Open a file… 的文件选择器**：不在 DOM/a11y（系统级或已瞬间关闭），其 UI 未捕获；文件浏览器本体未截图。
- **Canvas 有内容时的形态**：账号会话没有现成 canvas，`App preview` 同理（`app-deployments` 404）—— 产物态右栏只有空态证据。
- **Grok 回复的行内动作**（重试/赞踩/朗读/分享）：a11y 未暴露，可能 hover-only；未证实存在与否。
- **voice 通话面、上传流、share 对话框、通知中心面板、Group by 菜单项、Projects/Files 子菜单内容**：步骤失败或未触发，未捕获。
- **JS 深分析**：456 chunk 的 `analyze-javascript-application` 运行中；静态 `/rest/*` 字面量与 feature flag（`xai-ff-bu`）的映射未完成。
- **暗色主题、窄宽/移动响应、快捷键表、Business workspace 切换**：未触发。CSS 有 `--incognito-*` 证明暗色相关变量存在但未采样。

## 13. Evidence 索引（v2 新增）

| Evidence ID | 内容 |
|---|---|
| `ev_9a6b41d7…f45b6` | 登录态首页 inspect（a11y/storage/scripts 清单） |
| `ev_7ef545aa…43ed` | s1 菜单：模型档 / + 菜单 / Connect apps 壳 |
| `ev_ec1da927…36ba` | s2 Private + 发送 + 流式 + 中断（事件截断） |
| `ev_7fa9d62c…dda89` | 被动观察尝试（attach_limited，0 事件 —— 教训：scenario 内采） |
| `ev_da8085a9…60fd` | s8 发送流量零丢弃（WS 协议全貌） |
| `ev_578d95e6…11ec` | s3 侧栏（部分） |
| `ev_6cd12f8f…602c` | s4 账户菜单 / Library |
| `ev_59109a37…2d2e` | s5 五路由 |
| `ev_11674062…90e` | s6 Settings 12 分区 |
| `ev_4f9e4751…9c20` | s7 + 子菜单（部分） |
| `ev_8c716e79…09eb` | s9 右栏工作台 |
| `ev_f383e5fc…425c` | s10（schema 失败，作废） |
| `ev_fa1917cd…1dc5` | s11 首试（ellipsis 名失配，作废） |
| `ev_dad3b694…5658` | s11' Open file/New tab/Canvas |
| `ev_747533c7…8b11` | s12 会话解剖 + 上下文菜单 + 右栏 |

原始件：`evidence/rea-runtime/out-*.json`（完整 Evidence）、`scenarios/*.json`（方法留痕）、`bundle/`（456 chunk）、`bundle-manifest.tsv`（URL→sha256）。

隐私注记：场景 a11y/截图含真实会话标题与账户邮箱，属本地证据层；对外/入库前需按 CAPTURE.md 的红action 规则处理。
