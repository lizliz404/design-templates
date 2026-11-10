# REA: Franklin Offshore 的 ReplyArc 网站助手（franklinoffshore.com 右下角）

Date: 2026-11-05 · By: Pi agent (task replyarc-rea) · Evidence: live widget probes in Liz's real Chrome + `widget.js` (383KB) + CDP network capture + exported transcript.

Evidence bundle: `~/fleet-orch/day-1105/shots-replyarc/` — `conv-00..02.png` (panel screenshots), `lead-form.png`, `replyarc-chat-full-session2.txt` (full exported transcript), `replyarc-chat-2026-11-05.txt` (first partial export), `earlier-session-dom-dump.md` (Liz's earlier Chinese probe recovered from DOM).

**Verdict up front:** Liz's model is right on all four points — it's (1) curated-content Q&A, (2) conversational intake that creates real tickets/leads, (3) a SaaS backend at app.replyarc.ai, and (4) a bounded company knowledge base, **not** just public-page retrieval — but its depth is only slightly beyond page facts (org basics, certifications, service taxonomy), it cannot browse the site, and it refuses rather than fabricates.

---

## 1. Tech surface (confidence: high, all observed)

| Item | Evidence |
|---|---|
| Vendor | `ReplyArc` — `app.replyarc.ai` (Fly.io + Cloudflare; marketing site replyarc.ai). "Powered by ReplyArc" badge + `/api/widget/*` namespace. |
| Embed | `<script async src="https://app.replyarc.ai/widget.js?v=40bf9000" data-bot-id="19e08eab-53f5-46a6-a2d9-0c07a7885e19" data-api-url="https://app.replyarc.ai">` on a WordPress/Elementor site |
| UI | Shadow-DOM host `#replyarc-widget-host`, bottom-right launcher, `template:"vibes"`, accent #003388, title "Franklin Offshore Agent", "Powered by" badge |
| Config | `GET /api/widget/config?botId=…` — public, returns welcome msg, channels (LinkedIn, YouTube enabled), `maxUploadBytes: 3145728`, `greetingBubble`, `news` tab on, `preChatFields: []`, no suggested questions |
| Chat | `POST /api/widget/chat` — body = full `messages[]` transcript + `botId/visitorId/conversationId/sourceUrl/language` (stateless REST; server holds the LLM) |
| Live agent bus | `POST /api/widget/realtime-token` → Supabase Realtime broadcast `https://auth.replyarc.ai/realtime/v1/api/broadcast` topic `inbox:conv:<uuid>` (anon JWT in URL). Visitor typing events observed both directions — **humans can write into this conversation from a vendor inbox** |
| Leads | `POST /api/widget/lead` `{name,email,phone?,conversationId}` + `telemetry event:"conversion", kind:"lead"` |
| Other endpoints in bundle | `ticket-request`, `flow-submit`, `handoff-context`, `hub-contact` (CRM push), `csat`, `articles`, `news`, `upload` (≤3MB), `auth/<provider>` (visitor social login — unused), `track` (pageview/depth vitals), `end`, `demo/chat` |
| Session | `localStorage replyarc.visitor/lastconvo.<botId>`, `sessionStorage replyarc.session/conversation/open/lead.<botId>`; transcript export = client-side blob → `replyarc-chat-<date>.txt` |

## 2. Can / can't boundary (probed live)

**CAN**
- Company/service Q&A in the visitor's language (answered Chinese in zh, English in en). Correct mooring taxonomy, 12 locations, HQ Singapore, founded 1985.
- **Returns real links**: `franklinoffshore.com/services/`, `/about/`, `/download/`, `/contact-us/`, `/products/` — verified `<a href>` targets, all valid paths.
- Contact info on demand: +65 6264 3451, general@franklin.com.sg.
- Conversational **ticket creation**: "Your request has been logged as **Ticket #10**… flagged as a website assistant QA test" — server-side action mid-chat, no separate form, honours an inline "this is a test" flag.
- Guided **lead capture** (button "留下您的联系方式" or proactive prompt): name → email → phone(optional) → `POST /lead` → "谢谢！团队会尽快与您联系。"
- **Live-agent handoff channel exists** (see §4).
- Transcript download, CSAT rating on end, file attach, emoji, text-size/compact/fullscreen, i18n UI (zh), news tab, social-channel links.

**CAN'T (refuses, doesn't fabricate — 3/3 probes)**
- Price/lead-time: "I don't have specific pricing or delivery timeframe information" → routes to team + Products page.
- Exact spec: "I don't have specific MBL data for individual sling sizes" → Products Guide + team. No invented number.
- Org internals: employee count and CEO name both declined with "I would not want to give you an inaccurate number / name". (The site's own About page shows placeholder "John Doe CEO" — plausible the KB intentionally omits leadership.)
- ISO 3834: listed the three certs it *does* know (ISO 9001/14001/45001, matching the site) and said "not mentioned in the information available to me" for 3834 — calibrated, no fabrication.

## 3. Knowledge-base verdict: augmented company KB, shallow — NOT page retrieval

Decisive probes:
- Bot's own statement (Liz's earlier session): "我的信息来源主要是 Franklin Offshore 提供给我的业务资料，这些内容不一定和网页上显示的完全一样——有些可能更多，有些可能更少。**我没有办法实时浏览网页或搜索网站内容**。"
- It answers facts that live in its KB (certs incl. "DNV GL Approved" wording, 12 locations) but draws a hard line at anything transactional (price/MBL/stock) or org-internal (headcount, CEO).
- Franklin is a ReplyArc vendor customer; KB is whatever Franklin uploaded/let the vendor ingest — likely site + brochures + curated facts. Depth ≈ "polished FAQ + service taxonomy", not the full site (e.g. no news-post content in answers, no team names).

