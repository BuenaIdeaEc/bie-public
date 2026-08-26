// BIE — Bot de WhatsApp (Meta Cloud API, modo coexistence con la app de WhatsApp Business).
// Responde en automático la propuesta del producto que el lead estaba mirando, usando la línea
// de origen que todo mensaje de la web trae ("— Origen: web/producto/<slug>/<es|en>" etc.),
// en el idioma en que la persona navegó el sitio. Registra cada respuesta en BIE OS (page_events,
// system='whatsapp') para que quede visible junto al resto de la analítica. Opcionalmente avisa
// a un número de control cuando responde, si WA_NOTIFY_NUMBER está configurado.
// Respuestas dentro de la ventana de servicio de 24h (sin costo por mensaje hasta el 2026-10-01).
//
// Variables de entorno (Netlify → Site settings → Environment variables, o `netlify env:set`):
//   WA_VERIFY_TOKEN     — cadena inventada; la misma se pega al configurar el webhook en Meta.
//   WA_ACCESS_TOKEN     — token permanente de la app de Meta (System User token).
//   WA_PHONE_NUMBER_ID  — id del número en WhatsApp Manager (no es el número de teléfono).
//   WA_NOTIFY_NUMBER    — opcional: número (con código de país, sin +) al que avisar cada vez
//                         que el bot responde solo, para que un humano sepa que hay que dar
//                         seguimiento. Sin esto, el bot igual funciona — solo no avisa a nadie.
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — mismas que usa track.mjs, para dejar registro
//                         en BIE OS. Sin esto, el bot responde igual — solo no queda registrado.
// Sin WA_ACCESS_TOKEN el bot no responde (solo registra en el log), así que desplegar esto es
// inofensivo.

import respuestas from './respuestas.json' with { type: 'json' };

const GRAPH = 'https://graph.facebook.com/v23.0';

const detectarSlug = (texto) => {
  // "— Origen: web/producto/<slug>/es" | "web/home/quiz/<dolor>" | "web/catalogo/<slug>/es" | "web/cadena/..."
  const t = texto.toLowerCase();
  let m = t.match(/web\/producto\/([a-z0-9-]+)/);
  if (m && respuestas.productos[m[1]]) return m[1];
  m = t.match(/web\/(?:home\/)?quiz\/([a-z0-9-]+)/);
  if (m && respuestas.quiz[m[1]]) return respuestas.quiz[m[1]];
  m = t.match(/web\/catalogo\/([a-z0-9-]+)/);
  if (m && respuestas.productos[m[1]]) return m[1];
  return null;
};

// El idioma siempre es el último segmento de la ruta de origen ("web/.../es" o ".../en"),
// antes del eventual " · vía <src>" — cualquiera de los 3 templates del sitio lo arma así.
const detectarIdioma = (texto) => {
  const m = texto.match(/origen:\s*web\/[^\n]*?\/(es|en)\b/i);
  return m ? m[1].toLowerCase() : 'es';
};

const textoRespuesta = (slug, lang) => {
  const p = respuestas.productos[slug];
  return (p[lang] || p.es).replace(/\*\*/g, '*');
};

const enviarWA = async (to, body) => {
  const token = process.env.WA_ACCESS_TOKEN;
  const phoneId = process.env.WA_PHONE_NUMBER_ID;
  if (!token || !phoneId) { console.log('wa-bot: sin credenciales, no se envía. Respuesta habría sido:', body.slice(0, 80)); return false; }
  const r = await fetch(`${GRAPH}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body, preview_url: false } }),
  });
  if (!r.ok) { console.error('wa-bot envío falló:', r.status, await r.text()); return false; }
  return true;
};

// Avisa a un humano que el bot ya respondió — sin número de control configurado, no hace nada.
const avisar = async (slug, lang) => {
  const notifyTo = process.env.WA_NOTIFY_NUMBER;
  if (!notifyTo) return;
  const nombre = slug === null ? 'mensaje sin producto reconocido' : slug;
  await enviarWA(notifyTo, `🔔 El bot respondió solo — ${nombre} (${lang}). Dale seguimiento cuando puedas.`);
};

// Deja constancia en BIE OS de que el bot atendió algo — mismo patrón que track.mjs.
const registrarEnBieOs = async (slug) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/page_events`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ event_type: 'contact_click', product_slug: slug, path: null, system: 'whatsapp', meta: null }),
    });
  } catch (e) { console.error('wa-bot: no se pudo registrar en BIE OS', e); }
};

export default async (req) => {
  const url = new URL(req.url);

  // Verificación del webhook (Meta llama con GET al configurarlo)
  if (req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');
    if (mode === 'subscribe' && token && token === process.env.WA_VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    return new Response('forbidden', { status: 403 });
  }

  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

  let payload;
  try { payload = await req.json(); } catch { return new Response('bad request', { status: 400 }); }

  // Estructura estándar de Cloud API: entry[].changes[].value.messages[]
  try {
    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        for (const msg of value.messages || []) {
          if (msg.type !== 'text' || !msg.text?.body) continue;
          // En coexistence también llegan ecos de mensajes propios: responder solo a entrantes.
          if (value.metadata?.display_phone_number && msg.from === value.metadata.display_phone_number) continue;
          const texto = msg.text.body;
          const slug = detectarSlug(texto);
          const lang = detectarIdioma(texto);
          if (slug) {
            // Lead de la web con origen: propuesta del producto, en su idioma, sin tocar nada más.
            const ok = await enviarWA(msg.from, textoRespuesta(slug, lang));
            if (ok) { await registrarEnBieOs(slug); await avisar(slug, lang); }
          } else if (/origen: web\//i.test(texto)) {
            // Vino de la web pero el slug no matchea (página futura): cierre universal.
            const cierre = respuestas.base.cierre[lang] || respuestas.base.cierre.es;
            const ok = await enviarWA(msg.from, cierre);
            if (ok) { await registrarEnBieOs(null); await avisar(null, lang); }
          }
          // Mensajes sin origen web: no responde el bot — los atiende el humano en la app
          // (coexistence), para no pisar conversaciones en curso.
        }
      }
    }
  } catch (e) {
    console.error('wa-bot error:', e);
  }
  // Siempre 200: Meta reintenta ante otros códigos y duplicaría procesamiento.
  return new Response('ok', { status: 200 });
};

export const config = { path: '/api/whatsapp' };
