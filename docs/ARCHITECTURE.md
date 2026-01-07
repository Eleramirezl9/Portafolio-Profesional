# Arquitectura del Portafolio

## Principios SOLID

Este proyecto está construido siguiendo los principios SOLID para garantizar código mantenible, escalable y testeable.

### 1. **Single Responsibility Principle (SRP)**

Cada componente y módulo tiene **una única responsabilidad**:

- **Componentes UI** (`Button`, `Badge`, `Card`): Solo renderizar UI con props específicas
- **Componentes Compartidos** (`SectionHeader`): Reutilizables en múltiples contextos
- **Componentes de Sección** (`Hero`, `About`, `Projects`): Orquestar datos + UI
- **Datos** (`types.ts`, `constants.ts`): Definiciones centralizadas
- **Utilidades** (`helpers.ts`, `formatters.ts`): Funciones puras sin efectos secundarios

**Ejemplo SRP:**
```astro
<!-- ✅ BIEN: Button solo renderiza -->
<Button variant="primary" size="lg">Click me</Button>

<!-- ❌ MAL: Button con lógica de negocio -->
<Button onClick={validateEmail}>Enviar</Button>
```

### 2. **Open/Closed Principle (OCP)**

Los componentes están **abiertos a extensión**, **cerrados a modificación**:

- Props para configuración (no modificar el componente)
- Variantes via props (`variant`, `size`, `disabled`)
- CSS modules para estilos aislados (sin efectos secundarios globales)

**Ejemplo OCP:**
```astro
<!-- ✅ Extensible sin modificar Button.astro -->
<Button variant="success" size="sm">Nueva variante</Button>

<!-- ❌ Modificaríamos Button.astro para cada caso -->
<Button isSmall isGreen>Cambio</Button>
```

### 3. **Liskov Substitution Principle (LSP)**

Los componentes son **intercambiables** respetando su contrato (props):

```astro
// Cualquier componente que acepte estas props puede usarse aquí
interface Props {
  name: string;
  href: string;
}

// Intercambiable: NavLink, SidebarLink, FooterLink
{navItems.map(item => <NavLink {...item} />)}
```

### 4. **Interface Segregation Principle (ISP)**

Los componentes reciben **solo las props que necesitan**:

```typescript
// ✅ BIEN: Props específicas
interface Props {
  title: string;
  description: string;
  tags: string[];
}

// ❌ MAL: Props genéricas innecesarias
interface Props {
  data: any; // Demasiado amplio
  allSettings: Settings;
  unused?: string;
}
```

### 5. **Dependency Inversion Principle (DIP)**

**No inyectamos datos directamente**, los pasamos como props:

```astro
---
// ✅ BIEN: Inyección de dependencias en la raíz
import { NAV_ITEMS } from '@data/constants';
---

<Header navItems={NAV_ITEMS} />

<!-- En Header.astro: -->
<ul>
  {navItems.map(item => <li>{item.name}</li>)}
</ul>
```

```astro
<!-- ❌ MAL: Acoplamiento directo -->
<script>
  import { NAV_ITEMS } from '@data/constants';
  // El componente depende directamente del dato
</script>
```

## Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes atómicos (Button, Badge, Card)
│   ├── shared/             # Componentes compartidos (SectionHeader)
│   ├── sections/           # Secciones principales (Hero, About, Projects)
│   └── layout/             # Componentes de layout (Header, AnimatedBackground)
├── data/
│   ├── types.ts           # Interfaces TypeScript centralizadas
│   ├── constants.ts       # Constantes (colores, espacios, nav items)
│   ├── personal.ts        # Datos tipificados del portafolio
│   └── personal.json      # Data source
├── utils/
│   ├── helpers.ts         # Funciones auxiliares reutilizables
│   ├── formatters.ts      # Funciones de formato (fecha, teléfono, etc)
│   └── animations.ts      # Constantes y utilidades de animaciones
├── pages/
│   └── index.astro        # Composition Root - punto de inyección
├── layouts/
│   └── Base.astro         # Layout principal (estructura HTML)
└── styles/
    ├── global.css         # Estilos globales
    └── variables.css      # Variables CSS (colores, espacios, etc)
```

## Flujo de Datos

### 1. **Importación de Datos** (Data Layer)
```typescript
// src/data/personal.ts - Tipificado con interfaces
import { PersonalData } from './types';
import personalJSON from './personal.json';

export default personalJSON as PersonalData;
```

### 2. **Composition Root** (Dependency Injection)
```astro
---
// pages/index.astro - Punto único de inyección
import personalData from '@data/personal';
import { NAV_ITEMS } from '@data/constants';
---

