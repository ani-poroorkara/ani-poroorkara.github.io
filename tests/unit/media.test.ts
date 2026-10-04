import { it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateMedia, validateRepository } from '../../scripts/validate-content';
let root: string;
beforeEach(async () => { root = await mkdtemp(join(tmpdir(), 'portfolio-media-')); await mkdir(join(root, 'public/uploads/images'), { recursive: true }); await mkdir(join(root, 'public/uploads/documents'), { recursive: true }); });
afterEach(async () => { await rm(root, { recursive: true, force: true }); });
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a5WQAAAAASUVORK5CYII=', 'base64');
it.each(['/../secret.png', '/uploads/images/../../secret.png', '/uploads/images/%2e%2e/secret.png', '/uploads/images/a\\b.png'])('rejects unsafe media paths %s', async path => { expect(await validateMedia(root, path, 'image')).not.toEqual([]); });
it('rejects missing media and disguised file types', async () => {
  expect(await validateMedia(root, '/uploads/images/no.png', 'image')).not.toEqual([]);
  await writeFile(join(root, 'public/uploads/images/disguised.png'), '%PDF-1.7\n');
  expect(await validateMedia(root, '/uploads/images/disguised.png', 'image')).not.toEqual([]);
});
it('accepts valid image at limit and rejects larger image', async () => {
  await writeFile(join(root, 'public/uploads/images/good.png'), Buffer.concat([png, Buffer.alloc(2097152 - png.length)]));
  expect(await validateMedia(root, '/uploads/images/good.png', 'image')).toEqual([]);
  await writeFile(join(root, 'public/uploads/images/big.png'), Buffer.concat([png, Buffer.alloc(2097153 - png.length)]));
  expect(await validateMedia(root, '/uploads/images/big.png', 'image')).not.toEqual([]);
});
it('rejects oversized PDF and accepts a small PDF', async () => {
  await writeFile(join(root, 'public/uploads/documents/cv.pdf'), '%PDF-1.7\n');
  expect(await validateMedia(root, '/uploads/documents/cv.pdf', 'pdf')).toEqual([]);
  await writeFile(join(root, 'public/uploads/documents/big.pdf'), Buffer.concat([Buffer.from('%PDF-1.7\n'), Buffer.alloc(10485761)]));
  expect(await validateMedia(root, '/uploads/documents/big.pdf', 'pdf')).not.toEqual([]);
});
it('rejects frontmatter identity overrides with file context', async () => {
  await mkdir(join(root, 'src/content/blog'), { recursive: true });
  await writeFile(join(root, 'src/content/blog/example.md'), '---\ntitle: Example\nsummary: Example\npublished: "2026-10-03"\nslug: override\n---\nBody');
  expect((await validateRepository(root)).join('\n')).toContain('example.md');
});
