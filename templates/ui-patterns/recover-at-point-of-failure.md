---
name: recover-at-point-of-failure
description: >-
  Evidence-based reference: every system message (toast / alert / modal /
  error) must be classified by what its next action carries — read-only,
  directional, action-carrying (resolve + resume), or completed + undo —
  and shipped at the highest level the situation safely allows. Covers the
  L0-L3 actionability spectrum, the two-question test, cited UX evidence,
  best-in-class product behaviors, and patterns for unsaved changes, missing
  prerequisites, permission requests, and session expiry.
---

# Recover at the Point of Failure — 系统消息可执行性分级与错误恢复参考

## 标注约定

- 无引用的规则 = **PACK DOCTRINE**（本 pack 自己的设计约定）；带 `[来源](URL)` 的 = **EVIDENCE**（外部研究 / 平台规则，检索于 2026-08）。
- 本 pattern 是抽象、跨市场的 UI/UX 准则：从全球被复制最多的产品如何在失败点设计恢复动作中归纳。

## 定义与两问测试

**Recoverable error**（可恢复失败）：系统已识别出障碍、且存在安全明确恢复路径的失败状态——缺前置、有未保存修改、权限未授、会话过期。高风险不可逆动作不在本 pattern 范围内（见「边界与 Anti-patterns」）。

