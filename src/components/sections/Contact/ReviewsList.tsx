'use client';

/**
 * REVIEWS LIST COMPONENT - React
 * 
 * Muestra todas las reseñas/comentarios aprobados
 * - Anónimo o con nombre/apodo
 * - Fecha de publicación
 * - Soporte para carga dinámica (refetch)
 */

import React, { useState, useEffect } from 'react';
import type { Review } from '@data/types';
import styles from './ReviewsList.module.css';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);

  // Refetch reviews cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchReviews();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;

    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      {reviews.length === 0 ? (
        <div className={styles.empty}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <p className={styles.emptyText}>
            Sé el primero en compartir tu experiencia 💭
          </p>
          <small>Los comentarios aparecerán aquí después de ser aprobados</small>
        </div>
      ) : (
        <>
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review._id} className={styles.reviewItem}>
                {/* Header con autor y fecha */}
                <div className={styles.reviewHeader}>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      {review.isAnonymous ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                      ) : (
                        <div className={styles.initials}>
                          {review.authorName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className={styles.authorMeta}>
                      <div className={styles.authorName}>
                        {review.isAnonymous ? 'Anónimo' : review.authorName}
                      </div>
                      <time className={styles.date}>{formatDate(review.createdAt)}</time>
                    </div>
                  </div>
                  {review.isAnonymous && (
                    <span className={styles.anonymousBadge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z"/>
                      </svg>
                      Anónimo
                    </span>
                  )}
                </div>

                {/* Mensaje */}
                <p className={styles.reviewMessage}>{review.message}</p>

                {/* Footer */}
                <div className={styles.reviewFooter}>
                  <button className={styles.likeBtn} title="Me gusta este comentario">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            className={styles.refreshBtn}
            onClick={fetchReviews}
            disabled={isLoading}
            title="Actualizar comentarios"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={isLoading ? styles.spinning : ''}
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2-8.83"></path>
            </svg>
            {isLoading ? 'Cargando...' : 'Actualizar'}
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewsList;
