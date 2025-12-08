# Convenciones y Patrones de Diseño

## Principios de Desarrollo

### 1. KISS (Keep It Simple, Stupid)
- Código simple y directo
- Sin sobre-ingeniería
- Si funciona con 3 líneas, no uses 30

### 2. DRY (Don't Repeat Yourself)
- Reutiliza componentes y funciones
- Si copias código 2 veces, créalo como componente
- Abstrae lógica repetida en utils/

### 3. Separation of Concerns
- Componentes UI puros (sin lógica de negocio)
- Lógica en utils/ o hooks
- Estilos separados y organizados

## Convenciones de Código

### Nomenclatura de Archivos

```
components/
  ui/
    Button.astro          ✅ PascalCase para componentes
    Card.tsx              ✅ PascalCase
    badge.astro           ❌ Evitar minúsculas

utils/
  animations.ts           ✅ camelCase para utilidades
  formatDate.ts           ✅ camelCase
  AnimationHelpers.ts     ❌ Evitar PascalCase en utils

styles/
  global.css              ✅ kebab-case para CSS
  dark-theme.css          ✅ kebab-case
  globalStyles.css        ❌ Evitar camelCase en CSS

content/
  projects/
    mi-primer-proyecto.md ✅ kebab-case para contenido
    proyecto_2.md         ❌ Evitar snake_case
```

### Imports Organizados

```typescript
// 1. Librerías externas
import React from 'react';
import { gsap } from 'gsap';

// 2. Componentes de Astro
import Layout from '@/layouts/Base.astro';

// 3. Componentes propios
import Button from '@/components/ui/Button.astro';
import Hero from '@/components/sections/Hero.astro';

// 4. Utilidades y datos
import { skills } from '@/data/skills';
import { formatDate } from '@/utils/helpers';

// 5. Estilos (al final)
import '@/styles/global.css';
```

### Alias de Imports (Path Aliases)

Configurar en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"],
      "@styles/*": ["src/styles/*"],
      "@data/*": ["src/data/*"]
    }
  }
}
```

**Uso**:
```typescript
// ❌ Evitar imports relativos largos
import Button from '../../../components/ui/Button.astro';

// ✅ Usar alias
import Button from '@components/ui/Button.astro';
import { skills } from '@data/skills.json';
```

## Patrones de Componentes

### 1. Componentes Astro (.astro)

**Usar para**:
- Componentes mayormente estáticos
- Sin interactividad compleja
- Mejora de performance (zero JS por defecto)

```astro
---
// Lógica del componente (server-side)
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Template -->
<section class="hero">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</section>

<style>
  /* Estilos scoped */
  .hero {
    padding: 2rem;
  }
</style>
```

### 2. Componentes React (.tsx)

**Usar para**:
- Interactividad del lado del cliente
- Animaciones complejas
- Estado local necesario

```tsx
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Cargando...' : label}
    </button>
  );
}
```

**Integración en Astro**:
```astro
---
import Button from '@components/ui/Button.tsx';
---

<!-- client:visible = carga cuando es visible -->
<Button client:visible label="Click me" />

<!-- client:load = carga inmediatamente -->
<Button client:load label="Important" />

<!-- client:idle = carga cuando el navegador está idle -->
<Button client:idle label="Can wait" />
```

### 3. Componentes de Layout

```astro
---
// layouts/Base.astro
interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Mi Portafolio',
  description = 'Portafolio de desarrollo web'
} = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <title>{title}</title>
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <slot />
</body>
</html>
```

**Uso**:
```astro
---
// pages/index.astro
import Layout from '@layouts/Base.astro';
---

<Layout title="Inicio | Mi Portafolio">
  <h1>Bienvenido</h1>
