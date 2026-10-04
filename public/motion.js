(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = localStorage.getItem('portfolio-motion') === 'paused'; } catch {}
  let observer;
  function update() {
    const running = !paused && !reduced.matches && !document.hidden;
    root.dataset.motion = running ? 'running' : 'paused';
    document.querySelectorAll('[data-motion-toggle]').forEach(button => {
      button.hidden = reduced.matches;
      button.textContent = paused ? 'Resume motion' : 'Pause motion';
      button.setAttribute('aria-pressed', String(paused));
    });
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
  document.querySelectorAll('[data-motion-toggle]').forEach(button => button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('portfolio-motion', paused ? 'paused' : 'running'); } catch {}
    update();
  }));
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
})();
