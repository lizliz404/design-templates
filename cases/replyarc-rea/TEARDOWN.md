# ReplyArc 拆解：能做什么，边界在哪

> 日期：官网与官网助手 2026-11-10，Franklin 嵌入 2026-11-05。
> 证据：`evidence/`（配置、widget.js、语言包、页面文本、Franklin 端点与问答日志）、`shots/`（19 张实测截图）。
> 标注：**文档**＝官方文档或公开配置写明；**宣传**＝营销页说法，没有独立验证；**实测**＝在助手里亲手看到；**推断**＝依据上述来源推出。

## 0. 一页结论

ReplyArc 卖的是网站「前台」的一整套：回答访客、对话中留资、需要时转给团队。核心能力是用客户自己的网站和文件回答，并标出出处；答不出就承认，再收联系方式。

护城河在后台闭环：共享收件箱、转人工后仍是同一条对话、线索评分并写明理由、把答不出的问题收集成待补内容，以及手机 App。前台问答本身并不难。

营销面比实际接入更满。首页 Logo 墙上的日历、Shopify、Zendesk、PayPal 等，在集成文档里都标着 coming soon。官网助手的频道条和预约按钮只是注册引导。把问题问得稍密，它就锁进「转人工」，此后不再回答。

## 1. 公司与产品形态

- 公司：Wondertabs Pte. Ltd.（UEN 202037320G），新加坡总部，澳大利亚、印尼、泰国另有实体。原本是做网站和品牌的设计工作室，2019 年起做数字产品。**文档**
- 形态：多租户 SaaS。营销站 replyarc.ai，应用和 widget 在 app.replyarc.ai；Next.js，前面是 Cloudflare 和 Fly.io，机房在新加坡（`/api/health` 返回 `region: sin`）。**实测**
- 交付：一条脚本 `https://app.replyarc.ai/widget.js`，挂在 Shadow DOM 宿主 `#replyarc-widget-host` 里。`data-bot-id` 或 `ReplyArc.init({ botId, apiUrl })` 选定 bot。**实测**
- 获客：`/try` 不用注册，贴一个网址，大约 10 秒生成预览 bot；免费档每月 50 次对话，不要信用卡。**宣传**
- 团队端：网页控制台，加 iOS/Android 收件箱 App。**文档**

## 2. 产品由哪几块组成

| 模块 | 做什么 | 来源 |
|---|---|---|
| AI agent | 根据自有内容回答并引用出处；只用自有内容的模式默认开启 | 文档 |
| 知识库 | 爬站并定时重爬；上传 PDF/DOCX/TXT/CSV；后台写文章；可选同步已发布的 Google 表格；切块、向量化、检索 | 文档 |
| 在线聊天 | 共享收件箱；专门的「需要人工」通道；内部备注与分配；常用回复模板；全文搜索 | 文档 |
| CRM | 对话中留资，生成联系人、公司、商机；线索评分并附理由 | 宣传＋文档 |
| 工单 | 自带工单；SLA 超时提醒 | 文档 |
| AktivReply | 主动开口：只在标记的页面，每页每次访问最多一次，访客打字时不打断，关掉后本次访问不再出现；可设置为引导成交、引导解答或保持安静 | 宣传 |
| 分析 | 对话量、留资、解决率；答不出的问题排行；实时访客监控；UTM 和广告点击追踪 | 宣传 |
| 质量 | Evals：用参考问答集给准确率、相关性、幻觉打分 | 文档 |
| 产品推荐 | 按 CSV 导入的目录在聊天里出商品卡片，价格取自目录 | 文档 |
| 开放能力 | `/v1` REST API；按事件配置的 webhook，HMAC-SHA256 签名；Zapier、Make、n8n | 文档 |

## 3. 能力矩阵（宣传 → 文档 → 配置/代码 → 实测）

