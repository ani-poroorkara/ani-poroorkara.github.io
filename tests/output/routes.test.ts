import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { load } from 'cheerio';
it.each(['index.html', 'projects/index.html', 'projects/playlist-generation/index.html', 'blog/index.html', 'resume/index.html', '404.html'])('generates a directly navigable static page %s', path => {
  expect(existsSync(`dist/${path}`)).toBe(true);
  const $ = load(readFileSync(`dist/${path}`, 'utf8'));
  expect($('h1')).toHaveLength(1); expect($('main')).toHaveLength(1);
});
it('has a truthful empty blog and hides nonexistent resume download', () => {
  expect(existsSync('dist/blog/index.html')).toBe(true);
  expect(readFileSync('dist/blog/index.html', 'utf8')).toContain('No published posts yet');
  expect(existsSync('dist/resume/index.html')).toBe(true);
  expect(load(readFileSync('dist/resume/index.html', 'utf8'))('a[href$=".pdf"]')).toHaveLength(0);
});
