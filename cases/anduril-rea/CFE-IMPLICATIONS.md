# CFE-IMPLICATIONS — Anduril 拆解对 cfe-app 的可落地差异点

> 对照 `~/dev/cfe-shanghai-website/DESIGN.md` 现状（2026-11-04 生效态）。
> 证据均指 `cases/anduril-rea/` 内文件；标记：【可落地】【已对齐】【不建议】【参考】。

## 1. 直接可落地

### 【可落地】Products/Services 下拉的"锚点子导航"形态
Liz 已批准 Products/Services 单档下拉。Anduril 给了两种机制可参考：
- 桌面 nav 项 `HeaderDomainLink` = `.name`+`.hiddenName` 双文本叠放 + `mask-image` 翻滚（hover 文字滚动换行效果，不是单纯下划线）。
- 域页二级 `banner` 导航 = 页内 `#anchor` 产品跳转列（`.SecondaryNavigationSlice` fixed），产品多时域页可扫读。
- CFE 落地：下拉面板左侧放域介绍 + 右侧小类挂链，对应 Anduril"域 → 页内锚点"双层；不引入多域 mega menu（§0.1 豁免只限一档）。证据：style.css `.HeaderDesktop .HeaderDomainLink`、`a11y/air-domain.json` banner 节点。

### 【可落地】LinkButton 下划线动效参数
Anduril 实测：`:after` 1px `background:currentColor` + `linkbutton-underline-in` **.3s ease-out** 进、`replay-underline` **.6s** 重放；未 hover 时文字 opacity .6 → 1。CFE 现有 .text-link 可直接套这两个时长与 1px 厚度——数值有原站证据，不用拍脑袋。证据：style.css `.LinkButton` 与 keyframes。

### 【可落地】规格/参数的"标签-值"版式
Ghost 规格块 = label（小字大写 `.75rem→.929rem`, +.037em）+ 值（正文档）的 dl 对，四列排布。CFE `.spec-grid` 2×2 已有 dl/dt/dd，可对齐：label 消费 `--font-mono`（§3.4 已生效）+ 大写 + 正字距，值留正文族。与 Anduril `[AAV]` 括号短码 tag 同机制的 entity-tag 是 CFE 差异化资产，可保留做精。证据：a11y/ghost.json spec list、style.css `.detail`/`.detailElios`。

### 【可落地】编号叙事骨架（01/04 计数 + 章节序号）
产品特性、价值观、Lattice Kill Chain 统一 `01 / 04` 小计数 + h1 级大序号 + tab/figure 的"章节化"节奏。CFE 证据链/能力页可用同款骨架：小节序号 mono + 名称 + 图/段，比纯标题更有编辑感且零新样式档（序号走 mono 档）。证据：a11y/ghost.json、a11y/lattice-c2.json、a11y/careers.json。

### 【可落地】域页/能力页骨架
`域眉标(mono) + H1 + 标签行 + 一段式使命陈述 + 页内锚点子导航 + 产品块(h5名+一句+Discover链+图)`。CFE capabilities/services 页可套这个六段式：比"标题+段落堆"更接近工业编辑版型。证据：a11y/air-domain.json、a11y/connected-warfare.json。

### 【可落地】`text-wrap:balance` 用于短标签/眉标
Anduril `.detail` 用 `text-wrap:balance` 防两行断句失衡。零成本细节，CFE eyebrow/detail 可同款。证据：style.css `.detail{text-wrap:balance}`。

### 【可落地】页脚形态收敛（已近似对齐）
Anduril footer = logo + 3 组 accordion（Company/Work with us/Social）+ 一行法律链接 + 一个邮箱。CFE §4.3 footer 收敛方向与此一致（品牌短行 + 少量清楚入口 + 法律一行 + 邮件），原站证据支持"页脚不是 sitemap"。证据：a11y/ghost.json contentinfo。

## 2. 已对齐（原站证据强化现有决策）

