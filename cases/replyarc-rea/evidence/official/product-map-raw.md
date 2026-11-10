# Official ReplyArc product map

Investigation date: 10 November 2026 (Asia/Shanghai). Read-only crawl of public official pages and public widget/config. No login, no account creation, no form submits, no chat messages sent to the official assistant.

Labels used below: **observation** = seen on a public page or in public config/JS this run; **marketing claim** = official wording, not independently verified; **inference** = reasonable reading of those sources; **unknown** = not established this run.

This is not a recap of the 5 November 2026 Franklin Offshore embed teardown. That report is used only for a short contrast at the end. Franklin customer botId `19e08eab-53f5-46a6-a2d9-0c07a7885e19` is distinct from the official marketing-site assistant.

---

## Overview of the product

ReplyArc is a customer-facing AI agent platform built and operated by Wondertabs Pte. Ltd. (UEN 202037320G, Singapore), with related entities in Australia, Indonesia and Thailand. Official self-description (schema.org on https://replyarc.ai/ and footer on every marketing page):

> ReplyArc runs your customer front line on one grounded AI agent. It answers on your website, WhatsApp, Messenger and LINE, in six languages, around the clock, cites its source on every answer, captures leads and hands off to your team.

The product is sold as one platform that combines an AI agent, live chat, a help desk, a CRM and analytics, deployed with a single script tag (`https://app.replyarc.ai/widget.js`). A free live demo exists at `/try` (paste a public URL; no signup). A public REST API is documented at `/docs/api`. Native iOS and Android apps exist for the team inbox:

- App Store: https://apps.apple.com/sg/app/replyarc/id6783628795
- Play: https://play.google.com/store/apps/details?id=io.replyarc.app

Hosting observation: marketing and app are Next.js behind Cloudflare and Fly.io. `GET https://replyarc.ai/api/health` returned `{"status":"ok","checks":{"database":"ok","cache":"ok","realtimeAuth":"ok"},"region":"sin",...}` at 15:43 CST on 10 Nov 2026. Status page (https://replyarc.ai/status) said “All systems operational. Hosted in Singapore (sin).”

A pricing page exists at https://replyarc.ai/pricing (conversation-based plans, including a free tier). Pricing and commercial packaging are out of scope here and are not analysed.

---

## Site map of public official pages

Source: `https://replyarc.ai/sitemap.xml` (lastmod 2026-11-05T13:43:50.785Z) plus footer / `llms.txt` links that are public but not all listed in the sitemap. robots.txt allows `/` and disallows `/console/`, `/app/`, `/onboarding/`, `/auth/`, `/api/`, `/invite/` for ordinary crawlers; this investigation still fetched public widget config because the marketing page itself loads it in the browser, and the parent brief asked for that capture.

### In sitemap

| URL | Title / role |
|---|---|
| https://replyarc.ai/ | Homepage / product overview |
| https://replyarc.ai/features | Features and FAQ |
| https://replyarc.ai/pricing | Pricing (exists; not analysed) |
| https://replyarc.ai/about | Company / Wondertabs |
| https://replyarc.ai/how-it-works | How it works + FAQ |
| https://replyarc.ai/trust | Trust Center (updated 11 June 2026) |
| https://replyarc.ai/status | System status |
| https://replyarc.ai/contact | Contact |
| https://replyarc.ai/legal/privacy | Privacy policy |
| https://replyarc.ai/legal/terms | Terms of service |
| https://replyarc.ai/legal/dpa | Data Processing Addendum |
| https://replyarc.ai/legal/subprocessors | Sub-processors (updated 17 June 2026) |
| https://replyarc.ai/legal/acceptable-use | Acceptable use |
| https://replyarc.ai/legal/cookies | Cookie policy |

### Public but not in sitemap (observed 200)

| URL | Title / role |
|---|---|
| https://replyarc.ai/docs | Docs hub |
| https://replyarc.ai/docs/getting-started | Getting started |
| https://replyarc.ai/docs/integrations | Integration setup (live vs coming soon) |
| https://replyarc.ai/docs/api | Public `/v1` API orientation |
| https://replyarc.ai/try | Free live demo (no signup) |
| https://replyarc.ai/powered-by | “You just used a ReplyArc agent” landing (used by customer badges) |
| https://replyarc.ai/legal/refunds | Refund policy |
| https://replyarc.ai/legal/delete | Delete your account |
| https://replyarc.ai/llms.txt | Machine-readable site map for AI crawlers |
| https://replyarc.ai/widget.js and https://app.replyarc.ai/widget.js | Public widget bundle |
| https://app.replyarc.ai/login and `/signup` | Auth surfaces (not entered) |
| https://replyarc.ai/api/health | Public health JSON |

### Probed, not present or not reachable from this box

- No public blog, help centre, changelog, `/integrations` or `/channels` marketing pages (404).
- `https://docs.replyarc.ai`, `help.replyarc.ai`, `status.replyarc.ai`, `blog.replyarc.ai`, `cdn.replyarc.ai` did not complete TLS from this environment (not evidence they do not exist).
- `https://api.replyarc.ai/v1/openapi.json` and `/v1/docs` are documented on the API page but could not be fetched here: `api.replyarc.ai` resolved to `198.18.0.1` and the TLS handshake failed. **Unknown** whether the OpenAPI spec is publicly reachable on a normal network.
- Linked “Analytics docs” from the integrations page (`/docs/analytics`) is 404. Public docs today are only the hub plus getting-started, integrations, and API.
- Wondertabs.com is the agency site (Webflow). Its sitemap is a portfolio (including Franklin Offshore work), not ReplyArc product docs.

---

## Official-site assistant (distinct from Franklin)

**Observation.** Marketing layout JS (`HomepageWidget`) injects:

```js
script.src = "https://app.replyarc.ai/widget.js?v=" + "9b810f71"
ReplyArc.init({ botId, apiUrl: "https://app.replyarc.ai" })
```

Live botId passed from the homepage RSC payload: `4d75979a-ff97-4ed5-99a7-09055876bb91`. A compile-time fallback in the same chunk is `87bd913b-22bc-42ce-9cf9-ce846e247683` (a different public config exists; it is not the live marketing widget).

Public config: `GET https://app.replyarc.ai/api/widget/config?botId=4d75979a-ff97-4ed5-99a7-09055876bb91` (same JSON also served from `https://replyarc.ai/api/widget/config?...`). Saved at `raw/official-widget-config.pretty.json`.

Observed config highlights for this official bot:

- Title `ReplyArc`. Welcome: “Hi! I'm the ReplyArc assistant. Ask me anything about putting an AI agent on your business website.”
- Suggested questions / flow cards: “What is ReplyArc?”, “How much does it cost?”, plus a “I have a question” contact form (Name, Email required, Messages required; `notifyEmail: true`).
- `showsAttribution: true`. Launcher: emblem, bar style, small bubble, greeting rotation.
- `booking: null` at the top level (no Cal.com/Calendly embed configured).
- `maxUploadBytes: 3145728` (3 MiB). `fileUpload` not set false, so the widget default (upload on) applies.
- Home / News tabs off (`tabs.home/news: false`); `helpArticles: []`, `helpSearch: false`.
- `channelsShowcase: true`. Enabled channel keys: whatsapp, messenger, line, wechat, instagram, x, tiktok, linkedin, phone, booking. Disabled: facebook, youtube. `customChannels: []`.
- **Important observed quirk:** every enabled channel URL is the same `https://line.me/R/ti/p/@replyarc`. This looks like a showcase/demo misconfiguration, not evidence that WhatsApp, phone, booking, etc. are actually wired. Do not treat those flags as live official-site destinations.
- Widget.js `Last-Modified: Thu, 05 Nov 2026 13:41:03 GMT` (383,213 bytes). Public widget APIs referenced in that bundle: `/api/widget/config`, `/chat`, `/lead`, `/lead-event`, `/upload`, `/ticket-request`, `/handoff-context`, `/flow-submit`, `/csat`, `/end`, `/messages`, `/articles`, `/news`, `/track`, `/telemetry`, `/realtime-token`, `/hub-contact`, `/auth/`, plus `/api/demo/chat` and `/api/broadcast`.

Public widget i18n packs observed at `https://app.replyarc.ai/widget-i18n-{en,zh,ms,ta,th}.json`. `widget-i18n-id.json` (and several Indonesian aliases) returned 404. Marketing claims six languages including Bahasa Indonesia; a dedicated Indonesian UI pack was **not** found on this public path.

The official assistant was **not** conversationally probed this run (no chat POSTs), so runtime answer quality, grounding behaviour, and handoff of *this* bot remain **unknown**.

Powered-by page (`/powered-by?utm_content=19e08eab-…&ref=franklinoffshore.com`) is a marketing landing for people who used a *customer* agent. It contains both UUIDs: the Franklin bot in the query, and the official marketing `HomepageWidget` botId in the page shell.

---

## Claimed capabilities

Each item quotes official wording and is tagged. “Observed in public config/JS” means the surface exists in the widget or public docs, not that the official marketing bot was seen exercising it in a live chat.

### Web widget

- **Marketing claim + observation.** “One script tag, on any site builder.” Features FAQ: paste into “HTML, Shopify, WordPress, Wix, Webflow or React. The widget renders in its own Shadow DOM.” How-it-works also mentions a WordPress plugin and 1-click Shopify / WordPress / Wix. Observed: `app.replyarc.ai/widget.js`, Shadow-DOM host `#replyarc-widget-host`, `data-bot-id` / `ReplyArc.init({botId, apiUrl})`.

### Grounded answers and citations

- **Marketing claim** (features): “Every reply is grounded in your website, your PDFs and your price lists, and it shows where the answer came from.” “Grounded-only mode, on by default.” “When your content does not cover the question, the agent says so, offers your fallback, and takes the visitor details instead of guessing.”
- Getting started (docs): “Knowledge is chunked, embedded and retrieved at answer time, with inline citations.”
- Widget i18n includes a “Sources” label. Trust Center: prompts sent to the model include “the conversation so far (up to the 20 most recent messages), the agent's configured persona and business facts, and passages retrieved from your knowledge base.”

### Knowledge / ingest

Official docs (https://replyarc.ai/docs/getting-started and `/docs/integrations`) say knowledge can come from:

- Website crawls, “with scheduled re-crawls”
- File uploads: “PDF, DOCX, TXT or CSV”
- “Articles: author content directly”
- “Google Sheets (if enabled on your workspace): connect a published sheet that auto-syncs”

Features marketing is broader: “No formatting, no cleanup: if a document has text in it, the agent can answer from it.” `/try` says a demo agent is trained on the public homepage in “about ten seconds” and “keeps reading the rest of your pages in the background”; a claimed full setup is “about ten minutes.” Those timings are marketing claims, not measured here.

### Human handoff, inbox, tickets, leads

- Features FAQ: “Your team takes over from the inbox in one click, and the visitor sees one continuous thread rather than a restart. The agent only offers a human when someone is actually online. When you are away it takes contact details instead of queueing people into silence.”
- How-it-works: shared inbox, “needs-a-human lane,” internal notes and assignment, canned responses, take over mid-conversation.
- Homepage suite: AI agent, live chat, CRM (“contact, company and deal”), help desk (“Ticketing that triages, assigns and tracks automatically”), AktivReply, analytics.
- Docs getting-started: Inbox for escalated conversations; notifications of “escalations, SLA breaches and hot-lead alerts to Slack or email”; webhooks on conversation created / escalated / resolved and message created.
- Docs API: `POST /v1/widget/escalate` “Hand a conversation to a human agent (queues it in the inbox + fires notifications).” List endpoints for `/v1/contacts`, `/v1/tickets`, `/v1/conversations`. Webhook events include ticket and CRM deal events, plus `form.submitted`.
- Widget.js and i18n: lead capture, ticket offer (“We can open a support ticket and reply to you by email.”), live-agent presence (“Live agent · human”), CSAT, offline/away banners.
- Mobile apps: “When the agent hands a conversation over, it reaches your team on their phone.”

Handoff *mechanism* is documented and present in the public widget; whether a human is actually staffed is a customer-operations question (unknown for the official marketing bot; previously observed as “channel exists, no guaranteed immediate human” on the Franklin embed).

### After-hours / 24/7

- Marketing claim (features): “What happens outside my opening hours? It says so honestly, sets an expectation for when you will reply, keeps answering from your content, and asks for an email so you can follow up.”
- How-it-works: “After-hours mode, so it only speaks first when nobody is on shift.”
- Homepage stats (marketing, not measured): “24/7 Always on,” “<2s Typical first reply,” “73% Of routine conversations resolved end-to-end.”

### Multilingual

- Features, official wording: “Six: English, 中文, Bahasa Melayu, Bahasa Indonesia, Tamil and Thai. It detects the language message by message, so a visitor can switch mid-conversation and the agent follows.”
- Observation: public i18n packs for en, zh, ms, ta, th. Indonesian pack not found on the public `widget-i18n-id.json` path.

### Channels — two official layers that must not be collapsed

Official writing describes **two different things**:

1. **Widget link-out shortcuts** (visitor leaves the widget). Features FAQ, exact wording:

   > Does it replace WhatsApp? No, it hands visitors to it. … the widget carries one-tap shortcuts to WhatsApp, Messenger, LINE and WeChat, a button that dials your number, and a link to your booking page. Shortcuts appear only for the channels you switch on.

   Sub-processors §5 confirms link-out buttons “for example WhatsApp, Messenger, LINE, phone or booking links: the End User leaves the widget and deals with that service directly.”

   Widget.js ships icon/key support for whatsapp, messenger, line, wechat, instagram, x, tiktok, linkedin, youtube, facebook, phone, booking, plus custom channels and a “channelDial” mode. Official marketing config has many of these enabled, but all point at the same LINE URL (see quirk above).

2. **Connected messaging inboxes** (send and receive on the customer’s channel). Integrations docs:

   > Settings → Channels. Connect WhatsApp Business and Messenger so your agent answers on those channels. Paste the provider access token and (for WhatsApp) the phone-number id; ReplyArc stores it encrypted and the channel adapters send and receive on your behalf.

   Sub-processors §5 (customer-directed services, 17 June 2026) is broader than the integrations how-to:

   > Messaging channels you connect: WhatsApp Business, Facebook Messenger and Instagram (Meta), Telegram, Slack, Microsoft Teams and Discord; message content flows to and from the channel provider once connected.

   The homepage “Works with” logo wall also lists Web widget, WhatsApp Business, Instagram, Messenger, Telegram, Slack, Microsoft Teams, Discord (and many CMS / CRM logos).

   **Inference:** the product claims a real two-way inbox for at least WhatsApp Business and Messenger, and legally lists Instagram, Telegram, Slack, Teams and Discord as connectable channels. LINE and WeChat appear in official copy mainly as widget shortcuts, not as documented send/receive adapters. How complete the Instagram / Telegram / Slack / Teams / Discord inboxes are, and what is plan-gated, was not observed in a live connected workspace (**unknown**). Pricing copy exists and mentions some inbox packaging; it is not analysed here.

### Appointment booking

- Features: “Turns a research conversation into a slot on your calendar without leaving the chat.” “Booking links.”
- Integrations docs, more precise and later-sounding:

  > Google Calendar / Outlook / Calendly / Cal.com : coming soon. Today, bookings run through the widget's booking shortcut, which sends visitors to your booking page in one tap.

- Widget.js observation: supports a booking config and an in-widget calendar embed (`booking-embed`, `calendar.google.com`, `startToursBooking`). Official marketing bot has `booking: null`. So “without leaving the chat” may mean an optional embed of a third-party scheduler, not a native ReplyArc calendar. Native calendar/payment integrations are officially “coming soon.”

### CRM, analytics, catalogue, AktivReply, widget chrome

- **CRM:** contacts, companies, deals; leads captured mid-chat and scored. HubSpot and Salesforce are documented as live, one-way, hourly, “contacts with an email address.” Shopify catalogue OAuth is coming soon; “Today, import your catalog as CSV under Catalog and the agent recommends from it in chat.” Homepage mentions catalogue size by plan (marketing).
- **Analytics:** “Conversations, leads and resolution over time, plus the questions it could not answer” (gap mining). Live monitor: “See who is on the site right now.” UTM and ad-click tracking claimed on features. Widget already “reports funnel events to your own GA4 tag”; a first-party GA4 integration is “coming soon.”
- **AktivReply™:** proprietary engagement engine. “Makes the first move on the pages you mark, and stays quiet everywhere else.” At most one opening per page per visit; stays quiet while the visitor is typing; dismissed means dismissed for that visit; postures include quiet / help / sell; delay configurable.
- **Widget extras (features list and/or widget.js):** suggested questions, typing indicators, queue position, satisfaction rating (CSAT), canned responses (inbox), Home / Help / News tabs, help-article search, brand colour sampling (“Chameleon”), launcher position, themes (classic / compact / bento mentioned in official-bot news items), file attach, transcript tools, social login hooks (unused on the official bot), pre-chat fields, product recommendation carousel, “selection ask,” tours-style booking template, “up to eight custom channels,” Shadow DOM isolation.
- **Visitor file upload (observed in widget.js):** `accept` = `image/png,image/jpeg,image/gif,image/webp,.pdf`. Default cap in JS is 10 MB (`dn=10485760`); remote config can lower it (official bot: 3 MB). Upload is disabled in demo sessions. This is separate from dashboard knowledge upload (PDF/DOCX/TXT/CSV, docs say max 25 MB in bundled console copy).

### Automations and API

- Live per integrations docs: Zapier, Make, n8n (catch-hook URL, HMAC-SHA256, retries); per-event webhooks under Settings → Webhooks; Slack / Teams *notification* routing.
- Public API (https://replyarc.ai/docs/api): base `https://api.replyarc.ai/v1`, OpenAPI 3.1 at `/v1/openapi.json`, Swagger UI at `/v1/docs`. Key-authenticated: `/me`, `/contacts`, `/tickets`, `/conversations`. Origin-allowlisted widget: `/v1/widget/chat` (SSE), `/v1/widget/escalate`. The machine-readable spec was not retrieved from this box.

### Models / “no BYOK”

- Features: “Do I bring my own AI keys? No. We run the models.”
- Trust Center (11 June 2026) says prompts go to “our model provider (currently OpenAI, under ReplyArc's own platform API keys).”
- Sub-processors (17 June 2026, more specific and later): OpenAI for embeddings (and chat inference as a fallback); OpenRouter routing to Anthropic Claude for chat answers and a per-turn classifier. No customer-held AI keys are stored.
- These two official pages are slightly out of date with each other. Prefer the later sub-processors wording, and treat the exact production routing as **not independently observed**.

---

## Claimed non-capabilities / limits

Official “not available yet” or “coming soon” from https://replyarc.ai/docs/integrations (this is the clearest boundary document):

- Shopify OAuth (CSV catalogue import is the current path)
- Zendesk ticket and help-centre reads (ReplyArc’s own ticketing is described as live)
- Native Google Calendar, Outlook, Calendly, Cal.com integrations
- PayPal
- Mailchimp
- First-party Google Analytics 4 integration (widget can already emit events to the customer’s own GA4 tag)
- Segment
- Knowledge import from Notion, Google Drive, Confluence and OneDrive (“on the roadmap and not available yet”)

Other official limits / refusals:

- Does not replace WhatsApp; widget shortcuts hand visitors to it (features FAQ). LINE / WeChat are not in the documented send/receive connector how-to.
- Grounded-only default: should not answer from general knowledge when the KB misses (marketing/docs). Not runtime-tested on the official bot this run.
- No bring-your-own model keys.
- Trust Center: “We do not currently hold third-party security certifications such as SOC 2 or ISO 27001.” “Self-serve account deletion is on our roadmap; today, closure and deletion run through these request routes.” No zero-data-retention agreement with the model provider; provider may retain request content up to 30 days for abuse monitoring.
- One agent per workspace (getting started). Multi-brand is “a workspace per brand.”
- Conversation counting rules are described on how-it-works (bots/crawlers/testing claimed not to count); not verified.
- Homepage “Works with” logo wall includes several tools the integrations page still marks coming soon (Shopify, Google Calendar, Zendesk, Outlook, Mailchimp, Calendly, Cal.com, Segment, PayPal, GA4). Treat the logo wall as marketing display; treat `/docs/integrations` as the live-vs-roadmap source.

---

## How official docs say knowledge and handoff work

**Knowledge (docs + trust).** Paste a website URL (crawled page by page, scheduled re-crawls). Upload PDF/DOCX/TXT/CSV. Optionally author articles, and optionally sync a published Google Sheet. Content is chunked, embedded (OpenAI embeddings, per sub-processors), and retrieved at answer time with inline citations. The model also receives persona / business facts and up to the 20 most recent messages. Customer data is not used to train ReplyArc or provider models; some tenant-scoped processing exists to draft suggested KB answers from unanswered questions, run quality checks, and classify/summarise conversations, “surfaced to you for review.”

**Handoff (docs + features + API).** The agent answers first. On real intent, a dead end, or (on some plans, per bundled console copy) detected frustration, it can offer a human. `POST /v1/widget/escalate` queues the thread in the shared inbox and fires notifications (email / Slack / Teams / webhooks). The visitor keeps the same thread. If nobody is online, the product is documented to take contact details or open an email ticket rather than queue into silence. Team members can take over from the web inbox or the mobile app, with canned responses, notes, and assignment. After-hours mode changes proactive behaviour and expectations, while still answering from the KB.

---

## Brief contrast with the Franklin embed

Prior report: `/workspace/cfe-shanghai-website/docs/replyarc-assistant-rea-2026-11-05.md`. Same public widget (`app.replyarc.ai/widget.js`) and same `/api/widget/*` surface. Different botId, different config, different knowledge.

| | Official marketing site bot `4d75979a-…` | Franklin customer bot `19e08eab-…` (Nov 5 report) |
|---|---|---|
| Role | ReplyArc product assistant (“putting an AI agent on your business website”) | Franklin Offshore company agent |
| How we know behaviour | Config/JS + official docs only this run; **chat not probed** | Live chat probed: grounded refusals, ticket #, lead flow, handoff channel existed but no human arrived in 90s |
| Channels | Showcase flags on, but every URL is `@replyarc` on LINE | LinkedIn and YouTube enabled (per that report); not the official bot |
| Attribution | `showsAttribution: true` | “Powered by ReplyArc” badge observed |
| Upload cap | Config 3 MiB; same widget default 10 MiB | Config 3 MiB |
| Knowledge | Whatever trains the official assistant (unknown contents) | Bounded company KB; bot said it cannot browse the live site |

Do not treat Franklin runtime behaviour as official-product truth, or the official bot’s showcase channel URLs as Franklin’s.

---

## Unknowns

- Runtime quality, grounding, language switching, lead/ticket/handoff of the official marketing assistant (no chat this run).
- Whether Indonesian UI is served under a non-obvious i18n filename, or only as model-side language following.
- Completeness of two-way inboxes beyond the documented WhatsApp Business + Messenger token flow (Instagram, Telegram, Slack, Teams, Discord are named in legal/homepage copy; setup steps were not on `/docs/integrations`).
- Whether LINE, WeChat, X, TikTok, LinkedIn, YouTube are ever more than widget link-outs.
- Native booking embed vs external shortcut, in real customer workspaces.
- Public reachability of `https://api.replyarc.ai/v1/openapi.json` (blocked from this environment).
- Exact live model routing (Trust page vs later sub-processors page).
- Anything behind `/console/`, `/app/`, `/onboarding/`, `/auth/` (not entered).

---

## Key URLs and captured artifacts

Primary: https://replyarc.ai/ · https://replyarc.ai/features · https://replyarc.ai/how-it-works · https://replyarc.ai/docs · https://replyarc.ai/docs/getting-started · https://replyarc.ai/docs/integrations · https://replyarc.ai/docs/api · https://replyarc.ai/try · https://replyarc.ai/trust · https://replyarc.ai/legal/subprocessors · https://replyarc.ai/llms.txt · https://replyarc.ai/powered-by · https://app.replyarc.ai/widget.js

Official marketing botId: `4d75979a-ff97-4ed5-99a7-09055876bb91`  
Config: `GET https://app.replyarc.ai/api/widget/config?botId=4d75979a-ff97-4ed5-99a7-09055876bb91`

Artifacts under `/workspace/agent-tools/replyarc-official-2026-11-10/`:

- `official-product-map.md` (this file)
- `raw/official-widget-config.pretty.json`
- `raw/widget.js` and `raw/homepage-widget-loader.js`
- `raw/i18n/widget-i18n-{en,zh,ms,ta,th}.json`
- `raw/sitemap.xml`, `raw/robots.txt`, `raw/llms.txt`, `raw/api_health.json`
- `text/*.txt` extracted visible copy of official pages
- `pages/` raw HTML
