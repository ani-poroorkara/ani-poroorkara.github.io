import type { APIContext } from 'astro';
export function GET(context: APIContext) { return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap-index.xml', context.site)}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
