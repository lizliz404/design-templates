// vercel.com spacing measurement — screenshot + getComputedStyle probe
// usage: node measure.mjs   (writes into ../evidence and ../shots)
import { chromium } from '/home/liz/.local/share/mise/installs/npm-playwright/1.64.1/node_modules/playwright/index.mjs';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EVID = join(ROOT, 'evidence');
const SHOTS = join(ROOT, 'shots');
mkdirSync(EVID, { recursive: true });
mkdirSync(SHOTS, { recursive: true });

const PAGES = [
  ['home', 'https://vercel.com/'],
  ['pricing', 'https://vercel.com/pricing'],
  ['docs', 'https://vercel.com/docs'],
].filter(([n]) => !process.env.ONLY_PAGES || process.env.ONLY_PAGES.split(',').includes(n));
const WIDTHS = [1280, 1440, 1920, 2560]
  .filter((w) => !process.env.ONLY_WIDTHS || process.env.ONLY_WIDTHS.split(',').includes(String(w)));
const HEIGHT = 900;

const probe = () => {
  const round = (v) => (v == null ? null : Math.round(v * 100) / 100);
  const css = (el, props) => {
    const c = getComputedStyle(el);
    const o = {};
    for (const p of props) o[p] = c[p];
    return o;
  };
  const ident = (el) => {
    const cls = (el.getAttribute('class') || '').trim().split(/\s+/).slice(0, 3).join('.');
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? '.' + cls : '');
  };
  // leftmost/rightmost text-bearing rect inside el
  const textEdges = (el) => {
    let left = Infinity, right = -Infinity, n = 0;
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    while (w.nextNode()) {
      if (!w.currentNode.textContent.trim()) continue;
      range.selectNodeContents(w.currentNode);
      const r = range.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      n++;
      if (r.left < left) left = r.left;
      if (r.right > right) right = r.right;
    }
    return { left: n ? round(left) : null, right: n ? round(right) : null, textNodes: n };
  };
  const blockInfo = (el) => {
    const r = el.getBoundingClientRect();
    return {
      sel: ident(el),
      rect: { left: round(r.left), right: round(r.right), width: round(r.width), top: round(r.top + scrollY), height: round(r.height) },
      text: textEdges(el),
      ...css(el, ['paddingLeft', 'paddingRight', 'marginLeft', 'marginRight', 'maxWidth', 'width']),
    };
  };

  const out = {
    url: location.href,
    viewport: { w: innerWidth, h: innerHeight },
    docWidth: document.documentElement.scrollWidth,
    docHeight: document.documentElement.scrollHeight,
    ruler: [],          // header / main children / footer / footer children
    sections: [],       // main direct children w/ vertical metrics
    cards: [],          // card-looking elements
    relatedPairs: [],   // heading -> next sibling gaps
    spacingCensus: {},  // value -> count
  };

  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const main = document.querySelector('main') || document.body;
  if (header) {
    out.ruler.push({ zone: 'header', ...blockInfo(header) });
    for (const ch of header.children) if (ch.getBoundingClientRect().width > 0) out.ruler.push({ zone: 'header>', ...blockInfo(ch) });
  }
  for (const [i, ch] of [...main.children].entries()) {
    const r = ch.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const c = getComputedStyle(ch);
    out.ruler.push({ zone: `main[${i}]`, ...blockInfo(ch) });
    out.sections.push({
      idx: i, sel: ident(ch),
      top: round(r.top + scrollY), height: round(r.height),
      ...css(ch, ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom']),
    });
  }
  if (footer) {
    out.ruler.push({ zone: 'footer', ...blockInfo(footer) });
    for (const ch of footer.children) if (ch.getBoundingClientRect().width > 0) out.ruler.push({ zone: 'footer>', ...blockInfo(ch) });
  }
  // gaps between consecutive main children
  for (let i = 1; i < out.sections.length; i++) {
    const a = out.sections[i - 1], b = out.sections[i];
    b.gapAbove = round(b.top - (a.top + a.height));
  }

  // card-looking elements: bordered/rounded/shadowed boxes with text
  const seen = new Set();
  for (const el of main.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width < 180 || r.width > 900 || r.height < 60 || r.height > 700) continue;
    const c = getComputedStyle(el);
    const isCard = (parseFloat(c.borderWidth) > 0 && c.borderStyle !== 'none')
      || parseFloat(c.borderRadius) >= 8
      || (c.boxShadow !== 'none' && !c.boxShadow.startsWith('none'));
    if (!isCard) continue;
    if (!el.textContent.trim()) continue;
    const key = `${Math.round(r.left)}:${Math.round(r.top)}:${Math.round(r.width)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.cards.push({
      sel: ident(el),
      rect: { left: round(r.left), top: round(r.top + scrollY), width: round(r.width), height: round(r.height) },
      ...css(el, ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderRadius', 'gap']),
    });
    if (out.cards.length >= 20) break;
  }

  // heading -> following sibling gap
  for (const h of main.querySelectorAll('h1,h2,h3')) {
    const next = h.nextElementSibling;
    if (!next) continue;
    const hr = h.getBoundingClientRect(), nr = next.getBoundingClientRect();
    const c = getComputedStyle(h);
    out.relatedPairs.push({
      heading: h.tagName, text: h.textContent.trim().slice(0, 60),
      marginBottom: c.marginBottom, paddingBottom: c.paddingBottom,
      gapToNext: round(nr.top - hr.bottom),
      nextTag: next.tagName.toLowerCase(),
    });
    if (out.relatedPairs.length >= 15) break;
  }

  // spacing census over layout elements
  const hist = {};
  let counted = 0;
  for (const el of document.querySelectorAll('header *, main *, footer *')) {
    if (++counted > 4000) break;
    const c = getComputedStyle(el);
    for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'gap', 'rowGap', 'columnGap']) {
      const v = parseFloat(c[p]);
      if (!v || isNaN(v)) continue;
      hist[v] = (hist[v] || 0) + 1;
    }
  }
  out.spacingCensus = Object.fromEntries(Object.entries(hist).sort((a, b) => b[1] - a[1]).slice(0, 40));
  return out;
};

const browser = await chromium.launch({ proxy: { server: 'http://127.0.0.1:7890' } });
const results = {};
for (const [name, url] of PAGES) {
  results[name] = {};
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: HEIGHT } });
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(4000);
      // dismiss cookie/consent banner if present
      for (const txt of ['Reject all', 'Decline', 'Reject', 'Accept all', 'Accept']) {
        const btn = page.getByRole('button', { name: txt, exact: false }).first();
        if (await btn.count().catch(() => 0)) { await btn.click().catch(() => {}); await page.waitForTimeout(800); break; }
      }
      const data = await page.evaluate(probe);
      results[name][w] = data;
      writeFileSync(join(EVID, `${name}-${w}.json`), JSON.stringify(data, null, 2));
      writeFileSync(join(EVID, `${name}-${w}-dom.html`), await page.content());
      await page.screenshot({ path: join(SHOTS, `${name}-${w}.png`), fullPage: true });
      console.log(`ok ${name} ${w}  docH=${data.docHeight}`);
    } catch (e) {
      console.error(`FAIL ${name} ${w}: ${e.message}`);
      results[name][w] = { error: e.message };
    }
    await page.close();
  }
}
await browser.close();
// merge with prior runs so partial retries don't clobber the full set
let prior = {};
try { prior = JSON.parse(readFileSync(join(EVID, 'measurements-all.json'), 'utf8')); } catch {}
for (const [p, widths] of Object.entries(results)) prior[p] = { ...(prior[p] || {}), ...widths };
writeFileSync(join(EVID, 'measurements-all.json'), JSON.stringify(prior, null, 2));
console.log('DONE');
