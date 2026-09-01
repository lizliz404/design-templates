# Publish calendar — 调研证据（wheels: URL · 证据分级 · 偷的机制 · 不偷什么 · license）

2026-08-27 调研；v2 分级标注同日补；v3 增补月历工作台主体样本（TOAST/FullCalendar/Schedule-X/vkurko）与消费者裁决记录。

记录的是**机制**不是截图。闭源产品只引机制。**引用政策**：以下各库的接口契约、默认值常量、changelog 条目为 MIT 类许可下的短小事实材料，允许原文摘录入本账本并附来源 URL；整文件级 code-reading ledger（逐文件函数摘段 + commit SHA）尚未执行，本文件不假装它存在——需要下钻时先做那份再回来升级条目。

**证据分级：** `primary` = 官方规范 / 源码 / issue 原文 / 本次实测抓取的官方文档原文 · `secondary` = 官方文档教程、二手转述或 changelog 清单 · `anecdotal` = 第三方观察，仅作共识佐证不作规范依据。

## 月历工作台主体样本（Tier B/C 扩容时的参考对象）

event-calendar 系与 date-picker 系是两类轮子：**前者回答「月历工作台长什么样」，后者只回答「日期选择交互怎么做对」。** 本 pack 的月核（Tier A）主要消费后者 + TOAST 的月模型；向 Tier B（事件容量/溢出面板）、Tier C（拖拽/时间轴）扩容时，主体样本换这一节。

### TOAST UI Calendar — [nhn/tui.calendar](https://github.com/nhn/tui.calendar)（MIT）

唯一把「固定六周 vs 动态周数」「每日事件容量」产品化成 API 的主流开源日历。以下为官方文档原文摘录（[options.md](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md)，2026-08-27 抓取核验）：

```ts
interface MonthOptions {
  dayNames?: [string, string, string, string, string, string, string];
  startDayOfWeek?: number;
  narrowWeekend?: boolean;
  visibleWeeksCount?: number;
  isAlways6Weeks?: boolean;
  workweek?: boolean;
  visibleEventCount?: number;
}

const DEFAULT_MONTH_OPTIONS = {
  dayNames: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  visibleWeeksCount: 0,
  workweek: false,
  narrowWeekend: false,
  startDayOfWeek: 0,
  isAlways6Weeks: true,     // 默认永远渲染六周；false = 按月 4–6 周
  visibleEventCount: 6,     // 每格最多展示的事件数；格子高度不足时自动忽略该值
};
```

- 上游先例：本 skill「高度恒定两走法」正对应 `month.isAlways6Weeks`（默认 true=固定六行），命名可以直接用它，不用自造玄学机制名。
- 成熟溢出模型是链条而非孤招：**cell capacity（`visibleEventCount`，含空间不足自动降级）→ overflow count → expansion surface（`moreView` 浮层，主题可配 backgroundColor/border/shadow/width/height）**。本 pack 把 expansion surface 换成 picked-day panel，其余链节一一对应。

### FullCalendar — [fullcalendar/fullcalendar](https://github.com/fullcalendar/fullcalendar)（core 与标准插件 MIT；premium 插件商业授权）

月视图工作台事实标准之一（~20k stars 量级，2026-08 口径）。机制上最有价值的是**架构分层**：calendar core ≠ day-grid 渲染 ≠ interaction（拖拽/选中），安装即插件式（`@fullcalendar/core` + `dayGridPlugin` + `interactionPlugin`）。对本 pack 的启示不是 vendor 它，而是**职责别搅成一个 calendar.tsx**：

```text
calendar model      # 可视区间、导航、day metadata、task projection
month grid          # 周、day cell、outside days、overflow projection
interaction         # focus 导航、activate、create、壳热键共存
```

Tier C（拖拽排程、时间轴、resource view）需要参考对象时换成它。

### Schedule-X — [schedule-x/schedule-x](https://github.com/schedule-x/schedule-x)（MIT）

比 FullCalendar 年轻的现代 TS 实现，仍高频开发。据其 CHANGELOG（二手转述，issue 号未逐条复核），近年迭代即一张「现代 month grid 坑位表」：leading/trailing dates（#434）、nEventsPerDay（#368）、plus-events 按钮回调（#367）、is-selected class（#553）、键盘激活事件（#636）、键盘打开后聚焦 modal（#652）、排序改进（#918）、RTL month grid（#1008）。Tier B 时值得直接读实现。

### EventCalendar — [vkurko/calendar](https://github.com/vkurko/calendar)（MIT）

