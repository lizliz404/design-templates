# 采集说明（2026-11-18，Asia/Shanghai / UTC+8）

全程只读公开页面与公开静态资源。没有登录或注册，没有向 grok.com 提交表单或发送对话，没有使用或保存会话 cookie / 凭证，也没有请求 `robots.txt` 对通用爬虫 Disallow 的 `/rest`、`/share-links`、`/c/`、`/chat/`、`/project/*`。

## 为什么不是本机 Playwright 直抓 grok.com

对 `https://grok.com/` 的 box 端 `curl` 收到 Cloudflare 托管质询（HTTP 403，`cf-mitigated: challenge`，正文为 “Just a moment...”）。同一出口无法稳定拿到 HTML。本执行环境也不能驱动盒内桌面浏览器。因此：

1. 页面文本：Jina reader 与 WebFetch/Exa（公开抓取器）拿到访客首页与 `robots.txt`、`sitemap.xml`。
2. 截图与响应头：使用 urlscan.io 上已有的公开扫描（截图接口无需登录；完整 result/DOM API 对本机返回 “not logged in”，故只保留从公开结果页抽出并已脱敏的头与 CSP，不 vendor 5MB 原页）。
3. 前端栈：urlscan 结果里出现的 `cdn.grok.com/_next/static/...` 对象可直接下载（Cloudflare R2 公共桶，`access-control-allow-origin: *`，`cache-control: public, immutable`）。box curl 对这些资源是 HTTP 200。
4. 营销面 x.ai：box curl 可直接拿到 HTML（Next.js 预渲染），截图同样来自 urlscan 公开扫描。

urlscan 截图视口均为 1600×1200，不是 vercel-rea 那种 1280/1920 本机多宽测量。Cookie 横幅在多数扫描里可见；本轮无法替扫描器点「全部拒绝」。2026-11-14 的英文首页扫描没有横幅，原因不明（可能已有同意记录或地理/时机差异）。

## REA

使用发布版 CLI，而不是本机脏的 `/workspace/rea-work/rea` 检出：

```
npx -y rea-agents@latest analyze-javascript-application <abs>/evidence/grok-com-app --json
```

CLI 版本：**6.9.0**。完整 Evidence 约 191MB，不进 git；仓库里保留 `evidence/rea/summary-public.json` 与静态路径候选。分析是惰性解析，不是运行时执行。

## 未保存的东西

- 任何 `Set-Cookie` / Cookie / Authorization 值
- 单次请求的 CSP nonce
- urlscan 5MB 结果 HTML 与 191MB REA 原 JSON
- 用户生成的 Imagine 分享图本身不是研究对象；`shots/grok-imagine-share-de-2026-10-26-1600.png` 只用来看分享/播放器壳，来源是公开扫描
