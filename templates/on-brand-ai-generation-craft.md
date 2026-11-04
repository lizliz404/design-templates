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
1. 先完整读消费项目 canonical DESIGN.md / design.md：scope、优先级、生效项、待定项、验收；缺失或矛盾先补，不从散落实现倒推品牌
2. 指定对标对象时先测它们实际选择：字体 family/文件/实际渲染、各角色 weight/size/line-height/tracking，以及配色用途与结构；原版/替代/授权问题分开，不凭“行业气质”自行填候选
3. 把采纳的明确选择与来源写进合同主章节；候选/推荐不是批准，追加研究不自动覆盖正文。选型冻结后才选匹配资产、页型和 token 接线
4. 实现只消费已定 token / 类名 API；输入框边宽恒定、focus 走 outline、hover 不换布局。不擅换字体/品牌色，也不为求 Variety 轮换同一品牌
5. 在合同适用范围内跑 Hallmark gates / 六轴检查；模板默认和个人偏好不得覆盖合同。发现冲突先修合同，不让 worker 各选一版
6. 用真实页面验收：桌面/窄屏/关键状态，字体确实加载并渲染、对比度/换行/溢出/键盘/motion。build 或 computed font-family 字符串不等于通过
```

## Gates 高杠杆子集

- 结构指纹：hero → 3 features → CTA → footer、极简 nav、四列 footer 可用作通用 AI 味排查，但不是自动禁用。合同或原站证据明确支持时保留；结构服务买家任务，不为“不同”随机换型。
- 数字诚实：没给的数字用 `—` 占位块或换页型；浏览器 / 手机 / IDE 框一律截图或真组件。
- token 纪律：内联色值 / 字体 = gate fail；`transition: all` = gate fail。
- 三轴轮换只用于未定品牌的独立探索稿；同一项目的已定 paper band / display style / accent hue 要保持一致，不机械执行“至少换一轴”。

## OKLCH 主题构建顺序

仅在没有已定色板、且合同授权探索时使用：accent → paper → ink → 灰阶。已有品牌/客户色系或指定对标时先取实际 token 与角色关系，不按 vibe 另造色板；这些 chroma 区间是探索工具，不是通用硬约束。

## design.md 方法（品牌判断的合同工程）

Vercel 的实证起点：repo 内 skill 有效，因为 agent 被「真实组件 + 已 ship 样例」包围；脱离环境后，主观短语每个模型解读都发散。设计语言靠 words alone 不可传达——可测合同才可传达。

```text
1. 写/修唯一 design.md：scope + 冲突优先级 + 生效/候选状态 + 字体角色（family/weight/size/行高/字距/加载与授权）+ 配色语义用途 + 构图/间距/交互边界 + 公开 token / 类名 API + 可观察验收。数值先有需求或对标实测依据，不拿“高级/工程感”代替选择
2. 已定机械决定压进唯一 stylesheet/token 层；合同记公开 API 和选择依据。实施/审计时读相关 CSS 核对接线与实际渲染，不从 CSS 反写批准、不维护多份冲突色板或字体默认
3. 建 eval loop：固定 prompts + 冻结 mock 输入与 viewport，文件是唯一变量；首跑存 baseline（无合同版），不 reroll
4. 每条 correction 落最窄处：judgment → prose；可复用机械 → stylesheet；可机检 → 确定性检查；单模型独有失败等它重复再立规
5. 保鲜：真实请求每周聚合，重复投诉自动成提案；按投诉类型计数下降验证修复生效
```

Vercel 实测：200+ runs，with/without 已知失败 39 vs 91（-57%）；边界同样诚实——只能测已命名的失败。起步配方：选一个重复 artifact → 存 baseline → 最近 10 条人工修正改写成可观察语句 → 机械决定压进 CSS → 一次 matched 盲比 → 编码修正再验证。

## 边界

- 收方法不收内容：Hallmark 的页型 / 主题命名、stamp 文案，与 Vercel 的品牌判断、类名体系，留在各自上游。
- 复制机制先适配本项目 `DESIGN.md`；原站事实、CFE 等消费项目的选择、通用可复用机制分层保存。原版商业字体与免费替代不是等价物，公开资源可访问不代表有再分发许可。
- 构建通过不等于视觉验收，关键状态与真实截图仍走 pack 验收约定。
