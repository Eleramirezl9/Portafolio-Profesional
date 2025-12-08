# Estructura del Proyecto

## Arquitectura de Carpetas

Esta es la estructura organizada del portafolio, diseñada para escalabilidad y mantenibilidad.

```
Portafolio/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes UI básicos (Button, Card, Input, etc.)
│   │   ├── layout/         # Componentes de layout (Header, Footer, Nav, etc.)
│   │   └── sections/       # Secciones de página (Hero, Projects, About, Skills, etc.)
│   │
│   ├── layouts/            # Layouts base de Astro
│   │   └── Base.astro      # Layout principal con estructura HTML
│   │
│   ├── pages/              # Páginas del sitio (rutas)
│   │   ├── index.astro     # Página principal
│   │   └── proyectos/      # Sección de proyectos
│   │
│   ├── content/            # Contenido en Markdown
│   │   └── projects/       # Proyectos en formato .md
│   │
│   ├── data/               # Datos estáticos (JSON, TS)
│   │   ├── skills.json     # Lista de habilidades
│   │   ├── experience.json # Experiencia laboral
│   │   └── projects.ts     # Metadata de proyectos
│   │
│   ├── styles/             # Estilos CSS organizados
│   │   ├── global.css      # Estilos globales
│   │   ├── variables.css   # Variables CSS (colores, fuentes, etc.)
│   │   └── animations.css  # Animaciones reutilizables
│   │
│   └── utils/              # Utilidades y helpers
│       ├── animations.ts   # Funciones de animación (GSAP)
│       └── helpers.ts      # Funciones auxiliares
│
├── public/                 # Archivos estáticos
│   ├── images/            # Imágenes optimizadas
│   └── fonts/             # Fuentes personalizadas
│
└── docs/                   # Documentación del proyecto
    ├── ESTRUCTURA.md       # Este archivo
    ├── CONVENCIONES.md     # Reglas y convenciones
    └── OPTIMIZACION.md     # Guía de optimización
```

## Descripción de Carpetas

### `src/components/`
Todos los componentes reutilizables del proyecto.

#### `ui/`
Componentes de interfaz básicos y reutilizables:
- Botones, inputs, cards
- Componentes atómicos sin lógica de negocio
- Diseñados para ser usados en múltiples contextos

**Ejemplo**: `Button.astro`, `Card.tsx`, `Badge.astro`

#### `layout/`
Componentes estructurales de la página:
- Header, Footer, Navigation
- Sidebars, Wrappers
- Componentes que definen la estructura visual

**Ejemplo**: `Header.astro`, `Footer.astro`, `Navigation.tsx`

#### `sections/`
Secciones completas de páginas:
- Hero section, About section
- Cada sección es una pieza grande de contenido
- Pueden combinar múltiples componentes UI

**Ejemplo**: `Hero.astro`, `Projects.astro`, `Skills.tsx`

### `src/layouts/`
Templates base de Astro que envuelven páginas.

**Ejemplo**:
```astro
---
// Base.astro
---
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <slot />
  </body>
</html>
```

### `src/pages/`
Sistema de rutas de Astro (file-based routing):
- `index.astro` → `/`
- `proyectos.astro` → `/proyectos`
- `proyectos/[slug].astro` → `/proyectos/mi-proyecto`

### `src/content/`
Content Collections de Astro para contenido en Markdown:
- Type-safe
- Con frontmatter validado
- Ideal para blogs, proyectos, casos de estudio

### `src/data/`
Datos estáticos en JSON o TypeScript:
- Skills, experiencia, proyectos
- Configuraciones
- Datos que se importan en componentes

### `src/styles/`
Estilos CSS organizados por función:
- `global.css` - Reset, estilos base
- `variables.css` - Custom properties CSS
- `animations.css` - Keyframes y animaciones

### `src/utils/`
Funciones helper y utilidades:
- Lógica reutilizable
- Funciones puras
- Helpers de formato, fecha, etc.

### `public/`
Assets estáticos servidos directamente:
- Imágenes (optimizadas)
- Fuentes
- Favicons, robots.txt

### `docs/`
Documentación técnica del proyecto:
- Arquitectura y decisiones
- Guías de desarrollo
- Convenciones y patrones

## Ventajas de Esta Estructura

### Escalabilidad
- Fácil agregar nuevos componentes sin desorganizar
- Separación clara de responsabilidades
- Crece ordenadamente con el proyecto

### Mantenibilidad
- Encuentras archivos rápidamente
- Entiendes la función de cada carpeta
- Cambios localizados y predecibles

### Developer Experience
- Autocompletado intuitivo en el IDE
- Imports organizados y claros
- Menos tiempo buscando archivos

### Performance
- Code splitting natural por carpetas
- Optimización selectiva por tipo
- Lazy loading organizado

## Convenciones de Naming

### Archivos
- **Componentes**: PascalCase → `Button.astro`, `HeroSection.tsx`
- **Utilidades**: camelCase → `animations.ts`, `helpers.ts`
- **Estilos**: kebab-case → `global.css`, `animations.css`
- **Content**: kebab-case → `mi-proyecto.md`

### Carpetas
- Siempre en minúsculas
- Plurales para colecciones: `components/`, `utils/`
- Singular para tipos: `layout/`, `content/`

## Próximos Pasos

1. Crear componentes base en `ui/`
2. Configurar layout principal
3. Agregar estilos globales
4. Implementar secciones del portafolio
