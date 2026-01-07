// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://eddyramirez.dev', // Cambiar cuando tengas dominio
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@utils': path.resolve('./src/utils'),
        '@styles': path.resolve('./src/styles'),
        '@data': path.resolve('./src/data'),
        '@content': path.resolve('./src/content')
      }
    }
  }
});