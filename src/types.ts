export interface ServiceItem {
  id: string;
  title: string;
  category: 'AI Subscriptions' | 'Social Media Growth' | 'Accounts' | 'Gift Cards';
  subCategory?: string;
  price: number;
  delivery: string;
  description: string;
  features: string[];
  icon: string;
  featured?: boolean;
  rating?: number;
  ordersCount?: number;
  badge?: string;
}

export type CategoryFilter = 'All' | 'AI Subscriptions' | 'Social Media Growth' | 'Accounts' | 'Gift Cards';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: string;
}

export interface CoreService {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  startingPrice: string;
  turnaround: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  platform: 'G2G Marketplace' | 'Upwork' | 'Direct Client' | 'Fiverr';
  avatar: string;
  comment: string;
  rating: number;
  verifiedPurchase?: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
