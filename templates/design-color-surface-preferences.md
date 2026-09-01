# Color & Surface Preferences

类型：Craft convention（与 [`design-typography-font-preferences.md`](./design-typography-font-preferences.md) 同级；**不是** checklist 条目全文）

Checklist §40 只留指针。数字、色温、证据、杀掉标准只维护本文。改色先读这篇，再动 `:root`。

| | |
|---|---|
| **What** | 页面底 / 卡片 / 侧栏 / 弹层 / 正文墨，禁止纯白纯黑铺底；按产品类型选「微色相壳」或「米黄纸」。 |
| **Why** | `#FFF`×`#000` 是显示器能给的最大刺激，也是没调过色的浏览器默认。长时间盯表会刺。改一组 token 一杯咖啡。 |
| **Who** | 日用工具、OA、后台、阅读面。营销极简页可以把刺当意图，那是例外。 |
| **Not this** | 不是品牌主色手册；不是 dark-mode 专题；不是「所有产品都做成 Notion」。 |

证据层：Exa 检索 2026-08-14（见文末）。配方层：Liz 盯表产品（出海云 / 前程预算）要走米黄纸，不是冷灰白。

---

## 硬禁（铺底）

不要用这些做 **page / card / sidebar / popover / sheet** 实底：

- `#FFFFFF` / `#000000`
- `oklch(1 0 0)` / `oklch(0 0 0)`
- `bg-white` / `bg-black` 铺满
- `rgba(255,255,255,1)` 以及 **α≥0.85 的纯白盖在浅底上**（眼睛仍当它是白；透明度不是豁免）

正文不要 `#000`。Dark 底不要 `#0a0a0a` 装高级（还是洞）。

**不是铺底、允许纯白/纯黑：** 彩色填充上的字、视频烧录字幕、logo 反白、玻璃高光 1px、品牌花标的高光边（如前程 `data-mark-tone='inverse'` 的 `--mark-edge`）。

---

## 两条带（按场景选，不要混）

「最多人用」和「盯表最站得住」不是同一套。Carbon / MUI / 默认 shadcn 仍大量 `#FFF`——那是出货惯性，不是护眼结论。

| 带 | 何时 | Paper | Card | Ink | 参照 |
|---|---|---|---|---|---|
| **A · 微色相壳** | 营销壳、短会话、品牌冷/蓝的仪表盘 chrome | L 0.96–0.98，C **0.004–0.010**，hue 跟品牌走 | 比 paper 略亮，**L&lt;1**，同色相 | L ≥ 0.22，带一点同色相 | Linear / Stripe / Vercel 那挂：冷灰白 `#F4F6FA`、`#F8F9FA` |
| **B · 米黄纸（盯表）** | 人要连续盯几小时的工作面：预算 OA、出海云后台、阅读/填报 | L **0.94–0.97**，C **0.012–0.022**，hue **70–95** | L **0.98–0.985**，C **0.008–0.012**，**同一暖相** | L **0.26–0.32**，C **0.018–0.028**，hue **50–70**（暖近黑，Notion `#37352F` 一族） | Notion `#F7F6F3`；BDA cream；Kindle sepia 的克制版 |

出海云有蓝紫极光、预算系统没有品牌蓝——**工作面都走 B**。品牌色放在 primary / 极光 / focus，不要把纸也染成冷蓝灰。

**不要：** 米黄底 + 纯白卡（两套灯光）。Card 必须同暖相、只是更亮。

**A 带的合法冷底：** 短会话、明确要「实验室/工具」信号。一旦用户日盯 ≥1h，改 B。

---

## 配方（直接抄）

OKLCH。Hex 只给对照，真源是 oklch。

### B 带 · 盯表（出海云工作面 + 前程预算默认）

```css
:root {
  --background: oklch(0.96 0.016 85);   /* 米黄往白偏的纸 */
  --card:       oklch(0.985 0.008 85);  /* 仍 L<1，同暖相 */
  --popover:    oklch(0.982 0.009 85);
  --sidebar:    oklch(0.95 0.014 85);
  --muted:      oklch(0.935 0.014 85);
  --border:     oklch(0.88 0.016 85);
  --foreground: oklch(0.28 0.022 60);   /* 暖近黑 */
  --muted-foreground: oklch(0.45 0.02 60);
}
.dark {
  --background: oklch(0.20 0.016 60);   /* 抬起来的暖墨，不是洞 */
  --card:       oklch(0.25 0.018 60);
  --foreground: oklch(0.93 0.012 85);   /* 暖近白，不是 #FFF */
}
```

半透明卡（出海云）：`oklch(0.985 0.010 85 / 94%)` —— 色相走纸，α 走玻璃纪律；不要 `oklch(1 0 0 / 0.94)`。

对照 hex（约值，勿当真源）：paper `#F6F1E8`，card `#FBF8F3`，ink `#3A3228`。

### A 带 · 微色相壳（仅短会话 / 冷品牌壳）

```css
:root {
  --background: oklch(0.965 0.006 260);
  --card:       oklch(0.985 0.004 260);
  --foreground: oklch(0.26 0.012 260);
}
```

这是「避白」的地板，**不是**盯表目标。前程预算 2026-08-14 另一轮 agent 停在这档（hue 260 / C 0.003–0.004）——算避白，**不算纸**。

### 阴影跟色温

`box-shadow: … rgba(0,0,0,0.1)` 在暖纸上是洞。

