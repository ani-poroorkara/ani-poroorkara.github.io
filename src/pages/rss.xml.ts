import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../lib/data';
import { getPublicPosts } from '../lib/content/queries';
export async function GET(context: APIContext) {
  const posts = await getPublicPosts();
  return rss({ title: `${site.name} — Blog`, description: site.seoDescription, site: context.site!, items: posts.map(entry => ({ title: entry.data.title, description: entry.data.summary, pubDate: new Date(`${entry.data.published}T12:00:00Z`), link: `/blog/${entry.id}/`, categories: entry.data.tags })) });
}