小而可读的 FullCalendar-like（zero dependency、CSS Grid、DayGrid plugin、~35kb br）。适合当**最小可读源码教材**——想读懂实现而不面对 FullCalendar 巨仓库时先看它。其可视区间数据模型口径（FullCalendar `datesSet`/current 同型）值得直接采纳为本 pack 的区间类型：

```ts
// 派生形状（pseudocode 非逐字摘录）：FullCalendar current/active 口径
type MonthRange = {
  currentStart: Date;   // 语义区间起点 = 当月 1 日
  currentEnd: Date;     // exclusive = 次月 1 日
  activeStart: Date;    // 渲染区间起点 = 网格首格（含邻月补位）
  activeEnd: Date;      // exclusive = 网格末格 + 1
};
```

### Postiz — [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app)（MIT）

2026-08-27 补录：开源社交排程产品的发布日历，Tier B 档被生产环境跑通的一份成品样本。证据为本次 code-reading——逐行阅读 benchmark 快照 `D:\dev\chuhai-cloud-benchmarks\postiz\apps\frontend\src\components\launches\calendar.tsx` 与 `calendar.context.tsx`（非文档转述）。偷证的机制：

- **每格容量 3＋绝对计数开关**：`postList.slice(0, 3)` 封顶每格事件卡；超出时格子底部出现唯一可点计数行 `+ Show more (N)`（N = 绝对余量），展开后同位置变 `- Show less`。
- **展开面＝格内就地展开，不是浮层**：点计数行后剩余条目直接渲染进同一列、撑高所在行、由容器整体滚动吸收。这实测厘清了 SKILL 合同 §5 的字面禁令只针对两件事——`+N` 偏移出现在非点击目标上、月核引入来路不明的浮层；「点击目标＋就地展开」不踩线。**Tier B 抬走「本月核无格内浮层」限制的方式即此**：把 picked-day 面板换成或叠加这类就地展开面，代价是把恒高合同改成固定行高、增量交给容器滚动。
- **拖拽改期带状态守卫**：react-dnd 投放；过去小时格整体灰化（grayscale ＋ cursor-not-allowed）拒收；对 PUBLISHED / 已过期 QUEUE 帖落格先弹三选一模态（仅更新详情 / 重排 / 取消）再提交，乐观 `changeDate` 先改本地日期随后 PUT。
- **chip 解剖学与状态语义**：事件卡 24px 标签色顶栏承载 hover 才浮现的操作图标（复制/预览/统计/删除）＋栏身集成头像叠 12px 平台角标＋单行 clamp 文案；ERROR 态整卡红色 ring 2px、左上 `!` 圆徽 tooltip 挂错误原文；每格独立 loading shimmer、drop 目标主色描边。

**刻意不采纳**：① 格内渲染完整事件卡属 Tier B 关注面，本 pack 月核保持 presence 点通道不动；② 其月视图写死 42 格（`for i < 42` 恒六周）与本 pack「固定六行或动态 5/6 行＋min-height」恒高规则冲突——Postiz 是证据不是覆盖；③ week/day/list 四视图切换（cookie＋URL `display` 持久化）与 SWR 区间计算属 Tier C 架构参考，届时扩容再回看。

## 交互基础设施样本（date-picker 系；只偷 focus/a11y/date-state，不当 event calendar 主样本）

