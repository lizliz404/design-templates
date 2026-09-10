---
name: uisfx-semantic-cues
description: >-
  Sparse semantic UI sounds via the `uisfx` runtime in the consuming app (not in this
  pack). 78 cues / 12 packs / 6 loops. MIT code, CC0 audio. Sound never replaces
  visible status.
version: 2026-09-07 · expanded from the 15-rule digest after auditing uisfx agent-guide
  + uisfx-catalog.json (2026-07-13 snapshot)
upstream: https://github.com/romainsimon/uisfx
---

# UI SFX — 语义事件映射手册

类型：Craft handbook（非 Skill / 非项目 docs）。把「界面声音」当语义系统做：产品代码只声明
**发生了什么**（cue），声音包决定**听起来像什么**（pack）。上游 [romainsimon/uisfx](https://github.com/romainsimon/uisfx)
· 代码 MIT · 音频 CC0-1.0。78 个 cue、12 个 pack、72 个 one-shot、6 个无缝 loop（资产 936 个）。

| | |
|---|---|
| **What** | `uisfx` 运行时的接入纪律：pack 选型法、cue 语义映射、播放器生命周期、loop 清理、声音偏好与可访问性、验收清单。 |
| **Why** | 声音是唯一无法用眼睛忽略、也无法用眼睛关掉的反馈通道；做对是「在意细节」的体感，做错是立刻想静音的噪音。约束先行，避免每个项目重新发明（或重新踩坑）。 |
| **Who** | 给消费项目的实现者（人或 agent）。产品代码里 `npm install uisfx`；**本 pack 不安装 uisfx、不携带样本库**。 |
| **How to use** | ① 接入前先做 §2 pack 选型与产品触点审计 → ② 按 §3 映射 cue → ③ 生命周期照 §4/§5 → ④ 上线前跑 §8 验收清单。 |
| **Not this** | 不是音乐/氛围音设计（无 BGM、无转场配乐）；不是音频资产库（样本在上游包里）；不规定音色（pack 决定）。 |
| **When to open** | 任何项目第一次接 UI 音效；或已有音效系统做审计/迁移。 |

---

## 1. 总纲（15 条，浓缩版；细则见后续各节）

```text
1. 仅在消费项目：npm install uisfx
2. const ui = createUISFX({ pack: 'minimal', preferences: {} })
3. 首次可信 pointer/keyboard action 后：await ui.unlock()
4. 稀疏导航 hover -> ui.play('hover')
5. 主操作 click/press -> ui.play('press')
6. 保存、上传、完成 -> ui.play('success')
7. 阻断性提交失败 -> ui.play('error')
8. 可见的处理中状态 -> const handle = ui.play('processing')
9. 成功、失败、取消或离开页面 -> handle?.stop()
10. toast、文案、颜色和状态不可省：声音从不作为唯一信号
11. 提供持久 mute：ui.setEnabled(false)
12. 遵守用户音量与浏览器/设备 autoplay 规则
13. 高频 error/notification 必须 rate-limit
14. 密集表格、阅读、连续输入、auto-refresh -> 静音
15. reduced-motion 不等于静音偏好；仍让用户自主关闭声音
```

## 2. Pack 选型（先选气质，再接代码）

选型看五件事：产品目的、受众、品牌音色、既有视觉/动效语言、交互密度。**一次交互只用一个
pack，全站一致**；`ui.setPack()` 留给真正的整体换肤（如主题切换），不做每页混搭。

| Pack | 气质 | 适合 |
|---|---|---|
| `minimal` | 干、准、几乎不可见 | 生产力、SaaS、系统 UI |
| `soft` | 圆润绒感、暖、安心 | 移动端、健康、友好型 SaaS |
| `glass` | 亮、晶体、高级 | 媒体、金融、奢侈品类 |
| `arcade` | 像素块、欢快电压 | 游戏、连胜、游戏化学习 |
| `mechanical` | 开关、继电器、扎实的挡位 | devtools、硬件、工业 UI |
| `organic` | 木、水、呼吸、小石子 | 教育、儿童、平静的游戏 |
| `dreamy` | 空气花、柔光、慢闪 | 创作工具、健康、氛围 app |
| `scifi` | 干净全息 ping、克制数码微光 | AI 工具、空间 UI、未来感游戏 |
| `rubber` | 触觉弹性、友好回弹 | 儿童、玩味移动端、休闲游戏 |
| `cinematic` | 深冲击、抛光尾音、安静的大场面 | 高端媒体、游戏、戏剧性时刻 |
| `studio` | 触觉编辑精度 + 温暖电影克制 | 影视、音频、AI 创作工具 |
| `zen` | 纯音、干木、和纸细节 | 正念、阅读、写作、平静生产力 |

决策法（避免默认选第一个）：

1. **先定「克制度」档**：数据工作台/系统类 → `minimal` 一档；有温度但克制 → `soft`/`zen`；
   强个性（游戏/创作/未来感）才考虑 `arcade`/`scifi`/`cinematic`。
2. **对齐既有 motion 语言**：动效是 120–420ms 的克制曲线 → 选干而短的 pack（`minimal`/
   `mechanical`/`studio`）；动效本身就是卖点 → 允许更有存在感的 pack。
3. **对齐受众场景**：长时间盯屏的后台 → 低刺激；短会话、轻松氛围 → 允许更暖。
4. **预览再拍板**：上游站点可试听；至少对比两个最强候选再定。
5. **案例**（本库沉淀来源）：OrgBrain（组织事实工作台，暖纸石墨视觉、数据密集、长时间盯屏）
   候选收敛到 `minimal` vs `zen`，按「盯表 8 小时不烦」标准倾向 `minimal`；评估记录见消费项目
   docs，不在本模板展开。

## 3. 语义映射：cue 说什么，不猜控件长什么样

映射按「发生了什么事件」选 cue，不按「用户点了哪种控件」。异步结果只在**成功返回后**播
`success`、**确认失败后**播 `error`；`delete` 在删除**已提交**后播。一次普通交互只播一个
cue——不把 `press`、`select`、`success` 叠成一串。

13 类 cue 速览（完整名录以 [catalog](https://uisfx.com/uisfx-catalog.json) 为准，78 个）：

| 类 | 代表 cue | 什么时候用 |
|---|---|---|
| input | `hover` `press` `release` `focus` `long-press` | 稀疏重要控件；`hover` 仅 fine pointer，禁触屏与密集列表 |
| selection | `select` `deselect` `toggle-on` `toggle-off` `check` `uncheck` | 选中态按**结果**选 on/off，不是按点击 |
| navigation | `open` `close` `back` `forward` `expand` `collapse` | 面板/sheet/折叠层；不做普通路由跳转 |
| editing | `delete` `cancel` `undo` `redo` `copy` `paste` | 破坏性操作提交后才响；undo/redo 跟随结果 |
| movement | `drag-start` `drop` `snap` `reorder` `invalid-drop` | 拖放落地、非法目标给 `invalid-drop` |
| communication | `send` `receive` `notification` `mention` `typing` `reaction` | 消息发出/到达；`typing` 是 45ms 一次的键触，不做长循环 |
| feedback | `success` `error` `warning` `info` `blocked` `retry` | 结果类主战场；`retry` 给「再试一次」的确认 |
| progress | `start` `stop` `progress-step` `complete` `queued` `checkpoint` | 长流程的离散节点；循环态见 §5 |
| loops | `loading` `processing` `recording` `connecting` `scanning` `streaming` | 仅 6 个循环 cue，见 §5 |
| media | `play` `pause` `seek` `volume-change` `skip-next/previous` | 媒体控件专属 |
| system | `connect` `disconnect` `lock` `unlock` `wake` `sleep` | 连接态、权限门、休眠唤醒 |
| reward | `reward` `level-up` `achievement` `streak` `badge` `bonus` | 谨慎：产品没有成长体系就一类都不用 |
| commerce | `add-to-cart` `checkout` `purchase` `refund` `coupon` | 有真实交易流才用 |

默认音量已经是调好的低值（cue defaultVolume 0.065–0.23，播放器主音量 0.7），**不要逐个
cue 覆盖音量**；只在全局 `setVolume()` 或确有理由的单点覆盖。

## 4. 播放器生命周期（一处创建，处处复用）

```ts
import { createUISFX } from 'uisfx'

const ui = createUISFX({
  pack: 'minimal',            // §2 选定的 pack
  volume: 0.7,                // 全局主音量
  preferences: { key: 'product:sound' }, // 偏好持久化交给运行时，键名用产品命名空间
})
```

- **单例**：一个 app 一个 player。模块级持有或放 app 级 provider；严禁每次渲染/每次交互
  新建（React Strict Mode 双挂载也会双实例）。
- **SSR 禁止**：不在服务端实例化、不播。创建放客户端入口或首次客户端调用。
- **手势内解锁**：`await ui.unlock()` 必须在真实 pointer/keyboard 处理器里、任何 `await`
  之前同步发起；或者在该处理器里创建/保留/恢复 `AudioContext` 再传给
  `createUISFX({ context })`。页面加载**永不 autoplay**。
- **解锁前的异步 cue 一律丢弃，不排队**——过期反馈比没有反馈更糟。
- `ui.play()` 可能返回 `null`（被冷却/被禁用），调用处必须容 null。
- **清理**：app 级服务退役时 `await ui.destroy()`；若 context 是自己传进去的，
  `ui.destroy()` **不会**关它，需在其后 `await context.close()`。路由级全局转换（登出等）
  用 `ui.stopAll()`，不是 destroy。
- `bindUISFX(root?)` 只用于简单一次性 DOM 交互；异步结果、应用状态、loop、生命周期敏感
  行为一律走 imperative player。同一元素**不要**同时用声明绑定和手动播放。

## 5. Loop 六环：不留一个看不见的循环

六个 loop cue：`loading` `processing` `recording` `connecting` `scanning` `streaming`。

- 每个可见进行中的过程保留一个 `PlayingSFX` handle；启动幂等（重复 start 不叠加）。
- **所有出口**都要 stop 并清空引用：成功、失败、取消、超时、路由切换、组件卸载、mute/disable、
  `finally`。用 `finally` 保证，不靠 happy path 自觉。
- 先停 loop，再播真实结果（`complete`/`error`），顺序不能反。
- 区分「取消」与「失败」：abort 之类取消不播 `error`（只用来抑制不当 error cue，
  取消的传播策略仍归产品自己的逻辑管）。
- pack 切换时活跃 loop 自动迁移，无需手动重启。
- 隐形 loop 是红线：loop 开着而用户看不见对应过程 = bug。

```ts
let processing = ui.play('processing')
let failed: unknown
let cancelled = false
try {
  await runTask({ signal })
} catch (error) {
  failed = error
  cancelled = signal.aborted || isAbortError(error)
} finally {
  processing?.stop()
  processing = null
}
if (!failed) ui.play('complete')
else if (!cancelled) ui.play('error')
```

## 6. 偏好与可访问性

- 声音偏好**显式、可见、持久**：能复用产品偏好系统就复用；否则 `preferences.key` 落
  localStorage。enabled 与 volume 都持久化。
- 关闭要立即生效：`ui.stopAll()`（同时清掉各处保留的 loop handle）之后再
  `ui.setEnabled(false)`——静音那一刻不能还有余音。
- 声音永远只是可见状态的加强：toast、文案、颜色、状态图形、ARIA 一个都不能省。
  **声音从不作为唯一信号。**
- `prefers-reduced-motion` 只管运动，**不推断为静音**；要不要关声音由用户显式决定。

## 7. 交互质量细则

- 鼠标、触摸、键盘三种激活**不得双重发声**（同一动作只触发一次 cue）。
- 高频事件（seek、volume、hover、progress、notification）要 throttle/靠内置冷却；
  唯一例外 `typing`：本地文本输入的每个 `input` 事件播一次 45ms 短音，低音量，
  **绝不换成长 typing 循环**。
- 运行时内置高频冷却默认保留，除非审计过的交互明确需要覆盖（`cooldownMs`/`retrigger`）。
- 打字/连续输入、密集表格浏览、长文阅读、auto-refresh 期间天然不该响——这些场景的触点
  一开始就别映射。

## 8. 验收清单（上线前全绿）

- [ ] cue 语义映射表评审过：每个 cue 对应一个真实状态变化，无「装饰性点击音」
- [ ] 异步结果时机正确：success 在 resolve 后、error 在 fail 后、delete 在提交后
- [ ] loop 每个出口（成功/失败/取消/超时/路由/卸载/mute/finally）都停且清引用
- [ ] mute 即时生效且持久化（enabled + volume）
- [ ] 鼠标/触摸/键盘无双重播放；`typing` 不 throttle、高频 cue 有冷却
- [ ] SSR 安全：服务端零实例化零播放；unlock 在真实手势内
- [ ] remount / Strict Mode 不产生第二个 player；teardown 走 `destroy()`（自建 context 另行 `close()`）
- [ ] 可视/文字/ARIA 反馈完整，声音缺席时产品照样可用
- [ ] formatter、typecheck、tests、production build 全过；交付附 action-to-cue 映射表

## 9. 反模式速查

- ❌ 每个 click 都响（sonify every click）——噪音化最快路径
- ❌ 解锁前把异步 cue 排队，解锁后一次性炸出来
- ❌ 看不见的 loop 一直转；finally 里忘了 stop
- ❌ press + select + success 三连播同一个动作
- ❌ 触屏设备播 hover 音；密集列表播行 hover 音
- ❌ 把 reduced-motion 当静音开关
- ❌ 逐 cue 硬调音量盖过 pack 调音
- ❌ destroy 之后忘记关自建 context；或把 `stopAll` 和 `destroy` 混用（前者管全局转换，后者管服务退役）

## 10. 参考

- Agent integration guide: https://uisfx.com/docs/agent-guide.md
- Copy-ready implementation prompt: https://uisfx.com/agent-prompt.txt
- Cue catalog（机器可读）: https://uisfx.com/uisfx-catalog.json
- UI sound design docs: https://uisfx.com/ui-sound-design.md
- npm: https://www.npmjs.com/package/uisfx · Source: https://github.com/romainsimon/uisfx
