# Documentación del Proyecto

Bienvenido a la documentación completa del portafolio. Esta carpeta contiene toda la información técnica, convenciones y guías para desarrollar el proyecto.

## Índice de Documentación

### [ESTRUCTURA.md](./ESTRUCTURA.md)
**Arquitectura y organización del proyecto**

Aprende sobre:
- Estructura de carpetas detallada
- Función de cada directorio
- Convenciones de naming
- Por qué está organizado así
- Ventajas de la arquitectura

**Lee esto primero** si es tu primera vez en el proyecto.

### [CONVENCIONES.md](./CONVENCIONES.md)
**Patrones de diseño y reglas de código**

Aprende sobre:
- Principios de desarrollo (KISS, DRY, Separation of Concerns)
- Nomenclatura de archivos y componentes
- Patrones de componentes Astro vs React
- Organización de imports
- Path aliases (@ imports)
- Gestión de estilos (CSS variables, scoped styles)
- Gestión de datos (JSON, TypeScript, Content Collections)
- Animaciones con GSAP
- Checklist antes de commit

**Lee esto** antes de crear componentes o escribir código.

### [OPTIMIZACION.md](./OPTIMIZACION.md)
**Guía de performance y optimización**

Aprende sobre:
- Core Web Vitals y métricas objetivo
- Optimización de imágenes (WebP, AVIF, lazy loading)
- Optimización de CSS (critical CSS, purge, GPU animations)
- Optimización de JavaScript (code splitting, lazy load)
- Optimización de fuentes (font display, preload, variable fonts)
- Optimización de GSAP
- Build optimization
- Performance budget
- Herramientas de medición

**Lee esto** cuando necesites mejorar el performance o antes de deploy.

## Inicio Rápido

### 1. Primera vez en el proyecto

```bash
# Leer en orden:
1. docs/ESTRUCTURA.md      # Entender la organización
2. docs/CONVENCIONES.md    # Aprender los patrones
3. README.md (raíz)        # Comandos y setup
```

### 2. Voy a crear un componente

```bash
# Leer:
1. docs/ESTRUCTURA.md      # ¿Dónde va mi componente?
2. docs/CONVENCIONES.md    # ¿Cómo lo escribo correctamente?
```

### 3. Voy a optimizar performance

```bash
# Leer:
1. docs/OPTIMIZACION.md    # Todas las técnicas de optimización
```

## Preguntas Frecuentes

### ¿Dónde creo un nuevo componente UI?
→ `src/components/ui/MiComponente.astro` (ver ESTRUCTURA.md)

### ¿Cuándo uso Astro vs React?
→ Astro para estático, React para interactividad (ver CONVENCIONES.md)

### ¿Cómo importo componentes?
→ Usa path aliases: `@components/ui/Button.astro` (ver CONVENCIONES.md)

### ¿Cómo optimizo imágenes?
→ Usa componente `<Image>` de Astro (ver OPTIMIZACION.md)

### ¿Cómo agrego animaciones?
→ Funciones reutilizables en `utils/animations.ts` (ver CONVENCIONES.md)

### ¿Cómo organizo estilos?
→ Variables en `styles/variables.css`, scoped en componentes (ver CONVENCIONES.md)

### ¿Cuál es el performance objetivo?
→ Lighthouse 95+, LCP < 2.5s (ver OPTIMIZACION.md)

## Estructura de Esta Carpeta

```
docs/
├── README.md              # Este archivo (índice)
├── ESTRUCTURA.md          # Arquitectura del proyecto
├── CONVENCIONES.md        # Patrones y convenciones
└── OPTIMIZACION.md        # Guía de performance
```

## Convenciones de Esta Documentación

### Emoji Guide
- **✅** - Buena práctica, recomendado
- **❌** - Mala práctica, evitar
- **⚠️** - Precaución, cuidado

### Code Examples

```typescript
// ✅ MEJOR: Descripción de por qué es mejor
const buenaOpcion = 'así';

// ❌ EVITAR: Descripción de por qué es malo
const malaOpcion = 'no así';
```

## Actualizar Esta Documentación

Esta documentación debe mantenerse actualizada. Si haces cambios significativos:

1. **Cambios de estructura**: Actualizar `ESTRUCTURA.md`
2. **Nuevas convenciones**: Actualizar `CONVENCIONES.md`
3. **Nuevas optimizaciones**: Actualizar `OPTIMIZACION.md`
4. **Cambios generales**: Actualizar `README.md` (raíz)

## Recursos Adicionales

### Astro
- [Astro Docs](https://docs.astro.build)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)

### React
- [React Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### GSAP
- [GSAP Docs](https://gsap.com/docs)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

### Performance
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Última actualización**: 2024-12-04
**Mantenedor**: Tu nombre aquí
