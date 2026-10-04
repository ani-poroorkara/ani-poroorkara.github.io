import { describe, it, expect } from 'vitest';
import { postSchema, projectSchema, resumeSchema } from '../../src/lib/content/schema';
const post = { title: 'A practical note', summary: 'A useful explanation.', published: '2026-10-03' };
describe('authoring validation', () => {
  it('keeps new entries unpublished by default', () => { expect(postSchema.parse(post).draft).toBe(true); });
  it.each(['2026-02-29', '2026-13-03', '2026-00-01', '2026-10-32'])('rejects invalid calendar date %s', published => { expect(postSchema.safeParse({ ...post, published }).success).toBe(false); });
  it('accepts actual leap day', () => { expect(postSchema.safeParse({ ...post, published: '2024-02-29' }).success).toBe(true); });
  it('rejects update before publication', () => { expect(postSchema.safeParse({ ...post, updated: '2025-01-01' }).success).toBe(false); });
  it('normalizes CMS empty optional values', () => { const data = postSchema.parse({ ...post, cover: '', updated: null, coverAlt: null }); expect(data.cover).toBeUndefined(); expect(data.updated).toBeUndefined(); });
  it('requires alt text with cover', () => { expect(postSchema.safeParse({ ...post, cover: '/uploads/images/test.webp' }).success).toBe(false); });
  it('rejects non-HTTPS project URLs', () => { expect(projectSchema.safeParse({ ...post, status: 'experiment', repository: 'javascript:alert(1)' }).success).toBe(false); });
  it('rejects frontmatter slug overrides and wrong draft type', () => { expect(postSchema.safeParse({ ...post, slug: 'other' }).success).toBe(false); expect(postSchema.safeParse({ ...post, draft: 'false' }).success).toBe(false); });
  it('deduplicates tags and rejects whitespace title', () => { expect(postSchema.parse({ ...post, tags: ['AI', 'AI'] }).tags).toEqual(['AI']); expect(postSchema.safeParse({ ...post, title: ' ' }).success).toBe(false); });
  it('allows authoring resume without invented entries or PDF', () => { expect(resumeSchema.safeParse({ summary: '', experience: [], education: [], skills: [] }).success).toBe(true); });
  it('validates resume months and interval order', () => { const entry = { organization: 'Org', role: 'Engineer', start: '2026-13', highlights: [] }; expect(resumeSchema.safeParse({ summary: '', experience: [entry], education: [], skills: [] }).success).toBe(false); });
});
