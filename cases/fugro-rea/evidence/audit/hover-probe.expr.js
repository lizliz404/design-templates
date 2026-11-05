(async () => {
  const link = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Industries' && a.closest('header,nav,[class*=header],[class*=Header]'));
  if (!link) return { err: 'no industries link' };
  const r = link.getBoundingClientRect();
  for (const type of ['pointerover','mouseover','mouseenter']) link.dispatchEvent(new MouseEvent(type,{bubbles:true}));
  link.dispatchEvent(new MouseEvent('mousemove',{bubbles:true}));
  await new Promise(r=>setTimeout(r,1500));
  const all = [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
  const sec = all.filter(u=>/energy|water|infrastructure|case-studies|technical-papers|jobs|stories|countries|working-at|events|shares|results|outlook|debt|business-news|press|long-reads|podcasts|purpose|strategy|values|governance|sustainability|hsse|locations/.test(u));
  const fixed=[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);return (s.position==='fixed'||s.position==='absolute')&&e.querySelectorAll('a').length>3;}).map(e=>({cls:String(e.className).slice(0,80),n:e.querySelectorAll('a').length,text:e.innerText.slice(0,300)}));
  return {sec:[...new Set(sec)],fixed:fixed.slice(0,8)};
})()
