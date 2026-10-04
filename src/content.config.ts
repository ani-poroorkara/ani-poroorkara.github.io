import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema, postSchema } from './lib/content/schema';
export const collections = {
  projects: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/projects' }), schema: projectSchema }),
  blog: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/blog' }), schema: postSchema }),
};
