---
name: quote-into-composer
description: >-
  Quote-into-composer: selecting text in an AI reply (or clicking a quotable
  object such as an image/product) surfaces a single-button affordance that
  turns the selection into a first-class compact chip in the composer, then
  echoes as a same-family quote block in the sent message. Use when a chat /
  AI conversation needs "ask about this part" without copy-paste; when quote
  must stay a structured object with a locator back to source, not injected
  text; when the composer chip, send contract, and source anchor need one
  explicit contract across text and object quotes.
---

# 划选引用进输入框（quote-into-composer）

类型：UI micro-pattern（数据合同 + 交互合同；不绑定组件库，不附带整套组件源码）

| | |
|---|---|
| **What** | 用户在 AI 回复里划选一段文字（或点一张可引用的对象图）→ 选区旁出一个单钮浮条 → 引用变成输入框上方一颗紧凑 chip → 发送后消息上方同族引用块带原样文本，可点回源。 |
| **Why** | 这个控件最贵的不是样式，是**把引用降级成注入文本**：引用文本塞输入框改也不是删也不是、chip 占两屏大卡片、发送后引用和用户话混成一坨、引用对象丢了锚点再也点不回去。 |
| **Who** | AI 对话/助手界面「追问这一段」、画布/文档式工作台里对商品图、段落、字段发起讨论。 |
| **How to use** | ① §1 定形状 → ② §2 定分层数据（quote 对象/传输/缩略旁证）→ ③ §3 状态流 → ④ §4–§7 逐条落规则 → ⑤ §9 验收 → ⑥ §10 接法取舍。 |
| **Not this** | 不是 `>` blockquote 手打（Slack 形态）；不是文内锚定评论（Notion/Linear 旁注）；不是长按/右键引用菜单（微信形态可借呈现、不借手势）。 |
| **When to open** | 「能不能引用这段话再问？」「图片怎么圈给 AI 看？」「引用 chip 太丑/选中样式是浏览器默认蓝」「发送后引用去哪了」。 |

**原则一句话：引用是一个有锚点的对象，不是一段贴进输入框的字。**

本文把规则分成两类，读的时候别混：

- **[硬]** —— 由合同完整性、可达性、或可恢复性决定；违反就是 bug，换产品也一样。
- **[POLICY]** —— 依赖产品语境、引用密度、团队手感；必须**明确选一条并写进设计说明**，不是必须选某一条。

---

## 1. 先定形状，五种别混

| 形状 | 引用进哪 | 锚点 | 常见用途 | 何时不该用 |
|---|---|---|---|---|
| **划选→composer chip**（本模式） | 输入框上方 chip | 结构化定位（messageId/selector/position） | AI 回复局部追问 | 引用目标是自由文本域——那是复制粘贴 |
| **对象→composer chip**（本模式扩展） | 同上 | 对象指纹→渲染层 locator | 商品图/卡片/字段圈给 AI | 对象没有可回锚的 locator——引了找不到就别说引了 |
| **`>` 文本注入** | 输入框文本本体 | 无 | Slack/邮件式 blockquote | 文本进输入框后用户改不动锚点、退格一格一格删 |
| **文内锚定评论** | 旁栏/气泡 | 选段范围 | Notion/Linear 审阅 | 目标是「向 AI 提问」不是「留下批注」 |
| **长按/右键引用菜单** | 同上 chip | 同左 | 微信/WhatsApp/iMessage | 桌面 Web 主通道——长按是触屏兜底手势，不该当唯一入口 |

**[硬] 判定第一问：引用要回锚到源吗？** 要 → chip 必须带 locator 合同，不是本模式别来沾边。
**[硬] 判定第二问：引用文本会进可编辑输入区吗？** 会 → **不是**本模式；引用必须活在输入区上方的 first-class chip 里。

---

## 2. 分层数据：quote 对象、传输载荷、UI 旁证是三件不同的事

```
QuoteObject = { kind, label, messageId|objectRef, text|ref, anchor? }
传输载荷     = metadata.custom.quote（独立字段，不拼进用户可见文本）
缩略旁证     = 会话内 Map<ref → dataURI>，UI 装饰，不进载荷
```

- **[硬] QuoteObject 是结构化对象**：`kind`（text/image/…）、`label`（定位标签）、`text` 或对象引用、`anchor`（可选定位提示）。发送时走独立传输字段（如 assistant-ui `metadata.custom.quote`），**永不拼接进用户输入的可见文本**。后端要 `>` 前缀水合是传输层的事，UI 层不背。
- **[硬] 单 quote 还是多 quote 是合同级选择**，实现前定死（见 §10）。
- **[POLICY] 缩略图/预览**：图片引用的真缩略图是**旁路登记**（会话内 LRU Map），不进 quote 载荷——刷新/旧消息查不到时退回 icon，属设计内降级，不空位。
- **[硬] anchor 定位必须有多级回退**：selector → 数据指纹 → position 序号；漂移态要可表达（「已改过」标），不是静默错锚。

