> 归档说明：这是原研究/实施阶段的记录，不是当前产品状态。出海云路径（`web/`、`PRD.md` 等）均相对 [chuhai-cloud 固定实现版本](https://github.com/hanzili/chuhai-cloud/tree/dcfb60cbdd55d91a7a69061f1e0b125cd3499b6a)。后续实施与证据边界见 [执行对账](execution-record.md)。仅将机器绝对路径转换为来源说明，保留原阶段判断；不把旧候选改写为当前缺口。

# /hunjian · Chat-first 框架建议

日期：2026-10-05。产品决定归属 `PRD.md §6.2`；本文只记录源码证据、方案依据、原型边界与迁移建议，不另定 IA/对象。

**实施闸（2026-10-05）**：owner 已授权按框架开工；先由 `opencode-go/grok-4.7` 只读交叉验证，session `ses_ef5800c0cffef8jHWt2Mo2zPnT`。审阅结论允许实施，并将下面四点锁入任务：Journey controller 不搬进壳；缺素材仅阻塞确认/直接出片；所有原有入口及深链必须可达；正式聊天填 AppShell 剩余空间，不能套第二个 100dvh。实现和验收结果以本文末尾记录为准，前文原型证据不代表正式 UI 已通过。

## 结论

**先有通用聊天页面，再注入混剪场景。不是把聊天嵌在混剪表单里。**

- 主体：页头 → 整高消息流 → 固定在页面底部的输入区。只消息区滚动，别让用户滚过设置/历史才能重新打字。
- 混剪专属：素材上下文、配置 overlay、创作提案、任务/审批/产物。按需要出现；普通问答不先报“缺视频”。
- 未来复用：同一消息和输入组件，换场景适配器即可复用外观；能力、历史持久化和权限不靠隐藏 UI 自动全局化。
- 保留现有 AgentOrb、主题与有效原语，不重新发明怪控件。Orb 的真实组件用于正式版；离线原型以 CSS 静态形象占位，并不验证现有 WebGL 动效。
- 初始交付是框架＋可点离线原型；owner 后续授权正式页面最小迁移。后端、依赖、路由或入口保持不变。

## 1. 证据：目前哪里偏离聊天

已读 `Hunjian.tsx`、`Workspace.tsx`、`AgentGoalComposer.tsx`、`AgentRunWorkspace.tsx`、`AgentChatPanel.tsx`、`useAgentChat.ts`，并以 mock Gateway、离线 token、真实 Vite 页面截图。mock 不代表登录或业务成功。

1. `Workspace` 的单列继续承载 Composer、FineTune、Preflight、DirectSubmit、口播与历史。手机 390×844 首屏：输入框 y=119、高112px；下面全是参数和缺素材提示。消息区有内容才出现，且在卡片内再开最大38rem滚动区域。
2. 输入框未占固定页面底部，没有标准最新消息入口。滚动随历史长度/loading/confirmPlan 等变更主动进行，但读旧消息与活动块高度增长需要单独验证；不能仅凭依赖数组断言所有内容必定丢失。
3. 素材工具槽展开整个上传/选择区域，成为表单而非轻量附件入口；参数默认占首屏，普通问题同样承受缺素材 preflight。
4. 两套外观实现：`AgentGoalComposer` 的 goal/run 投影，`AgentChatPanel` 的只读聊天。前者会话轮次在 sessionStorage 并合并 recentRuns，后者通过 AiThread 服务端存消息。可以统一 UI，不能一句“换组件”抹平数据语义。
5. 当前代码已有按runId去重和用户消息去重措施。Agent评审指出“状态回声/重复卡片”的风险，但**不能当作已证实三条重复用户消息**；后续用真实状态 fixtures 验证，按真实重复删除，而不拆掉现有保护。

## 2. 主框架

```text
AppShell（沿用导航和主题；移动宽度/键盘须单独验）
└─ AgentChatShell（通用表现层，不 import mix/jobs/spec）
   ├─ Header：Agent 身份＋当前场景；历史 / 新会话
   ├─ Conversation：占剩余高度、唯一聊天滚动区
   │  ├─ 用户消息
   │  ├─ Agent 文本 / 澄清
   │  ├─ 真实活动摘要（默认折叠）
   │  └─ 场景富内容：proposal / run / gate / artifacts / error
   └─ PromptInput：稳定贴底，自动增高但封顶
      ├─ 已选上下文 chips（有才显示）
      ├─ textarea
      └─ ＋附件 / 场景设置 / 发送或已获支持的停止动作

HunjianSceneAdapter（沿用现有 Journey controller / spec）
├─ 当前 Draft spec、Material IDs、上传队列
├─ prepare/start/refresh/cancel 与幂等 requestId
└─ ProposalCard、HumanGateCard、RunReceipt、Results、任务历史
```

这是薄表现层边界，不新建 Agent 平台、事件总线、消息数据库或第二套状态机。先把现有 controller 数据呈现出来，再根据实际重复决定是否提炼 message parts；不要为了画聊天先重写生命周期。

### 各状态默认画什么

| 状态 | 主体 | 输入/动作 |
|---|---|---|
| 空态 | 简短身份/第一步、少量可点建议 | 输入始终可见；附件/混剪设置可选 |
| 普通答复 | 用户一句＋Agent直接答案 | 继续输入；不弹创作确认 |
| 缺必要信息 | 一个澄清问题或明确缺口 | 在消息中选/答，不把全表铺开 |
| 创作提案 | 简短建议＋一张确认卡；规格摘要、详情折叠 | 单一“确认并开始”；修改可继续聊或打开设置 |
| 等待/运行 | Orb身份与一条真实状态；实际事件按需展开 | 仅已支持的真实取消；不做“停止网络=停止任务” |
| 待审批 | 同流内审批门，实际成片核对常开 | 延续批准只生成提案的合同 |
| 完成 | 真实成片/回执和可用下一步 | 可以继续问；历史不是消息复制品 |
| 失败/未知 | 原消息保留、错误或状态未知、一个安全下一步 | 不清空输入历史、不暗示必定未入队 |

标准提案卡可以折叠素材与文案细节；**人工门视频核对不因此改成折叠隐藏**。

### 输入和滚动合同

- 正式聊天填满 AppShell 的剩余内容槽，不再单独 `100dvh`；AppShell 只对 `/hunjian` workspace 提供满高布局，其他页面、clips/dub 保留原布局。`visualViewport` 用于响应可视高度，但真实软键盘仍必须设备验收。
- 原入口保留：`view=dub|clips`、旧 `view=script` 重定向、`?materials=`、`?taskNo=`、同一 Draft spec 的文案修改、Hosted 路线禁直接出片、审批网格常开/deferGate、任务选择同步 URL。设置收起来不等于删除功能。
- 桌面 Enter 发、Shift+Enter换行，IME组合中与229不发送；移动优先保留软键盘换行，用发送按钮。上限沿用各现有后端能力，不先机械统一2000/4000限制。
- 输入自动增高、有最大高度；长文在输入框内滚。添加附件与设置使用熟悉的 Button / menu / dialog / sheet，而非自造复杂拖拽控件。
- 只有本来在底部或主动发送时跟随最新消息；翻旧消息不抢位置，出现“回到最新消息”按钮。富内容/Orb尺寸变化也要考虑。
- 可点复制，icon有label，菜单/overlay可用Esc关闭并恢复焦点；真实运行才有取消，未支持abort的prepare不谎称停止。
- 移动键盘、safe-area、滚动锚点、reduced-motion必须实测；CSS的100dvh不是验收结论。

## 3. 认真复用什么，不照搬什么

### Telegram Web A：主交互依据

源码：`https://github.com/Ajaxy/telegram-tt`，本机`原研究机 telegram-tt checkout`，检查revision `28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80`。

- `src/components/middle/composer/MessageInput.tsx`：输入增高封顶；`isSendShortcut`区别桌面/移动；`isComposing`保护；发送键和Shift+Enter；保持真实焦点。
- `src/components/middle/MessageList.tsx`：`scrollOffsetRef`、bottom threshold、视口是否最新的判断，不把每次高度变化都强制拖到底。
- `MiddleColumn.tsx` / composer：稳定会话栏、消息区与底部输入；附件从入口展开，消息和输入不是双层表单卡。
- 不照搬完整IM、TipTap富编辑器、表情贴纸、群聊系统或其业务依赖。

### BeautifulUI / 本地Design Templates：材料与细节

`原研究机 design-templates checkout`已从干净工作区ff更新至`dc0f4718f79b73c894f1da7fda305fce94dfa1e2`。

固定BeautifulUI源：`templates/design/beautiful-ui-ai-interfaces/upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4`，重点`components/primitives/ChatComposer.tsx`；另读`ui-stack-decision.md`、`agentic-ui-primitives.md`、`ui-patterns/agent-interaction-guidelines.md`。

保留单边框输入、消息层级、轻量工具行、Orb身份。正式版用现有主题数值，不引入另一套配色。模板的StreamText/脚本式reveal不是后端证据；不拿它模拟执行。

### shadcn + AI Elements：交互原语

优先已有shadcn的Button/Textarea/DropdownMenu/Sheet/Dialog。AI Elements官方`Conversation`、`Message`、`PromptInput`提供成熟分区与输入/滚动语义，但不是另一个后台。

2026-10-05实际官方registry结果：

| 组件 | runtime dependencies（官方整文件） | registry dependencies |
|---|---|---|
| conversation | ai, lucide-react, **use-stick-to-bottom** | button |
| prompt-input | ai, lucide-react, **nanoid** | command, dropdown-menu, hover-card, input-group, select, spinner, tooltip |
| message | ai, lucide-react, **streamdown + @streamdown/cjk/code/math/mermaid** | button, button-group, tooltip |

因此不采纳Agent报告中“只要一个新依赖即可全量Message/PromptInput”的简化。正式实现优先评估官方copy-in，按实际需要引入；若用核心布局片段/既有shadcn实现，标注其参考来源，不宣称整套已安装。未批准前不执行一键安装，更不改Vercel `useChat`/Next后端。

来源：
- https://elements.ai-sdk.dev/components/conversation
- https://elements.ai-sdk.dev/components/message
- https://elements.ai-sdk.dev/components/prompt-input
- https://elements.ai-sdk.dev/api/registry/conversation.json
- https://elements.ai-sdk.dev/api/registry/message.json
- https://elements.ai-sdk.dev/api/registry/prompt-input.json
- https://ui.shadcn.com/
- https://www.beautifului.dev/

## 4. 三个指定Agent：真实结果

仅只读审阅，不改源码/依赖/生产配置，不读.env，不commit/push，不更改持久默认模型。

| 指定模型 | session | 结果 |
|---|---|---|
| opencode-go/muse-spark-1.3-contributor | ses_ef5d42e5fffeecQCBr6U25S3Ty | 完成：框架/视觉层级报告 |
| opencode-go/deepseek-v4.1-flash | ses_ef5d42db0ffegEyMiuJwa7gL62 | 完成：复用/迁移边界报告 |
| opencode-go/glm-5.3-flash | ses_ef5d42e54ffeSCfdPszoFhxPs8 | 失败：upstream service timeout，无最终报告 |
| 同一GLM一次重试 | ses_ef5d2eff0ffeGZ6awohmNXkJWo | 同样失败，不换GPT代审 |

OpenCode失败事件仍exit0，检查JSON error和实际最终text才得出以上状态。Muse/DeepSeek给出方向，但报告中的重复消息、loader真实性、依赖成本等结论并非自动接受；源码与registry复核优先。

原始prompt/JSONL/stderr/exit及最终报告留在`原研究机 hunjian-chat-20261005/（此轮原始运行材料未随本包复制）/`，不增加项目平行索引。

## 5. 最小落地顺序（本轮已实施表现层；全局复用仍未实施）

1. **先替换 `/hunjian` 布局和输入**：`AgentGoalComposer`提取/复用共享Conversation与PromptInput；`AgentRunWorkspace`控制流保留；`Workspace`把fineTune、脚本编辑、direct-submit迁入场景overlay，历史按需打开。不能只把旧38rem卡片加sticky就称完成。
2. **逐状态接真实内容**：answer/question/proposal/run/error/人工门/结果，用现有fixtures截图和旅程回读，验证没有丢素材ID、不重复消息、不丢确认或恢复。选择后再按薄adapter抽取通用壳，不重写整套AgentRun控制器。
3. **最后验证可复用性**：隐藏混剪专属区域，聊天原语仍成立；既有只读AgentChatPanel将来可以用同一表现层。当前不加全局入口，不迁会话真源，不宣称跨设备历史已统一。

`/hunjian`的prepare实际处理一般问答和创作目标，`journey.chat.send`是另一条只读同伴通道。先复用外观，不未经论证将它们硬接成同一写侧会话；不为框架阶段新增线程API、DB schema或sourceRefs。

## 6. 原型与验证

可点文件：`chat-first-prototype.html`，可本地打开，无网络请求、模型调用、真实文件上传或任务创建。

可试：空态/答复/提案/故障、附件演示、设置overlay、输入/停止演示、长会话与最新消息、通用壳显隐。header状态选择与“通用壳”按钮是**原型调试控件**，不属于最终产品头部；侧栏和隐藏移动导航也只是版式占位，不是已实施的全局导航改造。

自动浏览器检查：Chromium 1440×900、390×844均通过：空输入禁发、IME不误发、Shift+Enter换行、按钮发送/停止演示、新会话、设置Esc关闭、场景显隐、长列表下输入位置稳定、回最新消息、无pageerror。截图已回读。没有运行项目build/typecheck，因为本轮只改PRD及独立HTML/说明，未改应用TypeScript。

**没有验证**：真实Journey、真实账户、视觉模型、网络/恢复、正式页面移植、iOS/Android软键盘、WebGL Orb、CI/部署。离线fixture和原型不是端到端验收。

## 7. 正式页面迁移与验收（2026-10-05）

本节记录后续 owner 授权开工的结果，不覆盖 §6 离线原型的历史边界。

### 分工与控制

四个并发实现 worker 均显式使用 `opencode-go/muse-spark-1.3-contributor`，文件所有权不重叠：

| worker | 所有权 | session |
|---|---|---|
| shell | AgentGoalComposer + 新 chat/ 两个原语 | ses_ef57ae691ffeWdZL4pT77myZGn |
| scene | Workspace / ComposerMaterials / MixSceneControls | ses_ef57ae3ddffes01B0NdSW9UPBm |
| run | AgentRunWorkspace | ses_ef57ae430ffe8z7DVyzeIpF9Kq |
| tests | 新 hunjian-chat.spec.ts / 边界脚本 | ses_ef57ae1b7ffeej6rATdf64QpSu |

orchestrator：先锁定 props 接缝，负责 AppShell / Hunjian 满高布局、SOT、整合与最终检查。实现日志写路径审核确认未跨文件所有权；read-only最终复核另开 Muse。没有后台、schema、权限、依赖或路由契约改动，没有 Agent commit/push。

场景 worker 初稿重复注入了设置/历史入口，并用宽类型 spread 掩盖接口检查；orchestrator 去掉重复，改显式 typed props。测试 worker 的静态脚本误要求通用壳接 scene props，改为检查 adapter 注入与通用 header/children/composer 槽。停止其超出预算的反复阅读后由 orchestrator 接手验证，不接受“每个worker typecheck绿”作为整合验收。

### 实际落地

- `AgentChatShell`：无外层大卡，header / 唯一消息滚动 / 稳定贴底 composer；只有已有业务卡和输入框有纸面。底部跟随使用观察器，不在读旧消息时强拖，主动发送或“回到最新”才钉底；观察内容和视口尺寸，组件卸载清理。
- `AgentChatParts`：共用用户/Pi消息、活动、真实等待与输入；不依赖 mix/spec/jobs。IME/229保护、桌面Enter/移动按钮、换行、自增高封顶；保留 Orb，但不复制演示流式。自动聚焦仅初次桌面，异步完成不抢overlay焦点。
- `AgentGoalComposer`：保留原send/requestId续跑与exports/最大长度、answer/question/proposal/history/error。提案详情折叠但warnings常显、阻塞原因可见；普通发送不因缺素材被挡。
- `Workspace`：同一spec，参数/口播/preflight/直接出片进设置；素材入口与chips/上传队列保留；历史按需Dialog，taskNo深链恢复和提交成功可达。直接出片成功先关设置再开历史，素材fix先退出设置再开素材；恢复焦点回具体入口。
- `AgentRunWorkspace`：薄场景接缝、消息流内run/场景活动；真实status常显、执行明细默认折叠。控制流、Material IDs、取消、幂等、人工门/发布语义未改，人工门视频网格仍常开。
- AppShell / Hunjian：workspace填剩余槽，视觉视口resize调壳高度，不另套页面100dvh；clips/dub/script与其他页面仍旧布局。没有手机导航改造。

### 最终核验口径

`web/e2e/hunjian-chat.spec.ts` 是**正式应用页面＋全mock Gateway/SSE**，无真实登录、模型、上传、任务创建、审批或发布。viewport尺寸不等于真实设备。

**最终浏览器：9/9 passed，38.0s，exit 0。** 日志：`原研究机 hunjian-chat-20261005/（此轮原始运行材料未随本包复制）/app-browser-final.log`；退出：同目录 `app-browser-final.exit`。此前失败包括fixture试点禁用按钮/遗漏modal关闭，以及真实的任务恢复叠加附件Popover；已区分并修正，不把早期失败抹去或都归咎fixture。

覆盖：桌面/手机首屏无参数堆叠与缺素材alert、单一入口、输入贴底、桌面Enter/换行/IME、手机Enter不发送、长输入封顶、连续两轮去重、Goal素材ID确认、materials/taskNo深链、缺素材只挡确认/直接出片、同requestId错误续跑、真实cancel action调用、直接提交只留一个历史Dialog、长历史不抢滚动/回最新、设置Esc恢复焦点、人工门网格常开/defer恢复/批准只走既有decision action、全例pageerror检查。

另验：`npm run typecheck`、`check-agent-chat-boundaries.mjs`、`test:audit-ui`、`test:result-recovery`、`git diff --check`。最终浏览器总数与执行结论须以最后一次日志为准；历史6/6、7/8、7/9不是最终验收。截图在最终整合后回读，未以原型截图充当正式版。

全量 `bash web/tools/design-lint.sh` **未过**：Shoot.tsx、ShootTemplateGallery.tsx、MobileShoot.tsx调色板类及packfly.tsx的oklch字面量。已核这些文件与HEAD无diff，是既存违规；本轮没有绕token新增色值，也不扩scope代修。没有build：本轮不改构建配置，typecheck＋浏览器场景为针对性验收。

独立最终 Muse 复核提出取消、focusAnchor与双Dialog问题。接受并修正双Dialog、素材fix及真实textarea焦点；增加cancel fixture验证。未接受其“cancel超时使cancelling永久卡死”的断言：`cancelRun` 已有 finally 清标记，不凭推测放开未停止任务的“新会话”。后续对深链弹层又加实际浏览器回归，最终保持单个历史Modal，不自动重开附件。

仍未验：真实prepare/model上下文、付费执行、上传与真实weak-network、取消对子进程的证明、跨设备线程恢复、iOS/Android键盘与WebGL设备兼容、CI/部署。没有 commit/push；当前授权仅实现，发布需另授权。

## 决策信心 / owner / 下一检查点

主框架信心高：用户当前要求、实际首屏、主流参考与两份独立审阅一致。正式移植成本信心中：会话真源与取消能力要保留原合同，不能当成纯换皮。

owner：产品维护者确认主框架；orchestrator负责整合与验收。下一检查点：owner查看正式页面截图，再做真实聊天/素材/创作旅程及手机键盘验收；不因静态/mock测试通过宣称真实服务或部署成功。
