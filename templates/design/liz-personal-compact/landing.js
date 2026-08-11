(() => {
  const header = document.querySelector('.site-header');
  const brandMark = document.querySelector('.brand-mark');
  const panel = document.querySelector('.panel');
  if (!header || !brandMark || !panel) return;

  const update = () => {
    const scrolled = window.scrollY > 12;
    header.style.boxShadow = scrolled ? '0 10px 40px rgba(43, 37, 27, 0.06)' : 'none';
    brandMark.textContent = scrolled ? 'L' : '•';
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      panel.style.transform = entry.isIntersecting ? 'translateY(0)' : 'translateY(6px)';
      panel.style.opacity = entry.isIntersecting ? '1' : '0.98';
    },
    { threshold: 0.15 }
  );

  observer.observe(panel);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();
