---
name: telegram-web-chat
description: >-
  Telegram Web A/K 源码研究与 Chat-first 产品适配记录。Use when designing
  a chat-first workspace, preserving unsent drafts or reading position,
  auditing attachment/media async ownership, or continuing the Chuhai migration.
---

# Telegram Web A/K → Chat-first 工作区

不是 Telegram 换皮模板，而是成熟聊天交互的机制研究：**稳定消息阅读、底部输入、未发送稿与在途请求分层、附件/媒体所有权、失败恢复**。

用户选择将本组长期设计材料放入 Design Templates；原出海云记录保留，不删除，也不改变产品真源。此包没有可安装的 Telegram 组件、IM 服务或新 Agent runtime。

## 阅读顺序

1. [执行对账](execution-record.md)：先知道什么已实现、什么只验证、什么仍没验证，避免重做旧任务。
2. [Chat-first 框架与正式迁移记录](chat-first-framework.md)：2026-10-05 的表现层边界、评审、原型与实现验收。
3. [Web A 深读](a-research.md)：滚动、草稿/发送、typed content、搜索/overlay；固定源码版本。
4. [Web K 深读](k-research.md)：上传/取消、媒体/Blob、草稿、移动 overlay；固定源码版本。
5. [离线可点原型](chat-first-prototype.html)：用浏览器打开；不接后台、无真实上传/执行。演示状态、通用壳切换和停止按钮不是生产能力。

## 流程（如何复用）

1. 找目标产品的真实同构问题，不因 Telegram 有某功能就照搬。
2. 先保留现有请求、权限、任务、素材与幂等合同；表现层和业务控制器分开。
3. 给阅读位置、快速刷新、身份切换、移除后晚回包写窄 fixture。
4. 现有原生能力或成熟组件已满足时停止添加机制；只适配证据证明缺失的部分。
5. 分别报告源码事实、mock 浏览器、真实产品服务、真机键盘/弱网及部署结果。

## 机制依据

- 壳只拥有 header / conversation / composer、阅读状态和焦点；场景注入 proposal / run / gate / artifacts。
- 未发送文本可恢复，但未知结果的已发送请求不能恢复成新稿；失败续跑用同一 request ID。
- 用户读旧消息时不抢位置；主动发送立即贴底；手动回最新可使用尊重 reduced-motion 的平滑滚动。
- async 回包先确认上下文、任务身份和代际；移除或卸载后不能复活旧状态。
- UI 移除 ≠ 网络取消；真实业务状态 ≠ typing 动画；浏览器 viewport mock ≠ 真机软键盘。

## 边界与证据

- A：[`28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80`](https://github.com/Ajaxy/telegram-tt/tree/28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80)。[52 文件收据](evidence/a-src-receipt.tsv)及 [tree manifest](evidence/a-tree-28ffcf710b15571e5a2f7bb3bdce3fc90fc8ec80.json)。下载收据不等于全文件完整阅读。
- K：[`125a31da7665d5ee09ceb9c5de66e2615e3276b6`](https://github.com/morethanwords/tweb/tree/125a31da7665d5ee09ceb9c5de66e2615e3276b6)。[原固定源码收据](evidence/k-pinned-source-receipt.json)；只覆盖原收据的三个文件，不冒充全量 K 研究清单。
- 上游源码正文未 vendoring；按固定 revision 与相应 path 可重新获取。运行证据只保存与本次执行取舍有关的五份历史日志，见执行对账。
- 历史研究中的“缺失/候选”是当时状态，不能代替执行对账或最新产品代码。产品决策仍归出海云 `PRD.md §6.2`，本包不另定产品合同。
