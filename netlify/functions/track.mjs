// BIE — Recibe eventos de public/track.js y los inserta directo en Supabase (BIE OS),
// usando el service_role key (bypassea RLS por diseño de Supabase; no hay endpoint que
// reciba llamadas desde BIE OS — la escritura es unidireccional desde acá).
//
// Desde 2026-10-12 la función ya NO responde 200 cuando algo falla: el código de estado
// dice la verdad, para que el monitoreo (y quien mire la pestaña Network) vea las pérdidas.
//   200 {ok:true[, lead_id]}                      — guardado (o evento fuera de la lista, ignorado)
//   400 {ok:false, error:'json_invalido'}         — cuerpo que no es JSON
//   405                                           — método distinto de POST
//   413 {ok:false, error:'payload_muy_grande'}    — más de MAX_BYTES
//   415 {ok:false, error:'content_type_invalido'} — ni application/json ni text/plain
//   422 {ok:false, error:'lead_sin_contacto'}     — form_submit con lead sin phone ni email
//   502 {ok:false, error:'lead_no_guardado'}      — Supabase rechazó / no respondió el insert del lead
//   502 {ok:false, error:'evento_no_guardado'}    — Supabase rechazó / no respondió el insert del evento
//   503 {ok:false, error:'sin_configuracion'}     — faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
// public/track.js usa navigator.sendBeacon (Blob application/json), que ignora la respuesta:
// el cambio de códigos no afecta la UX del sitio.
//
// Variables de entorno (Netlify → Site settings → Environment variables):
//   SUPABASE_URL               — https://husiywjndpravokplvqm.supabase.co (proyecto bie-erp;
//                                 reconstruido el 2026-08-20 con este ID nuevo tras eliminarse
//                                 el anterior vvunxwtviuduqibadsov por pausa de 90 días — no usar ese)
//   SUPABASE_SERVICE_ROLE_KEY  — supabase.com/dashboard/project/husiywjndpravokplvqm/settings/api
//
// Contrato de event_type (migrations 0022/0023/0025 de bie-erp): product_view, cta_click,
// contact_click, form_start, form_submit, quiz_step, quiz_complete, page_view.
// El id del lead (LEAD-NNNN) lo genera la base por default (migración 0046 de BIE OS): acá no se envía.

const VALID_EVENTS = new Set([
  'product_view', 'cta_click', 'contact_click', 'form_start', 'form_submit',
  'quiz_step', 'quiz_complete', 'page_view',
]);

export const MAX_BYTES = 10 * 1024;

const json = (status, obj) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

// sendBeacon con Blob {type:'application/json'} manda application/json; un sendBeacon con
// string manda text/plain;charset=UTF-8. Se aceptan ambos (y nada más).
export const contentTypeAceptado = (ct) => {
  const base = String(ct || '').split(';')[0].trim().toLowerCase();
  return base === 'application/json' || base === 'text/plain';
};

// Inserta una fila; devuelve {ok, data}. Nunca lanza: los errores de red cuentan como fallo.
const insert = async (cfg, table, row, { representation = false, select = null } = {}) => {
  try {
    const qs = select ? `?select=${encodeURIComponent(select)}` : '';
    const r = await fetch(`${cfg.url}/rest/v1/${table}${qs}`, {
      method: 'POST',
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        'Content-Type': 'application/json',
        Prefer: representation ? 'return=representation' : 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!r.ok) {
      console.error(`track: INSERT FALLÓ en ${table} (status ${r.status})`, await r.text());
      return { ok: false };
    }
    const data = representation ? await r.json().catch(() => null) : null;
    return { ok: true, data };
  } catch (e) {
    console.error(`track: INSERT FALLÓ en ${table} (error de red)`, e);
    return { ok: false };
  }
};

export default async (req) => {
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

  if (!contentTypeAceptado(req.headers.get('content-type'))) {
    return json(415, { ok: false, error: 'content_type_invalido' });
  }
  const declarado = Number(req.headers.get('content-length'));
  if (Number.isFinite(declarado) && declarado > MAX_BYTES) {
    return json(413, { ok: false, error: 'payload_muy_grande' });
  }

  const raw = await req.text();
  if (Buffer.byteLength(raw, 'utf8') > MAX_BYTES) {
    return json(413, { ok: false, error: 'payload_muy_grande' });
  }

  let body;
  try { body = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'json_invalido' }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json(400, { ok: false, error: 'json_invalido' });
  }

  // Lista blanca: lo que no está en el contrato se ignora en silencio (como siempre).
  const event_type = body.event_type;
  if (!VALID_EVENTS.has(event_type)) return json(200, { ok: true });

  const cfg = { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY };
  if (!cfg.url || !cfg.key) {
    console.error(`track: SIN CREDENCIALES — se perdió un evento real (${event_type})`);
    return json(503, { ok: false, error: 'sin_configuracion' });
  }

  // El formulario de contacto además deja copia del lead en BIE OS — independiente
  // de si la conversación de WhatsApp llega a darse o se pierde. Va primero: es lo más valioso.
  let lead_id;
  let leadError = null; // [status, código] si el lead no quedó guardado
  if (event_type === 'form_submit' && body.meta?.lead && typeof body.meta.lead === 'object') {
    const l = body.meta.lead;
    const phone = String(l.phone || '').trim() || null;
    const email = String(l.email || '').trim() || null;
    // La tabla `leads` exige (CHECK leads_al_menos_un_canal) email o phone no vacíos.
    if (!phone && !email) {
      console.error('track: lead sin phone ni email, no se envía a la base');
      leadError = [422, 'lead_sin_contacto'];
    }
    const r = leadError ? null : await insert(cfg, 'leads', {
      name: l.name || null,
      phone,
      email,
      company: l.company || null,
      service_interest: l.service_interest || null,
      message: l.message || null,
      source: 'web-contacto',
    }, { representation: true, select: 'id' });
    if (!r) {
      // sin canal de contacto: ya quedó en el log, no se intenta el insert
    } else if (r.ok) {
      lead_id = Array.isArray(r.data) ? r.data[0]?.id : undefined;
    } else {
      leadError = [502, 'lead_no_guardado'];
      // El log es la única copia que queda del lead si la base lo rechazó: se conserva.
      console.error('track: LEAD PERDIDO — revisar de inmediato', l);
    }
  }

  const ev = await insert(cfg, 'page_events', {
    event_type,
    product_slug: body.product_slug || null,
    path: body.path || null,
    session_id: body.session_id || null,
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    referrer_domain: body.referrer_domain || null,
    // El lead de form_submit ya queda en `leads`; no se duplica info personal acá.
    meta: event_type === 'form_submit' ? null : (body.meta || null),
    system: 'web',
  });

  if (leadError) return json(leadError[0], { ok: false, error: leadError[1] });
  if (!ev.ok) return json(502, { ok: false, error: 'evento_no_guardado' });
  return json(200, lead_id ? { ok: true, lead_id } : { ok: true });
};

export const config = { path: '/api/track' };
