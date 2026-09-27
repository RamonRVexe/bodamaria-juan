/**
 * ============================================================
 * CONFIGURACIÓN CENTRAL DE LA BODA
 * ============================================================
 * Único archivo que necesitas editar para adaptar esta invitación
 * a otra pareja / evento. Los componentes no tienen texto,
 * fechas ni enlaces "quemados": todos leen de aquí.
 * ============================================================
 */

export const wedding = {
  couple: {
    bride: 'María',
    groom: 'Juan',
    displayNames: 'María y Juan',
  },

  // Formato ISO 8601 con zona horaria. Fuente de verdad de la cuenta regresiva.
  date: '2026-11-21T17:00:00-07:00',
  displayDate: '21 NOVIEMBRE 2026',

  hero: {
    eyebrowLine1: 'SAVE',
    eyebrowLine2: 'THE DATE',
    image: {
      src: '/images/hero.jpg',
      alt: 'María y Juan tomados de la mano al atardecer',
    },
  },

  story: {
    introLine: 'Dos corazones, una historia y un amor para toda la vida...',
    bodyLine1:
      'Con mucha ilusión queremos compartir contigo uno de los días más ' +
      'importantes de nuestras vidas.',
    bodyLine2:
      'Reserva esta fecha para celebrar junto a nosotros el comienzo de una ' +
      'nueva etapa llena de amor, sueños y momentos inolvidables.',
    backgroundImage: {
      src: '/images/garden-bg.jpg',
      alt: 'Jardín al atardecer',
    },
  },

  countdown: {
    label: 'Faltan',
    completeMessage: '¡Hoy es el gran día!',
    units: {
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
    },
  },

  rsvp: {
    title: 'Confirmación de asistencia',
    nameLabel: 'Nombre',
    attendanceQuestion: '¿Podrás asistir?',
    attendanceOptions: ['Sí, definitivamente.', 'No, lo siento.'],
    companionQuestion: '¿Con 1 persona de acompañante?',
    companionOptions: ['Sí, claro!', 'No, quiero conocer nuevas personas.'],
    submitLabel: 'Enviar',
    // Pega aquí la URL de tu Web App de Google Apps Script.
    // Ver /google-apps-script/Code.gs y el README para la guía completa.
    googleScriptUrl: 'https://script.google.com/macros/s/AKfycbzKX5pbvgIKHZGeJpB94bB-fDnYKbc9DG7iiRFMLTUDZDUL_eWtQmvWUI1Snu1s48Ne/exec',
    successMessage: '¡Gracias por confirmar tu asistencia!',
    errorMessage: 'No pudimos enviar tu confirmación. Intenta de nuevo.',
  },

  seo: {
    title: 'María & Juan — 21 de noviembre de 2026',
    description:
      'Nos casamos y queremos que seas parte de este día. Descubre todos los detalles de nuestra boda y confirma tu asistencia.',
    ogImage: '/og-image.jpg',
    locale: 'es_MX',
    themeColor: '#3F4632',
  },
} as const;

export type WeddingConfig = typeof wedding;
