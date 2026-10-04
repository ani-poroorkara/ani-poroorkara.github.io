import { it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { resolveOutputTarget, checkOutput } from '../../scripts/lib/output-links.mjs';
let root: string;
beforeEach(async () => { root = await mkdtemp(join(tmpdir(), 'portfolio-output-')); await mkdir(join(root, 'blog/example'), { recursive: true }); });
afterEach(async () => { await rm(root, { recursive: true, force: true }); });
it('resolves root, same-site, query and fragment URLs to output files', () => {
  expect(resolveOutputTarget(join(root, 'index.html'), '/blog/example/?x=1#heading', root)).toEqual({ file: join(root, 'blog/example/index.html'), fragment: 'heading' });
  expect(resolveOutputTarget(join(root, 'index.html'), 'https://ani-poroorkara.github.io/blog/example/', root)?.file).toBe(join(root, 'blog/example/index.html'));
  expect(resolveOutputTarget(join(root, 'blog/example/index.html'), '../', root)?.file).toBe(join(root, 'blog/index.html'));
  expect(resolveOutputTarget(join(root, 'index.html'), '/images/my%20image.png', root)?.file).toBe(join(root, 'images/my image.png'));
});
it('ignores external destinations but rejects traversal paths', () => {
  expect(resolveOutputTarget(join(root, 'index.html'), 'https://example.com/', root)).toBeNull();
  expect(resolveOutputTarget(join(root, 'index.html'), 'mailto:hello@example.com', root)).toBeNull();
  expect(() => resolveOutputTarget(join(root, 'index.html'), '/%2e%2e/secret', root)).toThrow();
});
it('reports missing local assets and fragment targets', async () => {
  await writeFile(join(root, 'index.html'), '<a href="/blog/example/#missing">Go</a><img src="/no.png">');
  await writeFile(join(root, 'blog/example/index.html'), '<h1 id="present">Hello</h1>');
  const errors = await checkOutput(root); expect(errors.join('\n')).toContain('missing'); expect(errors.join('\n')).toContain('no.png');
});
it('accepts existing targets and inspects CSS assets and srcset', async () => {
  await writeFile(join(root, 'index.html'), '<a href="/blog/example/#present">Go</a><link rel="stylesheet" href="/style.css"><img srcset="/ok.png 1x, /missing.png 2x">');
  await writeFile(join(root, 'blog/example/index.html'), '<h1 id="present">Hello</h1>'); await writeFile(join(root, 'ok.png'), 'image');
  await writeFile(join(root, 'style.css'), 'body{background:url(/background.png)}');
  const errors = await checkOutput(root); expect(errors.join('\n')).toContain('missing.png'); expect(errors.join('\n')).toContain('background.png');
});
