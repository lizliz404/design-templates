---
name: multi-pane-scroll-architecture
description: >-
  多栏工作台（sidebar + 主内容 + 右侧面板）的滚动与交互合同：壳锁视口、
  每栏自滚、overscroll-behavior 断链、画布自吃 wheel、聊天「在底部才跟滚」+
  跳底按钮、hover+focus 行内动作、auto-fill 卡片网格与容器查询、M3 断点
  rail/抽屉化。Use when 多栏滚动耦合、中间栏滚不动、画布滚轮带动全页、
  列表行 hover 动作可及性、卡片列数锁死、分页上方空白、窄屏三栏失效；
  页面级编排走 ai-workspace-surfaces，画布对象协议走 artifacts-canvas-workbench。
---

# 多栏工作台滚动与交互合同 · 壳锁视口，栏自滚，画布自吃滚轮

研究日期：2026-11-21。任务背景：三栏工作台（左会话列表 / 中聊天+画布 / 右货架选品）生产实测滚动基本不可用——中间聊天区滚不动、画布上滚轮带动三栏、货架卡锁死两列、分页上方大片空白、窄屏聊天冻结。本文是 Exa 先搜后读的全局归纳，不绑定任何单一仓的实现；每条结论带本会话打开过的一手来源，怎么修由消费方 DESIGN.md 决定。

一句话结论：**应用壳锁死视口高度（body 永不滚），每栏自己当滚动容器并用 `overscroll-behavior: contain` 到边断链；嵌入画布自己消费 wheel；聊天贴底 =「在底部才跟滚」+ 跳底按钮；列表行动作 hover 只是与 focus 并列的触发器之一；卡片网格 `auto-fill minmax` 自适应、进阶用容器查询随栏宽变；窄屏按 M3 断点把侧栏降为 rail / 抽屉。滚动分发的默认答案不需要一行 JS。**

```text
app-shell · height:100dvh · overflow:hidden        ← body 永不滚
├─ 左会话 rail ──── min-h-0 · overflow-y:auto · contain
├─ 中 main ──────── min-h-0
│   ├─ chat log ─── 自滚 · 在底部才跟滚 · 跳底 pill
│   └─ canvas host ─ 画布内部消费 wheel（pan/zoom，不外溢）
└─ 右货架 panel ─── min-h-0 · 自滚 · auto-fill 网格 · 分页贴内容流
```

## 0 · 症状 → 结论速查

| 生产实测症状 | 对症章节 | 一句话机制 |
|---|---|---|
| 中间聊天区完全滚不动 | §1 | 中间列没拿到滚动权：flex 子项默认 `min-height:auto`，链条断在第一层 |
| 画布上滚轮带动三栏 | §1 §3 | 没有任何一栏消费 wheel → scroll chaining 上交；画布未自吃滚轮 |
| 货架卡锁死两列 | §5 | 固定 `grid-cols-2` → `repeat(auto-fill, minmax(...))` |
| 分页上方大片空白 | §6 | 分页条钉死栏底 + 页大小固定不满铺 → 贴内容流/满铺页大小 |
| 会话行想 hover 铅笔 | §4 | hover 与 `:focus-within` 双揭示、DOM 常在、⋯ 菜单兜底 |
| 窄屏聊天冻结 / collapse 坏 | §1 §7 | 视口锁用 100dvh；窄屏侧栏降 rail / 抽屉，collapse 常驻可点 |

## 1 · 滚动架构：壳不滚，栏自滚，到边不外溢

**是什么**：应用壳一根 flex/grid 链锁 `height:100dvh`（视口过矮时回退页面滚动是合理底仓），壳层 `overflow:hidden`；每个 pane 写 `min-height:0` + `overflow-y:auto` + `overscroll-behavior:contain`；`scrollbar-gutter:stable` 防内容因滚动条出现而横跳。

**为什么（原生机制，不是谁的自造协议）**：wheel 事件的默认动作由浏览器执行，元素不可滚时可能根本不产生滚动（[MDN WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)）；手势落在光标下的元素、由最近可滚祖先消费，这正是原生「鼠标在哪栏滚哪栏」。要补的只有两件事：

