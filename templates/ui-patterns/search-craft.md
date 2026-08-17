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
| **How to use** | ① §1 三选一 + 快捷键拆分 → ② §2 矩阵（先过 30 秒决策）→ ③ §3–4 交互 → ④ §5 栈与 CJK。 |
| **Not this** | 不是 VitePress 专用教程；不是 Algolia 销售页；不是把 Cmd+K 贴到每个营销 landing；不是用 palette 遮羞混乱 IA。 |
| **When to open** | 记录/设置/文档找不到；侧栏已经 >7；要做全局跳转；书站/文档站要全文检索；中文搜不到。 |

**原则一句话：** 复杂系统用 **产品对象 + 服务端/专用索引 + 命令面板 UI 壳**；静态文档/书用 **构建时本地索引**；列表已在屏上用 **Filter**，别伪装成 Search。Palette **增强**可见导航，不替代它。

---

## 1. 先分清三件事（GitHub Primer 纪律）

| 表面 | 定义 | 典型触发 | 不是 |
|---|---|---|---|
| **Search** | 找**还不在视野里**的东西 | 顶栏放大镜、全局 `/` | 对当前表再筛一列 |
| **Filter** | 收窄**已经列出的集合** | 表头 chips、facet、query tokens | 跨模块跳转 |
| **Command palette** | 找 **东西 + 跑动作**（导航/创建/主题…） | `Cmd/Ctrl+K` | 纯文档全文的唯一入口；新手唯一设置路径 |

混用症状：

- 表格上方一个「搜索」其实只 filter 当前页 → 用户以为全库搜，结果不信任。  
- 营销站塞 Cmd+K 却只有 5 个锚点 → 仪式大于功能。  
- 文档站只有 Algolia、没有键盘与空态 → 能搜但难用。  
- 删掉设置菜单只留 `⌘K` → 新手零采用（palette 当 IA 创可贴）。

**同一输入框可以进化**（输入关键字 → 建议记录；前缀 `>` → 命令），但 IA 上仍要写清默认模式是哪一种。

### 1.1 生产标杆：快捷键拆分（学机制，不 mirror 键位）

| 产品 | 内容 Search | 视图内收窄 (≈Filter) | 命令/动作 Palette | 可偷细节 |
|---|---|---|---|---|
| **Linear** | `/` 工作区 issues/projects/docs | `⌘/Ctrl+F` 当前 board 标题临时 filter | `⌘K`；前缀限域（如 `i ` `p `）；二级动作可搜 | 搜与命令**拆键**；`@` 快捷 filter；hybrid 语义+关键字（增强非替代） |
| **GitHub** | 顶栏搜；`S` 或 `/` 聚焦 | Issue 列表结构化 Filter（qualifier tokens） | `⌘/Ctrl+K`；模式 `>` 命令 · `#` issues · `@` 人 · `/` 文件 | Primer：Search≠Filter；query 可进 URL；palette 曾默认关闭→**发现性**教训 |
| **Notion** | `⌘/Ctrl+P` 或未聚焦时 `⌘K`；recent | 页内 `⌘F` | 搜窗兼跳转 | 全局内容搜 vs 页内找字拆开；AI Search 是**另一层** |
| **电商 (Algolia 范式)** | as-you-type autocomplete | PLP facet | 通常不做 Cmd+K | 三件套：typeahead · facet · 零结果导购 |

来源：Linear Search docs · Linear 2025-04 New search · GitHub Command Palette · Notion Help Search · Algolia Ecommerce Search · Primer Search/Filter。

---

## 2. 产品类型 × 选型（主表）

### 2.0 三十秒决策（矩阵前先答）

1. 目标 **是否已在当前列表？** → 是 Filter；否 Search。  
2. 要的是 **名词（记录）还是动词（动作）？** → 名词 Search；动词 Palette；常两者但 **键位/模式分离**。  
3. 数据是否 **权限分片 + 近实时？** → 禁止纯前端全库；Meili/Typesense/PG+ACL。  
4. 是否 **SSG 且隐私/离线？** → Pagefind/MiniSearch；禁止 DocSearch 默认。  
5. 是否 **中文正文？** → **分词方案先于 UI 库**。  
6. 是否 **电商转化？** → 强制 facet + 零结果。  
7. 是否在用 palette **补 IA 洞？** → 先修导航。  
8. AI 语义？ → **增强排序/召回，保留关键字与 ID 精确命中**。

