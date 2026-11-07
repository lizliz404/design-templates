---
name: image-text-gallery-dance
description: >-
  图文共舞 / 画廊感 / 滚动阻尼 playbook：sticky rail+流式列、成对编辑版面、差速漂移层、动量回摆四骨架的解剖与物理参数值域（stiffness/damping/位移/时长/阈值），React spring 与 vanilla rAF 双配方。Use when landing / B2B 长页要让图与文「一起动」而不是节拍器式照片带；when 有人要调阻尼感、沉降感、视差幅度却给不出数字；when 在 scroll-coupled 运动的合法边界（scroll-jacking 禁令）内选型；when 需要给 CFE 类禁库项目一个可拍板的参数区间。
---

# 图文共舞 · 画廊感滚动阻尼 playbook

面向 CFE 及类似 B2B 长页的「图与文一起动」机制手册。核心判断：**画廊感 = 结构骨架（谁和谁配对）+ 阻尼物理（怎么停）**，两者缺一只剩其中之一，就是「AI 模板滚动叙事」或「直愣愣」。上游实测源：出海云 landing（`~/dev/chuhai-cloud/web/src/landing/`）、Fugro 反汇编（`~/dev/repos/design-templates/cases/fugro-rea/`）、CFE 现实现（`~/dev/cfe-app/src/pages/index.astro`、`~/dev/cfe-app/src/scripts/site.ts`）；网上最佳实践见文末证据链。

## 流程（何时跑、按序做什么、终点怎么判）

**何时跑**：landing / 长页改版评审「图文节奏差」「照片带像贴片」「滚动没有阻尼感」；或有人要把 scroll-linked 运动加进一个禁 scroll-jacking 的项目。

**按序**：

1. **先选骨架**（下表五种），骨架定了气质就定了大半——同一段文案，贴照片带是节拍器，收成成对版面才是画廊。
2. **再定阻尼语义档**（三档互斥：拖尾 trail / 沉降 settle / 回摆 wobble），每个机制只消费一档，不混。
3. **从值域表抄数字**，不写「丝滑」「高级」这种词——每个值必须有出处或落在本表区间内。
4. **对禁令合同**：scroll-coupled（值绑 scrollY/scroll 进度）默认非法；合法的是「入场一次」「hover 耦合」「动量冲量」三类，越界先登记豁免再实施。
5. **终点**：PRM 全关后页面信息零损；慢速滚动/急停/回滚三种手势下运动都不露框边（图内 bleed ≥ excursion）、不弹超两次、文字全程可读不 scrub。

## 机制依据

### 模式解剖：画廊感的四种骨架 + 一个反面

| 骨架 | 结构 | 实测出处 | 适用条件 |
|---|---|---|---|
| **Sticky rail + 流式列** | 左轨 `sticky top-28` 放章节索引/标签，右列 panel 依次滚过；IO `amount 0.45` 点亮 rail，活动条用 `layoutId` 滑移 | 出海云 `Landing.tsx:129-163`（rail `<ul class="sticky top-28">`、StageBlock `useInView(amount:0.45)` `:179`、`scroll-mt-24` `:184`）；轨宽 13rem@768 / 17rem@1200 `landing-layout.css:36-43` | 有 ≥3 个可编号段落且每段够高；rail 内容必须是导航/索引语义（点击可跳），放正文段落就退化成 pin 叙事 |
| **成对编辑版面（paired spread）** | copy 列 + 画框列在同一 `.wrap` 内 `align-items:center`；画框下沿挂「签」（idx + 一句说明），像美术馆展签 | CFE `index.astro:226-286, 675-703`（`.editorial-dance` grid `6fr/6fr` `:1549-1554`）；签 = `.dance-caption` `:1177-1202` | 每章都有「主张句 + 一张证据图」可配对；两列宽度差距 ≤1.5fr，差距再大就不是对页而是配图 |
| **差速漂移层（satellite drift）** | 中心 stage 之外挂 2-3 个小件，滚过时**对向**位移（一个上一个下），入场窗窄（progress 3%-16%），总行程 90-140px | 出海云 `hero.tsx:76-80`（`yL 36→-64`、`yR 28→+52`、`yB 40→-40` over progress .03→.6；`satOp 0→1` over .03→.16）；可拖玩 `dragSnapToOrigin` `:169-182` | 只给 hero/氛围层；每页一套，第二套即吵闹；件必须小（≤13rem 卡），大件对漂 = 视差瀑布 |
| **动量回摆（momentum sway）** | 滚动**速度**注入冲量进欠阻尼弹簧，位移 ±几 px 后弹回零位；位置永不绑 scrollY | CFE `site.ts:535-644`（K=100 D=5、gain .2/.3、clamp ±6/±9px、v cap ±500、IO rootMargin 15%、PRM 不安装）；源机制 Fugro `fugro-rea/evidence/audit/app.js` module 90568 | 只给裁剪框内的**静图**（`.js-sway` 加 5% scale bleed 不露边 `site.ts:549-551`）；动资源（视频层）零叠加，否则双动打架 |
| **反面：节拍器带** | 白字条 → 全幅照片带 → 大空白 → 白字条，等距循环 | CFE 2026-11-07 返工注释（`index.astro:250-253, 535-537, 616-619`——把三个「照片带+空白缝」全部收回 `.wrap` 内成对版面） | 任何节奏均匀的 photo→text→photo 循环都是它；判定法：相邻两章的照片能不能互换位置而无人发现——能，就是贴片不是共舞 |

