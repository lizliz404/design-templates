# Glass motion landscape - verification

> 核验状态：静态研究完成，未做浏览器、Playwright、Chromium、GPU 或帧率实测。
>
> 核验日期：2026-10-09
>
> 交付范围：核对历史研究中的事实、候选机制和当前 app 的安全落点。本文不改产品代码、不改全局 theme、不安装依赖，也不把研究结论写成产品实施结论。

## 结论

当前可以复用的是一组机制，而不是一个已经验证的“Liquid Glass 组件库”：

- 基础材质使用 `backdrop-filter` 的 blur/saturate，加半透明底色、边框和清晰的降级面。
- 动画使用当前已有的 Motion `layout` 和受控 spring；形状层与内容层分开，文字和图标不随容器缩放。
- 液态形变可以参考 FluidKit 的 SVG/metaball 几何和普通 blur fallback，但本轮没有证明它适合直接成为当前 app 的依赖。
- Chromium-only 的 refraction 不应成为功能或可读性的前提。Safari、Firefox、forced colors、较弱设备和关闭透明效果时，都必须仍然得到可用的实心或普通 blur 表面。

本轮建议最多保留两个具体 app 表面作为后续静态验收范围；这是研究建议，不是扩大产品改动范围的授权：

1. Landing 的收缩导航胶囊：`chuhai-cloud/web/src/landing/hero.tsx` 中的 `Nav`。
2. Radix Tooltip 的浮层内容：`chuhai-cloud/web/src/components/ui/tooltip.tsx` 中的 `TooltipContent`。

这两个表面分别代表 chrome 和短内容 overlay。数据卡、表格、表单面板、Hero 假 UI、卫星内容卡和叠加的玻璃层不在本轮建议范围内。

## 历史结论纠偏

`sources.md` 是历史记录，原文完整保留；下面的纠偏不回写历史文件。

| 历史表述 | 核验后的表述 |
| --- | --- |
| “2025-2026 行业最佳实践”或全行业都在采用 | 不能从 Apple 的系统设计发布或少数 Web 项目推出全球、行业绝对的最佳实践。当前项目只采纳与自身材质合同相容的局部机制。 |
| Android 版 X、Telegram 等产品已经证明了同一套实现 | 本轮没有对这些产品做可复现的版本、平台或源码核验。Telegram 的设计意图也没有证据支撑，不再作为事实或设计理由。 |
| 所有浏览器都会把 SVG refraction 优雅降级为 blur | 不能泛化。FluidKit 的实现明确把 refraction 标为 Chromium-only 并提供普通 blur 路径；实际 app 仍需 feature detection 和静态 fallback。 |
| FluidKit 使用 SDF，所有 liquid glass 都是同一类底层解法 | 本轮确认的 FluidKit 几何代码是 SVG path/metaball 几何，不把它扩写成已验证的 SDF 或 WebGL 实现。不同库的滤镜、几何和渲染路径不能混称。 |
| 历史列出的库名都可直接采用 | `liquid-glass-react`、`glass-refraction`、`hyalite`、`Glin UI`、`OpenGlass UI`、`Intelli UI` 等只作为历史名称，本轮状态为 `unknown`，未列为候选，也未安装或推荐。 |

## 候选核验

候选数固定为三个，不继续扩列。

