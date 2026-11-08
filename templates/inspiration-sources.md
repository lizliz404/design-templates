---
name: inspiration-sources
description: >-
  Curated design inspiration bookmarks routed by job type. Scan here before
  boiling the ocean on Dribbble. Not a mirror of any gallery; not assets to vendor.
---

# Inspiration sources（任务路由书签）

灵感站是检索层，不是 pack 内容。先在 [`README.md`](./README.md) 选任务，再在同族中限时开 1–2 个站；截图应进入具体项目 `docs/evidence/`，不进入 `templates/`。禁止整站 mirror `saaspo`、`inspora` 或 `land-book`。

## Agent / motion chrome

| 我在做… | 先开这些 | 再回 pack |
|---|---|---|
| **AI / agent 界面** | [beautifului.dev](https://www.beautifului.dev/) · Vercel AI Elements（实现向） | `design/beautiful-ui-ai-interfaces/` |
| **真实产品微交互：按手势 / 状态 / 元件找先例** | [60fps](https://60fps.design/) · [Runmo 距离轮实例](https://60fps.design/shots/runmo-drag-to-adjust-distance-wheel-interaction) | `ui-patterns/playful-isometric-empty-states.md`；公开详情提供交互描述，完整筛选 / storyboards / snippets 属 PRO；录屏不是源码授权 |
| **React 动效 Tabs 实现参考（不是换栈理由）** | [beUI Tabs 源码页](https://beui.dev/components/motion/tabs) · [MIT LICENSE](https://github.com/starc007/ui-components/blob/main/LICENSE) | `ui-stack-decision.md`；已读公开实现，依赖 React / motion/react / Lucide 与本地 utils/ease；免费 repo 与 Pro 分开，复制保留许可，键盘 / reduced-motion 仍需项目自验 |
| **单文件 React 动效元件** | [Rare UI](https://www.rareui.com/) | `ui-patterns/ai-thinking-orb/`；2026-08 无 repo LICENSE，勿 mirror；参考拷贝已按 PROVENANCE 收进 pack（`upstream/rare-ui-fluid-orb/`），保留署名、勿转售 |
| **3D product hero（交互表面）** | [ThreeUI Community](https://threeui.com/) | `ui-patterns/threeui-hero-adapter.md`；只抄一个免费 MIT hero；禁止当说明图 |
| **ASCII / dither 运动节奏** | [ASCII motion cards](https://design-on-x.com/praveenisomer/status/2066483905394618552/) · [Figma Dither Shader file](https://www.figma.com/community/file/1673462506064907726/dither-shader)（CC BY 4.0；Figma 原生 Shader+Motion，editor 内拖参校准节奏） | `paper-shaders/`（已含 Dithering：7 shapes × 4 Bayer types）；重做机制，勿截帧或复制皮肤 |
| **WebGL / GSAP 动效机制调研（demo + 源码）** | [Codrops Creative Hub](https://tympanus.net/codrops/hub/all/) | `ui-patterns/vgpu-webgpu-effects.md` + `threeui-hero-adapter.md`；只移植带 LICENSE 的 repo；同一视图最多一套动态大气；勿 mirror |
| **背景渐变 / mesh·grainy·aurora 生成** | [Feralui Gradients](https://feralui.dev/gradients)（免费，无 signup 无水印） | `paper-shaders/` + craft checklist color/surface 规则；导出物作一次性资产；同一视图一套动态大气 |
| **Shader 目录（付费导出，机制速览）** | [MetalForge](https://metalforge.xyz/)（免费可玩全编辑器与参数空间；Pro €5/mo 才给文件；目标 SwiftUI / RN Skia 非 Web） | 文件不进 pack；免费编辑器只拆机制与参数空间；原生液态球用 LerSent `ai-thinking-orb/upstream/lersent-orb/effect.metal`，Web 动态大气走 `paper-shaders/` + vgpu |
| **Agent 产出假 UI 静帧 / 动画 / bento 展示图** | [Stageshow skill](https://x.com/benjitaylor/status/2116593247854453244)（Benji Taylor，2026-11-01 02:08 UTC+8；`npx skills add benjitaylor/skills --skill stageshow`；未试） | share 页 / 讲解页配图；试用后再决定是否收进 agent-skills |

## Product UX

| 我在做… | 先开这些 | 再回 pack |
|---|---|---|
| **流程审计 / 渐进披露 / 高风险动作** | [Eleken Good UX Examples](https://www.eleken.co/blog-posts/good-ux-examples) | `ui-patterns/saas-onboarding-two-phase.md` + `data-dense-app-craft.md`；只抽行为机制，不复制案例界面 |
| **站内 / 产品搜索** | [Primer Search](https://www.primer.style/product/scenario-patterns/search/) · [SaaSUI search/palette](https://www.saasui.design/blog/saas-search-command-palette-ux-patterns) · [VitePress Search](https://vitepress.dev/reference/default-theme-search) · [Pagefind](https://pagefind.app/docs/) · [cmdk](https://github.com/pacocoursey/cmdk) | `ui-patterns/search-craft.md` |
| **B2B 后台真屏** | [saasui.design](https://www.saasui.design/) · [mobbin.com](https://mobbin.com/) | `ui-patterns/data-dense-*.md` |
| **图标系统纪律（Track A chrome）** | [Cursor icons making-of](https://www.minoradventures.co/blog/the-making-of-cursors-icons) · [Radix Icons](https://www.radix-ui.com/icons) · [Phosphor](https://phosphoricons.com/) | `ui-patterns/icon-system-craft.md`（非 favicon；Logo/OG 走下一节） |
| **激活 / onboarding 机制** | [Chatbase onboarding note](https://x.com/yasser_elsaid_/status/2088279151383830570) | `ui-patterns/saas-onboarding-two-phase.md` |
| **导航结构对照：mega menu / sidebar / dropdown** | [Navbar Gallery](https://navbar.gallery/) · [Cloudflare mega menu 条目](https://navbar.gallery/navbar/cloudflare) | `nav-still-band-dropdown.md`；截图分类与原站出口，不是可复制菜单源码；键盘与 hover 可达性回原站实测 |
| **页脚收口** | [footer.design](https://footer.design/) | `ui-patterns/footer-craft.md` |

## Marketing / personal

| 我在做… | 先开这些 | 再回 pack |
|---|---|---|
| **创意技术个人站 / 立场先行叙事** | [surya.website](https://surya.website/) | `design/hanzilla-personal-site/` + `liz-personal-compact/`；借「立场 → 三分法 → 近作 → 联系」，不复制页面 |
| **SaaS 营销整站** | [saaspo.com](https://saaspo.com/) · [saasframe.io](https://saasframe.io/) · [landing.gallery](https://www.landing.gallery/) | `design/lead-radar` · `premium-one-pager` |
| **CTA 形式 / 上下文对照（不是转化率排行）** | [CTA Gallery](https://cta.gallery/) · [Tines 桌面/移动条目](https://cta.gallery/cta/tines) | `ui-patterns/landing-cta-economy.md`；按任务与模式检索，营销模板另售；图片不能证明转化提升或无障碍合格 |
| **Landing 分段（hero/pricing/…）** | [land-book.com](https://land-book.com/) sections · [lapa.ninja](https://www.lapa.ninja/) | 组合 landing 模板 + craft checklist |
| **极简 / 编辑向站** | [minimal.gallery](https://minimal.gallery/) · [a1.gallery](https://www.a1.gallery/) | `hanzilla` · `liz-personal-compact` |
| **高完成度 / 实验向** | [godly.website](https://godly.website/) | 慎用于 B2B 工具面；可偷 motion 纪律 |
| **OG / 分享图** | [ogfolio.com](https://ogfolio.com/) · land-book OG 例 | Genre-B brief · craft §17 |
| **Logo 方向** | [logoinspo.com](https://logoinspo.com/) | Genre-B；勿直接盗标 |
| **社媒帖 / 大厂 announcement** | [inspora.design](https://www.inspora.design/) · [posts.design](https://posts.design/) | cover-design skill；非 UI shell |
| **转换向 landing 评分浏览** | [webanatomy.ai](https://www.webanatomy.ai/best-landing-pages) | 学结构，别迷信分数 |
| **免费商用拉丁字体短名单（社区）** | [@ricouii 字体帖](https://x.com/ricouii/status/2117661223764537612) | `reading-notes/ricouii-free-commercial-fonts-2026-11.md` + `design-typography-font-preferences.md` Community shortlists；书签非批准；项目最终字族仍走 DESIGN |
| **QR / 链接分享物** | [tree.icqr.com](https://tree.icqr.com)（WebGPU，纯前端，URL 不上传） | 借「功能图案伪装进场景 + payload 派生生成」机制；无公开 repo 勿 mirror，产物截图进项目 evidence |

## Meta

| 我在做… | 先开这些 | 再回 pack |
|---|---|---|
| **Deck / 品牌指南 PDF 风** | [deck.gallery](https://deck.gallery/) · upstream [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates) / [frontend-slides](https://github.com/zarazhangrui/frontend-slides) | `decks/` + `paper-shaders`；先 `visual-economy` |
| **给 agent 提取候选样式合同 / DESIGN.md** | [Refero Styles](https://styles.refero.design/) · [公开 style 详情](https://styles.refero.design/style/a73148b9-449b-42cd-9f38-86ef694f500e) | `on-brand-ai-generation-craft.md`；详情有色彩、字体、spacing 与 Markdown，但官方注明 normalized / interpreted，HTML 是重建非原组件；回原站核验，不作权威 token 或字体授权 |
| **Agent 用截图检索（实验）** | [assetgallery.co](https://assetgallery.co/) | 先验体量；输出仍要进项目 evidence |

品牌观察流（非 gallery）：[@avstorm](https://x.com/avstorm)（logo/系统批评）、产品设计 TL 账号按需。

## 用法

```text
1. 写 Selection record（templates/README.md）
2. 本表只开 1–2 个站，限时 25 分钟
3. 记下：URL · 偷的机制（不是“好看”）· 不偷什么
4. 回到 pack 资产实现；机制写进项目 DESIGN 或 IA
5. 禁止把外部整页当内部模板提交
```

好的笔记：「Pricing 表：三档中间推荐、年付默认、footnote 含 overage。」
烂的笔记：「很高级。」

## 降权 / 慎用

| 源 | 原因 |
|---|---|
| Dribbble 主瀑布 | 概念图多，未 ship |
| Awwwards 奖项流 | 噪音大；用 posts/inspora 筛选流更省 |
| 无来源的「SaaS UI Kit」打包站 | 授权与一致性风险 |
| 直接复制竞品文案/插图 | 侵权 + 无差异 |
| MetalForge | 付费导出（Pro €5/mo），目标平台 SwiftUI / RN Skia 非 Web stack，文件不进 pack；免费编辑器仅作机制参考（见 Agent / motion chrome 书签行）。原生液态球用已抓的 LerSent `ai-thinking-orb/upstream/lersent-orb/effect.metal` |
| Recent「Lucid Treats」单条目 | 只有 3D 静图构图，无产品交互证据；勿入库图片 |

## 与 pack 反哺

发现的是可复用机制，不是单页皮肤：视觉系统 / 整页进入 `templates/design/<slug>/`，微交互进入 `templates/ui-patterns/`，激活或 IA 进入对应 craft 文，并只在 [`README.md`](./README.md) 增加一条主路由。只有书签级来源才更新本文；不新增第二索引文件。

## 清单核验回执

2026-11-09（Asia/Shanghai）核过三帖的 24 个唯一目的地：仅新增 60fps / beUI 两个来源，Navbar / CTA / Refero 从已有书签提升为带任务与边界的路由；其余保留、暂缓或排除。[逐项回执与证据](./reading-notes/design-resource-triage-2026-11-09.md)。不是“24 个都值得用”，未安装、购买、登录或导入任何库。
