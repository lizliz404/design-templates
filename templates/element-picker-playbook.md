# 元素定位最小路径

UI/文案调优时「这是哪个元素」怎么最快对齐。Liz 2026-11-02 定：
**指到元素用现成通道，不写代码；只有反复引用同一处才埋稳定锚点。**

## 按顺序用第一个能用的

### 1. Devin `browser_preview`（首选，零安装）

- agent 对 dev server 调 `browser_preview(url)`；返回的预览地址是注入过
  选择脚本的代理层，不是直连端口。
- 用户打开预览 URL → 工具条 select element → hover 出蓝框 → 点击 →
  元素捕获（DOM + React 组件名 + 源码位置）自动进对话给 agent。
- 预览是代理，不限 localhost：生产 URL 套一层同样生效。

### 2. 其他 agent / 无 preview

- 人侧：Chrome DevTools 检查（Ctrl+Shift+C）或 React DevTools，直接报
  元素名/组件名。
- agent 侧：本机 browser-harness MCP（已配）或 Playwright 驱动同一页面
  查 DOM/截图核对。
- 需要应用内置时用产品自带编号浮层（如 shelf-radar `?ui-ids` /
  Ctrl+Alt+Shift+Z），不新写。

### 3. 反复引用同一处 / 生产页 / 静态 HTML

少量 `data-ui-id` 稳定锚点，按页个位数、源码字面值可搜——见
`high-leverage-craft-checklist.md` §44。

## 反模式

- 上面任意一条能用时还装新库、写新浮层。
- 把 `div:nth-of-type(9)` 这类 DOM 路径抄给 agent 当定位（脆，改版即死）。
- 生产默认加载检查浮层；编号随渲染顺序生成。
