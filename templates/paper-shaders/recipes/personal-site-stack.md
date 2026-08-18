# Personal-site stack（lizliz.xyz 首页）

两层，不是三层。Mesh 出色团 + 细颗粒；CSS veil 出纸。它们不打架。

失败过一次：mesh 用了 `INK_MESH_COLORS`（预算登录灰墨）。同族齐平叠在 `#faf9f5` 上会隐形，看起来像「两套底冲突」。不是 veil 的错。

## Layer A — MeshGradient

- 组件：`recipes/pointer-mesh.tsx`（lizliz.xyz `HomePaperBg`）
- 色盘：`LIZLIZ_MESH_COLORS` / `LIZLIZ_MESH_COLORS_DARK`（纸 → rust → 墨，5 色跨对比度）
- 旋钮：`grainMixer={0.12}` · `grainOverlay={0.06}` · **`speed={0.36}`**
- 指针 / 点击只 lerp-offset `swirl` / `distortion`。mesh 自己滚，不要拿指针改 `speed`
- canvas：`pointer-events: none`。在 `window` 上听 `pointermove` / `click`

不要用 `INK_MESH_COLORS`。那盘是预算登录左栏的。不要用 `CHUHAI_MESH_COLORS`。

## Layer B — dual cream-perlin veil

- 图：`veils/cream-perlin.webp` 两层，`mix-blend-mode: multiply`
- 透明度 **0.08–0.10**（0.05–0.06 低于感知。讲义那套 0.06/0.05 是讲义，不是首页）
- 可选：一层 `tex-drift` 90s。不要上讲义的 3.4s `tex-grain` jitter

## 不要第三套引擎

禁止再叠：

- `HomeAmbientBg` 一类自绘 canvas
- 额外 `PaperTexture` / `PerlinNoise` WebGL
- 讲义 `tex-grain` 3.4s

「冲突」只发生在两套 WebGL 大气叠在一起，或 mesh 色盘不跨对比度。色盘跨了，A+B 会融成一张纸。

`stills/` 不当页底。不要装 tdimino/paper-design。
