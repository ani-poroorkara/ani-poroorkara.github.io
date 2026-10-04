import { it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { load } from 'cheerio';
it.each(readdirSync('dist', { recursive: true }).map(String).filter(path => path.endsWith('.html')))('provides social metadata for %s', path => {
  const $ = load(readFileSync(`dist/${path}`, 'utf8'));
  expect($('meta[property="og:title"]').attr('content')).toBeTruthy();
  expect($('meta[property="og:image"]').attr('content')).toMatch(/^https:\/\/ani-poroorkara\.github\.io\//);
  expect($('meta[name="twitter:card"]').attr('content')).toBe('summary_large_image');
  expect($('link[rel="canonical"]').attr('href')).toMatch(/^https:\/\/ani-poroorkara\.github\.io\//);
});
it('provides RSS, sitemap and robots without draft entries', () => {
  expect(existsSync('dist/rss.xml')).toBe(true); expect(existsSync('dist/sitemap-index.xml')).toBe(true); expect(existsSync('dist/robots.txt')).toBe(true);
  expect(readFileSync('dist/sitemap-0.xml', 'utf8')).not.toContain('/404.html');
});
