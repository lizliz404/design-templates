---
name: uisfx-semantic-cues
description: >-
  Sparse semantic UI sounds in the consuming app (not in this pack). MIT code,
  CC0 audio. Sound never replaces visible status.
---

# UI SFX — 语义事件映射

pack **不安装** `uisfx`，不携带样本库。需要时只在消费项目：`npm install uisfx`。  
上游：[romainsimon/uisfx](https://github.com/romainsimon/uisfx) · 代码 MIT · 音频 [CC0](https://github.com/romainsimon/uisfx/blob/main/LICENSE-AUDIO)。

```text
1. 仅在消费项目：npm install uisfx
2. const ui = createUISFX({ pack: 'minimal', preferences: {} })
3. 首次可信 pointer/keyboard action 后：await ui.unlock()
4. 稀疏导航 hover -> ui.play('hover')
5. 主操作 click/press -> ui.play('press')
6. 保存、上传、完成 -> ui.play('success')
7. 阻断性提交失败 -> ui.play('error')
8. 可见的处理中状态 -> const handle = ui.play('processing')
9. 成功、失败、取消或离开页面 -> handle?.stop()
10. toast、文案、颜色和状态不可省：声音从不作为唯一信号
11. 提供持久 mute：ui.setEnabled(false)
12. 遵守用户音量与浏览器/设备 autoplay 规则
13. 高频 error/notification 必须 rate-limit
14. 密集表格、阅读、连续输入、auto-refresh -> 静音
15. reduced-motion 不等于静音偏好；仍让用户自主关闭声音
```
