---
name: agentic-ui-primitives
description: >-
  Verified landscape of open-source agentic UI component wheels: the
  four-layer coordinate (state primitives vs chat frameworks vs
  protocols/runtimes vs generative UI catalogs — Agent products out of
  scope), the Tier grading (T1 = skeleton+skin copy-code kits you own and
  re-skin per DESIGN.md; T1′ = runtime/skin-separable ecosystems), per-vendor
  verification tables, an agent interaction-state inventory, and the
  copy/registry/framework selection ladder. Includes streaming-chrome
  wheels (streamdown / remend / use-stick-to-bottom / llm-ui), thinking-orb
  bake-off, and channel/generative-UI peers. Use when picking or auditing
  wheels for an agent chat surface, verifying a new vendor name before it
  enters the pool, or deciding between self-built state cards, registry
  installs, chat frameworks, and native-channel generative cards.
---

# Agentic UI primitives · agent 交互状态原语赛道

一行定位：[`ui-stack-decision.md`](./ui-stack-decision.md) §3「A · agent UI 方向」行的深化——本资产不重复该决策，只回答「agent 表面的状态原语该抄、该装、还是该上框架」。Beautiful UI 本体研究已本地化在 [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)，本资产只引用不重述。

## 1 · 赛道坐标：四层别混

二手调研和素材页最爱把四层混成一句"agent UI 库"。先分层，再谈选型：

| 层 | 是什么 | 代表 | 本 pack 怎么消费 |
|---|---|---|---|
| **状态原语**（本资产主对象） | 单个 agent 交互状态的 DOM 形态：thinking、streaming、tool chip、approval… | Beautiful UI · shadcn AI Elements · Kibo · prompt-kit · LocalMode | 抄 pattern，或 registry 单件装 |
| **聊天框架** | Thread / Message / Composer 编排 + runtime 契约 | assistant-ui | 仅当会话编排成为产品主轴 |
| **协议 / 运行时** | agent ↔ UI 的线协议与跨端通道 | AG-UI · A2UI · MCP Apps（CopilotKit 系）· Chat SDK | 线协议选型，不是组件素材 |
| **生成式 UI · 目录/渲染** | 模型按受控 catalog 吐 JSON/DSL，客户端渲染；含聊天平台原生卡 | json-render · OpenUI · A2UI · Tambo · `@json-render/chat` | OSS catalog/renderer 可进池；**不是**状态原语 |
| **生成式 UI · Agent 产品（出界）** | 整站/整页由 Agent 产品生成 | v0 等 | Liz 裁定出界：只比开源组件/协议轮子，不比闭源 Agent 产品 |

过门（承接 [`ui-stack-decision.md`](./ui-stack-decision.md) §3 A 行审计裁定）：评估任何新名字前先回答**「它是不是又一个聊天框」**——聊天框只是状态原语的一种宿主；一个只会把 Thread 渲染出来的轮子不进状态原语比较。

## 2 · Tier 分级：先问「素胚和皮肤给没给齐」（Liz 2026-11-17）

比层更靠前的第一问：**这个轮子是不是骨肉皮一体、装上就能用、我们只要按 DESIGN.md 微调皮肤？**——这种是 Tier-1 顶级货；或者 runtime 与皮肤可分离、同生态皮肤件随便换（适配可迁移性强），也算 Tier-1。

