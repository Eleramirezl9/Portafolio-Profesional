/**
 * SANITY CLIENT
 * 
 * Cliente configurado para comunicarse con Sanity CMS
 * Usado en APIs y componentes del servidor
 */

import { createClient } from '@sanity/client';

// Validar que las variables de entorno estén configuradas
// Astro usa import.meta.env para variables de entorno
const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_API_TOKEN;

if (!projectId) {
  console.warn('⚠️  SANITY_PROJECT_ID no está configurado. Las reseñas no funcionarán hasta que lo configures en .env');
}

export const sanityClient = projectId
  ? createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: '2024-01-01',
    token,
  })
  : null;

export default sanityClient;
