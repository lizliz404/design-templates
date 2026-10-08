> 归档说明：这是原研究/实施阶段的记录，不是当前产品状态。出海云路径（`web/`、`PRD.md` 等）均相对 [chuhai-cloud 固定实现版本](https://github.com/hanzili/chuhai-cloud/tree/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a)。后续实施与证据边界见 [执行对账](execution-record.md)。仅将机器绝对路径转换为来源说明，保留原阶段判断；不把旧候选改写为当前缺口。

# Telegram Web K 深读（第一阶段）

- 日期：2026-10-07
- 对象：Telegram Web K（`morethanwords/tweb`）
- 固定 revision：`125a31da7665d5ee09ceb9c5de66e2615e3276b6`
- 官方源：`https://github.com/morethanwords/tweb`；`telegram.org/apps` 公开页面列出该仓库。
- 本次方式：GitHub Contents API 指定 `ref=125a31da...` 拉取公开源码；相关快照在 `原研究机归档 k-125a31da/（未随本包复制；见 evidence/k-pinned-source-receipt.json（仅原收据的三个文件））`。早先浮动 `master` 文件与该 pinned revision 已由 parent 比对一致；本笔记仅以 pinned snapshot 为证据。
- 边界：本文件是上游研究，不是产品 SOT；未登录 Telegram、未读私聊、未跑 TG UI/移动设备/弱网实测，也未改 Chuhai 产品代码、依赖、认证、schema 或 API。
- 未读材料：任务指定的 `原临时交付 telegram-web-ak-learning-20261007.md` 在本机 `fd` 未找到；没有据此补造结论。

## 研究问题与读完范围

目标不是把 Telegram 当作“聊天皮肤”，而是追到 **用户动作 → 组件 → 异步/状态 → 成功、失败、切换、清理 → 已有测试**，再判断 Chuhai 短视频创作是否有同构问题。

本阶段完整跟了三条链，并定点读取：

1. 富媒体附件：`src/components/chat/input.ts`、`src/components/richMessageInput/media.ts`、`src/components/chat/inputEditor/{prepareRichMediaUpload,reconcileUploads,mediaPaste,mediaPreview}.ts`、`src/lib/appManagers/appMessagesManager.ts`。
2. 草稿：`input.ts` + `src/lib/appManagers/appDraftsManager.ts`，到 `appStateManager.storage` 和 `messages.saveDraft` 调用。
3. 媒体 viewer/资源：`src/components/mediaViewer/{base,index}.ts`、`src/lib/appDownloadManager.ts`、`src/helpers/objectUrlScope.ts` 及 K 的 object-URL/RTMP lifecycle tests。
4. 移动 overlay/back：`src/components/appNavigationController.ts` + `mediaViewer/base.ts` 的 `pushItem/removeItem/close` 使用点；没有把 `stickyIntersector` 误认为 bottom-follow。
5. Chuhai 对照：`useUploadQueue.ts`、`ComposerMaterials.tsx`、`material-upload.ts`、`LazyVideo.tsx`、`ResourceMediaPreview.tsx`、`ResultGrid.tsx`、`AppVideoPlayer.tsx`、`save-clip.ts`、`gateway.ts`、`AgentRunWorkspace.tsx`、`video-player.spec.ts`。

不是全仓泛读；未读 K 的完整 `input.ts` 6k 行、完整 IM/MTProto service、贴纸/表情/群聊等无关业务。

## 链 1：附件选择、预览、上传、取消、错误/重试与发送后清理

### K 的真实链

| 阶段 | 用户动作/组件 | 状态与异步 | 成功/失败/切换/清理证据 |
|---|---|---|---|
| 选择 | `ChatInput.openAttachmentPicker()` 捕获当前 `peerId/threadId/editMsgId/inputValueGeneration/editor`；隐藏 `fileInput` change → `handleSelectedFiles()` | 选择操作拿 `isCurrent()` 闭包；切会话、编辑目标或输入代际变化即无效。rich editor 场景把选择插入点 snapshot 交给 `richMessageInput.insertMedia()` | `input.ts` symbols `captureMessageInputContext`, `openAttachmentPicker`, `handleSelectedFiles`。`fileInput` cancel/idle 都 resolve 空文件，不把旧选择写入新会话。 |
| 授权与预览 | `RichMediaUploads.insert()` 调 `session.authorize(files)`，再 `loadRichMediaPreview(item)` | 先验 media 类型和 editor selection revision；生成 local preview URL、读 image/video 尺寸与 poster/sidefill，才往 editor 放 upload placeholder | `media.ts` symbols `insert`, `isRichMediaInsertSelectionCurrent`, `loadRichMediaPreview`。任一授权失败、会话失效、插入点变动、预览失败均 release preview URL，并提示/返回 false。 |
| 本地 preparation | `prepareRichMediaUpload(file)` 处理图片、GIF、MOV、视频和音频 | 视频用 object URL 读 metadata，GIF/MOV 可能转换；finally 移除 `src`、`video.load()`、`ObjectURLScope.dispose()` | `prepareRichMediaUpload.ts` functions `prepareVideo/prepareGif/prepareAudio/prepareImage`；这是明确的临时解码资源回收，而非“选完文件就永久持有 blob URL”。 |
| 上传与进度 | `RichMediaUploads.uploadItem()` → services `upload()` → `AppMessagesManager.uploadRichMessageMedia()` → `uploadMediaFile` + `messages.uploadMedia` | item `preparing → uploading/processing → ready`；以 `uploadingFileName` 关联 `download_progress`。并行只上传未 uploaded 且不在 flight 的 item | `media.ts` methods `uploadItem/run`；`input.ts:createMediaServices`; `appMessagesManager.ts:uploadRichMessageMedia`。异常置 `error`，保留未上传项；`retry` 只重置 `error && !uploaded && !inFlight`，不把仍在准备的 sibling 重传。 |
| 取消、移除、切换 | 用户 remove → `RichMediaUploads.cancel()`；editor undo/reconcile → `reconcileRichMediaUploads()`；会话 changed → `session.isCurrent()` false | cancel 对每个有 `uploadingFileName` 的项请求 `apiFileManager.cancelDownload`，删除 progress map 和 preview URL；任务从 editor tree 移除/不再引用也被取消 | `media.ts:handleAction/cancel/cleanup/reconcile/destroy`，`reconcileUploads.ts`。上传返回后仍校验 `tasks.get(id)===task`，禁止已取消任务回写 ready。 |
| 发送 | editor 有 pending rich media 时发送被阻塞 | upload 全部成功后由 reconcile 调 `editor.completeRichMediaUpload()`；只有其接受已完成 item 才 cleanup task | `input.ts` send path `hasPendingRichMediaUploads()`；`reconcileUploads.ts`。这将“本地选中/上传成功”与“可发送消息”分开。 |

### 该链给 Chuhai 的对照

| Chuhai 表面 | 已有事实 | K 的可借机制 | 分类 / 不应搬的部分 |
|---|---|---|---|
| `/hunjian` 添加/拖入 | `ComposerMaterials` 把 file picker 与 drag/drop 统一到 `uploads.enqueueFiles()`；入口、chips、失败 retry 和 remove 已落地 | **已落地/局部同构**：轻量附件入口与每条状态，而非大表单 | 不要复制富文本 editor/selection revision；创作目标没有聊天正文中的多媒体 inline node。 |
| 上传/分析 | `useUploadQueue.uploadOne()`：`uploading → analyzing → ready/failed`，上传成功即 `file:null`；`retryEntry()` 按 upload vs analysis 分支；`tombstones + pollSeq + alive` 防 remove/unmount 后回写；`material-upload.ts` 分片 3 并发、可重试网络失败 | K 的“任务身份 + 失效门 + 只对未完成项 retry”已被更贴产品地实现；可在未来复用 K 的 **reconcile ownership** 思想审查新的上传入口 | **无须迁移 service 层**：K 的 `uploadingFileName`、MTProto `messages.uploadMedia`、editor tree reconciliation 均非 Chuhai合同。不要把“移除 chip”误做删除已入库 Material；Chuhai 当前语义正确地只摘当前 goal。 |
| 取消 | Chuhai remove 是 UI tombstone：停止轮询/禁止回写，不保证中止服务器上传；`material-upload.ts` 无 `AbortSignal`/upload-session cancel | **待产品决策/待验证**：K 说明“移除视觉项”和“真正取消网络上传”是两件事；若用户确需节省上行/停止任务，需先确认后端是否有可安全取消的 session 合同 | 不能直接 copy `cancelDownload(fileName)`：Chuhai 分片/服务端 session 的取消语义未读到且不可臆造；不得因 UI X 图标承诺上传已停止。 |
| 上传失败恢复 | Chuhai upload 文件仍在内存才可 retry；分析失败用同 materialId 重排，已释放 File 不伪装可重传 | **已落地且更适合创作**；K 的 prepared/uploaded 分界支持这个区分 | 不应套 Telegram “发送失败的消息 bubble 重试”到已开始付费创作或 Journey；后者必须按 server-owned run/状态核对。 |

**用户价值**：K 的可迁移价值不是“拖入很酷”，而是用户切走、撤销、预览失败或网络失败时，旧异步不能把错误的文件/状态写回当前上下文；Chuhai 已在 queue 的 tombstone/代际上做到主要部分。当前缺口只是“是否需要真实 upload cancellation”，没有实际用户/成本证据前不能当 P0。

## 链 2：媒体 viewer、lazy 加载、同时播放、对象 URL 与离屏清理

### K 的真实链

1. `AppMediaViewerBase._openMedia()`（`base.ts`）为当前 slide 生成 `tempId`，把加载器推入 `LazyLoadQueueBase`。异步下载/quality/animation 兑现前后均检查 `this.tempId === tempId`；切到下一媒体时，旧 promise 即使返回也不得改当前 viewer。
2. 视频路径：非 streaming 先经 `appDownloadManager.downloadMediaURL({media})`，随后取 cache URL；`mover.middlewareHelper.get().onClean(pinObjectURL(url))` 保住当前 slide seek 所需 blob URL。播放器建立后，`setMoverBefore` 一次性 `videoPlayer.cleanup()`；`appMediaPlaybackController.setSingleMedia()` 返回的 release 同样在切换前释放。
3. `close()`（`base.ts:close`）清 `lazyLoadQueue`、list loader、global listeners、navigation item 和 middleware；在 close transition 结束后移 DOM/overlay。后台点/手持端关闭与 Escape/back 都汇入此路径：constructor 给 navigation controller 注册 item，`close()` remove；`appNavigationController` 用 `popstate`/`history.back` 驱动 `onPop`。
4. `AppDownloadManager` 对同文件请求去重，resolved LRU 有大小预算（源码注释明确修复过“全天 tab 持有每个 Blob”的问题）；cache context 失效时不把已 revoked object URL 交给新渲染。`src/tests/appDownloadManagerObjectUrls.test.ts` 覆盖 stale object URL mirror invalidation 和 non-object URL 去重。
5. `ObjectURLScope` 是可直接理解的小工具：只追踪 object URLs；`dispose()` 同时 forget decoded-load cache 与 `URL.revokeObjectURL`。本地上传 preparation 与编辑入口均 finally dispose。

### Chuhai 对照与结论

| 问题 | Chuhai 已有 | K 证据带来的判断 | 分类 |
|---|---|---|---|
| 列表首屏大量 MP4 请求 | `LazyVideo` IntersectionObserver + 全局 `MAX_INFLIGHT=3`；metadata/error 即 release slot；hover 可插队 | 已有与 K lazy queue 同目标，但 Chuhai 更小、更贴 MP4 card；K 的 slide queue 不必迁移 | **已落地；交互/资源管理参考** |
| 一次多条解码/开声 | `ResultGrid` 启一条时 pause 前一条；`AppVideoPlayer` 和 `ResourceMediaPreview` 离屏/hidden pause；PRD 定义同网格一次一条、无全局播放器 | 已有针对短视频审片的约束；K single-media controller 可证明“控制权要有 release”，不需要引入其全局 IM playback controller | **已落地；adapt 仅限明确 ownership/release 回调模式** |
| viewer/unmount 泄漏 | `AppVideoPlayer` effect cleanup pause+disconnect；`LazyVideo` cleanup release queue slot；`ResourceMediaPreview` cleanup pause/mute/observer disconnect；现有 `video-player.spec.ts` 覆盖 source reset 后旧 video pause、unmount pause、offscreen/hidden pause、同 grid 单播、手动一次 reload | K 对 object URL 的 strict scope 是成熟参考；Chuhai当前外部 URL/Blob 是否分别总由哪个调用方 create/revoke，需沿 `MobileShoot`/媒体预览真实 Blob URL 链继续查，不能仅凭播放器结论 | **局部已落地；待验证 Blob URL ownership** |
| HLS/长视频/码率自适应 | PRD 明确短视频 MP4/Blob 审片，不引 HLS/DASH/DRM/转码 | K viewer 的 streaming/HLS/quality/player Menus 是不同产品问题 | **无需要，不搬** |
| 下载大文件 | `save-clip.ts` 签名后交浏览器 `<a>` 下载，不把整片读入 JS RAM | 与 K browser/native download 方向一致 | **已落地；不需复制其 downloader manager** |

**可直接 adapt 的小型工具候选**：若 Chuhai 新增 client-created `blob:` 预览而当前调用方不能在替换/卸载时严格 revoke，可复制/adapt K `ObjectURLScope` 的 20 行所有权模型（不是引依赖）。前置条件是先证明现有 owner 不足；不能为“看起来专业”改写所有媒体 URL。

**没有得出的结论**：没有测量 Chuhai MP4 真实并发、内存、低端手机 CPU 或弱网；所以不能说 `MAX_INFLIGHT=3` 最优，也不能声称性能已验证。

## 链 3：草稿、会话身份、异步回写冲突与发送清理

### K 的真实链

1. 用户输入触发 `ChatInput.onMessageInput()`，普通输入走 2.5 秒 debounce，结构性 rich-editor 改动立即 `saveDraft()`（`input.ts` symbols `saveDraftDebounced`, `onMessageInput`, `saveDraft`）。
2. `saveDraft()` 读取 current draft/rich message；若只是 hydration 结果或正在处理不支持的 rich draft，不再反向回写。它调用 `AppDraftsManager.syncDraft({peerId, threadId, monoforumThreadId,...})`。
3. `AppDraftsManager` 的 key 是 `peerId + threadId`，本地 `appStateManager.storage.set({drafts})` 和服务端 `messages.saveDraft` 同时参与。每 key 有串行 queue + sync id；本地写 pending 或刚完成时的服务端 echo 会被短暂保护，保护结束后 `messages.getAllDrafts` reconcile。失败保留 `status:'failed'`，下一次不同步状态不把它误判成完成。
4. 切 chat 的 `peer_changing` 立即 `saveDraft()`；`setDraft()` hydration 以 middleware/input generation/content snapshot 复核，当前输入不是被恢复的同一稿则不覆盖。`draft_updated` 收到 empty update 时，如仍有本地 debounce 会先不清，以免 remote echo 吃掉正在输入的文本。
5. 发送的 clear 是协议/本地明确动作：`AppMessagesManager.beforeMessageSending()` 在 pending message 后执行 `appDraftsManager.clearDraft()`；`ChatInput.setDraft(... force)` 才由已知 send clear 清输入。K 不是“请求返回成功才盲清文本”。

### 对 Chuhai 的边界

- `AgentGoalComposer` 的 `goal` 是 `useState('')`，未发送文案 remount/refresh 不恢复；这是代码事实。
- 已点发送的 goal 则不同：当前 `send()` 乐观清空，`submittedGoal/retryRequest/clientRequestId` 在内存中保留失败后原地重试；刷新恢复这段文本会把 **结果未知的请求** 伪装成一条新的未发 goal，可能重开 Journey。因此“草稿恢复”和“在途 request 恢复”必须拆开。
- `gateway.ts` 已有 `storageIdentityScope()` 和 `setToken()` 的换身份/退出清理；若未来保存 **未发送** goal，键必须使用该 scope，并把键纳入 `clearPrivateWorkspaceState()`。这不是要求 auth/API redesign，也不应假设单用户环境而降级。
- K 的跨设备/服务端草稿同步是 MTProto 语义；Chuhai 当前 `journey.run.prepare`、server-owned run 和幂等 `clientRequestId` 是不同数据合同，不能照搬 `messages.saveDraft` 或用 sessionStorage 假装跨设备同步。

**候选（非实施结论）**：只对 `draftKind:'unsent'` 的文本做 scope-bound、debounced local persistence；进入 `send()` 时先删该 unsent draft，然后让现有 `submittedGoal/retryRequest` 管结果未知/失败重试。验收必须覆盖：刷新前未发文本恢复；发送/新会话明确清；换身份/退出不可见；504 后页面内仍能以同 requestId 续跑；刷新后不把不确定已发 goal再发送。是否值得做由 owner 决定。

## 移动键盘、modal/back、滚动锚定：已知与未知

- K `AppMediaViewerBase` 的 close 是真正的统一 teardown（lazy queue / listener / navigation / player cleanup）；`appNavigationController` 通过 `popstate`/history item 让 Escape/后退回到 overlay 的 `onPop`。这是**overlay 回退要有单一 close 路径**的成熟原则。
- Chuhai chat 现有 `AgentChatShell` 用 `ResizeObserver`：本来贴底才跟随，主动 send pin；读旧消息不强拉。现有 mock 测试覆盖下方 append 不抢位置。
- 尚无证据证明 Chuhai 当前有“上方异步富内容撑高”或“顶部 prepend 分页”的 bug；浏览器 `overflow-anchor` 可能已处理部分情况。若产品没有 prepend 历史，不能为测试制造分页设施。
- `visualViewport`、iOS/Android soft keyboard、浏览器 back 对 Popover/Dialog/视频全屏的实际交互，本次没有 K 或 Chuhai 真机验收；只能列为真机验证，不称已解决。

## 可迁移清单（不限制为三个候选）

| 能力 | Chuhai 状态 | 复用级别 | 价值与前置/反例 |
|---|---|---|---|
| 上传任务 ownership：current guard、remove 后不回写、retry 不重传 in-flight sibling | `useUploadQueue` tombstone/pollSeq/alive 已覆盖主要风险 | 已落地；仅作审计 checklist | 新上传入口应证明 remove/unmount/切上下文不会复活；不需要另造 Telegram upload controller。 |
| 本地 media preparation 的 URL finally cleanup | Blob preview owner 待逐调用链确认 | **直接 adapt 小工具**（`ObjectURLScope` 思想） | 仅当使用 client `blob:` 且 owner 不明确；服务器 URL、Video.js source URL不应 revoke。 |
| 明确区分“UI remove”与“网络 cancel” | 当前 UI remove 不承诺 abort | **交互参考/待产品合同** | 有安全的 cancel endpoint 和真实成本/用户需求才实现；否则 tombstone 是诚实行为。 |
| 单一 viewer/modal close + stale async guard | 播放器有 unmount/offscreen pause；modal路径未全面复核 | **adapt 原则** | 新 fullscreen/media dialog 要把 Escape/back/close/route switch 汇到同一 teardown；不引 K navigation controller。 |
| 小型内存/网络队列 + release ownership | LazyVideo 3 slot、单网格播放已存在 | 已落地；只做实测调参 | 不能从 K 推出“3”是通用最优，也不为短 MP4 引 HLS 或 global controller。 |
| 未发送输入草稿 | 缺失 | **adapt K 状态分层，不复制 manager** | 要 scope+logout cleanup；不得恢复在途 clientRequestId 成新请求。 |
| pending/failed UI 可恢复 | 现有 upload chips、AppVideoPlayer单次重载、ResultGrid同 task重查 | 已落地/局部 | K 的 optimistic message replacement 不能替代 Journey/付费执行的 server truth。 |

## 交叉复核状态

按分工，A 研究者应写 `upstream/telegram-web/a-research.md`。截至本阶段落笔时该文件不存在，故没有伪造交叉结论；下一阶段将读取其固定 revision 证据，逐项比较：A/K 对同一 Chuhai 问题的收益、依赖成本、反例与重复建议，并只追加本文件，不改 A 文件。

## 当前证据级别与下一阶段未解项

- **源码事实**：上表 K 调用链、Chuhai 当前 queue/player/storage 代码与现有 mock test 范围。
- **非事实/待验**：真实 Telegram UX 成功率、Chuhai 真机键盘、弱网、真实大媒体内存与上传取消需求；没有从源码推断体验优势或产品 bug。
- **补查：Chuhai 拍摄 Blob 生命周期已覆盖**（因此不再把它列作泛泛待查）：`MobileShoot.keepTake()` 先 `URL.createObjectURL` 作预览并 `savePendingTake()` 原子写入 IDB meta+blob；恢复只读 meta、实际预览/重传才 `getPendingTake(id)` 取单个 blob。`acceptTake()` 先持久化 accepted，再后台 `uploadTake()`；上传成功先 `markTakeUploaded()` 写终态、再删 IDB，删除失败也不会刷新后重传。`discardTake()` 成功双删后 revoke preview URL，组件 unmount 也遍历 revoke；`pending-takes.ts` 将 meta/blob 置同一 IDB transaction。故 K `ObjectURLScope` 在拍摄主链不是缺失修复，只是可供将来新 Blob owner 采用的模式。
- **K 移动证据边界**：`helpers/mediaSizes.ts` 只监听 window `resize`（rAF 合并）并按宽度分屏；`input.ts:clearInput` 有 Mobile Safari focus/首字母 workaround，`mediaViewer/base.ts` 将 close 注册为 navigation item、统一在 `close()` teardown。但本次 pinned 文件没有给出可直接抄到 Chuhai 的 VisualViewport/软键盘高度算法；不能将 Telegram 的 mobile breakpoint 当作该问题的解。
- 后续优先：
  1. 若 A 笔记出现，完成 A/K cross-review；
  2. 只为已存在的异步富卡增长补窄 scroll acceptance fixture，不建立假分页；
  3. 真实设备可用时，分别验软键盘、safe area、打开/关闭 overlay、相机/播放器回退；mock 不替代。
