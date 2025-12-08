# Guía de Optimización y Performance

## Objetivos de Performance

### Métricas Core Web Vitals

```
✅ LCP (Largest Contentful Paint): < 2.5s
✅ FID (First Input Delay): < 100ms
✅ CLS (Cumulative Layout Shift): < 0.1
✅ FCP (First Contentful Paint): < 1.8s
✅ TTI (Time to Interactive): < 3.5s
```

### Lighthouse Score Target
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## Optimización de Imágenes

### 1. Formatos Modernos

```astro
---
import { Image } from 'astro:assets';
import heroImg from '@/images/hero.jpg';
---

<!-- ✅ MEJOR: Astro optimiza automáticamente -->
<Image
  src={heroImg}
  alt="Hero section"
  format="webp"
  quality={80}
  loading="lazy"
/>

<!-- ✅ BUENO: Picture con fallback -->
<picture>
  <source srcset="/images/hero.avif" type="image/avif">
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="Hero" loading="lazy">
</picture>

<!-- ❌ EVITAR: JPG pesado sin optimizar -->
<img src="/images/hero.jpg" alt="Hero">
```

### 2. Responsive Images

```astro
<Image
  src={heroImg}
  alt="Hero"
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  loading="lazy"
/>
```

### 3. Lazy Loading Estratégico

```astro
<!-- ✅ Above the fold: eager -->
<Image src={heroImg} alt="Hero" loading="eager" />

<!-- ✅ Below the fold: lazy -->
<Image src={projectImg} alt="Proyecto" loading="lazy" />

<!-- ✅ Mucho más abajo: usar IntersectionObserver -->
<img
  data-src="/images/footer.webp"
  alt="Footer"
  class="lazy-load"
/>
```

### 4. Placeholder Blur (LQIP)

```typescript
// utils/imagePlaceholder.ts
export function getBlurDataURL(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  return canvas.toDataURL();
}
```

### 5. Herramientas de Optimización

**Online**:
- **Squoosh.app** - Comprimir y convertir
- **TinyPNG** - Comprimir PNG/JPG
- **SVGOMG** - Optimizar SVG

**CLI**:
```bash
# Sharp (ya incluido en Astro)
pnpm add sharp

# Convertir a WebP batch
pnpm add -D imagemin imagemin-webp
```

**Reglas**:
- Máximo **100KB** por imagen
- Usar **WebP** como estándar
- **AVIF** para hero images
- **SVG** para iconos y logos

## Optimización de CSS

### 1. Variables CSS Organizadas

```css
/* styles/variables.css */
:root {
  /* Colores - Dark theme optimizado */
  --bg-primary: #0a0e27;
  --bg-secondary: #151a33;
  --text-primary: #ffffff;
  --text-secondary: #b4b9d1;
  --accent-blue: #00d4ff;
  --accent-cyan: #00ffff;

  /* Espaciado consistente */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;

  /* Animaciones */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### 2. Critical CSS Inline

```astro
---
// layouts/Base.astro
---
<!DOCTYPE html>
<html>
<head>
  <!-- CSS crítico inline -->
  <style is:inline>
    /* Reset mínimo */
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui;background:#0a0e27;color:#fff}
    /* Hero visible inmediatamente */
    .hero{min-height:100vh;display:flex;align-items:center}
  </style>

  <!-- CSS no crítico diferido -->
  <link rel="stylesheet" href="/styles/global.css" media="print" onload="this.media='all'">
</head>
</html>
```

### 3. Purge CSS No Usado

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'critical': ['./src/styles/critical.css']
          }
        }
      }
    }
  }
});
```

### 4. Animaciones GPU-Accelerated

```css
/* ✅ BUENO: transform y opacity (GPU) */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s var(--ease-out) forwards;
  will-change: transform, opacity;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ❌ EVITAR: top, left, width, height (CPU) */
.bad-animation {
  animation: badMove 0.6s;
}

@keyframes badMove {
  from { top: 100px; }
  to { top: 0; }
}
```

## Optimización de JavaScript

### 1. Code Splitting Inteligente

```astro
---
// pages/index.astro
import Hero from '@components/sections/Hero.astro';

// Solo cargar cuando se necesite
const HeavyChart = await import('@components/Chart.tsx');
---

<Hero />

<!-- Cargar solo cuando sea visible -->
<HeavyChart.default client:visible />
```

### 2. Lazy Load de Librerías

