// BIE — Analítica hacia BIE OS. Vista de página (o de producto), y cualquier salida a
// WhatsApp como cta_click+contact_click. form_start/form_submit/quiz_step los dispara
// cada página a mano llamando a window.bieTrack(). Falla en silencio: nunca bloquea nada.
(function () {
  var ENDPOINT = '/api/track';
  var KEY = 'bie_session';

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  var sess;
  try { sess = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { sess = null; }
  if (!sess) {
    var qs = new URLSearchParams(location.search);
    var ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''; } catch (e) { ref = ''; }
    sess = {
      id: uuid(),
      referrer_domain: ref || null,
      utm_source: qs.get('utm_source') || null,
      utm_medium: qs.get('utm_medium') || null,
      utm_campaign: qs.get('utm_campaign') || null,
    };
    try { sessionStorage.setItem(KEY, JSON.stringify(sess)); } catch (e) {}
  }

  function send(event_type, extra) {
    extra = extra || {};
    var payload = {
      event_type: event_type,
      path: location.pathname,
      session_id: sess.id,
      utm_source: sess.utm_source,
      utm_medium: sess.utm_medium,
      utm_campaign: sess.utm_campaign,
      referrer_domain: sess.referrer_domain,
      product_slug: extra.product_slug || null,
      meta: extra.meta || null,
    };
    var body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
        return;
      }
    } catch (e) {}
    try { fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }); } catch (e) {}
  }

  window.bieTrack = send;

  var slug = (document.currentScript && document.currentScript.dataset.productSlug) || null;
  if (slug) send('product_view', { product_slug: slug });
  else send('page_view');

  // Cualquier link a WhatsApp del sitio es, a la vez, el CTA y el contacto.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="https://wa.me/"]');
    if (!a) return;
    send('cta_click');
    send('contact_click');
  }, true);
})();
