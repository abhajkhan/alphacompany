import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Terminal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ServiceCard,
  ProductCard,
  CaseStudyCard,
  InsightCard,
} from "@/components/ui/Cards";
import {
  SectionHeader,
  HeroDefault,
  Timeline,
  TechnologyGrid,
  StatisticGrid,
  TestimonialSlider,
  CTABanner,
} from "@/components/sections";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Alpha Company | Software Engineering & Product Development Studio",
  description: "Alpha Company designs, builds, and scales modern software products for startups and businesses through expert engineering, product strategy, AI, and cloud.",
  openGraph: {
    title: "Alpha Company | Engineering Software That Lasts.",
    description: "Engineering-first software studio building digital products, AI solutions, and scalable platforms for ambitious businesses.",
  },
};

// ---------------------------------------------------------------------------
// Stub data matching Content Guide specifications
// ---------------------------------------------------------------------------

const SERVICES = [
  { title: "Product Engineering", description: "End-to-end product design and development.", href: "/services" },
  { title: "Custom Software Development", description: "Purpose-built software matched to your business.", href: "/services" },
  { title: "AI Solutions", description: "Machine learning, LLM integration, and intelligent pipelines.", href: "/services" },
  { title: "Cloud & DevOps", description: "Infrastructure design, CI/CD, and cloud migrations.", href: "/services" },
  { title: "UI/UX Engineering", description: "Design systems and user-facing product engineering.", href: "/services" },
  { title: "Technical Consulting", description: "Architecture reviews, team coaching, and audits.", href: "/services" },
];

const FEATURED_PRODUCT = {
  id: "1",
  name: "AlphaFlow",
  category: "SaaS Platform",
  summary: "A workflow automation platform built for engineering teams that need reliability at scale.",
  status: "beta" as const,
  technologies: ["TypeScript", "Next.js", "PostgreSQL", "AWS"],
  href: "/products/alphaflow",
  imageUrl: undefined,
};

const PROCESS_STEPS = [
  { step: 1, title: "Discover", description: "Understand the business problem, user needs, and technical constraints through structured workshops." },
  { step: 2, title: "Architect", description: "Define the system architecture, data model, and technical boundaries before writing a line of code." },
  { step: 3, title: "Design", description: "Create high-fidelity designs grounded in the design system and validated with real users." },
  { step: 4, title: "Develop", description: "Iterative delivery in 2-week sprints with continuous integration and automated testing." },
  { step: 5, title: "Test", description: "Rigorous unit, integration, and performance testing to verify correctness." },
  { step: 6, title: "Deploy", description: "Zero-downtime deployments with full observability, rollback capabilities, and runbooks." },
  { step: 7, title: "Scale", description: "Performance tuning, capacity planning, and ongoing engineering partnership as you grow." },
];

const TECH_ITEMS = [
  { name: "TypeScript", category: "language" as const },
  { name: "Python", category: "language" as const },
  { name: ".NET", category: "language" as const },
  { name: "Next.js", category: "framework" as const },
  { name: "React", category: "framework" as const },
  { name: "Node.js", category: "framework" as const },
  { name: "PostgreSQL", category: "database" as const },
  { name: "Docker", category: "devops" as const },
  { name: "Kubernetes", category: "devops" as const },
  { name: "AWS", category: "cloud" as const },
  { name: "AI Platforms", category: "ai" as const },
];

const STATS = [
  { value: "120", label: "Projects Shipped", suffix: "+" },
  { value: "40", label: "Ambitious Partners", suffix: "+" },
  { value: "99.99", label: "Production Uptime", suffix: "%" },
  { value: "0", label: "Compromises on Quality" },
];

const CASE_STUDIES = [
  {
    id: "cs-1",
    title: "Rebuilding a Fintech Core Banking System",
    client: "NovaPay",
    industry: "Fintech",
    challenge: "Replace a 15-year-old monolith with a distributed, event-driven architecture without downtime.",
    result: "99.99% uptime post-migration. 4× throughput. 60% reduction in infrastructure cost.",
    technologies: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
    href: "/case-studies/novapay",
    featured: true,
  },
  {
    id: "cs-2",
    title: "Automating Large Scale Data Processing Platforms",
    client: "ApexData",
    industry: "Data Engineering",
    challenge: "Process terabytes of telemetry data in real-time with strict latency constraints.",
    result: "SLA latency dropped from 15 minutes to under 4 seconds.",
    technologies: ["Python", "Spark", "AWS", "Terraform"],
    href: "/case-studies/apexdata",
  },
];

const INSIGHTS = [
  {
    id: "in-1",
    title: "Why We Stopped Using GraphQL for New Projects",
    summary: "After using GraphQL in production for three years, we share the engineering tradeoffs that changed our approach.",
    category: "Architecture",
    readingTime: 8,
    publishedAt: "2026-06-01",
    href: "/insights/graphql",
    author: { name: "Alex Reeves", role: "Lead Engineer" },
  },
  {
    id: "in-2",
    title: "Designing Type-Safe APIs in TypeScript",
    summary: "A practical guide to leveraging modern TypeScript type features to build bulletproof backend APIs.",
    category: "Software Development",
    readingTime: 6,
    publishedAt: "2026-05-18",
    href: "/insights/type-safety",
    author: { name: "Sarah Chen", role: "CTO" },
  },
];

const TESTIMONIALS = [
  {
    quote: "Alpha Company doesn't just deliver code. They deliver engineering discipline. Six months in, our core fintech system is more reliable than it's ever been.",
    author: "Sarah Chen",
    role: "CTO",
    company: "NovaPay",
  },
  {
    quote: "The product engineering team at Alpha was instrumental in helping us launch our beta 4 weeks ahead of schedule. Their attention to detail was exceptional.",
    author: "James Miller",
    role: "VP of Product",
    company: "ApexData",
  },
];

