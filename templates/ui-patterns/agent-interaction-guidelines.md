---
name: agent-interaction-guidelines
description: >-
  Reusable contract for agents living inside a work system: identity,
  nativity, feedback, transparency, disengage, accountability, plus
  Session/Activity/delegation primitives. Use when designing Agent 交互,
  delegation, MCP 暴露面, or recurring agent loops; not for product
  philosophy (see linear-method-philosophy).
---

# Agent Interaction Guidelines · Agent 交互契约（纯复用层）

一行定位：Agent 住进工作系统时，人与 Agent 共处一屏的六条契约 + 一套可落地的原语。上游主要是 Linear 的 AIG 与 Agent SDK 实践，但本文件只收跨产品成立的部分。上游：`https://linear.app/developers/aig`、`https://linear.app/developers/agents`、`https://linear.app/developers/agent-interaction`、`https://linear.app/developers/agent-best-practices`。

> 本文件不含任何 OrgBrain 选型（Pi / MCP scope / Proof Ledger 映射走消费项目自己的 research）。

## 流程（何时跑、按序做什么、终点怎么判）

1. 先给 Agent 身份：它是 workspace 里的一等用户，有独立 id / token / 权限，能被 @、能被指派、能被管理员收回。
2. 再定交互原语：Session 跟踪一次任务的生命周期，Activity 表达 thinking / tool / 澄清 / 结果 / 错误。
3. 再定责任模型：delegation（人挂 assignee、Agent 挂 delegate），不用 assignment 把锅甩给 Agent。
4. 终点：任意时刻人能一眼回答「这是人干的还是 Agent 干的、它在什么状态、谁为结果负责、怎么让它停」。

## 机制依据（按需查的平铺规则）

### 1. 六原则（AIG 原文，跨产品成立）

1. Always disclose it's an agent —— 忙碌 feed 里扫一眼也不能把 Agent 认成人；身份标识是底线。
2. Inhabit the platform natively —— Agent 走人和同一套 UI pattern 与标准动作；不用为 Agent 另造一套心智模型。
3. Provide instant feedback —— 被唤起后立刻给不打扰的确认；沉默 = 焦虑。
4. Transparent about internal state —— thinking / waiting / executing / done 一眼可辨；需要时可 inspect 推理、tool 调用、prompt、决策链。
5. Respect requests to disengage —— 叫停就停，且只在收到明确信号后才重新进入。
6. Cannot be held accountable —— Agent 干活，人负责；delegation 里永远有一个 human assignee。

### 2. 原语：Session × Activity

- Session 状态机（建议照抄六态）：`pending / active / error / awaitingInput / complete / stale`；状态由最后一次 activity 自动推导，不手工维护。
- Activity 类型（建议照抄五类 + 一种只读）：`thought / action / elicitation / response / error`，外加用户侧只读的 `prompt`（Agent 不可伪造用户发言）。
- Activity 是 frozen-in-time 快照；comment 可被编辑，不可作为对话重建依据；重建对话读 activities 列表。
- Plan 是 session 级 checklist：整体替换，不单条 patch；适合多步任务的过程可见性。
- externalUrls：Agent 把外部会话 / PR / dashboard 挂回 session，避免「看起来无响应」。

### 3. 身份与权限（actor=app 模式）

- 安装即建独立用户：OAuth 加 `actor=app`，每个 workspace 一个独立 app-user id（存好，别和 OAuth client id 搞混）。
- 能力按 scope 渐进披露：`app:assignable`（可被 delegate / 进 project）、`app:mentionable`（可被 @）；不申请就不出现，老应用不受影响。
- 权限变更可订阅（permission-change webhook），管理员随时降级/收回 team 访问。
- 集成 vs Agent 的分界：只读或以个人名义写 → integration；以独立身份出现、有自己的名字和行为 → agent。

### 4. 时序合同（抄数字）

- webhook 接收 5s 内必须回包；`created` 事件后 10s 内必须发第一个 `thought`（或更新 externalUrl），否则标 unresponsive。
- 之后 30 分钟内后续 activity 可续命；stale 可恢复，再发一条 activity 即可。
- 订阅 `AgentSessionEvent` 即向用户露出 Session UI —— 调试订阅也会露，開關要想好。

### 5. 最佳实践（防呆）

- 开工先把 issue 推到 `started` 类第一顺位（按 position 最小取），完工发 `response`，要人动手发 `elicitation` / `error`。
- repository 建议走「候选集 + 置信分」两段式：先给候选 repos，再由平台按 issue/session/guidance 信号排序；拿不准就 elicitation，别猜。
- ephemeral activity 只给 `thought / action` 用，下一条 activity 到达即被替换；别拿它发结论。
- mention 写法：activity body 里直接贴 Linear URL 的 Markdown，由平台转成 mention。

### 6. Recurring loops（把一次交互变成制度）

- Loop = trigger（schedule / issue 条件）+ 自然语言指令 + 可选 MCP 连接器 + 权限；跑在 team / workspace 层，指令与每次 run 对所有可见。
- 最佳启动法：先在一次 chat 里把事办成、打磨好，再把它转成 loop；别一上来就写自动化。
- coding session 是 loop 的一种权限：允许它才准开 draft PR；triage 里的「先进来先修」是最值的第一条 loop。

## 边界（硬性 guardrail，正面措辞）

- issues 只 assign 给人，只 delegate 给 Agent；一个 issue 同时有 human owner 与 agent delegate。
- 约束优先编码进 tool 形状（参数可理解、非法动作做不出来），而不是全写进 prompt 里喊话。
- skill 按需加载：prompt 推断先装可能相关的，跑中再由 Agent 自己拉新的；常驻全量 prompt 是浪费。
- 高风险/难撤销动作必须中途停下等人确认；Agent 在本轮创建的东西可免确认，别的一律确认。

## 上游真源（只列验证过的）

- `https://linear.app/developers/aig`
- `https://linear.app/developers/agents`
- `https://linear.app/developers/agent-interaction`
- `https://linear.app/developers/agent-best-practices`
- `https://linear.app/changelog/2025-07-30-agent-interaction-guidelines-and-sdk`
- `https://linear.app/now/our-approach-to-building-the-agent-interaction-sdk`
- `https://linear.app/now/how-we-built-linear-agent`
- `https://every.to/thesis/how-to-design-for-human-agent-interaction`
- `https://linear.app/docs/mcp`（MCP 端点与读写分离）
- `https://linear.app/docs/loops` / `https://linear.app/now/introducing-loops`
- `https://linear.app/docs/coding-sessions` / `https://linear.app/now/coding-sessions-for-linear-agent`
- `https://linear.app/docs/connect-mcp-servers`
