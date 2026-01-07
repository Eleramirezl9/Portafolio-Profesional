/**
 * ANIMACIONES - Constantes y utilidades
 * 
 * Centraliza todas las constantes de animación
 * Para reutilización consistente en toda la app
 */

export const ANIMATION_DURATIONS = {
  INSTANT: 0,
  FAST: 150,      // Para micro-interactions
  NORMAL: 300,    // Para la mayoría de transiciones
  SLOW: 500,      // Para animaciones complejas
  VERY_SLOW: 800, // Para entrances/exits dramáticas
} as const;

export const ANIMATION_DELAYS = {
  NONE: 0,
  STAGGER_1: 0.1,
  STAGGER_2: 0.2,
  STAGGER_3: 0.3,
  STAGGER_4: 0.4,
  STAGGER_5: 0.5,
  STAGGER_6: 0.6,
  SHORT: 0.2,
  MEDIUM: 0.4,
  LONG: 0.6,
} as const;

export const EASING_FUNCTIONS = {
  LINEAR: 'linear',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASE_BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  EASE_BACK: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  EASE_ELASTIC: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Genera un string de transición CSS
 * @param properties - Propiedades a animar (array o string separado por comas)
 * @param duration - Duración en ms
 * @param easing - Función de easing
 * @param delay - Retraso en ms (opcional)
 * @returns String CSS para propiedad transition
 */
export function generateTransition(
  properties: string | string[],
  duration: number = ANIMATION_DURATIONS.NORMAL,
  easing: string = EASING_FUNCTIONS.EASE_OUT,
  delay: number = 0
): string {
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  const delayStr = delay > 0 ? ` ${delay}ms` : '';
  return `${props} ${duration}ms ${easing}${delayStr}`;
}

/**
 * Genera keyframes CSS para entrada
 * @param name - Nombre de la animación
 * @returns String con keyframes
 */
export function generateEntranceKeyframes(name: string): string {
  const animations = {
    fadeIn: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
    fadeInUp: `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`,
    fadeInDown: `@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`,
    fadeInLeft: `@keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }`,
    fadeInRight: `@keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`,
    slideInUp: `@keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`,
    slideInDown: `@keyframes slideInDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }`,
    scaleIn: `@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`,
  };
  
  return animations[name as keyof typeof animations] || '';
}

/**
 * Genera clase Astro con animación
 * @param animationName - Nombre de la animación
 * @param duration - Duración en ms
 * @param delay - Retraso en ms
 * @returns Objeto con propiedades CSS
 */
export function getAnimationStyle(
  animationName: string,
  duration: number = ANIMATION_DURATIONS.NORMAL,
  delay: number = 0
): Record<string, string> {
  return {
    animation: `${animationName} ${duration}ms ${EASING_FUNCTIONS.EASE_OUT} forwards`,
    ...(delay > 0 && { animationDelay: `${delay}ms` }),
  };
}

/**
 * Genera stagger delay para elementos en array
 * @param index - Índice del elemento
 * @param staggerAmount - Cantidad de ms entre cada elemento
 * @returns Retraso en ms
 */
export function getStaggerDelay(index: number, staggerAmount: number = 50): number {
  return index * staggerAmount;
}

export default {
  ANIMATION_DURATIONS,
  ANIMATION_DELAYS,
  EASING_FUNCTIONS,
  generateTransition,
  generateEntranceKeyframes,
  getAnimationStyle,
  getStaggerDelay,
};
