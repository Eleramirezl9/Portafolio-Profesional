/**
 * SANITY CLIENT
 * 
 * Cliente configurado para comunicarse con Sanity CMS
 * Usado en APIs y componentes del servidor
 */

import { createClient } from '@sanity/client';

// Validar que las variables de entorno estén configuradas
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.warn('⚠️  SANITY_PROJECT_ID no está configurado. Las reseñas no funcionarán hasta que lo configures en .env.local');
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
