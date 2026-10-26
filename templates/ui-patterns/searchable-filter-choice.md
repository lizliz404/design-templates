---
name: searchable-filter-choice
description: >-
  Searchable filter choice: one menu where typing filters and clicking selects,
  with the committed filter value kept separate from the menu's search draft and
  from the page-level unexecuted query. Use when a filter capsule / table facet
  must offer both an input and checkable options; when filtering must never change
  the selected values; when unmatched typed text must roll back instead of becoming
  a value; when IME Enter, hover, pinned rows, no-match counting, and large-list
  local-vs-remote search need one explicit contract.
---

# 可搜索筛选选择器（输入 + 点选共存）

类型：UI micro-pattern（数据合同 + 交互合同；不绑定组件库，不附带整套组件源码）

| | |
|---|---|
| **What** | 一个菜单里同时有「输入框」和「可点选项」：打字缩小候选，点选/回车提交筛选值。 |
| **Why** | 这种控件最贵的不是样式，是**把搜索草稿当成值**：过滤一次就丢已选、输一半关窗就留脏值、IME 回车误提交、重开还带着上次查询。 |
| **Who** | 数据密集后台的筛选胶囊/表头 facet、B2B 表单的受限枚举、目录类多选筛选。 |
| **How to use** | ① §1 定形状 → ② §2 定分层数据（筛选值/草稿/结果）→ ③ §3 状态流 → ④ §4–§7 逐条落规则 → ⑤ §9 验收 → ⑥ §11 接法取舍。 |
| **Not this** | 不是全文搜索或记录查找（那走 [search-craft.md](./search-craft.md)）；不是自由输入框；不是组件库安装指南。 |
| **When to open** | 「筛选里能不能直接搜？」「选了以后又被搜没了」「输一半按回车变成脏值」「手机上点不到」「一万个选项卡」。 |

**原则一句话：过滤只改「看得到什么」，永不改「选了什么」。**

本文把规则分成两类，读的时候别混：

- **[硬]** —— 由 ARIA 语义、值完整性或可恢复性决定；违反就是 bug，换产品也一样。
- **[POLICY]** —— 依赖产品语境、词表大小、团队手感；必须**明确选一条并写进设计说明**，不是必须选某一条。

---

## 1. 先定形状，五种别混

| 形状 | 输入框能改值吗 | 合法值 | 常见用途 | 何时不该用 |
|---|---|---|---|---|
| **普通菜单**（无输入框） | 无输入框 | 封闭集合 | 选项少、一次一选或勾选多选 | 词表长到要滚动半天——用户是在列表里捞针 |
| **可搜索单选**（受限 combobox） | 否，只过滤 | 封闭集合 | 国家/站点/品类/币种这类必须有合法值 | 让用户把词打错成自由值 |
| **可搜索多选**（受限，本模式主场景） | 否，只过滤 | 封闭集合 | 筛选胶囊、表头 facet、标签选择 | 把勾选与「新建标签」混进同一个框 |
| **自由输入**（autocomplete / allow custom） | 是，文字会成为值 | 开放 | 标签系统、收件人、任意关键词 | 报表筛选——自由值会让分母不可解释 |
| **搜索框** | 值是查询串，不是选择 | n/a | 找还不在视野里的东西 | 拿它冒充 facet，用户以为在筛当前列表 |

**[硬] 判定第一问：合法值封闭吗？** 封闭 → 可搜索选择器（本模式）；开放 → 自由输入。
**[硬] 判定第二问：用户打的字允许变成值吗？** 允许就**不是**本模式，别偷偷允许，也别偷偷禁止。

**[POLICY] 判定第三问：选项多到需要搜吗？** 这**不是**硬门槛。常见的经验线是「一屏放不下就要搜」，但：

