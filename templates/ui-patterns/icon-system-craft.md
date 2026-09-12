---
name: icon-system-craft
description: >-
  Two-track icon craft for product UI: Track A in-app chrome separates a
  stable production line from a small authored-exception path; Track B
  brand/favicon is not this file. Distilled from Marek Minor / Minor
  Adventures and the Runeicons authoring workbench audit. Not an icon asset pack.
---

# Icon system craft

类型：Craft handbook（非 icon 资源包、非自研 icon font 教程）

| | |
|---|---|
| **What** | 产品内 **chrome 图标**（toolbar / nav / empty-state）的选型、尺寸、光学一致性、禁止事项。默认缺的是纪律，不是再画 600 个；只有产品专属语义进入 authored exceptions。 |
| **Why** | Lucide / Heroicons / Iconify 到处都是（shadcn + Tailwind），会显得「默认 SaaS」。系统感来自规则 + 同档里更有味道的线标，不是来自换库圣战。 |
| **Who** | 工具面 / agent UI / SaaS 后台 / 个人站导航。 |
| **How to use** | 先分 Track A / B；chrome 过 §0–§4；整站换库前过 §6。需要产品专属概念再考虑定制，不要默认定制。 |
| **Not this** | 不是 favicon / wordmark / OG 指南；不是让现有 qiancheng-yusuan / chuhai-cloud 换库；不是 fork Cursor 图标；不是 Imagine prompt 手册。 |
| **Source** | [The making of Cursor's icons — Minor Adventures](https://www.minoradventures.co/blog/the-making-of-cursors-icons)（Marek Minor, Jul 2026）。**只服务 Track A 光学/纪律**，非逐字复制。 |

---

## 0. Two tracks（先分轨，再选库）

| Track | Job | Default |
|---|---|---|
| **A. Chrome**（in-app tool icons） | Quiet, `currentColor`, one stroke, one concept one glyph | 一套生产级线标 + 纪律。toolbar / nav / empty-state chrome。 |
| **B. Brand / favicon / OG mark** | IP, recognition, tab icon | Custom SVG 或外部生图。**禁止**把 chrome 线标放大当 favicon。 |

Quiet chrome vs loud brand。Cursor making-of = Track A 光学源，不要偷它的场面去做 logo。

**Iconify is a pipe, not a look.** 它只负责取 glyph。Heroicons = Tailwind 家徽；Lucide = Feather fork / shadcn 默认。所以它们看起来「正常」——到处都是，不是因为它们差。

### 一等图标决策：生产线与制作台

| 路径 | 候选 | 适用 | 边界 |
|---|---|---|---|
| **稳定生产线** | **[Iconoir](https://iconoir.com/)** | 常规 nav / toolbar / object / status；中性但有设计人格，React 包已发布 | 一项目一套，Provider 锁 stroke / size |
| **Authored exceptions 制作台** | **[Runeicons](https://runeicons.com/)** | 通用库表达不了的 3–8 枚产品专属语义；浏览器改路径、style、motion 后导出 SVG / JSX | 与 Iconoir 平级进入决策，但当前 WIP、无 release、packages private；只导出源码，不装 runtime，详见 [`runeicons-authoring-workbench.md`](./runeicons-authoring-workbench.md) |

“平级”指两条路径都合法，不指同一 toolbar 两套字形轮流上。普通 glyph 仍走稳定生产线；Runeicons 只做可登记、可解释、数量封顶的 signature semantics。

### Same-class, more character（仍 MIT/open，仍产品 UI）

同档 = 已 ship 的生产级线标，不是小众实验集。

- **[Radix Icons](https://www.radix-ui.com/icons)** — 15×15，WorkOS/Modulz，dense tools，非常安静，16px 档比 Lucide 更「被设计过」。新 B2B chrome 要少一点 starter 味，首选。
- **[Phosphor](https://phosphoricons.com/)** — 六档字重，metaphor 更全，略更 authored。导航选中需要 regular+bold 时用。
- **[Iconoir](https://iconoir.com/)** — 当前稳定生产线首选；更手绘一点，仍是系统。
- **[Tabler](https://tabler.io/icons)** — 体量巨大，比 Lucide 多一点个性，仍偏 generic-adjacent。

**不要：** Hugeicons / Solar 3D、emoji、国旗当语言、同一 toolbar 混两套线标。

### Liz default（本手册之后）

- **已上线 OA**（qiancheng-yusuan / chuhai-cloud）：**继续 Lucide**。优化 stroke + 概念表，**不要迁库**。
- **新内部工具**想少一点「每个 shadcn starter」：优先 **Radix Icons**（dense）或 **Phosphor**（字重）。语言切换仍用 Heroicons `LanguageIcon`（U-R13）。
- **个人站**：Heroicons 即可（已经是家徽）。
- **永远不要**把 chrome 集当 favicon。

### Track B stub

本仓库**没有** Genre-B 文件。品牌 mark = 手绘 SVG 或仓库外的 Imagine / brief；**不要在本文件写 Imagine prompt**。路由：pack README「品牌/OG/生图」行 · [`inspiration-sources.md`](../inspiration-sources.md) 的 Logo / OG 行。Quiet chrome 与 loud brand 分轨。

---

## 1. Chrome 执行栈（先执行，再谈定制）

1. **库**：按 §0 选**一套稳定生产线**写进 DESIGN.md；若启用 Runeicons，再单列 `authored exceptions = <3–8 concepts>`，导出物必须遵守同一 viewBox / stroke / size。Iconify 若已在项目里，只当管道，不当风格。语言切换用 Heroicons `LanguageIcon` inline（U-R13），**不要换字形**，只调 stroke / 字重。
2. **描边 / 字重**：可调 stroke 的集（Lucide / Tabler / Iconoir）产品 UI 默认 **1.5–2**；游戏/像素字体旁可到 **2.5 + round cap/join**。Phosphor 用 **regular** 作 chrome，选中可用 **bold**；Radix 按 15 光学，不要硬调 stroke。全站统一一档，禁止一页混 1 / 1.5 / 2.5 或 regular+duotone 乱炖。
3. **尺寸档**（光学尺寸思维，不是单一 SVG 瞎放大）：

| 用途 | 渲染边长 | 备注 |
|---|---|---|
| 表格内联 / meta | 14–16px | 与 12.5–13px 正文并排 |
| 默认控件 / 导航 | 16–18px | 主档；Radix 按 15 光学贴近此档 |
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
7. **圆角「刚好够」**：不要几何到冷，不要泡到 sticky-note。所选集的默认 cap/join 通常可用；若项目改 `stroke-linecap`，全局一致。
8. **Filled vs Outline**：导航选中态可用 filled/加重；默认 chrome 用 outline。不要同一层级随机混。

---

## 3. 光学修正（定制或审稿时）

自绘或改 path 时才深挖；用现成线标时用它们检查「并排是否违和」：

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

- [ ] 同一屏 stroke / 字重档位只有一种  
- [ ] 同一概念未出现第二枚 glyph  
- [ ] 14/16/24 三档并排不「一头细一头粗」  
- [ ] 深/浅主题下对比度足够（灰 on 灰失败 = 不及格）  
- [ ] 窄屏导航 icon+label 不溢出；无 label 时有 aria  
- [ ] 无 emoji 充当产品 icon（U-R13）  
- [ ] 未把 chrome 线标放大当 favicon / OG mark  

---

## 6. 何时才自研 / 扩库

| 信号 | 动作 |
|---|---|
| 所选线标集覆盖 95%+ 常规 chrome | **停止**，只维护概念表 |
| 反复出现产品专有对象（并行 agent、计费 compute、行业器械） | 先组合现有 icon + 文案；仍不够再用 Runeicons 制作台定制 1 个 metaphor，按固定 commit 导出源码 |
| 继承旧库 codepoint 必须无断替换 | 才需要 Cursor 级 font + migration dashboard（多数 Liz 项目 **不需要**） |
| 品牌 logo / 文件类型色标 | 走 Track B 品牌资产，不进 chrome 线标混排 |
| 已上线产品「Lucide 到处都是」的不适 | **不迁库**。先修概念表与 stroke；新项目再选 Radix / Phosphor |

配套交付若真做定制集：Explorations（尝试）/ Overviews（审计 recurring parts）/ Icons（终稿组件）三层；外加「概念→icon」唯一表。多数项目一张 markdown 概念表就够。

---

## 7. 反模式

- 从 Dribbble 下一堆风格不一的 SVG 塞进同一 toolbar  
- 每个功能换一个多色 3D icon「增加活力」  
- 用国旗、emoji、Lottie 代替系统 icon  
- 16px 路径直接 `scale(2)` 当 empty-state 主视觉  
- 无概念表导致 settings 三兄弟并存  
- 为「有自己的 icon font」而启动一年工程（除非你是 Cursor）  
- 逼已上线 OA 从 Lucide 迁到另一套「更有味道」的线标  
- 把 Lucide / Radix / Phosphor 当 favicon 或 wordmark  

---

## 8. 开火路径（一杯咖啡）

1. 打开项目 DESIGN.md，写死：`icon track = A`、`production line = <Iconoir | Radix | Phosphor | Lucide-keep | Heroicons>`、`authored exceptions = none | <最多 3–8 concepts>`、`stroke/weight = X`、`sizes = 16/18/24`。已上线 Lucide **填 Lucide-keep**；Runeicons 只能填 exceptions，不能冒充已发布生产线。
2. 建 `docs/icon-concepts.md`：10–30 行 `概念 | icon名 | 备注`。  
3. 扫一遍主导航 + 表格行操作，杀掉重复概念。  
4. 截图 1440 与 390 宽各一，看线重与对齐。  

参考实现习惯：工具面配 IBM Plex / Inter；agent 面板可对参 `design/beautiful-ui-ai-interfaces/` 的 hairline + mono 标签气质。
