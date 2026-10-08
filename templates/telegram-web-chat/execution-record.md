# 执行对账：研究 → 实施 → 验证 → 后续

这是为跨机器接续整理的历史执行记录，不是部署回执。归档范围为 2026-10-05 Chat-first 迁移、2026-10-07 A/K 深读及后续实现。整理时没有重跑产品测试或核验线上部署。

## 1. 可追溯的产品版本

产品仓库：`hanzili/chuhai-cloud`，产品合同仍在 `PRD.md §6.2`。

| 阶段 | 版本与记录 | 结论 |
|---|---|---|
| Chat-first 框架、原型和表现层迁移 | [`0c0405a7`](https://github.com/hanzili/chuhai-cloud/commit/0c0405a7)，[框架原记录](chat-first-framework.md) | 壳与混剪 controller 分开；底部输入、唯一聊天滚动区、设置/历史按需打开。原记录包含正式 mock 页面 9/9 验收，但该阶段原始日志未收进本包，不能当作本次复跑。 |
| A/K 研究与后续草稿/滚动实施 | [`dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a`](https://github.com/hanzili/chuhai-cloud/commit/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a) | `feat(chat): preserve unsent goals and fix send bottom-follow`；研究、PRD、代码与测试同一提交。 |

研究原记录：`upstream/telegram-web/{a-research.md,k-research.md}`；前期框架：`docs/design/hunjian-chat-framework-20261005.{md,html}`。这些仍在出海云，不由本包副本取代。

## 2. 已实施与明确没有实施的东西

| 研究线索 | 实施/验证结果 | 固定版本代码/测试入口 |
|---|---|---|
| A2/K 未发送稿分层 | **已实施**：sessionStorage 保存当前身份、当前浏览器标签页的 `{draftKind:'unsent',text,updatedAt}`；500ms debounce，route unmount/pagehide flush，mount hydrate 防 StrictMode 首轮清稿，owner key + generation 防旧身份写新稿。存储禁用时输入/发送正常。 | [`useUnsentGoalDraft.ts`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/src/features/agent/useUnsentGoalDraft.ts) |
| 发送/新会话/确认清稿 | **已实施**：真正发送输入框当前句子时清稿；历史重发/问题选项不清无关新稿；新会话或确认成功才清，失败保留。已发送目标、request ID、run/proposal/File 不写入未发送稿；504 页面内重试沿用同 ID。 | [`AgentGoalComposer.tsx`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/src/features/agent/AgentGoalComposer.tsx)；[`hunjian-goal-draft.spec.ts`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/e2e/hunjian-goal-draft.spec.ts) |
| 身份与退出清理 | **已实施窄补齐**：现有 `clearPrivateWorkspaceState()` 纳入 unsent goal、deferred gate、session run IDs/turns；沿用 `storageIdentityScope()`，不换认证方案。同身份 token 轮换不当成换号。 | [`gateway.ts`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/src/api/gateway.ts)；[`check-auth-storage-scope.mjs`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/scripts/check-auth-storage-scope.mjs) |
| A1 上方富卡异步增高的阅读锚点 | **先验通过，未添加自研 anchor**：mock Chromium 场景同一可见元素 topDelta=0；scrollTop 随上方增长补偿性变化。原生 anchoring 满足该测试，不搬 Telegram MessageList/Teact/fasterdom。该结论不外推到移动 Safari。 | [`telegram-reading-lifecycle.spec.ts`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/e2e/telegram-reading-lifecycle.spec.ts) A1 |
| 主动发送后的贴底跟随 | **发现并修复真实失败**：smooth 中间 scroll 事件把 `stickRef` 判为离底，异步答复不继续跟随；主动 send pin 改为即时 `scrollToLatest(false)`。手动 jump 仍保留尊重 reduced-motion 的平滑滚动。 | [`AgentChatShell.tsx`](https://github.com/hanzili/chuhai-cloud/blob/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a/web/src/features/agent/chat/AgentChatShell.tsx) |
| K 上传/分析 async ownership | **现有实现增加回归验收，不换 controller**：upload remove 后 late complete 不复活、不启动分析；analysis remove 后 late poll 不复活；SPA unmount 后晚回包不写卸载队列。UI remove 仍不承诺网络 abort。 | 上述 reading/lifecycle spec 的 K 三例；现有 upload queue |
| K ObjectURLScope、播放器队列与取消协议 | **没有新建/迁移**：K 笔记补查拍摄 Blob owner 已有清理；不因候选而加全局播放池、网络取消 API、HLS 或 rich editor。 | [K 历史研究](k-research.md) 的补查与反例 |

## 3. 原始执行日志：保留失败，不用文件名判断最终结果

以下均为历史 **mock Chromium/harness**，没有真实 Telegram 登录、后端模型调用、上传、付费执行或生产发布。日志行号反映各次运行的当时测试文件；稍后补测试导致与提交版本行号不同，不把它包装成相同快照的重复执行。

| 收进本包的日志 | 实际内容 | 如何读 |
|---|---|---|
| [parent-final.log](evidence/parent-final.log) | **37 passed / 1 failed**；发送 pin 后离底 69px，预期 <50px | 名称带 final 但并非最终通过；保留它作为失败证据。 |
| [parent-pin-repro.log](evidence/parent-pin-repro.log) | **5 passed / 1 failed**；再次收到 69px | 独立重现 pin 问题，不能归咎 fixture 不溢出。 |
| [parent-pin-fixed.log](evidence/parent-pin-fixed.log) | **6 passed，34.3s** | 主动发送立即贴底后专项回归通过。 |
| [parent-fixed.log](evidence/parent-fixed.log) | **39 passed，2.4m**；reading-anchor topDelta=0，pin 事件距离回到 0 | 整合覆盖 chat 23 例 + draft 8 例 + reading/lifecycle 8 例。 |
| [parent-storage-final.log](evidence/parent-storage-final.log) | **8 passed，26.5s** | 草稿专项最后保留的运行日志，含确认失败保留/成功清稿。 |

日志归档只改写错误堆栈中的机器根路径为 `chuhai-cloud/`；测试输出、失败和时间保留。本包未收齐所有中间 trace、服务日志、截图或 2026-10-05 原始评审 JSONL，也没有伪造这些证据。

## 4. 未覆盖与接续方式

仍待真实用户/设备证据：iOS/Android soft keyboard、safe area、浏览器 Back/Forward 与 overlay、移动 Safari 异步锚点、弱网/大媒体/低端机资源预算、真实 Journey prepare 与付费任务恢复、部署后的用户接受度。固定源码研究不等于这些都通过。

香港机 Agent 接续：

1. 更新 Design Templates 的现有 checkout，打开 `templates/telegram-web-chat/README.md` 和本文；不依赖原研究机绝对路径。
2. 在出海云**开发 checkout**检查当前版本与 `dcfb60cb` 的差异；先读当前 `PRD.md §6.2`，再读本表的代码/测试，不直接对生产目录 pull 或重做已经合入的 draft/pin。
3. 只为真实复现的下一缺口实施窄改；不要把原研究的候选项全部排成必做任务。
4. 测试存在、日志曾通过、commit 已发布、生产部署成功、真机用户接受是五种证据，分别报告。

信心：历史研究版本/已提交实现与所列日志内容为高；当前生产体验、真机兼容与部署状态未在本次验证。owner 为产品维护者；下一检查点为香港机 Agent 对当前开发版本与真实问题的复核。
