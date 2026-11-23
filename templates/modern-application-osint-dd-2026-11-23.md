---
name: modern-application-osint-dd-2026-11-23
description: >-
  现代应用全生命周期能力地图与独立技术尽调。Use when 从零构建应用、比较全栈脚手架、审查架构复杂度、自托管与托管取舍，或选择数据、身份、任务、AI、交付和运维方案；不把前端或社交帖的工具名单当作研究边界。
---

# 构建现代应用到底需要什么：能力地图与跨层技术尽调

核验日期：2026-11-23，Asia/Shanghai。本文是完整应用的主报告。[UI 技术分册](./reading-notes/ui-frontier-osint-dd-2026-11-23.md)只负责渲染、组件、前端数据与 UI 验证，不是全栈选型的替代品。

**先给答案：现代应用需要有人承担完整的产品、计算、数据、安全、交付与持续运行责任，不需要默认安装一整套分布式系统。** 静态内容可能只需构建产物、CDN 和域名；有账户和持久数据的应用才需要身份、授权与数据库；离线协作、长流程、语义检索、GPU、计费、多地域则分别由真实需求触发。

本轮按能力独立发现候选，再回看六条输入帖。跨 Python、Ruby、PHP、JVM、.NET、Go、Rust、BEAM 和 JavaScript 生态，整理 **74 个候选条目、16 份跨层重点分析、6 种最小应用组合**。有些条目是一个需要整体评价的组合，例如 Docker Compose/Caddy、ASP.NET Core/Aspire；不是声称恰好有 74 个独立产品。成熟基线和前沿候选明确分开。版本、服务端/SDK 差异与许可证在附录，事实链接放在对应位置。

## 1. 不先挑工具：先确定谁承担这些责任

### 1.1 几乎不能省的是责任，不是独立服务

1. **产品与领域。** 谁使用、完成什么、什么状态算成功、谁能做什么。明确核心实体、状态、不变量和不可逆操作。无障碍、语言、设备、时区、金额与本地化属于需求，不是最后换皮肤。
2. **边界与合同。** 客户端、服务端、外部供应商和数据库之间交换什么。明确输入校验、错误、幂等、兼容和版本。小应用手写一个清晰 HTTP API 也可以，不必先上代码生成或 RPC 平台。
3. **可信计算与持久性。** 有业务动作时要有受信执行处；有不能丢的状态时要有事务、迁移与恢复。浏览器校验、TypeScript 类型和模型输出都不是授权边界。
4. **安全与隐私。** TLS、最小权限、依赖更新、密钥处理、上传/输入限制和数据保留。公开匿名应用也需要安全，但不一定需要登录。
5. **可交付与可复现。** 能从明确版本构建、测试、发布和回滚。开发者电脑跑通不能证明生产配置正确。
6. **可观察、可恢复、有人负责。** 知道用户操作是否成功，错误是否增长；能从备份恢复；明确谁处理告警、续费、漏洞、供应商故障和数据删除。

这些可以由一个单体应用、一台服务器、一个托管平台和少量外部服务共同承担。把责任覆盖完整，与把服务数量堆满，是两回事。

### 1.2 一张完整能力地图

E 表示应明确承担的基本责任；C 表示满足触发条件才增加；R 表示通常不应作为初始默认。它们不是法律合规等级。

| 能力与触发条件 | 最小、低复杂度做法 | 购买/托管、自托管与构建的边界 | 何时才增加复杂度 |
| --- | --- | --- | --- |
| E：需求、领域、状态、合同 | 需求实例、模块边界、数据不变量、ADR；普通 HTTP + JSON | 领域规则自己掌握；OpenAPI/JSON Schema 等合同可共享 | 多客户端/多语言/公开 SDK 时考虑 TypeSpec、Connect、兼容检查 |
| E：用户界面；端形态是 C | 服务器 HTML 或已有 Web 栈；先满足可访问性与语言需求 | 移动可选原生/Expo/Flutter，桌面可选 Tauri/Wails/Electron | 必须离线、系统集成、应用商店或复杂手势时才新增原生端 |
| C：动态业务执行与 API | 熟悉框架的模块化单体；一个部署单元 | 托管应用平台换来运维减负；自托管标准容器；业务 API 自己拥有 | 团队边界、独立伸缩/隔离证据出现后，再拆服务 |
| C：持久业务数据 | SQLite 或 Postgres；事务、约束、参数化 SQL | 托管数据库买备份/维护能力；自托管需磁盘、更新、恢复责任 | 多写节点、严格可用性和真实容量触发分片/分布式数据库 |
| E：若有数据，就有 schema/迁移/访问控制 | 框架 migration + 数据库约束；查询可解释 | ORM、sqlc、Atlas 是实现选择，不是数据治理本身 | 多团队变更、漂移和危险迁移增多时加治理工具 |
| C：实时、离线、协作 | 普通刷新/SSE/WebSocket；服务端仍是事实来源 | 托管 realtime 或现有 DB 同步；本地优先需要新的数据合同 | 网络等待、断网编辑、多端合并确为体验核心时引入同步引擎 |
| C：搜索与检索 | SQL 索引、全文检索、过滤和分页 | 托管搜索省集群；独立引擎自托管需重建与容量；相关性由自己评估 | 错字容忍、语言、排序、规模或语义收益被评测证明后再加引擎/向量 |
| C：缓存 | HTTP 缓存、进程内有界缓存、正确索引 | CDN/托管缓存；Valkey 等自托管；失效策略是应用责任 | 数据库/外部 API 已测得瓶颈时加，不能把缓存当账本 |
| C：文件、媒体、摄取 | 对象存储 + 元数据；限制大小/类型；异步处理 | 可买 S3 类服务、转码/扫描服务；自建要运行存储与沙箱 worker | 大文件、OCR、转码、解析、保留与删除需要独立流程时增加组件 |
| C：账户、授权、多租户 | 框架会话/身份服务；每次请求查权限；租户范围进查询 | 身份优先采用成熟库/服务；不要自写密码学；领域授权仍自己建模 | SSO/组织、复杂关系权限、审计/撤权一致性触发 Keycloak/OpenFGA/SpiceDB |
| C：后台任务、定时、工作流、事件 | 一张任务表 + worker/cron；持久状态；幂等 | 托管队列/工作流买控制面；自托管需数据库、worker 和恢复 | 长时间等待、人工审批、补偿、版本化恢复触发 durable execution |
| C：AI 推理、agent、上下文、评测 | 一个可替换模型调用 + 超时/预算 + 固定工具 + 评测集 | 托管模型与自托管 GPU 分开算；业务工具权限不交给模型 | 多步状态/中断/恢复才加 agent graph；GPU 利用率与限制证明自托管价值 |
| C：集成、webhook、通知、邮件 | 明确合同 + 签名 + 重试 + 幂等；成熟投递供应商 | 邮件/SMS 通常买投递；Svix/Novu 可买或自托管；领域事件自己拥有 | 多渠道偏好、模板、投递审计增多后再引入通知平台 |
| C：收费、权益、计量 | 支付供应商托管页面；服务端核对事件与权益 | 支付、税务、风控不自建；Lago 等处理计量/账单，不代替支付网络 | 按量、套餐变更、抵扣/结算复杂到手工模型失效时才增加计费平台 |
| E：交付、网络、配置、密钥 | 域名/TLS、版本产物、一个部署目标；最小权限秘密注入 | 托管平台/容器主机/Compose 都可；IaC 与集中 secrets 按规模加入 | 多环境、多人改配置、审计要求触发 OpenTofu、Infisical 等 |
| E：可观测与变更控制 | 结构化日志、错误跟踪、健康/关键成功率、告警责任人 | 可买平台，或 OTel + 少量后端；分析/回放不是所有应用必需 | 调用链跨服务才需要深入 tracing；复杂实验才需要旗标平台 |
| E：测试、安全、依赖与 CI/CD | 核心规则单测、真实 DB 集成、关键 E2E、依赖更新 | 托管 CI 可以，测试标准不能外包给“绿灯”；供应链工具辅助 | 高风险状态加属性/模型测试；敏感系统按 OWASP ASVS 等做验证 |
| E：有价值数据的备份、恢复、生命周期与成本 | 定义 RPO/RTO、异地副本、恢复演练、删除与导出、账单负责人 | 托管备份仍需验证恢复范围；自托管要保护备份和解密密钥 | 业务损失预算要求高可用时才加入副本、故障切换和多地域 |
| R：默认微服务/Kubernetes/服务网格/全量事件溯源 | 先不加 | 它们可以解决真实组织或系统问题，不是“现代”的入场券 | 独立部署、隔离、平台团队与运维能力都能证明需求时再选 |

### 1.3 一个足够现代的最小动态应用

```text
浏览器/客户端
    │ HTTPS
应用：页面 + API + 领域规则 + 授权
    ├── SQL 数据库（如果需要持久状态）
    ├── 对象存储（如果有文件）
    └── worker（如果有不能放在请求内完成的任务）

横切责任：测试和发布 / 密钥 / 日志和告警 / 备份恢复 / 数据保留 / 成本所有者
按需外接：身份、邮件、支付、模型提供者
```

