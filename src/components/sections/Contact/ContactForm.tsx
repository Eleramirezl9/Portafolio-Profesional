'use client';

/**
 * CONTACT FORM COMPONENT - React
 * 
 * Formulario interactivo para:
 * 1. Enviar mensaje por email
 * 2. Enviar reseña/comentario a Sanity
 * 3. Validación en cliente
 * 4. Feedback visual
 */

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  email: string;
}

type FormType = 'contact' | 'review';

interface FormData {
  type: FormType;
  authorName: string;
  email: string;
  message: string;
  isAnonymous: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ email }) => {
  const [formType, setFormType] = useState<FormType>('contact');
  const [formData, setFormData] = useState<FormData>({
    type: 'contact',
    authorName: '',
    email: '',
    message: '',
    isAnonymous: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type: inputType } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFormTypeChange = (type: FormType) => {
    setFormType(type);
    setFormData((prev) => ({ ...prev, type }));
    setStatus('idle');
    setMessage('');
  };

  const validateForm = (): boolean => {
    if (!formData.authorName.trim()) {
      setStatus('error');
      setMessage('Por favor ingresa tu nombre o apodo');
      return false;
    }

    if (!formData.email.trim()) {
      setStatus('error');
      setMessage('Por favor ingresa tu email');
      return false;
    }

    // Validación email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setMessage('Por favor ingresa un email válido');
      return false;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setMessage('Por favor escribe tu mensaje');
      return false;
    }

    if (formData.message.trim().length < 10) {
      setStatus('error');
      setMessage('El mensaje debe tener al menos 10 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setStatus('idle');

    try {
      const endpoint =
        formType === 'contact' ? '/api/contact' : '/api/reviews';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(
          formType === 'contact'
            ? '¡Mensaje enviado! Te responderé pronto 🚀'
            : '¡Gracias por tu reseña! Se publicará en breve 💬'
        );

        // Reset form
        setFormData({
          type: formType,
          authorName: '',
          email: '',
          message: '',
          isAnonymous: false,
        });

        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Algo salió mal. Intenta nuevamente.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error al enviar el mensaje. Intenta nuevamente.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${formType === 'contact' ? styles.active : ''}`}
          onClick={() => handleFormTypeChange('contact')}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Contacto
        </button>
        <button
          className={`${styles.tab} ${formType === 'review' ? styles.active : ''}`}
          onClick={() => handleFormTypeChange('review')}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Reseña
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name/Apodo */}
        <div className={styles.formGroup}>
          <label htmlFor="authorName" className={styles.label}>
            Nombre o Apodo
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            placeholder={formType === 'contact' ? 'Tu nombre' : 'Tu apodo (puedes ser anónimo)'}
            className={styles.input}
            disabled={loading}
            maxLength={50}
          />
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            className={styles.input}
            disabled={loading}
            maxLength={100}
          />
          <small className={styles.hint}>
            {formType === 'review' && 'No será visible públicamente'}
          </small>
        </div>

        {/* Anonymous Toggle (solo para reviews) */}
        {formType === 'review' && (
          <div className={styles.checkboxGroup}>
            <label htmlFor="isAnonymous" className={styles.checkboxLabel}>
              <input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleInputChange}
                disabled={loading}
                className={styles.checkbox}
              />
              <span>Mostrar como anónimo</span>
            </label>
          </div>
        )}

        {/* Message */}
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={
              formType === 'contact'
                ? 'Cuéntame qué tenés en mente...'
                : 'Compartí tu experiencia, dudas o sugerencias...'
            }
            className={styles.textarea}
            disabled={loading}
            rows={4}
            maxLength={1000}
          />
          <small className={styles.charCount}>
            {formData.message.length}/1000
          </small>
        </div>

        {/* Status Message */}
        {status !== 'idle' && (
          <div className={`${styles.statusMessage} ${styles[status]}`}>
            {status === 'success' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            )}
            {status === 'error' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            )}
            <span>{message}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Enviando...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-5-9-9-5 20-7z"></path>
              </svg>
              {formType === 'contact' ? 'Enviar Mensaje' : 'Enviar Reseña'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
