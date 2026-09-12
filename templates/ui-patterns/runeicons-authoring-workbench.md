---
name: runeicons-authoring-workbench
description: >-
  Decision and intake guide for Runeicons as an icon authoring workbench:
  reshape SVG paths, tune stroke/color/effects/motion, and export SVG or JSX.
  Use beside Iconoir when a product needs a small authored semantic set; do not
  treat the current WIP private packages as a production icon dependency.
---

# Runeicons authoring workbench

类型：icon authoring candidate（不是 vendored icon pack）  
上游：[rune-icon/runeicons](https://github.com/rune-icon/runeicons) · [runeicons.com](https://runeicons.com/) · Apache-2.0  
核验版本：`f649e467d1bc9f272aae3f8daa329d4c924e7340`（2026-09-12）。旧 URL `Nexvyn/runeicons` 当前指向同一仓库内容；记录 canonical owner 时用 `rune-icon/runeicons`。

## 决策：与 Iconoir 平级，但分工不同

| 一等候选 | 负责什么 | 现在能否直接作为运行时依赖 |
|---|---|---|
| **Iconoir** | 稳定、广覆盖的产品 chrome；普通 nav / toolbar / object / status glyph | 可以：已发布 React 包、现有项目可锁版本 |
| **Runeicons** | 小批产品专属语义图标的**制作、变体与状态动效工作台**；可从库中挑 glyph 后重塑并导出 | 暂不可以：WIP、无 release，monorepo packages 均 private；React 包入口当前明确抛出 “Not implemented yet” |

“平级”不是把两套图标混进同一 toolbar，而是图标决策时同时考虑两条正当路径：**Iconoir 负责生产线，Runeicons 负责 authored exceptions**。

## 已核验能力

- 官网展示同一 glyph 的 outline / duotone / fill / pixelated / glass 五种 mood；仓库可见 normal、duotone、fill、pixelated SVG 资产与 glass 相关资产。
- 24×24 网格；路径锚点可拖动，draw mode 可直接画路径。
- 属性链包含 stroke、size、color、gradient、视觉 effects 与 per-path motion。
- 动画引擎含 draw / stroke / bounce / shake / jump；支持 duration、delay、easing、loop、path sequence/stagger/reverse/trim。
- 可下载静态或 animated SVG，并生成 / copy JSX component。
- 仓库 2026-09-12 快照可数到 773 个 normal/fill/duotone/pixelated SVG（217 / 126 / 215 / 215）；官网写“900+”按上游营销口径记录，不拿它替代仓库计数。

## 正确采用路径

1. 先按 [`icon-system-craft.md`](./icon-system-craft.md) 建 `概念 → glyph` 表，证明通用库确实表达不准。
2. 每个产品最多先做 3–8 枚 signature semantics，例如 agent / evidence / self-check / human approval；普通 `x/search/chevron` 仍归生产线库。
3. 在 Runeicons 中从同一基础 style 开始；锁项目的 viewBox、stroke band、cap/join、optical size。
4. 导出**静态 SVG 或 JSX 源码**并保存上游 commit、Apache-2.0 NOTICE；不要依赖未发布 package。
5. 动效只绑定真实状态变化。dense product UI 默认只候选 draw / stroke；bounce / shake / jump 必须有物理或错误语义，不能作 hover 调味。
6. 每枚导出物在 14 / 16 / 20 / 24px、浅深主题和 reduced-motion 下验收。

## Style 选择

- **Outline**：默认 chrome 与 Iconoir 并排时的唯一安全起点。
- **Fill**：只用于明确的 selected / completed 对偶，且同一 glyph 必须有 outline 配对。
- **Duotone**：适合 20–24px 的 independently actionable object；14–16px dense rows 不用。
- **Pixelated / glass**：属于页面或品牌 campaign 的 signature treatment，不进入常规工作台 chrome。

## 发布闸

Runeicons 成为可安装运行时库前，必须同时满足：

- public release / tag；
- 目标 framework package 非 private，入口真实渲染而非 placeholder；
- documented tree-shaking 与包体实测；
- SSR、TypeScript declarations、currentColor、aria forwarding 通过；
- reduced-motion 对 animated export 有清晰合同。

在此之前：**可用编辑器，可用导出源码，不装包。**

## 验收

- [ ] signature glyph 的产品语义无法由 Iconoir 正常表达，而非“为了小众”。
- [ ] 同一组件没有 Runeicons / Iconoir 两枚图标表达同一语义。
- [ ] Apache-2.0 来源、固定 commit 与本地改动有记录。
- [ ] animated SVG 内联时通过 CSP 与 reduced-motion；作为 `<img>` 时不依赖无法控制的关键动画。
- [ ] 导出 JSX 已去掉上游 demo token、硬编码颜色与多余 runtime。
