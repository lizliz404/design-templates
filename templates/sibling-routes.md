---
name: sibling-routes
description: >-
  Soft map between design-templates (assets) and lizliz404/agent-skills
  (pipelines). Cloud agents use GitHub URLs; local agents may use D:\dev\repos.
---

# Sibling routes（软路由）

两套仓库，一件事的两层。**不要把 skill 管道 copy 进 templates，也不要把模板 zip 塞进 skill。**

| 层 | 仓库 | 本地 | 云端 |
|---|---|---|---|
| 资产 / 配方 | design-templates | `D:\dev\repos\design-templates` | https://github.com/lizliz404/design-templates |
| 测量管道 | agent-skills | `D:\dev\repos\agent-skills` | https://github.com/lizliz404/agent-skills |
| 站点镜像 | — | — | https://lizliz.xyz/templates · https://lizliz.xyz/skills |

## 什么时候跳到对面

| 我在做… | 先开 | 再开 |
|---|---|---|
| 复刻一个营销/WebGL landing，要 IMR / SLR / behavior 闸 | [landing-page-replication-v5](https://github.com/lizliz404/agent-skills/tree/main/skills/landing-page-replication-v5) | 本 pack：`design/lead-radar`、`paper-shaders`、`ai-thinking-orb`、`beautiful-ui-ai-interfaces`（theater 需要 agent chrome 时） |
| 已经有目标站，缺「偷哪套纸/orb/表语法」 | 本 pack `templates/README.md` | 复制完再用 replication v5 的 Loop 3–5 量，不要用眼睛毕业 |
| `WEBGL_THEATER` 要粒子/玻璃球，而不是自己发明 shader | [`ui-patterns/ai-thinking-orb/SKILL.md`](./ui-patterns/ai-thinking-orb/SKILL.md) | 需要全页融入背景 Three.js 时：agent-skills `webgl-threejs-background-animation` |
| 需要纸纹/登录 mesh，不要第二套 WebGL | [`paper-shaders/SKILL.md`](./paper-shaders/SKILL.md) | replication v5 `product-theater.md` 的 CSS stand-in 行 |
| 3D hero 是产品表面 | [`ui-patterns/threeui-hero-adapter.md`](./ui-patterns/threeui-hero-adapter.md) | 说明图仍走 `decks/visual-economy.md` |
| 静帧/海报 → 可交互 WebGL 产品表面（玻璃固体、卷板、体素揭开） | [`still-to-webgl-theater/SKILL.md`](./still-to-webgl-theater/SKILL.md) | 源是 live URL 时改走 replication v5；不要在 agent-skills 再放一份 |

## 抓得到 vs 抓不到

| 源 | 状态 |
|---|---|
| Liquid Orb（LerSent） | **已抓** MIT `effect.wgsl` + `effect.metal` → `ui-patterns/ai-thinking-orb/upstream/lersent-orb/`。Editor 仍在上游。 |
| Rare UI FluidOrb | 适配器 only；仓库无 LICENSE，源码不进 pack |
| MetalForge | **不抓**。付费 SwiftUI / RN Skia 目录。Web 等价物是 Liquid Orb；原生着色器用已抓的 `effect.metal`，不要把 MetalForge 目录当开源包 |

Cloud agent：clone 或 raw 上面的 GitHub 路径即可，不必假设 `D:\` 存在。
