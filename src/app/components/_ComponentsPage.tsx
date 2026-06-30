"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Button,
  Badge,
  Chip,
  TextInput,
  TextArea,
  SelectInput,
  CheckboxField,
  Accordion,
  Tabs,
  Avatar,
  Pagination,
  Breadcrumb,
  ServiceCard,
  ProductCard,
  InsightCard,
  TestimonialCard,
  PricingCard,
  CaseStudyCard,
  TeamCard,
} from "@/components/ui";
import {
  SectionHeader,
  Timeline,
  TechnologyGrid,
  StatisticGrid,
  Newsletter,
  CTABanner,
  EmptyState,
  Skeleton,
  SkeletonCard,
  Spinner,
} from "@/components/sections";
import { ContactForm } from "@/components/ui/ContactForm";
import { Inbox } from "lucide-react";

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const DEMO_SERVICES = [
  { title: "Product Engineering", description: "End-to-end product design and development.", href: "/services", icon: "" },
  { title: "AI Solutions", description: "Machine learning, LLM integration, and intelligent pipelines.", href: "/services", icon: "" },
  { title: "Cloud & DevOps", description: "Infrastructure design, CI/CD, and cloud migrations.", href: "/services", icon: "" },
  { title: "UI/UX Engineering", description: "Design systems and user-facing product engineering.", href: "/services", icon: "" },
  { title: "Custom Software", description: "Purpose-built software matched to your business.", href: "/services", icon: "" },
  { title: "Technical Consulting", description: "Architecture reviews, team coaching, and audits.", href: "/services", icon: "" },
];

const DEMO_PRODUCT: Parameters<typeof ProductCard>[0]["product"] = {
  id: "1",
  name: "AlphaFlow",
  category: "SaaS Platform",
  summary: "A workflow automation platform built for engineering teams that need reliability at scale.",
  status: "beta",
  technologies: ["TypeScript", "Next.js", "PostgreSQL", "AWS"],
  href: "/products/alphaflow",
  imageUrl: undefined,
};

const DEMO_INSIGHT: Parameters<typeof InsightCard>[0]["insight"] = {
  id: "1",
  title: "Why We Stopped Using GraphQL for New Projects",
  summary: "After using GraphQL in production for three years, we share the engineering tradeoffs that changed our approach.",
  category: "Architecture",
  readingTime: 8,
  publishedAt: "2026-06-01",
  href: "/insights/graphql",
  author: { name: "Alex Reeves", role: "Lead Engineer" },
};

const DEMO_CASE_STUDY: Parameters<typeof CaseStudyCard>[0]["caseStudy"] = {
  id: "1",
  title: "Rebuilding a Fintech Core Banking System",
  client: "NovaPay",
  industry: "Fintech",
  challenge: "Replace a 15-year-old monolith with a distributed, event-driven architecture without downtime.",
  result: "99.99% uptime post-migration. 4× throughput. 60% reduction in infrastructure cost.",
  technologies: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
  href: "/case-studies/novapay",
};

const DEMO_TESTIMONIAL: Parameters<typeof TestimonialCard>[0]["testimonial"] = {
  quote: "Alpha Company doesn't just deliver code. They deliver engineering discipline. Six months in, our system is more reliable than it's ever been.",
  author: "Sarah Chen",
  role: "CTO",
  company: "NovaPay",
};

const DEMO_PRICING: Parameters<typeof PricingCard>[0]["plan"] = {
  name: "Product Partnership",
  description: "For companies ready to move from idea to market.",
  price: "Custom",
  priceNote: "Scope-based engagement",
  features: [
    "Dedicated engineering team",
    "Weekly delivery cadence",
    "Architecture & design included",
    "QA & performance testing",
    "1-year post-launch support",
  ],
  cta: "Start a Project",
  href: "/contact",
  highlighted: true,
};

const DEMO_STATS = [
  { value: "120", label: "Projects shipped", suffix: "+" },
  { value: "40", label: "Enterprise clients", suffix: "+" },
  { value: "99.9", label: "Avg uptime SLA", suffix: "%" },
  { value: "6", label: "Years in production" },
];

