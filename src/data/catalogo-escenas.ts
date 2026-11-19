// Galería del catálogo: una escena animada por producto (HTML + CSS, sin fotos de IA).
// Cada escena muestra el producto funcionando con el nombre genérico «Tu negocio».
// Los textos van en español; el inglés viaja en data-en y lo cambia el botón EN de la página.
// Las cifras son de ejemplo, como en una maqueta: no describen a ningún cliente.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
/** Texto bilingüe: español visible, inglés en data-en. */
const t = (es: string, en = es) => en === es ? es : `<span data-en="${esc(en)}">${es}</span>`;
const d = (s: number) => `style="--d:${s}s"`;
const win = (title: string, body: string, cls = '') => `<div class="s-win ${cls}"><div class="s-bar"><i></i><i></i><i></i><b>${title}</b></div>${body}</div>`;

// ── piezas por tipo de producto ──

function informe(titulo: [string, string], filas: [string, string, number][], nota: [string, string]) {
  const rows = filas.map(([es, en, p], i) => `<li ${d(.25 + i * .18)}><span>${t(es, en)}</span><em><i style="--p:${p}"></i></em></li>`).join('');
  return win(t(titulo[0], titulo[1]), `<ul class="s-rows">${rows}</ul><p class="s-flag" ${d(1.2)}>${t(nota[0], nota[1])}</p>`, 's-doc');
}

function mapaPos() {
  const dots = [[22, 30], [34, 62], [62, 70], [70, 38], [48, 44]].map(([x, y], i) => `<i class="s-dot" style="left:${x}%;top:${y}%;--d:${.2 + i * .1}s"></i>`).join('');
  return `<div class="s-plot s-win"><span class="s-ax s-axy">${t('Precio', 'Price')}</span><span class="s-ax s-axx">${t('Calidad', 'Quality')}</span>${dots}<i class="s-free"></i><b class="s-you">${t('Tú', 'You')}</b></div>`;
}

function circulos() {
  return `<div class="s-circ"><i class="c1" ${d(.1)}></i><i class="c2" ${d(.35)}></i><i class="c3" ${d(.6)}></i>
  <span class="l1">${t('Mercado total', 'Total market')}</span><span class="l2">${t('Al que llegas', 'Reachable')}</span><span class="l3">${t('Tu parte', 'Your share')}</span></div>`;
}

function chatScan() {
  return win(t('Chats de la semana', "This week's chats"), `<div class="s-chat s-scan">
  <p class="in" ${d(.1)}>${t('¿Precio del combo?', 'Combo price?')}</p>
  <p class="out" ${d(.3)}>${t('USD 12, con envío', 'USD 12, with delivery')}</p>
  <p class="in" ${d(.5)}>${t('¿Y si son 3?', 'And for 3?')}</p>
  <p class="gap" ${d(.9)}>${t('Sin respuesta · 6 h', 'No reply · 6 h')}</p>
  <p class="s-flag" ${d(1.4)}>${t('Aquí se fue el cliente', 'This is where the customer left')}</p></div>`);
}

function organigrama() {
  const n = (es: string, en: string, x: number, y: number, dl: number, cls = '') => `<b class="s-node ${cls}" style="left:${x}%;top:${y}%;--d:${dl}s">${t(es, en)}</b>`;
  return `<div class="s-org"><svg viewBox="0 0 100 75" preserveAspectRatio="none"><path pathLength="1" d="M50 22 V36 M20 36 H80 M20 36 V48 M50 36 V48 M80 36 V48"/></svg>
  ${n('Dueño', 'Owner', 50, 16, .1, 'k')}${n('Ventas', 'Sales', 20, 56, .7)}${n('Operación', 'Operations', 50, 56, .85)}${n('Finanzas', 'Finance', 80, 56, 1)}</div>`;
}

function margen() {
  return win(t('Este mes', 'This month'), `<div class="s-pl"><ul>
  <li ${d(.2)}><span>${t('Ventas', 'Sales')}</span><b>4.800</b></li>
  <li ${d(.4)}><span>${t('Costos', 'Costs')}</span><b>−3.260</b></li>
  <li class="tot" ${d(.6)}><span>${t('Te queda', 'You keep')}</span><b>1.540</b></li></ul>
  <div class="s-ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9"/><circle class="v" cx="18" cy="18" r="15.9" pathLength="100" style="--v:32"/></svg><b>32 %</b><small>${t('margen', 'margin')}</small></div></div>`);
}

