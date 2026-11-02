---
name: liquid-glass-island-wheels
description: >-
  2026-11 verified landscape of open-source wheels for liquid-glass material,
  dynamic-island chrome, silky chat composers and floating prompt bars,
  click-to-answer agent question cards, and iOS wheel pickers — per-vendor
  repo / license / stack / what-it-ships tables, a copy-vs-install ladder,
  and the shelf-radar proposal-workbench landing recommendation. Use when
  picking a glass engine or island / composer / option-picker / wheel-picker
  wheel, checking whether a new "liquid glass" library beats the vendored
  Beautiful UI baseline, or deciding between CSS scroll-snap and a real
  wheel-picker dependency.
---

# Liquid Glass / 灵动岛 / 丝滑 chrome 轮子验真（2026-11）

一行定位：玻璃液态引擎、灵动岛壳、composer 浮条、ask-user 点选卡、滚轴选择器五个方向的开源轮子验真表与抄/装阶梯。

机制层不在这里，别混读：

- 玻璃材质三档实现（CSS blur / SVG 折射 / WebGL）→ [`ui-patterns/scroll-shrink-glass-capsule-nav.md`](./ui-patterns/scroll-shrink-glass-capsule-nav.md)
- 液态机制与 FluidKit、liqui.design 复核 → [`design/glass-motion-landscape/verification.md`](./design/glass-motion-landscape/verification.md)
- 岛式 chrome 状态机 → [`ui-patterns/atomic-island-chrome.md`](./ui-patterns/atomic-island-chrome.md)
- 液滴融合 gooey → [`ui-patterns/liquid-gooey-micro-interactions.md`](./ui-patterns/liquid-gooey-micro-interactions.md)
- agent 状态原语六轮表 → [`agentic-ui-primitives.md`](./agentic-ui-primitives.md)

本资产只回答一个问题：**2025-26 新冒出来的这批轮子，有没有比包里已有基准更强的可抄对象。**

## 流程（何时跑、按序做什么、终点怎么判）

1. 先报表面：玻璃引擎 / 岛壳 / composer 浮条 / ask-user 点选卡 / 滚轴选择器，进 §2 对应表。
2. 过门：缺的是「机制」还是「组件形态」？机制已收进上面五份资产，只缺组件形态才继续看轮子。
3. 按判定列取用：**✅ 可抄源码**（LICENSE 实核）、**参照**（可读机制、不进生产依赖）、**只记链接**（许可不允许或无 LICENSE）。
4. 落地按 §3 阶梯与判定问题；终点 = 消费项目真实事件接上 + 降级面可用 + token 映射完成，`npm install` 成功不算。

## 1 · 五个表面别混层

| 表面 | 是什么 | 本包已有 | 新轮子填什么 |
|---|---|---|---|
| 玻璃机制 | 材质 + 折射 + 降级合同 | scroll-shrink 三档、glass-motion-landscape | 只当「B 档折射」的打包实现或参数面参照 |
| 岛壳 | chrome 展开/收起组件形态 | atomic-island-chrome（机制） | Cult UI 把状态机做成可组合原语 + 尺寸预设 |
| composer / 浮条 | 输入、发送、附件、模型选择 | Beautiful UI 21 件源码（vendored 基准） | prompt-kit / kibo / LocalMode 增量件 |
| ask-user 点选 | agent 出题、用户点选项而非打字 | （此前空白；只有 approval card 语义相邻） | LocalMode OptionList / Agentero form / kagent card |
| 滚轴选择 | iOS 式居中吸附滚轮 | （此前空白） | ncdai wheel-picker vs CSS scroll-snap |

## 2 · 验真结论表

核验方法（2026-11-03）：GitHub API 实查 repo 存在性、star、LICENSE SPDX、最近 push；npm view 实查包名、license、版本。多通道搜索：web_search + DeepSeek search + 二手聚合页；低星龄短不判假，只降格为参照。

### A · Liquid glass 引擎（B/C 档折射的打包实现）

