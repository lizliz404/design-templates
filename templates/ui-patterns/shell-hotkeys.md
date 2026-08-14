---
name: shell-hotkeys
description: >
  Shell keyboard grammar for daily-driver apps (B2B console, OA, IDE-like tools).
  Use when adding shortcuts, AppShell hotkeys, 快捷键说明, arrow-key nav, g-then jumps,
  or deciding whether to bind Ctrl/⌘K. Canonical consumer: chuhai-cloud
  `web/src/lib/shellHotkeys.ts`; budget dialect: qiancheng-yusuan
  `next/src/lib/shell-hotkeys.ts`.
---

# Shell hotkeys

**Job:** Give a daily-driver app the keys people already believe computers have.  
**Not:** A command palette. Not vim. Not a per-page unique keymap.

Reference ships:

- `D:\dev\chuhai-cloud\web\src\lib\shellHotkeys.ts` + `useShellHotkeys.ts` + Help `#shortcuts`
- `D:\dev\qiancheng-yusuan\next\src\lib\shell-hotkeys.ts` (ledger dialect)

Craft checklist cross-link: `templates/high-leverage-craft-checklist.md` §21 Cmd/Ctrl+K — **density first, palette later**. This pattern is the layer *under* Cmd+K.

---

## 1. When / when not

| Use | Skip |
|---|---|
| People sit here hours/week (console, OA, inbox, IDE) | Marketing landing, one-pager, rare-visit docs |
| Stable primary nav (≤9 destinations) | Nav still thrashing every week |
| Horizontal tabs / sibling views exist | A single scrolling article |

If the app is a daily tool, **yes, ship the grammar**. Do not wait for a command palette. Do not invent a cute alternate keymap.

---

## 2. The grammar (universal)

Keys mean **spatial jobs**, not product nouns. Product nouns live in a **go-map**.

| Key | Job | Rule |
|---|---|---|
| `←` `→` | Sibling **tabs** in the current view | Only if `[data-shell-tabs]` exists and is on screen. Otherwise do not preventDefault (let caret/scroll work). |
| `↑` `↓` **double** (~380ms) | Previous / next **primary nav** item | Single tap must **not** steal scroll. Ignore `e.repeat`. Skip inside listbox/menu/combobox. |
| `[` | Collapse / expand **sidebar** | Bind only if a sidebar exists. Remember preference. |
| `Enter` | Click the current **affirmative** primary | Dialog first. Never destructive. Never in textarea / multiline. |
| `Esc` | Dismiss top overlay (tour → menu → dialog) | Always on. |
| `?` | Open **this app's** shortcut legend | Not a marketing Help center. |
| `/` | Focus current-page search | No-op if nothing matches `[data-shell-search]` / `input[type=search]` / placeholder 搜索. |
| `g` then `x` | Jump to a **named** primary destination | Product map. 900ms arm window. |
| `Ctrl/⌘K` | Command palette | **Do not bind** until a palette exists. Dead keys that ding are worse than missing keys. |

Arrow keys are consensus: left/right move *across* a row of peers; up/down move *along* a list of places. That is why they feel obvious. The only trick worth keeping from 出海云 is **double-tap up/down** so a normal scroll still works.

---

## 3. Typing guard (non-negotiable)

If the event target is typing, **do not intercept** character keys or arrows:

- `input` (except button/submit/checkbox/radio/file/reset/image)
- `textarea`, `select`
- `contenteditable`
- `[role=textbox]`

Exceptions:

- `Esc` still dismisses
- `Enter` in a **single-line** input inside an open dialog may click the dialog primary
- `Enter` in textarea never does

IM composers, budget cells, and markdown editors are typing contexts. Fail this guard and the feature is malware.

---

## 4. Hooks in the DOM

Do not hardcode CSS class names of a design system. Mark structure:

| Hook | Where |
|---|---|
| `[data-shell-nav]` | Primary nav list (sidebar **or** top bar — same job) |
| `[data-shell-tabs]` | Horizontal sibling tabs in the current page |
| `[data-shell-search]` | The search field `/` should focus |
| `[data-shell-primary="1"]` | Explicit primary when label scoring is ambiguous |
| `[data-shell-main]` | Main column, to scope search/primary queries |

Primary-button scoring (descending): `type=submit` → `data-shell-primary` → label match (确定/确认/提交/发送/保存/登录/…) + `bg-primary` → reject 删除/取消/打回/destructive.

---

## 5. Product map = the only part you rewrite

Go-map and primary-label list are **per app**. Everything else copies.

出海云: `g h/c/i` → 工作台 / 创作 / 收件箱. `[` toggles sidebar.

预算 OA dialect:

- No sidebar → **do not bind `[`**
- Double `↑``↓` walks `[data-shell-nav] a` (top nav, role-filtered, already ≤5)
- `←``→` walks `ReportTabs` (`[data-shell-tabs]`)
- `g` then `d/r/a/o/p/s` → 部门 / 报表 / 实际 / 运营 / 人事 / 设置
- Global `Enter` may click **保存** / **登录**. It must **not** click 定稿 / 提交 / 打回 / 撤回. Those are locks; they already have a confirm surface. Dialog `Enter` may click the confirm's 确定.
- `/` no-ops until a real search exists
- `?` opens an in-app legend, not a missing `/help`

---

## 6. Help copy shape

One screen. `kbd` + one sentence. No tutorial. Include the double-tap caveat on `↑``↓`. State explicitly if Cmd+K is unbound.

---

## 7. Do / Don't

**Do**

- Capture on `keydown` in the bubble/capture that the shell owns; one listener.
- `preventDefault` only when you actually handle.
- Honor `prefers-reduced-motion` for the legend; keys themselves are not motion.
- Keep go-map ≤ 8 entries. If you need more, you need Cmd+K (checklist 21).

**Don't**

- Bind arrows in a spreadsheet-like grid to tab-switching. Cells own arrows. Budget **money cells** are typing/grid context — if you add cell navigation later, shell arrows must yield (`closest('[data-money-grid]')`).
- Steal single `↑``↓` from scroll.
- Make `g g` do something cute.
- Localize the *jobs* (left still means previous tab in RTL? keep visual left/right = previous/next in DOM order, document it).
- Ship a different keymap per route.

---

## 8. Implement

1. Copy grammar from `shellHotkeys.ts` (出海云) or `shell-hotkeys.ts` (预算).
2. Fill `GO_MAP`, `PRIMARY_LABEL`, `DANGER_LABEL`.
3. Put hooks on nav / tabs / search.
4. Mount one client listener on the authenticated shell (and login if Enter-to-submit matters).
5. Add `?` legend. Stop.

Verify: type in an input, arrows must move the caret; double-`↓` from 部门总览 goes to the next visible nav item; `Enter` on a dirty form saves, not 定稿.
