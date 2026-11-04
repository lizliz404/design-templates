---
name: ask-chatgpt-entry
description: >-
  External "Ask ChatGPT" entry for B2B/product sites: the de-facto
  chatgpt.com/?q= prefill link (params, limits, caveats), recommended
  implementation shapes (pinned strip / inline row / button), honest-copy
  rules, prompt engineering for prefill, and the fallback ladder when the
  undocumented mechanism degrades. Coexistence pattern with an on-site
  assistant.
---

# Ask ChatGPT entry — 外部 AI 跳转入口

类型：UI / integration craft（B2B 站的 ChatGPT 外链入口选型 + 落地纪律；非 OpenAI 官方教程）

| | |
|---|---|
| **What** | 在页面放一个入口，点击把用户（可选：带预填 prompt）送到 chatgpt.com 新标签页。机制 = `?q=` URL 参数，de-facto 标准、无官方文档。 |
| **Why** | 客户/采购习惯把供应商内容丢给 ChatGPT 做评估。给一个带真实页面内容的预填链接，比让用户复制粘贴、比自己再养一个外部 bot 都便宜。 |
| **Who** | B2B 企业站、产品页、服务页、文档站——尤其页面内容公开、可复用为 prompt 上下文的场景。 |
| **How to use** | ① §1 机制与参数 → ② §2 三种实现形态选型 → ③ §3 prompt 写法纪律 → ④ §4 诚实文案 → ⑤ §5 caveats 与降级。 |
| **Not this** | 不是站内 AI 助手（那是自己的产品，见 search-craft / consent-gate 邻域）；不是 OpenAI 官方 badge 或 embed（不存在该官方机制）；不承诺「点击即得到答案」。 |
| **When to open** | 需求写「Ask ChatGPT / 在 ChatGPT 中打开」；要给 B2B 页面加外部 AI 评估入口；要在 copy-prompt button 与外链之间选型。 |

**原则一句话：** 用 `https://chatgpt.com/?q=<prompt>` 一行链接解决，prompt 只装页面已公开的事实并显式禁止模型替你承诺参数；把它当外部链接诚实标注，不要包装成站内功能。

---

## 1. 机制与参数（2026-11-04 验证）

**核心事实：OpenAI 没有官方的「预填 prompt 链接」文档。** 官方唯一的链接机制是事后分享会话（shared links, help.openai.com/en/articles/7925741）。但 `?q=` 参数自 ~2024 年初起实际可用、被广泛使用——de-facto 标准，不是合同。

| 参数 | 行为 | 备注 |
|---|---|---|
| `?q=<prompt>` | 打开新会话并把 prompt 放进输入框 | 主用形式，老文档都写它；界面常自动改写成 `?prompt=` |
| `?prompt=<prompt>` | 同上，等价 | `?q=` 会被重写为它；两个都能用 |
| `?model=<id>` | 声称选模型 | **不可靠**：多处报告与 `?q=` 同用时回落默认模型——别依赖，让用户自己选 |
| `?temporary-chat=true` | 临时会话 | 社区报告存在，未经充分验证，别写进合同 |

不能做的事：

- **custom GPT 不支持 prefill**：`chatgpt.com/g/g-xxx?q=…` 静默丢 prompt（launch context 是 open feature request）。
- **不保证自动发送**：登录态下 prompt 落在输入框等用户按 send（部分登出/其他状态下观察到 auto-submit，行为不稳定）。文案写「把这个问题带给 ChatGPT」，不写「ChatGPT 会回答」。
- **长度上限 ~6,000 字符**（URL 编码后）：实际建议 ≤2,000，兼容邮件客户端与旧浏览器。
- **`&` 必须编码**：未编码的 `&` 会在该处截断 prompt——一律 `encodeURIComponent` 整个 prompt。

## 2. 三种实现形态（平列选型）

### F1 — 顶部吸附横条（pinned strip）

```
┌──────────────────────────────────────────────────┐
│ Ask ChatGPT   Take this page's published scope    │ ← sticky, 页面顶部
│               to chatgpt.com — opens in a new tab │
└──────────────────────────────────────────────────┘
```

- 适用：服务/产品详情页，需求写「顶部悬浮」「remain visible while scrolling」时直接对应。
- 实现：复用站点已有的 sticky 次级条语法（jump-bar 同款：`position: sticky; top: <header-h>`，一纸面 + 一条 1px 发丝线 + meta 字号），**整条就是 `<a>`**——需求说「clicking it opens ChatGPT」就整个可点。
- 风险：与已有 jump-bar 同页时会出现两条吸附条——二选一或合并，别叠。

### F2 — 内联文本行（inline row）

```
… section 末尾 …
Ask ChatGPT about this scope ↗ — opens chatgpt.com (your own account)
```

- 适用：详情页已有 CTA 行（RFQ/下载），把外链作为第三个轻动作挂在行尾；视觉成本最低。
- 与 F1 的区别：不驻留，滚走即走——适合「提供入口」而非「常驻提醒」的需求。

### F3 — 按钮（button/pill）

