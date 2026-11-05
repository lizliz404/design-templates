(async () => {
  const sleep = ms => new Promise(r=>setTimeout(r,ms));
  const menuBtn = document.querySelector('button[title="Menu"]');
  if (menuBtn) { menuBtn.click(); await sleep(1200); }
  // find Industries link inside overlay (the one inside fixed container)
  const overlay = [...document.querySelectorAll('body *')].find(e=>{const s=getComputedStyle(e);return (s.position==='fixed'||s.position==='absolute')&&e.querySelectorAll('a').length>=6&&e.innerText.includes('Industries');});
  if (!overlay) return {err:'no overlay'};
  const ind = [...overlay.querySelectorAll('a,button')].find(e=>e.textContent.trim().startsWith('Industries'));
  if (!ind) return {err:'no industries in overlay', html: overlay.innerText.slice(0,300)};
  ind.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  await sleep(1200);
  const after=[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
  const sec=[...new Set(after.filter(u=>/industries\/energy|water|infrastructure|renewable|technical-papers|u-gro|podcasts|shareholder|debt-info|our-values|hsse|locations|stories|events|countries|jobs/.test(u)))];
  return {clicked: ind.tagName+':'+ind.textContent.trim().slice(0,40), sec, overlayText: overlay.innerText.slice(0,600)};
})()
