// Destacado mensual de la home. Para cambiar precios, vigencia, copy o ejemplos, se edita solo este archivo.
// La promoción se oculta sola al terminar el día vigenciaHasta, hora de Ecuador (UTC-5).
// Los ejemplos son sitios reales de BIE en producción. No usar demos, previews ni casos que EGO no apruebe.

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

export interface EjemploReal {
  nombre: string;
  url: string;
  imagen: string;
  imagenCorta: string;
  alt: string;
}

export interface EsteMes {
  etiqueta: string;
  etiquetaPromo: string;
  codigo: string;
  titulo: string;
  texto: string;
  lineaCrecimiento: string;
  evoPasos: string[];
  etiquetaEjemplos: string;
  ejemplos: EjemploReal[];
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

export function hostVisible(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function precio(valor: string, nota: string): PrecioItem {
  return { valor, nota };
}

/** Solo casos aprobados por EGO para esta oferta. Sitios oficiales en producción. */
export const EJEMPLOS_WEB: EjemploReal[] = [
  {
    nombre: 'Tasting Ecuador',
    url: 'https://tasting-ecuador.com',
    imagen: '/images/casos/tasting/web-tall.webp',
    imagenCorta: '/images/casos/tasting/web-tall-800.webp',
    alt: 'Página de inicio de tasting-ecuador.com, trabajo de BIE',
  },
  {
    nombre: 'Escuela de Heridas',
    url: 'https://escueladeheridasguayaquil.com',
    imagen: '/images/casos/escuela-heridas/web-tall.webp',
    imagenCorta: '/images/casos/escuela-heridas/web-tall-800.webp',
    alt: 'Página de inicio de escueladeheridasguayaquil.com, trabajo de BIE',
  },
];

export const ESTE_MES: EsteMes = {
  etiqueta: 'Este mes en BIE',
  etiquetaPromo: 'Oferta de entrada',
  codigo: 'A-12 · Web profesional',
  titulo: 'Web profesional',
  texto: 'Una web que trabaja como vendedor, no como folleto.',
  lineaCrecimiento: 'Desde la web básica, el sitio crece con evoluciones que se le presentan al cliente poco a poco.',
  evoPasos: ['Web básica', 'Acompañamiento', 'Evoluciones, poco a poco'],
  etiquetaEjemplos: 'Trabajo real de BIE',
  ejemplos: EJEMPLOS_WEB,
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