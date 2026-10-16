// Destacado mensual de la home. Para cambiar el destacado se edita solo este archivo.
// Fuente de las condiciones del A-12: 03-LINEA-A/propuestas/OFERTA_web_inicial.md v1.2.
// Sin vencimiento, descuento ni rotación: no existen en la oferta aprobada.
export interface EsteMes {
  etiqueta: string;
  codigo: string;
  titulo: string;
  texto: string;
  precios: { valor: string; nota: string }[];
  condiciones: string[];
  href: string;
  cta: string;
}

export const ESTE_MES: EsteMes = {
  etiqueta: 'Este mes en BIE',
  codigo: 'A-12 · Página web',
  titulo: 'Tu página web, con acompañamiento para seguir mejorando.',
  texto: 'Creamos la página de tu negocio y cada mes revisamos qué mejorar para que contactarte sea más fácil.',
  precios: [
    { valor: 'USD 150', nota: 'creación' },
    { valor: 'USD 25 / mes', nota: 'acompañamiento, desde la publicación' },
  ],
  condiciones: [
    'Primera versión en 7 días hábiles, contados desde el anticipo, el brief y los materiales completos.',
    'Sin permanencia mínima: puedes cancelar antes del siguiente período.',
    'Una página de hasta 5 secciones. No incluye tienda, reservas ni dominio propio.',
  ],
  href: '/productos/pagina-web/?src=home-este-mes',
  cta: 'Ver qué incluye',
};