| 能力 | 宣传 | 文档 | 配置/代码 | 实测 | 判断 |
|---|---|---|---|---|---|
| 用自有内容回答并标出处 | 有 | 有 | 界面有「Sources」字样 | 官网：未问到可核对的问题；Franklin：给出真实站内链接，3/3 拒绝编造 | 成立 |
| 答不出就承认，再留资 | 有 | 有 | — | Franklin：价格、MBL、CEO 均拒答，不编造 | 成立 |
| 爬站 / 上传文件 | 有 | 有 | — | Franklin 的 bot 自称不能实时浏览网页，只用业务资料 | 成立；知识库由客户自己维护 |
| 六种语言 | 有 | 有 | 公开界面语言包只有 en/zh/ms/ta/th，没有 id | Franklin 按访客语言回答中英文 | 界面五种；模型按访客语言回复 |
| 对话中留资 | 有 | 有 | `/lead`、表单流 `flow-submit` | 官网：表单姓名选填、邮箱和留言必填（未提交）；Franklin：姓名→邮箱→电话（可跳过），真实写入 | 成立 |
| 聊天里开工单 | 有 | 有 | `/ticket-request` | Franklin：生成「Ticket #10」；官网：转人工后弹出开工单（未点） | 成立 |
| 转人工 | 有 | 有 | `/handoff-context`；Supabase 实时广播 | Franklin：90 秒内无人接；官网：一问细就触发，然后锁死 | 机制真实，触发和恢复有缺陷 |
| 聊天里直接预约 | 有（「不离开聊天」） | 日历集成 coming soon；预约只是跳转到客户自己的链接 | 代码里有可选的第三方日历嵌入；官网 bot `booking: null` | 官网：只有「注册后接通」提示 | 目前是外跳 |
| WhatsApp / Messenger 收发 | 有 | 有（填 token） | — | 未测 | 文档上成立 |
| LINE / WeChat / IG / X / TikTok / LinkedIn | 有（频道条） | 未写收发接入 | 官网 bot 全部指向同一个 LINE 账号 | 只是注册引导 | 展示用的外跳链接 |
| 访客上传附件 | 有 | — | 只接受 png/jpeg/gif/webp/pdf；默认 10MB，官网 bot 设为 3MB | 未测 | 成立 |
| HubSpot / Salesforce | 有 | 单向、每小时一次、只同步有邮箱的联系人 | `hub-contact` | — | 有限成立 |
| Shopify / 日历 / Zendesk / PayPal / Mailchimp / GA4 / Segment | Logo 墙上都有 | coming soon | — | — | **尚未上线** |
| Notion / Drive / Confluence / OneDrive 导入 | — | 路线图 | — | — | **尚未上线** |
| 自带模型 key | 不支持 | 不支持 | — | — | 模型由他们托管 |

## 4. 边界清单

### 4.1 官方自己写明的「还不能」
- 集成：Shopify 授权、Zendesk、Google Calendar / Outlook / Calendly / Cal.com、PayPal、Mailchimp、自有 GA4 集成、Segment。（`text/docs_integrations.txt`）
- 知识导入：Notion、Google Drive、Confluence、OneDrive。
- 一个工作区只有一个 agent；多品牌需要多个工作区。（`text/docs_getting-started.txt`）
- 不支持自带模型 key。
- 合规：没有 SOC 2 / ISO 27001；没有自助删号；与模型商没有零数据留存协议，对方最长保留 30 天。（`text/trust.txt`）

### 4.2 实测和代码里发现的边界
- 转人工太敏感：一个问了六件事的能力问题，直接被当成「要人」。（`shots/official/03-handoff-ticket-offer.png`）
- 转人工之后锁死：点「不用了」再问，仍然只回「正在转人工」，必须结束对话重开。（`03b-after-no-thanks.png`）
- 官网频道条全指向同一个 LINE 账号（`config/official-widget-config.pretty.json`）；预约按钮只是注册引导（`04-book-appointment-tooltip.png`）。
- 印尼语界面包 404，「六语」只落实在模型回复上。
- 模型说法前后不一：Trust 页（6/11）只写 OpenAI；子处理方页（6/17）写聊天走 OpenRouter 上的 Claude，OpenAI 做向量和兜底。以较新的页面为准，但没有独立验证。
- 每次回答只带最近 20 条消息作为上下文。（Trust 页）
- 知识库深度取决于客户：Franklin 的 bot 比它的网站知道得还少，比如没有领导层信息。

## 5. 两个 bot 对照

