---
name: agentic-ui-primitives
description: >-
  Verified landscape of open-source agentic UI component wheels: the
  four-layer coordinate (state primitives vs chat frameworks vs
  protocols/runtimes vs generative UI), a per-vendor verification table
  (Beautiful UI, Vercel AI Elements, assistant-ui, CopilotKit, BoardUI,
  LocalMode UI — repo, license, stack, primitives, agent channel), an agent
  interaction-state inventory with required semantics and common failures, and
  the copy-pattern vs registry vs framework selection ladder. Use when picking
  or auditing wheels for an agent chat surface (e.g. orgbrain /chat), verifying
  a new vendor name before it enters the candidate pool, or deciding between
  self-built state cards, registry installs, and chat frameworks.
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
| **生成式 UI（出界）** | agent 生成整个界面 | v0 等 Agent 产品 | Liz 裁定出界：只比开源组件轮子，不比 Agent 产品 |

过门（承接 §3 A 行审计裁定）：评估任何新名字前先回答**「它是不是又一个聊天框」**——聊天框只是状态原语的一种宿主；一个只会把 Thread 渲染出来的轮子不进状态原语比较。

## 2 · 验真结论表（2026-09-06 · Exa 检索 + GitHub API 实证）

新名字进池前必须先过这张表；同名再查不必重搜。栈列以 orgbrain（React 19 + Tailwind 4 + Astryx，非 Next.js）为基准。

