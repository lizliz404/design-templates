---
name: i18n-translation-survival
description: >-
  Rules for interfaces that survive translation: writing-system atoms,
  line-break duty, hierarchy channels, RTL mirroring, IME cost, and voice
  handling. Use when a page or app ships in more than one language, when
  translated text overflows or flattens, or when CJK and Latin layouts
  diverge. Component-level switcher: i18n-iconify-lang-switcher.md.
---

# i18n 翻译存活规则

让页面被翻译后照常工作。规则级手册；语言切换器组件走 [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)。来源：[Rene Wang, Build Interfaces That Survive Translation](https://rene.wang/essay/build-interfaces-that-survive-translation)（2026-08，免费公开；只蒸馏规则、不 vendor 全文与 demo）。

底层事实一行：每种书写系统有自己的 atom——英文的 atom 是词（变长、不可断），CJK 是字符（等宽）；`min-content` 是观察工具。英文设计系统一半的宽度规则，是在给书写系统打补丁。

## 流程（多语言上线前走一遍）

```text
1. 每个元素标 lang；根上挂 dir="rtl" 跑一轮，站错边的都是 position 不是 relationship
2. min-content 检查每处 label：撑住它的 width 之外还有第二条路（换行 / 长高）
3. 容器最小宽度用视觉单位（ic），不用 ch / ex / 字符数
4. 换行优先于截断：label 想占几行占几行，row / list / pane 长高容纳；CJK 在 Intl.Segmenter 分词缝上断
5. 建层级只用内容语言拥有的通道（拉丁 case / italic / weight / small caps / letterspacing；CJK 只有 weight），缺的用 color + enclosure 补
6. CJK 字号 >= 12px
7. 输入：Enter 监听让位 IME 选词键；限长按显示单位；空格保持原样
8. 字符串二分：Functional 照规则翻译；voice 字符串交给 writer 重写；最响的字符串做 round-trip（英→中→英），变平的退回重写
```

## 机制依据（按需查）

- **Atom**：min-content 下英文压不窄于最长单词，中文压到一个字宽；hard-coded width 成为唯一支撑即事故。
- **换行双职责**：拉丁语空格免费守护语义，只需管比例；CJK 视觉与词典两半都归自己。`text-wrap: pretty` 只解决视觉半边（stubby last line）。
- **密度账**：17 种语言口语信息率收敛于 ~39 bits/s（Coupé 2019, Science Advances）——密度买到的是面积不是时间；优势只在 chrome（tab bar / 表头），正文打平；压缩和容错是同一个旋钮。
- **镜像**：镜像 back 箭头 / 进度条 / slider / 步骤流（逻辑属性写的自动镜像）；时钟 / 播放控件 / 对勾 / 数字保持原向——RTL run 内数字仍 LTR，光标 / 选区 / 索引悄悄失效。中英文在这条轴同侧：方向是双方共享的盲区。
- **单位泄漏**：`ch` / `ex` / 字符串长度 / 排序 / `toUpperCase()` / 搜索分词——每个抽象都在泄漏源语言。
- **IME**：中文 6 键 + 1 选 = 一个菜单，视线离开句子去候选；Enter 发送截走选词键；空格转 `-` 打断拼音；command palette 别假设拉丁。
- **Voice**：register / idiom / rhythm 不可翻译——"Oops." "Nice." "You're all set." 的人格超过整个 design system；三词标题的 punchy 来自它是三个词。声音越强翻译越糟，平的功能性界面 round-trip 最好。display face 多无 CJK cut（Inter 也是），译文吃系统字重。
- **收尾清醒**：语言不塑造产品，商业才塑造；语言容错负责消掉「this product was not built for me」的那一刻，仅此而已。
