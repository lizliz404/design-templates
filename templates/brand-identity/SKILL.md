---
name: brand-identity
description: >
  Logo / favicon / app icon / OG & social asset production for agent
  harnesses: reference-DNA extraction, identity design, divergent
  exploration with favicon gates, and asset export. Use when designing a
  brand mark or favicon, producing an OG card, judging generated brand
  prompts, or wiring a brand-asset pipeline. Not for in-app UI icon
  systems (icon-system-craft) or Genre-A DESIGN.md files.
---

# Brand identity assets (logo · favicon · OG)

Status: landscape synthesis 2026-08-31 (external skill survey) calibrated
by the Foundry favicon case (`inquiry-foundry/docs/design/FAVICON.md`).
Baseline expectation: no single dominant skill exists in this category yet —
repo stars ≠ skill installs; many skills寄生 in large repos. Steal layers,
don't adopt one wholesale.

## Pipeline (the shape worth stealing)

```text
reference DNA        identity design              diverge → converge            deployment
brand-extract   →    logo-design /           →    draft-logo               →    logo-generator
(reverse site        svg-logo-system              4–6 directions ×              favicon → PWA →
into brand kit)      (system + constraints)       favicon/light/dark,           social sizes
                                                  human picks, agent mutates
                                                     ↑ critique layer: logo-design-board (lenses + rubric)
                                                     ↓ OG / campaign layer: Colater (brand kit → graphics)
```

## The seven, by layer

