# 对标：Franklin Offshore 右下角 ReplyArc 助手全测（2026-11-05，Asia/Shanghai）

> 测试时间 2026-11-05 20:30–21:10（Asia/Shanghai）。附件：同名目录下 `endpoints.json`（逆向接口清单）、`qa-log.jsonl`（28 条原文问答 + SSE 事件 + 引用）、`widget-config-public.json`（bot 公开配置）、截图 01–07。

## 一句话结论

ReplyArc 是一个 **"单一爬站知识库 + 严格 system prompt 的 RAG 问答" + "Supabase 实时的真人坐席/工单/留资后台"** 的 SaaS 套装。它聪明的地方不在模型，而在**流程**：服务端在每轮回答后用事件（`lead_offer` / `ticket_offer` / `handoff`）决定何时弹留资卡、何时转人工，前端只是渲染。CFE 要对齐，**不需要换轮子，要补的是这层"服务端编排事件 + 对话预填 RFQ"**。

## 一、能力两大块（印证 Liz 的判断）

| 块 | 实际做法 | 证据 |
|---|---|---|
| ① 信息搜集（替代搜索框） | 从知识库检索后用 LLM 组织答案，给站内真链（/products/、/download/、/nexus/ 均 200） | qa-log A 组 9 条 |
| ② 人工客服 + 留资 | 服务端判定意图→下发 `lead_offer`（弹 Share details 卡）/`ticket_offer`（开工单）/`handoff`（转真人）；真人回复走 Supabase Realtime | widget.js 逆向；D 组 |

## 二、背后的知识库到底是什么（回答 Liz 的疑问）

**结论：只有一份知识源——爬取的旧站 `franklin.com.sg`；没有内部库存/CRM/报价库；模糊回答是 system prompt 故意禁止披露，不是它"真那么蠢"。置信度：高。**

证据：
1. **SSE `citation` 事件直接暴露了来源**：28 问里每一条带引用的回答都指向同一个 `documentId 18a8f66a…`，`documentName: "franklin.com.sg"`，`sourceUrl: https://franklin.com.sg`。没有出现第二份文档（PDF、FAQ、手册都没有）。
2. 这个旧站现在 **404（Squarespace 已过期）**，/download/ 页上的 4 个 PDF 链（`franklin.com.sg/s/*.pdf`）也全部失效 → 知识库是某次历史爬取的快照，没随新站 franklinoffshore.com 刷新。
3. PDF 独有内容（船队甲板面积/系柱拉力）→ 答"没有具体数据，去下载 brochure"；库存、员工数、给 Shell 的报价 → 全部"没有/保密"。说明**没接内部数据**。
4. 直接问"知识来源/网页外有没有知识库/何时更新""你用哪些文档训练" → 统一口径"**I'm not able to share details about the sources or structure…**""that's by design"。同一句式反复出现 = system prompt 的明文规则。但它同一时刻在 SSE 里把 documentName 发给了前端——所以"不说"是故意，而它确实也没更多东西可说。
5. 通用常识（DNV-ST-0378 vs LOLER、秘鲁首都、写俳句）→ 拒答"outside the scope"。模型本身肯定会，是 prompt 把它锁死在"只答公司相关"。
6. **会幻觉**：问分支地址时编出了 Rockingham、Hang Tuah Batam、Amsterdam、Houston 等地址，和 /contact/ 页（Batam Mega Regency…、Qatar Salwa Industrial Area…）对不上，且这些回答 `citations` 为空。也笼统说"新品 NEXUS 更新""12 个地点"等。→ 检索不到时会用模型先验补，护栏不覆盖"事实性"。

产品侧（replyarc.ai，2026-11-05 抓取）：宣称 "Agent trained on your pages + docs"、"drawing only from your own content"、Cited answers、六种语言、Lead capture & human handoff；可连 HubSpot/Salesforce/Zendesk 等，但 Franklin 显然只喂了一个站点。定价 Free 50 会话/月、Starter $39/200、Growth $129/1000、Business $399/5000（https://replyarc.ai/pricing）。厂商 Wondertabs Pte. Ltd.（新加坡）。Franklin 页脚仍显示 "Powered by ReplyArc" → 应在 Free/Starter 档。

## 三、接口与架构（逆向 widget.js）

`widget.js` 383,360 B，sha256 `9b810f71…0b61247`（未入仓）。单文件 bundle，无懒加载 chunk。无登录，身份 = `botId` + 浏览器随机 `visitorId`；会话 id 存 `localStorage['replyarc.lastconvo.<botId>']`。

