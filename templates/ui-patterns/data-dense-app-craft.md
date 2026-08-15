# 数据密集 B2B 后台视觉工艺手册（Data-Dense App Craft）

类型：Craft handbook（非 Skill / 非项目 docs）。与 `high-leverage-craft-checklist.md` 互补：那份管「承诺感 UX 机制」，这份管「数据面的视觉质感」——表格、列表、表单是 B2B 用户每天待的地方，「一般」的体感主要来自这里。

| | |
|---|---|
| **What** | 数据密集后台（CRM / 管理台 / 报表）的视觉工艺条目库：表格 / 表单 / 列表 / 密度 / 状态色。条目格式与 craft checklist 对齐：是什么 / 为何杠杆 / 怎么落地 / 反模式 / 开火路径。 |
| **Why** | B2B 后台没有 landing 的叙事舞台，质感只能来自「数据本身的秩序感」：对齐、密度、状态语义、微交互。这些条目是「廉价兑现专业感」的视觉版。 |
| **Who** | 1–3 人小队；任何以表格/列表为主界面的产品。写给人读，也给 agent 扫。 |
| **How to use** | ① 项目启动先读 §0 与 §1（表格工艺）→ ② 按页面类型挑 3–5 条 → ③ 改完截图对比 → ④ 机器闸（若有）跑绿。 |
| **Not this** | 不是组件库代码（语法级条目给 CSS/Tailwind 形态，不替组件库）；不是 landing 工艺（那是 premium-one-pager / lead-radar 的活）。 |
| **When to open** | 任何「表格/列表/表单为主」的页面开工前；后台质感审计。 |

---

## 0. 先定三件事（开工前，缺一不可）

1. **密度档位 token**：至少两档 `--density-comfortable`（行高 48px）/ `--density-compact`（行高 36–40px），页面级切换或全局默认一档。**不许每页自行发明行高**。参考：Linear 默认紧凑、Attio 默认宽松——选一档当默认，另一档做设置项。
2. **数字纪律**：所有数字列（金额/计数/时间）`font-variant-numeric: tabular-nums` + 右对齐 + 列头同对齐。指标卡数字用同一字重与字号阶梯（`stat-value` 角色 token），不随页面漂移。
3. **状态色语义锁**：成功/警告/失败/进行中 = 4 个语义 token（或 badge 变体），**全站只此一套**。禁止每页现写 `text-green-500` 或字面 oklch（违反 = lint 红，见 chuhai design-lint 教训）。

## 1. 表格工艺（最高杠杆，用户 80% 时间所在）

### 1.1 粘性表头 + 表头语法 `frontend`
**是什么**：表头行 `sticky top-0`，滚动时表头钉住；表头文字 = 12px medium + muted（或 mono 索引号），与数据行视觉分层。
**为何杠杆**：长表滚动时失去列语义 = 最频繁的「这工具不专业」瞬间；表头分层是数据秩序的第一信号。
**怎么落地**：`thead th { position: sticky; top: 0; background: var(--card); z-index: 1 }`；排序箭头 hover 才显示；表头可点 = 排序暗示。
**反模式**：表头不钉、滚动即丢列名；表头与数据行同字号同字重（没有层级）；每列都有排序箭头（视觉噪音）。
**开火路径**：任何超过 8 行的表格页。

### 1.2 行高与行 hover 手感 `frontend`
**是什么**：数据行固定行高（密度档 token），hover 时整行浅底 + 关键操作浮现（右侧 2–3 个 icon 按钮），选中行左侧 2px 主色条 + 浅主色底。
**为何杠杆**：行 hover 是表格的「呼吸」——没有它表格是死的；操作浮现把「编辑/删除」藏到需要时，密度与可操作性兼得。
**怎么落地**：`tr:hover { background: var(--accent) }`（8–10% alpha）；操作列 `opacity-0 group-hover:opacity-100`；选中态 `border-left: 2px solid var(--primary)` 或 inset 阴影。
**反模式**：hover 无反馈；操作永远可见（列太宽）；hover 变色太深（抢内容）；移动端无 hover 时操作不可达（降级为长按/菜单）。
**开火路径**：全部列表/表格页。