| 产品类型 | 默认表面 | 索引/后端 | UI 壳 | 别默认上 | 键盘 / 空态 / 移动 |
|---|---|---|---|---|---|
| **B2B 后台 / CRM / 数据密集** | 全局 Search + 表内 Filter **位置+文案分离**；进阶 Cmd+K | 服务端：PG FTS / Meilisearch / Typesense / 托管搜；**查询强制 tenant ACL** | Dialog 分组（记录/人/设置）；表内 Filter chips + URL | 纯前端扫全库；VitePress MiniSearch | 打开 recent；Filter URL 可分享+revert；筛空≠库空 |
| **AI / agent 产品** | Cmd+K（会话/工具/文件/命令分区）+ 线程内 Search | 对象 API + **可选**向量/混合（语义增强关键字，非替代） | 状态 chip、来源；动作与实体分区 | 只 embedding 聊天当搜索 | 权限 disabled+原因；IME 安全 |
| **营销 / 个人站** | 内容多才站点 Search；页少可不做 | 静态 Pagefind / 构建索引 | 顶栏或 `/` modal | Cmd+K 宇宙；为仪式上 Algolia | 移动大触控入口 |
| **文档 / 书 / VitePress 精读** | 文档 Search | Local MiniSearch 或 Pagefind 或 DocSearch（大站） | modal；`/`；键盘脚注 | 抄到 SaaS 后台 | CJK tokenize 验收；build+preview |
| **电商 / 目录** | Typeahead + facet Filter | 专用搜 + 分析 | 图+价+类目；零结果导购 | 无 facet 纯全文 | 清筛选/热门/建议类目 |

**Build vs buy（复杂系统）：**

| 情况 | 倾向 |
|---|---|
| 记录带权限、多租户、要近实时 | **自建/托管搜索服务**，查询层强制 ACL |
| 静态站点、隐私优先、无后端 | **Pagefind 或框架 local 索引**（构建期） |
| 只要「跳到设置/页面/命令」 | **cmdk / 注册表**，不必全文引擎 |
| 列表已在 API 分页返回 | **Filter / query params**，不要客户端假全局搜 |
| 中文正文检索 | 必须 **CJK 分词**；默认空白切词 = 整句单 token |
| 「为高级」上 Algolia 搜私有书 | **禁止** |

---

## 3. UI/UX 参考与纪律（学机制，不 mirror）

### 3.0 Primer 实现细则（Search / Filter 成对读）

- **控件匹配任务：** 单字段 SearchInput+SearchIcon；已知列表 SelectPanel；多 qualifier → Filter（token 建议）；跨上下文 jump-to → **Dialog**。  
- **反馈：** skeleton + `aria-busy`；结果数 polite live region；空态 **点名 query**。  
- **Search 可 share：** 结果视图 query 进 URL。  
- **Filter：** 状态可见可恢复（revert）；筛空点名**生效筛选**并 reset；页级 filter 默认 URL。  
- **文案：** 只收窄当前列表时禁止标「Search」。

官方：https://primer.style/product/scenario-patterns/search/ · https://primer.style/product/scenario-patterns/filter/

### 3.1 命令面板 / 全局跳转

| 参考 | 学什么 |
|---|---|
| **Linear / Notion / Vercel / Raycast / GitHub** | 拆键、分区、recent、前缀限域、二级动作可搜 |
| **cmdk** | 无头 combobox：列表、键盘、分组 |
| **uxpatterns · Command Palette** | 何时**不要**用；可见搜 vs launcher |

**何时上 palette：** 动作空间大、常驻用户、已有可见导航。  
**何时不上：** 表面仍小；用 palette 遮羞混乱 IA；团队扛不住无障碍。

反模式：

1. 删设置入口只留 `⌘K`  
2. 多字段/危险长流程塞进 palette（应 route 到页/drawer）  
3. 无可见 trigger 且无 onboarding  
4. Fuzzy 过宽；未在真实命令集调参  
5. 权限命令直接消失（应 disabled + 原因）  
6. IME 组字时劫持 Enter  
7. Mobile 只绑 `⌘K`（需搜索页/bottom sheet；键盘勿遮结果）

### 3.2 文档 / 书

| 参考 | 学什么 |
|---|---|
| **VitePress local** | 零后端、MiniSearch、i18n、modal 脚注 |
| **Algolia DocSearch** | 托管爬取、recent、空态建议；隐私/网络代价 |
| **Pagefind 1.5 Component UI** | 构建后索引；modal trigger；`lang` 多语 |

### 3.3 电商

- Typeahead：建议词 + 商品卡（图/价/类目）  
- PLP：facet / guided facets  
- 零结果：建议类目 · 清除筛选 · 热门（分析驱动 Query Suggestions）  
范式：https://www.algolia.com/doc/guides/solutions/ecommerce/search

### 3.4 跨类型视觉/交互纪律