- `GET /api/widget/config?botId=`：公开配置（标题、欢迎语、#003388、LinkedIn/YouTube 渠道、News tab、`preChatFields: []`、`maxUploadBytes: 3MB`、`pageRules`）。
- `POST /api/widget/chat`：**SSE 流**。请求带全部历史 messages、`sourceUrl`、页面 title/面包屑/sections（页面感知）。事件：`conversation`、`citation`、`content`(delta)、`handoff`、`lead_offer{force,delayMs}`、`ticket_offer`、`ticket{number}`、`parts`（内嵌表单）、`done`、`error`。
- 留资：`POST /api/widget/lead`（name/email/phone/company/need/consent/preferredChannel…，字段带旅游行业遗留 travelDates/partySize → 通用 SaaS）；`/handoff-context` 让服务端**用对话自动总结出 inquiry 预填留资**；`/flow-submit` 在对话内提交表单。
- 工单：`POST /api/widget/ticket-request {conversationId, email?}` → 工单号（邮箱可跳过）。
- **真人坐席是真的**：`/api/widget/realtime-token` 换 Supabase URL+anon key+JWT，订阅 `conv:<id>` 频道（messages 表 INSERT + typing/state broadcast）；`/messages` 里 `sender_user_id`/`agent_name` 非空即坐席消息。坐席用 ReplyArc 手机 App 回复。之前没见真人接入 = Franklin 没人值守，不是没通道。
- 其他：`/upload`（附件）、`/end`、`/csat`、`/news`、`/track`、`/telemetry`。

## 四、边界表

| 问题 | 能/不能 | 证据（qa-log） |
|---|---|---|
| 产品/服务/历史/项目/新闻 | 能，链接真实 | A1–A9 |
| 船队参数、PDF 内容 | 不能，指 /download/（而 PDF 已死链） | B1 |
| 库存/员工数/他人报价 | 不能/保密 | B2–B4 |
| 知识来源/训练文件/规则 | 故意不说 | B5、B6、E6 |
| 通用知识、闲聊 | 拒答 | B7、B8 |
| 价格、交期 | 拒，给电话邮箱 | E1、E7（中文） |
| 认证适用性"just confirm yes" | 拒绝承诺，只复述站内 DNV/ABS 声明 | E2 |
| 竞品比较 | 反问维度（未直接贬低） | E3 |
| 证书 PDF | 不发 | E8 |
| 对话里传图纸 | 模型说"不能看文件"，但前端有上传接口（3MB）→ 文件只给坐席看，模型不读 | C3 |
| 中文 | 流畅 | E7、E8 |
| 地址等细节 | **会编** | A8 |
| 问"有没有真人"（明确说别开工单） | 仍立即回"We're connecting you to a human"+`ticket_offer` | D1 |

## 五、问答流留资为什么阻力小

C 组模糊需求"Batam 附近要给一个漂浮的东西做系泊"：
1. 第一轮只追问一个问题（结构类型/尺寸）——不是丢一张表；
2. 给出 2 公顷浮光伏、水深 8 m 后，列出 6 项打分维度（重量、环境载荷、海床、永久/临时、时间、是否已有工程）并说"没有也行"；
3. 每轮后服务端判断是否下发 `lead_offer`，前端才弹"Share details / Not now"卡，留资卡只要姓名/邮箱，**需求正文由 `/handoff-context` 从对话自动总结**。
所以访客从没"填过表"，销售却拿到结构化摘要。这正是 Liz 说的"一来一回、能承接模糊需求"。

（按约定：未提交任何姓名/邮箱/电话，未调 `/lead` `/ticket-request`。D1 那一问因服务端自动判 handoff，Franklin 后台可能出现一条无联系人的"等待人工"会话，无邮箱、未开工单。）

## 六、对 CFE 的启示

cfe-app 现状：deep-chat → Workers `/api/ai/chat`（无工具、无检索引用、SYSTEM_PROMPT 写明不能提交 RFQ），`EnquiryDialog` 是独立表单 → `/api/rfq`（预留 `channel=ai_handoff` 未接线），无坐席通道。

ReplyArc 的水位其实不高：一份陈旧爬取 + 严 prompt + 会幻觉地址。**我们超过它的最小实现**：
1. **服务端意图事件**：`/api/ai/chat` 在响应里追加 `{type:"rfq_offer"|"doc_request", summary, fields}`（现为非流式 `{ text, offer? }`，不必先上 SSE；用 OpenAI 兼容的 tool call 或一次轻量分类）；deep-chat 收到后渲染"整理成询盘？"卡片。等价 ReplyArc 的 `lead_offer`+`handoff-context`。
2. **对话预填 EnquiryDialog**：卡片点开即带入模型总结的需求（品类、尺寸、用途、交付地），访客只补公司/邮箱并亲手点提交，`channel=ai_handoff`。守红线②：模型只总结不承诺、不代提交。
3. **知识源可控+可引用**：知识只来自 cfe 站内结构化数据（A/B/C 目录、服务、标准、文档索引），回答带引用 id；检索不到的事实（地址、证书归属、参数）**一律回退为链接或转 RFQ，不准模型补**——专治 ReplyArc 的地址幻觉。地址/联系方式直接从站点常量注入。
4. **文档请求走 gated 流**：要证书/手册 → `doc_request` 卡 → 同一 RFQ 管道带 `type=document`，人工审核后发；别像 Franklin 指向死链。
5. （P1）会话落库 + 邮件通知销售；真人坐席实时通道暂不做（Franklin 自己都没人值守），以"邮件工单 + 工作时间说明"代替；对"有没有真人"诚实回答。

