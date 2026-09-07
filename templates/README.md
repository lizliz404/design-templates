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

不变量：一次改动 = 一个资产文件 + 本主路由恰好一行；micro-pattern 另补 `ui-patterns/README.md` 一行（局部清单，不是第二主索引）；外部站点只有书签价值才进 [`inspiration-sources.md`](./inspiration-sources.md)——不 vendor 外站，不写资产说明册。

**新增（复制骨架）：**

```markdown
---
name: <slug>
description: >-
  <是什么>。Use when <分支 1 触发条件>; <分支 2>…（第三人称，触发分支前置）
---

# <标题>

<一行定位 + 上游链接>

## 流程（何时跑、按序做什么、终点怎么判）

## 机制依据（按需查的平铺规则，co-location）

## 边界（硬性 guardrail，正面措辞）
```

路由行格式：`- **<任务触发词>** → [`<路径>`](./<路径>)；<一句话边界>。`

**修改**：改资产本身 + 它在本主路由的那一行；跨文件引用保持单向。

**删除**：删资产 + 主路由行；micro-pattern 再删 `ui-patterns/README.md` 的本地行。

**收尾（必须）**：`bash scripts/lint-pack.sh`——零 orphan、无机器绝对路径、zip 退役、`ui-patterns` 本地清单齐，全绿才算改完。

## 产品任务

