---
name: design-templates
description: >-
  Reusable design template pack for product jobs, AI surface chrome, decks,
  diagrams, and craft/IA checks. Canonical: https://github.com/lizliz404/design-templates
  · https://lizliz.xyz/templates
disable-model-invocation: true
---

# Design Templates

Public repo: [lizliz404/design-templates](https://github.com/lizliz404/design-templates)  
Site: [lizliz.xyz/templates](https://lizliz.xyz/templates)  
唯一 pack 主路由：[templates/README.md](templates/README.md)

## 何时加载

当任务涉及 B2B / Agent UI、onboarding、landing、个人站、服务入口、产品搜索、图标系统、deck / diagram，或设计 token / IA / i18n 工艺时加载。先读主路由，选择最小匹配资产；不要把本文件当作第二份资产索引。

## Key paths

### 如何使用这个 pack

[Selection record 与验证约定](templates/README.md)

### 如何添加、修改、删除

[唯一主路由与 CRUD 约定](templates/README.md)

### 产品任务

[B2B admin、Agent UI、onboarding、landing、personal、service entry、search、icons](templates/README.md)

### Agent / motion chrome

[Beautiful UI primitives、thinking orb、Paper Shaders、ThreeUI hero、UI SFX](templates/README.md)

### Decks / diagrams

[visual-economy、deck templates 与 diagram routing](templates/README.md)

### Craft / tokens

[checklist、type、color、i18n、IA](templates/README.md)

### 灵感书签

[inspiration-sources.md](templates/inspiration-sources.md)

### 已知缺口

[当前缺口与回填规则](templates/README.md)

### Sibling skill

[landing-page-replication-v5 软路由](templates/sibling-routes.md) — 可测量营销 / WebGL 复刻走 agent-skills；本 pack 只提供 theater 资产。

## 更新

```bash
git clone https://github.com/lizliz404/design-templates.git
cd design-templates && git pull
# maintainers after editing templates/:
bash scripts/sync.sh
```