- 暖纸：`rgba(100, 60, 30, 0.08)` 量级
- 冷壳：`rgba(30, 50, 100, 0.08)` 量级
- Dark：阴影变 luminance 边，仍不要纯黑贴纸

---

## 怎么落到一个 repo

1. 先定带：日盯 → B；否则 A。
2. 改 `:root` / `.dark` 的 **surface + ink 中性轴**。语义色（destructive / warn / success / 品牌 primary / 极光）不动，除非它本身是 `#000`/`#FFF` 铺底。
3. 扫：`bg-white`、`bg-black`、`#fff`、`#ffffff`、`oklch(1 0 0)`、`oklch(0 0 0)` 铺底。漏网的 85% 白遮罩一起改。
4. DESIGN.md / `DESIGN.system.md` 的 hex 与 YAML **跟着 token 改**，禁止文档还写 `#ffffff` 而 CSS 已经是纸。
5. 并排看：笔记本高亮 + 外接屏。杀掉标准见下。
6. 品牌主色、图表语义色、平台色（TikTok 红等）不在本文范围。

**出海云特判：** 极光 `body::before` 保持蓝紫低 α。变的是纸/卡/墨。极光是窗，纸是桌。不要把 `--background` 继续停在 hue 258。

**前程预算特判：** `docs/DESIGN.system.md` 里「不是 Soft Editorial cream」指的是 **禁止编辑风衬线/鎏金**，不是禁止纸色底。工作面走 B 带。Geist 灰阶营销页那套 `gray-1000` + 纯中性，不再当预算 OA 的纸。

---

## 反模式

| 做法 | 为什么不行 |
|---|---|
| `#FAFAFA` / `zinc-50` 无色相 | 近白，仍是没调过 |
| `oklch(0.96 0.004 260)` 声称「已经是纸」 | 冷蓝灰微偏；屏幕边上看不出；盯表仍刺 |
| C &gt; 0.03 或 L &lt; 0.94 的「米黄」 | 脏、旧 Excel、咖啡渍 |
| 暖纸 + 冷阴影 / 纯黑阴影 | 色温打架 |
| 暖纸 + `oklch(1 0 0)` 卡 | 灯不一样 |
| 把唯一 CTA 做成低对比暖灰 | 本文管铺底，不管把按钮藏起来 |
| 控制室 HMI 的浅灰当预算表圣经 | HMI 灰是为了让报警色跳；OA 的红/琥珀是局部 chip，纸色吃不掉 |

---

## 杀掉标准

- 财务 / 运营说「黄了、脏了、像旧表格」→ 退到 Notion 附近：C **0.008–0.010**，hue 仍 85，**不要退回 hue 260**。
- 对比不够、字发飘 → 先降 ink 的 L，不要把纸推回 `#FFF`。
- WCAG 正文对纸仍须 ≥4.5:1（B 带配方远高于此；目标舒适区约 12:1–16:1，不是 21:1）。

---

## 证据（Exa · 2026-08-14）

检索问题：纯白纯黑是否最佳实践；最多人用的是哪套；盯表要不要更冲的米黄。

**出货量（惯性，不是结论）**

- IBM Carbon White theme、MUI 默认、大量 shadcn 起步板：画布仍 `#FFFFFF`。Dataface 文档也承认「纯白当卡面仍然常见」。
- 这是「没选」的默认，不是长时间阅读的最优。

**做工向 SaaS（A 带）**

- Linear / Stripe / Vercel 评论共识：不用纯中性；中性带 2–3% 品牌色相；阴影带色温（UX Planet 2026-03，Usman Writes）。
- 他们多数落地是**冷灰白**，不是奶油。Mantlr 提醒：不要把「永远 #2A2A2A」写成这三家没写过的教条；温度跟品牌走。
- 前程预算若抄 Geist 营销灰，会得到 A 带冷壳——适合 Vercel 站，不适合盯账。

**长时间盯字 / 盯表（B 带，本文对 OA 的主结论）**

- British Dyslexia Association Style Guide：白底「too dazzling」；cream / soft pastel；深色字但不要纯黑。
- Rello 等阅读研究转述：暖底（peach / cream / 浅黄）比冷灰、纯白更利于长时间读；WCAG 要的是足够对比，不是最大对比。
- Notion 可识别底 `#F7F6F3`（HSL ~45° / 22% / 96%）：几乎白，但明确是奶油纸。对照 Google Docs `#FFF`（临床）、Confluence `#F4F5F7`（公司冷灰）。
- Colorhero / ColorArchive：`#000` 对 `#FFF` = 21:1，halation（字边发晕）；正文近黑 + off-white/cream，对比大约 12:1–17:1。
- Kindle / reader mode：默认 sepia，不是 `#FFF`。屏幕发光 ≠ 纸反光。
- 控制室 HMI（Center for Operator Performance）：常用浅灰/浅蓝，**明确说不要纯白**；那是为报警色服务的无彩画布。OA 局部语义色不需要把整张纸洗成灰。

**和「品牌冷蓝所以纸也要蓝」的冲突**

A 带逻辑：蓝品牌 → 中性微蓝。出海云已经有蓝紫极光当品牌场，再把纸做成 hue 258，一整天都是荧光办公室。B 带：极光=窗，纸=桌。品牌蓝留在 primary / 授权 / 极光。

---

## 和清单、字体篇的关系

- [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md) §41：一句话禁令 + 链到本文。不要把本文数字抄回 checklist。
- [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)：选字体。本文选铺底。两件事一起才构成「不是浏览器默认」。
- 附 A 纸纹/材质：纹理叠加在已经正确的纸色上；先色后纹。
