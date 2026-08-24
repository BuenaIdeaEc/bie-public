// BIE — Regenera el Banco de Respuestas Comerciales de WhatsApp desde el código del sitio.
// Fuentes: src/pages/catalogo.astro (fases, nombres, one-liners) y src/data/products.ts (entregables).
// Salida: General Brain/03-LINEA-A/propuestas/Banco_Respuestas_WhatsApp.md
// Ejecutar desde la raíz del repo: node tools/gen-banco-whatsapp.cjs
// Tras regenerar: revisar tildes/siglas en las líneas nuevas (la generación normaliza a minúsculas).
const fs = require('fs');

const cat = fs.readFileSync('src/pages/catalogo.astro', 'utf8');
const prods = fs.readFileSync('src/data/products.ts', 'utf8');
const OUT = 'C:/Users/emigo/OneDrive/Documents/General Brain/03-LINEA-A/propuestas/Banco_Respuestas_WhatsApp.md';

const deliv = {};
prods.split(/\n  \{\n    slug: /).slice(1).forEach(block => {
  const slug = block.match(/^'([a-z0-9-]+)'/)[1];
  const dm = block.match(/deliverables: \[([\s\S]*?)\n    \]/);
  if (dm) {
    const items = [...dm[1].matchAll(/B\('((?:[^'\\]|\\.)+)'/g)].map(m => m[1].replace(/\\'/g, "'"));
    deliv[slug] = items.slice(0, 3);
  }
});

const phases = [...cat.matchAll(/\{ num: '(\d+)', title: \{ es: '((?:[^'\\]|\\.)+)'[\s\S]*?products: \[([\s\S]*?)\n  \] \}/g)].map(m => ({
  num: m[1], title: m[2].replace(/\\'/g, "'"),
  products: [...m[3].matchAll(/\{ slug: '([a-z0-9-]+)', n: \{ es: '((?:[^'\\]|\\.)+)',[\s\S]*?d: \{ es: '((?:[^'\\]|\\.)+)',/g)]
    .map(p => ({ slug: p[1], name: p[2].replace(/\\'/g, "'"), d: p[3].replace(/\\'/g, "'") })),
}));

const total = phases.reduce((a, f) => a + f.products.length, 0);
console.log('phases:', phases.length, 'products:', total);

const used = new Set();
const uniqueShortcut = (slug) => {
  let s = '/' + slug.split('-').map(w => w[0]).join('').slice(0, 4); let i = 2;
  while (used.has(s)) { s = s + i++; }
  used.add(s); return s;
};

const fecha = process.argv[2] || 'FECHA';
let out = `# Banco de Respuestas Comerciales de WhatsApp — Línea A

> Fuente: fichas publicadas en businessintelligence.solutions (generado desde el código del sitio el ${fecha}).
> Uso: cada lead que llega por la web trae su origen al final del mensaje ("— Origen: web/producto/<slug>/..." o "web/home/quiz/<dolor>" o "web/catalogo/<slug>").
> Buscar el producto por ese slug y responder con su propuesta. Regla: responder en menos de 5 minutos y cerrar SIEMPRE con la pregunta de cierre.
> Los emojis de estos mensajes son parte del contenido a enviar (excepción permitida del vault).

## Protocolo de respuesta

1. Leer el origen del mensaje: dice exactamente qué página o dolor trajo al lead.
2. Responder con la propuesta del producto correspondiente (abajo), personalizando el saludo con el nombre si lo dio.
3. Si el origen es un dolor del quiz (web/home/quiz/...), usar la propuesta del producto que el quiz recomienda.
4. Si pide precio: dar el rango del catálogo maestro por llamada o mensaje de voz, nunca por escrito público, y ofrecer el diagnóstico gratuito para afinar.
5. Registrar el lead y su origen en 03-LINEA-A/leads/.

## Mensajes base (configurar en WhatsApp Business > Herramientas de empresa)

**Mensaje de bienvenida (fuera del flujo o primer contacto):**
> ¡Hola! 👋 Somos BIE. Gracias por escribirnos. Cuéntanos en una frase qué necesita tu empresa — o si vienes de nuestra página web, ya vimos qué te interesa y te respondemos en minutos.

**Mensaje de ausencia (fuera de horario):**
> ¡Hola! 👋 Recibimos tu mensaje. Nuestro equipo te responde mañana a primera hora. Si quieres adelantar, cuéntanos: ¿qué está pasando en tu negocio que quieres resolver?

**Cierre universal (cuando dudan):**
> Te propongo lo más simple: un diagnóstico gratuito de 30 minutos donde te decimos qué necesitas y qué no. Sin compromiso. ¿Te agendo?

`;

for (const f of phases) {
  out += `\n---\n\n## Fase ${f.num} — ${f.title}\n`;
  for (const p of f.products) {
    const dv = deliv[p.slug] || [];
    const atajo = uniqueShortcut(p.slug);
    out += `\n### ${p.name}\nOrigen: \`web/producto/${p.slug}\` · Atajo sugerido: \`${atajo}\`\n\n`;
    out += `> ¡Hola! 👋 Gracias por escribirnos desde la página de **${p.name}**. ${p.d} `;
    if (dv.length) out += `Con este producto recibes, entre otras cosas: ${dv.map(x => x.toLowerCase()).join(', ')}. `;
    out += `Trabajamos así: primero un diagnóstico gratuito de 30 minutos para entender tu caso, luego te pasamos la propuesta a tu medida, y una vez aprobada lo construimos y te lo entregamos funcionando. ¿Te agendo el diagnóstico gratuito o prefieres que conversemos la propuesta directo?\n`;
  }
}

out += `\n---\n\n## Configuración de respuestas rápidas (WhatsApp Business, gratis)

En WhatsApp Business: Herramientas de empresa > Respuestas rápidas > Nueva. Pegar cada mensaje de arriba con su atajo. Al escribir "/" en un chat aparecen todas; con el atajo se inserta la propuesta completa en un segundo.

## Productización

Este banco es el insumo directo del futuro asistente 24/7 del propio BIE (AGENDA 153): cuando se construya el bot, estas respuestas son su entrenamiento inicial, ya validadas por uso real. Registrar en 03-LINEA-A/leads/ qué respuestas convierten mejor para iterar el texto (principio de iteración comercial).
`;

fs.writeFileSync(OUT, out);
console.log('doc written,', (out.match(/^### /gm) || []).length, 'productos →', OUT);
