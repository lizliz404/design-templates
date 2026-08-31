# Icon Decision · 图标库决策（2026-08-31 拍板）

> 结论先行：**产品图标系统 = Iconoir**（`iconoir-react`）。Lucide 降级为「功能性兜底层」，不再承担产品视觉语言。
> 决策人：Liz · 适用：chuhai-cloud + inquiry-foundry（两仓全局）· 本文件是唯一决策记录，引用勿粘对话原文。

## 1 · 为什么不是 Lucide

Lucide 本身没错，错在它成了「基础设施级默认脸」：npm 周下载 ~1 亿、shadcn/AI 生成代码默认内置。
`Inter + Lucide + shadcn + zinc + 1px border + rounded-xl + 蓝紫渐变` 这套组合拳就是 AI SaaS 模板味的定义。
单换图标消不掉全部味道，但能消掉最显眼的一层。

## 2 · 候选结论（整理自 2026-08 评估）

| 层 | 库 | 一句话 |
|---|---|---|
| **S（产品主力候选）** | **Iconoir** ✅ 拍板 | 平面设计师画的 Lucide：editorial、有人格；`npm i → import → 完事`，DX 与 Lucide 同级；Provider 全局锁 stroke/size；MIT、零依赖、tree-shaking、离线可构建；撞脸概率低（周下载 ~12 万 vs Lucide ~1 亿） |
| S（未选中） | Untitled UI Icons | 高级中性不抢戏，Figma 工作流顺；未选：与 Iconoir 同价位，Iconoir 更「最少折腾」 |
| S（未选中） | MingCute | filled 漂亮、有形状感；未选：命名带 Regular/Filled 后缀，选择负担略高 |
| A（备选池） | Hugeicons / Solar / Teenyicons | Teenyicons 适合 15×15 密集 UI 香料；Solar duotone 能做独特语言；留档待用 |
| **功能性兜底** | Lucide / Phosphor / Tabler | `x / close / chevron / search / plus / minus` 这类纯功能图标撞脸无所谓；shadcn/ui 原语内部（Dialog/Sheet 的 close、Select 的 chevron）**保留 lucide，不强迁** |
| 自绘 | — | 仅 brand / logo / empty-state 插画 / 重要 AI feature |

## 3 · 采用协议（两仓统一）

1. **安装即用**：`npm i iconoir-react`。named import + `<Icon />`，props 透传（width/height/strokeWidth/className）。
2. **Provider 锁语言**：应用根部包一层 `IconoirProvider`，全局锁 `strokeWidth` + 默认尺寸——产品的 icon visual language 只允许在这一处调。
   - chuhai-cloud：`strokeWidth: 1.75`（对齐 DESIGN.md 的 stroke band 1.75），chrome 尺寸 16px。
   - inquiry-foundry：以该仓 DESIGN.md/现网口径为准。
   - **最佳实践**：Iconoir 线条偏轻，小尺寸易渲染出「蚊子字」感——尺寸比直觉**加大 1~3px**，并**加粗一档 stroke**（如默认 1.5 → 1.75）。
3. **离线纪律**：npm dependency + lockfile + tree shaking = 构建期进 bundle，**运行时零第三方请求**。禁止 Iconify API/CDN runtime 模式、禁止把成套 SVG 复制进 repo（那是在给自己找活）。
4. **分工边界**：产品语义图标（导航、对象、状态、按钮主图标）→ Iconoir；shadcn/ui 原语内部的功能图标 → lucide 保留；两者不得混在同一组件里表达同一语义。
5. **命名对照**：Iconoir 与 Lucide 无 1:1 官方映射，迁移时按语义挑（如 `home`/`graph-up`/`send-diagram`…），挑完在仓内 DESIGN.md/等价视觉契约里登记字形表，之后新图标先查表再引。

## 4 · 各仓落地状态（随迁移更新）

| 仓库 | 状态 | 备注 |
|---|---|---|
| chuhai-cloud | 迁移中（agent 分支） | nav.ts + journey widget/sheet 先行；DESIGN.md 字形表随迁更新；shadcn 原语内部 lucide 保留 |
| inquiry-foundry | 待迁移 | 先盘点现用图标库与数量再动手 |

## 5 · 反模式

- 为了小众而小众，把奇形怪状的库当个性（Iconoir 的价值正是「有设计人格但仍然中性」）。
- 同一语义在 lucide 和 iconoir 之间混用。
- 绕过 Provider 散落写 strokeWidth。
- 引 Iconify runtime API 求方便（网络 + CSP + 首屏稳定全是债）。
