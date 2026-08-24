// Convierte el Banco de Respuestas (vault, ya revisado) en el JSON que usa el bot de WhatsApp.
// Ejecutar tras regenerar/editar el banco: node tools/gen-bot-respuestas.cjs
const fs = require('fs');
const SRC = 'C:/Users/emigo/OneDrive/Documents/General Brain/03-LINEA-A/propuestas/Banco_Respuestas_WhatsApp.md';
const OUT = 'netlify/functions/respuestas.json';

const md = fs.readFileSync(SRC, 'utf8');
const out = { productos: {}, base: {} };

// propuestas por producto: bloque "Origen: `web/producto/<slug>`" seguido de su blockquote
for (const m of md.matchAll(/Origen: `web\/producto\/([a-z0-9-]+)`[^\n]*\n\n> ([^\n]+)/g)) {
  out.productos[m[1]] = m[2].trim();
}
// mensajes base
const base = (label) => {
  const m = md.match(new RegExp(`\\*\\*${label}[^\\n]*\\n> ([^\\n]+)`));
  return m ? m[1].trim() : null;
};
out.base.bienvenida = base('Mensaje de bienvenida');
out.base.ausencia = base('Mensaje de ausencia');
out.base.cierre = base('Cierre universal');

// mapa quiz → producto (los 4 dolores de la home)
out.quiz = {
  'no-me-encuentran': 'pagina-web',
  'no-alcanzo-responder': 'asistente-inteligente-whatsapp',
  'marca-improvisada': 'identidad-de-marca',
  'apagando-incendios': 'sistema-operativo',
};

fs.mkdirSync('netlify/functions', { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log('productos:', Object.keys(out.productos).length, '| base ok:', !!(out.base.bienvenida && out.base.cierre));
