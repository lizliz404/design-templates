---
name: x-design-reading-list-2026-10
description: >-
  X 上 2026-08-20..10-19 设计 / UI / UX / PM 高收藏帖子的去重阅读清单与链接表。
  Use when looking for current design-engineering reading, AI design skills,
  component / motion libraries or PM essays; items already in the pack point to their file.
---

# X 设计 / UI / UX / PM 高收藏帖（2026-08-20 至 2026-10-19）

来源：X API 只读搜索，抓取 2026-10-20（UTC+8），按收藏 🔖 优先挑选；覆盖不是全量，纯梗图、招聘、广告已滤。指标为抓取时数值。本文只是书签层：用完回 [`README.md`](./README.md) 主路由选资产，不 vendor 外站。

**收录规则：** GitHub 仓库只收 ≥5k star（2026-10-20 `gh api` 复核）；每个网站括号注明实际内容，代码组件库单独标出；短文 / 清单的要点已转述进 [`reading-notes/`](./reading-notes/README.md)。

**去重规则：** pack 里已有的仓库 / 站点不再写描述，只留 `→ 已在` 指针；同一帖在报告里重复出现只保留一次；cursor.com、Claude Code、superset.sh、kitty 等非设计链接已删。

## 必看 Top 10

1. [@jakubkrehel · Interface Cheat Sheet](https://x.com/jakubkrehel/status/2100605819238621632) · 09-17 · 🔖1871 — [interfaces.dev/cheat-sheet](https://interfaces.dev/cheat-sheet)（UI / 动效 / 排版 / 色彩 / 无障碍 / 布局 / 文案约 60 条规则，每条配 demo）→ 要点 [`reading-notes/interface-cheat-sheet.md`](./reading-notes/interface-cheat-sheet.md)
2. [@jh3yy · 主线程的真实成本](https://x.com/jh3yy/status/2098382395426611397) · 09-11 · 🔖1029 — JS vs CSS 动画的差别是能感觉到的：[kciter.so](https://kciter.so/posts/the-expensive-main-thread/en)（长文 + demo：帧预算与 7 种主线程减负手段）→ 要点 [`reading-notes/expensive-main-thread.md`](./reading-notes/expensive-main-thread.md)
3. [@himanshubuildss · 40 个 UI / vibe coding 资源](https://x.com/himanshubuildss/status/2106411655055974640) · 10-03 · 🔖7913 — 本轮收藏最高，夹带作者推广；站点已拆进下方链接表
4. [@lennysan · 什么才算真护城河](https://x.com/lennysan/status/2110059109685113206) · 10-14 · 🔖1742 — 分发、执行、品牌都不算：[lennysnewsletter.com](https://www.lennysnewsletter.com/p/how-to-tell-if-a-startup-has-a-moat)（Dan Hockenmaier 客座长文，部分付费，只留注释）
5. [@jakubkrehel · /state-machine skill](https://x.com/jakubkrehel/status/2108217939556233615) · 10-08 · 🔖1247 — 用 mock 数据把组件全部状态铺一页；仓库 `jakubkrehel/skills`（8k）→ 已在 [`ui-patterns/interface-audit-refine-toolchain.md`](./ui-patterns/interface-audit-refine-toolchain.md)
6. [@shadcn · AI 会吃掉依赖](https://x.com/shadcn/status/2111075909318873228) · 10-16 · 🔖220 — 团队需要内部 open code registry，复用重心从代码转向知识
7. [@karrisaarinen · 质量是一种工作方式](https://x.com/karrisaarinen/status/2106877363648929912) · 10-05 · 🔖355 — 不是收尾冲刺；仓促发布的混乱靠更仓促的修补解决不了
8. [@uaghazadae · DESIGN-SKILL.md 开源](https://x.com/uaghazadae/status/2090525353940820049) · 08-21 · 🔖915 — Open Analytics 整套设计语言（色、squircle、7 种弹簧、12 个组件配方），MIT：[原帖](https://x.com/uaghazadae/status/2090381017437626784)
9. [@nurijanian · AI 设计 skill 清单](https://x.com/nurijanian/status/2105991447216541789) · 10-02 · 🔖289 — taste、layers、MengTo、hallmark + Refactoring UI 插件（≥5k 的仓库与站点见下表）
10. [@jakubkrehel · 设计工程看不见的那一面](https://x.com/jakubkrehel/status/2099514159826096310) · 09-14 · 🔖779 — [jakub.kr](https://jakub.kr/writing/the-invisible-side-of-design-engineering)（短文）→ 要点 [`reading-notes/invisible-design-engineering.md`](./reading-notes/invisible-design-engineering.md)

## 按主题（Top 10 之外）

**交互与动效**

- [@SubhanHQ · Motion Anime](https://x.com/SubhanHQ/status/2091159458693194045) · 🔖1809 — Amicro 弹簧微交互合集 → 已在 [`ui-patterns/amicro-motion-registry-intake.md`](./ui-patterns/amicro-motion-registry-intake.md)
- [@nilseller · 界面转 3D 场景](https://x.com/nilseller/status/2093007384465531068) · 🔖621 — 视频演示沉浸感技巧
- Rauno field notes（要点已收 [`reading-notes/rauno-field-notes.md`](./reading-notes/rauno-field-notes.md)）：[#3 海报探索](https://x.com/raunofreiberg/status/2091217083283526049)（[rauno.me/notes/3](https://rauno.me/notes/3)，图文笔记）· [#4 Feature Flags 表单重设计](https://x.com/raunofreiberg/status/2094514052156342497)（[notes/4](https://rauno.me/notes/4)，图文笔记）· [#5 侧栏卡片堆叠导航](https://x.com/raunofreiberg/status/2098476550635085917)（[notes/5](https://rauno.me/notes/5)，图文笔记）
- [@jakubkrehel · 过渡动画 4 原则](https://x.com/jakubkrehel/status/2094443593951797265) · 🔖237 — Interfaces 客座刊：[interfaces.dev](https://interfaces.dev/)（付费设计工程月刊，$7.99/月，只留注释）
- [@MarceloDesignX · 不用 3D 的 3D 感](https://x.com/MarceloDesignX/status/2110209514662400374) · 🔖202 — 层次、节奏和一点物理

**UI / 视觉**

- [@jakubkrehel · Loading](https://x.com/jakubkrehel/status/2102422222967095544) · 🔖1112 — [loading.dev](https://loading.dev/)（代码组件库：React 加载指示器，npm 安装）
- [@karrisaarinen · 品牌就是你是谁](https://x.com/karrisaarinen/status/2110233116841505210) · 🔖557 — [karrisaarinen.com](https://karrisaarinen.com/posts/brand-is-who-you-are/)（短文：品牌是你是谁和立场，logo / 网站 / 配色只是表达）
- [@jakubkrehel · Interfere 官网复盘](https://x.com/jakubkrehel/status/2103499210330943948) · 🔖430 — [interfere.com](https://interfere.com/blog/how-we-built-interferes-new-website)（长文复盘，只留注释）
- [@jakubkrehel · 文字在盾牌后面](https://x.com/jakubkrehel/status/2105687834904457455) · 🔖107 — 双标题叠放 + 模糊反向遮罩

**UX 与产品质量**

- [@karrisaarinen · 造的人不用自己的产品](https://x.com/karrisaarinen/status/2106224325896671401) · 🔖198 — 泡在 agent 终端里造，却不 dogfood
- [@raunofreiberg · 作品集链接挂了直接 pass](https://x.com/raunofreiberg/status/2112190931126378871) · 🔖41

**设计系统与组件**

- [@figma · 设计更贴近 CSS](https://x.com/figma/status/2106080919954313434) · 🔖191

**设计工程工具 / Skill**

- [@cathrynlavery · diagram-design 支持 3D](https://x.com/cathrynlavery/status/2107222360155701709) · 🔖1345 → 已在 [`decks/diagram-skills.md`](./decks/diagram-skills.md)
- [@MatthiasCordes · 图片转可 3D 旋转的低保真 SVG](https://x.com/MatthiasCordes/status/2107777347386556722) · 🔖323
- [@liangzhu_AI · 落地页复刻工作流](https://x.com/liangzhu_AI/status/2104361416778281345) · 🔖228 — [saaslandingpage.com](https://saaslandingpage.com)（SaaS 落地页截图库）；帖里的复刻 skill <5k star 已删；pack 内可测复刻走 [`sibling-routes.md`](./sibling-routes.md) 的 landing-page-replication-v5
- [@kongge_space · 中文万星 skill 整理](https://x.com/kongge_space/status/2108390858764763472) · 🔖218 — Stitch、Impeccable、UI UX Pro Max、官方 skills 等（仓库 ≥5k 的见下表）
- [@Ibelick · mesurer 加录屏](https://x.com/Ibelick/status/2105663400072159284) · 🔖182 — 给 PR / Slack 截交互

**PM 与产品思维**

- [@lennysan · Josh Woodward 访谈](https://x.com/lennysan/status/2109645848024064340) · 🔖894 — 爱上问题而不是产品
- [@lennysan · 护城河 KPI 基准](https://x.com/lennysan/status/2110426919737131506) · 🔖591 — [Google Drive PDF](https://drive.google.com/file/d/1GESyIdVW8vmpfYdyVR5anyiQYSBmwqMA/view)（Lenny Metric Benchmarking PDF，只留注释）
- [@karrisaarinen · Linear 招设计师看什么](https://x.com/karrisaarinen/status/2095752800110342475) · 🔖526 — 思考清晰度和体验质量，代码交给工程与 agent
- [@lennysan · 掌舵而非划桨](https://x.com/lennysan/status/2094444052204998908) · 🔖340 — ChatGPT Work 产品负责人：品味驱动方向
- [@clairevo · How I AI：PM 工作系统](https://x.com/clairevo/status/2094558546524561505) · 🔖284 — Claude Cowork + Notion：[YouTube](https://www.youtube.com/watch?v=p2qmX6TM0kw)（视频，只留注释）
- [@shreyas · 中年产品人两个错误假设](https://x.com/shreyas/status/2106381918564737309) · 🔖187
- [@shreyas · AI 让产品能力退化](https://x.com/shreyas/status/2098601630610677953) · 🔖94 — 堆答案和原型却跳过思考

**资源合集帖**（站点已并入下方链接表）

- [@himanshubuildss · 20 个 UI 资源](https://x.com/himanshubuildss/status/2104305030115594419) · 🔖2625
- [@HeyDetya · 7 个 UI + vibecoding 资源](https://x.com/HeyDetya/status/2104953127623647730) · 🔖1931
- [@csaba_kissi · 组件 / 截图库](https://x.com/csaba_kissi/status/2097206925264118197) · 🔖748
- [@pamelaaaaa1218 · 60+ 抄 UI 网站](https://x.com/pamelaaaaa1218/status/2111490939604681059)（[X 文章](https://x.com/i/article/2111414319611011072)）· [@shao__meng · UI/UX 资源地图](https://x.com/shao__meng/status/2092437485234352327)（[X 文章](https://x.com/i/article/2092434550265942016)）· [@joulee · 灵感收藏](https://x.com/joulee/status/2100689577271083171)（[X 文章](https://x.com/i/article/2100347803243630592)）— X 文章正文链接接口读不到
- [@ImranUxi · 6 个 UI 资源](https://x.com/ImranUxi/status/2104454212776255841) · [@LgyLight · 落地页高级感 4 招](https://x.com/LgyLight/status/2095809430608908623)

## GitHub 仓库（≥5k star）

星数 `gh api`，2026-10-20。

| 仓库 | ⭐ | 许可证 | 简介 |
|---|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) | 182k | 无 | （Anthropic 官方 skill 合集，含 frontend-design 前端设计 skill） |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 138k | MIT | （按产品行业推荐风格、色板、字体组合和 UX 规则的设计智能 skill） |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 55.6k | MIT | （营销类 skill：CRO、A/B 测试、分析、SEO 审计、产品营销） |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | 47.7k | MIT | （Emil Kowalski 的设计工程 skill，偏动效与界面手感） |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 32.7k | 无 | （Vercel 官方 skill，含 React 最佳实践与 web-design-guidelines 审查） |
| [openai/skills](https://github.com/openai/skills) | 28.2k | 无 | （Codex 官方 skill 目录，含 Figma 生成 / 落地设计 skill） |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | 8.5k | Apache-2.0 | （配合 Google Stitch MCP 生成界面设计的 skill） |
| [MengTo/Skills](https://github.com/MengTo/Skills) | 6.8k | MIT | （Meng To 给设计师和构建者的 agent skill 合集；pack 只收了他的 threeui，见 [`ui-patterns/threeui-hero-adapter.md`](./ui-patterns/threeui-hero-adapter.md)） |

已有，不重复：`pbakaus/impeccable`（83k，让 AI 更会做设计的打磨 skill）**Liz 已有** · `jakubkrehel/skills`（8k，界面审计与修复 skill）→ [`ui-patterns/interface-audit-refine-toolchain.md`](./ui-patterns/interface-audit-refine-toolchain.md) · `cathrynlavery/diagram-design`（58k，编辑风格 HTML/SVG 图表 skill）→ [`decks/diagram-skills.md`](./decks/diagram-skills.md)

## 网站（去重）

已有，不重复：mobbin.com、godly.website、land-book.com、minimal.gallery、inspora.design、footer.design、awwwards（降权）→ [`inspiration-sources.md`](./inspiration-sources.md)；ui.shadcn.com → [`ui-patterns/ai-workspace-surfaces.md`](./ui-patterns/ai-workspace-surfaces.md)；Magic UI / Aceternity（动效香料层）→ [`ui-stack-decision.md`](./ui-stack-decision.md)；amicro → [`ui-patterns/amicro-motion-registry-intake.md`](./ui-patterns/amicro-motion-registry-intake.md)；Hallmark → [`on-brand-ai-generation-craft.md`](./on-brand-ai-generation-craft.md)。文章类站点（interfaces.dev、kciter、jakub.kr、rauno.me、karrisaarinen、interfere、Lenny）见上方帖子行。

**代码组件库（可复制 / 可安装代码）**

- [21st.dev](https://21st.dev)（代码组件库：12,000+ React+Tailwind 组件、模板和 shadcn 主题，一条命令安装，面向 AI agent）
- [uiverse.io](https://uiverse.io)（代码组件库：社区做的 CSS / Tailwind UI 元素，免费复制）
- [motion-primitives.com](https://motion-primitives.com)（代码组件库：React+Tailwind 开源动效 UI kit）
- [smoothui.dev](https://smoothui.dev)（代码组件库：Motion 动效 React 组件，兼容 shadcn/ui）
- [shadcnblocks.com](https://shadcnblocks.com)（代码组件库：shadcn/ui 区块与组件，付费为主）
- [microkit.co](https://microkit.co)（代码组件库：50 个 React / CSS / Tailwind 微交互，复制粘贴，MIT）
- [mapcn.dev](https://mapcn.dev)（代码组件库：MapLibre GL 地图组件，Tailwind，兼容 shadcn/ui）
- [evilcharts.com](https://evilcharts.com)（代码组件库：Recharts / ECharts 动画图表，shadcn/ui，复制粘贴）
- [bencho.dev](https://bencho.dev)（代码组件库：可交互 React UI 区块与微交互）
- [rewampui.com](https://rewampui.com)（代码组件库：免费组件与落地页展示）
- [uiable.com](https://uiable.com)（代码组件库：完整 shadcn 设计系统，组件 / 区块 / 模板 / dashboard）
- [kinetics.colorion.co](https://kinetics.colorion.co)（代码组件库：162 个 CSS 动画 + 99 个 React spring 示例 + AI prompt，可复制）
- [text-effects.colorion.co](https://text-effects.colorion.co)（代码组件库：117 个纯 CSS 文字特效，可复制）
- [glass.samasante.com](https://glass.samasante.com)（代码库：liquid-glass，折射真实 DOM 的玻璃效果，跨浏览器）
- [vibeprompts.dev](https://vibeprompts.dev)（UI 布局 prompt + 可直接粘贴的 Tailwind 片段）

**动画 / 3D / shader 工具与教程**

- [animejs.com](https://animejs.com)（JS 动画引擎库）
- [theatrejs.com](https://theatrejs.com)（带可视化编辑器的 Web 动画工具箱）
- [threejs.org](https://threejs.org)（Three.js 3D 库）
- [threejs-journey.com](https://threejs-journey.com)（付费 Three.js / WebGL 视频课，87 课 116 小时，只留注释）
- [thebookofshaders.com](https://thebookofshaders.com)（片元 shader 入门书，免费在线，长篇只留注释）
- [shadertoy.com](https://shadertoy.com)（shader 社区作品与源码；抓取被 Cloudflare 拦截，按已知内容注）
- [spline.design](https://spline.design)（浏览器 3D 设计工具，可协作导出交互 3D）
- [unicorn.studio](https://unicorn.studio)（无代码 WebGL 交互图形 / 背景效果编辑器）
- [3dicons.co](https://3dicons.co)（1,440+ 开源免费 3D 图标，无需署名）
- [kitbitz.art](https://kitbitz.art)（2,000+ 手绘插画，SVG / PNG / Figma，CC0）

**灵感 / 案例库**

- [styles.refero.design](https://styles.refero.design)（真实网站风格库，附 AI 可读的 DESIGN.md：截图、色彩、字体、间距）
- [kage.design](https://kage.design)（真实产品界面库，可把设计转成给 Claude Code / Codex / Cursor 的 prompt）
- [saaslandingpage.com](https://saaslandingpage.com)（SaaS 落地页截图库）
- [landing.love](https://landing.love)（动效网站整页录屏灵感）
- [component.gallery](https://component.gallery)（各大设计系统的组件实例对照参考）
- [navbar.gallery](https://navbar.gallery)（导航栏设计灵感）
- [cta.gallery](https://cta.gallery)（CTA 设计灵感）
- [pricingpages.design](https://pricingpages.design)（定价页设计画廊）
- [supahero.io](https://supahero.io)（Hero 区设计库）
- [bentogrids.com](https://bentogrids.com)（Bento 网格设计合集）
- [appshot.gallery](https://www.appshot.gallery)（App Store 截图 / ASO 灵感）
- [hoverstat.es](https://hoverstat.es)（另类 / 实验性网页设计展示）

**AI 设计 skill / 工具**

- [tasteskill.dev](https://tasteskill.dev)（开源 skill 文件，压 AI 生成前端的同质化）
- [layers.jamiemill.com](https://layers.jamiemill.com)（给产品设计师的 AI skill，按产品设计七层引导）
- [prodmgmt.world/resources](https://prodmgmt.world/resources)（PM 资源索引：免费 prompt、PM skill 目录、Claude Code / Cursor 指南）
- [designmd.ai](https://designmd.ai)（社区 DESIGN.md 设计系统文件库，给 AI 编码工具读）
- [open-design.ai](https://open-design.ai)（开源 vibe design 工作区，Claude Design 替代，用自带 coding agent 做原型 / 落地页 / 幻灯片）
- [neuform.ai](https://neuform.ai)（prompt 生成 HTML 落地页，可导出 DESIGN.md）
- [scrolltide.co](https://scrolltide.co)（滚动驱动网站模板 + AI prompt 库，营销味重）
- [v0.dev](https://v0.dev)（Vercel 的 AI 全栈应用生成）
- [lovable.dev](https://lovable.dev)（AI 应用生成器；抓取被 Cloudflare 拦截，按已知内容注）
