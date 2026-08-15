# Paper Shaders Catalog (精选自 tdimino/claude-code-minoan)

来源: `https://github.com/tdimino/claude-code-minoan/tree/main/skills/design-media/paper-design` (SKILL.md + references/shaders.md)
技能市场页: `https://skillsmp.com/creators/tdimino/claude-code-minoan/skills-design-media-paper-design`
权威源(prop 表 + 实时预览): `https://shaders.paper.design/<slug>`
包: `npm i @paper-design/shaders-react` — 零依赖,组件按名导入:

```js
import { PaperTexture, MeshGradient, LiquidMetal } from '@paper-design/shaders-react';
```

> 版本纪律:包是 0.0.x,有 breaking change 史。pin 精确版本:
> `npm pkg set dependencies.@paper-design/shaders-react=0.0.79`
> prop 名会随版本漂移,props 不按文档走时回 shaders.paper.design/<slug> 查。

## 选型:Paper Shaders vs 其他 shader 路线

- **Paper Shaders** — 成品、设计师调的 React 组件,零 GPU 代码。目标是"用"一个效果时选它。
- 粒子/WebGPU/TSL → threejs 粒子路线
- grainient.supply 式整页美学 → grainient 路线
- 指针交互 domain-warp → rocaille 路线
- Paper 桌面软件 MCP(读写 app.paper.design) → **不用**,本 pack 只管 shaders-react

## Image Filters (6) — 需 `image` prop 输入图

| 组件 | slug | 典型用法 |
|---|---|---|
| `PaperTexture` | paper-texture | 纸/纸板/织物质感叠图 |
| `FlutedGlass` | fluted-glass | 竖纹玻璃扭曲,磨砂/肋板 hero |
| `Water` | water | 涟漪水波扭曲 |
| `ImageDithering` | image-dithering | Floyd-Steinberg/有序抖动,复古印刷 |
| `HalftoneDots` | halftone-dots | 单色半调,波普/编辑感 |
| `HalftoneCMYK` | halftone-cmyk | 四色 CMYK 半调,印刷分色 |

## Logo Animations (3) — `image` 或 `shape` 枚举

| 组件 | slug | 典型用法 |
|---|---|---|
| `Heatmap` | heatmap | logo 发光热晕 |
| `LiquidMetal` | liquid-metal | 铬/汞面,高级品牌揭示 |
| `GemSmoke` | gem-smoke | 虹彩烟飘绕 logo |

## Effects (21) — 纯程序化,无需输入图

| 组件 | slug | 典型用法 |
|---|---|---|
| `MeshGradient` | mesh-gradient | 多点渐变动画,hero/卡片背景 |
| `StaticMeshGradient` | static-mesh-gradient | 同上,不动画 |
| `StaticRadialGradient` | static-radial-gradient | 径向 + 颗粒,不动画 |
| `Dithering` | dithering | 程序化 Bayer/蓝噪抖动 |
| `GrainGradient` | grain-gradient | 胶片颗粒渐变,编辑感 |
| `DotOrbit` | dot-orbit | 环绕点场 |
| `DotGrid` | dot-grid | 点阵微动 |
| `Warp` | warp | domain-warp 噪声流 |
| `Spiral` | spiral | 旋转螺旋,中心/比例可控 |
| `Swirl` | swirl | 无光标依赖的旋流 |
| `Waves` | waves | 分层波带 |
| `NeuroNoise` | neuro-noise | 有机树突/神经噪 |
| `Perlin` | perlin-noise | 经典 Perlin 噪声场 |
| `SimplexNoise` | simplex-noise | Simplex(更锐、方向性弱于 Perlin) |
| `Voronoi` | voronoi | Voronoi 细胞纹 |
| `PulsingBorder` | pulsing-border | "思考球"/AI 加载边框脉冲 |
| `Metaballs` | metaballs | 软融合 blob |
| `ColorPanels` | color-panels | 滑动色板,Mondrian 感 |
| `SmokeRing` | smoke-ring | 烟圈漂移 |
| `GodRays` | god-rays | 体积光 |

## Common props (所有 shader 通用)

`scale` (0.01–4) · `rotation` (0–360) · `offsetX/offsetY` (-1–1) · `originX/originY` (0–1) · `speed` (1 默认,0 冻结;WebGL 不受 CSS PRM 管,必须 JS 层杀) · `frame` (手动时钟,确定性截帧) · `fit` ("contain"|"cover") · `width/height` · `worldWidth/worldHeight` (高级) · `minPixelRatio` (视网膜清晰度下限) · `maxPixelCount` (性能上限)

颜色 props 接受 hex/RGB/HSL;强度 props 通常 0–1;整数 props(如 `foldCount`)各自有界,查 shaders.paper.design/<slug>。

## Worked example — PaperTexture

```tsx
<PaperTexture
  width={1280} height={720}
  image="https://paper.design/flowers.webp"
  colorBack="#ffffff" colorFront="#9fadbc"
  contrast={0.3} roughness={0.4}
  fiber={0.3} fiberSize={0.2}
  crumples={0.3} crumpleSize={0.35}
  folds={0.65} foldCount={5}
  drops={0.2} fade={0} seed={5.8}
  scale={0.6} fit="cover"
/>
```

props ↔ Paper app 滑杆 1:1(`contrast`/`roughness`/`fiber`/`crumples`/`folds`/`drops`)。

## 氛围层纪律(来自 chuhai 实战,见 external-coding-agent-ops references)

- 色板必须跨对比度:同族色 + 低透明度 = 隐形签名(±15 RGB 判定纯色死板)
- 饱和品牌底上透明度 ≈0.2;浅底 0.15–0.2
- WebGL 动画 CSS `prefers-reduced-motion` 管不到 → JS matchMedia + `speed={0}`
- `absolute inset-0` + `pointer-events-none` + `aria-hidden="true"`
- hex 只许出现在 shader props,例外登记 DESIGN.md §3 + lint ALLOW
