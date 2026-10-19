---
name: diagram-skills
description: >-
  Survey of agent skills that draw architecture / flow / data-flow diagrams
  (animated JSON panels, interactive HTML+SVG, editorial SVG, Mermaid themes,
  draw.io, Excalidraw MCP). Use when visual-economy says a picture is needed
  and you must pick which skill renders it; when a social post needs a
  "running system" animated diagram (live-panel); when a doc needs an
  editable or click-through architecture diagram.
---

# Diagram skills — 选哪个 agent skill 来画图

一行定位：[`visual-economy.md`](./visual-economy.md) 决定**要不要画、画到哪一阶**；本文决定**用哪个现成 skill 画**。轻量调研（README + `gh api` 元数据，2026-10-19，日期为 UTC+8），不 vendor 任何代码，要用时按链接现装。

## 流程

1. 先过 visual-economy：claim + 读者问题 → 能停在 prose / ASCII / 原生 Mermaid 就停。
2. 确定**交付表面**：GitHub/docs（静态）· 讲解/工作坊（可点）· X/小红书（视频）· 要给别人二次编辑（.drawio / .excalidraw）。
3. 按下方「何时选哪个」挑**一个** skill；装上后跑它自带的 checker（几乎每个都有 lint / 碰撞 / 帧检查），截图目视后再交付。
4. 交付物保留**文本源**（JSON / .mmd / .drawio / HTML），渲染产物（mp4 / svg / png）只是导出。

## 对比表

