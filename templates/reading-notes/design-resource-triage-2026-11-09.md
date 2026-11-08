---
name: design-resource-triage-2026-11-09
description: >-
  三条 X 设计资源清单的去重核验回执。Use when 判断这些来源是否值得加入选型; 需要查已有、暂缓与排除原因而不是再开一轮同质画廊。
---

# 三张长清单，只提升五个任务入口

核验日期：**2026-11-09，Asia/Shanghai**。24 个唯一目的地（含 Modulify 首页与 templates 两条不同路径）：**新增 2、已有 7、暂缓 8、排除 7**。已有的 7 个中，Navbar / CTA / Refero 补具体例子与使用边界，其余 4 个不重复收录。新增来源只在 [inspiration-sources](../inspiration-sources.md) 的任务路由里出现，不造第二套库。

## 来源与证据强度

- [@mr_mofun](https://x.com/mr_mofun/status/2119128837267378509)、[@amananimates](https://x.com/amananimates/status/2119127905666314632)、[@BardhylBytyqi](https://x.com/BardhylBytyqi/status/2118838961602748834)。前两帖高度重复；第三帖编号跳过 19，不能照标题/编号计算唯一资源数。
- 上游帖资料显示 @amananimates 是 Scrolltide co-founder，@BardhylBytyqi 在做 Modulify；存在直接推广动机。名单、用户数、目录数量、免费与“production-ready”措辞不构成质量证据。
- 本轮读取全部 24 个官方目的地的公开页面文本；强候选另读具体实例或 LICENSE。`on.design` 提取为空，公开 curl 再试遇 TLS EOF，标未核实而非失效。页面提取可能来自服务商缓存，价格/目录以后须重核。
- 未观看这些清单帖的附带视频，未实际安装、购买、登录、导出或测试组件。页面自称支持 a11y 不等于项目已验收；截图/视频存在也不意味着源码公开或素材获授权。

## 真正提升的入口（2 新 + 3 已有增强）

1. **60fps：先查行为，不先选皮肤。** [Runmo 距离轮详情](https://60fps.design/shots/runmo-drag-to-adjust-distance-wheel-interaction) 有具体的 scrub / 数值更新 / Done 语义描述和交互标签，比泛网页瀑布更适合查微交互先例。本轮读的是详情文本，不声称实看该视频。[PRO 页](https://60fps.design/pro) 把完整筛选、storyboards、snippets 等列为付费能力；公开部分是参考，不是可随意复制的源工程。
2. **beUI：只增加一个可审读的 React 实现候选。** [Tabs 页面](https://beui.dev/components/motion/tabs) 公开 preview 与实现，能看到 `motion/react`、`useReducedMotion`、选中轨测量和 tab-stop 注册逻辑；[仓库 MIT LICENSE](https://github.com/starc007/ui-components/blob/main/LICENSE) 已读，版权为 2026 Saurabh Chauhan。它比只卖截图多了工程证据，但本轮不是完整可访问性审计。依赖 React、Motion、Lucide、本地 ease/utils；保留版权许可，消费时 pin 对应 commit，免费 repo 许可不要扩大到独立 Pro 产品。不为一个 Tabs 替换现有稳健组件。
3. **Refero Styles（已有）：给 agent 的候选合同。** [公开 style 详情](https://styles.refero.design/style/a73148b9-449b-42cd-9f38-86ef694f500e) 真有 palette、type、spacing、Do/Don't 和 Markdown，不只首页广告；页面同时明写 source measurements normalized、roles/recommendations interpreted、HTML reconstructed。可作为待核候选，不是原品牌发布的 design system，也不授予 SF Pro 等字体的使用权。
4. **Navbar Gallery（已有）：按导航任务找反例/先例。** [Cloudflare mega-menu 条目](https://navbar.gallery/navbar/cloudflare) 确有导航类型与原站入口；用来缩小调研范围，hover 通道、focus、移动菜单要回原站测。不能把截图当组件行为保证。
5. **CTA Gallery（已有）：比较相同任务的桌面/移动上下文。** [Tines 条目](https://cta.gallery/cta/tines) 有 Desktop / Mobile 与 Pricing/Subscription、AI、Light 分类。用于 CTA 构图与文案位置，不支持“这样就转化更高”的结论；页面带模板广告，不等于资源本身全免费。

## 逐项回执（只作研究凭证，不是推荐清单）

| 目的地 / 本次可见证据 | 决定 | 增量与边界 |
|---|---|---|
| [scrolltide.co](https://scrolltide.co) · 模板、组件、shader 与 AI prompt 目录 | 暂缓 | 已在 X reading list；营销/长页效果多，没核具体模板代码与许可，不升级为默认工具 |
| [navbar.gallery](https://navbar.gallery) · 类型筛选、Cloudflare 详情 | 已有→增强 | 从旧书签提升到导航任务路由；灵感而非源码 |
| [footer.design](https://footer.design) · footer 分类与条目 | 已有 | inspiration-sources 与 footer-craft 已覆盖，无新增 |
| [cta.gallery](https://cta.gallery) · Tines 桌面/移动详情 | 已有→增强 | 具体任务路由；不借转化率宣传下结论 |
| [styles.refero.design](https://styles.refero.design) · 实际 DESIGN.md 详情 | 已有→增强 | AI 样式合同候选；原测量/解释/重建有区别 |
| [scrollshaders.com](https://scrollshaders.com) · WebGL、React/HTML/MP4 与商业订阅/一次性方案 | 暂缓 | paper-shaders 与现有背景交付规则已覆盖大部分用途；没验具体 shader、GPU/移动表现及完整许可，不为广告另起运行库 |
| [modulify.ai](https://modulify.ai) · 生成/托管网站或 app 的供应商 | 排除 | 不是 pack 缺失的设计资产；没证明胜过现有工作流，推广帖不等于选型 |
| [landdding.com](https://landdding.com) · 多平台 landing/template 画廊 | 排除 | 与 land-book / lapa / 现有图库同质，没有核出值得新增的独占任务 |
| [modulify.ai/templates](https://modulify.ai/templates) · clone into dashboard | 排除 | “free to clone”指平台工作流，不能解释为免账号自由源文件；未核导出/许可 |
| [motionin.design](https://motionin.design) · 长篇交互 section 规格描述 | 暂缓 | Aperture 明写捕获 wheel、循环和 rAF/GSAP 分工；不是已审代码，且 scroll capture 与默认自然滚动可能冲突，先要具体需求/源码/许可 |
| [iconly.design](https://iconly.design) · Coinbase/PayPal 等 app 图标目录 | 排除 | 本次内容是 app/game/web 图标参考，不是已核许可的统一功能 icon 系统；不替代 Radix/Phosphor |
| [fontinlogo.com](https://fontinlogo.com) · 品牌字体与 closest/community 等标记 | 暂缓 | 准确字族、近似字族与未核社区投稿混合，不能当字体鉴定/商用许可来源；最终查 foundry/品牌 |
| [on.design](https://on.design) · 文本提取空；curl TLS EOF | 暂缓 | 能力、访问与许可未核实，不标 404 或死亡，不盲收 |
| [godly.website](https://godly.website) · 网站灵感画廊 | 已有 | 已有实验向路由；不再堆一个默认来源 |
| [60fps.design](https://60fps.design) · 产品 shot、交互标签与具体详情 | 新增 | 补行为维度；PRO 边界已查，不是开源动画包 |
| [recent.design](https://recent.design) · Web/branding/motion/print 混合瀑布 | 排除 | 现有 inspiration 已记录并降权过单条静图；本轮没发现独有任务，不新增推荐 |
| [backgrounds.supply](https://backgrounds.supply) · 背景包、Gradient Lab 与免费工具宣传 | 暂缓 | 免费到 1080p / Pro 高分辨率是页面声称，未实际导出与核资产许可；Feralui + 静图优先已覆盖 |
| [posts.design](https://posts.design) · 品牌社媒/OG/announcement 条目 | 已有 | 原有 cover 路由已覆盖；不是产品 UI 元件库 |
| [beui.dev](https://beui.dev) · Tabs 实际 TSX 与 MIT repo | 新增 | 增加一个可读实现候选，不把几百组件宣传数当价值；免费/Pro 分开 |
| [wonderlist.design](https://wonderlist.design) · 付费 Figma website designs | 排除 | 与现有模板重叠；网站设计订阅/单人许可不等于字体图像全获得商业授权，未购买/下载 |
| [mobbin.com](https://mobbin.com) · shipped screens / flows；免费账号有限、付费解锁 | 已有 | 真产品流程参考已覆盖，不能描述成全站免费；未登录 |
| [sent.dm](https://sent.dm) · SMS / WhatsApp / RCS API | 排除 | 消息基础设施，不是此次设计资产任务；不因混入清单而收录 |
| [logotouse.com](https://logotouse.com) · mockup 假品牌 logo；Pro 商业许可宣传 | 暂缓 | 可浏览不等于商用；只有真实占位 logo 需求才读完整许可，不用于冒充客户/合作关系 |
| [paperanimation.ai](https://paperanimation.ai) · 上传图、选物体、纸片风视频导出 | 暂缓 | 营销视频生成器不是本轮 UI 动效实现工具；免费有水印，付费/素材处理条款需任务时核，未上传任何图 |

## 采用规则

每次限开 1–2 个任务匹配来源；记录具体条目、可偷机制、不能偷的内容。带代码的候选先读源与 LICENSE，审依赖、键盘、reduced motion、离屏暂停、清理与移动性能；只学参考的站不得擅自 mirror 或搬竞品资产。目录数量、模板“免费”或首页“性能好”不代替这些检查。
