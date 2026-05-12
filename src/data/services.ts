import type { ValueLayer } from '../types/index.ts';

export const valueLayers: ValueLayer[] = [
  {
    number: '01',
    name: 'IDENTIDAD',
    tagline: 'Marca, narrativa y posicionamiento',
    products: ['Creación de Identidad', 'Manual de Marca'],
    icon: 'fingerprint',
    slug: 'identidad',
  },
  {
    number: '02',
    name: 'PRESENCIA',
    tagline: 'Sitio web, dominio y visibilidad digital',
    products: ['Sitio Web Institucional', 'Dominio + Hosting'],
    icon: 'globe',
    slug: 'presencia',
  },
  {
    number: '03',
    name: 'DATOS',
    tagline: 'Migración, estructuración y memoria empresarial',
    products: ['Migración de Información', 'Cerebro Ampliado'],
    icon: 'database',
    slug: 'datos',
  },
  {
    number: '04',
    name: 'AUTOMATIZACIÓN',
    tagline: 'Chatbots, apps web e integraciones a medida',
    products: ['Chatbot IA', 'Aplicación Web Custom'],
    icon: 'zap',
    slug: 'automatizacion',
  },
  {
    number: '05',
    name: 'INTELIGENCIA',
    tagline: 'Agentes IA, dashboards y decisiones en tiempo real',
    products: ['Ecosistema de Agentes', 'Dashboard KPIs'],
    icon: 'brain',
    slug: 'inteligencia',
  },
  {
    number: '06',
    name: 'ESCALA',
    tagline: 'White-label y formación de equipos internos',
    products: ['White Label', 'Training Interno'],
    icon: 'trending-up',
    slug: 'escala',
  },
];

export const allProducts = [
  { id: 'P-001', name: 'Creación de Identidad de Marca',    layer: 1, price: 'Desde $800' },
  { id: 'P-002', name: 'Manual de Marca',                   layer: 1, price: 'Desde $500' },
  { id: 'P-003', name: 'Sitio Web Institucional',           layer: 2, price: 'Desde $1,500' },
  { id: 'P-004', name: 'Dominio + Hosting + Deploy',        layer: 2, price: 'Desde $200/año' },
  { id: 'P-005', name: 'Migración & Movilización de Info',  layer: 3, price: 'Desde $2,000' },
  { id: 'P-006', name: 'Cerebro Ampliado',                  layer: 3, price: 'Desde $1,500' },
  { id: 'P-007', name: 'Chatbot IA',                        layer: 4, price: 'Desde $1,500' },
  { id: 'P-008', name: 'Aplicación Web Custom',             layer: 4, price: 'Desde $3,000' },
  { id: 'P-009', name: 'Integraciones & APIs Custom',       layer: 4, price: 'Desde $1,000' },
  { id: 'P-010', name: 'Dashboard de KPIs',                 layer: 5, price: 'Desde $2,000' },
  { id: 'P-011', name: 'Ecosistema de Agentes IA',          layer: 5, price: 'Ver tiers' },
  { id: 'P-012', name: 'Auditoría IA + Roadmap',            layer: 5, price: '$3,000 – $5,000' },
  { id: 'P-013', name: 'White Label',                       layer: 6, price: '+30% sobre tier' },
  { id: 'P-014', name: 'Training Interno',                  layer: 6, price: '$500/sesión' },
];
