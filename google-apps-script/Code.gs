/**
 * ============================================================
 * Google Apps Script — Endpoint RSVP para invitación de boda
 * ============================================================
 * Recibe un POST desde el formulario RSVPForm.astro y guarda
 * cada respuesta como una nueva fila en Google Sheets.
 *
 * INSTALACIÓN — ver README.md para la guía paso a paso completa.
 * Resumen:
 *   1. Crea un Google Sheet nuevo.
 *   2. Extensiones → Apps Script.
 *   3. Borra el contenido del editor y pega este archivo completo.
 *   4. Implementar → Nueva implementación → Aplicación web.
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquier usuario
 *   5. Copia la URL de la Web App y pégala en
 *      src/config/wedding.ts -> rsvp.googleScriptUrl
 * ============================================================
 */

// ID del archivo de Google Sheets donde se guardaran las respuestas.
// Se encuentra en la URL: /spreadsheets/d/ESTE_ID/edit
const SPREADSHEET_ID = 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET';
const SHEET_NAME = 'RSVP';

const HEADERS = ['Fecha', 'Nombre', 'Asistencia', 'Acompañante'];

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({ ok: false, error: 'Sin datos recibidos.' });
    }

    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    const fecha = data.fechaRegistro
      ? new Date(data.fechaRegistro)
      : new Date();

    sheet.appendRow([
      fecha,
      data.nombre || '',
      data.asistencia || '',
      data.acompanante || '',
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  // Endpoint de verificación rápida: abre la URL en el navegador
  // para confirmar que el deploy está activo.
  return ContentService.createTextOutput(
    'El endpoint RSVP está activo. Usa POST para enviar confirmaciones.'
  ).setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
