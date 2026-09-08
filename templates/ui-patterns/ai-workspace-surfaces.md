---
name: ai-workspace-surfaces
description: >-
  Page-level interaction contract for a multi-tenant AI workbench: prominent
  workspace switching and administration, a persistent side-by-side agent rail,
  compact decision-oriented activity, editable boards, and a Mermaid-to-React
  Flow visualization ladder. Use when designing or auditing /workspace, /chat,
  dashboard activity, board detail editing, or process visualization; use
  agentic-ui-primitives for individual message and tool states.
---

# AI workspace surfaces · 工作区、Agent 侧栏、活动流与流程图

研究日期：2026-09-08。研究对象是页面编排，不是换肤图库。只采用官方产品文档、官方产品公告、官方 GitHub 与本地已固定的官方源码；没有用聚合榜单、博客或二手截图推断交互。

一句话结论：**主对象留在中间，Agent 留在可收起的右侧；Workspace 是常驻上下文，Activity 是按对象聚合的低优先级摘要；流程图按“只读生成 → 可交互编辑”从 Mermaid 升到 React Flow。**

这份资产与 [`../agentic-ui-primitives.md`](../agentic-ui-primitives.md) 分工：那份回答 thinking、tool、approval、composer 等单个状态原语；本文回答这些原语应该住在什么页面结构里。

---

## 0 · 四个表面的拍板

| 表面 | 主任务 | 页面合同 | 不做 |
|---|---|---|---|
| `/workspace` | 切换、识别、管理组织上下文 | Workspace 切换器常驻主导航顶端；管理页按 General / Members / Invitations / Access 分区；名称、图标、成员与邀请都可操作 | 藏在 More；一张大卡包住全部设置；只显示不可复制的邀请码 |
| `/chat` / 任意工作页的 Agent | 一边看组织记录，一边让 AI 解释或拟改 | 桌面端中间是记录/文档/看板，右侧是 360–480px 可调宽 Agent rail；窄屏降级为 Sheet/Drawer；主对象在 Agent 打开时仍可交互 | 把 Agent 做成离开当前工作的独立目的地；聊天占满整个工作区；用弹窗遮住记录 |
| Dashboard / board | 扫描优先事项、直接改工作项 | Activity 降为紧凑摘要并按对象聚合；卡片拖拽改变状态；打开/双击进入内联编辑或 side peek；AI 在同一个右侧 rail 辅助 | 每条低价值事件一张大卡；用“移到某列”菜单替代主拖拽路径；每次属性变动都制造一条噪音 |
| Visualization | 解释或编辑工作流 | Astryx Stepper 只表示线性进度；Mermaid 表示只读/生成式关系；React Flow 表示可拖、可连、可持久化的图编辑器 | 为三个线性步骤装图编辑器；拿漂亮流程图代替真实状态；把 Mermaid 当可视化编辑器 |

推荐桌面骨架：

```text
┌──────────────┬────────────────────────────────────┬──────────────────┐
│ Workspace +  │ 当前对象：记录 / 文档 / 看板       │ Agent rail       │
│ product nav  │ 保持可见、可选中、可直接编辑       │ thread / tools   │
│ 216–256px    │ min 560px, flex: 1                 │ 360–480px 可调宽 │
└──────────────┴────────────────────────────────────┴──────────────────┘
```

右侧 rail 不是第二套全局导航。它只有当前对象的协作上下文、会话与 Agent 状态；Workspace、Dashboard、Projects 等仍只在左侧产品导航定义一次。

---

## 1 · `/workspace`：重要上下文，不是 More 里的杂项

### 1.1 为什么必须常驻

