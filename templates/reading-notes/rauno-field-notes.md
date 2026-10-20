# Rauno field notes #3–#5 要点

来源：Rauno Freiberg（Vercel 设计工程）的 field notes，图 / 视频为主，以下转述文字里可迁移的机制。抓取 2026-10-20。

## [#3 · History of Software Design 海报](https://rauno.me/notes/3)
- 没想法时先在非常规版式里摆字，看「文字的形状」。
- 选 Arial 这类系统字体，向软件史致敬本身就是概念。
- 蓝色压字对比差 → 换黄；画不好就找参考图再画。
- 陷入瓶颈时去翻经典（Jacqueline Casey 1950s 作品）找方向。
- 手 + 光标的构图，一调对比度 / 亮度就融进画面；主标居中，图像退为辅助。

## [#4 · Vercel Feature Flags Entities 页重设计](https://rauno.me/notes/4)
- 「Linear Method」：截生产界面拼进 Figma，只在要改的区域工作；mockup 必须和生产一模一样（真数据、真状态），「差不多像」的稿会让人迷失。
- 早期探索用 GUI 比 prompt agent 换方向更快。
- 页面 border 太重、分区糊在一起 → 去掉外层容器，把 key / label 升为分区标题，用 ghost input。
- 创建后不可编辑的字段干脆去掉输入框，做成表格感界面。
- 新建条目在页尾时临时加高页面，让新输入框能滚到屏幕中央。
- 灰色高亮放在分区标题上，扫读和跳转明显更容易。
- 相邻 ghost input 聚焦时互相让位，给 focus ring 留空；错误用红色 tooltip 包住字段。

## [#5 · Vercel 侧栏通知卡片导航](https://rauno.me/notes/5)
- 窄侧栏里箭头控件放哪都别扭 → 去掉控件，**卡片堆叠本身就是控件**。
- hover 主卡时下一张轻微上探，暗示可交互；用户已经懂了之后不再重复提示。
- hover 探出的卡显示标题；点击一次只前进一张。
- 用不可见的加大 padding 元素扩大命中区，避免要求精准瞄准；能不挪鼠标连续翻完。
- 底部指示堆叠离主操作太近会让人紧张 → 去掉。
- 交叉淡化：不用两张都渐变，只让退出卡淡出，然后瞬移到队尾（换 z-index 很卡）。
- 「关闭全部」的表达：hover × 时收起探出的卡并缩小当前卡，用动效代替 label / tooltip（触发点不能离开指针下方）。
