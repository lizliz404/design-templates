# grok.com 公开 CSS 里读到的 token（2026-11-18）

来源：`evidence/grok-com-app/_next/static/chunks/*.css`（首页 Link 预加载样式 + 同扫描中其余 CSS）。这是声明值，不是 `getComputedStyle` 实测。部分选择器被压缩，个别正则切片会粘上下一段，下面只保留能独立成立的声明。

## 字体

两套名字并存，不要合成一套：

- Grok 令牌层：`--grok-font-sans: "X-VF", system-ui, ...`；`--grok-font-display: "X-VF Display", "X-VF", ...`；`--grok-font-mono: "X Mono", ui-monospace, ...`。对应预加载/下载到的 `x-vf.2-wx1-3hj_i0f.ttf` 与 `x-mono-vf.40ur7kz57cw-p.ttf`。
- 另一套（`--font-sans` 等）：`--font-universal-sans` → `"universalSans", var(--font-inter)`；`--font-universal-sans-display`；`--font-ibm-plex-mono`；`--font-geist-mono`；`--font-inter`；`--font-vazirmatn`（Vazirmatn，阿拉伯/波斯文覆盖）。首页 Link 头预加载的是 `UniversalSans_Text_400` 与 `UniversalSans_Text_550` 两个 woff2。
- 数学：KaTeX 全族（`2pv_qsiv2504z.css` 的 `@font-face`）。
- 另有一批像文稿/主题皮肤的族名（American Typewriter、Didot、Iowan Old Style、Snell Roundhand 等），与 `--imessage-*` 令牌一起出现，未在访客首页截图上直接看到。

字号（`--grok-font-size-*`）：hint 12px，chrome 14px，body 15px，title-small 17px，title-medium 20px，display 28px；正文标题用 em（h1 1.5 / h2 1.35 / h3 1.1）。

字重不是 400/500/700 三档：regular / compact / hint = **425**；medium / display / title-medium = **525**；emphasized / semibold / title-small / body-heading = **650**；body-heading-strong = 800；bold = 700。这与预加载的 Universal Sans **550** 字重文件一致（非常规 500）。

## 间距与圆角

- `--spacing: .25rem`（4px 刻度，和 Tailwind 默认一致）。
- `--grok-space-*`：1 / 2 / 3 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 20 / 24px，另有 paragraph 16、heading-before 32、heading-after 8。
- 内容栏：`--content-max-width: 44rem`，`--content-gutter: 1.5rem`。
- 侧栏令牌：`--sidebar-width: 15.5rem`（访客首页截图没有侧栏，但 CSS 里有完整 sidebar 前景/强调/边框色）。
- Grok 圆角：highlight 2、xs 4、sm 6、md 8、control 10、lg 12、alert 14、panel 16、card 18、overlay 20、island 22、xl 24、**composer 28**、full 999。另有 `--composer-radius: 24px` 与 `--page-composer-radius`（默认 29px，用在 `--page-frame-radius` 公式里）。三者并存，本轮没有测量实际计算值，只记录声明。

## 颜色与运动

- 强调色 `--grok-accent: #1084fe`（Imagine 发送钮在截图里是亮蓝，与此一致，但是目视不是测量）。
- 浅色底 `--grok-base: #e6e5e3`，`--grok-base-wash: #fff`；深色底 `--grok-base: #2c2c2b`，`--grok-base-wash: #2b1c00`（还有 lab() 平行声明）。
- 危险 `#ff263c`，成功 `#05a95f` / `#00c972`。
- 毛玻璃：`--grok-glass-filter: blur(36px) saturate(180%)`。
- 隐身/临时会话主题：`--incognito-hue: 268`（紫），`--accent-incognito`，以及 incognito 输入按钮底 `#222329`。
- 页面框架运动：`--page-frame-motion: .3s cubic-bezier(.23, 1, .32, 1)`；`--page-slide-dur: .25s`；`--page-slide-ease: cubic-bezier(.22, 1, .36, 1)`；`--page-frame-gap: 4px`；`--page-frame-lift: 40px`。

## 其它共存层

CSS 里同时出现 `--tw-*`（Tailwind 工具类残留/运行时）、`--x-*` / `.x-commerce`（X 设计系统残留或共享包）、以及一组像 shadcn 的 `--background` / `--accent` / `--destructive` / `--muted` / `--sidebar-*`。`lightningcss` 字符串出现在压缩 CSS 中，推断样式管线走 Lightning CSS（Tailwind 4 常见），这是推断。
