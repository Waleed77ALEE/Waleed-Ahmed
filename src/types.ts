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
  platform: 'Instant Services' | 'Upwork' | 'Direct Client' | 'Fiverr';
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

export interface ProjectMilestone {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  completedDate?: string;
  description: string;
}

export interface Deliverable {
  id: string;
  projectId: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: 'zip' | 'pdf' | 'fig' | 'json' | 'code' | 'doc';
  version: string;
  uploadedAt: string;
  downloadsCount: number;
  securityHash: string;
  downloadUrl?: string;
  contentSnippet?: string;
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  projectId?: string;
  projectTitle: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  taxAmount?: number;
  status: 'PAID' | 'UNPAID' | 'PROCESSING' | 'OVERDUE';
  paymentMethod: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  notes?: string;
  pdfUrl?: string;
}

export interface ClientProject {
  id: string;
  userId: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Under Review' | 'Deliverables Ready' | 'Completed' | 'On Hold';
  progressPercentage: number;
  leadEngineer: string;
  techStack: string[];
  startDate: string;
  estimatedCompletion: string;
  totalBudget: number;
  paidAmount: number;
  repositoryUrl?: string;
  previewUrl?: string;
  milestones: ProjectMilestone[];
  deliverables: Deliverable[];
  invoices: ClientInvoice[];
}
