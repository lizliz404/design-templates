---
name: site-stack-decision
description: >-
  站点级技术栈选型决策矩阵（场景×需求×赛道，纯需求推导）。Use when 给一个站点/产品选框架
  （Astro/Next/TanStack Start/Hugo/11ty/SvelteKit/Nuxt/RR7/Vite SPA）或选部署面；
  判断现有站点是否该迁栈；评估框架的 human/agent 友好度与维护状态。渲染策略坐标轴
  （SSG/SSR/SPA/Islands）走 rendering-strategy-map.md；组件库层走 ui-stack-decision.md。
---

# 站点技术栈选型 · 场景×需求×赛道决策矩阵

核查日期：2026-11-12。方法：**归纳不带先验立场**——从场景需求推出栈，而不是先有想用的栈再反推理由；行业证据为主干，本机案例只作插图。与本 pack 分工：`rendering-strategy-map.md` 管「每个表面选什么渲染策略」，本文管「整站选哪个框架 + 部署面」；`ui-stack-decision.md` 管组件库层。

## 0 · 拿不准时的默认答案

> **按「这个表面是给谁看的」分，不按「我想用什么」分：**
> - 内容面（营销/blog/文档/作品集——大部分页面对所有访客一样）→ **Astro**
> - 产品面（登录后/工作台/工具——大部分页面是个性化应用）→ **Vite + React SPA**
> - 两面挤一个仓、未来可能长服务端 → **Next.js**；React 生态 + 类型安全优先 → **TanStack Start 1.0**
> - 纯静态极限（千页级、构建速度是硬约束）→ **Hugo**；JS 极简小站 → **11ty**
> - 文档站 → **专用形状**（Starlight / VitePress / Docusaurus），不用通用框架手搓

这三问按顺序过滤（判据全是需求，不是框架）：

1. **SEO 是不是命门？** 是 → 首屏 HTML 必须有正文，空壳 SPA 出局。「Google 能执行 JS」≠ 最优。
2. **有没有写路径 / auth / 请求期数据？** 有 → 需要服务端赛道（Next / Start / RR7 / SvelteKit / Nuxt / 后端 API）；没有 → static-first 默认成立。
3. **交互密度有多高？** 岛密度一过临界点，「0-JS 默认」省的全还回去——内容壳里挂满 React 岛是常见反模式 [S16]。

## 1 · 行业在 2026 收敛成了什么（证据层）

归纳先看行业实际收敛到的形状，再看单个框架卖点。

### 1.1 AI builder 的默认栈 = 「agent 产出质量最高栈」的经验答案

| Builder | 生成的栈 | 说明 |
|---|---|---|
| Lovable | Vite + React + TS + Tailwind + shadcn/ui + Supabase | 前端可导出 GitHub |
| Bolt.new | Vite + React（无后端绑定） | WebContainer 全 Node 环境 |
| Base44 | Vite + React + React Router + Deno functions | 一家 SDK 管后端 |
| v0 | **Next.js**（唯一例外） | Vercel 自家产品，部署 Vercel |

七家里五家收敛到同一形状：**Vite + React + TypeScript + Tailwind + shadcn/ui**，分歧只在后端耦合 [S23]。这不是巧合——这是「LLM 语料最厚 + 框架概念最少」的交集，是市场对「什么栈 agent 写得最好」投票后的答案。v0 用 Next 是 vendor 逻辑不是技术结论。

### 1.2 State of JS 2025 情绪数据（2026 发布，~1.2 万受访者）

- **Vite**：连续多年最喜爱库，用量已超 React 升至全榜 #2——human-friendly 与 agent-friendly 罕见同票 [S24]。
- **Next.js**：meta-framework 用量第一（58.6%），但满意度 68%→55% 是**年度最大跌幅**，同时上「最恨榜」第 5——最两极分化的框架 [S24][S25]。
- **Astro**：「other frameworks」提名 #1（SoJS 官方注记它不属于 front-end framework 类，正好印证其定位在内容站赛道）[S25]。
- **TanStack Start**：同榜 #4 新入榜，1.0 stable 才一个月 [S25][S6]。
- **痛点第一名是 cognitive overload**——功能相当时，概念少的栈赢 [S25]。