function contrato(titulo: [string, string], clausulas: [string, string][], firma = true) {
  const cl = clausulas.map(([es, en], i) => `<li ${d(.35 + i * .3)}><i>✓</i>${t(es, en)}</li>`).join('');
  return win(t(titulo[0], titulo[1]), `<div class="s-ct"><span class="ln w9"></span><span class="ln w7"></span><ul>${cl}</ul>${firma ? `<svg class="s-sign" viewBox="0 0 120 30"><path pathLength="1" d="M4 22 C14 4 22 4 24 18 S36 28 42 12 S56 4 60 20 S76 26 84 10 S100 8 116 18"/></svg><span class="s-sline">${t('Firma', 'Signature')}</span>` : ''}</div>`, 's-doc');
}

function marca() {
  return `<div class="s-brand"><div class="s-logo" ${d(.1)}><b>Tu</b><i></i></div>
  <ul class="s-pal"><li style="--c:#080808;--d:.5s"></li><li style="--c:#E53935;--d:.62s"></li><li style="--c:#d9d9d6;--d:.74s"></li><li style="--c:#fff;--d:.86s"></li></ul>
  <p class="s-type" ${d(1)}><b>Aa</b><span>${t('Letra de la marca', 'Brand typeface')}</span></p></div>`;
}

function calendario() {
  const dias = Array.from({ length: 28 }, (_, i) => {
    const k = { 2: 'r', 5: 'k', 9: 'g', 12: 'r', 16: 'k', 19: 'g', 23: 'r', 26: 'k' }[i];
    return k ? `<i class="c-${k}" style="--d:${(.2 + i * .04).toFixed(2)}s"></i>` : '<i></i>';
  }).join('');
  return win(t('Noviembre · contenidos', 'November · content'), `<div class="s-cal">${dias}</div><p class="s-leg"><span class="c-r">Reel</span><span class="c-k">Post</span><span class="c-g">${t('Historia', 'Story')}</span></p>`);
}

function feed() {
  const tiles = ['k', 'r', 'g', 'w', 'k', 'r', 'g', 'k', 'w'].map((c, i) => `<i class="f-${c}" style="--d:${.3 + i * .12}s"></i>`).join('');
  return `<div class="s-phone"><header><i>T</i><b>tunegocio</b></header><div class="s-grid">${tiles}</div><span class="s-heart">♥ 128</span></div>`;
}

function audio(tipo: 'jingle' | 'ambiente' | 'soundtrack' | 'sonora') {
  const eq = (n: number) => `<div class="s-eq">${Array.from({ length: n }, (_, i) => `<i style="--d:${(i * .07 % .9).toFixed(2)}s;--h:${30 + (i * 37 % 70)}%"></i>`).join('')}</div>`;
  if (tipo === 'sonora') {
    const row = (es: string, en: string, dur: string, dl: number) => `<li ${d(dl)}><b>▶</b><span>${t(es, en)}</span>${eq(14)}<em>${dur}</em></li>`;
    return win(t('Manual sonoro', 'Sound manual'), `<ul class="s-tracks">${row('Jingle', 'Jingle', '0:15', .1)}${row('Logo de audio', 'Audio logo', '0:03', .3)}${row('Ambiente', 'Ambience', '2:00 h', .5)}</ul>`);
  }
  if (tipo === 'soundtrack') {
    return win(t('Video · música original', 'Video · original music'), `<div class="s-tl"><div class="clips"><i ${d(.1)}></i><i ${d(.2)}></i><i ${d(.3)}></i><i ${d(.4)}></i></div>${eq(26)}<i class="s-head"></i></div>`);
  }
  const [es, en, dur] = tipo === 'jingle' ? ['Jingle de tu negocio', 'Your business jingle', '0:15'] : ['Ambiente para tu local', 'Music for your place', '2:00 h'];
  return `<div class="s-player s-win"><b class="s-play">▶</b><div><strong>${t(es, en)}</strong><small>${dur}</small></div>${eq(30)}<span class="s-prog"><i></i></span></div>`;
}

function ranking() {
  const r = [['Google', 92], ['Instagram', 74], ['WhatsApp', 66], ['TikTok', 38]] as [string, number][];
  return win(t('Dónde están tus clientes', 'Where your customers are'), `<ol class="s-rank">${r.map(([n, p], i) => `<li ${d(.2 + i * .15)}><b>${i + 1}</b><span>${n}</span><em><i style="--p:${p}"></i></em></li>`).join('')}</ol>`);
}

