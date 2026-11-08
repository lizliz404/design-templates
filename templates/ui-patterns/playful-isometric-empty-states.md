---
name: playful-isometric-empty-states
description: >-
  线稿等距空状态的短时序微交互：物体入场或按压、接触压缩、回弹与语义点缀。Use when 为项目、通知、账单或收件箱设计轻量 playful empty state; 与密码腊肠狗、投喂仓鼠选同家族但不同触发机制的角色动效。
---

# Playful 等距空状态：空，不必无聊

来源：[Divan Raj / @desdivj 原帖](https://x.com/desdivj/status/2119377174713229695)，2026-11-08（Asia/Shanghai），原文 “Empty states don’t have to feel empty.”。本条覆盖四段视频，不只第一段。

**证据口径：** 以下视觉观察来自四段视频的视觉审阅；下载文件元数据另外核验。未取得作者工程源文件、技术栈或素材授权。视频能支持形状、遮挡、动作顺序的描述，不能证明原作使用 SVG、真实物理、某个动画库或某种 mask；后文工程方案均为复刻建议，不是原作实现披露。

## 家族与选型

同家族已有 [会伸长的密码腊肠狗](./stretchy-dog-password-meter.md) 和 [投喂仓鼠 Cookie consent](./hamster-cookie-consent.md)：共同点是**可辨认的物体/角色 + 一个有语义的主要动作 + 克制的奖励**。区别不能抹平：狗把输入长度映射成身体，仓鼠响应同意项；这里四段没有可见输入或指针证据，应先视作时间驱动的装饰序列，不能编造 hover 或表单状态机。

## 四段视觉记录

共同构图：手机 mockup、浅底黑色轮廓等距插图；标题、短说明、底部 CTA 层级固定。复刻时保持实际 UI 控件不跟着物体弹跳。

| 段 / 下载文件名 / 时长 | 屏中文字与 CTA | 可见层次与动作 | 复刻难点（建议判断） |
|---|---|---|---|
| 01 · `01-empty-state.mp4` · 3.233s | No projects yet / Start your first one / Create Project | 等距叠片；顶部虚线轮廓与落下的片层；接触后叠层压缩、回弹，小 + 升起淡出 | 较低：保持片层平行与接触对齐，虚线层别误作真实点击区 |
| 02 · `02-empty-state.mp4` · 3.633s | All caught up / Nothing new here / Notification Settings | 铃/服务铃或蜂鸣器状物体，底座、主体、顶钮分层；按压压缩再弹起，小 check 升起淡出，外围短环线 | 较低：顶钮和主体错峰，环线不能喧宾夺主；物体具体命名保留不确定性 |
| 03 · `03-empty-state.mp4` · 3.583s | No payments yet / Send your first invoice / Create Invoice | 硬币堆与独立硬币；硬币横移并经过堆后方，再沿弧线到顶部；堆压缩回弹，短闪点 | 中等：运动轨迹和前后遮挡，接触帧连续；不是整组平移就够 |
| 04 · `04-empty-state.mp4` · 3.550s | Inbox is quiet / Say hello first / Start a Chat | 开口信封/盒状容器与带横线卡片；卡片斜向进入，前壁遮住卡片下部；容器回弹，脸状小点缀/短线升起淡出 | 中等：开口、卡片、前壁的层级与插入轨迹必须配合 |

**时长是媒体文件长度，不是已测得动画周期。** 这些是具有重复感的短序列，尚未逐帧确认无缝循环、完整周期、精确位移或缓动参数。

原始媒体（编号对应上表）：

1. [项目叠片 MP4](https://video.twimg.com/amplify_video/2119377088151175168/vid/avc1/1212x1080/vhhwg4ExZFN6kk2y.mp4)
2. [通知铃 MP4](https://video.twimg.com/amplify_video/2119377103322005504/vid/avc1/1212x1080/8UN1zUJbo3ESTHko.mp4)
3. [硬币 MP4](https://video.twimg.com/amplify_video/2119377115934269440/vid/avc1/1212x1080/UG4vATdpSFnS-xRs.mp4)
4. [收件箱 MP4](https://video.twimg.com/amplify_video/2119377127959306240/vid/avc1/1212x1080/3_p2NJfYqvrs43MS.mp4)

## 流程：从观察到可复刻资产

1. **先选真实空状态。** 把标题、原因/下一步和真实 CTA 写好，再选能表达该语义的一件物体。没有付款不等于付款成功，装饰 check 不能冒充业务确认。
2. **先画静止图再动画。** 独立拆出底座/后壁、主体、活动件、前壁、短命点缀；在目标尺寸验证等距方向、线宽、开口和轮廓。这里的“拆层”是人工工程分析，不是自动图片解析。
3. **只做一条主要动作链。** `rest → approach/press → contact → overshoot → settle → rest`；accent 在 contact/settle 附近短暂出现。需要循环时单独加入静止间隔，不让节奏永远紧绷。
4. **先验证接触与遮挡，再调手感。** 硬币和卡片尤其要逐帧看进入前/中/后；前壁 draw order 能解决时不加 mask，确有裁切需求再用 clipPath/mask。
5. **接入真实 UI。** 实际标题、描述、按钮是普通 DOM；插图单独容器。窄屏、reduced motion、离屏/后台暂停都跑一遍，再决定是否保留循环。

## 机制依据与建议工程方案（非原作栈）

**最小可行：原创 SVG 分组 + CSS keyframes 或现有 Motion/GSAP 时间线。** 这种有限物体与短序列不必默认引入 3D；视频本身也不能排除原作 3D。已有设计团队 Rive/Lottie 资产管线时可用，但要计入编辑、runtime、资源加载与维护成本，不能一概称更便宜。

建议图层从后到前：`rear/base → moving item (behind) → body/front → moving item (front, if needed) → accents`。只有运动物跨越深度关系时才切换前后层表达；避免直接克隆造成重影。SVG `transform-origin`/`transform-box` 需显式约束；压缩以接触底边为锚，别让底座漂浮。

建议共用小模型：`variant`（四种物体）、`phase`、局部时间 `t`、`motionAllowed`、`visible`。phase 只调活动物体的位移/旋转、主体有限压缩与点缀透明度，不改 UI 布局；`reducedMotion` 直接输出可辨认 rest。它不是加载进度，不应绑定虚假的完成百分比。

**以下仅为起调范围，不是测量值：** approach 250–450ms；contact 70–120ms；overshoot/settle 220–400ms；accent 250–500ms（可与 settle 重叠）；静止间隔 800–1600ms。采用轻微过冲后收敛的弹簧感或 ease-out；有过冲不能叫“过阻尼”。先调相位关系，再调幅度；不要为了追求“弹”让每个部件各自晃动。

### 手头工具怎么用

- [Hairline / hairline-create](../isometric-figures/SKILL.md)：已收完整引擎，适合原创等距 SVG 物体和轻量空状态；其默认方向是单物体、指针响应、稳定命中与共享时钟。可借造型、遮挡、静止可辨等规则，不把当前四段时间序列硬说成 Hairline 原生示例；需要调整的触发合同要另验。**不是 screenshot tracer、工程图片解析器或自动拆层工具。**
- **Teardown 名称纠正（2026-11-09，Asia/Shanghai）：** 仓库确实有 [`cases/anduril-rea/TEARDOWN.md`](../../cases/anduril-rea/TEARDOWN.md)、[`saronic-rea/TEARDOWN.md`](../../cases/saronic-rea/TEARDOWN.md)、[`fugro-rea/TEARDOWN.md`](../../cases/fugro-rea/TEARDOWN.md)、[`vercel-rea/TEARDOWN.md`](../../cases/vercel-rea/TEARDOWN.md)。前三类是网站工程拆解报告（Anduril 明写 REA 6.8.0 / rea-agents，CDP 检查、场景捕获、JS/CSS 分析），Vercel 是 computed-style 间距实测；不是一个已定位的名叫 teardown 的工程插图解析 skill。上一轮只说“工具未识别”漏交代了这些现有报告。可借其证据优先的拆解方法；没有运行站点/源码时，四段 MP4 仍不能推出原作栈。当前树（含 hidden/untracked）、可见本地历史和 agent-context 引用未找到独立同名工具，不等于证明用户记忆错误或别处不存在。
- [diagram-design 等工具对照](../decks/diagram-skills.md)：可以画组件分层、时间线等辅助说明图，不是这些微交互的必需 runtime；也未确认就是用户记忆中的“工程细节图拆解工具”。没有找到确切名字就保留待核，不冒名替代。
- 普通二维 SVG 足够表达的版本优先手工拆层；精确 logo 或品牌资产需要可信源，不靠生成模型猜。当前只收研究笔记，不附未经视觉验收的成品 demo。

## 边界与消费验收

- 标题解释真实状态，CTA 可键盘操作且指向真实下一步；装饰整体 `aria-hidden="true"`，不反复向读屏播报点缀。
- `prefers-reduced-motion: reduce` 提供完整静止插图；无 JS 也保留空状态文字和操作。
- 离屏、页面隐藏时暂停时钟；可选仅播放一次或有限次数。持续自动运动时评估并提供所需暂停/停止控制，不默认无限循环。
- 320px 窄屏与深浅主题检查轮廓、文字对比、无溢出；片层/硬币/卡片不穿帮。按钮和文本的位置在全部相位保持固定。
- 若宣称无缝循环，须验首尾姿态及速度连续；媒体截断不能当成已验证 loop。复刻时间线、遮挡、reduced motion 和隐藏暂停需在消费项目实测。
- 与密码狗、仓鼠一样，一屏只放一个主要 playful 角色动作；严肃/受监管场景先评估语气，真实进度与错误反馈另做。
- 原帖与视频没有提供已核实的源码/素材复用许可；保留作者出处，借鉴模式并制作原创资产，不把下载 MP4 当可自由商用素材，也不宣称获得作者代码。
