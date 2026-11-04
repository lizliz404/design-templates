# Idea Box 拆解课 — 本地只读参考资产 (read-only, do not edit)

- Source file (user's local download, NOT uploaded anywhere):
  `~/Downloads/Vibe Coder CS基础课 00｜小林的 Idea Box 拆解课.html`
- sha256: `4b80ceb9075028e849f9715ac4bddc27ed67b2f297bd64de14c05138ffa1d3b2`
- Local copy: `idea-box-anatomy.html` (same directory, byte-identical at archive time).
- Origin: "Vibe Coder CS基础课 00" course material (小林). Course-internal asset;
  do not republish. Sibling lesson files in Downloads (放射式概念图 ×2 —
  identical sha256, i.e. duplicates; 电脑、文件和程序) were NOT archived;
  archive only on explicit request.

## 讲解模式分析 (why this is the reference)

- Single self-contained offline file (48,870 bytes, zero external
  scripts/stylesheets/images, one 15KB `<style>` design system).
- 10 `<section>`s, 1×h1 + 12×h2 — every h2 is a QUESTION, not a label
  ("Path 回答'在哪';Permission 回答'准不准'"). One question per screen.
- Zero `<svg>`, zero `<img>`: all explanation is CSS-built constructs
  (`.file-stage`, `.truth-step`, `.arrow`, `.prompt-card`, `.hero-grid`) —
  diagrams as layout + typography, fully editable, no image assets.
- Narrative arc stages system layers bottom-up: browser render → whole
  computer → file tree → path/permission → source-vs-runtime →
  program-vs-process → environment → evidence layers → "沿链路追问" method.
- Progressive disclosure without JS framework: staged sections, sticky bits,
  scroll cues; no `<details>` accordion, no nav — linear read.
- Lesson for Worker B: 少文字不是绝对字数少 (28k chars), 而是每屏只回答
  一个问题 + 用 CSS 结构替图；禁止回到"字多图少"的 bullet-wall Visual 输出。
