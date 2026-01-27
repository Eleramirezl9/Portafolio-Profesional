/**
 * API ROUTE: /api/reviews
 * 
 * Maneja reseñas/comentarios con Sanity CMS
 * - GET: Obtiene reseñas aprobadas
 * - POST: Crea nueva reseña (pending)
 */

import type { APIRoute } from 'astro';
import { sanityClient } from '@data/sanity.client';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Schema de validación para reviews
const ReviewSchema = z.object({
  authorName: z.string().min(2, 'Nombre muy corto').max(50),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensaje muy corto').max(1000),
  isAnonymous: z.boolean().default(false),
});

// GET: Obtener reseñas aprobadas
export const GET: APIRoute = async () => {
  try {
    if (!sanityClient) {
      return new Response(
        JSON.stringify({
          message: 'Sanity CMS no está configurado',
          reviews: [],
        }),
        { status: 503 }
      );
    }

    const reviews = await sanityClient.fetch(
      `*[_type == "review" && status == "approved"] | order(_createdAt desc) {
        _id,
        _type,
        authorName,
        message,
        createdAt,
        isAnonymous,
        status
      }`
    );

    return new Response(
      JSON.stringify({
        reviews,
        count: reviews.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return new Response(
      JSON.stringify({
        message: 'Error al obtener reseñas',
        reviews: [],
      }),
      { status: 500 }
    );
  }
};

// POST: Crear nueva reseña
export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Método no permitido' }),
      { status: 405 }
    );
  }

  try {
    if (!sanityClient) {
      return new Response(
        JSON.stringify({
          message: 'Sanity CMS no está configurado. Las reseñas no se pueden guardar en este momento.',
        }),
        { status: 503 }
      );
    }

    const data = await request.json();

    // Validar datos
    const validatedData = ReviewSchema.parse(data);

    // Crear documento en Sanity
    const newReview = await sanityClient.create({
      _type: 'review',
      authorName: validatedData.authorName,
      authorEmail: validatedData.email,
      message: validatedData.message,
      isAnonymous: validatedData.isAnonymous,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    // Enviar notificación al admin (opcional)
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
        subject: 'Nueva reseña pendiente de aprobación',
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Nueva reseña en tu portafolio</h2>
            <p><strong>Autor:</strong> ${validatedData.isAnonymous ? 'Anónimo' : validatedData.authorName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote style="border-left: 4px solid #8b5cf6; padding-left: 15px;">
              ${validatedData.message}
            </blockquote>
            <p><a href="${process.env.SANITY_STUDIO_URL || 'https://sanity.io'}" style="color: #8b5cf6;">Ver en Sanity Studio</a></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError);
    }

    return new Response(
      JSON.stringify({
        message: '¡Reseña enviada! Se publicará después de ser aprobada.',
        review: newReview,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Create review error:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          message: error.errors[0].message,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Error al crear la reseña. Intenta nuevamente.',
      }),
      { status: 500 }
    );
  }
};
