# Design templates pack

可复用资产来自已完成项目与公开设计调研。这里是唯一的 pack 主路由：按任务找到资产、按规则维护资产；`README.md`、`SKILL.md` 和局部 README 只链接到这里，不另存一份平行清单。

**Canonical source:** [lizliz404/design-templates](https://github.com/lizliz404/design-templates)（本仓库的 `templates/`）。服务器中的 `<project>/_templates` 是同速镜像，不是第二来源；以 GitHub 仓库为准并保持镜像一致。

## 如何使用这个 pack

先按下方任务选一个最小资产，再读取它自己的 `README.md` / `DESIGN.md` / craft 文。无法写出选择理由，就还没有完成发现阶段。

```text
Job:
Chosen asset(s):
Why these fit:
Explicitly skipped:
Acceptance screenshots / checks:
```

每次复用都要留下：选择与跳过理由、项目 token / 签名动作、关键状态、桌面和窄屏截图，以及键盘 / motion / overflow / 错误恢复检查。构建通过不等于视觉验收；复制来的模式必须适配本项目系统。

## 如何添加、修改、删除

不变量：一次改动 = 一个资产文件 + 本主路由恰好一行；micro-pattern 另补 `ui-patterns/README.md` 一行（局部清单，不是第二主索引）；外部站点只有书签价值才进 [`inspiration-sources.md`](./inspiration-sources.md)——不 vendor 外站，不写资产说明册。

**新增（复制骨架）：**

```markdown
---
name: <slug>
description: >-
  <是什么>。Use when <分支 1 触发条件>; <分支 2>…（第三人称，触发分支前置）
---

# <标题>

<一行定位 + 上游链接>

## 流程（何时跑、按序做什么、终点怎么判）

## 机制依据（按需查的平铺规则，co-location）

## 边界（硬性 guardrail，正面措辞）
```

路由行格式：`- **<任务触发词>** → [`<路径>`](./<路径>)；<一句话边界>。`

**修改**：改资产本身 + 它在本主路由的那一行；跨文件引用保持单向。

**删除**：删资产 + 主路由行；micro-pattern 再删 `ui-patterns/README.md` 的本地行。

**收尾（必须）**：`bash scripts/lint-pack.sh`——零 orphan、无机器绝对路径、zip 退役、`ui-patterns` 本地清单齐，全绿才算改完。

## 产品任务

- **分步图文叙事 / 业务页原生自然流默认 / 出海云 sticky 目录 / 可选局部停驻** → [`center-dwell-step-scroll.md`](./center-dwell-step-scroll.md)；自然流优先，A/B与旧CFE长停驻历史分开；含11-09两站真实参数对比、轻量修复、官方证据与输入验收，不默认叠平滑引擎。
- **网页视频播放器 / 原生控件 / 审片 UI / HLS 与 DASH 选型** → [`web-video-player-due-diligence.md`](./web-video-player-due-diligence.md)；控件、状态、引擎与交付分层，维护状态和第一方尽调；不因皮肤需求默认改造媒体后端。
- **Landing 首屏氛围 / 静图 WebP 是否够 / hero 背景视频 / 海报优先 / 4 秒体感** → [`landing-hero-background-video.md`](./landing-hero-background-video.md)；先第一性原理选型（静图默认，视频/Lottie/shader 条件启用）；上视频时体积 + 海报 LCP + CDN 优先于播放器；带控件 / HLS / 审片仍走上一行。
- **Landing 图文共舞 / 画廊感滚动阻尼 / sticky rail + 流式列 / 差速漂移 / 动量回摆参数选型** → [`image-text-gallery-dance.md`](./image-text-gallery-dance.md)；静态配对/自然流优先，动效可选；历史参数观察与当前建议分级，先修空间再谈物理；补“原生是底线≠完成构图”、证据/方法分工、主图尺度与真实页面双闸验收；无统一阻尼下限，不为“丝滑”复制spring或装轮子。
- **B2B 数据密集后台 / CRM / 管理台** → [`ui-patterns/data-dense-app-craft.md`](./ui-patterns/data-dense-app-craft.md) + [`ui-patterns/data-dense-b2b-app.md`](./ui-patterns/data-dense-b2b-app.md)。需要 records / diff / filter 表格语法时，再组合下一节的 Beautiful UI。
- **Telegram Web A/K 借鉴 / Chat-first 工作区 / 未发送草稿 / 阅读位置 / 附件异步所有权** → [`telegram-web-chat/README.md`](./telegram-web-chat/README.md)；固定版本研究、离线原型及出海云实施/失败到通过的执行对账，不搬 IM 服务层，不把历史候选当成当前缺口。
- **Chatbot / AI Agent 界面** → [Agent / motion chrome](#agent--motion-chrome) 的 **Beautiful UI primitives**；它覆盖 thinking、streaming、approval、tool chips、composer 和 dense tables。
- **Agent 界面选轮子 / agentic UI 组件赛道验真 / Slack·Teams 原生生成式卡** → [`agentic-ui-primitives.md`](./agentic-ui-primitives.md)；状态原语 × chat 框架 × 协议 × 生成式 UI（OSS catalog vs Agent 产品出界）坐标、验真表（含 json-render/chat · Chat SDK · OpenUI · Channels · A2UI）与抄/装/上框架阶梯；承接 ui-stack-decision §3 A 行，Beautiful UI 本体研究走上一行。
- **AI 工作台页面编排 / Workspace 管理 / Agent 侧栏 / Activity / Board 编辑 / 流程可视化** → [`ui-patterns/ai-workspace-surfaces.md`](./ui-patterns/ai-workspace-surfaces.md)；主对象 + 可调宽右侧 Agent rail、Workspace 常驻上下文、按对象聚合 Activity、drag + side peek 编辑，以及 Astryx Stepper → Mermaid → React Flow 的分级合同；单个 agent 状态原语仍走上一行。
- **产品哲学 / 对象模型 / 工作流取舍（建什么对象、不建什么）** → [`ui-patterns/linear-method-philosophy.md`](./ui-patterns/linear-method-philosophy.md)；Linear Method 蒸馏：八原则 + 方法流 + Issue/Team/Project/Milestone/Initiative/Cycle/View 七件套 + 取舍纪律；Agent 契约走下一节。
- **SaaS 激活 / onboarding → setup** → [`ui-patterns/saas-onboarding-two-phase.md`](./ui-patterns/saas-onboarding-two-phase.md) + [`ia-user-journey.md`](./ia-user-journey.md)；先 aha，再进入生产用量。
- **叙事长 landing** → [`design/lead-radar/`](./design/lead-radar/) 或 [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)；按需组合 [`ui-patterns/premium-one-pager.md`](./ui-patterns/premium-one-pager.md) 和 [`ui-patterns/footer-craft.md`](./ui-patterns/footer-craft.md)。**按目标站做可测量复刻**（IMR / SLR / behavior）→ sibling [landing-page-replication-v5](https://github.com/lizliz404/agent-skills/tree/main/skills/landing-page-replication-v5)；软路由 [`sibling-routes.md`](./sibling-routes.md)。
- **B2B 复杂销售营销站 / 海工·能源对标 / 学谁不学谁 / 流量≠询盘** → [`b2b-complex-sales-site-exemplars.md`](./b2b-complex-sales-site-exemplars.md)；产品驱动 vs 复杂销售两宇宙、活站栈指纹与询盘路径；首屏背景视频交付正交走 [`landing-hero-background-video.md`](./landing-hero-background-video.md)。
- **严肃 B2B 宣传册站 / 工业·能源·工程·防务企业官网 / brochure 站 audit** → [`design/b2b-brochure-sites.md`](./design/b2b-brochure-sites.md)；14 站模式目录与边界，已纠正单族/颜色面积等过度概括；两站精确字体/配色走下一行，产品内 UI 与电商/内容门户不适用。
- **Anduril / Saronic 原站字体与配色 / 工业编辑式 hero、规格、缝线与响应式** → [`design/anduril-saronic-dna.md`](./design/anduril-saronic-dna.md)；11 页双视口量尺 + 平台字体/网络 JSON，区分事实/推断/缺口与商业授权；不代替项目 DESIGN.md、不自动选字体。
- **Franklin Offshore / 海工集团业务呈现 / 制造与项目证据 / 分享名片对照** → [`design/franklin-offshore-dna.md`](./design/franklin-offshore-dna.md)；七主样本+Products双端、Articulat实字形/色板与OG/索引缺口，借买家证据链不复制集团资质或皮肤。
- **落地页按钮太多 / 页面「乱」「累」/ 首屏文案过密 / 清理 AI 自我防御式免责文案** → [`ui-patterns/landing-cta-economy.md`](./ui-patterns/landing-cta-economy.md)；按「竞争的下一步」而不是按钮实例数做预算：1 主动作 + 1 辅助、权重递减的重复、首屏/段落字数上限、hedge 三类与五问判据；定价页/受监管品类另有边界。
- **顶部导航滚动收缩 / 玻璃胶囊导航 / Liquid Glass 仿制 / 毛玻璃上文字可读性** → [`ui-patterns/scroll-shrink-glass-capsule-nav.md`](./ui-patterns/scroll-shrink-glass-capsule-nav.md)；整条透明导航 → 居中玻璃胶囊的三档实现（CSS blur / SVG 折射 / WebGL）、最坏背景对比度算法、四路降级与 iOS blur 边界；点按展开的岛式 chrome 走 atomic-island-chrome，不做内容层玻璃。
- **顶部导航下划线手势 / 通栏 dropdown 与页面压暗 / sticky header 高度同步 / 页内跳转条与 scrollspy** → [`ui-patterns/header-nav-and-jump-bar.md`](./ui-patterns/header-nav-and-jump-bar.md) + [`snippets/header-nav-and-jump-bar.html`](./ui-patterns/snippets/header-nav-and-jump-bar.html)；双程下划线 replay（550ms 右收→翻原点→左绘→归位）、chromeless panel + `:has()` 零 markup scrim、`--header-h` 运行时实测、`aria-current="location"` 滚动高亮；含 hover 死带与 band 空态三个实测缺陷及修法，滚动收缩玻璃胶囊走上一行。
- **nav dropdown 项间切换背景乱动 / 半透明带互叠下陷 / 「hover 一下就消失」够不到子项 / Vercel 式静止表面+方向性文字交换** → [`nav-still-band-dropdown.md`](./nav-still-band-dropdown.md)；单一共享 `.nav-band`（`:has()` 开合、项间构造性零动画）+ 整块文字层 `data-panel-dir` 左右渐隐 + `.is-open` linger 时间走廊，含逐帧像素验收清单与三个实测病历；下划线手势/死带几何仍走上一行。
- **文本型 Help / 长文档 / PDF 排版（简历 / 一页纸 / 白皮书 / 信函）、商品图文研究报告或纸感 landing** → [`design/kami-document-dna.md`](./design/kami-document-dna.md) + 已装 skill `kami`（`~/.agents/skills/kami`，`pi --skill ~/.agents/skills/kami`）；DNA 只记纸感令牌，Portfolio 双图、Long Doc 密度与写作门走实际 skill；记录实际采用机制，不搬字体。
- **个人站 / 作品集** → [`design/hanzilla-personal-site/`](./design/hanzilla-personal-site/) 或 [`design/liz-personal-compact/`](./design/liz-personal-compact/)。
- **内容到服务承接页** → [`design/uhoh-inspired-service-entry/`](./design/uhoh-inspired-service-entry/)；入口屋不是交付工厂。
- **站内 / 产品内搜索** → [`ui-patterns/search-craft.md`](./ui-patterns/search-craft.md)；先区分 Search、Filter 与 Cmd+K。
- **筛选胶囊「输入搜索 + 点选」共存 / 可搜索单选·多选 / 已选项被过滤掉** → [`ui-patterns/searchable-filter-choice.md`](./ui-patterns/searchable-filter-choice.md)；值=合法 id、菜单输入=草稿、页面 query 草稿、查询结果四层分开，逐条标 [硬] 与 [POLICY]（hover 不抢焦点、IME Enter、不匹配回滚、常驻行不计匹配、无匹配不清空、触屏）；不做全文搜索，也不做自由输入。
- **图标选型 / 线重 / 概念表** → [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)；稳定产品 chrome 用 Iconoir 等生产线库，产品专属少量语义图标可组合下一行 Runeicons authoring；不是 favicon，也不默认自研 icon font。
- **可编辑 / 可动效的产品专属图标** → [`ui-patterns/runeicons-authoring-workbench.md`](./ui-patterns/runeicons-authoring-workbench.md)；Runeicons 与 Iconoir 同为一等图标候选但分工不同：前者当前只作 Apache-2.0 编辑/导出工作台，WIP private packages 不作运行时依赖。
- **UI 栈拍板记录** → [`ui-stack-decision.md`](./ui-stack-decision.md)；管道层/可见层边界、换依赖成本分级 L0–L3、候选分级与 agent-friendly 真标准 + Iconoir / Runeicons 图标决策并入，适用 chuhai-cloud / inquiry-foundry；线重与概念表规则走上一行。
- **现有界面 audit → refine / Libraries.dev 效果选型 / Astryx 组件研究 / Light Rails 动效实验** → [`ui-patterns/interface-audit-refine-toolchain.md`](./ui-patterns/interface-audit-refine-toolchain.md)；Interfaces skills 管审计与修复，Libraries.dev 与 Astryx 只填已证明的效果 / 组件缺口，Light Rails 只做许可隔离的单层 motion spike。
- **系统消息 / 错误恢复** → [`ui-patterns/recover-at-point-of-failure.md`](./ui-patterns/recover-at-point-of-failure.md)；toast / alert / modal 按 L0–L3 可执行性分级，失败点就地恢复；补 data-dense 后台与 onboarding 的消息纪律。
- **发布 / 排期月历** → [`ui-patterns/publish-calendar/SKILL.md`](./ui-patterns/publish-calendar/SKILL.md)；一级年月控制、状态点密度与 shell-hotkey 共存的键盘合同，规则分 MUST/POLICY/PROFILE 三层（Aurora 参数是示例 profile）；是页面级工作台，不是 date picker。
- **Logo / favicon / OG 与聊天分享名片 / title-description / 品牌资产** → [`brand-identity/SKILL.md`](./brand-identity/SKILL.md)；先合同与原站实测，核真实图像尺寸/缩略图/源HTML身份，再走媒介匹配与16px gate；有标签不等于分享/SEO/GEO验收，UI图标仍走 [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)。
- **集成 logo / 技术栈标 / 占位 logo 墙 / 外部品牌标** → [`brand-logo-sources.md`](./brand-logo-sources.md)；真品牌标库（Simple Icons / theSVG / SVGL…）× 虚构占位标（Hugeicons Logos / Untitled UI Logos…）的验真源头表 + 商标与构建期离线纪律；不是功能图标（那走 [`ui-patterns/icon-system-craft.md`](./ui-patterns/icon-system-craft.md)），也不是自研 logo 流水线（那走上一行 brand-identity）。

## Agent / motion chrome

这些资产相邻，是因为它们都在解决 **AI surface chrome**：Agent 的可见思考与操作反馈、页面的状态感和氛围。但相邻只是路由关系，不能合并文件夹：Beautiful UI 是可挑选的 React 源码组件；orb、shader、hero 与 sound 各有来源、许可与消费方式。

- **Beautiful UI primitives** → [`design/beautiful-ui-ai-interfaces/`](./design/beautiful-ui-ai-interfaces/)；21 个组件的完整官方 TSX、共享样式、依赖锁文件和 MIT 许可；固定版本与官网 Copy code 逐项核验，包含 Prompt Bar、Insight Cards、Flowchart 和 Agent Screen。
- **Liquid Glass 轮子 / Dynamic Island 组件 / 丝滑 composer 浮条 / ask-user 点选卡 / iOS 滚轴选择器选型** → [`liquid-glass-island-wheels.md`](./liquid-glass-island-wheels.md)；2026-11 五表面验真表（license 实核、抄/装/参照阶梯、shelf-radar 落点），玻璃机制本身仍走 scroll-shrink / glass-motion-landscape / atomic-island 机制资产，不重复收录。
- **Agent 交互契约（身份 / Session×Activity / delegation / loops）** → [`ui-patterns/agent-interaction-guidelines.md`](./ui-patterns/agent-interaction-guidelines.md)；AIG 六原则 + Session 六态 + Activity 五类 + actor=app/scopes/时序合同；产品哲学走上一节。
- **AI thinking orb** → [`ui-patterns/ai-thinking-orb/SKILL.md`](./ui-patterns/ai-thinking-orb/SKILL.md)；`FluidOrb` 或 `Liquid Orb` 二选一。两个上游都已收进包：Liquid Orb 的 MIT `effect.wgsl` / `effect.metal` 在 `ai-thinking-orb/upstream/lersent-orb/`，FluidOrb 参考拷贝（带 PROVENANCE）+ 生产级 plain-React 移植在 `ai-thinking-orb/upstream/rare-ui-fluid-orb/` 与 `ai-thinking-orb/recipes/`。与 live Paper shader 互斥：同一视图最多一套动态大气。
- **Paper Shaders** → [`paper-shaders/SKILL.md`](./paper-shaders/SKILL.md)；纸张 / mesh / veil 是背景氛围，不承担状态 orb 的语义。
- **ThreeUI one-hero** → [`ui-patterns/threeui-hero-adapter.md`](./ui-patterns/threeui-hero-adapter.md)；只作产品交互表面，先通过 visual-economy gate，说明图不使用它。
- **Drafting resolve hero** → [`ui-patterns/drafting-resolve-hero.md`](./ui-patterns/drafting-resolve-hero.md)；three.js batched 线稿的「虚线草图 = 未确认方案、注意力 = 人工确认、实线 = 可交付」hero，产品承诺是「先确认后生成」类叙事时用；机制源头与生命周期合同在 webgl-threejs-background-animation skill；同一视图最多一套动态大气。
- **vgpu 自研 GPU 特效** → [`ui-patterns/vgpu-webgpu-effects.md`](./ui-patterns/vgpu-webgpu-effects.md)；vercel-labs 的 WebGPU 库（typed WGSL、版本化 gzip 预算、browser / node / mock 三运行时；0.4.0 库主入口预算 38,912 bytes，产品包体另测）。vendored 资产（orb / Paper / ThreeUI / theater）覆盖不到的自定义 shader 特效才上手；WebGPU-only 无兜底；同一视图最多一套动态大气。
- **UI SFX** → [`ui-patterns/uisfx-semantic-cues.md`](./ui-patterns/uisfx-semantic-cues.md)；声音是可见状态的补充，绝不是唯一状态通道。
- **React 微动效 registry 选件** → [`ui-patterns/amicro-motion-registry-intake.md`](./ui-patterns/amicro-motion-registry-intake.md)；Amicro 只按真实状态缺口取一件 MIT 源码，拒绝整包 motion system、cursor tricks 与 loader 自助餐。
- **Proof-first 产品 launch film** → [`ui-patterns/proof-first-launch-storyboard.md`](./ui-patterns/proof-first-launch-storyboard.md)；真实 proof → 系统装配 → 单一 tension → 一句收口，不复制 Cloudflare 视频或数字。
- **Progressive 3D assembly** → [`ui-patterns/progressive-assembly-3d.md`](./ui-patterns/progressive-assembly-3d.md)；一动作一块、k/N 常显、可暂停/检查与同义 2D fallback；来源页无可核许可，只独立重做机制。
- **等距 SVG 物体 / 指针交互线稿 / Hairline empty state / 轻量 hero** → [`isometric-figures/SKILL.md`](./isometric-figures/SKILL.md)；固定版本 hairline-create 完整引擎、构建与检查脚本已收录，单物体单动作；邻近 isometric-objects 原帖暂存同入口，未取得源码、不冒名替代。
- **饼干 icon / 浮钮 / cookie 视觉层 / 叠在 consent 上的皮肤** → [`cookie-visual-layer-wheels.md`](./cookie-visual-layer-wheels.md)；不是 CMP；仓鼠整卡仍走 hamster；法律闸门走 consent-gate。
- **Playful Cookie 同意 / 同意即投喂** → [`ui-patterns/hamster-cookie-consent.md`](./ui-patterns/hamster-cookie-consent.md)；开关喂仓鼠鼓腮，Accept all 高对比、Reject all 弱化（Ramin Nasibov）；美、值得学，to-B / 受监管场景不要上。
- **Playful 等距空状态 / 物体入场回弹 / 角色微交互家族** → [`ui-patterns/playful-isometric-empty-states.md`](./ui-patterns/playful-isometric-empty-states.md)；Divan Raj 四段视频拆层与复刻建议，串联密码腊肠狗、投喂仓鼠和 Hairline；装饰时序不冒充输入或进度反馈。
- **Playful 密码强度 / 指标即身体** → [`ui-patterns/stretchy-dog-password-meter.md`](./ui-patterns/stretchy-dog-password-meter.md)；输入框变宽、腊肠狗等宽拉伸、表情与毒舌文案分档（Ramin Nasibov 原作）；鼓励长度不拦人，严肃产品换普通强度提示。
- **Hand-drawn controls** → [`ui-patterns/hand-drawn-controls.md`](./ui-patterns/hand-drawn-controls.md)；手绘 boiling 控件（drawably 蒸馏，MIT）：seeded SVG 叠在真控件下，a11y 来自真控件；playful / landing 表面专用，dense B2B admin 换资产。

## Decks / diagrams

- **结构图 / 说明图（默认）** → [`decks/visual-economy.md`](./decks/visual-economy.md)：先 prose，再 ASCII、Mermaid；不要默认上 React / Three。
- **选画图 skill / 动态架构图 / 社媒动图 / 可编辑 .drawio** → [`decks/diagram-skills.md`](./decks/diagram-skills.md)；live-panel、diagram-design、drawio 等 12 个 diagram skill 的对比表与「何时选哪个」，先过上一行 visual-economy 再来选工具。
- **HTML 演示 deck（审美交付）** → [`decks/README.md`](./decks/README.md) + 已装 skill `frontend-slides`（`~/.agents/skills/frontend-slides`，`pi --skill ~/.agents/skills/frontend-slides`）；确认 occasion 是演讲或课程后，才进入 `upstream/beautiful-html-templates`、全局 frontend-slides 和可选 Paper Shaders。
- **复杂流程 / SOP / 角色协作 / 数据流 / Stage-Gate / 反馈回路 / 系统边界的解释型 SVG 或自包含 HTML** → [`visual-explainer-method.md`](./visual-explainer-method.md)：按需加载的方法文件，不是新 Skill；静态默认，先理解受众与核心问题再选图法；渲染图法查只读 vendored 包 `~/dev/repos/diagram-design/skills/diagram-design/`； due diligence 见同目录 `visual-explainer-research-2026-09-30.md`。
- **演讲叙事（先论证后 slides）** → `~/dev/agent-skills/skills/presentation-logic/SKILL.md`（主线→叙事文档→质疑→用户确认）→ `~/dev/agent-skills/skills/html-slides/SKILL.md`（1920×1080 学术 slides；Linux 下改写截图/转格式步骤，explainer 用途以 inline SVG 代 CDN Chart.js）。两者皆本地 canonical、未暴露，经本 router 按需读取。

## Craft / tokens

- **高杠杆 craft checklist / 解耦与 Agent 维护预算** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)；22C 单一披露真源；43 按职责解耦与源码单文件 ≤1,500 行，不按行数机械切块
- **「这是哪个元素」定位 / UI 精修期点选元素发 agent** → [`element-picker-playbook.md`](./element-picker-playbook.md)；首选 Devin `browser_preview` 注入式选择器（零安装、组件名+源码位置进对话），其次 DevTools/其他选择器，稳定锚点才埋少量 `data-ui-id`（checklist §44）
- **间距审计 / 灰块 pass / 密度模式** → [`spacing-audit-checklist.md`](./spacing-audit-checklist.md)；“大概率是间距问题”（Michael Filipiuk）：外层 > 区块 > 卡片 > 元素、收紧相关对、4/8 token、comfortable/compact，附 agent 审计 prompt。
- **Typography / 原站字族与角色验真** → [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)；先读项目 DESIGN.md，通用字体栈不自动生效；Anduril/Saronic 的 PS、static 映射与授权缺口由入口路由到实测 DNA，不擅自替代。Community shortlists 仅书签（如 [`reading-notes/ricouii-free-commercial-fonts-2026-11.md`](./reading-notes/ricouii-free-commercial-fonts-2026-11.md)），不自动并入字栈。
- **Web 字体瘦身 / subset / unicode-range 拆分 / 字体拖慢首屏** → [`web-font-subset-optimization.md`](./web-font-subset-optimization.md)；Shu Ding 的逐字 Agent prompt（像素 diff 验收、core+extended 双文件、不进 build）+ Rauch 的 fx.sh 终端字形实例；选字体走上一行。
- **Color / surface / 品牌色阶 / 第三色搭配与 token 解耦** → [`design-color-surface-preferences.md`](./design-color-surface-preferences.md)；先核项目 DESIGN.md，复用微暖纸白与 primitive→semantic 接线；两站原始 HEX/实际 seam/对比走实测 DNA，研究色板与面积推断不自动生效。
- **i18n / language switcher** → [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)
- **i18n / 翻译存活排版规则** → [`i18n-translation-survival.md`](./i18n-translation-survival.md)：atom、换行、层级通道、RTL、IME、voice 的规则级手册；做切换器组件走上一行的 lang-switcher 文档。
- **On-brand AI 生成合同 / 先定 guideline 再执行 / 压 AI 味** → [`on-brand-ai-generation-craft.md`](./on-brand-ai-generation-craft.md)：先读唯一 DESIGN.md、核对标真实选择与生效状态，再选资产/写 token/验收；Hallmark gates 只补缺，不覆盖已定品牌。
- **IA / user journey / default home / nav** → [`ia-user-journey.md`](./ia-user-journey.md)
- **Header 控件分置 / 状态切换器 vs 入口 vs 外链** → [`chrome-controls-placement.md`](./chrome-controls-placement.md)：高频状态切换（theme/locale）必须 Header 一键 icon switcher，menu 只收低频入口与外链；审"统一 dropdown"混装时开它。
- **渲染选型 / SSG vs SSR vs SPA** → [`rendering-strategy-map.md`](./rendering-strategy-map.md)：按表面选渲染策略的坐标轴与决策启发；生成式 site factory 的特殊视角与 unknown unknowns 清单。

## 灵感书签

- **X 上设计 / UI / UX / PM 高收藏帖与链接表（2026-08..10）** → [`x-design-reading-list-2026-10.md`](./x-design-reading-list-2026-10.md)：Top 10 + 主题分组 + ≥5k star 的 repo 与带内容注释的站点（代码组件库单列）；短文 / 清单要点转述在 [`reading-notes/`](./reading-notes/README.md)；pack 已有的只留指针。
- **社媒设计资源长清单去重 / 免费与源码宣传核验** → [`reading-notes/design-resource-triage-2026-11-09.md`](./reading-notes/design-resource-triage-2026-11-09.md)；24 个目的地只新增 60fps / beUI，3 个已有入口增强；逐项记录不收的理由，不另造推荐目录。

[`inspiration-sources.md`](./inspiration-sources.md) 按同一任务族群整理外部站点。一次只开 1–2 个站，记下可复用机制和明确不抄的部分，然后回到本路由选择资产；禁止整站 mirror gallery。

## 复用选择记录

```text
Job: yashe DESIGN.md —— 为香木雅舍内容工作台写 canonical 设计合同，替换 Aurora Glass 遗产（2026-09-12）
Chosen asset(s): design/kami-document-dna.md（主源：parchment+ink-blue+暖灰四档+衬线 400/500+proximity law）
  + design-color-surface-preferences.md（Band B 暖纸盯表带）+ design-typography-font-preferences.md（zh/en 衬线配对）
  + ui-patterns/ai-workspace-surfaces.md（主对象居中 + Agent rail + 状态不靠颜色单通道）
  + on-brand-ai-generation-craft.md（design.md 合同法 + 数字诚实）+ brand-identity/SKILL.md（只取规则层）
Why these fit: 新中式珠宝语境要"纸墨印"而非玻璃拟态——kami 是纸感 token 的唯一机制层；
  产品是 agent-as-a-service 工作台，ai-workspace-surfaces 给右侧 rail 与状态原语的页面合同。
Explicitly skipped: design/beautiful-ui-ai-interfaces（未接源码，只取状态语义）、ai-thinking-orb / Paper Shaders
  （静态演示不用动态大气）、premium-one-pager / footer-craft（yashe 静态页是工作流 demo 非叙事长 landing）、
  data-dense-app-craft（leads/publish 剥离候选，阿里后置）。
Acceptance screenshots / checks: 见 yashe repo `DESIGN.md §9`（font-size 阶梯 grep、墨蓝 ≤5% / 朱砂 ≤2%、
  serif 400/500、无 transition-all/hover-scale/冷灰、工作台 src/index.css 单文件换血编译通过）。
```

## 已知缺口

- **没有完整 B2B 数据密集后台模板**：现有 `data-dense-app-craft.md` 是手册，`data-dense-b2b-app.md` 是交付闸。若沉淀出 tokens、表格 / 表单语法和截图，应回填 `design/<slug>/` 并在本节更新。
- **没有可安装的 App 内表格组件**：已有 Beautiful UI Records / Diff / Filter 原始 TSX；仍需在消费项目接入真实数据、分页与权限。
- **静态站与 React landing 的统一规则仍缺**：双营销面的共同 token、组件边界和回归检查尚未沉淀为通用资产。