1. **栏必须真的是滚动容器**。W3C Flexbox 规范规定 flex 子项的 automatic minimum size 默认是 `auto`（[§4.5 Minimum Sizes of Flex Items](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)）——不写 `min-height:0`，中间列会被内容撑高而不是把高度约束留给滚动容器。「中间滚不动」最常见的就是链条上某一层漏了 `min-height:0`。
2. **到边断链**。浏览器默认行为是 scroll chaining：子滚动区到边界后手势上交、背后的祖先开始滚（[Chrome Developers：CSS overscroll-behavior](https://developer.chrome.com/blog/overscroll-behavior) 把 app drawer 列为典型例子）；`overscroll-behavior: contain` 一行断链，且明确没有 JS hack（touch 监听/锁 100vw）的性能代价。值的完整语义见 [MDN overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior)：`contain` 断链但保留本节点 overscroll 效果，`none` 连效果一并禁。

**谁在用/参照**：AdminVora 的 [Layout Anatomy](https://adminvora.net/docs/05-layout/01-layout-anatomy.html) 把整套模型写成文档——shell `100dvh` 不滚、全页唯一滚动区 `.av-content`、`overscroll-behavior: contain` + `scrollbar-gutter: stable`，并列出收益（无双滚动条、无 fixed/z-index 打架、各区域滚动位置独立）。这是「壳不滚、内容滚」模式的现成参考实现，机制归属仍是上面的浏览器文档。

**怎么落到三栏**：壳层 100dvh + `overflow:hidden` 方向对就别动；逐栏补 `overscroll-behavior:contain`；沿「shell → grid → panel → log」全链检查 `min-height:0`（或 grid 侧 `min-height`/`minmax` 约束），一层漏就整列失去滚动权。

```css
.app-shell { height: 100dvh; overflow: hidden; }            /* body 永不滚 */
.pane      { min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
```

## 2 · 聊天贴底：在底部才跟滚 + 跳底按钮，不抢用户滚动

**是什么**：滚动容器内用 `scrollTop + clientHeight >= scrollHeight - 阈值` 判定 `isAtBottom`（Vercel 参考实现取 100px）；在底部时流式增长平滑跟滚；用户一上翻立刻停跟；不在底部时浮出「N 条新消息 / 跳到底」pill。

**为什么**：流式内容持续长高，无条件 `scrollTo` 会劫持正在读历史的用户；阈值判定是行业最小实现。读位漂移另有浏览器级 scroll anchoring 兜底——`overflow-anchor` 默认开启、2026-09 起 Baseline（[MDN overflow-anchor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-anchor)）；Safari 的缺口由贴底库自己补。

**谁在用**：

- [Vercel chatbot（Next.js AI chat 参考实现）的 `use-scroll-to-bottom.tsx`](https://github.com/vercel/ai-chatbot/blob/c2f8235e/hooks/use-scroll-to-bottom.tsx)：`isAtBottom` state + `isUserScrollingRef` + 平滑 `scrollToBottom`，滚动停顿后恢复判定——贴底与跟滚判定的完整参考代码。
- [use-stick-to-bottom](https://github.com/samdenty/use-stick-to-bottom)（MIT、零依赖）：为 AI chat 设计，ResizeObserver 检测内容长高、支持内容缩短不丢贴底、自行处理 scroll anchoring；npm 页面快照周下载 7M+（[npm](https://www.npmjs.com/package/use-stick-to-bottom)）。
- [Tori Bryan Jump bar](https://www.toribryan.com/components/jump-bar) 把对话跳转组件化为三态：unread above（顶部条+标记已读）、new below（底部 pill）、viewing history（「跳回现在」）；99+ 截断但按钮 accessible name 保留全数——计数诚实与可及性同页给出。
- ChatGPT / Claude 生产行为无公开文档可核，不冒充核过；上述参照系覆盖了同一合同。

**怎么落到三栏**：中间列先修滚动权（§1），再加 `isAtBottom` 判定 + 跳底 pill；「读旧消息不抢位置、主动发送立即贴底」的细部合同与本仓 [telegram-web-chat](../telegram-web-chat/README.md) 的阅读位置研究同向，直接复用。

## 3 · 画布与嵌入区：wheel 语义由画布自己声明

**是什么**：无限画布把 wheel 当相机输入而非滚动。tldraw 的 [Camera system](https://tldraw.dev/sdk-features/camera) 提供 `wheelBehavior: 'pan' | 'zoom' | 'none'`，且用户偏好 wins（trackpad 偏好平移、鼠标偏好缩放）；`isLocked` 可冻结相机适配 fixed-viewport 应用；camera constraints 能把画布限制在内容 bounds 内。

**为什么**：wheel 的默认动作是滚最近可滚祖先；画布不消费，手势就沿 §1 的 chaining 路径外溢。嵌入 iframe 的画布尤其要害：wheel 事件 target 在 iframe 文档内部，父页 CSS 管不进去，滚轮语义必须在画布内部声明——外层 `overscroll-behavior` 只能管本层边界，替代不了画布自己的输入协议。

**谁在用**：tldraw SDK 文档（上链，全参数）；Excalidraw / Figma 的公开行为同族（平移/缩放分键），未逐个核文档，不作引用依据。

**怎么落到三栏**：画布宿主内部实现 pan/zoom 的 wheel 消费（能引 tldraw 级抽象就不手写）；拖动分栏宽度时对画布 `pointer-events:none` 防误拖，是既对又便宜的补丁。

## 4 · 列表行内动作：hover 只是触发器之一

**是什么**：行级次级动作（铅笔重命名、复制等）视觉上 hover 浮出，实现上 `opacity:0` + `:hover` **和** `:focus-within` 双揭示、按钮常驻 DOM；触屏无 hover → ⋯ 菜单常驻兜底；主动作永远可见。

**为什么**：只写 `:hover` 时，键盘 tab 落在隐形按钮上、读屏拿不到、触屏够不着。[Accessible Data Interfaces 的 Row Actions 指南](https://www.accessible-data-interfaces.com/core-aria-keyboard-navigation-for-data-uis/context-menus-and-row-actions/keyboard-access-to-hover-revealed-row-actions/)把可及格线标为 WCAG SC 2.1.1 / 2.4.7 / 1.4.13 / 2.5.8，并给出现成 CSS 骨架：`tr:hover .row-actions, tr:focus-within .row-actions { opacity: 1 }`。

**谁在用**：GitHub Primer 的 [ActionList `TrailingAction`](https://github.com/primer/react/pull/4634)（2024-06 合入）把「行尾动作」做成一等 API，button/a 语义、IconButton/按需渲染——头部产品把该模式当组件契约而非每页手写。

**怎么落到三栏**：会话行 hover 浮出铅笔、重命名从 ⋯ 菜单移除正对症；CSS 层保证 `:focus-within` 同步揭示、⋯ 永远可达（触屏与键盘同一条兜底路径），别只 hover。

## 5 · 自适应卡片网格：auto-fill minmax 起步，容器查询进阶

**是什么**：`grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr))`——列数随容器宽度自动 1→N，无媒体查询；栏内组件再进一步用容器查询按**栏宽**（而非视口）换版式/密度。

**为什么**：右侧面板被用户拖宽拖窄时，媒体查询完全感知不到（它只看视口）；auto-fill 是轨道级自适应，container queries 是组件级自适应，两层各管各的。`min(100%, …)`（[MDN min()](https://developer.mozilla.org/en-US/docs/Web/CSS/min)）防窄容器里 minmax 下限撑破轨道；`auto-fill` 与 `auto-fit` 的差异（留空轨道 vs 折叠空轨道）见 [MDN repeat()](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)。

**谁在用**：CSS-Tricks 经典文 [Look Ma, No Media Queries!](https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/)（auto-fill + `minmax(240px, 1fr)` 的原始案例）；[web.dev 容器查询课程](https://web.dev/learn/css/container-queries)（`container-type: inline-size` + `@container`，按祖先容器而非视口调列数/版式）。

**怎么落到三栏**：把「锁死两列」的固定 `grid-cols-2` 换成 auto-fill minmax 一行替换；卡片版式（图/文比例、行数）想随栏宽变，走容器查询而不是加视口断点。密度档位（comfortable/compact）接本仓 [spacing-audit-checklist](../spacing-audit-checklist.md)。

## 6 · 长列表分页：分页没错，错在摆放和页大小

**是什么**：对已知总量、需要回访定位的列表，分页仍是正解；视觉合同是分页条**贴内容流**（跟在最后一行之后），页大小按可用高度×列数满铺；替代阶梯是 load-more（折中）与虚拟化（数万行 DOM 才必要）。

**为什么**：NN/g 的 [Infinite Scrolling 研究](https://www.nngroup.com/articles/infinite-scrolling-tips/)指出无限滚动弱化定位与回访（pogo sticking 后回到列表顶部），分页恰是定位友好的；同文给出 load-more 作为折中。「分页条钉死在栏底、页内只铺几行、条与内容间空一大截」违反的是排版义务，不是分页本身。（「页大小 = 列数 × 每列可视行数」的满铺算法是本文推导，无外部来源。）虚拟化的适用门槛见 [web.dev：Virtualize large lists with react-window](https://web.dev/articles/virtualize-long-lists-react-window)——大表格/大列表渲染拖慢才需要；单页 12 卡不需要，跨页累积渲染才需要。

**怎么落到三栏**：保留「上一页 / 第 1/2802 页 / 下一页」的定位能力；把分页条从栏底钉死改为跟随内容流，或让页大小动态满铺可视高度；若后续改滚动加载累积渲染，DOM 上万再上虚拟化。

## 7 · 响应式三栏：M3 断点 + rail/抽屉化 + 布局持久化

**是什么**：桌面 expanded 三栏；medium 宽度侧栏降为 collapsed rail（icon-only、3–7 项、**不应隐藏**）；compact 整体抽屉化/modal，主内容独占；分栏宽用 resizable panels，用户拖过的宽持久化。视口高度单位用 `100dvh` 而非 `100vh`（移动端工具栏伸缩时 vh 不更新，dvh 跟随动态视口，见 [MDN 长度单位](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) 的 sv/lv/dv 段）。

**为什么**：M3 把「同一导航按窗口宽换形态」标准化成断点合同——[breakpoints](https://m3.material.io/foundations/layout/breakpoints)（compact <600dp / medium 600–839dp / expanded 840–1199dp / large 1200dp+）；[navigation rail](https://m3.material.io/components/navigation-rail/guidelines)（collapsed rail 归 medium、不可隐藏；expanded rail 归更大宽度，modal 配置用于信息密集场景）；且 M3 Expressive 已把 drawer 判为 expanded rail 的下位替代（rail 跨断点适应更好，[navigation drawer](https://m3.material.io/components/navigation-drawer/guidelines)）。侧栏收窄的正确终态是 rail 化，不是「collapse 按钮坏掉」。

**谁在用**：[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)（MIT）——Panel 支持 min/max 约束与 collapsible；布局持久化 v3 是 `PanelGroup autoSaveId`、v4 换 [useDefaultLayout hook](https://react-resizable-panels.vercel.app/hooks/use-default-layout)（可配 storage、`onlySaveAfterUserInteractions` 只记用户手势），迁移对照见 [CHANGELOG v4](https://github.com/bvaughn/react-resizable-panels/blob/c448576d/CHANGELOG.md)；shadcn 的 [Resizable](https://ui.shadcn.com/docs/components/resizable) 建于其上并跟进 v4 改名（PanelGroup→Group）。

**怎么落到三栏**：分栏宽持久化已对（autoSaveId 线）；补窄屏形态——medium 降 icon rail 且 collapse/menu 按钮常驻可点（「不可隐藏」合同），compact 走抽屉/sheet；logo 尺寸进 token 用 `clamp()`，窄屏不占顶栏。

## 8 · 边界与缺口

- **不为滚动分发写 JS wheel 监听器**：原生「光标下元素 + 最近可滚祖先」已是正确默认；写了反而制造「谁都在管」。JS 层只做三件事：画布语义（§3）、聊天贴底判定（§2）、拖动中 `pointer-events:none`。
- **`overscroll-behavior` 是 CSS 一行**，无 JS hack 的性能代价；`contain` 与 `none` 的差别在本节点 overscroll 效果（glow/rubberband）是否也禁，按栏选 `contain` 即可。
- **本调研未覆盖**：iframe 跨文档滚动链接的逐引擎差异（未核到一手文档，§3 的机制推断不冒充实测）；ChatGPT/Claude 生产端贴底行为无公开文档，参照系为 Vercel 参考实现 + 贴底库；窄屏实机手感必须由修复卡在真设备验收。
- **与 pack 的分工**：页面编排/Workspace 结构 → [ai-workspace-surfaces](./ai-workspace-surfaces.md)；画布对象协议/版本台 → [artifacts-canvas-workbench](../artifacts-canvas-workbench.md)；阅读位置细部 → [telegram-web-chat](../telegram-web-chat/README.md)；密度档位 → [spacing-audit-checklist](../spacing-audit-checklist.md)；单消息状态原语 → [agentic-ui-primitives](../agentic-ui-primitives.md)。
