# 🏗️ Arquitectura: Sección de Contacto + Reseñas

## 📊 Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────┐
│                    PÁGINA PRINCIPAL (index.astro)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Hero ➜ About ➜ Projects ➜ [CONTACT SECTION] ➜ Skills           │
│                                                                   │
│                      └─ Formulario (React)                       │
│                      └─ Lista de Reseñas (React)                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Componentes Principales

### 1️⃣ **Contact.astro** (Contenedor Principal)
- **Ubicación**: `src/components/sections/Contact/Contact.astro`
- **Tipo**: Componente Astro (SSR)
- **Responsabilidad**: Orquesta ContactForm y ReviewsList

**Props**:
```typescript
interface Props {
  initialReviews?: Review[];
  email: string;
}
```

---

### 2️⃣ **ContactForm.tsx** (Formulario Interactivo)
- **Ubicación**: `src/components/sections/Contact/ContactForm.tsx`
- **Tipo**: Componente React (client:load)
- **Características**:
  - Dos pestañas: "Contacto" y "Reseña"
  - Validación en cliente (Zod)
  - Estados: idle, loading, success, error
  - Envío POST a `/api/contact` o `/api/reviews`

**Estados**:
```typescript
type FormType = 'contact' | 'review';

interface FormData {
  type: FormType;
  authorName: string;
  email: string;
  message: string;
  isAnonymous: boolean;
}
```

---

### 3️⃣ **ReviewsList.tsx** (Lista de Reseñas)
- **Ubicación**: `src/components/sections/Contact/ReviewsList.tsx`
- **Tipo**: Componente React (client:load)
- **Características**:
  - Muestra reseñas aprobadas
  - Refetch cada 30 segundos
  - Avatar con iniciales o icono anónimo
  - Empty state cuando no hay reseñas

---

## 🔌 APIs REST

### **POST /api/contact**
Envía email de contacto.

```typescript
Request Body:
{
  authorName: string;      // min: 2, max: 50
  email: string;           // email válido
  message: string;         // min: 10, max: 1000
  recipientEmail: string;  // email del propietario
}

Success Response (200):
{
  message: "¡Mensaje enviado! Te responderé pronto.",
  success: true
}

Error Response (400/500):
{
  message: "Descripción del error"
}
```

**Flujo**:
1. Validación con Zod
2. Crea transporter Nodemailer
3. Envía email HTML
4. Respuesta al cliente

---

### **GET /api/reviews**
Obtiene reseñas aprobadas.

```typescript
Response (200):
{
  reviews: Review[],
  count: number
}
```

---

### **POST /api/reviews**
Crea nueva reseña.

```typescript
Request Body:
{
  authorName: string;     // min: 2, max: 50
  email: string;          // email válido
  message: string;        // min: 10, max: 1000
  isAnonymous: boolean;   // true/false
}

Success Response (201):
{
  message: "¡Reseña enviada! Se publicará después de ser aprobada.",
  review: { _id, authorName, message, ... }
}
```

**Flujo**:
1. Validación con Zod
2. Crea documento en Sanity (status: pending)
3. Envía email al admin
4. Respuesta al cliente

---

## 🗄️ Integración con Sanity CMS

### Schema: Review Document

```typescript
{
  _type: 'review',
  _id: string,                          // Auto
  authorName: string,                   // Visible públicamente
  authorEmail: string,                  // Privado (hidden)
  message: string,                      // El comentario
  isAnonymous: boolean,                 // Si mostrar como "Anónimo"
  status: 'pending' | 'approved' | 'rejected',
  rejectionReason?: string,             // Opcional
  _createdAt: string,                   // Auto
}
```

### Queries GROQ

```groq
# Obtener aprobadas
*[_type == "review" && status == "approved"] | order(_createdAt desc)

# Contar pendientes
*[_type == "review" && status == "pending"] | length

# Filtrar por autor
*[_type == "review" && authorEmail == "user@example.com"]
```

---

## 🔐 Seguridad

### Validación Multi-Nivel
```
Cliente (Zod) ➜ Servidor (Zod) ➜ Sanity/Gmail
```

### Datos Privados
- ❌ Email del usuario: No en GET /api/reviews
- ❌ Email del propietario: Variables de entorno
- ❌ API tokens: Variables de entorno
- ✅ Moderación: Reseñas esperan aprobación

---

## 📦 Archivos Creados

```
src/components/sections/Contact/
├── Contact.astro                  # Contenedor
├── Contact.module.css             # Estilos container
├── ContactForm.tsx                # Formulario React
├── ContactForm.module.css         # Estilos formulario
├── ReviewsList.tsx                # Lista reseñas React
├── ReviewsList.module.css         # Estilos lista
└── index.ts                       # Barrel export

src/pages/api/
├── contact.ts                     # POST /api/contact
└── reviews.ts                     # GET/POST /api/reviews

src/data/
├── types.ts                       # Review interfaces (actualizado)
├── sanity.client.ts               # Cliente Sanity con fallback
└── personal.ts                    # (referenciado)

src/pages/
└── index.astro                    # (actualizado)

docs/
├── SETUP_CONTACT_SECTION.md       # Guía instalación
├── SANITY_SCHEMA_REVIEW.ts        # Schema Sanity
└── CONTACT_ARCHITECTURE.md        # Este archivo
```

---

## 🎨 Diseño

### Colores
```css
--color-accent-primary: #8b5cf6     /* Morado */
--color-accent-secondary: #d946ef   /* Magenta */
--color-accent-pink: #ec4899        /* Rosa */
--background-dark: #151a33          /* Fondo */
```

### Responsive
- Desktop: 2 columnas (Form | Reviews)
- Móvil: 1 columna (Form, luego Reviews)
- Breakpoint: 768px

---

## 🚀 Características Implementadas

✅ Formulario de contacto con email  
✅ Sistema de reseñas anónimas  
✅ Validación en cliente y servidor  
✅ Integración Sanity CMS  
✅ Diseño responsive  
✅ Animaciones smooth  
✅ Error handling robusto  
✅ Fallback cuando Sanity no está configurado  

---

## ⚙️ Variables de Entorno Requeridas

```env
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
ADMIN_EMAIL=tu-email@gmail.com

SANITY_PROJECT_ID=xxx
SANITY_DATASET=production
SANITY_API_TOKEN=sk-xxx...
SANITY_STUDIO_URL=https://...
```

Ver: `docs/SETUP_CONTACT_SECTION.md` para instalación completa.

---

**Arquitectura Creada**: Enero 2026  
**Stack**: Astro 5.16 + React + Sanity + Nodemailer  
