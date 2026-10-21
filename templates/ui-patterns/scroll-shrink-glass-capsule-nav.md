---
name: scroll-shrink-glass-capsule-nav
description: >-
  顶部整条导航随滚动收缩为居中玻璃胶囊的可复用配方。Use when 页面顶部要做「滚动后收缩成毛玻璃胶囊」的导航;
  需要判断 CSS blur / SVG 折射 / WebGL 三档实现该选哪个; 要核对玻璃上的文字对比度、聚焦环、触控目标;
  或遇到 iOS Safari 上 backdrop-filter 掉帧、卡首帧、Safari 下「降低透明度」不生效。
---

# Scroll-shrink Glass Capsule Nav

**Aliases:** liquid-glass nav · 流动跟随胶囊 · 收缩导航胶囊 · Dynamic-Island nav · frosted floating header
**Job:** 让页面顶部 chrome 在“静止时占满宽度、滚动后收成一颗小胶囊”，并且**在任何设备、任何背景内容下都仍然可读、可点、可降级**。
**Why:** 收缩本身是 3 行 CSS 的事；真正让人返工的是三件事——几何插值把子元素和 hairline 拉变形、毛玻璃上的文字对比度没人算、iOS Safari 的 blur 把首帧拖死。

**Reference ships（消费项目，包内不 vendor）：**
- `<project>/web/src/landing/hero.tsx` 的 `Nav()`：透明整条 → `bounded-glass-surface` 胶囊，Motion `layoutRoot` + `layout`。
- `<project>/web/src/components/ui/glass-surface.css`：`@supports` / `prefers-contrast` / `forced-colors` / `prefers-reduced-motion` 四路降级。

**相邻资产（别混用）**
- 点按展开的岛式 chrome（相机/画布玩具、底部 HUD）→ [`atomic-island-chrome.md`](./atomic-island-chrome.md)。那边是**用户驱动**的 expand/collapse，这边是**滚动驱动**的几何收缩。
- 剪影层滤镜 + 内容层清晰的液滴融合 → [`liquid-gooey-micro-interactions.md`](./liquid-gooey-micro-interactions.md)。
- 玻璃材质的项目级核对记录（surface/content 分层、Chromium-only refraction 的边界）→ [`../design/glass-motion-landscape/verification.md`](../design/glass-motion-landscape/verification.md)。

---

## 1. 流程（按序，终点怎么判）

1. **先判要不要用**（§2 的 8 条判据）。过不了就停在“实色 + hairline + 滚动阴影”，不要为玻璃写代码。
2. **定档位**：A（CSS `backdrop-filter`）/ B（SVG 位移折射）/ C（WebGL/WebGPU）。默认 A；B 只在小面积、背景下是图像/视频时做增强；C 不用于导航。
3. **定几何策略**：优先“**不插值几何**”——展开态透明无外框，宽度变化本来就看不见；只插值 `padding-inline` / `gap` / 材质不透明度。
4. **定状态来源**：IntersectionObserver 哨兵，不用 `scrollY > N`（§3）。
5. **算对比度**：按最坏背景（纯黑 / 纯白两极）做 alpha 合成，正文 ≥ 4.5:1（§5.1）。算不过就加 scrim 或提 alpha。
6. **写四路降级**：`@supports not`、`prefers-contrast: more`、`forced-colors: active`、`prefers-reduced-motion: reduce`（§5.4）。
7. **终点判定**：见 §7 验收清单全绿；构建通过、截图“看着挺像”都不算。

---

## 2. 何时用 / 何时不用

| 用 | 不用 |
|---|---|
| 长 landing / 内容页，正文会从导航下方滚过 | 只有 2–3 个链接、下面没有内容滚过 → 玻璃没有功能收益 |
| 首屏背景是图像 / 深色 / 彩色渐变 | 首屏是纯白或单一浅色大区块 → 玻璃看起来像“灰雾” |
| 胶囊下方是留白、图片、卡片边距 | 胶囊下方会滚过正文、表格、表单 → 可读性成本高于收益 |
| 需要“轻、浮、有层次”的品牌调性 | 医疗 / 政务 / 金融等需截图取证或对比度有硬要求的场景 |
| 目标机型覆盖中高端 + 现代浏览器 | 主力是中低端 Android / iOS < 18 → 大多数人看到的是降级实色 |

