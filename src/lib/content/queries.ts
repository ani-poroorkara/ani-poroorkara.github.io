import { getCollection } from 'astro:content';
import { torontoDate } from './dates';
import { publishable, sortPublished } from './publication';
export async function getPublicProjects(today = torontoDate(new Date())) {
  return sortPublished(await getCollection('projects', entry => import.meta.env.DEV && process.env.SHOW_DRAFTS === 'true' || publishable(entry.data, today)));
}
export async function getPublicPosts(today = torontoDate(new Date())) {
  return sortPublished(await getCollection('blog', entry => import.meta.env.DEV && process.env.SHOW_DRAFTS === 'true' || publishable(entry.data, today)));
}
