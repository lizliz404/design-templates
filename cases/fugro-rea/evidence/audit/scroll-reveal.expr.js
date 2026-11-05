(async () => {
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const count=()=>[...document.querySelectorAll('[style]')].filter(e=>/opacity:\s*0/.test(e.getAttribute('style'))).length;
  const before=count();
  // smooth scroll through page in steps
  const h=document.documentElement.scrollHeight;
  for(let y=0;y<=h;y+=600){window.scrollTo(0,y);await sleep(250);}
  await sleep(1200);
  const mid=count();
  window.scrollTo(0,0);await sleep(800);
  return {before,mid,afterBackTop:count(),scrollHeight:h};
})()