- 【已对齐】**mono = 标识与参数**：Elios 只给 tag/编号/3D 点标/章节信息，正文标题不动 —— 与 §3.4 Geist Mono 使用面规则同机制，且 Anduril 比 Saronic 更克制（Elios 只 15 处 font-family 声明）。
- 【已对齐】**accent 只给功能态**：volt `#dff140` 47 处全部用于交互/选中/进行中（scroll 钮、loading 条、active 点、checked、open 态），零大底色块 —— 与钢蓝 `#2f5d72`"只给动作/选中态"是同一纪律的深色版。
- 【已对齐】**字重层级靠字号不靠字重**：Anduril 声明 10 档字重实际只用 400/500/700 三档，h1 以下全 400 —— 支持 CFE"不叠字重造层级"（§3.5 用 family+颜色+大小三维）。
- 【已对齐】**毛玻璃 header**：`--frosted` 变量 + `blur(4rem)` 滚动态 —— CFE sticky+92%透明+blur 现状同构。
- 【已对齐】**动效时长**：UI 过渡 .3s ease-out 为主、.5s 次之 —— 落在 CFE 150–500ms 区间中位；缓动 `cubic-bezier(.215,.62,.34,1)` 接近 CFE `--ease-emph(.16,1,.3,1)`。
- 【已对齐】**12 列网格**：Anduril 全站 `repeat(12,1fr)`×73 —— CFE 容器内同样 12 列即可，区别在于他们全幅出血（无边距容器），CFE 保 72rem 容器。

## 3. 不建议引入（明确红线/成本）

- 【不建议】**客户端 SPA 渲染**：Anduril `<body>` 无 JS 只剩 noscript —— 与 CFE"渐进增强、无 JS 可读"合同直接冲突；且 SEO 靠 og 兜底是赌。CFE Astro SSG 路线不动。
- 【不建议】**WebGL 3D 产品查看器**：`uil.json` 106 个场景 + 93 几何体 + PBR 纹理 + MSDF 字 atlas —— 这是一条渲染管线团队的工作量，且客户素材红线（实拍优先）下没有正收益。
- 【不建议】**全站黑底**：客户明确暖白纸面；Anduril `#010101` 底是品牌选择不是范式。
- 【不建议】**大写正文**：产品描述 `text-transform:uppercase` 是风格化，读性差；CFE 买家任务链不适合。
- 【不建议】**126–224px display 巨标**：Anduril ProductHeaderSlice h1=9rem(126px)700 + RollerCounter 224px —— CFE H1 clamp(36–64px) 已定，新品牌大字+不解释会翻车（benchmark §3 已裁）。
- 【不建议】**lenis 平滑滚动 / 滚动 scrub / 章节微站**：scroll-jacking 邻近物 + Don't 表已禁强制滚动叙事；DragBranchChartDesktop sticky scrub 同理。
- 【不建议】**无 RFQ 轨**：Anduril 全站无询盘 CTA（B2G），CFE RFQ 双轨是硬需求，不参考其 CTA 密度。

## 4. 参考细节（不一定采纳，留档）

- `.GLA11y`：WebGL 画布配隐藏 a11y 镜像 DOM —— 若 CFE 未来上任何 canvas/视频 hero，这是无障碍范式。
- 加载体验三件套：volt 3px 进度条 + `.LoaderView` + `.PageTransition` —— SPA 才有意义，MPA 的 CFE 不需要。
- `unsupported` 兜底：3D dialog 检测不支持设备时给 "TAKE CONTROL / Launch Interactive View" 静态回退 + 红字警告 —— 降级文案范式。
- 产品卡 = figure + h2 名 + h4 口号（一句战斗口号，不放参数）—— CFE 产品入口卡可参考"名+一句话"的轻量结构，参数进详情页。
- 新闻列表三件套：日期 + 题 + Read more 文字链 + 单 featured 大卡 —— 与 CFE 新闻/公告列表同构，佐证现有做法。

## 5. 给 DESIGN.md 的增量证据（供主文档引用）

- Anduril 实测字阶（root 14px）：h1 70px/700/105%/−1.4px → h7 17.5px；body 14.7px/120%；label 10.5–13px/+.037em/uppercase。证据：evidence/style.css h1-h7、p、`.detail`。
- Anduril 色板：#010101/#fff/#dff140/#f1f0ea/#b0b0a9/#2f3234/#ff3535 —— 与 CFE 三色板同构的"1 底+1 文+1 功能 accent"模型，加一暖灰派生层。
- Anduril 断点：400/768(主)/960/1280/1440/1920/2400；间距基元 7px（.5rem）倍数系。
- 组件名体系 = slice/page-view 双层（*Slice 块 × *PageView 页）—— 与 CFE Astro 页+组件结构同型，命名可参照。