### 1.3 数字列对齐与格式化 `frontend`
**是什么**：数字右对齐 + tabular-nums；金额带千分位与固定小数位；时长/百分比统一格式函数，不散写。
**为何杠杆**：对齐的数字列可以纵向扫读——这是数据密集界面「精密感」的主要来源（chuhai index.css:172 已做 body 级 tabular-nums，列级对齐是下一步）。
**怎么落地**：`<td className="text-right tabular-nums">`；金额 `Intl.NumberFormat` 统一；负值红色 token。
**反模式**：数字左对齐；混排 `1.5k` 与 `1500`；百分比符号忽前忽后。
**开火路径**：报表、财务、指标表。

### 1.4 斑马纹克制 / 分隔线优先 `frontend`
**是什么**：行分隔用 1px hairline（`--border` 12–14% alpha），不用斑马纹；斑马纹只在超宽表（10+ 列）且无 hover 场景才考虑。
**为何杠杆**：hairline 分隔是 Linear/Stripe 系秩序感的来源；斑马纹在 hover 高亮时会打架。
**反模式**：斑马纹 + hover 双通道（视觉打架）；分隔线过重（`border-border` 默认 14% 即可，别加深）。
**开火路径**：所有表格。

### 1.5 空态 = 教程 + CTA，且必须接线 `frontend` `copy`
**是什么**：空表三件套——icon well（主色晕底，替代灰圈「像 bug」）+ 一句人话（「这里将来是什么」）+ 一个可点主 CTA（「导入客户」「接入账号」）。**CTA 必须真接线**，不许只画按钮。
**为何杠杆**：chuhai 本轮做了 icon well 与文案（States.tsx:40-58），但「Full empty-state CTA wiring per module」被推迟（UI-CRAFT-PASS.md:66）——半成品空态比没有更暴露「还没做完」。
**怎么落地**：空态组件要求 `action` 必填（无 action 时 lint/评审拦）；CTA 指向真实路由或引导流程。
**反模式**：只有插画没有动作；三个同等 CTA 抢焦点；「暂无数据」四个字了事。
**开火路径**：首次进入模块、筛选结果为空。

### 1.6 批量操作条（选中即浮现） `frontend`
**是什么**：勾选 ≥1 行时，表格顶部浮现操作条（批量导出/删除/标记），取消选择即消失；全选在表头。
**为何杠杆**：批量能力是 B2B 的日常，操作条按需出现保住密度；这也是「系统听见了你」的视觉证据（craft checklist 三问之一）。
**怎么落地**：选中数驱动 `AnimatePresence`/条件渲染；操作条 `sticky` 于表头下；含「已选 N 项」计数 + 清除。
**反模式**：批量操作藏进每行菜单；无选中反馈；操作条永久占位。
**开火路径**：线索/客户/素材/记录列表。

## 2. 表单工艺

### 2.1 字段密度与 label 语法 `frontend`
**是什么**：字段高 32–36px（紧凑）或 40px（舒适）；label 上置 12px medium + muted；必填星号用主色不用红；错误行内红字 + 具体原因（「手机号格式不对」不是「输入错误」）。
**为何杠杆**：B2B 表单密度决定「像工具」还是「像网页」；错误文案 = 信任投票（craft checklist 条目 11 的视觉侧）。
**怎么落地**：统一 `Field` 组件（label + control + hint + error 四槽）；错误 `border-destructive` + `text-destructive` + 12px 说明。
**反模式**：placeholder 当 label（聚焦即失语义）；错误只靠红框无文字；label 与值字号相同。
**开火路径**：新建/编辑弹窗、设置页、导入配置。

### 2.2 焦点环纪律 `frontend`
**是什么**：全站统一 focus ring：2px `var(--ring)` + 2px offset；键盘导航可见、鼠标点击不闪环（`:focus-visible` 区分）。
**为何杠杆**：焦点环是「精密工具」与「玩具页面」的分水岭；统一 ring 也是玻璃材质下可访问性的底线。
**怎么落地**：`@layer base` 全局 `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }`；组件级覆盖一律走同一 token。
**反模式**：ring 颜色每组件一换；`outline-none` 裸奔；玻璃上 ring 被 blur 吞掉（ring 用实色不用半透明）。
**开火路径**：全站基线。

## 3. 列表语法（非表格的列表页）

