---
name: b2b-brochure-sites
description: >-
  严肃 B2B 宣传册/企业官网的通用模式库，14 站基准蒸馏。Use when 设计或审计
  工业/能源/工程/防务/制造类企业形象站（brochure site）；需要字体策略、配色、
  IA/导航、hero、信任构建组件、产品规格呈现、动效纪律、CTA 漏斗、footer 的
  基准决策。不适用：SaaS 产品内 UI、叙事长 landing（走 premium-one-pager 线）、
  电商/内容门户。
---

# B2B 宣传册站通用模式（14 站证据蒸馏）

严肃 B2B 企业形象站（brochure site）的可迁移模式目录。源出 CFE 项目两轮基准拆解，原始证据在 `cfe-app/docs/redesign-2026-11-03/` 下 `benchmark-sites.md`（R1 八站）、`benchmark-sites-r2-energy.md`（R2 能源四站）、`benchmark-sites-r2-autonomy.md`（R2 自主系统两站）；本文已脱域，只留通用原则，不含任何站点的字体文件、照片、文案、标识等专有资产。

证据池（来源标注用简称）：stripe · cloudflare(CF) · vercel · linear · anduril · bakerhughes(BH) · subsea7(S7) · technipfmc(TFMC) · slb · akersolutions(aker) · orsted · halliburton(HAL) · shieldai · saronic。

## 流程（何时跑、按序做什么、终点怎么判）

1. **先定三个约束**（决定后面每一步的取值）：
   - 品牌资本：新品牌（必须自我解释）还是成名品牌（可以只宣示）？
   - 转化目标：询盘/销售驱动（CTA 常驻、密度高）还是内容/雇主品牌驱动？
   - 业务域数量：<6 域用扁平 nav；多业务巨头才上 mega menu。
2. **按机制依据逐层决策**：字体 → 配色/token → IA/导航 → hero → 信任组件 → 产品/规格页 → CTA 漏斗 → footer → 动效预算。每条决策标注证据站，便于回查取舍。
3. **终点判定**：对照文末「边界」清单逐条过；关键数字（对比度、字号档、动效时长）用 computed style 实测验收，不靠目测。

## 机制依据（按层平铺的模式目录）

### 字体策略

- **按角色核字体，不从“单族”倒推方案**：旧版“14/14 单族、无配对”不成立。Anduril = Helvetica Now Display 主排版 + Elios 辅助件；Saronic = Suisse Int'l + Suisse Int'l Mono（连首页 H1、移动规格值也用 Mono）。具体 PS、static 文件、weight 映射与桌面/390 量尺见 [两站实测 DNA](./anduril-saronic-dna.md)。这也不是所有项目永远只能两族的限制。
- **商业字体与自研字体是重要来源**；原站可下载不等于可再分发。原版未取得合法授权时先写缺口，不凭“免费/相似”擅自替代，不自动落到 Inter/Poppins；消费项目先读 canonical DESIGN.md，候选不生效。
- **部分能源站 hero 用极细字重大字号**：slb h1 字重 150、HAL 300 细白字压全幅工业摄影；Anduril 产品标题却是 700，Saronic display 是 400。细字重 + 实拍是一种配方，不是工业站通则。
- **等宽字体可做展示层识别**：shieldai 把 mono 直接当标题字（军用电传质感），saronic 用 mono 做 kicker/标签/按钮——HUD/制图气质一条线。

### 配色与 token

- **中性表面 + 克制强调是可选配方，不是已测面积比例**：stripe 紫 #635bff、CF 橙、linear 紫蓝、anduril 酸绿 #dff140、slb 蓝 #0014DC、HAL 红 #c00、aker 深蓝 #081e32、shieldai 珊瑚橙 #ff6343、saronic 声纳绿 #acff24。旧版“13/14、≥90%面积、一个色承担全部引导”没有像素面积证据；Saronic 另声明 beacon #fb6b3c，且亮公告条/浅底主题会大面积换色。两站原值/用途/对比缺口见 DNA §3。
- 三色组可以成立但必须 CSS var 严格管理（orsted 茄紫+珊瑚红+黄）；暖色非蓝组在严肃工业站有辨识度先例。
- **灰阶做成 4–6+ 级数字色带**：HAL 五级灰、vercel 100–1000 十级；token 命名即文档。进阶玩法是域内隐喻命名（saronic midnight/sunlight/sonar/beacon）。
- 强调色文字用途要实测 AA：亮品牌色常过不了 4.5:1，需要加深一档做文字/链接专用色。
- 深色区块可用近黑与纸面形成差异；这是迁移建议而非原站通则（Anduril body 实际 #000，内容块 #010101）。

