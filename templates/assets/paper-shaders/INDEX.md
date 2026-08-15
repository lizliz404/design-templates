# Paper Shaders 预备静图

官方 Paper Shaders 导出的静图，放这里是为了换讲义/长页底纹时不用再去官网抓。

来源：
- `https://github.com/paper-design/shaders` → `docs/public/shaders/`
- `https://paper.design/flowers.webp`（官方样图，给纸纹滤镜当输入，不当全页底）

## 换底怎么换

讲义默认用 `paper-texture.webp`（奶油纸纹，已在预算讲义验过：一层、透明度约 0.04）。

换一张：把 CSS 里的 `--tex-paper` 指到本目录另一张。需要第二层噪点时，用 `perlin-noise.webp` / `simplex-noise.webp` / `neuro-noise.webp`，透明度压到 0.02–0.05，叠太厚会糊字。

## 各张干什么

| 文件 | 适合 |
|---|---|
| `paper-texture.webp` | 默认纸底。先用这张。 |
| `perlin-noise.webp` | 第二层细噪。 |
| `simplex-noise.webp` | 换一版噪点，比 Perlin 更碎。 |
| `neuro-noise.webp` | 再换一版，纹路偏有机。 |
| `waves.webp` | 很淡的波纹底。 |
| `static-mesh.webp` | 不动的网格渐变，当柔底。 |
| `grain-gradient.webp` | 胶片颗粒渐变。偏花，透明度要更低。 |
| `flowers.webp` | 官方样图。给 `PaperTexture` 当输入图，不要铺满讲义。 |
| `warp.webp` / `voronoi.webp` / `mesh-gradient.webp` / `god-rays.webp` / `spiral.webp` | 预备。大多数讲义用不上，太抢字。 |

WebGL 组件要现场跑，用 `@paper-design/shaders-react`。静图交付走本目录，不要每次现渲。
