---
name: proof-first-launch-storyboard
description: >-
  A four-beat launch-film pattern: lead with verified proof, make the system
  legible as an assembling diagram, introduce tension only after trust, and
  close on one line rather than a feature recap. Use for product-launch films
  and motion storyboards; not for inventing metrics or copying source footage.
---

# Proof-first launch storyboard

类型：motion narrative recipe（非视频素材包）  
来源：[Titouan Gillet 的 Cloudflare launch-film breakdown](https://x.com/titouangillet_/status/2098424955381665973)及其[带 55 秒视频的父帖](https://x.com/titouangillet_/status/2098423993652887785)，2026-09-11。产品事实交叉核验：[Cloudflare 页面存档](https://archive.ph/TU81y)。

## 为什么值得收

普通 SaaS demo 是「痛点 → 功能 → 功能 → CTA」；这支片把顺序反过来：先拿已验证的规模事实建立信用，再用系统图解释平台，之后才短暂展示压力，最后只留一句主张。它卖的是**理解速度**，不是转场数量。

## 四拍

| 拍 | 画面任务 | 文案任务 | 时长纪律 |
|---|---|---|---|
| 1. Proof | 标志或核心对象快速成形，立即切证据 | 一条可核验事实；来源先备好 | 前 3 秒内成立 |
| 2. System | 模块按依赖顺序逐块装配；连线最后出现 | 不报菜单名，解释各部分如何成为一个系统 | 一屏只增加一个关系 |
| 3. Tension | 一个真实压力信号突然放大，再切一组后果 | 痛点只说已知故障/代价，不情绪勒索 | 信任建立后才出现；一次切完 |
| 4. Resolve | 画面清空，主张独占，随后品牌与 URL | 一句可记住的 line；不复述全部功能 | 留足静止时间再结束 |

源片中的已观察例子：Cloudflare 标志 burst → “powering 20% of the Internet” → Workflow / Compute / Workers AI / Storage 等距模块装配 → 流量尖峰与 incident alerts → “Build without boundaries.”。这些是分析证据，不是可复制文案。

## 使用流程

1. 写一句 transformation：用户看完后从“不明白系统”到“能复述系统”。
2. 准备一条**已有来源**的 proof；没有真实数字就用可演示事实，不造百分比。
3. 把产品画成 3–5 个块，按输入 → 处理 → 结果的因果顺序装配。
4. tension 只选一个：等待、错误、成本、风险或碎片化；不要痛点 montage。
5. resolve 用一个动作或一个状态变化完成，不拍十秒“终于轻松”。
6. 结尾只留一句主张；feature recap 全删。

## 边界

- 不 vendor、重剪或逐帧复制原视频；本文件只抽叙事机制。
- proof 必须能链接到产品事实源；“20%”这类数字不能换品牌后照抄。
- 等距图只在它能更快解释关系时使用；单功能产品用真实界面状态变化更诚实。
- 动效负责导视，不负责遮住信息空洞；每个 beat 在静帧下也应可读。
- 声音另走 [`uisfx-semantic-cues.md`](./uisfx-semantic-cues.md)；无声观看仍须完整成立。
- `prefers-reduced-motion` 版本保留四拍顺序，以 cuts / opacity 替代 burst、飞入和视差。

## 验收

- [ ] 第 3 秒前出现的 proof 有来源。
- [ ] 观众能在 10 秒内说出系统的 3–5 个组成关系。
- [ ] tension 在 proof 之后，且只有一个主要矛盾。
- [ ] 结尾没有 feature 清单或第二句副标题。
- [ ] 静音、暂停和 reduced-motion 都不损失产品含义。
