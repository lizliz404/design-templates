---
name: agentic-ui-primitives
description: >-
  Verified landscape of open-source agentic UI component wheels: the
  four-layer coordinate (state primitives vs chat frameworks vs
  protocols/runtimes vs generative UI catalogs/renderers — Agent products
  still out of scope), a per-vendor verification table (Beautiful UI, Vercel
  AI Elements, assistant-ui, CopilotKit, BoardUI, LocalMode UI, plus 2026-11
  channel/generative peers: json-render/chat, Chat SDK, OpenUI, Channels SDK,
  A2UI), an agent interaction-state inventory with required semantics and
  common failures, and the copy-pattern vs registry vs framework selection
  ladder, plus a 2026-11-08 streaming-chrome addendum (streamdown /
  remend / use-stick-to-bottom). Use when picking or auditing wheels for an agent chat surface
  (e.g. orgbrain /chat), verifying a new vendor name before it enters the
  candidate pool, or deciding between self-built state cards, registry
  installs, chat frameworks, and native-channel generative cards.
---

# Agentic UI primitives · agent 交互状态原语赛道

一行定位：[`ui-stack-decision.md`](./ui-stack-decision.md) §3「A · agent UI 方向」行的深化——本资产不重复该决策，只回答「agent 表面的状态原语该抄、该装、还是该上框架」。Beautiful UI 本体研究已本地化在 [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)，本资产只引用不重述。

## 1 · 赛道坐标：四层别混

二手调研和素材页最爱把四层混成一句"agent UI 库"。先分层，再谈选型：

| 层 | 是什么 | 代表 | 本 pack 怎么消费 |
|---|---|---|---|
| **状态原语**（本资产主对象） | 单个 agent 交互状态的 DOM 形态：thinking、streaming、tool chip、approval… | Beautiful UI · Vercel AI Elements · BoardUI · LocalMode UI | 抄 pattern，或 registry 单件装 |
| **聊天框架** | Thread / Message / Composer 编排 + runtime 契约 | assistant-ui | 仅当会话编排成为产品主轴 |
| **协议 / 运行时** | agent ↔ UI 的线协议与跨端通道 | AG-UI · A2UI · MCP Apps（CopilotKit 系） | 线协议选型，不是组件素材 |
| **生成式 UI · 目录/渲染** | 模型按受控 catalog 吐 JSON/DSL，客户端渲染；含聊天平台原生卡 | json-render · OpenUI · A2UI · `@json-render/chat` | OSS catalog/renderer 可进池（§2 2026-11 增补）；**不是**状态原语，也不替代 Beautiful UI |
| **生成式 UI · Agent 产品（出界）** | 整站/整页由 Agent 产品生成 | v0 等 | Liz 裁定出界：只比开源组件/协议轮子，不比闭源 Agent 产品 |

过门（承接 §3 A 行审计裁定）：评估任何新名字前先回答**「它是不是又一个聊天框」**——聊天框只是状态原语的一种宿主；一个只会把 Thread 渲染出来的轮子不进状态原语比较。

## 2 · 验真结论表（2026-09-06 初查；Beautiful UI 2026-09-07 复核；2026-11-08 增补频道/生成式 UI 同行）

新名字进池前必须先过这张表；同名再查不必重搜。栈列以 orgbrain（React 19 + Tailwind 4 + Astryx，非 Next.js）为基准。