- 选项少也要能搜，是合理需求——用户明确要求「输入 + 点选」时，小词表同样可以做可搜索选择器，输入框的价值是**少扫视、支持键盘直接定位**，不是弥补可见性。
- 反过来，选项多也不必然要输入框：如果用户按固定顺序找（如月份、币种），稳定排序 + 分组更省事。
- 把「N 项以上才准加搜索」写成规则会误导实现者删掉用户要的能力。这条只作**倾向**，不作准入。

官方来源在形状上是这么切的：APG 把 combobox 分成 select-only 与 editable，editable 再分「任意值」与「过滤建议」两支；Base UI 指南是「Combobox 是 filterable Select，不允许自由文本，需要自由输入请用 Autocomplete」；Carbon 把 Dropdown / Multiselect / Combo box 三个变体分开写。**没有一份给选项数量阈值**——阈值都是 POLICY。

---

## 2. 分层数据：草稿、筛选值、执行结果是三件不同的事

命名上刻意避开 `applied`、`committed` 这类词：它们在别的产品里常指「已经生效/已经执行」，而这里的**外层 query 完全可能还是没执行的草稿**。

| 层 | 名字 | 存在哪 | 生命周期 |
|---|---|---|---|
| L0 | **页面 query 草稿** | 页面搜索框的受控 state | 用户输入中；必须有显式「执行」边界（回车/按钮）才产生 L3 |
| L1 | **菜单 draft**（菜单里的搜索串） | 菜单内部 | 只在菜单开着时有效；关闭时按 P2 处理 |
| L2 | **selectedFilters**（已提交的筛选值） | 筛选状态，通常镜像进 URL | 点选 / 移除 / 清空才变；作为请求的筛选参数 |
| L3 | **executed results**（已执行查询的结果快照） | 查询结果/数据作用域 | 由一次真实查询产生，带自己的 as_of / 截断标记 |

**[硬] L2 ≠ L3。** 改了筛选值不等于结果已经刷新；界面必须能区分「筛选已改、结果还没回来/还没执行」。L0 尤其不能被当成 L2：页面上的那句话在按下执行之前什么也没筛。

```text
L0 pageQueryDraft : string            // 未执行，永不直接当筛选值
L1 menuDraft      : string            // 未提交，永不直接当筛选值
L2 selectedFilters: Value[] | Value | null   // 只装合法 id；null = 不限
L3 results        : Envelope          // 上一次真实查询的返回
visible           : Item[]            // 投影 = pinnedRows ∪ filter(items, menuDraft)
```

**[硬] 五条不变量**

1. `selectedFilters` 只装合法 id。显示用 label 从目录按 id 解析，永不写回 `selectedFilters`。
2. `menuDraft` 不是值：不进 URL、不进请求的筛选字段、不成为 `selectedFilters`。
3. 从 `menuDraft` 到 `selectedFilters` 只有一条通路：**显式提交**（点选、或在高亮行上按 Enter）。没有隐式转换。
4. **过滤不改变 `selectedFilters`。** 无论过滤出 0 条还是 500 条，已选值一字节不动。
5. **已选值的可见性与可撤销性不因过滤消失。** 字段/胶囊上的已选标签与取消入口必须始终存在、始终可点、始终可键盘到达（多选常见形态是 chips + 计数标签）。

**[POLICY] 三个独立选择**（每条各自决定并写明）

- **P1 已选行是否在列表里置顶常驻。** Carbon 的做法是重开时已选项置顶；APG/Base UI 不要求。置顶的好处是「在列表里也能取消」，代价是列表不再是纯搜索结果（计数规则见 §6）。两条都合法：不变量 5 已经保证了不丢值。
- **P2 关闭时 `menuDraft` 清还是留。** **推荐清空**（用户下次打开看到的是筛选全貌，不是上次没提交的半句话）。若选择保留，必须在重开时把这段文字呈现为「未提交的搜索」——不能让它看起来已经生效，也不能让它参与 L2。
- **P3 提交后（`selectedFilters` 更新后）`menuDraft` 留还是清。** 默认清空、列表回全集；要连续挑同类就保留过滤且不关菜单（Base UI 可取消默认的「提交清空/关闭」请求）。同一产品内统一。

