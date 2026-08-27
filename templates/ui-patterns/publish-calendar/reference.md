# Publish calendar — 调研证据（wheels: URL · 偷的机制 · 不偷什么 · license）

2026-08-27 调研。记录的是**机制**不是截图。闭源产品只引机制；开源库可读源码但不 vendor 整库进 pack（`SKILL.md` 是实现合同，本文件是出处账本）。

## 开源轮子

| 来源 | 偷的机制 | 不偷 / 风险 | License |
|---|---|---|---|
| [React Aria Calendar](https://react-aria.adobe.com/Calendar)（含 [useCalendar](https://reactspectrum.blob.core.windows.net/reactspectrum/b5407e201170932bb70821141ee70d2325a5ea40/docs/react-aria/useCalendar.html)） | `focusedValue` 控焦点=控可见月；unavailable 日期仍可聚焦但不可选（导航一致性）；ARIA grid 键盘合同；RTL 方向自动翻转；移动端触屏 reader 的隐藏「下一月」按钮 + 跳过星期头 | 13 套历法/`@internationalized/date` 全家桶对 zh-CN Gregorian 产品是过度工程；不引入整库只为一个月视图 | Apache-2.0 |
| [react-day-picker v9](https://daypicker.dev/docs/caption-and-nav-layouts)（shadcn `calendar` 的内核） | `captionLayout="dropdown"`（月/年下拉）+ `startMonth/endMonth` 圈定下拉范围；`navLayout="after"/"around"` 修复 dropdown 时 Tab 序与视觉序不一致的老 bug；`formatters`/`labels` 全量 i18n 钩子（`labelGrid`、`labelDayButton`…）；`weeksInMonth` 思路的动态行数 | 默认 caption 样式就是「generic shadcn gray」观感本身——偷 prop 合同，样式重做进自家 token；为一个月视图装库要过项目依赖审视 | MIT |
| [Zag.js date-picker](https://zagjs.com/components/date-picker) | day→month→year 视图阶梯：view trigger 替换 heading，月宫格 4 列、年宫格 4 列分页；键盘可达性按 WAI-ARIA 出 Playwright 测试的观念 | state machine 移植成本高；超过两层的 view 阶梯对本场景多余 | MIT |
| [Base UI calendar PR #4462](https://github.com/mui/base-ui/pull/4462) | 「翻月后焦点回落在哪」是真实的工程暗坑：月份 remount 时 pending focus target 必须挂在共享 state 上交接，否则 ←→ 边缘连续导航丢焦点 → 修此坑要有回归测试 | Viewport 动画容器那套复杂度不需要 | MIT |

## 闭源产品 chrome（机制引用）

| 来源 | 偷的机制 | 不偷 |
|---|---|---|
| [飞书开放平台 · 日期选择器设计规范](https://open.feishu.cn/document/design-specification/component---data-entry/date-picker?lang=zh-CN) | 导航区四件套语义：月份选择器、年份选择器、单箭头±月、双箭头±年；hover 高亮提示 label 可点；跨年时箭头行为有明确文案 | 截图与双面板 range UI 细节；中文产品的默认审美照抄 |
| 钉钉系日历组件生态（[例](https://ext.dcloud.net.cn/plugin?id=13413)，第三方仿制） | 中国产品共识：年月 picker 一键直达 + 左右滑/箭头并存；今天定位是一等动作 | DCloud 插件代码不入 pack |
| [Buffer 新版 calendar 发布文](https://buffer.com/resources/new-social-media-calendar/) | monthly=规划俯视 / weekly=执行明细的双层心智；channel 过滤下拉；Create Post 常驻 CTA；iOS/Android 同构 | drag-drop timeslot（官方也还在探索，非承诺项） |
| [Metricool 教程](https://metricool.com/metricool-mega-tutorial/) | 点日历槽位预填 composer 时间；"This week" 复位钮；Calendar zoom 三档密度（Condensed/Normal/Expanded）← 密度档 token 化的直接参照；首日偏好放账号设置 | best-times heatmap（需数据底盘）；跨品牌 Studio 视图 |
| [Notion 日历帮助](https://www.notion.com/help/calendars) | 记住上次浏览的月区间，重进页面不重置 | 无限滚动翻月的页内模式（与本 pack 工具栏模型冲突） |
| [Setproduct · Date picker anatomy](https://www.setproduct.com/blog/date-picker-ui-design) | 「month/year 直接可点，强迫连点 chevron 一年是最常见的 sin」——本 skill 月年标规格的立论句；today≠selected 双通道警告；40px 触达；Home/End/PageUp/Shift+PageUp 键位表；Esc dismiss & 焦点归还触发器 | 其 paid 设计 kit |
| [uxpatterns.dev · Date picker](https://uxpatterns.dev/patterns/forms/date-picker) | ARIA 完整对照表：`role="grid"`/`gridcell`、`aria-current="date"`、header `aria-live` 换月播报；事件埋点清单（`date_picker.month_navigated` 等）；footer today/clear 快捷区 | 表单输入框联动的部分（date picker ≠ page calendar） |

## 与 SKILL.md 的映射速查

- 一级月年标 ← 飞书四件套 + Setproduct 立论 + react-day-picker `captionLayout`。
- 键盘表 ← React Aria grid 合同 + Setproduct 键位表 + uxpatterns ARIA 对照。
- 焦点翻月不掉 ← Base UI #4462。
- 密度档 token 化 ← Metricool zoom 三档收成两档常量。
- 点格即建 ← Metricool 槽位预填；Buffer CTA 心智。
- 今天复位常在 ← Metricool "This week" + Notion 回位动作。
- 状态通道 ≤2 色 + N ← data-dense-app-craft §3.2 + Buffer/Metricool 月视图的信息降噪。
- 壳热键共存 ← chuhai `web/src/hooks/useShellHotkeys.ts:22`（window capture）+ `shellHotkeys.ts:353`（既有 role 守卫先例）——消费侧实测，非外网来源。

## Vendor 政策

不把 react-day-picker / react-aria-components / @zag-js 整包写入本 pack。机制已压缩进 SKILL.md 合同；消费项目按自身依赖选型（chuhai 目前手写网格，restyle 以最小改动落到该合同上即可）。
