# Invitación Digital de Boda — María y Juan

Invitación web construida con **Astro**, replicando fielmente las dos
referencias visuales: una portada tipo "Save the Date" con cuenta regresiva,
y una sección de sobre/carta + confirmación de asistencia.

Sitio 100% estático, sin backend propio: el RSVP se guarda en **Google
Sheets** mediante **Google Apps Script**.

---

## 1. Instalar y ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

```bash
npm run build      # genera dist/
npm run preview    # previsualiza el build
```

---

## 2. Estructura del proyecto

```
src/
├── components/
│   ├── Hero.astro       Portada: SAVE THE DATE + nombres + fecha + countdown
│   ├── Countdown.astro  Cuenta regresiva funcional
│   ├── Envelope.astro   Sobre + carta romántica
│   └── RSVPForm.astro   Formulario de confirmación → Google Sheets
├── layouts/
│   └── Layout.astro     <head>: SEO, Open Graph, fuentes, favicon
├── config/
│   └── wedding.ts        ÚNICO archivo con los datos de la boda
├── styles/
│   └── global.css        Tokens de diseño (color, tipografía)
├── scripts/
│   └── reveal.ts          (utilidad de animación, no usada en esta versión)
└── pages/
    └── index.astro        Ensambla Hero + escena (sobre + RSVP)

google-apps-script/
└── Code.gs                Recibe el RSVP y lo guarda en Sheets

public/
├── images/
│   ├── hero.jpg            Foto de portada (pareja)
│   └── garden-bg.jpg       Foto de fondo del sobre / RSVP
├── favicon.svg
└── og-image.jpg            Preview para WhatsApp/Facebook
```

---

## 3. Personalizar — `src/config/wedding.ts`

Todo el contenido vive en este archivo:

- `couple` — nombres de la pareja
- `date` / `displayDate` — fecha (alimenta la cuenta regresiva)
- `hero.image.src` — foto de portada
- `story.introLine` / `bodyLine1` / `bodyLine2` — texto de la carta
- `story.backgroundImage.src` — foto de fondo del sobre/RSVP
- `countdown` — etiquetas de la cuenta regresiva
- `rsvp` — textos del formulario y `googleScriptUrl`
- `seo` — título, descripción y datos de Open Graph

### Cambiar fotografías

Sustituye los archivos en `public/images/` (mismo nombre) o cambia las rutas
en `wedding.ts`.

---

## 4. Configurar Google Sheets + Google Apps Script (RSVP)

1. Crea un Google Sheet nuevo.
  - Copia el ID del archivo desde su URL: `https://docs.google.com/spreadsheets/d/ID_DEL_ARCHIVO/edit`.
2. `Extensiones → Apps Script`.
3. Borra el contenido de `Code.gs` y pega el contenido completo de
   [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
4. Guarda el proyecto.
5. `Implementar → Nueva implementación → Aplicación web`:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
6. Autoriza los permisos la primera vez que se solicite.
7. Copia la URL de la Web App (termina en `/exec`).
8. Pégala en `src/config/wedding.ts`:

```ts
rsvp: {
  googleScriptUrl: 'https://script.google.com/macros/s/XXXXXXXX/exec',
}
```

En `google-apps-script/Code.gs`, reemplaza también:

```js
const SPREADSHEET_ID = 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET';
```

por el ID real del Google Sheet. El script guardará las respuestas en la
pestaña `RSVP` de ese archivo. La cuenta que ejecuta la implementación debe
tener permiso de edición sobre el Sheet.

9. `npm run build` y vuelve a desplegar.

El script crea automáticamente una hoja **RSVP** con las columnas: `Fecha`,
`Nombre`, `Asistencia`, `Acompañante`.

El formulario usa `fetch(..., { mode: 'no-cors' })` porque Apps Script no
siempre expone cabeceras CORS legibles; si la petición llega al servidor se
considera exitosa. El botón se deshabilita mientras envía, para evitar doble
envío.

---

## 5. SEO y preview de WhatsApp

`Layout.astro` ya incluye `<title>`, `meta description`, Open Graph y Twitter
Card, todos configurables desde `wedding.ts`. Reemplaza
`public/og-image.jpg` (1200×630px) por tu imagen final, y configura tu
dominio en `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://tu-dominio.com',
});
```

---

## 6. Desplegar

Proyecto estático (`output: 'static'`): funciona en Vercel, Netlify,
Cloudflare Pages, GitHub Pages, o cualquier hosting estático.

```bash
npm run build
```

Sube el contenido de `dist/`. Comando de build: `npm run build` — carpeta de
salida: `dist`.

---

## 7. Reutilizar como plantilla

1. Duplica el proyecto.
2. Edita `src/config/wedding.ts` con los nuevos datos.
3. Reemplaza `public/images/hero.jpg` y `public/images/garden-bg.jpg`.
4. Crea un nuevo Google Sheet + Apps Script y actualiza `rsvp.googleScriptUrl`.
5. Reemplaza `public/og-image.jpg` y el `site` en `astro.config.mjs`.
6. Despliega.

No es necesario tocar los componentes.
