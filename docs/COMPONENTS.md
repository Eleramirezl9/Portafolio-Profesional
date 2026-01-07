# Guía de Componentes

Referencia rápida de todos los componentes reutilizables del portafolio.

## Componentes UI Atómicos

### Button

**Ubicación:** `src/components/ui/Button.astro`

Botón reutilizable con múltiples variantes y tamaños.

**Props:**
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string; // Genera <a> en lugar de <button>
  class?: string; // clases adicionales
}
```

**Ejemplos:**
```astro
<!-- Primary button -->
<Button variant="primary" size="md">
  Hablemos
</Button>

<!-- Ghost link -->
<Button variant="ghost" href="#projects">
  Ver proyectos
</Button>

<!-- Disabled state -->
<Button disabled>Deshabilitado</Button>
```

**Estilos:**
- `primary` → Gradiente rosa/rojo
- `secondary` → Borde tenue
- `ghost` → Sin fondo, solo texto
- `outline` → Borde visible

---

### Badge

**Ubicación:** `src/components/ui/Badge.astro`

Etiquetas para destacar habilidades, tecnologías, etc.

**Props:**
```typescript
interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'info';
  class?: string;
}
```

**Ejemplos:**
```astro
<!-- Tech badge -->
<Badge variant="primary">React</Badge>

<!-- Status badge -->
<Badge variant="success">Activo</Badge>
<Badge variant="warning">En desarrollo</Badge>
```

**Variantes:**
- `primary` → Rosa/rojo (por defecto)
- `success` → Verde
- `warning` → Amarillo
- `info` → Azul

---

### Card

**Ubicación:** `src/components/ui/Card.astro`

Contenedor para agrupar contenido relacionado.

**Props:**
```typescript
interface Props {
  variant?: 'default' | 'glow' | 'outline';
  class?: string;
}
```

**Ejemplos:**
```astro
<!-- Default card -->
<Card>
  <h3>Proyecto</h3>
  <p>Descripción</p>
</Card>

<!-- Glow effect -->
<Card variant="glow">
  Contenido destacado
</Card>

<!-- Outline card -->
<Card variant="outline">
  Contenido alternativo
</Card>
```

**Variantes:**
- `default` → Fondo sutil sin borde
- `glow` → Brillo gradual en los bordes
- `outline` → Borde visible

---

## Componentes Compartidos

### SectionHeader

**Ubicación:** `src/components/shared/SectionHeader.astro`

Encabezado reutilizable para secciones principales.

**Props:**
```typescript
interface Props {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  class?: string;
}
```

**Ejemplos:**
```astro
<!-- Centrado (por defecto) -->
<SectionHeader 
  title="Sobre Mí"
  subtitle="Mi historia profesional"
/>

<!-- Alineado a la izquierda -->
<SectionHeader 
  title="Proyectos"
  align="left"
/>
```

**Características:**
- Gradient en el título
- Subtítulo opcional
- Alineación configurable
- Responsive

---

## Componentes de Sección

### Hero

**Ubicación:** `src/components/sections/Hero/Hero.astro`

Sección de presentación principal.

**Props:**
```typescript
interface Props {
  personalData: PersonalData;
}
```

**Datos requeridos:**
```typescript
{
  name: string;
  title: string;
  description: string;
  social: SocialLink[];
}
```

**Características:**
- CTA principal destacado
- Enlaces sociales
- Animaciones suaves
- Responsive (mobile-first)

---

### About

**Ubicación:** `src/components/sections/About/About.astro`

Sección de información personal.

**Props:**
```typescript
interface Props {
  personalData: PersonalData;
}
```

**Datos utilizados:**
```typescript
{
  achievements: string[];
  languages: Language[];
  education: string;
  experience: Experience[];
}
```

**Características:**
- Grid de logros
- Lenguajes con niveles
- Información de educación
- Métricas calculadas dinámicamente

---

### Projects

**Ubicación:** `src/components/sections/Projects/Projects.astro`

Galería de proyectos/experiencias.

**Props:**
```typescript
interface Props {
  experience: Experience[];
  socialData?: Social;
}
```

**Datos utilizados:**
```typescript
{
  title: string;
  company: string;
  description: string;
  tags: string[];
  startDate: string;
  endDate?: string;
  link?: string;
}
```

**Sub-componentes:**
- **ProjectCard** → Renderiza un proyecto individual

---

### ProjectCard

**Ubicación:** `src/components/sections/Projects/ProjectCard.astro`

Card individual para proyectos.

**Props:**
```typescript
interface Props {
  title: string;
  company: string;
  description: string;
  tags: string[];
  startDate: string;
  endDate?: string;
  link?: string;
}
```

**Características:**
- Información compacta
- Tags de tecnologías
- Fechas formateadas
- Link opcional

---

## Componentes de Layout

### Header

**Ubicación:** `src/components/layout/Header/Header.astro`

Navegación superior fija.

**Props:**
```typescript
interface Props {
  navItems: NavItem[];
}
```

**Datos requeridos:**
```typescript
{
  name: string;
  href: string;
}
```

**Características:**
- Navegación desktop + mobile
- Menú hamburguesa responsive
- Smooth scroll
- Efecto de scroll (fondo más oscuro)
- Accesibilidad incorporada

---

### AnimatedBackground

**Ubicación:** `src/components/layout/AnimatedBackground/AnimatedBackground.astro`

Fondo animado tipo red 3D.

**Props:** Ninguna (componente puro)

**Características:**
- Partículas animadas
- Líneas de conexión
- Gradientes suaves rosa/rojo
- Respeta `prefers-reduced-motion`
- Performance optimizado

---

## Cómo Crear un Nuevo Componente

### 1. Estructura Base

```
src/components/sections/MyComponent/
├── MyComponent.astro
├── MyComponent.module.css
└── SubComponent.astro (opcional)
```

### 2. Template

```astro
---
import type { MyData } from '@data/types';
import styles from './MyComponent.module.css';