**Apple 侧的硬边界（拿来做设计合同，不要越界）**：Liquid Glass 只允许出现在 **功能层（navigation / controls）**，`Don't use Liquid Glass in the content layer`；`always avoid glass on glass`；两种变体 `should never be mixed`。出处：HIG Materials <https://developer.apple.com/design/human-interface-guidelines/materials>、WWDC25/219 <https://developer.apple.com/videos/play/wwdc2025/219/>（2025）。

**八条“别用”判据（任一命中就退回实色）**
1. 导航不是“浮在内容上”，而是页面布局的一部分。
2. 玻璃下方会滚过正文/表格/表单。
3. 玻璃下方是自己另一层玻璃（glass on glass）。
4. 对比度预算不足：无法加 scrim、也无法把 tint 提到 60%+。
5. 需要 `forced-colors` / 打印 / 截图存档作为常态使用路径。
6. 首屏 LCP 敏感，且主要流量来自 iOS Safari。
7. 页面上已经有多个 `filter` / `backdrop-filter` / WebGL 面。
8. 收缩态需要缩小点击区才能放得下（触控目标会掉到下限以下）。

---

## 3. 状态机：滚动驱动怎么才不抖

```
expanded（默认：整条、透明、无材质）
  → pill（越过顶部阈值：材质淡入 + 内边距收紧）
  → expanded（回到顶部）
```

**机制优先级**

| 机制 | 写法 | 为什么 |
|---|---|---|
| **① IntersectionObserver 哨兵（默认）** | 顶部 1px 哨兵 + `rootMargin: '-48px 0 0 0'`；`isIntersecting === false` → pill | 只在“跨越”时触发一次，天然无抖动；不挂 `scroll` 监听 |
| ② 滞回阈值 | `scrollY > 56` → pill；`scrollY < 24` → expanded；中间死区 | 必须用 scroll 时的兜底；iOS 橡皮筋回弹会来回穿越单阈值 |
| ③ CSS 滚动驱动动画 | `animation-timeline: scroll(root block)` 调 `--p` | 零 JS、与滚动同帧；但支持面有限（Chrome 115 / Safari 26 / Firefox 159，BCD 2026-10-21），只能做增强 |
| ④ Motion `layout` | 两个 class 间切换，Motion 用 transform 补间 | 见 §4；用 scale 实现，会拉伸 hairline 与子元素 |

**必做**：`data-state` 只写一个属性；不要每次 scroll 变化都 `setState`（滚动期重渲染 + blur 重采样叠加）。

**状态转移表**

| 当前 | 触发 | 下一个 | 副作用 |
|---|---|---|---|
| `expanded` | 哨兵离开视口 | `pill` | 材质 `opacity 0→1`；`padding-inline 24→12`；`gap` 收紧 |
| `pill` | 哨兵回到视口 | `expanded` | 反向；fixed 元素不触发页面重排 |
| 任意 | 视口 < 640px | 保持 | `--nav-max-w: 100%`、`--nav-gutter: 8px` |
| 任意 | `prefers-reduced-motion: reduce` | 保持 | `--nav-dur: 0.01ms` |
| 任意 | 打印 | 隐藏 | `@media print { [data-glass-nav] { display: none } }` |

---

## 4. 与 Framer / Motion `layout` 的取舍

一手依据：<https://motion.dev/docs/react-layout-animations>

- **`layoutRoot` 是必需的**（导航是 `position: fixed`）：“To correctly animate layout within fixed elements, we need to provide them the `layoutRoot` prop.”
- **`layout` 用 `transform: scale()` 实现**，官方明说会失真：“can sometimes visually distort children or certain CSS properties.”
- **`border` 会被拉伸**：“Elements with a border may look stretched during the animation … border can't render smaller than 1px, which limits the degree of scale correction.” → **hairline 用 `inset box-shadow` 画，不用 `border`**。
- **`border-radius` / `box-shadow` 的 scale 校正只在 `style` 上生效**，写在 class 里不校正。
- 滚动条出现/消失会误触发布局动画 → `html { scrollbar-gutter: stable }`（Chrome 94 / Safari 18.2 / Firefox 97）。
- 横向 resize 期间布局动画会被禁用；`display: inline` 元素不生效。

**取舍结论**

