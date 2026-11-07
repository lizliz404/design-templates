---
name: nav-still-band-dropdown
description: >-
  「静止带」顶栏下拉模式：一份共享不透明 surface（CSS :has 开合、项间构造性零动画）+ per-item 透明走廊层 + 整块文字层按 pointer 方向左右渐隐渐显 + hover-intent linger 走廊。Use when 做或修企业站 nav dropdown / mega-lite menu，项间切换时背景在动（半透明带互叠下陷、底边 hairline 跳）；panel「hover 一下就消失」、斜向移动够不到子项；要做 Vercel/Fugro 那种表面纹丝不动、只有文字换一次方向性淡出的开合；或要给 dropdown 写可判定的验收（像素级静止 + 子项可达 + 无 JS/键盘/PRM 合同）。
---

# 静止带 nav dropdown：共享表面、方向性文字交换、时间走廊

一套顶部下拉合同的终态实现：**背景层在项间切换时一个像素都不许动，动的只有纯文字层；整块 menu 是一个可悬停主体，pointer 能从 trigger 直接进 panel 点任何子项**。上游：Vercel 顶栏（`cases/vercel-rea/`）、Fugro TOP drawer 参数（`cases/fugro-rea/shots/search-panel.png`、`evidence/audit/chunk-545`）；实现参考 CFE `cfe-app`（commit 2c22499 + 走廊修复）：`src/layouts/BaseLayout.astro:208-214`、`src/styles/global/header.css:240-375,422-475`、`src/scripts/site.ts:37-134`。相关但不重叠：[`ui-patterns/header-nav-and-jump-bar.md`](./ui-patterns/header-nav-and-jump-bar.md) 管下划线手势、scrim、几何死带，本文管「项间切换时表面怎么办」。

```text
nav
└─ .nav-band            唯一共享表面：paper 底 + 底边 hairline，:has() 开合
└─ ul
   └─ .nav-item.has-panel × N
      ├─ a.nav-link               trigger
      └─ .nav-panel               透明层：定位 + hover 走廊 + 延迟隐藏
         └─ .nav-panel-inner      唯一会动的层：整块文字，方向性渐隐渐显
```

## 流程（何时跑、按序做什么、终点怎么判）

**何时跑**：nav dropdown 被报「背景乱动」「闪」「悬一下就没了」；或新做单层下拉（≤7 个一级项、每项一层内容）想要 Vercel 式静止表面。

**按序**：

1. **把 surface 和内容分家**。表面只允许一个元素（`.nav-band`）：absolute 贴 sticky header 底边、`left/right:0` 全宽、承载底色+唯一边线。per-item 的 `.nav-panel` 只留几何+走廊，剥掉 background/border/opacity。项间切换时内容换、surface 不换。
2. **开合条件用 `:has()` 一个真理源**。`.desktop-nav:has(.nav-item.has-panel:is(:hover,:focus-within,.is-open):not(.is-suppressed))` 同时喂 band、页面 scrim、header hairline 让位——三个消费者读同一条件，项间挪 pointer 条件不中断，由构造保证零闪烁；首开/关闭仍是 opacity 一次性开合。
3. **文字层只动一次、只动 transform+opacity**。整块 `.nav-panel-inner` 按 `data-panel-dir` 方向渐隐渐显：fwd=旧组 +x 淡出/新组 −x 淡入，back 镜像，未设=纯 fade（首开/关闭/无 JS）。位移 ≤0.75rem、总量 ≤250ms、缓动吃既有 token。
4. **走廊用时间补，不用形状猜**。pointerleave 不立刻断供：item 留 `.is-open` linger ~250ms，期间 panel 保持 `visibility:visible;pointer-events:auto`；pointer 赶到即重新 `:hover`。同时只能一个 item linger，进新 item 清掉别人的。
5. **终点判定**：下面验收清单全绿——不是「看着不动」，是逐帧像素一致、子项真的点得到。

### 验收清单（照抄可跑）