| 候选 | 已核对内容 | 可复用部分 | 明确边界 | 决定 |
| --- | --- | --- | --- | --- |
| 当前 `motion/react` + 本地 Radix/shadcn | `web/package.json` 已有 `motion` `^12.42.2`、React 19 和 Radix primitives。`hero.tsx` 的 `Nav` 使用 `motion.nav layout` 与 `stiffness: 300, damping: 32`；`ui.tsx` 已有 reduced-motion hook 和 Motion helper。 | 直接复用 `layout`、内容状态的 opacity/位移、现有 token、现有 Radix overlay 结构；不新增运行时依赖。 | 当前代码里的 spring 不自动等于“无 bounce”或已通过可访问性验收；`layoutId`/shared-element 只可按 Motion 文档作为后续机制，不能声称当前 Nav 已经实现 shared element。 | **首选基线**。 |
| [runvendo/fluidkit](https://github.com/runvendo/fluidkit) | 核验 tree commit [`b1e6e6109e14c31ed43a99e2a373f4727c867ecb`](https://github.com/runvendo/fluidkit/tree/b1e6e6109e14c31ed43a99e2a373f4727c867ecb)。仓库 package version 为 `0.5.0`；peer 需要 `motion >=11`、React 18+，`@paper-design/shaders-react` 为可选 peer。`src/liquid/geometry.ts` 为 SVG/metaball 几何，`useMotionSprings.ts` 使用 Motion spring，`MorphSurface.tsx` 分开 surface/content 并在 reduced motion 时 snap，`refraction.tsx` 明确 Chromium-only 并提供普通 blur fallback。 | 参考 surface/content 分层、几何计算、spring 的边界和 fallback 思路；若只借鉴源码结构，应保持当前 Radix 和设计 token。 | Chromium-only refraction 不是当前 app 的跨浏览器合同；本轮没有做安装、bundle、浏览器或性能验证；不能把仓库的 fallback 说明当成当前项目已验证的 fallback。 | **研究参照，不安装**。 |
| [liqui.design](https://liqui.design/) / [leefanv/liqui-design](https://github.com/leefanv/liqui-design) | 官网和 repo 说明其组件通过 shadcn registry 写入项目，基础层是 Base UI；其 refraction 也明确为 Chromium-only，其他浏览器退回 frosted blur。实际 kernel 位于 `packages/glass/package.json`，npm 包为 `@liqui-design/glass` `0.4.0`，peer 主要是 React `^18 || ^19`。 | 只参考其“渐进增强 + blur fallback”的产品边界，以及把 glass 作为可替换表面的做法。 | Base UI 与当前项目的 Radix primitives 不是同一实现，不能宣称“兼容当前 Radix”；registry 写入式安装和 refraction kernel 都未经本项目验证。 | **对照资料，不安装**。 |

### 复用优先级

1. 先用当前 CSS `.glass`、`bg-popover`、现有 Motion 和 Radix，证明两处安全表面的静态状态和降级状态。
2. 只有基础材质确实不足，才单独评估 FluidKit 的几何机制；refraction 必须是可关闭的增强层。
3. 不因 Liqui 的 registry 形态或 Base UI API 重新组织当前组件树，也不把第三方 refraction 当作设计系统基础。

## 当前 app 证据

### Surface A: Landing 导航胶囊

文件：`/home/ubuntu/dev/chuhai-cloud/web/src/landing/hero.tsx:29-73`

- `Nav` 是固定在页面顶部的 chrome，不是数据内容面。
- 未滚动时是透明导航；滚动后切换为 `.glass mt-3 ... rounded-full ... bg-popover` 的胶囊。
- `motion.nav` 已有 `layout`，现有 transition 是 `stiffness: 300, damping: 32`。
- 适合验证“容器形状/尺寸变化，内容保持清晰”的机制；不适合把导航里的文字和图标做整体缩放。
- 这里的研究建议只覆盖导航 shell。Hero 假 UI 和其中的数据样式不因此获得 glass 资格。

### Surface B: Tooltip overlay

文件：`/home/ubuntu/dev/chuhai-cloud/web/src/components/ui/tooltip.tsx:5-53`

- 文件注释已经把它限定为 overlay chrome，并要求短内容、不放到 data card。
- `TooltipContent` 通过 Radix Portal 渲染，当前使用 `.glass`、`bg-popover`、边框和短时进出动画。
- 这是比数据卡更安全的验证面：尺寸小、内容短、不会承载业务表格或表单；仍需保持键盘 focus、碰撞定位和可读性。
- 后续若验证折射，Tooltip 只能把它当作增强，不得依赖背景细节来传达文字或状态。

### 明确排除的现有用法

- `hero.tsx:194-204` 的 `Satellite` 目前也使用 `.glass`，但它是浮动内容卡；本研究不把它列入安全表面，也不以现状反推设计合同已允许它。
- `dialog.tsx`、`sheet.tsx`、`dropdown-menu.tsx` 已有不同的 glass overlay 实现，但本轮不把整个 overlay 家族扩成第三、第四个落点。尤其 `DialogOverlay` 还带 `backdrop-blur-[1px]`，不能在没有层级检查时继续叠加滤镜。

## 可复用机制与不可复用宣称

| 机制 | 可以带入当前项目的内容 | 不能带入的宣称 |
| --- | --- | --- |
| Blur/saturate | 半透明 `bg-popover` 或 chrome token、细边框、内侧高光、普通 blur fallback。 | 不能保证每个浏览器都有相同的滤镜质量，不能把 blur 当成免费操作。 |
| Motion layout/spring | 导航 shell 的尺寸和位置过渡；内容层用 opacity 或小幅位移；`useReducedMotion` 后进入稳定状态。 | 不能把任意 spring 称为自然、无 bounce 或高帧率；没有视觉或运行时测试就不能声称性能。 |
| Surface/content 分层 | 玻璃形状层独立于文字、图标和交互内容；内容不随 surface scale。 | 不把“内容不缩放”扩写成库已经解决所有 morph、焦点或响应式问题。 |
| SVG/metaball 几何 | 仅作为 FluidKit 的源码研究方向，未来可做静态原型。 | 不把 FluidKit 的几何称为已验证 SDF、WebGL 或跨浏览器方案。 |
| Refraction | 只作为可选 enhancement；失败时显示普通 blur 或不透明 popover。 | 不把 Chromium-only path 作为业务必需；不宣称 Safari/Firefox/低端设备已实测。 |

## 静态验收清单

以下项目在任何产品改动前都必须逐项满足。它们是验收标准，不是本轮已完成的实现。

### 材质和范围

- [ ] glass 只出现在 Surface A 的导航 shell 或 Surface B 的 Tooltip overlay；不覆盖表格、指标、表单、列表、数据卡或 Hero 假 UI。
- [ ] 同一可见层级不出现 glass-on-glass；一个 overlay 打开时不再引入第二个玻璃面作为装饰。
- [ ] 内容层使用不透明度、轻微位移或交叉淡入；文字和图标不随容器做整体缩放。
- [ ] 保持 `DESIGN.md` 的米黄纸 content-card、单一 sea 功能色、radius ladder 和无 bounce 约束；不改全局 theme。
- [ ] 玻璃表面拥有普通颜色、边框和文字对比度，即使背景没有纹理或没有透射细节也能读懂。

### 动效和无障碍

- [ ] `prefers-reduced-motion: reduce` 下取消 spring 位移、连续 morph 和装饰性 refraction，直接呈现稳定状态；已有全局 CSS 规则和 `usePrefersReducedMotion` 只能作为基础，不能替代逐表面检查。
- [ ] `prefers-contrast: more` 下不依赖透明度区分边界，提升边框、文字和 focus indicator 的可见度。
- [ ] `forced-colors: active` 下使用系统颜色和可见边框，不能让半透明背景或阴影成为唯一层级线索。
- [ ] 对“减少透明效果”的需求提供明确的实心 `bg-popover`/solid surface 路径；不把尚未验证的浏览器媒体查询当作唯一开关。
- [ ] Tooltip 仍支持键盘 focus、焦点可见、短文案和碰撞边距；动画不阻塞交互。

### 浏览器和性能边界

- [ ] 通过 `@supports` 或运行时 feature detection 将 `backdrop-filter`、SVG filter 和 refraction 分层；不支持时回到不透明表面或普通 blur。
- [ ] 不使用每帧 `feTurbulence`、大面积连续 backdrop blur 或不受控的滤镜动画；增强效果应能整体关闭。
- [ ] 不报告 FPS、GPU 成本、Safari/Firefox 兼容性或低端设备体验，除非另有真实设备/浏览器测试记录。
- [ ] 不新增 FluidKit、Liqui 或其他 registry 依赖；当前基线足以完成第一轮静态验收。

## 当前缺口与可疑项

- `DESIGN.md` 明确规定 glass 属于 chrome/overlay，content-card 是米黄纸且无 blur；见 `DESIGN.md:122-145`、`DESIGN.md:163-176`、`DESIGN.md:240-246`。
- `web/src/index.css:8-13` 的旧注释写成“表面一律半透明磨砂”，但实际 token 和 `.glass` 规则把 card 与 glass 分开；这与 `DESIGN.md` 存在表述不一致。本轮只记录，不改 CSS。
- `web/src/index.css:259-269` 有全局 reduced-motion 规则，但在本轮读取范围内没有发现对应的 `prefers-contrast`、`forced-colors` 或减少透明效果的明确产品 fallback。验收时必须补足行为或明确由上层 solid surface 处理。
- `web/src/landing/hero.tsx` 的现有 Nav spring 和其他 Landing 动效是已有实现，不等于已经满足“无 bounce”合同；任何后续改动都要以视觉稳定状态和 reduced-motion 状态重新核对。
- 本轮未运行 `npm install`、`npm run build`、`npm run typecheck`、Playwright、浏览器或 GPU 测试。原因是任务只要求轻量静态研究，并明确禁止这些验证。

## 证据与链接

### 本地文件

- 历史原文：[`sources.md`](./sources.md)。核验前 SHA-256：`6d9e8fe59d38500a123fa3e57889bcee1f1fc7be3f781aa7e85497b3baa1979d`。
- 视觉合同：`/home/ubuntu/dev/chuhai-cloud/DESIGN.md`。
- 当前 token 和 `.glass`：`/home/ubuntu/dev/chuhai-cloud/web/src/index.css`。
- Landing Nav 和现有 Motion：`/home/ubuntu/dev/chuhai-cloud/web/src/landing/hero.tsx`。
- Landing reduced-motion helper：`/home/ubuntu/dev/chuhai-cloud/web/src/landing/ui.tsx`。
- Radix Tooltip overlay：`/home/ubuntu/dev/chuhai-cloud/web/src/components/ui/tooltip.tsx`。
- 当前依赖清单：`/home/ubuntu/dev/chuhai-cloud/web/package.json`。

### 官方和上游资料

- Apple WWDC25 session 219：<https://developer.apple.com/videos/play/wwdc2025/219/>
- MDN `backdrop-filter`：<https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter>
- MDN `blur()`：<https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur>
- MDN SVG `feDisplacementMap`：<https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap>
- MDN `filter`：<https://developer.mozilla.org/en-US/docs/Web/CSS/filter>
- MDN `prefers-reduced-motion`：<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion>
- MDN `prefers-contrast`：<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast>
- MDN `forced-colors`：<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors>
- Motion layout animations：<https://motion.dev/docs/react-layout-animations>
- Motion reduced motion：<https://motion.dev/docs/react-use-reduced-motion>
- FluidKit repository：<https://github.com/runvendo/fluidkit>
- Liqui design site：<https://liqui.design/>
- Liqui design repository：<https://github.com/leefanv/liqui-design>

上述资料只支持本文写出的具体边界。页面摘要、历史名称或未运行的代码不能被解释成跨浏览器、性能或产品最佳实践证明。
