# Portafolio Personal

Portafolio profesional construido con Astro, React y GSAP para animaciones premium y performance optimizado.

## Stack Tecnológico

- **Framework**: [Astro](https://astro.build) 5.16+ (Astro Islands)
- **UI Interactivo**: [React](https://react.dev) 19+
- **Animaciones**: [GSAP](https://gsap.com) 3.13+
- **Estilos**: CSS moderno con variables
- **TypeScript**: Type-safe development
- **Build**: Vite
- **Deploy**: TBD (Vercel/Netlify/Cloudflare)

## Características

- **Performance First**: Lighthouse 95+ score
- **Optimización de Imágenes**: WebP/AVIF automático
- **Animaciones Fluidas**: GSAP con ScrollTrigger
- **Dark Theme**: Diseño moderno oscuro
- **Responsive**: Mobile-first design
- **SEO Optimizado**: Meta tags y sitemap
- **Type-Safe**: TypeScript en todo el proyecto

## Estructura del Proyecto

```
Portafolio/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes UI básicos (Button, Card, etc.)
│   │   ├── layout/         # Header, Footer, Navigation
│   │   └── sections/       # Hero, Projects, About, Skills
│   │
│   ├── layouts/            # Layouts base de Astro
│   │   └── Base.astro      # Layout principal
│   │
│   ├── pages/              # Sistema de rutas (file-based routing)
│   │   └── index.astro     # Página principal
│   │
│   ├── content/            # Content Collections (Markdown)
│   │   └── projects/       # Proyectos en .md
│   │
│   ├── data/               # Datos estáticos (JSON/TS)
│   │   ├── skills.json     # Habilidades
│   │   └── projects.ts     # Metadata de proyectos
│   │
│   ├── styles/             # Estilos organizados
│   │   ├── global.css      # Estilos globales y reset
│   │   ├── variables.css   # Variables CSS (colores, spacing)
│   │   └── animations.css  # Animaciones reutilizables
│   │
│   └── utils/              # Utilidades y helpers
│       ├── animations.ts   # Funciones GSAP
│       └── helpers.ts      # Funciones auxiliares
│
├── public/                 # Assets estáticos
│   ├── images/            # Imágenes optimizadas
│   └── fonts/             # Fuentes personalizadas
│
└── docs/                   # Documentación del proyecto
    ├── ESTRUCTURA.md       # Arquitectura del proyecto
    ├── CONVENCIONES.md     # Patrones y convenciones
    └── OPTIMIZACION.md     # Guía de performance
```

**Documentación detallada**: Ver carpeta [`docs/`](./docs)

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando | Acción |
|---------|--------|
| `pnpm install` | Instalar dependencias |
| `pnpm dev` | Servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Build para producción en `./dist/` |
| `pnpm preview` | Preview del build localmente |
| `pnpm astro check` | Verificar tipos TypeScript |
| `pnpm astro --help` | Ayuda de Astro CLI |

## Desarrollo

### Prerrequisitos

- Node.js 18+
- pnpm 8+

### Instalación

```bash
# Clonar repositorio
git clone [tu-repo]

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Variables de Entorno (Opcional)

Crear `.env` en la raíz:

```env
# Ejemplo para CMS o Analytics
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

## Guías de Desarrollo

### Crear un Nuevo Componente

```bash
# UI Component (Astro)
src/components/ui/Button.astro

# Section Component (React con interactividad)
src/components/sections/Skills.tsx
```

Ver [CONVENCIONES.md](./docs/CONVENCIONES.md) para patrones de diseño.

### Agregar un Proyecto

1. Crear archivo en `src/content/projects/mi-proyecto.md`
2. Agregar frontmatter con metadata
3. Escribir descripción en Markdown

```markdown
---
title: "Mi Proyecto"
description: "Descripción corta"
pubDate: 2024-12-04
image: "/images/proyecto.webp"
tags: ["React", "TypeScript"]
featured: true
---

# Contenido del proyecto...
```

### Optimizar Imágenes

```bash
# Colocar imágenes en public/images/
# Astro las optimiza automáticamente con el componente Image

# En componentes:
import { Image } from 'astro:assets';
import heroImg from '@/images/hero.jpg';

<Image src={heroImg} alt="Hero" format="webp" />
```

Ver [OPTIMIZACION.md](./docs/OPTIMIZACION.md) para mejores prácticas.

## Performance

### Métricas Objetivo

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse Performance**: 95+

### Estrategias

- Astro Islands (hidratación parcial)
- Lazy loading de imágenes
- Code splitting automático
- CSS crítico inline
- GSAP lazy-loaded

## Build y Deploy

### Build para Producción

```bash
# Construir sitio estático
pnpm build

# Preview del build
pnpm preview
```

### Deploy

El proyecto es compatible con:

- **Vercel**: Zero-config deploy
- **Netlify**: Drag & drop o Git integration
- **Cloudflare Pages**: High performance edge
- **GitHub Pages**: Free hosting

```bash
# Ejemplo para Vercel
vercel deploy --prod
```

## Recursos

### Documentación Oficial

- [Astro Docs](https://docs.astro.build)
- [GSAP Docs](https://gsap.com/docs)
- [React Docs](https://react.dev)

### Documentación del Proyecto

- [Estructura del Proyecto](./docs/ESTRUCTURA.md)
- [Convenciones y Patrones](./docs/CONVENCIONES.md)
- [Guía de Optimización](./docs/OPTIMIZACION.md)

## Licencia

MIT - Uso personal y comercial permitido

---

**Desarrollado con Astro y mucho café**
