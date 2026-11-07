// targeted probe: css vars, edge-node owners, inner section rhythm
import { chromium } from '/home/liz/.local/share/mise/installs/npm-playwright/1.64.1/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EVID = join(ROOT, 'evidence');

const probe = () => {
  const round = (v) => Math.round(v * 100) / 100;
  const ident = (el) => {
    const cls = (el.getAttribute('class') || '').trim().split(/\s+/).slice(0, 4).join('.');
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? '.' + cls.slice(0, 80) : '');
  };
  const vars = {};
  const cs = getComputedStyle(document.documentElement);
  for (const n of ['--ds-page-width', '--ds-page-width-with-margin', '--geist-page-margin', '--geist-gap', '--geist-space-1x', '--geist-space-2x', '--geist-space-4x', '--geist-space-8x', '--geist-space-16x', '--geist-space-24x', '--geist-space-32x', '--geist-space-40x', '--geist-space-48x', '--geist-space-64x']) {
    vars[n] = cs.getPropertyValue(n).trim() || null;
  }
  // owners of extreme text edges in header & footer
  const edgeOwners = (root) => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    const nodes = [];
    while (w.nextNode()) {
      if (!w.currentNode.textContent.trim()) continue;
      range.selectNodeContents(w.currentNode);
      const r = range.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const el = w.currentNode.parentElement;
      const c = getComputedStyle(el);
      nodes.push({
        text: w.currentNode.textContent.trim().slice(0, 40),
        left: round(r.left), right: round(r.right),
        owner: ident(el), pos: c.position, vis: c.visibility, display: c.display,
        opacity: c.opacity,
      });
    }
    nodes.sort((a, b) => a.left - b.left);
    return { leftmost: nodes.slice(0, 4), rightmost: nodes.slice(-4) };
  };
  const out = { url: location.href, viewport: { w: innerWidth }, vars, header: null, footer: null, inner: [] };
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  if (header) out.header = edgeOwners(header);
  if (footer) out.footer = edgeOwners(footer);
  // inner rhythm: children of the biggest main child
  const main = document.querySelector('main');
  if (main) {
    let big = null, bh = 0;
    for (const ch of main.children) {
      const h = ch.getBoundingClientRect().height;
      if (h > bh) { bh = h; big = ch; }
    }
    if (big) {
      for (const [i, ch] of [...big.children].entries()) {
        const r = ch.getBoundingClientRect();
        if (r.width === 0) continue;
        const c = getComputedStyle(ch);
        out.inner.push({
          idx: i, sel: ident(ch),
          top: round(r.top + scrollY), h: round(r.height),
          padT: c.paddingTop, padB: c.paddingBottom, mT: c.marginTop, mB: c.marginBottom,
        });
      }
      for (let i = 1; i < out.inner.length; i++) {
        const a = out.inner[i - 1], b = out.inner[i];
        b.gapAbove = round(b.top - (a.top + a.h));
      }
    }
  }
  return out;
};

const browser = await chromium.launch({ proxy: { server: 'http://127.0.0.1:7890' } });
const jobs = [['home', 'https://vercel.com/', [1440, 1920]], ['pricing', 'https://vercel.com/pricing', [1440]], ['docs', 'https://vercel.com/docs', [1440]]];
for (const [name, url, widths] of jobs) {
  for (const w of widths) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page.waitForTimeout(3500);
        for (const txt of ['Reject all', 'Decline', 'Reject', 'Accept all', 'Accept']) {
          const btn = page.getByRole('button', { name: txt, exact: false }).first();
          if (await btn.count().catch(() => 0)) { await btn.click().catch(() => {}); await page.waitForTimeout(600); break; }
        }
        const data = await page.evaluate(probe);
        writeFileSync(join(EVID, `${name}-${w}-deep.json`), JSON.stringify(data, null, 2));
        console.log(`ok ${name} ${w}`);
        break;
      } catch (e) {
        console.error(`retry ${name} ${w} attempt${attempt}: ${e.message.split('\n')[0]}`);
        await page.close();
        if (attempt === 3) console.error(`GIVEUP ${name} ${w}`);
        continue;
      }
      await page.close();
    }
  }
}
await browser.close();
console.log('DONE');
