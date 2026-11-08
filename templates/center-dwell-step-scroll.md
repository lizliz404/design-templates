---
name: center-dwell-step-scroll
description: >-
  分步图文叙事的两种可复用方案：目录 sticky + 自然流分段（出海云），或
  图文共轨 + 长行程中央停驻 + 停手归位（CFE 目标）。Use when 需要选分段
  Landing 的滚动骨架，或每格推进太快、图文不同步；仅装饰漂移另走 gallery-dance。
---

# 分步图文滚动：自然流目录与共轨停驻

**先选模式，不先选特效。** 出海云的长解释内容用 A；CFE 本次明确要“图和文一起到中央、耗一段滚动距离、再咔哒切下一格”，用 B。两者同属本项，但不能把 A 说成已实现 B。

| 模式 | 现成骨架 | 适用／边界 |
|---|---|---|
| **A：目录 sticky + 内容自然流 + in-view** | 出海云根 Landing 的 PipelineScrolly / StageBlock | 各段长度不一、需要细读标题／场景／说明；内容随文档自然滚过，只有目录停靠。不强求每格居中停驻，不加 snap。 |
| **B：整个图文 panel 进出 + 中央停驻 + 归位** | 主选：GreenSock 的 **Horizontal sections (simple) with pause**，取单 timeline 的整面板移动与滚动停驻，再用 ScrollTrigger 原生 snap | 少量短图文、需要逐格读完的局部章节；CFE 本次目标。不做 wheel 事件锁，不把全站变翻页器。 |

研究更新：2026-11-08（Asia/Shanghai）。读了真实源码与具体演示源码，并完成有限桌面滚动核对；**未完成多设备手感验收**。以下是有第一方依据的成熟机制组合，不宣称全行业只有这一种方案，也不冒称找到无需适配、与 CFE 需求完全一致的成品。

## 先拍板：现成可学的东西在哪里

### 主选 B：GreenSock 的整面板移动 + 停驻时间轴

