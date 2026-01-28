/**
 * API ROUTE: /api/contact
 * 
 * Maneja el envío de emails de contacto
 * - Recibe formulario de contacto
 * - Envía email al propietario
 * - Validación de campos
 */

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Necesario para que Astro maneje POST requests en modo server
export const prerender = false;

// Schema de validación
const ContactSchema = z.object({
  authorName: z.string().min(2, 'Nombre muy corto').max(50),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensaje muy corto').max(1000),
  recipientEmail: z.string().email('Email del destinatario inválido'),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validar datos
    const validatedData = ContactSchema.parse(data);

    // Obtener credenciales de Gmail desde variables de entorno
    const gmailUser = import.meta.env.GMAIL_USER;
    const gmailPassword = import.meta.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      return new Response(
        JSON.stringify({
          message: 'El servicio de email no está configurado. Por favor contacta directamente.',
          success: false,
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Enviar email al propietario
    await transporter.sendMail({
      from: gmailUser,
      to: validatedData.recipientEmail,
      subject: `Nuevo mensaje de ${validatedData.authorName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #8b5cf6;">Nuevo mensaje de contacto</h2>
          <p><strong>De:</strong> ${validatedData.authorName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${validatedData.message.replace(/\n/g, '<br />')}
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">
            Responde a ${validatedData.email}
          </p>
        </div>
      `,
      replyTo: validatedData.email,
    });

    return new Response(
      JSON.stringify({
        message: '¡Mensaje enviado correctamente! Te responderé pronto.',
        success: true,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Validación de Zod
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          message: error.errors[0].message,
          success: false,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Error general
    return new Response(
      JSON.stringify({
        message: 'Error al enviar el mensaje. Intenta nuevamente.',
        success: false,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
