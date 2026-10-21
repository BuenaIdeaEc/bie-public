// Comentarios de clientes. Cada frase debe venir del cliente y estar autorizada;
// mientras no haya frase, solo se muestra el nombre del negocio.
export interface Testimonio { negocio: string; sector: string; persona?: string; frase?: string; url?: string }

export const TESTIMONIOS: Testimonio[] = [
  { negocio: 'Tasting Ecuador', sector: 'Experiencias gastronómicas · Cuenca', url: 'https://tasting-ecuador.com' },
  { negocio: 'Luway', sector: 'Moda en vivo · TikTok y WhatsApp' },
  { negocio: 'Villa Tres', sector: 'Hostal · Guayaquil' },
  { negocio: 'Amílcar', sector: 'Servicios profesionales' },
  { negocio: 'Óscar Caicho', sector: 'Conferencias y clínica' },
];

// Redes de BIE. Solo se muestran las que tienen enlace.
export const REDES: { nombre: string; handle: string; url?: string; desc: string }[] = [
  { nombre: 'Instagram', handle: '@businessintelligence.ec', url: 'https://instagram.com/businessintelligence.ec', desc: 'Casos reales, decisiones y aprendizajes de cada implementación.' },
  { nombre: 'WhatsApp', handle: '098 825 3030', url: 'https://wa.me/593988253030?text=' + encodeURIComponent('Hola, vengo de la web de BIE.\n\n— Origen: web/home/redes/es'), desc: 'El canal donde pasa todo: escríbenos y seguimos ahí.' },
  { nombre: 'TikTok', handle: '', desc: 'Tecnología explicada en un minuto.' },
  { nombre: 'LinkedIn', handle: '', desc: 'Análisis de negocio para directores y dueños.' },
];
