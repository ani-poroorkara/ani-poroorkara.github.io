(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem('portfolio-theme'); } catch {}
  if (choice !== 'light' && choice !== 'dark') choice = null;
  let button;
  function apply() {
    const theme = choice || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    if (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      button.querySelector('span').textContent = theme === 'dark' ? '☾' : '☀';
    }
  }
  apply();
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === 'portfolio-theme' || event.key === null) {
      choice = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
      apply();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    button.hidden = false;
    apply();
    button.addEventListener('click', async () => {
      if (button.disabled) return;
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', choice); } catch {}
      if (!document.startViewTransition || !root.animate || root.dataset.motion === 'paused' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        apply();
        return;
      }
      const bounds = button.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      button.disabled = true;
      root.dataset.themeTransition = 'active';
      try {
        const transition = document.startViewTransition(apply);
        // Consume finished separately: navigation or a hidden tab can skip a snapshot.
        const finished = transition.finished.catch(() => {});
        await transition.ready;
        await root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, {
          duration: 700,
          easing: 'cubic-bezier(.4, 0, .2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }).finished;
        await finished;
      } catch {
        apply();
      } finally {
        delete root.dataset.themeTransition;
        button.disabled = false;
      }
    });
  });
})();
