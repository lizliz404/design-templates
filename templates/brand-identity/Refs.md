# Foundry Refs — 可拆解构造参考库

> 2026-08-31 由两段 raw AI 调研 response 整理去重而成。收录硬条件：能进入 SVG / Figma 图层 / 开源 repo 拆解；只有成品 PNG、Dribbble 截图、压扁 .ico 的直接出局。
> 配套阅读：case-calibrated 规则与 Pipeline 见同目录 `SKILL.md`；本地 mood 实图在 `foundry-figma\refs\`（与 Figma 文件 04 refs 页同步）。

## Mood 图（原始视觉参照；对话内 CDN 链接，可能过期）

![mood-1](https://images.openai.com/static-rsc-4/RWBsFrkn_544W_y0s253emOE1kImQvHOjHRuChi-PNEwEIiF5GCDjhfDcpNsjrSehgLoiiBp6S7iozL5l99Gss-LGnFPycd2AaQDtTTVNIyQcNcxSejsxaAOJ13G5VFpX63wlbcL0-eEa4YKA_puGiUdnoKOy5PS6AhOGMxuF2kTlyxus9DCNpU_hU8Ak76O?purpose=fullsize)

![mood-2](https://images.openai.com/static-rsc-4/SVZITZiSJFSuYiCXqedtJjfnE-bB5AG-C4RPOhQPCNcjw2W2B_MbURlKgg_h6TY3iuxt_H49W9wQdw_a2ajVuJ6AIT_HLCJwmGpq--ELqMkdyfL8qkoU3dL1ZSiQyiqdmnAunobpxoNuP7-5PuTV6a6v2j-Fnhxpg6IAppIZ9EYp6PZE4mQq__k7EY5nS3jD?purpose=fullsize)

![mood-3](https://images.openai.com/static-rsc-4/OIVQsb7ijhIhqYSZZjkHiCnxStf8RUBwYmeYHcQPOiePk2vFx9tCrXuPkgDRavLIihu42Fk9ItNV1Fj0XWOUxdZva-eS--g_PDHRH0FDPSzHgFQN3T9SSuAVFezQ6fD6WiplYYPe2fCMX1ke3JoZhiBDHnid_ib6iYFb91YEQfO9L?purpose=fullsize)

![mood-4](https://images.openai.com/static-rsc-4/C6uX6JdLDNwpNJMvZ4hVbhkQBGDqgWP1ei1Hegdrl23z91pInrTvOTncw-ejGGcu_rfUGwCME4EaerIjLIihu42Fk9ItNV1Fj0XWOUxdZva-eS--g_PDHRH0FDPSzHgFQN3T9SSuAVFezQ6fD6WiplYYPe2fCMX1ke3JoZhiBDHnid_ib6iYFb91YEQfO9L?purpose=fullsize)

![mood-5](https://images.openai.com/static-rsc-4/MKiw8d6pQbFWx_JOfIGOBHm4Vv1uCiLz4hYecdxbYNo4_nhnYt7bBBGZw_93r3AYqN8yQpgp1IWsnmO3VU4icdk7QJbk9ROhVdxfJVGarV_9BjsfGFuhOA1bnce3c2pY?purpose=fullsize)

## Tier 0 — 官方圣经级（App Icon 体系）

| Ref | 学什么 | 可拆构造 |
|---|---|---|
| [Apple App Icon Template](https://www.figma.com/@apple)（Figma 搜 "App Icon Template"） | 行业标准模板，Liquid Glass / Icon Composer 流程 | 完整尺寸网格、mask、导出设置，Figma 内直接拆层 |
| [Apple Design Resources](https://developer.apple.com/design/resources/) · [HIG App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons/) | 不学风格，学控制：轮廓、光学中心、安全区、材质层次、尺寸适配 | 官方 spec + 可下载源文件/UI Kit |
| [App Icon Toolkit — iOS/macOS/Android (Ryan Yao)](https://www.figma.com/community/file/824894885635013369) | 10万+ 用户的事实标准，多平台导出 | 前景/背景层直接改，结构可见 |
| [App Icon Generator](https://www.figma.com/community/file/1463176476475398304) | 单源设计 → 全平台导出（含 Web/Favicon） | iOS/Android/Web/macOS/Windows 全套矩阵 |
| [Figma Reusable Icon Grid 官方教程](https://help.figma.com/hc/en-us/articles/18770195788951-Create-a-reusable-icon-grid) | 组件化 icon 母版思路 | 24×24 grid、安全区、关键形状组件化 |

## Tier 1 — 直接拆源码（第一梯队）

| Ref | 学什么 | 可拆构造 |
|---|---|---|
| [Excalidraw Logo](https://github.com/excalidraw/excalidraw-logo) | 手绘不规整感 + 轮廓极简、缩小仍成立；不规则轮廓如何保识别度 | `logo.svg` / `logo256.svg` / `og-image.svg` / `excalibot.excalidraw` |
| [Ghostty Themed Icons](https://github.com/jasonlong/ghostty-theme-icons) | "复杂但不脏"：光线、阴影、半透明、大量配色变体的受控复杂度 | 每图标 = 背景/色条/ghost 三层 SVG；`templates/` + `icons/` |
| [Immich](https://github.com/immich-app/immich/discussions/1634) | 无文字、无硬语义的抽象 mark | 五个不对称彩色瓣片旋转运动，SVG path + 颜色全公开 |
| [Pier Brand System](https://github.com/vul-os/pier/blob/main/brand/README.md) | 构造透明度教科书：路径、尺寸、颜色、favicon 光学校正、导出逻辑全公开 | `favicon.svg` / `og-image.svg` / `make-icons.mjs` |
| [OpenInterpretability web](https://github.com/OpenInterpretability/web) | SVG favicon / React Apple icon / 代码生成 OG 同属一个系统 | `app/icon.svg` · `apple-icon.tsx` · `opengraph-image.tsx` |

**Pier 单独强调：favicon 不是 app icon 的机械缩放，是独立光学校正 master。** 标准 icon 里 mark 占宽 ~66%，favicon 版被单独放大——直接缩小会让内部间隙在 16px 消失。

## Tier 2 — 开源 icon 语言

| Ref | 学什么 | 可拆构造 |
|---|---|---|
| [Phosphor Icons](https://github.com/phosphor-icons/core)（[官网](https://phosphoricons.com)） | 6 weight（Thin/Light/Regular/Bold/Fill/Duotone）一致性顶级 | MIT，raw SVG 逐条可读 |
| [Lucide Icons](https://github.com/lucide-icons/lucide) | 24×24、2px stroke、round caps；"好 icon 的路径逻辑" | raw SVG，源码极干净 |
| [Simple Icons](https://github.com/simple-icons/simple-icons) | 品牌 SVG 圣经（24k+ stars） | 单色、极致优化 raw SVG |
| Tabler Icons / Remix Icon / Heroicons | 同类开源大库，交叉验证风格 | GitHub 全源码 |
| Untitled UI Icons / Iconify | Figma 原生现代 UI icon / 20万+ icon 聚合插件 | Figma Community + 插件直出 SVG |

## Tier 3 — Favicon 流水线

| Ref | 学什么 | 可拆构造 |
|---|---|---|
| [RealFaviconGenerator](https://realfavicongenerator.net/)（[GitHub](https://github.com/RealFaviconGenerator)） | 全平台 favicon 体系行业标准 | 输出 HTML + 多平台尺寸结构 |
| [ericwbailey/favicon](https://github.com/ericwbailey/favicon) | pixel-perfect 完整尺寸 artboard 思路 | 每尺寸独立 artboard |
| [Bjango Templates](https://github.com/bjango/Bjango-Templates) | app icon→favicon 尺寸体系、导出预设、跨平台适配 | 模板文件全开 |
| [App Icon Export Kit](https://code.grida.co/community/file/1133792650731394633) | Figma 内组织全平台 export matrix | Community 镜像可拆层 |

## Tier 4 — OG / 社交图

| Ref | 学什么 | 可拆构造 |
|---|---|---|
| [OG Image Pack 1/2/3 (NEVER. DESIGN)](https://www.figma.com/community/file/1434530008829243090)（[2](https://www.figma.com/community/file/1434534985999262420) · [3](https://www.figma.com/community/file/1434535803374582485)） | startup/solopreneur 现代 OG 模板，构图排版 | Figma 层结构，完全可编辑 |
| [OG copy-paste (Dan)](https://www.figma.com/community/file/1439179478775358796) | 实战验证的高点击率构图 | 直接复制拆解 |
| [OG Studio](https://github.com/QuiiBz/ogstudio)（[ogstudio.app](https://ogstudio.app)） | 模板 + 导出 SVG/PNG/URL；动态 OG 构造逻辑 | Satori 渲染管线源码 |
| [SharePreviews](https://github.com/sgalanb/sharepreviews)（[在线编辑器](https://sharepreviews.com)） | 类 Figma 的 OG 模板编辑器、动态数据替换 | 编辑器/渲染代码全开源 |

## 专项构造参考（第二梯队补充）

| Ref | 学什么 | 可拆构造 |
|---|---|---|
| [Snapmaker Studio Brand Kit](https://github.com/DeadlyVirusIn/snapmaker-studio/blob/main/docs/brand/README.md) | `app-icon.svg` / `favicon.svg` / `social-preview.svg` 同一视觉语言分化 | brand 目录三件套 |
| [Drift Guard DESIGN.md](https://github.com/Drift-Guard/driftguard/blob/main/docs/DESIGN.md) | mark + 32px favicon + 1200×630 OG + pattern 成套组织 | docs/DESIGN.md |
| Satori 系 OG 生成器（repo-og-generator / super-og-images 等） | JSX/HTML 模板直接产 SVG，源码透明 | GitHub 搜索 "og-image" "satori" |

## 下一步拆解清单（五个，按优先级）

1. **Excalidraw** — 不规则轮廓如何仍保识别度
2. **Immich** — 无文字、无硬语义的抽象 mark
3. **Ghostty** — 层次、材质、受控复杂度
4. **Pier** — favicon 独立光学校正 + 完整资产流水线
5. **OpenInterpretability** — favicon / app icon / 动态 OG 同系统

> Linear / Stripe / Dub 仍是视觉 benchmark，但公开可访问的最终品牌构造不完整（压扁 .ico / 成品图），不满足"可拆解"硬条件，故不列。

## 怎么用

1. Duplicate Apple 官方 App Icon Template，拆层看网格与 mask
2. Clone Phosphor / Lucide / Simple Icons，在代码编辑器里读 SVG 路径
3. OG 在 Figma 模板里改，对照 Satori 开源项目理解构图逻辑
4. 以上资源均为 MIT / CC0 / 官方许可，可放心学习与二次创作