function dominio() {
  return `<div class="s-dom"><p class="s-url s-win"><i class="s-lock"></i><span class="s-typed">tunegocio.ec</span></p>
  <p class="s-mail s-win" ${d(1.4)}><b>@</b>hola@tunegocio.ec</p><p class="s-mail s-win" ${d(1.6)}><b>@</b>ventas@tunegocio.ec</p></div>`;
}

function captura(src: string, url: string, alt: string) {
  return `<div class="s-cap s-win"><div class="s-bar"><i></i><i></i><i></i><b>${url}</b></div><div class="s-img"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"></div></div>`;
}

function linkhub() {
  const b = [['Catálogo', 'Catalog'], ['WhatsApp', 'WhatsApp'], ['Instagram', 'Instagram'], ['Cómo llegar', 'Directions']].map(([es, en], i) => `<li ${d(.3 + i * .15)}>${t(es, en)}</li>`).join('');
  return `<div class="s-phone s-hub"><i class="s-av">T</i><b>Tu negocio</b><ul>${b}</ul></div>`;
}

function serp(ads: boolean) {
  const r = (dom: string, es: string, en: string, cls: string, dl: number) => `<li class="${cls}" ${d(dl)}><small>${dom}</small><b>${t(es, en)}</b><span class="ln w8"></span></li>`;
  const tu = r('tunegocio.ec', 'Tu negocio | Precios y pedidos', 'Your business | Prices and orders', 'yo', .2);
  return `<div class="s-serp s-win"><p class="s-q"><i></i>${t('panadería cerca de mí', 'bakery near me')}</p>
  <ul class="${ads ? 'ads' : 'seo'}">${ads ? tu.replace('<small>', `<small><em>${t('Patrocinado', 'Sponsored')}</em> `) : ''}${r('otranegocio.com', 'Otra panadería', 'Another bakery', 'o1', .35)}${r('directorio.ec', 'Las 10 mejores', 'Top 10', 'o2', .5)}${ads ? '' : tu}</ul>${ads ? `<span class="s-click" ${d(1.3)}>+ 37 ${t('clics hoy', 'clicks today')}</span>` : ''}</div>`;
}

function mapa() {
  return `<div class="s-map s-win"><div class="s-streets"><i class="s-pin"></i></div><div class="s-ficha" ${d(.9)}><b>Tu negocio</b><small><span class="s-stars">★★★★★</span> 4,9 · ${t('Abierto', 'Open')}</small><p><span>${t('Cómo llegar', 'Directions')}</span><span>${t('Llamar', 'Call')}</span></p></div></div>`;
}

function foto() {
  return `<div class="s-photo"><div class="pa"><i class="s-jar"></i><em>${t('Antes', 'Before')}</em></div><div class="pb"><i class="s-plinth"></i><i class="s-leaf"></i><i class="s-jar"></i><em>${t('Después', 'After')}</em></div><i class="s-wipe"></i></div>`;
}

function chat(q: [string, string], a: [string, string], hora: string, pie: [string, string]) {
  return win('Tu negocio', `<div class="s-chat"><p class="in" ${d(.15)}>${t(q[0], q[1])}<time>${hora}</time></p><p class="s-typing" ${d(.6)}><i></i><i></i><i></i></p><p class="out" ${d(1.5)}>${t(a[0], a[1])}<time>${hora}</time></p><p class="s-note" ${d(2)}>${t(pie[0], pie[1])}</p></div>`, 's-wa');
}

function kanban() {
  const col = (es: string, en: string, extra = '') => `<div><b>${t(es, en)}</b><i></i><i></i>${extra}</div>`;
  return win('CRM', `<div class="s-kb">${col('Nuevos', 'New')}${col('Conversando', 'Talking')}${col('Cerrados', 'Won', '<i></i>')}<span class="s-card">María P. <em>${t('Escribirle hoy', 'Write today')}</em></span></div>`);
}

function flujo() {
  const n = [['Pedido', 'Order'], ['Factura', 'Invoice'], ['Aviso', 'Notice'], ['Reporte', 'Report']].map(([es, en], i) => `<li style="--i:${i}">${t(es, en)}<i>✓</i></li>`).join('');
  return `<div class="s-flow"><ol>${n}</ol><span class="s-run"></span><p>${t('Sin que nadie lo toque', 'Without anyone touching it')}</p></div>`;
}

