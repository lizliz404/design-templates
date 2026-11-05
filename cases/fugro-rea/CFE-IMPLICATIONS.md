# Fugro → CFE 可落地差异点（对照 DESIGN.md 现状）

> 前提：Fugro 与 CFE **同赛道**（海工/勘察/海上风电服务），但体量是上市巨头 vs 询盘型制造商。Fugro 站的价值不在"酷"而在**企业级内容纪律**——它证明了一个 1162 URL 的 B2B 站可以靠组件库 + 排版纪律 + 真人 CTA 做出高级感，动效只需 framer-motion viewport 进场 + CSS 过渡（无 GSAP/滚动叙事栈）。下面只列可借鉴的工程做法。证据见 `TEARDOWN.md` 同编号节。

## 直接可学（机制级，不动现有决策）

1. **"Jump to" 锚点目录条**（§5/§6.2）：Fugro 把每个长页做成"sticky 目录条 + 锚点书签"——`position:sticky; top:0` 白底 + 1px 底边，左 "Jump to" 标签 + section 项 + **右端一个橙色情境 CTA**（行业页挂 Contact、locations 挂 Map view）。CFE 的长页（能力/产品详情/案例）可直接抄这个模式：成本是一个 sticky bar + scrollIntoView + scrollspy，收益是长页导航性和"常驻转化位"。CTA 换钢蓝。
2. **左 label 右正文的双栏编辑节奏**（§5）：intro/metaIntro = 左栏小标（"Our view on energy"）+ 右栏 50-65ch 段落，全站长文页通用。CFE 正文页（关于/能力/案例）同款节奏已隐约有，按这个左右比（≈1:2）统一即可。
3. **Challenge→Solution→Outcome + Key Metrics 案例骨架**（§6.3）：Fugro 案例页固定章法 = meta 轨（日期/地点）→ lede → lifeCycle 编号手风琴（01-04 阶段+Show more）→ C/S/O 章节 + 客户引文（h2 巨段）→ **Key Metrics 数字卡**（"18 Borings / 9 SCPTs"，number+title+prefix/suffix）→ "Expertise applied" 交叉链。CFE 若做项目案例，这套是完全可复用的内容 schema——尤其 Key Metrics 只放真数字，天然合规"不伪造参数"。
4. **真人专家名片当 CTA**（§6.3）：每页末尾不是抽象表单而是"照片+姓名+职务+Contact {Name}"名片，点钮开 Marketo 弹层。CFE 询盘转化的可信做法：**具名对接人 > 匿名表单**。CFE 若没人可挂，可降级为"具名业务线 + 部门名"（如 "Sales — Marine Engineering"），但结构可抄。
5. **number+title 的 Key Metrics 数据卡**（§6.3）：极简语义件（大数字 Review + 小标题 Aktiv），证明"数据卡"不需要图表库。CFE 产能/交付/规格数字可同款直排。
6. **发丝线列表行**（§6.3 pageLinkList）：`border-bottom:1px #c5ccd5` 分隔的"标题+一句描述+Read more→"行式列表，承载 expertise/locations 20+ 条。CFE 产品目录/下载列表若不想做卡阵，这个行式版式更轻。
7. **正文 sentence case 纪律**（§3.2）：Fugro 全站零全大写标签、kicker 也是句子大小写——证明"工业站权威感"可以不靠 uppercase+mono，靠字族/字阶/留白纪律。对 CFE 的视觉减法目标是加分证据。
8. **实时数据卡**（§6.3 sharePriceCard）：把"活的第三方数据"（股价）做成 masonry 卡阵里的一张普通卡。CFE 若有可信实时数据源（如认证有效期/产线状态），同款机制，没有就别造。
9. **页级 CMS 底色变量**（§4/§6.1）：每页可配 backgroundColor/textColor → 案例页浅蓝、新闻页米沙，同组件不同皮肤。CFE 若做产品线分色，这个"页面级 token 覆写"模式（而非组件级）是对的粒度。
10. **llms.txt + sitemap 分片 + 职位 vacancies.xml**（§1）：Fugro 已上线 llms.txt（全站导航 markdown 喂 LLM）+ 独立职位 sitemap。CFE GEO 基线可直接抄这个结构。

## 学了要改（机制可用，语义要换）