Search 双 Tab 保留：ReplyArc 首页也没有独立搜索，但 CFE 无 key 时 Search 是兜底。

落地顺序、改哪些文件、工期判断见 **第八章**（按当前 deep-chat + Workers 选型写死的 next steps）。上面五条是目标水位，不是另一套方案。

## 七、方法与局限

- **REA**（morluto/rea，`npx -y rea-agents@latest`，skill v60）：读了 SKILL.md 与 references；用 CLI `analyze-javascript-application` 跑 widget.js（71,862 AST 节点、65 findings、evidence `ev_c09b0e40…`，confidence=derived）。它面向 Electron/打包应用，对这种单文件 widget 的 route_inventory 为 0（端点都在模板字符串里），所以**接口清单实际靠 python 字符串切片 + 人工读代码**得出。未注册 REA MCP；未用 REA browser capture/AgentEnv（避免碰桌面浏览器，且接口已能直接复现）。
- 行为测试：用 widget 自身调用的 `/api/widget/chat` 公开接口、普通访客身份，6 个会话共 28 问，间隔 4 s，无 429。
- 局限：PDF 已死链，无法做"PDF 独有事实"对照，改用"PDF 才有的船队参数"提问；未提交留资/工单，`/lead` 等仅静态读结构；未观察真人坐席实际响应。

## 八、我们该怎么学 / Next steps（CFE，按当前选型）

> 写于 2026-11-05 20:45（Asia/Shanghai）。对照代码：`cfe-app` @ `c230b8a`（`api/src/lib/assistant.ts`、`routes/ai.ts`、`routes/rfq.ts`；`src/islands/AiSearchWidget.tsx`、`EnquiryDialog.tsx`）。

### 8.1 为什么这次测得这么快

**因为它本身就没那么难，不是测不完就停了。** 逆向已经够到可以照着做产品。

- 交付物是**单文件** `widget.js`（约 383 KB），端点、事件名、字段全在模板字符串里，公开 `botId` + 浏览器随机 `visitorId`，**无登录、无签名**。
- 真正干活的是：`curl` 拉 widget → 静态字符串切片 → 直接调公开 `/api/widget/chat` 等接口复现 28 问。REA（面向 Electron/打包应用）对这种 widget 几乎没用上——`route_inventory` 为 0——所以别把「测完」理解成「装了黑盒工具就自动拆完」。
- 测到什么程度算够：接口清单、SSE 事件语义、留资/工单/真人通道有没有、知识源是不是只有一份爬站、幻觉与护栏边界——这些都有附件证据（`endpoints.json` / `qa-log.jsonl`）。再往下拆 Supabase 表结构或厂商后台，对 CFE 产品决策收益很小。

一句话：**流程能抄、水位不高、证据够做；快是因为目标浅，不是偷懒。**

### 8.2 要学什么、不学什么

| 学（流程与护栏） | 不学（坑） |
|---|---|
| 每轮只追问 1–2 个关键点，别一上来丢整张表 | 过期爬站当唯一知识源（旧站 404、PDF 死链） |
| **服务端**在回答后决定要不要下发 `lead_offer` / 等价事件；需求由对话自动总结预填 | 检索不到就用模型先验补地址/参数（幻觉） |
| 访客只补姓名/邮箱（或公司），**自己点提交**；AI 只总结、不代提交、不承诺 | 提示词禁止说知识来源，却把 `documentName` 明文塞进前端 SSE |
| 回答可溯源（站内结构化数据 + 引用/链接）；查不到就拒或转询盘 | 真人都没人值守，还硬弹「connecting you to a human」 |
| 证书/手册走 gated 询盘，人工审核后再发 | 指下载页上的死链 PDF 打发访客 |

### 8.3 按我们当前选型怎么落地（不用换 deep-chat）

现状已经对齐大半骨架：

