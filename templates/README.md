# Design templates pack

可复用资产来自已完成项目与公开设计调研。这里是唯一的 pack 主路由：按任务找到资产、按规则维护资产；`README.md`、`SKILL.md` 和局部 README 只链接到这里，不另存一份平行清单。

**Canonical source:** [lizliz404/design-templates](https://github.com/lizliz404/design-templates)（本仓库的 `templates/`）。服务器中的 `<project>/_templates` 是同速镜像，不是第二来源；以 GitHub 仓库为准并保持镜像一致。

## 如何使用这个 pack

先按下方任务选一个最小资产，再读取它自己的 `README.md` / `DESIGN.md` / craft 文。无法写出选择理由，就还没有完成发现阶段。

```text
Job:
Chosen asset(s):
Why these fit:
Explicitly skipped:
Acceptance screenshots / checks:
```

每次复用都要留下：选择与跳过理由、项目 token / 签名动作、关键状态、桌面和窄屏截图，以及键盘 / motion / overflow / 错误恢复检查。构建通过不等于视觉验收；复制来的模式必须适配本项目系统。

## 如何添加、修改、删除

1. 新增一个资产时，只新增一个文件夹或一个 `.md`，并在本主路由加一条任务路由。
2. 修改资产时，更新资产本身和它在本主路由中的那一条路由；不要再建平行索引。
3. 删除资产时，删除资产与本主路由行；若是 micro-pattern，再删 `ui-patterns/README.md` 的本地行。
4. 新增 micro-pattern 时，除主路由外只补 `ui-patterns/README.md` 的一行；它是局部清单，不是第二主索引。
5. 只有外部参考价值才在 [`inspiration-sources.md`](./inspiration-sources.md) 加书签行；不 vendor 外站，不另写资产说明册。

一次新增或删除应只改一处主路由；其他入口只链接这里，不要求同步四份散文。

## 产品任务

- **B2B 数据密集后台 / CRM / 管理台** → [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md) + [`ui-patterns/data-dense-b2b-app.md`](./ui-patterns/data-dense-b2b-app.md)。需要 records / diff / filter 表格语法时，再组合下一节的 Beautiful UI。
- **Chatbot / AI Agent 界面** → [Agent / motion chrome](#agent--motion-chrome) 的 **Beautiful UI primitives**；它覆盖 thinking、streaming、approval、tool chips、composer 和 dense tables。
- **SaaS 激活 / onboarding → setup** → [`ui-patterns/saas-onboarding-two-phase.md`](./ui-patterns/saas-onboarding-two-phase.md) + [`ia-user-journey.md`](./ia-user-journey.md)；先 aha，再进入生产用量。
- **叙事长 landing** → [`design/lead-radar/`](./design/lead-radar/) 或 [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)；按需组合 [`ui-patterns/premium-one-pager.md`](./ui-patterns/premium-one-pager.md) 和 [`ui-patterns/footer-craft.md`](./ui-patterns/footer-craft.md)。**按目标站做可测量复刻**（IMR / SLR / behavior）→ sibling [landing-page-replication-v5](https://github.com/lizliz404/agent-skills/tree/main/skills/landing-page-replication-v5)；软路由 [`sibling-routes.md`](./sibling-routes.md)。
- **个人站 / 作品集** → [`design/hanzilla-personal-site/`](./design/hanzilla-personal-site/) 或 [`design/liz-personal-compact/`](./design/liz-personal-compact/)。
- **内容到服务承接页** → [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)；入口屋不是交付工厂。
- **站内 / 产品内搜索** → [`ui-patterns/search-craft.md`](./ui-patterns/search-craft.md)；先区分 Search、Filter 与 Cmd+K。
- **图标选型 / 线重 / 概念表** → [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)；不是 favicon，也不默认自研 icon font。
- **发布 / 排期月历** → [`ui-patterns/publish-calendar/SKILL.md`](./ui-patterns/publish-calendar/SKILL.md)；一级年月控制、状态点密度与 shell-hotkey 共存的键盘合同，规则分 MUST/POLICY/PROFILE 三层（Aurora 参数是示例 profile）；是页面级工作台，不是 date picker。

## Agent / motion chrome

这些资产相邻，是因为它们都在解决 **AI surface chrome**：Agent 的可见思考与操作反馈、页面的状态感和氛围。但相邻只是路由关系，不能合并文件夹：Beautiful UI 是可挑选的 DOM 原语；orb、shader、hero 与 sound 各有来源、许可与消费方式。

- **Beautiful UI primitives** → [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)；thinking、streaming、approval、agent tables 等 19 个原语。优先用于 Agent UI，也可组合进数据密集后台。
- **AI thinking orb** → [`ui-patterns/ai-thinking-orb/SKILL.md`](./ui-patterns/ai-thinking-orb/SKILL.md)；`FluidOrb` 或 `Liquid Orb` 二选一。两个上游都已收进包：Liquid Orb 的 MIT `effect.wgsl` / `effect.metal` 在 `ai-thinking-orb/upstream/lersent-orb/`，FluidOrb 参考拷贝（带 PROVENANCE）+ 生产级 plain-React 移植在 `ai-thinking-orb/upstream/rare-ui-fluid-orb/` 与 `ai-thinking-orb/recipes/`。与 live Paper shader 互斥：同一视图最多一套动态大气。
- **Paper Shaders** → [`paper-shaders/SKILL.md`](./paper-shaders/SKILL.md)；纸张 / mesh / veil 是背景氛围，不承担状态 orb 的语义。
- **ThreeUI one-hero** → [`ui-patterns/threeui-hero-adapter.md`](./ui-patterns/threeui-hero-adapter.md)；只作产品交互表面，先通过 visual-economy gate，说明图不使用它。
- **vgpu 自研 GPU 特效** → [`ui-patterns/vgpu-webgpu-effects.md`](./ui-patterns/vgpu-webgpu-effects.md)；vercel-labs 的 WebGPU 库（typed WGSL、25KB gz 预算、browser / node / mock 三运行时）。vendored 资产（orb / Paper / ThreeUI / theater）覆盖不到的自定义 shader 特效才上手；WebGPU-only 无兜底；同一视图最多一套动态大气。
- **UI SFX** → [`ui-patterns/uisfx-semantic-cues.md`](./ui-patterns/uisfx-semantic-cues.md)；声音是可见状态的补充，绝不是唯一状态通道。

## Decks / diagrams

- **结构图 / 说明图（默认）** → [`decks/visual-economy.md`](./decks/visual-economy.md)：先 prose，再 ASCII、Mermaid；不要默认上 React / Three。
- **HTML 演示 deck（审美交付）** → [`decks/README.md`](./decks/README.md)；确认 occasion 是演讲或课程后，才进入 `upstream/beautiful-html-templates`、`frontend-slides` 和可选 Paper Shaders。

## Craft / tokens

- **高杠杆 craft checklist** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)
- **Typography** → [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)
- **Color / surface** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md) 的 color / surface 规则
- **i18n / language switcher** → [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)
- **IA / user journey / default home / nav** → [`ia-user-journey.md`](./ia-user-journey.md)
- **渲染选型 / SSG vs SSR vs SPA** → [`rendering-strategy-map.md`](./rendering-strategy-map.md)：按表面选渲染策略的坐标轴与决策启发；生成式 site factory 的特殊视角与 unknown unknowns 清单。

## 灵感书签

[`inspiration-sources.md`](./inspiration-sources.md) 按同一任务族群整理外部站点。一次只开 1–2 个站，记下可复用机制和明确不抄的部分，然后回到本路由选择资产；禁止整站 mirror gallery。

## 已知缺口

- **没有完整 B2B 数据密集后台模板**：现有 `data-dense-app-craft.md` 是手册，`data-dense-b2b-app.md` 是交付闸。若沉淀出 tokens、表格 / 表单语法和截图，应回填 `design/<slug>/` 并在本节更新。
- **没有可安装的 App 内表格组件**：只有语法手册和 `beautiful-ui-ai-interfaces/sections/records-table.html` 的 DOM 骨架。
- **Beautiful UI `Flowchart` 尚未收录**：源站已是 20 项，pack 仍为 19 primitives；仅当产品确实需要可编辑工作流画布时再复核，不把它当文档图表。
- **静态站与 React landing 的统一规则仍缺**：双营销面的共同 token、组件边界和回归检查尚未沉淀为通用资产。
