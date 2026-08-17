---
name: search-craft
description: >-
  In-product search craft: Search vs Filter vs Command palette; product-type
  selection; UI patterns; build-vs-buy. Use for SaaS admin, AI apps, marketing
  sites, docs/books. VitePress/MiniSearch is only the docs/book row — not the
  default for complex systems.
---

# Search craft

类型：UI / product craft（搜索表面选型 + 交互纪律；非某一框架教程）

| | |
|---|---|
| **What** | 先判断你在做 **Search / Filter / Command palette** 哪一种（或组合），再按产品类型选引擎与 UI，最后才谈库。 |
| **Why** | 「加个搜索框」是假需求。导航树不够用时，错误的搜索（或该 Filter 却做 Search）会制造不信任，用户再也不按 `/`。 |
| **Who** | B2B 控制台、AI/agent 产品、营销站、文档/书站、电商。 |
| **How to use** | ① §1 三选一 → ② §2 矩阵选路径 → ③ §4 交互清单 → ④ §5 实现短名单。 |
| **Not this** | 不是 VitePress 专用教程；不是 Algolia 销售页；不是把 Cmd+K 贴到每个营销 landing。 |
| **When to open** | 记录/设置/文档找不到；侧栏已经 >7；要做全局跳转；书站/文档站要全文检索；中文搜不到。 |

**原则一句话：** 复杂系统用 **产品对象 + 服务端/专用索引 + 命令面板 UI 壳**；静态文档/书用 **构建时本地索引**；列表已在屏上用 **Filter**，别伪装成 Search。

---

## 1. 先分清三件事（GitHub Primer 纪律）

| 表面 | 定义 | 典型触发 | 不是 |
|---|---|---|---|
| **Search** | 找**还不在视野里**的东西 | 顶栏放大镜、全局 `/` | 对当前表再筛一列 |
| **Filter** | 收窄**已经列出的集合** | 表头 chips、facet、query tokens | 跨模块跳转 |
| **Command palette** | 找 **东西 + 跑动作**（导航/创建/主题…） | `Cmd/Ctrl+K` | 纯文档全文的唯一入口 |

混用症状：

- 表格上方一个「搜索」其实只 filter 当前页 → 用户以为全库搜，结果不信任。  
- 营销站塞 Cmd+K 却只有 5 个锚点 → 仪式大于功能。  
- 文档站只有 Algolia、没有键盘与空态 → 能搜但难用。

**同一输入框可以进化**（输入关键字 → 建议记录；前缀 `>` → 命令），但 IA 上仍要写清默认模式是哪一种。

---

## 2. 产品类型 × 选型（主表）

| 产品类型 | 默认表面 | 索引/后端 | UI 壳 | 别默认上 |
|---|---|---|---|---|
| **B2B 后台 / CRM / 数据密集** | 全局 Search + 表内 Filter 分离；进阶再 Cmd+K | 服务端：Postgres `tsvector` / Meilisearch / Typesense / 现成 SaaS 搜索；权限必须进查询 | Dialog 结果分组（记录/人/设置）；表内用 Filter chips | 纯前端扫全库 JSON；VitePress MiniSearch |
| **AI / agent 产品** | Cmd+K（跳会话/工具/文件）+ 线程内 Search | 对象 API + 可选向量/混合检索（语义是增强，不是替代关键字） | 结果可带状态 chip、来源；动作与实体分区 | 只做 embedding 聊天当搜索 |
| **营销 / 个人站** | 站点 Search（若内容多）或根本不做 | 静态：Pagefind / 构建索引；页少则站内锚点+sitemap | 顶栏或 `/` 打开 modal；结果=标题+摘要 | Cmd+K 命令宇宙；Algolia 免费档折腾 |
| **文档 / 书 / VitePress 精读** | 文档 Search（local 或 DocSearch） | **Local MiniSearch**（隐私/离线）或 **Pagefind**（构建后 HTML 索引）或 Algolia DocSearch（大站、要托管） | VitePress/DocSearch modal；`/` 聚焦；键盘脚注 | 把书站方案复制到 SaaS 后台 |
| **电商 / 目录** | Typeahead Search + facet Filter | 专用搜索（Algolia/Typesense/…）+ 分析 | 建议图+价+类目；零结果导购 | 无 facet 的纯全文 |

**Build vs buy（复杂系统）：**