---

## 3. 状态流

```
idle → selecting → affordance(选区旁单钮) → quoted(chip 在 composer) → sent(echo 块) → (dismiss× | Backspace删 | replace新引用)
                                                                                 ↘ anchorDrifted(可选标「已改过」)
```

- **[硬] affordance 与选区同生共死**：选区塌陷/滚动/换消息 → 浮钮立即消失，不悬空。
- **[硬] quote 不等于 composer 非空**：只有 chip 没有正文 → 发送钮不可用（assistant-ui 上游合同同款）。
- **[硬] 编辑态禁 affordance**：对象处于编辑模式时单击是改字段不是引用，此时不出现「引用」角标/浮钮，防误导。
- **[POLICY] replace vs append**：新引用替换旧 chip（简单、上游同款）还是叠加多 chip（多段引用场景）；选哪个写进合同。

---

## 4. 划选 affordance

- **[硬] 单钮，不是工具条**：选区旁一个「引用到对话」钮（icon + 短文案 ≤4 字）。多钮浮动工具条是文内编辑场景的形态，引用场景只会误触。
- **[硬] portal 定位、滚动即隐**：浮钮 portal 到 body，锚定选区矩形；选区塌陷或滚动即消失（assistant-ui SelectionToolbar 同款）。
- **[POLICY] 选区自绘样式**：`::selection` 品牌淡标（accent 低透明底）替浏览器默认蓝——全站统一则做，不做则裸默认也可接受，**但别一处自绘一处裸奔**。
- **[POLICY] 位置**：桌面选区上方；触屏选区下方（够拇指）。无入场动画或仅 ≤150ms 淡入——浮钮即现是朴素正道，弹出动画是噪音。

## 5. Composer chip

- **[硬] 单层紧凑行**，骑在 input 上方、与 composer 同心半径：icon/缩略图 + 定位标签（600 字重）+ 原文单行 ellipsis + 右侧 ×。双段式大卡片（徽章行+两行 clamp）是已知反面教材——占高、喧宾夺主。
- **[硬] 可销毁**：× 点击、composer 开头 Backspace（空输入时）删最后 chip。
- **[POLICY] chip 点开看全文**（popover）还是点击跳回源消息：二选一写清；IDE 系是 hover 看上下文，chatcn 是点回源消息。

## 6. 发送后 echo

- **[硬] 同族单行引用块**在用户消息上方（label + 截断原文 + 可选缩略图），视觉是 chip 的降一档同族（字号 -0.5~1px、缩略图 -4px），不是 blockquote 大灰条。
- **[硬] 可点回源**：echo 点击跳回源消息/源对象定位（selector→fingerprint→position 三级回退+命中闪烁）。
- **[硬] 完整 quote 留 DOM**：截断只是视觉，屏幕阅读器读全。

## 7. 可达性

- **[硬] 浮条 `role="toolbar"`、单 tab 站**；chip 分组名 "Replying to"；删除钮名 "Remove quote"。
- **[硬] 触屏无 hover 也能发起**：划选→浮钮在触屏同样可达（selection 事件不依赖 hover）；对象引用在触屏是点按不是悬停角标。

---

## 9. 验收清单

- [ ] 划选 AI 回复 → 单钮浮条出现在选区旁，滚动即隐
- [ ] 引用 chip 单行紧凑、× 可删、空输入 Backspace 可删
- [ ] 只有 chip 不能发送
- [ ] 发送后 echo 同族单行块在消息上方、点击回源命中
- [ ] 图片引用缩略图是真图，查不到时退 icon 不空位
- [ ] 编辑态不出现引用 affordance
- [ ] quote 走独立传输字段，用户可见文本无拼接
- [ ] 屏幕阅读器读到完整引用与具名删除钮

## 10. 接法与反例

- **传输**：assistant-ui `setQuote → metadata.custom.quote`；自研则 quote 与 text 分字段走，后端需要 `>` 前缀时由后端水合。
- **单/多 quote**：上游单 quote 语义最稳（新引用替换旧）；多 chip 要自管集合与回退。
- **已知反例**：浏览器默认蓝选区（未经设计的裸奔）、引用进输入框文本（锚点即死）、发送后引用消失在正文里（用户看不到自己问了哪段）、浮钮加弹性入场动画（高频交互不该庆祝自己出现）。

**行业对照（归纳来源）**：assistant-ui `SelectionToolbar/ComposerQuote/QuoteBlock` 三件式解剖（最贴实现层）；ChatGPT quote-reply 选区 popup；chatcn `PromptInputHeader` chip 同心半径+分组名；Slack `>` 手动 blockquote（反面对照）；微信 2025-07 起图/视频可引用（对象引用先例）；字节 chatkit「划词追问」选区浮钮+结构化 kind:'quote'；IDE chip（Cursor/⌘L）定位标签+截断上下文的单行形态；nekogpt 输入框只显预览原文全发（输入区零占用的极端）。