### 1.3 Agent-friendly 真标准（照 ui-stack-decision §4 的口径：看机制不看宣传）

| 标准 | 实测（2026-11-12） |
|---|---|
| **官方 llms.txt** | 有：vite.dev、nextjs.org、tanstack.com、svelte.dev、nuxt.com、react.dev。无（404）：docs.astro.build、reactrouter.com、11ty.dev、gohugo.io |
| **LLM 语料引力** | React/Next 最厚（SoJS 用量 83.6%/58.6% + AI builder 默认栈佐证）；Astro 次之；Svelte/Vue 再次；Hugo 模板/11ty 最薄 |
| **agent 反馈回路** | 类型安全是 agent 自检回路：TanStack Router 官方把「改一处，type error 标出所有该改的」当 agent 卖点 [S7]；Next 16 发 DevTools MCP [S5]；Astro content collections 把内容错误变成 build 期报错 |
| **官方 agent 姿态** | TanStack 1.0 公告原话「put an agent to work on it」[S6] |

读法：agent-friendly 是**同分时的 tiebreaker，不是主判据**——主判据永远是场景需求。但它解释一个真实约束：给 agent 喂冷门栈（Hugo Go 模板、11ty 多模板方言）是在给生成质量加无谓税。

## 2 · 场景速查（归纳矩阵）

每格「默认 → 备选」从需求推导；判据写不出的格子是还没想清楚，不是矩阵缺列。

| 场景 | 默认答案 | 何时改选 | 一句话判据 |
|---|---|---|---|
| 个人站 / blog | **Astro** | 纯文本极简、零交互 → Hugo/11ty；已有一堆 React 资产且不想换生态 → Next static export | content collections 是框架内置的内容管线答案，不是自己糊 gray-matter [S1][S16] |
| 营销 landing | **Astro** | 和登录后产品共享设计系统/auth → Next（营销+产品一栈）；纯图文零交互 → 11ty/Hugo | 共享 React 组件库是唯一让 Next 赢内容站的理由；只为 SEO 选 Next 是杀鸡用牛刀 [S16][S17] |
| 文档站 / 帮助中心 | **专用 docs 形状**：Starlight（Astro 系）/ VitePress（Vue 栈）/ Docusaurus（React 栈） | 目录巨大、构建速度压一切 → Hugo | 侧栏/搜索/版本化是刚需，选哪条 docs 线跟随你的组件生态 |
| Dashboard / SaaS / 后台 | **Vite + React SPA**（全在登录后、无 SEO）或 **Next / TanStack Start**（需要 SSR、auth、server functions） | 类型安全狂热 + TanStack 生态 → Start；Remix 血统/嵌套路由数据流 → RR7 | 登录后工具上 SSR 是纯成本；这正是 AI builder 全行业的默认形状 [S21][S23] |
| 电商 / storefront | 先过闸：**<~$1M GMV 别 headless，留 Shopify theme** | headless 后：内容主导 storefront → Astro；app-like（账号/购物车/个性化）→ Next 或 Hydrogen toolkit on RR7 | Hydrogen 2026 已是框架无关 toolkit（Next/RR7/Nuxt/Astro/SvelteKit 都能挂）[S18][S22] |
| 作品集 | **Astro** | 只有 HTML+CSS 需求 → 11ty | 和 blog 同理：内容站形状 + 少量交互岛 |
| 内容站 / 媒体 / 目录 | **Astro**（有交互岛）/ **Hugo**（纯静态、页数巨大、构建速度硬约束） | 每日 CMS 更新 + draft preview + ISR 流程 → Next；编辑要 GUI → 先解 headless CMS 这个正交问题 | Hugo 千页级构建比 Astro 快一个量级，但没有组件岛概念 [S11][S12] |
| AI 产品公开站 + 站内有 AI 助手 | **Astro + React 岛** | 助手膨胀成主体应用 → 拆成两个表面（公开站 Astro / 工作台 Vite SPA） | 「内容壳 + 少量重交互岛」正是 islands 架构的设计中心 [S2] |

