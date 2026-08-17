---
name: inspiration-sources
description: >-
  Curated design inspiration bookmarks routed by job type. Scan here before
  boiling the ocean on Dribbble. Not a mirror of any gallery; not assets to vendor.
---

# Inspiration sources（任务路由书签）

**纪律：** 灵感站是**检索层**，不是 pack 内容。禁止整站 mirror saaspo / inspora / land-book。  
用完回到本 pack 的模板与 craft 落地；截图进具体项目 `docs/evidence/`，不进 templates 膨胀。

Canonical pack: [lizliz404/design-templates](https://github.com/lizliz404/design-templates).

---

## 0. 先问任务，再开站

| 我在做… | 先开这些 | 再回 pack |
|---|---|---|
| **AI / agent 界面** | [beautifului.dev](https://www.beautifului.dev/) · Vercel AI Elements（实现向） | `design/beautiful-ui-ai-interfaces/` |
| **站内 / 产品搜索** | [Primer Search](https://www.primer.style/product/scenario-patterns/search/) · [SaaSUI search/palette](https://www.saasui.design/blog/saas-search-command-palette-ux-patterns) · [VitePress Search](https://vitepress.dev/reference/default-theme-search) · [Pagefind](https://pagefind.app/docs/) · [cmdk](https://github.com/pacocoursey/cmdk) | `ui-patterns/search-craft.md` |
| **B2B 后台真屏** | [saasui.design](https://www.saasui.design/) · [mobbin.com](https://mobbin.com/) | `ui-patterns/data-dense-*.md` |
| **SaaS 营销整站** | [saaspo.com](https://saaspo.com/) · [saasframe.io](https://www.saasframe.io/) · [landing.gallery](https://www.landing.gallery/) | `design/lead-radar` · `premium-one-pager` |
| **Landing 分段（hero/pricing/…）** | [land-book.com](https://land-book.com/) sections · [lapa.ninja](https://www.lapa.ninja/) | 组合 landing 模板 + craft checklist |
| **极简 / 编辑向站** | [minimal.gallery](https://minimal.gallery/) · [a1.gallery](https://www.a1.gallery/) | `hanzilla` · `liz-personal-compact` |
| **高完成度 / 实验向** | [godly.website](https://godly.website/) | 慎用于 B2B 工具面；可偷 motion 纪律 |
| **Deck / 品牌指南 PDF 风** | [deck.gallery](https://deck.gallery/) · upstream [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates) / [frontend-slides](https://github.com/zarazhangrui/frontend-slides) | `decks/` + `paper-shaders`；先 `visual-economy` |
| **页脚收口** | [footer.design](https://footer.design/) | `ui-patterns/footer-craft.md` |
| **OG / 分享图** | [ogfolio.com](https://ogfolio.com/) · land-book OG 例 | Genre-B brief · craft §17 |
| **Logo 方向** | [logoinspo.com](https://logoinspo.com/) | Genre-B；勿直接盗标 |
| **社媒帖 / 大厂 announcement** | [inspora.design](https://www.inspora.design/) · [posts.design](https://posts.design/) | cover-design skill；非 UI shell |
| **图标系统纪律** | [Cursor icons making-of](https://www.minoradventures.co/blog/the-making-of-cursors-icons) | `ui-patterns/icon-system-craft.md` |
| **激活 / onboarding 机制** | [Chatbase onboarding note](https://x.com/yasser_elsaid_/status/2088279151383830570) | `ui-patterns/saas-onboarding-two-phase.md` |
| **转换向 landing 评分浏览** | [webanatomy.ai](https://www.webanatomy.ai/best-landing-pages) | 学结构，别迷信分数 |
| **Agent 用截图检索（实验）** | [assetgallery.co](https://assetgallery.co/) | 先验体量；输出仍要进项目 evidence |

品牌观察流（非 gallery）：[@avstorm](https://x.com/avstorm)（logo/系统批评）、产品设计 TL 账号按需。

---

## 1. 用法（强制）

```text
1. 写 Selection record（pack README §0）
2. 本表只开 1–2 个站，限时 25 分钟
3. 记下：URL · 偷的机制（不是「好看」）· 不偷什么
4. 回到 pack 资产实现；机制写进项目 DESIGN 或 IA
5. 禁止把外部整页当内部模板提交
```

**好的笔记：**「Pricing 表：三档中间推荐、年付默认、footnote 含 overage。」  
**烂的笔记：**「很高级。」

---

## 2. 降权 / 慎用

| 源 | 原因 |
|---|---|
| Dribbble 主瀑布 | 概念图多，未 ship |
| Awwwards 奖项流 | 噪音大；用 posts/inspora 筛选流更省 |
| 无来源的「SaaS UI Kit」打包站 | 授权与一致性风险 |
| 直接复制竞品文案/插图 | 侵权 + 无差异 |

---

## 3. 与 pack 反哺

发现**可复用机制**（不是单页皮肤）→ 开 PR 进 design-templates：

- 视觉系统 / 整页 → `templates/design/<slug>/`  
- 微交互 → `templates/ui-patterns/`  
- 激活/IA/checklist → 对应 craft 文 + README 路由一行  
- 书签级 → 只改本文表格  

Publish：`bash scripts/sync.sh`（GitHub canonical；`_templates` mirror）。
