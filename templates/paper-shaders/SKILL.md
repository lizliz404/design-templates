---
name: paper-shaders
category: design
description: >-
  [design] Paper Shaders stills and cream-paper veils for decks and long pages.
  Use when swapping 纸纹/底纹, applying a Paper Texture veil, or reaching for
  @paper-design/shaders-react. Lives inside the design-templates pack — do not
  install tdimino/paper-design as a separate user skill.
---

# Paper Shaders（脚手架小工具）

家在 design-templates 里：`templates/paper-shaders/`。
纸和说明放一起。不要再抽到 `~/.cursor/skills/paper-design`。

两件事分开：

| | 干什么 | 别干什么 |
|---|---|---|
| **静图 veil** | 讲义/长页铺一层很淡的纸 | 把官网彩色样张直接当底 |
| **React 组件** | 页面上要活的 shader | 为了换一张纸去开 Paper.app |

官方目录：[shaders.paper.design](https://shaders.paper.design/)
包：`npm i @paper-design/shaders-react`

tdimino 那份 `paper-design` skill 是 Paper 桌面软件的 MCP，会锁画板。本工具不管那个。

## 换底（讲义 / 长页）

1. 只从 `veils/` 拿。那是按奶油纸重做过的，能铺字。
2. `stills/` 是官网预览图，颜色很重，当目录用，不当底。
3. 单文件讲义：把选中的 webp 编成 `--tex-paper` 的 data URI。
4. 一层就够。透明度先 0.04；能到 0.03–0.085。糊字就降。
5. 要第二层细噪，再用另一张 veil，透明度 0.02–0.05。

当前预算讲义：一层、`multiply`、0.04、`background-size: 640px 480px`。

```css
.deck-texture__paper {
  position: absolute;
  inset: -3%;
  background-image: var(--tex-paper);
  background-size: 640px 480px;
  opacity: 0.04;
  mix-blend-mode: multiply;
}
```

## 预备纸

`veils/`（铺字用）

| 文件 | 从哪来 |
|---|---|
| `cream-fiber.webp` | 官网 `paper-texture` 抽成奶油纤维 |
| `cream-perlin.webp` | 官网 `perlin-noise` 抽成奶油斑 |

`stills/`（目录，不铺字）

`paper-texture` / `perlin-noise` / `simplex-noise` / `neuro-noise` / `grain-gradient` / `static-mesh` / `waves` / `warp` / `voronoi` / `mesh-gradient` / `god-rays` / `spiral` / `flowers`

`flowers.webp` 是 `PaperTexture` 的输入样图，不是底。

## 活的 shader

页面上要会动，再用组件：`PaperTexture`、`PerlinNoise`、`SimplexNoise`、`NeuroNoise`、`GrainGradient`。
导出静图后放进 `stills/` 或洗成 `veils/`，不要每次现渲。

## 反模式

- 把 tdimino skill 再装一份到用户目录
- 把 `stills/` 彩色样张直接当讲义底
- 纸纹透明度往 0.1 上加还不截图
- 每个后台表格页都铺——只给叙事页 / deck