</Layout>
```

## Organización de Estilos

### Variables CSS

```css
/* styles/variables.css */
:root {
  /* Colores principales */
  --color-bg: #0a0e27;
  --color-primary: #00d4ff;
  --color-secondary: #0066cc;
  --color-text: #ffffff;

  /* Espaciado */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;

  /* Tipografía */
  --font-primary: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Breakpoints (para JS) */
  --breakpoint-mobile: 640px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
}
```

### Utility Classes

```css
/* styles/utilities.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.section {
  padding: var(--spacing-lg) 0;
}

.gradient-text {
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Scoped Styles en Componentes

```astro
<style>
  /* Estilos solo para este componente */
  .card {
    background: var(--color-bg);
    border-radius: 8px;
    padding: var(--spacing-md);
  }

  /* Global styles cuando necesario */
  :global(body) {
    overflow-x: hidden;
  }
</style>
```

## Gestión de Datos

### JSON para Datos Simples

```json
// data/skills.json
{
  "frontend": [
    { "name": "React", "level": 90 },
    { "name": "TypeScript", "level": 85 },
    { "name": "Astro", "level": 80 }
  ],
  "backend": [
    { "name": "Node.js", "level": 85 },
    { "name": "Python", "level": 75 }
  ]
}
```

### TypeScript para Datos Complejos

```typescript
// data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'proyecto-1',
    title: 'E-commerce App',
    description: 'Tienda online con React y Node',
    image: '/images/proyecto-1.webp',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/user/proyecto-1'
  }
];
```

## Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  'projects': projectsCollection
};
```

```markdown
---
// src/content/projects/mi-proyecto.md
title: "Mi Primer Proyecto"
description: "Una app increíble"
pubDate: 2024-01-15
image: "/images/proyecto.webp"
tags: ["React", "TypeScript"]
featured: true
---

# Contenido del proyecto en Markdown

Aquí va la descripción larga del proyecto...
```

## Animaciones con GSAP

### Utilidad Reutilizable

```typescript
// utils/animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: string | Element) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
};

export const scrollReveal = (element: string | Element) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1
  });
};
```

### Uso en Componentes

```astro
---
// components/sections/Hero.astro
---

<section class="hero">
  <h1 class="animate-title">Hola, soy Developer</h1>
</section>

<script>
  import { fadeInUp } from '@utils/animations';

  // Ejecutar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    fadeInUp('.animate-title');
  });
</script>
```

## Optimización de Performance

### Imágenes

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/images/hero.png';
---

<!-- ✅ Optimización automática -->
<Image
  src={heroImage}
  alt="Hero"
  width={1920}
  height={1080}
  loading="lazy"
  format="webp"
/>

<!-- ❌ Sin optimización -->
<img src="/images/hero.png" alt="Hero" />
```

### Carga de Scripts

```astro
<!-- ✅ Diferir scripts no críticos -->
<script src="/scripts/analytics.js" defer></script>

<!-- ✅ Async para scripts independientes -->
<script src="/scripts/chat.js" async></script>

<!-- ❌ Bloquear rendering -->
<script src="/scripts/heavy.js"></script>
```

### Componentes React

```astro
<!-- ✅ Cargar solo cuando visible -->
<HeavyComponent client:visible />

<!-- ✅ Cargar cuando el navegador está idle -->
<NonCriticalComponent client:idle />

<!-- ❌ Cargar todo inmediatamente -->
<AllComponents client:load />
```

## Checklist de Desarrollo

### Antes de Crear un Componente
- [ ] ¿Es reutilizable? → `components/ui/`
- [ ] ¿Es parte del layout? → `components/layout/`
- [ ] ¿Es una sección completa? → `components/sections/`
- [ ] ¿Necesita interactividad? → Usar React (.tsx)
- [ ] ¿Es mayormente estático? → Usar Astro (.astro)

### Antes de Commit
- [ ] Imports organizados
- [ ] Sin console.logs
- [ ] Variables CSS usadas correctamente
- [ ] Imágenes optimizadas
- [ ] TypeScript sin errores
- [ ] Componentes documentados si son complejos

### Performance Checklist
- [ ] Lazy loading en imágenes
- [ ] Client directives correctos en React
- [ ] Scripts diferidos/async
- [ ] Fonts preloaded
- [ ] CSS crítico inline