- band 表面截图在项间连续 N 帧与稳态参照**逐字节一致**（把文字层 `visibility:hidden` 隔离后截 `.nav-band`）；`rect/opacity` 恒定、scrim 恒 1。
- pointer 从 trigger 垂直下移进 panel、在 panel 内漫游（含内容外空白边）band 不关；斜移进远端子项不抽风。
- 子项链接 `elementFromPoint` 命中自身，点击真的跳到对应页。
- 键盘 Tab 进 panel 同权（focus-within 开、dir 照样盖章）；Esc 关 band 且 hover 中不重开；PRM 下无动画直接可交互；无 JS hover 全开、面板可用。

## 机制依据

### 它修掉的三个失败模式（都实测过）

1. **per-item band crossfade 下陷**：每项各背一份同坐标全宽纸带，项间 = 两条半透明带互叠，中点等效 ~75% 不透明 → 页面内容透出成一块「下陷色」，这就是「背景在动」的物理来源；再叠加各 panel 高度差，底边 hairline 跟着跳。单一 `.nav-band` 从构造上删除这个病（它没有「切换」这个动作）。
2. **断走廊**：panel 居中、trigger 右对齐时，斜移路径必穿 `.desktop-nav` 死区/相邻 item——`:hover` 一断 `pointer-events:none` 立即生效，之后 pointer 永远够不到 panel（`elementFromPoint` 命中的是 panel 下面的 hero/页面），表现为「hover 一下就消失」「子项点不到」。`.is-open` linger 把走廊从空间改成时间：离开不等于立刻死。
3. **文字「两拍闪替」不是方向感**：per-li 交错+微 blur 的闪替没有方向语义，且每个 li 一个 transition 显得碎。整块 inner 一次位移才是「沿 pointer 方向换内容」。

### 逐件职责与参数

| 件 | 职责 | 关键参数（CFE 实测值） |
|---|---|---|
| `.nav-band` | 唯一表面。`:has()` 开=opacity 250ms `--ease-out` + `visibility` 延迟收；项间条件不中断 → 零动画 | `top:100%;left/right:0;height:var(--nav-panel-h,14.5rem)`；`background:var(--paper);border-bottom:1px solid var(--line)` |
| `.nav-panel`（per item） | 定位+走廊：同坐标 absolute、`min-height:var(--nav-panel-h)`（走廊盖满整条带）、`visibility` 延迟 250ms 隐藏（给内容退出留时间）、非开态 `pointer-events:none` | 无表面属性；`:hover/:focus-within` 态 `z-index:1`，`.is-open` 态**不**给 z-index（只是走廊，不得压新开的 panel） |
| `.nav-panel-inner` | 唯一运动层，整块一次 | 休止=`opacity:0;translateX(var(--panel-out))`；退出 transition 150ms `--ease-inout`；进入 `@keyframes nav-panel-in` 250ms `--ease-out` both |
| `data-panel-dir` | 方向盖章：`fwd→ --panel-out:+.75rem/--panel-in:−.75rem；back` 镜像；unset=0 | JS 在 pointerenter/focusin 时按 item 序号差盖章，同一 item 重进不重盖 |
| `--nav-panel-h` | band 与走廊的统一高度 | JS 取 `max(.nav-panel-inner offsetHeight)`（load + fonts.ready + resize）；CSS fallback 须 ≥ 实测最高条（CFE 各宽 200–223px → 14.5rem） |
| `.is-open` linger | hover-intent：pointerleave 后 item 保 is-open 一个 `--dur-ui`（250ms）；scrim/hairline/band 的 `:has` 把它当 hover 同权 | 单件制：进任一 panel item 清掉兄弟的 is-open；focusout/Esc 同步清 |
| `.is-suppressed` | Esc 主动关闭，压过 hover 直到 pointer/focus 离开 | suppressed 的 inner 规则要排在 hover 规则**之后**（同 (0,3,1)，靠源码序赢），否则内容卡在 opacity:1 |
| scrim/hairline | `body::after` 压暗 + header 底边让位，与 band 同 `:has` 源 | scrim `position:fixed;inset:var(--header-h) 0 0 0;opacity` 250ms |

### 走廊几何（先于动效验收）

