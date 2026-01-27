# 📋 Guía de Instalación: Sección de Contacto + Reseñas

## ✅ Qué se implementó

Una sección completa de **Contacto + Comunidad** con:

1. **Formulario de Contacto**: Envía emails directamente a tu bandeja
2. **Sistema de Reseñas Anónimas**: Los usuarios pueden comentar de forma segura
3. **Validación en Cliente y Servidor**: Seguridad robusta
4. **Integración con Sanity CMS**: Almacenamiento y moderación de reseñas
5. **Diseño Consistente**: Colores morados/rosas de tu portafolio

---

## 🔧 PASO 1: Configurar Variables de Entorno

### 1.1 Gmail (Para Envío de Emails)

Para usar Gmail de forma segura:

1. **Habilita 2FA en tu cuenta Google**:
   - Ve a [myaccount.google.com](https://myaccount.google.com)
   - Security > 2-Step Verification

2. **Crea una contraseña de aplicación**:
   - Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Selecciona: **Mail** y **Windows Computer** (o tu dispositivo)
   - Google generará una contraseña de **16 caracteres**
   - Cópiala (sin espacios)

3. **Configura el archivo `.env.local`**:

```env
# Email (Gmail)
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  # Sin espacios: xxxxxxxxxxxxxxxx
ADMIN_EMAIL=tu-email@gmail.com
```

### 1.2 Sanity CMS (Para Almacenar Reseñas)

1. **Obtén tus credenciales de Sanity**:
   - Ve a tu proyecto en [sanity.io](https://sanity.io)
   - Settings > API > Tokens
   - Crea un nuevo token con permisos de **lectura y escritura**
   - Copia el token

2. **Obtén tu Project ID**:
   - Settings > General > Project ID

3. **Configura el archivo `.env.local`**:

```env
# Sanity CMS
SANITY_PROJECT_ID=tu-project-id
SANITY_DATASET=production  # O el que uses
SANITY_API_TOKEN=tu-token-completo
SANITY_STUDIO_URL=https://tu-studio.sanity.studio
```

**Archivo completo `.env.local`**:

```env
# Gmail Configuration
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
ADMIN_EMAIL=tu-email@gmail.com

# Sanity CMS
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production
SANITY_API_TOKEN=sk-abc123xyz...
SANITY_STUDIO_URL=https://your-studio.sanity.studio
```

---

## 🎯 PASO 2: Configurar Sanity CMS

### 2.1 Crear el Schema en Sanity Studio

1. **Abre tu Sanity Studio** en local o en línea

2. **Crea el archivo `sanity/schemas/review.ts`** (o similar):
   ```
   sanity/
   └── schemas/
       └── review.ts
   ```

3. **Copia el contenido** del archivo `docs/SANITY_SCHEMA_REVIEW.ts` en este proyecto
   - El archivo está en: `docs/SANITY_SCHEMA_REVIEW.ts`
   - Cópialo completo a `sanity/schemas/review.ts`

4. **Actualiza `sanity/schemaTypes/index.ts`**:

```typescript
import review from '../schemas/review'

export const schemaTypes = [
  // tus otros schemas...
  review
]
```

5. **Deploy tu Sanity Studio**:
```bash
cd sanity
sanity deploy
```

### 2.2 Verifica en tu Sanity Studio

- Deberías ver una nueva sección: **Reviews / Comentarios** 📋
- Intenta crear un documento de prueba manualmente

---

## 🚀 PASO 3: Ejecutar el Proyecto

### 3.1 Instala las dependencias (ya hecho):

```bash
pnpm install
```

### 3.2 Arranca el servidor de desarrollo:

```bash
pnpm dev
```

Abre `http://localhost:3000` en tu navegador.

### 3.3 Prueba el Formulario

1. **Sección Contacto**: Desplázate hasta **"Conectemos & Comparte"**
2. **Pestaña "Contacto"**: Completa el formulario
   - Deberías recibir un email en tu bandeja (revisa spam)
3. **Pestaña "Reseña"**: Envía una reseña
   - Se guardará como "pending" en Sanity
   - Ve a tu Sanity Studio y apruébala

---

## 📱 Estructura de Archivos Creados

```
src/
├── components/
│   └── sections/
│       └── Contact/
│           ├── Contact.astro              # Componente principal
│           ├── Contact.module.css         # Estilos del container
│           ├── ContactForm.tsx            # Formulario (React)
│           ├── ContactForm.module.css     # Estilos del formulario
│           ├── ReviewsList.tsx            # Lista de reseñas (React)
│           ├── ReviewsList.module.css     # Estilos de reseñas
│           └── index.ts                   # Barrel export
├── pages/
│   └── api/
│       ├── contact.ts                     # API: Enviar emails
│       └── reviews.ts                     # API: Crear/obtener reseñas
├── data/
│   ├── types.ts                          # Tipos TypeScript (actualizado)
│   └── sanity.client.ts                  # Cliente de Sanity
└── pages/
    └── index.astro                       # Index actualizado

docs/
└── SANITY_SCHEMA_REVIEW.ts              # Schema para Sanity
```

---

## 🎨 Personalización de Colores

Los colores ya coinciden con tu portafolio:
- **Primario**: Morado/Violeta (`#8b5cf6`)
- **Secundario**: Rosa/Magenta (`#d946ef`, `#ec4899`)
- **Fondo**: Oscuro (`#151a33`)

**Para cambiar**, edita:
- `src/components/sections/Contact/Contact.module.css`
- `src/components/sections/Contact/ContactForm.module.css`
- `src/components/sections/Contact/ReviewsList.module.css`

Busca las líneas con `#8b5cf6` y reemplaza con tu color.

---

## 🔒 Seguridad

### Validación Implementada:
- ✅ Validación en cliente (Zod)
- ✅ Validación en servidor (Zod)
- ✅ Tokens de API privados (en `.env`)
- ✅ Emails privados (no se muestran en reseñas)
- ✅ Moderación en Sanity (pending → approved)

### Buenas Prácticas:
- Las variables de entorno nunca se exponencarian al cliente
- Los tokens se validan en el servidor
- Las reseñas esperan aprobación antes de publicarse

---

## 🐛 Troubleshooting

### "No me llegan los emails"
1. Revisa la carpeta **Spam/Promociones** de Gmail
2. Asegúrate de que `GMAIL_APP_PASSWORD` no tenga espacios
3. Revisa que 2FA esté habilitado en tu cuenta Google

### "Error al conectar con Sanity"
1. Verifica que `SANITY_PROJECT_ID` es correcto
2. Verifica que `SANITY_API_TOKEN` tiene permisos de lectura/escritura
3. Revisa los logs en `pnpm dev` para errores específicos

### "Las reseñas no aparecen"
1. En Sanity Studio, verifica que el status sea `"approved"`
2. Revisa que el schema esté correctamente instalado
3. Recarga la página (`F5`)

---

## 📚 Próximos Pasos

### Opcional: Agregar WebSockets en el Futuro
Si en algún momento necesitás comentarios **en tiempo real**, podemos agregar:
- Socket.io para actualizaciones live
- Notificaciones cuando alguien comenta

### Opcional: Más Funcionalidades
- Respuestas a comentarios
- Sistema de "Me gusta"
- Threading de conversaciones

---

## 🎓 Cómo Funciona

### Flujo de Contacto:
```
Usuario completa formulario
        ↓
Validación en cliente
        ↓
POST /api/contact
        ↓
Validación en servidor
        ↓
Envía email con Nodemailer
        ↓
Respuesta al usuario
```

### Flujo de Reseña:
```
Usuario escribe reseña
        ↓
Validación en cliente
        ↓
POST /api/reviews
        ↓
Validación en servidor
        ↓
Crea documento en Sanity (pending)
        ↓
Tu aprobas en Sanity Studio
        ↓
GET /api/reviews → Se muestra en el sitio
```

---

## 📞 Soporte

Si algo no funciona:
1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor (`pnpm dev`)
3. Verifica las variables de entorno están correctas
4. Comprueba que Sanity y Gmail están configurados

---

**¡Listo! 🎉 Tu sección de contacto está lista para usar.**
