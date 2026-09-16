---
name: linear-method-philosophy
description: >-
  Opinionated product operating system distilled from Linear: object model,
  method flow, and defaults discipline. Use when defining 产品哲学, 对象模型,
  工作流取舍, or deciding what NOT to build; not for agent protocols (see
  agent-interaction-guidelines).
---

# Linear Method Philosophy · 产品哲学（纯复用层）

一行定位：Linear 公开的不是源码，而是一套「软件团队应该如何组织工作」的思想体系。上游：`https://linear.app/method`、`https://linear.app/docs/conceptual-model`。

> 本文件只沉淀可跨项目复用的哲学与机制，不含任何 OrgBrain 选型。项目映射另见消费项目的 research 笔记。

## 流程（何时跑、按序做什么、终点怎么判）

1. 先定对象模型，再画界面：Issue / Team / Project / Milestone / Initiative / Cycle / View 七件套先闭环，UI 只是投影。
2. 再定方法流：product direction → useful goals → enablers/blockers → scope down → momentum → write issues → build with users → launch。
3. 每个新对象进模型前先回答：它是容器、分组、时间盒还是关系？回答不上来就不建。
4. 终点：能说出哪三个东西坚决不做成对象，以及为什么。

## 机制依据（按需查的平铺规则）

### 0. 开源 vs 公开产品思想

- Linear 不开源，但 build-in-public 程度极高：公开的是提炼后的方法论、概念模型、设计 rationale、changelog，不是内部 PRD 流水账。
- 可复用结论：抄「思想体系 + 对象演进史」，不找「原始 PRD」。

### 1. 八原则（`https://linear.app/method/introduction`）

1. Build for the creators —— 为每天打开工具 8 小时的 IC 造，不为买单的管理层造。
2. Purpose-built —— 一个场景一种好做法；flexible 到人人自创 workflow 就是规模化混乱。
3. Create momentum, don't sprint —— 用 Cycle 建节奏，不用 deadline 冲刺。
4. Meaningful direction —— Initiative 让每个人看到工作为什么重要。
5. Aim for clarity —— 命名用人话，Project 就叫 Project，不发明黑话。
6. Say no to busy work —— 工具不该让用户当自己的管理员；work-around-work 能自动化就自动化。
7. Simple first, then powerful —— 上手简单，随规模变强。
8. Decide and move on —— 没有最优解时，决策本身就是进展。

### 2. 方法流（`https://linear.app/method` 各子页）

- Set product direction：Initiative 把愿景写成可执行的 product timeline，略超出够得着。
- Set useful goals：从 0 出发的 goal 先写「10 个用户」这种可走回去的路，不写虚数。
- Prioritize enablers and blockers：enabler 加价值，blocker 挡人用；先看是不是「这周不做就卡住」，再看复合效应与复杂度税。
- Scope projects down：1–3 人 × 1–3 周；切不下去就分阶段，MVP 两周先给自己用。
- Generate momentum：每天有可完成的 issue；不知道做什么时先做一件小事拿反馈，不要 paralysis。
- Write issues not user stories：issue 要短、要具体、一周能做完几件；diff 即完成证明。
- Build with users：问用户要问题不要功能；vision 与反馈之间保持 initiatives 做平衡杆。

### 3. 对象模型（`https://linear.app/docs/conceptual-model`）

| 对象 | 角色 | 硬约束 |
|---|---|---|
| Issue | 原子工作单位 | 只需 title + state；必属于恰好一个 Team |
| Team | 拥有 workflow / triage / cycle / label 的单元 | 权限与节奏边界；可 parent/sub 继承 |
| Project | 有明确 outcome、会 close 的容器 | 不是 epic；长期不 close 的是反模式；可跨 Team |
| Milestone | Project 内阶段 | 进度 = 其 issues 完成比；不独占 issue 所有权 |
| Initiative | Project 之上的战略分组 | 手选 curated，非自动聚合；可 parent/sub 多父（OKR 式 rollup） |
| Cycle | Team 的重复时间盒 | 自动重复、未完成自动滚入下期；与 Project 正交 |
| View | 同一份工作的不同看法 | 不改变工作本身；个人执行 / 团队计划 / 全局协调靠 View 切换 |

记忆口诀：issues 跟踪活，teams 拥有流，cycles 管近期，projects 管交付，initiatives 管为什么，views 管怎么看。

### 4. 取舍纪律（跨项目最值得抄的三条）

- Opinionated defaults > 无限配置：原子层（issue 属性、label、due）强意见，高层（team 结构、project 划分）听客户。Jori 原话即守此线。
- Speed 是硬约束不是目标：local-first sync 级别的投入；常用操作慢了，功能直接 redesign 或砍。
- Changelog 即营销：每次发布讲 why + 新对象 + 怎么用；设计改动讲 rationale（例：sidebar 变暗是 "Don't compete for attention you haven't earned"）。

## 边界（硬性 guardrail，正面措辞）

- 只复用思想与对象切割法，不复制 Linear 的名词表与配色到不相关的产品。
- 不把 Project 当 epic 用，不把 parent/sub issue 当 roadmap 用，不给「永远不 close」的工作建 Project。
- 不为假想的第 N 类用户提前加配置；先为一个具体的人做到极致。
- 引用时链上游 URL，不把二手解读当真源。

## 上游真源（只列验证过的）

- `https://linear.app/method` / `/method/introduction` / `/method/product-direction` / `/method/set-useful-goals` / `/method/prioritize-enablers-and-blockers` / `/method/scope-projects` / `/method/building-with-momentum` / `/method/build-with-users`
- `https://linear.app/docs/conceptual-model`
- `https://linear.app/docs/making-the-most-of-linear`
- `https://linear.app/learn/intro-to-linear`
- `https://linear.app/changelog/2024-06-25-introducing-initiatives`
- `https://linear.app/changelog/2024-05-02-the-next-generation-of-linear-projects`
- `https://linear.app/now/a-design-reset` / `https://www.linear.app/now/how-we-redesigned-the-linear-ui` / `https://linear.app/now/behind-the-latest-design-refresh`
