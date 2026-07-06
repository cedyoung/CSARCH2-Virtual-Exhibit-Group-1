// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://cedyoung.github.io',
  base: '/CSARCH2-Virtual-Exhibit-Group-1',
  integrations: [react(), mdx()],
  // Static build is all this exhibit needs — no server runtime required.
  output: 'static',
});

