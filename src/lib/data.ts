import siteData from '../data/site.json';
import resumeData from '../data/resume.json';
import { siteSchema, resumeSchema } from './content/schema';
export const site = siteSchema.parse(siteData);
export const resume = resumeSchema.parse(resumeData);