function tiendaWa() {
  const it = [['Combo familiar', 'Family combo', '12,00'], ['Pan de masa madre', 'Sourdough bread', '4,50'], ['Postre del día', "Today's dessert", '3,00']].map(([es, en, p], i) => `<li ${d(.2 + i * .15)}><i></i><span>${t(es, en)}<small>USD ${p}</small></span><b>+</b></li>`).join('');
  return win('Tu negocio · ' + t('Catálogo', 'Catalog'), `<ul class="s-shop">${it}</ul><p class="s-cart" ${d(1.3)}><span>${t('Pedido enviado', 'Order sent')} ✓</span><b>USD 19,50</b></p>`, 's-wa');
}

function tablero(tipo: 'ventas' | 'finanzas') {
  const k = tipo === 'ventas'
    ? [['Ventas', 'Sales', 4820], ['Clientes', 'Customers', 312], ['Pedidos', 'Orders', 96]]
    : [['Ingresos', 'Income', 9640], ['Gastos', 'Expenses', 6310], ['Caja', 'Cash', 3330]];
  const kp = k.map(([es, en, n], i) => `<li ${d(.1 + i * .12)}><small>${t(es as string, en as string)}</small><b style="--n:${n}"></b></li>`).join('');
  return win(tipo === 'ventas' ? t('Tablero', 'Dashboard') : t('Reporte del mes', 'Monthly report'), `<ul class="s-kpi">${kp}</ul><svg class="s-line" viewBox="0 0 100 34" preserveAspectRatio="none"><path class="g" d="M0 33 H100"/><path pathLength="1" d="M0 28 L12 24 L24 26 L36 18 L48 20 L60 12 L72 14 L84 7 L100 4"/></svg>`);
}

function anuncio() {
  return `<div class="s-post s-win"><header><i>T</i><b>Tu negocio<small>${t('Publicidad', 'Sponsored')}</small></b></header><div class="s-pimg"><span ${d(.4)}>${t('2x1 este fin de semana', '2-for-1 this weekend')}</span></div><p class="s-cta" ${d(.8)}>${t('Escribir por WhatsApp', 'Message on WhatsApp')}</p><span class="s-likes" ${d(1.2)}>♥ 1.204 · 86 ${t('mensajes', 'messages')}</span></div>`;
}

function vertical(n: 1 | 3) {
  const ph = (lbl: string, dl: number) => `<div class="s-vert" ${d(dl)}><span class="s-vlbl">${lbl}</span><i class="s-vplay">▶</i><p>${t('Así se hace tu pedido', 'How your order is made')}</p><span class="s-vprog"><i></i></span></div>`;
  if (n === 1) return `<div class="s-verts one">${ph(t('Patrocinado', 'Sponsored'), .1)}</div>`;
  return `<div class="s-verts">${ph('Reels', .1)}${ph('Shorts', .25)}${ph('TikTok', .4)}</div>`;
}

function correo() {
  const m = [['Bienvenida a Tu negocio', 'Welcome to Your business', 'ahora', 'now'], ['Tu carrito te espera', 'Your cart is waiting', '1 h', '1 h'], ['Te extrañamos: 10 % para ti', 'We miss you: 10% off', 'ayer', 'yesterday']]
    .map(([es, en, h, he], i) => `<li ${d(.2 + i * .35)}><i></i><span><b>Tu negocio</b>${t(es, en)}</span><time>${t(h, he)}</time></li>`).join('');
  return win(t('Bandeja de entrada', 'Inbox'), `<ul class="s-mailbox">${m}</ul><p class="s-note" ${d(1.5)}>${t('Se envían solos', 'They send themselves')}</p>`);
}

function resenas() {
  return `<div class="s-rev s-win"><div class="r1" ${d(.1)}><b>Andrea M.</b><span class="s-stars">★★★★★</span><p>${t('Todo llegó a tiempo y muy rico.', 'Everything arrived on time and delicious.')}</p></div>
  <div class="r2" ${d(.9)}><b>${t('Respuesta de Tu negocio', 'Reply from Your business')}</b><p class="s-typed2">${t('¡Gracias, Andrea! Te esperamos pronto.', 'Thank you, Andrea! See you soon.')}</p></div></div>`;
}

function pasos(titulo: [string, string], items: [string, string][], sello: [string, string]) {
  const li = items.map(([es, en], i) => `<li ${d(.3 + i * .32)}><i>✓</i>${t(es, en)}</li>`).join('');
  return win(t(titulo[0], titulo[1]), `<ol class="s-steps">${li}</ol><b class="s-stamp" ${d(.4 + items.length * .32)}>${t(sello[0], sello[1])}</b>`, 's-doc');
}

