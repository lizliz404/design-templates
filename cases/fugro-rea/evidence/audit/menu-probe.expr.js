(async () => {
  const btn = document.querySelector('button[title="Menu"]');
  if (!btn) return { err: 'no menu button' };
  btn.click();
  await new Promise(r => setTimeout(r, 1800));
  const links = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
  const uniq = [...new Set(links)];
  const interesting = uniq.filter(u => /renewable-energy|technical-papers|u-gro|podcasts|shareholder|debt-information|our-values|hsse|locations|stories|events|countries/.test(u));
  // find largest visible overlay: elements with position fixed and big link count
  const fixed = [...document.querySelectorAll('body *')].filter(e => {
    const s = getComputedStyle(e);
    return (s.position === 'fixed' || s.position === 'absolute') && e.querySelectorAll('a').length > 3;
  }).map(e => ({ cls: e.className && e.className.baseVal !== undefined ? e.className.baseVal : String(e.className).slice(0,80), links: e.querySelectorAll('a').length, text: e.innerText.slice(0,200) }));
  return { totalAnchors: links.length, interesting, fixedOverlays: fixed.slice(0,10), bodyClass: document.body.className, htmlOverflow: getComputedStyle(document.documentElement).overflow };
})()
