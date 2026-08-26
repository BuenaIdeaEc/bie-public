// BIE — Recibe eventos de public/track.js y los inserta directo en Supabase (BIE OS),
// usando el service_role key (bypassea RLS por diseño de Supabase; no hay endpoint que
// reciba llamadas desde BIE OS — la escritura es unidireccional desde acá). Inactivo sin
// credenciales: sin ellas solo registra en el log y responde 200 igual, nunca rompe la UX.
//
// Variables de entorno (Netlify → Site settings → Environment variables):
//   SUPABASE_URL               — https://husiywjndpravokplvqm.supabase.co (proyecto bie-erp;
//                                 reconstruido el 2026-08-20 con este ID nuevo tras eliminarse
//                                 el anterior vvunxwtviuduqibadsov por pausa de 90 días — no usar ese)
//   SUPABASE_SERVICE_ROLE_KEY  — supabase.com/dashboard/project/husiywjndpravokplvqm/settings/api
//
// Contrato de event_type (migrations 0022/0023/0025 de bie-erp): product_view, cta_click,
// contact_click, form_start, form_submit, quiz_step, quiz_complete, page_view.

const VALID_EVENTS = new Set([
  'product_view', 'cta_click', 'contact_click', 'form_start', 'form_submit',
  'quiz_step', 'quiz_complete', 'page_view',
]);

const insert = async (table, row) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.log('track: sin credenciales, no se inserta en', table); return; }
  const r = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  if (!r.ok) console.error(`track: insert en ${table} falló`, r.status, await r.text());
};

export default async (req) => {
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

  let body;
  try { body = await req.json(); } catch { return new Response('bad request', { status: 400 }); }

  const event_type = body.event_type;
  if (!VALID_EVENTS.has(event_type)) return new Response('ok', { status: 200 });

  try {
    await insert('page_events', {
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

    // El formulario de contacto además deja copia del lead en BIE OS — independiente
    // de si la conversación de WhatsApp llega a darse o se pierde.
    if (event_type === 'form_submit' && body.meta?.lead) {
      const l = body.meta.lead;
      await insert('leads', {
        phone: l.phone || null,
        company: l.company || null,
        service_interest: l.service_interest || null,
        message: l.message || null,
        source: 'web-contacto',
      });
    }
  } catch (e) {
    console.error('track: error', e);
  }

  return new Response('ok', { status: 200 });
};

export const config = { path: '/api/track' };
