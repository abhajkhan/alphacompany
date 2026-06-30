/**
 * Shared TypeScript types for the Alpha Company design system.
 */

// ---------------------------------------------------------------------------
// Common utility types
// ---------------------------------------------------------------------------

export type Size = "sm" | "md" | "lg";
export type ColorVariant = "primary" | "secondary" | "ghost" | "danger";
export type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export interface TechItem {
  name: string;
  category: "language" | "framework" | "cloud" | "devops" | "ai" | "database";
  iconUrl?: string;
  description?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  href: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  status: "live" | "beta" | "coming-soon";
  technologies: string[];
  href: string;
  imageUrl?: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  result: string;
  technologies: string[];
  href: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface InsightItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  readingTime: number;
  publishedAt: string;
  href: string;
  coverImageUrl?: string;
  author?: AuthorItem;
}

export interface AuthorItem {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  logoUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  linkedIn?: string;
  github?: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  price?: string;
  priceNote?: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

export interface ContactFormValues {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  projectType?: string;
  message: string;
}