interface Props {
  data: MyData;
  variant?: 'default' | 'alt';
}

const { data, variant = 'default' } = Astro.props;
---

<section class={`${styles.container} ${styles[variant]}`}>
  <h2>{data.title}</h2>
  <!-- contenido -->
</section>
```

### 3. Importar en index.astro

```astro
import MyComponent from '@components/sections/MyComponent/MyComponent.astro';

<MyComponent data={myData} />
```

**Nota:** Astro no soporta barrel exports para componentes `.astro`. Importa siempre directamente del archivo específico.

## Props Recomendadas

### Patrones Comunes

```typescript
// ✅ Variantes configurables
variant?: 'primary' | 'secondary' | 'accent';

// ✅ Tamaños
size?: 'sm' | 'md' | 'lg';

// ✅ Estados
disabled?: boolean;
isActive?: boolean;

// ✅ Clases adicionales
class?: string;

// ✅ Datos tipificados
data: MyTypifiedData;
```

### Evitar

```typescript
// ❌ Props booleanas genéricas
isSmall?: boolean;
isSpecial?: boolean;

// ❌ Any types
data: any;

// ❌ Props no utilizadas
unused?: string;
```

## Estilos - CSS Modules

### Convenciones

```css
/* camelCase para clases */
.buttonPrimary { }
.buttonSecondary { }

/* Variantes: punto + modificador */
.button { }
.button.primary { }

/* Responsive: media queries al final */
@media (max-width: 768px) { }
```

### Reutilización

```css
/* ✅ Usar variables CSS globales */
background: var(--color-accent-primary);
padding: var(--space-4);

/* ❌ Evitar valores hardcodeados */
background: #e66478;
padding: 16px;
```

## Testing Recomendado

```typescript
// Button.test.astro
const { getByRole } = render(Button, {
  props: {
    variant: 'primary',
    children: 'Click'
  }
});

expect(getByRole('button')).toBeInTheDocument();
```

## Performance

### Consideraciones

- **Lazy loading** para secciones debajo del fold
- **Image optimization** para imágenes responsivas
- **CSS modules** para evitar estilos globales innecesarios
- **Eventos delegados** en componentes interactivos

### Monitoreo

```bash
npm run build --stats
# Analizar bundle size

npm run check
# Tipo-chequeo
```

## Accesibilidad

Cada componente debe incluir:

```astro
<!-- ARIA labels -->
<button aria-label="Abrir menú">☰</button>

<!-- Focus visible -->
.button:focus-visible { outline: 2px solid; }

<!-- Semantic HTML -->
<nav>, <main>, <section>

<!-- Color contrast -->
WCAG AA (4.5:1 para texto)
```

## Versionado de Componentes

Si necesitas cambiar un componente:

1. **Versión anterior** → dejar funcional
2. **Nueva versión** → crear sub-carpeta si es breaking change
3. **Migración gradual** → actualizar imports progresivamente

```
Button/          # v1 estable
├── Button.astro
├── Button.module.css

ButtonV2/        # v2 con breaking changes (si necesario)
├── ButtonV2.astro
├── ButtonV2.module.css
```

## Documentación del Código

Cada componente debe tener:

```astro
---
/**
 * Nombre Componente
 * 
 * Descripción breve de qué hace
 * - Característica 1
 * - Característica 2
 * 
 * @example
 * <Component prop="valor">Contenido</Component>
 */

import type { Props } from './Component.types';
// ...
---
```

## Referencias Rápidas

| Componente | Ubicación | Props | Caso de Uso |
|-----------|-----------|-------|------------|
| Button | `@components/ui` | variant, size | CTAs, formularios |
| Badge | `@components/ui` | variant | Tecnologías, tags |
| Card | `@components/ui` | variant | Contenedores |
| SectionHeader | `@components/shared` | title, subtitle | Headers de sección |
| Hero | `@components/sections` | personalData | Landing page |
| About | `@components/sections` | personalData | Info personal |
| Projects | `@components/sections` | experience, social | Portfolio |
| Header | `@components/layout` | navItems | Navegación global |

---

**Última actualización:** Enero 2026
**Autor:** Equipo de Arquitectura