### 需求轴 → 赛道（格子背后的推导）

| 需求 | 指向 | 机制 |
|---|---|---|
| SEO = 命 | static-first（SSG/SSG+islands） | SEO = 初始 HTML 里有正文；SSR 也能给，但为静态内容养请求期算力不划算 |
| 交互密度高 | Vite SPA 或 React meta-framework | islands 过临界密度就没省到 JS [S16] |
| auth / 写路径 | SSR 赛道或 SPA+API | Next static export 官方不支持清单：cookies、rewrites、redirects、headers、ISR、Server Actions、draft mode [S4] |
| 非技术编辑 CMS | headless CMS（正交） | 框架层差异在 draft preview/ISR：Next 生态最成熟；Astro/Hugo 走 rebuild（分钟级） |
| 实时 | SSR+BaaS 或 SPA+BaaS | 与渲染策略无关，是数据通道问题 |
| i18n 多语言 | Hugo / Astro 内置 i18n routing 加分 | 外贸站 hreflang 是命门；Next App Router i18n 手工 |
| 构建速度 | Hugo ≫ 11ty > Astro ≫ Next | 实测 1000 篇 warm：Hugo 0.28s / 11ty 0.51s / Astro ~1s [S11] |
| 维护成本 | 单 binary（Hugo）< 纯静态产物 < Node SSR | 依赖树越厚升级税越高；SoJS 痛点 #1 就是 cognitive overload [S25] |
| agent 产出质量 | Vite+React > Next > Astro > Svelte/Vue > Hugo/11ty | AI builder 收敛栈 + 语料引力 + llms.txt/类型回路实测（§1.3） |
| human DX | Vite > Astro ≈ 11ty > meta-frameworks | Vite 多年最喜爱；概念数与认知税成正比 [S24] |

## 3 · 框架逐条：何时选它 / 何时别选

### 3.1 static-first SSG / islands 赛道

**Astro**（当前 7.x 线）
- **何时选**：内容站默认答案。UI-agnostic——React/Vue/Svelte 组件可做 islands，旧 React 资产不必扔；content collections（zod 校验、build 期报错）替掉手糊管线 [S1][S2]。
- **何时别选**：复杂跨组件客户端状态（会把整棵树变成一个岛）；实时 dashboard；要 Next 形状生态（auth providers、middleware 模式、edge utils）[S16]。
- agent 短板：docs 无 llms.txt（实测 404），.astro 语法比 JSX 略偏——可接受，不是否决项。

**Hugo**
- **何时选**：页数千级+、构建速度硬约束、接受 Go templates、不需要组件化交互。
- **何时别选**：要 React/Vue 组件岛（没这个概念）；团队/agent 只会 JS（模板语料薄）[S12]。

**Eleventy (11ty)**
- **何时选**：要小、要 JS 生态、不要 UI 框架、愿意自己搭功能（地基不是精装房）。
- **何时别选**：要 batteries-included（选 Hugo）；要组件岛（选 Astro）[S12]。

### 3.2 React meta-framework 赛道

**Next.js**（16.x 当前；16.4 已发）
- **何时选**：登录后产品 + 公开面挤一个仓；要 ISR/draft preview/成熟 CMS 生态；不确定未来会不会长 app 部分——它是唯一「今天静态、明天服务端」不锁死的选项 [S16][S17]。
- **何时别选**：确定永远纯内容站——RSC/server-client 边界概念税照付，static export 不支持清单还很长 [S4]；满意度年度最大跌幅（68→55）说明概念税是真实用户感受，不只是理论 [S24]。
- 16 系增量：Cache Components（`use cache` + PPR）、`proxy.ts` 取代 middleware、Turbopack 默认、DevTools MCP [S5]。