| 名字 | 判定 | repo / npm | license | 栈 | 真实卖的 primitives | agent 通道 | 本栈适配 |
|---|---|---|---|---|---|---|---|
| **Beautiful UI** | ✅ 真，站点活跃 | [beautifului.dev](https://www.beautifului.dev/)；**无公开 repo** | 无 OSS license | React + Tailwind，copy-paste；Turbo 工作室出品，无 npm | 20 个 agent 状态原语（pack 已收 19，`Flowchart` 未收录）：loading / thinking / streaming / approval / tool chips / task rows / prompt bar / context cards / diff·records·filter 表… | **无官方 registry / CLI / MCP**——纯人肉 copy-paste；`TyCoding/beautiful-ui-vue` 的 `/agent/` 端点是第三方 Vue 移植，不算原厂通道 | 只抄 pattern；本体已 rebuild 进本 pack，无安装问题 |
| **Vercel AI Elements** | ✅ 真 | [github.com/vercel/ai-elements](https://github.com/vercel/ai-elements) · npm `ai-elements`（CLI） | Apache-2.0（LICENSE 文件实核；GitHub API 报 NOASSERTION 是误报） | shadcn/ui + AI SDK（`@ai-sdk/react`）+ Tailwind CSS variables 模式 | ~29 组件：conversation、message+branch、prompt-input、reasoning、tool、task、plan、queue、terminal、file-tree、checkpoint、code-block、sources、inline-citation、web-preview、actions、suggestion… | shadcn registry（`elements.ai-sdk.dev/api/registry/*.json`）+ 自有 CLI `npx ai-elements@latest` | Tailwind 4 即插；数据形状绑 AI SDK message parts——TanStack Start 可用，但要把自己的 agent 事件流映射成 AI SDK 形状 |
| **assistant-ui** | ✅ 真 | [github.com/assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) · npm `@assistant-ui/react` | MIT | React headless 原语，Radix `asChild` / Base UI `render` 双味（2026-07 起 `base-` style 为 shadcn init 默认） | Thread / Message / Composer / ThreadList / ActionBar + reasoning、tool-group、mcp-config、model-selector、threadlist-sidebar 等；runtime 适配 AI SDK / LangGraph / AG-UI / A2A / data-stream | shadcn registry `@assistant-ui`（`r.assistant-ui.com/styles/{style}/{name}.json`）+ `llms.txt` / `.md` 机器可读文档 | 框架不是素材：接它 = 接受 runtime 契约；与「Astryx 已承载组件层」冲突，默认不装 |
| **CopilotKit** | ✅ 真 | [github.com/CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | MIT | React / Angular / Vue / RN SDK；AG-UI 协议作者 | Generative UI 三模式（static AG-UI / declarative A2UI / open MCP Apps）、HITL、共享状态、多渠道（Slack / Teams） | AG-UI 协议 + MCP Apps | 协议/运行时层选项；引入 = 同时定死 agent 线协议，不在组件赛道比较 |
| **BoardUI** | ✅ 真（**非幻觉**，但很新） | [github.com/BoardUI/boardui](https://github.com/BoardUI/boardui)（2026-09-01 建，150★）+ [boardui.com](https://www.boardui.com/) | free 层 MIT；Pro 付费 license | React + Tailwind，Figma 设计，400+ tokens | 64 个 free 组件 + Pro agent 组（Agent Thinking、Composer Loader、GlassComposer、Composer）+ agent blocks + AI chat 模板 | `npx boardui add` CLI + MCP | 单人新项目、低星龄短；Pro 组件无源码——观察池，不急装 |
| **LocalMode UI** | ✅ 真（**非幻觉**） | [github.com/LocalMode-AI/LocalMode](https://github.com/LocalMode-AI/LocalMode)（33★）· registry `@localmode` → `localmode.ai/r/{name}.json` | MIT | shadcn registry；Tailwind 4 CSS variables；组件纯 presentational（零 `@localmode/*` 运行时依赖） | 107 primitives / 10 families + 37 blocks：Conversation 24（agent-step-timeline（ReAct，含 finish-reason 徽章 max_steps/timeout/loop_detected/error）、tool、tool-approval、branch、citation…）、Local-First 25（model downloader、capability gate）、Results 12、Artifacts 4、DevTools 4 | shadcn CLI + 把 shadcn MCP server 指向 registry | 六家里栈适配最好的 registry：Tailwind 4 + props 驱动，随便接后端；Local-First 家族对 orgbrain 无用，Conversation 家族可单件取 |

验真备注：二手调研怀疑 BoardUI 与 LocalMode UI 是编造——**错了，但错得有信息量**：两家都是 2026 年的新小项目（BoardUI repo 建于本文写作前 5 天），新到不像真货，而非假货。教训：低星龄短 ≠ 幻觉，验真只认 repo / registry 实证。另：vercel/ai-elements 的 GitHub API license 字段报 NOASSERTION，LICENSE 文件实为 Apache-2.0——API 误报先例，装前核文件。

## 3 · agent 交互状态清单（本资产核心）

每个状态先问「它必须表达什么」，再对照烂做法。本地参照指向 `design/beautiful-ui-ai-interfaces/sections/` 的 DOM 骨架；可装件列 §2 验真过的对应物。

| 状态 | 必须表达 | 常见烂做法 | 取用 |
|---|---|---|---|
| **thinking / reasoning trace** | 默认折叠一行（`Thought for Ns`）+ 可展开步骤列表；每步有粒度（搜索/编码/推理分型）与时长；进行中与已完成可区分 | 只放 spinner 不给 trace；展开后无时长无步骤；把 raw JSON 糊给用户；trace 撑开把正文推得乱跳 | 本地 `thinking-state.html`；装件：AI Elements `reasoning`、assistant-ui `reasoning`、LocalMode `agent-step-timeline`（带 finish-reason 徽章，最全） |
| **streaming text + sources** | 部分填充 + 光标（accent 块，非下划线）；inline sources 可折叠；live edge 自动跟随，读者上滚即释放控制权（stick-to-bottom 语义） | 整块替换闪烁；无 follow（读者上滚被拽回底部）；来源堆成裸链接列表无折叠 | 本地 `streaming-text.html`；装件：AI Elements `response` + `sources` / `inline-citation`（conversation 自带 use-stick-to-bottom） |
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
| **L0 · 抄 pattern** | 读本地 DOM 骨架 + DESIGN.md token，自写实现进本项目形态 | 默认态。状态卡体积小、token 绑定深，Astryx 已承载组件层 | **主路径**：L3 signature 自研 + 借 Beautiful UI 的 DOM 语法与 AI Elements 的 state 命名法；§3 八态里大半走这条 |
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
4. 无 license 的源（Beautiful UI）只抄行为 pattern + 自写实现，不逐字节 vendor；闭源 Pro 件（BoardUI Pro）不引入生产路径。
5. license 以 LICENSE 文件为准，不信 API 字段与营销页；未实核不安装。
6. 四层不混：评估任何新名字先落 §2 表格验真，再决定它属于哪层、进不进池。

反模式：

- 拿「agent UI 库」一个词同时指框架、协议、原语，然后在错误的层做比较。
- 二手调研的名字直接入池：先验真（§2 有 NOASSERTION 误报与"新到像假货"两个先例）。
- 为一个 thinking 状态引入整个 chat 框架——L0 能解决的上了 L2。
- 状态卡只做 happy path：streaming 无 stop、approval 无事后追溯、tool chip 无失败态。
- composer 的 Enter 不做 `isComposing` 检查，中文输入法选词回车直接发包。

## 6 · 产地

2026-09-06，orgbrain /chat 重设计触发（同批产出：[`chrome-controls-placement.md`](./chrome-controls-placement.md)）。二手调研报了六个名字并裁定 v0 出界、怀疑 BoardUI 与 LocalMode UI 为幻觉；经 Exa + GitHub API 逐个实证：四家确认（Beautiful UI / Vercel AI Elements / assistant-ui / CopilotKit），两家"疑似幻觉"实为真实新品。验真证据沉淀于 §2，决策承接 ui-stack-decision §3 A 行。
