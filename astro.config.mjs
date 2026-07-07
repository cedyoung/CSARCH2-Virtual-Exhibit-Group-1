// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  
  base: '/',
  integrations: [react(), mdx()],
  

  output: 'static',
});