# Design templates pack

Reusable assets extracted from finished/archived projects and public design OSINT.

**Canonical source:** [lizliz404/design-templates](https://github.com/lizliz404/design-templates) (`templates/` in that repo).  
On this server the same tree also lives at `<project>/_templates` as a **same-pace mirror** — not a second source of truth. Pull/push the GitHub repo; keep the mirror identical.

---

## 0. 任务路由表（发现/选择环 —— 先看这里）

> 用法：接到任务先按「我要建什么」查本表 → 加载对应资产 → 若该象限无模板，按「组合路径」拼装，并把「缺模板」记进 Known Gaps。**不要从空想开始设计。**

| 我要建什么 | 主资产（必读） | 组合资产（按需） | 说明 |
|---|---|---|---|
| **B2B 数据密集后台 / CRM / 管理台** | [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md)（数据面视觉工艺手册）· [`ui-patterns/data-dense-b2b-app.md`](./ui-patterns/data-dense-b2b-app.md)（交付闸） | [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)（表格/列表/状态语法）· [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)· [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)· [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md) | 无完整后台整页模板；先读手册再发明；交付前过闸 |
| Chatbot / AI Agent 界面 | [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/) | `data-dense-app-craft.md` · `icon-system-craft.md` | 19 件套；源站 beautifului.dev |
| **SaaS 激活 / Onboarding → Setup** | [`ui-patterns/saas-onboarding-two-phase.md`](./ui-patterns/saas-onboarding-two-phase.md) | [`ia-user-journey.md`](./ia-user-journey.md) · craft checklist §8/§13/§28/§39 | 先 aha 再生产用量；禁止空白 Dashboard |
| 叙事长 landing（营销页） | [`design/lead-radar/`](./design/lead-radar/) 或 [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/) | [`ui-patterns/premium-one-pager.md`](./ui-patterns/premium-one-pager.md)· [`ui-patterns/footer-craft.md`](./ui-patterns/footer-craft.md)· craft 附 A | 先定语气再选模板；页脚读 footer-craft |
| 个人站 / 作品集 | [`design/hanzilla-personal-site/`](./design/hanzilla-personal-site/) 或 [`design/liz-personal-compact/`](./design/liz-personal-compact/) | `design-typography-font-preferences.md` · `footer-craft` C 型 | — |
| 内容→服务承接页（社媒导流） | [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/) | `typing-placeholder-animation.md`（可选） | 入口屋 ≠ 工厂 |
| 图标选型 / 线重 / 概念表 | [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md) | U-R13 Lucide/Iconify | 不自研 icon font，除非产品专有概念爆棚 |
| **站内 / 产品内搜索** | [`ui-patterns/search-craft.md`](./ui-patterns/search-craft.md) | IA G9 · craft checklist Cmd+K | 先分 Search/Filter/Palette；复杂系统别抄 VitePress MiniSearch |
| HTML 演示 deck（审美交付） | [`decks/`](./decks/) → `upstream/beautiful-html-templates` + `frontend-slides` | [`decks/visual-economy.md`](./decks/visual-economy.md) · `paper-shaders` | **先** visual-economy；仅 occasion=演讲/课程 才上全套 |
| 结构图 / 说明图（默认） | [`decks/visual-economy.md`](./decks/visual-economy.md) | ASCII · Mermaid | 禁止默认 React/Three 做说明图 |
| 品牌/OG/生图 | `design-brief-authoring` / `design-brief-for-image-gen` | [`inspiration-sources.md`](./inspiration-sources.md) OG 行 | Genre B |
| UI 视觉系统文档（Genre A） | `design-md-visual-system` skill | gold-corpus 34 | — |
| **灵感检索（先路由再打开）** | [`inspiration-sources.md`](./inspiration-sources.md) | 限时 1–2 站 | **禁止**整站 mirror gallery |

**选择纪律**：先定「产品语气象限」（数据密集工具 / 编辑叙事 / 单色直接 / AI 仪器面板），再选模板；语气不匹配的模板，宁可组合也不要硬套。`data-dense-app-craft.md` 与 `beautiful-ui-ai-interfaces` 的表格语法是**跨象限可迁移**的（任何带表格的后台都能用）。

**Selection record（强制，开工前写五行；填不出 = 发现/选择没完成，不许开工）**：

```text
Job:
Chosen asset(s):
Why these fit:
Explicitly skipped:
Acceptance screenshots / checks:
```

**Universal verification contract（每次复用必须证明）**：

1. **Choice** — 选了哪个资产 + 显式跳过理由，已记录；
2. **System** — 项目 token 与 1–3 个签名动作在写码前已命名；
3. **Critical surfaces** — 真实表格/表单/空态/错误/长文案状态被演练（如相关）；
4. **Viewports** — 至少桌面 + 窄屏截图；支持暗色则加；
5. **Behavior** — 键盘焦点、reduced-motion、overflow、loading、错误恢复；
6. **No graft** — 单一组件语法；复制来的模式已适配项目系统。

「构建通过」≠ 视觉验收；没看截图就报视觉 QA = 未执行。

---

## Product / engineering craft

- **High-leverage craft checklist** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)  
  「四两拨千斤」工艺清单 v3：文首 What/Why/How 职责卡 + 38 条机制分组 + 阶段 starter pack。类型=Craft handbook（非 Skill）。历史版见 [`archive/`](./archive/)。
- **数据密集后台视觉工艺** → [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md)  
  B2B 表格/表单/列表的视觉质感条目（粘性表头、行 hover、数字对齐、密度档位、空态 CTA、状态色语义）。2026-08-11 据 chuhai-cloud 实战缺口补建。

## UI micro-patterns → [`ui-patterns/`](./ui-patterns/)

