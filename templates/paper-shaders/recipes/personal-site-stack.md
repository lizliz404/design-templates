# Personal-site stack（lizliz.xyz 首页）

三层。Mesh foam 出色团 + 细颗粒 + hover/click；一张 CSS 图出 floral-shadow paper still；tile perlin 出细纤维。Foam 和 still **不打架**。两套 WebGL 大气才打架。

失败过一次：mesh 用了 `INK_MESH_COLORS`（预算登录灰墨）。同族齐平叠在 `#faf9f5` 上会隐形，看起来像「两套底冲突」。不是 veil 的错。

失败过第二次：cream-fiber 没铺，或 tile 成 960px 砖。Liz 要的是 **shader-paper look with decorative flower shadows**（washed silhouette print），不是把菊花当主体，也不是饱和橙 `stills/flowers.webp`。

## Layer A — MeshGradient foam

- 组件：`recipes/pointer-mesh.tsx`（lizliz.xyz `HomePaperBg`）
- 色盘：`LIZLIZ_MESH_COLORS` / `LIZLIZ_MESH_COLORS_DARK`（纸 → rust → 墨，5 色跨对比度）
- 旋钮：`grainMixer={0.12}` · `grainOverlay={0.06}` · **`speed={0.36}`**
- 指针 / 点击只 lerp-offset `swirl` / `distortion`。mesh 自己滚，不要拿指针改 `speed`
- canvas：`pointer-events: none`。在 `window` 上听 `pointermove` / `click`

不要用 `INK_MESH_COLORS`。那盘是预算登录左栏的。不要用 `CHUHAI_MESH_COLORS`。

## Layer B — cream-perlin fine fiber（tile）

- 图：`veils/cream-perlin.webp` **一层** tile，`mix-blend-mode: multiply`
- 透明度 **0.08–0.10**（0.05–0.06 低于感知。讲义那套 0.06/0.05 是讲义，不是首页）
- 可选：`tex-drift` 90s。不要上讲义的 3.4s `tex-grain` jitter

## Layer C — cream-fiber floral-shadow still（cover, not tile）

- 图：`veils/cream-fiber.webp`（cream paper print of cosmos **shadows**）
- **一次**：`background-size: cover` · `background-repeat: no-repeat` · `background-position: center` · `multiply`
- 透明度 **0.16–0.22**（0.06 在 1280 截图里看不见，Liz 会以为纸没上）
- 暗色：`soft-light`，感知上同等
- 可静止，或 90s 只漂几 px；漂的时候仍必须 cover，禁止 tile
- `pointer-events: none`
- `prefers-reduced-motion`：mesh 卸掉，Layer C 还在。那才是他们要的纸。

Standing rule「never tile cream-fiber」= 不要 `background-repeat` 成 960px 砖（读成菊花墙纸）。**用一次、cover、multiply** 才是 intended still。

## 禁止

- 第二套 WebGL：`PaperTexture` / `PerlinNoise` / `HomeAmbientBg` canvas
- tile `cream-fiber.webp`
- 把 `stills/flowers.webp` 当 wallpaper
- 讲义 `tex-grain` 3.4s

「冲突」只 = 两套 WebGL 大气，或把 cosmos still tile 成墙。A + B + C 是一张纸：foam 会动，shadow print 是静图。

`stills/` 不当页底。不要装 tdimino/paper-design。
