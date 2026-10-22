// Comentarios de clientes.
// `frase` se publica solo con autorización del cliente. Óscar, Paola (Tasting) y Luway autorizaron a BIE a redactar
// el comentario en su nombre; consentimiento reportado por EGO el 2026-10-21 (AGENDA BIE-20261009-003).
export interface Testimonio { negocio: string; sector: string; persona?: string; frase?: string; borrador?: string; url?: string }

export const TESTIMONIOS: Testimonio[] = [
  {
    persona: 'Óscar Caicho', negocio: 'Óscar Caicho', sector: 'Conferencias y clínica',
    frase: 'Antes de cada charla tenía diez cosas en la cabeza. Ahora abro la app, está todo en orden y yo me concentro en hablar.',
  },
  {
    persona: 'Paola', negocio: 'Tasting Ecuador', sector: 'Experiencias gastronómicas · Cuenca', url: 'https://tasting-ecuador.com',
    frase: 'Empezamos con meal preps y hoy tenemos marca, sistema y contenido que se entienden entre sí. No fue un diseño: fue ordenar el negocio.',
  },
  {
    negocio: 'Luway', sector: 'Moda en vivo · TikTok y WhatsApp',
    frase: 'Vendemos en vivo y todo pasa rápido. Con Luway OS el inventario y las entregas van solos; nosotros nos dedicamos a vender.',
  },
];

// Redes de BIE. Solo se muestran las que tienen enlace.
export const REDES: { nombre: string; handle: string; url?: string; desc: string }[] = [
  { nombre: 'Instagram', handle: '@businessintelligence.ec', url: 'https://instagram.com/businessintelligence.ec', desc: 'Casos reales, decisiones y aprendizajes de cada implementación.' },
  { nombre: 'WhatsApp', handle: '098 825 3030', url: 'https://wa.me/593988253030?text=' + encodeURIComponent('Hola, vengo de la web de BIE.\n\n— Origen: web/home/redes/es'), desc: 'El canal donde pasa todo: escríbenos y seguimos ahí.' },
  { nombre: 'TikTok', handle: '', desc: 'Tecnología explicada en un minuto.' },
  { nombre: 'LinkedIn', handle: '', desc: 'Análisis de negocio para directores y dueños.' },
];
