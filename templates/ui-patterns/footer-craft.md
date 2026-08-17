---
name: footer-craft
description: >-
  Long-landing / marketing footer grammar (structure, hierarchy, density).
  Distilled from patterns common on footer.design and shipped Liz landings.
  Not a component library dump.
---

# Footer craft

类型：UI micro-pattern（营销长页收口；非 app shell 状态栏）

| | |
|---|---|
| **What** | 网站页脚的信息架构与视觉语法：栏目、密度、法律区、最后一击 CTA。 |
| **Why** | 长 landing 常「英雄区花一天、页脚五分钟」——用户滑到底要的是确认（公司是否真实、还能去哪、怎么联系），不是再看一遍渐变。 |
| **Who** | SaaS / 服务 / 个人品牌营销页。App 登录后 shell **不要**套这套巨型 footer。 |
| **How to use** | 写 landing 最后一节前读 §2 选型；实现时过 §4 验收。灵感扫描：[footer.design](https://footer.design/)（只学结构，禁止整站 mirror）。 |
| **Not this** | 不是链接 Dump；不是第二套完整导航（与顶栏抢 IA）；不是把 sitemap 当内容策略。 |

---

## 1. 页脚在闭环里干什么

用户滑到底时，页脚只回答：

1. **还能去哪**（产品/资源/公司，≤ 合理扫描量）  
2. **你是谁**（名称、一句定位、地区/合规若需要）  
3. **怎么信/怎么联**（邮件、社交、法律、状态页）  
4. 可选：**最后一次转化**（newsletter / 次级 CTA）——且不得压过页内主 CTA 的记忆

---

## 2. 五种常用骨架（选 1）

| 型 | 结构 | 适用 |
|---|---|---|
| **A · Mega 4–5 栏** | 品牌列 + 3–4 链接列 + 底条法律 | 多产品 SaaS、文档多 |
| **B · Compact 3 栏** | 品牌 · 产品 · 公司/法律 | 单产品 landing（默认首选） |
| **C · Brand strip** | 大 wordmark / 一句 claim + 稀疏链接 + 法律 | 个人站、强编辑品牌 |
| **D · CTA band + slim** | 上：终局 CTA 横条；下：slim 链接法律 | 转化向 one-pager |
| **E · Minimal legal** | 一行 © + 隐私/条款 + 语言 | 工具登录周边、极简实验页 |

**Liz 默认：** 营销长页用 **B 或 D**；个人站用 **C**；后台 app 用 **E 或不要 footer**。

---

## 3. 语法规则

### 3.1 信息

- 链接列标题：产品语言，**不是**库表名（IA 纪律）。  
- 每列链接 **4–8** 条；超过就进「更多」或删。  
- 顶栏已有的主 CTA 链路，页脚可重复 **一次** 文本链，不要再放一个同色大按钮并排打架（D 型 CTA band 除外，且视觉降一级或换次级样式）。  
- 法律三件套常驻底条：`Privacy` · `Terms` ·（可选）`Security` / `Status`。  
- 社交图标 ≤ 4；多余进 About。  
- 语言切换：与站内同一 Iconify Language 控件语义，勿国旗阵。

### 3.2 视觉

- 背景：比 page 略深/略沉一档，或同色 + 上沿 hairline；**禁止**突兀彩虹块（除非品牌系统写死）。  
- 类型：链接 13–14px；列标题 11–12px uppercase 或 medium；法律 12px `ink-3`。  
- 间距：栏间距 > 链接行距；底条与主区用 24–40px 分隔。  
- 移动端：栏 **叠成手风琴或简单竖堆**，不要四列挤成 9px。  
- 对比度：法律灰不能死在深底上（AA）。

### 3.3 内容气质

- 品牌列：一字 mark 或 wordmark + **一行**定位（≤ 12 词）+ 可选邮件。  
- 不要页脚小说、不要再塞客户 logo 墙（那是正文 social proof 的活）。  
- Newsletter：单字段 + 明确价值一句；成功态用 checklist §9 克制庆祝。

---

## 4. 验收

- [ ] 选型属于 §2 之一，并在 DESIGN/页面注释写明 A–E  
- [ ] 桌面 1440 + 窄 390 截图：无溢出、无 4 列挤压  
- [ ] 法律链可点；© 年份正确  
- [ ] 与顶栏导航无第三套互斥命名  
- [ ] App 内页未误贴 Mega footer  
- [ ] 若有 CTA band：主色不超过正文主 CTA 的视觉噪声  

---

## 5. 反模式

- 页脚比正文还长的 sitemap  
- 死链、Coming soon 堆砌  
- 每个社交平台都给一枚（含已停用）  
- 深色模式法律字不可读  
- 用 footer 补顶栏没想清的 IA  

---

## 6. 开火路径

1. 选 B 或 D。  
2. 品牌列写一句定位 + support 邮件。  
3. 两列链接：Product · Company（各 ≤6）。  
4. 底条法律 + ©。  
5. 390 宽截一屏验收。  

对参浏览： [footer.design](https://footer.design/) 只看栏数与密度；落地页模板可挂在 `design/lead-radar` / `premium-one-pager` 长页末。
