/**
 * FUNCIONES AUXILIARES - Helpers
 * 
 * Lógica reutilizable de la aplicación
 * Sin dependencias de framework (puro JavaScript)
 */

import type { Skill, Experience } from './types';

/**
 * Formatea una fecha a string legible
 * @param date - Objeto Date o string ISO
 * @param locale - Locale para formato (default: es-ES)
 * @returns String con formato: "Enero 2024"
 */
export function formatDate(date: Date | string, locale: string = 'es-ES'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}

/**
 * Obtiene las iniciales de un nombre
 * @param name - Nombre completo
 * @returns Iniciales en mayúsculas (ej: "John Doe" -> "JD")
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Calcula años de experiencia desde un año inicial
 * @param startYear - Año de inicio
 * @returns Número de años
 */
export function calculateExperienceYears(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

/**
 * Filtra skills por categoría
 * @param skills - Array de skills
 * @param category - Categoría a filtrar
 * @returns Array filtrado
 */
export function filterSkillsByCategory(skills: Skill[], category: string): Skill[] {
  return skills.filter(skill => skill.category === category);
}

/**
 * Ordena skills por nivel (descendente)
 * @param skills - Array de skills
 * @returns Array ordenado
 */
export function sortSkillsByLevel(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) => b.level - a.level);
}

/**
 * Obtiene top N skills
 * @param skills - Array de skills
 * @param limit - Cantidad máxima (default: 5)
 * @returns Top N skills ordenados por nivel
 */
export function getTopSkills(skills: Skill[], limit: number = 5): Skill[] {
  return sortSkillsByLevel(skills).slice(0, limit);
}

/**
 * Formatea el período de experiencia (ej: "2023 - Presente" o "2023 - 2024")
 * @param period - String del período
 * @returns String formateado
 */
export function formatExperiencePeriod(period: string): string {
  return period.replace('Presente', 'Presente').trim();
}

/**
 * Obtiene el número de proyectos destacados
 * @param experiences - Array de experiencias
 * @returns Número de proyectos
 */
export function getTotalProjects(experiences: Experience[]): number {
  return experiences.length;
}

/**
 * Ordena experiencias por recencia (más reciente primero)
 * @param experiences - Array de experiencias
 * @returns Array ordenado
 */
export function sortExperiencesByRecency(experiences: Experience[]): Experience[] {
  return [...experiences].reverse(); // Asume que el JSON está en orden cronológico
}

/**
 * Mapea años de experiencia a nivel de seniority
 * @param years - Años de experiencia
 * @returns Nivel: Junior, Mid, Senior
 */
export function getSeniorityLevel(years: number): 'Junior' | 'Mid' | 'Senior' {
  if (years < 2) return 'Junior';
  if (years < 5) return 'Mid';
  return 'Senior';
}

/**
 * Valida si un email es válido
 * @param email - Email a validar
 * @returns boolean
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida si un URL es válido
 * @param url - URL a validar
 * @returns boolean
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Cuenta el número de skills por categoría
 * @param skills - Array de skills
 * @param category - Categoría a contar
 * @returns Cantidad de skills en esa categoría
 */
export function countSkillsByCategory(skills: Skill[], category: string): number {
  return skills.filter(skill => skill.category === category).length;
}

/**
 * Obtiene promedio de nivel de skills
 * @param skills - Array de skills
 * @returns Promedio (0-100)
 */
export function getAverageSkillLevel(skills: Skill[]): number {
  if (skills.length === 0) return 0;
  const sum = skills.reduce((acc, skill) => acc + skill.level, 0);
  return Math.round(sum / skills.length);
}

/**
 * Determina el color de un skill basado en su nivel
 * @param level - Nivel (0-100)
 * @returns Color CSS
 */
export function getSkillLevelColor(level: number): string {
  if (level >= 80) return '#10b981'; // Green - Experto
  if (level >= 60) return '#f59e0b'; // Amber - Competente
  if (level >= 40) return '#3b82f6'; // Blue - Intermedio
  return '#6b7280'; // Gray - Básico
}
