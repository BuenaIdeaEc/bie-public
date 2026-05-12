export interface NavLink {
  label: string;
  href: string;
  cta?: boolean;
}

export interface ValueLayer {
  number: string;
  name: string;
  tagline: string;
  products: string[];
  icon: string;
  slug: string;
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