**PACK DOCTRINE — 两问测试**：每条 error / toast / alert / modal 必须同时回答——① **What happened?**（发生了什么，用人话、具体、不推诿）② **What can I do right here?**（此刻能做什么，恢复动作直接可点）。只回答①的 error UI 只做完了一半。该表述是对以下证据的压缩：NN/g 要求错误信息「提供 constructive advice」「降低纠错成本——能猜到正确动作时，让用户从一小组修复里直接选」[NN/g 2023](https://www.nngroup.com/articles/error-message-guidelines/)；ISO 9241-110:2020 要求系统在可识别错误处宽容对待并协助恢复，并把「低效的错误恢复」列为要防的可用性问题 [ISO](https://www.iso.org/obp/ui/#iso:std:iso:9241:-110:ed-2:v1:en)；WCAG 3.3.3（AA）要求已知纠正建议必须提供给用户 [W3C](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html)。

**PACK DOCTRINE — resolve + resume**：恢复动作完成后自动续跑被打断的原始意图；「恢复」不是把用户扔回一般界面让 TA 重新找路。

**PACK DOCTRINE — 意图—障碍—决策三角**：目标是最小化「意图 → 障碍 → 处置」的距离。把所有合理决策一次摆到用户眼前，让一次点击同时完成「解决 + 续跑」。度量为 interaction cost——用户为达成目标付出的心智与体力总和，是可用性的直接度量 [NN/g 2024](https://www.nngroup.com/articles/interaction-cost-definition/)；目标越近、越大，越快被点到 [Fitts's law, NN/g 2022](https://www.nngroup.com/articles/fitts-law/)。

```text
用户意图: 离开页面
    ↓ 障碍: 有未保存修改
    ├─ [Stay]             不走了
    ├─ [Discard & Leave]  丢弃并离开
    └─ [Save & Leave]     保存并离开 —— resolve + resume
```

## 证据基础（UX 研究，EVIDENCE）

- 可用性启发式 #9（帮用户识别、诊断、从错误中恢复）与 #5（错误预防）[NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/)；写作细则见 [NN/g 2023](https://www.nngroup.com/articles/error-message-guidelines/) 与表单错误十条 [NN/g 2019](https://www.nngroup.com/articles/errors-forms-design-guidelines/)。
- 确认框本质是任务流打断：只用于后果严重的动作；按钮表述各自后果而非 Yes/No；避免默认 Yes；警告太频繁会训练出自动点掉 [NN/g 2018](https://www.nngroup.com/articles/confirmation-dialog/)。
- Modal 交互成本高，只保留给重要警告与需要用户决策的关键错误 [NN/g 2017](https://www.nngroup.com/articles/modal-nonmodal-dialog/)、[NN/g 2023 评分细则](https://www.nngroup.com/articles/error-messages-scoring-rubric/)。
- 防丢稿：应用内导航用「Stay / Save and leave / Discard and leave」，保存失败必须留在原页 [UX Patterns Guide](https://uxpatternsguide.com/patterns/exit-warning/)；浏览器级关闭/刷新只能触发通用 beforeunload 文案 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)。
- 会话过期：暂停 → 重认证 → 重试，页面不导航、状态不卸载 [Mateu](https://mateu.io/ux-patterns/session-expiry/)；return URL 需签名校验防 open redirect [Scalekit](https://docs.scalekit.com/guides/user-auth/preserve-intended-destination/)；WCAG 2.2.5（AAA）要求重认证后进行中数据不丢 [W3C](https://www.w3.org/WAI/WCAG21/Understanding/re-authenticating.html)。
- 权限请求：in-context rationale（要什么数据、换来什么）再触发系统框；拒绝后优雅降级、不全屏阻断 [Android](https://developer.android.com/training/permissions/requesting)。

## 核心：L0–L3 可执行性光谱（actionability spectrum）

每条系统消息（toast / alert / modal / error）必须按「其下一步动作携带什么」分级：

| 级别 | 名称 | 消息携带什么 | 用户要做什么 |
|---|---|---|---|
| **L0** | 只读 read-only | 只有信息 | 自己去别处找修复（或无事可做） |
| **L1** | 指路 directional | 指出修复在哪 | 自己导航过去 |
| **L2** | 携带修复 action-carrying | 消息本身带修复按钮 | 一次点击修复 + 续跑被打断的意图 |
| **L3** | 完成式 completed + undo | 系统已安全解决，报告做了什么 | 一次点击撤销（undo） |

```text
同一个意图「离开页面」，四级形态：

L0  "注意：你可能丢失未保存的更改。"              ← 只读：怎么保全看用户自己
L1  "未保存的更改可在 文件 → 版本历史 中找回。"    ← 指路：路还得用户自己走
L2  "有未保存修改。" [Stay] [Discard & Leave] [Save & Leave]
                                                  ← 携带修复：决策集就地完成
L3  "检测到未保存修改，已自动保存为草稿。" [撤销]   ← 完成式：系统已顺手修好
```

### 各级合法性边界

- **L0 仅当纯 FYI**：不存在任何用户可执行动作（同步完成、版本号变化等）。存在可能动作的消息用 L0，就是把修复成本转嫁给用户。
- **L1 是反模式（只要 L2 可能）**：修复按钮能放进消息里时，指路就是浪费一次交互——用户仍要走完最后一段。仅当修复无法在当前上下文安全携带（需要整页表单、系统级流程）时，L1 降级合法。
- **L2 是默认目标**：两问测试第②问的正面回答。恢复按钮 = 修复 + 续跑原意图，不是「关闭弹窗」。
- **L3 仅当安全 + 明确 + 可逆**：系统自动替用户处置，只允许在结果安全、意图明确、可撤销（或天然可逆）时，且必须报告做了什么并提供 undo。模糊或不可逆事项禁止静默自动处置——改为给出完整决策集（如 `[Stay] [Discard & Leave] [Save & Leave]`），让一次点击同时完成「解决 + 续跑」。

### 升级规则（elevation rule）

**PACK DOCTRINE — 在安全允许的前提下 ship 最高等级。** 能 L2 就不留 L1；L3 只在安全、明确、可逆（或有 undo）时启用。该规则由三个评价轴支撑：

1. **交互顺滑度**：等级越高，「意图 → 障碍 → 处置」的距离越短——interaction cost 越低 [NN/g 2024](https://www.nngroup.com/articles/interaction-cost-definition/)；目标越近越大，越快被点到 [Fitts's law, NN/g 2022](https://www.nngroup.com/articles/fitts-law/)。
2. **系统替用户做了多少**：L2 是「系统把修复递到手边」，L3 是「系统顺手修完再报告」——好系统的姿态是多替用户做一步，而不是多要求用户走一步。
3. **完整的读者视角思考**：写消息前先模拟读者处境——TA 正被打断、正想完成某事。只读播报（L0）通常意味着作者没问「读者此刻想干什么」。

## Pattern catalog

每条按 **trigger → carried action(s) → resume semantics → pitfalls**，并标注目标等级。

### P1 Unsaved changes（L2 决策集；自动保存体系下为 L3）

- **trigger**：脏状态下离开（应用内路由、关闭、刷新）。
- **carried actions**：L2 完整决策集 `[Stay]  [Discard & Leave]  [Save & Leave]`——标签写后果而非 OK/Cancel [NN/g 2018](https://www.nngroup.com/articles/confirmation-dialog/)；浏览器级关闭/刷新只能用 beforeunload 通用文案 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)。L3 变体：autosave 让「未保存丢失」结构性罕见，失败点退化为「报告 + 恢复历史版本」。
- **resume semantics**：`Save & Leave` 必须等保存成功再导航；保存失败留在原页并保住输入 [UX Patterns Guide](https://uxpatternsguide.com/patterns/unsaved-changes-prompt/)。
- **pitfalls**：用消失的 toast 说「未保存」（L0 顶替 L2）；无变化也拦截；保存失败仍关闭编辑器。

### P2 Missing prerequisite（L2）

- **trigger**：动作缺前置（封面图、未选项目、未完成配置）。
- **carried actions**：报错处直接给完成前置的控件（`[Choose Cover Image]`），对应 WCAG 3.3.3「已知纠正建议必须提供」[W3C](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html)。
- **resume semantics**：补齐后自动继续被打断的原动作（Publish）。
- **pitfalls**：`[OK]` 后让用户滚回页面找上传区（L1 顶替 L2）；wizard 中途失败整表清空——应按步持久化、恢复到最后有效步 [uxpatterns.dev](https://uxpatterns.dev/patterns/advanced/wizard)。

### P3 Permission request（L2）

- **trigger**：功能需要设备权限（相机 / 麦克风 / 位置）。
- **carried actions**：in-context rationale——说明访问什么数据、授权换来什么，再触发系统权限框；Apple 要求 purpose string 具体说明用途并举一个使用实例 [Apple Tech Talks](https://developer.apple.com/videos/play/tech-talks/110152/)；系统框文案不可定制 [Android](https://developer.android.com/training/permissions/requesting)。
- **resume semantics**：授权后继续被拦的功能；拒绝则优雅降级，不全屏阻断、不反复弹。
- **pitfalls**：启动时一次性索要全部权限（Apple HIG 明确反对，除非该权限是产品运行的前提 [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/privacy/)）；拒绝后频繁再弹（训练用户自动拒绝）。

### P4 Session expiry（L2）

- **trigger**：请求返回 401 / 会话过期。
- **carried actions**：`"Your session has expired. Sign in to continue where you left off."  [Sign In Again]`；静默 refresh 失败才升级为可见登录。
- **resume semantics**：登录成功后回到原路径（return URL 签名校验防 open redirect [Scalekit](https://docs.scalekit.com/guides/user-auth/preserve-intended-destination/)）；进行中请求入队、重认证后重放 [Webeyez](https://webeyez.com/insights/guides/ajax-request-session-timeout-redirect-guide)；WCAG 2.2.5（AAA）：重认证后进行中数据不丢 [W3C](https://www.w3.org/WAI/WCAG21/Understanding/re-authenticating.html)。
- **pitfalls**：登录后一律扔回首页/仪表盘；表单状态随路由卸载蒸发；把「主动登出」与「过期」混用同一恢复逻辑。

> **独立家族**：Consent gates（条款 / 隐私 / 营销同意）带独立法律语义，不参与本光谱选型——见 `consent-gate.md`。

## Best-in-class practice

每个 pattern 一到三条可被引用的顶级产品行为；无法证实的行为不列（槽位留空 = 保守默认）。

- **Unsaved changes（L3 在用范式）**：Notion——自动保存，活跃编辑时每 10 分钟记录一个版本、最后一次编辑后 2 分钟再记一版，历史版本可随时查看与恢复 [Notion](https://www.notion.com/help/duplicate-delete-and-restore-content)——用 autosave 让「未保存丢失」在结构上罕见，把失败点退化为「恢复历史版本」。
- **Missing prerequisite**：Stripe——Stripe.js Elements 在输入处即时校验并给出具体可执行的文案（如 `Your card number is incomplete.`），错误就发生在字段本身，随 `change` 事件实时更新 [Stripe.js](https://docs.stripe.com/js/element/events/on_change?type=cardElement)。
- **Permission request**：Apple——仅在功能真正需要时请求权限、避免启动时索取（除非权限是产品运行前提），purpose string 须一句写清用途与实例 [Apple HIG Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy/)；Google——incremental authorization：按功能增量请求 scope，拒绝后禁用对应功能，仅在用户再次明确表达意图后才可重问 [Google Best Practices](https://developers.google.com/identity/protocols/oauth2/resources/best-practices)。
- **Session expiry**：GitHub——sudo mode：敏感动作前在原上下文要求重新认证（密码 / passkey / 2FA），认证后继续执行该动作，而非扔回首页 [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode)。

## 边界与 Anti-patterns

- **伪 L3（silent auto-fix）≠ 完成式（PACK DOCTRINE）**：用户可能故意不保存、故意保持某状态——把全部合理决策摆出来才是对的。静默自动处置只用于安全、明确、可逆的场景，且必须报告 + 可撤销；否则就是伪 L3。
- **高风险不可逆动作不适用本光谱**：删除、支付、批量覆盖按确认框规范处理——具体后果、无默认 Yes、超危险动作加非标准确认、优先提供 undo [NN/g 2018](https://www.nngroup.com/articles/confirmation-dialog/)。
- **警告疲劳**：警告太频繁会训练出「自动点掉」的肌肉记忆 [NN/g 2018](https://www.nngroup.com/articles/confirmation-dialog/)；同一失败点反复打扰用户（尤其已被拒绝后反复重问）同样不可接受。
- **WCAG 3.3.3 的安全例外**：密码、安全答案等场景「给出纠正建议」会危及安全——此时只给通用指引（如 Forgot password）。这是标准允许的豁免：可执行性分级让位于安全，不是偷懒 [W3C](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html)。

## 实现参考

文案模板（动词贴近原动作；sonner 风格示意）：

```ts
// L2：消息自带修复，修完续跑
toast.error("无法发布：缺少封面图", {
  description: "选一张封面图即可继续发布。",
  action: {
    label: "选择封面图",
    onClick: async () => {
      const cover = await pickCoverImage() // 系统顺手修：修复动作就在消息里
      if (cover) resumeInterruptedAction() // 续跑：重放被拦的 Publish
    },
  },
  cancel: { label: "取消" }, // 纯关闭，不做任何修复
})

// L3：系统已安全修完，报告 + 可撤销
toast.success("检测到未保存修改，已自动保存为草稿", {
  action: { label: "撤销", onClick: () => undoAutosave() },
})
```

语义要点：action 回调先完成修复、再续跑原意图；cancel 只关闭、不产生任何副作用。L3 的自动处置必须可撤销——报告与 undo 缺一不可。

Do / Don't：

| Do | Don't |
|---|---|
| 每条消息先过光谱分级，能安全到 L2 就不留 L0/L1 | 能带修复按钮却只读播报、只指路 |
| ship 安全允许的最高等级（elevation rule） | 把「自动修」用在模糊或不可逆事项上（伪 L3） |
| L2 按钮 = 修复 + 续跑原意图 | detect + complain：报信后让用户自己找路 |
| L3 报告系统做了什么 + 提供 undo | 静默改状态不报告，或修完不给撤销 |
| 模糊/不可逆场景给完整决策集（Stay / Discard & Leave / Save & Leave） | 用 OK/Cancel 掩盖后果，或默认 Yes |
| 密码等安全场景按 WCAG 3.3.3 豁免，只给通用指引 | 为凑「可执行」泄露安全答案 |
| 会话过期恢复原路径与进行中数据 | Session 过期后扔回首页清空状态 |
| 高风险不可逆动作走独立确认 / undo 规范 | 警告太频繁，训练用户自动点掉 |

## QA checklist

- [ ] 扫描每条消息先问：「这条消息是只读的还是可执行的？系统能顺手修吗？修完能续跑吗？」
- [ ] 分级达标：不存在「L2 可能却 ship L1/L0」的消息；L0 仅用于纯 FYI。
- [ ] 每条 toast / alert / modal 通过两问测试：发生了什么 + 此刻能做什么。
- [ ] L2 恢复动作就在提示里且可键盘触达（近且大，Fitts）；修后续跑原意图（提交 / 导航 / 继续 wizard）。
- [ ] L3 仅用于安全 + 明确 + 可逆场景，报告已做的事并提供 undo；无静默自动处置。
- [ ] 模糊/不可逆事项给完整决策集：标签写后果、无默认 Yes。
- [ ] WCAG：3.3.1 错误可识别；3.3.3 已知建议已提供（或确有安全豁免）；2.2.5 重认证后进行中数据不丢。
- [ ] 高风险不可逆动作未走本光谱，而是走了独立确认 / undo 规范。