Small named patterns (not full pages). Load before reinventing landing micro-interactions:

- **Typing / rotating placeholder** → [`ui-patterns/typing-placeholder-animation.md`](./ui-patterns/typing-placeholder-animation.md) + [`ui-patterns/snippets/`](./ui-patterns/snippets/)
- **Atomic island chrome** → [`ui-patterns/atomic-island-chrome.md`](./ui-patterns/atomic-island-chrome.md)
- **Data-dense app craft** → [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md)（路由表第一行）
- **Icon system craft** → [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)（Lucide/Iconify 选型与光学纪律；Cursor icons 文蒸馏）
- **Search craft** → [`ui-patterns/search-craft.md`](./ui-patterns/search-craft.md)（Search vs Filter vs Cmd+K；产品类型选型；书站仅脚注）
- **SaaS onboarding two-phase** → [`ui-patterns/saas-onboarding-two-phase.md`](./ui-patterns/saas-onboarding-two-phase.md)（aha → 生产用量）
- **Footer craft** → [`ui-patterns/footer-craft.md`](./ui-patterns/footer-craft.md)（长 landing 收口）

## Cross-cutting conventions

- **Typography** → [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)
- **Paper Shaders** → [`paper-shaders/SKILL.md`](./paper-shaders/SKILL.md)  
  三套对参：千成讲义 deck veil、出海云/预算登录 MeshGradient、个人站 rust/paper 双层（mesh + 0.08–0.10 veil）。预算墨灰盘只给登录左栏，见 [`paper-shaders/recipes/personal-site-stack.md`](./paper-shaders/recipes/personal-site-stack.md)。`veils/` 铺字，`stills/` 当目录。不要再抽成单独的 user skill。
- **Decks + visual economy** → [`decks/README.md`](./decks/README.md) · [`decks/visual-economy.md`](./decks/visual-economy.md)
- **Inspiration sources（书签路由）** → [`inspiration-sources.md`](./inspiration-sources.md)  
  按任务开 1–2 站；禁止整站 mirror gallery。
- **i18n + Iconify lang switcher** → [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)

## design/uhoh-inspired-service-entry/

Monochrome comic landing page template for content-led service entry pages. Inspired by public OSINT of `https://www.uhoh.com/` on 2026-06-11; adapted for social-media-to-IM service funnels.

**When to reuse**: Building a trust handoff page after 视频号/小红书/公众号/social content, where real delivery happens in IM, docs, or human service ops.

**Key assets**:
- `index.html` — Native static HTML/CSS template
- `DESIGN.md` — Distilled design system, page architecture, source boundaries
- `EVIDENCE.md` — Curl/browser capture notes and observed implementation facts

## design/beautiful-ui-ai-interfaces/

AI-native UI primitives (chat agents, thinking states, human-in-the-loop approvals) — 19 copy-paste components rebuilt from observation of https://www.beautifului.dev/ (no public source repo; see EVIDENCE.md).

**When to reuse**: Building Chatbot / AI Agent interfaces from scratch — thinking traces, streaming text, approval cards, tool chips, agent tables, composer. **也适用于任何数据密集 B2B 后台**：§4 的 records/diff/filter 表格语法（12.5px 密集行、sticky header、hairline 边框、tint 单元格）是现成的表格工艺，跨象限可迁移（chuhai-cloud 2026-08 实战验证缺口后确认）。

**Key assets**:
- `DESIGN.md` — distilled dual-theme token system (page/canvas/field/line/ink/accent…), type ladder, radius/shadow conventions, per-primitive structure grammar
- `sections/` — 19 primitives as rendered DOM (implementation skeleton)
- `screenshots/` — full page + one shot per primitive (1440×2x)
- `source/` — raw capture: SSR HTML + full CSS + fonts (Inter + JetBrains Mono)

## design/lead-radar/

Editorial SaaS landing page design system. Warm paper aesthetic, Lora + Poppins typography, honest positioning copy. Extracted from lead-radar project (archived 2026-05-03).

**When to reuse**: Building a solo SaaS landing page that needs to feel like a research desk, not an AI dashboard.

**Key assets**:
- `DESIGN.md` — Full design token spec (colors, typography, components)
- `landing-page.tsx` — Next.js page component with structured data
- `landing-layout.tsx` — Root layout with SEO metadata
- `globals.css` — Complete CSS design system

## design/hanzilla-personal-site/

Warm editorial personal site template for an independent technical builder. Extracted from public OSINT of `https://hanzilla.co/` on 2026-05-28.

**When to reuse**: Building a product-led personal site where shipped projects and writing need to work together as credibility proof.

**Key assets**:
- `DESIGN.md` — Distilled design system, component grammar, typography/color/layout rules
- `EVIDENCE.md` — Public scan evidence, URL map, rendered style facts, screenshot notes
- `screenshots/` — Visual evidence captured from the public site

## design/liz-personal-compact/

Compact personal/landing variants (`landing.html`, `v2.html`, `v3.html` + CSS/JS).

## design/vercel-geist.md

Geist-oriented notes for Vercel-adjacent UI tone.

---

## Known Gaps（发现环的诚实账本）

- **无 B2B 数据密集后台完整模板**（最大缺口）：`data-dense-app-craft.md` 是手册不是模板。若某项目沉淀出完整的后台视觉系统（tokens + 表格/表单语法 + 截图），应回填为 `design/<name>/` 新模板并在此登记。
- **无「App 内表格组件」代码模板**：只有语法手册与 DOM 骨架（beautiful-ui-ai-interfaces/sections/records-table.html）。
- 双营销面（静态站 + React landing）设计语言统一条目：见 chuhai 实例 P2。