function registro() {
  return win('SENADI', `<div class="s-cert"><b class="s-r" ${d(.2)}>®</b><strong>Tu negocio</strong><small>${t('Clase 35 · Servicios', 'Class 35 · Services')}</small><span class="s-stamp" ${d(1)}>${t('Registrada', 'Registered')}</span></div>`, 's-doc');
}

function datos() {
  const c = [['Acepto la política de datos', 'I accept the data policy'], ['Quiero recibir novedades', 'I want to receive news']].map(([es, en], i) => `<li ${d(.6 + i * .4)}><i></i>${t(es, en)}</li>`).join('');
  return win(t('Formulario', 'Form'), `<div class="s-gdpr"><span class="s-shield" ${d(.1)}></span><div><span class="ln w8"></span><span class="ln w6"></span><ul>${c}</ul></div></div>`);
}

function factura() {
  return win(t('Factura 001-001-000245', 'Invoice 001-001-000245'), `<div class="s-inv"><ul><li ${d(.2)}><span>${t('Pedido del día', "Today's order")}</span><b>40,00</b></li><li ${d(.35)}><span>${t('Envío', 'Delivery')}</span><b>3,50</b></li><li ${d(.5)}><span>IVA 15 %</span><b>6,53</b></li></ul>
  <p class="tot" ${d(.7)}><span>Total USD</span><b>50,03</b></p><span class="s-stamp" ${d(1.2)}>✓ ${t('Autorizada por el SRI', 'Authorized by the SRI')}</span></div>`, 's-doc');
}

function nomina(tipo: 'nomina' | 'liquidacion') {
  if (tipo === 'liquidacion') {
    const l = [['Sueldo pendiente', 'Pending salary', '410,00'], ['Décimos proporcionales', 'Proportional bonuses', '186,40'], ['Vacaciones no gozadas', 'Unused vacation', '205,00']]
      .map(([es, en, v], i) => `<li ${d(.2 + i * .25)}><span>${t(es, en)}</span><b>${v}</b></li>`).join('');
    return win(t('Liquidación', 'Settlement'), `<div class="s-inv"><ul>${l}</ul><p class="tot" ${d(1.1)}><span>Total USD</span><b>801,40</b></p><span class="s-stamp" ${d(1.5)}>✓ ${t('Firmada y registrada', 'Signed and filed')}</span></div>`, 's-doc');
  }
  const r = [['Ana R.', '520,00'], ['Luis M.', '480,00'], ['Carla V.', '610,00']].map(([n, v], i) => `<li ${d(.2 + i * .3)}><span>${n}</span><b>${v}</b><i>✓ ${t('Pagado', 'Paid')}</i></li>`).join('');
  return win(t('Rol de pagos · noviembre', 'Payroll · November'), `<ul class="s-pay">${r}</ul><p class="s-note" ${d(1.4)}>${t('Décimos e IESS al día', 'Bonuses and social security up to date')}</p>`);
}

function taller() {
  const p = Array.from({ length: 8 }, (_, i) => `<i style="--d:${(.3 + i * .08).toFixed(2)}s"></i>`).join('');
  return `<div class="s-ws"><div class="s-screen s-win"><b>${t('IA para tu equipo', 'AI for your team')}</b><span class="ln w8"></span><span class="ln w6"></span><ol><li class="on"></li><li></li><li></li></ol></div><div class="s-people">${p}</div></div>`;
}

function curso() {
  const m = [['Módulo 1 · Empezar', 'Module 1 · Getting started'], ['Módulo 2 · Práctica', 'Module 2 · Practice'], ['Módulo 3 · Tu primer caso', 'Module 3 · Your first case']].map(([es, en], i) => `<li ${d(.6 + i * .4)}><i>✓</i>${t(es, en)}</li>`).join('');
  return `<div class="s-course s-win"><div class="s-video"><b class="s-play">▶</b><span class="s-prog"><i></i></span></div><ul>${m}</ul></div>`;
}

// ── qué escena lleva cada producto ──

