import type { PricingTier } from '../types/index.ts';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$800',
    priceNote: '– $1,500 / mes',
    description: 'Para profesionales y micro-empresas que quieren sus primeros agentes IA en producción.',
    features: [
      '3–5 agentes IA configurados',
      'WhatsApp Business + 1 CRM',
      'Automatización de ventas básica',
      'Dashboard de seguimiento',
      'Soporte en horario laboral',
      'Setup: $1,500 – $3,000',
    ],
    cta: { label: 'Empezar con Starter', href: '/contacto?plan=starter' },
  },
  {
    name: 'Professional',
    price: '$2,500',
    priceNote: '– $5,000 / mes',
    description: 'Para PYMEs que quieren automatización operativa seria y medible desde el primer mes.',
    features: [
      '8–15 agentes IA especializados',
      'Integraciones múltiples (CRM, ERP, WA)',
      'Ops + ventas + marketing + finanzas',
      'Reportes semanales con KPIs',
      'QA dedicado + soporte 24/7',
      'Setup: $5,000 – $10,000',
    ],
    cta: { label: 'Cotizar Professional', href: '/contacto?plan=professional' },
    featured: true,
    badge: 'Más popular',
  },
  {
    name: 'Enterprise',
    price: '$8,000',
    priceNote: '– $15,000+ / mes',
    description: 'Para empresas medianas en transformación digital que exigen SLA y escala sin límite.',
    features: [
      '20–40+ agentes con orquestador dedicado',
      'Integraciones enterprise (SAP, Salesforce)',
      'SLA 99.5% uptime garantizado',
      'Soporte 24/7 humano + IA',
      'Gerente de cuenta BIE',
      'Setup: $15,000 – $30,000',
    ],
    cta: { label: 'Hablar con EGO', href: '/contacto?plan=enterprise' },
    badge: 'Premium',
  },
];