<Header navItems={NAV_ITEMS} />
<Hero personalData={personalData} />
```

### 3. **Componentes** (Presentación)
```astro
---
// components/sections/Hero/Hero.astro
import type { PersonalData } from '@data/types';

interface Props {
  personalData: PersonalData;
}

const { personalData } = Astro.props;
---

<section>
  <h1>{personalData.name}</h1>
  <p>{personalData.description}</p>
</section>
```

## Patrones de Diseño Aplicados

### 1. **Barrel Exports** (para utilidades)
Simplifica los imports usando `index.ts` como punto de entrada **para funciones y tipos**:

```typescript
// src/utils/index.ts - funciones puras
export { formatDate, calculateYears } from './helpers';
export { capitalizeString, truncateText } from './formatters';

// Uso:
import { formatDate, capitalizeString } from '@utils';
```

**Nota importante:** Los barrel exports NO funcionan con componentes `.astro` en Astro.
Para componentes, importa directamente:

```astro
---
import Button from '@components/ui/Button.astro';
import Hero from '@components/sections/Hero/Hero.astro';
---
```

En `src/components/ui/index.ts` y similares, solo exportamos TypeScript para referencia:

```typescript
// src/components/ui/index.ts - solo tipos/referencias
export type { Props as ButtonProps } from './Button.astro';
```

### 2. **CSS Modules**
Aísla estilos por componente, evitando conflictos globales:

```astro
import styles from './Button.module.css';

<button class={styles.button} class:list={[styles[variant]]}></button>
```

### 3. **Prop Drilling Mínimo**
Datos inyectados en el componente raíz, propagados solo cuando necesario:

```astro
<!-- Raíz (index.astro) -->
<Hero personalData={personalData} />

<!-- Hero.astro - Usa los datos -->
<h1>{personalData.name}</h1>

<!-- Evitamos: Hero → HeroSubcomponent → AnotherSubcomponent -->
```

### 4. **Type Safety**
TypeScript interfaces centralizadas garantizan consistencia:

```typescript
// types.ts
export interface NavItem {
  name: string;
  href: string;
}

// Usadas en Header.astro
interface Props {
  navItems: NavItem[];
}
```

### 5. **Composition Over Inheritance**
Componentes simples combinados para crear comportamientos complejos:

```astro
<!-- Section = SectionHeader + Contenido -->
<section>
  <SectionHeader title="Proyectos" subtitle="Mis trabajos" />
  {projects.map(p => <ProjectCard {...p} />)}
</section>
```

## Ventajas de esta Arquitectura

| Principio | Ventaja | Ejemplo |
|-----------|---------|---------|
| **SRP** | Componentes simples y focalizados | Button = solo renderizar |
| **OCP** | Extensible sin modificar existente | Nuevas variantes de Button sin tocar Button.astro |
| **LSP** | Componentes intercambiables | Reemplazar Button por CustomButton sin cambios |
| **ISP** | Props claras y mínimas | Cada componente recibe lo que necesita |
| **DIP** | Bajo acoplamiento | Cambiar datos sin tocar componentes |
| **Type Safety** | Errores en tiempo de compilación | TypeScript detecta props incorrectas |
| **Reutilización** | Menos código duplicado | SectionHeader usado en 3+ secciones |
| **Mantenibilidad** | Cambios localizados | Arreglar un bug en Button solo toca Button.astro |

## Convenciones de Código

### Naming
- `components/` → componentes (Astro, React, etc)
- `pages/` → rutas públicas
- `layouts/` → wrappers HTML
- `utils/` → funciones puras
- `types.ts` → interfaces centralizadas
- `*.module.css` → estilos aislados por componente

### Imports
```typescript
// ✅ Usar path aliases
import { Button } from '@components/ui';
import { personalData } from '@data/personal';

// ❌ Evitar rutas relativas largas
import Button from '../../../components/ui/Button.astro';
```

### Props
```typescript
// ✅ Tipadas con interface
interface Props {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

// ❌ Props without types
const { variant, size } = Astro.props;
```

## Escalabilidad

Esta arquitectura permite escalar fácilmente:

```
Fase 1 ✅ - Tipos, constantes, utilidades
Fase 2 ✅ - Componentes atómicos y compartidos
Fase 3 ✅ - Secciones refactorizadas
Fase 4 ✅ - Layout components y limpieza
Fase 5 ⏳ - Testing y optimización
  - Unit tests (Vitest)
  - Integration tests
  - Performance audit
  - Accessibility audit
Fase 6 ⏳ - Features avanzadas
  - Dark mode (tema global)
  - i18n (internacionalización)
  - Analytics (trackeo de eventos)
  - CMS integration (data dinámica)
```

## Referencias

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Component Composition](https://react.dev/learn/thinking-in-react)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Astro Documentation](https://docs.astro.build/)
