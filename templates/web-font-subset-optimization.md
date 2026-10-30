---
name: web-font-subset-optimization
description: >-
  一段可直接交给 Agent 的「网页字体瘦身」prompt（Shu Ding 原帖）+ Guillermo Rauch 的实例回帖。Use when 站点字体文件过大、首屏字体拖慢加载、想让 Agent 做 subset / unicode-range 拆分且要求渲染零变化; when 需要一份带像素 diff 验收的字体优化合同。
---

# Web 字体瘦身 prompt（像素不变、字节最小）

上游：[Shu Ding @shuding 原帖](https://x.com/shuding/status/2115855028737200211)（2026-10-30 01:15 Asia/Shanghai；~1.2k likes · 1.7k bookmarks，采集于 2026-10-30）+ [Guillermo Rauch @rauchg 回帖](https://x.com/rauchg/status/2115871430873415690)（2026-10-30 02:20 Asia/Shanghai）。

## 流程（何时跑、按序做什么、终点怎么判）

**何时跑**：字体字节明显占页面大头，或首屏 preload 了整套字体；排版已定稿、不想动视觉。

**做法**：把下方 Full prompt 原文交给 Agent，不改写。原帖说明：「Tell your agent to optimize your site's web fonts. I'm seeing a huge difference on my blog.」

**终点**：Agent 交回每个字体 / 每页的前后字节、像素 diff 结果、偏离要求之处及代价、脚本重跑方式；所有可见差异都被归类（内容变化 / 待修回归 / 无害亚像素）。

### Full prompt（@shuding 原文，逐字）

> Make this site's web fonts load faster without changing how anything looks. Shrink font bytes as far as possible, keep rendering identical, and prove it with before/after pixel diffs. Treat any visual change as a regression unless I approve it. If an optimization would change rendering, tell me what it saves and what it changes, and keep the site looking the same by default. Keep the current loading behavior: don't touch font-display or fallback fonts. Don't add font processing to the build; write a script I run by hand, commit its output, and note when it needs rerunning. First measure the current state: each font file's size, glyph count, variable axes, OpenType features and hinting, plus font bytes per page and what each page preloads. Then find out what the site actually uses, checking inline component styles as well as stylesheets: which characters appear in the content, which axis values and weights each font needs (including one-off overrides and bold inside italics), which OpenType features are turned on, and CSS side effects like `hyphens: auto` using the U+2010 hyphen. Cut each font down to that. Keep the used characters plus Latin-1 and Latin Extended-A, and leave CJK to system fonts if that's how it renders today. Limit variable axes to the ranges in use, and only fix an axis at one value if nothing overrides it. Drop unused OpenType features and hinting. Split each font into two files. A small core with ASCII and the punctuation most pages use (curly quotes, dashes, ellipsis) gets preloaded. An extended file behind `unicode-range` only downloads when a page needs one of its characters. Each file's `unicode-range` should list only characters it actually contains. Watch out for a few things. A generated fallback face between the core and extended files will draw the extended characters before the real font does. Fonts with a Reserved Font Name under the OFL must be renamed internally once subset. Check the generated files, since font tools have quirks. Before calling it done, build a baseline from the same content and pixel-diff before and after on pages with code, italics, accented characters, components with their own font settings, and CJK. Explain every visible difference: content change, regression to fix, or harmless sub-pixel rounding. Re-measure bytes per page and confirm the extended files only load where needed. When you're done, tell me the bytes before and after per font and per page, the pixel-diff results, anywhere you deviated from what I asked and what it cost, and how to rerun the script. Later, it may be worth embedding the core font in the global stylesheet and precaching the extended files after idle.

### 实例回帖（@rauchg 原文）

> a definite 'feel the AGI' moment was watching the agent extract just the necessary geist nerdfont glyphs for [fx.sh](https://fx.sh) to render the terminal really quickly

即：同一思路用在终端 UI（Geist Nerd Font 只抽实际用到的图标字形），不限于博客正文。

## 机制依据（按需查的平铺规则）

- **先量后剪**：文件大小、字形数、可变轴、OpenType 特性、hinting、每页字体字节与 preload 清单，作为 baseline。
- **按实际使用裁剪**：内容字符 + 内联组件样式；轴值与字重（含一次性覆盖、斜体内粗体）；已启用 OT 特性；`hyphens: auto` 引入 U+2010 这类 CSS 副作用。
- **保底字符集**：已用字符 + Latin-1 + Latin Extended-A；CJK 若现状走系统字体就继续交给系统。
- **双文件拆分**：core（ASCII + 常用标点，preload）+ extended（`unicode-range` 按需下载）；每个 `unicode-range` 只列文件里真实存在的字符。
- **已知坑**：core 与 extended 之间生成的 fallback face 会先画 extended 字符；OFL 带 Reserved Font Name 的字体 subset 后必须内部改名；字体工具输出要人工复核。
- **验收**：同内容 baseline，像素 diff 覆盖代码、斜体、带重音字符、自定字体设置的组件、CJK 页面。

## 边界（硬性 guardrail）

- 默认渲染完全不变；任何视觉变化都按回归处理，除非人确认。
- 保持现有加载行为：`font-display` 与 fallback 字体不动。
- 处理脚本手动运行、产物入库，不塞进 build。
- 「核心字体内联进全局样式 + 空闲预缓存 extended」只是原帖提到的后续可选项，不在首轮做。
- 选字体本身走 [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)；本文只管已选字体的交付体积。
