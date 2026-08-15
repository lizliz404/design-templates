# _templates

Reusable assets extracted from finished/archived projects and public design OSINT.

**Single source of truth** for Liz template material. (Former `projects/template/` UI patterns live under `ui-patterns/`.)

---

## 0. 任务路由表（发现/选择环 —— 先看这里）

> 用法：接到任务先按「我要建什么」查本表 → 加载对应资产 → 若该象限无模板，按「组合路径」拼装，并把「缺模板」记进 Known Gaps。**不要从空想开始设计。**

| 我要建什么 | 主资产（必读） | 组合资产（按需） | 说明 |
|---|---|---|---|
| **B2B 数据密集后台 / CRM / 管理台** | [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md)（数据面视觉工艺手册）· [`ui-patterns/data-dense-b2b-app.md`](./ui-patterns/data-dense-b2b-app.md)（交付闸：surface inventory + 10 分 stop-ship gate） | [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)（表格/列表/状态语法直接可用）· [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)（IBM Plex Sans = 工具面首选）· [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)（UX 机制） | 本库当前**没有**完整 B2B 后台模板；先读手册再发明，别裸奔；交付前过闸 |
| Chatbot / AI Agent 界面 | [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/) | `data-dense-app-craft.md`（表格语法互通） | 19 件套：thinking/streaming/approval/tool chips/composer |
| 叙事长 landing（营销页） | [`design/lead-radar/`](./design/lead-radar/)（编辑风）或 [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)（单色漫画风） | [`ui-patterns/premium-one-pager.md`](./ui-patterns/premium-one-pager.md)（滚动组合拳）· `design/vercel-geist.md`（Vercel 系）· `high-leverage-craft-checklist.md` 附 A | 先定语气（编辑 desk vs 直接 blunt），再选模板 |
| 个人站 / 作品集 | [`design/hanzilla-personal-site/`](./design/hanzilla-personal-site/)（暖编辑）或 [`design/liz-personal-compact/`](./design/liz-personal-compact/)（compact 变体） | `design-typography-font-preferences.md` | — |
| 内容→服务承接页（社媒导流） | [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/) | `ui-patterns/typing-placeholder-animation.md`（可选） | 明确「入口屋 ≠ 工厂」定位 |
| HTML 演示 deck | `beautiful-html-templates`（34 套，经 AGENTS.md 流程选） | `design-md-visual-system` skill（写 design.md） | deck 走模板库自带 tone-first 流程 |
| 品牌/OG/生图 | `design-brief-authoring` / `design-brief-for-image-gen` skill（Genre B） | — | 不是 UI 视觉系统 |
| UI 视觉系统文档（Genre A） | `design-md-visual-system` skill | gold-corpus 34 份当参照 | 产品 repo 用「CSS 数值权威薄变体」（见 skill §产品变体） |

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

## Cross-cutting conventions

- **Typography** → [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)
- **i18n + Iconify lang switcher** → [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)

## design/uhoh-inspired-service-entry/

Monochrome comic landing page template for content-led service entry pages. Inspired by public OSINT of `https://www.uhoh.com/` on 2026-06-11; adapted for social-media-to-IM service funnels.

**When to reuse**: Building a trust handoff page after 视频号/小红书/公众号/social content, where real delivery happens in IM, docs, or human service ops.

**Key assets**:
- `index.html` — Native static HTML/CSS template
- `DESIGN.md` — Distilled design system, page architecture, source boundaries
- `EVIDENCE.md` — Curl/browser capture notes and observed implementation facts

## design/beautiful-ui-ai-interfaces/

AI-native UI primitives (chat agents, thinking states, human-in-the-loop approvals) — 19 copy-paste components rebuilt from observation of https://beautiful-ui-five.vercel.app/ (no public source repo; see EVIDENCE.md).

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
