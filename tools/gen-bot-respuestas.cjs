// Genera netlify/functions/respuestas.json para el bot de WhatsApp, bilingüe.
// ES: se toma del Banco de Respuestas ya revisado a mano (vault, fuente de verdad para humanos).
// EN: se genera directo de catalogo.astro + products.ts (mismo patrón, sin doc humano en inglés
//     todavía — es solo para que el bot responda en el idioma en que la persona navegó el sitio).
// Ejecutar tras regenerar/editar el banco o el catálogo: node tools/gen-bot-respuestas.cjs
const fs = require('fs');
const BANCO = 'C:/Users/emigo/OneDrive/Documents/General Brain/03-LINEA-A/propuestas/Banco_Respuestas_WhatsApp.md';
const OUT = 'netlify/functions/respuestas.json';

const md = fs.readFileSync(BANCO, 'utf8');
const cat = fs.readFileSync('src/pages/catalogo.astro', 'utf8');
const prods = fs.readFileSync('src/data/products.ts', 'utf8');

const out = { productos: {}, base: {} };

// ES: bloque "Origen: `web/producto/<slug>`" seguido de su blockquote, ya revisado a mano.
for (const m of md.matchAll(/Origen: `web\/producto\/([a-z0-9-]+)`[^\n]*\n\n> ([^\n]+)/g)) {
  out.productos[m[1]] = { es: m[2].trim() };
}
const baseEs = (label) => {
  const m = md.match(new RegExp(`\\*\\*${label}[^\\n]*\\n> ([^\\n]+)`));
  return m ? m[1].trim() : null;
};
out.base.bienvenida = baseEs('Mensaje de bienvenida');
out.base.ausencia = baseEs('Mensaje de ausencia');
out.base.cierre = { es: baseEs('Cierre universal') };

// EN: uno-liner bilingüe de catalogo.astro + deliverables bilingües de products.ts.
const oneLiner = {}; // slug -> {es, en}
for (const m of cat.matchAll(/\{ slug: '([a-z0-9-]+)', n: \{ es: '((?:[^'\\]|\\.)+)', en: '((?:[^'\\]|\\.)+)' \}, d: \{ es: '((?:[^'\\]|\\.)+)', en: '((?:[^'\\]|\\.)+)' \}/g)) {
  oneLiner[m[1]] = { name_en: m[3].replace(/\\'/g, "'"), d_en: m[5].replace(/\\'/g, "'") };
}
const deliverablesEn = {};
prods.split(/\n  \{\n    slug: /).slice(1).forEach((block) => {
  const slug = block.match(/^'([a-z0-9-]+)'/)[1];
  const dm = block.match(/deliverables: \[([\s\S]*?)\n    \]/);
  if (dm) {
    const items = [...dm[1].matchAll(/B\('(?:[^'\\]|\\.)+',\s*'((?:[^'\\]|\\.)+)'\)/g)].map((x) => x[1].replace(/\\'/g, "'"));
    deliverablesEn[slug] = items.slice(0, 3);
  }
});
const ACRONYMS = { crm: 'CRM', seo: 'SEO', ai: 'AI', pdf: 'PDF', ruc: 'RUC', sas: 'SAS', iess: 'IESS', sri: 'SRI', kpi: 'KPI', kpis: 'KPIs', roi: 'ROI', faq: 'FAQ' };
const fixAcronyms = (s) => s.replace(/\b([a-z]+)\b/g, (w) => ACRONYMS[w] || w);

for (const slug of Object.keys(out.productos)) {
  const ol = oneLiner[slug];
  if (!ol) continue; // producto sin entrada en catalogo.astro (no debería pasar, los 47 están ahí)
  const dv = deliverablesEn[slug] || [];
  let en = `Hi! 👋 Thanks for reaching out from our **${ol.name_en}** page. ${ol.d_en} `;
  if (dv.length) en += `This includes, among other things: ${fixAcronyms(dv.map((x) => x.toLowerCase()).join(', '))}. `;
  en += `Here's how we work: first a free 30-minute diagnosis to understand your case, then we send you a proposal tailored to it, and once approved we build it and deliver it working. Should I schedule the free diagnosis, or would you rather go straight to the proposal?`;
  out.productos[slug].en = en;
}
out.base.cierre.en = "I suggest the simplest thing: a free 30-minute diagnosis where we tell you what you need — and what you don't. No strings attached. Should I schedule it?";

// mapa quiz → producto (los 4 dolores de la home)
out.quiz = {
  'no-me-encuentran': 'pagina-web',
  'no-alcanzo-responder': 'asistente-inteligente-whatsapp',
  'marca-improvisada': 'identidad-de-marca',
  'apagando-incendios': 'sistema-operativo',
};

fs.mkdirSync('netlify/functions', { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const total = Object.keys(out.productos).length;
const conEn = Object.values(out.productos).filter((p) => p.en).length;
console.log('productos:', total, '| con ingles:', conEn, '| base ok:', !!(out.base.bienvenida && out.base.cierre.es && out.base.cierre.en));
