---
name: center-dwell-step-scroll
description: >-
  长行程、图文共轨、中央停驻与分格归位的叙事滚动模板。Use when Landing
  每格消耗距离太短、图不动而文字滚走，或需要图文一起进场停驻再逐格切换；
  普通长文、固定目录配自然流、仅弹簧漂移不使用本模板。
---

# 图文共轨：长行程 → 中央停驻 → 分格归位

**要稀释的是每像素推进的进度，不是让动画拖更久。** 默认采用原生滚动 + [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) 单 timeline；pin 外层舞台，图和文作为一个内组一起进出，中间用真实滚动距离停驻，停手后才短促归位。

研究日期：2026-11-08（Asia/Shanghai）。本项是源码与第一方资料研究，**未在浏览器实测手感，未修改或部署两站应用**；参数是待验证起点，不是实测最佳值。Liz 的需求是交互目标，不能倒写成现站能力。

正交路由：[image-text-gallery-dance.md](./image-text-gallery-dance.md) 管差速漂移、沉降和动量回摆；本项管距离分配、图文同轨、停驻、归位。不能靠增大 spring / CSS transition 给旧骨架补出新交互。

## 流程（何时跑、按序做什么、终点怎么判）

1. 写 Selection record：目标章节、格数、图文配对、为什么必须停驻、跳过哪些轮子、验收设备。先选局部章节，不默认把全站锁成幻灯片。
2. 读当前 DESIGN 合同与真实路由，区分自然流、scrollspy、pin/scrub。若项目禁 scroll-coupled 动效，先登记本片段明确例外，不静默覆盖旧裁决。
3. 定义进入／停驻／切换距离；先无 smoothing 确认行程，再加少量 scrub 追赶。
4. 一个舞台、图文组、timeline 与归位源；图文同时到中央。取消同片段自动轮播、hover 抢状态及独立文字 reveal 的控制权。
5. 比较 nearest 与 directional snap，保护停驻预算；键盘、快滚、反向、首尾释放全部可用，再做视觉验收。
6. 终点是双端状态截图／滚动录屏 + 下方矩阵通过；文档 lint 或应用 build 通过不等于交互通过。

## 机制依据

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

**凝结：** 出海云提供章节与导航组织，CFE 提供真实图文素材配对和品牌框架；两者都不能原封不动当成新交互答案。复用成熟引擎，替换局部章节编排，不继续给旧 scrollspy 叠动画。

### 轮子阶梯

| 候选 | 取用／不取用 |
|---|---|
| [GSAP / ScrollTrigger](https://github.com/greensock/GSAP) | 默认：native scroll + pin + scrub + snap + timeline，一套坐标系承担距离与图文运动。官方推荐单 timeline，警告不直接动画 pin 节点；接入时核锁定版本许可，不宣称它是 MIT。 |
| [Lenis](https://github.com/darkroomengineering/lenis) | 只有全站明确需要 smooth scroll 才加，不靠它制造每格长行程。[官方 README](https://github.com/darkroomengineering/lenis/blob/main/README.md) 说明 CSS scroll-snap 不直接受支持，应看 lenis/snap；与 ScrollTrigger 的 ticker／scroll 更新按官方示例连接，不叠两套 snap 或重复 rAF。 |
| [CSS scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) | 适合独立滚动容器的整页面板，不能单靠 snap 获得长停驻或图文 timeline；超高文字面板慎用 mandatory，避免内容不可达。 |
| Motion useScroll | 已用 Motion 且只需轻量映射时可选；精确 pin／停驻／snap 仍需额外设计，不为省依赖手写另一套引擎。API 页面前序读取遇 403，不是 404，不能声称已核完该页。 |

[GSAP pinned panels with overscroll](https://demos.gsap.com/demo/pinned-panels-with-overscroll/) 只核入口可访问，未运行验证，不能宣称完整满足本模板。[ScrollTrigger 源码](https://github.com/greensock/GSAP/blob/master/src/ScrollTrigger.js) 供核查；实现应锁版本，浮动 master 不是固定交付版本。

X 已检索 `"ScrollTrigger" ("snap" OR "panels") has:links -is:retweet`，未找到足以纳入的高质量案例；不杜撰帖子／作者背书，不以点赞或 star 数替代机制证据。

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

### 同轨与归位合同

- pin 稳定外壳，不直接 tween；图片、标题、正文同属一个 panel 内组。桌面可左右布局，运动共同作用于组容器；窄屏可上下排，不让图片留旧格而文字到新格。
- 中央是扣除 header 后可用区域的中央，不机械贴 50vh；内容太高放不下时切自然流，不裁正文维持炫技。
- timeline 是图、文、序号、目录当前态的唯一进度来源；W 内序号不变。不另设轮播 timer 或 hover 暂停后抢回状态。
- snap 仅在停滚后纠正半途过渡。默认先试 nearest，明确 directional:false；必要时连同 inertia:false 比较。仅写 labels 并不自动代表完整配置非方向性，官方 object snap 的 directional 默认 true。
- labelsDirectional 在轻滚后也可能跳下个 label，吃掉本格停驻预算，未验证前不默认启用。若 nearest 仍拉回停驻起点，可用同一引擎 function snap：W 内保持当前进度，仅在 T 内向相邻稳定落点归位。这是模板建议，不是声称 GSAP 内置“停驻语义”。
- 输入保留 native scroll，不用全局 preventDefault、wheel delta 累加锁或强制“一次 wheel 一格”；快滚可跨格，不排队播放所有中间动画。
- React 卸载／路由切换清理 timeline、trigger、监听器；字体图片尺寸稳定后 refresh。transform 祖先可能破坏 fixed pin，先整理容器，不默认 reparent 掩盖结构问题。

## 边界（硬性 guardrail）与验收

复用记录：Job / Chosen asset(s) / Why these fit / Explicitly skipped / Acceptance screenshots & checks。本模板只沉淀研究与合同，消费项目实施仍需独立任务。

| 检查 | 通过条件 |
|---|---|
| 图文共轨 | 同格图文一起到中央、一起离开；任意中间进度不串格。 |
| 停驻／行程 | 记录实际 scrollY 边界与 H：W 内持续滚仍同格，D 达约定预算；不以慢动画假装更长。 |
| 归位 | T 中停手短促归位；W 内轻滚不立刻送下一格；新输入打断 snap。 |
| 输入／方向 | wheel、细触控板、touch、PageDown/Space/方向键、反向、快滚跨格均可；无 hover 也读得完。 |
| 首尾／导航 | 上方进入、下方逆入、尾部释放、拖滚动条、锚点跳转／后退恢复无锁死或拉回；目录指稳定落点。 |
| 尺寸／内容 | resize、横竖屏、移动工具栏、字体加载、长翻译／放大文字不串位、不截断，header 不遮挡。 |
| a11y／降级 | reduced-motion、JS 失效／引擎未加载取消 pin/scrub/snap 与叠层，图文按 DOM 顺序自然流可读；隐藏 panel 不留可聚焦控件。 |
| 交付证据 | 桌面／窄屏各留入场、停驻、半途、归位、释放状态，标实测设备与未测项；未做检查不得打勾。 |

本研究未完成浏览器矩阵，不能判上述通过。无需为写此文构建应用，不修改生产、不部署；接入时只采用所需成熟能力，不引入第二套平滑／吸附系统。
