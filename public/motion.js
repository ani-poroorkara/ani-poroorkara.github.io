(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  function update() {
    const running = !reduced.matches && !document.hidden;
    root.dataset.motion = running ? 'running' : 'paused';
    if (!running) {
      observer?.disconnect();
      document.querySelectorAll('.scroll-reveal').forEach(element => element.classList.add('is-revealed'));
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    observer?.disconnect();
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    document.querySelectorAll('.section, .contact-section, .resume-section').forEach(element => {
      element.classList.add('scroll-reveal');
      if (!element.classList.contains('is-revealed')) observer.observe(element);
    });
  }
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
})();
