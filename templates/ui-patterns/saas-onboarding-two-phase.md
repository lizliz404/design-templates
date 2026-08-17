---
name: saas-onboarding-two-phase
description: >-
  B2B/SaaS activation craft: Onboarding (zero-effort aha + personalization) then
  Setup (production usage). Distilled from Chatbase/Yasser public notes (2026-08)
  and activation patterns. Use for chuhai-cloud / SaaS matrix, not decorative wizards.
---

# SaaS onboarding · 两段式激活

类型：Product craft（激活 / 付费路径；非视觉 DESIGN.md）

| | |
|---|---|
| **What** | 把「注册后空白 Dashboard」拆成两段：**Onboarding**（最快 aha + 个性化）→ **Setup**（推到真实生产用量）。 |
| **Why** | 用户在 aha 前看到的配置表单都是税。先让他感到「这是为我做的、已经有用」，再教他接真数据/真渠道。 |
| **Who** | B2B SaaS、agent 产品、需要域名/站点/工作区上下文的工具（出海云矩阵同类）。 |
| **How to use** | 写 PRD/IA 激活节时对照 §1–§4；实现向导时用 §5 清单；埋点用 §6。与 [`../ia-user-journey.md`](../ia-user-journey.md) 的「调度页 / 主链」兼容：Onboarding 可以在主链外，Setup 必须接回主链对象。 |
| **Not this** | 不是 12 步企业实施问卷；不是把付费墙当第一屏；不是 empty state 文案大全（见 craft checklist §13）。 |
| **Source** | [Yasser / Chatbase — onboarding vs setup](https://x.com/yasser_elsaid_/status/2088279151383830570)（2026-08）。机制提炼。 |

---

## 1. 两段，不要混成一段「大向导」

| 阶段 | 用户问题 | 成功长什么样 | 禁止 |
|---|---|---|---|
| **A · Onboarding** | 这东西是啥？跟我有关吗？立刻有用吗？ | **Aha**：零或近零集成，几分钟内摸到「为自己准备的」可用结果 | 先填 20 字段；先接 webhook；先强制 demo call |
| **B · Setup** | 怎么变成我日常真在用的？ | **Usage**：至少一个生产通道/主链对象真正跑起来 | 停在「配置完成」勾选却从未产生用量 |

口令：

```text
Onboarding = 最好版本的产品，用最小努力送上门
Setup      = 从「能玩」推到「在生产里用」
```

---

## 2. Onboarding 四件套（按序）

### 2.1 零努力先出货

- 默认路径：**不接**第三方也能看到完整主交互（示例工作区 / 预爬公开页 / 预填 demo 对象）。
- 账号：能后台静默创建就静默；验证码/邮箱确认若非反滥用刚需，后移。
- 计时目标：冷到 aha **≤ 60–120s**（产品复杂可放宽，但要写进成功信号，禁止「随缘」）。

### 2.2 个性化（「像为我做的」）

最高杠杆输入常常是 **网站 URL / 公司域名 / 已有店铺或广告账户**（按产品换）：

1. 用户给出标识（或 oauth 带出）  
2. 系统短分析（行业、用语、公开页）+ **诚实的劳动幻觉文案**（checklist §3）  
3. UI 立刻换上：相关集成 logo、同行社会证明、预填 starter prompts / 示例问题、品牌色若可安全抽取  

失败降级：分析挂了 → 仍给通用但**完整**的 demo，不堵在错误页。

### 2.3 先演示升级价值，再锁门

- 在 aha **之中或紧后**展示 Pro 能力如何工作（voice、多源、自动化、座席…），让人「想要」而不是「撞墙」。
- Paywall 文案 = 后果（checklist §12），不是「Upgrade to unlock mystery」。
- 试用时钟：优先 **看到价值后**再开始，而不是 signup 瞬间空转。

### 2.4 把情绪接到 Setup

Aha 屏只做一件事：一个主 CTA → Setup 第一步（「部署到站点 / 导入真实数据 / 接第一个渠道」）。  
禁止 aha 后丢进无主链的「探索全部功能」迷宫。

---

## 3. Setup 三件套

1. **主链对象优先**：只引导 IA 主链上的下一环（见 ia-user-journey G2），不铺全产品地图。  
2. **一次一个生产里程碑**：例如「agent 上线到一个 channel」「第一条 lead 进 CRM」「第一张刀模导出」。  
3. **庆祝要克制但明确**（checklist §9）：「已在生产运行」+ 下一步用量钩子（看分析 / 邀同事 / 加第二数据源）。

---

## 4. 信息架构闸（和 IA 文档对齐）

写进 `docs/IA.md` 激活节，勿只写在 Figma：

```text
Aha 定义（一句话 + 可测事件）:
Onboarding 入口输入:
Onboarding 禁止要求的集成:
Setup 生产里程碑（必须产生 usage）:
付费教育点（在 aha 哪一步露出）:
失败降级:
```

硬闸：

- 没有 **可测 aha 事件** → 不准开工做向导 UI。  
- Setup 里程碑若可用「点完配置」冒充 → 重写里程碑为 **usage**。  
- 同一对象多个门（注册向导一套、设置页又一套互不同步）→ 违反 IA G4。

---

## 5. UI / 文案清单（实现时勾）

**Onboarding**

- [ ] 第一屏一个主输入或一个 oauth，次要选项折叠  
- [ ] 分析中：阶段事实文案，假 99% 进度条禁用  
- [ ] Demo 结果可点击、可追问、可看见来源/依据（AI 类强制，checklist §35）  
- [ ] 个性化块（logo/集成/prompt）至少 1 类可见；全失败仍有完整 demo  
- [ ] 升级预览可点可感，不是灰掉的菜单名  
- [ ] 主 CTA 只指向 Setup 第一步  

**Setup**

- [ ] 步骤 ≤ 5 屏可见；其余 progressive disclosure  
- [ ] 每步结束有「已完成/未完成」与阻塞原因  
- [ ] 生产里程碑达成有状态落库 + 产品内可见  
- [ ] 可跳过非阻塞项，但跳过项在调度页继续催  

**通用**

- [ ] 错误 = 发生了什么 + 下一步（checklist §11）  
- [ ] 破坏性/计费动作强确认；其余可撤销优先  
- [ ] `prefers-reduced-motion`；移动端主 CTA 拇指区可达  

---

## 6. 埋点（只留能改下周优先级的）

建议 5 事件（checklist §28 精神）：

| 事件 | 为何能改决策 |
|---|---|
| `onboarding_started` | 入口是否漏 |
| `aha_reached` | 核心定义是否测得到 |
| `paywall_preview_seen` / `checkout_started` | 教育是否过早/过晚 |
| `setup_milestone_reached` | 是否卡在配置假完成 |
| `production_usage_d1` / `d7` | 是否真激活 |

虚荣：页面 PV、向导「完成率」若不含 aha/usage，下周不要用它排期。

---

## 7. 反模式

- 注册完 = 空白 Dashboard + 「邀请队友」自嗨  
- 把企业采购问卷当 onboarding  
- 未 aha 先强制信用卡  
- 个性化失败整页死锁  
- Setup 10 步平行无主次  
- 用「配置完成 %」代替 usage  
- A/B 都不动 aha 定义，只改按钮颜色  

---

## 8. 开火路径

**今天下午：**

1. 用一句话写下 aha + 一个生产里程碑。  
2. 画 Onboarding 三屏（输入 → 劳动幻觉 → 可玩结果+CTA）。  
3. Setup 只留里程碑前的最小步。  
4. 埋 `aha_reached` 与 `setup_milestone_reached`。  
5. 找一个外人走通；卡点写回 IA，不先加功能。

**对参产品**：Chatbase 公开描述的 website → personalized agent → setup/deploy 逻辑；迁移到本地产品时替换「网站」为你们的标识（店铺 URL、广告账户、CSV、域名）。

相关：[`../high-leverage-craft-checklist.md`](../high-leverage-craft-checklist.md) §3 · §8 · §9 · §13 · §28 · §34–35；[`../ia-user-journey.md`](../ia-user-journey.md) G1–G4。