| 级 | 判定 | 形态标志 | 消费方式 |
|---|---|---|---|
| **T1 · 素胚+皮肤一体** | 行为骨（a11y/焦点/状态机）+ 默认肉皮（token/形态）一次给齐，**源码拷进仓、归你改** | shadcn registry 协议（`npx shadcn add <src>`）或等价拷码 CLI；装完没有 runtime 依赖契约 | 默认首选：装 → 过 DESIGN.md token 改写 → 接数据 |
| **T1′ · 生态皮肤可换** | runtime 与皮肤分离；皮肤件可跨家挂载，不锁 vendor | runtime（如 assistant-ui）只供原语契约；皮肤件来自任一 copy-code 源（AI Elements/prompt-kit/自产卡）挂进其 message part 钩子 | 已吃 runtime 契约的项目：runtime 不动，皮肤按 T1 标准随便挑 |
| **T2 · 只给骨或只给皮** | headless 纯骨（自己画皮），或静态视觉稿无行为骨 | react-aria/ark ui 类纯原语；或 dribbble 式截图 | 骨可搭、皮可抄，但不为「装上即用」付框架价 |
| **T3 · 协议/运行时** | 线协议、编排、通道 | §4 表 | 选型对象是协议不是皮肤 |
| **出池** | 栈/平台绑定、license 不过、停更、付费无 LICENSE 全文 | §4 出池行 | 不进默认路径 |

判别两问：**① 装完代码在不在我仓里？**（拷码归我 = 可过 token 改写；npm 黑盒 ≠ T1）**② 皮肤能不能单独换？**（runtime 绑死皮肤 = 迁移成本翻倍）。

**机制事实（2026-11 核验）**：shadcn CLI v4 起 `-b/--base` 支持 `radix|base|aria` 三 flavor；2026-07 起新项目默认 Base UI（`base-nova` 等 style）；registry 作者可用 `registry:base` 锁 flavor——**整个 copy-code 生态从此对 Base UI 栈一等开放**，我们 Base UI + Tailwind 4 的仓不再是二等公民。

## 3 · T1 验真表：素胚+皮肤一体

新名字进池前必须先过验真；同名再查不必重搜。栈基准：React 19 + Tailwind 4 + Base UI（shelf-radar/orgbrain 同栈）。

