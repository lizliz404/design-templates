---
name: chrome-controls-placement
description: >-
  Header control placement taxonomy: global high-frequency state switchers
  (theme, locale, night mode) must be one-click icon controls directly in the
  header; low-frequency page entries (about, settings) and external links
  (GitHub) belong in an overflow menu or as direct icon links. Use when
  designing headers/nav/settings placement, or auditing a "uniform dropdown"
  that swallowed controls of different interaction patterns.
---

# Chrome 控件分置（Header 控件交互模式合同）

核心判定：**按交互模式和频率分置，不按"都是配置"归类。**

## 三类控件，三种形态

| 类 | 判定 | 形态 | 例子 |
|---|---|---|---|
| **状态切换器** | 全局、高频、可逆、即时生效 | Header 直接可见的 icon switcher / 紧凑 toggle，**一键完成，无菜单** | Theme Light/Dark、中英切换、夜班模式 |
| **入口** | 低频、进页面 | 溢出菜单（More）里的 menu item | About、设置、帮助 |
| **外链** | 离开产品 | icon 链接直接暴露在 Header（外向身份如 GitHub 常这样），或进溢出 | GitHub、文档站、状态页 |

## 硬闸

1. 高频状态切换禁止藏进任何 menu。藏进 menu = 一次点击变两次（开菜单 → 点项），高频操作付两倍税。
2. 一个 menu 里禁止混装不同 interaction pattern（状态切换 × 页面入口 × 外链）。**menu 只收"入口"**。
3. 状态切换器必须即时生效 + 状态可见：当前态一眼可辨（icon 即状态：sun/moon；或 aria-checked/pressed）。
4. 切换器双态互斥、图标即语义；无需文字标签也能懂（icon-only pill 见 lang-switcher 参照）。
5. "统一入口"不是美德：把所有东西平铺进一个 dropdown 是机械配置堆叠，不是信息架构。真实产品的交互习惯是**把最高频的一步操作放在离用户最近的位置**。

## 反模式

- Theme / Locale / About / GitHub 全当一个 menu item 平铺进同一个 dropdown（把三类控件混成一类）
- 状态切换做成"进二级面板再选"（点击成本翻倍）
- 切换后需要刷新才生效
- icon 无状态——看不出当前是 Light 还是 Dark、zh 还是 en
- 为了顶栏"干净"牺牲高频操作的可达性；过度整洁也是一种藏

## 参照组件

状态切换器形态：[`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)（icon-only pill，即本合同的 locale switcher 落地形态）。

## 产地

2026-09-06，Liz 对 orgbrain 顶栏的审计裁定：原实现把 Theme/Locale/About/GitHub 全塞一个 dropdown，判"把完全不同的 interaction pattern 混在一起"。此文件是该裁定的合同化。
