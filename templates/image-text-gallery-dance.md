---
name: image-text-gallery-dance
description: >-
  图文配对 / 画廊感轻量默认与可选动效：原生自然流优先，sticky rail、差速漂移、动量回摆为有条件选项；参数是来源观察而非行业硬门槛（stiffness/damping/位移/时长/阈值），React spring 与 vanilla rAF 双配方。Use when landing / B2B 长页图文脱节、滚动过重、留白过大，或需要判断是否值得加动效；先静态配对和原生滚动，再按项目约束选择有证据的局部机制。
---

# 图文共舞 · 画廊感滚动阻尼 playbook

面向 CFE 及类似 B2B 长页。**默认：原生自然流＋静态图文配对；一次轻入场可选，阻尼、齿轮、pin不是画廊感的必要条件。** 质量先看内容配对、阅读密度、用户能否顺手滚到下一项，而不是动效数量。

更新：2026-11-09（上海时间）。Liz 已把 CFE 11-08 的长停驻方向改为低成本、低负担；旧建议曾影响实现，保留出处、不倒写历史。[分步滚动模板的11-09收束](./center-dwell-step-scroll.md#11-09-收束为什么出海云轻cfe-重这次怎么减)集中记录真实参数对比、这次补丁、第一方依据及输入验收，避免两篇各维护一套结论。以下旧源码数字均为历史观察，不是当前CFE或视觉验收结果。

## 最短决策流程

1. **先修空间，再谈运动。** 同一组图文明确同排/邻接；区分section padding、grid gap、段落margin、行高。CSS错行不能靠调阻尼补救。
2. **普通业务页停在自然流。** 目录有导航价值才sticky；想柔和一点最多整组一次transform/opacity入场。保留内容、品牌和顺序，不为追求“丝滑”再添组件。
3. **确需动效再选语义。** trail/settle/wobble是不同模型，不是必须装齐的三档。一个属性只有一个运动所有者，尤其不要叠平滑滚动、scrub、snap和图片回摆。
4. **数值分级。** 官方API默认、固定提交观察、设计起点、真实设备验证分开记。不存在全行业统一阻尼、行距或section留白；当用户明确嫌空时，不机械套64–72px。
5. **结束条件。** 无JS/PRM仍完整可读；真实wheel/触控板/touch/键盘没有死滚、额外强制手势、图文分家、回滚抢权。构建和静态断言不证明“丝滑”。

## 09:31 技术减重基线（`9218763`，后续构图已替换）

采用原生配对自然流，撤6.65H长停驻、.3s追赶、.15s延迟/.22s归位及独占GSAP；章节照片撤K100/D5回摆与600ms过冲、独立文字wipe/场景循环。成对版面保留现有ease-out一次9px/350ms入场。空间先修桌面每个panel图文同`grid-row:1`，再收横gap至24、普通手机纵gap16，copy gap8并清额外margin；首页section48/32（桌面/手机）、正文1.5/lead1.4。都是本项目当前起点，不升级为通用标准。未改全站token、内页hover或另加轮子；真实渲染仍须验收。

## 09:54 继续纠偏：原生滚动是底线，不是视觉设计答案

Liz 看过真实页面后指出：从共享图片槽的hover披露改成四行等权图文，只是从有交互税变成平铺，执行配不上研究。这个批评成立：`9218763`解决了输入与布局故障，**没有自动解决主次、节奏、影像尺度及内容关系**。不能以“原生/可访问/构建通过”宣布设计完成，也不能等用户再催一次才同步修产品与模板。

### 先读内容关系，再决定版型

1. 把每条材料标为**结论、可信证据、交付方法、细节或下一步**。分清同级并列、先后过程、主张—证据；不要只数有四项就画四个相同格。
2. 写清每张图的作用与许可边界，再实际打开图看主体/比例。现场、项目证据、示意素材不是同一种可信度；一张ROV stock photo不能证明集团交付了100根桩。
3. 按角色分配视觉面积：一个真正有更高权重的主图/主论据，相关支撑共享基线与尺度。差异须解释信息关系，不默认zigzag、bento、masonry或“一项一屏”；同级内容也可以等权，关键是由内容而非组件数量决定。
4. 用真实宽度检查图像与字号：图应足够辨认主体，标题大于且深于说明；编号是导航辅助，不应比论据抢眼。正文靠近所属图，段距、图文gap与章节留白分别预算。布局放不下就改结构，不缩图成邮票。
5. 不叠第二套装饰“救活”平庸排版。删重复指标、假读数/无信息徽章，先把一张主图、一句结论及真实来源放对位置。移动端可线性阅读，但不把桌面展示机械缩成小卡。

### CFE 本轮编排：先交付证据，再解释如何交付

实现：[CFE `18a58a9`](https://github.com/lizliz404/cfe-app/commit/18a58a9f7f1d382fdeeab5e2c52d4483fe022fd4)。这是依据内容与素材做的**待真实页面验证的设计判断**，不是研究已证明最优。

- **01集团track record是领篇**：保留ROV主图与原文，以16:9大景＋右侧文字/来源记录形成7:5对页；100+仍明确是集团数字，12×375t及Jansz-Io来源放在同一记录中，不再另起两张重复图片指标卡。
- **02工程、03追溯、04供应链是支撑层**：桌面三幅3:2工艺图组成一条共享基线的能力联章；不是三张功能卡或四行换位置。CAD显示设计、卡尺显示检验、切割工位显示制造环节，各自说明紧跟自己的图，不暗示stock照片是CFE厂房或这些事实的直接证明。
- **尺度与边线**：本章节从窄正文rail回到现有品牌主frame，主图约占7/12、支撑各约1/3，24px列距；编号14px，标题24px深墨，说明14px/1.5灰。使用既有字体/色板，不新增字体或花哨背景；原图近16:9与3:2，优先保留主体而不是为布局狠裁。
- **不加交互税**：四张图及全部原文SSR直出，无hover/点击披露、无snap/pin或新库；主体纯静态，手机顺序为主篇幅→三项支撑；PRM/无JS不丢内容。图库说明明确影像为illustrative。
- **清理而非堆叠**：撤大号序数、假雷达/流程chip、旧index样式和重复图片统计模块。保留真正的集团归属/来源链接、四条客户原文，不动Ask AI/通知或其他章节。

### 两道验收闸门，缺一不能报“设计好了”

| 工程底线 | 视觉/内容判断（必须真实页面） |
|---|---|
| SSR四图四标题、无隐藏披露；自然wheel/touch/键盘；PRM；无溢出/死滚；构建回归 | 1280/1440能看出领篇和支撑而非四张同权卡；图片区分且主体可辨；标题深于说明；图文贴合、基线整齐 |
| 手机390全文/来源可读，图片有固有尺寸，资源按布局选sizes | 390不变邮票或横向滑条；来源不压图、数字不重复抢戏；从vision进入gallery、再到scope无怪空洞/突兀边线 |

本轮只完成源码/产物检查与实际素材查看；没有把静态mock当QA，也没有用研究案例证明新构图必然好看。真实页面由后续独立浏览器复核，若仍弱继续修**构图/素材/文案关系**，不是回到加阻尼。

## 机制依据

### 模式解剖：可选骨架，不是逐项必装清单

| 骨架 | 结构 | 源码观察出处 | 适用条件 |
|---|---|---|---|
| **Sticky rail + 流式列** | 左轨 `sticky top-28` 放章节索引/标签，右列 panel 依次滚过；IO `amount 0.45` 点亮 rail，活动条用 `layoutId` 滑移 | 出海云 `Landing.tsx:129-163`（rail `<ul class="sticky top-28">`、StageBlock `useInView(amount:0.45)` `:179`、`scroll-mt-24` `:184`）；轨宽 13rem@768 / 17rem@1200 `landing-layout.css:36-43` | 有 ≥3 个可编号段落且每段够高；rail 内容必须是导航/索引语义（点击可跳），放正文段落就退化成 pin 叙事 |
| **成对编辑版面（paired spread）** | copy 列 + 画框列在同一 `.wrap` 内 `align-items:center`；画框下沿挂「签」（idx + 一句说明），像美术馆展签 | CFE `index.astro:226-286, 675-703`（`.editorial-dance` grid `6fr/6fr` `:1549-1554`）；签 = `.dance-caption` `:1177-1202` | 每章都有「主张句 + 一张证据图」可配对；列宽由内容决定，不把旧稿1.5fr当通用阈值 |
| **差速漂移层（satellite drift）** | 中心 stage 之外挂 2-3 个小件，滚过时**对向**位移（一个上一个下），入场窗窄（progress 3%-16%），总行程 90-140px | 出海云 `hero.tsx:76-80`（`yL 36→-64`、`yR 28→+52`、`yB 40→-40` over progress .03→.6；`satOp 0→1` over .03→.16）；可拖玩 `dragSnapToOrigin` `:169-182` | 仅作为hero/氛围层候选；原例尺寸/套数是观察，不能当全行业上限；普通业务页不默认复制 |
| **动量回摆（momentum sway）** | 滚动**速度**注入冲量进欠阻尼弹簧，位移 ±几 px 后弹回零位；位置永不绑 scrollY | CFE `site.ts:535-644`（K=100 D=5、gain .2/.3、clamp ±6/±9px、v cap ±500、IO rootMargin 15%、PRM 不安装）；源机制 Fugro `fugro-rea/evidence/audit/app.js` module 90568 | 只给裁剪框内的**静图**（`.js-sway` 加 5% scale bleed 不露边 `site.ts:549-551`）；动资源（视频层）零叠加，否则双动打架 |
| **反面：节拍器带** | 白字条 → 全幅照片带 → 大空白 → 白字条，等距循环 | CFE 2026-11-07 返工注释（`index.astro:250-253, 535-537, 616-619`——把三个「照片带+空白缝」全部收回 `.wrap` 内成对版面） | 检查图片是否真正解释相邻文字、是否出现重复空白；可交换而不损信息提示配图泛化，但不是一切重复布局都有错 |

Sticky rail 的变种证据：Fugro 把整条长页做成 sticky「Jump to」锚点册页（`fugro-rea/TEARDOWN.md:147,164`，`position:sticky;top:0` + 橙线下标）；Brok UI 的 sticky-content-gallery 是同骨架的最小参照实现（sticky 文案列 + 流式 media 栈，`lg:sticky lg:top-24 lg:self-start`，移动端塌单栏，纯 CSS 零 JS）——见证据链。出海云 `landing-next/LandingNext.tsx:155-220` 走了另一条路（tab 制 ProductTheater，无滚动共舞），说明该形态是选项不是升级，根Landing仍用sticky rail；适用性取决于内容，不是普遍升级。

### 「画廊感」从哪来（结构层，先于动效）

- **图像与说明配对**才是底线。画框、展签、裸图、叠图caption都是可选表现，不能据此判定高低；CFE已明确选择裸边/叠图说明，不加回边框。
- **mono 章节编号连续**：01/02/… 贯穿全页（Fugro 册页目录、Anduril `01/04` 骨架；`fugro-rea/CFE-IMPLICATIONS.md:42`、`saronic-rea/CFE-IMPLICATIONS.md:11`）。
- **阅读优先**：NN/g观察到改变滚速/方向并要求读变化文字时可用性最差；通常让文字自然流、最多一次入场。图片不必动；具有信息解释价值的局部逐步揭示需独立验证，不作普遍禁令。
- **克制包含零运动**：下表几px至百余px是不同场景的观察范围，不能当全页许可量程；Fugro所核模块的±30px不代表其全站所有运动。

### 历史源码参数账本（有出处，不等于推荐或手感通过）

弹簧物理通识：ζ = c / (2·√(k·m))；ζ<1 欠阻尼（会过冲）、=1 临界、>1 过阻尼（拖尾不回摆）。ζ计算假设线性弹簧模型及mass；不能由单个CSS bezier控制点直接推出相同ζ或固定过冲百分比。原研究的Figma/DevTools解释链接保留在文末，非本次重新核验的一手结论。Motion 的 `spring()` 时间参默认 `duration 800ms / bounce .25`，负 bounce 产过阻尼「起步快、沉降慢、零过冲」（`motion.dev/docs/spring`）。

| 机制 | 源码观察值 | 阻尼语义 | 出处 |
|---|---|---|---|
| Fugro 滚动视差 | `useTransform(scrollY,[top-vh,top+offset],[+30,-30])` → `useSpring{stiffness:400,damping:90}`，ζ≈2.25 **过阻尼拖尾**；容器 `width:105%;height:calc(100%+2*offset);margin-top:-offset`（60px bleed）| 拖尾 trail | `fugro-rea/evidence/audit/app.js` module 90568（`sc-93c6951a-0`）；登记亦见 `cfe-shanghai-website/DESIGN.md:54` |
| Fugro 入场容器 | `ease [.465,.183,.153,.946]` 0.75s、`staggerChildren .25s` | 缓动（非弹簧） | 同上 app.js module 37138 |
| 出海云 hero 差速 | progress 窗 `.03→.6`，三层 `36→-64 / 28→52 / 40→-40`；`shrink 1→0.9` over `0→.55`；卫星 opacity `0→1` over `.03→.16` | 直接 scrub（库驱动） | `hero.tsx:75-80` |
| 出海云询盘列表交换 | `spring{stiffness:480,damping:34}` ζ≈0.78 弱欠阻尼 | 沉降 settle | `hero.tsx:371` |
| 出海云场景浮卡 | `spring{stiffness:380,damping:26}` ζ≈0.67 + `delay`，进场 | 沉降 settle | `ui.tsx:222` |
| 出海云签名缓动 | `EASE=[0.25,1,0.5,1]`在landing多处消费（原例自定义ease-out，不强行等同某条标准函数） | 缓动 | `ui.tsx:6` |
| 出海云 nav 滞回 | 下滑 >40 收缩、回顶 <12 才展开（iOS 橡皮筋不闪） | 阈值 hysteresis | `hero.tsx:34-37` |
| CFE 动量 sway | `K=100 D=5`（ω≈10rad/s，ζ≈0.25）冲量 gain .2/.3、`v cap ±500px/s`、位移 clamp `±6px`（小件）/`±9px`（大件）、`dt cap 50ms`、落定即停 rAF | 回摆 wobble | `site.ts:561-635` |
| CFE dance 沉降（历史快照） | `cubic-bezier(0.34,1.18/1.22,0.42,1)` 520/560/640/680ms；photo 休止 `scale 1.03`、pending `translateY(-1.25rem) scale(1.085)`、hover `-0.2rem scale(1.06)` | 沉降 settle | `index.astro:1127-1160,1249-1260`（hover）、`1322-1333`（stat） |
| CFE 白名单基线 | UI 动效 150–500ms、入场位移 ≤14px、`--ease-out` 族；reveal 交错 ~80-90ms；页标 wipe ≤1.2s | — | `cfe-shanghai-website/DESIGN.md:323,342` |

**可选阻尼语义（不是三件套；同一属性不要多重控制）：**

- **拖尾 trail（ζ 1.5–2.5）**：scroll-coupled 值跟随滚动但拖后、无振荡。这是“拖尾”的一种可选定义，不是“丝滑”的唯一正解。源码锚点 Fugro `400/90`；Apple 对弹性行为同样建议「从无过冲（100% damping）起调」（WWDC18 Designing Fluid Interfaces）。需遵守消费项目当前合同；CFE这次不采用。
- **沉降 settle（ζ 0.6–0.8）**：入场/hover/切换的一种设计取向，轻过冲后静止；具体过冲随模型与参数而变，不把范围换算成CSS bezier承诺。源码锚点 出海云 `480/34`、`380/26`；CSS 近似 = `cubic-bezier(0.34,1.15~1.25,0.42,1)` @450–700ms（历史设计近似，不宣称CSS与spring物理等价）。
- **回摆 wobble（ζ 0.15–0.35）**：只给动量冲量型，振幅 ≤9px、1-2 次可见回摆即停。源码锚点 CFE `K=100/D=5`。别用在入场位移上——入场回摆 = 果冻感。

**历史建议的修正（11-09）：** 旧稿曾推荐CFE保留K100/D5、图内500–700ms沉降并称20px为可读下限；这些是当时的设计取舍，不是有证据的硬门槛，现已撤回其默认地位。

| 想解决什么 | 最小默认 | 什么时候才继续 |
|---|---|---|
| 图文疏远/段距过大 | 修grid同排；分别收gap、margin、行高和section padding | 静态排版已正确，用户仍需要信息表达上的运动 |
| 普通业务页显得生硬 | 零运动也合格；可选整组一次ease-out入场 | 数值按实际字号、内容与设备验证；本次CFE9px/350ms不代表标准 |
| 想要spring/settle | 不安装新库；现有交互确需反馈才使用原组件能力 | 查清spring属于浮卡、列表还是滚动；不能把出海云380/26、480/34当页面参数 |
| 想要长停驻/吸附 | 默认不做 | 有逐步揭示价值、有限行程和完整输入验收，见center-dwell的B；先无平滑，再逐层证明必要 |
| 想要图片回摆/视差 | 默认不加 | 仅装饰层、有明确收益与PRM/离屏清理；不是“禁库”就自研rAF物理 |

### do / don't

**像画廊（do）**

- 图与说明形成一个空间单元；框/签/叠图caption沿用该项目已批准的表现，不把旧CFE造型升级为通用规范。
- 变换只碰 `transform`/`opacity`；sway 用独立 `translate` 属性以免和 reveal/hover 的 `transform` 打架（`site.ts:549-551`）；图内运动须按实际裁剪尺寸、位移和过冲计算bleed；固定1.03不保证覆盖，零运动不必额外放大。
- 若激活态实测边界抖动，再考虑滞回；出海云StageBlock实际只有amount=.45，不能声称已有双阈值。Nav收缩才有>40/<12双阈值。
- 媒体预载按体积和显示需求取舍；旧CFE媒体池是历史机制，现用独立配对图片，不建议为动效预载所有大图。
- 同一视口至多一条 autoplay clip；视频帧和 sway 不叠加（`site.ts:545-551` 注释、night-1106 节奏合同）。
- PRM = 整机制不安装（不加 class、不加 scale、不留位移），不是「动画减速版」。

**像 AI 模板（don't）**

- 全幅照片带当节拍器：photo → 白字条 → photo 等距循环（`index.astro:250-253` 注释里被点名拆掉的形态）。
- 为纯审美叠长pin、scrub、snap、smooth-scroll。NN/g反对的是无功能收益、成本过高的滚动劫持，不是证明所有库/吸附/进度条都不可用；有明确价值的短机制可依center-dwell B独立验证。
- 大件（整段、全宽图带）用欠阻尼入场——回摆放大大件质量感=果冻；欠阻尼只给小件（≤卡片级）。
- 视差瀑布：多层全段绑 scrollY 差速（Anduril 式）——CFE Don't 表与节奏合同都禁；要深度感就用「成对版面 + 签」的静态纵深。
- 每个元素都 reveal：reveal 是入场仪式不是默认装饰，组内交错 ≤~90ms、元素 ≤一组一屏。
- 同一属性被多套进度/插值同时控制；不要把“物理分类齐全”当设计目标。不同局部可有不同反馈，但需明确所有者并实测停止/反向。

### 可选配方 A：已有React/Motion项目的局部机制（非默认全部复制）

```tsx
// rail：sticky 索引列，点击 anchor 跳段；亮条用 layoutId 滑移不换组件
<nav className="hidden md:block">
  <ul className="sticky top-28 space-y-5 py-8">
    {STAGES.map((s, i) => (
      <li key={s.key} className="relative pl-4">
        {i === active && <motion.span layoutId="railbar" className="absolute left-0 top-0 h-full w-0.5 bg-primary" />}
        <a href={`#stage-${s.key}`} aria-current={i === active ? 'location' : undefined}>{s.label}</a>
      </li>
    ))}
  </ul>