So: **retrieval-only is wrong; "bounded curated KB" is right.** It knows *less* than the public site in some spots (leadership) and formats site facts better in others.

## 4. Escalation: real channel, no guaranteed human

- "Can I talk to a real human?" → system bubble: "正在为您转接人工客服，客服有空后会第一时间在这里回复您" — **not a bot line, a widget state transition**; header shows "● 在线客服".
- Waited 90s: no human replied (20:45 SGT, likely off-hours). Fallback offer: "我们会为您创建工单，团队将通过邮件回复您."
- Mechanism is real — the Supabase broadcast channel carries `role:"visitor"` typing events and accepts agent messages — but the promise is "when someone is free", i.e. staffed inbox, not instant live chat.

## 5. Conversational intake mechanics

Two paths, both form-free:

1. **AI-driven RFQ/ticket**: user says "I want a quote" → bot lists 7 fields (name/title/company/contact/location/equipment/timeline/certs) → user dumps free text → bot calls server tool → "logged as Ticket #10" + summary echo. Fields are *suggested*, not enforced — it accepted a one-shot paragraph.
2. **Deterministic lead flow** (button or bot's "留下邮箱" prompt): swaps composer input type per step (text→email→tel), name→email→phone(optional)→`POST /lead`. Skipping phone is allowed.

Where it lands: ReplyArc backend inbox (conversation + lead + ticket rows; `hub-contact` suggests CRM push to HubSpot-style contacts), then **email follow-up by staff**. Visitor-facing reference = "Ticket #10" number only; no tracking page.

## 6. Gap table — ReplyArc vs CFE Ask AI + EnquiryDialog (cfe-app)

| Capability | ReplyArc @ Franklin | CFE now | Gap |
|---|---|---|---|
| Entry/UX | Corner launcher, persistent bubble, greeting rotate, unread badge, fullscreen toggle | Centered dialog (Search/Ask tabs) via header + floating pill | ReplyArc more "always-on chat" feel |
| Answers | Curated company KB, markdown links, multiline | Public-source JSON context (products/files/site), markdown links | Roughly matched; ours is structured DB-grounded |
| Guardrails | Refuses price/spec/internals, no fabrication | Hard system-prompt red lines + `isCommitmentQuery` deterministic filter → human_required reply | **CFE stronger** (deterministic pre-filter) |
| In-chat intake | AI ticket (ticket # echo) + guided lead capture → vendor inbox | EnquiryDialog form → `/api/rfq` → leads+inquiries DB, `ai_handoff` channel tag | They do it **inside the chat**; we hand off to a form tab |
| Ticket reference | Numbered "Ticket #10" in-chat | RFQ ref `ref` in dialog status | Matched (different shape) |
| Lead magnet | Free conversational "留下联系方式" any time | Form fields in dialog | They have a lighter path |
| Live human | Realtime inbox handoff ("staffed when free") | None (email/RFQ only) | **They have it**, we don't |
| File upload | ≤3MB attach in composer | Attachments in Quote tab (PDF/DWG/STEP…) | Matched-ish; theirs is in-chat |
| Extras | CSAT, transcript download, news tab, social channels, emoji, telemetry/vitals, i18n UI | None of these | All gaps, mostly low-value |
| Vendor cost/lock-in | SaaS, external data processing | Own Worker+D1 | CFE owns data — strategic plus |

## 7. Notable details for CFE design

- Their *strongest* idea: **in-chat intake** — the model collects fields conversationally, flags test requests, echoes a ticket number. CFE's `ai_handoff` channel already exists as a data path; the gap is UX (chat-collected fields → pre-filled EnquiryDialog, or a true in-chat RFQ submit).
- Live-agent inbox is the differentiator but is just a staffed shared inbox on a realtime channel — replicable cheaply if ever wanted; not needed for CFE's "AI never promises, RFQ to human" red line.
- Weaknesses we should NOT copy: vague "team will contact you" closure, no lead record visible to visitor, KB shallower than the actual site, English-only answers unless user writes Chinese, and a "Powered by" badge on a corporate site.

REPORT DONE

---
5-line summary:
1. ReplyArc = real vendor SaaS (app.replyarc.ai, Fly.io+Cloudflare, Supabase realtime); widget confirmed via script tag, botId, and 20 `/api/widget/*` endpoints observed.
2. Boundary: curated company KB (not live page retrieval) — solid on org/service facts with REAL links, refuses price/MBL/leadership without fabricating (3/3 probes).
3. Intake works end-to-end in chat: it logged our clearly-flagged test as "Ticket #10" and a guided name→email→phone lead hit `POST /api/widget/lead` + conversion telemetry.
4. "转人工" is a real realtime handoff channel to a staffed vendor inbox — no one joined in 90s off-hours; fallback is ticket→email.
5. CFE gap: we lack in-chat conversational intake and any live-human channel; we exceed them on deterministic guardrails, structured RFQ→DB pipeline, data ownership, and document-gating.