// ---------------------------------------------------------------------------
// Homepage Component
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroDefault />

        {/* Section 1: Engineering First */}
        <Section background="none" id="about">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 flex flex-col gap-4">
                <Badge variant="tech" size="md">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" aria-hidden="true" />
                  Engineering First
                </Badge>
                <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-[56px] text-text-primary leading-[110%] tracking-tight">
                  Software Built
                  <br />
                  With Purpose.
                </h2>
              </div>
              <div className="lg:col-span-6 flex flex-col gap-6 lg:pt-10">
                <p className="text-lg md:text-xl text-text-secondary font-sans leading-relaxed">
                  Every product starts with a problem worth solving. We combine thoughtful design, modern engineering, and product strategy to create software that delivers measurable value.
                </p>
                <p className="text-base text-text-muted font-sans leading-relaxed">
                  From custom databases to event-driven web applications, every system we design is built for long-term maintainability, reliability, and business impact. We build software that lasts.
                </p>
                <div className="pt-4">
                  <Link href="/about" tabIndex={-1}>
                    <Button variant="secondary" size="md" showArrow>
                      Our Philosophy
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 2: Services */}
        <Section background="secondary" id="services">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Engineering Services"
              heading="Services We Provide."
              subheading="Whether you're launching a startup, modernizing legacy systems, or expanding an existing platform, Alpha Company provides engineering teams that become an extension of your business."
            />
            {/* 3x2 grid on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <ServiceCard key={service.title} service={service} className="h-full" />
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 3: Products */}
        <Section background="none" id="products">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Products"
              heading="Products We Build."
              subheading="Alongside client work, we build software products that solve real-world challenges. Building products keeps us practical, curious, and continuously improving our engineering standards."
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <p className="text-xs text-accent-blue font-mono uppercase tracking-widest">
                  Featured Product Showcase
                </p>
                <ProductCard product={FEATURED_PRODUCT} />
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-8">
                <h3 className="font-sans font-semibold text-2xl text-text-primary">
                  Engineering tools for engineering teams.
                </h3>
                <p className="text-base text-text-secondary font-sans leading-relaxed">
                  We build developer tools, automation systems, and SaaS platforms that solve actual operational problems. Our products are in production at dozens of engineering teams worldwide.
                </p>
                <div className="pt-2">
                  <Link href="/products" tabIndex={-1}>
                    <Button variant="secondary" size="md" showArrow>
                      View All Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 4: Engineering Process */}
        <Section background="secondary" id="process">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Engineering Process"
              heading="Built Through Process."
              subheading="Every successful product follows a disciplined approach. We design and deliver software iteratively, with clear checkpoints and automated QA at every step."
            />
            <Timeline steps={PROCESS_STEPS} />
          </Container>
        </Section>

        {/* Section 5: Technology */}
        <Section background="none" id="technology">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Technology"
              heading="Modern Technology Stack."
              subheading="We choose technologies based on long-term maintainability, performance, and business requirements rather than trends."
            />
            <TechnologyGrid items={TECH_ITEMS} grouped />
          </Container>
        </Section>

        {/* Section 6: Why Alpha Company (Why Teams Choose Alpha) */}
        <Section background="secondary" id="why-choose-us">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Why Alpha"
              heading="Why Teams Choose Alpha."
              subheading="Engineering decisions shape business outcomes. We focus on building software that is scalable, maintainable, secure, and designed for long-term success."
            />
            <StatisticGrid stats={STATS} />
          </Container>
        </Section>

        {/* Section 7: Case Studies */}
        <Section background="none" id="case-studies">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Case Studies"
              heading="Built for Real Businesses."
              subheading="Explore how we help organizations transform ideas into production-ready software. Here is a selection of our recent engineering work."
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured Case Study */}
              <div className="lg:col-span-7">
                <CaseStudyCard caseStudy={CASE_STUDIES[0]} featured />
              </div>
              {/* Secondary Case Study */}
              <div className="lg:col-span-5">
                <CaseStudyCard caseStudy={CASE_STUDIES[1]} className="h-full justify-between" />
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <Link href="/case-studies" tabIndex={-1}>
                <Button variant="secondary" size="md" showArrow>
                  Explore All Case Studies
                </Button>
              </Link>
            </div>
          </Container>
        </Section>

        {/* Section 8: Insights */}
        <Section background="secondary" id="insights">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Insights"
              heading="Engineering Insights."
              subheading="We share what we learn while building products. No noise, no marketing — only engineering."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INSIGHTS.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Link href="/insights" tabIndex={-1}>
                <Button variant="secondary" size="md" showArrow>
                  Read All Insights
                </Button>
              </Link>
            </div>
          </Container>
        </Section>

        {/* Section 9: Testimonials */}
        <Section background="none" id="testimonials">
          <Container className="flex flex-col gap-16">
            <SectionHeader
              label="Testimonials"
              heading="What Partners Say."
              subheading="We build strong, long-term partnerships with engineering leaders and product teams."
              align="center"
            />
            <TestimonialSlider testimonials={TESTIMONIALS} />
          </Container>
        </Section>

        {/* Section 10: Final CTA Banner */}
        <CTABanner
          heading="Let's Build What's Next."
          subheading="Whether you're starting with an idea or improving an existing platform, Alpha Company is ready to help."
          primaryLabel="Start a Project"
          primaryHref="/contact"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