**准确入口（含 HTML / CSS / JS 与 Result）：** [Horizontal sections (simple) with pause — WNyJQjN](https://codepen.io/GreenSock/pen/WNyJQjN)。[GSAP 技术答复](https://gsap.com/community/forums/topic/44744-how-to-snap-scroll-animation-inside-pinned-horizontal-section-using-gsap-timeline-not-scrolltrigger/) 直接把它作为“在横向 timeline 中留暂停段”的学习例子；不是凭标题猜效果。

已读 JS 的关键事实：一个 timeline 配 `pin:true, scrub:0.5, end:"+=4000"`；各 `.panel` 一起 tween 到目标 `xPercent`，随后对**同一 xPercent 再 tween 一段 duration**，所以滚动继续消耗、整个面板的位置不变。标题、正文和 box 都是 panel 子项，随 panel 一起搬运。这就是本 niche 最值得直接学的骨架：**移动 → 保持 → 再移动**，不需要新造滚动引擎。

| 需求 | 原例已有 | CFE 只需做的适配 |
|---|---|---|
| 图文同组进出 | 标题／正文／box 在同一个 panel 内，移动的是整个 panel 集合 | box 换为真实图片，图与文都放 panel 内；去掉内部 box 旋转／弹跳／缩放，不另起文字滚轮。 |
| 到中央停驻 | 面板移动到位后，有相同 xPercent 的保持区间 | panel 内部整体在扣除 header 的可用视口居中；需要上下进出时改组位移轴，而不是换引擎。 |
| 长滚动行程 | 明确 end 距离；保持段 duration 占 timeline 比例 | 按本项目 H、W、T 算距离，不能照抄固定 4000px 或原例随 stop 索引变化的 duration。 |
| 逐格归位 | **该 Pen 没有 snap 配置** | 用下节官方 snap；只对交接半途归位，保护停驻预算。不要把原例宣传成已具备吸附。 |

[ScrollTrigger 第一方文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) 明确支持 pin、scrub、labels／array／function snap，也明确：想多耗滚动就拉长 start→end；scrub 数值只是播放头追赶秒数；pin 外壳本身不要 tween。**把此 Pen 的保持段与引擎自带 snap 组合，是小幅编排适配，不是自研输入系统。**

### 一个备选：Terra 的 Pinned Scroll，用来看“慢行程 + 切格归位”的完整说明

**具体教程兼 live demo：** [Terra — Pinned Scroll](https://terra-dev.es/js/pinned-scroll/#fade)。看页面的 **Fade**，不是站点目录。教程明确写出：整段 pin、旧 panel 上移淡出、新 panel 下方淡入、停在切换中间时向最近 panel 归位；`speed="slow"` 控制每段所占 scroll distance。Custom 章节展示单 timeline、按 viewport 设置 pin 距离，以及空 tween 保持最终姿态。

**为什么只是备选：** 它的 background 可由外层单独 crossfade，Fade 本身以文字示例为主；不能因此说摄影图和文字已共同移动，也未从该说明核出 65–75% 的每格停驻比例。CFE 若借其方案，图片必须进 panel，不能只设外层 `data-background`。教程依赖 Terra/Punky 的 Handler、Manager、生命周期系统，且本次未核其完整源码包与再分发许可：**学机制，不为这一段装整个框架，不直接 vendor 不明许可代码。** 相比之下，主选 GreenSock 小例子的改动更少。

### 浏览器重点核这两个，不继续堆案例

1. 打开 [WNyJQjN](https://codepen.io/GreenSock/pen/WNyJQjN)，使用 Result 实际滚动：确认整个 panel 的子内容一起横移；到位后继续小幅滚，看 panel 保持但滚动仍前进；反向看是否倒带。确认原例**不会自动吸附**。若内嵌画布吃滚动，单独打开其 Result 后再测，不把编辑器滚动当 demo。
2. 打开 [Terra Pinned Scroll](https://terra-dev.es/js/pinned-scroll/#fade)，到 Fade 段：慢滚至稳定态，继续滚看每段行程；交接一半停手，看归位与能否打断；反向和尾部释放。另看 Slide 段以比较整 panel 推出的观感，但不假设其 snap／停驻实现与 Fade 完全相同。
3. 两者都只作为学习基线。桌面 wheel／细触控板至少各测一次，再测窄屏；只有实际运行后才能填写“手感通过”。若入口被地区／站点风控挡住，记录真实错误，不判成 404，也不把教程可读当运行通过。

浏览器核对（2026-11-08，Asia/Shanghai）：[CodePen 全屏 Result](https://codepen.io/GreenSock/full/WNyJQjN) 已加载。竖向滚动驱动整个 panel 横移，标题与方块共同移动；Section 3 到中央后，小幅继续滚动观察到姿态保持，反向能回前格。未观察到自动 snap；尾部缺少相邻内容，未能确认 pin 释放。它是可学骨架，不是完整 CFE 图文成品。

Terra 旧地址 `/scroll/pinned-scroll/` 实际返回 404，已替换为从首页找到的 [当前 Fade 地址](https://terra-dev.es/js/pinned-scroll/#fade)。实测交接中停手后呈现下一段稳定文案和背景色；反向可回前段，也可前后离开 Fade。只验证了文字与整段背景变化，未验证配对图片共同移动，也未验证新输入打断归位。两例均未覆盖真实触控板、窄屏和完整输入矩阵；不判手感验收通过。

## A：把出海云方案本身收纳为可复用模式

**来源：** [根路由](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/app/router.tsx#L63-L80) → [PipelineScrolly / StageBlock](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/landing/Landing.tsx#L126-L204)；[响应式列宽](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/landing/landing-layout.css#L22-L48)。这里保留的是有效方案，不是“B 做得不够好”的失败样本。

复用顺序：

1. 内容数据驱动：把原站五个 STAGES 的 key、目录名、标题、正文、Scene、cells 抽成有序步骤；每个 StageBlock 自带稳定锚点。
2. 桌面两列：仅目录 sticky，内容列自然滚。原站从 768px 起为 13rem 目录列，1200px 起为 17rem；sticky top-28、内容 scroll-mt-24 是该站起点，消费项目应改成实测 header 高度加阅读留白，不生搬两套偏移。
3. 当前段：原站 useInView(amount:0.45) 更新 active，目录 aria-current=location；Scene 收 active，场景外壳仅入场一次 y:22→0、0.45s。保留分段激活，不把它改成连续 scrub。
4. 窄屏目录隐藏，所有标题、场景、cells 仍自然流可读。高于视口的长段可能永远达不到 45% 可见率；应按消费内容改用统一 header 下阅读线／标题 sentinel 判当前段，避免目录失联。
5. 验收：长短段都能激活正确目录，锚点不被 header 遮，前进／反向一致，键盘可点目录；无 JS 或 reduced-motion 时全文可读。这里**不验收逐格吸附和中央长停驻**，它们不是 A 的合同。

## 两模式共用的内容与导航合同

内容 schema（设计合同，不是新增运行时组件）：`Step = { id, navLabel, title, body, media/Scene, details?, mediaAlt }`。id 稳定，顺序和目录来自同一份 steps；A 可有较长 details，B 的文案须能和图片一起放入可用视口。

- A 用真实段落锚点导航；B 在增强成功后把同一导航映射到各格稳定落点，保留自然流 anchor 作为降级。active 与 aria-current 都从本模式唯一进度源派生，不另起 timer。
- 两模式都不靠 hover 才读得到下一段；图片预留尺寸，键盘焦点有序。窄屏、放大文字、超长翻译放不下时退自然流，不截正文维持 pin。
- reduced-motion／JS 失效／引擎未加载时保留全部步骤自然流；B 必须同时撤掉绝对叠层与 pin spacer 的增强样式，不能只关动画留下盖住的文字。

## B：CFE 的最小适配合同

先在局部 01–04 做，不扩大到全站。以下数值是待实测起点，非从 demo 得到的“最佳参数”。

### 距离合同：同样输入，只走更少进度

令 H 为当前可用视口高度，L 为某阶段实际 scroll distance。在线性区间 `Δprogress = Δscroll / L`；增加 L 才稀释进度。只改动画时长、行间距、IO 阈值或 scrub 不等价。

| 变量 | 建议起点（非实测最佳） | 意义 |
|---|---|---|
| 每格预算 D | 1.5–2H | 同样手势推进更少，不把一行 30vh 当够用。 |
| 停驻／交接 | 65–75%／25–35% | 大部分距离阅读，交接内旧组出、新组进，图文同起止。 |
| scrub | 0.2–0.4s | 播放头追赶秒数，不是“阻力倍数”；过大会拖尾。 |
| snap | 延迟约 0.1–0.2s，归位约 0.15–0.3s | 短、可打断；不是每个 wheel event 都推进一格。 |

边界账本：首次进入 E + N 个停驻 W + N−1 个交接 T + 尾部释放 X，即 `L = E + N·W + (N−1)·T + X`。可从 W≈0.7D、T≈0.3D 起调，单独测 E/X；不要混算 N 与 N−1 或机械设置 end=N×D。距离随 viewport／内容高度求值，resize 后 refresh。

```text
自然流接近 → 图+文内组共同入场 → 可用视口中央
                                  ║ W：继续滚，但组位姿不变
                                  ↓ T：旧组共同退场 + 新组共同入场
                               下一格中央 → … → 尾部自然释放
```

停驻不是 setTimeout 或阻止滚动：timeline 在 W 内保持位姿；停手可读任意久，继续滚才消耗预算。首末格不丢内容，不循环回第一格。

### 同轨与归位合同（只用于 B）

- pin 稳定外壳，不直接 tween；图片、标题、正文同属一个 panel 内组。桌面可左右布局，运动共同作用于组容器；窄屏可上下排，不让图片留旧格而文字到新格。
- 中央是扣除 header 后可用区域的中央，不机械贴 50vh；内容太高放不下时切自然流，不裁正文维持炫技。
- timeline 是图、文、序号、目录当前态的唯一进度来源；W 内序号不变。不另设轮播 timer 或 hover 暂停后抢回状态。
- snap 仅在停滚后纠正半途过渡。默认先试 nearest，明确 directional:false；必要时连同 inertia:false 比较。仅写 labels 并不自动代表完整配置非方向性，官方 object snap 的 directional 默认 true。
- labelsDirectional 在轻滚后也可能跳下个 label，吃掉本格停驻预算，未验证前不默认启用。若 nearest 仍拉回停驻起点，可用同一引擎 function snap：W 内保持当前进度，仅在 T 内向相邻稳定落点归位。这是模板建议，不是声称 GSAP 内置“停驻语义”。
- 输入保留 native scroll，不用全局 preventDefault、wheel delta 累加锁或强制“一次 wheel 一格”；快滚可跨格，不排队播放所有中间动画。
- React 卸载／路由切换清理 timeline、trigger、监听器；字体图片尺寸稳定后 refresh。transform 祖先可能破坏 fixed pin，先整理容器，不默认 reparent 掩盖结构问题。

## 流程与交付闸门

1. 记录 Job / Chosen mode & demo / Why / Explicitly skipped / Acceptance checks。A 与 B 的通过条件分开，不因两个都叫 scrollytelling 就混用。
2. 先审核并更新本项及原索引行到 Design Templates 远端；**之后**才在独立实施任务中反哺 CFE，不边研究边改生产。
3. CFE 实施前读取当前 DESIGN，登记此次 B 对原“位置不绑 scrollY”等裁决的明确局部例外；保留品牌 token，取消同片段轮播 timer、held 抢权与独立文字 reveal 所有权。
4. 使用主选单 timeline。先无 smoothing 验证距离和同步，再少量 scrub，最后 snap。原生滚动足够，不默认加 Lenis／ScrollSmoother，更不复制 Observer preventDefault + 冷却计时式“一次手势一格”。
5. 代码或教程再利用前核所锁版本与源码许可；演示可读不自动等于任意源码可再分发。

| 验收 | A | B |
|---|---|---|
| 阅读与同步 | 段落、场景、说明顺序清楚；目录对应当前段 | 图文一起到中央、一起离开，任何中间进度不串格 |
| 距离与归位 | 依内容自然流，无强制归位 | 记录 H 与 scrollY 边界；W 内继续滚仍同格；T 中停手短归位，W 轻滚不被送下一格 |
| 输入与边界 | 目录键盘、anchor、反向激活正确 | wheel、触控板、touch、PageDown/Space/方向键、快滚跨格、反向、拖滚动条都可用；新输入打断 snap；首尾释放 |
| 尺寸与恢复 | 长段不丢 active，导航不遮标题 | resize／横竖屏／字体图片加载后 refresh，无重复 spacer；锚点／后退恢复不被拉回 |
| 共用降级 | 全文自然流、键盘可读、可用目录 | 同左，另撤叠层与 pin；隐藏 panel 不留焦点陷阱 |

桌面和窄屏记录关键状态截图／录屏、实测设备与失败项。**本次完成资料、源码与有限桌面演示核对，完整验收矩阵未完成，不判通过。** 不构建应用、不改 CFE 代码、不部署；由后续任务实施并回填真实结果。

## 两站固定源码证据（按需核查）

### 两站真实基线：不要把近似观感当同一机制

链接固定到读取 revision；只证明源码快照，不证明线上部署。CFE 实现证据来自 [lizliz404/cfe-app](https://github.com/lizliz404/cfe-app)，不把它与 [cfe-shanghai-website](https://github.com/lizliz404/cfe-shanghai-website) 混为一库。后者最新读到的是设计合同登记 [a2e307d](https://github.com/lizliz404/cfe-shanghai-website/commit/a2e307dc9558ae635e56997290e14404219b4caf)，不是下述实现依据。

| 证据 | 源码事实 | 对目标的意义（设计判断，非视觉实测） |
|---|---|---|
| CFE 最近改动 | 首页文件最新提交 [eafa2d5](https://github.com/lizliz404/cfe-app/commit/eafa2d59e1b861cac114554f709fa03f94571ca1) 包含 01–04 滚动显现与浮游幅度降低；此前 [27451c1](https://github.com/lizliz404/cfe-app/commit/27451c1fa0f81dbd491b1e3fee505a9d58cbc75c) 引入中心带 scrollspy。读取全库 HEAD 为 [a1baea4](https://github.com/lizliz404/cfe-app/commit/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5)，最新提交本身是 Ask AI。 | 最新 commit 标题不能替代动效文件历史。 |
| CFE 图文骨架 | [index.astro L365–404](https://github.com/lizliz404/cfe-app/blob/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5/src/pages/index.astro#L365-L404)：四个文字 article + 独立媒体池；[L1325–1337](https://github.com/lizliz404/cfe-app/blob/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5/src/pages/index.astro#L1325-L1337)：桌面图在左列跨四行，文字在右列，每行 `min-height: clamp(12rem, 30vh, 17rem)`。 | 行程由普通排版决定，没有每格长行程预算；30vh 是受上下限约束的最小行高，不能把注释“约 1.5 屏”当测量结果。 |
| CFE 图不跟文同轨 | [hover-reveal.css L98–147](https://github.com/lizliz404/cfe-app/blob/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5/src/styles/global/hover-reveal.css#L98-L147)：媒体池跨行居中、relative，图片绝对叠放换帧；[页面 L1410–1431](https://github.com/lizliz404/cfe-app/blob/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5/src/pages/index.astro#L1410-L1431) 覆盖为约 -0.33rem 沉降、260ms 淡入、300ms transform。 | “图原位不动”可对应槽内换帧的架构，但不能写成图片完全静止或 sticky：整个槽仍随文档流滚动。图文不是一个运动单元。 |
| CFE 激活竞争 | [index.astro L432–489](https://github.com/lizliz404/cfe-app/blob/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5/src/pages/index.astro#L432-L489)：IO `rootMargin: -45% 0px -45% 0px` 作中心带激活；pointer/focus 进入整个 list 令 held=true，可抑制 spy；媒体可见时另有 8400ms 自动轮换。 | 中心带只选状态，不创造停驻；鼠标留在列表内可能抑制滚动切格，自动轮换可能停滚仍换格。这是源码风险，非本次已复现故障。 |
| CFE 装饰阻尼 | [index.astro L823–875](https://github.com/lizliz404/cfe-app/blob/a1baea4eb7689e0417fd75ef0db13ec8db67f5a5/src/pages/index.astro#L823-L875)：另一段 dance/stat 照片弹簧 K=100、D=5，位移钳在约 ±6.7px，目标由 scroll delta 注入。 | 这是小幅装饰回摆，不是四格时间轴；不能拿该 K/D 当 01–04 停驻参数。 |
| 出海云真实入口 | [router.tsx L63–80](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/app/router.tsx#L63-L80)：根 `/` 使用 landing/Landing，`/landing-next` 为另一条路由。读取全库 HEAD 是 [4c4e87e](https://github.com/hanzili/chuhai-cloud/commit/4c4e87ebdcd88640668ae4c254b5a16a91685afa)；最近 Landing 文件调整含 [bd467c5](https://github.com/hanzili/chuhai-cloud/commit/bd467c563aaaa90911bcda7e51ecc5c0ffdb57d3) 的 Hero 后置 AgentDemo。 | 不把 next 实验页当根 landing；HEAD 最新提交也不是 Landing 动效调整。 |
| 出海云从首到尾 | [Landing.tsx L207–225](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/landing/Landing.tsx#L207-L225)：Nav → Hero → AgentDemo → PipelineScrolly → NicheExample → Bento → StatsBand → Manifesto → FinalCta → Footer。 | 入口是连续 section 叙事装配，不等于首到尾统一 pin、整屏 snap 或一滚一格。未对所有子组件内部做完整运行时审计。 |
| 出海云分段机制 | [Landing.tsx L126–204](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/landing/Landing.tsx#L126-L204)：左目录 sticky top-28，右列五个 StageBlock 自然滚过；useInView(amount:0.45) 点亮目录／场景，场景 whileInView 一次性 y:22→0、0.45s；标题、场景、SubCells 顺序排列。[layout CSS L22–48](https://github.com/hanzili/chuhai-cloud/blob/4c4e87ebdcd88640668ae4c254b5a16a91685afa/web/src/landing/landing-layout.css#L22-L48) 定响应式目录／内容列。 | 借章节数据、目录锚点与清晰顺序；不照搬分离标题／场景来满足图文共轨停驻。此机制不是长行程 pin/scrub/snap。 |

**取用：** 出海云模式 A 原样成立，按内容长度与导航验收复用；CFE 本次选 B，把其真实素材配对转成共轨 panel。不要继续给旧 scrollspy 叠装饰动画来冒充 B。