| 名字 | license · 星/近况（核验日） | 骨 | 皮 | 卖什么 | 装法 | 本栈落点 |
|---|---|---|---|---|---|---|
| **shadcn AI Elements**（原 Vercel `ai-elements`，2026-11-30 弃坑迁入） | 拷码归你 · 官方 | Radix/Base UI/React Aria 三适配（Trace/CodeBlock 已证） | Tailwind CSS vars，拷码后全改 | 21 模式：Chat/Message/Reasoning/Tool/Plan/Confirmation/Questionnaire/Subagent… | `registry.ai-sdk.dev` registry + `npx shadcn add` | **agent 皮肤来源首选**：Base UI 有官方适配；Confirmation/Questionnaire 与「选择卡」语义同构 |
| **coss ui**（原 Origin UI，Cal.com 收购重建） | MIT · 10.9k★ · `cosscom/ui` · 2026-11 活跃 | **原生 Base UI**（非移植） | Cal.com 生产 token 全套，CSS vars | 50+ primitives + particles（复合模式）+ atoms 规划 | `pnpm dlx shadcn init @coss/style` 或 `add @coss/ui` | **通用组件皮肤首选**：同栈唯一生产级 Base UI 皮肤全家桶；非 agent 专用但底座通吃 |
| **assistant-ui registry**（`r.assistant-ui.com`） | MIT · 官方 | 原语双口味：`asChild`+`render` 都吃 | styled thread/composer/thread-list/sidebar/reasoning/tool-group 拷码 | 聊天壳全件（thread、modal、sidebar、markdown…） | style-aware URL `r.assistant-ui.com/styles/{style}/{name}.json` 按 `base-*` style 自动发 Base UI 版；`npx assistant-ui add thread` | **runtime+皮肤一体**：用 runtime 时皮肤也可直接拿官方 styled 件，不必手写全套 CSS |
| **Kibo UI**（haydenbleasel→shadcnblocks，2025-10 收购） | MIT · 3.9k★ · `shadcnblocks/kibo` | shadcn 原语（Radix 系组件为主） | shadcn CSS vars | 41 通用件 + AI chat primitives + blocks（Gantt/Kanban/编辑器） | `npx kibo-ui add <c>` 或 `npx shadcn add @kibo-ui` | T1 货源；Radix flavor 件需 `-b base` 项目里按件核——未全量验证 |
| **prompt-kit**（ibelick/Julien Thibeaut） | MIT · 3.2k★ · 2025-02 起 | shadcn 原语（继承项目 flavor） | shadcn CSS vars + shimmer 等 | ~21 件：PromptInput/Message/ChatContainer/Reasoning/Tool/Source/ResponseStream/Loader/ScrollButton + Chatbot/ToolCalling blocks | `npx shadcn add prompt-kit/<c>` | T1 货源；件小粒度细，单件取 |
| **ElevenLabs UI** | MIT · 2.5k★ · `elevenlabs/ui` · 2026-11 活跃 | shadcn 原语 + Three.js（orb） | shadcn CSS vars | 语音/音频 agent 件：Orb（WebGL+音量反应）、waveform、voice-chat、transcriber、conversation-bar、message | `npx @elevenlabs/cli components add <c>` 或 `shadcn add ui.elevenlabs.io/r/<c>.json` | 语音面唯一 T1；orb 是 hero 级不是 20px 状态球（§8.2 约束仍适用） |
| **Beautiful UI** | MIT · 源码 LICENSE 实核 | 自含（部分件需 glimm/liveline/icon 包） | 官方 TSX 直拷 + shadcn 兼容 registry（20/21 件） | 21 个 agent 展示件含 Agent Screen | `beautifului.dev/r/<name>.json` 或 TSX 直取 | L0 主路径不变：原件取结构+交互，token 映射不动形态 |
| **LocalMode UI** | MIT · 33★（新小项目） | shadcn registry，纯 presentational 零运行时依赖 | Tailwind 4 CSS vars | 107 primitives + 37 blocks：Conversation 家族（agent-step-timeline 带 finish-reason 徽章/tool/tool-approval/branch/citation）最全 | `@localmode` → `localmode.ai/r/{name}.json` | Conversation 家族可单件取；Local-First 家族对本栈无用 |
| **Nexus UI**（victorcodess） | MIT · 131★ · 近推 2026-06 | shadcn 原语（Radix 系） | shadcn CSS vars | 17+ AI 件：Thread（内建 stick-to-bottom+jump-to-bottom）/Message/Reasoning/ChainOfThought/Tool/Questions/ModelSelector/Attachments/Citation/TextShimmer | `npx shadcn add @nexus-ui/<c>` | T1 货源；**活跃度警示**：131★+近推停 5 个月，按件核 |
| **chatcn**（chatcn.dev） | 免费 210 件可商用 + Pro 519 件付费 · repo 未见公开 | **Base UI / Radix 双 flavor**，plain props | 10 主题 CSS vars | AI chat/agent 件 + 整屏 blocks（chatbot/coding-agent/research-agent）+ 2,417 icons；runtime adapters：AI SDK/LangGraph/AG-UI/assistant-ui | `npx shadcn add @chatcn/<c>` 或 MCP | **观察池**：双 flavor+runtime 适配正中 T1′，但免费/Pro 分界与 LICENSE 全文未实核 |
| **21st-dev/agent-elements** | MIT · 110★ · 近推 2026-04 | shadcn 原语 | shadcn CSS vars | agent 状态件 | shadcn registry | 观察池：停更近 7 个月 |
| **BoardUI** | free MIT + Pro 付费无源码 · 仓新 | React+Tailwind | Figma 400+ tokens | 64 free 件 + Pro agent 组（Thinking/Composer/GlassComposer） | `npx boardui add` | **观察池**：建仓新、Pro 无 LICENSE 全文，不满格不进生产路径 |
| 付费件排（HextaUI $49+ / Arc $149+/yr / affectUI $199 / React Bits Pro $129+ / BoardUI Pro…） | 各自付费 license | — | 皮肤好看但无 runtime | 状态原语（拷码） | — | 无 LICENSE 全文前一律不装，同 BoardUI 观察池 |

