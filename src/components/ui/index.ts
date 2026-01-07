/**
 * UI COMPONENTS INDEX
 * 
 * Facilita la importación de componentes UI
 * En lugar de: import Button from '@components/ui/Button.astro'
 * Usamos: import { Button } from '@components/ui'
 * 
 * Nota: Astro no soporta barrel exports para componentes .astro
 * Este archivo es para referencia de qué componentes están disponibles
 */

// Componentes disponibles:
// - Button: Botón reutilizable con variantes (primary, secondary, ghost, outline)
// - Badge: Etiqueta/badge con variantes (primary, success, warning, info)
// - Card: Tarjeta con variantes (default, glow, outline)

export { default as Button } from './Button.astro';
export { default as Badge } from './Badge.astro';
export { default as Card } from './Card.astro';
