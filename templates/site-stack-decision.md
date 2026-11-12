---
name: site-stack-decision
description: >-
  站点级技术栈选型决策矩阵（场景×需求×赛道）。Use when 给一个站点/产品选框架
  （Astro/Next/TanStack Start/Hugo/11ty/SvelteKit/Nuxt/RR7/Vite SPA）或选部署面；
  判断现有站点是否该迁栈；评估某个框架当前维护状态。渲染策略坐标轴（SSG/SSR/SPA/Islands）
  走 rendering-strategy-map.md；组件库层走 ui-stack-decision.md。
---

# 站点技术栈选型 · 场景×需求×赛道决策矩阵

核查日期：2026-11-12（证据时效以此为准）。用途：跨项目复用的选型尽调——先归纳（通用矩阵），再演绎（套用到 lizliz.xyz）。与本 pack 分工：`rendering-strategy-map.md` 管「每个表面选什么渲染策略」，本文管「整站选哪个框架 + 部署面」；`ui-stack-decision.md` 管组件库层，不在本文范围。

## 0 · 拿不准时的默认答案

> **内容站（大部分页面对所有访客一样）→ Astro。登录后产品（大部分页面是个性化应用）→ Next.js 或 TanStack Start。介于两者之间 → 按「主要内容还是主要状态」二分，劈不开就各一个栈、契约隔开。**

一句话判据来自 Astro 官方对自身的定位：「content-driven websites……如果你需要加载快、SEO 好的网站」[S1]，以及对面的镜像——「mostly content, occasionally interactive → Astro；mostly state, occasionally static → Next」[S16]。这不是粉丝口径，是两边官方文档的共同结论 [S1][S7]。

三条先决过滤（按顺序问）：

1. **有没有写路径 / auth / 请求期数据？** 有 → static-first 赛道出局，进 SSR/full-stack 赛道（Next / Start / RR7 / SvelteKit / Nuxt）。没有 → static-first 默认成立。
2. **SEO 是不是命门？** 是 → 首屏 HTML 必须有正文，空壳 SPA 出局。「Google 能执行 JS」≠ 最优 [S21]。
3. **团队已经在哪个生态？** React 资产厚 → 留在 React 赛道；Vue 团队 → Nuxt；没人写前端 → 别上 meta-framework，Hugo/11ty 或托管方案。

## 1 · 场景速查（归纳矩阵）

每格给「默认 → 备选」和一句可执行判据。判据写不出的格子是你还没想清楚，不是矩阵缺列。

| 场景 | 默认答案 | 何时改选 | 一句话判据 |
|---|---|---|---|
| 个人站 / blog | **Astro** | 纯文本极简、无交互组件 → Hugo/11ty；已有一堆 React 组件资产且不想换生态 → Next static export | 内容站默认 0 JS + content collections 是框架内置的答案，不是自己糊的管线 [S1][S16] |
| 营销 landing | **Astro** | 和登录后产品共享设计系统/组件/auth → Next（营销+产品一栈）；页面纯图文零交互 → 11ty/Hugo | 共享 React 组件库是唯一让 Next 赢内容站的理由；只为 SEO 选 Next 是杀鸡用牛刀 [S16][S17] |
| 文档站 / 帮助中心 | **专用 docs 形状**：Starlight（Astro 系）/ VitePress（Vue 栈）/ Docusaurus（React 栈） | 目录巨大、构建速度压一切 → Hugo | 侧栏/搜索/版本化是刚需，别用通用框架手搓；选哪条 docs 线跟随你的组件生态 |
| Dashboard / SaaS / 后台 | **Vite SPA**（全在登录后、无 SEO）或 **Next / TanStack Start**（需要 SSR、auth、server functions） | 类型安全狂热 + TanStack 生态 → Start；Remix 血统/嵌套路由数据流 → RR7 | 登录后工具上 SSR 是纯成本；有 SEO 面才需要 meta-framework [S21][S7] |
| 电商 / storefront | 先问要不要 headless：**<~$1M GMV 别 headless，留 Shopify theme** | headless 后：内容主导 storefront → Astro；app-like（账号/购物车/个性化）→ Next 或 Hydrogen toolkit on RR7 | Hydrogen 2026 已是框架无关 toolkit（Next/RR7/Nuxt/Astro/SvelteKit 都能挂），不再是「选 Hydrogen = 选 Remix」[S18][S19][S22] |
| 作品集 | **Astro** | 只有 HTML+CSS 需求 → 11ty | 和 blog 同理：内容站形状 + 少量交互岛 |
| 内容站 / 媒体 / 目录 | **Astro**（有交互岛）/ **Hugo**（纯静态、页数巨大、构建速度是约束） | 每日 CMS 更新 + draft preview + ISR 流程 → Next；编辑要 GUI → headless CMS 正交问题，先解 CMS | Hugo 千页级构建比 Astro 快一个量级；但 Hugo 没有组件岛，交互只能手写脚本 [S11][S12] |

