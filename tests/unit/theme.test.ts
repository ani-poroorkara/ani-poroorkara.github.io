import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

function boot(saved: string | null, prefersDark = false, storageBlocked = false) {
  let stored = saved;
  const root = { dataset: {} as Record<string, string> };
  const handlers: Record<string, Function> = {};
  const button = { hidden: true, title: '', setAttribute: (key: string, value: string) => { attributes[key] = value; }, addEventListener: (key: string, callback: Function) => { handlers[key] = callback; }, querySelector: () => icon };
  const icon = { textContent: '' }; const attributes: Record<string, string> = {};
  const media = { matches: prefersDark, addEventListener: (_: string, callback: Function) => { handlers.system = callback; } };
  runInNewContext(readFileSync('public/theme.js', 'utf8'), {
    document: { documentElement: root, querySelector: () => button, addEventListener: (_: string, callback: Function) => callback() },
    window: { matchMedia: () => media, addEventListener: () => {} },
    localStorage: { getItem: () => { if (storageBlocked) throw new Error('Blocked'); return stored; }, setItem: (_: string, value: string) => { if (storageBlocked) throw new Error('Blocked'); stored = value; } },
  });
  return { root, button, attributes, handlers, media, saved: () => stored };
}
it('uses system preference unless a valid saved choice exists', () => {
  expect(boot(null, true).root.dataset.theme).toBe('dark');
  expect(boot('light', true).root.dataset.theme).toBe('light');
  expect(boot('invalid', false).root.dataset.theme).toBe('light');
});
it('switches accessibly and remembers the choice across pages', () => {
  const app = boot(null); app.handlers.click();
  expect(app.attributes['aria-pressed']).toBe('true'); expect(app.saved()).toBe('dark');
  expect(boot(app.saved()).root.dataset.theme).toBe('dark');
  app.handlers.click(); expect(app.root.dataset.theme).toBe('light');
});
it('still switches when browser storage is unavailable', () => {
  const app = boot(null, false, true);
  expect(app.button.hidden).toBe(false);
  expect(() => app.handlers.click()).not.toThrow();
  expect(app.root.dataset.theme).toBe('dark');
});
it('follows system changes until an explicit choice is made', () => {
  const app = boot(null); app.media.matches = true; app.handlers.system();
  expect(app.root.dataset.theme).toBe('dark');
  app.handlers.click(); app.handlers.system();
  expect(app.root.dataset.theme).toBe('light');
});