Sticky rail 的变种证据：Fugro 把整条长页做成 sticky「Jump to」锚点册页（`fugro-rea/TEARDOWN.md:147,164`，`position:sticky;top:0` + 橙线下标）；Brok UI 的 sticky-content-gallery 是同骨架的最小参照实现（sticky 文案列 + 流式 media 栈，`lg:sticky lg:top-24 lg:self-start`，移动端塌单栏，纯 CSS 零 JS）——见证据链。出海云 `landing-next/LandingNext.tsx:155-220` 走了另一条路（tab 制 ProductTheater，无滚动共舞），说明该形态是选项不是升级，现发版 sticky rail 仍是正解。

### 「画廊感」从哪来（结构层，先于动效）

- **画框 + 展签**：图被 1px 诚实边框裁住，下沿挂 mono 序号 + 一句说明（`.dance-caption` `index.astro:1177-1202`）——框和签是「展品」语义，裸图是「插图」语义。
- **mono 章节编号连续**：01/02/… 贯穿全页（Fugro 册页目录、Anduril `01/04` 骨架；`fugro-rea/CFE-IMPLICATIONS.md:42`、`saronic-rea/CFE-IMPLICATIONS.md:11`）。
- **文字静止，图动**：NN/g 实测滚劫 + 变文字 = 最差可用性（`nngroup.com/articles/scrolljacking-101/`）——文字永远是读者站立的地板，图在框里沉降/回摆。文字最多做入场 reveal 一次，不随滚动变化。
- **restaint（克制）即质感**：位移以「几 px ~ 140px」为全部量程；能让用户说出「这页很稳但有活气」而说不出哪里动了，就是画廊。Fugro 全站视差位移只有 ±30px（见下）。

### 物理参数值域（每条带出处）

弹簧物理通识：ζ = c / (2·√(k·m))；ζ<1 欠阻尼（会过冲）、=1 临界、>1 过阻尼（拖尾不回摆）。出处：`devtools.tools/blog/modern-css-animation-tools-guide`、`figma.com/blog/how-we-built-spring-animations/`。Motion 的 `spring()` 时间参默认 `duration 800ms / bounce .25`，负 bounce 产过阻尼「起步快、沉降慢、零过冲」（`motion.dev/docs/spring`）。