1. **即时反馈**；慢则 skeleton，禁止冻住。  
2. **键盘：** ↑↓ · Enter · Esc；内容搜与 palette **拆键或拆模式**。  
3. **排序稳定**；标题 boost > 正文。  
4. **空态分型：** 未输入（recent/范围提示）· 无匹配（换词）· 筛空≠库空 · 权限不足。  
5. **渐进披露：** 首屏高频；长尾可搜到；sub-palette 面包屑（`Move issue ›`）。  
6. **无障碍：** combobox/listbox；读出 N 条与当前项。  
7. **移动：** 非 ⌘K 入口；大触控。

---

## 4. 交互与验收清单

### 4.1 任意搜索表面

- [ ] 写明类型：Search / Filter / Palette（或组合规则）  
- [ ] 内容 Search 与 Palette 快捷键/模式已文档化；`/` 不在输入框内误抢  
- [ ] 加载 / 错误 / 空 / 权限不足 四态；空态点名 query  
- [ ] Filter 在 URL；有 revert；筛空文案≠库空  
- [ ] 结果点击后焦点合理  
- [ ] 同 query 稳定（数据未变）  
- [ ] 埋点：`search_opened` · `query_submitted` · `result_clicked` · `zero_result`  
- [ ] IME 组字不误触发；Mobile 有非 ⌘K 入口  
- [ ] 多租户：零结果 vs 无权限可区分（安全要求下可不泄露存在性）

### 4.2 命令面板额外

- [ ] 注册表：id、标签、keywords、分组、handler、快捷键展示  
- [ ] recent / 固定常用；动作与导航分区  
- [ ] 权限 disabled + 原因；无复杂表单  
- [ ] fuzzy 可关/可调；真实命令集试错配

### 4.3 全文 / 文档额外

- [ ] 标题/层级/正文权重；snippet + 锚点  
- [ ] CJK：tokenize 对齐 + 10 词实测 + 索引体积记录  
- [ ] build 后 preview，不只 dev server

### 4.4 数据密集后台额外

- [ ] 表内 Filter ≠ 全局 Search（文案与位置）  
- [ ] 查询带 workspace/tenant/权限  
- [ ] 禁止一次拉全表到浏览器再搜

### 4.5 电商额外

- [ ] 零结果有建议/清筛选/热门

---

## 5. 实现短名单