## 4 · 其余层验真表（runtime / 协议 / 生成式 / 出池）

| 名字 | 判定 | 层 | license | 本栈落点 |
|---|---|---|---|---|
| **assistant-ui**（runtime） | ✅ 真 · MIT · `assistant-ui/assistant-ui` | 聊天框架 | MIT | runtime 默认：Vite 友好、自定义后端一个 `ChatModelAdapter.run`、runtime 与皮肤可分离（T1′）；Assistant Cloud 可选（$0/200MAU），自写 history adapter 优先 |
| **CopilotKit**（`CopilotKit/CopilotKit`） | ✅ 真 | 协议/运行时 | MIT + 隐性云面 | AG-UI 作者；2026-03 起客户端 licenseToken/Intelligence 密钥检查（commit `66a80d9`）；非 agent-嵌-app 全栈场景不值它的协议绑定 |
| **A2UI** + **`@a2ui/react`** | ✅ 真 | 协议 + 官方 React renderer | Apache-2.0 | 跨信任边界 agent→你 App 出 UI 的线协议；`@a2ui/react@0.15`（周下载 32 万+）补上了「React 端没有官方渲染器」的缺口——v0.9、Zod 类型安全、可定义自有 catalog |
| **json-render / `@json-render/chat`**（`vercel-labs/json-render`） | ✅ 真 | 生成式 UI 目录/渲染 | Apache-2.0 | catalog→原生 Slack/Teams 卡；Web `/chat` 不走频道卡时不装 |
| **Chat SDK**（`vercel/chat`） | ✅ 真 | 协议/运行时 · 多平台 bot 宿主 | MIT | `@json-render/chat` 的宿主；多频道 bot 才认 |
| **OpenUI**（`thesysdev/openui`） | ✅ 真 | 生成式 UI 目录/渲染 | MIT | 行式 DSL 派对标观察池；Cloud 托管出界 |
| **Channels SDK**（`CopilotKit/channels-sdk`） | ✅ 真 | 协议/运行时（CopilotKit 系） | MIT + Intelligence key | 已定 AG-UI 才看；密钥是隐性成本 |
| **mcp-ui**（`@mcp-ui/client`） | ✅ 真 · 5.3k★ | 协议/生成式 · MCP Apps 宿主侧 | Apache-2.0 | 渲染 MCP server 下发的 UI（sandboxed iframe + `AppRenderer`，`_meta.ui.resourceUri` 契约）；做 MCP Apps host 才装，不是组件素材 |
| **Manifest UI**（`mnfst/manifest-ui`） | ✅ 真 · 36★ · 近推 2026-10 | 生成式 · ChatGPT/MCP Apps 沙盒内组件皮肤（拷码） | MIT | 域外 T1：件是设计来跑在**人家 App**（ChatGPT iframe）里的；做 ChatGPT app 内界面时直接是 T1，自有 app 面不适用 |
| **Tambo**（`tambo-ai/tambo` → `@tambo-ai/react`） | ✅ 真 | 生成式 UI React SDK | MIT · 11.2k★ | 注册自有组件→agent 挑件流 props；**Tambo Cloud 2026-10-31 关闭，self-host 继续** → 观察池偏下，不绑托管 |
| **NLUX**（`nluxai/nlux`） | ✅ 真 | 聊天框架 | MPL-2.0 | 文件级 copyleft + 生态弱，出池 |
| **Ant Design X / MUI X Chat** | ✅ 真 | 组件生态 | MIT | 绑 AntD/MUI 体系，栈不合出池 |
| **OpenAI ChatKit**（`@openai/chatkit-react`） | ✅ 真 | 聊天框架 | MIT/Apache-2.0 | 锁 ChatKit/AgentKit 后端、皮肤可控性低，出池 |
| **chatbot-ui 类整站模板** | 停更事实 | — | MIT | 2024-08 最后 commit + 未修安全问题；「chatbot 模板」类整体出池 |

