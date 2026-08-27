---
name: publish-calendar
category: design
description: >-
  [design] Build or restyle a product-grade publishing/scheduling month
  calendar (发布页日历 / 排期月历): first-class month-year control (not
  chevron-only), weekday header, day-cell density with status dots and +N
  overflow, distinct today vs selected states, Aurora cream-paper token
  mapping, and a keyboard contract that coexists with AppShell hotkeys.
  Use when the task is a month-view calendar as the main work surface of a
  publish/planner feature — not a date-picker popover. Evidence from React
  Aria, react-day-picker, Zag, 飞书 spec, Buffer/Metricool/Notion chrome in
  reference.md.
---

# Publish calendar

家在 `templates/ui-patterns/publish-calendar/`。调研证据（每个轮子偷什么、不偷什么、license）在 [`reference.md`](./reference.md)。

定位一句话：**Metricool/Buffer 的「按天看计划」核，不是 Later 的视觉格子墙。** 月历是工作台，格子是索引，明细在工作面；拖拽排程、时间轴视图不归本 skill。

## When / when not

**When：**

- 内容发布产品的月历主视图：按天看「哪些已排期、哪些已发、哪天空着」。
- B2B 后台任何以「天」为工作单元的 schedule 视图（考勤日、账期日、内容排期）。
- 现有日历被抱怨「年月切换矮小难点」「像 shadcn 默认样」「不知道今天在哪」——这三句就是本 skill 的靶心。

**When not：**

- 表单里的日期输入弹出层（date picker）→ 组件级 picker，另走表单工艺。
- 周视图 / 日视图 / 时间轴格墙、drag-and-drop 重排 —— 明确超出范围，先做月核再说。
- 营销页上的装饰日历或 deck 插图 —— 那是 Genre-B 的事。

## Anatomy

从左上角开始，一次说清七个部位。月年控制是 **first-class 控件，不是 afterthought**：

1. **月年标（最高杠杆）**
   - 形态：`2026年8月` 大号可点击 label（h-9 对齐 pill-control 档），点击展开**月份 picker + 年份 picker**（两个下拉，或 Zag 式先 12 月宫格 → 年宫格）。chevron 只承担 ±1 月。
   - 机制出处：飞书规范把导航区拆成「月份选择器 + 年份选择器 + 单箭头(±月) + 双箭头(±年)」四件套；Setproduct 直接点名「强迫用户连点 12 次 chevron 才过一年是最常见的 date picker sin」。
   - 反例即本次触发原因：`text-sm` 小字夹在两个 ghost icon 之间——只有滑动没有跳跃。
   - 双箭头 « »（±年）可选第三档，有则放最外侧。
2. **今天复位按钮**
   - 「今天」常驻 header；非当月时高可见（实底/pill），当月 `disabled` 占位保持版式不跳。仅当已离开当月才显示的做法可以接受，但按钮消失会造成 header 抖动，disabled 方案更稳。
   - Notion 的做法是记住上次浏览的月份区间；本 pack 的底线是回到今天的动作必须一步可达。
3. **星期头**
   - zh-CN 默认周一为首列；`一 二 三 四 五 六 日` 或 `周一…`，label 档（12px medium muted），不可交互、不参与焦点。
   - 第一天可配置就存账号偏好（Metricool 放 Account Settings），不要每页自行发明。
4. **日格（day cell）**
   - 整格一个 button；行数 = 该月实际周数（5 或 6 行，用 `weeksInMonth` 式计算），**禁止硬编码 42 格**；行高变化用网格 `min-height` 预留吸收，月份切换不得整版 reflow。
   - 数字 `tabular-nums`，13–14px 左上角；同周内跨月的邻居月日期照常渲染并降灰（`muted-fill`），点击跳转对应月份而不是死块。
   - 过去的天只读回看（不可新建）；未来的天点击 = 选定该天并可直达新建排期（Metricool 的「点槽位预填 composer」机制）。
5. **状态通道与溢出**
   - 每格最多 **2 个语义圆点**（如 已排期=warning、已发=success），点 ≤8px + 可选 title/aria-label 文字；数量超过阈值用 `+N` 计数文本收口。第三个颜色不许出现。
   - 圆点是预览不是数据本体：点数多时明细去 picked-day 面板看，不要试图在格子里塞卡片列表。
6. **Picked-day 明细面板**
   - 月历正下方：选中日的完整任务列表 + 空态（icon well + 人话 + CTA）+ 过去日禁排说明。空态三件套规则沿用 data-dense 手册 §1.5。
7. **aria 标注**
   - 网格 `role="grid"` + 容器名（含年月）；格子 accessible name 读全日期（「2026年8月14日 星期五」）不是裸数字；换月时 header `aria-live="polite"` 播报；今天格 `aria-current="date"`。

## Token mapping（Aurora Glass / chuhai 基准）

其他项目把这行的 token 名换成自家 DESIGN.md 即可，语义一一对应：

