(() => {
  const map = {};
  document.querySelectorAll('[type]').forEach(el => {
    const t = el.getAttribute('type');
    if (!/^(HEADING|BODY)_/.test(t)) return;
    const s = getComputedStyle(el);
    const key = t;
    if (!map[key]) map[key] = { fontFamily: s.fontFamily.split(',')[0], fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, textTransform: s.textTransform, samples: 0 };
    map[key].samples++;
  });
  return map;
})()