**TanStack Start**（1.0 stable 2026-10-13）
- **何时选**：React 生态 + 端到端类型安全优先；要 Vite 原生而非自研 bundler；新 app 项目愿意押新栈 [S6][S7]。
- **何时别选**：要 RSC（Start 的 RSC 仍 experimental，tanstack.com 自己不用）[S7][S8]；要最厚语料/教程/招聘池（仍是 Next）；内容站。
- 数据点：官方/社区基准 vs Next 16.4——动态请求吞吐 2.9–8.6×、构建 ~1.7×（厂商相关口径，非独立测量）[S8]。Netlify day-one plugin [S20]。

**React Router v7 / Remix 线**
- **何时选**：Remix 项目自然升级（framework mode 就是事实上的 Remix v3）；要 loader/action 数据流 + 逐路由 SPA/SSR/static；Shopify Hydrogen 默认底座 [S9][S10][S18]。
- **何时别选**：纯内容站；没有 React 数据流心智的团队别硬上 framework mode。

### 3.3 非 React full-stack 赛道

**SvelteKit**：团队偏好 Svelte（编译期、少样板）+ adapter 部署面干净 [S13]。别选理由：要 React 组件池/语料池。
**Nuxt**（4.x）：Vue 团队的 Next 等价物；Nitro 服务层可移植到几乎所有 host；route rules 逐路由渲染 [S13]。别选理由：React 资产厚；Nuxt 3 已 EOL、5 在路上带 Nitro v3，旧教程滞后。

### 3.4 无框架赛道

**Vite SPA**
- **何时选**：几乎全部在登录后、SEO 无关——**这是 AI builder 全行业默认 + SoJS 最喜爱工具的双重收敛**，dashboard 藏登录后它就是诚实的默认 [S21][S23][S24]。
- **何时别选**：有任何要排名的公开页（空 HTML 壳是 SEO 事故不是风格问题）；不想自己拼内容管线（Markdown→路由→RSS 全要自建）。

## 4 · 部署面一句话

- **Cloudflare**：官方口径「Workers 是主平台，新项目用 Workers」；Pages 未废弃但新特性不再进。已有 Pages 站不必急迁；Pages 独享仅剩外部 DNS 自定义域、固定分支预览 URL、月 500 次构建计数 [S14][S15]。
- **Vercel**：主流框架零配置；feature matrix 有真实差异（Astro 无 ISR、Nuxt 无 streaming SSR、RR7 无 image opt/ISR/skew）[S13]。
- **Node 自持**：`adapter-node` / `output: 'standalone'` → Docker/VPS；要 SSR 且不想 vendor lock 的诚实答案。
- **Netlify**：同形；TanStack Start day-one plugin [S20]。
- 铁律：**生产 deploy 走 Git-connected，不本机直传**。

## 5 · 反模式

- **先定栈再编理由**：本矩阵的正确读法是需求→赛道→栈；从「我想学 Astro」倒推需求是自欺，跟从「别人都用 Next」倒推一样。
- **为 SEO 选 Next**：纯内容站选 Next = 付 RSC 概念税 + 静态导出限制清单，买不需要的东西 [S4][S16][S24]。
- **给内容壳挂满 React 岛**：岛密度过了临界点，省的 JS 全还回去，还多一套 .astro↔.tsx 双语心智 [S16]。
- **拿自家仓互证**：本机案例是插图不是论据——论证要行业证据。
- **「新版本发布了」当迁移理由**：迁移的正当理由是旧栈付了可量化税，不是新栈存在。
- **Gatsby/Jekyll**：2026 还在推荐榜的指南没核实过——Gatsby 被 Netlify 收购后 maintenance mode [S18]。

## 6 · 本地实证（插图，不是论据）

仅作「矩阵形状在本机项目里的投影」对照，不作选型依据：

| 表面 | 栈 | 对应矩阵格 |
|---|---|---|
| chuhai-cloud `web/`（SaaS 工作台） | Vite + React SPA | 登录后产品面 |
| shelf-radar `frontend/`（情报查询 app） | Vite + React SPA | 同上 |
| inquiry-foundry `app/`（运营端） | Vite + React SPA | 同上 |
| inquiry-foundry 生成的买家站 | Astro 静态站 + React InquiryForm 岛 | B2B 内容主导 storefront |
| cfe-app（CFE 营销站+询盘+AI 助手） | Astro 7 + React 岛（Base UI+shadcn+Tailwind+Iconoir 同体系） | AI 产品公开站 + 站内 AI 助手 |
| lizliz.xyz | Next 16 `output:"export"` | 见 §7 |