| 机制 | 参数实测值 | 阻尼语义 | 出处 |
|---|---|---|---|
| Fugro 滚动视差 | `useTransform(scrollY,[top-vh,top+offset],[+30,-30])` → `useSpring{stiffness:400,damping:90}`，ζ≈2.25 **过阻尼拖尾**；容器 `width:105%;height:calc(100%+2*offset);margin-top:-offset`（60px bleed）| 拖尾 trail | `fugro-rea/evidence/audit/app.js` module 90568（`sc-93c6951a-0`）；登记亦见 `cfe-shanghai-website/DESIGN.md:54` |
| Fugro 入场容器 | `ease [.465,.183,.153,.946]` 0.75s、`staggerChildren .25s` | 缓动（非弹簧） | 同上 app.js module 37138 |
| 出海云 hero 差速 | progress 窗 `.03→.6`，三层 `36→-64 / 28→52 / 40→-40`；`shrink 1→0.9` over `0→.55`；卫星 opacity `0→1` over `.03→.16` | 直接 scrub（库驱动） | `hero.tsx:75-80` |
| 出海云询盘列表交换 | `spring{stiffness:480,damping:34}` ζ≈0.78 弱欠阻尼 | 沉降 settle | `hero.tsx:371` |
| 出海云场景浮卡 | `spring{stiffness:380,damping:26}` ζ≈0.67 + `delay`，进场 | 沉降 settle | `ui.tsx:222` |
| 出海云签名缓动 | `EASE=[0.25,1,0.5,1]`（easeOutQuint 族）全 landing 统一消费 | 缓动 | `ui.tsx:6` |
| 出海云 nav 滞回 | 下滑 >40 收缩、回顶 <12 才展开（iOS 橡皮筋不闪） | 阈值 hysteresis | `hero.tsx:34-37` |
| CFE 动量 sway | `K=100 D=5`（ω≈10rad/s，ζ≈0.25）冲量 gain .2/.3、`v cap ±500px/s`、位移 clamp `±6px`（小件）/`±9px`（大件）、`dt cap 50ms`、落定即停 rAF | 回摆 wobble | `site.ts:561-635` |
| CFE dance 沉降（待裁决） | `cubic-bezier(0.34,1.18/1.22,0.42,1)` 520/560/640/680ms；photo 休止 `scale 1.03`、pending `translateY(-1.25rem) scale(1.085)`、hover `-0.2rem scale(1.06)` | 沉降 settle | `index.astro:1127-1160,1249-1260`（hover）、`1322-1333`（stat） |
| CFE 白名单基线 | UI 动效 150–500ms、入场位移 ≤14px、`--ease-out` 族；reveal 交错 ~80-90ms；页标 wipe ≤1.2s | — | `cfe-shanghai-website/DESIGN.md:323,342` |

**阻尼语义三档（互斥，一个机制只消费一档）：**

- **拖尾 trail（ζ 1.5–2.5）**：scroll-coupled 值跟随滚动但拖后、无振荡。「阻尼感」一词的正解。实测锚点 Fugro `400/90`；Apple 对弹性行为同样建议「从无过冲（100% damping）起调」（WWDC18 Designing Fluid Interfaces）。**任何新 scroll-coupled 值在 CFE 类禁令下都要先登记豁免。**
- **沉降 settle（ζ 0.6–0.8）**：入场/hover/切换——一次轻过冲（≈2-6%）然后静止，读作「落定」不是「弹跳」。实测锚点 出海云 `480/34`、`380/26`；CSS 近似 = `cubic-bezier(0.34,1.15~1.25,0.42,1)` @450–700ms（CFE dance 包正落此档）。
- **回摆 wobble（ζ 0.15–0.35）**：只给动量冲量型，振幅 ≤9px、1-2 次可见回摆即停。实测锚点 CFE `K=100/D=5`。别用在入场位移上——入场回摆 = 果冻感。

**给 CFE 的推荐区间（待裁决输入，理由附后）：**

