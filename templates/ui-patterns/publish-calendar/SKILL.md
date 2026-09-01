---
name: publish-calendar
category: design
description: >-
  [design] Build or restyle a product-grade publishing/scheduling month
  calendar (发布页日历 / 排期月历): first-class month-year control (not
  chevron-only), weekday header, day-cell density with status dots and
  absolute-count overflow, distinct today vs selected states, a host visual
  profile slot, and a keyboard contract that coexists with AppShell hotkeys.
  Use when the task is a month-view calendar as the main work surface of a
  publish/planner feature — not a date-picker popover. Evidence from W3C APG,
  React Aria, react-day-picker, Zag, 飞书 spec, Buffer/Metricool chrome in
  reference.md.
---

# Publish calendar

家在 `templates/ui-patterns/publish-calendar/`。出处账本（证据分级 · 偷什么 · 不偷什么 · license）在 [`reference.md`](./reference.md)。

核心判断一句话：**这个 skill 不是「画一个好看的月历」，而是保证月份跳转、日期导航、状态压缩、焦点交接与宿主热键之间互不语义冲突。** 观感分歧归 Profile 层，语义冲突才是硬伤。

定位一句话：Metricool/Buffer 的「按天看计划」核，不是 Later 的视觉格子墙——月历是工作台，格子是索引，明细在工作面。

## 分层约定

规则带层级标签；冲突时 MUST > POLICY > PROFILE：

- **[MUST]** 不变量：违反即不合格，任何项目不得豁免。
- **[SHOULD]** 强默认：本 pack 的推荐策略，给出不破同一不变量的替代方案后可换。
- **[POLICY]** 产品决策：本 pack 给默认值，换产品可整体替换（条目注明常见替代）。
- **[PROFILE]** 视觉/实现档：随消费项目 DESIGN.md 替换，数值默认为示例。
- **[WHY]** 论证不进本文件，一律回 reference.md。

## When / when not

**When：** 内容发布产品的月历主视图（哪些已排期、已发、空着）；B2B 后台任何以「天」为工作单元的 schedule 视图（考勤日、账期日、内容排期）；现有日历被抱怨「年月切换难点」「像 shadcn 默认样」「不知道今天在哪」。

**When not：** 表单日期弹出层（date picker 另走表单工艺）；周/日/时间轴格墙与拖拽重排（先做月核）；营销装饰日历（Genre-B）。

## 复杂度档位

本 skill 全文只覆盖 Tier A；扩容时先读 [`reference.md`](./reference.md)「月历工作台主体样本」节换参考对象：

- **Tier A 月核（= 本 pack）**：固定高度月网格、presence 状态通道、picked-day 面板、键盘与壳热键共存。消费项目从零到一从这里起步。
- **Tier B 工作台扩展**：每格事件容量、overflow 计数与展开浮层、事件排序（`nEventsPerDay` 类问题）→ 参考对象切 TOAST UI Calendar / Schedule-X / vkurko calendar，外加 Postiz（成品实证：每格容量 3＋计数行就地展开＋拖拽状态守卫模态，账本见 reference.md）；Tier A 的 MUST 全部继续生效。
- **Tier C 执行层视图**：周/日时间轴、拖拽排程、resource view → 超出本 pack，以 FullCalendar 的 core/day-grid/interaction 分层架构为实现参照重新立合同。

## 合同

从左上角开始：

1. **月年标（最高杠杆）**
   - [MUST] 任一月/年**两击内直达**且 picker 面板一屏容纳全部选项：点击大号 label 展开**宫格**——月 = 12 格（4×3）、年在圈定范围 ≤15 个候选时同屏宫格（移动端可用滚轮）；逐项滚动的长列表形态不得作为终态，原生 `<select>` 只算工程过渡，验收不放行。
   - [PROFILE] 大 label 视觉对齐 pill-control 档；Zag 式先月宫格后年宫格是目标形态。反例锚点：`text-sm` 小字夹两个 ghost icon。
   - [POLICY] 可跳转年份范围由产品圈定（rdp `startMonth/endMonth` 语义）；双箭头 ±年为可选第三档。
   - [WHY] 飞书导航四件套 + Setproduct 立论；select 否决依据见 reference.md 消费者裁决记录（2026-08-27）。
2. **今天复位**
   - [MUST] 「回到今天」常驻 header、一步可达、位置稳定——不因翻月消失或跳动。
   - [SHOULD] 当月 `disabled` 占位防抖是默认策略，允许其他不破版式的不跳方案。
   - [WHY] Metricool "This week" + Notion 回位动作。