值得注意的一条：cfe-app 的 Astro 壳里，React 岛用的组件体系（Base UI + shadcn + Tailwind + Iconoir）和三个 Vite SPA 是**同一套**——「表面分栈、组件词汇不分栈」是已被验证的分工形状。

---

## 7 · 演绎章：lizliz.xyz 拍板建议

> **结论：留 Next.js `output: "export"`，不迁。若重建，目标形态是 Astro + React 岛；触发条件明确写在下面。同时建议一个可逆的减重清单（不需要迁移就能做）。**

### 7.1 现状证据（2026-11-12 实地取证）

| 事实 | 证据 |
|---|---|
| Next 16.2.4 + React 19.2.4，`output: "export"` + `trailingSlash` + `images.unoptimized` | `next.config.ts`、`package.json` |
| 12 个 `page.tsx` 路由：/、/articles(+/[slug])、/podcast/[slug]、/skills、/templates、/share×4、workbook×1 | `src/app/` |
| 44 篇 markdown 文章 + podcast + workbooks，gray-matter 手糊管线 | `content/`、`src/lib/articles.ts` 等 |
| 25 个 `'use client'` 文件：Home 系 shader/背景、FairExplorer、i18n、heatmap、TopBar 等 | `grep -rln "use client" src/` |
| node_modules 1.3G；`three`/`@types/three`/`HeroCanvas.tsx` 无 import、是 dead code | `du -sh`、`grep -rn "from.*three" src/`（零命中） |
| CF Pages Git 部署；无 wrangler/functions/D1/API route | repo 根、`docs/audit-2026-08-16-stack.md` |
| SSR/RSC 流/Server Actions/middleware/ISR/next/image 全未用 | 同上审计 + 源码核对 |
| 先例决策（2026-08-16）：「留 Next；受不了壳时目标是 Astro 仍走 Pages 静态，不是 TanStack Start」 | `docs/audit-2026-08-16-stack.md` |

8 月审计设的重开条件是「本域出现写路径/鉴权/D1」——**至今未触发**：share/ 页面仍是静态产物，i18n 是 client-side switcher 不是路由。

### 7.2 对照：留 Next vs 迁 Astro vs 第三选项