| 项 | 推荐值域 | 理由 |
|---|---|---|
| dance 沉降 ease | `cubic-bezier(0.34, 1.15–1.22, 0.42, 1)` 保留 | 现状就在此档；y1≤1.25 把过冲压在 ≈6%，严肃 B2B 不再往上 |
| dance 时长 | **500–700ms**（图内沉降） | 现状 520-680 实测；比 UI 白名单 150–500ms 慢是刻意——大面画框需要更长的沉降才读得出「停稳」，UI chrome 仍守 150–500ms |
| pending counter-offset | **≤20px，推荐保留 1.25rem** | 位移发生在裁剪框内部的 img 上、框体不动，不构成「元素入场位移 >14px」；要硬贴白名单则降到 ≤14px，但 20px 是「从反向轻轻落回」能被读到的下限 |
| scale 峰值 | **≤1.085** | 现状自设上限；配合 ≥3% bleed 不露边 |
| hover 耦合 | `translateY -0.15~-0.25rem` + `scale ≤1.065` | 现状 -0.2rem/1.06-1.065 即区间中值 |
| sway | **保持 K=100/D=5** | 已实测已登记（DESIGN.md:54 第二豁免），不动 |
| scroll-coupled 新值 | 默认无；若获准，**过阻尼 ζ≥1.5**（例 K=400/D≥90 或等价 `useSpring` 参数） | Fugro 实测 + Apple「先无过冲」；欠阻尼 scroll-coupled = 橡皮筋感 |
| reveal/hover 之外禁止 | 字距、filter 位移、content pin、scrub 文本 | 见边界节 |

### do / don't

**像画廊（do）**

- 图进框、框挂签：1px 边框 + mono idx + 一句说明；caption 放框外下沿不叠图（`index.astro:1177-1202`）。
- 变换只碰 `transform`/`opacity`；sway 用独立 `translate` 属性以免和 reveal/hover 的 `transform` 打架（`site.ts:549-551`）；任何裁剪框内会动的图默认 `scale ≥1.03` bleed。
- 阈值用滞回双阈值（亮 45% / 灭另设），nav 收缩类交互同理（`Landing.tsx:179`、`hero.tsx:34-37`）——单阈值在边界上抖。
- 媒体池一次预载全部候选再轮替，切图零请求（`index.astro:387-403` `.index-media` pool + `site.ts:509-533`）。
- 同一视口至多一条 autoplay clip；视频帧和 sway 不叠加（`site.ts:545-551` 注释、night-1106 节奏合同）。
- PRM = 整机制不安装（不加 class、不加 scale、不留位移），不是「动画减速版」。

**像 AI 模板（don't）**

- 全幅照片带当节拍器：photo → 白字条 → photo 等距循环（`index.astro:250-253` 注释里被点名拆掉的形态）。
- pin 章节、scrub 文本、scroll-snap、横向滚劫、滚动进度条、smooth-scroll 库——NN/g 实测用户会读成 bug 并跳出（`nngroup.com/articles/scrolljacking-101/`）；Webflow a11y 清单同判。
- 大件（整段、全宽图带）用欠阻尼入场——回摆放大大件质量感=果冻；欠阻尼只给小件（≤卡片级）。
- 视差瀑布：多层全段绑 scrollY 差速（Anduril 式）——CFE Don't 表与节奏合同都禁；要深度感就用「成对版面 + 签」的静态纵深。
- 每个元素都 reveal：reveal 是入场仪式不是默认装饰，组内交错 ≤~90ms、元素 ≤一组一屏。
- 拖尾 + 回摆混装：同一视觉体系里 scroll-coupled 值一律过阻尼，入场一律弱欠阻尼，回摆只属动量机制；混档即「该停不停」。

### 实现配方 A：React / Motion 最小骨架（sticky rail + 流式 stage + 差速卫星）

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

// hero 差速：对向位移 + 窄入场窗 + 整体 shrink（库场景才用，禁库项目走配方 B）
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const yL = useTransform(scrollYProgress, [0.03, 0.6], [36, -64]);
const yR = useTransform(scrollYProgress, [0.03, 0.6], [28, 52]);
const shrink = useTransform(scrollYProgress, [0, 0.55], [1, 0.9]);