| | 官网助手 `4d75979a…` | Franklin `19e08eab…` |
|---|---|---|
| 身份 | ReplyArc 推销自己的产品 | 一家海工客户的公司助手 |
| 开场 | 「Ask me anything about putting an AI agent on your business website」 | 公司欢迎语，没有预设问题 |
| 引导 | 三张卡：What is ReplyArc?、How much does it cost?、I have a question（表单） | 无 |
| 频道 | 九个入口加预约，全部指向 @replyarc 的 LINE | LinkedIn、YouTube |
| 主动问候 | 三句轮播 | 有问候气泡 |
| 转人工 | 一问细就触发并锁死 | 用户明说要人才触发；90 秒无人接，改为开工单 |
| 留资 | 表单：邮箱和留言必填 | 对话式：姓名→邮箱→电话（可选） |
| 工单 | 转人工后提议（未点） | 真实生成 Ticket #10 |
| 附件上限 | 3MB | 3MB |

## 6. 实测记录

### 6.1 官网助手（2026-11-10，replyarc.ai 首页）
1. 打开：标题 ReplyArc，在线状态「replies instantly」；频道条与预约按钮；三张引导卡；附件、表情、发送；底部「Powered by ReplyArc」。（`01-open-state-chat.png`、`01-open-state-page.png`）
2. 「What is ReplyArc?」：完整的卖点回答，包括自有内容训练、出处、自动留资、六语、10 分钟上线、每日未答问题摘要，以及免费档 50 次和 14 天 Starter 预览。（`02-what-is-replyarc-top.png`、`02-…-bottom.png`）
3. 一个包含六个子问题的能力问题：不回答，转人工，并提议开工单。（`03-handoff-ticket-offer.png`、`03c-handoff-full-page.png`）
4. 点「No thanks」后换个问法再问：仍只回「正在转人工」。（`03b-after-no-thanks.png`）
5. 设置面板：字号、提示音、界面语言（五种）、窗口大小（紧凑/大/全屏）、隐私链接、下载对话、结束对话。（`06-controls-panel.png`）
6. 「Book an appointment」：只有「注册后免费接通」的提示。（`04-book-appointment-tooltip.png`）
7. 「I have a question」：姓名（选填）、邮箱、留言（必填）的表单，未提交。（`05-i-have-a-question-form.png`、`05-…-page.png`）

### 6.2 Franklin 嵌入（2026-11-05，摘要）
- 公司和服务问答可用，给出真实站内链接；价格、MBL、员工数、CEO 均拒答，没有编造。
- 「我要报价」：bot 列出七个字段，接受一段自由文本，然后生成 Ticket #10。
- 对话式留资真实写入 `/lead`。
- 转人工是真实的实时通道，但 90 秒内无人接，改为开工单、邮件回复。
- 截图：`shots/franklin/01–07`、`s01`；完整记录见 `evidence/franklin/`。

## 7. 截图索引

| 文件 | 内容 |
|---|---|
| official/01-open-state-chat.png | 官网助手打开状态 |
| official/01-open-state-page.png | 首页全貌与助手位置 |
| official/02-what-is-replyarc-top/bottom.png | 卖点回答 |
| official/03-handoff-ticket-offer.png | 密集问题触发转人工与开工单 |
| official/03b-after-no-thanks.png | 拒绝开工单后仍锁在转人工 |
| official/03c-handoff-full-page.png | 转人工时的整页 |
| official/04-book-appointment-tooltip.png | 预约只是注册引导 |
| official/05-i-have-a-question-form(-page).png | 留资表单 |
| official/06-controls-panel.png | 设置面板 |
| franklin/01-homepage-launcher.png | Franklin 首页的启动按钮 |
| franklin/02-chat-open-greeting.png | 开场问候 |
| franklin/03-quote-followup-card.png | 报价跟进卡 |
| franklin/04-zh-handoff-ticket.png | 中文转人工后改开工单 |
| franklin/05-email-gate.png | 邮箱关卡 |
| franklin/06-news-tab.png | News 标签页 |
| franklin/07-launcher-pill.png | 胶囊样式的启动按钮 |
| franklin/s01-open-state.png | REA 首轮打开状态 |

## 8. 未知与下一步可测

- 官网助手：价格按钮、编造功能或不存在人名的拒答、中文提问、实际上传文件。
- 接通后 WhatsApp 和 Messenger 能否双向收发；LINE 和 WeChat 会不会一直停在外跳。
- 第三方日历嵌入在真实客户站点上的样子。
- `api.replyarc.ai/v1/openapi.json`：从本机 TLS 握手失败，没拿到。
- 控制台（`/console/`）内部：没有登录，未看。
- 线上实际走哪个模型。