这是部署责任图，不是说必须拆成六个容器。SQLite 可以在应用进程内；数据库可以托管；worker 可以复用同一代码仓库。相反，把所有东西压进一台机器，也不能免除磁盘故障、误删、密钥丢失和离机恢复。[SQLite 适用条件](https://sqlite.org/whentouse.html) · [Postgres 备份](https://www.postgresql.org/docs/current/backup-dump.html)

## 2. 先知道哪些“新”真的改变了成本

- **代码定义基础设施与本地依赖。** Encore/Aspire 让服务和依赖关系可执行、可观察；但自动生成部署不等于替你设计权限、容量与恢复。
- **持久执行。** Temporal、Restate、DBOS 把“进程退出后继续”变成系统能力；它们的服务数量、日志与数据库责任、编程约束和许可证差异很大。
- **数据库靠近用户与进程。** SQLite、PGlite、Turso 与数据库同步把部分读写移出网络路径；代价转移到副本、权限、冲突与升级，不是让分布式一致性消失。
- **合同生成和授权模型。** TypeSpec、Connect、sqlc、OpenFGA/SpiceDB 将一些隐含约定变成可检查输入；需要维护的合同并没有自动消失。
- **统一平台与成熟一体式框架。** Supabase/Convex 等减少接线；Django/Rails/Laravel 很早就在减少接线。后者不是因为不新就缺乏工程价值。
- **标准化可观测与基础设施。** OpenTelemetry、OpenFeature、OCI 容器、OpenTofu 降低一部分供应商绑定，但数据库特性、身份、队列和云服务语义仍可能绑定。

以下 16 份分析解释机制和代价。第 4 节再给可查的候选表，不要求把它们全部装上。

## 3. 十六份跨层重点分析

### 3.1 TypeSpec 与 Connect：减少合同漂移，而不是让 schema 代替领域设计

[TypeSpec](https://typespec.io/docs/)用 API 描述语言和 emitters 生成 OpenAPI、客户端等产物；[Connect](https://connectrpc.com/docs/introduction/)围绕 Protobuf 提供可从浏览器与多语言服务使用的 RPC。它们解决合同传播方式，不在同一个抽象层，也不是都要安装。

默认可以从普通 HTTP + JSON + [OpenAPI](https://spec.openapis.org/oas/latest.html)/[JSON Schema](https://json-schema.org/overview/what-is-jsonschema)开始。跨语言、多个客户端、长期公开接口和重复代码生成，才让这两个项目的维护成本值得。事件可用 [CloudEvents](https://cloudevents.io/)统一封装，以 [AsyncAPI](https://www.asyncapi.com/docs)描述异步接口；不必因此部署一个事件总线。

要验证的是兼容、缺省值、字段删除、错误模型、重试、认证和分页，而不仅是生成代码能编译。类型正确的请求仍可能无权执行。生成产物应可重建，合同与业务实现分别测试。TypeSpec 的 npm 当前 1.18.0、MIT；Connect ES 2.3.0、Apache-2.0。不同语言 SDK 另有发布线。

**判断：多端合同漂移已成问题时试；单一小 API 不需要先建立 IDL 平台。** 原始 OpenAPI/Protobuf、测试和生成配置可以成为退出资产，不要只保留某供应商生成的代码。

### 3.2 Django、Rails、Laravel：完整应用的强对照组，不是“前沿的反面”

三者把路由、数据访问、迁移、会话、表单/校验、开发与测试约定集中起来，减少自行拼装认证、错误处理和升级组合的工作。[Django](https://www.djangoproject.com/start/) · [Rails](https://guides.rubyonrails.org/getting_started.html) · [Laravel starter kits](https://laravel.com/starter-kits)

这不是说任何 monolith 都比小框架好。若主要工作是 Python 数据处理 API，[FastAPI](https://fastapi.tiangolo.com/project-generation/)更贴近；JVM/.NET 团队可能更适合 Spring Boot/ASP.NET Core。Go 的 [net/http/Gin](https://go.dev/doc/tutorial/web-service-gin)和 Rust [axum](https://docs.rs/axum/latest/axum/)也能形成小而清晰的服务，但你要明确补齐哪些应用能力。

现实的比较指标是完成安全登录、权限、一次数据迁移、后台工作、生产发布和故障恢复需要自己维护多少代码，而不是一个空路由的吞吐量。Rails/Laravel 自带的现代前端路线也能减少不必要 SPA；API 与原生客户端需求则要另做合同。

**判断：以成熟框架作为交付成本基线。** 使用团队能维护的受支持版本，不把“最新主版本”设为默认。脚手架创建的是起点，管理后台、邮件配置和默认用户模型都要按风险调整。代码许可宽松并不包含免费托管或安全 SLA。

### 3.3 Encore 与 Aspire：依赖关系进入代码，但运行时和控制面要分开

[Encore](https://encore.dev/docs)让 Go/TypeScript 程序声明数据库、pub/sub、对象存储、缓存与定时等资源。本地 CLI 启动依赖并提供诊断，云平台可在所选云账户配置基础设施。它也能输出标准 Docker image，自己提供基础设施配置。[Docker 部署文档](https://encore.dev/docs/self-host/build)

[Aspire](https://aspire.dev/)把应用及依赖组织为 AppHost，提供开发启动、服务发现、配置与观测集成。当前已不应只按“给 .NET 用的本地 dashboard”理解：官方材料覆盖 Python、JavaScript/TypeScript 和多语言，且有 Docker Compose 发布目标。[模板](https://aspire.dev/get-started/aspire-sdk-templates/) · [Compose 部署](https://aspire.dev/deployment/docker-compose/)

二者的主要收益是让环境和依赖可重建，减少多人开发的隐式设置。区别在编程模型、语言与云平台整合，而不是“谁支持更多 logo”。Encore SDK/CLI 为 MPL-2.0 路线，云控制面另论；Aspire 核心 MIT，目标云资源仍要付费和维护。

**采用闸门：** 从源码建一个不依赖原平台的镜像/部署；替换一个数据库连接；查看秘密如何注入；验证生成配置能否审查和进入 CI。Docker 可导出不等于应用逻辑没有 SDK 绑定。[官方部署说明](https://encore.dev/articles/deploy-backend-kubernetes-managed-postgres)还明确：自托管镜像不负责自动运行数据库迁移或触发 cron，需要自己安排；基础设施连接的 TLS 也要显式配置。只需一个进程的脚本，不需要先写服务拓扑。

### 3.4 Phoenix/LiveView：先问能否把交互留在服务器

[Phoenix](https://hexdocs.pm/phoenix/overview.html)与 LiveView 使用 BEAM 进程和服务器维护的状态，通过连接更新客户端。它为在线实时应用提供了与重型客户端状态层不同的路线；不是将 React 换个语法。[安装](https://hexdocs.pm/phoenix/installation.html)

收益是可以让界面状态靠近领域规则与数据库，减少两端状态复制。代价是持续连接、服务器会话容量、延迟、重连、节点故障以及多人状态存放。服务器驱动 UI 与本地优先离线是不同承诺。不能因 LiveView 减少前端代码，就认定离线编辑和网络波动不需要设计。

Phoenix 当前 Hex 稳定线 1.8.17、MIT。与长连接方案一样，要用真实地理距离、移动网络和连接数测试，而不是只测本机页面。Rust/Go 的高吞吐服务、Phoenix 的并发模型和前端渲染器都不是同一赛道。

**判断：** 在线工作流、实时状态和服务端团队能力匹配时，是很强的非 React 对照；高保真离线画布不是默认用例。先保持模块化单体，跨节点一致性出现真实需求后再扩。

### 3.5 BaaS 四种取舍：Supabase、Appwrite、Convex、PocketBase 不等价

[Supabase](https://supabase.com/docs/guides/self-hosting)围绕 Postgres 组合身份、数据 API、Storage、Realtime 等；自托管是单项目形态，不包含所有云管理功能。官方明确说 CLI 本地开发栈不是生产自托管部署，不应直接暴露公网。

[Appwrite](https://appwrite.io/docs/advanced/self-hosting)提供数据库、身份、文件、函数等整合能力；采用它的数据/函数 API 后，要认真验证导出、迁移与版本升级。托管免安装，自托管要运行多服务，而不是只跑一个客户端 SDK。

[Convex](https://docs.convex.dev/self-hosting)把事务式函数、数据库和实时查询耦合，减少缓存与订阅接线，代价是较强的应用模型绑定。**客户端 npm 的 Apache-2.0 不能代表服务端许可。** 当前 [backend LICENSE](https://github.com/convex/convex-backend/blob/main/LICENSE.md)为 FSL-1.1-Apache-2.0，含竞争用途限制和未来转许可，不应笼统写成宽松开源。自托管可用不代表云控制面完全等价。

[PocketBase](https://pocketbase.io/docs/)把嵌入式 SQLite、身份、文件与后台收进小型程序，起步更轻。官方仍提醒 1.0 之前不保证完全兼容，不推荐生产关键应用，除非接受手工迁移。作者还公告迁移源代码/发布托管位置，旧 GitHub release 不能自动视为最新。[迁移公告](https://github.com/pocketbase/pocketbase/discussions/7841)

**判断：** 小团队可以有意识地买整合，但应先测试：导出业务数据、重建身份/权限、带走文件、在另一环境恢复，以及断开厂商控制面后哪些功能消失。不要同时采用两套 BaaS 来回避这道选择题。PocketBase 的轻量、Supabase 的 Postgres、Convex 的响应式都各有适用面，没有通用冠军。

### 3.6 Postgres、SQLite、PGlite、Turso、DuckDB：五种不同责任

[Postgres](https://www.postgresql.org/docs/current/)是多连接、多用户事务数据的稳健对照；[SQLite](https://sqlite.org/whentouse.html)是进程内数据库，减少服务运维，但写并发、文件位置、备份与远程访问方式要适配。单机、嵌入式或桌面应用采用 SQLite 并不“不现代”。

[PGlite](https://pglite.dev/docs/)把 Postgres 编译为 Wasm，以嵌入式方式运行；便于本地体验、测试和特定客户端数据场景，但不等于直接获得完整多进程 Postgres 服务或所有扩展兼容。[Turso](https://docs.turso.tech/introduction)同时存在 Rust 数据库引擎与 libSQL 相关客户端/服务线，不能只看名称就把两代引擎、嵌入式复制和云服务视为同一兼容合同。

[DuckDB](https://duckdb.org/docs/stable/)适合进程内分析、列式扫描和文件查询；不是默认的高并发 OLTP 账本。一个应用可以用 Postgres/SQLite 保存真相，用 DuckDB 做分析副本，但必须定义更新与隐私边界。

本轮 PostgreSQL 官方支持表已列 19.0，18.7 仍受支持；19.0 刚发布不意味着所有扩展、云服务和备份工具都应立即跟进。[版本政策](https://www.postgresql.org/support/versioning/) SQLite 官方当前变更页为 3.54.1；本轮机器内置 Python 用的却是 3.46.1。应用依赖的实际引擎版本比“系统上装了最新 CLI”更重要。

**判断：** 先按写入拓扑、数据规模、事务、部署与恢复选，不按“边缘”“Rust”“serverless”选。先证明一份数据能正确保存和恢复，再增加副本。

### 3.7 Drizzle、sqlc、Atlas：查询生成、ORM 与迁移治理要分开

[Drizzle](https://orm.drizzle.team/docs/overview)在 TypeScript 中表达 schema 与查询；[sqlc](https://docs.sqlc.dev/en/stable/)由 SQL 生成类型化访问代码；[Atlas](https://atlasgo.io/getting-started)管理 schema、迁移与漂移相关流程。它们不是一个“数据库层”产品的三个同名替代。

默认可用框架 ORM/migration 或直接 SQL。schema 类型检查不验证锁表时间、回填、数据量、约束或旧版本客户端兼容。重要变更应分 expand/contract：先兼容新旧读写，再回填，最后移除旧字段；需要有生产规模的验证与备份出口。

Atlas 尤其不能看到仓库 Apache-2.0 就认定所有发布功能都在这个许可下。[Community Edition 说明](https://atlasgo.io/community-edition)明确区分 Apache-2.0 的精简 CE 与标准分发/Pro，后者涉及 MSA、登录和许可。迁移 lint、测试、CI 等能力要按实际 edition 核对。

**判断：** 按“哪一类错误已经很贵”选择工具。SQL 优先团队可以用 sqlc；TS 团队可以用 Drizzle；复杂 schema 治理再看 Atlas。迁移 SQL、版本记录与回填程序必须由自己持有，不能只依赖某服务的远程状态。

### 3.8 身份与授权：Better Auth、Keycloak、OpenFGA、SpiceDB 不做同一件事

[Better Auth](https://www.better-auth.com/docs/introduction)是应用侧认证框架；[Keycloak](https://www.keycloak.org/guides)是可独立部署的身份/联合登录系统。前者可减少应用内认证接线，后者适合集中 OIDC/SSO、组织身份管理。自托管 Keycloak 也要管理生产配置、数据库、邮件、升级与可用性。

[OpenFGA](https://openfga.dev/docs/)和 [SpiceDB](https://authzed.com/docs/spicedb/getting-started/first-steps)把关系型授权模型与权限判断独立出来。它们不负责证明用户是谁，也不替代应用的租户建模。普通角色+资源归属已经够用时，在 SQL/领域层明确检查更简单。

必须单独验证：同一用户跨租户、对象移动、共享链接、继承权限、撤权后缓存、后台任务和批量导出。数据库 RLS 可作为额外约束，但 service/admin 凭据绕过 RLS 时，应用必须补上等价责任。前端隐藏按钮、JWT 带 tenantID、TypeScript 类型都不等于授权。

**判断：** 不自己写密码哈希和身份协议；授权规则则不能完全交给工具命名。迁移身份很难，密码/凭据可导出性、外部身份映射、组织关系和审计记录要在采用前问清。需要严格撤权语义时，读一致性和缓存策略比 API 易用性更重要。

### 3.9 pgmq、DBOS、Restate、Temporal：队列和持久工作流分清再选

[pgmq](https://pgmq.github.io/pgmq/)以 Postgres 提供持久队列，适合已有数据库、希望减少服务数量的任务系统。可见性超时、重试、死信/归档、幂等和 worker 仍需应用设计；队列不是自动拥有长期流程、补偿和版本化。

[DBOS](https://docs.dbos.dev/architecture)用库和 Postgres 记录工作流状态，减少独立编排服务；生产恢复、可用性与保留策略仍应看其 [checklist](https://docs.dbos.dev/production/checklist)，不把“只需 Postgres”理解成没有运行责任。MIT SDK 与可选控制面分开。

[Restate](https://docs.restate.dev/references/architecture)通过 durable journal、重放和状态/调用模型让服务可恢复；提供自己的服务端日志与存储体系。当前 [服务端许可](https://github.com/restatedev/restate/blob/main/LICENSE)是 BSL 1.1，附加授权允许多类实际生产用途，但限制公开转售其平台 API，四年后转换 Apache-2.0。SDK MIT 不改变服务端许可。

[Temporal](https://docs.temporal.io/)有工作流历史、确定性重放、活动重试、定时、信号与版本化等成熟模型。需要 worker 与 Temporal service，云服务可代运维。**不应照抄竞争者说法，认为所有 Temporal 都必须另跑 Cassandra + Elasticsearch。** 当前官方说明基本运行仅必需持久数据库，具体 visibility 支持按版本/配置核对；SQLite 只用于开发测试。[Persistence](https://docs.temporal.io/temporal-service/persistence)

**共同限制：外部副作用不会因为工作流可恢复就自动全局 exactly-once。** 发信、扣款、调用第三方 API 应使用幂等键、事务性 outbox、状态查询与必要补偿。重放时不能重复执行未被框架记录的随机、时间或 I/O。先用简单队列；只有业务需要跨崩溃等待/恢复，才付工作流模型与运维成本。

### 3.10 实时与 local-first：先决定事实来源，再决定同步协议

[Zero](https://zero.rocicorp.dev/docs/introduction)与 [Electric](https://electric-sql.com/docs/intro)适合讨论已有数据库的数据如何靠近客户端；[LiveStore](https://docs.livestore.dev/overview/when-livestore/)则以事件日志与本地 SQLite materialization 组织新应用。UI 分册有详细机制，这里强调应用级代价。

WebSocket 只是传输，不定义冲突、权限、删除和恢复。在线即时更新也不等于离线可写。CRDT 解决某些合并问题，不自动解决“谁有权修改”“余额能否为负”或“撤销分享后设备里已经复制的数据”。

最便宜的增长路径通常是轮询/SSE、乐观 UI、明确服务端版本与冲突提示；只有断网编辑与高交互等待是核心问题时，才引入本地数据库和同步系统。已有 Postgres 与新建事件模型的迁移风险不同。

**采用闸门：** 空缓存启动、断网修改、两个设备同时写、旧客户端升级、撤权、删除与重建、客户端缓存清理、备份恢复全部可演示。复制数据的范围必须有界。不要为了“local-first”把整个多租户数据库下发到客户端。

### 3.11 检索：Postgres 全文/pgvector、Meilisearch、Typesense、Qdrant 分层评价

先做 SQL 过滤、合适索引、分词/全文检索和可解释排序。[pgvector](https://github.com/pgvector/pgvector)在 Postgres 内增加向量距离与索引，能让事务数据、权限过滤和检索靠近。独立 [Meilisearch](https://www.meilisearch.com/docs)、[Typesense](https://typesense.org/docs/)更值得在面向用户的容错、即时搜索与相关性上评估；[Qdrant](https://qdrant.tech/documentation/)面向向量检索与过滤等能力。

向量不是默认更高质量。精确编号、短词、数字、否定、语言、时间与权限条件常需词法和结构化逻辑。语义召回、混合排序与 reranker 应通过有标注任务集证明收益。指标要包括召回、排序、无结果、错误放宽、延迟和每次成功任务成本，不能只展示相似度。

独立索引是派生数据，需要定义变更捕获、延迟、删除、重建与版本。ANN 加过滤可能影响候选数量，尤其要测试高选择性权限条件，而不是事后从不足的结果里过滤。向量/全文索引和原库备份不是同一个问题。

**判断：** 小规模先试数据库内方案，需求明确再拆引擎。Typesense GPL-3.0、Meilisearch 社区核心 MIT、Qdrant Apache-2.0，不同云/企业版另论。没有实际评测，本报告不宣布哪家“检索最好”。

### 3.12 文件与媒体：对象存储不是完整摄取流水线

[RustFS](https://docs.rustfs.com/)提供 S3 兼容对象存储，Apache-2.0；本轮已有 1.0.6 正式版本号，不沿用旧 beta 印象，但也不据版本号推导灾难恢复能力。[OpenDAL](https://opendal.apache.org/)统一多种存储后端的访问接口，它是访问层，不是另一个存储服务。

[Docling](https://docling-project.github.io/docling/)处理文档解析与结构化；[libvips](https://www.libvips.org/)处理图像；[FFmpeg](https://ffmpeg.org/legal.html)处理媒体。Docling 代码 MIT，模型独立许可；FFmpeg/libvips 的 LGPL/GPL 与具体构建/链接相关，不能把命令行工具统称为 MIT。

最小流水线应区分：上传授权 → 临时/隔离对象 → 大小、内容与压缩展开限制 → 沙箱解析/扫描 → 结果与版本 → 可重试发布 → 保留/删除。文件名、Content-Type、PDF 文本和模型读到的文档都不可信。恶意文档不能因为由用户上传，就获得服务器网络/命令权限。

**判断：** 小团队优先买可靠对象存储与必要的转码投递能力。自建 RustFS 要证明磁盘故障、恢复、升级、加密密钥和实际 S3 API 子集。OpenDAL/S3 接口降低接线成本，不保证任意两个厂商在一致性、权限、事件和生命周期上可互换。

### 3.13 AI：PydanticAI、LangGraph、vLLM、promptfoo 不该一起默认安装

[PydanticAI](https://ai.pydantic.dev/)用类型化模型、工具、依赖与结果验证组织调用；[LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)适合明确需要图式状态、持久化、人工参与与恢复的 agent 工作流；[vLLM](https://docs.vllm.ai/en/latest/)是推理服务，解决模型运行和调度，不负责业务安全。[promptfoo](https://www.promptfoo.dev/docs/intro/)用于评测/红队相关流程，不是运行时授权层。

默认先实现一个可替换模型接口、明确工具白名单、预算与超时、结构化结果和失败降级。只有多步状态确实需要，才加 agent graph。只有硬件、利用率、模型许可、隐私与运维收益能说明，才自托管推理；低利用率 GPU 与运维成本可能高于 API。

上下文应有数据来源、租户、时间和可删除性；检索输出和网页内容不成为工具指令。工具调用必须在受信服务端再次授权；重要副作用有确认、幂等和审计。模型输出 schema 正确不代表事实正确或符合用户意图。

**判断：** 先做固定样本与失败分类，再做 agent。评测版本应包括模型、prompt、工具、数据与检索配置；记录重试后的完整成本。框架 MIT/Apache-2.0 不给所下载模型权重、训练数据或外部 API 授权。本文没有调用付费模型、训练或运行 GPU benchmark。

### 3.14 简单交付：Compose/Caddy、Kamal、Coolify、OpenTofu 各在一层

[Docker Compose](https://docs.docker.com/compose/)描述一台/一个部署环境里的容器关系；[Caddy](https://caddyserver.com/docs/)处理 Web 入口与自动 HTTPS 等。它们可以是完整小应用的正式起点，但 Compose 不是跨机器高可用调度器，持久卷也不是备份。

[Kamal](https://kamal-deploy.org/)帮助部署容器化应用；[Coolify](https://coolify.io/docs/)提供自托管的平台控制面；[OpenTofu](https://opentofu.org/docs/intro/)声明基础设施生命周期。这三者分别改变发布操作、平台管理与资源管理，不应当作三个同类 PaaS 排名。

托管平台的价值包括补丁、证书、发布回滚和支持；自托管的账单包括主机、备份、监控、值班和控制面本身。单人团队不要为了“便宜”在同一台小机器上同时自托管应用、数据库、错误平台、分析平台、邮件和秘密平台。

**采用闸门：** 从版本化产物部署到新机器；旧版本能否使用新 schema；备份能否离机恢复；控制面不可用时如何运维。密钥不要进入镜像/仓库/日志；CI 优先短期身份、最小权限和固定动作版本。[GitHub Actions 安全指南](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)

### 3.15 观测：OpenTelemetry 与 SigNoz/Sentry/PostHog 不在同一层

[OpenTelemetry](https://opentelemetry.io/docs/)定义和实现遥测采集/传递，减少仪表与某个后端的绑定，不存储所有数据。[SigNoz](https://signoz.io/docs/)是接收和查询平台之一；[Sentry](https://develop.sentry.dev/self-hosted/)聚焦错误等开发诊断；[PostHog](https://posthog.com/docs/self-host)包含产品分析、回放与实验等。

默认先观察用户操作成功、错误、延迟、队列积压、数据库容量、备份年龄与关键外部依赖。多服务再扩 tracing；回放/分析要有隐私、同意、采样和保留边界。请求日志不应该默认包含密码、令牌、原始敏感文档或完整模型上下文。

自托管代价很实在：当前 Sentry 文档列至少 4 核、16 GB RAM 加 16 GB swap，建议 32 GB；PostHog hobby 部署列约 4 vCPU、16 GB RAM、30 GB 以上存储，且明确无正式自托管支持/保证，不提供带版本承诺的自托管发布。[Sentry 要求](https://develop.sentry.dev/self-hosted/) · [PostHog 限制](https://posthog.com/docs/self-host)

**许可也不能从 SDK 推断服务端。** Sentry Node SDK MIT，但当前 server 为 FSL-1.1-Apache-2.0；SigNoz/PostHog 的企业目录另有条款。**判断：** 先买或只运行自己需要的最小后端，不把“可自托管”误解成适合所有团队。OTel 与采样/脱敏策略可以保留退出选项。

### 3.16 Pigsty 与 pgBackRest：把“数据库跑着”升级为“可运维、可恢复”

[Pigsty](https://pigsty.io/docs/about/)把 PostgreSQL、扩展、监控、高可用/备份等运维组件组合为发行与部署体系；[pgBackRest](https://www.pgbackrest.org/user-guide.html)处理 PostgreSQL 备份、WAL 归档与恢复相关工作。两者可以互补，但不是不用学习数据库运维的许可证。

Pigsty 4.6.0 的默认 PG 基线是 18.7；发布说明中的扩展目录数不意味着全部安装、全部兼容或每个系统平台都有包。核心编排 Apache-2.0，不代表所有扩展许可相同。[发布](https://github.com/pgsty/pigsty/releases)

恢复要覆盖数据库、对象文件、密钥、schema/应用版本和外部身份映射。[Supabase 文档](https://supabase.com/docs/guides/platform/backups)明确数据库备份不包含 Storage 对象本身，元数据存在不表示文件能回来。副本/高可用防某些故障，不防业务误删、勒索、密钥丢失和错误迁移。

**判断：** 先定义可以丢多少数据、可以停多久，再采购或自建。离机、可解密、可读取、可重建并经过演练才算恢复能力。托管数据库也要验证导出、跨供应商恢复、保留/删除、扩展兼容和账单；不用付费平台不是消除了这些责任。

## 4. 候选地图：74 个有明确位置的条目

读法：**基线**是成熟对照，不代表适合所有场景；**重点**指机制值得评估，不代表可跳过验证；**审慎**表示发布、许可、运维或模型变化尤其需要闸门。维护方由所链官方仓库标识；可取得的实际发布日期、版本与 SDK/服务端区分见附录 A。许可证是代码边界摘要，不是法律意见；云、企业模块、模型和传递依赖另核。

“入口”链接是实际文档/初始化材料，不意味着本轮逐一执行过。能用成熟基线交付，就没有为了覆盖表格而迁移的理由。

### 4.1 合同、客户端与应用框架（1–19）

| # / 项目、文档与仓库 | 解决的问题、机制与入口 | 补充/替代什么；代价与不适用 | 成熟度、许可与维护边界 |
| --- | --- | --- | --- |
| 1 [TypeSpec](https://typespec.io/docs/) · [repo](https://github.com/microsoft/typespec) | IDL + emitters 生成合同与 SDK；入口见 [getting started](https://typespec.io/docs/) | 补合同传播，不替代领域规则；小单 API 引入编译器/插件未必划算 | 重点；Microsoft 主导，MIT；compiler 1.x，需对齐 emitter 版本 |
| 2 [Connect](https://connectrpc.com/docs/introduction/) · [repo](https://github.com/connectrpc/connect-es) | Protobuf RPC、浏览器/多语言互通；[TS 入门](https://connectrpc.com/docs/web/getting-started/) | 补跨端调用；替代手写类型合同；生成工具和协议演进有成本 | 重点；ConnectRPC 项目，Apache-2.0；各语言/生成器版本分开 |
| 3 [Expo](https://docs.expo.dev/) · [repo](https://github.com/expo/expo) | React Native 工具链、路由、原生构建/更新；[create](https://docs.expo.dev/get-started/create-a-project/) | 补移动端；原生模块、权限、签名/商店仍要处理；不替代后端 | 基线；MIT 核心；EAS 是可选商业服务，要验证本地构建/发布出口 |
| 4 [Flutter](https://docs.flutter.dev/) · [repo](https://github.com/flutter/flutter) | Dart + 自有 UI 渲染/跨端工具链；[安装](https://docs.flutter.dev/install) | 跨端 UI 路线，不是 Web DOM 兼容层；原生插件、体积/可访问性/端差异要实测 | 基线；Google/社区，BSD-3-Clause；[archive](https://docs.flutter.dev/install/archive)区分 stable/beta，本轮未成功解析官方版本 manifest，不填猜测值 |
| 5 [Tauri](https://v2.tauri.app/) · [repo](https://github.com/tauri-apps/tauri) | 系统 WebView + Rust 受控命令/插件；[create](https://v2.tauri.app/start/create-project/) | 替代部分 Electron 用例；需 Rust、系统依赖、签名与平台测试；WebView 不完全一致 | 基线/重点；MIT 或 Apache-2.0；capabilities 要最小授权，不开放任意本机命令 |
| 6 [Wails](https://v3.wails.io/) · [repo](https://github.com/wailsapp/wails) | Go 后端绑定 Web UI，桌面打包；[安装](https://v3.wails.io/getting-started/installation/) | Go 团队桌面路线；系统 WebView、绑定和平台生命周期是成本 | 重点；MIT；v3 已有稳定 3.1.0，不把 v3.2 nightly 或旧 beta 文档当稳定版 |
| 7 [Django](https://docs.djangoproject.com/) · [repo](https://github.com/django/django) | ORM/迁移/会话/后台/安全约定；[start](https://www.djangoproject.com/start/) | 一体式 Web 基线；异步密集/特殊协议需额外设计；不默认 SPA | 基线；基金会/社区，BSD-3-Clause；受支持线与最新线区别见官方政策 |
| 8 [FastAPI](https://fastapi.tiangolo.com/) · [repo](https://github.com/fastapi/fastapi) | Python 类型 + 校验 + OpenAPI；[全栈模板](https://github.com/fastapi/full-stack-fastapi-template) | API/数据团队起点；数据库、认证、任务并非由一个路由库自动配齐 | 基线；MIT；模板是独立维护资产，SQLModel/React 等依赖也要升级 |
| 9 [Rails](https://guides.rubyonrails.org/) · [repo](https://github.com/rails/rails) | 约定式完整 Web 框架，Active Record/迁移与服务端交互路线；[start](https://guides.rubyonrails.org/getting_started.html) | 减少拼装；接受 Ruby/框架约定；不以单路由 benchmark 决定采用 | 基线；MIT；数据库/队列的实际适配与部署配置由应用确认 |
| 10 [Laravel](https://laravel.com/docs) · [repo](https://github.com/laravel/framework) | PHP 全栈约定、认证 starter、队列/通知等；[kits](https://laravel.com/starter-kits) | 一体式替代零碎拼装；不等于所有付费产品/托管都免费 | 基线；MIT 核心；React/Vue/Livewire 套件与认证供应商可选项要核对 |
| 11 [Spring Boot](https://spring.io/projects/spring-boot) · [repo](https://github.com/spring-projects/spring-boot) | JVM 自动配置与生态集成；[Initializr](https://start.spring.io/) | 现有 JVM 组织的强基线；依赖、内存与版本支持线要算，不宜为小脚本引入全生态 | 基线；Apache-2.0；社区支持与商业支持不相同 |
| 12 [ASP.NET Core](https://learn.microsoft.com/aspnet/core/) / [Aspire](https://aspire.dev/) · [repos](https://github.com/dotnet/aspnetcore) / [AppHost](https://github.com/dotnet/aspire) | 前者是应用框架，后者组织多语言依赖/开发与部署；[模板](https://aspire.dev/get-started/aspire-sdk-templates/) | 不能把运行时、AppHost 与 Azure 托管混为一谈；单进程无需先分布式化 | 基线+重点；MIT；Aspire 有独立版本线，云资源与集成另计 |
| 13 [Phoenix](https://hexdocs.pm/phoenix/overview.html) · [repo](https://github.com/phoenixframework/phoenix) | BEAM + Channels/LiveView 的服务端实时路线；[安装](https://hexdocs.pm/phoenix/installation.html) | 可减少客户端状态复制；不等于离线同步；长连接容量、重连与状态归属要测 | 基线/重点；MIT；Elixir/OTP/Postgres 等运行依赖需共同维护 |
| 14 [Hono](https://hono.dev/docs/) · [repo](https://github.com/honojs/hono) | Web Standards 风格的小型路由，可用于不同 JS runtimes；[start](https://hono.dev/docs/getting-started/basic) | 轻 API/边缘入口；不自带完整应用所有能力；应用调用云 bindings 后不自动可迁移 | 基线；MIT；runtime adapter 与供应商服务另核 |
| 15 [Encore](https://encore.dev/docs) · [repo](https://github.com/encoredev/encore) | 代码声明 API/基础设施、本地环境与诊断；[Docker 出口](https://encore.dev/docs/self-host/build) | 替代部分胶水/IaC 接线；仍要做业务与恢复；有 SDK/云模型迁移成本 | 重点；MPL-2.0 核心；Encore Cloud 商业控制面与自托管不等价 |
| 16 [Supabase](https://supabase.com/docs) · [repo](https://github.com/supabase/supabase) | Postgres 中心的身份、API、文件、Realtime；[自托管](https://supabase.com/docs/guides/self-hosting/docker) | 换集成速度；单项目自托管缺部分云功能；需 DB、文件和密钥恢复 | 基线平台；Apache-2.0 主仓库、组件分别许可；本地 CLI 栈不是生产栈 |
| 17 [Appwrite](https://appwrite.io/docs) · [repo](https://github.com/appwrite/appwrite) | 身份、数据库/文件/函数等 API 整合；[安装](https://appwrite.io/docs/advanced/self-hosting) | 换整合速度；Appwrite API/权限/数据模型退出要演练；自托管多服务 | 基线平台；BSD-3-Clause 核心；Cloud 配额/企业功能另核 |
| 18 [PocketBase](https://pocketbase.io/docs/) · [repo/旧渠道](https://github.com/pocketbase/pocketbase) | SQLite + 身份/后台/文件的小型后端；官方文档含下载/扩展 | 轻应用/原型少服务；官方不建议未经准备用于生产关键应用；大规模与迁移受限 | 审慎；MIT、pre-1.0；作者迁移发布平台，不能只看旧 GitHub SDK/release |
| 19 [Convex](https://docs.convex.dev/) · [backend](https://github.com/convex/convex-backend) | 响应式查询 + 事务函数 + 整合数据后端；[self-host](https://docs.convex.dev/self-hosting) | 替代一部分 API/缓存/订阅接线；业务函数与存储模型绑定较深 | 重点/许可闸门；server FSL-1.1-Apache-2.0；客户端 Apache-2.0；非宽松 OSS 全栈 |

### 4.2 数据、同步、检索与存储（20–37）

| # / 项目、文档与仓库 | 机制与实际入口 | 替代/互补、迁移成本与不适用 | 成熟度/许可边界 |
| --- | --- | --- | --- |
| 20 [PostgreSQL](https://www.postgresql.org/docs/current/) · [源码](https://git.postgresql.org/gitweb/?p=postgresql.git) | 事务、约束、SQL、扩展；[安装](https://www.postgresql.org/download/) | 动态应用默认对照；不需要数据就不安装；扩展/云服务会削弱可移植性 | 基线；PostgreSQL License；19.0 与受支持旧线并存 |
| 21 [SQLite](https://sqlite.org/docs.html) · [源码](https://sqlite.org/src/) | 进程内 SQL/单文件；[适用范围](https://sqlite.org/whentouse.html) | 少服务、嵌入式/单机；写并发、共享文件系统和主机故障是边界 | 基线；public domain；应查应用内链接版本，不只查 CLI |
| 22 [PGlite](https://pglite.dev/docs/) · [repo](https://github.com/electric-sql/pglite) | Wasm Postgres 嵌入 JS；文档含 package 与持久化示例 | 本地/测试/客户端 SQL；不是完整远程多用户 Postgres 或全部扩展兼容 | 重点；Apache-2.0；pre-1.0、Wasm/存储 adapter 要测 |
| 23 [Turso](https://docs.turso.tech/introduction) · [engine](https://github.com/tursodatabase/turso) / [libSQL](https://github.com/tursodatabase/libsql) | Rust 数据库新引擎及云/嵌入数据路线；按具体 SDK 文档接入 | 补靠近进程的数据访问；不能混用 Turso DB 与 libSQL 的兼容/复制承诺 | 重点/审慎；MIT 代码线，云服务另论；新引擎 pre-1.0 |
| 24 [DuckDB](https://duckdb.org/docs/stable/) · [repo](https://github.com/duckdb/duckdb) | 进程内列式分析与文件扫描；文档含 Python/CLI 接入 | 补分析与导出；不是多用户事务主库的通用替换；大扫描需资源限制 | 基线/重点；MIT；扩展来源/版本与运行权限另核 |
| 25 [Drizzle](https://orm.drizzle.team/docs/overview) · [repo](https://github.com/drizzle-team/drizzle-orm) | TS schema/查询与迁移工具；[入门](https://orm.drizzle.team/docs/get-started) | ORM/查询表达选择；不自动保证数据约束、无锁迁移或运行时安全 | 基线；Apache-2.0；ORM/Kit/数据库 driver 版本要对齐 |
| 26 [sqlc](https://docs.sqlc.dev/en/stable/) · [repo](https://github.com/sqlc-dev/sqlc) | SQL → 类型化调用代码；[安装](https://docs.sqlc.dev/en/stable/overview/install.html) | SQL 优先团队减少手写扫描；不提供完整 ORM/迁移平台 | 基线；MIT；生成语言插件/解析数据库能力各自核对 |
| 27 [Atlas](https://atlasgo.io/getting-started) · [repo](https://github.com/ariga/atlas) | schema/migration/漂移治理；[CE 区分](https://atlasgo.io/community-edition) | 补 schema 变更流程；不替代业务回填设计；标准版与 CE 功能不同 | 重点；CE Apache-2.0，标准二进制 MSA/Pro 另论 |
| 28 [Zero](https://zero.rocicorp.dev/docs/introduction) · [repo](https://github.com/rocicorp/zero) | 服务器数据同步到客户端可查询缓存；官方文档含 quickstart | 补低延迟读写；增加同步服务、授权与缓存生命周期；不是普通查询库替换 | 重点试验；Apache-2.0；发布与框架适配见 UI 分册 |
| 29 [Electric](https://electric-sql.com/docs/intro) · [repo](https://github.com/electric-sql/electric) | 将 Postgres 数据按 shapes 同步；[quickstart](https://electric-sql.com/docs/quickstart) | 补已有库的读取/同步路径；写入、授权与离线冲突必须看当前组合 | 重点试验；Apache-2.0；不要套用旧代产品的架构 |
| 30 [LiveStore](https://docs.livestore.dev/) · [repo](https://github.com/livestorejs/livestore) | 事件日志 + 本地 SQLite materialization；[取舍](https://docs.livestore.dev/overview/when-livestore/) | 新应用 local-first 模型；迁移事实来源与事件升级成本较高 | 审慎试验；Apache-2.0；不是已有远程库的透明缓存层 |
| 31 [Postgres FTS](https://www.postgresql.org/docs/current/textsearch.html) + [pgvector repo/docs](https://github.com/pgvector/pgvector) | 词法检索 + 同库向量距离/索引；README 含安装 | 补关系型数据检索；ANN/过滤/相关性需评测；不天然胜过全文 | 基线+重点；PostgreSQL License；扩展与服务器支持线分开 |
| 32 [Meilisearch](https://www.meilisearch.com/docs) · [repo](https://github.com/meilisearch/meilisearch) | 独立用户搜索、容错/排序等；官方 quickstart | 替代简单 LIKE/全文的部分体验；索引同步与重建增加服务 | 基线；社区核心 MIT；Cloud/企业模块另核，不能推导全功能免费 |
| 33 [Typesense](https://typesense.org/docs/) · [repo](https://github.com/typesense/typesense) | 即时搜索、过滤和排序；官方入门/部署资料 | 同类独立搜索备选；需容量、索引更新与相关性验证 | 基线；GPL-3.0 server；客户端/Cloud 不同边界 |
| 34 [Qdrant](https://qdrant.tech/documentation/) · [repo](https://github.com/qdrant/qdrant) | 独立向量检索、payload/filter；[quickstart](https://qdrant.tech/documentation/quickstart/) | 大量向量/独立伸缩需求再拆；增加副本、索引与恢复成本 | 基线/重点；Apache-2.0；不是 RAG 质量保证 |
| 35 [Valkey](https://valkey.io/docs/) · [repo](https://github.com/valkey-io/valkey) | Redis 兼容谱系的内存 KV、缓存/数据结构；[下载](https://valkey.io/download/) | 已证实热点/队列等需求的选择；不能代替事务真相；兼容按命令实测 | 基线；Linux Foundation 项目、BSD-3-Clause；持久化/HA 仍需配置 |
| 36 [RustFS](https://docs.rustfs.com/) · [repo](https://github.com/rustfs/rustfs) | Rust 实现的 S3 兼容存储；官方安装/部署入口 | 自托管对象存储候选；不是因为 Rust 就更可靠；API/升级/磁盘损坏须测 | 重点审慎；Apache-2.0；1.0 正式线，仍需自己的恢复证据 |
| 37 [Apache OpenDAL](https://opendal.apache.org/) · [repo](https://github.com/apache/opendal) | 统一对象/文件等存储后端访问 API；官方 language bindings | 补存储抽象；不是数据库、不是新的存储服务器；后端语义仍不同 | 基线/重点；Apache-2.0；Rust 核心与各语言 binding 分开版本 |

### 4.3 任务、安全、AI 与业务集成（38–53）

| # / 项目、文档与仓库 | 机制与入口 | 补充/替代、成本与不适用 | 成熟度/许可边界 |
| --- | --- | --- | --- |
| 38 [Temporal](https://docs.temporal.io/) · [repo](https://github.com/temporalio/temporal) | 历史重放/活动/定时/信号；官方语言 quickstarts | 长期流程/恢复；简单一次任务可能过重；worker、服务、DB 与版本化要运维 | 基线/重点；MIT server；Cloud 商业；dev server 不等于生产部署 |
| 39 [Restate](https://docs.restate.dev/) · [repo](https://github.com/restatedev/restate) | durable journal、服务调用/状态；官方 quickstart | 可靠服务执行；需学习执行模型与持久存储；副作用仍幂等 | 重点；服务端 BSL-1.1、附加授权与转许可，SDK MIT |
| 40 [DBOS](https://docs.dbos.dev/) · [TS repo](https://github.com/dbos-inc/dbos-transact-ts) / [Python](https://github.com/dbos-inc/dbos-transact-py) | 用库+Postgres 记录工作流/队列；官方 quickstart | 较少独立服务；绑定语言/数据库；并不等于无恢复/控制面责任 | 重点；MIT SDK；Conductor/Cloud 与库本身分开 |
| 41 [pgmq](https://pgmq.github.io/pgmq/) · [repo](https://github.com/pgmq/pgmq) | Postgres 扩展内的持久消息队列；[安装](https://pgmq.github.io/pgmq/) | 已有 PG 时少一个服务；消费者幂等/重试/积压仍自己设计；非完整工作流 | 基线/重点；PostgreSQL License；托管 PG 是否支持扩展要先查 |
| 42 [Better Auth](https://www.better-auth.com/docs/introduction) · [repo](https://github.com/better-auth/better-auth) | 应用内认证、适配器/插件；官方 installation | 替换自写身份接线；不替代领域授权、租户隔离和邮件运营 | 重点；MIT；框架/数据库 adapter 和插件兼容矩阵是维护面 |
| 43 [Keycloak](https://www.keycloak.org/guides) · [repo](https://github.com/keycloak/keycloak) | 独立身份提供者、OIDC/SAML/SSO；production guides | 集中身份/企业联合登录；小应用自托管它可能过重 | 基线；Apache-2.0；生产 DB、HA、升级和邮箱由部署方负责 |
| 44 [OpenFGA](https://openfga.dev/docs/) · [repo](https://github.com/openfga/openfga) | 关系模型/tuple 授权检查；官方 getting started | 复杂共享继承权限；简单角色无需单独服务；模型版本/撤权要测 | 基线/重点；Apache-2.0、CNCF 项目；托管 Auth0 FGA 不等于本体 |
| 45 [SpiceDB](https://authzed.com/docs/spicedb/getting-started/first-steps) · [repo](https://github.com/authzed/spicedb) | Zanzibar 风格关系授权与一致性令牌等；官方 quickstart | 复杂关系权限；多一个关键请求依赖；不能取代认证 | 基线/重点；Apache-2.0；AuthZed 商业服务与开源版能力分开 |
| 46 [PydanticAI](https://ai.pydantic.dev/) · [repo](https://github.com/pydantic/pydantic-ai) | 类型化输出/工具/依赖与模型抽象；官方 examples | 补模型调用组织；不自动验证事实/授权；不需要 agent 时别构建 agent | 重点；MIT；模型提供者和权重有独立条款/成本 |
| 47 [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) · [repo](https://github.com/langchain-ai/langgraph) | 状态图、中断、持久化与恢复；官方 quickstart | 多步 agent；图与 checkpoint schema 也要迁移；简单 API 调用未必值得 | 重点；MIT；LangSmith 等商业平台不是开源库的同义词 |
| 48 [vLLM](https://docs.vllm.ai/en/latest/) · [repo](https://github.com/vllm-project/vllm) | 推理批处理/内存调度、服务 API；官方 serving guides | 补自托管模型推理；GPU/驱动/利用率/模型兼容与安全成本高 | 基线/重点；Apache-2.0 代码；权重许可和硬件支持另论 |
| 49 [promptfoo](https://www.promptfoo.dev/docs/intro/) · [repo](https://github.com/promptfoo/promptfoo) | 配置化模型评测与红队流程；官方 get started | 补回归与攻击样本；不是上线授权或“安全证明”；调用模型可能计费 | 重点；MIT 核心，企业产品另核；评测集质量决定信息量 |
| 50 [Svix](https://docs.svix.com/) · [repo](https://github.com/svix/svix-webhooks) | webhook 投递、签名、重试/管理；官方 self-host docs | 补对外事件投递；不会自动保证下游只执行一次；自托管有 DB/队列责任 | 基线/重点；MIT server/SDK；托管服务、事件保留与 SLA 另核 |
| 51 [Novu](https://docs.novu.co/) · [repo](https://github.com/novuhq/novu) | 多渠道工作流、偏好/模板与站内通知；[部署](https://docs.novu.co/community/self-hosting-novu/deploy-with-docker) | 多渠道协调；只发几封邮件无需整个平台；API/worker/WS + Mongo/Redis 等 | 重点/运营闸门；社区 MIT/enterprise 包专有许可；[license](https://github.com/novuhq/novu/blob/next/LICENSE-ENTERPRISE)含授权限制；下游投递仍需供应商 |
| 52 [Stripe](https://docs.stripe.com/) · [SDK repo](https://github.com/stripe/stripe-node) | 商业支付 API/托管结账与 webhook；[Checkout](https://docs.stripe.com/payments/checkout) | 支付通常买；不能将 SDK 当自托管支付系统；地区可用性、费率、税务与迁移敏感 | 商业基线；SDK MIT，服务不是开源；本文无开户/交易，不列未核实费率 |
| 53 [Lago](https://docs.getlago.com/) · [repo](https://github.com/getlago/lago) | 用量事件、计费/账单；官方 self-host/get started | 补复杂按量计费；支付处理器仍需接；不能默认替代会计/税务 | 重点；AGPL-3.0 core/企业另论；事件重放、更正、对账要有合同 |

### 4.4 交付、开发环境、观测、质量与恢复（54–74）

| # / 项目、文档与仓库 | 机制与入口 | 补充/替代、成本与不适用 | 成熟度/许可边界 |
| --- | --- | --- | --- |
| 54 [Docker Compose](https://docs.docker.com/compose/) / [Caddy](https://caddyserver.com/docs/) · [repos](https://github.com/docker/compose) / [proxy](https://github.com/caddyserver/caddy) | 声明单环境容器拓扑 + HTTPS 入口；各有官方 quickstart | 小型自托管基线；不是多机调度/高可用/备份；Docker Desktop 另有商业条款 | 基线；Compose/Caddy Apache-2.0；持久卷与宿主机要维护 |
| 55 [Kamal](https://kamal-deploy.org/) · [repo](https://github.com/basecamp/kamal) | SSH/容器的可重复应用发布；官方 installation | 减少发布脚本；不是数据库运维平台，不自动带 HA | 基线；MIT；主机/注册表/入口与秘密要配置 |
| 56 [Coolify](https://coolify.io/docs/) · [repo](https://github.com/coollabsio/coolify) | 自托管 PaaS 控制面、构建与服务管理；官方安装 | 可替代部分托管平台体验；控制面权限很大，升级/备份/主机仍是自己责任 | 基线/重点；Apache-2.0 核心；Cloud 商业服务另论 |
| 57 [OpenTofu](https://opentofu.org/docs/intro/) · [repo](https://github.com/opentofu/opentofu) | 声明资源、plan/apply/state；官方入门 | 基础设施可复现；不等于容器发布工具；state、provider、秘密和升级需治理 | 基线；MPL-2.0；provider/API 绑定不会随 HCL 可移植而消失 |
| 58 [uv](https://docs.astral.sh/uv/) · [repo](https://github.com/astral-sh/uv) | Python 依赖、锁定、环境与工具执行；官方 project guide | 补开发/构建复现；不替代 OS 镜像、供应链验证和部署 | 基线/重点；MIT 或 Apache-2.0；锁文件与 Python/平台版本都要固定 |
| 59 [Infisical](https://infisical.com/docs/) · [repo](https://github.com/Infisical/infisical) | 集中秘密、环境/身份集成；官方 self-host docs | 多人多环境时补秘密生命周期；小应用可先用主机/平台 secret；别丢解密密钥 | 重点；MIT 社区、ee 单独许可；控制面/DB/恢复本身也需保护 |
| 60 [OpenTelemetry](https://opentelemetry.io/docs/) · [repo](https://github.com/open-telemetry/opentelemetry-specification) | 跨语言遥测 API/SDK、Collector/OTLP；[demo](https://opentelemetry.io/docs/demo/) | 补仪表与出口；不是查询/存储平台；字段规范、采样和隐私仍自定 | 基线；Apache-2.0；API/SDK/Collector 各有版本线 |
| 61 [SigNoz](https://signoz.io/docs/) · [repo](https://github.com/SigNoz/signoz) | OTel 观测后端/查询与告警；官方部署 | 补 telemetry 存储查询；ClickHouse 等数据面有资源/保留成本 | 基线/重点；MIT 社区、ee 条款另论；Cloud 与自托管支持不同 |
| 62 [Sentry](https://develop.sentry.dev/self-hosted/) · [server](https://github.com/getsentry/sentry) | 错误归并/上下文与诊断；self-host repo/安装资料 | 补开发诊断；自托管不轻，16GB RAM+swap 是当前最低文档要求之一 | 基线；server FSL-1.1-Apache-2.0，SDK MIT；不要误报为纯 MIT 服务 |
| 63 [PostHog](https://posthog.com/docs/) · [repo](https://github.com/PostHog/posthog) | 产品事件、回放、旗标/实验；[self-host](https://posthog.com/docs/self-host) | 补产品分析；非必需；隐私/保留/容量与 unsupported 自托管是门槛 | 基线服务；MIT 核心、ee 另论；官方不为 hobby 自托管提供正式支持 |
| 64 [OpenFeature](https://openfeature.dev/docs/reference/intro/) · [repo](https://github.com/open-feature/spec) | 旗标求值 API 与 provider 抽象；官方 getting started | 补旗标调用可移植性；不是完整管理平台；旧旗标要删除 | 基线；Apache-2.0；具体 backend/provider、离线与故障默认值仍要选择 |
| 65 [Playwright](https://playwright.dev/docs/intro) · [repo](https://github.com/microsoft/playwright) | 真实浏览器 E2E、trace 与多浏览器；官方安装 | 补用户流程验证；不等于业务规则/性能/无障碍全覆盖 | 基线；Apache-2.0；浏览器包/系统依赖/CI 并行费需算 |
| 66 [Testcontainers](https://testcontainers.com/) · [repo](https://github.com/testcontainers/testcontainers-node) | 测试时启动真实依赖容器；官方各语言 quickstarts | 补集成测试；比 mock 更贴近真实协议，不等于生产拓扑/故障验证 | 基线；MIT Node 实现，各语言另核；需可用容器运行时 |
| 67 [Trivy](https://trivy.dev/latest/docs/) · [repo](https://github.com/aquasecurity/trivy) | 镜像/依赖/配置等扫描；官方 getting started | 补供应链检测；CVE 绿灯不证明无漏洞，需误报处置与可达性判断 | 基线；Apache-2.0；漏洞库更新与离线策略要维护 |
| 68 [Renovate](https://docs.renovatebot.com/) · [repo](https://github.com/renovatebot/renovate) | 自动发现依赖升级并提出变更；官方 onboarding | 补补丁工作流；不是自动合并所有主版本；需要兼容测试/分组规则 | 基线；AGPL-3.0；托管应用与自托管的令牌权限/运行成本不同 |
| 69 [pgBackRest](https://www.pgbackrest.org/user-guide.html) · [repo](https://github.com/pgbackrest/pgbackrest) | PG 备份、WAL、恢复；官方 user guide | 补可恢复性；备份成功不等于应用/对象文件/密钥能恢复 | 基线；MIT；存储、加密、保留与恢复演练自己负责 |
| 70 [Pigsty](https://pigsty.io/docs/) · [repo](https://github.com/pgsty/pigsty) | PostgreSQL 运维发行/监控/HA/备份整合；官方安装 | 补自托管数据库平台；不是免 DBA 知识；硬件/故障演练与扩展审核仍要做 | 基线/重点；Apache-2.0 编排；扩展各自许可/支持；目录数不是默认安装数 |
| 71 [Cloudflare Workers 平台](https://developers.cloudflare.com/workers/) · [SDK/工具](https://github.com/cloudflare/workers-sdk) | Workers + 按需 D1/KV/Queues/R2/Email；[Hono starter](https://hono.dev/docs/getting-started/cloudflare-workers) | 低运维边缘部署；bindings/限制/数据出口是绑定点；本地模拟不是整个云 | 商业托管组合；部分工具 MIT/Apache-2.0，不代表云可自托管；逐服务语义核验 |
| 72 [Docling](https://docling-project.github.io/docling/) · [repo](https://github.com/docling-project/docling) | 文档布局/结构化摄取；官方安装/示例 | 补 RAG/搜索前处理；解析需资源限制/隔离，扫描件质量与模型相关 | 重点；MIT 代码，模型另有许可；需固定解析与模型版本 |
| 73 [FFmpeg](https://ffmpeg.org/documentation.html) · [源码](https://git.ffmpeg.org/ffmpeg.git) | 媒体解码/转码/封装；[下载](https://ffmpeg.org/download.html) | 补媒体 worker；不在 Web 请求里处理任意大文件；不可信输入要沙箱 | 基线；LGPL-2.1+ 基础、可选 GPL 组件等改变构建许可；专利另论 |
| 74 [libvips](https://www.libvips.org/) · [repo](https://github.com/libvips/libvips) | 需求驱动的图像处理流水线；官方安装/docs | 补缩略图/图像处理；解压炸弹、超大尺寸、格式与 worker 资源要限制 | 基线；LGPL-2.1+；语言包装包与系统动态库版本分别查 |

### 4.5 为什么不把每个流行项目都放进 74 项

- React/Next/Solid/Svelte、headless 组件、生成式 UI 协议、编辑器、动效和浏览器属性测试已在 [UI 分册](./reading-notes/ui-frontier-osint-dd-2026-11-23.md)深入展开，此处不通过重复计数挤占后端与运维。
- Go 标准库/Gin、Rust axum、原生 Swift/Kotlin 是有效基线，不因未单列为“新轮子”而排除。选语言应看领域库、团队和运维，不按语言配额选工具。
- 不系统展开电商/医疗/金融等垂直业务系统、数据仓库全生态、消息流平台全谱系、游戏引擎和机器学习训练平台。只有明确需求才扩大这些专题。
- Kafka、Kubernetes、服务网格、多地域数据库并非坏方案，但不是小应用必需。否则研究会把成熟应用交付误写成平台团队采购单。
- 不推荐来源/许可/代码身份未确立的社交名称；第五帖的 “Ego Lite” 未找到足够可核身份，不纳入候选，更不建议读取会话 cookie 来拼接生产集成。

## 5. 六种最小应用组合：先删不需要的服务

下表是一般应用形态，不是任何特定项目方案。**“维护中的脚手架”与“本文组合建议”分开标注**：脚手架只保证包含其仓库声明的内容，不保证已经包含本文列出的生产责任。

### A. 数据录入、审批、内容管理：一体式 Web + SQL

- **最小组合：** Django/Rails/Laravel 之一 + SQLite 或托管 Postgres + HTTPS；有长任务才增加 worker，有文件才增加对象存储。优先服务器页面与框架会话，不必默认多端 SPA。
- **可用起点：** [Cookiecutter Django](https://github.com/cookiecutter/cookiecutter-django)（BSD-3-Clause；Django/数据库/部署与可选任务、存储集成，按生成选项核对）；[Laravel 官方 starter kits](https://laravel.com/starter-kits)（MIT 路线，可选 React/Vue/Livewire/Svelte）；[Rails 官方入门](https://guides.rubyonrails.org/getting_started.html)（MIT 框架）。
- **仍缺什么：** 真实领域模型、对象级/租户权限、备份演练、生产邮件与身份供应商、数据保留、业务监控。生成器支持的云服务不是必须全部购买。
- **增长触发：** 请求超时先拆 worker；慢查询先索引/分页；真实团队边界出现再拆服务。不要因为“现代”重写为十个微服务。
- **出口：** 版本化源码、普通 SQL dump、对象文件清单和配置；框架特定业务代码迁移仍有成本，但不是供应商独占数据格式。

### B. 多客户端产品：合同化 API + 一个数据库 + 按需原生端

- **最小组合：** FastAPI、Spring Boot 或 ASP.NET Core 中熟悉的一种 + Postgres；HTTP/OpenAPI；Web、Expo、Flutter、Tauri/Wails 按设备需求选，不全部做。
- **可用起点：** [官方 Full Stack FastAPI Template](https://github.com/fastapi/full-stack-fastapi-template)（MIT）。当前声明 FastAPI/SQLModel/Postgres、React/TS/Vite/Tailwind/shadcn、生成前端客户端、JWT/密码恢复、Pytest/Playwright、Compose/CI；React 内建同域提供，既支持 FastAPI Cloud，也有自托管路径。[Spring Initializr](https://start.spring.io/)与 [Aspire 模板](https://aspire.dev/get-started/aspire-sdk-templates/)是其他生态的正式入口。
- **仍缺什么：** 模板示例用户/CRUD 不等于多租户模型；原生签名/商店、API 长期兼容、离线策略和领域权限要另做。模板的 Mailpit 是本地邮件测试，不是生产投递。
- **增长触发：** 客户端合同漂移时考虑 TypeSpec/Connect；多个本地依赖难以重现时看 Aspire/Encore。已有一个服务不必为使用 AppHost 而先拆服务。
- **出口：** API 合同、可生成客户端、标准容器和 SQL；Cloud 托管是选项，不应把示例部署账号写成架构前提。

### C. 实时协作：先在“在线服务器驱动”与“离线可写”之间选承诺

- **在线最小组合：** Phoenix/LiveView + Postgres；[Phoenix 官方安装与生成流程](https://hexdocs.pm/phoenix/installation.html)（MIT）。连接、服务端状态和重连是要负责的运行面，不需要先加 CRDT。
- **离线最小组合：** 已有 Postgres 时从 [Zero 入门](https://zero.rocicorp.dev/docs/introduction)或 [Electric quickstart](https://electric-sql.com/docs/quickstart)做一个受限数据集实验；新数据模型才考虑 LiveStore。它们是各自维护的起点，**不是一个与 Phoenix 混装的现成全栈模板**。
- **仍缺什么：** 冲突语义、离线权限、撤权/删除、旧客户端升级、缓存清理、观察同步健康与服务端恢复。
- **增长触发：** 用真实网络证明等待/断网影响核心任务；只需要新消息出现时，用 SSE/WebSocket 足够。
- **出口：** 保留权威数据/事件和投影重建方式；不要只备份客户端物化缓存。同步编程模型迁移比替换 CSS 或组件库难得多。

### D. 文档处理与 AI 辅助：流水线，而不是先做 agent 集群

- **最小组合：** FastAPI/现有后端 + Postgres + 对象存储 + 一个可重试 worker；Docling/媒体工具按文件类型加入。先做词法搜索；评测证明才加 pgvector/专用检索、模型调用。
- **可用起点：** 以 [FastAPI 全栈模板](https://github.com/fastapi/full-stack-fastapi-template)补用户界面/API，以 [PydanticAI 官方 examples](https://ai.pydantic.dev/examples/)补模型接入，以 [DBOS quickstart](https://docs.dbos.dev/)或已有队列补处理状态。**这是模块化组合建议，不是假称有一个已审查的“一键全包 RAG SaaS”。**
- **仍缺什么：** 不可信文件隔离、模型/解析器版本、租户权限、来源引用、失败重试、预算与评测集。付费模型 API、对象存储、邮件等按需，不隐藏在“免费开源”描述里。
- **增长触发：** 真正跨天等待/人工审批/恢复才选 durable workflow；高 GPU 利用率或特定模型约束才评估 vLLM。
- **出口：** 原始对象、解析结果/版本、业务元数据、评测集和模型接口；重新算 embedding 的时间/成本也属于迁移成本。

### E. 小型网络工具与边缘 API：托管平台换运维减负

- **最小组合：** Hono + Workers；只有持久数据、缓存、后台任务、文件时才分别加 D1/KV/Queues/R2。第五条种子帖提供了这条路线，但不是它普遍最优的证据。
- **维护起点：** [Hono Cloudflare Workers starter](https://hono.dev/docs/getting-started/cloudflare-workers)（MIT 应用框架；Cloudflare 是商业托管平台）。不需要边缘服务时，Go/Gin 或 Hono Node + Compose/Caddy 同样成立。
- **关键语义：** [KV](https://developers.cloudflare.com/kv/concepts/how-kv-works/)最终一致，远端看到修改可能需要 60 秒或更长；不用于付款状态/锁。[Queues](https://developers.cloudflare.com/queues/reference/delivery-guarantees/)是至少一次投递，消费者要幂等。当前 [Email Sending Beta](https://developers.cloudflare.com/email-service/)确实存在，不能沿用“Cloudflare 只能收/转发不能发信”的旧印象，但 beta 不等于成熟投递 SLA。
- **仍缺什么：** 账号/限额/地区可用性、绑定权限、日志保留、备份/导出、供应商中断和账单。无需全部免费额度相加后宣布“零成本”。
- **出口：** Hono 可跨 runtime，但直接依赖的 D1/KV/Queues bindings、数据库特性和事件模型不会自动跨云。至少做一个替换后端存储的实验。

### F. 小团队移动应用：一个客户端工具链 + 一个后端平台

- **最小组合：** Expo 或 Flutter + Supabase/Appwrite/其他合适 BaaS 中的一种；不要同时维护两套账户/权限真相。设备能力特别重要时选 Swift/Kotlin 原生也合理。
- **维护起点：** [Supabase 的 Expo 用户管理教程](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)与 [Expo create](https://docs.expo.dev/get-started/create-a-project/)。示例包含账户、资料与数据库/存储接入；**不是完整离线、推送、支付、隐私与多租户产品**。
- **许可与服务：** 客户端库/模板各自开源；Supabase 云、EAS 和应用商店是不同商业边界。可本地构建/自托管并不消除原生签名、证书、审查和系统适配。
- **增长触发：** 先验证核心设备流程；离线可写、订阅收费、推送、多组织等分别新增合同，不被示例默认用户模型绑住。
- **出口：** 导出 SQL 与对象、处理外部身份映射、验证应用不依赖某构建控制面才能更新。

### 5.1 有来源的初始化命令，不是本轮执行记录

以下命令逐条来自所链当前官方材料；需要相应 Node、Python/uv、Laravel installer 或 Aspire CLI 前置环境。`latest` 是文档的滚动入口，不是可复现锁定策略；实际采用时记录生成器版本/commit、选择参数和 lockfile。命令只创建开发起点，不自动完成生产安全配置。

```bash
# Cookiecutter Django（交互选择；仅创建项目，不是部署）
uvx cookiecutter https://github.com/cookiecutter/cookiecutter-django

# Laravel：先按官方文档安装 PHP/Composer/Laravel installer，再创建并选择套件
laravel new my-app

# Hono：交互选择 cloudflare-workers；部署需自己的账号，本轮没有部署
npm create hono@latest my-app

# Expo 官方默认项目
npx create-expo-app@latest

# Aspire 官方模板（依赖 Aspire CLI 及所选语言/容器环境）
aspire new aspire-starter -n AspireApp -o AspireApp
```

命令依据：[Cookiecutter](https://github.com/cookiecutter/cookiecutter-django) · [Laravel](https://laravel.com/starter-kits) · [Hono](https://hono.dev/docs/getting-started/cloudflare-workers) · [Expo](https://docs.expo.dev/get-started/create-a-project/) · [Aspire](https://aspire.dev/get-started/aspire-sdk-templates/)。Encore 的 `encore build docker --config infra-config.json MY-IMAGE:TAG` 也是 [官方出口](https://encore.dev/docs/self-host/build)，但配置必须先按自己的 DB/队列/秘密建立，不能将这个占位示例直接当可运行应用。

## 6. 五条便宜的试验路径与停止条件

这些是建议的验收实验，不是假装已经运行全部候选。每条只比较同一责任，先写成功预算，再跑真实工作负载。

| 需求 | 最便宜的两组对照 | 必须通过的验证 | 停止/回退条件 |
| --- | --- | --- | --- |
| 尽快交付可靠业务应用 | 熟悉的一体式框架 vs 自由拼装薄 API | 创建账户/会话、对象权限、一次 schema 变更、关键 E2E、新机器部署/恢复；记录真正需要自己维护的文件和服务 | 拼装路线只在空页面更快，生产责任反而未覆盖，就保留框架基线 |
| 任务不能因进程退出丢失 | SQL/pgmq worker vs DBOS；更复杂时再比较 Restate/Temporal | 写业务与 outbox 原子提交；worker 在副作用前/后被杀；重复投递/超时；任务状态可恢复；检查幂等键和日志 | 需要流程恢复却只能人工改表；或简单任务引入大量控制面/模型约束，就退回较简单方案 |
| 真正需要离线/低延迟协作 | 普通 HTTP/SSE/乐观 UI vs 一个受限同步方案 | 双设备并发修改、断网重连、权限撤销、删除、旧客户端升级、缓存全清重建；核对服务器真相 | 无法证明授权边界/迁移；或收益只来自同时换了 UI 库而非同步，就不迁移数据层 |
| 更好搜索/AI 辅助 | SQL FTS/过滤 vs pgvector 混合；有证据再加独立引擎/模型 | 固定带标注样本；编号/语言/时间/权限与无答案；报告召回、排序、延迟和成功任务成本；保留失败样本 | 演示好看但错误放宽/权限泄漏/成本不可控；回到可解释检索或人工复核 |
| 降低运维/平台绑定 | 托管整合平台 vs 一台主机的最小组合 | 导出业务数据/文件、离机恢复、轮换密钥、重建新环境、取消原控制面后的功能；列实际账单项与值班责任 | “自托管”只是装成功、恢复不成；或迁移需要无法导出的身份/状态，就调整选择或接受并预算绑定 |

## 7. 风险与采用闸门：不能只问能否 npm install

### 7.1 标准可移植 ≠ 数据可移植 ≠ 运维可移植 ≠ 许可可移植

- **合同：** 是否持有 OpenAPI/Protobuf/SQL/schema？供应商扩展、SDK 与错误模型是否隔离？OIDC 减少协议绑定，不保证用户密码和组织数据可无损迁移。
- **数据：** 全量与增量能否导出？文件是否包含？索引、事件日志、身份关联和密钥是什么？换引擎能否保留事务与排序语义？
- **运维：** 在另一个环境从源码/镜像恢复需要什么？控制面退出后是否还可运转？谁负责补丁、告警、备份和域名？
- **许可：** 源码可见、可自托管、OSI 开源、SDK 宽松许可、允许竞争性托管是不同属性。发行版、EE 目录、模型与插件分别检查。

### 7.2 选择前的十个问题

1. 这项能力有真实需求，还是看见一条演示？不引入它会怎样？
2. 最小基线为什么不够？证据来自相同数据、相同设备、相同任务吗？
3. 哪些状态是权威，哪些是缓存/派生？事务覆盖到哪里？失败能否重试？
4. 身份、租户、对象权限在哪一层强制？后台任务、导出、搜索是否同样检查？
5. 开发、stable、RC、beta、nightly、SDK 和 server 是否被混写？主版本支持多久？
6. 关键维护由谁承担？发布节奏、迁移指南、issue 修复、治理/商业激励和替代维护者如何？一次活跃 release 不能保证长期存活。
7. 真实生产最低依赖是什么？扩展安装权限、GPU、外部邮件、Mongo/Redis、控制面账号有没有遗漏？
8. 源码、镜像、依赖、IaC 与 lockfile 是否可重建？CI 是否最小权限、秘密是否会进日志？
9. 能从离机备份恢复吗？恢复范围、RPO/RTO、密钥、对象文件和账单谁负责？
10. 一年后不满意，能带走什么？迁移时间、数据停机/重建、SDK 改写与许可证审查是否可接受？

### 7.3 别把失败证据藏在脚注里

| 观察到的反证/限制 | 对选择的实际影响 | 第一方依据 |
| --- | --- | --- |
| PocketBase 明确 pre-1.0 兼容与生产关键风险，作者迁移发布位置 | “单二进制很方便”不足以取消迁移、供应链源和项目治理风险 | [docs](https://pocketbase.io/docs/) / [公告](https://github.com/pocketbase/pocketbase/discussions/7841) |
| PostHog 当前 self-host 是无正式支持保证的 hobby 路线；Sentry 自托管资源不少 | 开源/源码可见不等于低运维；小应用可买服务或减少采集 | [PostHog](https://posthog.com/docs/self-host) / [Sentry](https://develop.sentry.dev/self-hosted/) |
| RustFS 1.0.5 升级说明曾提示混合版本期间 DELETE 可能 503，要求先完成全节点升级 | 正式版本和 S3 兼容也要读升级/故障语义；不能只看语言与吞吐宣传 | [release](https://github.com/rustfs/rustfs/releases/tag/1.0.5) |
| Redis 的许可随版本不同：≤7.2 BSD；7.4–7.8 为 RSAL/SSPL；8 加入 AGPLv3 选项 | 不能概括为“Redis 全部不再开源”；选 Valkey/Redis 要按具体版本与用途审查 | [官方许可](https://redis.io/legal/licenses/) |
| Convex/Sentry 的 SDK 比 server 许可宽松；Restate 服务端 BSL；Atlas 标准分发与 CE 不同 | 不用 npm license 单字段决定整套服务能否分发/托管 | [Convex](https://github.com/convex/convex-backend/blob/main/LICENSE.md) / [Sentry](https://github.com/getsentry/sentry/blob/master/LICENSE.md) / [Restate](https://github.com/restatedev/restate/blob/main/LICENSE) / [Atlas](https://atlasgo.io/community-edition) |
| KV 最终一致、Queues 至少一次；持久执行不包办第三方副作用 | 选择要看一致性/重复/恢复，不能只看“平台全家桶”是否齐全 | [KV](https://developers.cloudflare.com/kv/concepts/how-kv-works/) / [Queues](https://developers.cloudflare.com/queues/reference/delivery-guarantees/) / [Temporal](https://docs.temporal.io/) |
| 同时换框架和组件库的个人本地测试，没有复现仓库/原始数据 | 可以产生假设，不能把结果当成框架固有优势或全栈架构依据 | 第六帖线程，见附录 C |

## 8. 运行成本、恢复与治理：要写进架构，不是上线后补

### 8.1 小规模不报虚假的“每月总共几美元”

真实总成本至少包含：计算/内存/GPU、数据库与 WAL、对象/索引/备份存储、请求/出入站流量、日志/trace/回放保留、模型/embedding/重试、邮件/SMS、支付/计费、构建分钟、监控和人工。区域、复制、保留、使用峰值与支持级别未知时，统一美元总价没有意义。

| 方案 | 本轮可核的依赖/最低说明（非容量保证） | 对小规模选择的意义 |
| --- | --- | --- |
| 单进程 + SQLite | 进程/本地磁盘；仍需 TLS、更新、离机备份/恢复 | 最少独立服务；接受单主机故障与写并发边界，不包装为 HA |
| 普通应用 + 托管 Postgres | 应用运行环境 + DB 服务；邮件/文件等按需 | 往往比自建完整平台更易覆盖责任；核对备份范围、连接、扩展和导出 |
| [Supabase Docker](https://supabase.com/docs/guides/self-hosting/docker) | 官方全组件最低 2 CPU/4GB RAM/40GB SSD，建议 4核/8GB+/80GB+；可裁减服务；默认不含可选日志分析栈 | 不把它当单 SQLite 进程；资源只是启动参考，真实数据/恢复另测 |
| [Novu](https://docs.novu.co/community/self-hosting-novu/deploy-with-docker) | API/worker/WS/dashboard 外加 MongoDB、Redis、对象存储和投递供应商；文档开发/生产表不同 | “发邮件”不必先自建通知平台；本地 Mailpit 不替代生产投递 |
| [Sentry](https://develop.sentry.dev/self-hosted/) | 当前最低 4核/16GB RAM + 16GB swap/20GB disk，建议 32GB RAM | 不和小应用塞同一台低配机后宣布免费；保留量会继续增长 |
| [PostHog hobby](https://posthog.com/docs/self-host) | 约 4vCPU/16GB RAM/30GB+，无正式自托管支持保证 | 优先评估需求、隐私和维护能力，再选 cloud/自托管/不采集 |
| Temporal / DBOS / Restate | Temporal 服务+DB+workers；DBOS 库+PG+workers/恢复管理；Restate 服务存储+应用 | 不用竞争者的最重部署图比较自己的最轻 demo；按相同可用性/恢复目标算 |
| vLLM | 兼容模型、硬件/驱动/显存与运行服务；具体门槛依模型 | 不声称一块 GPU 能满足所有模型；利用率、排队、KV cache、升级和值班都算成本 |

### 8.2 恢复演练应验证完整链路

- 定义 **RPO**（可接受数据损失窗口）与 **RTO**（恢复时长目标），区分业务高峰和普通时段；不是随意借用供应商 SLA。
- 数据库、WAL、对象文件、事件/工作流状态、配置/schema、身份映射和解密密钥分别列清。缓存/索引可重建，但要预算重建时间与上游负载。
- 备份放到不同故障域，限制删除权限，确认加密密钥能恢复又不会与所有副本一起泄露。副本、快照、备份、归档和导出不是同义词。
- 在隔离环境恢复并跑业务不变量、权限和关键任务；检查恢复后 webhook/邮件/支付是否重复。向生产误连比恢复失败更危险。
- 治理至少有数据分类、最小采集、访问审计、保留/删除、导出、第三方处理者与地区限制。备份保留和删除请求如何协调要有明确政策；涉及特定法规时做适用性与专业审查，不能用“开源自托管”替代合规。

### 8.3 质量与安全的最低闭环

产品验收还应覆盖键盘/读屏/焦点、对比度、缩放与减少动效，参考 [WCAG 2.2](https://www.w3.org/TR/WCAG22/)；目标级别按用户与适用规则确定。国际化要测试语言/复数、RTL、日期/时区、货币/精度，而不只是把文案移进 JSON。设备、弱网、空/错/加载与恢复状态也要进入验收。

测试分工：领域单测/属性测试检查不变量；Testcontainers/真实数据库检查迁移和协议；Playwright 检查用户关键路径与错误恢复；必要时做负载/故障与无障碍人工检查。E2E 全绿不证明计费、并发或授权逻辑正确。

发布分工：锁定依赖与构建环境、产物标识、审查数据库兼容、渐进发布/回滚、依赖漏洞处置和服务凭据轮换。Trivy/依赖更新只是发现与修补流程的一部分。[OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)可帮助按风险建立验证清单；不能拿扫描器零告警当安全认证。

集成分工：webhook 先验签/检查时间窗，再做幂等接收和事件版本；失败可重放/审计；邮件需要域名认证、退信/投诉处理；计费需要权威供应商状态与权益核对。不要在浏览器回跳成功页直接开通付费权限，也不要让 agent 自行绕过这些边界。

## 9. 最后的采用结论：有条件的 Pareto 前沿，没有一次到位的最优栈

在交付速度、学习成本、运行复杂度、性能/交互、可靠性、隐私、控制权、迁移成本之间，不存在同时压倒所有方案的通用解。新项目与存量系统、单人团队与平台团队、在线表单与离线协作的最优点不同。

| 处置 | 建议 | 理由与限制 |
| --- | --- | --- |
| **现在就采用的做法** | 领域不变量、标准合同、最小受支持栈、事务/迁移、最小权限、可复现发布、错误/关键成功率、备份恢复、成本所有者 | 这是完整应用责任；具体可以由 Django/Rails/Laravel、JVM/.NET/Go 等熟悉路线实现，不要求换语言 |
| **有需求即可采用的成熟基线** | Postgres/SQLite、普通 HTTP、对象存储、成熟身份/邮件/支付服务、结构化日志、真实 DB 与浏览器测试 | 前提是实际需求、支持线、权限与恢复被验证；“成熟”不等于不用维护 |
| **受控试验最有价值** | DBOS/pgmq 的少服务任务；Temporal/Restate 的可恢复流程；Encore/Aspire 的依赖组织；OpenFGA/SpiceDB 的复杂权限；PGlite/Turso/Zero/Electric 的近端数据；按需 AI/混合检索 | 新机制确实改变接线/等待/失败成本，但存在不同部署、模型、许可与退出成本；一次只验证一个假设 |
| **先观察或严格限域** | PocketBase 的关键生产采用、新数据库模型大迁移、缺恢复证据的自托管对象存储、unsupported 分析平台、无评测的 agent/GPU 集群 | 风险不是“项目不酷”，而是数据、许可、维护、恢复或安全证据不足 |
| **默认先不建** | 自己的密码学/支付网络/邮件投递基础设施、为对齐潮流的微服务/K8s、没有测量的缓存/向量库、多地域双活、全量事件溯源 | 除非有明确能力缺口、责任人、故障预算和持续维护能力 |

最稳的长期策略不是押中一个永远不会过时的栈，而是**让关键数据、领域规则、合同、评测与恢复过程由自己掌握；把昂贵且可购买的责任有意识地交给供应商；让每次增加复杂度都有可验证理由和退出路径。**

## 附录 A：发布快照与版本身份

下列时间统一为 **Asia/Shanghai（UTC+8）**，核验日 2026-11-23。它们是注册表/官方 release 的公开观测值，不是本报告逐一安装的版本；也不是建议全部采用最新主版本。npm `latest` 是维护者可移动的 dist-tag，不是稳定性证明。GitHub `prerelease=false` 也不等于通过了生产适用性验证。

### A.1 npm：务必看包名，SDK 不是服务端

| 包/分发单位 | `latest` | 发布时间（Asia/Shanghai） | 包级许可；整套服务边界另见正文 |
| --- | --- | --- | --- |
| [@typespec/compiler](https://registry.npmjs.org/%40typespec%2Fcompiler) | `1.18.0` | 2026-11-11 11:32 | MIT |
| [@connectrpc/connect](https://registry.npmjs.org/%40connectrpc%2Fconnect) | `2.3.0` | 2026-10-27 19:23 | Apache-2.0 |
| [expo](https://registry.npmjs.org/expo) | `58.0.26` | 2026-11-17 20:01 | MIT |
| [@tauri-apps/cli](https://registry.npmjs.org/%40tauri-apps%2Fcli) | `2.12.6` | 2026-11-19 00:39 | Apache-2.0 OR MIT |
| [hono](https://registry.npmjs.org/hono) | `4.13.21` | 2026-11-23 17:59 | MIT |
| [encore.dev](https://registry.npmjs.org/encore.dev) | `1.58.10` | 2026-11-23 19:17 | MPL-2.0 |
| [@supabase/supabase-js](https://registry.npmjs.org/%40supabase%2Fsupabase-js) | `2.119.2` | 2026-11-19 18:43 | MIT |
| [appwrite](https://registry.npmjs.org/appwrite) | `29.3.1` | 2026-11-17 13:09 | BSD-3-Clause |
| [pocketbase](https://registry.npmjs.org/pocketbase) | `0.29.0` | 2026-11-11 23:55 | MIT |
| [convex](https://registry.npmjs.org/convex) | `1.51.0` | 2026-11-18 14:07 | Apache-2.0 |
| [@electric-sql/pglite](https://registry.npmjs.org/%40electric-sql%2Fpglite) | `0.6.0` | 2026-11-23 19:36 | Apache-2.0 |
| [@tursodatabase/database](https://registry.npmjs.org/%40tursodatabase%2Fdatabase) | `0.8.4` | 2026-11-20 17:27 | MIT |
| [@libsql/client](https://registry.npmjs.org/%40libsql%2Fclient) | `0.18.0` | 2026-09-02 18:11 | MIT |
| [@duckdb/node-api](https://registry.npmjs.org/%40duckdb%2Fnode-api) | `2.0.1-r.1` | 2026-11-21 01:51 | MIT |
| [drizzle-orm](https://registry.npmjs.org/drizzle-orm) | `0.45.4` | 2026-10-08 18:50 | Apache-2.0 |
| [better-auth](https://registry.npmjs.org/better-auth) | `1.7.27` | 2026-11-20 18:53 | MIT |
| [@openfga/sdk](https://registry.npmjs.org/%40openfga%2Fsdk) | `0.9.8` | 2026-11-12 22:03 | Apache-2.0 |
| [@authzed/authzed-node](https://registry.npmjs.org/%40authzed%2Fauthzed-node) | `1.6.1` | 2025-10-07 00:36 | Apache-2.0 |
| [@dbos-inc/dbos-sdk](https://registry.npmjs.org/%40dbos-inc%2Fdbos-sdk) | `5.6.0` | 2026-11-17 23:57 | MIT |
| [@restatedev/restate-sdk](https://registry.npmjs.org/%40restatedev%2Frestate-sdk) | `1.18.4` | 2026-11-18 04:12 | MIT |
| [@temporalio/workflow](https://registry.npmjs.org/%40temporalio%2Fworkflow) | `1.26.0` | 2026-11-17 09:56 | MIT |
| [svix](https://registry.npmjs.org/svix) | `2.11.0` | 2026-11-21 07:11 | MIT |
| [@novu/api](https://registry.npmjs.org/%40novu%2Fapi) | `3.21.0` | 2026-11-23 21:32 | null |
| [stripe](https://registry.npmjs.org/stripe) | `23.2.0` | 2026-11-19 11:55 | MIT |
| [@sentry/node](https://registry.npmjs.org/%40sentry%2Fnode) | `11.16.0` | 2026-11-20 22:00 | MIT |
| [posthog-node](https://registry.npmjs.org/posthog-node) | `6.0.6` | 2026-11-23 15:39 | MIT |
| [@openfeature/server-sdk](https://registry.npmjs.org/%40openfeature%2Fserver-sdk) | `1.23.0` | 2026-07-29 03:21 | Apache-2.0 |
| [playwright](https://registry.npmjs.org/playwright) | `1.65.1` | 2026-11-14 05:15 | Apache-2.0 |
| [testcontainers](https://registry.npmjs.org/testcontainers) | `12.2.2` | 2026-11-19 23:08 | MIT |
| [renovate](https://registry.npmjs.org/renovate) | `44.258.1` | 2026-11-23 18:48 | AGPL-3.0-only |
| [@opentelemetry/api](https://registry.npmjs.org/%40opentelemetry%2Fapi) | `1.10.0` | 2026-10-21 02:23 | Apache-2.0 |
| [promptfoo](https://registry.npmjs.org/promptfoo) | `0.126.0` | 2026-11-19 03:05 | MIT |

**容易读错的并行通道：** TypeSpec `next=1.19.0-dev.2`；Tauri CLI `next=3.0.0-alpha.6`；Hono `next=5.0.0-rc.1`；Drizzle `latest=0.45.4`、`rc=1.0.0-rc.6`、`beta=1.0.0-beta.22`；Better Auth `beta=1.8.0-beta.11`；Turso DB `next=0.9.0-pre.6`；Playwright `next=1.66.0-alpha-2026-11-23`。这些均来自上表对应注册表。旧的 alpha/rc 标签可能比当前稳定版还旧，不能机械地把 `next` 理解为最新发布。

客户端与服务端尤其容易混淆：Appwrite JS 29.3.1 ≠ server 2.7.4；PocketBase JS 0.29.0 ≠ GitHub server 0.40.6；DBOS TS 5.6.0 ≠ Python 3.6.0；OpenFGA SDK 0.9.8 ≠ server 1.23.0；SpiceDB Node SDK 1.6.1 发布较早，不能据此断言 server 停止维护。Supabase JS、Sentry Node、PostHog Node 和 OTel API 的包许可不能代表整套平台许可。

### A.2 Python 与其他语言注册表

| 分发单位 | 观测版本 | 发布时间（Asia/Shanghai） | 运行前提/许可 |
| --- | --- | --- | --- |
| [Django](https://pypi.org/pypi/Django/json) | `6.1.3` | 2026-11-03 23:21 | Python `>=3.12`；BSD-3-Clause |
| [fastapi](https://pypi.org/pypi/fastapi/json) | `0.165.0` | 2026-11-19 03:15 | Python `>=3.11`；MIT |
| [pydantic-ai](https://pypi.org/pypi/pydantic-ai/json) | `2.71.0` | 2026-11-19 10:45 | Python `>=3.11`；MIT |
| [langgraph](https://pypi.org/pypi/langgraph/json) | `1.2.24` | 2026-11-20 09:10 | Python `>=3.10`；MIT |
| [vllm](https://pypi.org/pypi/vllm/json) | `0.34.0` | 2026-11-17 07:51 | Python `<3.15,>=3.11`；Apache-2.0 |
| [dbos](https://pypi.org/pypi/dbos/json) | `3.6.0` | 2026-11-17 23:55 | Python `>=3.10`；MIT |
| [uv](https://pypi.org/pypi/uv/json) | `0.13.9` | 2026-11-17 17:43 | Python `>=3.8`；MIT OR Apache-2.0 |
| [duckdb](https://pypi.org/pypi/duckdb/json) | `2.0.1` | 2026-11-20 21:35 | Python `>=3.11.0`；以仓库 LICENSE 为准 |
| [Wails Go module](https://proxy.golang.org/github.com/wailsapp/wails/v3/@latest) | `v3.1.0` | 2026-11-01 19:57 | MIT；GitHub 首屏 v3.2 nightly 不是稳定版 |
| [Rails RubyGems](https://rubygems.org/api/v1/gems/rails.json) | `8.1.4.1` | 2026-11-04 10:47 | MIT |
| [Phoenix Hex](https://hex.pm/api/packages/phoenix) | `1.8.17` | 2026-11-20 23:44 | MIT；Elixir/OTP 另核 |
| [Laravel Packagist](https://repo.packagist.org/p2/laravel/framework.json) | `v13.43.0` | 2026-11-17 22:58 | MIT |

### A.3 服务端、引擎、CLI：官方 release 观察值

| 项目 | 版本与直接 release 来源 | 发布时间（Asia/Shanghai） | 注意 |
| --- | --- | --- | --- |
| rustfs | [`1.0.6`](https://github.com/rustfs/rustfs/releases/tag/1.0.6) | 2026-11-16 07:26 | 正式版本；仍需读升级/磁盘恢复说明 |
| pigsty | [`v4.6.0`](https://github.com/pgsty/pigsty/releases/tag/v4.6.0) | 2026-11-13 12:03 | 默认 PG18.7；不等于最新 PG19，扩展目录非全安装 |
| temporal | [`v1.32.2`](https://github.com/temporalio/temporal/releases/tag/v1.32.2) | 2026-11-03 02:38 | 发布活跃不等于生产适用性保证 |
| pgmq | [`v1.13.2`](https://github.com/pgmq/pgmq/releases/tag/v1.13.2) | 2026-11-18 12:21 | 发布活跃不等于生产适用性保证 |
| keycloak | [`26.8.2`](https://github.com/keycloak/keycloak/releases/tag/26.8.2) | 2026-11-06 00:00 | 固定 nightly 的旧时间不是稳定版停止更新 |
| atlas | [`v1.4.0`](https://github.com/ariga/atlas/releases/tag/v1.4.0) | 2026-11-18 01:08 | CE/标准分发/Pro 许可与功能不同 |
| restate | [`v1.8.1-hotfix.3`](https://github.com/restatedev/restate/releases/tag/v1.8.1-hotfix.3) | 2026-11-21 07:19 | hotfix 正式标志；服务端 BSL，不套用 SDK MIT |
| pocketbase | [`v0.40.6`](https://github.com/pocketbase/pocketbase/releases/tag/v0.40.6) | 2026-10-23 19:21 | 旧 GitHub 发布渠道；作者公告迁移，不声称这是新渠道最新值 |
| appwrite | [`2.7.4`](https://github.com/appwrite/appwrite/releases/tag/2.7.4) | 2026-11-20 02:59 | 发布活跃不等于生产适用性保证 |
| spring-boot | [`v4.2.0`](https://github.com/spring-projects/spring-boot/releases/tag/v4.2.0) | 2026-11-20 06:00 | 另有 4.1.3/4.0.10 支持线，先核兼容 |
| aspire | [`v17.0.0`](https://github.com/microsoft/aspire/releases/tag/v17.0.0) | 2026-11-18 14:50 | 独立于 .NET 运行时版本 |
| openfga | [`v1.23.0`](https://github.com/openfga/openfga/releases/tag/v1.23.0) | 2026-11-21 04:13 | SDK/服务端分开 |
| spicedb | [`v1.57.1`](https://github.com/authzed/spicedb/releases/tag/v1.57.1) | 2026-11-11 03:51 | 发布活跃不等于生产适用性保证 |
| meilisearch | [`v1.58.0`](https://github.com/meilisearch/meilisearch/releases/tag/v1.58.0) | 2026-11-23 18:24 | 发布活跃不等于生产适用性保证 |
| typesense | [`v30.2`](https://github.com/typesense/typesense/releases/tag/v30.2) | 2026-04-20 00:00 | 发布活跃不等于生产适用性保证 |
| qdrant | [`v1.20.2`](https://github.com/qdrant/qdrant/releases/tag/v1.20.2) | 2026-11-16 21:00 | 发布活跃不等于生产适用性保证 |
| opentofu | [`v1.13.9`](https://github.com/opentofu/opentofu/releases/tag/v1.13.9) | 2026-11-06 03:09 | 发布活跃不等于生产适用性保证 |
| opendal | [`v0.59.5`](https://github.com/apache/opendal/releases/tag/v0.59.5) | 2026-10-18 13:29 | 发布活跃不等于生产适用性保证 |
| pgbackrest | [`release/2.60.1`](https://github.com/pgbackrest/pgbackrest/releases/tag/release/2.60.1) | 2026-11-16 20:46 | 发布活跃不等于生产适用性保证 |
| caddy | [`v2.11.9`](https://github.com/caddyserver/caddy/releases/tag/v2.11.9) | 2026-11-05 09:30 | 发布活跃不等于生产适用性保证 |
| coolify | [`v4.7.6`](https://github.com/coollabsio/coolify/releases/tag/v4.7.6) | 2026-11-19 23:29 | 发布活跃不等于生产适用性保证 |
| trivy | [`v0.76.2`](https://github.com/aquasecurity/trivy/releases/tag/v0.76.2) | 2026-11-05 20:50 | 发布活跃不等于生产适用性保证 |
| lago | [`v1.57.0`](https://github.com/getlago/lago/releases/tag/v1.57.0) | 2026-11-05 22:46 | 发布活跃不等于生产适用性保证 |
| signoz | [`v0.151.0`](https://github.com/SigNoz/signoz/releases/tag/v0.151.0) | 2026-11-18 14:30 | ee 单独许可 |
| infisical | [`v0.167.14`](https://github.com/Infisical/infisical/releases/tag/v0.167.14) | 2026-11-21 07:00 | ee 单独许可 |
| valkey-io/valkey | [`9.2.0`](https://github.com/valkey-io/valkey/releases/tag/9.2.0) | 2026-11-19 16:45 | 按实际分发与依赖核许可 |
| sqlc-dev/sqlc | [`v1.31.1`](https://github.com/sqlc-dev/sqlc/releases/tag/v1.31.1) | 2026-04-22 22:55 | 按实际分发与依赖核许可 |
| basecamp/kamal | [`v2.12.0`](https://github.com/basecamp/kamal/releases/tag/v2.12.0) | 2026-06-18 15:58 | 按实际分发与依赖核许可 |
| docling-project/docling | [`v2.152.0`](https://github.com/docling-project/docling/releases/tag/v2.152.0) | 2026-11-23 21:29 | 代码 MIT，模型独立许可 |
| libvips/libvips | [`v8.18.7`](https://github.com/libvips/libvips/releases/tag/v8.18.7) | 2026-09-26 19:31 | 按实际分发与依赖核许可 |

### A.4 无法只用一个 GitHub latest 表示的项目

- PostgreSQL：[官方支持表](https://www.postgresql.org/support/versioning/)为 **19.0 / 2026-11-19**，18.7 等旧线受支持；14 已于 2026-11-12 结束支持。这里是发布日期，不是抓取时间。
- SQLite：[官方变更页](https://sqlite.org/changes.html)当前首项 **3.54.1 / 2026-10-16**。本轮烟测内置引擎不同，见附录 D。
- FFmpeg：[官方发布页](https://ffmpeg.org/download.html)当前 9.1 分支 **9.1 / 2026-11-20**；同时有旧分支修复版。具体构建启用组件决定许可。
- pgvector：本轮 GitHub releases 为空，不能推出项目未维护；以[官方 README/标签](https://github.com/pgvector/pgvector)和目标数据库扩展清单核对，本文不填未经确认的扩展版本。
- Flutter：官方 archive 区分 stable/beta/main；本轮官方 storage manifest 请求返回 404，archive 可读但未解析出动态版本表，不猜当前数字。
- Sentry/PostHog：服务端与 SDK、部署脚本与镜像渠道不同，本文只给已核 npm 数字与服务端许可/自托管事实，不把它们拼成一个版本号。
- Zero `1.12.0`、Electric JS client `1.5.28`、LiveStore `0.5.1` 及 Solid 2/UI SDK 的发布证据见 [UI 分册版本表](./reading-notes/ui-frontier-osint-dd-2026-11-23.md)。Electric 客户端不代表同步服务端；LiveStore 为 Apache-2.0。

维护判断只用可见事实：上述版本/日期、迁移公告、许可文件和公开支持政策；没有把星标/下载量当质量或未来资金保证，也没有推断任何团队不会停更。商业主体、基金会或活跃个人各有集中度/资金风险，采用前仍应查看响应与升级记录。

### A.5 两个完整 Web 模板的维护快照

不是用 stars 推断维护；直接查默认分支最近 commit，且包括机器人/文档更新，不能将其解读为已完成安全审计。实际复用时固定 commit、生成选项与依赖。

| 模板 | 默认分支观测提交 | 时间（Asia/Shanghai） |
| --- | --- | --- |
| fastapi/full-stack-fastapi-template | [`77e550a73bb4`](https://github.com/fastapi/full-stack-fastapi-template/commit/77e550a73bb49dd2967622c5ed11bf7a49603c93) | 2026-11-16 21:14 |
| cookiecutter/cookiecutter-django | [`08ab86bf5add`](https://github.com/cookiecutter/cookiecutter-django/commit/08ab86bf5addaa8d2807b77ff30875a80b2d962a) | 2026-11-23 10:14 |

## 附录 B：发现方法、反偏见与覆盖限制

### B.1 从能力到证据，而非从社交关系到排行榜

1. 把应用拆为领域/合同、端、计算、数据、同步、检索、文件、身份/授权、任务、AI、集成/收费、交付、观测/质量和恢复治理。
2. 每层先找低复杂度与成熟基线，再找机制不同的方案；搜索覆盖非 JS 生态、标准规范、官方教程、服务端源码、许可证、生产部署与故障语义。
3. 使用独立 Web 检索发现项目，以第一方 docs/repo/release 和 npm/PyPI/RubyGems/Hex/Go proxy/Packagist 确认身份与发布。营销数字只视为维护方主张，不当成本轮测量。
4. 主动找反证：升级限制、pre-1.0 警告、生产最低依赖、unsupported self-host、发布渠道迁移、服务端许可和数据导出缺口；再决定是否值得推荐。
5. 最后检查六条输入帖覆盖了什么、遗漏了什么，合并相同项目；没有把帖主偏好当成结论。

第一方也不等于中立。比如工作流厂商的对比表可能用对手最重拓扑比较自己的最轻配置；对象存储厂商 benchmark 不等于可靠性证明；BaaS 展示的“一个命令”可能只覆盖开发环境。本报告优先采用对手自己的部署/持久性文档核对。

### B.2 几组没有被“热门新工具”挤掉的长期路线

- **架构：** 模块化单体、受支持框架和标准 SQL 是强基线。多客户端不自动等于微服务；实时不自动等于离线；AI 不自动等于 agent。
- **协议/标准：** HTTP、SQL、[OpenAPI](https://spec.openapis.org/oas/latest.html)、[JSON Schema](https://json-schema.org/)、[OIDC](https://openid.net/developers/how-connect-works/)、[WebAuthn](https://www.w3.org/TR/webauthn-3/)、[CloudEvents](https://cloudevents.io/)、[OTel](https://opentelemetry.io/docs/)可以降低部分接线/退出成本。规范稳定度和实现兼容应分别检查，不能因为有标准就认定所有字段/语义可互换。
- **浏览器和原生能力：** HTML 表单、浏览器缓存、原生 dialog/popover、IndexedDB/OPFS、系统平台 API 与服务器页面，常比引入新框架更值得先用。细节见 UI 分册；这不把应用研究重新缩回前端。
- **成熟消息/搜索路线：** 需要跨系统路由、积压隔离、消费组或流式重放时，[RabbitMQ](https://www.rabbitmq.com/docs)、[NATS JetStream](https://docs.nats.io/nats-concepts/jetstream)、[Kafka](https://kafka.apache.org/documentation/)值得另立同层比较；不能假装 pgmq 是所有消息系统的替代。需要复杂全文、日志与聚合时，[OpenSearch](https://docs.opensearch.org/latest/)或 [Apache Solr](https://solr.apache.org/guide/)等也有长期价值。它们不进入本轮 74 项重点表，是为了避免把应用基础调研膨胀成各类集群全集，不是否认其能力。

### B.3 不能从本报告推出什么

- 没有对 74 项逐个完整安装、压测、安全审计、读取所有源码或演练灾备。没有付费模型、云部署、生产账号配置、付款、迁移或生产改动。
- 公开文档/注册表可能缓存、动态渲染或重定向；核验时遇到过旧 URL/404，已通过官方文档/仓库/注册表复核可确认部分。Flutter manifest、PocketBase 新发布渠道（直接读取为需动态渲染的空壳，未取得新版本列表）和 pgvector 精确当前版本仍有明确缺口，不用猜测补齐。
- 许可证摘要不是法律审查；正式分发、SaaS 竞争用途、模型/编解码器专利、企业功能要按所用版本与合同复核。收费服务没有统一报价；不报告未验证的免费额度、月费总额或性能倍数。
- 版本日期和活跃提交不能预测资金、核心作者离职或项目寿命。没有声称任何方案永远最佳；没有根据 stars、下载量或发帖热度排名。
- 选定生产方案后仍需专题尽调：数据库/对象存储的恢复、身份/租户隔离、供应链、所涉地区法规、成本与支持条款。高风险系统还需专业安全与合规审查。

## 附录 C：六条参考帖的确切身份与作用

下面保留**原链接、短原文与上下文记录**；长帖/文章在原站读取，不镜像其全文。四条早期帖的文章、引用和外链详见 [UI 分册出处附录](./reading-notes/ui-frontier-osint-dd-2026-11-23.md)。帖子是观察线索，不构成研究范围或采用授权。

| 来源与时间（Asia/Shanghai） | 短原文/确切主题 | 经核实的主来源与对研究的作用 |
| --- | --- | --- |
| [@shadcn / 2123132082042151332](https://x.com/shadcn/status/2123132082042151332)，11-19 03:11:48 | “If you're building UI with @solid_js, try UI SDK. We built it for Solid 2.0.” | 指 [UI SDK Solid adapter](https://ui-sdk.dev/docs/solid)，[repo](https://github.com/vercel-labs/ui)，引用 Solid 2 发布；**不是 AI SDK**。引出行为组合而非全栈范围 |
| [@devagrawal09 / 2089089101010239926](https://x.com/devagrawal09/status/2089089101010239926)，08-17 04:37:09 | “React asks you to predict. Solid asks you to read.”；关联 Solid 2 长文 | [文章](https://x.com/i/article/2088771846485213184)、[Solid 官方公告](https://www.solidjs.com/blog/solid-2-0-the-long-hold/)、[Cursor 工程人员反证](https://x.com/poteto/status/2089227731305464150)；不把可编辑文章相对日期或迁移行数当性能因果证据 |
| [@bilalgursen777 / 2124806474492723244](https://x.com/bilalgursen777/status/2124806474492723244)，11-23 18:05:15 | “Liquid Glass is now built on @uisdk.” | [Liquid Glass repo](https://github.com/bilalgursen/liquid-glass)：React/Tailwind + 同一 UI SDK 的行为 + WebGL2 外观。不是另一个 SDK，也不是 Solid 组件库；去重 |
| [@cu30rry_ / 2124807418739605514](https://x.com/cu30rry_/status/2124807418739605514)，11-23 18:09:00 | “技術選定を「検証可能性（Verifiability）」と「決定論（Determinism）」をベースに” | 个人 Solid2/UI SDK/StyleX/Storybook/Vitest/fast-check/tla-ts/pstack/Thermos 工作流；引出可验证合同与分级成本，不将模型审阅视为确定性验证 |
| [@realchendahuang / 2124508785482072194](https://x.com/realchendahuang/status/2124508785482072194)，11-22 22:22:20 | “分享下我目前常用的技术栈” | 八类个人偏好覆盖 Web、工具链、Cloudflare、Go 部署、PG/缓存/队列/存储、桌面、原生与脚本。引出完整应用责任，但不能把偏好当普适最优；详见下文 |
| [@otterpal24 / 2124810297785675820](https://x.com/otterpal24/status/2124810297785675820)，11-23 18:20:26 | “@KaiwenR1 这两周应该就有团队倒腾出来了” | 是对 Solid2 组件库的预测，不是新项目发布。上文含个人重写性能图；没有可独立验证的组件库 repo，去重到 UI 分册 |

### C.1 第五帖的八类内容怎样被核对，而不是照单全收

- Web 接线：React/TS/Vite/Tailwind/TanStack、shadcn/Base UI/Motion 与 Hono/Zod/Drizzle/Better Auth；它们分别处于界面、合同、数据库访问与身份层，并不覆盖备份/运营。
- 工具链：Oxc/oxlint/oxfmt/tsrs、Vitest/Playwright。`tsrs` 不是本文擅自改成另一款类型检查器；Oxc 有 [2026-11-17 的官方说明](https://oxc.rs/blog/2026-11-17-faster-type-aware-linting-with-tsrs.html)。文中的速度是作者 benchmark，非本轮结果。
- 网络工具：Cloudflare Workers/Hono/D1/KV/Queues/R2/Email。正文按服务语义核对，包括最终一致/重复投递与 Email Sending Beta，不因是一家供应商就当作一个一致性模型。
- 独立服务：Go/Gin、Compose、Caddy。这是有效的简化路线；“需要高并发就必须 Go”是个人选择，不是排除 JVM/.NET/BEAM 等的依据。
- 数据运维：Pigsty/Postgres、pgmq、Redis/Valkey、RustFS。本文单独核对数据库支持线、Redis 版本许可、对象存储升级与备份，而非照抄组合。
- 桌面：Wails v3/SQLite 与 Electron。Wails 稳定/夜间通道已查；Electron 体积与跨平台一致性、WebView 的系统差异应按产品测试，而非“轻/重”标签决定。
- 原生：Swift、Kotlin、Tauri/Win32；这提醒端形态由设备能力决定，不是所有应用都塞进浏览器。
- 自动化：Python/uv 有明确身份；“Ego Lite” 的项目/许可/登录态访问边界未确立，不纳入推荐，不提供 cookie 抓取工作流。

### C.2 第六帖必须展开线程：一个预测与一个混合变量测试

被回复的 [@KaiwenR1 帖](https://x.com/KaiwenR1/status/2124809253068460250)，11-23 18:16:17：

> @otterpal24 我期待solid2的UI组件库

更上游 [@otterpal24 原帖](https://x.com/otterpal24/status/2124793327619129621)，11-23 17:13，描述以 Solid2 + Vercel UI SDK 重写相同界面，并附 [性能截图](https://pbs.twimg.com/media/HXzIQC7bIAAycMy.jpg)。图中声称为 12 轮本地成对测试中位数：

| 图中任务 | React + Ant Design | Solid2 + UI SDK |
| --- | --- | --- |
| 首次订单就绪 | 436.4ms | 132.7ms |
| 打开录入对话框 | 60.7ms | 14.3ms |
| 客户选项 | 25.9ms | 10.2ms |

**这是截图中的作者报告，不是本轮测量。** 框架与组件库同时改变，未附可核复现仓库、设备/数据、harness 或原始样本；不能将差异归因到 Solid 本身，也不能由“这两周”推导一个组件库已经发布。它贡献的是一个应检验的性能假设，没有新增独立候选，更不能再次缩窄全应用研究。

## 附录 D：本轮真正测试了什么

### D.1 一个隔离的事务/outbox/重试/恢复烟测

在临时本地目录运行 Python 标准库 `sqlite3`，无网络、账号、秘密、外部服务或生产改动。业务库与模拟接收端是两个独立 SQLite 文件；没有共享一个跨系统事务。测试步骤：

1. 在一个事务写业务记录和 outbox，然后在 commit 前注入异常，确认两者一起回滚。
2. 正常提交一个业务事件。
3. 将事件投递到模拟接收端，以事件 ID 的唯一约束实现 `ON CONFLICT DO NOTHING`；模拟接收成功、源 outbox 尚未确认时崩溃。
4. 重试投递，再确认源 outbox；断言投递尝试为 2，但接收端效果只有 1。
5. 用 SQLite backup API 生成独立副本，从副本连接读取，断言业务记录存在。

实际输出（2026-11-23，Asia/Shanghai）：

```json
{
  "sqlite": "3.46.1",
  "rollbackTogether": true,
  "attempts": 2,
  "destinationEffects": 1,
  "restoredOrders": 1
}
```

它验证本地示例中事务、稳定幂等键与备份读取的行为，**不证明任意外部 API exactly-once、不证明队列/Temporal/DBOS/Restate 已部署、不证明多机故障/RPO/RTO、不证明实际对象存储或云数据库恢复**。模拟接收端恰好支持按事件去重；若真实支付/邮件 API 无幂等或状态查询，必须单独解决。

### D.2 研究与执行的边界

- 执行了公开元数据获取、日期转换、文档一致性检查和上述 SQLite 烟测。
- 没有创建实际应用、迁移已有系统、调用付费模型或云服务、生产部署/付款，也没有对候选作统一性能排名。
- UI 分册另外记录其已执行的有限包/浏览器相关检查；不能把那些局部检查扩张为本报告全栈验证。
- 仓库交付检查：候选 1–74 连续且无重复、16 份重点分析、6 种组合、相对文件链接和代码围栏通过；`git diff --check` 通过。147 个非注册表/仓库的公开来源路径检查未余留 404；可达性不等于内容全部可信。
- `bash scripts/lint-pack.sh` 仍有两项既存失败：同一个无关 UI 资产缺主路由/交叉引用及局部清单项；与干净基线一致，本文未引入新失败，也未修改无关资产来制造全绿。
