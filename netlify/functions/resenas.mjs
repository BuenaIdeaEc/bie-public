// BIE — Reseñas reales de la ficha de BIE en Google Maps, para la sección «Comentarios» de la home.
// Lee la ficha con Places API (New) y devuelve solo lo que la página muestra.
// La respuesta queda guardada un día en la red de Netlify: Google se consulta unas 30 veces al mes,
// dentro del uso gratis mensual de Google (1.000 consultas de detalle con reseñas).
// Sin clave responde 503 y la página sigue mostrando los comentarios de siempre.
//
// Variables de entorno (Netlify → Site configuration → Environment variables):
//   GOOGLE_PLACES_KEY  — clave de Google Cloud con «Places API (New)» activada (la crea EGO)
//   GOOGLE_PLACE_ID    — opcional; por defecto la ficha «Business Intelligence Ecuador - BIE»

const PLACE_ID_BIE = 'ChIJIaSNP5S6rYkR7pYG7_tp-40';

const json = (body, status, cache) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Netlify-CDN-Cache-Control': cache,
  },
});

export default async () => {
  const key = process.env.GOOGLE_PLACES_KEY;
  const id = process.env.GOOGLE_PLACE_ID || PLACE_ID_BIE;
  if (!key) return json({ ok: false, motivo: 'sin clave' }, 503, 'public, durable, s-maxage=600');

  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?languageCode=es&regionCode=EC`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
    });
    if (!r.ok) {
      console.error('resenas: Google respondió', r.status, (await r.text()).slice(0, 300));
      return json({ ok: false, motivo: 'google ' + r.status }, 502, 'public, durable, s-maxage=600');
    }
    const p = await r.json();
    const reviews = (p.reviews || [])
      .map((v) => ({
        autor: v.authorAttribution?.displayName || 'Cliente en Google',
        autorUrl: v.authorAttribution?.uri || null,
        foto: v.authorAttribution?.photoUri || null,
        estrellas: Math.round(v.rating || 0),
        cuando: v.relativePublishTimeDescription || '',
        fecha: v.publishTime || null,
        texto: (v.originalText?.text || v.text?.text || '').trim(),
        url: v.googleMapsUri || null,
      }))
      .filter((v) => v.texto);
    return json({
      ok: true,
      nota: p.rating || null,
      total: p.userRatingCount || 0,
      url: p.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${id}`,
      escribir: `https://search.google.com/local/writereview?placeid=${id}`,
      reviews,
    }, 200, 'public, durable, s-maxage=86400, stale-while-revalidate=86400');
  } catch (e) {
    console.error('resenas: error', e);
    return json({ ok: false, motivo: 'error' }, 502, 'public, durable, s-maxage=600');
  }
};

export const config = { path: '/api/resenas' };
