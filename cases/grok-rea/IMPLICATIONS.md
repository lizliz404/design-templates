# 对 Liz 的 agent 聊天面 / Product Studio 的对照笔记（v2）

依据本案例两批证据：公开面 + 登录态运行时（13 个 REA 场景、WS 协议、12 个设置分区、工作台）。不改任何产品代码。grok.com 是闭源产品，不进轮子池 —— 学的是**决策**，不是抄实现。

## 值得带回讨论的（登录态新增）

### A. 信息架构

1. **三栏分工：对象在左、对话在中、产物在右。** 左栏管历史与对象（Chats/Projects/Bots），右栏是多标签工作台（文件/Canvas/App preview）。产物不进对话流 —— 这直接回答了「agent 产出物放哪」：放对话里会稀释对话、且产物需要持续状态（tab、可关、可预览）。对 Studio 的启发：**「工作面」和「对话面」分离**，对话是指挥层不是容器层。v1 那条「聊天即产品时侧栏可以缺席」依然成立，但那是访客态；登录后立刻变成三栏 —— Grok 用「登录与否」做了渐进复杂度的分界。

2. **右栏是 tab 化的工作台，不是详情抽屉。** `Open tabs` tablist + `New tab` + 每 tab 三种产物入口（Open a file… / Open Canvas / App preview）+ `Search or type an action` 命令面板。要点：产物容器是复用的，tab 是可增删的 —— 比「每次产出一个浮层」强在**产物可以并存对照**。App preview 只在会话上下文出现 —— 入口按上下文条件出现，不是常显全部。

3. **Canvas 绑定会话而不是独立白板。** Canvas 空态文案明说「open or start a chat conversation to use the Imagine canvas」。产物有归属，工作台是查看器+操作台，不是又一个起点。

### B. 输入面

4. **`+` 一个菜单收敛全部输入源**：Upload a file / Projects / Skills / Add connector / Files。本地文件、项目上下文、第三方数据三类来源收进同一入口 —— 输入条保持单点，能力发现在输入点完成。

5. **模式用意图词不用模型号**：Auto✓/Fast/Expert/Build/Heavy。默认 Auto 把路由决策收回服务端 —— 用户表达「我要什么任务形态」，系统决定「哪个模型」。同时建议列表按模式整组替换（Imagine 换成模板画廊）——**建议列表是模式的说明书**，这比加一层帮助文档聪明。

6. **发送槽位按状态换键**：`Voice mode` 与 `Send` 占同一位置、按 composer 是否有内容切换。同一槽位语义随上下文变 —— 省一个按钮位，但要小心 a11y 名稳定性（实测两态名不同，是好处理）。

### C. 会话生命周期

7. **消息版本分页器**：用户消息编辑后产生分支，`Previous 2/2 Next` 就地翻版本。底层是 `response-node` 会话树 + `?rid=` 响应深链，UI 层把图结构压缩成两个键 —— **分支这个 agent 产品的核心复杂度被平民化了**。Studio 若支持编辑重跑，这是比「编辑=覆盖」或「编辑=新会话」都更好的中间解。

8. **中断 = 新消息优先**：发送新消息隐式中断在途响应（`Request was interrupted by the user`），没有独立 stop 键暴露。极简，代价是不能「停止但保留当前草稿」。快对话适用；长任务场景需要显式 stop —— 取舍看清楚再学。

9. **思考 UX 双相**：流式时轮换的状态词（「Weighing the options」），定格后折叠成 `Thought for 39s/3m47s`。过程感与事后可审计分开 —— 状态词负责「它在干活」的情绪信号，折叠块负责「它想了什么」的证据。两个目标不要用同一个组件硬扛。

### D. 能力变现与增长（值得学的商业设计）

10. **`Think Harder` 在能力缺口出现时 upsell**：不是定价页拦你，而是在流式响应中把「还能更强」做成 chip —— 付费点嵌在任务流里。

11. **周配额 + 双轨计量**：Weekly limit 制造每周回流节奏；Grok Bot 单列配额说明 Bot 是独立账本（第二增长曲线）；credits + auto top-up 兜底。配额页同时是订阅诊断页。

12. **Import memory from other AI providers**：数据控制里放「把别家 AI 的记忆迁过来」—— 主动消解迁移沉没成本，攻击性极强的增长入口，藏在合规语义最重的分区里。

13. **Automations/Skills 模板市场制**：Featured 画廊 + 类目 tab + 一键 Add + Custom 兜底；Skill 创建 = 「描述一个可重复任务」。用内容产品冷启动打法发能力 —— 模板即激活漏斗。

### E. 信任与隐私

14. **Private 模式五通道同步变**：虚线 composer + 问候替换 + 建议替换 + 内联「不进历史不训练」+ 协议级 `is_temporary/disable_artifact`。模式切换的诚实性 = 视觉、文案、行为、协议四层一致，用户不会误判自己在哪。Data Controls 再写一遍「Private chats are never stored」—— 关键条款在触点重复，不只在 FAQ。

15. **会话级文件系统**：`/rest/conversations/files/list?conversationId=&path=/` —— 每个会话一棵虚拟文件树（`filesystem-unread` 有未读态）。文件是 scoped 资源，和 Studio 的「项目工作区」思路一致。

## 公开态结论（v1 保留，仍然有效）

- 聊天即产品时访客侧栏可以缺席；登录后立刻变三栏 —— 渐进复杂度按登录态分界（见上 1）。
- 技能进 composer 不进顶栏；问候本地化且轮换（多语言空态要连动画文案一起译）。
- 临时会话在皮肤层+协议层同时有位置（v1 只见到 CSS token，v2 证实协议级）。
- 兄弟面换 composer 形态（Imagine 厚 composer + masonry 示例）而不是换导航 —— v2 进一步发现 `/imagine` 直接重定向回 `/`，Imagine 就是 composer 的一个模式，「另一个画布」其实是空态建议组的切换。
- 登录墙不是整页墙；`return_to` 带上文。

## 不要学的（更新）

- 不要把 `/plans` 302 到 accounts.x.ai 的统一付费墙当成「产品内结算」参考 —— 它把支付域整个外迁了。
- 不要学 Library 点击后主区清空 URL 不变的状态（疑似 bug 或空态未处理）。
- 不要把「没有显式 stop 按钮」照搬到长任务产品 —— 那是短对话场景的取舍。
- 不要学 cookie 横幅正文留英文按钮本地化的裂缝（v1）。
- `/rest/*` 与 `wss://` 形状是对方后端合同，不是可接的接口 —— 只用作架构判断证据，不要调用。

## 对照仍缺的

Canvas/App preview 有内容的形态、voice 通话面、上传流、暗色模式、窄宽响应、Business workspace 切换、JS 深分析（456 chunk 进行中）。要补得在授权会话里继续只读场景，不能靠猜。
