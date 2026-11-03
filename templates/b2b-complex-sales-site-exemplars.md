---
name: b2b-complex-sales-site-exemplars
description: >-
  B2B 复杂销售 / 海工·能源营销站对标：学谁不学谁、流量≠询盘、公开栈指纹。Use when 要挑叙事与询盘路径的对标站（尤其非纯 SaaS 的硬件/系统交付）; when 需要区分产品驱动站与复杂销售转化站; when 想看 Anduril / Baker Hughes / Cloudflare 等活站栈痕迹而不把指纹当成产品后端。
---

# B2B 复杂销售营销站：学谁、不学谁、流量≠询盘

探测日期：2026-11-03（Asia/Shanghai）。用途：给海工 / 能源 / 复杂交付类营销站选对标与抄法边界；不是安装某家 deps 的施工单。首屏背景视频的交付细节正交，见 [`landing-hero-background-video.md`](./landing-hero-background-video.md)。

## 流程（何时跑、按序做什么、终点怎么判）

**何时跑**：要给复杂销售（项目询盘、长周期采购、硬件/系统交付）的营销站挑对标；或有人把「设计好看」「域名流量大」「询盘多」捆成一件事，需要拆开。

**按序**：

1. 先判宇宙：产品驱动（试用 / 文档 / 自助）还是复杂销售转化（能力叙事 + 联系专家）。
2. 按任务挑对标——海工 / 系统交付优先 [Anduril](https://www.anduril.com/) 作中间值；typography / 层次可偷 Linear / Stripe / Vercel，**不偷**他们的 free-trial 漏斗。
3. 看公开栈只当指纹与交付模式，不当「产品后端」。
4. 终点：写下「学结构 / 学视觉 / 学 CTA」各抄哪家、明确跳过哪家的哪一层；用站上可归因的项目询盘/商机验收，不盯第三方访问量榜。

## 机制依据（按需查的平铺规则）

### 两个宇宙，别捆

| 宇宙 | 代表 | 主 CTA | 流量里常混什么 |
|---|---|---|---|
| 产品驱动 SaaS | [Linear](https://linear.app/)、[Vercel](https://vercel.com/)、很大一部分 [Cloudflare](https://www.cloudflare.com/) 与 [Stripe](https://stripe.com/) | 试用 / 注册 / 文档 | 产品使用、回访、文档 |
| 复杂销售转化 | [Baker Hughes](https://www.bakerhughes.com/)、[Subsea7](https://www.subsea7.com/en/index.html)、[TechnipFMC](https://www.technipfmc.com/)、[Anduril](https://www.anduril.com/) | 联系专家 / 项目询盘 | 垂直访客本来就少；公开「合格线索」几乎看不到 |

第三方月访量级（约 2026-09，Semrush / Similarweb 类估算，**只当量级**）：Stripe ~2.32 亿、Cloudflare ~1.53 亿、Vercel ~3050 万、Linear ~940 万；Anduril ~48.3 万、TechnipFMC ~14–16 万、Subsea7 ~8.1 万。大数多半是产品/文档，不是「营销站带来很多合格询盘」。

### 海工中间值：Anduril

学 **任务 → 能力 → 产品** 叙事，以及硬件/系统呈现；再补应用页、规格、案例和醒目的项目询盘。排版与层次可参考 Linear / Stripe / Vercel。光学赛道（[Thorlabs](https://www.thorlabs.com/)、[Edmund Optics](https://www.edmundoptics.com/)）更像工程师选型目录——学技术深度与 IA，不当品牌大片模板。

### 八家活站栈指纹（2026-11-03 探测；指纹 ≠ 产品后端）

置信度：标了「活证」的优先信 HTML / 响应头 / 资源；标了「公开扫描 / 二手」的当线索。

- **[Anduril](https://www.anduril.com/)**（活证偏高）：定制营销站 + [Sanity](https://www.sanity.io/)（`cdn.sanity.io`）+ S3 / CloudFront；自研 WebGL（Hydra）+ Draco / Basis WASM、[Theatre.js](https://www.theatrejs.com/)、[Lenis](https://github.com/darkroomengineering/lenis)。Hero：Sanity 多码率 MP4 阶梯（约 1920≈8.6 MB / 1280≈4.2 MB / 854≈2.1 MB）+ 海报；**没有** Video.js。旧版 Webflow 案例与现网冲突 → 当过时。[Arche 笔记](https://arche.directory/sites/anduril) · [Web Reveal](https://webreveal.io/scan/anduril.com.html)。Anduril = craft 天花板，不是默认栈。
- **[Baker Hughes](https://www.bakerhughes.com/)**（活证 + 实施分享）：**Drupal** on [Acquia](https://www.acquia.com/) + Imperva；GSAP / ScrollMagic 一类动效。[Video.js](https://videojs.com/) 用在能力页 YouTube 嵌入，**不是**首屏背景；首屏是原生 `<video>` + poster（轮播里曾见约 18 MB 一帧 → 反面教材）。[Drupal Europe 实施分享](https://www.drupaleurope.org/session/full-stream-ahead-8-weeks-and-beyond.html) · [TechnologyWebInfo](https://technologywebinfo.com/site/bakerhughes.com)。
- **[Cloudflare](https://www.cloudflare.com/)**（官方确认）：**Astro** + Tailwind 风 utility，自托管在 Cloudflare。[博客确认 Astro](https://blog.cloudflare.com/astro-joins-cloudflare/)。Hero 媒体交付是教科书级（海报优先、延迟挂源、弱网 / `saveData` / `prefers-reduced-motion` 跳过）——细节只在 [`landing-hero-background-video.md`](./landing-hero-background-video.md)，本文不展开。
- **[Linear](https://linear.app/)**：`/_next` → **Next.js** + React，styled-components；边缘 Cloudflare、源像 GCP；扫描常报 Sanity / Radix / Motion。[CRFT](https://www.crft.studio/lookup/gallery/linear)。首屏**没有**满屏背景视频。
- **[Stripe](https://stripe.com/)**：**Next.js** 营销站，自管 nginx / `x-mkt-cache`，**不是** Vercel 响应头；hero 偏插画 / WebGL，首页不是 `<video>`。[MadeWithTech](https://madewith.tech/s/stripe.com)。
- **[Subsea7](https://www.subsea7.com/en/index.html)**：curl 遇 Akamai 挑战；公开代码痕迹是 **Adobe Experience Manager**（`/content/subsea7/.../_jcr_content`）+ 边缘防护。[runsonwhat](https://www.runsonwhat.com/company/subsea7.com)。首屏细节若要补，需真人浏览会话。
- **[TechnipFMC](https://www.technipfmc.com/)**：**ASP.NET** + Azure（`ARRAffinity`）经 Cloudflare；首页背景是 **Vimeo background iframe** + webp 静图。CMS 偏 .NET 系（Umbraco 类线索，**未锁死**）。
- **[Vercel](https://vercel.com/)**：自家 **Next.js on Vercel** + Payload；hero 偏 shader / canvas，不是 `<video>`。[Rauno craft 拆解](https://rauno.me/craft/vercel)。

### 旁支（学询盘结构多于学框架）

一眼旁证（未做与上表同深的活站拆解）：[Oceaneering](https://www.oceaneering.com/) WordPress；[Kongsberg Maritime](https://kongsbergmaritime.com/) Optimizely；[Fugro](https://www.fugro.com/) Next + Contentful + Vercel（工业站搭现代栈的桥）；[SLB](https://www.slb.com/) Sitecore。名单拉长时可看 [Saipem](https://www.saipem.com/en)、[Aker Solutions](https://www.akersolutions.com/)、[McDermott](https://www.mcdermott.com/)、[Heerema](https://www.heerema.com/)、[Halliburton](https://www.halliburton.com/)、[Siemens Energy](https://www.siemens-energy.com/)、[Claxton](https://www.claxtonengineering.com/)、[4Subsea](https://www.4subsea.com/)、[Tecnadyne](https://www.tecnadyne.com/)、[OneSubsea](https://www.onesubsea.slb.com/)——优先应用导向与询盘路径，不是流量榜。

### 现成调研：SaaS 有，海工几乎没有

- SaaS 营销栈合集：[Marketing Site Stack 2026](https://brainy.ink/paper/marketing-site-stack-2026)、[n≈331 SaaS 栈统计](https://bestsaaswebdesigns.com/blog/most-common-saas-website-tech-stacks)（Next / Tailwind / Webflow / Framer 占比一类）。
- 按域名补指纹：[BuiltWith](https://builtwith.com/)、TechnologyWebInfo、CRFT、StackFox、Web Reveal——工业站覆盖差、噪声大。
- Anduril + Baker + Subsea7 + TechnipFMC 这种**并排且带首屏视频实现**的侧写，公开侧基本空白；本文是种子，不是终局数据库。

### 真正值得学的是模式

- **Patterns > 品牌名 deps**。询盘信息架构 > 框架口号。
- 营销叠层可以是 Drupal / AEM，产品后端另说；「上了 Next」不等于询盘漏斗。
- 设计奖项与评论常对着旧版或子站——以现网为准。
- 叙事长 landing 的版式/CTA 预算另走 [`design/lead-radar/`](./design/lead-radar/)、[`ui-patterns/landing-cta-economy.md`](./ui-patterns/landing-cta-economy.md)；有控件的内容播放器走 [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)。

## 边界（硬性 guardrail）

- 不把「设计值得学」「域名流量大」「询盘多」捆成一件事；验收看可归因商机，不看第三方流量榜。
- 不为复杂销售站默认抄 SaaS 的 free trial / 自助注册漏斗。
- 公开栈指纹不当产品后端；置信度不够的（如 TechnipFMC CMS）保持「未锁死」。
- Anduril 的 WebGL / Theatre 是天花板参考，不是默认开工清单。
- 光学目录站不当 cinematic 品牌模板；工业站优先学应用切分与询盘路径。
- 本文不规定首屏要不要上视频；要上视频时打开 [`landing-hero-background-video.md`](./landing-hero-background-video.md)。