| 部位 | chuhai (Aurora) | 禁止 |
|---|---|---|
| 月历容器 | `content-card`：`rounded-xl border bg-card p-0`（奶油纸米黄 #F6F1E8 系） | 默认 shadcn 冷灰白 `oklch(1 0 0)`、纯 `#FFF` |
| 月年标 | `pill-control` 档：h-9，活跃态 `bg-primary/10` wash | 玻璃 blur；第二强调色 |
| 网格线 | 1px hairline `border`（暖棕 ~14% alpha），cell 内 border-r/b 收边 | 粗分隔、斑马纹 |
| 邻居月格 | `muted-fill`（暖棕 8% alpha）+ ink-soft 字 | 把对比降到看不见 |
| 选中日 | `bg-primary/10`（accent-wash）+ inset ring sea | 与「今天」共用一套视觉 |
| 今天 | 号码 `text-primary` 加粗 + 2px ring 标记 | 只靠背景色区分 |
| 状态点 | `bg-warning` / `bg-success`（语义锁四色之一） | 第三种颜色、彩虹格子 |
| 字体 | IBM Plex Sans + Noto Sans SC，权重 ≤600，tabular-nums | Inter 默认体、editorial serif 进后台 |
| 动效 | 换月 fade/transform 150–200ms | bounce、宽度动画、300ms+ overlay |
| 材质 | 卡片层零 backdrop-filter | 给日历卡加 glass |

材质法则同 Aurora 四层锁：日历卡是 L1 content-card（无 blur），永远不升玻璃层。

## Keyboard

按键合同（对齐 shell spatial grammar：arrows / Enter / Esc，无 Ctrl/⌘K）：

| 键 | 行为 |
|---|---|
| Tab | 进入/离开网格（roving tabindex，全网格恰一格 `tabindex=0`；**不困住**焦点） |
| ← → | ±1 天；边缘自动翻月（翻月后焦点落回同向第一/末格） |
| ↑ ↓ | ±7 天（上下同一列） |
| Home / End | 本周首/末日 |
| PageUp / PageDown | ±1 月（焦点尽量保持在原 day-of-month） |
| Shift + PageUp/Down | ±1 年 |
| Enter / Space | 选定该日；未来可排日直接进新建流程 |
| Esc | 只负责关浮层（详情 Sheet、picker 下拉），语义交给 shell，不自造第二个 Esc |

**壳热键共存（chuhai 实测约束，务必执行）：**

- `web/src/hooks/useShellHotkeys.ts:22` 以 `window.addEventListener('keydown', onKey, true)` **capture 阶段**接管方向键：←/→ 切页签、380ms 内双击 ↑/↓ 切侧栏页。DOM 层（grid cell 的 onKeyDown）拦不住 window capture。
- 唯一可靠修复路径：在 `shellHotkeys.ts` 既有的目标守卫里追加 `[role="grid"]`——`shellHotkeys.ts:353` 已有 `[role="listbox"], [role="menu"], [role="combobox"]` 先例（↑/↓ 分支），←/→ 分支同样需要补守卫。禁止让日历自己注册另一个 window capture 监听来抢键。
- Home/End/PageUp/PageDown 无壳冲突，可直接在网格 onKeyDown `preventDefault()` 处理。
- `?`、`/`、`g+h/c/i` 等壳热键在日历上继续可达；IME 组字中不抢字符键（沿用 shell 的 `isComposing` 判定）。

## Do / Don't

**Do**

- 年月标做成一级控件：点开即跳任意月/年；chevron 只是微调。
- 今天与选中用两个通道表达（ring vs wash），肉眼必须分得开。
- 格子承载「有没有」（点 + N），明细交给选中日面板。
- 换月用 `aria-live` 播报；格子 name 是完整日期。
- 规划密度的两档取舍明示：comfortable（~72px 高、容 3 点+计数）/ compact（~56px）至少选一档作为常量，不做每处漂移的第三档。

**Don't**

- chevron-only 的年月切换（一年 24 击的经典 sin）。
- 硬编码 42 格 / 换月跳动 / 邻居月留空白死块。
- 日历卡上任何 glass/backdrop-filter 或冷灰 shadcn 底。
- 格子内塞第三个语义颜色或整张帖子卡片（那是 Later 格子墙，此 skill 明确不是它）。
- 把 ←/→ 从壳热键手里抢回来，或在日历里绑 ⌘K/Ctrl+K。
- 困住 Tab 焦点；Esc 自造行为覆盖 shell 的顶层浮层关闭。

## 验收（desktop + narrow）

桌面 ≥1280 与窄屏 ~375 各跑一遍：

- [ ] 年月标高度 ≥32px、可点击、能键盘进入；点开月/年 picker 两击内到达目标月；« » 存在时不与单箭头混淆。
- [ ] 今天 vs 选中截图中肉眼可辨；`aria-current` 在今天格上。
- [ ] 换月：行高稳定不 reflow；每月实际周数渲染正确（5/6 行）；无 42 格硬编码。
- [ ] 方向键回归测试：焦点在网格内按 ←/→ 移动日格而非切产品页签；快速连按 ↓ 不误触侧栏切换（shell 守卫生效）。
- [ ] Enter 打开未来日新建；过去日禁建并有文案说明；空态 CTA 已接线。
- [ ] 状态点 ≤2 色 + `+N`；aria-live 播报换月。
- [ ] 材质：奶油纸 card、hairline 线、无 blur、无冷灰块；字号/权重未超 spec。
- [ ] 窄屏：日格 ≥40px 可点；header 换行不破版；状态点仍可读；Tab 能进出网格。
- [ ] 截图存项目 `docs/screenshots/`（引用 data-dense-b2b-app 的截图矩阵约定）。

## 关联资产

- **data-dense-app-craft.md**：表格/密度/状态点/focus ring 通条目适用本面板。
- **high-leverage-craft-checklist.md**：等待/撤销/微反馈等 UX 机制。
- **reference.md**：全部调研轮子的 URL · 偷什么 · 不偷什么 · license。
