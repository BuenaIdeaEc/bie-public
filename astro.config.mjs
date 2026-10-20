// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://businessintelligence.solutions',
  devToolbar: { enabled: false },
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/presentaciones/') && !page.includes('/lab/') })],
  vite: {
    plugins: [tailwindcss()]
  }
});
