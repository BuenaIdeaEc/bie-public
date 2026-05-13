export interface NavLink {
  label: string;
  href: string;
  cta?: boolean;
}

export interface ServiceProduct {
  slug: string;
  shortName: string;
  name: string;
  tagline: string;
  excerpt: string;
  why: string;
  tech: string;
  implement: string;
  features: string[];
  waText: string;
}

export interface ValueLayer {
  number: string;
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  products: ServiceProduct[];
}

export interface PricingTier {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  metric: string;
  metricLabel: string;
  cover: string;
  coverAlt: string;
  href: string;
  status: 'active' | 'development';
}

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
}

export interface BigStat {
  value: string;
  label: string;
}