| 场景 | 选 |
|---|---|
| 已有 `motion` 依赖、要做真正的形状 morph（圆角 48px→9999px、宽度真的变） | Motion `layout`，但 hairline 换 `box-shadow`、圆角写 `style` |
| 只要“透明整条 → 小胶囊”的观感 | **不插值几何**：材质层独立淡入 + 内边距过渡，纯 CSS，无 layout 动画 |
| 需要零 JS | CSS 滚动驱动动画（§3 ③），并保留 JS 分支作为 fallback |

**坑**：`backdrop-filter` 元素自身或它的祖先带 `will-change: opacity/transform`、`opacity < 1`、`filter`、`mask`、`clip-path`、**`isolation: isolate`** 时，会变成 **backdrop root**，模糊只采样到父级内部，看起来“blur 没生效”（2026-10 实测：给胶囊加 `isolation: isolate` 后 `backdrop-filter` 计算值仍在，但渲染完全无模糊；移除即恢复）。Framer 的入场 `opacity: 0 → 1` 若跑在玻璃的祖先上，动画期间玻璃是错的。（MDN，backdrop root 一节）

---

## 5. 配方（可直接抄）

### 5.1 结构

```html
<a class="nav-skip" href="#main">跳到主内容</a>

<header class="glassnav" data-state="expanded">
  <div class="glassnav-shell">
    <span class="glassnav-material" aria-hidden="true"></span>
    <a class="glassnav-brand" href="/">…</a>
    <nav class="glassnav-links" aria-label="主要">…</nav>
    <div class="glassnav-actions"><a class="glassnav-cta" href="/login">进入</a></div>
  </div>
</header>

<main id="main">…</main>
<div class="nav-sentinel" aria-hidden="true"></div>
```

材质单独一层（`.glassnav-material`）与布局解耦：能独立降级、独立淡入、独立关闭。

### 5.2 CSS 变量 + 分支

```css
:root {
  --nav-h: 48px;
  --nav-max-w: 40rem;
  --nav-gutter: 12px;
  --nav-safe-top: env(safe-area-inset-top, 0px);

  --nav-tint: oklch(1 0 0);
  --nav-tint-a: 62%;          /* 决定最坏对比度，先算再调 */
  --nav-blur: 18px;
  --nav-sat: 150%;
  --nav-hi-a: 45%;            /* 顶部内高光 */
  --nav-hair: 12%;
  --nav-shadow: 0 8px 24px -12px rgb(0 0 0 / .35);

  --nav-solid: oklch(0.99 0.005 85);   /* 降级实色 */
  --nav-fg: oklch(0.22 0.02 60);
  --nav-focus: oklch(0.55 0.18 255);

  --nav-dur: 180ms;
  --nav-ease: cubic-bezier(.32, .72, 0, 1);
}
@media (prefers-color-scheme: dark) {
  :root { --nav-tint: oklch(0.24 0.015 60); --nav-tint-a: 70%; --nav-hi-a: 10%; --nav-hair: 18%;
          --nav-solid: oklch(0.18 0.01 60); --nav-fg: oklch(0.96 0.005 85); }
}
html { scrollbar-gutter: stable; }
:root { scroll-padding-top: calc(var(--nav-h) + 16px + var(--nav-safe-top)); }

.glassnav {
  position: fixed; inset-block-start: 0; inset-inline: 0; z-index: 40;
  display: grid; place-items: center;
  padding-block-start: max(var(--nav-gutter), var(--nav-safe-top));
  padding-inline: var(--nav-gutter);
  pointer-events: none;            /* 不拦滚动条与手势 */
}
.glassnav-shell {
  position: relative; isolation: isolate; pointer-events: auto;
  display: flex; align-items: center; gap: 8px;
  width: min(100%, var(--nav-max-w)); min-height: var(--nav-h);
  padding-inline: 24px; border-radius: 999px; color: var(--nav-fg);
  transition: padding-inline var(--nav-dur) var(--nav-ease), gap var(--nav-dur) var(--nav-ease);
}
.glassnav[data-state="pill"] .glassnav-shell { padding-inline: 12px; gap: 12px; }

.glassnav-material {
  position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  background: color-mix(in oklab, var(--nav-tint) var(--nav-tint-a), transparent);
  box-shadow:
    inset 0 0 0 1px color-mix(in oklab, currentColor var(--nav-hair), transparent),  /* hairline：不用 border */
    inset 0 1px 0 0 color-mix(in oklab, white var(--nav-hi-a), transparent),
    var(--nav-shadow);
  opacity: 0; transition: opacity var(--nav-dur) var(--nav-ease);
  /* 不写 will-change：会把自己变成 backdrop root */
}
.glassnav[data-state="pill"] .glassnav-material { opacity: 1; }

@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glassnav-material {
    backdrop-filter: blur(var(--nav-blur)) saturate(var(--nav-sat));
    -webkit-backdrop-filter: blur(var(--nav-blur)) saturate(var(--nav-sat));
  }
}

/* 降级 1：不支持 blur → 实色 */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glassnav-material {
    background: var(--nav-solid);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, currentColor 18%, transparent), var(--nav-shadow);
  }
}
/* 降级 2：减少透明度 / 提高对比度（合并写，Safari 只认后者，见 §6） */
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .glassnav-material { backdrop-filter: none; -webkit-backdrop-filter: none; background: var(--nav-solid); }
}
@media (prefers-contrast: more) { .glassnav-material { box-shadow: inset 0 0 0 2px currentColor; } }
/* 降级 3：强制颜色 */
@media (forced-colors: active) {
  .glassnav-material { display: none; }
  .glassnav-shell { background: Canvas; color: CanvasText; border: 1px solid ButtonText; }
}
/* 降级 4：动效 */
@media (prefers-reduced-motion: reduce) { .glassnav-shell, .glassnav-material { transition-duration: 0.01ms; } }
/* 打印 */
@media print { .glassnav, .nav-skip { display: none; } }

.nav-skip {
  position: fixed; z-index: 100; inset-block-start: 8px; inset-inline-start: 8px;
  transform: translateY(-160%); padding: 10px 14px; border-radius: 10px;
  background: var(--nav-solid); color: var(--nav-fg);
}
.nav-skip:focus-visible { transform: none; }

.glassnav-shell :is(a, button):focus-visible {
  outline: 2px solid var(--nav-focus); outline-offset: -2px; border-radius: 8px;  /* 内缩，避免被圆角裁掉 */
}
```