- item 盒子必须**顶到 header 底边**（padding-bottom + 负 margin 把 hover 盒延进 header 的 padding 带），否则 trigger 到 panel 之间就是死带——详见 `header-nav-and-jump-bar.md` §4.1 的实测。
- `.nav-panel` 的 `min-height` 必须 ≥ band 高：pointer 在带内任意位置（含内容外的边）都算在 item 上。
- 方向感方向约定：**fwd = pointer 向右进**——旧内容 +x 出、新内容 −x 入；back 全镜像。两组并行交换，不是先出后入。

### do / don't

**do**

- 表面一个元素、条件一个 `:has()`：band/scrim/hairline 同一条件喂，项间天然不闪。
- 无 JS 全开：hover/focus-within 走 CSS，JS 只补 `aria-expanded`、Esc、dir 盖章、量高度、linger——JS 挂了只是没方向感和 linger，基础开合照常。
- linger 只保「走廊可命中」，内容层退出照常（inner 只认真 `:hover`）——保留下来的 panel 是看不见的空走廊，语义诚实。
- PRM 关法=不安装：`.nav-band/.nav-panel-inner` 的 transition+animation 全 none，hover/focus-within 态的 `animation` 也要点名关（同 specificity 靠后赢），功能不丢。
- 高度用 JS 实测写 var，CSS 给一个 ≥ 最大实测的 fallback；不要把 px 写死在 band 上。

**don't**

- 不要让每份 panel 自己背 surface 再 crossfade——两个半透明纸面必叠出下陷。
- 不要给 linger 态的 panel 加 z-index——它是空走廊，压住新开的 panel 会反抢 hover。
- 不要把开合搬进 JS（class 开关驱动），否则 no-JS 与 focus-within 合同一起退化。
- 不要让内容分拍闪替/上 blur/做高度补间——动的只是整块文字的一次左右渐隐。
- 不要用 Amazon 三角形之外还想靠 JS 判「斜移 intent」——250ms 时间走廊已覆盖斜穿死区/邻项的路径；sibling link 被真 hover 本来就该换。

## 边界（硬性 guardrail）

- 项间切换的允许运动集 = `.nav-panel-inner` 的 `transform`/`opacity` 两项；surface、scrim、几何、hairline 全部静止。
- 交换总量 ≤250ms；位移 ≤0.75rem；不新造缓动/时长参数，消费项目 token。
- 首开/关闭合同不变：band opacity 一次性开合；linger 只延迟「条件释放」，不是第二次开合。
- 合同项不可降级：无 JS 可用、focus-within 同权、Esc 抑制、PRM 全关。
- 多 panel 项高度必须统一（grid 行数/内容对齐），高度差大到对不齐 = 升级决策点，不拿补间遮。

## 证据链

- CFE 终态实现：`cfe-app/src/layouts/BaseLayout:213`（`.nav-band` 挂点）；`src/styles/global/header.css:253-281`（band）、`:282-309`（透明 panel+走廊）、`:313-371`（方向渐隐+suppressed+PRM）、`:429-475`（body:has scrim/hairline/overlay）；`src/scripts/site.ts:51-105`（dir 盖章、linger、量高）。
- 实测病历：per-item crossfade 中点 ~75% 覆盖透出（w-nav-still 回执）；断走廊 `elementFromPoint→SECTION.hero`（nav-corridor 复现脚本）；PRM animation 优先级盖过 kill；suppressed inner 优先级输 hover——四个都是「看着对、逐帧/逐像素才露」的病。
- 对标：Vercel 顶栏单 band 换内容（`cases/vercel-rea/`）；Fugro TOP drawer 只开一次、项间面板静止（`cases/fugro-rea/evidence/audit/chunk-545`、`shots/search-panel.png`）；Fugro 内容位移签名 `x:12`、easeInOutSine `cubic-bezier(.45,0,.55,1)`——CFE 的 ±0.75rem/`--ease-inout` 即此档。
- 相邻文档：[`ui-patterns/header-nav-and-jump-bar.md`](./ui-patterns/header-nav-and-jump-bar.md)（下划线 replay、chromeless scrim、`--header-h`、死带几何）。