| Skill | Layer | What it uniquely does | Verdict |
|---|---|---|---|
| [rampstackco/claude-skills · logo-design](https://github.com/rampstackco/claude-skills/blob/main/skills/logo-design/SKILL.md) | Judgment base | Logo as *system*: wordmark/lockup/symbol/monogram/favicon/monochrome/reverse, 16px survival test, SVG-ready production spec, signage/embroidery/motion stress cases | S — most complete knowledge base; ~16.7K installs across repo's 100+ skills |
| [nasrulhazim/claude · svg-logo-system](https://github.com/nasrulhazim/claude/blob/main/skills/svg-logo-system/SKILL.md) | Factory | Brief → 25 concepts → dark/light wordmark → icon mark → HTML gallery → real-world mockups → multi-platform export (Phase 4 = favicons). Scans CLAUDE.md/landing/Tailwind/existing logos first — the mark grows from existing visuals, not "tech company → purple gradient" | S — most engineered; best raw vibe-design fun |
| [yamanidev · draft-logo](https://github.com/yamanidev/claude-code-configuration/blob/main/skills/draft-logo/SKILL.md) | Loop | 4–6 concept directions, each shown at large/medium/favicon, light/dark; human picks; agent mutates next round. Champions "second-read marks"; explicitly anti geometry-hygiene sterility | S− — matches human-in-loop brand work best |
| [YangsonHung · logo-design-board](https://github.com/YangsonHung/awesome-agent-skills/blob/main/skills/en/logo-design-board/SKILL.md) | Critic | Designer lenses (Paul Rand / Vignelli principles, not impersonation) → concept territories → image prompts → critique → scoring rubric → production handoff. Checks 16/32/120px, mono, grayscale, print, embroidery, silhouette, category distinction | A+ — best creative director; small repo, judged on merit |
| [zcaceres/claude-setup · logo-generator](https://github.com/zcaceres/claude-setup/blob/main/skills/logo-generator/SKILL.md) | Deployment | Logo → favicon → PWA → social assets in one pass | A — asset factory once the mark is chosen |
| [nexu-io/open-design · brand-extract](https://github.com/nexu-io/open-design/blob/main/skills/brand-extract/SKILL.md) | Reverse | Live site → measured brand kit (logo/colors/semantic palette/fonts/imagery/voice), machine-readable. Answers "why does Stripe look like Stripe" by measurement, not vibes. ~90K-star repo, skill itself ~669 installs | S as feeder — context for everything downstream; never copy trade dress |
| [Colater · claude-code-design-skill](https://github.com/colater-dev/claude-code-design-skill) | Downstream | Feed brand kit (logo/type/colors/values) → social posts, banners, OG cards, campaign graphics; HTML preview → PNG | A — OG image is brand-system × composition × content, not a favicon problem |

If installing only four: **svg-logo-system + logo-design + draft-logo +
brand-extract**; add Colater when OG/social volume matters.

## The real conclusion

No existing skill covers reference research → controlled entropy/visual
direction → generation → critique → SVG cleanup → 16px favicon → OG/social
variants → production export end-to-end. The durable move is to cannibalize
the layers above into an in-house `brand-identity` skill. Until then, run
the pipeline manually with this file as the router.

## Case-calibrated rules (Foundry favicon, 2026-08-31)

- **Medium match.** Geometric/letterform marks → hand-authored SVG, never
  image-gen; material/light/imperfection (paper, ink bleed, soft shadow) →
  image-gen. An image model painting a geometric tile monogram is the worst
  of both: mushy geometry, zero material story.
- **Semantics budget.** A favicon must not carry heavy literal meaning — a
  hanzi, a seal, a cultural symbol. The 问印 direction was rejected as too
  square, too official, too borrowed. Favor abstract emergence over
  inherited symbols.
- **Entropy direction.** Jagged/scratchy line quality, particle dissolve,
  "draft resolving into signal" reads alive. Stripe/Linear restraint is the
  ceiling: chaos lives in the *line quality*, not in grunge texture — no
  fantasy-game treatment, no entropy for its own sake.
- **Favicon gates.** 16px survival (strokes ≥2px, gaps ≥1.5px at 16), one
  accent hue, at most one gradient (the beacon), asymmetric balance, tile
  corner radius ≈ 23% of edge.
- **Genre B separation.** Brand/OG briefs are their own artifact class —
  never merge into a Genre-A DESIGN.md. The Foldy pair (icon prompt + OG
  card prompt, 2026-08) is the gold-standard prompt anatomy: subject with
  material truth → composition percentages → shadow spec → 3-tone palette →
  mood sentence → "absolutely no" list → explicit small-size gate.

## Canon refs — inspectable construction (2026-08-31)

每个条目：name → link → why worth studying → what construction is directly
inspectable。只收"可拆解"的公开源，只有成品图的直接出局。

### Tier 0 — 官方圣经级

| Ref | Why worth studying | Inspectable construction |
|---|---|---|
| [Apple App Icon Template](https://www.figma.com/@apple) (Figma 搜 "App Icon Template") | 官方最新模板 (Liquid Glass / Icon Composer 流程) | 完整尺寸网格、mask、导出设置，可在 Figma 拆层 |
| [Apple Design Resources](https://developer.apple.com/design/resources/) + [HIG App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons/) | 学轮廓、光学中心、安全区、尺寸适配控制 | 官方 spec + 可下载源文件 |
| [App Icon Toolkit - iOS/macOS/Android (Ryan Yao)](https://www.figma.com/community/file/824894885635013369) | 10万+ 用户，多平台导出 | 前景/背景层可改 |
| [App Icon Generator (iOS/Android/Web/Favicon/macOS/Windows)](https://www.figma.com/community/file/1463176476475398304) | 单源多平台导出 | 全平台尺寸矩阵 |
| [Figma Reusable Icon Grid 官方教程](https://help.figma.com/hc/en-us/articles/18770195788951-Create-a-reusable-icon-grid) | 官方组件化思路 | 24×24 grid、安全区、组件化母版 |

### Tier 1 — 直接拆源码（第一梯队）

| Ref | Why worth studying | Inspectable construction |
|---|---|---|
| [Excalidraw Logo](https://github.com/excalidraw/excalidraw-logo) | 手绘不规整感但轮廓极简、缩小仍成立；不规则轮廓如何保持识别度的最佳案例 | `logo.svg` / `logo256.svg` / `og-image.svg` / `excalibot.excalidraw` |
| [Ghostty Themed Icons](https://github.com/jasonlong/ghostty-theme-icons) | "复杂但不脏"的层次与材质研究 | `templates/` + `icons/`，每个 icon 由背景/色条/ghost 三层 SVG 构成 |
| [Immich](https://github.com/immich-app/immich/discussions/1634) | 无文字无硬语义的抽象 mark | 五个不对称彩色瓣片旋转运动，SVG path 全公开 |
| [Pier Brand System](https://github.com/vul-os/pier/blob/main/brand/README.md) | 构造透明度教科书：favicon 是经光学校正的独立 master (mark 占宽比 app icon 的 ~66% 更大)，不是机械缩放 | `favicon.svg` / `og-image.svg` / `make-icons.mjs` 导出脚本 |
| [OpenInterpretability web](https://github.com/OpenInterpretability/web) | SVG favicon / Apple icon / 代码生成 OG 共享一个系统 | `app/icon.svg` · `app/apple-icon.tsx` · `app/opengraph-image.tsx` |

### Tier 2 — 开源 icon 语言

| Ref | Why worth studying | Inspectable construction |
|---|---|---|
| [Phosphor Icons](https://github.com/phosphor-icons/core) | 6 weight 一致性顶级 | MIT，raw SVG |
| [Lucide Icons](https://github.com/lucide-icons/lucide) | 24×24、2px stroke、round caps，路径逻辑干净 | raw SVG |
| [Simple Icons](https://github.com/simple-icons/simple-icons) | 品牌 SVG 圣经 | 单色极致优化 raw SVG |
| Tabler Icons / Remix Icon / Heroicons | 同类开源大库 | raw SVG |

### Tier 3 — Favicon / OG 流水线

| Ref | Why worth studying | Inspectable construction |
|---|---|---|
| [RealFaviconGenerator](https://realfavicongenerator.net/) ([GitHub](https://github.com/RealFaviconGenerator)) | favicon 全平台体系标准 | 平台矩阵生成逻辑 |
| [ericwbailey/favicon](https://github.com/ericwbailey/favicon) | pixel-perfect 完整尺寸 artboard 思路 | 每尺寸独立 artboard |
| [Bjango Templates](https://github.com/bjango/Bjango-Templates) | app icon→favicon 尺寸体系、导出预设 | 模板文件全开 |
| [App Icon Export Kit](https://code.grida.co/community/file/1133792650731394633) | 全平台 export matrix | Figma Community 镜像可拆层 |
| [OG Image Pack 1/2/3 (NEVER. DESIGN)](https://www.figma.com/community/file/1434530008829243090) ([2](https://www.figma.com/community/file/1434534985999262420) · [3](https://www.figma.com/community/file/1434535803374582485)) | startup OG 模板可拆层 | Figma 层结构 |
| [OG copy-paste (Dan)](https://www.figma.com/community/file/1439179478775358796) | 极简 OG 起点 | 可复制改层 |
| [OG Studio](https://github.com/QuiiBz/ogstudio) (ogstudio.app) | Satori 底层动态 OG 构造 | Satori 渲染管线源码 |
| [SharePreviews](https://github.com/sgalanb/sharepreviews) | OG 模板编辑器开源实现 | 编辑器/渲染代码 |
| [Snapmaker Studio Brand Kit](https://github.com/DeadlyVirusIn/snapmaker-studio/blob/main/docs/brand/README.md) | 成套品牌资产同源分化 | `app-icon.svg` / `favicon.svg` / `social-preview.svg` |
| [Drift Guard DESIGN.md](https://github.com/Drift-Guard/driftguard/blob/main/docs/DESIGN.md) | mark + favicon + OG + pattern 成套资产组织 | 32px favicon + 1200×630 OG spec |

**Pier 教训单独强调：favicon 不是 app icon 的机械缩放，是独立光学校正
master。** Linear / Stripe / Dub 仍是视觉 benchmark 但未列入——公开可访问的
最终品牌构造不完整 (压扁 .ico / 成品图)，不满足"可拆解"硬条件。

## Known gaps

- The in-house `brand-identity` skill (generation → critique → cleanup →
  export as one harness) does not exist yet; this file routes, it does not
  execute.
- No vendored copies of the seven skills; URLs above are the source of
  truth — check upstream before re-stealing, licenses vary.