// 列表/浮卡沉降：ζ≈0.7 档，别用 bounce>0.4
transition={{ type: 'spring', stiffness: 380, damping: 26 }}
```

### 实现配方 B：vanilla rAF 弹簧（禁库路线，CFE 已在跑）

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

### CFE 映射（建议，不实施）

对着 `cfe-app/src/pages/index.astro` 与 `src/scripts/site.ts`：

> **11-08 Liz 裁定**：dance-card 的相框+展签白板块形态在 CFE 作废，正解=字直压图（图侧 scrim+浅色文字）；「画框+展签」骨架本身仅作通用选项保留。

- **`.editorial-dance`（01 overview / 02 vision×2 / 05 quality / 06 network）**：已是「成对编辑版面」骨架，方向对。三件事：(a) 把散写的 `520/560/640/680ms` 与两条 bezier 收成 token（如 `--dance-dur` / `--dance-ease`），四处目前各写一遍；(b) pending `translateY(-1.25rem)`=20px 超白名单 ≤14px——建议**登记为 frame-内部 counter-offset 豁免**（位移在裁剪 img 上、卡片体不动），比降到 14px 保住「反向落回」可读性；(c) `scale(1.085)` 峰值与 `.js-sway` 的 5% bleed 并存时确认无叠乘露边（现状 dance-photo 不在 sway 目标集里，OK）。
- **`.stat-frame` / `.stat-photo`**：同族 hover 沉降（`-0.18rem`/`1.065`/`640ms` `index.astro:1322-1333`），并进上面同一组 token。
- **`.index-media`（strengths 行 → 媒体池）**：已是画廊最强件（Anduril 01/04 骨架 + hover/focus 即换 + 5.6s 轮播 + hold `index.astro:387-463`）。建议换帧加一个 ≤300ms 的沉降微过渡（opacity 或 ≤8px settle）——当前 `is-active` 硬切；HUD `01 / 04` 保留。
- **`.clip-card`**：与 dance-card 同族，统一参数；它已是「scope 章末的 in-flow 收束件」正解，不动结构。
- **不建议新增**：sticky 内容轨（CFE sticky 仅限导航 chrome，`DESIGN.md:47/344`；jump-bar 已在 wave12 删除——若未来在长详情页想要 rail，rail 内只能是章节索引即 chrome，sticky 正文/图列需 Liz 破例拍板）；任何新 scroll-coupled 位移（sway 与 hero 离场两豁免已满，`DESIGN.md:48-49,54`）。

## 边界（硬性 guardrail）

- scroll-coupled = 值绑 scrollY/scroll 进度，默认非法；合法通道只有入场一次、hover/focus 耦合、动量冲量、已登记豁免四项。
- 文字永不 scrub、永不随滚动变速；阅读面是静止的地板（NN/g 实测）。
- 欠阻尼只给小件与动量机制；scroll-coupled 值一律过阻尼（ζ≥1.5）；入场沉降 ζ∈[0.6,0.8]。
- 裁剪框内运动的图，bleed ≥ excursion（scale 盈余 ≥ 位移+过冲所需的覆盖），否则露框边。
- PRM：机制不安装，不是减速；弱网/`saveData` 视频帧不加载（`index.astro:276-278` 的 media query 门）。
- 参数改动必须落 token 或常量带注释出处；散写魔法数 = 下次评审的欠债。

## 证据链

**实测（文件:行号）**

- 出海云 sticky rail：`~/dev/chuhai-cloud/web/src/landing/Landing.tsx:129-163`（`sticky top-28` `:133`、`useInView amount:0.45` `:179`）；轨宽 `landing-layout.css:34-43`。
- 出海云 hero 差速 + shrink + 卫星：`hero.tsx:75-80,118-163`；询盘列表 `spring 480/34` `:371`；滞回 `:34-37`；`EASE` `ui.tsx:6`；浮卡 `spring 380/26` `ui.tsx:222`；卫星拖拽 `hero.tsx:169-182`。
- Fugro 视差弹簧：`cases/fugro-rea/evidence/audit/app.js` module 90568（offset=30、stiffness 400 / damping 90、bleed 容器公式）；入场容器 module 37138（`[.465,.183,.153,.946]` .75s stagger .25s）；登记摘要 `cfe-shanghai-website/DESIGN.md:54`。
- CFE sway：`cfe-app/src/scripts/site.ts:535-644`；dance 物理 `src/pages/index.astro:1127-1160,1249-1260,1322-1333`；index-media `index.astro:364-463`；clip-card `index.astro:538-570,1380-1430`。
- 禁令与豁免：`cfe-shanghai-website/DESIGN.md:47`（M-01 禁 scrub/snap/pin/库/sticky 内容）、`:48-49`（hero 离场豁免）、`:54`（sway 第二豁免）、`:323,342-344`（位移/时长/sticky 白名单）。

**网上最佳实践（≥5 独立来源）**

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
