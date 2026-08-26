# Design Templates

一组可复用的设计资产：已落地页面的 `DESIGN.md`、产品与 Agent 界面原语、微模式、纸张质感配方，以及可执行的 craft / IA 清单。它不是灵感图库；先按任务选一条路由，再只取需要的机制。

在线版本：[lizliz.xyz/templates](https://lizliz.xyz/templates)；仓库：[lizliz404/design-templates](https://github.com/lizliz404/design-templates)。

## What’s Inside

`templates/README.md` 是唯一的 pack 主路由：资产归属、增删改规则、选择记录和验证要求都以它为准。这里和 `SKILL.md` 只链接到它，避免维护多份清单。

### 如何使用这个 pack

从 [pack 主路由](templates/README.md) 开始：先写 Selection record，再读取一个最小匹配资产，并用真实界面截图验证。

### 如何添加、修改、删除

维护约定和唯一主路由行都在 [pack 主路由](templates/README.md)；不要为同一批资产再建第二份索引。

### 产品任务

B2B 管理台、Agent UI、onboarding、营销 landing、个人站、服务承接页、产品搜索和图标系统都从 [pack 主路由](templates/README.md) 按任务进入。

### Agent / motion chrome

Beautiful UI 的 Agent 原语、thinking orb、Paper Shaders、ThreeUI hero 和 UI SFX 在 [pack 主路由](templates/README.md) 相邻展示：它们服务同一类 AI surface chrome，但保留各自的文件夹、来源和复用边界。

### Decks / diagrams

演示 deck、结构图和说明图先走 visual-economy，再按需进入 [pack 主路由](templates/README.md) 中的 deck / shader 路由。

### Craft / tokens

高杠杆检查、字体、颜色与表面、i18n、IA / user journey 的入口在 [pack 主路由](templates/README.md)。

### 灵感书签

[inspiration-sources.md](templates/inspiration-sources.md) 只做任务化书签；查完回到 [pack 主路由](templates/README.md) 选资产，不镜像外站。

### 已知缺口

完整的 B2B 后台模板、可直接安装的表格组件，以及跨静态站 / React landing 的统一规则仍是明确缺口，详见 [pack 主路由](templates/README.md)。

## 获取与使用

```bash
curl -LO https://lizliz.xyz/templates-pack.zip
unzip templates-pack.zip

git clone https://github.com/lizliz404/design-templates.git
cd design-templates
```

```text
Open design-templates/templates/README.md — I need an agent approval card and a dense B2B table grammar.
```

```text
用 design-templates/templates/README.md 先选任务路由，再打开一个对应资产；不要从空白页面开始拼风格。
```

## 结构

```text
design-templates/
  README.md                 ← 对外入口；链接到唯一主路由
  SKILL.md                  ← Agent 入口；链接到唯一主路由
  templates/
    README.md               ← 唯一 pack 主路由与 CRUD 约定
    design/                 ← 页面 / 系统研究
    ui-patterns/            ← 微模式
    paper-shaders/          ← 氛围配方
    decks/                  ← visual-economy 与上游 deck
```

## 原则

1. 先选任务，再取机制；不要用无关模板硬套视觉。
2. IA 先于 chrome；可复用机制先于单页皮肤。
3. 构建通过不等于视觉验收；必须看关键状态和真实截图。
4. 外部站点只作书签，不把互联网复制进 pack。
5. 说明优先级是 prose → ASCII → Mermaid → deck / heavy frontend。

## License

MIT — Use it, modify it, share it.