| 来源 | 级别 | 偷的机制 | 不偷 / 风险 | License |
|---|---|---|---|---|
| [W3C APG · Date Picker Dialog 例](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) | primary | 日历网格键盘合同的**权威出处**：roving tabindex 全网格恰一格；←→±1 天、↑↓±1 周、Home/End 本周首末、PageUp/Down 翻月保持同号日（缺位落当月最后一日）、Shift+PageUp/Down 翻年；Esc 关层还焦触发器；选中格 `aria-selected` 且仅此一格 | dialog 场景细节（date picker ≠ page calendar）；示例基于 `<table>` 的暗示 | W3C 文档许可 |
| [React Aria Calendar](https://react-aria.adobe.com/Calendar)（含 useCalendar） | primary | `focusedValue` 控焦点=控可见月；unavailable 日期仍可聚焦但不可选；RTL 自动翻转；移动端触屏 reader 的隐藏「下一月」按钮。状态机方法面可直接偷：`focusNextDay/focusPreviousDay/focusNextRow/focusPreviousRow/focusNextPage/focusPreviousPage/selectFocusedDate/setFocusedDate`（[@react-aria/calendar](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar) 与 @react-stately/calendar，Apache-2.0 源码随包发布） | 13 套历法全家桶过度工程；不引入整库只为一个月视图 | Apache-2.0 |
| [react-day-picker](https://daypicker.dev/docs/caption-and-nav-layouts)（2026-05 起 **v10**，新包名 [@daypicker/react](https://www.npmjs.com/package/@daypicker/react)；旧 `react-day-picker` 兼容保留） | primary | `captionLayout="dropdown"` + `startMonth/endMonth` 圈定范围；`navLayout="after"/"around"` 修 dropdown 时 Tab 序与视觉序不一致的老 bug（v9.7）；v9.8 Shift+Arrows 翻月/年、更好的键盘导航；v9.6.3 visually hidden 播报月年变更；v10 修 multi-month 下拉；`weeksInMonth` 动态行数 | 默认 caption 样式就是「generic shadcn gray」观感本身——偷 prop 合同，样式重做进自家 token | MIT |
| [Zag.js date-picker](https://zagjs.com/components/date-picker)（Chakra 团队持续维护） | secondary（changelog 转述未逐条复核） | 三态状态模型比单值精确：**`visibleRange ≠ selectedDate ≠ focusedDate`**；`onVisibleRangeChange` 触发条件覆盖 next/prev、选月、选年、focus 落在当前可视区外——即「焦点出界 → 可视区间跟随焦点」；持续修 focus return after selecting/clearing、outside-dismissal 还焦 | state machine 移植成本高；两层以上 view 阶梯多余 | MIT |
| [React Spectrum issue #3257](https://github.com/adobe/react-spectrum/issues/3257) | primary | 反方立场完整陈述：邻居月格可交互在多月/range 场景有三坑——同日多实例选中归属不明、hover=focus 抢翻月、降灰可点格对比度不达标；官方最终拒绝支持 | 其对单月无 range 场景的一刀切保守默认——本 pack 是页面级工作台不是通用库，可点邻居格是刻意取舍且写明代价 | Apache-2.0 |
| [Base UI calendar PR #4462](https://github.com/mui/base-ui/pull/4462)（2026-05-04 closed 未并，机制教训仍成立） | primary | 「翻月后焦点回落在哪」是真实的工程暗坑：pending focus target 必须跨 remount 交接。SKILL 选 DOM 直落型邻居格后此坑天然规避 | Viewport 动画容器复杂度不需要 | MIT |

## 闭源产品 chrome（机制引用）

| 来源 | 级别 | 偷的机制 | 不偷 |
|---|---|---|---|
| [飞书开放平台 · 日期选择器设计规范](https://open.feishu.cn/document/design-specification/component---data-entry/date-picker?lang=zh-CN) | primary | 导航区四件套语义：月份选择器、年份选择器、单箭头±月、双箭头±年；hover 高亮提示 label 可点；跨年箭头有明确文案 | 截图与双面板 range UI 细节 |
| [Buffer 新版 calendar 发布文](https://buffer.com/resources/new-social-media-calendar/) | secondary | monthly=规划俯视 / weekly=执行明细的双层心智；channel 过滤下拉；Create Post CTA 存在（常驻性与具体位置未逐帧核验）。留作**产品意图**证据；实现机制证据以本页工作台样本为准 | drag-drop timeslot（非承诺项） |
| [Metricool 规划指南](https://metricool.com/planning-social-media-content-with-metricool/) ＋ [mega 教程](https://metricool.com/metricool-mega-tutorial/) | secondary | 点日历进 composer 预设时间的心智（预填程度未逐帧核验）；"This week" 复位钮；Calendar zoom 三档密度 ← 密度档 token 化参照（见教程页） | best-times heatmap；跨品牌 Studio 视图 |
| [Notion 日历帮助](https://www.notion.com/help/calendars) | secondary | 记住上次浏览的月区间，重进不重置 | 无限滚动翻月的页内模式 |
| [Setproduct · Date picker anatomy](https://www.setproduct.com/blog/date-picker-ui-design) | secondary（立论句为转述非原文引用） | 核心主张大意：month/year 应直接可点、强迫连点 chevron 过一年是最常见的 sin——月年标规格立论；today≠selected 双通道警告；Home/End/PageUp 键位表思路 | paid kit；40px 类数值属其 kit 档仅作示例 |
| [uxpatterns.dev · Date picker](https://uxpatterns.dev/patterns/forms/date-picker) | secondary | ARIA 对照表；header `aria-live` 换月播报；事件埋点清单 | 表单输入框联动部分 |
| [uxpatterns.dev · Calendar view](https://uxpatterns.dev/patterns/calendar-view) | secondary | gridcell accessible name 配方：全日期＋当前月态＋今天/选中态＋事件计数；Esc 关浮层还焦来源格；换月不清空筛选与选中 | 周视图 / resource / 时区治理 |
| 钉钉系日历组件生态（[例](https://ext.dcloud.net.cn/plugin?id=13413)，第三方仿制插件） | anecdotal | 中国后台产品常见模式观察：年月 picker 一键直达与箭头并存、今天一等动作——仅佐证 zh 产品共识，非钉钉官方规范 | DCloud 插件代码不入 pack |

## 与 SKILL.md 的映射速查

- 高度恒定两走法 ← TOAST `month.isAlways6Weeks`（上游先例，默认 true=固定六行）＋ rdp `weeksInMonth` 动态行数；chuhai 实装走动态行数路线。
- 容量→溢出→展开链 ← TOAST `visibleEventCount` → overflow → `moreView`；本 pack expansion surface = picked-day panel，preview 压缩 = presence 点＋绝对计数。
- 区间模型 ← FullCalendar/vkurko current vs active 口径（派生 `MonthRange` 形状）。
- 键盘表 ← W3C APG Date Picker Dialog 例（权威逐行源）+ React Aria grid 合同 + Setproduct 思路。
- 邻居月焦点**两机制等价** ← 固定六行＝DOM 直落；动态行数＝pending target 挂共享 state、渲染提交后 `focus()` 回新节点（Base UI #4462 教训转正用）。验收锁行为（焦点落格＋即时同步月份与明细），不锁机制。
- 邻居格可点的边界 ← React Spectrum #3257 反方三坑 + 单月工作台适用声明。
- 一级月年标 ← 飞书四件套 + Setproduct 立论（转述）；**picker 形态一屏宫格直达为 MUST，原生 select 长列表为工程过渡不达终态**（见下方裁决记录）。
- 密度档 token 化 ← Metricool zoom 三档收成两档常量。
- 点格即建（POLICY 默认值）← Metricool 槽位预填；Buffer CTA 心智。
- 今天复位常在 ← Metricool "This week" + Notion 回位动作。
- 过去日禁建（POLICY）← 本 pack 对发布产品的默认立场，无外部出处，换产品可替换。

## 消费者裁决记录

- **2026-08-27（Liz）**：chuhai 当前年月切换的原生 `<select>` 长列表形态被否决——痛点是选项要逐个手点、无宫格直达感，且原生下拉灰线条观感陈旧。据此 SKILL 合同收紧：picker 必须**一屏宫格直达**（月 = 12 格 4×3；年在 ≤15 个候选项时同屏宫格），`<select>` 只算工程过渡，验收不放行。

## 消费侧账本（chuhai-cloud，2026-08-27 核）

- 壳层热键实装：`web/src/hooks/useShellHotkeys.ts` 于 window capture 阶段注册监听，处理器在 `web/src/lib/shellHotkeys.ts`；↑/↓ 与 ←/→ 两分支的目标守卫均已含 `[role="grid"]`（与 `[role="listbox"], [role="menu"], [role="combobox"]` 并列）。
- 组件本体：`web/src/features/publish/calendar.tsx`（PublishCalendar，手写网格），挂发布子 tab（`pages/PublishHub.tsx`）。实装形态：动态周数 5/6 行 + `min-height` 吸收高度、邻居月格可点跳月、点未来日直进新建（≈ POLICY 默认档）、状态点 presence 型。
- 待清欠（2026-08-27 晚间已按 v3 合同以最低复杂度结算，同日自查通过）：① roving tabindex 键盘导航 ✔（`data-day` 选择器 + 提交后 effect focus）；② grid>row>gridcell>button 四层结构 ✔（aria-selected/current 归 gridcell 容器——`button` 非 `aria-selected` 合法宿主角色；button 承载完整人话 name 与交互）；③ 今天 ring vs 选中 wash 双通道 ✔；④ button name 完整配方 + 绝对计数（可视 >1 显示总数）✔；⑤ select 长列表替换为年月宫格 picker ✔（含外点/Esc 关闭）。遗留：⑥ Host profile 整体 restyle 仍待做——当前仍是 shadcn 冷灰线框档，只加了今天圆环这一处通道修复。
- 结算时的两处实现档位记录：网格走**动态行数 + min-height 吸收**路线（非固定六行，同为合规解）；焦点跨月交接因变行下邻格可能不在 DOM，采用「pending target 跨 remount 交接」的 Base UI #4462 式方案而非六行 DOM 直落型——两条合同路线各自成立，此处自洽。

## Vendor 政策

不把 react-day-picker(@daypicker/react) / react-aria-components / @zag-js / FullCalendar / TOAST / Schedule-X 整包写入本 pack：机制已压缩进 SKILL.md 合同，接口契约已在本账本存档。Tier B/C 扩容重新进入选型时从「月历工作台主体样本」节起步。本账本中摘录的接口契约与默认值为各自 MIT 许可下的短小事实材料并注明出处；完整源码阅读属下钻任务，先产出 code-reading ledger 再谈复制。
