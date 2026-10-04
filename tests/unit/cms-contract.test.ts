import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { postSchema, projectSchema, resumeSchema } from '../../src/lib/content/schema';
const config = existsSync('.pages.yml') ? parse(readFileSync('.pages.yml', 'utf8')) : { content: [], media: [] };
it('editor writes to the content locations read by the site', () => { expect(config.content.map((entry: any) => entry.path).sort()).toEqual(['src/content/blog','src/content/projects','src/data/resume.json','src/data/site.json']); });
it('new project defaults validate and remain a draft', () => {
  const editor = config.content.find((entry: any) => entry.name === 'projects'); expect(editor).toBeDefined();
  const data: Record<string, unknown> = { title: 'New project', summary: 'A clear explanation.', published: '2026-10-03' };
  for (const field of editor.fields) if ('default' in field) data[field.name] = field.default;
  expect(projectSchema.parse(data).draft).toBe(true); expect(editor.operations.rename).toBe(false); expect(editor.filename.field).toBe('create');
});
it('post body stays Markdown and optional empty fields validate', () => {
  const editor = config.content.find((entry: any) => entry.name === 'blog'); expect(editor).toBeDefined();
  expect(editor.fields.find((field: any) => field.name === 'body').options.format).toBe('markdown');
  expect(postSchema.safeParse({ title: 'Note', summary: 'Summary', published: '2026-10-03', updated: '', cover: '', coverAlt: '' }).success).toBe(true);
});
it('resume uses repeatable nested sections with a separate PDF', () => {
  const editor = config.content.find((entry: any) => entry.name === 'resume'); expect(editor).toBeDefined();
  expect(editor.fields.find((field: any) => field.name === 'experience').list).toBe(true);
  expect(editor.fields.find((field: any) => field.name === 'pdf').options.media).toBe('documents');
  expect(resumeSchema.safeParse({ summary: '', experience: [], education: [], skills: [], pdf: '' }).success).toBe(true);
});
it('media URLs match published paths', () => { expect(config.media.map((source: any) => [source.input, source.output])).toEqual([['public/uploads/images', '/uploads/images'], ['public/uploads/documents', '/uploads/documents']]); });