### 需求轴 → 赛道（格子背后的推导）

| 需求 | 指向 | 机制 |
|---|---|---|
| SEO = 命 | static-first（SSG/SSG+islands） | SEO = 初始 HTML 里有正文；SSR 也能给，但为静态内容养请求期算力不划算 |
| 交互密度高 | React meta-framework 或 Vite SPA | islands 超过临界密度就没省到 JS——「给 Astro 挂满 React 岛」是常见反模式 [S16] |
| auth / 写路径 | SSR 赛道（Next/Start/RR7/SvelteKit/Nuxt） | static export 官方不支持：cookies、rewrites、redirects、headers、ISR、Server Actions、draft mode [S4] |
| 非技术编辑 CMS | headless CMS，与框架正交 | 框架层差异在 draft preview/ISR：Next 的 ISR+draft mode 生态最成熟；Astro/Hugo 走 rebuild（分钟级） |
| 实时（协同/行情/聊天） | SSR+BaaS 或 SPA+BaaS | 与渲染策略无关，是数据通道问题 |
| i18n 多语言 | Hugo / Astro 内置 i18n routing 加分 | 外贸站 hreflang 是命门；Next App Router i18n 要手工 |
| 构建速度 | Hugo ≫ 11ty > Astro ≫ Next | 实测 1000 篇：Hugo 0.28s / 11ty 0.51s / Astro ~1s（warm）[S11]；冷启另一组：Hugo 41s / Astro 3m05s [S11] |
| 维护成本 | 单 binary（Hugo）< 纯静态产物 < Node SSR | 依赖树越厚，升级税越高；SSR 多一层运行时运维 |
| LLM 语料引力 | React/Next > Astro > Svelte/Vue > Hugo 模板 | agent 输出质量跟随训练语料厚度；冷门栈是隐性负债（rendering-strategy-map §4 同判） |

## 2 · 框架逐条：何时选它 / 何时别选

### 2.1 static-first SSG / islands 赛道

**Astro**（当前 5.x/7.x 线）
- **何时选**：内容站默认答案——blog、营销、文档、作品集、目录、内容主导 storefront。UI-agnostic：React/Vue/Svelte 组件可做 islands，旧 React 资产不必扔 [S1][S2]。
- **何时别选**：复杂跨组件客户端状态（会把整棵树变成一个岛，等于白选）；实时 dashboard；想要 Next 形状生态（auth providers、middleware 模式、edge utils）[S16]。
- 关键件：content collections（zod 校验 frontmatter，build 期报错）、`client:*` 按需注水、server islands、内置 i18n routing、@astrojs/sitemap。

**Hugo**
- **何时选**：页数千级+、构建速度是硬约束、团队接受 Go templates、不需要组件化交互。
- **何时别选**：需要 React/Vue 组件岛（它没有这个概念）；团队只会 JS 不想碰 Go 模板 [S12]。

**Eleventy (11ty)**
- **何时选**：要小、要 JS 生态、不要 UI 框架、愿意自己搭功能（它是地基不是精装房）；多模板语言自由。
- **何时别选**：要 batteries-included（分页/高亮/i18n 全内置选 Hugo）；要组件岛（选 Astro）[S12]。

### 2.2 React meta-framework 赛道

**Next.js**（16.x 当前；16.4 已发）
- **何时选**：登录后产品 + 公开面混在同一仓；React 团队；要 ISR/draft preview/成熟 CMS 生态；不确定未来会不会长出 app 部分（Next 是唯一「静态今天、服务端明天」不锁死的答案）[S16][S17]。
- **何时别选**：确定永远纯内容站——为 RSC/server-client 边界的概念税付钱却没有负载；static export 的官方不支持清单很长（ISR、image optimizer、rewrites/redirects/headers、cookies、Server Actions、draft mode、intercepting routes）[S4]。
- 16 系增量：Cache Components（`use cache` + PPR 完整落地）、`proxy.ts` 取代 middleware、Turbopack 默认、DevTools MCP [S5]。

