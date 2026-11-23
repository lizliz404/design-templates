---
name: ui-frontier-osint-dd-2026-11-23
description: >-
  UI 技术与现成开发工具的独立 OSINT 尽调。Use when 选择渲染、同步、无样式组件、生成式 UI、编辑器、脚手架或验证工具；需要区分前沿机制、稳定基线、迁移代价与可逆试验时。
---

# UI 技术尽调：先选责任边界，再选前沿工具

**全应用主报告：** [《构建现代应用到底需要什么》](../modern-application-osint-dd-2026-11-23.md)覆盖领域/API、后端、数据库、身份、任务、文件、AI、部署、观测、安全与恢复。本篇保留为 UI 专题分册，不应当作完整应用研究。

核验日期：2026-11-23，Asia/Shanghai。本文是选型参考，不是指定技术栈，也不涉及任何具体项目。

**阅读顺序：** 先读结论和一页地图。需要试用时看第 5 节。查版本、许可证与入口看附录 A。原四条输入帖的出处与内容核对在附录 B，新增两帖在 B.5–B.6。本文覆盖 **35 个主条目、7 层职责、12 份重点分析**。成熟工具是对照组，不冒充新技术。pstack、Thermos 和 React Compiler 另作方法与基线核验，不计入 35 项。

## 1. 先给结论

