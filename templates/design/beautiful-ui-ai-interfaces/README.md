# Beautiful UI 组件源码

这里保存 [Beautiful UI](https://www.beautifului.dev/) 全部 **21 个展示组件的原始 TSX**、共享组件、样式、资产、依赖锁文件及 MIT 许可。用于直接复用原件，再接入产品的真实数据和操作。

源码来自官网直接链接的 [slev12397/beautiful-ui](https://github.com/slev12397/beautiful-ui/tree/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4)，固定版本 `06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4`。2026-09-07 已逐项核对：**21/21 文件与官网传给 Copy code / View code 的原始文本完全一致**。详见 [核验记录](./upstream/2026-09-07-verification/live-copy-code-check.json) 和 [文件清单](./manifest.json)。

## 找到组件

| 官网编号 | 组件 | 原始文件 |
|---|---|---|
| 01 | Loading State | [LoadingState.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/LoadingState.tsx) |
| 02 | Thinking | [ThinkingState.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/ThinkingState.tsx) |
| 03 | Streaming Text | [StreamingText.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/StreamingText.tsx) |
| 04 | Approval Card | [ApprovalCard.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/ApprovalCard.tsx) |
| 05 | Tool Chips | [ToolChips.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/ToolChips.tsx) |
| 06 | Task Rows | [TaskRows.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/TaskRows.tsx) |
| 07 | Chat | [ChatComposer.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/ChatComposer.tsx) |
| 08 | Prompt Bar | [PromptBar.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/PromptBar.tsx) |
| 09 | Recommendation Card | [RecommendationCard.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/RecommendationCard.tsx) |
| 10 | Context Cards | [ContextCards.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/ContextCards.tsx) |
| 11 | Diff Table | [DiffTable.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/DiffTable.tsx) |
| 12 | Records Table | [RecordsTable.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/RecordsTable.tsx) |
| 13 | Filter Table | [FilterTable.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/FilterTable.tsx) |
| 14 | Sidebar Nav | [SidebarNav.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/SidebarNav.tsx) |
| 15 | Search | [SearchList.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/SearchList.tsx) |
| 16 | Flowchart | [Flowchart.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/Flowchart.tsx) |
| 17 | Insight Cards | [InsightCards.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/InsightCards.tsx) |
| 18 | Code Block | [CodeBlock.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/CodeBlock.tsx) |
| 19 | Fine-tune Card | [FineTuneCard.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/FineTuneCard.tsx) |
| 20 | Selection Actions | [SelectionActions.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/SelectionActions.tsx) |
| 21 | Agent Screen | [AgentScreen.tsx](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/primitives/AgentScreen.tsx) |

`GlideMenu` 等共享件不占上述 21 个展示编号；它们与全部 `atoms/` 一并保存在快照中。

## 目录

| 位置 | 内容 |
|---|---|
| [`upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/`](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/) | 完整上游源码快照，共 98 个文件；保持原始内容，不在这里做产品适配 |
| [`upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/app/globals.css`](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/app/globals.css) | 完整 foundation：双主题 tokens、Tailwind 映射、基础规则、组件样式与动效 |
| [`upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/atoms/`](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/components/atoms/) | Button、Shimmer、StreamText 等共享件 |
| [`upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/public/r/`](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/public/r/) | 官方 shadcn 兼容 registry JSON；含 foundation 与共享件 |
| [`upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/package-lock.json`](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/package-lock.json) | 上游完整依赖锁文件；版本以此为准 |
| [`upstream/external-assets/`](./upstream/external-assets/) | 原件引用的 Agent Screen 图片、Surfer 视频；URL、哈希和许可边界见 manifest |
| [`scripts/`](./scripts/) | 固定版本重取、完整性核验、官网源码对照 |
| `sections/`、`screenshots/`、`source/` | 2026-08 的 19 项 DOM / 截图 / 编译资产，仅供历史视觉参考 |
| `upstream/2026-09-07/` | 前次通过浏览器取得的 Prompt Bar、Insight Cards 两件存档 |

## 在项目中使用

1. 从上表打开目标原件，连同其本地 imports 一起复制到产品组件目录。共享依赖见 [`lib/meta.ts`](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/lib/meta.ts)；递归依赖还需检查原件 imports。保留 [MIT notice](./upstream/06557d7ff33a1eb70d5987bae9ac4c70fa0e20c4/LICENSE)。
2. 安装该组件需要的包。共同基础是 React 19、Tailwind CSS 4、`shadow-plugin`；Prompt Bar 使用 `glimm`，Insight Cards 使用 `liveline`，Sidebar Nav 使用 Central Icons，Selection Actions 使用 `iconoir-react`，Button 使用 `class-variance-authority`。完整清单及精确锁定版本在上游 package 文件中。不要为了取一个组件将整站的 Next.js、分析 SDK、订阅 API 一起接入产品。
3. 在产品样式入口建立一次明确的 foundation 映射，保留原件的尺寸、间距、层级和关键动效。完整 `globals.css` 含全局 `:root`、基础规则和组件 CSS：已有 Astryx 或其他主题的项目先检查同名 token 和全局选择器，采用作用域隔离或显式映射，不能直接叠加两套全局规则。
4. 保留原件视觉结构，把演示 timers、模拟回复、随机曲线、占位审批、录屏和听写状态改接真实事件。失败、空数据、取消、运行中和完成分别呈现；IME、键盘焦点、窄屏、深浅色及 reduced-motion 需要在消费项目验证。

官网确实有官方 registry；可以通过 `npx shadcn add https://www.beautifului.dev/r/prompt-bar.json` 取单件。这里的 shadcn 是复制文件的 CLI，不能由此推导产品必须迁移到 shadcn 组件体系。**当前 registry 只有 20 个展示组件，Agent Screen 的 URL 返回 404**；完整 21 件应按上表取固定源码。registry 把 Records / Sidebar CSS 分拆到生成文件；手动复制完整 foundation 时不要再重复导入它们。

快照保留上游 `public/` 和内联 SVG。两个外链媒体另存于 `external-assets/`，原件中的 URL 未改写；离线预览可在消费副本中改成本地路径。外链媒体没有独立许可证明，产品使用应换为自有媒体。`app/layout.tsx` 使用 Next 字体加载，跨框架时在项目中明确配置字体；旧 `source/*.woff2` 是历史字体存档，不是当前快照的版本证据。

## 核验与更新

从本目录运行：

```bash
python3 scripts/verify-source.py
python3 scripts/verify-source.py --live
python3 scripts/fetch-source.py /tmp/beautiful-ui-pinned-source
```

第一条核对全部 98 文件哈希、21 项目录、TS/TSX 本地 imports、npm 声明和两个外链资产。第二条额外下载官网公开响应，解析官网真实 Copy code 数据，与每个 TSX 字节对照。第三条下载固定 commit 归档到**尚不存在的目录**并逐文件核验；不会覆盖现有快照。

更新时先选定新 commit，重新核验官网清单、依赖和资产，再增加独立快照及更新 manifest。官网有变化时 `--live` 会失败，不应自动覆盖旧原件。源码完整性通过不等于产品集成或视觉验收通过；本资产没有声称 21 个演示已经适配 OrgBrain。