const ESCENAS: Record<string, () => string> = {
  'analisis-de-marca': () => informe(['Cómo te ven hoy', 'How they see you today'], [['Confianza', 'Trust', .82], ['Precio justo', 'Fair price', .54], ['Te recuerdan', 'Recall', .36]], ['Hallazgo: pocos te recuerdan', 'Finding: few remember you']),
  'analisis-de-competencia': mapaPos,
  'analisis-de-mercado': circulos,
  'analisis-conversaciones-venta': chatScan,
  'estructuracion-de-empresa': organigrama,
  'analisis-contable': margen,
  'analisis-legal': () => contrato(['Revisión legal', 'Legal review'], [['Empresa en regla', 'Company in order'], ['Contratos revisados', 'Contracts reviewed'], ['Marca protegida', 'Brand protected']], false),
  'identidad-de-marca': marca,
  'estrategia-de-contenidos': calendario,
  'gestion-redes-sociales': feed,
  'jingle-corporativo': () => audio('jingle'),
  'musica-ambiental': () => audio('ambiente'),
  'soundtrack-para-contenido': () => audio('soundtrack'),
  'identidad-sonora': () => audio('sonora'),
  'investigacion-de-plataformas': ranking,
  'dominio-y-hosting': dominio,
  'pagina-web': () => captura('/images/casos/oscar-caicho/web-1600.webp', 'oscarcaichoheridas.com', 'Página de Óscar Caicho hecha por BIE'),
  'link-hub': linkhub,
  'posicionamiento-seo': () => serp(false),
  'perfil-google-maps': mapa,
  'fotografia-de-producto-ia': foto,
  'asistente-inteligente-whatsapp': () => chat(['Hola, ¿tienen disponible para hoy?', 'Hi, is it available today?'], ['¡Sí! Te lo enviamos antes de las 19:00. ¿A qué dirección?', 'Yes! We can deliver before 7 pm. What is the address?'], '23:07', ['Respondido en 4 segundos', 'Answered in 4 seconds']),
  'crm-ia': kanban,
  'sistema-operativo': () => captura('/images/casos/luway/os-app.webp', 'Luway OS', 'Sistema de Luway hecho por BIE'),
  'automatizaciones': flujo,
  'whatsapp-business-commerce': tiendaWa,
  'data-analytics': () => tablero('ventas'),
  'google-ads': () => serp(true),
  'meta-ads': anuncio,
  'tiktok-ads': () => vertical(1),
  'email-marketing': correo,
  'marketplace-y-ecommerce': () => captura('/images/casos/tasting/tienda.webp', 'tasting-ecuador.com', 'Tienda en línea de Tasting Ecuador hecha por BIE'),
  'video-marketing': () => vertical(3),
  'reputacion-online': resenas,
  'constitucion-de-empresa': () => pasos(['Tu empresa SAS', 'Your SAS company'], [['Nombre aprobado', 'Name approved'], ['Estatuto firmado', 'Bylaws signed'], ['Registro mercantil', 'Commercial registry'], ['RUC activo', 'Tax ID active']], ['Constituida', 'Incorporated']),
  'elaboracion-de-contratos': () => contrato(['Contrato de servicios', 'Service contract'], [['Alcance y plazos', 'Scope and deadlines'], ['Pagos y multas', 'Payments and penalties'], ['Confidencialidad', 'Confidentiality']]),
  'registro-de-marca': registro,
  'proteccion-de-datos': datos,
  'declaracion-de-impuestos': () => pasos(['Obligaciones del mes', 'This month\'s filings'], [['IVA', 'VAT'], ['Retenciones', 'Withholdings'], ['Impuesto a la renta', 'Income tax']], ['Al día con el SRI', 'Up to date with the SRI']),
  'facturacion-electronica': factura,
  'reportes-financieros': () => tablero('finanzas'),
  'asesoria-tributaria': () => chat(['¿Puedo deducir la compra de la laptop?', 'Can I deduct the laptop purchase?'], ['Sí, como gasto del negocio. Guarda la factura a nombre de tu RUC.', 'Yes, as a business expense. Keep the invoice under your tax ID.'], '10:12', ['Tu asesor, siempre a mano', 'Your advisor, always at hand']),
  'ingreso-de-personal': () => pasos(['Nuevo ingreso', 'New hire'], [['Contrato firmado', 'Contract signed'], ['Aviso de entrada al IESS', 'Social security entry notice'], ['Registro en el Ministerio', 'Ministry registration']], ['Desde el primer día', 'From day one']),
  'gestion-de-nomina': () => nomina('nomina'),
  'liquidacion-de-personal': () => nomina('liquidacion'),
  'capacitacion-digital': taller,
  'creacion-de-cursos-online': curso,
};

export function escena(slug?: string): string {
  const f = slug && ESCENAS[slug];
  return f ? f() : `<div class="s-win s-doc"><span class="ln w8"></span><span class="ln w6"></span></div>`;
}