const DEMO_PROCESS = [
  { step: 1, title: "Discover", description: "Understand the business problem, user needs, and technical constraints through structured workshops." },
  { step: 2, title: "Architect", description: "Define the system architecture, data model, and technical boundaries before writing a line of code." },
  { step: 3, title: "Design", description: "Create high-fidelity designs grounded in the design system and validated with real users." },
  { step: 4, title: "Develop", description: "Iterative delivery in 2-week sprints with continuous integration and automated testing." },
  { step: 5, title: "Deploy", description: "Zero-downtime deployments with full observability, rollback capabilities, and runbooks." },
  { step: 6, title: "Scale", description: "Performance tuning, capacity planning, and ongoing engineering partnership as you grow." },
];

const DEMO_TECH = [
  { name: "TypeScript", category: "language" as const },
  { name: "Python", category: "language" as const },
  { name: "Go", category: "language" as const },
  { name: "Next.js", category: "framework" as const },
  { name: "React", category: "framework" as const },
  { name: "Node.js", category: "framework" as const },
  { name: "AWS", category: "cloud" as const },
  { name: "PostgreSQL", category: "database" as const },
  { name: "Docker", category: "devops" as const },
  { name: "Kubernetes", category: "devops" as const },
];

const DEMO_TABS = [
  { id: "overview", label: "Overview", content: <p className="text-text-secondary font-sans">Overview content goes here.</p> },
  { id: "tech", label: "Technology", content: <p className="text-text-secondary font-sans">Technology breakdown goes here.</p> },
  { id: "results", label: "Results", content: <p className="text-text-secondary font-sans">Business outcomes and metrics.</p> },
  { id: "disabled", label: "Disabled", disabled: true, content: null },
];

const DEMO_FAQ = [
  { question: "How long does a typical project take?", answer: "Most product builds run 8–16 weeks from kick-off to first production deployment, depending on scope and complexity." },
  { question: "Do you work with early-stage startups?", answer: "Yes. We work with startups from pre-seed through Series B and tailor our engagement model to your stage." },
  { question: "What does your pricing look like?", answer: "We offer fixed-scope and dedicated-team models. Book a call and we'll scope your project within 48 hours." },
];

