---
name: ui-stack-decision
description: >-
  Decision record on UI-stack homogenization: the pipeline layer (headless
  primitives + styling engine) carries no personality — do not swap or chase
  novelty; differentiation lives only in the visible layer (tokens, component
  defaults, signature components, icons). Covers an L0-L3 cost ladder for
  "should we swap dependencies", a graded candidate pool, agent-friendly
  criteria, and the folded-in Iconoir icon decision. Use when judging a
  library swap, planning anti-homogenization work, or picking UI stack
  dependencies for chuhai-cloud / inquiry-foundry.
---

# UI Stack Decision · UI 栈同质化决策（2026-09-05 拍板）

> 结论先行：**管道层（headless 原语 + 样式引擎）不承载个性——不换、不追新；同质化的脸长在可见层；差异化只在可见层做。**
> 决策人：Liz · 适用：chuhai-cloud + inquiry-foundry · 本文件是 UI 栈唯一决策记录，引用勿粘对话原文。
> 图标层决策（Iconoir，2026-08-31）已并入 §5，本文件取代旧 icon-decision.md，未保留细节以 git 历史为准。

## 1 · 病理：同质化的脸怎么长出来的

| 层 | 内容 | 用户可见度 | 同质化贡献 |
|---|---|---|---|
| **骨** | headless 原语（Radix/Base UI）+ 样式引擎（Tailwind/Panda/StyleX）+ a11y / 焦点 / 浮层机制 | 看不见 | ≈0——没人因为 keyboard nav 由谁实现而记住一个产品 |
| **肉** | 默认 token、组件默认形态、密度、圆角、灰阶 | 全部可见 | ~70%——`Inter + Lucide + shadcn + zinc + 1px border + rounded-xl + 蓝紫渐变` 这套 AI SaaS 模板味从这里来 |
| **皮** | 动效、材质、signature 组件、图标人格 | 第一眼 | 决定「认不认得出」：唯一能建立记忆点的层 |
| **反馈回路** | agent 按注册表与训练分布输出 | — | **AI 生成是同质化加速器**：人手写还有口音，agent 输出完全收敛到库的默认形态 |

推论：anti-homogenization 的第一工具不是换库，是给 agent 白纸黑字的合同——`DESIGN.md`（token / 形态约束）+ `design-lint`（机检）+ registry 协议（组件从哪来）。没有合同，换任何库只是换一批默认值。

## 2 · 成本分级：「换依赖重不重」的诚实答案

实测基准（chuhai-web）：123 个 tsx/ts 中仅 10 个直接 import `@radix-ui`；17 个 shadcn 原语集中在 `src/components/ui` 自有文件；61 个文件用 lucide-react（Iconoir 迁移中，见 §5）。

| 级 | 对象 | 改动成本 | 差异化收益 | 拍板 |
|---|---|---|---|---|
| **L0** | 管道依赖：headless 库 / 样式引擎 | 高：全量回归 a11y、浮层、键盘 | 0（用户看不见） | **不换**（存量仅 10/123 文件，等升级窗口） |
| **L1** | 原语文件：`components/ui` 17 个自有文件 | 中：改默认形态不换依赖 | 低–中 | 依赖不换；形态按仓内 DESIGN.md 改写 |
| **L2** | token：色 / 字 / 密度 / 圆角 / 阴影 | **最低：一晚上见效** | 高 | 主战场；Aurora Glass 已做 |
| **L3** | signature 组件：自研形态 | 高：设计 + 实现 + 视觉验收 | 最高 | 按审计推进；09-04 六组件合同在此层 |

Base UI 已成 shadcn/ui 官方默认（2026-07 起，新项目 2:1 选择），但默认不等于义务——官方原话是 production app 别换组件库。落点：**「机械化换依赖」是伪命题；机械的部分（L0/L1 的依赖替换）恰恰最不值得做，值得做的是 L2/L3 的设计活。**

## 3 · 候选分级表

