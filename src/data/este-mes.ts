// Destacado mensual de la home. Para cambiar precios, vigencia o copy, se edita solo este archivo.
// Fuente de las condiciones del A-12: 03-LINEA-A/propuestas/OFERTA_web_inicial.md v1.2.
// La promoción se oculta sola al terminar el día vigenciaHasta, hora de Ecuador (UTC-5).

export const PRECIOS_WEB = {
  moneda: 'USD',
  creacionRegular: 150,
  mesRegular: 25,
  creacionPromo: 90,
  mesPromo: 18,
  /** Inclusive. Después del 31/12/2026 (America/Guayaquil) la promo se oculta sola. */
  vigenciaHasta: '2026-12-31',
} as const;

export type PrecioItem = { valor: string; nota: string };

export interface PromoWeb {
  vigenteHasta: string;
  etiquetaFranja: string;
  etiquetaRegular: string;
  etiquetaHasta: string;
  precios: PrecioItem[];
}

export interface EsteMes {
  etiqueta: string;
  etiquetaPromo: string;
  codigo: string;
  titulo: string;
  texto: string;
  lineaCrecimiento: string;
  condiciones: string[];
  precios: PrecioItem[];
  promo: PromoWeb;
  href: string;
  cta: string;
}

export function formatearDinero(n: number, moneda = PRECIOS_WEB.moneda): string {
  return moneda + ' ' + n;
}

/** Convierte YYYY-MM-DD a 31/12/2026. */
export function formatFechaCorta(iso: string): string {
  const [y, m, d] = iso.split('-');
  return d + '/' + m + '/' + y;
}

/** Vigente hasta el final del día en America/Guayaquil (UTC-5, sin horario de verano). */
export function promoVigente(hasta: string = PRECIOS_WEB.vigenciaHasta, ahora: Date = new Date()): boolean {
  const fin = Date.parse(hasta + 'T23:59:59.999-05:00');
  if (Number.isNaN(fin)) return false;
  return ahora.getTime() <= fin;
}

export function textoFranja(data: EsteMes): string {
  const montos = data.promo.precios.map((x) => x.valor).join(' + ');
  return 'Web profesional: ' + montos + ', hasta el ' + formatFechaCorta(data.promo.vigenteHasta);
}

function precio(valor: string, nota: string): PrecioItem {
  return { valor, nota };
}

export const ESTE_MES: EsteMes = {
  etiqueta: 'Este mes en BIE',
  etiquetaPromo: 'Oferta de entrada',
  codigo: 'A-12 · Web profesional',
  titulo: 'Web profesional, con acompañamiento para seguir mejorando.',
  texto: 'Creamos la web de tu negocio y cada mes revisamos qué mejorar para que contactarte sea más fácil.',
  lineaCrecimiento: 'Desde la web básica, el sitio crece con evoluciones que se le presentan al cliente poco a poco.',
  condiciones: [
    'Primera versión en 7 días hábiles, contados desde el anticipo, el brief y los materiales completos.',
    'Sin permanencia mínima: puedes cancelar antes del siguiente período.',
    'Una página de hasta 5 secciones. No incluye tienda, reservas ni dominio propio.',
  ],
  precios: [
    precio(formatearDinero(PRECIOS_WEB.creacionRegular), 'creación'),
    precio(formatearDinero(PRECIOS_WEB.mesRegular) + ' / mes', 'acompañamiento, desde la publicación'),
  ],
  promo: {
    vigenteHasta: PRECIOS_WEB.vigenciaHasta,
    etiquetaFranja: 'Oferta de entrada',
    etiquetaRegular: 'precio regular',
    etiquetaHasta: 'Vigente hasta el',
    precios: [
      precio(formatearDinero(PRECIOS_WEB.creacionPromo), 'creación'),
      precio(formatearDinero(PRECIOS_WEB.mesPromo) + ' / mes', 'acompañamiento, desde la publicación'),
    ],
  },
  href: '/productos/pagina-web/?src=home-este-mes',
  cta: 'Ver qué incluye',
};