// ---------------------------------------------------------------------------
// Demo section wrapper
// ---------------------------------------------------------------------------

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-12 border-t border-divider-neutral first:border-t-0">
      <p className="mb-8 font-mono text-xs text-text-muted uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ComponentsPage() {
  const [page, setPage] = React.useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Page header */}
      <div className="border-b border-divider-neutral bg-background-secondary">
        <Container className="py-16">
          <h1 className="font-sans font-bold text-4xl text-text-primary mb-3">
            Component Library
          </h1>
          <p className="text-text-secondary font-sans">
            Visual reference for every Alpha Company design system component.
          </p>
          <div className="mt-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Components" },
              ]}
            />
          </div>
        </Container>
      </div>

      <Container className="py-12">

        {/* BUTTONS */}
        <DemoSection title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">Primary SM</Button>
            <Button variant="primary" size="md" showArrow>Primary MD</Button>
            <Button variant="primary" size="lg" showArrow>Primary LG</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="ghost" size="md">Ghost</Button>
            <Button variant="danger" size="md">Danger</Button>
            <Button variant="primary" size="md" isLoading>Loading</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
          </div>
        </DemoSection>

        {/* BADGES */}
        <DemoSection title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="tech">TypeScript</Badge>
          </div>
        </DemoSection>

        {/* CHIPS */}
        <DemoSection title="Chips">
          <div className="flex flex-wrap items-center gap-3">
            <Chip>Engineering</Chip>
            <Chip>Architecture</Chip>
            <Chip dismissible onDismiss={() => {}}>Dismissible</Chip>
            <Chip inactive>Inactive</Chip>
          </div>
        </DemoSection>

        {/* AVATAR */}
        <DemoSection title="Avatar">
          <div className="flex items-end gap-4">
            <Avatar name="Alex Reeves" size="xs" />
            <Avatar name="Sarah Chen" size="sm" />
            <Avatar name="Michael Torres" size="md" />
            <Avatar name="Jordan Blake" size="lg" />
            <Avatar name="Priya Kapoor" size="xl" />
          </div>
        </DemoSection>

        {/* INPUTS */}
        <DemoSection title="Inputs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <TextInput
              label="Full name"
              name="demo-name"
              placeholder="Jane Smith"
              required
            />
            <TextInput
              label="Email (error state)"
              name="demo-email"
              placeholder="email@example.com"
              error="Please enter a valid email."
            />
            <TextArea
              label="Message"
              name="demo-message"
              placeholder="Describe your project…"
              rows={4}
            />
            <SelectInput
              label="Project type"
              name="demo-type"
              options={[
                { value: "product", label: "Product Engineering" },
                { value: "ai", label: "AI Solutions" },
              ]}
            />
            <CheckboxField
              label="I agree to the terms and conditions"
              name="demo-check"
            />
          </div>
        </DemoSection>

        {/* ACCORDION / FAQ */}
        <DemoSection title="Accordion / FAQ">
          <div className="w-full ">
            <Accordion
              items={DEMO_FAQ.map((f, i) => ({ id: String(i), question: f.question, answer: f.answer }))}
            />
          </div>
        </DemoSection>

        {/* TABS */}
        <DemoSection title="Tabs">
          <div className="w-full ">
            <Tabs items={DEMO_TABS} />
          </div>
        </DemoSection>

        {/* PAGINATION */}
        <DemoSection title="Pagination">
          <Pagination totalPages={12} currentPage={page} onPageChange={setPage} />
        </DemoSection>

        {/* LOADING STATES */}
        <DemoSection title="Loading States">
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </DemoSection>

        {/* STATS */}
        <DemoSection title="Statistics">
          <StatisticGrid stats={DEMO_STATS} />
        </DemoSection>

        {/* CARDS — SERVICE */}
        <DemoSection title="Service Cards (3×2 grid)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_SERVICES.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>
        </DemoSection>

        {/* CARDS — PRODUCT */}
        <DemoSection title="Product Card">
          <div className="w-full">
            <ProductCard product={DEMO_PRODUCT} />
          </div>
        </DemoSection>

        {/* CARDS — INSIGHT */}
        <DemoSection title="Insight Card">
          <div className="w-full ">
            <InsightCard insight={DEMO_INSIGHT} />
          </div>
        </DemoSection>

        {/* CARDS — CASE STUDY */}
        <DemoSection title="Case Study Card">
          <div className="w-full ">
            <CaseStudyCard caseStudy={DEMO_CASE_STUDY} />
          </div>
        </DemoSection>

        {/* CARDS — TESTIMONIAL */}
        <DemoSection title="Testimonial Card">
          <div className="w-full ">
            <TestimonialCard testimonial={DEMO_TESTIMONIAL} />
          </div>
        </DemoSection>

        {/* CARDS — PRICING */}
        <DemoSection title="Pricing Card">
          <div className="w-full ">
            <PricingCard plan={DEMO_PRICING} />
          </div>
        </DemoSection>

        {/* TEAM CARD */}
        <DemoSection title="Team Card">
          <div className="w-full">
            <TeamCard
              member={{
                name: "Alex Reeves",
                role: "Lead Engineer",
                bio: "10 years building distributed systems and developer tools.",
                github: "https://github.com",
                linkedIn: "https://linkedin.com",
              }}
            />
          </div>
        </DemoSection>

        {/* TIMELINE */}
        <DemoSection title="Timeline (Process)">
          <div className="w-full">
            <Timeline steps={DEMO_PROCESS} />
          </div>
        </DemoSection>

        {/* TECHNOLOGY GRID */}
        <DemoSection title="Technology Grid">
          <TechnologyGrid items={DEMO_TECH} grouped />
        </DemoSection>

        {/* EMPTY STATE */}
        <DemoSection title="Empty State">
          <EmptyState
            icon={<Inbox size={20} />}
            heading="No insights yet."
            description="Engineering insights will appear here once published."
            actionLabel="Browse Services"
            onAction={() => {}}
          />
        </DemoSection>

        {/* NEWSLETTER */}
        <DemoSection title="Newsletter">
          <div className="w-full">
            <Newsletter />
          </div>
        </DemoSection>

        {/* CONTACT FORM */}
        <DemoSection title="Contact Form">
          <div className="w-full ">
            <ContactForm />
          </div>
        </DemoSection>

      </Container>

      {/* CTA Banner at bottom */}
      <CTABanner />
    </div>
  );
}
