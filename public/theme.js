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
      button.querySelector('span').textContent = theme === 'dark' ? '☀' : '☾';
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
    button.addEventListener('click', () => {
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', choice); } catch {}
      apply();
    });
  });
})();