| Skill | 实际做什么 | 输出 | 依赖 | 许可 | ★ | 最近推送 | 结论 |
|---|---|---|---|---|---|---|---|
| [live-panel-skill](https://github.com/ythx-101/live-panel-skill) | 一个 JSON → 版面固定、"一直在跑"的终端监控面板式架构图：线上光点、日志滚动、计数跳动、状态条翻转；另有浅色粉彩信息图主题和 ring / funnel / loop 视图 | H.264 mp4（30fps，静音 AAC）+ 自包含可循环 HTML | Python 3.8+ 标准库、Chrome/Chromium、ffmpeg；无 pip、无 key、无网络；Linux/macOS（Windows 走 WSL） | MIT（复刻示例的设计不在 MIT 内，见 NOTICE） | 773 | 2026-10-14 | **recommend**（社媒动图首选） |
| [architecture-diagram-skill](https://github.com/konraddzbik/architecture-diagram-skill) | 可点击播放的系统架构页：按场景 tab 逐步播放数据包流向，侧栏显示每步 payload / 元数据，可拖节点、切 dev/prod 模式 | 单文件 `architecture.html` + `architecture.md` | 无（纯浏览器）；可选 puppeteer 截图自检 | MIT | 124 | 2026-10-11 | **recommend**（工作坊 / onboarding 讲解） |
| [flow-diagram](https://github.com/unclecatvn/agent-skills/tree/148f0b1/skills/flow-diagram)（unclecatvn） | 双向流 HTML+SVG：左图右解释卡，点 chip 高亮该流并有移动光点 + 终点 ping；带离线碰撞检查器 | 单文件 HTML+SVG | 浏览器；`node assets/check-svg.js` 离线检查 | MIT | 148 | 2026-10-16 | **skip**（⚠ 2026-10-15 已从 main 删除，仓库改为 Odoo-only；只剩历史 commit `148f0b1`） |
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | 编辑风（Instrument Serif + Geist + 单强调色）45 种图型；可抓你站点的配色字体做品牌化；能导入 draw.io / Mermaid / Excalidraw 重绘 | 自包含 HTML + SVG；可导 PNG / SVG | 浏览器；PNG 导出需 Python + Playwright | MIT | 58,040 | 2026-10-17 | **recommend**（静态说明图默认首选） |
| [svg-diagram](https://github.com/bybit-exchange/svg-diagram) | 手放坐标的 SVG house style（架构 / 流程 / 时序 / 数据流 / 生命周期），附 12 项检查的 `svg-lint` | `.svg` | Node（`svg-lint` 零依赖） | MIT | 629 | 2026-09-03 | **recommend**（README / 仓库内嵌 SVG，要 lint 保证） |
| [skill-flowchart](https://github.com/danshapiro/skill-flowchart) | 读真实代码 → 分层可钻取的交互流程图，点节点看模型 / 原文 prompt；适合 prompt pipeline | 单文件 HTML（Cytoscape / Chroma / Prism 走 CDN） | Python 标准库；可选 Node + Playwright 做 QA | Apache-2.0 | 5 | 2026-07-06 | **niche**（代码 / agent 管线考古；★少、CDN 依赖） |
| [Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) | Mermaid 源 → 15 主题的 SVG / PNG / 终端 ASCII，批量 CLI，不起浏览器 | SVG / PNG / ASCII | Node ≥16（beautiful-mermaid + resvg） | MIT | 1,535 | 2026-08-23 | **recommend**（已有 Mermaid 要变好看 / 要 ASCII） |
| Mermaid 指导类：[mermaid-diagrams](https://github.com/davila7/claude-code-templates/tree/main/cli-tool/components/skills/creative-design/mermaid-diagrams)（davila7）· [mermaid-diagram-builder](https://github.com/JayRHa/agent-skills/tree/main/mermaid-diagram-builder)（JayRHa）· [common-architecture-diagramming](https://github.com/HoangNguyen0403/agent-skills-standard/tree/main/skills/common/common-architecture-diagramming)（HoangNguyen0403） | 纯 prompt 规范：教 agent 写合规 Mermaid flowchart / sequence / C4 | Mermaid 文本（GitHub 原生渲染） | 无 | MIT | 32.7k（模板合集）/ 12 / 578 | 2026-10 | **skip**（同名副本几十份，无统一正本；visual-economy §3.2 已覆盖同等规则） |
| [drawing-diagrams](https://github.com/LerianStudio/ring/tree/53990e7/default/skills/drawing-diagrams)（LerianStudio/ring） | 原为生成 Mermaid 并打开 mermaid.live 预览 | Mermaid → mermaid.live | 浏览器 | Apache-2.0 | 217 | 2026-10-14 | **skip**（⚠ 2026-04 改名 `diagram`、2026-05 删除；现由 [`ring:visualizing`](https://github.com/LerianStudio/ring/tree/main/default/skills/visualizing) 取代，改用 D2 + Lerian 品牌 HTML） |
| [drawio-skill](https://github.com/Agents365-ai/drawio-skill) | 自然语言 / 代码 / Terraform / K8s / SQL / OpenAPI → 可编辑 `.drawio`；增量同步保留手调布局、多视图、漂移 diff、CI 架构测试、白板照片反栅格化 | `.drawio` + PNG / SVG / 交互 HTML / PPTX / Mermaid | draw.io 桌面版 CLI（导出）、Python；可选 MCP server | MIT | 10,234 | 2026-10-11 | **recommend**（要给他人二次编辑 / 架构图进 CI） |
| [workflow-artifact-skill](https://github.com/djfunboy/workflow-artifact-skill) | "解释 X 怎么运作" → 图为主的自包含长文档：手写 SVG、tab、展开详情、每条带引用，能渲染就自检，否则标 UNVERIFIED | 单文件离线 HTML（亮 / 暗） | 浏览器；可选 headless 自检 | MIT | 1 | 2026-09-12 | **niche**（流程讲解长文；★极少，借它的"枚举每条流 + 引用"方法即可） |
| [excalidraw-skill](https://github.com/robonuggets/excalidraw-skill) | 在实时 Excalidraw 画布上画手绘风图，截图自看自改；10 种视觉技巧 + 质检清单 | PNG / SVG / `.excalidraw` / 分享链接 | Node + [mcp_excalidraw](https://github.com/yctimlin/mcp_excalidraw)（MIT，2.5k★）本地 canvas server + 浏览器 | **无 LICENSE**（默认保留所有权利） | 85 | 2026-04-10 | **niche**（要手绘白板感时；skill 本身只是一份 SKILL.md，半年未更新） |

## 何时选哪个

| 场景 | 选 | 不选的理由 |
|---|---|---|
| X / 小红书发"系统正在跑"的动图（agent 树、分层 bot 流、监控面板） | **live-panel** | 其余都是静态或要人点 |
| 工作坊 / 设计评审：让人点场景、看数据一步步流过 | **architecture-diagram-skill** | live-panel 不可交互；diagram-design 是静态 |
| 文档 / 博客 / slide 里一张好看的静态说明图 | **diagram-design** | Mermaid 默认主题偏"slop"；svg-diagram 风格更工程 |
| 仓库 README 内嵌、需要 lint 兜底的 SVG | **svg-diagram** | diagram-design 输出 HTML 外壳，要再抽 SVG |
| 已经有 Mermaid 源，只想换主题 / 出 PNG / 终端 ASCII | **Pretty-mermaid** | 不值得重画 |
| 交给别人在 draw.io 里继续改；或架构图要跟代码 / IaC 同步、进 CI | **drawio-skill** | 其余输出不可在图形编辑器里编辑 |
| 手绘白板风、愿意起本地 MCP server | **excalidraw-skill** | 许可未声明，只自用 |
| 代码库 / prompt 管线的分层钻取图 | skill-flowchart（试用） | ★5，CDN 依赖，先确认值得 |
| 只要 GitHub 能渲染的 flowchart / sequence | 原生 Mermaid + [`visual-economy.md`](./visual-economy.md) §3.2 | 不必装任何 skill |

## live-panel 细看（Liz 首选）

**输入**：一个 JSON。顶层键 `canvas`（`preset` 4:5 1200×1500 / 3:4 1080×1440 / 1:1 1080×1080，`duration`、`fps`、`preroll`）、`theme.preset`（`terminal-dark` / `light-pastel`）、`clock`、`titlebar`、`credit`、`machines`（随时间变化的状态：`counter` / `cycle` / `gauge` / `lane` / `triggers` …，全是 t 的纯函数）、`elements`（`text` / `box` / `line` / `path` / `flow` 光点 / `tarrow` 侧栏触发箭头 / `log` 滚动日志 / `view`）。坐标是画布绝对像素，换画幅要另存一份配置。HTML 模板永不需要改。

**最小配置**（摘自上游 `examples/minimal/config.json`，节选）：

```json
{
  "canvas": {"preset": "1:1", "duration": 12, "fps": 30, "preroll": 4},
  "theme": {"preset": "terminal-dark"},
  "machines": {
    "reqs":  {"type": "counter", "start": 1200, "rate": 7, "format": "comma"},
    "agent": {"type": "lane", "period": 6, "run": 4, "off": 0.5, "busy": "working", "done": ["done"],
              "log": {"who": "agent", "c": "gr", "msgs": [["task finished, result sent back", "ok"]]}}
  },
  "elements": [
    {"type": "box", "x": 390, "y": 140, "w": 300, "h": 110, "color": "cy",
     "lines": [{"t": "user", "c": "cy", "b": 1}, {"runs": ["requests ", {"v": "reqs"}]}]},
    {"type": "box", "x": 390, "y": 330, "w": 300, "h": 110, "color": "gr",
     "lines": [{"t": "agent", "c": "gr", "b": 1}, {"runs": [{"v": "agent"}]}]},
    {"type": "line", "from": [540, 250], "to": [540, 330]},
    {"type": "flow", "path": [[540, 250], [540, 330]], "period": 1.5, "offsets": [0, 0.7], "color": "cy"},
    {"type": "log", "x": 40, "y": 700, "w": 1000, "rows": 4, "title": "log",
     "cols": [{"key": "time", "x": 0}, {"key": "who", "x": 130}, {"key": "m", "x": 260}]}
  ]
}
```

成排的框（agent 树、管线、fan-out）别手算坐标：写短 spec 跑 `scripts/scaffold.py --spec spec.json --out config.json` 自动排版，再小步改。

**MP4 怎么出**：页面暴露 `window.seek(t)`，所有画面都是 t 的纯函数（固定种子，无 `Math.random` / 墙钟 / CSS 动画）；`render.py` 经 DevTools pipe 驱动 headless Chrome 逐帧 `seek(i/fps)` 截图，再交给 ffmpeg 编 H.264 并加静音 AAC 轨（避免聊天软件当 GIF）。`check_frames.py --repeat` 抽约 120 个时间点从 DOM 量文字溢出 / 重叠，并验证重放逐字节一致，exit 0 才算过。

**Linux box 实测（2026-10-19）**：`google-chrome` + `ffmpeg` + `python3` 已在 PATH，无需安装。`render.py --config examples/minimal/config.json --out minimal.mp4 --html-out minimal.html` 在无 GPU 的 box 上约 29 秒出 12 秒 1080×1080 的 h264 + aac；`check_frames.py --repeat` 124 个时间点 0 问题、重放一致。Omarchy / Arch 上同理：`pacman -S chromium ffmpeg`，想要示例同款字形再装 JetBrains Mono 与 Noto CJK。

## 边界

- 不 vendor 上表任何仓库；要用时 `npx skills add …` 或 clone 到 agent 的 skills 目录，pin commit。
- 屏上数字没有来源就标 "illustrative"（live-panel 的硬规则，对所有动图同样适用）；复刻别人的图，`credit` 里写作者 + 原链接。
- 一次说明只用一个 skill 出图；同一份文档里不要混三种视觉语言。
- excalidraw-skill 无许可声明、unclecatvn/flow-diagram 与 ring/drawing-diagrams 已从上游删除：只作参考，不作依赖。