---

## 3. 状态流

```text
closed ──(点击/↓/Alt+↓/聚焦)──▶ open(menuDraft 按 P2 为空)
open ──(输入字符)──▶ filtered(matchCount>0)
filtered ──(点选 / 高亮行 Enter)──▶ selectedFilters 更新 ──┬─ 多选：按 P3 决定是否保持打开
                                                          └─ 单选：关闭，字段显示新 label
filtered ──(matchCount=0)──▶ no-match        // 不清空输入、不关闭、不动 selectedFilters
filtered ──(远端请求)──▶ loading ──▶ filtered | error
open/filtered ──(Esc)──▶ closed（selectedFilters 不变）
closed ──(Esc，可选)──▶ 清 menuDraft（selectedFilters 仍不变）
```

**[硬] `error` 只影响候选列表**：不回滚 `selectedFilters`、不清空 `menuDraft`、不把「请求失败」画成「没有匹配」。
**[硬] 单选/多选的差异只在这三处**：提交后是否关闭、是否保留 chips、是否允许多值。别在两套组件里各写一套键盘规则。

---

## 4. 交互硬规则与 POLICY

**4.1 [硬] 焦点属主只有一个。** 焦点留在输入框，选项用 `aria-activedescendant` 高亮；不要把 DOM 焦点搬进列表又搬回来——搬走就打不了字。

**4.2 [硬] 候选行上的指针不得改值、不得移动 DOM 焦点。** 指针扫过候选行既不提交也不撤销；键盘高亮可以正常 `scroll-into-view`（否则长列表里键盘走到视野外就看不见了）。
**[POLICY] 高亮行与 hover 的关系**：组件把 hover 与键盘高亮合成一个状态时（例如 `highlightItemOnHover`），hover 会更新高亮行；纯鼠标下没问题，键盘导航中可能把光标从用户脚下抽走。保留 hover=高亮、或键盘导航期间冻结 hover、或直接关掉该 prop 让 `:hover` 与 `data-highlighted` 分离，三种都合法。选哪种写进设计说明——APG 只规定焦点与选中语义，不规定 hover 与高亮的关系。
**[硬] 外壳层（胶囊/popover 本体）的指针行为单独定义**：指针离开外壳后收起菜单是允许且常见的；但收起只影响菜单开合，不改 `selectedFilters`。

**4.3 [硬] 点击 = 提交，不是聚焦。** 提交后焦点回到输入框（多选保持打开时）或触发控件（单选关闭时）；焦点不允许落到 `body`。

**4.4 [硬] Enter 要认 IME。** 组字未结束时按 Enter 属于输入法：**不提交、不关闭、不改值**；组字结束后的 Enter 才按 4.3 处理。中文查询几乎必经这条路径。⚠ 这是工程合同（浏览器 `isComposing` / composition 事件），**APG 不规定 IME**，别写成标准。

**4.5 [硬] Esc 分两级。** 打开时：关闭，`selectedFilters` 不变（APG：弹层可见时 Esc 关闭，且 combobox 允许探索选项而不丢当前值）。已关闭时（可选）：清 `menuDraft`。**不要**把「Esc = 清空筛选值」做成默认。

**4.6 [POLICY] 不匹配输入的处理，三选一：**

| 策略 | 行为 | 适用 |
|---|---|---|
| **回滚（推荐默认）** | 关闭/失焦时丢弃 `menuDraft`，字段显示回 `selectedFilters` 的 label，值不变 | 受限筛选、报表口径字段 |
| 保留草稿 | 草稿留着但仍**不提交**，下次打开还在（配合 P2） | 「边想边筛」场景，须显式声明 |
| 提交为新值 | 仅当形状是自由输入（§1） | 标签、收件人 |

