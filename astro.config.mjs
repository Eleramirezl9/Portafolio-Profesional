// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://eddyramirez.dev', // Cambiar cuando tengas dominio
  integrations: [react()]
});