验真备注：低星龄短 ≠ 幻觉（BoardUI/LocalMode 先例）；GitHub API license 字段会误报（NOASSERTION），以 LICENSE 文件为准；同名再查不必重搜。

## 5 · agent 交互状态清单（本资产核心）

每个状态先问「它必须表达什么」，再对照烂做法。本地源码从 [21 件原始组件目录](./design/beautiful-ui-ai-interfaces/) 取用。下表 `.html` 名称仅为历史视觉参照；实际实现使用相应 TSX、共享件和 foundation。

| 状态 | 必须表达 | 常见烂做法 | 取用 |
|---|---|---|---|
| **thinking / reasoning trace** | 默认折叠一行（`Thought for Ns`）+ 可展开步骤列表；每步有粒度与时长；进行中与已完成可区分 | 只放 spinner；展开无时长无步骤；raw JSON 糊脸；trace 撑开推乱正文 | 本地 `thinking-state.html`；装件：AI Elements `reasoning`、assistant-ui `reasoning`、LocalMode `agent-step-timeline`（最全）、prompt-kit `chain-of-thought`/`reasoning` |
| **streaming text + sources** | 部分填充 + 光标（accent 块）；inline sources 可折叠；live edge 自动跟随、上滚释放 | 整块替换闪烁；无 follow 拽回底部；来源裸链堆叠 | 本地 `streaming-text.html`（演示态）；**生产正文 = §8.1 streamdown + use-stick-to-bottom**；装件：AI Elements `response`/`sources` |
| **tool call chips** | 紧凑 chip + 状态机（入参流式→出参/出错）+ 计数；失败态一等公民 | 每 call 一张全宽卡；无失败态；完成即消失 | 本地 `tool-chips.html`；装件：AI Elements `tool`、LocalMode `tool`、prompt-kit `tool` |
| **approval / HITL 卡** | 框式提问 + 选项 pills + 自定义入口 + 多步分页；批准后结果留时间线 | `confirm()` 弹窗；approve 后查无对证；拒绝/修改路径缺失 | 本地 `approval-card.html`；装件：AI Elements `confirmation`/`questionnaire`、LocalMode `tool-approval`、CopilotKit HITL 语义参考 |
| **task rows** | 行级 running/failed/completed 实时态；终态留存；失败可展开 | 与正文混排；僵尸行永远"进行中" | 本地 `task-rows.html`；装件：AI Elements `task`+`queue`、LocalMode `task` |
| **context cards** | 检索 chunk + 来源 + 体量元数据；可折叠按源过滤 | 无来源不可追溯；无元数据 | 本地 `context-cards.html`；装件：LocalMode `source-citation-list`/`inline-citation`、AI Elements `sources`/`inline-citation` |
| **diff / records 密表** | 12.5px 密行 + sticky header + tint 标增删；filter chips 置顶；diff 是表格不是代码块 | diff 塞 code block；无 sticky；proposed/applied 不分色 | 本地 `diff-table.html`/`records-table.html`；表格语法总纲 [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md)；装件：LocalMode Artifacts 家族、Kibo `code-block`/`table` 系 |
| **prompt composer** | `@` sources、`/` commands、模型选择器、附件；流式期间 send↔stop 互换；**IME 让位 Enter**（`isComposing`/keyCode 229 为真时 Enter 只确认候选词） | IME 组合期 Enter 发出半个词；流式无 stop；模型切换藏二级菜单 | 本地 `prompt-bar.html`/`chat-composer.html`；IME 通则 [`i18n-translation-survival.md`](./i18n-translation-survival.md)；装件：AI Elements `prompt-input`、prompt-kit `prompt-input`、Kibo `prompt-box` 系 |
| **product/entity 卡带**（shelf-radar 实证 2026-11-17） | 横滚卡带 + 图 + 关键字段；图 eager 或真骨架；横滚 affordance 可见 | `loading=lazy` 在横滚 scrollport 里永久 pending（实测 3/8 挂）；隐藏滚动条无可发现性 | 自产卡组件挂框架 message-part 钩子（T1′）；缩略图一律 `eager` + pending 骨架 |