| 名字 | 判定 | repo / npm | license | 栈 | 真实卖的 primitives | agent 通道 | 本栈适配 |
|---|---|---|---|---|---|---|---|
| **Beautiful UI** | ✅ 真，官网与原始源码已对照 | [beautifului.dev](https://www.beautifului.dev/) · [slev12397/beautiful-ui](https://github.com/slev12397/beautiful-ui) | MIT，Copyright 2026 Shane Levine（源码 LICENSE 实核） | React 19 + Tailwind 4；部分件需 glimm / liveline / icon 包 | 21 个展示组件；本 pack 原件 21/21 齐全，含 Flowchart、Agent Screen 及共享组件 / foundation | 官方 shadcn 兼容 registry：`beautifului.dev/r/<name>.json`，目前覆盖 20 件；Agent Screen 须直接取 TSX。第三方 Vue `/agent/` 不算官方 | 按 [完整源码入口](./design/beautiful-ui-ai-interfaces/) 取固定原件与依赖；保留结构和交互，再接真实数据并建立明确的主题映射 |
| **Vercel AI Elements** | ✅ 真 | [github.com/vercel/ai-elements](https://github.com/vercel/ai-elements) · npm `ai-elements`（CLI） | Apache-2.0（LICENSE 文件实核；GitHub API 报 NOASSERTION 是误报） | shadcn/ui + AI SDK（`@ai-sdk/react`）+ Tailwind CSS variables 模式 | ~29 组件：conversation、message+branch、prompt-input、reasoning、tool、task、plan、queue、terminal、file-tree、checkpoint、code-block、sources、inline-citation、web-preview、actions、suggestion… | shadcn registry（`elements.ai-sdk.dev/api/registry/*.json`）+ 自有 CLI `npx ai-elements@latest` | Tailwind 4 即插；数据形状绑 AI SDK message parts——TanStack Start 可用，但要把自己的 agent 事件流映射成 AI SDK 形状 |
| **assistant-ui** | ✅ 真 | [github.com/assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) · npm `@assistant-ui/react` | MIT | React headless 原语，Radix `asChild` / Base UI `render` 双味（2026-07 起 `base-` style 为 shadcn init 默认） | Thread / Message / Composer / ThreadList / ActionBar + reasoning、tool-group、mcp-config、model-selector、threadlist-sidebar 等；runtime 适配 AI SDK / LangGraph / AG-UI / A2A / data-stream | shadcn registry `@assistant-ui`（`r.assistant-ui.com/styles/{style}/{name}.json`）+ `llms.txt` / `.md` 机器可读文档 | 框架不是素材：接它 = 接受 runtime 契约；与「Astryx 已承载组件层」冲突，默认不装 |
| **CopilotKit** | ✅ 真 | [github.com/CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | MIT | React / Angular / Vue / RN SDK；AG-UI 协议作者 | Generative UI 三模式（static AG-UI / declarative A2UI / open MCP Apps）、HITL、共享状态、多渠道（Slack / Teams） | AG-UI 协议 + MCP Apps | 协议/运行时层选项；引入 = 同时定死 agent 线协议，不在组件赛道比较 |
| **BoardUI** | ✅ 真（**非幻觉**，但很新） | [github.com/BoardUI/boardui](https://github.com/BoardUI/boardui)（2026-09-01 建，150★）+ [boardui.com](https://www.boardui.com/) | free 层 MIT；Pro 付费 license | React + Tailwind，Figma 设计，400+ tokens | 64 个 free 组件 + Pro agent 组（Agent Thinking、Composer Loader、GlassComposer、Composer）+ agent blocks + AI chat 模板 | `npx boardui add` CLI + MCP | 单人新项目、低星龄短；Pro 组件无源码——观察池，不急装 |
| **LocalMode UI** | ✅ 真（**非幻觉**） | [github.com/LocalMode-AI/LocalMode](https://github.com/LocalMode-AI/LocalMode)（33★）· registry `@localmode` → `localmode.ai/r/{name}.json` | MIT | shadcn registry；Tailwind 4 CSS variables；组件纯 presentational（零 `@localmode/*` 运行时依赖） | 107 primitives / 10 families + 37 blocks：Conversation 24（agent-step-timeline（ReAct，含 finish-reason 徽章 max_steps/timeout/loop_detected/error）、tool、tool-approval、branch、citation…）、Local-First 25（model downloader、capability gate）、Results 12、Artifacts 4、DevTools 4 | shadcn CLI + 把 shadcn MCP server 指向 registry | 六家里栈适配最好的 registry：Tailwind 4 + props 驱动，随便接后端；Local-First 家族对 orgbrain 无用，Conversation 家族可单件取 |

| **json-render**（含 `@json-render/chat`） | ✅ 真；**层=生成式 UI · 目录/渲染**，不是状态原语 | [vercel-labs/json-render](https://github.com/vercel-labs/json-render)（Apache-2.0，~19k★）· npm `@json-render/core` / `@json-render/chat@0.22.0` · [json-render.dev](https://json-render.dev/) · chat API：[docs/api/chat](https://json-render.dev/docs/api/chat) · 宣布帖：[ctatedev 2026-11-06](https://x.com/ctatedev/status/2118853661040295997) · changelog：[vercel.com/changelog/json-render-and-chat-sdk-agents](https://vercel.com/changelog/json-render-and-chat-sdk-agents) | Apache-2.0（repo LICENSE + npm 实核） | catalog + SpecStream；`@json-render/chat` 依赖 Chat SDK（`chat`）+ Zod；示例绑 AI SDK `streamText` | **卖的是受控 catalog → 原生聊天卡**：`Card`/`Section`/`Text`/`Fields`/`Table`/`Chart`/`Actions`… → Slack Block Kit / Teams Adaptive Cards 等；`streamCard` 边写边 edit（默认 500ms）；`toCard` schema 校验 + `limits`；**不卖** thinking/tool-chip 等状态原语 | Chat SDK 适配器通道；与 AI Elements **同源生态不同层**（Elements=Web 状态件，chat=频道卡渲染） | **仅当产品要往 Slack/Teams 等发原生结构化卡时**才装 `@json-render/chat`。Web `/chat` 状态卡继续 Beautiful UI / LocalMode。整包 json-render（Next/Remotion/R3F…）对 orgbrain 过重——弃糟粕 |
| **Chat SDK**（`chat` / vercel/chat） | ✅ 真；**层=协议/运行时 · 多平台 bot 宿主** | [vercel/chat](https://github.com/vercel/chat)（MIT，~2.5k★）· npm `chat@4.x` · [chat-sdk.dev](https://chat-sdk.dev/) | MIT | TypeScript；平台 adapters（Slack/Teams/GChat/Discord/Telegram/…） | 事件路由、JSX cards、流式 post+edit、actions/modals/slash——**不是** UI 组件素材库 | 各平台 adapter | `@json-render/chat` 的宿主。自己做多频道 bot 时先认它；不进状态原语比较 |
| **OpenUI**（Thesys） | ✅ 真；**层=生成式 UI · 目录/渲染** | [thesysdev/openui](https://github.com/thesysdev/openui)（MIT，~15k★）· npm `@openuidev/lang-core` 等 · [openui.com](https://www.openui.com/) | MIT（OSS）；另有 OpenUI Cloud 托管（观察，不进默认路径） | OpenUI Lang（行式 DSL，非 JSON）+ React/Vue/Svelte/Angular runtime；有 `@openuidev/assistant-ui` 桥 | 受控 component library → prompt → 流式 DSL → Renderer；自带 chat UI / 图表表单等 | AG-UI / A2UI 桥可选；assistant-ui 集成包 | **Web 端 generative panel** 的观察池对标（比 json-render 更偏「标准+Lang」叙事）。官网页上的延迟对比数字当营销看，不抄进决策。Cloud/C1 托管出界本 pack |
| **Channels SDK** | ✅ 真；**层=协议/运行时**（CopilotKit 系频道落地） | [CopilotKit/channels-sdk](https://github.com/CopilotKit/channels-sdk)（MIT，~950★）· [介绍文](https://www.copilotkit.ai/blog/channels-sdk) | MIT（SDK）；**频道托管走 CopilotKit Intelligence key**（自托管或托管） | AG-UI agent → Slack Block Kit / Teams Adaptive Cards；HITL、slash、文件 | 「一份交互，各频道原生 UI」+ 审批按钮进对话 | AG-UI + Intelligence | 与 `@json-render/chat` **同场景不同栈**：Channels=AG-UI 全家桶+托管连接；json-render/chat=catalog 渲染挂 Chat SDK。已定 AG-UI/CopilotKit 才看它；Intelligence 密钥是隐性成本——弃「免费开源即可上生产」的糟粕 |
| **A2UI** | ✅ 真；**层=协议**（补全原「AG-UI · A2UI」一行） | [a2ui-project/a2ui](https://github.com/a2ui-project/a2ui)（Apache-2.0，~17k★）· [a2ui.org](https://a2ui.org/) | Apache-2.0 | 声明式 JSON surface 协议；客户端用自有可信组件目录渲染（React/Lit/Angular/Flutter/…） | `createSurface` / `updateComponents` / `updateDataModel` 流式消息；catalog 安全模型（数据非可执行代码） | 可挂 A2A / AG-UI / MCP / WS | **跨信任边界** agent→你的 App 出 UI 时的线协议选项。不是组件轮子；选定前先回答是否真有远程第三方 agent 要在你表面画卡 |

验真备注：二手调研怀疑 BoardUI 与 LocalMode UI 是编造——**错了，但错得有信息量**：两家都是 2026 年的新小项目（BoardUI repo 建于本文写作前 5 天），新到不像真货，而非假货。教训：低星龄短 ≠ 幻觉，验真只认 repo / registry 实证。另：vercel/ai-elements 的 GitHub API license 字段报 NOASSERTION，LICENSE 文件实为 Apache-2.0——API 误报先例，装前核文件。2026-11-08 增补：`@json-render/chat` 出自同一 monorepo 的 v0.22.0（2026-11-04），与 Beautiful UI / AI Elements **不可横向比状态卡**——它解决的是「一份 catalog → 各 Chat SDK 平台原生卡」，属于生成式 UI 渲染层。

## 3 · agent 交互状态清单（本资产核心）

每个状态先问「它必须表达什么」，再对照烂做法。本地源码从 [21 件原始组件目录](./design/beautiful-ui-ai-interfaces/) 取用。下表 `.html` 名称仅为历史视觉参照；实际实现使用相应 TSX、共享件和 foundation。可装件列 §2 验真过的对应物。

| 状态 | 必须表达 | 常见烂做法 | 取用 |
|---|---|---|---|
| **thinking / reasoning trace** | 默认折叠一行（`Thought for Ns`）+ 可展开步骤列表；每步有粒度（搜索/编码/推理分型）与时长；进行中与已完成可区分 | 只放 spinner 不给 trace；展开后无时长无步骤；把 raw JSON 糊给用户；trace 撑开把正文推得乱跳 | 本地 `thinking-state.html`；装件：AI Elements `reasoning`、assistant-ui `reasoning`、LocalMode `agent-step-timeline`（带 finish-reason 徽章，最全） |
| **streaming text + sources** | 部分填充 + 光标（accent 块，非下划线）；inline sources 可折叠；live edge 自动跟随，读者上滚即释放控制权（stick-to-bottom 语义） | 整块替换闪烁；无 follow（读者上滚被拽回底部）；来源堆成裸链接列表无折叠 | 本地 `streaming-text.html`（演示态 blur+caret，**不是**残缺 Markdown 修复）；装件：AI Elements `response`/`sources`；**真流式正文优先 §8 `streamdown` + `use-stick-to-bottom`** |
| **tool call chips** | 紧凑 chip + 状态机（入参流式 → 出参可用 / 出错）+ 计数汇总；失败态一等公民 | 每个 tool call 一张全宽卡轰炸时间线；无失败态；完成后 chip 消失不可追溯 | 本地 `tool-chips.html`；装件：AI Elements `tool`（直接绑 AI SDK `ToolUIPart` state 机）、LocalMode `tool` |
| **approval / HITL 卡** | 框式提问 + 选项 pills + 自定义回答入口 + 多步分页；批准后结果可追溯（留在时间线里，非一次性弹窗） | 用 `confirm()` 弹窗；approve 后查无对证；拒绝/修改路径缺失 | 本地 `approval-card.html`；参考语法：LocalMode `tool-approval`（allow once / remember / deny）、CopilotKit HITL |
| **task rows** | 行级 running / failed / completed 实时态；终态留存可查；失败行可展开原因 | 任务与正文混排无分隔；无终态（永远"进行中"的僵尸行） | 本地 `task-rows.html`；装件：AI Elements `task` + `queue`（排队项）、LocalMode `task` |
| **context cards** | 检索 chunk + 来源 + 体量元数据（字符数）；可整体折叠按来源过滤 | 无来源不可追溯；无元数据只有正文贴片 | 本地 `context-cards.html`；装件：LocalMode `source-citation-list` / `inline-citation` |
| **diff / records 密表** | 12.5px 密行 + sticky header + tint 单元格标增删；filter chips 置顶；diff 是表格不是代码块 | 把 diff 塞进 code block；无 sticky；proposed / applied 不分色 | 本地 `diff-table.html` / `records-table.html`；表格语法总纲：[`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md)；装件：LocalMode Artifacts 家族（data-table / code-diff） |
| **prompt composer** | `@` sources、`/` commands、模型选择器、附件；流式期间 send ↔ stop 互换；**IME 让位 Enter**：`isComposing`（或 keyCode 229）为真时 Enter 只确认候选词，绝不发送 | 组合输入期间 Enter 把半个词发出去；流式期间无 stop；模型切换藏进二级菜单 | 本地 `prompt-bar.html` / `chat-composer.html`；IME 通则：[`i18n-translation-survival.md`](./i18n-translation-survival.md)；装件：AI Elements `prompt-input`（含 attachments + 模型选择）、BoardUI Composer（Pro，闭源仅参考） |

## 4 · 选型阶梯：抄 / 装 / 上框架

沿用 [`ui-stack-decision.md`](./ui-stack-decision.md) §2 的 L 级语言：

| 级 | 动作 | 何时 | orgbrain 落点 |
|---|---|---|---|
| **L0 · 复制源码并适配** | 有官方可用源码时先取源码；没有源码才读 DOM 骨架重建 | 默认态。状态卡体积小、token 绑定深，Astryx 已承载组件层 | **主路径**：Beautiful UI 原始源码 + OrgBrain 真实事件/数据适配；保留原件显式几何与交互，主题映射不能抹平组件形态 |
| **L1 · 装 registry 单件** | shadcn CLI 单件拉入，装后过 DESIGN.md token 改写 | 该状态的边界行为自己写太贵（a11y、stick-to-bottom、branch 树、IME 细节），且件是 presentational 不带 runtime 契约 | LocalMode `@localmode`（Tailwind 4 + 零运行时依赖）是首选源；AI Elements 次之（要接 AI SDK 数据形状） |
| **L2 · 上框架** | 引入 chat 框架 / runtime 契约 | 仅当会话编排（thread 持久化、多 runtime 切换、generative UI 注册）成为产品主轴 | 不走。过 §3 A 行的门：先回答「是不是又一个聊天框」；真到那步，assistant-ui（headless，MIT）优于 CopilotKit（连协议一起定死） |

判定问题（装/上之前逐条过）：

1. 这个状态我们的 agent 真会产出吗？——不产出的状态不装（orgbrain 不做 on-device 推理，LocalMode 的 Local-First 家族整体出局）。
2. 该状态的边界行为（a11y、中断恢复、IME）自己写要几天？——超过半天且 registry 件 presentational，才值得 L1。
3. 装件带进来的数据形状我们接得住吗？——AI SDK message parts / runtime 契约是隐性依赖。
4. 一年后这个 repo 还活着吗？——BoardUI 建仓 5 天、LocalMode 33★，观察池待遇，不满格不进生产路径。

## 5 · 边界（硬闸 + 反模式）

硬闸：

1. 会话历史走既有导航体系：把会话侧栏树塞进 chat 页 = 造出第二套导航，违反 IA 单门（[`ia-user-journey.md`](./ia-user-journey.md)）。
2. composer 周边控件按 [`chrome-controls-placement.md`](./chrome-controls-placement.md) 分置：模型/模式切换是高频状态切换 → 一键 switcher，禁止藏进 menu。
3. registry 件必须过 DESIGN.md token 改写再入库；默认值直出 = 同质化加速器（ui-stack-decision §7）。
4. Beautiful UI 官网已提供 MIT 许可与可复制 TSX；用户要求复用源码时，直接取原件并保留许可，不能再用旧的“无许可 / 只能重写”判断拒绝。闭源 Pro 件按其实际许可处理。
5. license 以 LICENSE 文件为准，不信 API 字段与营销页；未实核不安装。
6. 四层不混：评估任何新名字先落 §2 表格验真，再决定它属于哪层、进不进池。

反模式：

- 拿「agent UI 库」一个词同时指框架、协议、原语、频道生成式卡，然后在错误的层做比较（典型事故：用 json-render 去替代 Beautiful UI thinking 卡）。
- 二手调研的名字直接入池：先验真（§2 有 NOASSERTION 误报与"新到像假货"两个先例）。
- 为一个 thinking 状态引入整个 chat 框架——L0 能解决的上了 L2。
- 状态卡只做 happy path：streaming 无 stop、approval 无事后追溯、tool chip 无失败态。
- composer 的 Enter 不做 `isComposing` 检查，中文输入法选词回车直接发包。

## 6 · 2026-11-08 增补：频道生成式卡 · 精华 / 糟粕

触发：Liz 转发 [Chris Tate / `@json-render/chat`](https://x.com/ctatedev/status/2118853661040295997)（2026-11-06），要求把同类好东西塞进本 pack——**取其精华，弃其糟粕**。本轮只扩「原生频道卡 / 流式结构化 UI / 跨平台 chat catalog / 开放 generative UI 协议」邻域；不收 vibe 设计站、不收闭源-only Pro。

### 精华（决策有用、可核实）

| 取什么 | 为什么有用 | 落点 |
|---|---|---|
| `@json-render/chat` 的 **catalog → `streamCard` / `toCard`** | 一份组件目录，模型吐 JSON，边写边发原生 Slack/Teams 卡；schema 校验 + `limits` 拒平台降级 | 真要做内部 Slack/Teams agent 时装；与 AI SDK `streamText` 示例路径短 |
| **Chat SDK** 作为多平台 bot 宿主 | `@json-render/chat` 的真实依赖面；事件/卡片/流式合同清晰（MIT） | 频道 bot 基础设施选型时认主 |
| **OpenUI Lang「行式可增量解析」** 思路 | JSON 半截不合法；行式 DSL 更贴流式——设计自有 generative 格式时可借鉴，不必整包接入 | 观察池；自研 wire format 时抄原则不抄品牌 |
| **A2UI「UI 是数据、catalog 是信任边界」** | 远程 agent 不能在你 App 里跑任意代码；只请求预批组件 | 跨信任边界场景的协议坐标 |
| **Channels SDK 的 HITL-in-channel** | 审批按钮直接进 Slack/Teams 对话，和本 pack §3 approval 语义同构 | 已选 CopilotKit/AG-UI 时的频道落地参考 |

### 糟粕（显式丢掉）

| 弃什么 | 为什么弃 |
|---|---|
| 把 json-render / OpenUI 当成 Beautiful UI **状态原语**替代品 | 它们不提供 thinking / tool-chip / stick-to-bottom composer；混层比较会选错轮子 |
| 为 Web `/chat` 引入整包 `@json-render/*`（Next / Remotion / R3F / email…） | orgbrain 主路径仍是 L0 抄 Beautiful UI + 偶发 L1 registry；跨介质渲染器与当前产品无关 |
| OpenUI 官网 vs json-render/A2UI 的 **延迟/token 排行榜**当事实 | 单方 benchmark，未独立复现——只记「存在行式 DSL 派 vs JSON 派」 |
| Channels / OpenUI **Cloud 托管**当默认 | 本 pack 只验 OSS 轮子；托管密钥与计费另案 |
| 平台 adapter **静默降级**（如 Slack 第二张表变代码块）当可接受默认 | 生产路径必须显式传 `limits` 或等价拒绝，不能靠降级假装成功 |
| 继续扩张 BoardUI Pro / 闭源 Agent 产品入池 | 硬闸不变：无 LICENSE 文件可核的源码不进默认路径 |

### 对本栈的即时结论

1. **不动主路径**：orgbrain `/chat` 仍 §4 L0（Beautiful UI 原件）+ 按需 L1（LocalMode / AI Elements）。
2. **新槽位**：若产品路线出现「同一 agent 要进 Slack/Teams」，优先评估 **Chat SDK + `@json-render/chat`**；若已绑定 AG-UI，再比 Channels SDK（接受 Intelligence）。
3. **不改四层坐标**：只把原「生成式 UI（出界）」拆成「OSS 目录/渲染（可进池）」与「Agent 产品（仍出界）」，避免再把 catalog 渲染器和 v0 混谈。

## 7 · 产地

2026-09-06，orgbrain /chat 重设计触发（同批产出：[`chrome-controls-placement.md`](./chrome-controls-placement.md)）。二手调研报了六个名字并裁定 v0 出界、怀疑 BoardUI 与 LocalMode UI 为幻觉；经 Exa + GitHub API 逐个实证：四家确认（Beautiful UI / Vercel AI Elements / assistant-ui / CopilotKit），两家"疑似幻觉"实为真实新品。验真证据沉淀于 §2，决策承接 ui-stack-decision §3 A 行。

2026-11-08 增补：Liz 指定种子帖 `@json-render/chat`；经 Exa + GitHub/npm 实核后写入 §2 五行（json-render/chat、Chat SDK、OpenUI、Channels SDK、A2UI）与 §6 精华/糟粕。未改 Beautiful UI 上游 TSX dump。

2026-11-08 再增：Liz 要求加强站内 Streaming；经 Exa + GitHub/npm 实核后写入 **§8**（streamdown / remend / use-stick-to-bottom 等）。未改 Beautiful UI 上游 TSX dump。


## 8 · 2026-11-08 增补：站内 streaming chrome 轮子

触发：Liz 认定「当前 Streaming 不够」，要找开源轮子加强站内 Agent chat（Radar / 出海云 / CFE）——token 流、stick-to-bottom、caret、reasoning 折叠、渐进结构化 UI。**范围仍是第一方 Web**；Slack/Teams Chat SDK 整支继续出界（§6）。

### 主要矛盾

Beautiful UI 的 `StreamingText` / `streaming-text.html` 是**演示态**（按词 blur + 细竖线 caret + 源 chip），不是生产态「半截 Markdown 仍好看 + 读到一半不被拽回底」。AI Elements 内部已经用了 `streamdown` 和 `use-stick-to-bottom`，但本 pack 此前只点了 Elements 整组，**没把这两颗独立 L1 轮子写进验真表**——不装 Elements / 不绑 AI SDK message parts 时等于没货。

### 验真短名单（按装机优先级）

| 排名 | 名字 | repo / npm | license · 星 · 近推 | 解决的 streaming 问题 | 相对 Beautiful UI / AI Elements | 建议 |
|---|---|---|---|---|---|---|
| 1 | **streamdown** | [vercel/streamdown](https://github.com/vercel/streamdown) · npm `streamdown@2.7.1` · [streamdown.ai](https://streamdown.ai/) | **Apache-2.0**（LICENSE + npm 实核；GitHub API 报 NOASSERTION，同 Elements 先例）· ~5.7k★ · pushed 2026-11-05 | 残缺 Markdown 治愈（`remend`）、块级 memo、caret（`block`/`circle`）、stagger 动画、GFM/code/math/mermaid；可选 `@streamdown/cjk` | Elements `response` 的底层；Beautiful UI 演示件**不**含 incomplete-MD 修复 | **L1 装**。站内助手正文默认替换 `react-markdown`。Tailwind 4 要 `@source` 扫 `streamdown/dist`。中文产品加 `@streamdown/cjk` |
| 2 | **remend** | 同 monorepo · npm `remend@1.4.0` | Apache-2.0 · 周下载千万级（npm） | 只做字符串级 incomplete-MD 闭合（bold/code/link/math…），零依赖 | streamdown 的预处理层；可单独喂自有 renderer | 已装 streamdown 则不必另装；自研 MD 管线时 **L1 单装 remend** |
| 3 | **use-stick-to-bottom** | [stackblitz-labs/use-stick-to-bottom](https://github.com/stackblitz-labs/use-stick-to-bottom) · npm `use-stick-to-bottom@1.1.6` | MIT · ~784★ · ~6.6M 周下载 · pushed 2026-06-04 | AI 流式变高时弹簧追底；上滚释放；`isAtBottom` / `scrollToBottom` Promise；不依赖 Safari 不支持的 `overflow-anchor` | Elements `conversation` 已内嵌；Beautiful UI 未带会话级 scroll 宿主 | **L1 装**（零依赖 hook）。别为了 scroll 去上 assistant-ui |
| 4 | **htmlstream**（StreamHtml） | [Alphanimble/htmlstream](https://github.com/Alphanimble/htmlstream) | MIT · ~116★ · pushed 2026-05-29 | 流式 **HTML**（残缺标签修复 + DOMPurify + caret + reasoning 面板） | MD 主路径用 streamdown；仅当模型被约束吐 HTML 卡片时 | **观察池**。安全面比 MD 大，默认不进 Radar |
| 5 | **Proper UI · AI elements** | [properui/properui](https://github.com/properui/properui) · [properui.dev/components/ai-elements](https://properui.dev/components/ai-elements) | MIT · **1★** · pushed 2026-10-16 | SDK-无关的 streaming message / reasoning 自动开合 / stick conversation + `aria-busy` | 与 Beautiful UI / Elements **同层竞品**；星龄短 | **观察池**。要点可抄：`aria-live`+streaming 时 `aria-busy`；不满格不装 |
| 6 | **streamfield** | [midimurphdesigns/streamfield](https://github.com/midimurphdesigns/streamfield) · npm `streamfield@0.2.1` | MIT · **0★** | `streamObject` 字段级 pending/streaming/complete + paced list + typewriter caret | 渐进结构化 UI；不替代正文 MD | **抄 pattern，不装**（星龄零）。货盘/报价卡字段闪烁时自写等价 diff |
| 7 | **chat-scroll** | [flintc/chat-scroll](https://github.com/flintc/chat-scroll) | MIT · **0★** · 建于 2026-06 | `pin-to-top`（ChatGPT 式钉住用户气泡）vs stick-to-bottom | use-stick-to-bottom 只做后者 | **观察池**。产品若要「发送后用户消息钉顶」，先抄策略再评估装 |

### 显式丢掉

| 弃什么 | 为什么 |
|---|---|
| `@json-render/chat` / Chat SDK / Channels | Liz 已裁定：站内不走办公 IM 原生卡 |
| Wingo UI `useStickToBottom` Pro | 预览免费、源码 Pro——违反硬闸 |
| vibe 复刻 / 近 0★ 叉（`probably-not/stick-to-bottom`、`react-bottom-lock`、Clarity 大礼包、arc-lo/ui、velora-ai） | 无生产证据；「330 组件」叙事过重且星近 0 |
| mugen 虚拟列表全家桶 | 5★；流式虚拟化只有真会长历史才需要 |
| 为 streaming 上 assistant-ui / CopilotKit | L0/L1 能解决的不上 L2（§4） |

### 不装库也能偷的 5 个 UX（优先落地）

1. **残缺 Markdown 先治愈再渲**——半截 `**` / 未闭合 fence / 半截链接不得漏原始符号或空白闪一下。
2. **块级 memo**——已完成段落冻结，只重绘末块；长回复不该越流越卡。
3. **stick-to-bottom + 上滚释放 +「↓ 最新」**——跟随时追，读历史时绝不拽回；发送再 `scrollToBottom`。
4. **caret 只在 live edge**——accent 块光标（Beautiful UI 细竖线或 streamdown `block`），`prefers-reduced-motion` 关掉；结束后消失。
5. **reasoning：流式展开 → 结束后折成 `Thought for Ns`**——与 §3 thinking 行同构；工具 chip 失败态一等公民。

### 对本栈的即时结论

1. **下一步装机顺序**：`streamdown`（+ 中文则 `@streamdown/cjk`）→ `use-stick-to-bottom` → 需要时再单装 `remend`。
2. **不动主路径分层**：仍 §4 L0 Beautiful UI 状态卡 + 本条 L1 streaming 专用件；不因「流得好看」换聊天框架。
3. **Beautiful UI `StreamingText` 定位**：视觉参考（blur / 源 chip / follow-ups），生产正文走 streamdown。

## 9 · 2026-11-11 增补：AI thinking orb 归并本档（原独立 ui-patterns/ai-thinking-orb 降格为资产仓）

**裁决（Liz 2026-11-11）**：thinking/status orb 是 agent 状态原语的一种，不配独立文档；原 `ui-patterns/ai-thinking-orb/` 保留为**资产仓**（recipe + vendored upstream），选型结论收本节。

### 性质与硬约束（继承原 SKILL.md，仍生效）

- 每视图最多一颗 live orb；`aria-hidden` + `pointer-events:none`；`prefers-reduced-motion` 冻结；WebGL/Canvas 失败 → 静态 radial 兜底；DPR≤2；不与 Paper live shader/第二 orb/ThreeUI hero 同屏。
- 用途限定：agent 工作中/身份 affordance（合法）；禁当装饰背景、禁成排摆、禁登录页/密集后台滥用。

### 候选盘点（2026-11-11 实测）

| 候选 | 许可 | 体积 | 形态 | 状态 |
|---|---|---|---|---|
| `@yogesharc/thinking-orbs`（thinkingorbs.com） | MIT | 3.8KB gz / 67KB unpacked | Canvas 2D，state+variant+shape/render 组合，React/JS/SwiftUI | npm 0.1.2，2026-10-15 发布 |
| `thinking-orbs`（libraries.dev，Jakub Antalik + Alexandr Brinza） | MIT | 130KB unpacked | 零依赖 React 18+，9 个手调 state（working/searching/solving/…/breathing/shaping），64px/20px 分档调优 | npm 0.3.2，2026-09-22 |
| rare-ui FluidOrb → `ai-thinking-orb/recipes/agent-orb-plain-react.tsx` | 上游无 repo LICENSE（参考拷贝保留署名） | 依赖零 | WebGL1 流体 shader 移植，token 取色 | **已在 cfe-app/shelf-radar 落地——Liz 11-11 现场评价"边缘粗糙、像素感、丑"，待 bake-off 复核** |
| LerSent Liquid Orb（WebGPU） | MIT | shader 已 vendored | 旗舰 hero 级 | 仅 hero 场合，不适合 chat 内小球 |

### 选型原则（Liz 11-11）

成本最低 = 性能最优先；小尺寸（20–24px）下边缘必须圆润——**为小尺寸手调的状态球 > 通用流体 shader**。WebGL 流体在 avatar 尺寸下栅格感明显，不再默认。

### bake-off 结论（2026-11-11，证据 `ui-patterns/ai-thinking-orb/bakeoff-2026-11-11/`）

**胜者 `@yogesharc/thinking-orbs` v0.1.2**（MIT，SVG 粒子点、currentColor 取色、+6.2KB gz）：20px 全 state 连贯实心 disc；runner-up `thinking-orbs`（libraries.dev）64px 更好看但 20px 稀疏有洞且无 idle 态。rare-ui FluidOrb 移植版（`recipes/agent-orb-plain-react.tsx`）**被 Liz 现场否决**——20px 边缘毛糙像素感；降级为 hero/大尺寸场合备选。LerSent Liquid Orb 仍仅旗舰 hero。

**落地参数（Liz 11-11 现场校准）**：尺寸 ~28–32px（20px 太小）；`speed` ≤0.6——"动两下的小玩意"，低注意力成本低侵入；只用默认 variant 的沉静 state（reasoning/working），装饰 variant（gyro/twins/spiral 类）判花里胡哨不用；取色走 `currentColor`/CSS var 绑各产品主色 token（CFE `--marine` #2f5d72、shelf-radar `--accent` #1647e8）。
