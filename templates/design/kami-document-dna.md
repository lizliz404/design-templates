---
name: kami-document-dna
description: >-
  tw93/Kami（"Good content deserves good paper"）的文档排版 DNA 笔记：暖羊皮纸
  底 + 墨蓝单强调 + 衬线层级 + 三档行高的 print-first 约束系统。Use when
  做文本型 Help / 长文档 / 法务或产品文档页、PDF / 一页纸 / 白皮书 / 简历 /
  信函排版，或给 landing 页要纸感编辑风（parchment+ink-blue）时;需要真实
  可编辑 PDF 时直接装上游 skill 而不是从笔记重建。不适用：多强调色品牌、
  活泼/游戏化表面、需要复杂动效编排的 landing。
source: https://github.com/tw93/Kami
license: MIT © 2026 Tw93（https://raw.githubusercontent.com/tw93/Kami/main/LICENSE）
fetched: 2026-09-10
---

# Kami document DNA

Kami（紙，かみ）是 tw93 的 AI agent 文档排版系统：8 个文档模板（resume / one-pager / equity report / slides / letter / changelog / portfolio / long-doc）+ 一个 landing-page 系统，print-first（WeasyPrint / Marp / PPTX），zh/en/ja/ko 四语。本文件只记 DNA 与边界，上游是活跃 skill（版本号、marketplace、脚本链）——**不 vendor，不 mirror**；需要真实渲染就装上游 skill `npx skills add tw93/kami/plugins/kami -a universal -g -y`（入 `~/.agents/skills/`），需要灵感书签另记 `inspiration-sources.md`，本文件是机制层。

上游一手资料：仓库 https://github.com/tw93/Kami · 网站 https://kami.tw93.fun · 设计规范 https://raw.githubusercontent.com/tw93/Kami/main/plugins/kami/skills/kami/references/design.md（1460 行，十不变量+全 token）· tokens 机读版 `references/tokens.json`。覆盖纸张/字体值前先回上游 design.md 校准，别只信笔记转述。

## 流程（何时跑、按序做什么、终点怎么判）

1. **任务入轨**：文本密集页（Help/how-to/白皮书）或 landing 要"纸感编辑风"→ 确实要用；别的表面回主路由。
2. **选媒介**：真 PDF/打印产出 → 装上游 Kami skill 跑模板；web 页 → 只借 DNA（下节 token + 规则），按本站系统重写 CSS，不搬它的 HTML。
3. **套 token**：canvas/文字/强调色按下表取值；行高按三档落带；间距按 4pt 基 + proximity law。
4. **自检终点**（Kami 的 ladder 纪律）：`grep 'font-size:' <file> | sort | uniq -c` 每个值都落在阶梯上、prose ≥14px、12px 只给徽章；行高值在三档带内；墨蓝出现面积目测 ≤5%;正文四档灰全是暖色调（R≈G>B）；无硬阴影、无 transition-all。

## 机制依据（按需查的平铺规则，co-location）

### Canvas / 表面色（Kami 十不变量的核心）

| Token | Hex | 用法 |
|---|---|---|
| parchment | `#f5f4ed` | 页面底色，**不许纯白 `#ffffff`、不许冷灰 `#f8f9fa/#f3f4f6`** |
| ivory | `#faf9f5` | 卡片/抬升容器 |
| ink blue | `#1B365D` | 唯一彩色强调（CTA/引文条/overline），面积 ≤5% |
| ink light | `#2D5A8A` | 深底上的链接 |
| tag bg | `#E4ECF5` / brand tint `#EEF2F7` | 墨蓝经预演算的实色 tint，**禁 rgba** |
| border | `#e8e6dc` / `#e5e3d8` | 主/次分隔线 |

### 文字

- 四档暖灰阶梯（全部 R≈G>B 黄棕底调，禁中性/冷灰）：`#141413`（主）> `#3d3d3a`（次/表头/链接）> `#504e49`（补充）> `#6b6a64`（三级元数据）。四档封顶，不许第五级。
- 行高三档：标题 1.1–1.3 / 密排正文 1.4–1.45 / 阅读正文 1.5–1.55。**print 正文禁 1.60+**——在 pt 字号下显得松散漂浮；web 英文阅读页可保留 1.6–1.75。
- 字号必须落在 scale 的档位上，不许出现 12.5/13.5/14.5/17.5 邻档；web 最低 12px 且只给 micro-label，prose ≥14px。
- serif 只用 400/500 两档，`strong{font-weight:500}` 锁死，禁合成粗体（600/700）；禁 900/100。

### 排版法（对长文/Help 页最值钱的三条）

- **Proximity law**：标题下方间距必须明显小于上方（≥2×），否则标题读作上一节的尾巴。标题块自己发闷先开 eyebrow/title/lede 内部间距，再动节间。
- **Repeated row 禁装饰**：图文两栏重复行上，连接线/徽章/序号第一次可爱第五次即噪音；解法是留白不是图形。两栏轨道都要 cap 并对齐容器两缘。
- **Subtractive rule / 表面平整**：默认平面；ring/whisper 阴影只给真浮层（截图、popover）。硬投影、transition-all、hover-scale 全部禁入。

### Landing 面（纸感编辑风的取法）

结构：hero（eyebrow+产品名+双 CTA）→ showcase/gallery → features → principles → pricing → FAQ → footer（尾链指向 /help——landing↔help 配对是内建的）。同站附 SEO/agent 样板：`llms.txt`、`robots.txt`、`sitemap.xml`、`vercel.json` sitemap/robots。 取它的**结构骨架+纸感 token**，动效/滚动编排另有资产（走 Agent / motion chrome），别指望 Kami 提供 motion。

## 边界（硬性 guardrail，正面措辞）

- **字体不可再分发**：Charter（商业）与仓耳今楷 TsangerJinKai02（TsangerType 商业）不得拷贝进本 pack 或任何产物外的再分发物；可自由自用/替代的只有 JetBrains Mono（OFL）与思源宋体（OFL）。Kami 自己的 dist 也不打包它们。
- **不 vendor 代码/模板 HTML**：MIT 允许复制，但本 pack 约定优先笔记;将来确需 `landing-page.html` 等源码时走 ai-thinking-orb 式 vendored+PROVENANCE，附带上游 LICENSE 文本，且不含字体文件。
- **print≠web**：pt/mm/A4 页边距、9pt 地板、slide pt×1.6 缩放全是印刷值；借比例与纪律，不照抄数值。
- **单强调色纪律**：墨蓝之外不引入第二个彩色，唯一注册例外是 changelog 的 breaking 徽章（`#f0e0d8`/`#8b4513`，已注册 token）。
- **不整站 mirror**：PDF 截图/样张只作观感书签记 `inspiration-sources.md`，不复制进 design/。
