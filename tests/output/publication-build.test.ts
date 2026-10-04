import { afterAll, beforeAll, expect, it } from 'vitest';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { resolve, join, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve('.');
let fixture: string;
const post = (title: string, date: string, draft: boolean) => `---\ntitle: "${title}"\nsummary: "A publication fixture"\npublished: "${date}"\ndraft: ${draft}\n---\n\n## Visible article body\n\nA **rendered** paragraph.\n`;
function build() {
  execFileSync(process.execPath, [join(root, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    cwd: fixture, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', SHOW_DRAFTS: 'true' },
    timeout: 60000, stdio: 'pipe',
  });
}
beforeAll(() => {
  mkdirSync('.test-builds', { recursive: true });
  fixture = mkdtempSync(join(root, '.test-builds/publication-'));
  for (const path of ['src', 'public', 'astro.config.mjs', 'package.json', 'tsconfig.json']) {
    cpSync(join(root, path), join(fixture, path), { recursive: true });
  }
  mkdirSync(join(fixture, 'tests/output'), { recursive: true });
  for (const path of ['routes.test.ts', 'metadata.test.ts']) cpSync(join(root, 'tests/output', path), join(fixture, 'tests/output', path));
  symlinkSync(join(root, 'node_modules'), join(fixture, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
  const blog = join(fixture, 'src/content/blog');
  rmSync(blog, { recursive: true }); mkdirSync(blog);
  writeFileSync(join(blog, 'stable-url.md'), post('Published fixture', '2020-01-01', false));
  writeFileSync(join(blog, 'hidden-draft.md'), post('Hidden draft', '2020-01-01', true));
  writeFileSync(join(blog, 'future-entry.md'), post('Future fixture', '9999-01-01', false));
  const projects = join(fixture, 'src/content/projects');
  for (const name of readdirSync(projects)) {
    const path = join(projects, name);
    writeFileSync(path, readFileSync(path, 'utf8').replace(/draft: false/, 'draft: true'));
  }
  const resumePath = join(fixture, 'src/data/resume.json');
  const resume = JSON.parse(readFileSync(resumePath, 'utf8'));
  resume.pdf = '/uploads/documents/fixture.pdf';
  writeFileSync(resumePath, JSON.stringify(resume));
  writeFileSync(join(fixture, 'public/uploads/documents/fixture.pdf'), '%PDF-1.4\n%%EOF');
  build();
}, 90000);
afterAll(() => { if (fixture?.startsWith(join(root, '.test-builds') + sep)) rmSync(fixture, { recursive: true, force: true }); });
it('production excludes drafts and future posts even with the draft-preview flag', () => {
  expect(existsSync(join(fixture, 'dist/blog/stable-url/index.html'))).toBe(true);
  for (const slug of ['hidden-draft', 'future-entry']) {
    expect(existsSync(join(fixture, `dist/blog/${slug}/index.html`))).toBe(false);
    for (const path of ['index.html', 'blog/index.html', 'rss.xml', 'sitemap-0.xml']) {
      expect(readFileSync(join(fixture, 'dist', path), 'utf8')).not.toContain(slug);
    }
  }
  const html = readFileSync(join(fixture, 'dist/blog/stable-url/index.html'), 'utf8');
  expect(html).toContain('Visible article body'); expect(html).toContain('<strong>rendered</strong>');
  expect(readFileSync(join(fixture, 'dist/rss.xml'), 'utf8')).toContain('/blog/stable-url/');
});
it('editing a title keeps the filename-based URL', () => {
  writeFileSync(join(fixture, 'src/content/blog/stable-url.md'), post('Updated fixture title', '2020-01-01', false));
  build();
  expect(readFileSync(join(fixture, 'dist/blog/stable-url/index.html'), 'utf8')).toContain('Updated fixture title');
  expect(existsSync(join(fixture, 'dist/blog/updated-fixture-title/index.html'))).toBe(false);
}, 90000);
it('routine publishing and PDF updates pass output checks without requiring old projects', () => {
  expect(() => execFileSync(process.execPath, [join(root, 'node_modules/vitest/vitest.mjs'), 'run', '--dir', 'tests/output'], {
    cwd: fixture, timeout: 60000, stdio: 'pipe',
  })).not.toThrow();
}, 90000);
it('empty collections and no PDF have useful empty states', () => {
  writeFileSync(join(fixture, 'src/content/blog/stable-url.md'), post('Now a draft', '2020-01-01', true));
  const path = join(fixture, 'src/data/resume.json');
  const resume = JSON.parse(readFileSync(path, 'utf8')); delete resume.pdf;
  writeFileSync(path, JSON.stringify(resume)); build();
  expect(readFileSync(join(fixture, 'dist/blog/index.html'), 'utf8')).toContain('No published posts yet');
  expect(readFileSync(join(fixture, 'dist/resume/index.html'), 'utf8')).not.toContain('href="/uploads/documents/fixture.pdf"');
}, 90000);
