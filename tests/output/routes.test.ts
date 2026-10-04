import { it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { load } from 'cheerio';
const pages = ['index.html', 'projects/index.html', 'blog/index.html', 'resume/index.html', '404.html', ...readdirSync('dist', { recursive: true }).map(String).filter(path => /^(projects|blog)[\\/].+[\\/]index\.html$/.test(path))];
it.each(pages)('generates a directly navigable static page %s', path => {
  expect(existsSync(`dist/${path}`)).toBe(true);
  const $ = load(readFileSync(`dist/${path}`, 'utf8'));
  expect($('h1')).toHaveLength(1); expect($('main')).toHaveLength(1);
});
it('shows a download only when the current résumé data provides one', () => {
  const resume = JSON.parse(readFileSync('src/data/resume.json', 'utf8'));
  const links = load(readFileSync('dist/resume/index.html', 'utf8'))('a[href$=".pdf"]');
  expect(links).toHaveLength(resume.pdf ? 1 : 0);
  if (resume.pdf) expect(links.attr('href')).toBe(resume.pdf);
});
