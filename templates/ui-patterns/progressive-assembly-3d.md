---
name: progressive-assembly-3d
description: >-
  A progressive 3D assembly interaction: one meaningful piece per action,
  visible assembled-count state, direct rotate/zoom controls, pause, and an
  honest non-WebGL fallback. Use when assembly itself explains product state;
  not as a generic spinning-object hero.
---

# Progressive 3D assembly

类型：interaction mechanism study（无源码收录）  
观察源：[wishlist-lego.vercel.app](https://wishlist-lego.vercel.app/)（页面 title `LEGO`）。2026-09-12 直连浏览器被站点 Cloudflare challenge 拦截；可读代理只暴露以下界面文本：`Pause rotation`、`Next piece`、`Drag to rotate · Scroll to zoom · Click to build the next piece`、`3D couldn’t start...`、`Assembled 01 / 04`。未找到可核验 GitHub 仓库或许可证，因此本文件只记录已观察机制，不声称 Next.js、Rebrickable、wishlist 数据模型或视觉细节。

## 值得复用的不是 LEGO，是状态模型

用户每次只推进一个 piece；场景通过 `assembled current / total` 说明进度；rotate / zoom 是检查对象的直接操作；pause 把自动运动交还给用户；WebGL 失败时明确说 3D 未启动。它把“动画”变成可操纵、可暂停、可计数的解释器，而不是一颗自己转的装饰球。

## 最小状态机

```text
idle(0/N)
  ├─ next / canvas click → assembling(k→k+1)
  ├─ drag → inspect(rotation)
  ├─ wheel/pinch → inspect(scale)
  ├─ pause → paused(k/N)
  └─ renderer error → fallback(k/N)
assembling → idle(k+1/N) | complete(N/N)
```

## 何时用

- 产品价值本身是“组装、累积、连接、归档、搭建、逐步确认”。
- 每个 piece 有业务含义，用户能说出它代表什么。
- 1/N 到 N/N 的进度来自真实状态，不是定时器演戏。

适合迁移的例子：素材逐条归入 working set、证据逐项连接到结论、流程节点逐个确认、配置模块逐块启用。

## 实现合同

1. **一动作一块**：Next 只增加一个 piece；完成前可暂停、重复查看，不自动跳完。
2. **进度常显**：`已装 01 / 04` 使用 tabular nums；screen reader 同步读状态。
3. **控制权**：自动 rotation 默认可停；拖拽与滚轮必须有文字提示，并给键盘 / 按钮等价入口。
4. **因果动效**：piece 从其来源或连接点进入；结束位置对应业务结构，不随机爆炸。
5. **fallback 同义**：无 WebGL 时改成 SVG / 2D 分层或列表，仍能 Next、看 k/N 和读 piece 名；不能只留错误句。
6. **性能**：场景离屏 / hidden 停 rAF；DPR 封顶；renderer/context 失败可回收并进入 fallback。
7. **减少动态**：`prefers-reduced-motion` 直接切换 piece 可见性或短 dissolve，不飞行、旋转或弹跳。

## 禁用条件

- 只想让 hero “高级一点”；这会落入 Three.js-for-a-still-object。
- piece 没有语义、顺序不影响理解，或产品不能提供真实 current/total。
- 手机端拖拽会抢页面滚动，又没有独立 controls。
- 来源许可证不明却想复制模型、材质、camera 或代码；本来源当前只能独立重做机制。

## 验收

- [ ] 用户不看说明也能完成 Next / pause / rotate / zoom。
- [ ] 键盘、触屏和 pointer 都有等价路径；滚动不会被无条件劫持。
- [ ] 0/N、处理中、k/N、N/N、renderer failure 五态可读。
- [ ] 2D fallback 仍能完成核心任务，而非一句“请开硬件加速”。
- [ ] 模型与材质由消费项目自有或明确许可资产提供。