### IA / 导航

- **扁平 5–7 项 + 右侧询盘主钮**是询盘驱动小站的可选形（stripe/linear）；Saronic 实际是 Careers/MENU 工具栏 + 卡片 overlay，不应当作此形证据。mega menu 在多业务巨头（BH/S7/HAL）常见。
- **能力目录映射客户作业流程，不映射公司部门墙**：HAL 按井生命周期（Subsurface→Well Construction→…→Abandonment）、slb 按四大支柱、orsted 按能源类型+国家分组。taxonomy 对齐买家脑子里的工作流。
- **utility 排收低频入口**：Careers / Investors / 语言 / Support / Store / Training 进顶栏次级排或 footer（BH/S7/slb）。
- 集团/多主体/多区域站用 "All sites" 式实体切换（orsted 分站联邦制），也是主体归属标注的结构性解法。
- 菜单项带一句说明是大站惯例（BH mega menu、saronic 覆盖式菜单），帮助陌生访客判断去向。

### Hero 模式

- **声明式短 H1 ≤10 词**，主语是客户或行业而非公司自己："Financial infrastructure to grow your revenue"/"Agentic Infrastructure"/"Build without boundaries"（stripe/vercel/CF）。
- **新品牌应自我解释**；不能把知名品牌的理解成本照搬。Anduril 首页 R3 标题未水合，不足以证明真实用户看不到标题；对其可理解性的第三方评价也不是渲染事实。
- **"宣言 kicker + 解释副题"**解决宣示 vs 解释矛盾：mono kicker 放宣言，副题放一句大白话定位，再双 CTA（saronic 首页范本）。
- **产品片 hero**：每屏 = 产品名巨标（48→100px）+ 一句电影 slogan + Learn More + 专属 MP4/poster；slogan 讲收益隐喻不讲参数（shieldai）。
- **影像预算分级**：有素材才上视频 hero（桌面/移动双版本 + poster 兜底）；没有就用"实拍大图 + 深色渐变遮罩 + mono 标签"的静态版，质感损失可控。
- 直角（0–2px）+ 极细字重 + 全幅工业摄影 = 重工"机加工感"配方（slb/HAL）；圆角派（6–8px）是 SaaS 侧惯例——二选一贯穿，不混。

### 信任构建组件

- **case-wall 量化案例标题墙**：`<技术/产品名> <结果动词> <量化结果>` 标题 + 客户名（可匿名化为 "Norwegian Operator"）+ 地域/工况 chip——工业 B2B 信任的核心单元（slb 产品页主体即此）。
- **stat-band 数字信任带**：4–6 格大数字 + 小标签横排；上市公司嵌实时股价（aker/orsted），私企嵌产能/交付量/员工数/在执行项目数。
- **具名背书长在新闻流里**：合同类型（FEED/frame agreement）+ 客户名（Equinor/bp/Shell）本身就是资质证明；logo wall 的工业形态是中标新闻卡（aker/slb）。
- **portfolio-row 结构化项目组合**：地区/类型分组，每行 = 项目名 + 规格 chip（MW/水深/吨位/管径）；详情页副题把工程指标翻译成人话（"Powering 1.4 million homes"）（orsted）。
- **announcement ticker 证据条**：强调色满幅 + mono 字的合同/资质/里程碑播报条（saronic）；替代 testimonial 引用块。
- **photo-credit 真项目署名**："Photo: <真实项目名>" 小字——零成本透明度信号（aker）。
- **content-gate 技术资料门控**：注册/申请换技术论文、SDS、规格书——B2B 获客标准件（slb Premium Content、HAL Resource center）。
- **里程碑时间轴**："First Flight 2026. Production 2029." + 测试节点——"不是概念，正在建造"的进度证据（shieldai）。
- **value-strip 价值观格**：icon + 单词四格（Collaboration/Safety/Reliability/Creativity），首页轻量价值观位（HAL）。
- **使命宣言带**：一句 mission 在页间复现当分隔符（shieldai）；口号进 footer（aker）。

### 产品 / 规格呈现

- **benefit-led H1**：产品页标题写客户收益（"Reach deepwater reservoirs safely"）而非产品名；品类名退到副题或目录层（HAL）。折衷形：品类名 H1 + 结果导向副题（slb）。
- **规格极简纪律**：每卡 3–6 项封顶、大数值优先、mono 微标、限定词后置（"5,400 nm → Base Load"）；规格是"大数字单元格"不是表格（saronic）；裸列表 4–6 行同样成立（shieldai）。
- **产品页固定骨架**（shieldai 范式）：宣言句 → 影像 → 收益叙事（讲客户任务困境而非自夸）→ 规格 → "Powered by X" 底层能力带（软件/工艺/质控体系）→ 进度证据 → 询盘 CTA。
- **HUD/制图微观件**一套气质可整组借：方括号模板字 `[TAG]`、工程编号特性块 `H/ 001`、取景框按钮、`1 / 3` 编号轮播、坐标读数（shieldai/saronic）。
- **expert-cta 分学科专家联系卡**：页尾 "Talk to a <discipline> expert" + 预填学科字段，意图比通用 Contact 准（HAL）。
- 能力页 stub 是反例：一句话指向合资方的薄页不如不建（aker subsea 页）。