```typescript
// ✅ MEJOR: Importar solo cuando se usa
async function initAnimations() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.registerPlugin(ScrollTrigger);
  // ... usar GSAP
}

// Ejecutar cuando sea necesario
document.addEventListener('DOMContentLoaded', () => {
  const animatedSections = document.querySelectorAll('[data-animate]');
  if (animatedSections.length > 0) {
    initAnimations();
  }
});

// ❌ EVITAR: Importar todo siempre
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

### 3. Debounce y Throttle

```typescript
// utils/performance.ts
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

**Uso**:
```typescript
import { debounce, throttle } from '@utils/performance';

// Scroll event (throttle)
const handleScroll = throttle(() => {
  console.log('Scrolling...');
}, 100);

window.addEventListener('scroll', handleScroll);

// Resize event (debounce)
const handleResize = debounce(() => {
  console.log('Resized!');
}, 250);

window.addEventListener('resize', handleResize);
```

### 4. IntersectionObserver para Lazy Loading

```typescript
// utils/lazyLoad.ts
export function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // Cargar 50px antes de ser visible
  });

  images.forEach(img => imageObserver.observe(img));
}
```

## Optimización de Fuentes

### 1. Font Display Swap

```css
/* styles/fonts.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* ✅ Evita FOIT */
  font-style: normal;
}
```

### 2. Preload de Fuentes Críticas

```astro
<head>
  <!-- Preload solo fuentes críticas -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
</head>
```

### 3. Subset de Fuentes

```bash
# Herramienta: glyphhanger
npm install -g glyphhanger

# Generar subset solo con caracteres usados
glyphhanger --subset=*.ttf --formats=woff2
```

### 4. Variable Fonts

```css
/* ✅ 1 archivo para todos los pesos */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900; /* Todos los pesos */
}

/* ❌ Múltiples archivos */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-regular.woff2');
  font-weight: 400;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-bold.woff2');
  font-weight: 700;
}
```

## Optimización de GSAP

### 1. Importar Solo lo Necesario

```typescript
// ✅ MEJOR: Importar plugins específicos
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ❌ EVITAR: Importar todo
import gsap from 'gsap/all';
```

### 2. Usar `.from()` en lugar de `.fromTo()`

```typescript
// ✅ Más ligero
gsap.from('.element', {
  opacity: 0,
  y: 50,
  duration: 1
});

// ❌ Más pesado (cuando no es necesario)
gsap.fromTo('.element',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 }
);
```

### 3. Kill Animations en Cleanup

```typescript
// React component
useEffect(() => {
  const tl = gsap.timeline();
  tl.to('.element', { x: 100 });

  // Cleanup
  return () => tl.kill();
}, []);
```

### 4. ScrollTrigger con Markers solo en Dev

```typescript
gsap.from('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    markers: import.meta.env.DEV // Solo en desarrollo
  },
  y: 100,
  opacity: 0
});
```

## Build Optimization

### 1. Astro Config Optimizado

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],

  build: {
    inlineStylesheets: 'auto',
  },

  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // ✅ Remove console.logs
          drop_debugger: true
        }
      }
    }
  }
});
```

### 2. Comprimir Assets

```bash
# Comprimir build
pnpm add -D vite-plugin-compression

# astro.config.mjs
import compression from 'vite-plugin-compression';

export default defineConfig({
  vite: {
    plugins: [
      compression({
        algorithm: 'gzip',
        ext: '.gz'
      }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br'
      })
    ]
  }
});
```

## Checklist de Optimización

### Antes de Deploy

- [ ] **Imágenes**: Todas < 100KB, formato WebP
- [ ] **Lighthouse**: Score > 95 en Performance
- [ ] **Bundle Size**: JS inicial < 200KB
- [ ] **Fuentes**: Preloaded y con font-display: swap
- [ ] **CSS**: Critical CSS inline
- [ ] **Console logs**: Removidos en producción
- [ ] **GSAP**: Solo plugins necesarios importados
- [ ] **React**: client directives correctos
- [ ] **Lazy loading**: Imágenes below the fold
- [ ] **Compression**: Gzip/Brotli habilitado

### Testing Performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json

# Bundle analyzer
pnpm add -D rollup-plugin-visualizer
```

### Herramientas de Medición

- **Lighthouse** (Chrome DevTools)
- **WebPageTest.org**
- **GTmetrix**
- **PageSpeed Insights**
- **Bundlephobia** (tamaño de paquetes)

## Performance Budget

```json
{
  "budget": {
    "javascript": "200kb",
    "css": "50kb",
    "images": "500kb",
    "fonts": "100kb",
    "total": "1mb"
  }
}
```

**Regla de oro**: Si agregastuna librería, pregúntate:
- ¿Puedo hacerlo con vanilla JS?
- ¿Hay una alternativa más ligera?
- ¿Puedo lazy-loadearla?