### 5.3 JS（约 25 行）

```js
const nav = document.querySelector('.glassnav');
const sentinel = document.querySelector('.nav-sentinel');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (reduced.matches) nav.style.setProperty('--nav-dur', '0.01ms');
reduced.addEventListener?.('change', e => nav.style.setProperty('--nav-dur', e.matches ? '0.01ms' : '180ms'));

new IntersectionObserver(([entry]) => {
  const next = entry.isIntersecting ? 'expanded' : 'pill';
  if (nav.dataset.state !== next) nav.dataset.state = next;
}, { rootMargin: '-48px 0px 0px 0px', threshold: 0 }).observe(sentinel);
```

`.nav-sentinel { position: absolute; inset-block-start: 48px; inset-inline-start: 0; width: 1px; height: 1px; }`

---

## 6. 三档实现与硬边界

| | A：CSS `backdrop-filter` | B：SVG `feDisplacementMap` | C：WebGL / WebGPU |
|---|---|---|---|
| 有真折射 | ✗（只是“雾”+ 高光） | ✓ 边缘可见 | ✓✓ |
| 渲染成本 | 中，**随面积线性** | 中高（每帧滤镜链） | 高（每帧 + 纹理上传） |
| 文本可读性 | 可控 | 位移会波及玻璃下方正文 | 差（内容要么变纹理，要么离开 DOM） |
| Safari / Firefox | ✓（Safari 18 起无前缀） | 位移**不可见**（两个仓库自述） | Safari 有已知问题 |
| 降级难度 | 低（`@supports` 一行） | 中（Chromium-only 分支） | 高 |
| 许可 / 维护 | 原生，无依赖 | MIT，最新库 2025-06 起停更 | MIT，`0.0.x`，2026 新库 |
| 该放哪 | 导航、toolbar、popover | 图像/视频上的小控件 | demo、hero 装饰 |

**B 档的机制实况**：`shuding/liquid-glass`（1.2k★，MIT，2026-03-26）核心就一句
`backdrop-filter: url(#filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`，`#filter` 内是 `feImage`（canvas 生成的圆角矩形位移图）+ `feDisplacementMap`（R/G 通道）。它随指针重算位移图 → 每帧重采样。
兼容自述：`rdev/liquid-glass-react`（6.4k★，MIT，最近 push 2025-06-13，npm 月下载 157,303 次 @2026-10-18）README 原文 “**Safari and Firefox only partially support the effect (displacement will not be visible)**”；`archisvaze/liquid-glass`（807★，MIT）表格直接标 SVG 版 **Chrome / Chromium only**。
→ **B 档不是“能不能”，是“值不值得为折射付这个价”**；玻璃下面会滚过正文时不用。