1. **最值得关注的是把隐含责任变成可检查的合同。** Solid 2 把异步纳入响应式依赖图；UI SDK 把焦点、键盘和选择行为拆成可组合单元；TanStack DB 把数据变成可查询集合；json-render、A2UI 把模型能生成的 UI 限定在组件目录内。它们解决不同问题，不能按一个“先进程度”排名。[Solid](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) · [UI SDK](https://ui-sdk.dev/docs/core) · [DB](https://tanstack.com/db/latest) · [json-render](https://json-render.dev/docs) · [A2UI](https://a2ui.org/)
2. **独立选型不能被四条帖限定。** 浏览器原生控件、CSS、React Compiler、Vue Vapor、Angular Signals 和 Lit 都能以不同代价消除同类问题。先问是否需要增加依赖，再问选哪种依赖。一个原生 `<dialog>` 或普通服务器表单足够时，不需要引入新的组件行为系统或客户端数据库。[原生弹窗](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) · [React Compiler](https://react.dev/learn/react-compiler) · [Vue Vapor](https://github.com/vuejs/core/releases/tag/v3.6.0-rc.1) · [Angular](https://angular.dev/guide/signals) · [Lit](https://lit.dev/docs/)
3. **本轮几个容易判断错的事实：** Solid 2 已稳定发布；UI SDK 仍为 beta，且它不是 AI SDK；Vue 3.6/Vapor 仍在 RC；Qwik 的旧、新包名对应不同发布线；Jazz 的 `latest` 已指向全新 2.0 beta，不能套用 Classic Jazz 的教程；Vite+ 已有公开 MIT 发布，不能沿用早期预览时期的印象。具体版本见附录 A。
4. **通常先升级局部工具，而不是重写框架。** 已有 React 应用先检查组件划分、React Compiler、数据缓存和真实浏览器测试。已有 Vue 应用可对比普通 SFC 与局部 Vapor。新建高交互应用才有理由把 Solid 2、Zero、LiveStore 等纳入架构级试验。这里是迁移成本判断，不是对任何框架的普适性能结论。
5. **数据层的投入与收益往往比换渲染器更大，但数据迁移也更难撤回。** TanStack DB 能从现有 API 渐进接入；Zero、Electric 面向已有数据库的同步；LiveStore 以事件日志为事实来源；Jazz 2 是后端内嵌数据库与权限系统。它们不是四种等价的 `useState`。[DB RC 公告](https://tanstack.com/blog/tanstack-db-1.0-rc1-going-all-in-on-oracles) · [Zero](https://zero.rocicorp.dev/docs/introduction) · [Electric](https://electric-sql.com/docs/intro) · [LiveStore 取舍](https://docs.livestore.dev/overview/when-livestore/) · [Jazz 2](https://jazz.tools/docs)
6. **模型输出结构化 UI，不等于安全或正确。** 组件白名单能阻止任意代码进入页面，但不能替代服务端鉴权、参数校验、操作确认、幂等写入、链接和资源 URL 策略。流中断、乱序、重复事件和恢复后的旧操作，都要单独测试。
7. **“可验证”优于“听起来 agent-friendly”，但验证也有边界。** axe、浏览器测试、属性测试、模型检查、模型审阅覆盖不同错误。测试通过不等于视觉验收；有限模型成立不等于实现正确；多个模型同意不等于确定性证明。第四条帖真正值得保留的是分层验证和按改动风险控制成本，而不是每次提交运行所有工具。

### 当前建议的处置

| 处置 | 候选 | 为什么 |
| --- | --- | --- |
| 可进入常规选型 | 原生 Web 能力；符合既有生态的 Base UI、React Aria、Ark UI；Storybook、Vitest Browser Mode、fast-check；React Flow | 能局部引入，责任比较清楚。仍须核对框架、浏览器与版本兼容 |
| 有条件采用 | Solid 2、TanStack Start、StyleX、Vite+、Lit、Svelte 5、Angular Signals | 已有明确发布，但换框架、构建和样式编译链都有迁移成本。新建与存量不能同一结论 |
| 隔离试验 | UI SDK、TanStack DB RC、Vue Vapor RC、Qwik 2 RC、Waku RC、Zero/Electric、json-render、A2UI、CopilotKit/AG-UI | 新 API、同步部署、生成式交互或兼容矩阵需要用本地证据验证 |
| 先观察或严格限域 | Jazz 2 beta、LiveStore、tla-ts、大面积 Liquid Glass；tldraw 的商业采用 | 新数据模型、文档与发布线变化、形式工具可信度、GPU 成本或许可证是主要门槛，不是演示是否吸引人 |

“隔离试验”不表示项目质量差。“常规选型”也不表示应立即替换现有工具。没有一种方案同时最小化初始体积、团队学习成本、开发速度、跨平台差异和退出成本。

## 2. 一页地图：这些层不能互相替代

| 层 | 负责什么 | 本文主条目 | 先用什么作对照 | 不能替你解决什么 |
| --- | --- | --- | --- | --- |
| 渲染、响应式与组件模型，7 项 | 什么发生变化、哪里更新、异步如何进入渲染 | Solid 2、Svelte 5、Vue/Vapor、Angular、Lit、Qwik、Waku | 已有框架；React + Compiler；服务器 HTML | 数据权限、产品结构、组件可访问性全貌 |
| 服务端数据、客户端查询与同步，5 项 | 真相存放在哪、读写如何到达 UI、离线如何合并 | TanStack DB、Zero、Electric、Jazz 2、LiveStore | HTTP + 服务端查询；TanStack Query | 渲染器选择、自动正确的业务冲突规则 |
| 组件行为、设计系统与样式，6 项 | 焦点、键盘、ARIA、组合与样式编译 | UI SDK、Base UI、Ark UI/Zag、React Aria、shadcn registry、StyleX | 原生表单、dialog、popover；普通 CSS | 正确的信息架构、自动通过无障碍验收 |
| 模型、事件流与生成式 UI，6 项 | 模型流、工具交互、组件目录、原生呈现 | AI SDK、assistant-ui、CopilotKit/AG-UI、A2UI、json-render、OpenUI | 固定页面 + 结构化数据；普通聊天 | 业务授权、可靠事实、任意 UI 的正确性 |
| 高级交互、画布与编辑，3 项 | 图编辑、无限画布、特殊 GPU 外观 | React Flow、tldraw、Liquid Glass | DOM/CSS、静态 SVG、列表与表单 | 自动成为有价值的交互、免费商业使用 |
| 构建、全栈边界与现成起步，4 项 | 路由、服务器函数、打包、可组合生成器 | TanStack Start、Vike、Vite+、Better-T-Stack | 现有构建链；Vite；框架官方 starter | 自动兼容所有部署目标、免维护的全栈 |
| 验证与反例，4 项 | 状态样本、真实浏览器、属性与状态空间 | Storybook、Vitest Browser Mode、fast-check、tla-ts | 单元测试、Playwright E2E、人工键盘与读屏 | 模型无遗漏、生产零故障、自动设计评审 |

### 2.1 不增加依赖也能前进

浏览器能力必须逐项看，而不是把“现代浏览器”当作一个版本。

- 原生表单、`<dialog>` 和 Popover API 可以承担一部分焦点、顶层显示与关闭语义。**Popover 不等于完整 modal，也不等于 combobox。** 原生能力减少的是自己维护的行为量，不免除读屏、键盘、嵌套与滚动测试。[Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) · [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- CSS anchor positioning 能减少浮层定位脚本；View Transition API 能减少一部分页面与状态切换动画代码。不同子特性的兼容性不同，跨文档和同文档不能混为一谈。[Anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) · [View transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- 用 [Web Platform Baseline](https://web.dev/baseline) 确认支持范围，再按实际设备与 WebView 验收。Baseline 不是无障碍认证，也不是对用户浏览器分布的替代。
- React Compiler 的自动 memoization 是已有 React 应用应纳入的对照。它不需要把组件改成 signals，也不能让昂贵的算法或不合理的订阅凭空消失。[官方说明](https://react.dev/learn/react-compiler)

### 2.2 用条件取舍，不给总分

| 你最重视什么 | 优先比较 | 愿意付出的代价 |
| --- | --- | --- |
| 存量应用最小变化 | 当前框架 + 原生能力 + 局部库 + 可复核测试 | 接受部分历史复杂度，逐步清理 |
| 新建应用的细粒度更新和异步表达 | Solid 2、Svelte 5、Vue Vapor、Angular Signals | 分别学习依赖追踪、编译语义、特性子集和框架约束 |
| 低端设备首次交互 | 服务器 HTML、渐进增强、Qwik、减少客户端代码 | 序列化、懒加载切分、事件边界和第三方库适配 |
| 跨框架长期设计系统 | 原生 Custom Elements/Lit、UI SDK core、Ark/Zag | 框架包装、事件类型、SSR、表单与 Shadow DOM 集成 |
| 即时、离线、多端协作 | TanStack DB + 同步方案；Zero；Jazz；LiveStore | 数据复制、权限撤销、冲突、存储和运维成本 |
| 模型生成交互且保持约束 | 固定组件 + 工具渲染；json-render；A2UI；OpenUI | 目录、状态、动作和协议版本需要自己治理 |

这里的“更优”是条件成立时的局部取舍。渲染器性能、团队熟悉度、组件生态、上线速度和可迁移性之间不存在永久统治所有方案的单一最优点。

## 3. 十二份重点分析

每份先列公开可核实的机制，再列本文判断。版本与日期统一在附录 A，避免把发布公告、包版本和成熟度混成一个数字。

### 3.1 Solid 2：把异步放进响应式图，而不是再包一层 fetch

**公开事实。** 2026-11-16 官方稳定发布公告介绍了异步响应式图：计算可以返回 Promise 或异步迭代器，下游读取参与 pending、旧值保留与边界处理。公告还介绍了服务器函数、开发期结构化诊断和缩减的 API。ReactiveScript、TSRX 被明确称为实验；“未来几周”的 reactive Server Components 不能算今天已交付的稳定能力。[发布说明](https://www.solidjs.com/blog/solid-2-0-the-long-hold/) · [仓库](https://github.com/solidjs/solid) · [2.0.3 release](https://github.com/solidjs/solid/releases/tag/solid-js%402.0.3)

**具体收益。** 传统实现经常独立维护请求、loading、过期值与回滚。Solid 尝试由依赖图协调这些状态。它还让运行时看到依赖边，向人和编码 agent 报告未跟踪读取、循环和过大扇出等问题。这是可观测性与约束的变化，不是“用了 signals 就自动快”。

**取代与互补。** 改的是组件执行、状态和异步语义。它不取代远程缓存、服务端权限或搜索引擎。Solid JSX 与 React JSX 外观相近，但依赖读取、生命周期、props 与更新语义不同，不能用自动改 import 当迁移。

**起步证据。** 官方公告给出 `npm create solid@latest`。UI SDK Solid 文档明确要求 `solid-js` 与 `@solidjs/web` 2.0.0 或更高。升级必须同步检查 router、测试渲染器和 UI 适配器，不能只改 `solid-js`。[UI SDK 安装](https://ui-sdk.dev/docs/solid/installation)

**反面证据与门槛。** 第二条输入帖把迁移增行解释为框架承担更少复杂度；Cursor 工程人员的[公开回应](https://x.com/poteto/status/2089227731305464150)则描述了实际遇到的响应式意外扇出、agent 误写和维护成本。两者均不是控制变量性能实验。要比较相同交互、相同数据、相同设备下的主线程工作、订阅扇出、内存和修复成本。

**判断：受控试验，适合愿意采用新执行模型的新建交互模块。** 不因“agent-oriented”重写正常运行的应用；不把开发期诊断理解为生产形式证明。MIT，Solid 团队与社区维护。刚稳定的 2.0 还要给生态留出对齐时间。

### 3.2 UI SDK：把行为拆到组件以下，不是 AI SDK 的别名

**公开事实。** 确切项目是 [ui-sdk.dev](https://ui-sdk.dev/docs/core)，仓库 [vercel-labs/ui](https://github.com/vercel-labs/ui)。`@ui-sdk/core` 提供焦点、键盘、选择、弹层、拖放、手势等行为。React、Solid、Vue、Svelte 与 Web Components 适配层把行为渲染为组件。Solid 文档的入口正是第一条帖给的链接。[行为目录](https://ui-sdk.dev/docs/core/behaviors) · [Solid 入口](https://ui-sdk.dev/docs/solid)

**新机制。** 从“选择完整无样式组件”进一步下沉为“组合一组可验证行为”。自定义控件不必重新实现每一个键盘与焦点细节。随 npm 包分发的文档、`llms.txt` 和 skill 将 agent 绑定到已安装版本，而不是泛用记忆。它们帮助定位合同，不能保证 agent 一定遵守。

**替代边界。** 可与自有 CSS、StyleX、视觉皮肤一起用。与 Base UI、Ark UI、React Aria 在无样式行为层存在重叠；与 shadcn registry 在分发方式上互补；与 AI SDK 在职责上不同。现有 Radix/Base UI 组件没有因为它出现而失效。

**起步证据。** `npm install @ui-sdk/solid @ui-sdk/core`；自建行为组件见 [Build a Component](https://ui-sdk.dev/docs/core/get-started)。试验应固定适配器与 core 的同一精确版本。此次 `latest` 为 beta.13，`beta` 为 beta.16。GitHub release 显示 beta.16 在 11 月 23 日继续发布，不能把无标签安装描述成“拿到最新 beta”。

**风险。** core 的组合方式也增加组合错误空间。自定义组件仍需检查嵌套弹层、虚拟列表、输入法、触摸、表单、RTL 和读屏。仓库 Apache-2.0，同时 README 提醒适用 Vercel beta terms。需分别读代码许可与 beta 条款，不能凭 Vercel Labs 归属推断 GA、支持承诺或永久 API。

**判断：先在一类标准库没有覆盖的控件上试。** 不为统一品牌而把所有成熟组件重新拼装。它最大的价值应由少写多少行为代码、少出多少状态错误来证明。

### 3.3 TanStack DB：先统一可查询集合，不急着换后端

**公开事实。** DB 把 API 或同步引擎数据接成类型化 collection，在客户端运行增量关系查询，并支持乐观变更和持久化协调。Query collection 允许从已有请求层接入。2026-10-29 的 1.0 RC1 公告介绍了 SSR、Start 集成以及用独立参考实现作 oracle 的测试方式。npm 当前仍是 RC，不因公告说“production-ready”就标成 1.0 stable。[文档](https://tanstack.com/db/latest) · [RC 公告](https://tanstack.com/blog/tanstack-db-1.0-rc1-going-all-in-on-oracles) · [仓库](https://github.com/TanStack/db)

**为什么新。** 普通请求缓存按 query key 管理远程结果。DB 对规范化集合表达 join、filter 和聚合，并维护变化后的结果，减少“每个屏幕一个接口”和前端反复整表重算之间的两难。它是客户端查询与协调层，不是新的持久化数据库服务器。

**起步证据。** [Quick Start](https://tanstack.com/db/latest/docs/quick-start)给出 `npm install @tanstack/react-db @tanstack/query-db-collection @tanstack/query-core`。先用已有 HTTP API，之后再决定是否加 Electric、离线持久化或其他适配器。

**成本与非目标。** 要设计 collection 身份、加载方式、事务、失败回滚与本地/服务端查询等价性。无界大结果集不能因为“本地查询快”就全部下载。它不自动给 REST API 加行级授权，也不凭空解决多人写冲突。RC 升级要读迁移指南。

**维护与判断。** TanStack 社区维护；RC 公告列出 Kyle Mathews、Sam Willis、Kevin De Porre，并交代 Electric 孵化与 Neon 后续支持。MIT。对已有后端、交互关系查询较多的应用，是比立即引入全新同步数据库更可逆的第一试验。普通列表分页若已经够用，TanStack Query 是更小的基线。

### 3.4 Zero：把所需关系数据同步到客户端，代价是认真运行同步系统

**公开事实。** [Zero](https://zero.rocicorp.dev/docs/introduction)让 UI 查询本地规范化存储，按查询同步所需数据，后台与服务器持续协调。canonical repo 是 [rocicorp/mono](https://github.com/rocicorp/mono)，不是沿用旧文章里的独立仓库名。官方提供 [React、Solid 与 Cloudflare starters](https://zero.rocicorp.dev/docs/quickstart)。Apache-2.0，由 Rocicorp 维护。

**机制区别。** TanStack DB 首先是集合与查询层。Zero 同时带查询、客户端缓存与同步基础设施。Electric 主要提供从 Postgres 到客户端的 shape 数据流，写入通常走应用自己的 API。三者可能组合，也可能有职责重叠，不能只按 API 长相挑选。

**起步证据。** 使用官方 `hello-zero`、`hello-zero-solid` 或 `hello-zero-cf`，不要把其中一种部署模板误写成全部部署边界。前两者是 Vite/Hono 路线，Cloudflare 模板另有说明。

**关键风险。** 本地副本意味着权限撤销、退出登录、共享设备残留数据都要测试。[认证文档](https://zero.rocicorp.dev/docs/permissions)明确提醒本地持久缓存的影响，也提醒认证 cookie 不应设置 `SameSite=None` 以免引入跨站 WebSocket 劫持风险。查询权限应由受信服务端上下文执行，不能信任客户端提交的 userID。

**判断：为“等待网络就是主要体验问题”付费，不为技术整齐而部署。** 先证明离线变更、失败恢复、权限变化、多标签页和数据规模都能处理，再讨论覆盖更多业务。已有简单 REST + Query 足够时，运行同步服务的总成本未必更低。迁移成本中高，退出需要保留服务端 API 与规范数据导出。

### 3.5 LiveStore：事件日志是真相，SQLite 是可重建的查询结果

**公开事实。** [LiveStore](https://docs.livestore.dev/)以事件、materializer 与 SQLite 查询组织应用状态。同步后可在设备上运行同步读取，平台和同步 provider 分开。官方列出 Web、Expo、Node、Electron、Tauri 等方向，同时明确文档仍在完善。[仓库](https://github.com/livestorejs/livestore) · [适用与不适用](https://docs.livestore.dev/overview/when-livestore/)

**真正取舍。** 本地查询、离线编辑、回放与撤销有统一的数据基础。但事件命名、确定性 materializer、日志演化、压缩、备份和模型升级也成为持久责任。它不是“给已有 SQL 库加离线插件”。官方明确建议已有数据库仍需作为事实来源时比较 Zero/Electric。

**起步证据。** [Getting started](https://docs.livestore.dev/getting-started)给出 `npx @livestore/cli create --example web-todomvc-sync-cf --branch docs/stable livestore-app`。这是 React + Cloudflare 同步示例，不意味着基础库只能部署在 Cloudflare。选择其他 provider 仍需自己验证。

**风险。** npm 已是 0.5.1，文档页头与示例部分仍显示 0.5.0。0.4→0.5 还涉及 Effect 3→4。不要混装同一套 LiveStore 包的不同版本，也不要把提供 Electric provider 理解成能直接复用任意已有 Postgres 表。[比较说明](https://docs.livestore.dev/overview/technology-comparison/) · [Electric provider 限制](https://docs.livestore.dev/sync-providers/electricsql/)

**判断：适合愿意从第一天采用事件模型的新应用，暂不作存量默认迁移。** Apache-2.0，LiveStore 团队与社区维护。退出成本高于 UI 库，因为要带走的不只有数据行，还有事件语义和重放规则。

### 3.6 Jazz 2：本轮最需要防止“凭旧印象介绍”的项目

**公开事实。** 当天 npm `jazz-tools@latest` 已是 **2.0.0-beta.1**。当前 [官方文档](https://jazz.tools/docs)把 Jazz 定义为运行在后端内部的关系数据库，内置实时查询与权限。TypeScript schema 和权限会生成应用合同。前端可选 thin client 或支持离线的 local-first client。[仓库](https://github.com/garden-co/jazz) · [Jazz 2 quickstart](https://jazz.tools/docs/quickstart)

**为什么不同。** schema、权限、生成代码和后端数据库处在同一系统里。它不要求额外部署独立数据库服务，并可以挂在自己的 Hono 等后端上。代价是采用它自己的数据与权限 API，而不是在旧查询上装一个 hook。

**起步证据。** 官方 quickstart 给出 `npm create jazz`，并明确教程针对 Jazz 2 beta。写完 schema 后运行 `npx jazz-tools generate`。升级前要看对应版本的备份和迁移说明。

**不能沿用的结论。** 官方明确把 2.0 之前称为 Classic Jazz，API 不同。不要把旧 CoValues/协作对象模型、旧服务部署和旧版本教程直接写成 Jazz 2 的现状。官方文档给出的 thin/local-first 体积估算也不是本文的实测；采用前需在自己的构建里复测，尤其检查 Wasm 成本。

**判断：观察或单独原型，不接管重要持久数据。** MIT，Garden 团队维护。beta 不代表不能用，但 major API、数据迁移和工具链同时变化时，应先具备备份恢复、导出与回滚证据。

### 3.7 json-render：让模型写可校验的 UI 说明，而不是任意代码

**公开事实。** [json-render](https://json-render.dev/docs)由开发者定义组件与动作 catalog，模型生成受目录约束的 JSON spec，registry 映射到本地组件。JSONL patch 支持渐进渲染，数据绑定、可见性与动作属于运行时合同。仓库 [vercel-labs/json-render](https://github.com/vercel-labs/json-render)，Apache-2.0。

**机制收益。** 模型只决定组合，宿主掌握组件实现。相较任意 JSX/HTML 生成，可以限制可执行能力与设计系统范围，也便于对 spec 做存储、重放和快照比较。这不是保证模型一定给出正确布局，而是把不正确输出变成能拒绝或降级的输入。

**起步证据。** [安装](https://json-render.dev/docs/installation)与 [Quick Start](https://json-render.dev/docs/quick-start)展示 catalog、registry、生成路由和 renderer 的完整链路。React 安装命令为 `npm install @json-render/core @json-render/react`，并按文档配置 React/Zod peers。已有组件可以接入，无须换设计系统。

**要付出的成本。** catalog 是公开给模型的 API，要控制体积、属性、动作权限、版本和弃用。流到一半的树、未知组件、错误类型、重复 patch、旧 spec 回放和用户编辑后再次生成，都需要定义语义。不能把 schema 校验当成用户意图与业务权限校验。

**判断：先试只读、可撤回的交互区域。** 不把不可逆动作直接暴露成任意动作名。0.x 迭代快，需固定版本并记录 spec 兼容范围。对于固定三种卡片，普通工具结果映射往往更简单。

### 3.8 A2UI：跨客户端的 UI 合同，与 AG-UI 的运行事件分开理解

**公开事实。** 当前 canonical repo 为 [a2ui-project/a2ui](https://github.com/a2ui-project/a2ui)，站点 [a2ui.org](https://a2ui.org/)。它包含流式 UI 协议、原生 renderer 和 agent SDK；宿主把声明式消息映射到受信组件目录。当前站点列出 React、Lit、Angular、Flutter、SwiftUI、Jetpack Compose 等 renderer。**列出支持不代表不同 renderer 每个组件和版本完全等价。**

**分工。** A2UI 说明要呈现什么组件、数据与交互。AG-UI 管 agent 与前端之间的消息、工具、状态和生命周期事件。AG-UI 可以承载 A2UI payload，不表示选了 A2UI 就必须连同某一完整聊天框架一起采用。[AG-UI 介绍](https://docs.ag-ui.com/introduction) · [A2UI quickstart](https://a2ui.org/quickstart/)

**与 json-render 的比较。** 两者都避免让模型直接执行随意生成的 UI 代码。json-render 可作为应用内组件 catalog 与 renderer 的起点；A2UI 更值得在多种客户端、不同 agent 后端需要共同消息合同时评估。不能据“Google 发起”或“开放标准”宣传就认定它已是行业标准，或自动完成跨平台等价。

**起步与边界。** 官方 quickstart 展示 agent 产生消息、宿主流式渲染、用户操作返回的闭环。先选一个 renderer 与协议版本完成往返，再考虑第二端。不要仅安装 `@a2ui/react` 就宣称具备了完整端到端系统。

**判断：跨端需求真实存在时受控试验。** Apache-2.0；项目团队维护。权限、动作确认、恶意链接和平台降级仍是应用责任。协议、SDK、renderer 的版本号不能混用，也不能把 SDK 的 0.15.0 直接写成协议版本。

### 3.9 Liquid Glass：UI SDK 行为和 GPU 外观可以分层，但这不是框架级升级

**公开事实。** 第三条帖对应 [bilalgursen/liquid-glass](https://github.com/bilalgursen/liquid-glass)，[官方 demo/docs](https://liquid-glass-interface.pages.dev)。它给 React 控件提供 WebGL2 折射效果与弹簧动效，部分控件由 UI SDK 承担行为。README 要求 React 19、Tailwind CSS v4 和 `@/` alias；部分控件还依赖 `three`。MIT，作者主导的小型项目。

**起步证据。** `npx shadcn@latest add https://liquid-glass-interface.pages.dev/r/liquid-glass.json`。这是复制源码的 registry，不是可推导出 semver 兼容性的稳定 npm SDK。本轮未发现 GitHub release，核验源码快照见附录 A。

**值得研究的点。** 行为实现与材质渲染解耦：不必因为要折射外观就重写焦点和键盘。官网声明不支持 WebGL2或开启 reduced motion 时保留 CSS 外观。这里记录的是作者声明，本文没有实机验证。

**不应推导的结论。** “one shader”不等于一个全应用 context、不等于一次 draw call，也不等于低功耗。React 版本能用 UI SDK，不表示可直接装进 Solid 项目。UI SDK 的行为支持也不能自动认证玻璃层的对比度、文本可读性、滑动确认替代路径和读屏名称。

**判断：只在有限且可退化的控件上试，先不要大面积采用。** 验证 GPU/CPU、多个实例、后台标签页、context loss、移动设备、强制颜色和减少动态效果。删除 shader 后功能应仍能完成。不要把特殊材质当作默认设计语言。

### 3.10 StyleX：用编译期样式组合解决大应用问题，而不是增加一套配色语言

**公开事实。** [StyleX](https://stylexjs.com/docs/learn/)把 JavaScript 样式编译成原子 CSS，支持局部定义与可预测组合。框架本身无关；官方明确提到 Solid、Preact、Qwik，Vue/Svelte 特殊文件格式则可能需要额外配置。仓库 [facebook/stylex](https://github.com/facebook/stylex)，MIT。

**具体机制。** 通过构建期提取、去重和组合规则，减少 specificity 与样式覆盖的全局推理。它与 UI SDK 分工清楚，一个处理样式，一个处理交互行为。它不替你决定设计 token、排版或信息层级。

**起步证据。** [安装文档](https://stylexjs.com/docs/learn/installation/)包括 `npm install --save @stylexjs/stylex`，并要求构建编译集成，列出 Babel 与 PostCSS 插件。只装 runtime 不能当作生产集成完成。

**迁移风险。** 要检查既有 CSS、第三方组件的覆盖接口、动态值、SSR 提取、开发与生产样式一致性。Solid 2 项目尤其需要验证 JSX 编译与 StyleX transform 的顺序；“框架无关”不等于“所有 Vite 插件排列都已验证”。

**判断：当样式组合和多团队维护已成问题时试。** 小应用的普通 CSS、CSS Modules 或既有 Tailwind 体系可能总成本更低。Meta 归属不等于永久维护担保，维护状态要看实际发布，而不是品牌。

### 3.11 TanStack Start：类型化路由与服务器函数，不等于绑定某个托管平台

**公开事实。** [TanStack Start](https://tanstack.com/start/latest)把 TanStack Router 的路由、loader、参数和边界扩展到全栈，加入服务器函数、SSR 与构建。主页列出多种部署目标。仓库在 [TanStack/router](https://github.com/TanStack/router)。React 与 Solid 包要分开核对，不能因其中一条线是 1.x 就认定所有新框架适配同等成熟。

**为什么值得比。** 与只能在一个高度集成栈里采用服务器函数的路线不同，Start 让类型化路由、服务器边界和部署组合显式化。代价是需要理解序列化、服务端模块隔离、缓存、流式传输和目标 runtime。服务器函数仍是外部入口，不能因为它有 TypeScript 类型就省略身份和输入校验。

**起步证据。** [官方 quick start](https://tanstack.com/start/latest/docs/framework/react/quick-start)给出 `npx @tanstack/cli@latest create`；也能直接取官方 `start-basic` 示例。文档列出从已有框架迁移的入口。本文未创建或部署 Start 应用。

**门槛。** 必须在目标主机测试完整冷启动、流式响应、服务器函数、鉴权 cookie 和错误恢复。portable API 不等于所有适配器功能相同。Solid 2 路线还应核对 `@tanstack/solid-start` 的 `latest` 与 `rc` 依赖，不用 React starter 的绿灯替它作证。

**判断：新建类型化全栈应用的正式对照候选。** MIT，TanStack 团队维护。存量框架迁移只有在部署、数据边界或路由维护存在明确痛点时才值得。

### 3.12 tla-ts：把状态模型检查放进 JavaScript 工具链，可信度仍需交叉检查

**公开事实。** [tla-ts](https://github.com/aidenybai/tla-ts)是 TypeScript 实现的 TLA+ 解释器和模型检查器，提供 `check`、反例轨迹及 CLI。还提供受支持 TypeScript 子集到 TLA+ 的编译，以及证明相关接口。npm 当前 0.0.10。MIT，作者主导，项目较新。

**起步证据。** `npm install tla-ts`；`npx tla-ts Spec.tla`，或对受支持子集运行 `npx tla-ts bank.ts`。README 列出不支持的语义错误与并行回退条件。不能理解成对任意 TypeScript 程序做全量形式证明。

**本轮实测。** 只运行了一个有意错误的计数模型与修正模型：错误模型报告 `invariant-violation` 并给出 4 个状态的轨迹；修正模型返回 `success`。这证明安装包能够在此次 Node 环境执行这个小样例，不证明其与 TLC 全面等价，也不验证 README 的速度主张。复现见第 6 节。

**采用门槛。** 高代价系统先用官方 TLC 或另一独立检查器对相同模型做结果交叉核对，并审查不支持语法、边界与公平性假设。不要把“状态图画出来了”当成“实现被验证”。模型必须与真实代码有可维护的对应关系。

**判断：非常值得低成本试验，不应在缺少交叉验证时成为唯一裁决器。** 对普通按钮和静态排版无需建形式模型。对重试、撤销、并发权限和异步顺序有价值，前提是规则写得清楚。

## 4. 其余 23 个候选：有明确机制，也有明确停止条件

以下均提供第一方文档与仓库。许可证、实际发布版本和日期见附录 A。此处的“采用成本”是本文定性判断，不是工时承诺。

### 4.1 渲染路线的六个对照

| 项目与来源 | 机制、互补和替代关系 | 起步证据 | 成本、局限与不适用处 |
| --- | --- | --- | --- |
| Svelte 5：[docs](https://svelte.dev/docs/svelte/overview) · [repo](https://github.com/sveltejs/svelte) | runes 与编译器表达响应式状态和派生值。与 Solid 的运行图有相似目标，但 SFC、编译与生命周期语义不同。Svelte 团队维护，成熟生态对照 | [SvelteKit starter](https://svelte.dev/docs/kit/creating-a-project)：`npx sv create my-app` | 换框架成本高；旧语法与 runes 可以并存但需管理混合风格。不要为“细粒度”三个字重写已有 JSX 应用；框架版本不等于 SvelteKit 版本 |
| Vue 3 与 Vapor：[RC 说明](https://github.com/vuejs/core/releases/tag/v3.6.0-rc.1) · [repo](https://github.com/vuejs/core) | Vapor 编译 SFC 为不依赖 VDOM 的更新路径，显式 opt-in；保留 Vue 的作者生态。Vue 团队维护。**普通 Vue 稳定线与 Vapor RC 是两种采用风险** | [Vue 官方 starter](https://vuejs.org/guide/quick-start)：`npm create vue@latest`。默认 starter 不等于已开启 Vapor，需另按 RC 说明配置 | Vapor 只覆盖 API 子集；依赖 VNode、Options API、实例代理的代码受限。VDOM interop 会带回部分 runtime；第三方库不保证无缝。适合局部性能试验，不默认全库迁移 |
| Angular：[signals](https://angular.dev/guide/signals) · [zoneless](https://angular.dev/guide/zoneless) · [repo](https://github.com/angular/angular) | signals 通知变化，zoneless 减少依赖 ZoneJS 的全局变化检测。类型、模板、DI、路由与升级工具集中。Google/Angular 团队维护 | [官方安装与 starter](https://angular.dev/installation)：`npm install -g @angular/cli`，然后 `ng new <project-name>`。本文未运行全局安装 | 不是轻量交互库；采用整个框架的成本高。已有 Angular 团队可获渐进收益，只有少量页面的应用不应为 signals 引入完整框架。第三方库是否正确通知更新需要检查 |
| Lit：[docs](https://lit.dev/docs/) · [repo](https://github.com/lit/lit) | 标准 Custom Elements + 声明式模板与响应式属性，组件可供多个框架消费。Google/Lit 团队维护；标准边界比单一框架生命周期更独立 | [Getting started](https://lit.dev/docs/getting-started/)：`npm i lit`；官方另提供 [JS/TS component starter kits](https://lit.dev/docs/tools/starter-kits/) | Shadow DOM 样式、事件重定向、表单关联与框架类型包装需要成本。[Lit SSR](https://lit.dev/docs/ssr/overview/)仍属于 Labs 实验包，不把客户端核心成熟度转移给 SSR。跨框架分发组件时值得比；不因“标准”就把整站全部改成自定义元素 |
| Qwik：[docs](https://qwik.dev/docs/getting-started/) · [repo](https://github.com/QwikDev/qwik) | resumability 将可恢复状态和懒执行边界序列化，避免在客户端重放完整初始化。与 Solid 优化更新粒度不同，优先解决初始执行 | 官方 starter：`npm create qwik@latest`。先检查生成器落在 1.x 还是 2.x 包线 | 新包 `@qwik.dev/core` 的 `latest` 仍为 2.0 RC；旧 `@builder.io/qwik` 仍是 1.x。闭包可序列化、`$` 边界和第三方 DOM 库有学习成本。不能用官网首屏分数替代自己的弱网与设备测试 |
| Waku：[docs](https://waku.gg/) · [repo](https://github.com/wakujs/waku) | 以较小框架范围提供 React Server Components 与路由，探索 React 全栈不必等于完整 Next.js 的路线。Waku 团队/社区维护 | 官方：`npm create waku@latest` | 当前 1.0 RC。RSC 的服务端/客户端模块边界仍然存在，生态与部署整合需自己补足。若依赖大型框架的成熟插件与约定，最小框架不一定最省总成本 |

### 4.2 数据、行为与样式：五个补充

| 项目与来源 | 机制、采用理由与入口 | 边界、维护和退出成本 |
| --- | --- | --- |
| Electric：[docs](https://electric-sql.com/docs/intro) · [repo](https://github.com/electric-sql/electric) | 通过 HTTP shape 流把选定 Postgres 数据送到客户端；可接 TanStack DB。官方 [starter](https://electric-sql.com/docs/quickstart)：`npx gitpick electric-sql/electric/tree/main/examples/tanstack-db-web-starter my-electric-app` | Electric 团队维护，Apache-2.0 客户端。不是每一种业务写入都由同步流解决；按自己的 API 写入并协调回读。部署复制、保留日志与流代理成本中高。[授权 guide](https://electric-sql.com/docs/guides/auth)要求受信代理控制 shape/表条件，不能把任意客户端参数直通数据库 |
| Base UI：[docs](https://base-ui.com/react/overview/quick-start) · [repo](https://github.com/mui/base-ui) | 完整无样式 React 组件，提供焦点、键盘、状态与组合接口。官方安装 `pnpm add @base-ui/react`，`@base-ui/react` 是当前包名。若现成组件覆盖需求，比在行为层重组更省维护 | MUI/Base UI 团队维护，MIT。React 专用，不是通用跨框架 core。样式、组合边界和复杂控件仍需验收。采用成本低至中；不应因 UI SDK 的新公告就全量替换 |
| Ark UI / Zag：[docs](https://ark-ui.com/docs/overview/about) · [setup](https://ark-ui.com/docs/overview/getting-started) · [Ark repo](https://github.com/chakra-ui/ark) · [Zag repo](https://github.com/chakra-ui/zag) | Zag 用有限状态机表达控件行为，Ark 提供多框架无样式组件。官方 React 安装：`npm install @ark-ui/react`；其他适配器按各自 guide。可选组件层或更低层状态机 | Chakra 团队维护，MIT。状态机让行为可描述，不保证任意拼接都正确；机器升级、DOM connector 与框架适配需同步。与 UI SDK 是值得做相同控件测试的直接竞争路线，不是后者的附庸 |
| React Aria Components：[docs](https://react-spectrum.adobe.com/react-aria/getting-started.html) · [repo](https://github.com/adobe/react-spectrum) | 无样式组件与 hooks 分层，覆盖交互、可访问性、国际化等复杂情况。官方安装：`npm install react-aria-components`。适合重视行为覆盖而保留自有外观 | Adobe 维护，Apache-2.0。React 生态约束和 collection API 有学习成本；并非导入组件即可通过所有读屏验收。相较新 beta 是重要成熟对照，不靠“新”来证明价值 |
| shadcn registry：[docs](https://ui.shadcn.com/docs/registry) · [repo](https://github.com/shadcn-ui/ui) | 把组件、文件和依赖以 registry 分发到消费方。是“拿到并拥有代码”的分发机制，不是一个统一行为内核。`npx shadcn@latest add <registry-item>` 的具体 item 由上游提供 | shadcn/Vercel 与社区维护，MIT 工具。每个 registry item 的许可、依赖、更新渠道仍需单独检查。代码进仓库后升级、审计与本地变更合并由自己负责；不能把任意 registry 当受信软件源 |

### 4.3 AI 与 UI：四个互补候选

| 项目与来源 | 真正负责什么、如何起步 | 门槛与不适用处 |
| --- | --- | --- |
| Vercel AI SDK：[docs](https://ai-sdk.dev/docs/introduction) · [repo](https://github.com/vercel/ai) | 模型提供者抽象、工具和流式模型交互；UI hooks 是其中一层。官方安装文档给出 `npm install ai`，再按 provider/UI 框架添加包。它和 UI SDK 是两套产品 | Vercel 维护，Apache-2.0；provider 服务另有账号、数据与计费条款。版本 7 的协议与适配不能套旧版示例。它不是现成完整聊天应用，不替代组件行为层 |
| assistant-ui：[docs](https://www.assistant-ui.com/docs) · [CLI](https://www.assistant-ui.com/docs/cli) · [repo](https://github.com/assistant-ui/assistant-ui) | 消息、线程、附件、工具呈现和聊天交互 runtime；可接 AI SDK、外部 store、AG-UI 等。CLI 提供 default/minimal、LangGraph、MCP、可恢复流、TanStack、React Native 等例子 | 团队维护，MIT；可选托管持久化与其他商业服务分别核查。[AI SDK adapter](https://www.assistant-ui.com/docs/runtimes/ai-sdk)要求按主版本匹配，当前新项目指向 v7。人手起步示例为 `npx assistant-ui@latest create my-app`；**编码 agent 应先走 CLI 的 `setup` 流程**，不要绕过检测。并非每个聊天产品都需要云端线程服务 |
| CopilotKit / AG-UI：[CopilotKit docs](https://docs.copilotkit.ai/) · [repo](https://github.com/CopilotKit/CopilotKit) · [AG-UI docs](https://docs.ag-ui.com/introduction) · [repo](https://github.com/ag-ui-protocol/ag-ui) | CopilotKit 把 agent 能力接入应用状态与交互；AG-UI 定义事件流合同。工具状态、文本、共享状态与人参与可经同一事件模型协调。以官方 integrations/quickstart 选择后端，不猜一个“万能安装命令” | 两个项目都要核验，MIT 核心与商业托管分开。集成适配器、重连恢复、取消和工具授权是主要成本。当前 CopilotKit `latest` 为 1.x，`next` 为 2.0 RC，不能混装文档。只要简单聊天时，完整共享状态系统可能过重 |
| OpenUI：[overview](https://www.openui.com/docs/openui-lang/overview) · [quickstart](https://www.openui.com/docs/openui-lang/quickstart) · [repo](https://github.com/thesysdev/openui) | **这里是 Thesys 的 OpenUI，不是同名旧项目。** 模型生成面向组件库的紧凑语言，运行时处理流式、状态和交互。官方 starter：`npx @openuidev/cli@latest create --name recipe-remix`。这个 quickstart 明确包含登录，不应当成纯离线、无账号脚手架 | Thesys 维护，MIT 包；托管产品另论。语言、组件目录和运行时绑定也是迁移成本。厂商自己的 token/延迟对比不当作独立基准。先用同一组件目录和相同任务比较 json-render/A2UI；不能凭演示推断更安全或更便宜 |

### 4.4 复杂交互与开发起步：五个候选

| 项目与来源 | 机制和可用入口 | 限制、许可与成本 |
| --- | --- | --- |
| React Flow：[docs](https://reactflow.dev/learn) · [repo](https://github.com/xyflow/xyflow) | 节点、边、视口、选择和连接构成交互式图编辑器基础。官方安装 `npm install @xyflow/react`；现成 [Vite template](https://github.com/xyflow/vite-react-flow-template) 可用 `npx degit xyflow/vite-react-flow-template app-name` 获取 | xyflow 维护，MIT 核心，Pro 示例/支持另计。布局算法、图语义、协作、执行引擎仍要另外选。适合真正的图关系编辑；普通表单流程不要默认画布化。迁移中等，可通过持久化独立节点/边 schema 降低退出成本 |
| tldraw：[docs](https://tldraw.dev/quick-start) · [repo](https://github.com/tldraw/tldraw) | 无限画布、shape、工具、编辑交互和可扩展记录模型。starter：`npm create tldraw@latest`。协作另有 `@tldraw/sync` | tldraw 团队维护。**SDK 是 source-available，不是宽松开源许可。** [现行条款](https://tldraw.dev/community/license)默认允许开发使用，生产需有效 trial/commercial/hobby key。部分示例 MIT 不改变 SDK 条款。商业价格未报价核验，不写估计金额。内容和自定义 shape 导出成本高 |
| Vike：[docs](https://vike.dev/) · [scaffold](https://vike.dev/new) · [repo](https://github.com/vikejs/vike) | 把 SSR/SSG/SPA 选择、数据与路由 hooks、框架和服务器整合分开；支持 React/Vue/Solid 等扩展，也能只用 core。官方 [start](https://vike.dev/start) 给出 `npm create @batijs/app --react` 等框架选项，[core-only](https://vike.dev/new/core) 使用 `npm create vike-core@latest`。是减少元框架捆绑的路线 | Vike 团队维护，MIT。灵活意味着自己负责扩展组合的兼容、缓存、鉴权与错误边界。已有完整框架提供的功能需要盘点后再换；0.x 不自动等于 beta，仍按上游实际稳定承诺和变更记录评价 |
| Vite+：[docs](https://viteplus.dev/guide/) · [create](https://viteplus.dev/guide/create) · [repo](https://github.com/voidzero-dev/vite-plus) | `vp` 统一 Vite、Rolldown、Vitest、tsdown、Oxlint、Oxfmt 与任务等工具入口，减少配置与版本组合。官方创建：`npm create vite-plus@latest`。第一位置参数是模板，目录另用 `--directory`，不是照搬 `create-vite` 的参数习惯 | VoidZero 维护，当前公开包 MIT、1.7.0。不是早期“只能私测”的状态。改变 lint/format/test/build 组合可能改变既有行为；要逐项保留测试和产物合同。开源 CLI 与未来/另售服务的条款分开。先试新目录，不在调研时自动运行迁移 |
| Better-T-Stack：[docs](https://www.better-t-stack.dev/docs) · [repo](https://github.com/AmanVarshney01/create-better-t-stack) | 根据前端、后端、ORM、数据库、认证等选项生成组合，而不是一个只能接固定云服务的单模板。官方：`npm create better-t-stack@latest`；另有 [agent 工作流](https://www.better-t-stack.dev/docs/cli/agent-workflows) | 作者和社区维护，MIT 生成器。可组合选项不是每种排列都经过同样深的生产验证；生成后还是普通应用，需要自己升级依赖。选最少组件起步，不为“全栈完整”提前装认证、计费、同步与原生端。模板依赖和外部服务许可分别查 |

### 4.5 验证工具的三个补充

| 项目与来源 | 可验证什么、入口 | 不能验证什么、成本 |
| --- | --- | --- |
| Storybook：[docs](https://storybook.js.org/docs/get-started/install) · [a11y](https://storybook.js.org/docs/writing-tests/accessibility-testing) · [repo](https://github.com/storybookjs/storybook) | 将组件状态做成可重放 stories，结合 interaction、截图与 axe 规则检查。文档安装 `npm create storybook@latest`；a11y 插件 `npx storybook add @storybook/addon-a11y` | Storybook 社区/团队维护，MIT 核心；云视觉服务另论。axe 只覆盖自动可判断的规则，截图也不验证操作。Solid 2 走 [community adapter](https://github.com/solidjs-community/storybook)，不是 React 配置照抄；其 `/next` 导出是 Solid 2 相关类型/渲染入口，不等于必须安装所有工具的 next tag |
| Vitest Browser Mode：[docs](https://vitest.dev/guide/browser/) · [repo](https://github.com/vitest-dev/vitest) | 在真实浏览器而不是 DOM 模拟器中跑组件与浏览器 API 测试。可选 Playwright provider，按 guide 对齐 `vitest` 与 `@vitest/browser-playwright`。验证真实布局、事件和浏览器行为更可信 | Vitest 团队维护，MIT。不自动覆盖页面导航、部署、后端和完整用户流程，仍需 E2E。浏览器二进制、CI 运行与并发隔离有成本。当前核心 5.x；官方 Playwright 路线安装 `npm install -D vitest @vitest/browser-playwright`。避免把旧 v3/v4 配置教程直接贴入 |
| fast-check：[docs](https://fast-check.dev/docs/introduction/) · [repo](https://github.com/dubzzz/fast-check) | 属性测试生成输入，失败后缩减反例；可做 [model-based testing](https://fast-check.dev/docs/advanced/model-based-testing/)。安装 `npm install --save-dev fast-check`，保留 seed 与 replay 信息 | Dubzzz/项目团队维护，MIT。有价值的属性和独立参考模型才是关键；仅把同一实现抄成 oracle 无法排除共同错误。固定 seed 帮助复现，不代表覆盖所有输入。适合解析、排序、撤销、重试和状态变更；静态文案无需复杂生成器 |

## 5. 选择闸门与五条便宜的试验路线

### 5.1 先过七个闸门

1. **职责。** 用一句话说明它替代了哪段自己维护的逻辑。不知道要删掉什么，就先不安装。
2. **最小方案。** 与原生能力、已有栈局部优化比较。不能只在三个新项目之间选“冠军”。
3. **合同。** 记录版本、框架适配器、浏览器、runtime、序列化和数据格式。安装成功仅证明依赖能解析。
4. **失败。** 运行超时、取消、断流、离线、重复提交、权限撤销与恢复。UI 降级不能只剩截图正常。
5. **全成本。** 统计前端包、服务器常驻资源、同步复制、客户端存储、模型请求、测试维护与人工排障。不要只数省掉的组件代码行。
6. **退出。** 数据能否导出？组件能否替换？协议能否重放？是否要全应用同步升级？删除新工具后哪些能力仍在？
7. **维护与许可。** 看真实 release、迁移指南、归档/日落公告和安全处理入口。代码许可证、示例许可证、商用服务、生产 license key 分开记录。

可逆性通常按这个顺序下降：单个视觉控件 → 组件库 → 样式/构建链 → 全栈框架 → 同步与持久数据模型。这是经验性排序，具体依赖仍需检查。

### 5.2 路线一：检验新响应式模型，限制到一块交互

**问题。** 当前主要代价是更新扇出、异步竞态，还是整个应用的初始执行？

**试验。** 相同的列表编辑、派生统计、异步加载与取消逻辑，各做已有框架基线和一个挑战者。React 基线纳入 Compiler；Vue 基线先与局部 Vapor 比；只有新建交互模块再比较 Solid 2。若主要问题是首次执行，则把服务器 HTML 与 Qwik 放到同组。

**验收。** 相同 DOM 规模、相同数据、同一目标设备；记录长任务、交互延迟、内存、初始 JS 和手工修复点。人为注入旧请求晚到、快速切换、卸载后返回。必须同时看“是否正确”和“工作是否减少”。

**停止条件。** 对关键交互没有可重复改善，或生态适配的额外代码超过节省的状态代码。本文未测这些性能指标，也不预设哪一个会赢。

### 5.3 路线二：检验组件行为组合，不换全套外观

**问题。** 缺的是一个复杂控件，还是现有库只是不好换皮肤？

**试验。** 同一规格的 popup + 选择 + 搜索控件，比较现有库、UI SDK，以及 Ark/Zag 或 React Aria 的合适版本。保持外观与数据一致。若只是简单展示，先做原生表单对照。

**验收。** Tab/Shift+Tab、方向键、Escape、焦点返回、中文输入法、表单提交、disabled、读屏名称与嵌套弹层全部有记录。Storybook 状态样本与 Browser Mode 自动化可重复。Solid 2 先验证 community Storybook adapter 和插件组合。

**停止条件。** 需要手工覆盖大量内部状态，或必须以删除语义/焦点规则才能实现外观。Liquid Glass 只能作为最后的可删除视觉层，不参与定义操作是否成功。

### 5.4 路线三：检验本地数据，不立即迁移事实来源

**问题。** 瓶颈来自网络等待、本地关系查询、请求重复，还是服务端 SQL 本身？

**试验顺序。** 先 HTTP + Query 基线，再以 TanStack DB Query collection 做同一交互。只有读写等待仍显著时才加入 Zero 或 Electric。LiveStore/Jazz 2 单独建新数据模型原型，不与存量数据直接混用。

**验收。** 断网编辑、刷新重启、服务端拒绝、同时写入、权限收回与退出登录。验证“最终服务端数据正确”，不只验证屏幕即时更新。给浏览器本地容量设边界，测从空缓存到可用的时间与流量。

**停止条件。** 无法说明冲突归谁裁决，无法在缓存数据上落实权限撤销，或无法从备份重建。网络回来了以后“看起来恢复”不够。

### 5.5 路线四：检验生成式 UI，先限制能力，再接模型

**问题。** 用户真的需要模型决定界面结构，还是固定 UI 展示结构化结果已经够用？

**试验。** 先以固定组件工具结果为基线。只给一个小型 catalog，比较 json-render 与 A2UI/OpenUI 的相同任务。先回放静态/录制流，再连接模型，以便把 renderer 错误与模型错误分开。

**验收。** 未知组件、越界属性、无权动作、恶意 URL、半截 JSON、重复/乱序事件、中途刷新、取消与恢复。记录首个有用内容时间、无效输出率、恢复率、每次成功任务的完整 token 与重试成本。数字没有同一目录、同一模型和同一任务就不横比。

**停止条件。** 无法审计动作，无法还原 spec/事件版本，或者目录维护比手写界面更贵。不可逆操作必须经过受信服务端和明确确认，不由模型生成按钮自行决定。

### 5.6 路线五：检验起步和验证成本，不把所有新工具同时装上

**试验。** 在新目录分别使用框架官方 starter、Vite+/Better-T-Stack 中一个生成器。只选实际需要的路由、数据和测试。保留生成命令、lockfile、Node 版本和目标部署方式。

**验收。** 能从空目录安装、构建、执行一个真实浏览器交互；能在预定主机启动；删除不需要的生成模块不破坏基本功能。数据合同用 fast-check 检验；确有并发状态规则时才加入 tla-ts/TLC。

**停止条件。** starter 隐含了不需要的云服务、密钥或许可，或为了通过迁移修改了测试标准。对小改动只跑相关检查；高风险状态变化才加属性测试、模型检查和独立审阅。更多审阅模型只代表更多支出，不自动提高置信度。

## 6. 本轮实际做了什么，没有做什么

### 6.1 证据等级

- **直接核验：** 四条公开帖与可见全文/引用上下文；官方文档、仓库、release、npm 元数据；两个 plugin 的 GitHub live manifest。npm 按当前 dist-tag 取实际版本及其发布时间，全部日期换算为 Asia/Shanghai。
- **有限实测：** 只在隔离目录运行 `tla-ts@0.0.10` 和 `fast-check@4.11.0` 的小型错误/修正对照。Node v24.22.1，npm 11.21.1，安装关闭生命周期脚本。不需要模型 API、账号、付费服务或凭据。
- **未做：** 未运行 35 个 starter，未做 UI 的浏览器/读屏/设备验收，未部署候选应用，未测试性能或独立安全审计。没有把厂商 benchmark、README 演示与作者体验写成本轮实测。

### 6.2 可复现的小型反例测试

在一个空的临时目录安装：

```sh
npm init -y
npm install --ignore-scripts --no-audit --no-fund --save-exact tla-ts@0.0.10 fast-check@4.11.0
```

把以下内容保存为 `verify.mjs`，运行 `node verify.mjs`。这里用有意错误的逻辑检查工具能否报错，再检查修正后能否通过；不是对真实产品的验证。

```js
import { check } from 'tla-ts';
import fc from 'fast-check';

const source = next => `---- MODULE Counter ----
EXTENDS Naturals
VARIABLE x
Init == x = 0
Next == ${next}
Small == x <= 2
====`;
const config = 'INIT Init NEXT Next INVARIANT Small';
const bad = await check({ source: source("x' = x + 1"), config });
const good = await check({
	source: source("x' = IF x < 2 THEN x + 1 ELSE x"), config,
});
console.log(bad.status, bad.violation?.trace?.length, good.status);

const inputs = [fc.integer({ min: 0, max: 100 }),
	fc.integer({ min: 0, max: 100 })];
const params = { seed: 20261123, numRuns: 1000 };
const broken = fc.check(fc.property(...inputs,
	(balance, amount) => balance - amount >= 0), params);
const fixed = fc.check(fc.property(...inputs,
	(balance, amount) => (amount <= balance ? balance - amount : balance) >= 0), params);
console.log(broken.failed, broken.counterexample, broken.numShrinks);
console.log(fixed.failed, fixed.numRuns);
```

本轮结果：

```text
invariant-violation 4 success
true [0, 1] 8
false 1000
```

解释：错误模型在第 4 个轨迹状态触发不变量；属性测试把失败输入缩减到余额 0、扣款 1，修正属性完成 1,000 次测试。计数是测试范围说明，不是性能数据。没有与 TLC 交叉验证，也没有证明生成器覆盖全部输入或生产实现符合模型。

### 6.3 OSINT 的边界

官方材料能证明作者公开了什么，不能自动证明实现正确。npm `latest` 不是“稳定”的同义词；GitHub release 列表会混入 monorepo 子包；仓库近期 push 也可能只是文档。本文不以 stars、下载量或转发数作质量证据。

本轮重点读取主条目的第一方文档、安装入口与包元数据，并对部分关键项目核对 release、commit、许可与迁移说明。未逐仓审查全部 issue、全部依赖 CVE、所有贡献者集中度或商业合同。对许可和安全的说明是采用门槛，不是法律意见或无漏洞保证。

若文档路径失效，使用官方搜索、仓库或官方 `llms.txt` 继续定位；没有把抓取失败当作项目不存在。搜索缓存与实时来源冲突时，优先记录 live registry/manifest，并注明差异。具体例子包括 pstack 搜索结果仍见 0.15.42，而本轮 GitHub live manifest 为 0.15.46。

## 7. 独立发现如何纠正输入偏差

### 7.1 输入帖只提供问题，不决定答案

这四条帖集中在细粒度响应式、agent 友好工具和一种视觉材质。若顺着社交关系扩展，很容易得到“Solid + UI SDK + 新生成式 UI 就是下一代默认栈”的错误结论。本文另外用四组材料挑战它：

- **不做重型客户端也能完成任务。** [htmx](https://htmx.org/docs/)把交互写成超媒体请求与 HTML 局部替换；[Astro islands](https://docs.astro.build/en/concepts/islands/)只让需要交互的部分激活。它们不是复杂离线编辑器的替代品，但对以内容、表单和服务器结果为主的产品，是必须保留的低复杂度对照。没有理由为了跟随前沿，把所有应用都升级成客户端数据库 + 生成式 UI。
- **细粒度和编译优化不属于某一个社区。** Vue Vapor、Svelte、Angular Signals、React Compiler 各自把一部分手工推理交给框架或编译器。Lit 则把组件复用边界放在 Web 标准上。真正该比较的是自己的失败模式和生态成本，不是 signals 与 VDOM 的阵营。
- **实际维护者的反例比拥护文章更重要。** Cursor 团队对意外响应式扇出与维护成本的解释，与输入文章的理论论证方向相反。两者共同说明需要实际 workload，不能从一段代码更短或一次迁移增行推断普适性能。
- **微基准不是产品选型。** [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)提供可比较的 DOM 操作负载，但它不能同时回答网络、业务算法、缓存、SSR、无障碍、团队修复速度与发布风险。本文未复测，也不引用榜单名次作结论。

### 7.2 从退出与停止维护案例倒推采用标准

| 可观察案例 | 第一方证据 | 对本轮选型的含义 |
| --- | --- | --- |
| Windi CSS 主动停止积极开发 | [Sunsetting 公告](https://windicss.org/posts/sunsetting)说明维护时间与资源不足 | 曾经有技术创新，不代表以后仍值得新建依赖。先看维护与迁移出口，再看 API |
| Recoil 仓库已归档 | [官方仓库](https://github.com/facebookexperimental/Recoil)标明 ARCHIVED | 知名组织前缀和既有采用都不是维护保障。不要默认 Meta 归属能给 StyleX 等项目提供无限支持 |
| Vue 2 已 EOL | [官方说明](https://v2.vuejs.org/eol/)及 npm legacy 包的 deprecation | 版本线生命周期比品牌更具体。避免因“Vue 还很活跃”就忽略某条版本线已退出维护 |
| Jazz 2 与 Classic Jazz API 分离 | [当前 quickstart](https://jazz.tools/docs/quickstart)明确区分 | 搜索引擎高排名旧教程可能比缺文档更危险。确认代码、包、文档三者同代 |
| tldraw SDK 与示例许可不同 | [现行许可](https://tldraw.dev/community/license) | 源码可读、示例 MIT 与 SDK 可免费商业使用是不同事实，必须分别过闸 |

这些不是在暗示其他候选将被放弃，而是在说明尽调不能只核实“今天能装”。对持久数据和设计系统，应要求导出、版本固定、替换边界与恢复演练。

### 7.3 有意未扩成主条目的候选

- **React/Next.js、TanStack Query、普通 Vite、Tailwind/CSS Modules、Playwright、Motion** 是必须尊重的成熟基线。本文不把“大家已知道”当作差，也不重复整套通用教程。已有生态能解决问题时，它们可以胜过新候选。
- **Astro、htmx、原生 HTML/CSS** 用于挑战“所有 UI 都需要复杂应用框架”的前提，不与离线编辑器、agent 流协议或组件行为库排名。
- **Tiptap、Lexical、ProseMirror、CodeMirror、Monaco** 对专业编辑很重要；本文只保留画布与图编辑的代表。没有具体富文本/代码编辑需求时，不再扩一套编辑器尽调。不能据此推断 tldraw 或 React Flow 能取代文本编辑器。
- **纯装饰组件目录、付费模板聚合站、复制 shadcn 皮肤的项目** 若缺少新的机制、明确许可或可追溯源代码，不作为前沿工程条目。Liquid Glass 因为是输入来源且展示行为与材质分离，作为限域研究对象保留，不因视觉流行获得优先级。
- **完整数据库/云服务清单、agent 编排后端、部署平台目录** 只在改变 UI 的数据或协议责任时涉及，不扩为通用基础设施报告。
- **仅 RFC、没有可用产物、原作者身份不明或无法确认 canonical repo 的项目** 不与可安装项目混排。某个名字存在 npm 包，不代表它就是帖子指的工具。例如 npm 的旧 `pstack`、`thermos` 与本轮 Cursor plugins 无关。

本轮不是全世界项目的穷尽普查。取样原则是职责覆盖、机制差异、独立生态、可用入口与可退出性。未来增补时先指出现有候选漏掉了哪种责任或取舍，再增加名字。

## 附录 A：版本、活动与许可快照

以下是核验当晚的公开状态，不是永久推荐安装版本。**表内时间全部为 2026 年、Asia/Shanghai；只有日期的公告不补造具体时刻。** npm 行链接的是 registry 元数据，其中可查看 `dist-tags`、`time`、许可证与 repository。发布频率说明仍有活动，不证明维护 SLA。0.x 不自动等于 beta，1.x 也不自动等于无风险；预发布状态以版本和上游说明共同判断。

| # | 主条目 | 已核验版本、发布时间 | 成熟度与许可边界 |
| --- | --- | --- | --- |
| 1 | Solid 2 | [solid-js](https://registry.npmjs.org/solid-js)：`latest=2.0.3`，11-19 18:08<br>[@solidjs/web](https://registry.npmjs.org/%40solidjs%2Fweb)：`latest=2.0.3`，11-19 18:07 | 正式发布；MIT |
| 2 | Svelte 5 | [svelte](https://registry.npmjs.org/svelte)：`latest=5.59.1`，11-21 03:07 | 正式；MIT；成熟编译路线 |
| 3 | Vue / Vapor | [vue](https://registry.npmjs.org/vue)：`latest=3.5.46`，11-20 16:21；`rc=3.6.0-rc.16`，11-20 17:56 | latest 是 3.5 稳定线；rc 是 Vapor 所在的 3.6 RC；MIT |
| 4 | Angular | [@angular/core](https://registry.npmjs.org/%40angular%2Fcore)：`latest=22.3.0`，11-19 03:30 | 正式；MIT；框架与升级链一并评估 |
| 5 | Lit | [lit](https://registry.npmjs.org/lit)：`latest=3.3.3`，05-14 11:55 | 核心正式；SSR 为 Labs；BSD-3-Clause |
| 6 | Qwik | [@builder.io/qwik](https://registry.npmjs.org/%40builder.io%2Fqwik)：`latest=1.20.4`，11-09 23:14<br>[@qwik.dev/core](https://registry.npmjs.org/%40qwik.dev%2Fcore)：`latest=2.0.0-rc.5`，11-09 23:48 | 旧包 1.x 与新包 2.0 RC；MIT |
| 7 | Waku | [waku](https://registry.npmjs.org/waku)：`latest=1.0.0-rc.5`，11-11 16:24 | 1.0 RC；MIT |
| 8 | TanStack DB | [@tanstack/db](https://registry.npmjs.org/%40tanstack%2Fdb)：`latest=1.0.0-rc.1.5`，11-11 23:40 | 1.0 RC；MIT |
| 9 | Zero | [@rocicorp/zero](https://registry.npmjs.org/%40rocicorp%2Fzero)：`latest=1.12.0`，11-12 19:06 | 正式版本号；Apache-2.0 |
| 10 | Electric | [@electric-sql/client](https://registry.npmjs.org/%40electric-sql%2Fclient)：`latest=1.5.28`，09-09 19:29 | 此行为 JS client，不是服务端版本；Apache-2.0 |
| 11 | Jazz 2 | [jazz-tools](https://registry.npmjs.org/jazz-tools)：`latest=2.0.0-beta.1`，11-23 12:49 | latest 本身就是 beta；MIT |
| 12 | LiveStore | [@livestore/livestore](https://registry.npmjs.org/%40livestore%2Flivestore)：`latest=0.5.1`，11-23 19:53 | 0.5；文档仍见 0.5.0；Apache-2.0 |
| 13 | UI SDK | [@ui-sdk/core](https://registry.npmjs.org/%40ui-sdk%2Fcore)：`latest=0.1.0-beta.13`，11-19 20:24；`beta=0.1.0-beta.16`，11-23 20:54<br>[@ui-sdk/solid](https://registry.npmjs.org/%40ui-sdk%2Fsolid)：`latest=0.1.0-beta.13`，11-19 20:26；`beta=0.1.0-beta.16`，11-23 20:56 | beta；Apache-2.0 代码；另读 beta terms |
| 14 | Base UI | [@base-ui/react](https://registry.npmjs.org/%40base-ui%2Freact)：`latest=1.9.0`，10-09 16:52 | 正式；MIT |
| 15 | Ark UI / Zag | [@ark-ui/react](https://registry.npmjs.org/%40ark-ui%2Freact)：`latest=5.40.1`，11-23 18:34<br>[@zag-js/core](https://registry.npmjs.org/%40zag-js%2Fcore)：`latest=1.49.0`，11-23 03:18 | 两个包分别版本化；MIT |
| 16 | React Aria Components | [react-aria-components](https://registry.npmjs.org/react-aria-components)：`latest=1.22.1`，10-10 04:23 | 正式；Apache-2.0 |
| 17 | shadcn registry | [shadcn](https://registry.npmjs.org/shadcn)：`latest=4.23.0`，10-27 20:33 | 本行是 CLI，不是所有 registry item 的版本；MIT |
| 18 | StyleX | [@stylexjs/stylex](https://registry.npmjs.org/%40stylexjs%2Fstylex)：`latest=0.19.2`，11-12 10:34 | 0.x；MIT；编译插件要对齐 |
| 19 | AI SDK | [ai](https://registry.npmjs.org/ai)：`latest=7.0.179`，11-21 07:21 | 正式；Apache-2.0；模型服务另论 |
| 20 | assistant-ui | [@assistant-ui/react](https://registry.npmjs.org/%40assistant-ui%2Freact)：`latest=0.15.38`，11-23 02:56 | 0.x；MIT；adapter/cloud 分开 |
| 21 | CopilotKit / AG-UI | [@copilotkit/react-core](https://registry.npmjs.org/%40copilotkit%2Freact-core)：`latest=1.90.0`，11-20 23:06；`next=2.0.0-rc.68`，11-21 00:00<br>[@ag-ui/core](https://registry.npmjs.org/%40ag-ui%2Fcore)：`latest=1.0.5`，11-18 00:13 | SDK 与协议项目分别版本化；MIT |
| 22 | A2UI | [@a2ui/react](https://registry.npmjs.org/%40a2ui%2Freact)：`latest=0.15.0`，11-02 10:43 | 此为 React renderer 包，不是协议版本；Apache-2.0 |
| 23 | json-render | [@json-render/react](https://registry.npmjs.org/%40json-render%2Freact)：`latest=0.23.2`，11-19 14:05 | 0.x renderer；Apache-2.0 |
| 24 | OpenUI | [@openuidev/react-lang](https://registry.npmjs.org/%40openuidev%2Freact-lang)：`latest=1.1.1`，11-12 23:24<br>[@openuidev/react-ui](https://registry.npmjs.org/%40openuidev%2Freact-ui)：`latest=0.18.12`，11-23 20:20 | 语言 runtime 与 UI 包分开；MIT |
| 25 | React Flow | [@xyflow/react](https://registry.npmjs.org/%40xyflow%2Freact)：`latest=13.0.3`，11-23 21:55 | 正式；MIT 核心，Pro 另论 |
| 26 | tldraw | [tldraw](https://registry.npmjs.org/tldraw)：`latest=5.6.2`，11-20 21:48 | 自有 SDK 许可证，生产需许可 |
| 27 | Liquid Glass | [源码 d4ef632](https://github.com/bilalgursen/liquid-glass/tree/d4ef632bf96c2b0e48e2ea08c03e3a912d81d2e2)，11-23 21:36 的提交 | 无 GitHub release；源码复制；MIT |
| 28 | TanStack Start | [@tanstack/react-start](https://registry.npmjs.org/%40tanstack%2Freact-start)：`latest=1.169.7`，11-19 18:26<br>[@tanstack/solid-start](https://registry.npmjs.org/%40tanstack%2Fsolid-start)：`latest=1.169.7`，11-19 18:26；`rc=2.0.0-rc.11`，11-19 11:25 | React/Solid 分线；Solid 2 要核对 RC；MIT |
| 29 | Vike | [vike](https://registry.npmjs.org/vike)：`latest=0.4.270`，11-06 05:05 | 0.x，不能仅由数字推断实验状态；MIT |
| 30 | Vite+ | [vite-plus](https://registry.npmjs.org/vite-plus)：`latest=1.7.0`，11-17 11:34 | 公开正式包；MIT |
| 31 | Better-T-Stack | [create-better-t-stack](https://registry.npmjs.org/create-better-t-stack)：`latest=3.49.2`，11-18 22:59 | 生成器；MIT，生成依赖另查 |
| 32 | Storybook | [storybook](https://registry.npmjs.org/storybook)：`latest=10.6.8`，11-20 16:21 | 核心正式；MIT；框架 adapter 分开 |
| 33 | Vitest Browser Mode | [vitest](https://registry.npmjs.org/vitest)：`latest=5.1.1`，11-18 15:35<br>[@vitest/browser-playwright](https://registry.npmjs.org/%40vitest%2Fbrowser-playwright)：`latest=5.1.1`，11-18 15:35 | 核心与 provider 同版本；MIT |
| 34 | fast-check | [fast-check](https://registry.npmjs.org/fast-check)：`latest=4.11.0`，11-22 06:44 | 正式；MIT |
| 35 | tla-ts | [tla-ts](https://registry.npmjs.org/tla-ts)：`latest=0.0.10`，11-11 08:34 | 0.0.x 新工具；MIT；不等于 TLC 已全面替换 |


### A.1 容易混淆的版本线与依赖证据

- Solid `next` 还指向 RC，但 `latest` 已是 2.0.3；看到 `next` 的旧值不能得出“Solid 2 尚未稳定”。旧 1.x 另有 `v1-latest`。取值见上述 registry。
- UI SDK 的 `beta.16` 是另一个 dist-tag，而无标签安装解析 `latest=beta.13`。试验应明确使用哪一组精确 core/adapter 版本，别用“最新”代替可复现版本。
- `@tanstack/solid-start@rc` 的 2.0.0-rc.11 声明 `solid-js` 与 `@solidjs/web` 为 `>=2.0.1 <3.0.0`，Vite `>=8.0.0`，Node `>=22.12.0`。`latest` 1.x 线不是这一组 peer 合同。宽松的 `solid-js >=1.0.0` peer 范围也不能单独证明 Solid 2 的运行时适配。
- `@qwik.dev/core@2.0.0-rc.5` 的 peer 范围含 Vite `>=8 <9`、Vitest `>=2 <5`。**不能把本轮 Vitest 5.1.1 当作可直接装进这个 Qwik RC 的默认组合。** 这正是跨工具版本矩阵比单包新旧更重要的例子。
- [storybook-solidjs-vite registry](https://registry.npmjs.org/storybook-solidjs-vite)的 `latest=10.7.4`，发布于 10-20 23:33，面向 Storybook 10；另有 Storybook 11 的 next 线。官方社区 [Solid 2 release 说明](https://github.com/solidjs-community/storybook/releases/tag/v10.1.0)解释了 `/next` 导出。先对齐包版本与 renderer，再加 addon-a11y、Vitest 集成。
- OpenUI 包名是 `@openuidev/*`，不是猜测出来的 `@openui/react`。A2UI、UI SDK、AI SDK 也不能按名称相似互相替换。

### A.2 不计入主条目的工作流与成熟基线

| 项目 | 本轮直接核验 | 处置 |
| --- | --- | --- |
| pstack | [官方目录/README](https://github.com/cursor/plugins/tree/main/pstack)；[live manifest](https://github.com/cursor/plugins/blob/main/pstack/.cursor-plugin/plugin.json) 为 0.15.46、MIT；manifest 最近修改提交 [0b46ec3](https://github.com/cursor/plugins/commit/0b46ec399d55f2829e88822998f53b84944837d3)，11-20 06:12 | Lauren Tan 维护的工作流、principles 与 skills；不是 UI runtime。官方 Cursor 安装入口 `/add-plugin pstack`。只记录，不在本轮安装或执行其工程工作流 |
| Thermos | [README](https://github.com/cursor/plugins/blob/main/thermos/README.md)；[manifest](https://github.com/cursor/plugins/blob/main/thermos/.cursor-plugin/plugin.json) 为 1.0.0、MIT；manifest 最近修改提交 [5080d38](https://github.com/cursor/plugins/commit/5080d38e4c522a96349824ba8adab4cac5a0ec22)，05-28 11:11 | Cursor 的两类审阅 agent 并行汇总。入口 `/add-plugin thermos`。模型审阅不是确定性检查器；版本 manifest 的日期不等于全部 skill 最后更新日期 |
| React Compiler | [官方文档](https://react.dev/learn/react-compiler)；[npm](https://registry.npmjs.org/babel-plugin-react-compiler) `latest=1.0.0`，2025-10-08 03:19，MIT | 作为不迁移 React 的对照，不把自动 memoization 夸大为自动修复一切性能问题 |
| TanStack Query | [官方安装文档](https://tanstack.com/query/latest/docs/framework/react/installation)；[npm](https://registry.npmjs.org/@tanstack%2freact-query) `latest=5.108.4`，11-23 21:20，MIT | 请求缓存的成熟基线；不需要关系集合与同步时，保留它可能最划算 |

## 附录 B：四条输入帖的身份、原文摘录与内容记录

这些材料是发现线索，不是选型权威。以下保留短原文摘录、完整来源链接与中文内容记录；长帖和文章全文请在原链接读取，本文不镜像长文。所引代码、工具名与作者判断均按其上下文理解。

### B.1 @shadcn：确切指向 UI SDK 的 Solid 适配器

来源：[2123132082042151332](https://x.com/shadcn/status/2123132082042151332)。发帖时间 **2026-11-19 03:11:48，Asia/Shanghai**。

> If you're building UI with @solid_js, try UI SDK. We built it for Solid 2.0.

内容记录：作者建议使用 Solid 的开发者尝试 UI SDK，称其针对 Solid 2.0 构建，并让使用者打开链接，把文档中的 prompt 交给 agent。直接外链是 [ui-sdk.dev/docs/solid](https://ui-sdk.dev/docs/solid)，引用的是 [@solid_js 的发布帖](https://x.com/solid_js/status/2122768111774629946)，而不是 AI SDK、assistant-ui 或任意“生成式 UI”产品。

引用帖时间为 **11-18 03:05:31，Asia/Shanghai**，宣布 Solid 2 与 Async Signals，外链到 [11 月 16 日的稳定版文章](https://www.solidjs.com/blog/solid-2-0-the-long-hold/)。公告日、发帖时刻、当前 npm patch 是三种不同时间事实。

**对研究的作用：** 引出行为组合、跨框架适配、随版本分发的 agent 文档。并不证明 UI SDK 比所有成熟无样式库都更合适。

### B.2 @devagrawal09：Solid 2 论证长文，不是独立性能报告

来源：[2089089101010239926](https://x.com/devagrawal09/status/2089089101010239926)。发帖时间 **2026-08-17 04:37:09，Asia/Shanghai**。关联 X Article：[Solid 2.0 for React Developers: The Migration Cursor's Agent Already Did](https://x.com/i/article/2088771846485213184)。本轮读取到可见文章全文。

> React asks you to predict. Solid asks you to read.

原帖内容记录：作者提到 Cursor 用 agent 将 Solid 迁向 React 的实验和编辑行数，主张两个迁移方向的语义难度不对称，并认为 Solid 的依赖图替作者承担了部分复杂度。

长文论证记录：

- 自动依赖追踪对比手工依赖数组；异步图、pending 与读取边界对比散落的加载状态。
- 结构化运行时诊断、受限写入和迁移工具有助于 agent 获得可检查反馈。
- 主张框架可以通过减少可错的选择来降低认知成本，并承认生态、招聘与工具是选择 React 的正当理由。
- 当前可见正文已包含对“Cursor 是否真正完成迁移”的更新，引用了 [Cursor 工程博客](https://cursor.com/blog/scaling-agents)、[工程人员回应](https://x.com/poteto/status/2089227731305464150)与 [solid-migration-assistant](https://github.com/solidjs-community/solid-migration-assistant)。

**证据纠偏：** 行数增长不是性能或维护成本的因果证据；“React 的复杂度全由作者承担”等句子是作者的论证立场。工程人员回应明确提到实际性能与维护动机、意外追踪导致的扇出，以及团队对 React 问题更熟悉。文章当前正文的“上周发布”与发帖时间、11 月稳定公告不构成可靠的一致时间线；X Article 可编辑，本轮未取得完整编辑历史，不能用这个相对日期推翻官方发布记录。

**对研究的作用：** 将“agent-friendly”拆成可读依赖、结构化诊断、可复现反例和迁移事实，而不是选边站。

### B.3 @bilalgursen777：同一个 UI SDK 之上的 Liquid Glass

来源：[2124806474492723244](https://x.com/bilalgursen777/status/2124806474492723244)。发帖时间 **2026-11-23 18:05:15，Asia/Shanghai**。

> Liquid Glass is now built on @uisdk.

内容记录：作者称 Liquid Glass 已建立在 UI SDK 上，键盘、焦点、表单与 ARIA 由 UI SDK 提供，玻璃外观由 WebGL2 shader 实现，并标为 MIT。外链为 [demo](https://liquid-glass-interface.pages.dev) 与 [GitHub](https://github.com/bilalgursen/liquid-glass)。附有约 18 秒视频，本轮未做视频逐帧或实机视觉验收。

**对研究的作用：** 不是再增加一种“UI SDK”。同一行为库被复用到一种 React 视觉组件集合。它支持研究行为/材质分离，也提醒我们检查 GPU、fallback 与许可证，而不是只评估观感。

### B.4 @cu30rry_：一套个人验证工作流，不是通用最佳实践的证明

来源：[2124807418739605514](https://x.com/cu30rry_/status/2124807418739605514)。发帖时间 **2026-11-23 18:09:00，Asia/Shanghai**。本轮读取到 `note_tweet` 全文，短 `text` 字段会截断。

> 技術選定を「検証可能性（Verifiability）」と「決定論（Determinism）」をベースに

完整内容的中文记录：作者在 pstack 工作流下从零构建 Solid 2 应用，以可验证性和确定性挑选工具。行为选 UI SDK，样式选 StyleX，组件状态与可访问性用 Storybook、addon-a11y/axe，真实浏览器用 Vitest Browser Mode 与 E2E，边界输入用 fast-check，状态模型用 tla-ts，审阅用 Thermos。

作者描述了需求、间歇性文档质询、实现和 opening-a-PR 的流程。他把最后一步做成自定义 skill，要求执行验证、纠正重复错误、维护验证技能、评论检查、审阅、状态图和复盘。作者称前几次 PR 检查基础后，后续可更多检查成果；同时承认当前主要服务大 PR，小改动也跑完整流程会消耗过多 token，尚需按规模分流。

**证据纠偏：** 这是个人经验，不是带对照组的研究；“Solid 没有 useEffect 类问题”不能理解为没有 effects、依赖误用或异步错误。不同验证器覆盖不同性质；Thermos 与其他模型审阅仍是随机系统。不要因这一条帖就把删除评论、全量形式检查或多模型并审设为每次小改动的默认流程。

**对研究的作用：** 引出独立的验证层与预算分级，同时验证实际存在的 Solid 2 adapter 与 peer 依赖，而不是抄一份工具名单。

### B.5 新增的全栈参考：不是 UI 名单的延伸

[@realchendahuang 原帖](https://x.com/realchendahuang/status/2124508785482072194)，2026-11-22 22:22:20，Asia/Shanghai。短原文：“分享下我目前常用的技术栈”。八类个人栈覆盖 Web、Oxc 工具、Cloudflare、Go/Compose/Caddy、Pigsty/pgmq/缓存/RustFS、Wails/SQLite/Electron、原生端与 Python/uv。

这条输入进一步说明完整应用远不止 UI。项目身份、服务语义、许可证、运维与反证已进入[全应用主报告](../modern-application-osint-dd-2026-11-23.md)，而不是将后端硬塞进本 UI 分册。“Ego Lite” 身份/许可未核，不推荐会话 cookie 抓取。个人偏好不构成通用最佳实践。

### B.6 新增的 Solid2 线程：预测不是已发布组件库

[@otterpal24 回复](https://x.com/otterpal24/status/2124810297785675820)，2026-11-23 18:20:26，Asia/Shanghai：

> @KaiwenR1 这两周应该就有团队倒腾出来了

其[父帖](https://x.com/KaiwenR1/status/2124809253068460250)是期待 Solid2 UI 组件库；[更上游原帖](https://x.com/otterpal24/status/2124793327619129621)是个人从 React + Ant Design 改为 Solid2 + UI SDK 后的[性能图](https://pbs.twimg.com/media/HXzIQC7bIAAycMy.jpg)。图中称 12 轮本地成对中位数：首次订单就绪 436.4→132.7ms、打开录入对话框 60.7→14.3ms、客户选项 25.9→10.2ms。

**这是作者报告，不是本轮测量。** 同时改变框架与组件库，缺复现仓库、设备/数据、harness 和原始样本，不能将结果因果归给 Solid，更不能把“这两周”当成一个新项目已经发布。与同一 UI SDK 去重，不新增独立候选。完整上下文见全应用主报告附录 C。

## 附录 C：下一次更新什么，才值得改变这份判断

优先追踪这些可观察事件，而不是按社交热度更新名单：

1. UI SDK GA、beta 条款和跨框架兼容合同是否稳定，复杂控件是否有可重复行为测试。
2. TanStack DB 从 RC 到正式的 API/迁移变化，以及独立 oracle 对实际失败类别的覆盖。
3. Vue Vapor、Qwik 2、Waku 的 RC 收尾与第三方组件/部署适配，不凭公告愿景补齐未交付能力。
4. Solid 2 配套 router、测试渲染器、样式编译与观测工具是否对齐，尤其防止“peer 范围允许”被误当作“完整验证过”。
5. Jazz 2 和 LiveStore 的备份、升级、旧客户端处理与数据退出证据。数据层比 UI 皮肤需要更长观察期。
6. A2UI/json-render/OpenUI 的版本兼容、恢复、目录治理与独立同任务成本对比，不直接采用厂商横评数字。
7. tla-ts 对 TLC 的兼容与独立交叉验证，模型与实现的持续对应方式，而不只是 README 的速度数字。
8. 每个已采用项目是否出现弃用、归档、维护集中或许可变化；已有选择不因一次新发布自动失效。

## Sources：第一方来源索引

事实引用已放在对应段落与版本表旁。以下去重保留全部来源地址，便于后续复核；列表不代表已逐行审计源代码。

<details>
<summary>展开来源链接</summary>

### a2ui.org

- <https://a2ui.org/>
- <https://a2ui.org/quickstart/>

### ai-sdk.dev

- <https://ai-sdk.dev/docs/introduction>

### angular.dev

- <https://angular.dev/guide/signals>
- <https://angular.dev/guide/zoneless>
- <https://angular.dev/installation>

### ark-ui.com

- <https://ark-ui.com/docs/overview/about>
- <https://ark-ui.com/docs/overview/getting-started>

### base-ui.com

- <https://base-ui.com/react/overview/quick-start>

### cursor.com

- <https://cursor.com/blog/scaling-agents>

### developer.mozilla.org

- <https://developer.mozilla.org/en-US/docs/Web/API/Popover_API>
- <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning>
- <https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API>

### docs.ag-ui.com

- <https://docs.ag-ui.com/introduction>

### docs.astro.build

- <https://docs.astro.build/en/concepts/islands/>

### docs.copilotkit.ai

- <https://docs.copilotkit.ai/>

### docs.livestore.dev

- <https://docs.livestore.dev/overview/when-livestore/>
- <https://docs.livestore.dev/>
- <https://docs.livestore.dev/getting-started>
- <https://docs.livestore.dev/overview/technology-comparison/>
- <https://docs.livestore.dev/sync-providers/electricsql/>

### electric-sql.com

- <https://electric-sql.com/docs/intro>
- <https://electric-sql.com/docs/quickstart>
- <https://electric-sql.com/docs/guides/auth>

### fast-check.dev

- <https://fast-check.dev/docs/introduction/>
- <https://fast-check.dev/docs/advanced/model-based-testing/>

### github.com

- <https://github.com/vuejs/core/releases/tag/v3.6.0-rc.1>
- <https://github.com/solidjs/solid>
- <https://github.com/solidjs/solid/releases/tag/solid-js%402.0.3>
- <https://github.com/vercel-labs/ui>
- <https://github.com/TanStack/db>
- <https://github.com/rocicorp/mono>
- <https://github.com/livestorejs/livestore>
- <https://github.com/garden-co/jazz>
- <https://github.com/vercel-labs/json-render>
- <https://github.com/a2ui-project/a2ui>
- <https://github.com/bilalgursen/liquid-glass>
- <https://github.com/facebook/stylex>
- <https://github.com/TanStack/router>
- <https://github.com/aidenybai/tla-ts>
- <https://github.com/sveltejs/svelte>
- <https://github.com/vuejs/core>
- <https://github.com/angular/angular>
- <https://github.com/lit/lit>
- <https://github.com/QwikDev/qwik>
- <https://github.com/wakujs/waku>
- <https://github.com/electric-sql/electric>
- <https://github.com/mui/base-ui>
- <https://github.com/chakra-ui/ark>
- <https://github.com/chakra-ui/zag>
- <https://github.com/adobe/react-spectrum>
- <https://github.com/shadcn-ui/ui>
- <https://github.com/vercel/ai>
- <https://github.com/assistant-ui/assistant-ui>
- <https://github.com/CopilotKit/CopilotKit>
- <https://github.com/ag-ui-protocol/ag-ui>
- <https://github.com/thesysdev/openui>
- <https://github.com/xyflow/xyflow>
- <https://github.com/xyflow/vite-react-flow-template>
- <https://github.com/tldraw/tldraw>
- <https://github.com/vikejs/vike>
- <https://github.com/voidzero-dev/vite-plus>
- <https://github.com/AmanVarshney01/create-better-t-stack>
- <https://github.com/storybookjs/storybook>
- <https://github.com/solidjs-community/storybook>
- <https://github.com/vitest-dev/vitest>
- <https://github.com/dubzzz/fast-check>
- <https://github.com/krausest/js-framework-benchmark>
- <https://github.com/facebookexperimental/Recoil>
- <https://github.com/bilalgursen/liquid-glass/tree/d4ef632bf96c2b0e48e2ea08c03e3a912d81d2e2>
- <https://github.com/solidjs-community/storybook/releases/tag/v10.1.0>
- <https://github.com/cursor/plugins/tree/main/pstack>
- <https://github.com/cursor/plugins/blob/main/pstack/.cursor-plugin/plugin.json>
- <https://github.com/cursor/plugins/commit/0b46ec399d55f2829e88822998f53b84944837d3>
- <https://github.com/cursor/plugins/blob/main/thermos/README.md>
- <https://github.com/cursor/plugins/blob/main/thermos/.cursor-plugin/plugin.json>
- <https://github.com/cursor/plugins/commit/5080d38e4c522a96349824ba8adab4cac5a0ec22>
- <https://github.com/solidjs-community/solid-migration-assistant>

### htmx.org

- <https://htmx.org/docs/>

### jazz.tools

- <https://jazz.tools/docs>
- <https://jazz.tools/docs/quickstart>

### json-render.dev

- <https://json-render.dev/docs>
- <https://json-render.dev/docs/installation>
- <https://json-render.dev/docs/quick-start>

### liquid-glass-interface.pages.dev

- <https://liquid-glass-interface.pages.dev>
- <https://liquid-glass-interface.pages.dev/r/liquid-glass.json>

### lit.dev

- <https://lit.dev/docs/>
- <https://lit.dev/docs/getting-started/>
- <https://lit.dev/docs/tools/starter-kits/>
- <https://lit.dev/docs/ssr/overview/>

### qwik.dev

- <https://qwik.dev/docs/getting-started/>

### react-spectrum.adobe.com

- <https://react-spectrum.adobe.com/react-aria/getting-started.html>

### react.dev

- <https://react.dev/learn/react-compiler>

### reactflow.dev

- <https://reactflow.dev/learn>

### registry.npmjs.org

- <https://registry.npmjs.org/solid-js>
- <https://registry.npmjs.org/%40solidjs%2Fweb>
- <https://registry.npmjs.org/svelte>
- <https://registry.npmjs.org/vue>
- <https://registry.npmjs.org/%40angular%2Fcore>
- <https://registry.npmjs.org/lit>
- <https://registry.npmjs.org/%40builder.io%2Fqwik>
- <https://registry.npmjs.org/%40qwik.dev%2Fcore>
- <https://registry.npmjs.org/waku>
- <https://registry.npmjs.org/%40tanstack%2Fdb>
- <https://registry.npmjs.org/%40rocicorp%2Fzero>
- <https://registry.npmjs.org/%40electric-sql%2Fclient>
- <https://registry.npmjs.org/jazz-tools>
- <https://registry.npmjs.org/%40livestore%2Flivestore>
- <https://registry.npmjs.org/%40ui-sdk%2Fcore>
- <https://registry.npmjs.org/%40ui-sdk%2Fsolid>
- <https://registry.npmjs.org/%40base-ui%2Freact>
- <https://registry.npmjs.org/%40ark-ui%2Freact>
- <https://registry.npmjs.org/%40zag-js%2Fcore>
- <https://registry.npmjs.org/react-aria-components>
- <https://registry.npmjs.org/shadcn>
- <https://registry.npmjs.org/%40stylexjs%2Fstylex>
- <https://registry.npmjs.org/ai>
- <https://registry.npmjs.org/%40assistant-ui%2Freact>
- <https://registry.npmjs.org/%40copilotkit%2Freact-core>
- <https://registry.npmjs.org/%40ag-ui%2Fcore>
- <https://registry.npmjs.org/%40a2ui%2Freact>
- <https://registry.npmjs.org/%40json-render%2Freact>
- <https://registry.npmjs.org/%40openuidev%2Freact-lang>
- <https://registry.npmjs.org/%40openuidev%2Freact-ui>
- <https://registry.npmjs.org/%40xyflow%2Freact>
- <https://registry.npmjs.org/tldraw>
- <https://registry.npmjs.org/%40tanstack%2Freact-start>
- <https://registry.npmjs.org/%40tanstack%2Fsolid-start>
- <https://registry.npmjs.org/vike>
- <https://registry.npmjs.org/vite-plus>
- <https://registry.npmjs.org/create-better-t-stack>
- <https://registry.npmjs.org/storybook>
- <https://registry.npmjs.org/vitest>
- <https://registry.npmjs.org/%40vitest%2Fbrowser-playwright>
- <https://registry.npmjs.org/fast-check>
- <https://registry.npmjs.org/tla-ts>
- <https://registry.npmjs.org/storybook-solidjs-vite>
- <https://registry.npmjs.org/babel-plugin-react-compiler>
- <https://registry.npmjs.org/@tanstack%2freact-query>

### storybook.js.org

- <https://storybook.js.org/docs/get-started/install>
- <https://storybook.js.org/docs/writing-tests/accessibility-testing>

### stylexjs.com

- <https://stylexjs.com/docs/learn/>
- <https://stylexjs.com/docs/learn/installation/>

### svelte.dev

- <https://svelte.dev/docs/svelte/overview>
- <https://svelte.dev/docs/kit/creating-a-project>

### tanstack.com

- <https://tanstack.com/db/latest>
- <https://tanstack.com/blog/tanstack-db-1.0-rc1-going-all-in-on-oracles>
- <https://tanstack.com/db/latest/docs/quick-start>
- <https://tanstack.com/start/latest>
- <https://tanstack.com/start/latest/docs/framework/react/quick-start>
- <https://tanstack.com/query/latest/docs/framework/react/installation>

### tldraw.dev

- <https://tldraw.dev/quick-start>
- <https://tldraw.dev/community/license>

### ui-sdk.dev

- <https://ui-sdk.dev/docs/core>
- <https://ui-sdk.dev/docs/solid/installation>
- <https://ui-sdk.dev/docs/core/behaviors>
- <https://ui-sdk.dev/docs/solid>
- <https://ui-sdk.dev/docs/core/get-started>

### ui.shadcn.com

- <https://ui.shadcn.com/docs/registry>

### v2.vuejs.org

- <https://v2.vuejs.org/eol/>

### vike.dev

- <https://vike.dev/>
- <https://vike.dev/new>
- <https://vike.dev/start>
- <https://vike.dev/new/core>

### viteplus.dev

- <https://viteplus.dev/guide/>
- <https://viteplus.dev/guide/create>

### vitest.dev

- <https://vitest.dev/guide/browser/>

### vuejs.org

- <https://vuejs.org/guide/quick-start>

### waku.gg

- <https://waku.gg/>

### web.dev

- <https://web.dev/baseline>

### windicss.org

- <https://windicss.org/posts/sunsetting>

### www.assistant-ui.com

- <https://www.assistant-ui.com/docs>
- <https://www.assistant-ui.com/docs/cli>
- <https://www.assistant-ui.com/docs/runtimes/ai-sdk>

### www.better-t-stack.dev

- <https://www.better-t-stack.dev/docs>
- <https://www.better-t-stack.dev/docs/cli/agent-workflows>

### www.openui.com

- <https://www.openui.com/docs/openui-lang/overview>
- <https://www.openui.com/docs/openui-lang/quickstart>

### www.solidjs.com

- <https://www.solidjs.com/blog/solid-2-0-the-long-hold/>

### x.com

- <https://x.com/poteto/status/2089227731305464150>
- <https://x.com/shadcn/status/2123132082042151332>
- <https://x.com/solid_js/status/2122768111774629946>
- <https://x.com/devagrawal09/status/2089089101010239926>
- <https://x.com/i/article/2088771846485213184>
- <https://x.com/bilalgursen777/status/2124806474492723244>
- <https://x.com/cu30rry_/status/2124807418739605514>

### zero.rocicorp.dev

- <https://zero.rocicorp.dev/docs/introduction>
- <https://zero.rocicorp.dev/docs/quickstart>
- <https://zero.rocicorp.dev/docs/permissions>

</details>