- [Clerk `OrganizationSwitcher`](https://clerk.com/docs/react/reference/components/organization/organization-switcher) 把当前组织视为 session 的活动上下文，并把切换、创建与进入管理串在同一入口。
- [Linear Workspaces](https://linear.app/docs/workspaces) 把 workspace 名称放在左上角，点击后进入 Settings 或切换；还提供 `O` → `W` 快捷键。
- [Notion sidebar](https://www.notion.com/help/navigate-with-the-sidebar) 同样把 workspace switcher 放在侧栏顶部，并把创建、加入、切换与账号动作收在这里。

因此 `/workspace` 可以是管理页，但“当前 Workspace / 切换 Workspace”本身必须在应用 shell 常驻，不能只靠用户先找到管理页。

### 1.2 页面结构

```text
Workspace header
  [logo] OrgBrain                 [Switch workspace] [Invite members]
  12 members · 1 pending invite · created 2026-09-05

Tabs / local nav
  General | Members | Invitations | Access

General
  Identity        [logo] [name____________] [slug readonly] [Save]
  Workspace facts Created by · created at · current plan/limits if real

Members
  [Search] [Role filter] [Status filter]                  [Invite]
  Name / email               Role        Status        Joined       ⋯

Invitations
  Invite link [https://…____________________] [Copy] [Reset]
  Pending invitation rows + role + inviter + expiry + revoke

Access
  Who may invite · default role · domain/join policy
  Danger zone: leave / delete (权限与确认后才出现)
```

机制依据：

- [Clerk `OrganizationProfile`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-profile) 把 General、Members、Invitations/Requests 与管理员动作分开；管理员可改组织资料、邀请、改角色和移除成员。
- [Linear Members and roles](https://linear.app/docs/members-roles) 的成员页是可筛选的行表，角色与 suspended / pending 等状态是一等维度，不是头像墙。
- [Notion Workspace settings](https://www.notion.com/help/workspace-settings) 明确支持改 workspace 名称和图标，并把权限敏感设置按可见角色过滤。

### 1.3 邀请不是一段灰字

[Linear invitations](https://linear.app/docs/invite-members) 同时提供邮件邀请和可重置的持久 invite link；[Clerk invitations](https://clerk.com/docs/guides/organizations/add-members/invitations) 则把邀请建模为带唯一链接、角色、状态、重定向和撤销的对象。OrgBrain 若仍使用邀请码，至少要提供以下完整状态：

1. 等宽、只读输入框展示完整 code 或 link；默认不截到无法核对。
2. 右侧常驻 Copy icon button；成功后 1.5–2 秒变为 check + “已复制”，并保留 screen-reader 文案。
3. 显示有效期、适用 Workspace、默认角色和使用限制；未知就明确写未知，不能伪造“永久有效”。
4. 管理员可 Reset / Revoke；动作后二次确认并立即更新旧值状态。
5. 列出 pending / accepted / expired / revoked；失败可就地重试。

### 1.4 密度与空白

- 让成员表和邀请表承担页面密度；不要用四张等高指标卡填空。
- General 设置使用 600–720px 的阅读宽度；Members / Invitations 使用全宽数据面。
- 只有一个主 CTA：Invite members。Rename / Save 是当前区块动作，Delete 在 danger zone。
- 空成员态必须说明“谁能邀请、邀请后得到什么”，并给真接线 CTA。
- 非管理员仍可看到 Workspace 身份与自己的 membership，但管理控件按权限隐藏或禁用并解释原因。

---

## 2 · Agent 应该与工作并排，不该把工作赶走

### 2.1 一手产品信号

- [Cursor Agent](https://cursor.com/docs/agent/overview) 的入口是 sidepane；[Cursor history](https://docs.cursor.com/en/agent/chat/history) 在 Agent sidepane 内打开，支持打开、改标题、删除、导出 Markdown，并可用 `@Past Chats` 引入过去会话。
- [ChatGPT Canvas](https://openai.com/index/introducing-canvas/) 让用户在聊天之外直接编辑内容、选区请求局部修改并恢复版本，核心是“并肩创作”，而不是让长文反复塞回消息气泡。
- [Claude Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) 把独立内容放在主对话右侧的专用窗口，供用户继续查看、修改与复用。
- [Notion side peek](https://www.notion.com/en-gb/help/views-filters-and-sorts) 打开右侧详情时，左侧数据库仍然可交互；这正是 OrgBrain 看板卡片与 Agent 共存的最低合同。

### 2.2 Desktop shell

| 区域 | 内容 | 状态 |
|---|---|---|
| 左侧产品导航 | Workspace switcher、Dashboard、Projects、Evidence、Decisions；Agent 入口可有，但不是唯一入口 | 固定或 icon-collapse；结构不随 chat 打开改变 |
| 中间工作区 | 当前记录、PRD、证据、看板或 visualization；选中内容可发送给 Agent | 始终是主区域；Agent 打开后仍可点击、选择、拖拽和编辑 |
| 右侧 Agent rail | 当前对象标题、会话切换/历史、transcript、tool/proposal 状态、anchored composer | 可收起、可调宽；宽度持久化；独立滚动 |

右侧建议默认 400px，最小 336px，最大为窗口宽度 42%；中间区小于 560px 时不要继续挤压，改为 overlay Sheet。布局原语可用 [shadcn Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) 的 controlled / right-side / collapsible 思路与 [Resizable](https://ui.shadcn.com/docs/components/radix/resizable) 的键盘可用分隔条；组件源码是 [MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)。这些数字是本 pack 的 OrgBrain profile，不是上游默认值。

### 2.3 当前对象上下文

Agent rail header 必须回答三件事：

```text
OrgBrain Agent
正在查看：项目 / OrgBrain
上下文：PRD + 3 条证据 + 当前选中的工作项
```

- 切换中间对象时，明确提示“上下文已切换”，不能静默沿用上一个项目。
- 用户选中文字或卡片后，出现“问 Agent / 拟议修改”就地动作；发送的是稳定对象 ID + 选区，不是只复制肉眼文本。
- Agent 提议的修改以 diff / proposal 留在 transcript，用户确认后更新中间主对象；拒绝、失败、撤销都可追溯。
- 用户自己编辑与 Agent 编辑走同一个字段 schema、验证和保存路径；不要建第二个只给 Agent 的写入模型。

### 2.4 会话历史放哪里

会话历史是 Agent rail 内的局部层，不是永久并排的第四栏。默认只显示当前 thread 标题 + history 按钮；打开后覆盖 rail transcript 或用 rail 内二级视图展示：

- New thread
- Search（有足够历史后才显示）
- 按 Today / Yesterday / Earlier 分组
- rename / archive / delete
- running / unread 状态
- 返回当前 thread

[assistant-ui ThreadList](https://www.assistant-ui.com/docs/primitives/thread-list) 已定义创建、切换、归档、删除和键盘焦点；其 [Thread list element](https://www.assistant-ui.com/elements/thread-list) 还给出搜索、日期分组、rename 与独立受控数据模式。它的价值是交互合同，不等于 OrgBrain 必须采用 assistant-ui runtime。

### 2.5 窄屏降级

- `< 900px`：Agent 作为右侧 Sheet，占 88vw、上限 480px；关闭后回到原对象与原滚动位置。
- `< 640px`：Sheet 全宽；详情编辑和 Agent 不同时叠两层。先关 Agent 再打开详情，或用顶部 segmented control 切换 Work / Agent。
- composer 固定在 rail 底部；transcript 自己滚动。页面 body 不跟着消息增长。
- Agent toggle 必须有持久、可发现的 icon button；快捷键只能补充，不能替代按钮。

---

## 3 · 可复用的开源轮子：抄机制，不整站换皮

基线 SHA 是 2026-09-08 调研时的可复现位置。装前仍需重新核当前 LICENSE、依赖与安全更新。

| 上游 | 基线 / License | 可直接研究的实现 | OrgBrain 借什么 | 不借什么 |
|---|---|---|---|---|
| [assistant-ui](https://github.com/assistant-ui/assistant-ui/tree/30f3fc8cfaa205b170923e0436f0c4e1ca013969) | `30f3fc8` · MIT | [`with-artifacts`](https://github.com/assistant-ui/assistant-ui/tree/30f3fc8cfaa205b170923e0436f0c4e1ca013969/examples/with-artifacts)；[Artifact live example](https://www.assistant-ui.com/examples/artifacts)；ThreadList；[Tool UI / HITL](https://www.assistant-ui.com/docs/tools/tool-ui) | 右侧 artifact/agent surface、同一对象 ID 的 inline trigger ↔ full panel、thread keyboard 行为、工具状态 | 默认不接整个 runtime；OrgBrain 已有事件与确认合同，先做 adapter 评估 |
| [Vercel Chatbot](https://github.com/vercel/chatbot/tree/c2f8235e1f3ea903ad8b7f61447c4f74164b5c58) | `c2f8235` · [Apache-2.0](https://github.com/vercel/chatbot/blob/c2f8235e1f3ea903ad8b7f61447c4f74164b5c58/LICENSE) | [`components/chat`](https://github.com/vercel/chatbot/tree/c2f8235e1f3ea903ad8b7f61447c4f74164b5c58/components/chat)、artifact、sidebar history、diff、persistence | 完整 chat shell 如何拆 history / artifact / composer；artifact 独立状态与版本动作 | Next.js、Auth、DB 与 AI SDK 数据层不能整包移入 TanStack 项目 |
| [LangGraph Agent Chat UI](https://github.com/langchain-ai/agent-chat-ui/tree/bf69587d8bd10a6919120ee086a4ac6f10b0ceaf) | `bf69587` · [MIT](https://github.com/langchain-ai/agent-chat-ui/blob/bf69587d8bd10a6919120ee086a4ac6f10b0ceaf/LICENSE) | [`src/components/thread`](https://github.com/langchain-ai/agent-chat-ui/tree/bf69587d8bd10a6919120ee086a4ac6f10b0ceaf/src/components/thread)：history、artifact、generic interrupt、tool calls | agent interrupt / resume、tool call、artifact 与历史的真实状态覆盖 | 只有后端是 LangGraph 或事件形状高度一致时才考虑代码复用 |
| [shadcn/ui](https://github.com/shadcn-ui/ui/tree/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048) | `3ba91b1` · MIT | Sidebar、Resizable、Sheet、Tabs、Table；官方 [dashboard block](https://ui.shadcn.com/blocks?category=dashboard) | 壳层、可调宽 rail、移动端降级与数据面基础 | 不能把 dashboard-01 的默认视觉当 OrgBrain 设计；registry 输出必须过项目 token 与密度合同 |
| [Beautiful UI](../design/beautiful-ui-ai-interfaces/) | 固定 `06557d7` · MIT | 已归档的 21 个官方 TSX：thinking、task、approval、diff、records、flowchart、prompt | rail 内状态原语和 compact diff / records | 不把 harness 假数据或商用 Central Icons 带进产品 |

许可警告：CopilotKit 根仓是 MIT，但其 [`showcase/`](https://github.com/CopilotKit/CopilotKit/blob/main/showcase/LICENSE) 使用 Source Available License，限制商业用途，也禁止用来形成相似/竞争产品。**不要研究或复制 showcase 的页面实现**；若未来采用 CopilotKit，只能从根仓 MIT 范围和官方公开 API 文档重新界定可用部分。

### 3.1 选择顺序

1. 先用现有 OrgBrain 数据合同和 Beautiful UI 状态原语完成页面骨架。
2. 需要 side-by-side / resize / mobile sheet 时，单件取 shadcn 源码级原语。
3. ThreadList 的键盘、持久化或 artifact 同步自己写超过半天时，再 spike assistant-ui 的受控 primitive / example。
4. 不因“它是 AI template”就接 runtime；数据协议、权限、确认与持久化成本必须单列。

---

## 4 · Dashboard：Activity 是证据，不是主角

### 4.1 两类活动必须分开

| 类型 | 例子 | 呈现 |
|---|---|---|
| **需要注意 / 可行动** | 等你确认的提议、失败写入、被阻塞、@你、即将到期 | Dashboard 主区的 compact queue；可直接处理 |
| **历史 / 审计** | 建立项目、改字段、移动列、补证据 | 对象详情内的 Activity；Dashboard 只给摘要或入口 |

[Notion Inbox](https://www.notion.com/help/updates-and-notifications) 把通知按页面与 comment thread 聚合，并允许锁定 pane 继续工作；[Linear Pulse](https://linear.app/docs/pulse) 让用户在 For me / Popular / Recent 和自定义 feed 间筛选，而不是把所有事件等权铺开。OrgBrain Dashboard 应采用同一原则：先按“是否需要我动作”筛，再按对象聚合。

### 4.2 Compact activity profile

```text
最近活动                                              [查看全部]
OrgBrain · 立项                                        23:32
  Liz 创建项目 · 1 条同批变更

Germany catalog · 补充证据                            昨天
  Angel 添加 3 个来源
```

- Dashboard 默认 3–5 组，单行 40–52px；不为每条事件套独立 Card。
- 同一 actor、同一 object、同一 action、短时间窗口内的事件折叠成一组，显示 “+N 条同批变更”。
- 时间是 trailing meta，不是视觉标题；描述最多两行，完整审计进入对象详情。
- “查看全部”进入可筛选 Activity 页面，或在右侧 pane 展开；不要让整个 Dashboard 因活动数量无限增长。
- 0 条活动是正常空态；加载失败与 0 条必须分开。

[Linear create issue](https://linear.app/docs/creating-issues) 把创建后前三分钟的属性变化视为创建过程，不追加为独立 Activity。OrgBrain 不必照搬“三分钟”，但应借用“一个用户意图对应一个活动组”的语义：立项 + 同一提交内的初始字段写入应是一条 canonical creation activity。

### 4.3 重复立项不是 Activity CSS 问题

出现两条内容相同、相差一分钟的“立项”，先核是否存在两个 Project ID：

- 若只有一个 Project、两条日志：修事件投递/消费去重，Activity 以 `event_id` 唯一。
- 若有两个 Project：修 create command 的幂等性。前端 pending 时禁用重复提交只是第一层；服务端还需 idempotency key 或可表达业务唯一性的约束。
- Activity 必须从 canonical Project creation event 派生，不能同时监听“按钮点击”和“数据库插入”两个来源。

UI 可以减少误点，不能把真实重复对象折叠掉来掩盖数据错误。

---

## 5 · Board：拖拽是主路径，详情/Agent 是 side peek

[Linear board](https://linear.app/docs/board-layout) 的手动排序以拖拽为主，并在移动到新列时按落点保存顺序；`Space` 可打开 [Peek preview](https://linear.app/docs/peek) 查看卡片详情，同时用上下键扫相邻对象。[Linear editing](https://linear.app/docs/editing-issues) 允许直接点击 title / description 内联编辑。[Notion side peek](https://www.notion.com/en-gb/help/views-filters-and-sorts) 则保证详情打开后看板仍可交互。

OrgBrain profile：

1. Hover 卡片显示 grab cursor；拖动时给原位 ghost、目标列高亮、有效落点线。
2. Drop 后乐观更新，但保留 saving / failed / retry；服务端拒绝时回到原列并说明原因。
3. `… → 移到` 仅作为键盘/触屏/无拖拽的辅助路径，不放成每张卡最显眼的动作。
4. 双击标题区进入 inline edit；单击打开右侧详情 pane。不要把整个卡片双击都劫持，以免与文本选择和 drag 冲突。
5. 详情 pane 包含字段、描述、证据与 Activity；顶部可切 `Details | Ask Agent`，或从同一 pane 打开 Agent rail。不能再叠一个遮罩 modal。
6. Agent 拟改字段时显示 proposed → confirm → applied / failed；人工直接改同一字段时正常保存，不强迫经过对话。
7. 键盘路径：Enter 打开详情，`E` 编辑，`Esc` 退出；移动操作由可发现的 command menu 兜底。

卡片只显示帮助扫列的属性。完整字段在 side peek；这也符合 Linear 官方说明：board card 空间有限，详情应通过 peek 或打开对象查看。

---

## 6 · Visualization：Astryx 没有 Mermaid 替代品

2026-09-08 在 OrgBrain 当前安装的 Astryx 0.5.2 实跑：

```text
npx astryx search "flow diagram graph timeline stepper workflow"
```

命中 Stepper / Step templates / TreeList 等，但没有通用 node-edge graph 或 Mermaid 式 DSL renderer。Astryx 官方仓的稳定 core 是组件系统；Vega / charts 仍只在 canary 发布范围，见 [Astryx official repo](https://github.com/facebook/astryx)。所以不要继续猜一个不存在的稳定 Flow 组件。

### 6.1 选型梯子

| 需求 | 选择 | 为什么 | License / 边界 |
|---|---|---|---|
| 3–7 个线性阶段，用户只需知道当前到哪 | Astryx `Stepper` | 已在栈内；progress、status 与 step content 足够 | Astryx MIT；它不是任意图 |
| Agent 根据事实生成只读流程、关系、时序或泳道 | [Mermaid](https://mermaid.js.org/) | 文本可 diff、可由 Agent 生成；`render`/`parse` API 可嵌入；flowchart 支持节点、边、subgraph，2026 还有 swimlane beta | [MIT](https://github.com/mermaid-js/mermaid)；用户/模型输入先 `parse`，按官方安全建议保持更新与 DOMPurify 基线 |
| 用户要拖节点、连边、改属性、保存布局 | [React Flow](https://reactflow.dev/) | 拖拽、缩放、选择、连接、custom node 已内建；官方例子覆盖 save/restore、validation、prevent cycles、touch | [MIT](https://github.com/xyflow/xyflow)；Pro 示例/模板另有订阅边界，免费示例与 Pro 不能混写许可 |
| Agent transcript 里短暂展示一个固定小流程 | [Beautiful UI Flowchart](../design/beautiful-ui-ai-interfaces/upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/Flowchart.tsx) | 已归档、视觉与 Agent 消息一致；适合小图 | 静态展示原语，不升级成编辑器；必须接真实节点/边 |

Mermaid 的 [flowchart syntax](https://mermaid.js.org/syntax/flowchart.html) 已覆盖方向、决策、subgraph、扩展节点形状；[API usage](https://mermaid.js.org/config/usage) 支持 `render` 和渲染前 `parse`。React Flow 的 [official examples](https://reactflow.dev/examples) 则明确区分免费 MIT examples 与 Pro examples，并展示 save/restore、validation、touch、drag-and-drop 等编辑行为。

### 6.2 数据合同先于渲染器

无论选哪一种，流程必须来自同一个领域模型：

```ts
type ProcessNode = {
  id: string
  kind: "fact" | "work" | "decision" | "evidence" | "gate"
  label: string
  status: "unknown" | "pending" | "active" | "done" | "failed"
  objectId?: string
}

type ProcessEdge = {
  id: string
  from: string
  to: string
  relation: string
  evidenceIds: string[]
}
```

- Mermaid 是这个模型的只读 serializer；React Flow 是同一模型的 editor projection。
- 点击节点回到真实 OrgBrain object；没有 `objectId` 的演示节点必须标 demo，不得装成组织事实。
- `unknown`、`pending`、`failed` 分开；颜色只能增强，节点文字/图标仍要表达状态。
- 图上改边要走与列表/表单相同的权限、proposal 与审计路径。
- 超过约 20 个有效节点先按 project / phase / object kind 分层，不做上帝图。

---

## 7 · OrgBrain 落地顺序

1. **先修领域不变量。** 查重复立项究竟是重复 Project 还是重复 Activity；建立 canonical create event 与幂等边界。
2. **先换 shell，不换所有皮肤。** Workspace switcher 升到主导航；中间工作区 + 右 Agent rail + mobile Sheet 跑通。
3. **让当前对象真正进 Agent 上下文。** 用 object ID、selection 与 evidence refs；提议写回仍走现有确认门。
4. **重做 `/workspace` 信息架构。** General / Members / Invitations / Access；先接 rename、copy、reset/revoke、role/status，再做 polish。
5. **压 Activity。** Dashboard 只留 action queue + 3–5 个聚合组；完整历史回对象详情。
6. **板上交互统一。** drag 是主移动路径，click side peek，title double-click / `E` 编辑，失败可恢复。
7. **可视化渐进。** 先 Stepper / Mermaid 只读；只有明确的“用户编辑图”旅程通过后才 spike React Flow。

每一步都做真实旅程验收，不以组件出现或 build 通过代替：

- 切 Workspace 后 URL / session / 权限 / 数据范围全部改变，刷新后仍一致。
- Rename 保存并刷新仍存在；Invite copy 内容正确；Reset 后旧链接不能再加入。
- Agent 打开时仍能看、选、编辑主对象；rail 宽度、开合与当前 thread 刷新后可恢复。
- Board 拖动写入真实状态；失败会回滚；键盘和触屏有等价路径。
- Activity 不重复隐藏真实对象；重复 create 测试在服务端被拒绝或复用同一结果。
- Mermaid 非法输入显示可恢复错误；React Flow（若采用）节点/边保存刷新后不丢。

---

## 8 · 边界与反模式

- 产品参考只证明交互机制，不授予复制视觉或代码的许可；Clerk、Cursor、Linear、Notion、ChatGPT、Claude 只作行为参照。
- 开源仓必须按具体子目录 LICENSE 判定；CopilotKit 根仓 MIT 不代表 `showcase/` MIT。
- “Side-by-side”不等于永远三栏：窄屏必须有 Sheet/单栏降级，中间对象不能被压到不可用。
- 一个对象只开一个详情/Agent pane；不叠 sheet + modal + popover 三层。
- Activity 聚合不能吞掉失败、审批、权限变化等高价值事件。
- 视觉库迁移不能改变 create idempotency、proposal confirmation、permission 与 audit contract。
- 图形化不是事实来源；节点/边都要能回到真实对象与证据。

---

## Sources and References

产品行为（一手）：

1. [Clerk · Create and manage Organizations](https://clerk.com/docs/guides/organizations/create-and-manage)
2. [Clerk · OrganizationSwitcher](https://clerk.com/docs/react/reference/components/organization/organization-switcher)
3. [Clerk · OrganizationProfile](https://clerk.com/docs/js-frontend/reference/components/organization/organization-profile)
4. [Clerk · Organization invitations](https://clerk.com/docs/guides/organizations/add-members/invitations)
5. [Linear · Workspaces](https://linear.app/docs/workspaces)
6. [Linear · Members and roles](https://linear.app/docs/members-roles)
7. [Linear · Invite members](https://linear.app/docs/invite-members)
8. [Linear · Board layout](https://linear.app/docs/board-layout)
9. [Linear · Peek preview](https://linear.app/docs/peek)
10. [Linear · Edit issues](https://linear.app/docs/editing-issues)
11. [Linear · Create issues and activity grouping behavior](https://linear.app/docs/creating-issues)
12. [Linear · Pulse](https://linear.app/docs/pulse)
13. [Notion · Navigate with the sidebar](https://www.notion.com/help/navigate-with-the-sidebar)
14. [Notion · Workspace settings](https://www.notion.com/help/workspace-settings)
15. [Notion · Database side peek](https://www.notion.com/en-gb/help/views-filters-and-sorts)
16. [Notion · Inbox and notifications](https://www.notion.com/help/updates-and-notifications)
17. [Cursor · Agent overview](https://cursor.com/docs/agent/overview)
18. [Cursor · Chat history](https://docs.cursor.com/en/agent/chat/history)
19. [OpenAI · Introducing Canvas](https://openai.com/index/introducing-canvas/)
20. [Anthropic · What are Artifacts?](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)

开源实现与许可（一手）：

1. [assistant-ui official repo, MIT](https://github.com/assistant-ui/assistant-ui)
2. [assistant-ui · Artifacts example](https://www.assistant-ui.com/examples/artifacts)
3. [assistant-ui · ThreadList](https://www.assistant-ui.com/docs/primitives/thread-list)
4. [Vercel Chatbot official repo, Apache-2.0](https://github.com/vercel/chatbot)
5. [LangGraph Agent Chat UI official repo, MIT](https://github.com/langchain-ai/agent-chat-ui)
6. [shadcn/ui official repo, MIT](https://github.com/shadcn-ui/ui)
7. [Astryx official repo, MIT](https://github.com/facebook/astryx)
8. [Mermaid official repo, MIT](https://github.com/mermaid-js/mermaid)
9. [Mermaid · Flowchart syntax](https://mermaid.js.org/syntax/flowchart.html)
10. [Mermaid · API usage](https://mermaid.js.org/config/usage)
11. [React Flow official repo, MIT](https://github.com/xyflow/xyflow)
12. [React Flow official examples and free/Pro boundary](https://reactflow.dev/examples)
13. [CopilotKit Showcase restricted license — exclusion evidence](https://github.com/CopilotKit/CopilotKit/blob/main/showcase/LICENSE)