**C 档的根部代价**：着色器只能折射纹理。要折射页面内容，要么 DOM 截图（内容变位图，选择/缩放/a11y 全退化），要么把内容搬进 canvas（SEO/a11y/表单重做）。`Glass-HQ/liquid-glass`（456★，MIT，2026-10-20）用 WebGPU 做到了组件形态，但 README 自述需要 **WebGPU adapter + HTTPS**，且 “**Safari has known rendering issues**”。
→ **导航胶囊不要上 WebGL**；真要“最像”，只在 hero 的静态装饰上跑一次 shader。

**iOS / macOS WebKit 性能边界（有 bug 号，2026 仍在发生）**
- `bugs.webkit.org` **319187**（2026-07-12，iOS 26.4 / iPhone 17）：大面积 `position: fixed` + `filter: blur(100–200px)` 导致首帧停滞约 20s。
- **316769**（2026-06-10）：Safari 26 的 CoreGraphics 滤镜路径让 `filter`/`backdrop-filter` blur paint >10s，duplicate 到 **315118**，对 `stdDeviation` 做了 clamp。
- **228312**（2021-07-26，2026-01 被再次评论“iOS 26.2 复现”）：大半径 blur 长期是雷。
- 官方提醒（WebKit 2015）：backdrop 效果 “forces the engine to perform more rendering passes”，要 “only use this feature where it is most necessary”。

**可执行结论**：① 面积是唯一可控旋钮，胶囊尺寸（≤48px 高、≤40rem 宽）是安全区，**全宽大高度玻璃条是危险区**；② blur 半径 ≤24px；③ 别把玻璃铺在有持续动画的背景上；④ 导航不要放进 top layer（`dialog`/`popover`），玻璃放内部容器。

---

## 7. 可访问性硬线

### 7.1 对比度：按最坏背景算，不靠肉眼

```
有效背景 = α·玻璃 tint + (1−α)·背景
最坏对比度 = min( ratio(文字, 有效背景 given 背景=黑), ratio(文字, 有效背景 given 背景=白) )
正文 ≥ 4.5:1；≥24px 或 ≥18.66px bold ≥ 3:1（WCAG 2.2 SC 1.4.3）
```

```js
const lum = ([r,g,b]) => { const f = c => (c/=255, c<=0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4);
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
const ratio = (a,b) => { const [x,y] = [lum(a),lum(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };
const over = (fg,a,bg) => fg.map((c,i) => c*a + bg[i]*(1-a));
const worst = (text,tint,a) => Math.min(ratio(text,over(tint,a,[0,0,0])), ratio(text,over(tint,a,[255,255,255])));
```

`blur` 不能替代对比度：它只把背景平均化，白底黑字滚过时玻璃下仍是灰白。算不过 → 提 `--nav-tint-a` 或加局部 scrim。

### 7.2 聚焦 / 触控 / 滚动

- 聚焦环：`outline` 会被大圆角 + `overflow: hidden` 裁掉 → `outline-offset: -2px`；焦点环本身要 3:1（SC 1.4.11）。
- 固定导航遮挡焦点内容 = **WCAG 2.2 SC 2.4.11 Focus Not Obscured (Minimum)**：`scroll-padding-top` 必须给足，锚点与 `focusin` 跳转才不会把目标顶到胶囊后面。
- 触控目标：**SC 2.5.8 ≥ 24×24 CSS px（AA 下限）**；设计舒适值 44×44。**收缩态最容易违规**——几何缩小、命中区不缩（伪元素 `inset: -8px` 外扩）。相邻链接间距 ≥ 8px。
- 不吃滚动/手势：包裹层 `pointer-events: none` + 胶囊 `pointer-events: auto`；不要 `touch-action: none` / `overscroll-behavior: contain`；全宽形态给滚动条留位置。
- skip-link：必须是第一个可聚焦元素，`z-index` 高于导航，用 `translateY` 隐藏而不是 `display: none`。

### 7.3 系统偏好：一个必须知道的漏洞