**TanStack Start**（1.0 stable 2026-10-13）
- **何时选**：React 生态 + 类型安全至上（router/server functions 端到端类型）；想要 Vite 原生而非自研 bundler；新 app 项目愿意押新栈。官方自称与 Next/Remix 同能力面 + 更强 DX [S6][S7]。
- **何时别选**：要 RSC（Start 的 RSC 仍 experimental，tanstack.com 自己都不用）[S7][S8]；要最厚语料/教程/招聘池（仍是 Next）；内容站（杀鸡用牛刀）。
- 数据点：官方/社区基准 vs Next 16.4——动态请求吞吐 2.9–8.6×、构建 ~1.7×（厂商相关比较，非独立测量，注意口径）[S8]。Netlify day-one plugin、Appwrite Sites 已支持 [S20]。

**React Router v7 / Remix 线**
- **何时选**：Remix 血统项目自然升级（RR7 framework mode 就是「Remix v3」）；想要 loader/action 数据流 + 可逐路由选 SPA/SSR/static；Shopify Hydrogen 默认模板底座 [S9][S10][S18]。
- **何时别选**：纯静态内容站（同 Next 理由）；团队没有 React 数据流心智，declarative mode 起步即可别硬上 framework mode。

### 2.3 非 React full-stack 赛道

**SvelteKit**
- **何时选**：团队偏好 Svelte 心智（编译期、少样板）；性能敏感 app；adapter 体系部署面干净（node/netlify/cloudflare/static）[S13]。
- **何时别选**：要 React 生态组件池/招聘池。

**Nuxt**（4.x 当前，5 在路上）
- **何时选**：Vue 团队的 Next 等价物；Nitro 服务层可移植到几乎所有 host；route rules 让公开页 prerender、后台页 SSR 混在一仓 [S13]。
- **何时别选**：React 资产厚；介意版本更迭（Nuxt 3 已 EOL，5 将带 Nitro v3，旧教程/模块滞后）[S13]。

### 2.4 无框架赛道

**Vite SPA**（React/Vue/Svelte 裸单页）
- **何时选**：几乎全部在登录后、SEO 无关、团队愿意自己养路由/数据/部署细节——「dashboard 藏登录后，SPA 是诚实的默认」[S21]。
- **何时别选**：有任何要排名的公开页（空 HTML 壳是 SEO 事故，不是风格问题）；不想自己拼内容管线（Markdown→路由→RSS 全要自建）。
- CRA 已死，新项目一律 Vite [S21]。

## 3 · 部署面一句话

- **Cloudflare**：官方口径 2026 ——「Workers 是主平台，新项目用 Workers」；static assets 请求免费，Pages 未废弃但没有新特性。已有 Pages 站不必急迁；Pages 独享仅剩：外部 DNS 自定义域（CNAME）、固定分支预览 URL、月 500 次构建计数 [S14][S15]。
- **Vercel**：Next/Start/Nuxt/SvelteKit/Astro/Remix 零配置；feature matrix 有真实差异（Astro 无 ISR、Nuxt 无 streaming SSR、RR7 无 image opt/ISR/skew）[S13]。
- **Node 自持**：`adapter-node` / `output: 'standalone'` → Docker/VPS；要 SSR 且不想 vendor lock 时的诚实答案，代价是自己养运行时。
- **Netlify**：与 Vercel 同形；TanStack Start day-one plugin（vite plugin + netlify.toml）[S20]。
- 铁律沿用本仓惯例：**生产 deploy 走 Git-connected，不本机直传**。

## 4 · 反模式

- **为 SEO 选 Next**：纯内容站选 Next = 付 RSC 概念税 + 静态导出限制清单，买不需要的东西 [S4][S16]。
- **为组件库选 Astro 然后挂满 React 岛**：岛密度过了临界点，省的 JS 全还回去，还多了 .astro↔.tsx 双语心智 [S16]。
- **把 acriva/别人家架构当选型证据**：Start+Workers+D1 是那个产品的机制，复制到无写路径的站是空载（见 §5 先例）。
- **「新版本发布了」当迁移理由**：迁移的正当理由是旧栈付了可量化税，不是新栈存在。
- **Gatsby/Jekyll**：2026 还在推荐榜的指南没核实过——Gatsby 被 Netlify 收购后 maintenance mode [S18]。

---

## 5 · 演绎章：lizliz.xyz 拍板建议

> **结论：留 Next.js `output: "export"`，不迁。目标形态若重建是 Astro；触发条件明确写在下面。同时建议一个可逆的减重清单（不需要迁移就能做）。**

### 5.1 现状证据（2026-11-12 实地取证）

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

### 5.2 对照：留 Next vs 迁 Astro vs 第三选项

