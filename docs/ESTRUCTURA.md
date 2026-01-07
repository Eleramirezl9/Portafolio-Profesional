# Estructura del Proyecto

## Arquitectura de Carpetas

Esta es la estructura organizada del portafolio después de la **Refactorización Fase 4**, diseñada siguiendo principios SOLID para escalabilidad y mantenibilidad.

```
Portafolio/
├── src/
│   ├── components/                 # Componentes reutilizables (SOLID)
│   │   ├── ui/                    # Componentes atómicos/UI
│   │   │   ├── Button.astro       # Botón reutilizable (4 variantes)
│   │   │   ├── Button.module.css
│   │   │   ├── Badge.astro        # Etiqueta (4 colores)
│   │   │   ├── Badge.module.css
│   │   │   ├── Card.astro         # Contenedor (3 variantes)
│   │   │   └── Card.module.css
│   │   │
│   │   ├── shared/                # Componentes compartidos
│   │   │   ├── SectionHeader.astro
│   │   │   └── SectionHeader.module.css
│   │   │
│   │   ├── sections/              # Secciones de página
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.astro
│   │   │   │   └── Hero.module.css
│   │   │   ├── About/
│   │   │   │   ├── About.astro
│   │   │   │   └── About.module.css
│   │   │   ├── Projects/
│   │   │   │   ├── Projects.astro
│   │   │   │   ├── Projects.module.css
│   │   │   │   ├── ProjectCard.astro
│   │   │   │   └── ProjectCard.module.css
│   │   │
│   │   └── layout/                # Componentes de layout
│   │       ├── Header/
│   │       │   ├── Header.astro
│   │       │   └── Header.module.css
│   │       └── AnimatedBackground/
│   │           ├── AnimatedBackground.astro
│   │           └── AnimatedBackground.module.css
│   │
│   ├── data/                      # Capa de datos
│   │   ├── types.ts              # Interfaces TypeScript (20+)
│   │   ├── constants.ts          # Constantes centralizadas
│   │   ├── personal.ts           # Datos tipificados
│   │   └── personal.json         # Data source único
│   │
│   ├── utils/                     # Funciones reutilizables
│   │   ├── helpers.ts           # 20+ funciones auxiliares
│   │   ├── formatters.ts        # 15+ formateadores
│   │   └── animations.ts        # Constantes de animaciones
│   │
│   ├── layouts/                   # Layouts de Astro
│   │   └── Base.astro            # Layout HTML principal
│   │
│   ├── pages/                     # Rutas públicas
│   │   └── index.astro           # Composition Root
│   │
│   └── styles/                    # Estilos globales
│       ├── global.css            # Reset y estilos base
│       └── variables.css         # Variables CSS
│
├── docs/                          # Documentación técnica
│   ├── ARCHITECTURE.md           # ✨ NUEVO: Principios SOLID
│   ├── COMPONENTS.md             # ✨ NUEVO: Guía de componentes
│   ├── STRUCTURE.md              # Este archivo (actualizado)
│   ├── CONVENCIONES.md           # Reglas y convenciones
│   ├── OPTIMIZACION.md           # Guía de optimización
│   ├── REFACTORING_SUMMARY.md    # Resumen de fases
│   ├── GRAPH_BACKGROUND.md       # ❌ Eliminar (legacy)
│   └── ANIMATED_BACKGROUND.md    # ❌ Eliminar (legacy)
│
├── public/                        # Assets estáticos
│   ├── images/                   # Imágenes optimizadas
│   └── fonts/                    # Fuentes personalizadas
│
├── package.json                   # Dependencias del proyecto
├── tsconfig.json                  # Configuración TypeScript
├── astro.config.mjs              # Configuración Astro
├── README.md                      # Documentación principal
└── .gitignore

```

## Descripción Detallada de Carpetas

### `src/components/`

Todos los componentes reutilizables siguiendo **Component-Driven Development**.

#### `ui/`
Componentes atómicos sin lógica de negocio:
- **Button** - Botones con 4 variantes (primary, secondary, ghost, outline)
- **Badge** - Etiquetas con 4 temas (primary, success, warning, info)
- **Card** - Contenedores con 3 estilos (default, glow, outline)

**Patrón:** Single Responsibility, Open/Closed

#### `shared/`
Componentes reutilizables en múltiples contextos:
- **SectionHeader** - Encabezado de sección (usado en About, Projects, etc)

**Patrón:** Composition, DRY