3. **星期头**
   - [MUST] 不可交互、不参与焦点，弱化档样式。
   - [POLICY] zh-CN 默认周一为首列；首日偏好属账号设置，不在页面自造。
4. **网格结构与高度**
   - [MUST] DOM/ARIA 固定四层：`grid > row(每周一行) > gridcell > button`——gridcell 是容器、button 承担交互；禁止把 `role="gridcell"` 挂到 button 本身或把 cell 扁铺在 grid 直下。
   - [MUST] 换月纵向高度恒定、不整版 reflow。实现二选一作全站常量：固定六行常驻（邻月照渲染），或实际周数 5/6 行 + 网格 `min-height` 吸收。
   - [MUST] 邻居月格降灰但肉眼可辨、可交互，激活跳对应月份而非死块。适用边界：单月、无 range 的工作台才允许邻居格可点；通用库场景的三坑（多实例选中、hover=focus 抢翻月、降灰对比度）见 reference #3257。
   - [PROFILE] 数字 `tabular-nums` 13–14px 左上角、muted-fill ~8% alpha 均为示例值。
5. **状态通道与溢出（数据压缩算法）**
   - [MUST] 圆点是**类别存在性**信号：每个状态类别至多一枚语义色点，全格 ≤2 色（如 已排期=warning、已发=success）；点永不编码数量。
   - [MUST] 数量走**绝对计数**：accessible name 含分类细目（「已排期 5 条、已发 3 条」），可视文本显示绝对总数。`+N` 偏移形式只允许出现在打开溢出详情的点击目标上；本月核无格内浮层，默认不用——明细去 picked-day 面板。（Postiz 实证「点计数行就地格内展开」同样满足这条——它禁的是无目标偏移展示与来路不明的浮层，不是禁展开面本身；Tier B 抬走该限制的方式记在 reference.md Postiz 节。）
   - [MUST] 第三种语义色不许出现；格子内不塞卡片列表。
6. **日期激活语义**
   - [MUST] 「选定日」（更新 picked-day、面板联动）与「新建排期」是两层语义；激活（点击 / Enter / Space）永远至少完成「选定」，不得对任意未来日一律弹创建流程。
   - [POLICY] 空白未来日激活后是否直达 composer 由产品定（本 pack 默认直达，Metricool 点槽预填心智）；有内容日激活只切换明细面板。
   - [POLICY] **过去日禁新建是发布产品政策，不是日历通用机制**；允许补录/回填的产品整体替换此条并同步文案。
7. **Picked-day 明细面板**
   - [MUST] 月历正下方呈现选中日完整列表 + 空态三件套（icon well + 人话 + CTA）+ 过去日政策说明；换月不清空筛选与选中。
   - [PROFILE] 卡片/密度样式沿用 data-dense 手册 §1.5 与 §3.2。
8. **aria 合同**
   - [MUST] 换月 header `aria-live="polite"` 播报；今天格 `aria-current="date"`；选中格 `aria-selected="true"` 且全网格恰此一格。
   - [MUST] gridcell accessible name 配方 = 全日期＋今天/选中态＋事件细目（「2026年8月14日 星期五，今天，已排期 3 条、已发 1 条」），裸数字不合格。

## 键盘

按键合同（对齐 shell spatial grammar：arrows / Enter / Esc，无 Ctrl/⌘K；权威源 = W3C APG Date Picker Dialog 例）：

| 键 | 行为 |
|---|---|
| Tab | 进入/离开网格（roving tabindex，全网格恰一格 `tabindex=0`；**不困住**焦点） |
| ← → | ±1 天；边缘直落邻月格（焦点语义见下） |
| ↑ ↓ | ±7 天（上下同列） |
| Home / End | 本周首/末日 |
| PageUp / PageDown | ±1 月保持同号日；当月缺该日则落当月最后一日 |
| Shift + PageUp/Down | ±1 年，落点规则同上 |
| Enter / Space | 激活当日（分层见合同 §6：至少切明细；是否进 composer 属 POLICY） |
| Esc | 只关浮层（详情 Sheet、picker 下拉），语义交给 shell |

**邻居月焦点语义 [MUST]：** 六行常驻网格中邻月格属于当前 DOM grid——←→ 到边缘直接把焦点落到已存在的邻月格上，**焦点进入邻月格的那一刻同步翻月指针与 picked-day**。不存在「先换月 remount 再找焦点」的第二种实现（Base UI #4462 的 remount 焦点坑因此天然规避）。若某实现选择 activation 才翻月，那是另一条被测合同，不得与本合同混写。

