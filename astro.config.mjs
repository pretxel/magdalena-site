import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Production origin. Canonical, Open Graph, sitemap, JSON-LD and llms.txt URLs are all built from it.
  site: 'https://www.psicoterapeutamagdalenamontiel.com',
  integrations: [sitemap()],
  build: {
    // One small stylesheet: inline it so it doesn't block first render.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
