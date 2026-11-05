(() => {
  const out = { stylesheets: [], fontsUsed: new Set(), colors: {}, fontSizes: {}, fontWeights: {}, fontFamilies: {}, rootFontSize: null, breakpoints: new Set() };
  let totalRules = 0;
  for (const sheet of document.styleSheets) {
    let rules = [];
    try { rules = [...sheet.cssRules]; } catch (e) { continue; }
    for (const r of rules) {
      totalRules++;
      const t = r.cssText || '';
      // collect media query breakpoints
      if (r instanceof CSSMediaRule) {
        for (const sub of r.cssRules) {
          const m = (r.conditionText || '').match(/(\d+)px/g);
          if (m) m.forEach(x => out.breakpoints.add(x));
        }
      }
      if (r.style) {
        const ff = r.style.fontFamily; if (ff) out.fontFamilies[ff] = (out.fontFamilies[ff]||0)+1;
        const fs = r.style.fontSize; if (fs) out.fontSizes[fs] = (out.fontSizes[fs]||0)+1;
        const fw = r.style.fontWeight; if (fw) out.fontWeights[fw] = (out.fontWeights[fw]||0)+1;
        for (const prop of ['color','backgroundColor','background','borderColor','fill','stroke','outlineColor']) {
          const v = r.style[prop];
          if (v && /#[0-9a-fA-F]{3,8}|rgba?\(/.test(v)) out.colors[v.toLowerCase()] = (out.colors[v.toLowerCase()]||0)+1;
        }
      }
    }
  }
  out.totalRules = totalRules;
  out.rootFontSize = getComputedStyle(document.documentElement).fontSize;
  out.bodyFont = (() => { const s = getComputedStyle(document.body); return { fontFamily: s.fontFamily, fontSize: s.fontSize, color: s.color, background: s.backgroundColor }; })();
  // sample key elements
  out.samples = {};
  const sels = { h1: 'h1', h2: 'h2', nav: 'header nav, nav, header', button: 'a[class*=button], button, [class*=Button]', hero: '[class*=hero], [class*=Hero]' };
  for (const [k, sel] of Object.entries(sels)) {
    const el = document.querySelector(sel);
    if (el) { const s = getComputedStyle(el); out.samples[k] = { fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, letterSpacing: s.letterSpacing, lineHeight: s.lineHeight, textTransform: s.textTransform, color: s.color }; }
  }
  // fonts actually loaded
  out.loadedFonts = [...document.fonts].map(f => ({ family: f.family, weight: f.weight, status: f.status }));
  // dump all css text for offline analysis (bounded)
  let cssText = '';
  for (const sheet of document.styleSheets) {
    try { for (const r of sheet.cssRules) cssText += r.cssText + '\n'; } catch(e){}
  }
  out.cssTextLength = cssText.length;
  out.cssText = cssText.slice(0, 4000000);
  out.fontFamilies = Object.fromEntries(Object.entries(out.fontFamilies).sort((a,b)=>b[1]-a[1]).slice(0,30));
  out.fontSizes = Object.fromEntries(Object.entries(out.fontSizes).sort((a,b)=>b[1]-a[1]).slice(0,40));
  out.fontWeights = Object.fromEntries(Object.entries(out.fontWeights).sort((a,b)=>b[1]-a[1]).slice(0,20));
  out.colors = Object.fromEntries(Object.entries(out.colors).sort((a,b)=>b[1]-a[1]).slice(0,60));
  out.breakpoints = [...out.breakpoints].sort();
  delete out.fontsUsed;
  return out;
})()
