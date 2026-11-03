---
name: landing-hero-background-video
description: >-
  首屏氛围交付选型：静图 WebP/AVIF 默认、条件启用短环视频 / Lottie / shader。Use when landing / marketing 首屏要定氛围层（静图还是运动）且关心「体感 ≤ ~4 秒」; when 有人默认「上视频 / 上 Video.js 才够档」; when 在 native `<video>`、Video.js v10 `<background-video>`、Vimeo/Stream 与 WebP 静图之间选型; when 需要和带控件的内容播放器尽调划清边界。
---

# 首屏氛围交付：WebP 常常够用，视频只是一条分支

正交于 B2B 对标（[`b2b-complex-sales-site-exemplars.md`](./b2b-complex-sales-site-exemplars.md)）与带控件的内容播放（[`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)）。本文管**首屏氛围层怎么交付**——静图是合法完整方案，不是「还没上视频的半成品」；muted loop 视频、Lottie、shader、重 WebGL 都是条件启用的分支。站点例子只作交付模式引用，不重写复杂销售策略。

探测对照：2026-11-03（Asia/Shanghai）活站；Video.js v10 background 体积数字来自当时整理的调研摘要（Liz / 当前公开研究口径），不是本 pack 独立重新打包测量。

## 流程（何时跑、按序做什么、终点怎么判）

**何时跑**：landing 首屏要定氛围（「直接 WebP 行不行？」「要不要上循环视频 / Video.js / WebGL？」）；或有人默认「对标 Anduril / 大牌站 = 必须上视频」。

**按序（决策树）**：

1. **信息 + 气质能否用一张压好的 WebP / AVIF（+ 可选轻 CSS）完成？** 能 → **停在静图**。对很多 B2B / 海工转化站，这就是投产比最高的默认。
2. 需要「微活」但不需要真实镜头？→ Lottie / Rive / CSS / 轻 paper-shader（见 [`paper-shaders/SKILL.md`](./paper-shaders/SKILL.md)）。
3. 运动必须是真实镜头 / 产品作业（设备在海、系统在转）？→ **Poster-first** + 严控体积的 native 短环；移动端可静图-only。
4. 才考虑封装（Video.js v10 background）、托管 ABR（Mux / CF Stream）、iframe（Vimeo）、重 WebGL（Anduril Hydra 级）。

`prefers-reduced-motion` / 弱网 / `saveData` 全程必须能退化到静帧。

**终点**：主文案与 CTA 先可读（目标量级：约 4 秒内信息面可用）；氛围层不拖垮 LCP；减动效用户看到的是静帧，不是卡顿循环。**「等不超过约 4 秒」首先指信息面可用，不是视频一定播起来。**

## 机制依据（按需查的平铺规则）

### 第一性原理：首屏在同时做几件事

权重因站而异，先拆开再选型：

| # | 目的 | 静图 / 海报能否交付 | 运动层额外贡献 |
|---|---|---|---|
| 1 | 立刻可读的主文案 / CTA（信息） | **能**（且必须优先） | 无；运动不得挡字 |
| 2 | 可信 / 品类气质（氛围） | **能**（一张好现场图往往够） | 可选增强 |
| 3 | 「活」感（微动、循环、电影感） | 否 | **只服务这一项** |
| 4 | 不耽误 LCP / 弱网 / 减动效（约束） | 静图最友好 | 视频 / 重动效最易破坏 |

**因此：直接用 WebP（或 AVIF）静图，对很多 B2B / 海工转化站不仅「可以」，而且常常是默认最优。** 只有当运动本身承载品类叙事（产品在作业、海工现场、系统运转）且预算够压码时，才上循环视频或更重方案。不要为了对标 Anduril 硬上视频。

### 方法目录（从头到尾平铺）

| 方法 | 机制一句话 | 默认态度 |
|---|---|---|
| 静态位图 JPEG / WebP / AVIF | `<img>` / CSS `background`；零解码运动 | **推荐默认** |
| 响应式静图 `srcset` + 艺术方向 | 不同裁切 / 密度，仍静 | 推荐默认的加强版 |
| 渐变 / CSS 动效 / mesh | 无位图或极轻 | 条件启用（抽象氛围） |
| Paper shader / 轻 WebGL 氛围 | 见 [`paper-shaders`](./paper-shaders/SKILL.md)；非视频 | 条件启用 |
| 插画 / SVG / 等距线稿 | 矢量或少量资产 | 条件启用（SaaS 气质多） |
| Animated WebP / APNG / GIF | 帧动画，无音轨；体积易炸 | **默认跳过** |
| CSS sprite / 步进帧 | 可控但制作重 | 默认跳过（特例可） |
| Lottie / Rive | 矢量动效，交互友好 | 条件启用（微活） |
| Native `<video>` muted loop | MP4 / WebM 短环 | 条件启用（真实镜头） |
| Poster-first → 延迟挂视频 | 静图抢 LCP + 可选增强（Cloudflare 模式） | **上视频时的推荐路径** |
| Video.js v10 `<background-video>` | 轻封装 native | 条件启用（要封装时） |
| Vimeo / YouTube background iframe | 易上手，控制弱、重 | **默认跳过** |
| Mux / CF Stream / HLS 背景 | ABR，中等成本 | 条件启用（多档网络） |
| Canvas 帧序列 | 可控但体积 / CPU | 默认跳过 |
| 重 WebGL / 产品几何（Anduril Hydra 级） | 叙事天花板，团队贵 | 条件启用（有专班时） |
| 滚动 scrub 视频 | 互动强 | **首屏默认跳过** |

### 各角度衡量（定性，不装假分数）

按轴看：字节 / LCP、活感上限、制作改版成本、移动 CPU/电池、减动效退化、自动播放可靠性、CDN 费用、海工气质匹配、团队门槛。

| 方法族 | 字节·LCP | 活感上限 | 制作/改版 | 移动耗电 | 减动效退化 | 自动播放 | CDN 费用 | 海工气质 | 门槛 |
|---|---|---|---|---|---|---|---|---|---|
| WebP/AVIF 静图（± srcset） | **优** | 低 | **低** | **优** | 天然静 | 不适用 | 低 | **高**（现场图） | 低 |
| CSS / 渐变 / 轻 mesh | 优 | 低–中 | 低–中 | 优–中 | 易关 | 不适用 | 低 | 中（偏抽象） | 低 |
| Paper shader / 轻 WebGL | 中 | 中 | 中 | 中 | 需 JS 关 | 不适用 | 低 | 中 | 中 |
| 插画 / SVG | 优 | 低–中 | 中 | 优 | 易 | 不适用 | 低 | 低–中（偏 SaaS） | 中 |
| Lottie / Rive | 优–中 | 中 | 中 | 中 | 易 | 不适用 | 低 | 低–中 | 中 |
| Animated WebP/GIF | **差**（易炸） | 中 | 中 | 中–差 | 需停 | 不适用 | 中 | 低 | 低 |
| Native 短环 + poster-first | 中（控好则稳） | **高** | 中–高 | 中 | 留海报 | 需 muted/playsinline | 中 | **高**（真镜头） | 中 |
| Video.js v10 background | 同 native + 几 KB JS | 同 native | 同 + 依赖 | 同 | 同 | 同 | 同 | 同 | 中 |
| Vimeo/YT iframe 背景 | **差** | 高 | 低（外包） | 差 | 难控 | 平台策略 | 平台侧 | 中 | 低 |
| Mux / Stream / HLS 背景 | 中（ABR 帮弱网） | 高 | 中 | 中 | 需设计 | 同 video | 中–高 | 高 | 中 |
| Canvas 帧序列 | 差–中 | 高 | 高 | 差 | 需设计 | 自控 | 中 | 中 | 高 |
| 重 WebGL / Hydra 级 | 中–高（WASM/模型） | **很高** | **很高** | 中–差 | 需专做 | 不适用 | 中 | 高（系统叙事） | **很高** |
| 滚动 scrub | 中–高 | 高（互动） | 高 | 中–差 | 需设计 | 自控 | 中 | 中 | 高 |

读表口诀：**海工复杂销售站优先「静图默认 → 真镜头才上短环」**；SaaS 抽象气质可走插画 / shader / Lottie，仍不必默认满屏视频。

### 一句话（落到视频分支时）

**不是「极低成本」的绝对最优解，但 Video.js v10 的 background 已经足够轻、接近可用。真正决定「等不超过约 4 秒」的，是视频文件本身 + 海报图 + CDN，而不是播放器。** 若只要 MP4 / WebM 循环背景，**native `<video>` 更优（零 JS）**。静图路径连这一句都可以跳过。

### Video.js v10 background（调研摘要数字）

相对老版 Video.js（数百 kB）轻很多；本质是包一层 native `<video>`，默认 `muted` + `loop` + `autoplay` + `playsinline`，没有完整控制条 / 音频 / 多余能力：

| 形态 | 约体积（min / gzip） |
|---|---|
| HTML `<background-video>` | ~22 kB / 6.9 kB |
| React 版 | ~10.7 kB / 3.5 kB |
| 带轻量 HLS（SPF） | ~61 kB / 19 kB |

结论：用它做 landing 背景时，**JS 成本已不是主瓶颈**；仍解决不了「片子太大」。带控件、字幕、分析、长视频回看 → 回到 [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)。

### 影响「等很久」的因素（按重要性；视频分支）

1. **视频字节（最大头）**  
   短循环 8–15 秒、去音频、H.264（兼容）+ WebM / AV1（更小）、开启 faststart。实用预算：**桌面 1–3 MB，移动端低于 2 MB**。超过 5–8 MB 在移动网络上很容易破约 4 秒体感。

2. **海报作 LCP**  
   高质量但压好的 WebP / AVIF（几十到一百多 kB）先出；视频后台加载再无缝替换。「感觉很快」的站几乎都靠这一招。**同一张海报在「只静图」路径里就是最终交付。**

3. **CDN + 缓存**  
   Cloudflare / Bunny / Fastly 等边缘 + 合理 cache header；冷启动也要短。

4. **播放器本身**  
   Native 或 Video.js v10 background 都行。老版 Video.js、完整播放器、重 iframe 嵌入才会明显拖后腿。

### 活站对照（只记媒体交付，不记商业模式）

- **停在静图 / 非视频氛围也常见**：[Linear](https://linear.app/) / [Stripe](https://stripe.com/) / [Vercel](https://vercel.com/) 首屏常常**不上**满屏背景视频（插画 / WebGL / shader 另路）——证明「大牌 ≠ 必须 video」。
- **[Cloudflare](https://www.cloudflare.com/)**：教科书级**视频分支**——`preload="none"`、AVIF poster ≈18 KB、闲时再挂 `data-src`；弱网 / `saveData` / `prefers-reduced-motion` 直接跳过；约 5 MB H.264、8 秒环。**上视频时最值得直接抄的交付模式。**
- **[Anduril](https://www.anduril.com/)**：Sanity 多码率 MP4 阶梯（约 8.6 / 4.2 / 2.1 MB 按宽度）+ 小海报；无 Video.js。学叙事与阶梯，**不默认复制整套 WebGL。**
- **[Baker Hughes](https://www.bakerhughes.com/)**：原生 hero + poster；轮播里曾见约 18 MB 一帧 → **反面教材**（Video.js 用在能力页 YouTube，不是背景）。
- **[TechnipFMC](https://www.technipfmc.com/)**：Vimeo background iframe + webp 静图——iframe 路线控制弱，静图层反而更稳。
- **Saronic / Anduril / SLB 这一类站**：多半是高度压缩的短环 + 强海报优先 + 好 CDN + native 或极轻封装——「快」来自资产与交付，不是神奇播放器。（措辞保留「多半」，不是逐站反汇编结论。）

### 性价比表（已决定需要「真镜头运动」之后）

| 需求 | 推荐做法 | 成本感受 |
|---|---|---|
| 只要信息 + 气质 | **WebP / AVIF 静图**（± srcset）+ 可选轻 CSS | **最低（默认）** |
| 微活、非镜头 | Lottie / Rive / CSS / paper-shader | 低–中 |
| 极致加载速度的真镜头 | Native `<video>` + 优化 MP4 / WebM + 海报优先 + CDN | 视频分支里最低 |
| 需要一点封装 / 一致性 | Video.js v10 `<background-video>`（或 React 版） | 几乎可忽略 |
| 需要自适应码率 | Video.js v10 + 轻量 HLS，或 Mux / Cloudflare Stream 的 background 交付 | 中等 |
| 长视频 / 有控制条 / 分析 | 完整播放器或视频平台 → [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md) | 更高 |

Mux / Cloudflare Stream 等可作为 ABR / 托管背景的可选交付层；本文不安装插件、不绑定某一家账号流程。

### 均衡落地骨架

**静图默认（常够用）：**

```html
<img
  src="hero.webp"
  srcset="hero-800.webp 800w, hero-1600.webp 1600w"
  sizes="100vw"
  alt=""
  fetchpriority="high"
  class="hero-still"
>
```

**已证明需要真镜头时（海报抢 LCP，视频后台挂）：**

```html
<!-- 海报作为 LCP，视频后台加载 -->
<img src="hero-poster.webp" alt="" fetchpriority="high" class="hero-poster">

<video autoplay muted loop playsinline preload="metadata" poster="hero-poster.webp">
  <source src="hero.webm" type="video/webm">
  <source src="hero.mp4" type="video/mp4">
</video>
```

- 视频控在约 1–3 MB（移动更严）；移动可只留海报。
- 海报 / 静图 WebP / AVIF，预加载 / `fetchpriority="high"`。
- 尊重 `prefers-reduced-motion`：用户选了减少动画就停视频、留海报。
- 资源放 CDN；可按视口降档、弱网跳过（Cloudflare 首页模式）。

## 边界（硬性 guardrail）

- **WebP / AVIF 静图是合法完整方案**，不是半成品；不要为了对标 Anduril 或「感觉高级」硬上视频。
- 装饰背景 ≠ 内容播放器：要进度条 / 字幕 / HLS 审片 / QoE，打开 [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)，不要拿 background 组件硬扛。
- `prefers-reduced-motion` / 弱网 / `saveData` 必须能退化到静帧。
- 不把老版 Video.js 体积观感套到 v10 background；也不把 v10 background 当成「零成本最优」。
- Animated WebP / GIF / 首屏 scrub / 重 iframe 背景默认跳过，除非有明确制作与性能预算。
- 营销叠层（Drupal / AEM / Next）与媒体交付链分开决策；对标站商业故事见 [`b2b-complex-sales-site-exemplars.md`](./b2b-complex-sales-site-exemplars.md)。
- 体积数字与站点阶梯来自探测日快照；上线前用本项目真实网络重测，不把他人 MB 数当 SLA。
