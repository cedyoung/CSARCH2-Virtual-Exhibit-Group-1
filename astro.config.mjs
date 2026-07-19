// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

const site = process.env.SITE_URL ?? 'https://cedyoung.github.io';
const configuredBase = process.env.BASE_PATH ?? '/CSARCH2-Virtual-Exhibit-Group-1/';
const base = `/${configuredBase.replace(/^\/+|\/+$/g, '')}/`;

export default defineConfig({
  site,
  base,
  integrations: [mdx(), react(), icon()],
  output: 'static',
});