- 适用：营销首屏、hero CTA 组里需要更强存在感时；用站点已有的次按钮样式，**不要**为它发明新色。
- 克制：B2B 站上外部链接做成大主按钮通常过头——它抢 RFQ 的风头。

## 3. Prompt 写法纪律（B2B 红线场景）

预填 prompt 是你写给别人家模型的指令——页面有什么事实就装什么，别编：

```text
I'm evaluating suppliers for <domain>. On its website, <company> describes
this service: <name> — <published summary>. Stated scope: <page's real
scope items>. Help me prepare: (1) technical questions to ask this
supplier, and (2) a checklist for a request for quotation. Do not assume
specifications, certifications, capacity, lead time or pricing — flag
what I must confirm directly with the supplier.
```

- **只装页面已公开内容**：name/summary/scope 直接取数据模型字段，不要手写第二版——页面改了 prompt 就跟着对。
- **显式禁承诺**：你站自己的红线（AI 不许承诺参数/认证/产能/交期/报价）要原样写进 prompt——否则外链成了绕过自家纪律的后门。
- **定位成「帮用户提问」而非「替你回答」**：让用户带更专业的问题回来询盘，是 B2B 场景该要的转化。
- 公司/主体名写法与其余页面一致（法律主体归属红线在外链里同样生效）。

## 4. 诚实文案

入口必须自报两件事：去的是外部站、用的是用户自己的账号。

| 要素 | 写法 |
|---|---|
| 动作名 | `Ask ChatGPT` / `Ask ChatGPT about <thing>` |
| 目标透明 | `chatgpt.com` 字样要出现（可点文本或紧邻说明），加 `↗` |
| 账号提示 | `your own ChatGPT account · sign-in may be required` |
| aria-label | 复述完整事实：`Ask ChatGPT about X — opens chatgpt.com in a new tab` |
| 链接属性 | `target="_blank" rel="noopener noreferrer"`（需求即新标签页） |

反模式：伪装成站内 assistant 的气泡/图标；写「ChatGPT says…」暗示已有答案；把外链画成品牌色大 CTA。

## 5. Caveats 与降级阶梯

| 风险 | 表现 | 缓解 |
|---|---|---|
| 未登录 | 登录重定向后 prompt 可能丢失 | 文案已声明 sign-in；兜底降级到裸链接行为一致 |
| 机制 undocumented | OpenAI 改版可能让 `?q=` 失效 | URL 失效时链接仍打开 chatgpt.com——天然降级到 spec 基线 |
| 移动端 | 未装 app 时走移动 web，登录墙一样 | 无特殊处理；别 deep-link 去 scheme（`chatgpt://` 无官方合同） |
| prompt 截断 | 未编码 `&`/`#` 静默截断 | `encodeURIComponent`；长度留 buffer |
| 与站内助手混淆 | 用户以为两个入口是一回事 | 文案区分：站内叫 `Ask us`，外链叫 `Ask ChatGPT` 并标 chatgpt.com——两个入口可以共存，本来就是两种意图 |

降级阶梯（从优到保底）：

```text
?q= 预填链接 ──失效──▶ chatgpt.com 裸链接（spec 基线）
                        │
                        └── 需要可控体验时：copy-prompt button
                            （复制 prompt → 用户自己粘贴；零外部依赖）
```

## 6. 与站内 AI 助手共存

客户要求两个入口并存时（站内知识库助手 + Ask ChatGPT 外链）：

- **位置分离**：站内助手走顶栏 Search/右下 FAB（惯例），Ask ChatGPT 走页面顶部条或 section 内行——不同位置、不同文案，语义不打架。
- **职责分离**：站内助手答「本站已公开内容」并被红线约束；ChatGPT 外链是用户自己的评估工具，不替你答。
- 别把外链塞进站内助手对话框里当 answer——那是把外部模型输出伪装成你的立场。

## 证据与来源（2026-11-04 查证）

- `?q=` 格式与 `?prompt=` 重写、`?model=` 失效、custom-GPT 丢 prompt：[ailinks.swerdlow.dev/chatgpt/prompt.md](https://ailinks.swerdlow.dev/chatgpt/prompt.md)
- `?q=`/`?model=` 语法确认：[webapps.stackexchange.com/q/172731](https://webapps.stackexchange.com/questions/172731/how-can-i-start-a-chatgpt-conversation-from-a-url)
- ~6,000 字符上限、undocumented 警告、登出丢 prefill：[wow.pjh.is/journal/start-conversations-via-querystring](https://wow.pjh.is/journal/start-conversations-via-querystring)
- `?prompt=`/`?q=` 实测讨论：[community.openai.com/t/query-parameters-in-chatgpt/1027747](https://community.openai.com/t/query-parameters-in-chatgpt/1027747)
- 官方仅支持 shared links：[help.openai.com/en/articles/7925741](https://help.openai.com/en/articles/7925741-sharing-conversations-and-scheduled-tasks-in-chatgpt)

**首例实现**：`~/dev/cfe-app` service pages（`src/components/AskChatGpt.astro`，F1 顶部吸附条，commit a7aff80，2026-11-04）——prompt 由 `service.name/summary/scope` 组装，含禁承诺指令与诚实外链文案。