| 情况 | 倾向 |
|---|---|
| 记录带权限、多租户、要近实时 | **自建索引服务或托管搜索**（Meilisearch/Typesense/Algolia 等），查询层强制 ACL |
| 静态站点、隐私优先、无后端 | **Pagefind 或框架 local 索引**（构建期） |
| 只要「跳到设置/页面/命令」 | **cmdk / 自研 palette + 内存注册表**，不必全文引擎 |
| 列表已在 API 分页返回 | **Filter / 服务端 query params**，不要客户端假全局搜 |
| 中文正文检索 | 必须 **CJK 分词/tokenize**；默认空白分词会把整句当一个 token |

---

## 3. UI/UX 参考（学机制，不 mirror）

### 3.1 命令面板 / 全局跳转（SaaS）

| 参考 | 学什么 |
|---|---|
| **Linear / Notion / Vercel / Raycast / GitHub Cmd+K** | `Cmd+K` 肌肉记忆；实体与动作分区；最近项置顶；快捷键标注 |
| **GitHub Primer · Search** | Search vs Filter 边界；scoped vs global；Dialog 用于 jump-to |
| **cmdk**（pacocoursey / Vercel 生态） | 无头 combobox 壳：列表、键盘、分组；样式自带 |

### 3.2 文档 / 书

| 参考 | 学什么 |
|---|---|
| **VitePress local search** | 零后端、MiniSearch、i18n 文案、modal 键盘脚注 |
| **Algolia DocSearch**（Docusaurus 等） | 托管爬取、最近搜索、空态「建议换词」；成本与隐私代价 |
| **Pagefind**（1.5 Component UI） | 构建后静态索引；modal trigger；多语言 `lang` |

### 3.3 产品内记录搜索

| 参考 | 学什么 |
|---|---|
| **FullStory / 同类分析台、Rippling 等**（见 SaaSUI 搜索专题） | 结果类型图标、人像消歧、权限内结果 |
| **Asana / 大盘工具全局搜** | 跨对象分组；加载态；无结果行动 |

视觉纪律（跨类型）：

1. **即时反馈**：每键有响应；慢则 skeleton，禁止冻住。  
2. **键盘优先**：↑↓ 选择 · Enter 打开 · Esc 关闭 · 可选 `/` 或 `Cmd+K`。  
3. **可预期排序**：同分稳定；标题 boost 高于正文。  
4. **空态有下一步**：换词建议 / 清空筛选 / 去创建 · 不是冷冰冰「无结果」。  
5. **无障碍**：combobox + listbox 语义；读出「N 条结果，当前第 k」。  
6. **移动端**：大触控、少依赖 hover；主入口仍可达。

---

## 4. 交互与验收清单

### 4.1 任意搜索表面

- [ ] 写明类型：Search / Filter / Palette（或组合规则）  
- [ ] 打开快捷键文档化；与浏览器冲突已处理（如 `/` 不在输入框内抢焦点）  
- [ ] 加载 / 错误 / 空 / 权限不足 四态  
- [ ] 结果点击后焦点落点合理（不丢进 void）  
- [ ] 同 query 重复打开结果稳定（数据未变时）  
- [ ] 埋点：`search_opened` · `query_submitted` · `result_clicked` · `zero_result`（能改产品，不是虚荣）

### 4.2 命令面板额外

- [ ] 注册表：命令 id、标签、keywords、分组、handler、快捷键展示  
- [ ] 最近使用 / 固定常用  
- [ ] 动作与导航分区，避免「改主题」压过「打开客户」  
- [ ] fuzzy 可关/可调；错配率要在真实命令集上试

### 4.3 全文 / 文档额外

- [ ] 标题 / 层级标题 / 正文权重  
- [ ] 摘要 snippet + 跳转锚点  
- [ ] 中文：自定义 `tokenize`（如 `Intl.Segmenter` 或分词库）；**build 后 preview 实测**  
- [ ] 索引体积 vs 召回：写进验收（例如 index &lt; X KB 或懒加载）

### 4.4 数据密集后台额外

- [ ] **表内 Filter ≠ 全局 Search**（文案与位置分开）  
- [ ] 查询带 workspace/tenant/权限  
- [ ] 大数据禁止一次拉全表到浏览器再搜  

---

## 5. 实现短名单

