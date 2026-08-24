// BIE — Bot de WhatsApp (Meta Cloud API, modo coexistence con la app de WhatsApp Business).
// Responde en automático la propuesta del producto que el lead estaba mirando, usando la línea
// de origen que todo mensaje de la web trae ("— Origen: web/producto/<slug>/..." etc.).
// Respuestas dentro de la ventana de servicio de 24h (sin costo por mensaje hasta el 2026-10-01).
//
// Variables de entorno (Netlify → Site settings → Environment variables, o `netlify env:set`):
//   WA_VERIFY_TOKEN   — cadena inventada; la misma se pega al configurar el webhook en Meta.
//   WA_ACCESS_TOKEN   — token permanente de la app de Meta (System User token).
//   WA_PHONE_NUMBER_ID — id del número en WhatsApp Manager (no es el número de teléfono).
// Sin WA_ACCESS_TOKEN el bot no responde (solo registra), así que desplegar esto es inofensivo.

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

const enviar = async (to, body) => {
  const token = process.env.WA_ACCESS_TOKEN;
  const phoneId = process.env.WA_PHONE_NUMBER_ID;
  if (!token || !phoneId) { console.log('wa-bot: sin credenciales, no se envía. Respuesta habría sido:', body.slice(0, 80)); return; }
  const r = await fetch(`${GRAPH}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body, preview_url: false } }),
  });
  if (!r.ok) console.error('wa-bot envío falló:', r.status, await r.text());
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
          if (slug) {
            // Lead de la web con origen: propuesta del producto, sin tocar nada más.
            await enviar(msg.from, respuestas.productos[slug].replace(/\*\*/g, '*'));
          } else if (/origen: web\//i.test(texto)) {
            // Vino de la web pero el slug no matchea (página futura): cierre universal.
            await enviar(msg.from, respuestas.base.cierre);
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
