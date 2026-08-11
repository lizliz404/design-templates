---
version: alpha
name: Uhoh Inspired Service Entry
description: Monochrome, blunt, comic landing page for content-led service entry pages; designed as a post-social-media trust handoff into IM/human service delivery.
source: "https://www.uhoh.com/"
scanDate: "2026-06-11"
implementation: "native static HTML/CSS"
colors:
  paper: "#fffdf6"
  ink: "#080808"
  muted: "#55524c"
  green: "#39a86b"
  red: "#e94b5b"
  yellow: "#ffd74a"
typography:
  primary:
    fontFamily: "Space Grotesk"
    fallback: "system-ui, sans-serif"
  h1:
    fontSize: "clamp(52px, 9vw, 116px)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.075em"
  h2:
    fontSize: "clamp(42px, 6.5vw, 82px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.07em"
components:
  topBar: "thin rainbow gradient announcement strip"
  nav: "simple logo left, sparse links right"
  hero: "huge blunt headline + CTA + monochrome comic card"
  buttons: "black outlined pills, optional black fill"
  proof: "tilted bordered quote cards"
  services: "border-top sections, no shadow"
  footer: "large rounded black-outline card"
---

## Overview

This template captures the useful part of `uhoh.com`: not its business model, not its copy, and not its assets, but the landing-page design grammar.

The strategic use case is domestic content-led services:

1. discovery happens on social media: 视频号、小红书、公众号、朋友圈、Twitter/X;
2. service delivery happens in IM or human operations: 微信、飞书、Telegram、Slack, docs, calls;
3. this page sits between them as a trust entrance, boundary clarifier, and CTA router.

So the page should not pretend to be the whole funnel. It is an entry room, not the factory.

## Source boundaries

Public non-authenticated scan of `https://www.uhoh.com/`.

Observed implementation facts:

- Webflow page;
- HTML fetched by `curl` was about 43KB;
- one linked Webflow CSS file was about 82KB;
- typography uses `Space Grotesk` heavily;
- visual style is warm off-white, black linework, bold type, comic image language, huge whitespace, sparse UI.

Do not copy proprietary code, images, logo, testimonials, customer names, or exact copy. Reuse the design pattern.

## What to steal

- **Blunt headline rhythm:** big, short, slightly confrontational. No consultant fog.
- **Warm monochrome system:** near-white page, black text, thick borders, almost no shadows.
- **One loud accent:** a tiny rainbow strip or one comic color. Do not spray gradients everywhere.
- **Comic relief:** one simple illustration area or hand-drawn motif makes the page human.
- **Theatrical whitespace:** some scroll sections should feel deliberately empty. It creates timing.
- **Outlined CTA language:** pills and large bottom CTA boxes, not glossy SaaS buttons.
- **Bottom nudge:** a self-aware final CTA works because the page voice is casual and direct.

## What not to steal

- The exact `uhoh` logo, genie art, testimonial names, or Webflow class/source structure.
- The default `book a call` funnel if the actual market works through content + IM.
- The US-style MSP positioning if selling into China. It reads wrong and will waste persuasion.

## Page architecture

1. Rainbow announcement strip: tells users this is a handoff from content.
2. Header: logo, scope link, IM CTA.
3. Hero: one blunt problem statement, one direct CTA, one secondary scope CTA.
4. Three micro promises: less explanation, fewer meetings, fewer fires.
5. Problem section: daily operational annoyances, not abstract transformation.
6. Testimonials: short, casual, bordered and slightly tilted.
7. Service boundaries: what the team actually handles.
8. Process section: content traffic → boundary explanation → IM handoff.
9. Bottom nudge: humorous direct CTA.
10. Footer: email capture and basic links.

## Reuse guidance

Use this template when the product/service is:

- high-trust but not enterprise-formal;
- sold through founder/content credibility;
- delivered through humans, agents, or async ops;
- more “help me fix my messy workflow” than “buy our dashboard.”

Bad fit:

- self-serve SaaS with many screenshots;
- investor-facing corporate site;
- luxury brand;
- government/medical/legal contexts where the irreverent tone creates risk.

## Copy rule

The page voice should sound like a competent person who has seen the mess before:

- concrete > abstract;
- work examples > transformation slogans;
- boundaries > promises;
- direct CTA > fake urgency.

Good sentence shape:

> “你的业务，不该被工具杂活拖死。”

Bad sentence shape:

> “赋能企业智能化转型，实现效率跃迁。”

后者可以直接扔。没冤枉它。
