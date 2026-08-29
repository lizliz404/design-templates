---
name: consent-gate
description: >-
  Consent gates (terms / privacy / marketing) as a concrete application of the
  recover-at-point-of-failure doctrine: three strategies (bind-to-CTA, visible
  checkbox with recovery-carrying confirm, independent explicit consent),
  selection axes (consent object, severity & reversibility, prior consent
  state with version memory), the re-consent-on-version-bump rule, and the
  compressed legal boundary note.
---

# Consent Gate — 条款 / 隐私 / 营销同意门槛

> 本文是 `recover-at-point-of-failure` 准则在 consent 场景的具体化：提交被「未同意」拦截是可恢复失败，恢复动作（同意）直接可点、同意即续跑（resolve + resume）；但同意动作自带法律语义（有效性、可举证性），策略选型不套用 L0–L3 光谱，而按下面三个抽象轴——「携带修复」在这里表现为「同意动作与原 CTA 合并」。

## 三种策略（平列，无预设赢家）

### S1 — bind-to-CTA（点击主 CTA 即接受）

```text
By continuing, you agree to our Terms of Service
and acknowledge our Privacy Policy.

        [ Continue ]
```

- 措辞拆开：ToS 用 **agree to**（合同接受），Privacy 用 **acknowledge / read**（披露确认）——两者法律性质不同。
- 适用条件：仅合同条款类同意；通知显著（同意声明紧邻按钮、字号不过小、无干扰元素堆叠）；后果轻且可逆。
- 风险：点击即同意的效力是**设计依赖**的——通知不显著、被大按钮淹没、未说明什么动作构成同意，会削弱甚至推翻同意（见「法律边界注」）。
- Best-in-class：TikTok 注册页长期使用该形态：「By continuing, you agree to TikTok's Terms of Service and confirm that you have read TikTok's Privacy Policy.」，无 checkbox（2025-09 至 2026-07 存档一致）[tiktok.com/signup](https://www.tiktok.com/signup/?lang=en) / [存档](https://archive.ph/kXnRR)。

### S2 — 可见 checkbox + 携带恢复的确认

```text
☐ 我已阅读并同意《用户协议》与《隐私政策》

        [ 登 录 ]
```

未勾选被拦时（resolve + resume，绝不「弹窗 → 用户找框 → 勾 → 回来再点」）：

```text
继续前需同意服务条款与隐私政策。

[取消]            [同意并登录]   ← 这一次点击本身就是 consent act
```

- `同意并登录` 的语义是「我同意并继续」，不是「关闭弹窗后系统替你勾」——恢复点击即同意动作。
- 适用条件：需要显式、可录屏 / 可举证同意动作的场景——注册与登录合一的页面、平台审核需展示 grant 流程、或产品对同意姿态偏保守。
- 风险：多一步交互成本；checkbox 一旦展示就必须真实闸住提交——摆了不勾也能通过的框，比不摆更糟。

### S3 — 独立显式同意（营销 / 敏感 / 第三方 / 跨境）

- 每项独立、可分别拒绝、无预勾选、无默认；任何恢复路径不得代勾（见「法律边界注」）。
- 用户未勾营销项就点 Continue → 不能弹「OK 自动帮你勾」：「OK 到底是关闭弹窗还是同意营销」语义不明确，显式同意不成立。
- 正确形态：分项勾选或独立弹窗 / 独立屏幕，并保留同意证据。
- Best-in-class：Apple ATT——追踪类同意是独立系统级弹窗，`Allow` / `Ask App Not to Track` 两选项、无预勾选，拒绝后「仍可使用 App 的全部功能」，且可随时撤回 [Apple Support](https://support.apple.com/en-euro/102420)；Google OAuth granular permission screen——请求多个非登录 scope 时用户逐项选择授权哪些，应用必须检查实际授予的 scope 并禁用未授权功能 [Google](https://developers.google.com/identity/protocols/oauth2/resources/granular-permissions)。

## 选型三轴

### 轴 1 — 同意对象（consent object）

- **合同条款（ToS / 用户协议）**：接受一份契约，约束双方权利义务；用户预期内，通常无独立数据后果。
- **一般数据处理**：为提供服务所必需的个人信息处理；用户知道「用它就要给这些」，但期望被明确告知处理内容。
- **增强 / 敏感用途**：营销邮件、向第三方提供、公开传播、跨境共享等——超出「用这个产品所必需」的预期，不可逆外部性高。
- 对象越偏离必需，越需要独立、显式、可分别拒绝的同意动作；增强类与合同条款永远不能捆成一次一揽子接受。

### 轴 2 — 后果严重度与可逆性（severity & reversibility）

- 可逆（可退订、可撤回授权、可删除）→ 轻量呈现（S1 或 S2）在用户预期之内。
- 不可逆或高外部性（数据已给第三方、已公开、已跨境）→ 必须独立显式动作（S3），且不得由任何恢复路径代劳。
- 严重度取决于「用户不知情时的损害」：损害越隐蔽、越难被用户察觉，越不允许静默收集或默认勾选。

### 轴 3 — 既有同意状态（prior consent state）

- 首次创建账户：同意采集点，三策略皆可入选，按轴 1/2 决定。
- 登录回访、条款同版本：不重问——重复询问训练 consent fatigue。
- 条款升版或用途变更：这才是 re-consent 时刻（见「条款升版与版本记忆」）。

### 选择条件表

| 条件 | 指向 |
|---|---|
| 仅合同条款，通知显著，后果轻且可逆 | S1（省交互成本）或 S2 |
| 一般数据处理，登录页即注册页 | S2（显式动作更可举证） |
| 营销 / 第三方 / 敏感 / 跨境等增强用途 | S3，独立显式，任何情况下都不许代勾 |
| 平台审核要求录屏展示 grant 流程 | S2/S3 显式呈现，保证可录屏 |
| 同版本条款的回访登录 | 版本记忆（见下），不重问 |
| 条款升版 / 用途变更 | re-consent 时刻，S2 的「同意并继续」回归 |

## 条款升版与版本记忆（re-consent 规则）

`localStorage: terms_version`：同版本回访不重问；**升版**才是 re-consent 时刻——此时 S2 的「同意并继续」回归，一次点击续跑。用途变更前重新取得同意，也是主要平台政策的共同要求 [Google User Data Policy](https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification)。

## 法律边界注

- 受监管的同意类用途（营销邮件、数据共享、各法域定义的单独同意触发项）在所有主要辖区都要求明确肯定动作：沉默、预勾选、不作为、「仅继续使用服务」（proceeding ≠ consent）都不构成同意 [ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/what-is-valid-consent/) / [EDPB 05/2020](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf)；任何恢复路径**绝不能 auto-check** 这些项。
- bind-to-CTA（sign-in wrap）对合同条款的可执行性是**设计依赖**的：通知显著性与上下文决定成败 [Proskauer 2026](https://newmedialaw.proskauer.com/2026/07/23/online-contract-formation-turns-on-design-and-context-lessons-from-recent-circuit-court-decisions/)。
- 发布前核对你所在市场的具体条文；拿不准就问法务。本注仅为设计参考，不构成法律意见。

## 实现参考

文案模板（sonner 风格示意）：

```ts
toast.error("需要先同意服务条款", {
  description: "《用户协议》与《隐私政策》确认后才能继续。",
  action: {
    label: "同意并继续",
    onClick: () => {
      saveConsentRecord({ termsVersion: TERMS_VERSION, at: Date.now() })
      resumeInterruptedAction() // 重放被拦的提交/导航
    },
  },
  cancel: { label: "取消" }, // 纯关闭，不产生任何同意
})
```

语义要点：action 回调先写入可举证的 consent record（含条款版本与时间），再重放原动作；cancel 只关闭。同意证据可举证是各隐私制度对有效同意的共同要求 [ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/what-is-valid-consent/)。

Do / Don't：

| Do | Don't |
|---|---|
| 按对象敏感度、后果可逆性与既有状态选 S1/S2/S3 | 不看同意对象与后果，一刀切绑 CTA 或一刀切加框 |
| 营销/敏感项独立、显式、无默认、可分别拒绝 | 用 recovery 确认代勾营销/敏感/第三方项 |
| 条款版本记忆，升版才 re-consent | 每次登录重问已同意条款，或永不升版重问 |
| checkbox 一旦展示就真实闸住提交 | 展示勾选框但跳过它也能提交 |
| 补救按钮本身就是 consent act（同意并登录） | OK 关弹窗后再偷偷勾选 |
