# 登录态 CSS 设计 token（2026-11-18）

来源：登录态实际加载的 14 个 `cdn.grok.com/_next/static/chunks/*.css`（1.3MB，`rea-runtime/bundle-css/`）。静态抽取，共 **1008 个自定义属性**、153 个 `:root` 块、294 个 `.dark` 上下文块。值取重复出现集，未做运行时计算样式采样。

## 主色板

- **UI 强调蓝**：`--fg-accent #299fff`（hover `#47acff`）；`--accent-blue #299fff`；`--fg-electric-blue #1a5eff`；另一组 `#0890ff/#0078d8` 并存（上下文变体）。v1 的 `#1084fe` 其实是 `--fg-contact-blue`（联系人/头像色），不是 UI accent。
- **灰阶 ×3 族**：`neutral-*`（纯灰 50–1000，界面主体）、`gray-*`（hue 228 冷板岩）、`warm-gray-*`（hue 30 暖灰，surface-inset/l1 用）——界面同时保留冷、暖、中性三套灰。
- **暗色表面是暖黑**：`--surface-base #131211`、`--surface-elevated #23211f`、`--surface-l2 #201f1d`、active `#2b2927` —— 暗色不是纯黑，是带暖底的黑。
- **浅色表面**：`--surface-base = hsl(white)`、`surface-l1 = neutral-50`、l2/l3/l4 沿 neutral-100/150/200 爬；`surface-invert = neutral-1000`。
- **Incognito = 紫色族**：完整 `--purple-50…1000` ramp + `--incognito-hue` 色相参数化；`--fg-incognito = purple-500`、`--button-incognito = purple-500`、`surface-incognito(-elevated)`。隐身模式是**换色相不换骨架**。
- **联系人/头像色 `--fg-contact-*` 用 OKLab 定义**：blue `#1084fe`、purple `#9159fe`、orange `#ff6700`（+ cyan/green/magenta/yellow/brown）——感知均匀色空间，8 色轮做头像归属。
- **语义色**：`fg-warning = yellow-700`、`fg-success = green-600`、`fg-danger = red-500`（danger 按钮用 6–10% color-mix 淡填充）；green/red/yellow/cyan 各 12 级 ramp。
- **`--x-*` = X 商业子系统的独立令牌层**：`--x-font-sans = TwitterChirp`、x-blue/x-purple/x-orange/x-neutral 全套 ramp、`--x-fg-brand = x-blue-500`、`x-radius-m`、`x-font-scale` —— checkout/commerce 模块把 X 的设计系统整个嵌进来了，字体都是 Chirp。

## 字体与字阶

- 默认：`--font-universal-sans`（Universal Sans 变体）；mono：`--font-ibm-plex-mono`（注意：v1 页面字体名是 "X Mono"，令牌层实际绑定 IBM Plex Mono）；serif 兜底 Georgia。
- chrome 字号四档：`--font-size-meta 13px / chrome 14px / label·ui 15px / title 16px` —— chrome 刻意压在 13–16px 紧凑区。
- 标题用 Tailwind 级 text-lg…6xl（1.125–3.75rem）；`--font-weight-*` 声明 300–900 全档（变体字体）。

## 形状与边界

- 圆角尺：`xs .125 / .5 / xl .75 / 2xl 1 / 3xl 1.5 / 4xl 2rem / full`；composer 圆角 `--border-b-radius/--border-t-radius = .75rem`（12px）。
- 边框是**透明度三级发线**：`--border-l1/l2/l3 = black 6%/10%/15%`（暗色换 white 6/10/20）——不靠实体色靠层级透明度。
- 阴影克制：`--shadow-elevated = 0 2px 8px #0000000a` + drop-shadow sm/md/2xl 级。
- spacing 基准 `.25rem`（4px 网格）。

## 动效 token

- 缓动族：常规 `ease-in-out (.4,0,.2,1)`；icon/text swap 用 `ease-out-quint (.23,1,.32,1)`；页面/面板滑动 `page-slide/panel (.22,1,.36,1)`；拖拽 resize 用 `(.65,0,.35,1)`；duration 默认 `.15s`。
- **问候轮换动画是 token 化的**：`--text-swap-blur 1.5px / dur .15s / translate-y 3px / ease quint` —— 文字切换 = 轻微上移 + 1.5px 模糊交换，150ms。
- commerce 模块自有节奏（.27s/.42s）。

## 读法

1. 主色板极克制：UI accent 就一个亮蓝 `#299fff` 族 + 三族灰 + 紫（incognito 专属）+ 语义三色。联系人多色只在头像归属出现。
2. 暗色主题是完整一等公民（294 个 dark 块、暖黑表面族）—— 不是反色滤镜，是独立表面系统。
3. 「模式=换色相」：incognito 用 `--incognito-hue` 参数化整套紫色 —— 新模式的视觉成本被设计成「转一个色相参数」。
4. X commerce 带着自己的设计系统（Chirp、x- ramp）内嵌 —— 账户/支付面复用 X 品牌，与 Grok 的 Universal Sans 面并存。
