(async () => {
  const link = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Industries');
  if (!link) return { err: 'no industries link', sample:[...document.querySelectorAll('header a, nav a')].map(a=>a.textContent.trim()).slice(0,20) };
  const r = link.getBoundingClientRect();
  link.dispatchEvent(new MouseEvent('pointerover',{bubbles:true}));
  link.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}));
  link.dispatchEvent(new MouseEvent('mousemove',{bubbles:true,clientX:r.x+5,clientY:r.y+5}));
  await new Promise(r=>setTimeout(r,1800));
  const all = [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
  const sec = [...new Set(all.filter(u=>/industries\/|expertise\/|careers\/|investors\/|news\/|about-us\//.test(u)))];
  const fixed=[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);return (s.position==='fixed'||s.position==='absolute')&&e.querySelectorAll('a').length>3&&e.offsetHeight>50;}).map(e=>({cls:String(e.className).slice(0,80),n:e.querySelectorAll('a').length,text:e.innerText.slice(0,400)}));
  return {linkHref:link.getAttribute('href'),sec,fixed:fixed.slice(0,8)};
})()
