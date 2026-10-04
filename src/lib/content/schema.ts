import { z } from 'zod';
import { isCalendarDate } from './dates';
const text = z.string().trim().min(1);
const date = z.string().refine(isCalendarDate, 'Use a real calendar date YYYY-MM-DD');
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);
const https = z.url().refine(value => new URL(value).protocol === 'https:', 'Use an HTTPS URL');
const optional = <T extends z.ZodType>(schema: T) => z.preprocess(value => value === '' || value === null ? undefined : value, schema.optional());
const imagePath = z.string().regex(/^\/uploads\/images\/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\.(jpg|jpeg|png|webp|avif)$/i);
const pdfPath = z.string().regex(/^\/uploads\/documents\/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\.pdf$/i);
const tags = z.array(text).default([]).transform(values => [...new Set(values)]);
const common = {
  title: text, summary: text, published: date, updated: optional(date),
  tags, cover: optional(imagePath), coverAlt: optional(text), draft: z.boolean().default(true),
};
function entryRefinements(data: { updated?: string; published: string; cover?: string; coverAlt?: string }, ctx: z.RefinementCtx) {
  if (data.updated && data.updated < data.published) ctx.addIssue({ code: 'custom', path: ['updated'], message: 'Updated date cannot precede publication' });
  if (data.cover && !data.coverAlt) ctx.addIssue({ code: 'custom', path: ['coverAlt'], message: 'Describe the cover image' });
}
export const postSchema = z.object(common).strict().superRefine(entryRefinements);
export const projectSchema = z.object({ ...common, featured: z.boolean().default(false), status: z.enum(['active', 'archived', 'experiment']), repository: optional(https), demo: optional(https) }).strict().superRefine(entryRefinements);
export const siteSchema = z.object({
  name: text, headline: text, bio: text, contactEmail: z.email(), availability: z.string(),
  socials: z.array(z.object({ label: text, url: https }).strict()), seoDescription: text,
  socialImage: optional(z.union([imagePath, z.string().regex(/^\/brand\/[a-zA-Z0-9_.-]+\.(png|jpg|webp)$/i)])),
}).strict();
const interval = { start: month, end: optional(month) };
const experience = z.object({ organization: text, role: text, ...interval, location: optional(text), highlights: z.array(text) }).strict().refine(data => !data.end || data.end >= data.start, 'End must not precede start');
const education = z.object({ institution: text, qualification: text, ...interval }).strict().refine(data => !data.end || data.end >= data.start, 'End must not precede start');
export const resumeSchema = z.object({ summary: z.string(), experience: z.array(experience), education: z.array(education), skills: z.array(z.object({ category: text, items: z.array(text) }).strict()), pdf: optional(pdfPath), pdfUpdated: optional(date) }).strict();
export type SiteData = z.infer<typeof siteSchema>;
export type ResumeData = z.infer<typeof resumeSchema>;
