/**
 * CONSTANTES DE LA APLICACIÓN
 * 
 * Centraliza todos los valores hardcodeados
 * Fácil de mantener y actualizar
 */

import { type NavItem } from './types';

// ============= NAVEGACIÓN =============
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'projects',
    label: 'Proyectos',
    href: '#projects',
  },
  {
    id: 'about',
    label: 'Sobre Mí',
    href: '#about',
  },
  {
    id: 'skills',
    label: 'Habilidades',
    href: '#skills',
  },
  {
    id: 'contact',
    label: 'Contacto',
    href: '#contact',
  },
];

// ============= ANIMACIONES =============
export const ANIMATION_TIMINGS = {
  FAST: 150,      // ms
  NORMAL: 300,    // ms
  SLOW: 500,      // ms
  DELAY_HERO: 0.6, // segundos
} as const;

export const EASING = {
  IN: 'cubic-bezier(0.4, 0, 1, 1)',
  OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============= COLORES =============
export const COLORS = {
  PRIMARY_BG: '#0a0e27',
  SECONDARY_BG: '#151a33',
  ACCENT_PRIMARY: '#00d4ff',
  ACCENT_SECONDARY: '#0066cc',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#b4b9d1',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  ROSA_SUAVE: 'rgba(230, 100, 120, 0.08)',
  ROSA_MAS_OSCURA: 'rgba(180, 80, 100, 0.06)',
} as const;

// ============= BREAKPOINTS =============
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
} as const;

// ============= ESPACIADO =============
export const SPACING = {
  XS: '0.25rem',
  SM: '0.5rem',
  MD: '0.75rem',
  LG: '1rem',
  XL: '1.5rem',
  XXL: '2rem',
  XXXL: '3rem',
  HUGE: '4rem',
  MASSIVE: '6rem',
  GIGANTIC: '8rem',
} as const;

// ============= SECCIONES =============
export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CONTACT: 'contact',
} as const;

// ============= TEXTOS REUTILIZABLES =============
export const SECTION_LABELS = {
  HERO: 'Bienvenido',
  ABOUT: 'Conóceme',
  PROJECTS: 'Mi Trabajo',
  SKILLS: 'Habilidades',
  CONTACT: 'Contacto',
} as const;

export const SECTION_DESCRIPTIONS = {
  ABOUT: 'Desarrollador apasionado por crear software de calidad',
  PROJECTS: 'Aquí están algunos de los proyectos en los que he trabajado y aprendido',
  SKILLS: 'Tecnologías y herramientas con las que trabajo',
} as const;

// ============= Z-INDEX =============
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 100,
  STICKY: 200,
  FIXED: 300,
  MODAL_BACKDROP: 400,
  MODAL: 500,
  POPOVER: 600,
  TOOLTIP: 700,
} as const;

// ============= URLS EXTERNAS =============
export const EXTERNAL_URLS = {
  GITHUB: 'https://github.com',
  LINKEDIN: 'https://linkedin.com',
} as const;

// ============= SOCIAL MEDIA =============
export const SOCIAL_PLATFORMS = {
  GITHUB: 'GitHub',
  LINKEDIN: 'LinkedIn',
  EMAIL: 'Email',
} as const;
