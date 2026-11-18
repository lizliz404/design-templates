# x.ai homepage stack notes (2026-11-18)

Fetched with curl from the box (HTTP 200). Marketing site is not behind the same Cloudflare managed challenge as grok.com HTML.

Observed in the HTML (not inferred from rumors):

- `content="SpaceXSI"` / `og:site_name` = SpaceXSI; `twitter:site` = `@spacexsi`
- `og:description` still says SpaceXSI builds Grok and points people to grok.com
- Response headers include `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`, `vary: rsc, next-router-state-tree, ...` — Next.js App Router / RSC
- Script URLs under `/_next/static/chunks/`, including a file named `turbopack-0rw29v8dsd-kr.js`
- Preloaded fonts: `GeistMono_Variable` and `XVF_Variable-s` (woff2)
- OneTrust stub: `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`
- Cookie banner vendor same family as grok.com (OneTrust / cookielaw)
- Visible footer copyright in the SSR text: `© 2026 SpaceX Super Intelligence LLC`
- Product nav / footer IA includes Chat, Build, Imagine, Voice, Bot, Grokipedia, plus Business / Government / API / Docs

Cookies from the response were not saved. The HTML body is not vendored in full (204 KB, and would bloat the case); this note plus `shots/xai-home-2026-11-17-1600.png` and the visible-text extract are the retained marketing evidence.
