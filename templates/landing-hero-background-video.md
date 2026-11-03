---
name: landing-hero-background-video
description: >-
  Landing 首屏装饰性背景视频：海报优先、体积预算、native vs Video.js v10 background。Use when landing / marketing 首屏要上 muted loop 背景视频且关心「体感 ≤ ~4 秒」; when 在 native `<video>`、Video.js v10 `<background-video>`、Vimeo/Stream 背景方案之间选型; when 需要和带控件的内容播放器尽调划清边界。
---

# Landing 首屏背景视频：文件 + 海报 + CDN，不是播放器魔术

正交于 B2B 对标（[`b2b-complex-sales-site-exemplars.md`](./b2b-complex-sales-site-exemplars.md)）与带控件的内容播放（[`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)）。本文只管**装饰性、静音、自动循环**的 hero / 背景层。站点例子只作交付模式引用，不重写复杂销售策略。

探测对照：2026-11-03（Asia/Shanghai）活站；Video.js v10 background 体积数字来自当时整理的调研摘要（Liz / 当前公开研究口径），不是本 pack 独立重新打包测量。

## 流程（何时跑、按序做什么、终点怎么判）

**何时跑**：landing 首屏要氛围视频；或有人默认「上 Video.js / 上完整播放器就能又快又炫」。

**按序**：

1. 先问要不要视频——静图 / WebGL / 插画往往更轻；`prefers-reduced-motion` 必须能关掉运动。
2. 定资产预算：短环、无声、码率与分辨率阶梯；海报抢 LCP。
3. 选交付：CDN + cache；播放器层默认 native；需要一点封装再考虑 Video.js v10 background；需要 ABR 再谈轻量 HLS / Stream。
4. 终点：弱网 / 移动上「先看到内容」体感可接受（目标量级：等不超过约 4 秒看到可用首屏），视频在后台无缝替换；减动效用户看到的是静帧而非卡顿循环。

## 机制依据（按需查的平铺规则）

### 一句话

**不是「极低成本」的绝对最优解，但 Video.js v10 的 background 已经足够轻、接近可用。真正决定「等不超过约 4 秒」的，是视频文件本身 + 海报图 + CDN，而不是播放器。** 若只要 MP4 / WebM 循环背景，**native `<video>` 更优（零 JS）**。

### Video.js v10 background（调研摘要数字）

相对老版 Video.js（数百 kB）轻很多；本质是包一层 native `<video>`，默认 `muted` + `loop` + `autoplay` + `playsinline`，没有完整控制条 / 音频 / 多余能力：

| 形态 | 约体积（min / gzip） |
|---|---|
| HTML `<background-video>` | ~22 kB / 6.9 kB |
| React 版 | ~10.7 kB / 3.5 kB |
| 带轻量 HLS（SPF） | ~61 kB / 19 kB |

结论：用它做 landing 背景时，**JS 成本已不是主瓶颈**；仍解决不了「片子太大」。带控件、字幕、分析、长视频回看 → 回到 [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)。

### 影响「等很久」的因素（按重要性）

1. **视频字节（最大头）**  
   短循环 8–15 秒、去音频、H.264（兼容）+ WebM / AV1（更小）、开启 faststart。实用预算：**桌面 1–3 MB，移动端低于 2 MB**。超过 5–8 MB 在移动网络上很容易破约 4 秒体感。

2. **海报作 LCP**  
   高质量但压好的 WebP / AVIF（几十到一百多 kB）先出；视频后台加载再无缝替换。「感觉很快」的站几乎都靠这一招。

3. **CDN + 缓存**  
   Cloudflare / Bunny / Fastly 等边缘 + 合理 cache header；冷启动也要短。

4. **播放器本身**  
   Native 或 Video.js v10 background 都行。老版 Video.js、完整播放器、重 iframe 嵌入才会明显拖后腿。

### 活站对照（只记媒体交付，不记商业模式）

- **[Cloudflare](https://www.cloudflare.com/)**：教科书——`preload="none"`、AVIF poster ≈18 KB、闲时再挂 `data-src`；弱网 / `saveData` / `prefers-reduced-motion` 直接跳过；约 5 MB H.264、8 秒环。**最值得直接抄的交付模式。**
- **[Anduril](https://www.anduril.com/)**：Sanity 多码率 MP4 阶梯（约 8.6 / 4.2 / 2.1 MB 按宽度）+ 小海报；无 Video.js。
- **[Baker Hughes](https://www.bakerhughes.com/)**：原生 hero + poster；轮播里曾见约 18 MB 一帧 → **反面教材**（Video.js 用在能力页 YouTube，不是背景）。
- **[TechnipFMC](https://www.technipfmc.com/)**：Vimeo background iframe + webp 静图。
- **[Linear](https://linear.app/) / [Stripe](https://stripe.com/) / [Vercel](https://vercel.com/)**：首屏常常**不上**满屏背景视频（插画 / WebGL / shader 另路）。
- **Saronic / Anduril / SLB 这一类站**：多半是高度压缩的短环 + 强海报优先 + 好 CDN + native 或极轻封装——「快」来自资产与交付，不是神奇播放器。（措辞保留「多半」，不是逐站反汇编结论。）

### 性价比表

| 需求 | 推荐做法 | 成本感受 |
|---|---|---|
| 极致加载速度 | Native `<video>` + 优化 MP4 / WebM + 海报优先 + CDN | 最低 |
| 需要一点封装 / 一致性 | Video.js v10 `<background-video>`（或 React 版） | 几乎可忽略 |
| 需要自适应码率 | Video.js v10 + 轻量 HLS，或 Mux / Cloudflare Stream 的 background 交付 | 中等 |
| 长视频 / 有控制条 / 分析 | 完整播放器或视频平台 → [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md) | 更高 |

Mux / Cloudflare Stream 等可作为 ABR / 托管背景的可选交付层；本文不安装插件、不绑定某一家账号流程。

### 均衡落地骨架

```html
<!-- 海报作为 LCP，视频后台加载 -->
<img src="hero-poster.webp" alt="" fetchpriority="high" class="hero-poster">

<video autoplay muted loop playsinline preload="metadata" poster="hero-poster.webp">
  <source src="hero.webm" type="video/webm">
  <source src="hero.mp4" type="video/mp4">
</video>
```

- 视频控在约 1–3 MB（移动更严）。
- 海报 WebP / AVIF，预加载 / `fetchpriority="high"`。
- 尊重 `prefers-reduced-motion`：用户选了减少动画就停视频、留海报。
- 资源放 CDN；可按视口降档、弱网跳过（Cloudflare 首页模式）。

## 边界（硬性 guardrail）

- 装饰背景 ≠ 内容播放器：要进度条 / 字幕 / HLS 审片 / QoE，打开 [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)，不要拿 background 组件硬扛。
- 不强制首屏上视频；不上视频时本文整篇可跳过。
- `prefers-reduced-motion` / 弱网 / `saveData` 必须能退化到静帧。
- 不把老版 Video.js 体积观感套到 v10 background；也不把 v10 background 当成「零成本最优」。
- 营销叠层（Drupal / AEM / Next）与媒体交付链分开决策；对标站商业故事见 [`b2b-complex-sales-site-exemplars.md`](./b2b-complex-sales-site-exemplars.md)。
- 体积数字与站点阶梯来自探测日快照；上线前用本项目真实网络重测，不把他人 MB 数当 SLA。
