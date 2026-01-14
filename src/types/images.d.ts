/**
 * Tipo de declaration para archivos de imagen
 * Permite importar archivos .png, .jpg, .jpeg, .gif, .webp, .svg como módulos
 */

declare module '*.png' {
  import type { ImageMetadata } from 'astro';
  const value: ImageMetadata;
  export default value;
}

declare module '*.jpg' {
  import type { ImageMetadata } from 'astro';
  const value: ImageMetadata;
  export default value;
}

declare module '*.jpeg' {
  import type { ImageMetadata } from 'astro';
  const value: ImageMetadata;
  export default value;
}

declare module '*.gif' {
  import type { ImageMetadata } from 'astro';
  const value: ImageMetadata;
  export default value;
}

declare module '*.webp' {
  import type { ImageMetadata } from 'astro';
  const value: ImageMetadata;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
