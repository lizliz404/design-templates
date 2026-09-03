---
name: on-brand-ai-generation-craft
description: >-
  Keep AI-built pages on-brand with generation contracts: Hallmark's 58-gate
  slop-test plus pre-emit scoring, and Vercel's design.md plus eval-loop
  method. Use before an agent builds a landing, campaign, or report page;
  when output keeps reading as AI-generated; or when distilling a reusable
  design contract from shipped pages.
---

# On-brand AI 生成合同

让 agent 产出的页面 made, not generated。两层可叠用：**Hallmark** 的 gate 词表压词句与构图层的通用 AI 癖好（地板）；**design.md 方法**把本项目品牌判断写成可测合同（屋顶）。Hallmark skill 已装本地 `~/.agents/skills/hallmark/`——58 gates 全文与全部 references 在那里，本文收可迁移的机制。

上游：[Nutlope/hallmark](https://github.com/Nutlope/hallmark)（MIT）· [Vercel blog](https://vercel.com/blog/how-our-agents-build-on-brand-pages-with-design-md) · [design.md 本体](https://vercel.com/design.md)。

## 流程（生成页面前走一遍）

```text
1. 选页型：从命名 macrostructure 里挑（Bento / Long Document / Manifesto / Stat-Led / Letter / Index-First…），先定结构后写码——比逐轴挑参数更难掉回默认节奏
2. 查项目记忆：上一次的页型 / 主题 / paper band / display style / accent hue；本次至少换一轴，并把换血理由写成一句可见的话
3. 写码：色值与字体一律走 token；输入框边宽恒定、focus 走 outline、hover 换 seed 不换布局
4. 过 gates：发码前跑完 58 条 yes/no 检查（本地 skill slop-test.md；高杠杆子集见下节）
5. 六轴自评：Philosophy / Hierarchy / Execution / Specificity / Restraint / Variety，任一 <3 返工；评分写进 CSS 注释留档，下次运行先读
6. 项目已有 design.md 则最先读它：它覆盖 1–5 的默认规则
```

## Gates 高杠杆子集

- 结构指纹：hero → 3 features → CTA → footer 的节奏、极简 nav（wordmark + 右按钮）、四列 footer——三者是「最被认出的 AI 产物」，默认换型。
- 数字诚实：没给的数字用 `—` 占位块或换页型；浏览器 / 手机 / IDE 框一律截图或真组件。
- token 纪律：内联色值 / 字体 = gate fail；`transition: all` = gate fail。
- 三轴轮换判据：连续两次输出在 paper band / display style / accent hue 至少一轴不同——「不像同一个模板」的可操作定义。

## OKLCH 主题构建顺序

accent 定调（chroma clamp 0.12–0.20）→ paper 按 vibe 定 L 带 → ink 反向 → 灰阶层全部向 anchor hue 染色（chroma 0.005–0.02）。

## design.md 方法（品牌判断的合同工程）

Vercel 的实证起点：repo 内 skill 有效，因为 agent 被「真实组件 + 已 ship 样例」包围；脱离环境后，主观短语每个模型解读都发散。设计语言靠 words alone 不可传达——可测合同才可传达。

```text
1. 写 design.md：frontmatter 标 scope（这份合同管哪类 artifact）+ 优先级排序（冲突裁决）+ 构图决策 + 显式命名的反模式清单 + 公开 token / 类名 API
2. 机械决定压进 stylesheet：typography / spacing / 表格语法封装成有界类名；agent 永不读 CSS 本体，文件只记公开 API
3. 建 eval loop：固定 prompts + 冻结 mock 输入与 viewport，文件是唯一变量；首跑存 baseline（无合同版），不 reroll
4. 每条 correction 落最窄处：judgment → prose；可复用机械 → stylesheet；可机检 → 确定性检查；单模型独有失败等它重复再立规
5. 保鲜：真实请求每周聚合，重复投诉自动成提案；按投诉类型计数下降验证修复生效
```

Vercel 实测：200+ runs，with/without 已知失败 39 vs 91（-57%）；边界同样诚实——只能测已命名的失败。起步配方：选一个重复 artifact → 存 baseline → 最近 10 条人工修正改写成可观察语句 → 机械决定压进 CSS → 一次 matched 盲比 → 编码修正再验证。

## 边界

- 收方法不收内容：Hallmark 的页型 / 主题命名、stamp 文案，与 Vercel 的品牌判断、类名体系，留在各自上游。
- 复制机制先适配本项目 `DESIGN.md`；构建通过不等于视觉验收，关键状态与真实截图仍走 pack 验收约定。