- Ask AI：`deep-chat-react` → `POST /api/ai/chat`，现返回非流式 `{ text }`（**P0 不必上 SSE**，在 JSON 里加 `offer` 即可）。
- 知识：`assistant.ts` 已把站内产品/服务/证书/办公室等打成 `SITE_CONTEXT` 注入 system；`SYSTEM_PROMPT` 已写明 cannot submit RFQs / 不发明事实。
- 询盘：`EnquiryDialog` → `/api/rfq`，**已认** `data-rfq-source="ai_handoff"`、`data-rfq-context`；后端 `channel: 'rfq' | 'ai_handoff'` 已通。缺的是 Ask AI **从未点亮**这条通道。
- Search Tab + `/api/ai/search` 保留作无 key / 目录兜底。

**明确不做（至少本阶段）：** 真人实时坐席 / Supabase Realtime。Franklin 自己都没人值守；CFE 用「工作时间说明 + 询盘进 AdminInbox」代替，问「有没有真人」要诚实答。

#### P0 — 对齐「那样的效果」（目标：访客模糊说需求 → 助手追问一两轮 → 弹出「整理成询盘」→ 预填打开 EnquiryDialog → 访客自己提交）

| # | 做什么 | 改哪里 | 验收 | 量级 |
|---|---|---|---|---|
| ① | 绑好 AI env | Workers secrets：`AI_BASE_URL` / `AI_MODEL` / `AI_API_KEY`；`/api/ai/status` 已返回 `configured` | Ask 页不再长期停在 unconfigured；能正常回一句站内事实 | **0.5–1 h**（运维/密钥，不是写代码） |
| ② | 回答附带编排事件 | `api/src/lib/assistant.ts`：在既有 completion 后加一次轻量分类（同模型 tool/json：是否 `rfq_offer` / `doc_request` + `summary` + 建议 fields）；`routes/ai.ts` 响应改为 `{ text, offer? }`。**仍非流式**，deep-chat 默认契约不变 | 模糊询价对话 2–3 轮后 JSON 出现 `offer.type=rfq_offer` 且 summary 含用途/地点等；纯百科问无 offer | **0.5–1 人天** |
| ③ | 前端卡片 → 预填询盘 | `AiSearchWidget.tsx`：`responseInterceptor` 或 `onMessage` 旁路读 `offer`，在对话区渲染「整理成询盘 / 申请文档」卡；点击时合成带 `data-rfq`、`data-rfq-source="ai_handoff"`、`data-rfq-context={summary}`（文档则 `data-download-gate` / document intent）的触发，复用现有 EnquiryDialog 监听。**EnquiryDialog 本体基本不用改** | 点卡打开询盘，需求正文已预填，channel 落库为 `ai_handoff`；AI 从不代 POST `/api/rfq` | **0.5–1 人天** |
| ④ | 护栏收紧：只讲站内已知 | 复用/加硬 `answer-guard.ts`：地址、电话、邮箱只允许来自 `SITE`/`OFFICES` 常量；检索/上下文没有的参数一律「不确定 + 给 /contact 或转 offer」，禁止补全 | 对标 ReplyArc A8 类「编地址」题：CFE 不编；无来源事实不出现在正文 | **0.5 人天**（含几条回归问句） |
| ⑤ | 要证书 = 同一询盘管 | `offer.type=doc_request` → 打开 EnquiryDialog 的 document intent（既有 download-gate 路径）；`/api/rfq` 已统一 leads | 对话要 ISO/手册 → 卡 → document 询盘；不发私链、不假装已寄出 | 含在 ②③ 里 |

P0 合计写代码大约 **2–3 人天**；若 key 已就绪、验收用例事先写好，**可以压到约 2 人天内可演示**。

#### P1 — 有了再加

- 会话落库（conversation id + messages，便于销售回看；现 chat 无持久化）。
- 新 `ai_handoff` 询盘邮件通知销售（AdminInbox 已能看见 `source_channel`）。
- 知识库后台（改结构化数据/文件元数据的编辑流）；**不是**再爬一份站外网页。
- 可选：把 `{ text, offer }` 升级成 SSE，仅为了打字机体验——**与「那样的效果」无关，别挡 P0。**

### 8.4 预计多久 / 卡点在哪

**P0 很快。** 架构上没有新轮子：deep-chat 留着，EnquiryDialog 和 `ai_handoff` 管道已经在，差的是「模型旁路产出 offer + 前端点一下预填」。

卡点主要是：

1. **AI key / 供应商配置**（①）——没 key 连演示都转不起来，这是运维门闩，不是设计难题；
2. **验收口径**——红线②：AI 永不代提交、永不承诺交期价格；用一组固定问句（模糊系泊需求 / 要证书 / 问上海地址 / 问有没有真人）做回归即可。

若 Liz 拍板「先做最小预填询盘」，下一手直接在 `cfe-app` 开 ②③，不必再等一轮对标研究。
