import { defineConfig } from 'astro/config';

// Cambia "site" por tu dominio final antes de desplegar.
// Es importante para que el Open Graph (preview de WhatsApp) genere URLs absolutas correctas.
export default defineConfig({
  site: 'https://mariayjuan.mx',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