### 3.1 头像 + 主文 + meta 三栏语法 `frontend`
**是什么**：列表行 = 左侧 32–40px 头像/图标井 + 中列主文（14px medium 一行截断）+ 副文（12px muted 一行截断）+ 右列 meta（时间/状态 badge/箭头）。三栏宽度比例固定，行高走密度档。
**为何杠杆**：统一的行语法让几十个列表页看起来是一个系统（chuhai LeadsInbox 会话列接近此形态，缺的是全站统一组件）。
**怎么落地**：抽 `ListItem` 组件（leading/title/subtitle/trailing 四槽）；截断一律 `truncate` 或 2 行 clamp；hover 同 §1.2。
**反模式**：每页重排三栏比例；副文两行以上；右侧 meta 与主文抢层级。
**开火路径**：收件箱、任务流、素材库、评论列表。

### 3.2 状态点与 badge 语义 `frontend`
**是什么**：状态表达层级：① 实心圆点（在线/进行中，8px）+ 文字；② badge（pill，语义 tint 底 + 语义字色）；③ 进度条。圆点 ≤2 色、badge 4 色封顶。
**为何杠杆**：状态是数据密集界面最高频的信息，语义锁死了就不会出现「红黄蓝绿全上」的彩虹灾难（chuhai DESIGN.md §5 明令禁彩虹，落地需要这套语义表）。
**怎么落地**：token 级：`--success/--warning/--destructive/--info`（若无 info 用 muted）；badge 变体 = `bg-{semantic}/10 text-{semantic}`；圆点 `bg-{semantic}` + 1px 白/卡底 ring。
**反模式**：每种状态一个自创色；badge 用高饱和实底（刺眼）；圆点无文字只有颜色（色盲不可读）。
**开火路径**：线索阶段、任务状态、连接状态、审核状态。

## 4. 密度与空白（后台的「呼吸」）

- **页面级节奏**：页面头（title + 副文 + 主操作）→ 过滤条 → 数据面 → 分页/批量条；垂直间距走 4px 网格（16/20/24）。
- **过滤条语法**：搜索框 + 筛选（Select/下拉）+ 视图 tab 同行，`flex-wrap`，不换行不折叠；筛选结果数实时显示。
- **反模式**：过滤条每页不同结构；页面头堆 3 个以上主按钮；数据面与过滤条之间无分隔。

## 5. 机器闸建议（让上面这些「被遵守」）

- 表格/列表页禁字面颜色（hex/oklch/调色板类）→ 语义 token 白名单（参考 chuhai `design-lint.sh` 三闸：调色板类 / hex / oklch + 材质闸 + 渐变收口闸）。
- 空态组件 `action` 必填（可 lint：`<EmptyState` 无 `action=` 属性即红）。
- lint 必须**真的能跑**：bash 脚本确认 LF 行尾（CRLF 会静默杀死闸——chuhai 2026-08 实战教训，`design-lint.sh` 因 CRLF 从未运行过）；纳入 CI 或 `npm run lint:design`。
- 截图验收：每次 craft pass 至少 3 张关键页截图（列表/表格/表单各一），存 `docs/screenshots/`。

## 反模式总表（一眼版）

- 表格无粘性表头 / 无行 hover / 数字左对齐 / 斑马纹 + hover 打架
- 空态只有「暂无数据」且 CTA 不接线
- 状态色每页自创（彩虹灾难）
- 表单 label 用 placeholder 顶替 / 错误无文案
- 焦点环缺失或每组件一换
- 行高每页发明（无密度档 token）
- 机器闸存在但跑不了（CRLF / 不纳入 CI）

## 关联资产

- **交付闸（流程层）**：`data-dense-b2b-app.md`（同目录）——开工前先做 surface inventory（route × 决策 × 工作单元 × 密度 × 状态 × 签名），交付前过 10 分 stop-ship gate + 截图矩阵。本手册管「看起来该怎样」，闸管「凭什么算做完」。
- 表格 DOM 骨架与 token：`design/beautiful-ui-ai-interfaces/sections/records-table.html` + `filter-table.html` + `diff-table.html`（12.5px 密集行、sticky header、hairline、tint 单元格——跨象限直接可用）
- UX 机制（等待/撤销/微反馈）：`high-leverage-craft-checklist.md` 条目 1–6、21–22
- 字体选型：`design-typography-font-preferences.md`（数据密集 UI → IBM Plex Sans「workhorse, precise」档）
- 实例参照：`chuhai-cloud`（Aurora Glass：token 层 + 玻璃分层 + 动效 token 的完成度标杆；其 lint 死闸与数据面缺口是反面教材）
