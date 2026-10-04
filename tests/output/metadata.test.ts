import { it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { load } from 'cheerio';
it.each(['index.html', 'projects/index.html', 'projects/gradbot/index.html', 'blog/index.html', 'resume/index.html'])('provides social metadata for %s', path => {
  const $ = load(readFileSync(`dist/${path}`, 'utf8'));
  expect($('meta[property="og:title"]').attr('content')).toBeTruthy();
  expect($('meta[property="og:image"]').attr('content')).toMatch(/^https:\/\/ani-poroorkara\.github\.io\//);
  expect($('meta[name="twitter:card"]').attr('content')).toBe('summary_large_image');
  expect($('link[rel="canonical"]').attr('href')).toMatch(/^https:\/\/ani-poroorkara\.github\.io\//);
});
it('provides RSS, sitemap and robots without draft entries', () => {
  expect(existsSync('dist/rss.xml')).toBe(true); expect(existsSync('dist/sitemap-index.xml')).toBe(true); expect(existsSync('dist/robots.txt')).toBe(true);
  expect(readFileSync('dist/rss.xml', 'utf8')).not.toContain('/a-first-note/');
  expect(readFileSync('dist/sitemap-0.xml', 'utf8')).not.toContain('/a-first-note/');
  expect(readFileSync('dist/sitemap-0.xml', 'utf8')).not.toContain('/404.html');
});
