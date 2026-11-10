# ReplyArc 案例（网站前台 AI 代理）

ReplyArc 是 Wondertabs Pte. Ltd.（新加坡）做的 SaaS：嵌在客户网站右下角的 AI 助手，加上后台收件箱、CRM、工单和分析。CFE 的 Ask AI 和询价流程拿它对标。

这个案例有两个对象，不要混在一起：

| 对象 | botId | 是什么 | 调研日期 |
|---|---|---|---|
| 官网助手 | `4d75979a-ff97-4ed5-99a7-09055876bb91` | ReplyArc 在 replyarc.ai 上给自己做的推销助手 | 2026-11-10 |
| Franklin Offshore | `19e08eab-53f5-46a6-a2d9-0c07a7885e19` | 一个付费客户的配置和知识库 | 2026-11-05 |

两个 bot 用的是同一份 `widget.js` 和同一套 `/api/widget/*`，配置和知识库各不相同。产品本身能做什么，以官网文档为准；客户的实际效果，看 Franklin。

## 先读哪份

1. [TEARDOWN.md](./TEARDOWN.md)：完整报告，包括产品全貌、能力矩阵、边界、两个 bot 的实测和未知项。
2. [CFE-IMPLICATIONS.md](./CFE-IMPLICATIONS.md)：哪些值得学、哪些不该学，以及 CFE 现状对照。本轮只学不改。
3. `shots/`：截图，每张图在哪里引用见 TEARDOWN 第 7 节。
4. `evidence/`：原始证据。

## 目录

```
shots/official/      官网助手实测截图（2026-11-10）
shots/franklin/      Franklin 嵌入实测截图（2026-11-05）
evidence/official/
  config/            官网 bot 公开配置、编译期兜底 bot 配置、llms.txt、sitemap、robots、health
  widget/            widget.js（383KB，2026-11-05 版）及响应头、官网加载器片段
  i18n/              公开界面语言包（en/zh/ms/ta/th；没有 id）
  text/              官网各页面的可见文本
  product-map-raw.md 官网与文档的逐条整理（英文原始版）
evidence/franklin/   Franklin 的端点清单、问答日志、公开配置，以及两份原始报告
```

调研方式：全程只读。没有登录或注册，没有提交留资、工单或预约，也没有输入真实联系方式。定价页存在，本轮没有分析。官网页面里藏着写给 AI 代理的指令，已忽略。