#### `sections/`
Secciones principales de la página (orqueestan datos + UI):
- **Hero/** - Presentación principal
- **About/** - Información personal y logros
- **Projects/** - Galería de proyectos
  - ProjectCard.astro - Renderiza UN proyecto

**Patrón:** Container/Presentational, Data inyectada via props

#### `layout/`
Componentes globales:
- **Header/** - Navegación superior (inyecta `navItems` como prop)
- **AnimatedBackground/** - Fondo animado (canvas 3D)

**Patrón:** Layout, Dependency Inversion

### `src/data/`

Capa centralizada de datos y tipos:

- **types.ts** - 20+ interfaces TypeScript (NavItem, PersonalData, Experience, etc)
- **constants.ts** - Constantes reutilizables (NAV_ITEMS, COLORS, SPACING, etc)
- **personal.ts** - Exporta personal.json tipificado
- **personal.json** - Única fuente de verdad de datos

**Patrón:** Data Centralization, Type Safety

### `src/utils/`

Funciones puras reutilizables:

- **helpers.ts** - Lógica auxiliar (formatDate, getInitials, calculateYears, etc)
- **formatters.ts** - Transformadores de datos (formatPhone, capitalizeString, etc)
- **animations.ts** - Constantes de animaciones (duraciones, easing, etc)

**Patrón:** DRY, Single Responsibility

### `src/layouts/`

Layouts base de Astro:
- **Base.astro** - HTML estructura, incluye Header y AnimatedBackground

### `src/pages/`

Rutas públicas (Astro auto-genera URLs basado en nombres):
- **index.astro** - Página principal (Composition Root)
  - Importa datos desde `@data/`
  - Inyecta datos en componentes via props
  - Punto único de inyección de dependencias

### `src/styles/`

Estilos globales:
- **global.css** - Reset CSS, tipografía base
- **variables.css** - Variables CSS (--color-*, --space-*, --font-*, etc)

**Nota:** Componentes usan CSS Modules (*.module.css) para aislar estilos

## Flujo de Datos

```
personal.json (data)
    ↓
personal.ts (tipificado)
    ↓
pages/index.astro (Composition Root)
    ↓
    ├→ Header (inyecta navItems)
    ├→ Hero (inyecta personalData)
    ├→ About (inyecta personalData)
    └→ Projects (inyecta experience, socialData)
        ↓
        └→ ProjectCard (props específicas)
```

## Convenciones de Nomenclatura

### Archivos y Carpetas

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Componente | PascalCase | `Button.astro`, `SectionHeader.astro` |
| Carpeta | kebab-case | `animated-background/`, `project-card/` |
| Función | camelCase | `formatDate()`, `calculateYears()` |
| Constante | UPPER_SNAKE_CASE | `NAV_ITEMS`, `MAX_WIDTH` |
| Variable | camelCase | `personalData`, `navItems` |
| CSS Class | kebab-case | `.nav-link`, `.button-primary` |
| CSS Variable | kebab-case con `--` | `--color-primary`, `--space-4` |

### Estructura de Componentes

```astro
---
/**
 * Descripción del componente
 * - Característica 1
 * - Característica 2
 */

import type { Props } from './Component.types'; // Si es necesario
import styles from './Component.module.css';

interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

const { title, variant = 'primary' } = Astro.props;
---

<!-- Markup con clases de styles -->
<div class={`${styles.container} ${styles[variant]}`}>
  {title}
</div>
```

## Árbol de Dependencias (SRP)

```
personal.json (datos crudos)
    ↓
types.ts (tipificación)
    ↓
personal.ts (export tipificado)
    ↓
constants.ts (valores centralizados)
    ↓
utils/ (funciones puras)
    ↓
components/ui (componentes atómicos)
    ↓
components/shared (componentes compartidos)
    ↓
components/sections (orquestación de datos + UI)
    ↓
components/layout (estructura global)
    ↓
pages/index.astro (Composition Root)
```

## Escalabilidad Futura

Esta estructura permite agregar:

### Fase 5 - Testing
```
src/
├── __tests__/
│   ├── components/
│   └── utils/
```

### Fase 6 - Internacionalización
```
src/
├── i18n/
│   ├── es.json
│   ├── en.json
│   └── helpers.ts
```

### Fase 7 - CMS Integration
```
src/
├── api/
│   └── cms.ts (Strapi, Contentful, etc)
```

## Características Clave

✅ **Single Responsibility** - Cada archivo hace UNA cosa
✅ **Type Safety** - TypeScript en todas partes
✅ **DRY** - Cero duplicación de código
✅ **CSS Isolation** - CSS Modules para cada componente
✅ **Barrel Exports** - Imports limpios y organizados
✅ **Composition** - Componentes pequeños combinables
✅ **Props-based** - Configuración via props, no imports internos
✅ **Responsive** - Mobile-first desde el diseño

## Archivos Eliminados en Fase 4

❌ `src/components/layout/Header.astro` (reemplazado por Header/)
❌ `src/components/layout/AnimatedBackground.astro` (reemplazado por AnimatedBackground/)
❌ `src/components/sections/Hero.astro` (reemplazado por Hero/)
❌ `src/components/sections/About.astro` (reemplazado por About/)
❌ `src/components/sections/Projects.astro` (reemplazado por Projects/)
❌ `docs/GRAPH_BACKGROUND.md` (experimental, no usado)
❌ `docs/ANIMATED_BACKGROUND.md` (documentación antigua)

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type check
npm run check

# Visualizar dependencias
npm run build --stats
```

## Referencias

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Principios SOLID detallados
- [COMPONENTS.md](./COMPONENTS.md) - Guía rápida de componentes
- [CONVENCIONES.md](./CONVENCIONES.md) - Reglas de código
- [Astro Docs](https://docs.astro.build)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

**Versión:** 2.0 (Refactorización Fase 4)
**Última actualización:** Enero 2026