**壳热键共存 [MUST]：**

- 宿主壳若在 window capture 阶段监听方向键，DOM 层 onKeyDown 拦不住；唯一安全让路是在壳既有目标守卫里豁免 `[role="grid"]`，且 ↑/↓ 与 ←/→ 两分支都要豁免；禁止日历自注册第二个 window capture 抢键。
- **割让必须成对交付**：壳守卫豁免 `[role="grid"]` 的同一次改动里，网格自身的方向键/Home/End/PageUp/Enter 导航必须一并落地——只做前者等于给键盘用户一组死键。
- Home/End/PageUp/PageDown 无壳冲突，网格 onKeyDown 直接处理。
- `?`、`/`、`g+h/c/i` 等壳热键继续可达；IME 组字不抢字符键；Enter 走原生 button 点击语义即可。

**边缘跨月两机制等价：** 固定六行走法即 DOM 直落；动态行数走法下邻月格同样常在 DOM、可立即聚焦，但翻月重排会重建其所属 row 节点——须把目标日挂共享 state、渲染提交后 `focus()` 回新节点（Base UI #4462 的教训转正用）。验收锁行为（焦点落格＋即时同步月份与明细），不锁机制。

## Host profile — Aurora / chuhai 示例

除右列红线（≡ MUST）外整表可替换成消费项目的 DESIGN.md：

| 部位 | chuhai 示例 | 红线 |
|---|---|---|
| 月历容器 | `content-card`：`rounded-xl border bg-card p-0`（奶油纸 #F6F1E8 系） | shadcn 冷灰白 `oklch(1 0 0)`、纯 `#FFF` 上做品牌卡 |
| 月年标 | `pill-control` 档 h-9，活跃态 `bg-primary/10` wash | 玻璃 blur；第二强调色 |
| 网格线 | 1px hairline `border`（暖棕 ~14% alpha），cell 内 border-r/b 收边 | 粗分隔、斑马纹 |
| 邻居月格 | `muted-fill`（暖棕 8%）+ ink-soft 字 | 对比降到肉眼不可辨 |
| 今天 vs 选中 | 今天：号码 `text-primary` 加粗 + ring；选中：`bg-primary/10` wash——两个独立通道 | 共用一套视觉 |
| 状态点 | `bg-warning` / `bg-success` | 第三种颜色、彩虹格子 |
| 字体 | IBM Plex Sans + Noto Sans SC，权重 ≤600，tabular-nums | Inter 默认体、editorial serif 进后台 |
| 动效 | 换月 fade/transform 150–200ms | bounce、宽度动画、300ms+ overlay |
| 材质 | 日历卡 L1 content-card（零 backdrop-filter），永不升玻璃层 | 给日历卡加 glass |

## 验收（desktop + narrow）

尺寸数字按所选 profile 校准；行为逐条 [MUST]。桌面 ≥1280 与窄屏 ~375 各跑一遍：

- [ ] 年月标两击内到达任意目标月年；chevron 只微调。
- [ ] 今天 vs 选中双通道肉眼可辨；DOM 里 grid>row>gridcell>button 四层齐全；`aria-selected` 恰一格、`aria-current` 在今天格。
- [ ] 换月纵向高度恒定；←→ 边缘直落邻月格并即时同步月份与明细。
- [ ] 方向键壳守卫生效（网格内按 ←/→ 移动日格、连按 ↓ 不切侧栏页），且组件自身导航可用——割让成对验收。
- [ ] roving tabindex 不变量：任意键盘导航后全网格恰一格 `tabindex=0`；连按 → 跨月三次焦点不丢。
- [ ] Enter 至少切换明细面板；空白未来日直达 composer 仅在产品政策启用时生效；过去日文案符合所选政策。
- [ ] 点=presence、分类细目在 accessible name 中完整、无第三色。
- [ ] 材质红线：无 blur、无冷灰块、hairline、无第三强调色。
- [ ] 窄屏：日格 ≥40px 触达；header 换行不破版；Tab 能进出网格。
- [ ] 截图存项目 `docs/screenshots/`（data-dense-b2b-app 截图矩阵约定）。

## 关联资产

- **[`../data-dense-app-craft.md`](../data-dense-app-craft.md)**：表格/密度/状态点/focus ring 通条目适用本面板。
- **[`../../high-leverage-craft-checklist.md`](../../high-leverage-craft-checklist.md)**：等待/撤销/微反馈等 UX 机制。
- **[`./reference.md`](./reference.md)**：全部轮子 URL · 证据分级 · 偷什么 · 不偷什么 · license。
