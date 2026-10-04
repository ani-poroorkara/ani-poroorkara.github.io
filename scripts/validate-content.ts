import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { resolve, sep, basename, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { parse } from 'yaml';
import { fileTypeFromBuffer } from 'file-type';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { inspectMarkdown } from '../src/plugins/remark-content-policy.mjs';
import { postSchema, projectSchema, siteSchema, resumeSchema } from '../src/lib/content/schema';

export async function validateMedia(root: string, path: string, kind: 'image' | 'pdf'): Promise<string[]> {
  const folder = kind === 'image' ? 'images' : 'documents';
  const allowed = kind === 'image' ? ['png', 'jpg', 'jpeg', 'webp', 'avif'] : ['pdf'];
  const limit = kind === 'image' ? 2097152 : 10485760;
  if (!new RegExp(`^/uploads/${folder}/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$`).test(path) || path.includes('..') || !allowed.includes(extname(path).slice(1).toLowerCase())) return [`${path}: invalid upload path or extension`];
  try {
    const publicRoot = await realpath(resolve(root, 'public'));
    const file = await realpath(resolve(publicRoot, `.${path}`));
    if (!file.startsWith(publicRoot + sep)) return [`${path}: upload resolves outside public directory`];
    if ((await stat(file)).size > limit) return [`${path}: exceeds ${kind === 'image' ? '2 MiB' : '10 MiB'} limit`];
    const detected = await fileTypeFromBuffer(await readFile(file));
    const extension = extname(path).slice(1).toLowerCase().replace('jpeg', 'jpg');
    if (!detected || detected.ext !== extension) return [`${path}: file format does not match extension`];
    return [];
  } catch (error) { return [`${path}: missing or unreadable upload (${error instanceof Error ? error.message : String(error)})`]; }
}
export async function validateRepository(root: string): Promise<string[]> {
  const errors: string[] = [];
  for (const collection of ['projects', 'blog'] as const) {
    const folder = resolve(root, 'src/content', collection);
    let files: string[];
    try { files = await readdir(folder, { recursive: true }); } catch { continue; }
    const ids = new Set<string>();
    for (const file of files.filter(file => file.endsWith('.md'))) {
      const context = `src/content/${collection}/${file}`; const id = basename(file, '.md');
      if (file !== basename(file) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id)) errors.push(`${context}: invalid or duplicate filename slug`);
      ids.add(id);
      try {
        const raw = matter(await readFile(resolve(folder, file), 'utf8'), { engines: { yaml: text => parse(text) } });
        const parsed = (collection === 'projects' ? projectSchema : postSchema).safeParse(raw.data);
        if (!parsed.success) errors.push(...parsed.error.issues.map(issue => `${context}: ${issue.path.join('.')} — ${issue.message}`));
        else if (parsed.data.cover) errors.push(...(await validateMedia(root, parsed.data.cover, 'image')).map(error => `${context}: ${error}`));
        const policy = inspectMarkdown(unified().use(remarkParse).parse(raw.content));
        errors.push(...policy.errors.map((error: string) => `${context}: ${error}`));
        for (const image of policy.images) errors.push(...(await validateMedia(root, image, 'image')).map(error => `${context}: ${error}`));
      } catch (error) { errors.push(`${context}: ${error instanceof Error ? error.message : String(error)}`); }
    }
  }
  for (const [filename, schema] of [['site', siteSchema], ['resume', resumeSchema]] as const) {
    try {
      const data = schema.parse(JSON.parse(await readFile(resolve(root, `src/data/${filename}.json`), 'utf8')));
      if ('pdf' in data && data.pdf) errors.push(...await validateMedia(root, data.pdf, 'pdf'));
      if ('socialImage' in data && data.socialImage) {
        if (data.socialImage.startsWith('/uploads/')) errors.push(...await validateMedia(root, data.socialImage, 'image'));
        else await stat(resolve(root, `public${data.socialImage}`));
      }
    } catch (error) { errors.push(`src/data/${filename}.json: ${error instanceof Error ? error.message : String(error)}`); }
  }
  return errors;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = await validateRepository(process.cwd());
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Content and referenced media validated.');
}
