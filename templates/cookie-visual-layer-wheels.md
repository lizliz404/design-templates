---
name: cookie-visual-layer-wheels
description: >-
  Cookie 视觉层轮子验真：icon / 浮钮 / 小动效皮肤，可叠在任意 consent 闸门上，
  不替换 CMP。Use when 需要饼干 icon、偏好浮钮、cookie 皮肤动效，或要把视觉层
  与 vanilla-cookieconsent 等闸门解耦; 不要用在 CMP / Cookie Consent 选型，
  也不要把 playful 仓鼠整卡当严肃站皮肤。
---

# Cookie 视觉层轮子验真

一行定位：**饼干 icon / 浮钮 / 小动效**的可抄皮肤层，挂在任意 consent 闸门的「打开偏好」入口上。

正交拆层（别混读）：

- 法律 / 策略闸门 → [`ui-patterns/consent-gate.md`](./ui-patterns/consent-gate.md)
- Playful 整卡仓鼠（同意即投喂，to-B 慎用）→ [`ui-patterns/hamster-cookie-consent.md`](./ui-patterns/hamster-cookie-consent.md)
- 本资产 = 视觉层皮肤；**不**换 CMP、**不**改同意语义

Axeptio 饼干角色库只作审美参考；整包脚本不可当独立皮肤资产。

## 流程（何时跑、按序做什么、终点怎么判）

1. 确认缺的是皮肤，不是闸门：CMP / 策略已定（或走 consent-gate），只需「看得见的饼干入口」。
2. 按选型阶梯取件（§机制 · 选型阶梯）：严肃 B2B 默认线稿 SVG；稍暖才抄咬口浮钮；先别上 Crumb / Chocolate 大插画卡 / Axeptio 话术。
3. 挂接点：按钮 `onClick` → `CookieConsent.showPreferences()`（或项目等价 API）。闸门库与同意存储不动。
4. 动效上限：先 `hover:scale` + 轻旋；不够再塞 Lottie 文件。Rive 现货少，像素动效优先 Lottie。
5. 终点 = 偏好面板能从皮肤入口打开 + reduced-motion 可降级 + 未因皮肤新装整 CMP。`npm install` 成功不算。

## 机制依据（按需查的平铺规则）

### 两层拆开

| 层 | 职责 | 本包去哪 |
|---|---|---|
| CMP / 闸门 | 同意类别、存储、法律文案、`showPreferences` | consent-gate；CFE 现用 `vanilla-cookieconsent@3.1.0` + `consent.ts` |
| 视觉层 | icon / 浮钮 / 插画 / 微动效 | **本文**；仓鼠整卡另走 hamster（整卡玩法，不是皮肤） |

挂接点唯一：视觉控件触发闸门已有 API，不自建第二份 cookie 存储。

### 验真表（压缩）

| 资产 | 判定 | 许可 / 出处 | 取用 |
|---|---|---|---|
| Lucide `cookie` / Phosphor cookie / Tabler cookie | ✅ 严肃 B2B 首选 | ISC / MIT，`currentColor` | 线稿 SVG 直接挂偏好入口 |
| [FloatingCookieButton.tsx](https://github.com/cookiekit-io/react-cookie-manager/blob/main/src/components/FloatingCookieButton.tsx) | ✅ 咬口浮钮可抄 | MIT | **只抄** SVG + 浮钮组件，不装它的 CMP |
| Game Icons cookie | 可选角标 | CC BY 3.0（需署名） | 角标 / 装饰，非默认 chrome |
| Streamline cookie | 可选插画 | 商业库条款 | 抽插画，不引整库 |
| [Hairline cookie-banner](https://hairlineui.com/ui/cookie-consent) / Crumb | 只偷 UI | 组件站 | 折角标 / 帧条；关自带存储 |
| [Chocolate UI Cookie Banner](https://chocolateui.com/blocks/cookie-banner) | 只偷插画 | 商业库 | 8 插画可抽；整卡偏玩，不当严肃壳 |
| [LottieFiles cookies](https://lottiefiles.com/free-animations/cookies) | 可选动效 | 各文件自带许可 | 几 KB 扭转曲奇；L1 再塞 |
| [Lordicon 2354-cookies](https://lordicon.com/icons/wired/flat/2354-cookies) | 可选动效 | PRO | hover 更专业；有预算再上 |
| Axeptio 饼干角色库 | 参照不可拆 | SaaS 整包 | 审美参考；不进依赖 |
| Rive cookie 现货 | 现货少 | — | 像素动效优先 Lottie |

### 选型阶梯

1. **严肃 B2B** → Lucide / Phosphor / Tabler 线稿。
2. **稍暖仍克制** → 抄 FloatingCookieButton 的咬口 SVG + fixed 圆钮。
3. **先别上** → Crumb 整卡、Axeptio 话术角色、Chocolate 大插画同意卡、hamster 仓鼠面板。

### CFE 落点（消费示例，非强制）

现有 `vanilla-cookieconsent@3.1.0` + `consent.ts` **不动**。页脚「Cookie preferences」旁，或右下角 `fixed` 圆钮 → `showPreferences()`。动效最多 hover scale + 轻旋；再要再塞 Lottie。

### 抄 / 装阶梯

- **L0** 抄 SVG / 浮钮源码进项目，改成自有 token。
- **L1** 塞单个 Lottie 文件（或 PRO Lordicon），不换闸门。
- **L2** 不因皮肤装整 CMP（含 react-cookie-manager 全家桶）。
- **L3** 全家桶皮肤 / SaaS（Axeptio 等）不当运行时依赖。

## 边界（硬性 guardrail，正面措辞）

- 视觉层只打开偏好；同意类别、默认值、存储与法律文案留在闸门资产与项目 `consent.ts`。
- 皮肤入口必须可键盘到达；icon 旁保留可读标签或 `aria-label`（「Cookie preferences」），不把曲奇插画当唯一提示。
- `prefers-reduced-motion: reduce` 时取消旋转 / Lottie，保留静止 icon 与点击。
- playful 整卡（仓鼠、Chocolate 大插画同意卡）走 hamster 或演示实验；严肃 / 受监管 / to-B 站只用线稿或克制浮钮。
- 不在同一视图叠第二套讨好型 cookie 角色；不把 Axeptio 脚本拆出来当「开源皮肤」。