| 方案 | 层 | 何时用 | 何时不用 |
|---|---|---|---|
| **cmdk**（首选）/ kbar / Mantine Spotlight | UI 壳 | React palette | 非 React；只要文档全文；**不是**全文引擎 |
| **MiniSearch**（含 VitePress local） | 客户端索引 | 中小语料、离线、静态站 | 大体量、强权限、多租户实时 |
| **Pagefind** | 构建后静态索引 | SSG 全文；Component UI modal；[Multilingual](https://pagefind.app/docs/multilingual/) | 动态权限内容；CSP 未放行 wasm |
| **Meilisearch** | 自托管/云 | 产品数据；中文 **charabia/jieba** 开箱 | 纯静态无运维 |
| **Typesense** | 自托管/云 | Algolia 成本替代候选（实测配置） | 同上 |
| **Algolia + DocSearch** | 托管 | 大文档/电商 DX | 私有书、强隐私、CN 网络敏感 |
| **Postgres FTS** | DB | 已有 PG、权限在 SQL | 极致 typeahead；中文需扩展（zhparser/jieba 类） |
| **Orama** | 可嵌入 JS | 中等静态/边缘、可加向量叙事 | 评估语言与维护后再锁 |

### 5.1 成本 / 隐私 / 离线 / CJK / SSG

| 方案 | 成本 | 隐私 | 离线/静态 | CJK | 实时 |
|---|---|---|---|---|---|
| Pagefind | 构建免费 | 查询不出站 | ✅ + WASM | `lang=zh` 扩展分词 | rebuild |
| MiniSearch | 免费 | ✅ | ✅ 中小 | **必须自定义 tokenize** | 构建/客户端 |
| Meilisearch | OSS/Cloud | 自托管可控 | 需服务 | jieba 管线 | ✅ |
| Typesense | OSS/Cloud | 自托管可控 | 需服务 | 需实测 | ✅ |
| Algolia/DocSearch | 按量；DocSearch 对公开技术文档有免费叙事 | 爬取+查询进托管 | ❌ | 托管 | ✅ |
| PG FTS | 已有 DB | ✅ | ❌ | 扩展非默认 | ✅ 中等 |
| cmdk | UI 免费 | n/a | n/a | n/a | 内存注册表 |

成本对照文（**provisional / 第三方**）：选型树可参考 2026 基础设施对比文，勿当官方报价。  
90%「上 Algolia」可用 Typesense/Meili 更划算的说法仅作假设，需自己压测。

**成品入口：**

- VitePress：https://vitepress.dev/reference/default-theme-search  
- Pagefind：https://pagefind.app/docs/ · Multilingual  
- MiniSearch：https://lucaong.github.io/minisearch/  
- cmdk：https://github.com/pacocoursey/cmdk  
- Primer Search/Filter：primer.style scenario-patterns  
- Meilisearch language/tokenization docs  
- DocSearch：https://docsearch.algolia.com/  
- SaaSUI search/palette：https://www.saasui.design/blog/saas-search-command-palette-ux-patterns  
- uxpatterns command palette：https://uxpatterns.dev/patterns/advanced/command-palette  

### 5.2 CJK / 中文分词（有证据）

**根因：** 默认按空白/标点切 → 中文无空格 → **整句一个 token** → 搜「认证」打不中「认证系统…」。  
实证：https://github.com/lucaong/minisearch/issues/201 · https://github.com/vuejs/vitepress/issues/4049  

| 策略 | 优点 | 风险 | 适用 |
|---|---|---|---|
| `Intl.Segmenter('zh', {granularity:'word'})` | 无重依赖；VitePress build 友好 | ICU 切分版本差；老环境无 API | 书站/中小文档第一刀 |
| **CJK bigram**（+ 拉丁整词） | 确定、召回稳 | 索引大；要停用词 | 要稳的客户端索引 |
| jieba 等字典 | 更「像词」 | 依赖体积 | 服务端/Node 构建 |
| **Meilisearch charabia** | 中文管线开箱 | 运维服务 | 产品数据中文搜 |

**硬规则：**

1. **同一 tokenize 用于 index 与 query**  
2. 中文查询常需 `combineWith: 'AND'`  
3. Unigram 过噪；不切则零召回；bigram 是常见折中  
4. 验收：≥10 个真实中文词（标题+正文）；**build + preview**  
5. 产品数据优先引擎自带 CJK  
6. Pagefind：正确 `html lang` + zh extended  

实践：https://blog.goagix.com/vitepress-search · MDN Intl.Segmenter  

---

## 6. 必读（短）

| 来源 | 一句 |
|---|---|
| Primer Search + Filter | 控件、URL、live region、筛空≠库空 |
| Linear Search + 2025 New search | `/` vs `⌘F` vs `⌘K`；hybrid；`@` filter |
| GitHub Command Palette | 模式字符；与顶栏 Search 分离 |
| Notion Help Search | `⌘P/K` vs 页内 `⌘F`；AI 另层 |
| uxpatterns Command Palette | 何时不用 |
| SaaSUI search/palette | SaaS 搜=主路径 |
| Pagefind Multilingual | `lang`；zh 分词行为 |
| Meilisearch Language/Tokenization | charabia；中文 jieba |
| Algolia Ecommerce Search | typeahead + PLP + no-results |
| MiniSearch #201 / VitePress #4049 | CJK 必须自定义分词 |
| DocSearch | 文档托管搜；隐私自担 |
| Interface Lab palette flow | IME、权限、mobile fallback |

---

## 7. 脚注 · red-flowers（仅书站样例）

**仓：** `lizliz404/red-flowers` · 阅读 monorepo 内 VitePress `web/`  
**定位：** 中英对照精读，**私有、CN WAF、要隐私** → 正确拒绝 Algolia 默认。

**现状（2026-08）：** `provider: 'local'` + 中文 UI + `fuzzy: 0.15` · `prefix` · title boost×4。  
**够用：** 离线友好、无外泄、中文 chrome。  
**不够：** 无 CJK `tokenize`；无书/章 scope chips；snippet 一般。

**升级路径（仍 local，永不 CRM 模板）：**

1. `miniSearch.options.tokenize`：先 `Intl.Segmenter('zh-CN',{granularity:'word'})`；不稳 → **CJK bigram + 停用词**，拉丁走空白规则。  
2. `searchOptions`：中文实测 `combineWith:'AND'`；CJK token 谨慎 fuzzy（可关）。  
3. **index 与 query 同器**；改 tokenize 后整站 rebuild。  
4. 排除 endnotes/版权（`search: false` / `_render`）。  
5. 验收：10 中文词 + 索引 KB 写入 AUDIT。  
6. 语料再大 → Pagefind（`lang`+extended）；**仍不要** DocSearch 私有书。

审计：`AUDIT-vitepress-ux-2026-08-06.md` §Search。

---

## 8. 开火路径

**复杂 B2B：** 写清 Search 对象 vs 表 Filter → 索引+ACL → cmdk 分组 → `zero_result` 埋点。  
**文档/书：** local/Pagefind → CJK tokenize → 10 词 preview → 砍噪声页。  
**电商：** typeahead + facets + 零结果三件套一次做齐。  

**不要做：** 私有书上 Algolia；全产品只留一个 MiniSearch；用 palette 替代导航。