| 媒体查询 | Chrome | Safari | Firefox |
|---|---|---|---|
| `prefers-reduced-motion` | 74 | 10.1 | 63 |
| `prefers-contrast` | 96 | 14.1 | 101 |
| `forced-colors` | 89 | 16 | 89 |
| **`prefers-reduced-transparency`** | 118 | **不支持** | 113 |

（mdn/browser-compat-data，2026-10-21 读数）→ **只写 `prefers-reduced-transparency` 会在 Safari 上整条失效**，而 Safari 恰好是 blur 风险最高的内核。做法：`@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)` 合并写，并额外提供一个显式 UI 开关（存 `localStorage`）。

---

## 8. 验收清单

**材质与范围**
- [ ] 玻璃只出现在导航 shell；内容层（正文、表格、卡片）没有玻璃。
- [ ] 同一可见层级没有 glass-on-glass；菜单/抽屉打开时不再叠第二块玻璃。
- [ ] hairline 由 `inset box-shadow` 绘制，不是 `border`（避免 layout 动画拉伸）。
- [ ] 材质层没有 `will-change`，祖先链上没有 `opacity < 1` / `filter` / `mask` / `clip-path`。

**状态**
- [ ] 收缩由哨兵/滞回驱动，不是单阈值 `scrollY > N`；滚动过程无 setState 抖动。
- [ ] 子元素在过渡中不缩放、不失真、文字不抖；1px 线宽全程稳定。
- [ ] 窄屏（390×844）与 `env(safe-area-inset-top)` 正确；刘海屏/PWA 不贴边。

**可访问性**
- [ ] 最坏背景（纯黑/纯白、白底正文、深色图）三处各截一帧，正文对比度 ≥ 4.5:1。
- [ ] 模糊真的在渲染（截图比对玻璃下的内容是否被软化），而不是只看到 `backdrop-filter` 有计算值；后台标签页里截不到滚动状态时先切到可见标签再验收。
- [ ] 键盘 Tab 一圈：焦点环可见、不被圆角裁切、不被胶囊遮挡。
- [ ] 收缩态点击区 ≥ 24×24 CSS px（舒适值 44）。
- [ ] `prefers-contrast: more` / `forced-colors: active` / `prefers-reduced-motion: reduce` 三态实测；Safari 下确认降级真的生效（不是只写了 PRT）。
- [ ] skip-link 在最前、聚焦可见、层级高于导航。

**性能与边界**
- [ ] 玻璃面积有上限（高度 ≤48px、宽度 ≤40rem）；不存在全宽 × 大高度玻璃条。
- [ ] `blur` ≤24px；过滤效果可整体关闭。
- [ ] iOS Safari 真机：首屏无 >1s 空白、快速滚动无掉帧；如做不到，退回实色而不是继续调参。
- [ ] 不支持 `backdrop-filter` 时视觉仍成立（`@supports not` 分支截图）。
- [ ] 打印预览无玻璃、无遮挡。

---

## 9. 来源（按证据强度）

1. HIG **Materials**（禁止项原文）— <https://developer.apple.com/design/human-interface-guidelines/materials>
2. WWDC25/219 **Meet Liquid Glass**（lensing / 分层 / 禁止 glass-on-glass）— <https://developer.apple.com/videos/play/wwdc2025/219/>
3. **Adopting Liquid Glass**（scroll edge effect、可访问性测试要求）— <https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass>
4. MDN **backdrop-filter**（backdrop root 陷阱、Baseline 2024）— <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter>
5. WebKit bugs **319187 / 316769 / 228312**（iOS blur 卡顿，2026）— <https://bugs.webkit.org/show_bug.cgi?id=319187>
6. WebKit **Introducing Backdrop Filters**（2015，官方性能提醒）— <https://webkit.org/blog/3632/introducing-backdrop-filters/>
7. Motion **Layout animations**（`layoutRoot`、scale 拉伸、border 限制、`scrollbar-gutter`）— <https://motion.dev/docs/react-layout-animations>
8. WCAG 2.2 Understanding **1.4.3 / 1.4.11 / 2.4.11 / 2.5.8** — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>

外部仓库快照（2026-10-21，会变）：`shuding/liquid-glass` 1.2k★ MIT；`rdev/liquid-glass-react` 6.4k★ MIT，npm 月下载 157,303（2026-09-19→10-18）；`archisvaze/liquid-glass` 807★ MIT；`Glass-HQ/liquid-glass` 456★ MIT。