11. **Photo hero + 宣言式 H1**：Fugro hero = 现场工地照 + "Creating a safe and liveable world"巨标 + 右下使命句。形式可抄（满幅照+scrim+左下巨标），但 CFE 的 H1 按已生效决策保持 ≤10 词自解释（"Marine engineering components for X"），不学纯宣言——Fugro 有 60 年品牌认知兜底，CFE 没有。
12. **双族分职**：Review = 全站基底字族（body 默认）+ 展示巨标/中大标题，Aktiv = CMS 正文与 UI 控件层——比"display/UI 两族"更省一层：默认态就是品牌字，正文再换功能字。与 CFE "Manrope 主 + Geist Mono 标签"同构。注意 Fugro **零 mono**——若 CFE 想进一步简化，mono 档收敛到单一 caption 用法即可，不必全站铺开。
13. **2px radius 一把尺**：全站按钮/输入/卡/对话框全 0.2rem。支持 CFE 0–4px 上限判断，Fugro 证明 2px 单一值足够成立。
14. **单 accent 纪律**：Fugro 比 Saronic 更极端——只有一个橙 #FF3300 管所有 CTA/链接箭头/锚点当前态。CFE 钢蓝唯一 accent 的决策被再次验证；学其用法分布（CTA 实底 + 箭头链 + 状态下划线三处），别扩面。
15. **scrim 语法**：顶 22.4rem 黑→透明 + 底 50% →黑 .7 —— 比 Saronic 的纯色渐落简单，photo hero 通用件。CFE hero 照可参考此上下双带比例。
16. **国家/语言内容变体**（careers `countrySpecificContent`）：同页挂多版本内容按地区呈现。CFE 若有国内/海外双市场叙事，这个"一页多变体"比独立分站便宜；但基础设施（geo 判定）有成本，优先级低。
17. **Marketo/Beamery 式表单弹层**：Fugro 的转化表单都是第三方嵌入弹层。CFE 若上询盘表单，学的是"触发点贴内容"（专家卡/页尾），不是学引 Marketo——自有轻表单即可。

## 明确不学（与 CFE 约束冲突或体量不配）

- **styled-components + 全 JS 化样式**：CFE 静态站不走 CSS-in-JS；CSSOM 注入也无法被外联缓存。
- **Storyblok/CMS 块架构**：体量不配，CFE 无需 1162 页内容工厂。
- **同意前加载营销栈**（GTM/VWO/Autopilot 等在 consent 前已发请求）：反面案例，CFE 别学。
- **锚点用 `<button>` 不用锚链**：a11y 瑕疵（无目的地语义），CFE 抄 Jump-to 时用 `<a href="#x">`。
- **引文当 h2**：语义怪，CFE 引文用 `<blockquote>`+视觉巨字即可。
- **Vimeo/Mapbox/Q4 等重三方嵌入**：按需，CFE 现阶段没有对应资产/数据源。
- **hamburger-only 移动菜单其实是平铺 nav 的降级**：Fugro 桌面平铺 + 移动全屏大字菜单的结构是对的，但 CFE 移动菜单需要带 RFQ 常驻（Fugro 菜单里没有 CTA 层级区分，Get in touch 只是最后一项）。

## 对 DESIGN.md 的具体补充建议（供 Liz 终审）

| 项 | 建议 | 证据 |
|---|---|---|
| §4.x 长页导航 | 增"sticky Jump-to 条 + 右端 RFQ 钮"标准件（CFE 长页统一配） | §5/§6.2，energy.png/locations.png |
| §6.x 案例 schema | 定案例页章法：meta 轨 + lede + C/S/O + Key Metrics + 交叉链；可选项加 lifeCycle 阶段手风琴 | §6.3，case-study.png |
| §4.3 询盘面 | 页尾"具名联系人卡"件：照片+姓名+职务+Contact 钮；无真人可挂时用具名部门卡降级 | §6.3 contact.png |
| §3 字族 | Fugro 双族分职（display 族管巨标 / UI 族管功能）与零 mono 的成立，佐证 CFE Manrope+Geist Mono 收敛 | §3.1/§3.2 |
| §4.2 表面 | radius 2px 单值成立（Fugro 全站实测）；accent 单一色三用法（实底/箭头/下划线） | §4/§6.4 |
| §5 hero | photo hero scrim 参考 Fugro 上下双带（顶 22.4rem + 底 50% .7 黑）；eyebrow 用小写句子式 | §6.1 |
| §7 SEO/GEO | 上线 llms.txt（Fugro 实物可参照结构）；案例/产品页 taxonomy 多维标签（Region/Industry/Expertise/LifeCycleStage）支撑筛选器 | §1/§2.3 |
| §6 列表件 | 重列表用 pageLinkList 行式（发丝线+Read more）替代卡阵，下载/职位/办公点列表适用 | §6.3 |
| 反面 | 同意前不加载营销/分析脚本（Fugro 在此实测破功） | §9 |