| 方案 | 层 | 何时用 | 何时不用 |
|---|---|---|---|
| **cmdk** / kbar / Mantine Spotlight | UI 壳 | React 应用要 palette | 非 React；只要文档全文 |
| **MiniSearch** | 客户端索引 | 中小语料、离线、嵌在静态站（VitePress local） | 大体量、强权限、多租户实时 |
| **Pagefind** | 构建后静态索引 | SSG 站点全文、要更好静态 UX | 动态权限内容；每秒变的数据 |
| **Meilisearch / Typesense** | 自托管搜索服务 | 产品数据、要控制与成本 | 纯静态、无运维意愿 |
| **Algolia**（含 DocSearch） | 托管 | 大文档/电商、要省自建 | 强隐私、CN 网络、书站私有阅读 |
| **Postgres FTS / 应用 SQL** | DB | 已有 PG、中等复杂度、权限在 SQL | 复杂相关度/拼音/类型ahead 极致 |
| **Orama** 等 | 可嵌入 JS 索引 | 中等静态/边缘 | 评估维护与生态后再锁 |

**成品组件/文档入口（官方优先）：**

- VitePress Search：https://vitepress.dev/reference/default-theme-search  
- Pagefind：https://pagefind.app/docs/  
- MiniSearch：https://lucaong.github.io/minisearch/  
- cmdk：https://github.com/pacocoursey/cmdk  
- GitHub Primer Search pattern：https://www.primer.style/product/scenario-patterns/search/  
- SaaSUI 搜索/面板专题：https://www.saasui.design/blog/saas-search-command-palette-ux-patterns  

**中文 / CJK 必读坑：**

- MiniSearch 默认按空白/标点切词 → 中文整句一个 token → `搜「认证」打不中「认证系统…」`（社区与多项目确认）。  
- VitePress 支持 `miniSearch.options.tokenize` / `searchOptions`（fuzzy、prefix、boost）。  
- 实用升级：`Intl.Segmenter` 分词或 jieba 类；**索引变大**，要在体积与召回间取舍。  
- 参考讨论：vitepress#4049；实践文如自定义 Segmenter 的 VitePress 中文搜索笔记。

---

## 6. 必读（短）

| 来源 | 一句 |
|---|---|
| Primer Search | 先分清 Search vs Filter vs palette |
| SaaSUI command palette patterns | SaaS 里搜索是主路径，不是装饰 |
| cr0x / 137foundry palette 文 | 即时反馈、键盘、空态、可访问性非negotiable |
| VitePress Search docs | local vs Algolia；miniSearch 可定制 |
| Pagefind docs | 构建后索引 + 新 Component UI modal |
| MiniSearch CJK issues | 没有分词就没有中文正文检索 |

---

## 7. 脚注 · red-flowers（仅书站样例）

**仓/路径：** `lizliz404/red-flowers` · 本地阅读站 `<home>/reading/web`  
**定位：** VitePress 中英对照精读，**私有、CN WAF、要隐私** → 正确拒绝 Algolia 作为默认。

**现状（2026-08 配置）：**

```ts
search: {
  provider: 'local',
  options: {
    locales: { root: { translations: { /* 搜索/无结果/键盘中文 */ } } },
    miniSearch: {
      searchOptions: {
        fuzzy: 0.15,
        prefix: true,
        boost: { title: 4, text: 1, titles: 2 },
      },
    },
  },
}
```

**已够用：** 离线友好、无外泄搜索、中文 UI、title boost。  
**不够好（已知）：** 无 CJK `tokenize` → 多字词召回不稳；无章节/书范围 chips；snippet 一般；EN/ZH 分页（通常反而正确）。

**建议升级路径（仍保持 local，不引 SaaS）：**

1. `miniSearch.options.tokenize` + `Intl.Segmenter`（或等价）→ **build + preview 用中文词实测**。  
2. 排除 `endnotes`/版权页噪声（`search: false` 或 `_render` 过滤）。  
3. 需要更大语料/更好静态 UX 再评估 **Pagefind**（仍无后端）。  
4. **不要**把这套当成 CRM/出海云搜索模板。

审计记录：`<home>/reading/AUDIT-vitepress-ux-2026-08-06.md` §Search。

---

## 8. 开火路径

**今天下午（复杂 B2B）：**

1. 写清：全局 Search 搜哪些对象；表上只保留 Filter。  
2. 选索引：已有 PG → 先 FTS+权限；不够再 Meilisearch。  
3. UI：cmdk 壳 + 分组结果；空态与权限态。  
4. 埋 `zero_result` 看词。

**今天下午（文档/书站）：**

1. 保持 local 或 Pagefind。  
2. 上 CJK tokenize，preview 验 10 个真实中文词。  
3. 调 boost；砍噪声页。

**不要做：** 为「高级」上 Algolia 却搜私有书；为「统一」全产品只留一个 MiniSearch。