| 方案 | 得到 | 付出/风险 | 部署 |
|---|---|---|---|
| **A · 留 Next** | 零迁移；React 组件直接复用；agent 语料最厚、Liz 的 agent 工作流最顺；未来若长写路径不锁死 | 壳偏重：RSC 边界演戏、构建重一个量级、1.3G 依赖树、Next 版本更迭税（16.2→16.4、proxy 改名）；Next 满意度跌幅最大的行业情绪是弱信号不是零 [S24] | Pages Git（现状） |
| **B · 迁 Astro** | 站形更正：content collections 替掉手糊管线（zod 校验 frontmatter 白拿）、0-JS 默认、构建显著更快、cfe-app 已验证「Astro 壳 + 同套 React 岛」路径 [S3][S16] | 12 个路由壳重写为 .astro；25 个 client 组件逐件过 client:* 指令与 props 序列化；**i18n React context 是最难点**（islands 隔离，provider 需逐岛包或改 vanilla 方案）；metadata/sitemap/robots 换 @astrojs/*；全站视觉回归 QA | 仍 Pages Git（Astro 静态产物） |
| **C · 第三选项：留 Next + 减重清单** | A 的全部 + 立即止损一部分壳成本 | 几小时量级 | 不变 |

### 7.3 迁 Astro 成本估算（若 B 被拍板）

- **机械层（低风险）**：44 篇 markdown 原样搬 + frontmatter 微调进 content collections；`src/lib/*` 手糊管线退役；public/ 不动；optimize-images.cjs 等 build scripts 可移植。≈1 天 agent 工作量。
- **页面层（中风险）**：12 个 page shell 重写为 .astro；layout/TopBar/Footer 拆成 Astro 组件 + 按需 islands；metadata/OG/JSON-LD 逐页对账（SEO 命门，不能回归）。≈1–2 天 + 逐页截图 QA。
- **交互层（高风险）**：25 个 client 组件中 i18n context provider 是结构性问题——Astro islands 互相隔离，没有跨岛共享 React context 的免费方案，需要 per-island provider 或改 DOM 属性/vanilla store。Home 系 shader 组件要确认 Astro island 内可用。FairExplorer 是单页内聚岛，低风险。
- **合计**：≈3–4 个 agent 工作日 + Liz 逐页视觉验收。一次重写成本，不是渐进迁移——Astro 没有 Next 的增量迁移路径（官方指南就是 rebuild）[S3]。
- **收益对账**：构建分钟级→秒级、依赖树减重一个量级、JS baseline 从「React runtime 每页必带」→「仅 island 页带」、内容管线获得 schema 校验。**全是效率/心智收益，没有功能解锁——现站没有坏掉的东西。**

### 7.4 不迁的理由（为什么 A 赢在现在）

1. **迁移成本 > 收益差**：≈3–4 天工作 + 全站回归风险，换一个用户感知不到的收益。规则同 §5：新栈存在 ≠ 迁移理由。
2. **重开条件未触发**：8 月审计定的扳机（写路径/auth/D1）没出现；share/ 提案页、workbook 都还是静态产物。
3. **i18n 是最贵的一块**：client-side React context 在 Next 免费，在 Astro 是设计题。为一个工作正常的方案付最高单项迁移成本不划算。
4. **agent 工作流维度反而帮 Next**：Liz 的站几乎全靠 agent 维护，Next/React 是语料最厚的栈；Next 16 还有 DevTools MCP。迁 Astro 在 agent-friendly 轴上是平移不是升级。
5. **期权价值**：share/ 在快速长「将来可能要写路径」的表面，Next 是唯一「今天静态、明天服务端」不换栈的选项。

### 7.5 建议（供 Liz 拍板）

1. **现在**：选 A+C——留 Next，顺手做减重清单：删 `three`、`@types/three`、`HeroCanvas.tsx`（dead code，8 月审计已标「可选可逆」至今）；`puppeteer-core`/`@puppeteer/browsers` 只服务 resume PDF，属 build-time 可留；升级顺手跟 16.4 线。
2. **触发即迁 B（Astro）**：(a) 下一次全站 redesign/大改版（反正要重写）；(b) Next 升级税事件（breaking change 逼到大修）；(c) 构建时间变成真实工作流瓶颈；(d) 决定给内容管线加协作/校验功能（content collections 白拿）。迁时仍走 CF Git 链；届时 Pages 若已边缘化则顺势 Workers static assets [S14][S15]。
3. **明确不选**：TanStack Start（无写路径，1.0 stable 不改变纯静态站判据）；Hugo/11ty（丢全部 React 组件资产，最差拟合）。

**置信度：** 高（与 2026-08-16 审计同结论；新增证据——Start 1.0、SoJS 2025 情绪数据、CF Workers 官方导向、AI builder 默认栈——更新备选排序但不改变判据）。
**Next checkpoint：** §7.5.2 四个触发信号任一出现。

---

## 来源与证据口径

路径：Exa 语义搜索 5 组（`web_search_exa`）+ 原生 web search 6 组交叉 + llms.txt 10 域实测（2026-11-12，curl）。第一方官方文档/发布博客/行业调查优先；社区比较只作对照。query 记录见回执 `~/fleet-orch/day-1112/receipts/stack-scout.md`。未安装候选框架、未做性能实测；构建速度数字为第三方测量，标注口径。

- **S1** Astro Why Astro（content-driven 定位）：https://docs.astro.build/en/concepts/why-astro/
- **S2** Astro Islands architecture（0-JS 默认、client:* 机制）：https://docs.astro.build/en/concepts/islands/
- **S3** Astro 官方 Migrating from Next.js（rebuild 而非增量、React 组件可复用）：https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/
- **S4** Next.js Static Exports 官方文档（unsupported features 清单）：https://nextjs.org/docs/app/guides/static-exports
- **S5** Next.js 16 发布博客（Cache Components、proxy.ts、Turbopack、DevTools MCP）：https://nextjs.org/blog/next-16
- **S6** TanStack Start 1.0 stable 公告（2026-10-13，「put an agent to work on it」）：https://tanstack.com/blog/tanstack-start-1-0
- **S7** TanStack Start Overview（vs Router 定位、RSC experimental、type-safety 当 agent 卖点）：https://tanstack.com/start/latest/docs/framework/react/overview
- **S8** React Status #494（Start vs Next 16.4 基准：2.9–8.6× 动态请求、~1.7× 构建；厂商相关口径）：https://react.statuscode.com/issues/494
- **S9** React Router v7 Picking a Mode（framework mode = Remix 后继，SPA/SSR/static 逐路由）：https://reactrouter.com/7.18.1/start/modes
- **S10** Remix 官方 Merging Remix and React Router：https://remix.run/blog/merging-remix-and-react-router
- **S11** We.Inc SSG 实测构建速度（1000 篇 warm：Hugo 0.28s / 11ty 0.51s / Astro ~1s；第三方测量）：https://we.inc/guides/static-site-generators
- **S12** Hugo vs 11ty 对照（batteries vs foundation）：https://bobrockefeller.com/blog/2025-08-27-hugo-or-11ty/
- **S13** Vercel Full-stack frameworks feature matrix（各框架在 Vercel 的真实差异）：https://vercel.com/docs/frameworks/full-stack
- **S14** Cloudflare 官方 Migrate from Pages to Workers：https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- **S15** CF Pages vs Workers 2026 对照（引官方「Workers 是主平台，新项目用 Workers」+ Pages 独享项）：https://www.urhoba.net/en/post/cloudflare-guide-deploying-static-sites-workers-and-pages
- **S16** Brad Traversy — Why Astro over Next（「mostly content → Astro / mostly state → Next」判据）：https://bradtraversy.dev/articles/why-astro-over-next
- **S17** Dardo Studio — Astro vs Next.js 2026（rebuild 经济学、Cache Components 细节）：https://dardo.studio/en/blog/astro-vs-nextjs/
- **S18** Binary Future — Shopify headless toolkit 2026（Hydrogen 转框架无关、Gatsby maintenance mode）：https://binaryfuture.io/blog/shopify-plus/the-headless-toolkit-technologies-that-power-shopify-in-2026/
- **S20** Netlify changelog — TanStack Start 1.0 day-one plugin：https://www.netlify.com/changelog/2026-10-13-tanstack-start-1-0/
- **S21** React Handbook frameworks（登录后 SPA 仍是诚实默认、CRA 已死）：https://reacthandbook.dev/frameworks
- **S22** Headless commerce 2026（<~$1M GMV 别 headless 阈值口径）：https://pavlealeksic.com/blog/headless-commerce-2026
- **S23** Joylo — 7 AI App Builders 生成栈对比（2026-09：五家收敛 Vite+React+TS+Tailwind+shadcn，v0 为 Next）：https://joylo.ai/blog/ai-app-builder-tech-stacks-compared
- **S24** State of JS 2025 — Libraries（Vite 最喜爱+#2 用量、Next 满意度 68→55 最大跌幅、最恨榜第 5）：https://2025.stateofjs.com/en-US/libraries/
- **S25** State of JS 2025 — Front-end Frameworks（Astro other #1、Start #4 新入榜、痛点 #1 cognitive overload）：https://2025.stateofjs.com/en-US/libraries/front-end-frameworks

**时效标注**：全部结论核查于 2026-11-12。高衰减条目——TanStack Start 刚 stable 一个月（S6/S8）、SoJS 2025 年度数据（S24/S25）、CF Pages→Workers 官方导向（S14/S15）、Hydrogen 形态变化（S18）、llms.txt 实测——下次选型复核时优先重核。