| 名字 | 判定 | repo / npm | license | 真实卖点 | 边界与取用 |
|---|---|---|---|---|---|
| rdev/liquid-glass-react | ✅ 可抄 | [github.com/rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) · `liquid-glass-react` | MIT（6.6k★，2025-06 后少动） | 最厚参数面：displacementScale / blurAmount / saturation / aberrationIntensity / elasticity / cornerRadius | ⚠ 官方自述 Safari / Firefox 位移不可见；当参数面参照，不当跨端合同 |
| eamonliu/vitrio | ✅ 可抄（0★，npm 0.1.2） | [github.com/eamonliu/vitrio](https://github.com/eamonliu/vitrio) · `vitrio` | MIT | **最诚实的跨端合同**：Blink + Gecko 全量 feDisplacementMap 折射；WebKit 无 feImage 自动转 compositor 近似（边缘匹配放大 + 高光 + blur），同一 API；~13kB 零依赖，JS class + web component + React/Vue wrapper | 跨端分层的教科书写法；折射引擎首选参照 |
| Surdeddd/liquidglassjs | 参照 | [github.com/Surdeddd/liquidglassjs](https://github.com/Surdeddd/liquidglassjs) · `@surdeddd/liquidglass` | MIT（3★） | 五 backend 架构：css-svg（Chromium live DOM）/ svg-content（对拷层，Safari+Firefox）/ webgl-scene / webgl-overlay（metaball 合并）/ css-fallback；a11y 背板采样；`refraction 0.5 = Apple 实测` | 多 backend 分层思路值得读；3★ 观察池，不装 |
| Simonstorms/lore-glass | ✅ 可抄 | [github.com/Simonstorms/lore-glass](https://github.com/Simonstorms/lore-glass) · shadcn registry `@lore-glass` | MIT（10★） | feDisplacementMap 折射 live DOM（文字可选中、链接可点）+ gel press / 速度形变 / rubber-band 过拖；React 19 + TW4 | 「玻璃 + 物理手感」合体参照；registry 件拖 `@lore-glass/glass` 内核依赖 |
| Amir-Abushanab/liquid-glass-js | ✅ 可抄 | [github.com/Amir-Abushanab/liquid-glass-js](https://github.com/Amir-Abushanab/liquid-glass-js) · `@liquidglassjs/react` | MIT（5★） | 分工干净：折射引擎留 npm 依赖，shell（glass-card / glass-dialog）走 registry 写入归项目所有；glass-dialog 用 **Base UI** Dialog | Base UI 项目亲和的封装分工参照；位移图生成器注明是 Aave 实现的精确移植 |
| liquefy-ui/liquefy-ui | 参照 | [github.com/liquefy-ui/liquefy-ui](https://github.com/liquefy-ui/liquefy-ui) · `@liquefy-ui/react` | MIT（7★，2026-11 建仓即新） | WebGL 边缘折射 + jelly springs + Base UI primitives + shadcn registry + MCP | C 档 WebGL 路线的打包实现；观察池待遇 |
| aryankholqi/liquid-glass-cli | ✅ 可抄 | [github.com/aryankholqi/liquid-glass-cli](https://github.com/aryankholqi/liquid-glass-cli) · `liquid-glass-cli` | MIT（3★） | 写入式单件：squircle 超椭圆剪影 / 描边 / 位移图同采一张 superellipse，Snell 定律位移图 + `corner-shape`；Safari 走 mask 兜底 | 单件可抄机制；折射仍属增强非合同 |
| hakizimana-fred/reactnatively | 参照 | [github.com/hakizimana-fred/reactnatively](https://github.com/hakizimana-fred/reactnatively) · `reactnatively` | MIT（10★） | 整件 glass 系统：GlassNavbar / FloatingDock / DynamicIsland 在 glass-advanced 家族 | 观察池；全家桶型组件库按 §3 阶梯不进 L0 |
| remiangelo/reactGlass | 参照 | MIT（12★） | — | Fresnel / 色散 / 焦散的物理模拟自述 | 小仓参照 |
| huangj17/liquid-glass-react | 只记链接 | Canvas + feDisplacementMap | **无 LICENSE** | 中文 README，单组件 | 不可抄源码 |
| react-cupertino-ui | 只记链接 | 100+ iOS 风组件 | **Other** | — | 许可未核，不进 |
| glass.samasante.com | 已录书签 | — | — | 折射真实 DOM 的实验站 | 见 `inspiration-sources.md`，不重复收录 |

### B · Dynamic Island 壳

| 名字 | 判定 | license | 真实卖点 | 取用 |
|---|---|---|---|---|
| nolly-studio/cult-ui `dynamic-island` | ✅ 可抄 | MIT（仓 6.9k★；Cult Pro 2026 已全线转开源） | 可组合原语：Provider 管尺寸状态机与过渡队列、Container 管进出、14 个尺寸预设（compact → massive → minimalLeading/Trailing）、`scheduleAnimation` 队列；Motion 实现 | 岛壳「组件形态」首选参照；注意它依赖 `motion`，项目没装就等于新增整依赖 |
| nanxiaobei/react-live-island | 参照 | MIT（54★，停更 2024） | small/large 两态 + triggerType | 仅历史参照 |
| kangju2000/dynamic-island | 只记链接 | **无 LICENSE** + WIP | 多 mode 复合 API | 不可抄 |
| Nyxhora UI `dynamic-island` | 参照 | registry 件 | 通知栈语义（push / dismiss / priority / auto-collapse） | 语义是 toast 栈不是 chrome 展开，别拿错层 |
| 本包 atomic-island-chrome | 机制层 | — | 状态机 + 何时用/不用 | 机制照旧走它 |

### C · 丝滑 composer / 浮条

基准 = Beautiful UI `ChatComposer` / `PromptBar` 源码已 vendored（MIT，见 `design/beautiful-ui-ai-interfaces/`；shelf-radar 提案工作台已借壳）。下表只记「比基准多什么」：

| 名字 | 判定 | license | 比基准多什么 | 取用 |
|---|---|---|---|---|
| ibelick/prompt-kit | ✅ 可抄 | MIT（3.1k★） | shadcn registry；PromptInput + Message / ResponseStream / Loader / Markdown / ScrollButton 整族 | AI chat 件的增量源，按件抄 |
| shadcnblocks/kibo（kibo-ui） | ✅ 可抄 | MIT（4.0k★） | ai-input 之外还有 kanban / gantt / dropzone / combobox 等富件，带真逻辑非纯皮肤 | 工作台缺富件时的首选 registry |
| nolly-studio/cult-ui `prompt-composer` | ✅ 可抄 | MIT | ambient blob 背板（isLoading 时加 frosted）+ autogrow + reduced-motion 感知 + ⌘Enter 合同 | 氛围感参照；依赖 `motion`，为一件装整库不划算 |
| LocalMode UI | ✅ 已在六轮表 | MIT | Conversation 家族 composer / prompt 件 presentational、零运行时依赖 | registry 单件取，TW4 亲和 |
| gravity-ui/aikit | 参照 | MIT（171★） | SDK-agnostic atomic 聊天库、CSS variables theming | 换整套聊天库时才看 |
| agents-ui/agents-kit | 只记链接 | **非商用**（README 声明 + GitHub NOASSERTION） | 在 prompt-kit 上加 Agent 件 | 许可红线，不抄源码 |
| qodesign Prompt Bloom | 只记做法 | 个人 / 客户项目许可 + 付费 key | 机制值得学：prompt 升成消息泡、composer 缩成带流光描边的 thinking pill、答案卡从 pill 里 bloom 出来、来源与追问 chips 落位 | 抄形态不抄源码 |
| Mizzle / Wingo UI | 只记做法 | 付费为主 | Mizzle 有 questionnaire / dynamic island；Wingo SuggestionChips 的键盘合同细 | 许可不允许收录 |

### D · ask-user 点选卡（能点就不让用户打字）

| 名字 | 判定 | license | 真实卖点 | 取用 |
|---|---|---|---|---|
| LocalMode `OptionList` | ✅ 可抄 | MIT（vendor 已在六轮表验真） | 聊天内 5–7 项分页多选 list，presentational，配 `useAgent` inquiry 语义 | registry 单件取首选；HITL 消歧语义最正 |
| poco-ai/Agentero `ask-user-question-form.tsx` | ✅ 可抄 | MIT（1.1k★） | **最完整合同参照**：多题分页（一题一页 + prev/next + 末页 Submit）、单/多选 chips、自由输入 Other、全键盘（↑↓ 移焦点 / Space 选 / Enter 确认并翻页 / ←→ 翻题）、建在 AI Elements Suggestion chips 上 | 抄合同结构（分页 + 键盘 + Other），不抄它的 ACP 适配层 |
| kagent-dev/kagent `AskUserDisplay.tsx` | ✅ 可抄 | Apache-2.0（4.1k★） | ask_user tool → 交互卡：chip 切换 + 每题 free text + resolved 态选项锁定高亮 + 绿勾留痕 | resolved 留痕（结果可回溯）参照 |
| lumea-labs/polpo-ui `ChatAskUser` | 参照 | Apache-2.0（0★） | 问答 wizard 件 | 小仓参照 |
| Vercel AI Elements `suggestion` | 已在六轮表 | Apache-2.0 | chip 原语（Agentero 正是建在它上） | 原语层 |
| Wingo `SuggestionChips` | 只记做法 | Pro 付费 | 细合同：移动端正行滑动吸附 + 44px 目标、+N 折叠展开、streaming 中 disabled 保焦点、整组一个 Tab 停 + 方向键 | 抄合同不抄源码 |

### E · 滚轴选择器

| 名字 | 判定 | license | 真实卖点 | 取用 |
|---|---|---|---|---|
| ncdai/react-wheel-picker | ✅ 可抄 / 可装 | MIT（783★，18.2k dl/周，Vercel OSS 背书）· `@ncdai/react-wheel-picker` 1.2.3 | 真惯性滚动 + 无限循环 + 键盘导航 + type-ahead 搜索 + unstyled core（shadcn wrapper 可弃）；零依赖 37kB | 值选择语义（时 / 日 / 量）的最强轮子；记录列表语义见 §4 结论 |
| adcentury/react-mobile-picker | 参照 | MIT · `react-mobile-picker` 1.2.0 | 老牌 iOS 滚轮 | ncdai 的替代项 |
| CSS `scroll-snap-type: y mandatory` | ✅ 现行 | — | 零依赖；shelf-radar `ProposalEntryPicker` 已在用 | 过滤记录列表语义下够用，见 §4 |

## 3 · 抄 / 装 / 参照阶梯

沿用 `agentic-ui-primitives.md` §4 的 L 级与四条判定问题（状态真会产出吗 / 边界行为自己写要几天 / 数据形状接得住吗 / 一年后还活着吗），补两条本赛道特有：

- **L0 抄源码（默认）**：MIT / Apache 且单件自足的先抄进项目改成自有——本赛道大多数轮子是单组件或 registry 写入件，源码即交付物。
- **L1 registry 单件**：ncdai、LocalMode、Cult UI 这类 unstyled / registry 件；装前看 `registryDependencies` 会拖进什么（lore-glass 拖引擎包、cult-ui 拖 motion）。
- **L2 装 npm 依赖**：只有引擎型才值得（如真上折射引擎时选 vitrio 这种零依赖件）；组件形态不该靠依赖装。
- **L3 上框架**：reactnatively / aikit / liquefy-ui 这种全家桶 = 接受它的组件体系与主题合同，默认不走。

**动画库税**：cult-ui / lore-glass / Mizzle 多数件吃 `motion`（framer-motion 后继）。项目没装它时，为一个 chrome 件引入整库不划算——要么把 spring 换成 CSS transition / 自写阻尼，要么换轮子。shelf-radar 现状即无 motion。

## 4 · shelf-radar 提案工作台落点（b882742 之后的结论）

工作台账：React 19 + Tailwind 4 + **Base UI** + iconoir，Vite，无 motion 依赖；`frontend/src/pages/` 下 `ProposalConversation.tsx`（玻璃岛 composer，vendored Beautiful UI）与 `ProposalEntryPicker.tsx`（scroll-snap 滚轴全列表，b882742 新上）。

| 表面 | 结论 |
|---|---|
| **composer** | **vendored Beautiful UI 继续当基准，本轮没有比它更贴的轮子**。新轮子里没有「 composer 丝滑度 + 零新依赖 + 已 token 映射」三者兼得者；出现真实缺口（如 suggestion chips、附件槽）时按件从 prompt-kit / kibo / LocalMode 抄，不装库。 |
| **玻璃岛壳** | 现行 CSS 玻璃岛 + atomic-island 状态机已覆盖机制；Cult UI `dynamic-island` 是唯一值得留意的「岛即组件」轮子，但它吃 `motion`——要「14 尺寸预设 + 过渡队列」才值得引入整依赖，当前 collapsed/expanded 两态不值。 |
| **report picker（滚轴）** | **语义判型**：现行 scroll-snap 是「过滤记录列表」（带 search、disabled 沉底、tone 状态、双 tab），ncdai wheel-picker 是「值选择器」（时 / 日 / 量、无限循环）——**留着自写是对的**。若嫌惯性手感硬，两条路：装 `@ncdai/react-wheel-picker`（MIT、零依赖、unstyled，37kB）换成它的内核，或更轻——读它源码把惯性曲线移植进现 scroll 容器。不要为「看起来更像 iOS」换语义。 |
| **ask-user 点选** | 「能点就不让用户打字」已有 actions prop 起步。升级成正式问答卡时：抄 **Agentero** 的合同（分页多题 + 全键盘 + Other 自由输入），registry 路线取 **LocalMode OptionList**（presentational、TW4、分页 5–7 项）。resolved 留痕学 kagent：答完的卡锁定高亮留时间线，不是弹完就消失。 |

## 边界（硬闸）

- **折射是增强不是合同**：任何折射实现（Chromium-only 或 WebKit 近似）都不得做可读性前提；承接 scroll-shrink 资产的四路降级与「最坏背景对比度」硬闸。
- **玻璃只上功能层 chrome**：导航 / 控件 / overlay；不进内容层，不叠 glass-on-glass（Apple HIG 口径，已录 scroll-shrink 资产）。
- **低星新仓 = 观察池**：<50★ 或建仓 <半年的（vitrio 0★、surdeddd 3★、liquefy 7★ 等）机制可抄、依赖不装。
- **许可红线不越**：无 LICENSE（kangju2000、huangj17）、非商用（agents-kit）、Pro / personal / paid-key（Mizzle、Wingo、qodesign、BoardUI Pro 件）→ 只记链接与做法，不抄源码。
- **不为一个 chrome 件引入新动画库 / 组件框架**：motion、Radix、Next 字体这类拖带依赖先算税再装。
- **registry 写入 ≠ 零成本**：写进来的源码归项目维护并改接真实事件；`registryDependencies` 拖进来的东西要先点名。
