import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, sep, extname } from 'node:path';
import { load } from 'cheerio';
const site = 'https://ani-poroorkara.github.io';
export function resolveOutputTarget(sourceFile, url, root) {
  if (/^(mailto:|tel:|data:)/i.test(url)) return null;
  const sourcePath = '/' + relative(root, sourceFile).split(sep).join('/');
  const target = new URL(url, new URL(sourcePath, site));
  if (target.origin !== site) return null;
  const rawPath = url.split(/[?#]/)[0];
  if (/%2e|%2f|%5c/i.test(rawPath) || rawPath.includes('\\') || rawPath.startsWith('/') && /(^|\/)\.\.(\/|$)/.test(rawPath)) throw new Error('Unsafe path');
  const pathname = decodeURIComponent(target.pathname);
  let file = resolve(root, '.' + pathname);
  if (pathname.endsWith('/')) file = resolve(file, 'index.html');
  else if (!extname(pathname)) file = resolve(file, 'index.html');
  if (file !== resolve(root) && !file.startsWith(resolve(root) + sep)) throw new Error('Path escapes output');
  return { file, ...(target.hash ? { fragment: decodeURIComponent(target.hash.slice(1)) } : {}) };
}
export async function checkOutput(root) {
  root = resolve(root); const errors = []; const cache = new Map();
  const files = await readdir(root, { recursive: true });
  async function check(source, url) {
    try {
      const target = resolveOutputTarget(source, url, root); if (!target) return;
      if (!(await stat(target.file)).isFile()) throw new Error('not a file');
      if (target.fragment && target.file.endsWith('.html')) {
        if (!cache.has(target.file)) cache.set(target.file, load(await readFile(target.file, 'utf8')));
        const $ = cache.get(target.file);
        if (!$('[id]').toArray().some(element => $(element).attr('id') === target.fragment)) throw new Error(`missing fragment #${target.fragment}`);
      }
    } catch (error) { errors.push(`${relative(root, source)}: ${url} — ${error.message}`); }
  }
  for (const name of files.filter(name => /\.(html|css|xml)$/.test(name))) {
    const source = resolve(root, name); const text = await readFile(source, 'utf8');
    if (name.endsWith('.css')) {
      for (const match of text.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) await check(source, match[1]);
    } else if (name.endsWith('.xml')) {
      const $ = load(text, { xml: true });
      for (const element of $('loc, item > link').toArray()) await check(source, $(element).text());
    } else {
      const $ = load(text); cache.set(source, $);
      for (const element of $('[href], [src], [srcset]').toArray()) {
        for (const attribute of ['href', 'src']) { const url = $(element).attr(attribute); if (url) await check(source, url); }
        const srcset = $(element).attr('srcset');
        if (srcset) for (const item of srcset.split(',')) await check(source, item.trim().split(/\s+/)[0]);
      }
      for (const element of $('meta[property="og:image"], meta[name="twitter:image"], meta[property="og:url"]').toArray()) { const url = $(element).attr('content'); if (url) await check(source, url); }
    }
  }
  return errors;
}
