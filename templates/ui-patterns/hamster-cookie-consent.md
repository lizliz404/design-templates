---
name: hamster-cookie-consent
description: >-
  把 Cookie 同意映射成「每开一项就喂仓鼠一块饼干」：开关驱动角色鼓腮与表情，Accept all 高对比、Reject all 弱化。Use when 想研究情感化微交互如何包装合规门槛、或品牌允许 playful 的消费级站点; 不要用在严肃 / 受监管 / to-B 产品。美、值得学，不等于该上生产。
---

# 喂仓鼠的 Cookie 同意面板

一行定位：**同意即投喂**，把「Accept cookies」这种网页八股，用一块饼干飞进仓鼠嘴里的动画包起来。来源：[Ramin Nasibov 的视频帖](https://x.com/RaminNasibov/status/2112210954616295547)（2026-10-19，约 126 赞、39 收藏；与[腊肠狗密码条](./stretchy-dog-password-meter.md)同一作者）。实现工具未公开。可运行的最小演示：[`snippets/hamster-cookie-consent.html`](./snippets/hamster-cookie-consent.html)。

与仓库里严肃的 [`consent-gate.md`](./consent-gate.md) 是两条路：那一篇讲合规策略与法律边界；这一篇只记录一种「把门槛做成玩具」的手艺，以及它为什么好看、又为什么大多不该上线。

## 原作拆解

- 卡片标题「Cookie settings」，副标题「Every cookie you accept goes to the hamster」。
- 中间一只卡通仓鼠；下面三项开关：**Analytics / Marketing / Personalization**；底栏黑色胶囊「Accept all」+ 灰色文字「Reject all」。
- 初始态：三项全关，仓鼠瘪腮、眼神偏委屈，爪子空着。
- 每打开一项：一块巧克力曲奇从开关附近飞进嘴里，腮帮子鼓一档，表情更开心；关回去则吐出饼干、腮瘪回去。
- 三项全开：腮鼓到最大，闭眼满足，周围可有小星点；点「Accept all」等于一口气喂满。
- 光标停在「Reject all」时，仓鼠回到委屈态（回复区也有人注意到「Reject all」几乎看不见）。

## 流程

1. **选一个可数的同意单元。** 这里是三个独立类别；仓鼠只映射「开了几项」，不解释每一项的法律含义。
2. **定投喂档位。** 0 / 1 / 2 / 3 对应腮鼓程度与表情；「Accept all」= 跳到满档。
3. **让隐喻真的发生。** 饼干从开关飞到嘴边，腮与表情跟数量绑定；关开关要可逆（吐出饼干），否则只是一次性特效。
4. **写一句把双关钉死的副标题。** 「goes to the hamster」让「cookie」同时是合规术语和食物。
5. **验收**（见末尾清单）——并额外过一遍「是不是在用可爱逼同意」。

## 机制依据

- **状态：** 一个整数 `acceptedCount`（0–3）驱动腮 `scale` / 脸颊半径、表情离散档、饼干数量。不要用连续插值嘴型。
- **飞入：** 饼干 DOM 或 canvas 粒子，从对应 toggle 的屏幕坐标 tween 到仓鼠嘴部锚点（120–220ms ease-out）；到达后触发一次咀嚼小弹跳。
- **可逆：** 关 toggle 时饼干沿原路径返回或淡出，腮缩回上一档；否则用户会觉得角色「只会讨好」。
- **按钮权重：** Accept all = filled primary；Reject all = ghost / text。这是常见 Cookie 栏布局，但叠上角色委屈态后，**拒绝成本被情感放大**——见「边界」。
- **动画：** spring 或 180ms ease-out；`prefers-reduced-motion: reduce` 时取消飞入与弹跳，只保留 discrete 表情与腮档。
- **可访问性：** 开关本身仍是真实的 `role="switch"`；角色 `aria-hidden`；不要把「仓鼠饿了」当成唯一提示。类别名称与法律说明必须可读，不能只靠插画。

## 回复区洞察

- 「trying to trick me into allowing cookies? okay you win.」（[@karansuthardev](https://x.com/karansuthardev)）——可爱直接转化成了同意冲动。
- 「now you almost made me voluntarily accept cookies! This is devious!」（[@badidol](https://x.com/badidol)）——作者自己也承认这是「狡黠」的设计。
- 「The hamster is innocent. Whoever made “Reject all” nearly invisible is not.」（[@JulianQvale](https://x.com/JulianQvale)）——把锅从角色分到了对比度：情感操纵 + 弱化拒绝，两件事要分开评。
- GDPR 玩笑（[@marksoze](https://x.com/marksoze)）——欧洲语境下这会立刻被当成 dark pattern 教材。

## 边界

- **值得学，多数时候不值得用。** 手艺（双关、可逆投喂、分档表情）是优雅的；用委屈动物推动同意，在 to-B、金融、医疗、政务、任何受 GDPR / 个保法严格审视的产品里，会撞上刻板印象里的「流氓 Cookie 栏」，还更难辩解。
- 需要可举证的显式同意时，走 [`consent-gate.md`](./consent-gate.md) 的 S2 / S3，不要用角色替代勾选语义。
- 若品牌允许 playful：Reject all 至少达到可读对比度；委屈态不要在拒绝路径上加强（拒绝后应平静收起，而不是哭得更凶）。
- 不在同一视图再叠第二个讨好型角色（例如同时上腊肠狗）。

## 和腊肠狗的对照

| | 腊肠狗密码条 | 仓鼠 Cookie 栏 |
|---|---|---|
| 映射 | 连续指标（长度）→ 身体变长 | 离散同意项 → 腮鼓 / 饼干数 |
| 用户目标对齐 | 鼓励更长密码，通常对用户有利 | 鼓励更多追踪同意，通常对站点有利 |
| 风险 | 毒舌文案过头 | 情感胁迫 + 弱化拒绝 = dark pattern |
| 适用 | playful 消费表单 | 演示、实验、极少数允许戏谑的品牌站 |

## 消费项目验收

- 开 / 关每一项时腮档与饼干数一致，Accept all / Reject all 后状态正确。
- 飞入动画在窄屏不溢出卡片；reduced-motion 下无过渡、状态仍对。
- 键盘可操作全部开关与两个按钮；屏幕阅读器读到的是类别名，不是「仓鼠饿了」。
- Reject all 在浅色与深色背景下对比度 ≥ 4.5:1（不要做成「几乎看不见」的原作彩蛋）。