## 6 · 选型阶梯：抄 / 装 / 上框架

沿用 [`ui-stack-decision.md`](./ui-stack-decision.md) §2 的 L 级语言，与 §2 Tier 对应：

| 级 | 动作 | 何时 | 落点 |
|---|---|---|---|
| **L0 · 复制源码并适配** | 有官方可用源码先取源码；没有才读 DOM 骨架重建 | 默认态。状态卡体积小、token 绑定深 | **主路径**：Beautiful UI 原始源码 + 真实事件/数据适配 |
| **L1 · 装 T1 皮肤件** | shadcn CLI / 拷码 CLI 单件拉入，装后过 DESIGN.md token 改写 | 该状态边界行为自己写太贵（a11y、stick-to-bottom、branch 树、IME），且件是拷码归我、不带 runtime 契约 | **皮肤首选 shadcn AI Elements**（Base UI 适配）；通用底座 **coss ui**；细分货源 Kibo/prompt-kit/LocalMode/ElevenLabs UI |
| **L2 · 上框架** | 引入 chat 框架 / runtime 契约 | 仅当会话编排（thread 持久化、多 runtime 切换、generative UI 注册）成为产品主轴 | runtime 默认 assistant-ui（MIT、Vite、单 adapter 接自建后端）；皮肤仍走 L1——**runtime 与皮肤分开选**，皮肤包卡、卡不动 |

判定问题（装/上之前逐条过）：

1. 这个状态我们的 agent 真会产出吗？——不产出的状态不装。
2. 该状态的边界行为自己写要几天？——超过半天且拷码件 presentational，才值得 L1。
3. 装件带进来的数据形状我们接得住吗？——AI SDK message parts / runtime 契约是隐性依赖。
4. 一年后这个 repo 还活着吗？——建仓天数/星数/近推，不满格不进生产路径。
5. **骨肉皮给齐没？**——§2 两问；只给骨的不为「装上即用」付费，只给皮的不为行为重写。

## 7 · 边界（硬闸 + 反模式）

硬闸：

1. 会话历史走既有导航体系：把会话侧栏树塞进 chat 页 = 造出第二套导航，违反 IA 单门（[`ia-user-journey.md`](./ia-user-journey.md)）。
2. composer 周边控件按 [`chrome-controls-placement.md`](./chrome-controls-placement.md) 分置：高频状态切换一键 switcher，禁藏 menu。
3. **registry 件必须过 DESIGN.md token 改写再入库**；默认值直出 = 同质化加速器（ui-stack-decision §7）。
4. 用户要求复用源码时，直接取原件并保留许可，不能再用"无许可/只能重写"拒绝；闭源 Pro 件按其实际许可处理。
5. license 以 LICENSE 文件为准，不信 API 字段与营销页；未实核不安装。
6. 四层不混：评估任何新名字先落 §3/§4 表格验真，再决定它属于哪层、进不进池。
7. **T1′ 纪律：runtime 与皮肤分开选型**。为 runtime 装 assistant-ui ≠ 必须手写皮肤——其 registry styled 件与 AI Elements 皮肤都可直接挂；反之选了 runtime 也不必接受它的默认皮。
8. 卡带/图像件：横滚容器内 `loading=lazy` 不可信（生产实证），缩略图 eager 或 pending 骨架；滚动容器保留可见滚动 affordance。

反模式：