| 级 | 对象 | 用途 | 边界 |
|---|---|---|---|
| **S · 管道层参照** | Base UI：Radix/Floating UI/MUI 原班人马（Colm Tuite 等），unstyled，1.6.0，周下载 6M+ | 观望对象：shadcn 官方已设为默认 | Radix 不废弃、双轨支持，官方 migrate-radix-to-base skill 可渐进迁移；不为「新默认」本身迁移，等 chuhai 升级窗口 |
| **S · 差异化参照** | Astryx（github.com/facebook/astryx，MIT，2026-01 创建，Beta，React 19 + StyleX，12.6k★，npm `@astryxdesign/core`，Storybook + Sandbox） | 证据源：拆它的原语形态与 agent-ready 文档范式（定位语 "built for how we build now: by people and the agents working alongside them" 本身就是样本） | 只拆证据不装系统：StyleX 与本仓 Tailwind 栈不同，整包引入 = 换栈 |
| **A · 扩展池** | Park UI（Ark UI + Panda，跨框架 copy-paste）· Origin UI（shadcn 生态扩展）· Kibo UI（补 Gantt / Kanban / 代码编辑器 / AI 元素，素材称并入 Shadcnblocks 体系）· ReUI（大注册表 + 仪表盘）· Untitled UI React（开源基础层 + 付费扩展） | 按案单件取用 | 素材口径，引入前核许可；不整池收编 |
| **A · 动效香料** | Magic UI / Aceternity UI / Cult UI / React Bits | 营销面动效组件 | 素材口径，引入前核许可；数据密集面禁撒（§7） |
| **A · agent UI 方向** | assistant-ui / CopilotKit（agent 框架 + UI）· A2UI（声明式 JSON → 客户端渲染）· Appica UI / Fragments UI（AI-native 文档 / MCP） | agent 表面选型池 | 素材口径，引入前核许可；先过门：**是不是又一个聊天框**（09-04 审计裁定 Agent ≠ 聊天框） |
| **兜底** | MUI / AntD | 数据密集表格救急 | 与 Aurora Glass token 体系不兼容，**不引入现有仓** |
| **禁用** | 整库换肤 / 框架级 UI 重写 | — | 直接违反 §2 成本分级：最贵的路，零收益 |

## 4 · Agent-friendly 专项：真标准与装饰

真标准（按含金量排序）：

1. **registry 协议**——组件可被 CLI 拉取与注册（shadcn registry 是事实标准）；
2. **结构化文档**——props / 变体 / 边界机器可读，不是营销页；
3. **CLI / MCP**——agent 可编程消费，不靠人肉复制粘贴；
4. **迁移 skill**——官方给渐进迁移路径（shadcn 的 migrate-radix-to-base 是范本）。

文档页脚写一句 "LLM friendly" 不满足任何一条。

落点：**对 agent 而言，比换新库更能压同质化的是合同**——chuhai 的 `DESIGN.md` + `design-lint.sh` + 本 pack 的路由与验收约定就是这套。换库只是让 agent 重背一套默认值；合同才让 agent 在任何栈上都输出本项目形态。

## 5 · 图标层（2026-08-31 拍板，并入本文件）

> 产品图标系统 = **Iconoir**（`iconoir-react`）；Lucide 降级为「功能性兜底层」，不再承担产品视觉语言。
> 为什么不是 Lucide：它成了基础设施级默认脸（周下载 ~1 亿、shadcn / AI 生成代码默认内置）；Iconoir 是平面设计师画的「有设计人格但仍然中性」的库，DX 同级、MIT、零依赖、tree-shaking、离线可构建，撞脸概率低（~12 万 vs ~1 亿）。
> 未选：Untitled UI Icons / MingCute（同价位或命名负担）；备选池 Hugeicons / Solar / Teenyicons 留档待用。

| 结论 | 内容 |
|---|---|
| 产品语义图标 | 导航、对象、状态、按钮主图标 → **Iconoir**；自绘仅限 brand / logo / empty-state 插画 / 重要 AI feature |
| 功能兜底 | `x / chevron / search / plus` 纯功能图标与 shadcn 原语内部（Dialog/Sheet 的 close、Select 的 chevron）**保留 lucide，不强迁** |

采用协议（两仓统一）：① named import + `<Icon />`，props 透传，安装即用。② **Provider 锁线重**：根部 `IconoirProvider` 全局锁 `strokeWidth` + 默认尺寸——chuhai-cloud 锁 1.75（对齐 DESIGN.md 的 stroke band）、chrome 16px；Iconoir 线条偏轻，小尺寸比直觉加大 1–3px 并加粗一档。③ **离线纪律**：npm + lockfile + tree-shaking 进 bundle，运行时零第三方请求；禁 Iconify runtime API/CDN、禁成套 SVG 复制进 repo。④ **混用禁令**：Iconoir 与 lucide 不得在同一组件表达同一语义。⑤ 命名无 1:1 官方映射，按语义挑（`home` / `graph-up` / `send-diagram`…），字形表登记进仓内 DESIGN.md，新图标先查表再引。

## 6 · 各仓落地状态（随迁移更新）

| 仓库 | 状态 |
|---|---|
| chuhai-cloud | L2 完成（Aurora Glass）；L3 按 09-04 审计的六组件合同推进；L0/L1 不动；Iconoir 迁移中（lucide 存量 61 文件） |
| inquiry-foundry | 待盘点：L0–L3 现状 + 现用图标库与数量，盘点后再动手 |

## 7 · 反模式

- **以为换库 = 换脸**：L0 全换脸不变，L2 改一晚脸就变。
- **让 agent 裸奔生成组件**：注册表默认值直出 = 同质化加速器；生成前给 DESIGN.md 合同，生成后过 design-lint。
- **在数据密集页撒动效辣椒面**：动效组件是营销面香料，dense B2B 的个性来自密度与表格语法。
- **为小众而小众**：Iconoir 的价值是「有设计人格但仍然中性」，不是猎奇。
- 图标层老三样：绕过 Provider 散落写 strokeWidth、引 Iconify runtime 求方便、同语义混用两库。
