// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://eddyramirez.dev', // Cambiar cuando tengas dominio
  output: 'server', // Server-side con prerender=true para páginas estáticas
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@assets': path.resolve('./src/assets'),
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