- 「agent UI 库」一词混指框架/协议/原语/频道生成卡，在错误的层做比较（典型：拿 json-render 替 Beautiful UI thinking 卡）。
- 二手调研名字直接入池：先验真（NOASSERTION 误报与"新到像假货"两先例）。
- 为一个 thinking 状态引入整个 chat 框架——L0/L1 能解决的上了 L2。
- **为 runtime 放弃皮肤层，或为皮肤换掉 runtime**——T1′ 生态里两者可分离，shelf-radar 2026-11 实证：primitives+全手写 1,156 行 CSS 是绕路，styled registry 件本可直接拿。
- 状态卡只做 happy path：streaming 无 stop、approval 无追溯、tool chip 无失败态。
- composer 的 Enter 不做 `isComposing` 检查。

## 8 · 分域备忘

### 8.1 · streaming chrome 轮子（2026-11-08 验真 + 2026-11-17 补 llm-ui）

主要矛盾：Beautiful UI `StreamingText` 是演示态（blur+caret+源 chip），不是生产态「半截 Markdown 仍好看+上滚不拽回」。装机顺序：**`streamdown`（+中文 `@streamdown/cjk`）→ `use-stick-to-bottom` → 需要时 `remend`**。

| 名字 | license | 解决的 streaming 问题 | 建议 |
|---|---|---|---|
| **streamdown**（vercel） | Apache-2.0 | 残缺 MD 治愈（remend）、块级 memo、caret、stagger、GFM/code/math/mermaid | **L1 装**；AI Elements `response` 底层；Tailwind 4 要 `@source` 扫 `streamdown/dist` |
| **remend** | Apache-2.0 | 字符串级 incomplete-MD 闭合，零依赖 | streamdown 已含；自研 MD 管线才单装 |
| **use-stick-to-bottom**（stackblitz-labs） | MIT · 6.6M 周下载 | 弹簧追底/上滚释放/`isAtBottom`/`scrollToBottom` Promise；不靠 Safari 缺的 `overflow-anchor` | **L1 装**（零依赖 hook）；别为 scroll 上框架 |
| **llm-ui**（richardgill） | MIT（LICENSE 实核）· `@llm-ui/react` | 流式渲染引擎另一条路：broken-MD 移除 + **自定义 block**（模型吐 `【{type:"buttons",…}】` 渲成真组件）+ throttle 平滑 + Shiki code；headless 自带皮 | 观察池+1：要「流中渲自定义组件」时比 streamdown 强；纯 MD 正文仍 streamdown |
| htmlstream / Proper UI / streamfield / chat-scroll | MIT · 0–116★ | 各见专项（流式 HTML / SDK 无关 streaming 件 / 字段级渐进 / pin-to-top） | 观察池或抄 pattern，不满格不装 |

显式丢掉：Wingo Pro（源码付费）、近 0★ 叉、为 streaming 上框架、@json-render/Channels（站内不走 IM 卡）。

不装库也能偷的 5 个 UX：①残缺 MD 先治愈再渲；②块级 memo 只重绘末块；③stick-to-bottom+上滚释放+「↓最新」；④caret 只在 live edge、`prefers-reduced-motion` 关；⑤reasoning 流式展开→结束折成 `Thought for Ns`。

### 8.2 · thinking orb 选型（2026-11-11 裁决+bake-off）

orb 是 agent 状态原语的一种；资产仓在 `ui-patterns/ai-thinking-orb/`（recipe+vendored upstream），本节是选型结论。

- **胜者 `@yogesharc/thinking-orbs` v0.1.2**（MIT，SVG 粒子、currentColor、+6.2KB gz）：20px 全 state 连贯实心。落地参数（Liz 现场校准）：28–32px、speed≤0.6、只用沉静 state（reasoning/working）、取色 `currentColor`/CSS var 绑主色 token。
- runner-up `thinking-orbs`（libraries.dev）：64px 好看、20px 稀疏有洞、无 idle。
- rare-ui FluidOrb 移植版 Liz 现场否决（20px 边缘毛糙）→ hero/大尺寸备选；LerSent Liquid Orb 仅旗舰 hero；ElevenLabs `Orb`（§3）是 WebGL 音量反应球，属语音面非状态球。
- 硬约束仍生效：每视图最多一颗 live orb；`aria-hidden`+`pointer-events:none`；`prefers-reduced-motion` 冻结；失败静态 radial 兜底。**新增实证（2026-11-17 shelf-radar）**：paused 帧恰好停在三点 blink 帧 = 行首「···」——历史/非活跃行不要挂 orb，只在 running/latest 行渲染。