| 方案 | 得到 | 付出/风险 | 部署 |
|---|---|---|---|
| **A · 留 Next** | 零迁移；React 组件直接复用；未来若长写路径不锁死 | 壳偏重：RSC 边界演戏、构建重一个量级、1.3G 依赖树、Next 版本更迭税（16.2→16.4、proxy 改名） | Pages Git（现状） |
| **B · 迁 Astro** | 站形更正：content collections 替掉手糊管线（zod 校验 frontmatter 白拿）、0-JS 默认、构建显著更快、Astro 官方有 Next 迁移指南 [S3] | 12 个路由壳重写为 .astro；25 个 client 组件逐件过 client:* 指令与 props 序列化；**i18n React context 是最难点**（island 间隔离，provider 需逐岛包或改 vanilla 方案）；metadata/sitemap/robots 换 @astrojs/*；全站视觉回归 QA | 仍 Pages Git（Astro 静态产物） |
| **C · 第三选项：留 Next + 减重清单** | A 的全部 + 立即止损一部分壳成本 | 几小时量级 | 不变 |

### 5.3 迁 Astro 成本估算（若 B 被拍板）

- **机械层（低风险）**：44 篇 markdown 原样搬 + frontmatter 微调进 content collections；`src/lib/*` 手糊管线退役；public/ 不动；optimize-images.cjs 等 build scripts 可移植。≈1 天 agent 工作量。
- **页面层（中风险）**：12 个 page shell 重写为 .astro；layout/TopBar/Footer 拆成 Astro 组件 + 按需 islands；metadata/OG/JSON-LD 逐页对账（SEO 命门，不能回归）。≈1–2 天 + 逐页截图 QA。
- **交互层（高风险）**：25 个 client 组件中 i18n context provider 是结构性问题——Astro islands 互相隔离，没有跨岛共享 React context 的免费方案，需要 per-island provider 或改 DOM 属性/vanilla store 方案。Home 系 shader 组件（Paper shaders React 版）要确认 Astro island 内可用。FairExplorer 是单页内聚岛，低风险。
- **合计**：≈3–4 个 agent 工作日 + Liz 逐页视觉验收。属于「一次重写」成本，不是渐进迁移——Astro 没有 Next 的增量迁移路径（官方指南就是 rebuild）[S3]。
- **收益对账**：构建时间 分钟级→秒级、依赖树减重一个量级、JS baseline 从「React runtime 每页必带」→「仅 island 页带」、内容管线获得 schema 校验。**收益真实但都是效率/心智收益，不是功能解锁**——现站没有坏掉的东西。

### 5.4 不迁的理由（为什么 A 赢在现在）

1. **迁移成本 > 收益差**：B 的收益（构建快、依赖轻、管线更正）折算约 3–4 天工作 + 全站回归风险，而现站没有用户可感知的坏点。规则同 §4：新栈存在 ≠ 迁移理由。
2. **重开条件未触发**：8 月审计定的扳机（写路径/auth/D1）没出现；share/ 提案页、workbook 都还是静态产物。
3. **i18n 是最贵的一块**：client-side React context 方案在 Next 免费，在 Astro 是设计题。为一个工作正常的方案付最高单项迁移成本不划算。
4. **期权价值**：Next 是唯一「今天静态、明天长 app 不用换栈」的选项。lizliz.xyz 在快速长 share/ 提案页这类「将来可能要写路径」的表面，留着期权比省构建时间值钱。

### 5.5 建议（供 Liz 拍板）

1. **现在**：选 A+C——留 Next，顺手做减重清单：删 `three`、`@types/three`、`HeroCanvas.tsx`（dead code，8 月审计已标「可选可逆」至今）；评估 `puppeteer-core`/`@puppeteer/browsers` 是否只服务 resume PDF（是 → 确认无需瘦身即可）；下次升级顺手 16.2.4→16.4 线。这些不需要迁移，直接砍掉壳的一部分重量。
2. **触发即迁 B（Astro）**：出现以下任一信号就重开——(a) 下一次全站 redesign/大改版（反正要重写，顺带换栈）；(b) Next 升级税事件（breaking change 逼到大修）；(c) 构建时间变成真实工作流瓶颈；(d) 决定给内容管线加协作/校验功能（content collections 白拿）。**迁时部署仍走 CF；若届时 Pages 已边缘化则顺势迁 Workers static assets（官方方向）[S14][S15]。**
3. **明确不选**：TanStack Start（无写路径，纯静态站用它是杀鸡用牛刀，8 月审计同判，1.0 stable 不改变这个判断——它改变的是 app 赛道候选排序）；Hugo/11ty（丢全部 React 组件资产，最差拟合）。

**置信度：** 高（与 2026-08-16 审计同结论，且新增证据——Start 1.0、Next 16.4、CF Workers 官方导向——均不改变判据，只更新备选排序）。
**Next checkpoint：** §5.5.2 的四个触发信号任一出现。

---

## 来源与证据口径

路径：Exa 语义搜索 4 组（`web_search_exa`）+ 原生 web search 4 组交叉验证；第一方官方文档/发布博客优先，社区比较作对照。query 记录见回执 `~/fleet-orch/day-1112/receipts/stack-scout.md`。未安装候选框架、未做性能实测；构建速度数字为第三方测量，标注口径。

- **S1** Astro Why Astro（content-driven 定位）：https://docs.astro.build/en/concepts/why-astro/
- **S2** Astro Islands architecture（0-JS 默认、client:* 机制）：https://docs.astro.build/en/concepts/islands/
- **S3** Astro 官方 Migrating from Next.js（rebuild 而非增量、React 组件可复用）：https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/
- **S4** Next.js Static Exports 官方文档（unsupported features 清单）：https://nextjs.org/docs/app/guides/static-exports
- **S5** Next.js 16 发布博客（Cache Components、proxy.ts、Turbopack）：https://nextjs.org/blog/next-16
- **S6** TanStack Start 1.0 stable 公告（2026-10-13）：https://tanstack.com/blog/tanstack-start-1-0
- **S7** TanStack Start Overview（vs Router 定位、RSC experimental）：https://tanstack.com/start/latest/docs/framework/react/overview
- **S8** React Status #494（Start vs Next 16.4 基准：2.9–8.6× 动态请求、~1.7× 构建；厂商相关口径）：https://react.statuscode.com/issues/494
- **S9** React Router v7 Picking a Mode（framework mode = Remix 后继，SPA/SSR/static 逐路由）：https://reactrouter.com/7.18.1/start/modes
- **S10** Remix 官方 Merging Remix and React Router：https://remix.run/blog/merging-remix-and-react-router
- **S11** We.Inc SSG 实测构建速度（1000 篇 warm：Hugo 0.28s / 11ty 0.51s / Astro ~1s；第三方测量）：https://we.inc/guides/static-site-generators
- **S12** Hugo vs 11ty 对照（batteries vs foundation）：https://bobrockefeller.com/blog/2025-08-27-hugo-or-11ty/
- **S13** Vercel Full-stack frameworks feature matrix（各框架在 Vercel 的真实差异）：https://vercel.com/docs/frameworks/full-stack
- **S14** Cloudflare 官方 Migrate from Pages to Workers：https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- **S15** CF Pages vs Workers 2026 对照（引官方「Workers 是主平台，新项目用 Workers」口径 + Pages 独享项）：https://www.urhoba.net/en/post/cloudflare-guide-deploying-static-sites-workers-and-pages
- **S16** Brad Traversy — Why Astro over Next（「mostly content → Astro / mostly state → Next」判据 + content collections 对 contentlayer 空位）：https://bradtraversy.dev/articles/why-astro-over-next
- **S17** Dardo Studio — Astro vs Next.js 2026（rebuild 经济学、Cache Components 细节）：https://dardo.studio/en/blog/astro-vs-nextjs/
- **S18** Binary Future — Shopify headless toolkit 2026（Hydrogen 转框架无关 toolkit、Gatsby maintenance mode）：https://binaryfuture.io/blog/shopify-plus/the-headless-toolkit-technologies-that-power-shopify-in-2026/
- **S19** Astro vs Shopify Hydrogen storefront 对照：https://komalnakrani.com/blog/astro-vs-shopify-hydrogen/
- **S20** Netlify changelog — TanStack Start 1.0 day-one plugin：https://www.netlify.com/changelog/2026-10-13-tanstack-start-1-0/
- **S21** React Handbook frameworks（登录后 SPA 仍是诚实默认、CRA 已死）：https://reacthandbook.dev/frameworks
- **S22** Headless commerce 2026（<~$1M GMV 别 headless 阈值口径）：https://pavlealeksic.com/blog/headless-commerce-2026

**时效标注**：全部结论核查于 2026-11-12。其中高衰减条目——TanStack Start 刚 stable 一个月（S6/S8）、CF Pages→Workers 官方导向（S14/S15）、Hydrogen 形态变化（S18）、Nuxt 3→4/5 更迭（S13）——下次选型复核时优先重核。
