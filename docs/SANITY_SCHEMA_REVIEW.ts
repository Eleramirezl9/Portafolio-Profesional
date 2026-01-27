/**
 * SANITY SCHEMA: Review/Comment Document
 * 
 * Documento para almacenar reseñas y comentarios anónimos
 * 
 * INSTALACIÓN:
 * 1. Copia este código en tu Sanity Studio
 * 2. En tu proyecto Sanity, ve a: sanity/schemas/
 * 3. Crea un archivo: sanity/schemas/review.ts
 * 4. Pega este contenido
 * 5. En sanity/schemaTypes/index.ts, importa y agrega este schema
 * 
 * USAGE:
 * import review from './review'
 * export const schemaTypes = [/* ... */, review]
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Reviews / Comentarios',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Nombre o Apodo del Autor',
      type: 'string',
      description: 'El nombre o apodo que mostrarás públicamente',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),

    defineField({
      name: 'authorEmail',
      title: 'Email del Autor (privado)',
      type: 'string',
      description: 'Email privado - NO se mostrará públicamente',
      validation: (Rule) => Rule.required().email(),
      hidden: true, // Oculto en el editor para privacidad
    }),

    defineField({
      name: 'message',
      title: 'Mensaje / Reseña',
      type: 'text',
      rows: 5,
      description: 'El comentario o reseña que compartió el usuario',
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),

    defineField({
      name: 'isAnonymous',
      title: '¿Mostrar como Anónimo?',
      type: 'boolean',
      description: 'Si está activado, mostrará "Anónimo" en lugar del nombre',
      initialValue: false,
    }),

    defineField({
      name: 'status',
      title: 'Estado de Publicación',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente de Aprobación', value: 'pending' },
          { title: 'Aprobado', value: 'approved' },
          { title: 'Rechazado', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rejectionReason',
      title: 'Razón de Rechazo (si aplica)',
      type: 'string',
      hidden: ({ document }) => document?.status !== 'rejected',
      description: 'Explicación sobre por qué fue rechazado el comentario',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      message: 'message',
      status: 'status',
      isAnonymous: 'isAnonymous',
    },
    prepare({ title, message, status, isAnonymous }) {
      const displayName = isAnonymous ? '🔒 Anónimo' : title;
      const preview = message?.substring(0, 50) + (message?.length > 50 ? '...' : '');
      const statusIcon = {
        pending: '⏳',
        approved: '✅',
        rejected: '❌',
      };

      return {
        title: displayName,
        subtitle: preview,
        media: () => `${statusIcon[status as keyof typeof statusIcon] || '❓'} ${status}`,
      };
    },
  },
});