### 8.3 · 频道/生成式卡 精华·糟粕（2026-11-08）

精华：`@json-render/chat` 的 catalog→`streamCard`/`toCard`（一份目录发各平台原生卡，`limits` 拒降级）；Chat SDK 作多平台 bot 宿主；OpenUI 行式 DSL 增量解析思路；A2UI「UI 是数据、catalog 是信任边界」；Channels 的 HITL-in-channel。

糟粕：把 json-render/OpenUI 当状态原语替代；为 Web `/chat` 引整包 `@json-render/*`；单方 benchmark 当事实；Cloud 托管当默认；平台 adapter 静默降级当可接受；闭源 Pro 续扩。

### 8.4 · 聊天工作台选型顺序（2026-11-12 归纳，可复用）

「卡为主、文字为辅」的引导式工作台：①先定层——要 runtime（thread 持久化/分支/恢复）才上框架，只要皮肤留在原语层；②runtime 默认 assistant-ui；③皮肤默认 shadcn AI Elements（拷码、Base UI 适配、Confirmation/Questionnaire 同构选择卡），已有自建卡用 message-part 钩子挂、迁移是换容器不是重写；④持久化：自写 history adapter 优先，托管 Cloud 需显式授权；⑤整站模板与生态绑定组件不进池。

**2026-11-17 补充（shelf-radar w15 审计实证）**：该工作台实走了「assistant-ui 无头原语 + 全手写 1,156 行 CSS」路线——runtime 选型对，皮肤层绕路：同栈本可直接 `r.assistant-ui.com` styled 件（base 口味）或 AI Elements 皮肤挂 `MessagePrimitive`，省掉整套自写视觉层。**教训归约：上 runtime 时同步评估 §3 T1 皮肤源，不默认手写皮。**

## 9 · 调研日志（产地与验真史）

| 日期 | 触发 | 产出 |
|---|---|---|
| 2026-09-06/07 | orgbrain /chat 重设计 | 四层坐标、初查六家验真（Beautiful UI/Vercel AI Elements/assistant-ui/CopilotKit 确认，BoardUI/LocalMode "疑似幻觉"实为新品）、状态清单、阶梯 |
| 2026-11-08 | Liz 转发 `@json-render/chat` 帖；认定 streaming 不够 | §4 五行频道/生成式同行；§8.1 streaming 轮子表 |
| 2026-11-11 | orb 归并裁决 | §8.2（原 ai-thinking-orb SKILL 降格资产仓） |
| 2026-11-12 | shelf-radar 聊天工作台选型 | AI Elements 换房东、CopilotKit 云闸、chatbot-ui 死证、§8.4 选型顺序、二轮新验真（prompt-kit/NLUX/AntDX/MUIX/ChatKit/付费排） |
| 2026-11-17 | Liz 定义 Tier-1 概念 + w15 聊天面审计实证 | §2 Tier 分级；§3 T1 表经 web+Exa 两轮验真九家（shadcn AI Elements/coss ui/assistant-ui registry/Kibo/prompt-kit/ElevenLabs UI/Nexus UI/chatcn/21st-dev，旧 Beautiful UI/LocalMode/BoardUI 归位）；llm-ui 补 §8.1；@a2ui/react + mcp-ui + Manifest UI 补 §4；卡带懒加载与 orb paused 帧两个生产破口入 §5/§7/§8.2；全文按 Tier 重构（原 §2/§6/§8/§9/§10 归并入 §3/§4/§8） |
