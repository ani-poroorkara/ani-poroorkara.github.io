import { defineConfig } from 'astro/config';
import remarkContentPolicy from './src/plugins/remark-content-policy.mjs';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ani-poroorkara.github.io',
  output: 'static',
  trailingSlash: 'always',
  markdown: { processor: unified({ remarkPlugins: [remarkContentPolicy] }) },
  integrations: [sitemap({ filter: page => !page.endsWith('/404.html') })],
});
