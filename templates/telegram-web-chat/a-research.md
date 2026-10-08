> 归档说明：这是原研究/实施阶段的记录，不是当前产品状态。出海云路径（`web/`、`PRD.md` 等）均相对 [chuhai-cloud 固定实现版本](https://github.com/hanzili/chuhai-cloud/tree/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a)。后续实施与证据边界见 [执行对账](execution-record.md)。仅将机器绝对路径转换为来源说明，保留原阶段判断；不把旧候选改写为当前缺口。

# Telegram Web A 深读：消息、发送、内容与导航

- 日期：2026-10-07
- 对象：Telegram Web A（`Ajaxy/telegram-tt`）
- 固定 revision：`28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80`
- 公开来源：`https://github.com/Ajaxy/telegram-tt`；源码按
  `https://raw.githubusercontent.com/Ajaxy/telegram-tt/28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80/<path>`
  定点获取。
- 固定快照：`原研究机归档 a-src/（未随本包复制；按固定 revision + evidence/a-src-receipt.tsv 可重新获取并核对）`
- tree manifest：`evidence/a-tree-28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80.json`，SHA-256
  `3e59b6199456f28e26e1b5dad02a075e7862ccd68cbc076c4974f3de792b5369`。
- 文件收据：`evidence/a-src-receipt.tsv`；本阶段 52 个文件、36,554 行，每项记录 path、行数、SHA-256。
- 边界：这是上游研究，不是产品 SOT；没有登录 Telegram、没有读取私聊、没有跑 Telegram 真机/弱网/性能测试，也没有修改 Chuhai 产品代码、依赖、API、schema 或认证。
- 输入缺口：任务指定的 `原临时交付 telegram-web-ak-learning-20261007.md`
  在本机不存在。`session_search` 只恢复了任务原文，没有恢复该文件内容，因此本文没有伪称已读。

## 结论先行

Telegram A 最值得复用的不是外观，而是四个边界清楚的机制：

1. **滚动位置是“可见对象身份 + 几何偏移”，不是一个裸 `scrollTop`。** 历史窗口替换前记录
   DOM anchor，布局后按该元素的 top 差补偿；异步内容增长只在用户原本贴底时跟随；搜索定位在
   MessageList reflow 后覆盖普通恢复。
2. **未发送稿、已乐观发送消息和服务端 canonical message 是三种对象。** Draft 按
   `chatId/threadId` 保存；发送立即创建 local message；成功时以 `previousLocalId` 迁移到服务端 ID，
   失败时原 local message 留在列表并标记 failed。
3. **内容不是“把 Markdown 塞进一只气泡”。** 普通 entity text、rich block message、网页预览、媒体、
   poll/todo 等是分型渲染；复制也从结构化内容重新序列化。这个原则可用于 Chuhai 的 answer / question /
   proposal / run receipt，但 Telegram 没有提供 Chuhai 的 AI working semantics。
4. **搜索定位、overlay 关闭和浏览器 back 是三层协作。** 搜索结果调用 `focusMessage`；Escape 先清
   query/filter、再次 Escape 才关闭；Modal 统一接 focus trap、Escape/native cancel 和 history back。

Chuhai 已有更适合付费创作的 server-owned Journey 与 `clientRequestId` 幂等恢复，不应换成 Telegram 的
IM random-id/service 层。当前最值得验证的两个产品候选是：

- **先写 fixture 再决定是否适配 DOM anchor**：只解决“视口上方富卡异步增高导致读旧消息跳动”，
  不建立不存在的历史分页。
- **仅保存 `draftKind:'unsent'` 的 goal**：与在途 request、失败重试、已创建 run 完全分开，并纳入
  身份 scope 与退出清理。

这仍是第一阶段源码研究，不代表已“研究透” Telegram A。

---

## 证据分级与状态词

- **源码事实**：固定 revision 的函数、调用、状态和 cleanup 可直接读到。
- **Chuhai 代码事实**：当前工作树读取到的产品代码和已有 mock/browser 测试。
- **推断/候选**：由同构问题导出的建议，必须先用可撤销 fixture 证明。
- **未验证**：需要真实 Telegram、真实 Chuhai 浏览器、移动设备或网络环境才能回答。

Chuhai 对照状态只用：**已落地 / 局部 / 缺失 / 无需要 / 待验证**。
复用分类只用：**直接 copy/adapt / 成熟 lib / 仅交互参考 / 不该搬**。

## 覆盖清单

| 纵向链 | 已追到的真实边界 | 结果 | 仍未覆盖 |
|---|---|---|---|
| MessageList | viewport load trigger → 历史窗口变更前 anchor → layout 后补偿 → 异步增长 → 发送贴底 → focus relocation → cleanup | 已形成完整正向、异常/切换、返回链 | Telegram 登录态实际滚动；图片真实解码时序；低端机性能；浏览器版本差异 |
| Composer | 输入 → draft debounce/切线程保存 → attachment prepare → optimistic local message → API randomId → success ID migration / failed state | 已形成完整正向、失败、切换、清理链 | 失败 bubble 的每一个 UI retry caller；跨设备 draft 冲突协议；断电级 durability |
| 消息内容 | `Message` 分流 → entity/rich renderer → partial rich load → copy serialization → typed business content | 已形成渲染与复制链 | Telegram 所有 rich block 类型；可访问性实测；粘贴到不同宿主的 fidelity |
| 导航 | search state/API → result → `focusMessage` → reflow 后聚焦；Escape reset/close；Modal focus/history；chat hash records | 已形成定位与返回链 | Telegram 外部 URL 冷启动的全部 route parser；Chuhai 真机软键盘和浏览器 Back |
| A/K 交叉挑战 | 已读 `k-research.md` 全文并逐项比较收益、成本、重复与反例 | 已完成，见后文 | K 后续若新增证据需再对账；本文不修改 K 文件 |

---

## 链 1：MessageList 读取、恢复、异步尺寸与发送滚动

### 1.1 用户动作到状态链

**动作 A：进入 thread 或滚到历史边界。**

1. `MessageList`（`MessageList.tsx:229`）接收 `messageIds/isViewportNewest/focusingId` 等 global
   selector 投影。
2. `useScrollHooks`（`useScrollHooks.ts:26`）用前后两个 intersection trigger 调
   `loadViewportMessages({direction: Backwards|Forwards})`；请求被 1 秒 leading debounce。
3. `isReplacingHistoryRef.current` 为真时，observer 不继续加载，避免替换窗口期间叠加请求。
4. `MessageList` 初始内容过少时会 `loadMoreAround()`，但末尾是 local message 时明确跳过；源码注释给出的
   原因是发送中加载历史可能返回同一消息，造成歧义（`MessageList.tsx:829-848`）。

**动作 B：历史窗口被 prepend/replace，用户仍在读原位置。**

1. DOM 变更前，`useSyncEffect` 设置 `isReplacingHistoryRef`，保存 `scrollTop`，并从仍在新窗口里的
   message elements 中选第二个（优先避开可能未完整加载/被切走的第一项）作为 anchor：
   `rememberScrollPositionRef`（`MessageList.tsx:851-884`）。
2. layout 后重查同 `anchor.id`；若存在，执行：
   `newScrollTop = oldScrollTop + (newAnchorTop - oldAnchorTop)`
   （`MessageList.tsx:1280-1283`）。anchor 消失时才依次退到 unread divider 或 bottom offset。
3. mutate 后更新 `scrollOffsetRef`，下一 measure 才清 `isReplacingHistoryRef`。这是读取、测量、写 DOM
   的明确相位，而不是在 render 中反复写 `scrollTop`。
4. local message 成功换成 server ID 时，`MessageListContent` 看到 `previousLocalId`，同步把
   `anchorIdRef` 从旧 HTML id 改成新 id，避免 ID 迁移把 anchor 弄丢
   （`MessageListContent.tsx` 的 document group 与普通 message 两处分支）。

**动作 C：图片/富内容/翻译等异步撑高消息。**

1. `MessageListContent` 的 `useResizeObserver(messagesContainerRef, handleContentResize)` 只上报正增长
   （`MessageListContent.tsx:184-197`）。
2. `MessageList.handleContentResize` 先扣除 pending top growth；正在 replace history、主动自动滚动、刚写
   scrollTop 或 send animation 时不重复干预。
3. 如果有 active glide，先 retarget animation；否则只有“增长前已在底部且当前是 newest viewport”才重置到
   底部（`MessageList.tsx:765-806`）。读旧消息时不会因下方增长被强拉到底。
4. 它没有为所有异步增长都手工执行 anchor-top 补偿；浏览器默认 anchoring 可能参与，但这不能从源码当作
   明确合同。

**动作 D：自己发送消息。**

1. 新 outgoing message 被识别为 added tail；MessageList 暂时移除 bottom snap，冻结 FAB/notch，计算新增
   消息高度。
2. 只有原 viewport 在 newest 且在 bottom threshold 内时，才 animate 到最后消息；后台态可改为 first unread。
3. 少量消息时临时增加可滚空间，发送 collapse 动画结束后 timer 移除 class。
4. 所有 timeout 均有 refs；组件的 unmount cleanup 会清发送/scroll/live-tail timers。observer/listener 分别由
   hooks cleanup。

### 1.2 浏览器原生 anchor：能确认什么，不能确认什么

固定 revision 的 `MessageList.scss` 明确：

- `.MessageList` 使用 `overflow-y: scroll`；
- 贴底态 `.with-bottom-snap` 使用 `scroll-snap-type: y proximity`，`.fab-trigger` 是 snap target；
- 只有 `.live-tail` 显式 `overflow-anchor: none`（`MessageList.scss:95-122`）。

因此：

- **事实**：Telegram A 对历史替换使用显式 DOM anchor 算法；对贴底还使用 CSS scroll snap。
- **事实**：它只对 live-tail 关闭 native anchoring，没有全局关闭。
- **未验证**：其它消息上的浏览器原生 anchor 在各浏览器到底承担多少稳定作用。不能写成“Telegram 完全靠
  native anchor”，也不能写成“完全禁用 native anchor”。

### 1.3 搜索/跳转覆盖普通恢复

`useFocusMessageListElement` 在 focus message 因 viewport replacement 而 relocated 时，不立刻滚动；它通过
`requestAfterMessageListReflow(exec)` 排到 MessageList 普通恢复之后，再按 top/bottom reserve 和目标位置滚动。
这样“恢复用户阅读位置”和“用户明确要求定位搜索结果”不会互相抢最后一次写入。

### 1.4 Chuhai 对照

| 能力 | 当前事实 | 状态 | 判断 |
|---|---|---|---|
| 只有贴底时跟随内容增长 | `AgentChatShell`：`stickRef` + 48px threshold + `ResizeObserver` | 已落地 | 同目标、实现更小，保留 |
| 用户发送后主动滚底 | `AgentGoalComposer.send` 递增 `pinSignal`，Shell smooth/ reduced-motion 跟随 | 已落地 | 不算新发现 |
| 读旧消息不被下方 append 抢位置 | mock E2E 覆盖滚到上方后 DOM append，scrollTop 不变 | 已落地 | 该 fixture 只测下方增长，不等于上方富卡增长 |
| prepend/history window replacement | 当前 thread 最多 10 个 session turns，没有消息分页窗口 | 无需要 | 不为 Telegram 对称性建立假分页 |
| 上方已渲染富卡异步增高仍保持同一可见对象 | Shell 只记录“贴底/不贴底”，没有 element identity + top delta | 待验证 | 先证明真实 proposal/receipt/media resize 能复现跳动；浏览器 native anchoring 可能已经足够 |
| async focus 要覆盖普通 reflow | 当前主要是主动 send pin、confirm button ref、dialog return focus | 局部 | 若以后有 message search/deep focus，再抽象，不提前搬 scheduler |

**候选 A1 — verify-first adapt**

- 目标函数：`web/src/features/agent/chat/AgentChatShell.tsx`，可局部增加
  `captureVisibleAnchor()/restoreVisibleAnchor()`；不要复制 Teact signals、`fasterdom` 或完整 MessageList。
- 成本：低到中，约一个本地 hook/40–80 LOC，无新依赖；风险是与浏览器 native anchor 双重补偿。
- 可撤销验证：先扩 `web/e2e/hunjian-chat.spec.ts`，让当前 viewport 上方一个真实 proposal/receipt block
  在 `ResizeObserver` 后增高，比较同一 `[data-message-key]` 的 `getBoundingClientRect().top`。若当前浏览器已经
  稳定，停止实现；若失败，再加局部补偿，删除 hook 即可回滚。
- 反例：现有测试直接往内容末尾 append，不能证明“上方增长”问题，也不能证明移动 Safari。

复用分类：**DOM top-delta 算法可 adapt；Teact global state、fasterdom scheduler、IM history loader 不该搬。**

---

## 链 2：Composer、draft、附件与发送状态

### 2.1 未发送稿：线程作用域、保存与恢复

`MessageInput → useDraft → global saveDraft/clearDraft → API saveDraft`：

1. 输入发生后，`useDraft` 用 `isTouchedRef` 区分用户本地改动和已 hydrate 的服务端稿。
2. 普通变更按 `DRAFT_DEBOUNCE` debounce；切 `chatId/threadId` 的 layout-effect cleanup、进入 background、
   beforeunload 都调用 `updateDraft`。
3. 保存键的语义是 `chatId + threadId`。debounce 回调兑现前再次比较当前 id，旧线程定时器不得回写新线程。
4. `global/actions/api/messages.ts:saveDraft` 先把 `isLocal:true` draft 写入 thread local state，再调用 API；
   回包后只有 selector 仍指向同一个 `newDraft` 对象才改成 `isLocal:false`，旧回包不会覆盖后续输入。
5. hydration 时：
   - 当前有 unresolved media，不用持久稿覆盖本地上传；
   - 当前已 touched 且 remote draft 消失，不清本地输入；
   - 同线程本地改动不被普通 remote echo 覆盖；
   - 切线程时恢复该线程 rich/text draft；custom emoji 另行加载。
6. 清稿可选择保留 reply/suggested-post metadata；发送 API 自身传 `clearDraft:true`。

**边界**：A 的 draft 证据说明文本/结构化 draft 可恢复，不说明普通 `File/Blob` 可跨刷新恢复。

### 2.2 普通附件 modal：准备、失败降级、切换与清理

`useAttachmentModal` 的真实语义：

1. file select/append 先 `buildAttachment`，加入带 `uniqueId/isPreparing` 的本地 attachments。
2. `prepareAttachment` 异步完成后按 `uniqueId` 查当前项；用户已经移除或替换时，结果只 revoke URLs，绝不复活。
3. photo preparation 失败时，可发送 document 则降级为 file；不能发送 document 或编辑目标不兼容则移除并
   revoke。
4. 权限、类型、大小限制失败都会 revoke 新 URL；列表替换会 revoke 不再被新列表引用的旧 URL。
5. `handleClearAttachments` 全量 revoke。

**反例**：这是 modal 生命周期内的 transient File/URL ownership，不是 durable attachment draft。不能把它翻译成
“Telegram 刷新后附件还在”，也不能代替 Chuhai 的稳定 `materialId`。

### 2.3 发送：local message → pending/failed → canonical ID

`useSendMessageAction / global send action → GramJS sendMessageLocal/sendApiMessage → api updater`：

1. `sendMessageLocal` 调 `buildLocalMessage` 并立即 `sendApiUpdate(newMessage)`；optimistic local ID 是在
   API 层创建，不是 React composer 凭空造一个气泡。
2. `sendApiMessage` 生成协议 `randomId`；超过 fast-send timeout 后把 local message 标为 pending。
3. 附件 upload 或 API 失败最终发送 `updateMessageSendFailed`；updater 保留该 local message，只把
   `sendingState` 改为 `messageSendingStateFailed`。
4. 成功回包的 `UpdateMessageID/UpdateShortSentMessage` 进入 `handleLocalMessageUpdate`；updater 删除 local ID，
   写入 server message，并保留 `previousLocalId`。MessageList 用它维持 anchor，播放器等子系统也迁移 ID。
5. API 返回后仍处理其余 server updates；这是 canonical state 替换 optimistic state，不是“请求 resolve 后简单
   把 spinner 关掉”。

**幂等边界**：协议 `randomId` 参与 Telegram 服务端消息映射，但本阶段没有完整追完“用户点 failed bubble retry”
是否复用同一个 randomId。因此不能把它宣称为可直接复制的 retry idempotency；更不能拿它替代 Chuhai
`clientRequestId + request_hash + canonical JourneyRun`。

### 2.4 Chuhai 对照

Chuhai 的真实链是：

`Workspace.prepareAgentStart → interpretMixGoal → POST journey.run.prepare →
AgentRunWorkspace.prepareGoal → agent.selectRun → AgentGoalComposer.send`。

- `AgentGoalComposer.goal` 是 component `useState('')`；未发送文本在 remount/refresh 后不恢复：**缺失**。
- `send()` 立即清输入，但把 `submittedGoal/retryRequest/clientRequestId` 留在本页；recoverable error 会先自动用
  同一 ID 再调一次，错误按钮“继续处理”也复用该 ID：**页面内已落地**。
- 后端 `journey_service.prepare` 按 `(company_id, creator_id, client_request_id)` 找 run，校验同一 ID 的
  `request_hash`，相同请求恢复/去重，不同请求返回 409；唯一索引竞态也有兜底。测试
  `test_prepare_question_replay_is_deduped_and_never_reruns` 覆盖 stored question replay：**已落地**。
- 这仍是 **at-least-once client invocation + server idempotency**，不是前端 exact-once。
- `AgentRunWorkspace` 把最近 run IDs/turns 存入固定 sessionStorage keys；刷新可恢复 browser-session 历史，
  `waiting_confirmation` 还会经 `onRestorePrepared` 重建确认面：**局部**。
- 这些固定 `hunjian-agent-session-*` keys 当前没有身份 scope，`gateway.clearPrivateWorkspaceState()` 的退出/换身份
  清单也没有它们。这是代码事实；是否在真实换号路径泄露旧 turn 未做浏览器验收：**待验证**。
- proposal 带 `selectionKey`；素材变化会取消旧 run，再读取 latest prepare callback 重建。取消失败不继续；取消后
  prepare 失败保存同 request ID 供重试：**已落地，且比 IM thread identity 更贴创作业务**。

**候选 A2 — unsent-only draft**

- 目标函数：`AgentGoalComposer` 周边新增小型 `useUnsentGoalDraft`，键至少包含
  `storageIdentityScope() + route/surface`；只存 `{draftKind:'unsent', text, updatedAt}`。
- 明确不存：`submittedGoal`、`retryRequest`、`clientRequestId`、run/proposal、local `File`。
- 生命周期：input debounce 保存；真正进入 `send()` 前删 unsent draft；`newSession()` 明确清；换身份/退出把前缀
  加入 `clearPrivateWorkspaceState()`；失败仍由 server-owned run + 同 request ID 接管。
- 成本：中；无新依赖，但涉及 storage key、身份清理和 5 个 acceptance cases。
- 可撤销验证：刷新前未发送文本恢复；发送后刷新不恢复成“可再次发送”的新稿；504 页面内仍用同 request ID；
  新会话清；模拟换 identity 后不可见。删除 hook/storage prefix 即可回滚。
- 分类：**adapt 状态分层，不复制 Telegram draft manager/API。**

附件结论：Chuhai 已用 upload queue、analysis state 和稳定 material ID 解决业务附件；A 普通 modal 没有提供更强的
刷新恢复。K rich upload 的 task ownership 可作审计参考，但也不能替代 material contract。

---

## 链 3：消息内容层级、格式、复制与真实状态

### 3.1 Telegram A 的内容分型

`Message.tsx` 不是单一 Markdown renderer：

1. `Message` 先按 content 中的 photo/video/document/poll/todo/webPage/action 等选择专用组件和布局；时间、
   views、edited、sending state 等由 `MessageMeta` 独立承载。
2. 文本有两条路：
   - `content.richMessage` → `MessageRichText` → typed blocks；
   - 普通 formatted text → `MessageText` → `renderTextWithEntities`。
3. entity renderer 递归组织 nested entities，明确处理 code、pre、blockquote、URL/TextUrl、mention、email 等；
   它消费 Telegram entities，不是解析任意 Markdown 字符串。
4. `MessageRichText` 可只渲染 `partCutoff`；用户点“更多”后 `loadRichMessage`。成功才展开；失败保持 partial
   collapsed，并在 finally 清 loading key。
5. `WebPage` 作为 typed preview 独立打开 URL；poll/todo/media 也不是伪装成正文里的 Markdown 表格。

### 3.2 复制不是 `innerText` 的单一路径

`buildMessageCopyContent`：

- 先按权限 selector 过滤可复制消息并按 ID 排序；
- rich message 若还是 partial，先并行 `loadRichMessage`；仍 partial 则明确抛
  `RICH_MESSAGE_LOAD_FAILED`，不悄悄复制半截；
- selection HTML、rich blocks、普通 formatted text 都转 Tiptap JSON，再同时序列化 plain/rich clipboard 内容；
- 空内容抛 `EMPTY_MESSAGE_COPY_CONTENT`。

单个 code entity 另有 click copy helper。这里可借的是“复制内容合同与渲染合同一致”，不是把 Tiptap 引入 Chuhai。

### 3.3 typing 不是 AI working

A 源码里有 `isTypingDraft/wasTypingDraft`、文本 streaming/translation/summary pending 和 message send state。
这些描述对方正在输入、内容更新或发送协议状态。它们不等于：

- Agent 正在调用哪个 tool；
- 后端 Run 当前 step/status；
- 付费生成是否继续；
- approval gate 是否等待用户；
- 网络断开后任务是否仍在服务器运行。

因此本文没有从 Telegram 推导 AI semantics。

### 3.4 Chuhai 对照

| 能力 | 当前实现 | 状态 | 结论 |
|---|---|---|---|
| 普通 user/answer 文本 | `whitespace-pre-wrap` plain text | 已落地 | 信息密度清楚，但不支持 entity link/code |
| 业务富内容 | `ProposalCard`、`QuestionMessage` options、`ChatToolChips`、`RunReceipt`、`HumanGateCard` | 已落地 | 与 Telegram typed content 原则同构，且业务语义更强 |
| working truth | `useAgentProgress(clientRequestId)` + canonical run status/step；UI 区分 preparing/starting/running/gate | 局部/已落地 | 不能退化成三个跳点或 Telegram typing dots |
| message copy | `ChatMessageActions` 用 Clipboard API，成功态 1.6 秒，unmount 清 timer，失败不伪报成功 | 已落地 | 对当前 plain text 足够 |
| link/code/markdown | answer 目前按 plain text 渲染；`web/package.json` 没有 Markdown/rehype/sanitize 依赖 | 缺失或无需要待产品确认 | 先确认后端内容合同和真实需求；不要复制 Telegram entity/Tiptap 栈 |
| partial structured response 按需展开 | run details 已折叠按需加载；普通 answer 无 partial rich contract | 局部 / 无需要 | 不因 Telegram 有 rich cutoff 就拆答案协议 |

**候选 A3 — 内容合同优先，不直接迁移 renderer**

- 如果真实 Agent 输出需要 link/code/list：先定义允许的 server content schema；优先采用成熟、可消毒且可访问的
  renderer（**成熟 lib**），而不是复制 `renderTextWithEntities`。
- 如果只需要 proposal/run/approval：继续 typed React cards（**已落地**）。
- 可撤销验证：用固定 answer fixture 覆盖 malicious link、code copy、长 URL、纯文本 fallback、screen-reader label；
  没有需求证据则不加依赖。
- `messageCopy.ts` 的完整 Tiptap serializer：**不该搬**。`ChatMessageActions` 当前实现更小且匹配内容合同。

---

## 链 4：搜索定位、深链、overlay 与窄屏

### 4.1 搜索到消息定位

`MiddleSearch → performMiddleSearch → reducer/results → handleMessageClick → focusMessage → MessageList`：

1. search state 以当前 `chatId/threadId` 取用；输入变化 debounce 调 `performMiddleSearch`。
2. API 结果进入 `foundIds/totalCount/fetchingQuery`；靠近已载列表末端会继续搜索。
3. 点击结果、键盘选中、older/newer navigation 都调用 `focusMessage({chatId,messageId,threadId})`，不是对
   当前 DOM 做脆弱的 `querySelector().scrollIntoView()`。
4. focus 可能要求替换 MessageList viewport；最终由每个 Message 的 `useFocusMessageListElement` 在 reflow 后滚到
   center/top/end，并处理 quote 自身、header/footer reserve 和 highlight。
5. 搜索结果视图退出后，last search query 可在再次打开时恢复。

### 4.2 Escape、focus 和 history back

- `MiddleSearch.handleReset` 是分层退出：有 query/tag/from filter 时先 reset 并重新 focus input；已经空时才
  `closeMiddleSearch`。`captureEscKeyListener` 和 `useHistoryBack(onBack: handleClose)` 分别处理 Escape 和浏览器
  back。
- iOS search 激活时不会 `display:none` 隐藏以免失去 focus；`visualViewport.resize` 临时调整 Main 高度/位移，
  cleanup 移除 listener。它是针对 Telegram shell 的 workaround，不是可盲抄的通用 soft-keyboard 解法。
- `Modal` 打开时 disable direct text input、capture Escape/Enter、`trapFocus`；native `<dialog>` 的 cancel 被
  preventDefault 后汇入 `onClose`；`useHistoryBack` 也汇入同一 close。
- `MessageListHistoryHandler` 即使深层历史中的实际 MessageList 已 unmount，仍为每个 message-list record 保持
  `createLocationHash(chatId,type,threadId)`；back 最终 `openChat(undefined)`。这依赖 Telegram 自己的 virtual
  history stack，不能独立复制一个 hook 就获得相同行为。

### 4.3 Chuhai 对照

| 能力 | 当前事实 | 状态 | 结论 |
|---|---|---|---|
| 业务深链 | `/hunjian?materials=...&taskNo=...`，确认前后参数保留；taskNo 可恢复历史任务 | 已落地 | 比 message-id deep link 更符合当前业务 |
| 消息全文搜索/定位 | browser session 最多 10 turns，无 search action | 无需要 / 待产品证据 | 不复制 Telegram search store/API |
| Dialog Escape/focus return | 已用 Radix Dialog；`MixSceneControls` 明确 `onCloseAutoFocus` 回设置/历史 trigger | 已落地 | 用成熟 lib，不搬 Telegram Modal/focus trap |
| settings → history sibling overlays | mock E2E 等前一层真正 unmount 后再测 Escape，关闭 history 后 trigger 获焦 | 已落地 | 已覆盖 transition race 的一个真实反例 |
| 浏览器 Back 先关闭 overlay | 当前 Dialog open 不写 URL/history record | 待验证 | 源码不能证明 Back 行为；需要产品先决定 Back 应关 overlay 还是离页 |
| soft keyboard / visualViewport | 390px mock 覆盖 Enter 不误发、输入封顶、底部 composer；没有真机 viewport 测试 | 待验证 | 不把 desktop/mobile viewport mock 当 iOS/Android 验收 |
| 窄屏布局 | composer 与 dialog 用 `dvh/safe-area`、mobile touch targets；Playwright 390px fixture | 局部 | 几何有 mock 证据，无真机键盘证据 |

**候选 A4 — back 行为先定合同**

- 目标：`MixSettingsDialog/MixHistoryDialog` 及未来 fullscreen viewer。
- 先用真实浏览器 fixture 明确期望：overlay open 时 `page.goBack()` 是关 overlay并保留 `/hunjian` 上下文，还是
  离页。若需要前者，优先用 React Router/URL state 或 Radix + 路由现有能力（**成熟 lib/adapt**），不要复制
  Telegram 329 行 `useHistoryBack` virtual stack。
- 成本：中；history 与 URL deep link 会相互影响，必须测 forward、直接 URL、刷新和兄弟 overlay transition。
- Escape/focus return 已有证据，不应为“统一”重写。

---

## A/K 交叉挑战

已完整读取 `upstream/telegram-web/k-research.md`，没有修改对方文件。

### 两边确实在解决同一问题的部分

| 同一 Chuhai 问题 | A 证据 | K 证据 | 合并判断 |
|---|---|---|---|
| stale async 不得回写新上下文 | draft debounce 复核 chat/thread；attachment 按 uniqueId；local→server ID migration | rich upload 用 session/editor generation/current guard；viewer 用 tempId/middleware cleanup | 原则相同；Chuhai selectionKey、upload tombstone/pollSeq 已局部实现。形成审计 checklist，不搬控制器 |
| 未发送稿与在途请求分层 | `useDraft` 与 optimistic message 是两套对象 | K draft manager 与 rich upload task 也是两套对象 | 两边都支持 A2：只恢复 unsent，绝不把结果未知 request 恢复成新输入 |
| overlay close 应汇入单一 teardown | A Modal：Escape/native cancel/history → onClose | K media viewer：Escape/back/close → viewer cleanup | Chuhai Radix 已覆盖 focus/Escape；浏览器 Back 与媒体 teardown仍按具体 overlay 验证 |
| 异步尺寸与资源 lifecycle | A 解决可见位置/布局 reflow | K 解决 Blob URL、decoder/player、lazy queue release | 二者互补，不能互相替代 |

### 重复建议与应去重的工作

1. **草稿恢复**：A/K 都指向同一候选，只保留一个 scoped unsent-draft 设计；不要同时造 Telegram A draft
   manager 和 K storage manager。
2. **附件 identity/current guard**：Chuhai queue 已有 tombstone/pollSeq/alive，proposal 已有 selectionKey；不再
   建第三套“Telegram session identity”。
3. **overlay navigation**：A/K 都展示 custom history controller，但 Chuhai 已依赖 Radix + React Router；先用成熟
   lib 的现有能力，禁止复制两个 controller。
4. **object URL cleanup**：K 的 `ObjectURLScope` 只在 client-created `blob:` owner 不清晰时有直接价值；它不解决
   A 的 MessageList anchor，也不解决 draft。

### 反例：不能把一边结论泛化到另一边

- K rich-editor upload 能跨 editor reconciliation 持有任务，**不证明** A 普通 attachment modal 或 Chuhai local
  File 能刷新恢复。
- A local optimistic message + Telegram randomId **不能替代** Chuhai server-owned Journey；付费任务必须继续按
  canonical run、request hash、selectionKey 和 status 恢复。
- A DOM anchor **不能解决** K 发现的 Blob URL 泄漏、播放器同时解码或上传网络取消。
- K object URL scope **不能解决** 用户读旧消息时异步富卡增高造成的视觉跳动。
- A/K server draft sync 都是 Telegram IM 协议语义；Chuhai 首版 unsent goal 不需要跨设备同步。
- Telegram typing/streaming draft **不是** Chuhai Agent working truth；不得用动画替换 run/step/progress。

### 依赖与迁移成本对账

| 机制 | 表面看起来 | 实际依赖 | Chuhai 选择 |
|---|---|---|---|
| A anchor top-delta | 几行算术 | DOM identity、measure/mutate ordering、viewport replacement、send animation、reserve | 只 adapt 最小算法，先 fixture；不搬 Teact/fasterdom/global actions |
| A rich/entity renderer | “支持 Markdown” | Telegram entities、typed blocks、Tiptap copy、selectors/media loaders | 不该搬；有需求时选成熟安全 renderer |
| A/K history back | 一个 hook/controller | virtual history records、Safari deferred ops、所有 overlay 的统一 ownership | 不搬；先用 React Router + Radix 定义局部合同 |
| K ObjectURLScope | 约 20 行 owner | 必须知道谁 create `blob:`、谁跨 async 持有 | 仅在真实 owner 缺口时 direct adapt |
| A/K draft | 一个 storage key | identity scope、clear policy、unsent/in-flight 分型、hydration conflict | adapt 小型 unsent-only hook；测试身份切换和发送后刷新 |

---

## 可复用候选总表（不人为限制三个）

| 候选 | Chuhai 状态 | 目标函数/位置 | 复用级别 | 成本与可撤销验证 |
|---|---|---|---|---|
| 上方异步增长的 DOM anchor | 待验证 | `AgentChatShell` | 直接 adapt（verify-first） | 低中；先测同一 visible element top，失败才实现；删除 hook 可回滚 |
| unsent-only goal draft | 缺失 | `AgentGoalComposer` + gateway private-state cleanup | adapt 状态分层 | 中；5-case browser fixture，绝不持久化 requestId/File |
| local→canonical ID continuity | Journey 已有更强实现 | `prepareGoal/agent.selectRun` | 已落地 / 不搬 IM updater | 后端 dedupe tests 已有；继续以 runId 为真值 |
| typed business content | proposal/question/receipt/gate 已有 | Agent message components | 已落地 / 仅交互参考 | 不造 Markdown 万能气泡 |
| link/code rich answer | 未证实需求 | answer renderer | 成熟 lib | 先内容 schema + security/a11y fixtures；无需求则零成本不做 |
| rich copy serializer | 当前 plain copy 足够 | `ChatMessageActions` | 不该搬 | Tiptap/Telegram selector 成本过高 |
| overlay Escape/focus | 已落地 | Radix dialogs | 成熟 lib 已落地 | 保留现有 transition/focus tests |
| overlay browser Back | 待验证 | Router + scene dialogs | 成熟 lib/adapt | 中；先定义 URL/back/forward/refresh 合同 |
| stale async identity checklist | queue/proposal 已局部覆盖 | 新上传、恢复、媒体入口 review | 仅审计 checklist | 每条 async 必须证明 current identity、cancel/ignore、cleanup |
| durable attachment | stable material ID 已有；local File refresh 不等价 | upload/material chain | 不从 A 搬 | A 普通 modal 是反例；K task也不替代后端 Material |
| true network upload cancel | 未由 A 证明 | upload session contract | 待产品/后端证据 | UI remove 与网络 abort 分开，不承诺未实现语义 |
| message search | 当前 10-turn session 无证据 | 暂无 | 无需要 | 历史规模/用户需求出现后再设计 |
| soft-keyboard viewport fix | 无真机证据 | `/hunjian` mobile shell | 仅交互参考 | A 的全 Main transform 强耦合；必须真机复现后局部修 |

---

## 已读 symbol 与文件范围

完整文件 path/行数/hash 见 `evidence/a-src-receipt.tsv`；以下是每条链实际使用的 symbol，不用“下载过”冒充
“读过相关逻辑”。

### MessageList / scroll

- `MessageList.tsx`：`MessageList`、`rememberScrollPositionRef`、历史替换前 `useSyncEffect`、主
  `useLayoutEffectWithPrevDeps`、`handleContentResize`、initial `loadMoreAround`、send/live-tail timers。
- `MessageListContent.tsx`：`handleContentResize`、message group render、`previousLocalId` anchor migration。
- `useScrollHooks.ts`：history triggers、FAB/notch observers、freeze/unfreeze、listeners cleanup。
- `MessageListHistoryHandler.tsx`：`MessageHistoryRecord/useHistoryBack`。
- `MessageListBottomMarker.tsx`、`messageListReflow.ts`：bottom marker 与 before/after reflow queues。
- `useFocusMessageListElement.ts`：relocated focus、quote target、top/bottom reserve。
- `MiddleColumn.tsx`：container/footer/keyboard resize 的调用方范围。
- `MessageList.scss`：overflow、scroll snap、live-tail `overflow-anchor:none`。

### Composer / send

- `Composer.tsx`、`MessageInput.tsx`：hook 组装与真实 caller 范围。
- `useDraft.ts`：touch/save/hydrate/switch/background/beforeunload。
- `useAttachmentModal.ts`、`AttachmentModal.tsx`、`buildAttachment.ts`：prepare、uniqueId guard、URL revoke。
- `useRichMedia.ts`、`richEditorComposer.ts`、`richEditorMarkdown.ts`：只读与 pending rich media/编辑器接缝相关范围，
  未宣称完整 rich editor。
- `useSendMessageAction.ts`、`global/actions/api/messages.ts`：send/saveDraft/clearDraft/cancel upload 的 action 层。
- `api/gramjs/methods/messages.ts`：`sendMessageLocal`、`sendApiMessage`、`sendMessage`、
  `handleLocalMessageUpdate`。
- `global/actions/apiUpdaters/messages.ts`：`updateMessageSendSucceeded/Failed`。
- `reducers/messages.ts`、`selectors/messages.ts`、`messageKey.ts`、API builders：为 ID/state contract 定点读取。

### 内容

- `Message.tsx`：content 分流、meta position、typing/send/translation pending、text/rich path。
- `MessageText.tsx`、`MessageRichText.tsx`：entity/rich block、partial expand failure。
- `renderMessageText.ts`、`renderTextWithEntities.tsx`、`renderText.tsx`：普通 entity 与 code/link/pre。
- `WebPage.tsx`、`MessageMeta.tsx`：typed preview 与 metadata。
- `messageCopy.ts`、`ContextMenuContainer.tsx`、`MessageContextMenu.tsx`：copy caller 与 serializer。

### Search / navigation / overlay

- `MiddleSearch.tsx`：query lifecycle、visualViewport、reset/close、result click、older/newer、history back。
- `MiddleSearchResult.tsx`：result UI caller。
- `global/actions/api/middleSearch.ts`：`performMiddleSearch` 和 result loading 范围。
- `global/actions/ui/middleSearch.ts`、`reducers/middleSearch.ts`、`selectors/middleSearch.ts`：按 chat/thread 的
  open/update/reset/close state。
- `Modal.tsx`：keyboard listeners、focus trap、native dialog cancel、history back、cleanup。
- `SearchInput.tsx`：input focus/keyboard caller 范围。
- `useHistoryBack.ts`：virtual history cursor、Safari deferred operation、push/replace/back/unmount cleanup。
- `global/actions/ui/chats.ts`、thread reducers/selectors：只读 focus/open chat 的接缝范围。

### Chuhai 对照

- `AgentGoalComposer`：`newGoalRequestId/send/submit/newSession/confirm` 与 typed message components。
- `AgentChatShell`：scroll listener、ResizeObserver、pinSignal、jump action。
- `AgentRunWorkspace`：session turn persistence、restore confirmation、selection stale rebuild、
  `clearPrepared/startNewSession/prepareGoal/retryFailedRun`。
- `ChatMessageActions`：copy/retry/timer cleanup。
- `Workspace.prepareAgentStart/restoreAgentConfirmation/createAgentTaskParams`、`interpretMixGoal`。
- `journey_service.prepare`：client request ID、request hash、resume/dedupe/conflict。
- `MixSceneControls`：Radix Dialog focus return。
- `gateway.storageIdentityScope/clearPrivateWorkspaceState/setToken`。
- `web/e2e/hunjian-chat.spec.ts`：IME、深链、错误同 ID 重试、scroll、dialog focus、390px viewport 等现有 mock
  acceptance 范围。

## 测试证据与未验证项

### 已存在的 Chuhai 自动化证据（本阶段只读，未执行）

- composer：空禁发、Enter、Shift+Enter、IME 229；
- proposal material IDs 与 `materials/taskNo` 深链保留；
- 504 后消息保留、同 `clientRequestId` 续跑；
- 读历史时下方 append 不抢 scroll；
- settings/history Dialog Escape 与 focus return；
- 390px mock：移动 Enter 不误发、输入封顶、jump-to-latest。
- backend：相同 prepare question replay 返回同 run 且 `deduped`，不重复跑 Agent。

“代码存在测试”不等于本阶段已运行通过；本文没有声明当前工作树测试绿。

### Telegram A 的测试边界

固定 tree 中按 message/draft/search/history/scroll/composer/modal/rich/text/attachment 过滤，只发现
`src/components/test/demo/MessageTextStreamingTest.tsx` 一类 demo，没有发现与上述四条完整链同名的自动单测。
这不证明项目完全没有间接覆盖，但本阶段不能给这些机制附上“上游测试已验证”的标签。

### 下一阶段未解项

1. 真实 Chuhai 浏览器先复现“视口上方富卡异步增高”再决定 A1；分别测 Chromium 与移动 Safari。
2. 真机测试 soft keyboard、safe-area、Dialog/Popover 打开关闭、浏览器 Back/Forward；390px Playwright mock 不替代。
3. 若 owner 选择 A2，先审计所有 `hunjian-agent-session-*` 的身份 scope/退出清理，再写 unsent draft。
4. 深追 Telegram failed bubble 的 retry caller，确认是否复用协议 randomId；在此之前不宣传 exact-once。
5. 若 Agent answer 出现真实 link/code 需求，先定内容 schema 与安全边界，再比较成熟 renderer。
6. 等 K 下一阶段若补充 Chuhai Blob owner 实证，再对账 ObjectURLScope；当前不把“可能泄漏”写成产品 bug。
7. 弱网、性能、长会话、低端手机均未实测；没有相应结论。
