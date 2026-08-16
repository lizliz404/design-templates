---
name: paper-shaders
category: design
description: >-
  [design] Paper Shaders stills, cream-paper veils, login MeshGradient panes,
  and pointer-reactive backgrounds. Use when swapping 纸纹/底纹, a login left
  pane, or a long-page atmosphere. Lives inside the design-templates pack —
  do not install tdimino/paper-design as a separate user skill.
---

# Paper Shaders

家在 design-templates 里：`templates/paper-shaders/`。
纸、菜谱、说明放一起。不要再抽到 `~/.cursor/skills/paper-design`。

官方目录：[shaders.paper.design](https://shaders.paper.design/)
包：`npm i @paper-design/shaders-react`

tdimino 那份 `paper-design` skill 是 Paper 桌面软件的 MCP，会锁画板。本工具不管那个。

## 先选哪一套

| 场合 | 用什么 | 对参 | 别干什么 |
|---|---|---|---|
| 讲义 / 长页 / 16:9 deck | **Deck veil**：双层静图 + `tex-grain` | `lizliz.xyz/qiancheng-yusuan-workbook-…` | 只铺一层 0.04 的纸还说「有质感」 |
| 登录左栏 / 品牌半屏 | **Login mesh**：`MeshGradient` 50% 叠在实色底上 | 出海云 `/login`、预算系统 `/login` | 后台表格页也挂 mesh |
| 个人站 / 长盯的首页 | **Login mesh 的墨色盘** + 一层薄 veil；指针搅动 | 上两套合成 | 用出海云那盘饱和蓝紫当个人站底 |
| 只要一张纸 | 静图 veil，`veils/` | — | 把 `stills/` 彩色样张当底 |

## 1. Deck veil（千成讲义）

机制：固定全屏、`pointer-events: none`、**两层**。

1. `__paper`：`veils/cream-perlin.webp`（或另一张非花噪声），`multiply`，opacity **0.06**，`tex-drift` 90s（慢漂，几乎感觉不到，负责「纸在」。）
2. `__noise`：`veils/cream-perlin.webp`，不同 `background-size`，`multiply`，opacity **0.05**，`tex-grain` **3.4s**（胶片抖，负责「活」。）

单层 0.15 的纸 ≠ 这一套。缺 perlin 那层，讲义会变成塑料。

`prefers-reduced-motion`：两层 animation 关掉，纸还在。

完整 CSS：`recipes/deck-veil.css`。

## 2. Login mesh（出海云 / 预算登录）

机制：左栏 **实色底** + 一层 `MeshGradient` `opacity: 0.5`，`pointer-events: none`。字在 `relative` 上层。

共用旋钮（两站一样，不要改着玩）：

```
distortion={0.58}
swirl={0.42}
grainMixer={0.12}
grainOverlay={0.06}
speed={reduced ? 0 : 0.36}
```

色盘才是产品签名，不要混用：

| 站 | 底 | colors |
|---|---|---|
| 出海云 | `bg-primary`（品牌蓝） | `['#B8D4FF', '#4058EA', '#C4B5FD', '#1A237E', '#7DD3FC']` |
| 预算 / 个人站 | 米白或墨 | `['#FAFAFA', '#EDE8DF', '#171717', '#4D4D4D', '#321C1C']` |

5 色必须跨亮→深。同族齐平会隐形。

完整组件：`recipes/login-mesh.tsx`。

后台 UI **禁止**挂这套。登录左栏 / 对外 hero 才配。

## 3. 指针 / 点击（个人站）

Shader 层保持 `pointer-events: none`，在 `window` 上听 `pointermove` / `click`，把归一化坐标喂进旋钮：

- `swirl` ← 指针 x
- `distortion` ← 指针 y
- click：`boost` 冲到 1，约 700ms 褪回 0，短暂加快 `speed`

不要给 shader 开 `pointer-events: auto`，会吞掉页面点击。

完整组件：`recipes/pointer-mesh.tsx`。lizliz.xyz 首页用的就是这一套。

## 换底（讲义 / 长页，短清单）

1. 只从 `veils/` 拿。
2. `stills/` 是官网预览图，颜色很重，当目录用，不当底。
3. 单文件讲义：webp 编成 `--tex-paper` / `--tex-perlin` 的 data URI。
4. 双层。缺一层就不是千成那张纸。
5. 动画：`tex-grain` 3.4s 必须在。90s drift 单独不算「换过动画」。

## 验证（贴纸后必做，别只靠眼）

- 截图 1280×720，正文区域**不得糊**；深浅两种页面各测一版（白底 + 品牌深色底）。
- 视觉模型看不出纹理差异 → 透明度低于感知阈值，属安全；要签名感就提到 0.06 再验。
- 对比度纪律（活 shader 版）：色板必须跨对比度，同族色 + 低透明度 = 隐形；饱和品牌底上透明度 ≈0.2。
- WebGL 动画不受 CSS `prefers-reduced-motion` 管，必须 JS 层杀：`usePrefersReducedMotion()` → `speed={reduced ? 0 : 0.18}`。
- 容器卫生：`absolute inset-0` + `pointer-events-none` + `aria-hidden="true"`；不接触按钮/表单/卡片。

## 预备纸

`veils/`（铺字用）

`cream-fiber.webp` is the cosmos still, NOT fiber — do not tile it as paper.

| 文件 | 从哪来 |
|---|---|
| `cream-fiber.webp` | **cosmos still, NOT fiber — do not tile it as paper** |
| `cream-perlin.webp` | 官网 `perlin-noise` 抽成奶油斑（铺字用） |

`stills/`（目录，不铺字）

`paper-texture` / `perlin-noise` / `simplex-noise` / `neuro-noise` / `grain-gradient` / `static-mesh` / `waves` / `warp` / `voronoi` / `mesh-gradient` / `god-rays` / `spiral` / `flowers`

`flowers.webp` 是 `PaperTexture` 的输入样图，不是底。

## 活的 shader

页面上要会动：`MeshGradient`（登录/首页）、`PaperTexture` / `PerlinNoise`（只要纸、不要色团）。
导出静图后放进 `stills/` 或洗成 `veils/`，不要每个后台页现渲。

完整 30+ 组件目录、common props 表、PaperTexture 示例、版本 pin 纪律 → `references/shaders-catalog.md`（精选自 tdimino/claude-code-minoan 的 paper-design skill，权威源 shaders.paper.design）。

## 反模式

- 把 tdimino skill 再装一份到用户目录
- 把 `stills/` 彩色样张直接当讲义底
- 讲义只铺一层 0.04 的纸，说「有 paper design 了」
- 个人站用出海云那盘饱和蓝紫
- 给 shader 开 `pointer-events: auto`
- 每个后台表格页都铺 mesh