**[硬] 无论选哪种**：不把草稿静默变成新值；不因回滚清掉已选；不因回滚重置已选顺序。

**4.7 [POLICY] 空输入时的首屏顺序**：已选（若 P1 选置顶）→ 常驻「不限」→ 其余按稳定顺序（字母序或业务序）。不要每次打开都跳到「最近使用」，除非有可见理由。

---

## 5. 过滤语义与合法值边界

**[硬] 三条**

1. 过滤只决定候选可见性，**永不产生、永不修改** `selectedFilters`。
2. 每项至少有一个 **label**（显示）与一个稳定 **id**（值）；提交的是 id。
3. 任何别名、缩写、代码都不会成为已选项的显示文本。

**[POLICY] 匹配打在哪、怎么打——按需声明，别一刀切**

- **匹配字段**：最小可用做法是只打 `label`。需要更强召回时再加**可选** `searchText`（label + 别名 + 代码/货号）。拼音、简繁、同义词不是通用必需项——只有在真实用户会那样打时才加，并且加了就要有真实词表验收（中文、别名、错拼各 ≥5 条）。
- **匹配语义**：Carbon 的 filterable multiselect 是**前缀匹配**；中文场景前缀匹配会把「藤编收纳篮」在输入「收纳」时漏掉，通常要改成子串或分词匹配。选哪种都行，写进设计说明即可。
- **折叠**：大小写/全半角折叠属于便宜且安全的默认；**重音折叠不是 WAI 规定**，属于按语言决定的实现选择（法语/波兰语站点值得做，纯中文界面没有收益）。别把「必须做重音折叠」写成无障碍要求。
- **值与显示语言解耦**：切语言后是同一个 id，只换 label；翻译不进 `selectedFilters`。

---

## 6. 四态、常驻行与「无匹配」计数

| 态 | 触发 | 文案要点 | 禁止 |
|---|---|---|---|
| **空（未输入）** | 刚打开 | 展示常驻行 + 已选 + 范围提示（「共 N 项」） | 空白面板 |
| **无匹配** | **实际匹配数 = 0** | 点名输入串 + 给「清除搜索」/「看全部」 | 清空输入；把「库里没数据」写成「无匹配」 |
| **加载中** | 远端候选 | 保留已有选项，列表内骨架 + `aria-busy` | 清空列表造成闪跳；锁死输入 |
| **错误** | 候选请求失败 | 保留已选，可重试，可退回本地子集 | 回滚已选；把错误画成「没有匹配」 |

**[硬] 无匹配按「实际匹配数」判断，不按「可见行数」判断。**
只要你有常驻行（已选置顶、不限、分组标题、页脚），可见行就**永远不为空**，组件的 Empty/无结果插槽可能永远不触发。所以：

1. 单独维护 `matchCount = filter(items, menuDraft).length`，无匹配文案由它决定。
2. 常驻行**视觉上与匹配行分开**（分组标题或分隔线 + 不同底色/弱化），并且**不计入**「N 项匹配」。
3. 常驻行**不得假装命中**：不能显示高亮匹配片段，不能算进「为你找到 N 项」。
4. 语音播报同样报 `matchCount`（「无匹配」而不是「3 项」）。

**[POLICY] 本地 vs 远端**（阈值按项目实测改，不是事实）：

- 选项数百项以内 → 本地过滤，无请求。
- 上千项或需要权限/租户过滤 → 远端：debounce 150–250ms、取消上一次请求（abort + 请求序号守门）、**远端结果与常驻行合并**、错误只影响候选。
- **[硬] 远端只用来收窄候选**：服务端没返回某个 id，不能成为把它从 `selectedFilters` 里删掉的理由。

---

## 7. 触屏与移动