### CTA 漏斗

- **双轨制全站一致**：自助/内容轨（Start now / Capabilities / Learn more）+ 销售/询盘轨（Contact sales / Request a quote）（stripe/CF/linear/BH 的 Explore+Contact Us 同构）。
- **询盘驱动站：主询盘钮常驻 header 深色实底**；把 Contact 藏进菜单只对不缺询盘的品牌成立（saronic 反例——不是丑，是不适用）。
- 三级漏斗：产品轨 Learn More → 询盘轨 → 招聘轨；招聘并列只在"抢人是第二业务目标"时成立（shieldai/saronic），否则收进 footer。
- 次轨可用内容门控承接："Request document" / 注册换资料，与 RFQ 主轨分工（slb）。

### Footer 模式

- **工具箱不是展区**（14/14）：分栏链接矩阵 + utility 链接（Careers/Investors/语言/SDS/fast facts/whistleblower/分站切换）。
- 产品索引可进 footer 首列，次列放公司/法务（shieldai）。
- 使命句或口号进 footer 收尾（aker、shieldai）。
- 极简 footer 也成立（orsted：联系/社媒/法务 + All sites），但 utility 链接必须有位。

### 动效纪律

- **微交互可从 0.15–0.6s 选起**：ease-out / `cubic-bezier(.25,1,.5,1)` / `(.16,1,.3,1)` / `(.4,0,.2,1)`；这是消费配方，不是全站实测上限。
- **揭示单独记角色**：Saronic PageTitle 1s、首页 H1 1.2s + .3s delay，Anduril 标题 span 还实测到 1.5s；不能说“只有影像可超 .6s”。详见 DNA §4；消费项目仍按自身动效合同。
- HUD 美学可选件：marquee 12s+ 无限滚动、blink 光标（shieldai）——同一页面克制使用。
- 默认复用原生滚动；Anduril 可确认有 Lenis，但依赖存在不等于已证明 scroll-jacking。

### 叙事模式（工业/双用途类专用）

- **转型叙事三种摆法**：支柱并列（传统业务 ∥ 转型支柱，slb）/ 公司级使命宣言（aker）/ 退到次级位（HAL）。没有真实转型业务就不要硬造支柱。
- **人本/双用途话术**：protect people、"go where people shouldn't have to"、"Dual Use by Design" 直接做成板块标题 + 真实任务证据（saronic/shieldai）；杀伤性/强卖点让位给"保护人"框架。
- **产能即产品**：船厂/工厂单列为叙事对象（saronic Port Alpha、anduril Arsenal）；制造业可降级为"车间实景+工艺"版块。
- **AI 助手已是巨头标配**：HAL chat widget、slb webchat + agentic 产品——前置 AI 问答不激进；但工业站的 AI 话术要有"不承诺参数、引导正式询盘"的边界设计。

## 边界（硬性 guardrail，正面措辞）

- H1 自我解释；只宣示不解释仅限有知名度资本的品牌。
- 首屏是产品/能力叙事，不是公告流；"新闻即首页"只对确有持续中标节奏的上市公司有效。
- 询盘 CTA 常驻可达（header 主钮 + 页尾专家 CTA），不藏菜单。
- 动效只动 opacity/transform；时长守住 0.15–0.6s（影像揭示除外）；禁 scroll-jacking、视差瀑布、字距动画。
- 能力页不做 stub：少于一段实质内容宁可不建该页。
- 字体按实际角色和项目合同分工，不设“一族到底”通则；圆角形成明确体系，允许有理由的按钮/卡片差异，不机械二选一。
- 小站不做首访 geo-gate 弹层；多主体切换放 footer/顶栏 utility 位。
- 只迁移原则、结构和必要测量证据：不复制来源站的字体二进制、摄影、视频、slogan、文案、logo、成套HTML/JS；原始 HEX 可作为研究事实保存，但不自动批准整套品牌组合用于消费项目。
- 规格与承诺分层： brochure 层呈现"已证实的数字"（交付量/项目数/认证），不做参数承诺——承诺走正式询盘流程。
