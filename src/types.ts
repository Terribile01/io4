/**
 * Types and Interfaces for Faciilissimo Web Portfolio
 */

export interface LeadSubmission {
  id: string;
  businessName: string;
  niche: string;
  goals: string[];
  budget: string;
  webType: string;
  currentWebsite?: string;
  clientName: string;
  email: string;
  phone?: string;
  notes?: string;
  timestamp: string;
  status: "Nuovo" | "Contattato" | "Archiviato";
}

export interface PortfolioCase {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tech: string;
  growthMetric: string;
  image: string;
  description: string;
  link?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  stars: number;
}
