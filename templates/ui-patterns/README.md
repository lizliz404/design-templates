# UI micro-patterns

这里放可单独取用的小机制，不放完整视觉系统。任务总路由在 [`../README.md`](../README.md)；Beautiful UI 不在本目录，而在 `design/`，它是 Agent thinking chrome 的相邻兄弟资产。

## Product craft

- **Data-dense B2B app craft** → [`data-dense-app-craft.md`](./data-dense-app-craft.md) + [`data-dense-b2b-app.md`](./data-dense-b2b-app.md)：tables、filters、forms、inboxes、dashboards、admin。
- **AI workspace surfaces** → [`ai-workspace-surfaces.md`](./ai-workspace-surfaces.md)：Workspace 常驻切换与管理、主对象 + 右侧 Agent rail、低优先级 Activity 聚合、Board drag/edit/side peek，以及 Stepper → Mermaid → React Flow 可视化梯子；单个 chat 状态走 `../agentic-ui-primitives.md`。
- **Icon system craft** → [`icon-system-craft.md`](./icon-system-craft.md)：Track A product chrome 的线重、尺寸与概念表；不是 favicon / wordmark / OG。
- **Interface audit → refine toolchain** → [`interface-audit-refine-toolchain.md`](./interface-audit-refine-toolchain.md)：Jakub Interfaces skills 负责跨域审计与修复；Libraries.dev 与 Astryx 只填已证明的效果 / 组件缺口；Light Rails 只做许可隔离的单层 motion spike。
- **Recover at point of failure** → [`recover-at-point-of-failure.md`](./recover-at-point-of-failure.md)：系统消息按 L0–L3 可执行性分级，失败点就地恢复；PACK DOCTRINE + EVIDENCE 双轨标注。
- **Consent gate** → [`consent-gate.md`](./consent-gate.md)：条款 / 隐私 / 营销同意流的三策略与选择轴，recover 学派的具体应用。
- **Search craft** → [`search-craft.md`](./search-craft.md)：Search、Filter、Cmd+K 与按产品类型选引擎。
- **SaaS onboarding two-phase** → [`saas-onboarding-two-phase.md`](./saas-onboarding-two-phase.md)：B2B / Agent 的 aha 之后才进入生产设置。
- **Publish calendar** → [`publish-calendar/SKILL.md`](./publish-calendar/SKILL.md)：发布/排期月历的 MUST/POLICY/PROFILE 分层合同、四层 DOM/ARIA 结构、Aurora 示例 profile 与不与 shell hotkeys 冲突的键盘合同；页面级工作台，不是 date picker。

## Motion chrome

- **AI thinking orb** → [`ai-thinking-orb/SKILL.md`](./ai-thinking-orb/SKILL.md)：landing 或 Agent surface 上只放一个环境状态球（上游源码与移植 recipe 已收进包）；不与 live Paper shader 叠加。
- **Beautiful UI primitives** → [`../design/beautiful-ui-ai-interfaces/`](../design/beautiful-ui-ai-interfaces/)：本目录之外的同族资产，提供 thinking、streaming、approval、tables 等可挑选的 Agent DOM 原语。
- **Paper Shaders** → [`../paper-shaders/SKILL.md`](../paper-shaders/SKILL.md)：本目录之外的背景氛围配方；不是 orb，也不承担状态语义。
- **ThreeUI hero** → [`threeui-hero-adapter.md`](./threeui-hero-adapter.md)：一个 MIT Community 3D product hero；说明图仍走 visual-economy。
- **Drafting resolve hero** → [`drafting-resolve-hero.md`](./drafting-resolve-hero.md)：虚线草图 → 实线成稿的注意力 resolve 线稿 hero；完整三源考察与机制在 webgl-threejs-background-animation skill 的 references。
- **UI SFX cues** → [`uisfx-semantic-cues.md`](./uisfx-semantic-cues.md)：语义界面声音完整纪律——pack 选型法、cue 语义映射、播放器生命周期、loop 清理、声音偏好；必须有同时可见的状态。
- **Liquid gooey micro-interactions** → [`liquid-gooey-micro-interactions.md`](./liquid-gooey-micro-interactions.md)：React 液滴黏滞融合微交互（npm `liquid-gooey`，MIT）；小面积 chrome 的手感层，剪影层过滤镜、内容层保持清晰；不承担语义状态。
- **Hand-drawn controls** → [`hand-drawn-controls.md`](./hand-drawn-controls.md)：drawably（MIT）手绘 boiling 控件；seeded SVG 叠在真控件下，a11y 来自真控件；playful 表面专用，dense B2B admin 换资产。
- **vgpu WebGPU effects** → [`vgpu-webgpu-effects.md`](./vgpu-webgpu-effects.md)：vercel-labs 的 WebGPU 渲染库（typed WGSL 导入、单 `Gpu` 上下文、按版本与入口实测包体、browser / node / mock 三运行时）；orb / Paper / ThreeUI 覆盖不到的自定义 shader 特效施工层，WebGPU-only 无自动兜底。

## Landing chrome

- **Footer craft** → [`footer-craft.md`](./footer-craft.md)：营销长页的收口。
- **Premium one-pager** → [`premium-one-pager.md`](./premium-one-pager.md) + [`snippets/`](./snippets/)：长营销页或文档的 location / life / finish。
- **会定格、可采纳的示例占位符** → [`typing-placeholder-animation.md`](./typing-placeholder-animation.md)：条目 40 的当前合同，点击冻结、显式写入草稿；[`snippets/`](./snippets/) 中的 typewriter 仍是旧版基础轮播，不含采纳流程。
- **Atomic island chrome** → [`atomic-island-chrome.md`](./atomic-island-chrome.md)：full-bleed camera / canvas / toy 的可收起 chrome，不适合需要持续导航的 dense desktop shell。

## 使用与维护

1. 按任务和表面类型选择一行，先读它的 “When / when not”。
2. 只复制验证信号需要的机制，并适配项目 `DESIGN.md`。
3. 跑该模式的检查；构建通过不能代替视觉 QA。
4. 新增、修改、删除规则以 [`../README.md`](../README.md) 为准；这里只为 micro-pattern 保留一条本地行。

灵感书签（不是资产）：[`../inspiration-sources.md`](../inspiration-sources.md)。
