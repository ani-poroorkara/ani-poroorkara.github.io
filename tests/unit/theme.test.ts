import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

function boot(saved: string | null, prefersDark = false, storageBlocked = false, motion?: { reduced?: boolean; paused?: boolean; fail?: boolean }) {
  let stored = saved;
  const animations: any[] = [];
  let transitions = 0;
  const root = { dataset: { motion: motion?.paused ? 'paused' : 'running' } as Record<string, string>, animate: (...args: any[]) => { animations.push(args); return { finished: Promise.resolve() }; } };
  const handlers: Record<string, Function> = {};
  const button = { hidden: true, title: '', setAttribute: (key: string, value: string) => { attributes[key] = value; }, addEventListener: (key: string, callback: Function) => { handlers[key] = callback; }, querySelector: () => icon };
  const icon = { textContent: '' }; const attributes: Record<string, string> = {};
  const media = { matches: prefersDark, addEventListener: (_: string, callback: Function) => { handlers.system = callback; } };
  runInNewContext(readFileSync('public/theme.js', 'utf8'), {
    document: { documentElement: root, querySelector: () => button, addEventListener: (_: string, callback: Function) => callback(), ...(motion ? { startViewTransition: (update: Function) => { transitions++; update(); return { ready: motion.fail ? Promise.reject(new Error('Snapshot unavailable')) : Promise.resolve(), finished: Promise.resolve() }; } } : {}) },
    window: { innerWidth: 1000, innerHeight: 800, matchMedia: (query: string) => query.includes('reduced') ? { matches: motion?.reduced || false } : media, addEventListener: () => {} },
    localStorage: { getItem: () => { if (storageBlocked) throw new Error('Blocked'); return stored; }, setItem: (_: string, value: string) => { if (storageBlocked) throw new Error('Blocked'); stored = value; } },
  });
  Object.assign(button, { disabled: false, getBoundingClientRect: () => ({ left: 900, top: 20, width: 44, height: 44 }) });
  return { root, button, attributes, handlers, media, animations, transitions: () => transitions, saved: () => stored };
}
it('uses system preference unless a valid saved choice exists', () => {
  expect(boot(null, true).root.dataset.theme).toBe('dark');
  expect(boot('light', true).root.dataset.theme).toBe('light');
  expect(boot('invalid', false).root.dataset.theme).toBe('light');
});
it('reveals the new theme from the button and covers the farthest corner', async () => {
  const app = boot('light', false, false, {});
  const pending = app.handlers.click();
  app.handlers.click();
  expect(app.transitions()).toBe(1);
  await pending;
  expect(app.root.dataset.theme).toBe('dark');
  expect(app.animations[0][0].clipPath[0]).toBe('circle(0px at 922px 42px)');
  expect(app.animations[0][0].clipPath[1]).toBe(`circle(${Math.hypot(922, 758)}px at 922px 42px)`);
  expect(app.animations[0][1].pseudoElement).toBe('::view-transition-new(root)');
  expect(app.root.dataset.themeTransition).toBeUndefined();
  await app.handlers.click();
  expect(app.root.dataset.theme).toBe('light');
});
it('switches instantly when motion is paused or reduced', async () => {
  for (const motion of [{ paused: true }, { reduced: true }]) {
    const app = boot('light', false, false, motion);
    await app.handlers.click();
    expect(app.root.dataset.theme).toBe('dark');
    expect(app.transitions()).toBe(0);
  }
});
it('keeps the selected theme and unlocks the switch if a snapshot fails', async () => {
  const app = boot('light', false, false, { fail: true });
  await app.handlers.click();
  expect(app.root.dataset.theme).toBe('dark');
  expect(app.saved()).toBe('dark');
  expect(app.root.dataset.themeTransition).toBeUndefined();
  await app.handlers.click();
  expect(app.root.dataset.theme).toBe('light');
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