- 行高与命中区 ≥44px；chip 的移除 × 视觉可以小，**命中区**必须够大，且不能只在 hover 出现。
- 不依赖 Esc（移动端没有键盘）：提供显式「清除搜索」「关闭」控件。
- 弹层内滚动加 `overscroll-behavior: contain`；软键盘弹出时列表不得被键盘盖住。
- 打开即弹软键盘可以接受，但必须保留一条不用打字的点选路径。
- 桌面浏览器缩窄视口**不等于**真机验收：物理软键盘的遮挡、输入法候选条、tab 序列要单独在真实设备上看过。

---

## 8. 无障碍最小集

`role=combobox` + `aria-expanded` + `aria-controls` + `aria-activedescendant`；多选列表 `aria-multiselectable="true"`，每项 `aria-selected`；`matchCount` 变化用 polite live region 播报；chip 有可读名称与移除按钮名；「不限」作为**值**朗读，不读成空。

**[硬] 一个选择器的弹层里只保留一套 listbox/combobox 语义。** 若外层容器带 `role="menu"`，**不要把输入框塞进去**——menu 的键盘模型（方向键在 menuitem 间移动、type-ahead 匹配菜单项）与 combobox（方向键移动高亮、输入过滤）直接冲突。做法是把外壳换成 popover/dialog 类，再按 §11 的内联组合接；不需要换组件库。

---

## 9. 验收清单

**数据**

- [ ] `selectedFilters` 里只有合法 id；改 label / 切语言不影响值
- [ ] `menuDraft` 不出现在 URL 或请求的筛选字段里
- [ ] 过滤到 0 条时 `selectedFilters` 不变，chips/已选标签仍在且可撤销
- [ ] 若实现 P1（列表置顶已选）：置顶行不计入匹配数、不显示为命中
- [ ] 关闭再打开后的草稿状态符合 P2（推荐为空），已选保持
- [ ] 「不限」可键盘到达，与「清空」语义不重
- [ ] 界面能区分「筛选已改」与「结果已刷新」（L2 ≠ L3），且页面 query 草稿没被当成筛选值

**交互**

- [ ] 候选行 hover 不提交、不撤销、不移动焦点
- [ ] hover 与高亮的关系符合已声明的选择（4.2），键盘导航中不把光标抽走
- [ ] 键盘高亮能滚到视野内
- [ ] 指针离开外壳收起菜单不影响已选（若该行为存在）
- [ ] 点击提交后焦点回到输入框（多选）或触发控件（单选）
- [ ] IME 组字中的 Enter 不提交；组字结束后的 Enter 正常提交
- [ ] Esc 关闭不改值；第二次 Esc（若实现）只清草稿
- [ ] 不匹配输入按声明策略处理，已选不变
- [ ] 多选提交后 `menuDraft` 行为与 P3 声明一致，全产品统一
- [ ] 空格在可编辑输入里是文本，不是勾选键

**状态**

- [ ] 空/无匹配/加载/错误四态文案独立；无匹配不清空输入
- [ ] 无匹配判定用匹配数而不是可见行数（有常驻行时尤其要测）
- [ ] 远端失败不回滚已选、不清空列表、不冒充无匹配
- [ ] 快速连续输入时旧响应不会覆盖新结果

**可访问 / 触屏**

- [ ] 键盘可完成「打开 → 过滤 → 选中 → 移除 → 关闭」全程
- [ ] 匹配数/无匹配有播报
- [ ] 行与移除按钮命中区 ≥44px，无 hover-only 操作
- [ ] 真机检查软键盘不遮挡候选，且有不打字的点选路径
- [ ] 容器不带 `role="menu"`；一个弹层内只有一套 combobox/listbox 语义

---

## 10. 来源与核查日期

下表的「可引用点」只写该页明确说到的内容；页面上没有的（阈值、hover/高亮关系、已选是否置顶、IME、重音折叠）不在来源支撑范围内。

