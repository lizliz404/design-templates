# grok.com 案例（xAI / SpaceXSI 的公开 Web 产品）

研究对象是 **grok.com** 的公开 Web 面：访客聊天首页、Imagine 生成面，以及公司营销站 **x.ai**。法律与页脚在 2026-11-18 已把主体写作 SpaceX Super Intelligence LLC（SpaceXSI）；产品名仍是 Grok。调研日期 2026-11-18，Asia/Shanghai（UTC+8）。

本案例是只读的产品/前端拆解，不是安全评估，也不是可安装的 UI 轮子。

## 先读哪份

1. [TEARDOWN.md](./TEARDOWN.md)：完整报告。先读开头的一页结论，再按需下钻栈、chrome、token 与未知项。
2. [IMPLICATIONS.md](./IMPLICATIONS.md)：对 Liz 的 agent 聊天面 / Product Studio 有证据的对照笔记。只学不改。
3. `shots/`：公开页截图。每张图在 TEARDOWN 里有引用，来源见 [shots/SOURCES.md](./shots/SOURCES.md)。
4. `evidence/`：原始证据（脱敏头、CSP、公开 CSS/JS 子集、REA 摘要、robots/sitemap）。

## 目录

```
shots/                 1600×1200 公开扫描截图（英文/德文/法文首页、Imagine、x.ai）
scripts/               重新拉取已记录的 cdn.grok.com 子集
evidence/
  CAPTURE.md           采集方法、Cloudflare 质询、未保存项
  css-tokens.md        从公开 CSS 读出的字体/间距/圆角/颜色
  grok.com/            robots、sitemap、Jina 首页文本
  x.ai/                营销站 robots、可见文本、栈笔记
  urlscan/             2026-11-17 瑞士扫描的脱敏头/CSP、资源清单与子集哈希
  grok-com-app/        代表性公开静态资源（预加载 JS/CSS、字体、turbopack runtime）
  rea/                 REA CLI 6.9.0 的公开摘要与静态路径候选（完整 191MB JSON 不进仓）
```

调研方式：全程只读。没有登录或注册，没有发送对话，没有提交表单或个人数据。box 对 grok.com HTML 被 Cloudflare 托管质询拦住，截图与响应头来自 urlscan.io 公开扫描，静态资源从 `cdn.grok.com` 直接下载。详见 `evidence/CAPTURE.md`。
