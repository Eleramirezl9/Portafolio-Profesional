/**
 * FORMATEADORES - Formatters
 * 
 * Formatea datos para presentación en UI
 * Reutilizable en múltiples componentes
 */

/**
 * Formatea un número telefónico
 * @param phone - Teléfono sin formato
 * @returns Teléfono formateado
 */
export function formatPhoneNumber(phone: string): string {
  // Ejemplo: "+502 XXXX-XXXX" si el formato ya es conocido
  if (phone.includes('XXXX')) {
    return phone; // Ya está formateado
  }
  // Remover caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    // Formato: +502 XXXX-XXXX
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Formatea un email para display
 * @param email - Email sin formato
 * @returns Email formateado
 */
export function formatEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param str - String a capitalizar
 * @returns String capitalizado
 */
export function capitalizeString(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Convierte string a kebab-case
 * @param str - String a convertir
 * @returns String en kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convierte string a camelCase
 * @param str - String a convertir
 * @returns String en camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/[\s-_]+/g, '');
}

/**
 * Trunca un string con ellipsis
 * @param str - String a truncar
 * @param maxLength - Largo máximo
 * @returns String truncado
 */
export function truncateString(str: string, maxLength: number = 100): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Formatea bytes a KB, MB, GB
 * @param bytes - Número en bytes
 * @returns String formateado (ej: "2.5 MB")
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Formatea un número con separadores de miles
 * @param num - Número a formatear
 * @param locale - Locale para formato
 * @returns String formateado
 */
export function formatNumber(num: number, locale: string = 'es-ES'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Formatea porcentaje
 * @param value - Valor (0-100)
 * @param decimals - Decimales a mostrar
 * @returns String con porcentaje
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return (value).toFixed(decimals) + '%';
}

/**
 * Formatea diferencia de tiempo (ej: "hace 2 horas")
 * @param date - Fecha anterior
 * @returns String relativo de tiempo
 */
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' años atrás';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' meses atrás';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' días atrás';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' horas atrás';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutos atrás';
  
  return Math.floor(seconds) + ' segundos atrás';
}

/**
 * Genera un slug a partir de un string
 * @param str - String a convertir
 * @returns Slug formateado
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resalta un término en un texto
 * @param text - Texto original
 * @param term - Término a resaltar
 * @param className - Clase CSS a aplicar
 * @returns Fragmento HTML (usar con caution!)
 */
export function highlightTerm(text: string, term: string, className: string = 'highlight'): string {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, `<span class="${className}">$1</span>`);
}

/**
 * Extrae dominio de una URL
 * @param url - URL completa
 * @returns Dominio
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Valida y formatea nombre
 * @param name - Nombre sin validar
 * @returns Nombre validado y capitalizado
 */
export function formatName(name: string): string {
  return capitalizeString(name.trim());
}
