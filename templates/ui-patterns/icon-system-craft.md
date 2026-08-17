---
name: icon-system-craft
description: >-
  Icon selection and optical discipline for product UI (Iconify/Lucide default).
  Distilled from Marek Minor / Minor Adventures “The making of Cursor's icons”
  (2026-07) plus Liz stack conventions. Not an icon asset pack.
---

# Icon system craft

类型：Craft handbook（非 icon 资源包、非自研 icon font 教程）

| | |
|---|---|
| **What** | 产品图标的**选型、尺寸、光学一致性、禁止事项**。默认栈 = Iconify + Lucide（见全局 U-R13）；缺的是纪律，不是再画 600 个。 |
| **Why** | 散装图标会让界面「像拼盘」：线宽不齐、方框填满、斜线方向乱跳。系统感来自规则，不是来自换库。 |
| **Who** | 工具面 / agent UI / SaaS 后台 / 个人站导航。 |
| **How to use** | 新功能选 icon 前过 §2–§4；整站换库前过 §6。需要产品专属概念（agent / 并行线程 / Bugbot 类）再考虑定制，不要默认定制。 |
| **Not this** | 不是让你 fork Cursor 图标；不是替换 Lucide 的命令；不是品牌 logo 指南（logo → Genre-B brief）。 |
| **Source** | [The making of Cursor's icons — Minor Adventures](https://www.minoradventures.co/blog/the-making-of-cursors-icons)（Marek Minor, Jul 2026）。机制提炼，非逐字复制。 |

---

## 1. Liz 默认栈（先执行，再谈定制）

1. **库**：Iconify 拉 **Lucide** 为主；语言切换用 Heroicons `LanguageIcon` inline（U-R13），**不要换字形**，只调 stroke。
2. **描边**：产品 UI 默认 **1.5–2**；游戏/像素字体旁可到 **2.5 + round cap/join**。全站统一一个 stroke 档，禁止一页混 1 / 1.5 / 2.5。
3. **尺寸档**（光学尺寸思维，不是单一 SVG 瞎放大）：

| 用途 | 渲染边长 | 备注 |
|---|---|---|
| 表格内联 / meta | 14–16px | 与 12.5–13px 正文并排 |
| 默认控件 / 导航 | 16–18px | 主档 |
| 空状态 / 营销强调 | 20–24px | 可稍加细节；勿把 16 档直接 scale×2 当「大图标」却不换视觉重量 |
| ≥28px | 少用 | 更像 illustration；考虑插画或品牌 mark，而不是线标放大 |

Cursor 原作对「双光学尺寸」的论证：16@1.25 stroke 适合 12–20；≥22 换 24@1.5。我们不自绘两套 font，但**禁止**用同一路径从 14 拉到 32 还指望一样精致。

4. **颜色**：走当前主题 `ink` / `ink-2` / `accent`；禁止图标自带与系统无关的多色（品牌 logo 除外）。

---

## 2. 选型纪律（每天都用）

1. **一个概念一个 glyph**。同一产品里「设置」不要混 `settings` / `sliders` / `wrench`。建一张小表：`概念 → icon 名`（Cursor 的 Concepts 页逻辑）。
2. **先搜任务词，再搜物体名**。用户想的是「搜索」不一定叫 `search`，也可能是 `magnifying-glass`；用语义标签对齐，避免重复概念。
3. **闭合优先于装饰性开口**。小尺寸下开口形状更易糊；技术工具风 = 简单、闭合、少假阴影。
4. **斜线/取消是平切**，不要「投下的假深度阴影」。
5. **自然比例**：高的物体保持高（pencil），宽的保持宽（banknote）。把一切塞进正方形再描边 = 玩具感（toy look）来源。
6. **方向跟品牌指针**：若产品有明确对角线（logo / pointer），可走同一方向；**slash / ban** 走反向。没有品牌指针时：统一「右上为前进」，slash 左上→右下，并写进 DESIGN.md 一句。
7. **圆角「刚好够」**：不要几何到冷，不要泡到 sticky-note。Lucide 默认 round 通常可用；若项目改 `stroke-linecap`，全局一致。
8. **Filled vs Outline**：导航选中态可用 filled/加重；默认 chrome 用 outline。不要同一层级随机混。

---

## 3. 光学修正（定制或审稿时）

自绘或改 path 时才深挖；用 Lucide 时用它们检查「并排是否违和」：

| 问题 | 做法 |
|---|---|
| 交叉口发黑、发堵 | Optical break：交接处微缺口（类字体 ink trap） |
| 多线汇合过重 | 局部 stroke thinning |
| 点（dot）角色不同 | 线端点 / 「更多」/ 独立圆点 **不同直径**，不要一个 size 打天下 |
| 叠形间隙 | Cut gap ≥ ~3px（16 网格语境）；&lt;2.5 易糊成一团 |
| 圆 vs 方视觉大小 | 圆要略大于方才「看起来一样大」（optical shapes） |

0.25px 级差异在 16px 几乎说不清，但并排一扫就能感到「这套是不是一只手画的」。

---

## 4. 产品 UI 放置规则

1. **图标不承担唯一信息**：按钮/行必须有可见文字，或 `aria-label` + tooltip；图标按钮最小点击 44×44（触控）或 32×32（密集桌面工具，需 DESIGN 声明）。
2. **与数字/mono 并排**：状态 chip 里 icon 与 JetBrains/IBM Plex Mono 数字对齐中线；表格操作列 icon 垂直居中于行高。
3. **加载/空态**：用同一套库的 `loader` / `inbox` / `file-question`，不要突然换插画风。
4. **Agent 概念**（thinking / tool / approval）：优先复用 beautiful-ui 语义（chip、trace），icon 只做缀饰，不靠生僻 metaphor 炫技。
5. **i18n**：语言切换固定 LanguageIcon；不要国旗当语言（U-R13）。

---

## 5. 验收（贴图标后必做）

- [ ] 同一屏 stroke 档位只有一种  
- [ ] 同一概念未出现第二枚 glyph  
- [ ] 14/16/24 三档并排不「一头细一头粗」  
- [ ] 深/浅主题下对比度足够（灰 on 灰失败 = 不及格）  
- [ ] 窄屏导航 icon+label 不溢出；无 label 时有 aria  
- [ ] 无 emoji 充当产品 icon（U-R13）

---

## 6. 何时才自研 / 扩库

| 信号 | 动作 |
|---|---|
| Lucide 覆盖 95%+ 常规 chrome | **停止**，只维护概念表 |
| 反复出现产品专有对象（并行 agent、计费 compute、行业器械） | 先组合现有 icon + 文案；仍不够再定制 1 个 metaphor |
| 继承旧库 codepoint 必须无断替换 | 才需要 Cursor 级 font + migration dashboard（多数 Liz 项目 **不需要**） |
| 品牌 logo / 文件类型色标 | 走品牌资产，不进 Lucide 混排 |

配套交付若真做定制集：Explorations（尝试）/ Overviews（审计 recurring parts）/ Icons（终稿组件）三层；外加「概念→icon」唯一表。多数项目一张 markdown 概念表就够。

---

## 7. 反模式

- 从 Dribbble 下一堆风格不一的 SVG 塞进同一 toolbar  
- 每个功能换一个多色 3D icon「增加活力」  
- 用国旗、emoji、Lottie 代替系统 icon  
- 16px 路径直接 `scale(2)` 当 empty-state 主视觉  
- 无概念表导致 settings 三兄弟并存  
- 为「有自己的 icon font」而启动一年工程（除非你是 Cursor）

---

## 8. 开火路径（一杯咖啡）

1. 打开项目 DESIGN.md，写死：`icon stack = Iconify/Lucide`、`stroke = X`、`sizes = 16/18/24`。  
2. 建 `docs/icon-concepts.md`：10–30 行 `概念 | icon名 | 备注`。  
3. 扫一遍主导航 + 表格行操作，杀掉重复概念。  
4. 截图 1440 与 390 宽各一，看线重与对齐。  

参考实现习惯：工具面配 IBM Plex / Inter；agent 面板可对参 `design/beautiful-ui-ai-interfaces/` 的 hairline + mono 标签气质。
