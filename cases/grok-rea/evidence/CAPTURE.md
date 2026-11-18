# 采集说明（2026-11-18，Asia/Shanghai / UTC+8）

本案例分两批证据：**v1 公开态**（urlscan/Jina/CDN 静态件）与 **v2 登录态运行时**（REA connect 场景）。v1 段保留原文备查。

## v2 — 登录态运行时采集（REA 6.9.0 connect 模式）

### 会话态怎么来的

- 不尝试 UI 登录：`accounts.x.ai` 对 headless 出 Cloudflare「Attention Required」拦截页，绕质询超出范围。
- 改走**会话克隆**：从桌面 Chrome profile 把 Grok/X 域的会话状态（cookie 库与存储加密 blob **原样复制**，全程不解密、不打印值）装进一次性 profile `/tmp/grok-rea-profile`，`--remote-debugging-port=9444` 起 Chrome 157 headless（1440×913）。
- `rea list-browser-targets http://127.0.0.1:9444` 确认 target `8494FE3F…` → `https://grok.com/`（登录壳可见即会话有效）。

### 场景工具

`rea capture-browser-scenario <file>`，场景 = JSON 文件（`rea-runtime/scenarios/s*.json`），含：
- `browser.mode:"connect"` + `cdp_endpoint` + `target_id`（跑前核对身份）；
- `capture.after_each_step: [screenshot, accessibility, url]`；`at_end` 按需加 `storage`；
- `capture.events: [console, page-errors, network, websockets]`；
- `network`: 第一版开 request/response body → 事件分配上限被打爆（s2：1676 留 / 1031 弃）；**第二版关 body 只留元数据**（s8：3044 事件 0 丢弃）→ 端点面完整，body 形状由 s8 保留的 WS 帧补齐。
- connect 模式不拥有浏览器，结束后页面留在原处；`start_url` 会触发导航、把右栏等瞬态关掉 —— 要在同一场景内连续操作。

### 已跑场景与 Evidence ID

| 文件 | Evidence ID | 说明 |
|---|---|---|
| s0-smoke | — | connect 通路 |
| s1-home-menus | `ev_7ef545aa…43ed` | 模型档五档、+ 菜单五项、Settings 壳 |
| s2-private-chat | `ev_ec1da927…36ba` | Private 协议级证据、发送、流式、中断（事件截断） |
| s3-sidebar | `ev_578d95e6…11ec` | 侧栏（`Show more` 重名撞 strict mode，部分） |
| s4-account-and-nav | `ev_6cd12f8f…602c` | 账户菜单三项、Library 异常态 |
| s5-routes | `ev_59109a37…2d2e` | /imagine→/、/history、/project、/automations→Settings、/plans→accounts.x.ai(CF 拦) |
| s6-settings | `ev_11674062…90e` | Settings 12 分区 a11y 全文 |
| s7-plus-submenus | `ev_4f9e4751…9c20` | Skills 子菜单（Files/Projects 未采到） |
| s8-send-traffic | `ev_da8085a9…60fd` | **WS 协议全貌**：mgw session.create/response.create/presence + bot JSON-RPC |
| s9-workbench | `ev_8c716e79…09eb` | 右栏空态（Open tabs / New tab / 三个产物入口） |
| s10 / s11 首试 | `ev_f383e5fc…` / `ev_fa1917cd…` | 失败场景（schema / ellipsis 名失配），留档当教训 |
| s11-pane-deep 复跑 | `ev_dad3b694…5658` | Open a file（无 DOM 态）、New tab、Canvas 空态 |
| s12-conversation | `ev_747533c7…8b11` | 会话页：消息结构、版本分页、上下文菜单九项、右栏 App preview 入口 |
| inspect | `ev_9a6b41d7…f45b6` | 登录首页 storage/script 清单 |
| observe（作废） | `ev_7fa9d62c…dda89` | `observe-web-session` 晚接入 → `attach_limited`，0 事件。**教训：观测要与动作在同一场景内** |

### 静态件

`rea-runtime/bundle/`：456 个已加载 JS chunk（28MB，`bundle-manifest.tsv` 记 URL→sha256）。来源 = `inspect` 的 script 清单 + s2/s8 网络事件里实际请求的 cdn.grok.com 块。`analyze-javascript-application` 全量跑中（进度 ~160/456，worker 堆受限较慢），结果落 `out-bundle-analysis.json`。

### 边界与没拿到的

- `/plans` 结算流：302 到 `accounts.x.ai/unify`，该域对本 profile 出 Cloudflare 拦截（Ray ID `a5c58746bbf7aca3` 存档于 s5 证据）。
- `Open a file…` 的选择器 UI 不在 DOM（系统级或瞬关）。
- 写操作只发生过一次：s2/s8 各发一条合成测试消息（明确授权、内容无意义）；其余全部只读。`/rest` 未主动调用过 —— 清单全部来自浏览器自发请求。
- `observe-web-session` 对已在跑的 Chrome 目标不可行（attach_limited）——动态面必须 scenario 内采。

### 隐私规则（入库/公开前必须执行）

- 场景 a11y 文本与截图含：真实会话标题（中文）、账户名与邮箱、bot 名。属于**本地证据层**；对仓库/公开输出应替换为 `<会话标题>` / `<账户>` 等占位，或裁切对应区域。
- 永不入库：cookie/authorization 值、decrypted storage、`castle_request_token` 原值（证据 JSON 里出现处应在公开版中截断）。
- Evidence JSON 保留于本地 `rea-runtime/out-*.json`；如需入库只进摘要（去个人字段版）。

## v1 — 公开态采集（保留原文）

全程只读公开页面与公开静态资源。没有登录或注册，没有向 grok.com 提交表单或发送对话，没有使用或保存会话 cookie / 凭证，也没有请求 `robots.txt` 对通用爬虫 Disallow 的 `/rest`、`/share-links`、`/c/`、`/chat/`、`/project/*`。

### 为什么不是本机 Playwright 直抓 grok.com

对 `https://grok.com/` 的 box 端 `curl` 收到 Cloudflare 托管质询（HTTP 403，`cf-mitigated: challenge`，正文为 "Just a moment..."）。同一出口无法稳定拿到 HTML。本执行环境也不能驱动盒内桌面浏览器。因此：

1. 页面文本：Jina reader 与 WebFetch/Exa（公开抓取器）拿到访客首页与 `robots.txt`、`sitemap.xml`。
2. 截图与响应头：urlscan.io 公开扫描（截图接口无需登录；完整 result/DOM API 对本机返回 "not logged in"，故只保留从公开结果页抽出并已脱敏的头与 CSP）。
3. 前端栈：`cdn.grok.com/_next/static/...` 对象可直接下载（Cloudflare R2 公共桶，`access-control-allow-origin: *`）。
4. 营销面 x.ai：box curl 可直接拿到 HTML，截图同样来自 urlscan 公开扫描。

### REA（v1）

`npx -y rea-agents@latest analyze-javascript-application`（6.9.0），完整 Evidence 约 191MB 不进 git；保留 `evidence/rea/summary-public.json`。

### 未保存的东西（v1+v2 通用）

- 任何 `Set-Cookie` / Cookie / Authorization 值
- 单次请求的 CSP nonce
- urlscan 5MB 结果 HTML 与大体量 REA 原 JSON（进 git 的是摘要）
- 用户生成的 Imagine 分享图本身不是研究对象