</nav>

// stage：amount 0.45 点亮 rail；场景入场 once + amount 0.15
const inView = useInView(ref, { amount: 0.45 });
useEffect(() => { if (inView) onActive(index); }, [inView]);
<motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}>

// hero差速：仅为原例观察，不为禁库项目改写一份rAF替身
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const yL = useTransform(scrollYProgress, [0.03, 0.6], [36, -64]);
const yR = useTransform(scrollYProgress, [0.03, 0.6], [28, 52]);
const shrink = useTransform(scrollYProgress, [0, 0.55], [1, 0.9]);

// 列表/浮卡沉降：ζ≈0.7 档，别用 bounce>0.4
transition={{ type: 'spring', stiffness: 380, damping: 26 }}
```

### 历史配方 B：vanilla rAF 弹簧（模型参考；当前CFE章节已撤）

```ts
// 动量回摆：scroll 速度 → 冲量；位移永远弹回 0，不绑 scrollY。
// K=100 D=5 → ω≈10rad/s ζ≈0.25；clamp ±6/±9px；落定即停 rAF。
v += (-K * x - D * v) * dt;   // 半隐式欧拉，dt cap 50ms
x += v * dt;
// scroll listener 只注入冲量：v += dy * gain（gain .2/.3，v cap ±500）