- **B2B 数据密集后台 / CRM / 管理台** → [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md) + [`ui-patterns/data-dense-b2b-app.md`](./ui-patterns/data-dense-b2b-app.md)。需要 records / diff / filter 表格语法时，再组合下一节的 Beautiful UI。
- **Chatbot / AI Agent 界面** → [Agent / motion chrome](#agent--motion-chrome) 的 **Beautiful UI primitives**；它覆盖 thinking、streaming、approval、tool chips、composer 和 dense tables。
- **Agent 界面选轮子 / agentic UI 组件赛道验真** → [`agentic-ui-primitives.md`](./agentic-ui-primitives.md)；状态原语 × chat 框架 × 协议 × 生成式 UI 四层坐标、六轮子验真表与抄/装/上框架阶梯；承接 ui-stack-decision §3 A 行，Beautiful UI 本体研究走上一行。
- **SaaS 激活 / onboarding → setup** → [`ui-patterns/saas-onboarding-two-phase.md`](./ui-patterns/saas-onboarding-two-phase.md) + [`ia-user-journey.md`](./ia-user-journey.md)；先 aha，再进入生产用量。
- **叙事长 landing** → [`design/lead-radar/`](./design/lead-radar/) 或 [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)；按需组合 [`ui-patterns/premium-one-pager.md`](./ui-patterns/premium-one-pager.md) 和 [`ui-patterns/footer-craft.md`](./ui-patterns/footer-craft.md)。**按目标站做可测量复刻**（IMR / SLR / behavior）→ sibling [landing-page-replication-v5](https://github.com/lizliz404/agent-skills/tree/main/skills/landing-page-replication-v5)；软路由 [`sibling-routes.md`](./sibling-routes.md)。
- **个人站 / 作品集** → [`design/hanzilla-personal-site/`](./design/hanzilla-personal-site/) 或 [`design/liz-personal-compact/`](./design/liz-personal-compact/)。
- **内容到服务承接页** → [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)；入口屋不是交付工厂。
- **站内 / 产品内搜索** → [`ui-patterns/search-craft.md`](./ui-patterns/search-craft.md)；先区分 Search、Filter 与 Cmd+K。
- **图标选型 / 线重 / 概念表** → [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)；不是 favicon，也不默认自研 icon font。
- **UI 栈拍板记录** → [`ui-stack-decision.md`](./ui-stack-decision.md)；管道层/可见层边界、换依赖成本分级 L0–L3、候选分级与 agent-friendly 真标准 + Iconoir 图标决策并入（2026-09-05，Liz），适用 chuhai-cloud / inquiry-foundry；线重与概念表规则走上一行。
- **现有界面 audit → refine / Libraries.dev 效果选型 / Astryx 组件研究 / Light Rails 动效实验** → [`ui-patterns/interface-audit-refine-toolchain.md`](./ui-patterns/interface-audit-refine-toolchain.md)；Interfaces skills 管审计与修复，Libraries.dev 与 Astryx 只填已证明的效果 / 组件缺口，Light Rails 只做许可隔离的单层 motion spike。
- **系统消息 / 错误恢复** → [`ui-patterns/recover-at-point-of-failure.md`](./ui-patterns/recover-at-point-of-failure.md)；toast / alert / modal 按 L0–L3 可执行性分级，失败点就地恢复；补 data-dense 后台与 onboarding 的消息纪律。
- **发布 / 排期月历** → [`ui-patterns/publish-calendar/SKILL.md`](./ui-patterns/publish-calendar/SKILL.md)；一级年月控制、状态点密度与 shell-hotkey 共存的键盘合同，规则分 MUST/POLICY/PROFILE 三层（Aurora 参数是示例 profile）；是页面级工作台，不是 date picker。
- **Logo / favicon / app icon / OG 卡 / 品牌资产** → [`brand-identity/SKILL.md`](./brand-identity/SKILL.md)；七层级 skill 地图 + 媒介匹配规则（几何 → 手写 SVG，材质 → image-gen）+ 16px gate + diverge→converge 流水线；不是 UI 图标系统（那走 [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)）。
- **集成 logo / 技术栈标 / 占位 logo 墙 / 外部品牌标** → [`brand-logo-sources.md`](./brand-logo-sources.md)；真品牌标库（Simple Icons / theSVG / SVGL…）× 虚构占位标（Hugeicons Logos / Untitled UI Logos…）的验真源头表 + 商标与构建期离线纪律；不是功能图标（那走 [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)），也不是自研 logo 流水线（那走上一行 brand-identity）。

## Agent / motion chrome

这些资产相邻，是因为它们都在解决 **AI surface chrome**：Agent 的可见思考与操作反馈、页面的状态感和氛围。但相邻只是路由关系，不能合并文件夹：Beautiful UI 是可挑选的 React 源码组件；orb、shader、hero 与 sound 各有来源、许可与消费方式。

- **Beautiful UI primitives** → [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)；21 个组件的完整官方 TSX、共享样式、依赖锁文件和 MIT 许可；固定版本与官网 Copy code 逐项核验，包含 Prompt Bar、Insight Cards、Flowchart 和 Agent Screen。
- **AI thinking orb** → [`ui-patterns/ai-thinking-orb/SKILL.md`](./ui-patterns/ai-thinking-orb/SKILL.md)；`FluidOrb` 或 `Liquid Orb` 二选一。两个上游都已收进包：Liquid Orb 的 MIT `effect.wgsl` / `effect.metal` 在 `ai-thinking-orb/upstream/lersent-orb/`，FluidOrb 参考拷贝（带 PROVENANCE）+ 生产级 plain-React 移植在 `ai-thinking-orb/upstream/rare-ui-fluid-orb/` 与 `ai-thinking-orb/recipes/`。与 live Paper shader 互斥：同一视图最多一套动态大气。
- **Paper Shaders** → [`paper-shaders/SKILL.md`](./paper-shaders/SKILL.md)；纸张 / mesh / veil 是背景氛围，不承担状态 orb 的语义。
- **ThreeUI one-hero** → [`ui-patterns/threeui-hero-adapter.md`](./ui-patterns/threeui-hero-adapter.md)；只作产品交互表面，先通过 visual-economy gate，说明图不使用它。
- **Drafting resolve hero** → [`ui-patterns/drafting-resolve-hero.md`](./ui-patterns/drafting-resolve-hero.md)；three.js batched 线稿的「虚线草图 = 未确认方案、注意力 = 人工确认、实线 = 可交付」hero，产品承诺是「先确认后生成」类叙事时用；机制源头与生命周期合同在 webgl-threejs-background-animation skill；同一视图最多一套动态大气。
- **vgpu 自研 GPU 特效** → [`ui-patterns/vgpu-webgpu-effects.md`](./ui-patterns/vgpu-webgpu-effects.md)；vercel-labs 的 WebGPU 库（typed WGSL、版本化 gzip 预算、browser / node / mock 三运行时；0.4.0 库主入口预算 38,912 bytes，产品包体另测）。vendored 资产（orb / Paper / ThreeUI / theater）覆盖不到的自定义 shader 特效才上手；WebGPU-only 无兜底；同一视图最多一套动态大气。
- **UI SFX** → [`ui-patterns/uisfx-semantic-cues.md`](./ui-patterns/uisfx-semantic-cues.md)；声音是可见状态的补充，绝不是唯一状态通道。
- **Hand-drawn controls** → [`ui-patterns/hand-drawn-controls.md`](./ui-patterns/hand-drawn-controls.md)；手绘 boiling 控件（drawably 蒸馏，MIT）：seeded SVG 叠在真控件下，a11y 来自真控件；playful / landing 表面专用，dense B2B admin 换资产。

## Decks / diagrams

- **结构图 / 说明图（默认）** → [`decks/visual-economy.md`](./decks/visual-economy.md)：先 prose，再 ASCII、Mermaid；不要默认上 React / Three。
- **HTML 演示 deck（审美交付）** → [`decks/README.md`](./decks/README.md)；确认 occasion 是演讲或课程后，才进入 `upstream/beautiful-html-templates`、`frontend-slides` 和可选 Paper Shaders。

## Craft / tokens

- **高杠杆 craft checklist** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)
- **Typography** → [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)
- **Color / surface** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md) 的 color / surface 规则
- **i18n / language switcher** → [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)
- **i18n / 翻译存活排版规则** → [`i18n-translation-survival.md`](./i18n-translation-survival.md)：atom、换行、层级通道、RTL、IME、voice 的规则级手册；做切换器组件走上一行的 lang-switcher 文档。
- **On-brand AI 生成合同 / 压 AI 味** → [`on-brand-ai-generation-craft.md`](./on-brand-ai-generation-craft.md)：Hallmark 58 gates + macrostructure 轮换，Vercel design.md 单文件合同与 eval 方法；agent 生成官网 / 活动页 / 报告页前先过它。
- **IA / user journey / default home / nav** → [`ia-user-journey.md`](./ia-user-journey.md)
- **Header 控件分置 / 状态切换器 vs 入口 vs 外链** → [`chrome-controls-placement.md`](./chrome-controls-placement.md)：高频状态切换（theme/locale）必须 Header 一键 icon switcher，menu 只收低频入口与外链；审"统一 dropdown"混装时开它。
- **渲染选型 / SSG vs SSR vs SPA** → [`rendering-strategy-map.md`](./rendering-strategy-map.md)：按表面选渲染策略的坐标轴与决策启发；生成式 site factory 的特殊视角与 unknown unknowns 清单。

## 灵感书签

[`inspiration-sources.md`](./inspiration-sources.md) 按同一任务族群整理外部站点。一次只开 1–2 个站，记下可复用机制和明确不抄的部分，然后回到本路由选择资产；禁止整站 mirror gallery。

## 已知缺口

- **没有完整 B2B 数据密集后台模板**：现有 `data-dense-app-craft.md` 是手册，`data-dense-b2b-app.md` 是交付闸。若沉淀出 tokens、表格 / 表单语法和截图，应回填 `design/<slug>/` 并在本节更新。
- **没有可安装的 App 内表格组件**：已有 Beautiful UI Records / Diff / Filter 原始 TSX；仍需在消费项目接入真实数据、分页与权限。
- **静态站与 React landing 的统一规则仍缺**：双营销面的共同 token、组件边界和回归检查尚未沉淀为通用资产。
