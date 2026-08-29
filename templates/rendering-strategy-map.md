# Rendering strategy map — 渲染选型决策图

**Job:** 在"谁算 HTML、什么时候算、算多少、怎么活、存多久"这组轴上，**按表面**选渲染策略；防止"一个栈框死全项目"的局部最优，也防止把 SSR/SSG/SPA/ISR/Islands 当成一棵错误的兄弟树。
**不是什么：** 不是框架推荐榜；框架只是这些轴上的一组预设答案。

---

## 1. 坐标轴（唯一需要记的东西）

| 维度 | 问题 | 常见答案 |
|---|---|---|
| 生成者 | HTML 谁拼？ | 浏览器 (CSR) / 服务器 (SSR) / 构建时 (SSG) |
| 时机 | 什么时候拼？ | build / request / first-request (ISR·DPR·DSG) |
| 导航 | 点链接后？ | 整页刷新 (MPA) / JS 换屏 (SPA) |
| 更新 | 内容变了？ | rebuild / TTL / on-demand revalidate / SWR |
| 激活 | HTML 怎么变活？ | hydration / partial hydration / islands / resumability |
| 输出 | 怎么发？ | buffered / streaming |
| 组件位置 | 代码在哪跑？ | server component / client component |
| 执行地点 | server 在哪？ | origin / serverless / edge |
| 缓存 | 算完存多久？ | none / CDN / full-page cache |
| 取数 | 数据谁拿？ | browser fetch / server fetch (BFF) |

注意：**CSR/SSR/SSG 回答"在哪算"，SPA/MPA 回答"怎么导航"，两者正交**。SPA ≠ CSR；SSG+SPA、SSR+SPA 都是合法组合。现代产品几乎都是混合体。

## 2. 什么时候选什么（按表面类型）

| 表面 | 默认策略 | 机制理由 | 反例信号 |
|---|---|---|---|
| 登录后工具 / 后台 / dashboard | SPA + CSR + client fetching | SEO 无关，交互密集，数据私有 | 给它上 SSR = 纯成本 |
| 营销页 / 官网 / 博客 | SSG + islands + CDN | 内容稳定、SEO 是命、JS 越少越快 | 整页 hydration |
| 商品目录 / 电商站 | SSG（按变更重建）+ 动态洞（购物车/询盘） | 90% 内容可静态化；库存/个人化才需要请求时算 | 用 ISR 解决"本可 rebuild 的新鲜度" |
| 大规模 UGC / 强实时 | SSR + 多级缓存 | 页面在请求前不存在 | — |
| 文档 / 帮助中心 | docs-SSG（Starlight / VitePress） | 导航/搜索/版本化是刚需 | 用通用框架手搓侧栏 |
| 软件型产品（Figma/Notion 类） | CSR-heavy SPA | 是"装在浏览器里的桌面软件" | 以为它需要 SEO |

## 3. 为什么：记机制，不记名词

- **SEO** = 初始 HTML 里有没有正文 + 元数据是否静态可抓。"Google 能执行 JS"≠"最优"。
- **首屏速度** = 传输量 × 水合成本。Islands/partial hydration 赚的就是"别 hydrate 静态 95%"。
- **新鲜度** 与"静态/动态"无关，只与**重建触发器和缓存 TTL** 有关。看到"数据旧了"，先问缓存层，再问数据库。
- **看得到点不动** = hydration 没完成；**JS 5MB** = 该 islands / code splitting 了。

## 4. 生成式产品（site factory）的特殊视角

- **框架是 build target，不是运行时承诺。** 产物 = 不可变 artifact + CDN。factory 不想为每个客户站养一个请求时 Node 进程，所以 **SSR-by-default 是错的，SSG-by-default 是对的**。
- immutable release pipeline（build → hash → artifact → 原子激活）**本来就是一条 SSG 流水线**。SPA 产物的错不在"静态"，在**空 HTML**（正文靠 JS 注入）。
- 内容新鲜度的正解是**确定性重建**：内容变更 → 不带模型的 rebuild（秒级）→ 新 artifact → 原子替换。这就是 on-demand revalidation 的 factory 版，**不需要 ISR**。CMS 在 factory 自己手里时，ISR 的存在意义大半消失。
- **LLM codegen 的 training-data gravity 是真实选型约束**：模型对某框架的代码语料越厚，生成质量与可维护性越好。冷门栈在 vibe-coding 产品里是隐性负债。

## 5. SSG 选项速查（含 React 友好度）

| 选项 | 生态 | 形状 | 何时选 |
|---|---|---|---|
| **Astro** | 自有模板 + React islands | 静态优先、默认 0 JS、真实 MPA HTML、内置 i18n 路由 | 内容站/目录站默认答案；React 组件库可在 islands 内复用 |
| Next.js (static export) | React | 全 React 运行时出静态包 | 想留在单一 React 生态时；比 Astro 重，ISR 诱惑对 factory 无意义 |
| vike (vite-plugin-ssr) | React/Vite | 最 Vite 原生，但胶水层自己养 | 想要极致控制且愿付维护税 |
| React Router v7 (framework mode) | React | Remix 血统，SSR/SSG | 产物本身是"app 形"时 |
| TanStack Start | React | 新一代 SSR meta-framework，较新 | 团队重仓 TanStack 生态时 |
| **VitePress** | **Vue** | docs 形状（侧栏/搜索/i18n 顶配） | **文档/帮助中心卫星站**；不是商品目录的形状；引入 Vue 生态前先问值不值 |
| 11ty | 无框架 | 极简、无 islands 体系 | 纯内容小站 |

## 6. unknown unknowns checklist（选型时最容易漏的）

- [ ] **i18n / hreflang**：多语言是 build 时烤进静态页，还是客户端切？外贸站这是命门，SSG 天然占优。
- [ ] **结构化数据 JSON-LD**（Product/Organization/BreadcrumbList）在 build 时烤进 HTML。
- [ ] **base path / 预览挂载**：产物要挂在认证路径下时，绝对资源路径必断；选型时验证。
- [ ] **islands 内复用既有 React 组件库**（shadcn / 设计胶囊），还是 islands 也要换生态？
- [ ] **重建经济学**：内容变更 → rebuild 的触发、耗时、原子替换路径是否设计过？
- [ ] **训练数据引力**：LLM 生成该框架代码的质量与语料厚度。

## 7. 经典四问（局部最优自检）

1. **什么时候选什么**——按表面，不按项目。
2. **为什么选**——机制理由能写出来，写不出=没想清。
3. **unknown unknowns**——过一遍第 6 节清单。
4. **全局视野**——"全项目一个栈"和"每个表面一个栈"都可能是局部最优；正解通常是**每表面一个生产栈，表面之间用契约（payload/adapter）隔开**。
