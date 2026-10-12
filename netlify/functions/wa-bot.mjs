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
//   WA_APP_SECRET       — App Secret de la app de Meta (developers.facebook.com → la app →
//                         Configuración → Básica → "Clave secreta de la app"). Con ella se
//                         verifica la firma X-Hub-Signature-256 de cada POST. OBLIGATORIA:
//                         sin ella todo POST recibe 503 y no se procesa nada (falla cerrado).
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — mismas que usa track.mjs. Ahora son
//                         OBLIGATORIAS para responder: antes de contestar se registra el id del
//                         mensaje en webhook_events (dedupe durable). Sin base, el bot no responde
//                         (mejor sin respuesta que respuesta doble).
// Sin WA_ACCESS_TOKEN el bot no responde (solo registra en el log), así que desplegar esto es
// inofensivo.
//
// Seguridad / idempotencia (2026-10-12):
//   1. Firma: HMAC-SHA256 del cuerpo CRUDO con WA_APP_SECRET, comparado en tiempo constante
//      contra X-Hub-Signature-256 ("sha256=<hex>"). Firma ausente o inválida → 401.
//   2. Dedupe: cada mensaje que el bot respondería se inserta primero en webhook_events
//      (event_id = id del mensaje de WhatsApp, PK) con resolution=ignore-duplicates. Si la base
//      no devuelve fila, ya se había procesado (reintento de Meta) → no se responde de nuevo.
//      En payload NO se guarda PII (ni teléfono ni texto): solo id, timestamp, slug e idioma.
//      Requiere la migración 0046 de BIE OS (agrega 'meta_whatsapp' al CHECK de gateway).

import crypto from 'node:crypto';
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

// ── Firma de Meta ─────────────────────────────────────────────────────────────
// true solo si `header` es exactamente "sha256=<64 hex>" y coincide con el HMAC del cuerpo crudo.
export const verificarFirma = (rawBody, header, secret) => {
  if (!secret || typeof header !== 'string') return false;
  const m = header.trim().match(/^sha256=([0-9a-fA-F]{64})$/);
  if (!m) return false;
  const recibida = Buffer.from(m[1], 'hex');
  const esperada = crypto.createHmac('sha256', secret).update(rawBody).digest();
  return recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
};

// ── Dedupe durable en BIE OS (webhook_events) ────────────────────────────────
// Decide qué hacer según el resultado del insert con resolution=ignore-duplicates:
//   'responder' — la fila se creó ahora (primera vez que vemos este mensaje)
//   'duplicado' — la base no devolvió fila: el id ya existía (reintento de Meta)
//   'error'     — el insert falló (red, credenciales, CHECK, etc.): no se responde
export const decisionDedupe = ({ ok, data }) => {
  if (!ok) return 'error';
  if (Array.isArray(data) && data.length > 0) return 'responder';
  if (Array.isArray(data) && data.length === 0) return 'duplicado';
  return 'error';
};

const reclamarMensaje = async (msg, slug, lang) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.error('wa-bot: sin SUPABASE_URL/SERVICE_ROLE_KEY, no se puede deduplicar → no se responde'); return 'error'; }
  const ahora = new Date().toISOString();
  try {
    const r = await fetch(`${url}/rest/v1/webhook_events?select=event_id`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=ignore-duplicates,return=representation',
      },
      body: JSON.stringify({
        event_id: msg.id,
        gateway: 'meta_whatsapp',
        event_type: 'message',
        payload: { message_id: msg.id, timestamp: msg.timestamp || null, slug, lang },
        status: 'processed',
        attempt_count: 1,
        last_attempt_at: ahora,
        processed_at: ahora,
      }),
    });
    if (!r.ok) {
      console.error('wa-bot: dedupe falló (insert webhook_events)', r.status, await r.text());
      return 'error';
    }
    const data = await r.json().catch(() => null);
    return decisionDedupe({ ok: true, data });
  } catch (e) {
    console.error('wa-bot: dedupe falló (error de red)', e);
    return 'error';
  }
};

// Responde un mensaje solo si logra reclamarlo en webhook_events.
const responder = async (msg, slug, lang, texto) => {
  if (!msg.id) { console.error('wa-bot: mensaje sin id, no se puede deduplicar → no se responde'); return; }
  const decision = await reclamarMensaje(msg, slug, lang);
  if (decision === 'duplicado') { console.log('wa-bot: mensaje ya procesado, se omite', msg.id); return; }
  if (decision !== 'responder') return;
  const ok = await enviarWA(msg.from, texto);
  if (ok) { await registrarEnBieOs(slug); await avisar(slug, lang); }
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

  // Falla cerrado: sin App Secret no hay forma de saber si el POST viene de Meta.
  const secret = process.env.WA_APP_SECRET;
  if (!secret) {
    console.error('wa-bot: WA_APP_SECRET no configurado — POST rechazado sin procesar');
    return new Response('service unavailable', { status: 503 });
  }

  // La firma se calcula sobre los bytes crudos, antes de cualquier JSON.parse.
  const raw = Buffer.from(await req.arrayBuffer());
  if (!verificarFirma(raw, req.headers.get('x-hub-signature-256'), secret)) {
    console.error('wa-bot: firma X-Hub-Signature-256 ausente o inválida — POST rechazado');
    return new Response('unauthorized', { status: 401 });
  }

  let payload;
  try { payload = JSON.parse(raw.toString('utf8')); } catch { return new Response('bad request', { status: 400 }); }

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
            await responder(msg, slug, lang, textoRespuesta(slug, lang));
          } else if (/origen: web\//i.test(texto)) {
            // Vino de la web pero el slug no matchea (página futura): cierre universal.
            const cierre = respuestas.base.cierre[lang] || respuestas.base.cierre.es;
            await responder(msg, null, lang, cierre);
          }
          // Mensajes sin origen web: no responde el bot — los atiende el humano en la app
          // (coexistence), para no pisar conversaciones en curso.
        }
      }
    }
  } catch (e) {
    console.error('wa-bot error:', e);
  }
  // 200 una vez verificada la firma y procesado: Meta reintenta ante otros códigos (los
  // reintentos igual quedan frenados por el dedupe de webhook_events).
  return new Response('ok', { status: 200 });
};

export const config = { path: '/api/whatsapp' };