| 来源 | 读取方式（2026-10-26） | 可引用点 |
|---|---|---|
| [WAI-ARIA APG · Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | 官方页全文 | select-only / editable 两类；四类 autocomplete；Esc 关闭弹层且不改变已有选择；Enter 接受高亮建议；↓/Alt+↓ 打开 |
| [WAI-ARIA APG · Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | 官方页全文 | 多选推荐「不需修饰键」的模型；focus 与 selection 是两件事；`aria-activedescendant` 是焦点留在输入框的实现手段 |
| [Base UI · Combobox](https://base-ui.com/react/components/combobox) | 官方文档摘录 | 定位为「filterable Select」，不允许自由文本（自由输入指向 Autocomplete）；多选用 chip；所选记录需可解析 label；多选提交后的过滤清空可被取消 |
| `@base-ui/react` **1.9.0**（本机 `frontend/node_modules` 实际安装） | 本地源码 `combobox/root/*.d.ts` | `value` 与 `inputValue` 是两个受控项；`filter` / `filteredItems` 支持外部过滤；`highlightItemOnHover` 可关；`Empty` / `Status` / `Chips` 等状态落点存在 |
| [shadcn/ui · Combobox（Base UI 版）](https://ui.shadcn.com/docs/components/base/combobox) | 官方页摘录 | 多选 = `multiple` + chips 的组合示例；空态由 `ComboboxEmpty` 承担 |
| [Carbon Design System · Dropdown（含 Multiselect / Combo box / accessibility）](https://www.carbondesignsystem.com/building-blocks/core/components/dropdown/guidelines) | 官方页摘录 | 多选勾选时菜单保持打开；已选用计数标签呈现且可一键清空；重开时已选项置顶；filterable 为前缀匹配；Esc 清输入并关闭；可编辑多选里空格是文本 |

---

## 11. 接法取舍：内联 combobox（推荐）还是 button-trigger combobox

前提（硬）：**外层容器必须是 popover / dialog 类，不能是 `role="menu"`**（见 §8）。若现有外壳是 menu，把外壳换掉即可，不需要连带换组件库。

**A. 既有 Popover 外壳 + `Combobox.Root` 内联打开，不渲染 `Combobox.Popup`（推荐）**
组合方式：外壳（Popover）负责打开/关闭、hover、定位与层级；内层只渲染 `Input` + `List`（listbox），**不产生第二个 Portal**，因此整页仍只有一个浮层、一套定位、一套关闭路径。

职责切分：

- 内层管：输入、过滤、listbox 高亮与键盘（↑↓ / Home / End / Enter）。
- 外层管：开合、hover/指针离开、定位、焦点回到触发控件。
- **Esc、以及「选中后关闭」这类关闭请求，显式交给外壳执行**——不要指望组件默认的弹层行为，因为该组合下它没有自己的弹层。
- 内层的 open 状态由外壳驱动，`aria-expanded` / `aria-controls` 指向外壳里那个 listbox；避免两套 open 状态互相打架。

代价与注意：凡是「与 popup 绑定」的默认行为（点选关闭、Esc、点外部关闭、层级与滚动锁定）都要显式接管并逐条验收；这是这个组合唯一的额外工作量。

**B. 官方 button-trigger combobox（输入在 popup 内）**
`Combobox.Trigger` 是按钮，弹层与输入由组件自己管理：单一弹层、单一键盘与焦点模型，语义最干净；Base UI 文档把 `Combobox.Label` 描述为 input-inside-popup 模式下的触发控件标注，说明这是被支持的形状。
代价：**没有原生 hover 打开**，要自己桥接指针事件，且桥接必须遵守 4.2/4.3（不移动焦点、不改值）；hover 手感要重新调。

**已有可靠 Popover，且必须保留它的 hover／定位手感时，优先 A。** 它不引入第二个浮层，改动集中在「让内层不渲染弹层 + 关闭请求交给外壳」。从零开始、只需点击／键盘选择时，优先 B，让官方 Combobox 自己拥有完整弹层生命周期，不先造外壳。两者都须验证关闭／焦点／IME，不把某一项目的最小改动当成所有产品的默认架构。