// 拖尾 follower（若某 scroll-coupled 值获批）：过阻尼追目标，不回摆。
// target = clamp(progress, 0, 1) * range;  K=400 D=90~126 → ζ≥1.5
v += (-K * (x - target) - D * v) * dt;
x += v * dt;
```

要点：IntersectionObserver `rootMargin 15%` 做激活闸，离屏元素 x/v 清零并把 `translate` 置空；PRM 分支**什么都不装**；`translate` 独立属性承载运动，不碰 reveal/hover 在用的 `transform`。

### 09:31 CFE 映射：技术基线的历史记录

11-08的相框→裸边/叠图说明决策继续成立；旧媒体池、hover轮换、独立图片settle和动量回摆建议已被11-09轻量决策覆盖。[当时补丁 `9218763`](https://github.com/lizliz404/cfe-app/commit/921876334e30894d2b3042937bfd2cc7a633d6d7)保留内容与品牌、用自然流配对，详见本文开头及center-dwell对比表。

- `.editorial-dance`：整组一次轻入场，不再给图另加反向settle/hover位移；vision独立文字wipe撤掉。
- `.index-panel`：每组独立grid；桌面两列明确同一row，移动端图片在前；不再有pin spacer、全屏槽、snap或场景循环。
- `.stat-photo`及章节静图：退出首页章节sway/过冲；内页动效不顺手全删。
- `.clip-card`/hero/导航等其他机制不因这次修复另行重做；无新目录、库或物理控制器。
- 旧版配方与源码账本用于理解模型，不应当自动复制成下一项目的默认实现。

## 边界（硬性 guardrail）

- scroll-coupled = 值绑scrollY/进度；是否允许由项目当前合同与信息价值决定，不作跨项目“非法”断言。CFE当前章节使用自然流。
- 业务阅读内容默认不scrub/变速；NN/g是风险与取舍证据，不是“所有动画文字永不允许”的标准。
- ζ范围是本稿的历史设计分类，不是普适规范；新scroll-coupled机制先证明必要，再讨论物理。当前CFE章节不需要这些档位。
- 裁剪框内运动的图，bleed ≥ excursion（scale 盈余 ≥ 位移+过冲所需的覆盖），否则露框边。
- PRM：机制不安装，不是减速；弱网/`saveData` 视频帧不加载（`index.astro:276-278` 的 media query 门）。
- 参数改动必须落 token 或常量带注释出处；散写魔法数 = 下次评审的欠债。

## 证据链

**历史源码观察（旧路径/行号；当前固定提交链接见center-dwell）**

- 出海云 sticky rail：`~/dev/chuhai-cloud/web/src/landing/Landing.tsx:129-163`（`sticky top-28` `:133`、`useInView amount:0.45` `:179`）；轨宽 `landing-layout.css:34-43`。
- 出海云 hero 差速 + shrink + 卫星：`hero.tsx:75-80,118-163`；询盘列表 `spring 480/34` `:371`；滞回 `:34-37`；`EASE` `ui.tsx:6`；浮卡 `spring 380/26` `ui.tsx:222`；卫星拖拽 `hero.tsx:169-182`。
- Fugro 视差弹簧：`cases/fugro-rea/evidence/audit/app.js` module 90568（offset=30、stiffness 400 / damping 90、bleed 容器公式）；入场容器 module 37138（`[.465,.183,.153,.946]` .75s stagger .25s）；登记摘要 `cfe-shanghai-website/DESIGN.md:54`。
- CFE sway：`cfe-app/src/scripts/site.ts:535-644`；dance 物理 `src/pages/index.astro:1127-1160,1249-1260,1322-1333`；index-media `index.astro:364-463`；clip-card `index.astro:538-570,1380-1430`。
- 禁令与豁免：`cfe-shanghai-website/DESIGN.md:47`（M-01 禁 scrub/snap/pin/库/sticky 内容）、`:48-49`（hero 离场豁免）、`:54`（sway 第二豁免）、`:323,342-344`（位移/时长/sticky 白名单）。

**来源及证据边界**

11-09重新打开核验的GSAP、NN/g、W3C、MDN、Lenis集中在[分步滚动模板](./center-dwell-step-scroll.md)；它们支持原生优先/可选机制与API解释，**没有给统一阻尼标准**。以下保留原研究链接；Apple/Motion/Figma/DevTools/Chrome等并非本次全部重新访问，不把旧摘录当新验证，也不靠来源数量当结论质量。

1. Apple WWDC18 *Designing Fluid Interfaces* — 弹簧是可打断的连续行为；弹性行为「先按 100% damping / 无过冲起调」：`https://developer.apple.com/videos/play/wwdc2018/803/`
2. Motion `spring()` 文档 — bounce 默认 .25、duration 默认 800ms、负 bounce 产过阻尼形：`https://motion.dev/docs/spring`
3. Figma *How we built spring animations* — mass/stiffness/damping 物理模型与设计参数映射：`https://www.figma.com/blog/how-we-built-spring-animations/`
4. DevTools *Modern CSS Motion* — ζ=c/(2√km) 公式、弹簧→cubic-bezier 拟合、轻阻尼 vs 近临界档语义：`https://www.devtools.tools/blog/modern-css-animation-tools-guide`
5. NN/g *Scrolljacking 101* — 改滚速+变文字=最差可用性、只在 fold 下用、限文字量、保留正常滚动段：`https://www.nngroup.com/articles/scrolljacking-101/`
6. Chrome for Developers *Parallax scroll effects* — CSS scroll-driven animations：view-timeline、`@supports (animation-range: entry)` 检测、PRM、transform/opacity-only、装饰性不补 fallback：`https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/parallax-scroll-effects`
7. CSS-Tricks *Bringing Back Parallax* — `scroll()` vs `view()`、`view(-100px)` inset 修闪烁：`https://css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations/`
8. darkroom Lenis — 平滑滚动库的 lerp 默认 0.1、`respectReducedMotion` 默认 true（禁库项目只学命名与克制）：`https://github.com/darkroomengineering/lenis`
9. Brok UI *Sticky Content Gallery* — sticky 文案列 + 流式 media 栈的最小参照实现（纯 CSS sticky、移动塌单栏）：`https://brokui.dev/blocks/sticky-content-gallery-split`
10. Mike Bostock *How To Scroll* — 滚动须即时反馈、留滚动 affordance：`https://bost.ocks.org/mike/scroll/`
