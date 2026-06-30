"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import { Badge } from "./Badge";
import type { ServiceItem, ProductItem, CaseStudyItem, InsightItem, TestimonialItem, TeamMember, PricingPlan } from "@/types";
import { Avatar } from "./Avatar";

// ---------------------------------------------------------------------------
// Shared card hover animation
// ---------------------------------------------------------------------------

const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const accentBar: Variants = {
  rest: { scaleX: 0, opacity: 0 },
  hover: { scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const cardBase =
  "relative bg-surface border border-border-neutral rounded-[20px] p-8 flex flex-col overflow-hidden focus-within:ring-2 focus-within:ring-accent-blue";

// ---------------------------------------------------------------------------
// ServiceCard
// ---------------------------------------------------------------------------

export interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(cardBase, "gap-4", className)}
    >
      {/* Accent bar */}
      <motion.div
        className="absolute top-0 left-8 right-8 h-px bg-accent-blue"
        variants={accentBar}
        style={{ originX: 0 }}
        aria-hidden="true"
      />

      <h3 className="font-sans font-semibold text-lg text-text-primary">{service.title}</h3>
      <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1">
        {service.description}
      </p>
      <Link
        href={service.href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue-hover transition-colors font-sans focus:outline-none"
        aria-label={`Learn more about ${service.title}`}
      >
        Learn more
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// ProductCard
// ---------------------------------------------------------------------------

export interface ProductCardProps {
  product: ProductItem;
  featured?: boolean;
  className?: string;
}

const statusVariantMap: Record<ProductItem["status"], "success" | "info" | "neutral"> = {
  live: "success",
  beta: "info",
  "coming-soon": "neutral",
};
const statusLabel: Record<ProductItem["status"], string> = {
  live: "Live",
  beta: "Beta",
  "coming-soon": "Coming Soon",
};

export function ProductCard({ product, featured = false, className }: ProductCardProps) {
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(cardBase, "gap-5", featured && "lg:col-span-2 lg:flex-row", className)}
    >
      {/* Image */}
      {product.imageUrl && (
        <div className={cn("relative overflow-hidden rounded-[--radius-md] bg-background-primary", featured ? "w-full lg:w-1/2 h-52 lg:h-auto" : "h-44")}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-text-muted font-sans mb-1">{product.category}</p>
            <h3 className={cn("font-sans font-semibold text-text-primary", featured ? "text-2xl" : "text-lg")}>
              {product.name}
            </h3>
          </div>
          <Badge variant={statusVariantMap[product.status]} size="sm">
            {statusLabel[product.status]}
          </Badge>
        </div>

        <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1">
          {product.summary}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {product.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="tech" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        <Link
          href={product.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue-hover transition-colors font-sans focus:outline-none"
          aria-label={`View ${product.name}`}
        >
          View product <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// CaseStudyCard
// ---------------------------------------------------------------------------

export interface CaseStudyCardProps {
  caseStudy: CaseStudyItem;
  featured?: boolean;
  className?: string;
}

export function CaseStudyCard({ caseStudy, featured = false, className }: CaseStudyCardProps) {
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(cardBase, "h-full gap-5 group flex flex-col justify-between", featured && "lg:col-span-2", className)}
    >
      <div className="flex flex-col gap-4 flex-1">
        {caseStudy.imageUrl && (
          <div className="relative overflow-hidden rounded-[--radius-md] bg-background-primary h-52 shrink-0">
            <Image
              src={caseStudy.imageUrl}
              alt={`${caseStudy.client} case study`}
              fill
              className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">{caseStudy.industry}</Badge>
        </div>

        <div>
          <h3 className={cn("font-sans font-semibold text-text-primary mb-2", featured ? "text-2xl" : "text-lg")}>
            {caseStudy.title}
          </h3>
          <p className="text-sm text-text-secondary font-sans leading-relaxed line-clamp-3">
            {caseStudy.challenge}
          </p>
        </div>

        <p className="text-sm text-text-muted font-sans italic line-clamp-2">
          ↳ {caseStudy.result}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {caseStudy.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="tech" size="sm">{tech}</Badge>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-divider-neutral shrink-0">
        <Link
          href={caseStudy.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue-hover transition-colors font-sans focus:outline-none"
          aria-label={`Read ${caseStudy.title} case study`}
        >
          View Case Study <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// InsightCard (Blog)
// ---------------------------------------------------------------------------

export interface InsightCardProps {
  insight: InsightItem;
  featured?: boolean;
  className?: string;
}

export function InsightCard({ insight, featured = false, className }: InsightCardProps) {
  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(cardBase, "gap-5 group", featured && "lg:col-span-2", className)}
    >
      {insight.coverImageUrl && (
        <div className="relative overflow-hidden rounded-[--radius-md] bg-background-primary h-48">
          <Image
            src={insight.coverImageUrl}
            alt={`Cover image for ${insight.title}`}
            fill
            className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <Badge variant="tech" size="sm">{insight.category}</Badge>
        <span className="flex items-center gap-1 text-xs text-text-muted font-sans">
          <Clock size={12} aria-hidden="true" />
          {insight.readingTime} min read
        </span>
        <span className="flex items-center gap-1 text-xs text-text-muted font-sans">
          <Calendar size={12} aria-hidden="true" />
          <time dateTime={insight.publishedAt}>
            {new Date(insight.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </time>
        </span>
      </div>

      <div className="flex-1">
        <h3 className={cn("font-sans font-semibold text-text-primary mb-2", featured ? "text-2xl" : "text-lg")}>
          {insight.title}
        </h3>
        <p className="text-sm text-text-secondary font-sans leading-relaxed line-clamp-3">
          {insight.summary}
        </p>
      </div>

      {insight.author && (
        <div className="flex items-center gap-2 pt-2 border-t border-divider-neutral">
          <Avatar name={insight.author.name} src={insight.author.avatarUrl} size="xs" />
          <div>
            <p className="text-xs font-medium text-text-primary font-sans">{insight.author.name}</p>
            <p className="text-xs text-text-muted font-sans">{insight.author.role}</p>
          </div>
        </div>
      )}

      <Link
        href={insight.href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue-hover transition-colors font-sans focus:outline-none"
        aria-label={`Read article: ${insight.title}`}
      >
        Read the Insight <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// TestimonialCard
// ---------------------------------------------------------------------------

export interface TestimonialCardProps {
  testimonial: TestimonialItem;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "bg-surface border border-border-neutral rounded-[20px] p-8 flex flex-col gap-6",
        className,
      )}
    >
      {/* Quote mark */}
      <span className="text-5xl text-accent-blue/40 font-sans leading-none select-none" aria-hidden="true">
        "
      </span>
      <blockquote className="flex-1">
        <p className="text-base text-text-secondary font-sans leading-relaxed italic">
          {testimonial.quote}
        </p>
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-divider-neutral">
        <Avatar name={testimonial.author} src={testimonial.avatarUrl} size="sm" />
        <div>
          <p className="text-sm font-semibold text-text-primary font-sans">{testimonial.author}</p>
          <p className="text-xs text-text-muted font-sans">
            {testimonial.role} — {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// TeamCard
// ---------------------------------------------------------------------------

export interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export function TeamCard({ member, className }: TeamCardProps) {
  return (
    <div className={cn(cardBase, "items-center text-center gap-4", className)}>
      <Avatar name={member.name} src={member.avatarUrl} size="xl" />
      <div>
        <h3 className="font-sans font-semibold text-lg text-text-primary">{member.name}</h3>
        <p className="text-sm text-accent-blue font-sans">{member.role}</p>
      </div>
      {member.bio && (
        <p className="text-sm text-text-secondary font-sans leading-relaxed">{member.bio}</p>
      )}
      <div className="flex items-center gap-2 pt-2">
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="text-xs text-text-muted hover:text-text-primary transition-colors font-sans"
          >
            GitHub
          </a>
        )}
        {member.linkedIn && (
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="text-xs text-text-muted hover:text-text-primary transition-colors font-sans"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PricingCard
// ---------------------------------------------------------------------------

export interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-[20px] p-8 border",
        plan.highlighted
          ? "bg-accent-blue/10 border-accent-blue/60 shadow-[0_0_0_1px_rgba(59,130,246,0.3),0_16px_48px_rgba(59,130,246,0.1)]"
          : "bg-surface border-border-neutral",
        className,
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="info" size="sm">Most Popular</Badge>
        </div>
      )}

      <div>
        <h3 className="font-sans font-semibold text-xl text-text-primary mb-1">{plan.name}</h3>
        <p className="text-sm text-text-muted font-sans">{plan.description}</p>
      </div>

      {plan.price && (
        <div>
          <p className="font-sans font-bold text-4xl text-text-primary">{plan.price}</p>
          {plan.priceNote && (
            <p className="text-xs text-text-muted font-sans mt-1">{plan.priceNote}</p>
          )}
        </div>
      )}

      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary font-sans">
            <span className="mt-0.5 text-success shrink-0" aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[--radius-md] font-sans font-medium text-sm transition-all duration-200",
          plan.highlighted
            ? "bg-accent-blue text-white hover:bg-accent-blue-hover hover:-translate-y-0.5"
            : "border border-border-neutral text-text-primary hover:border-accent-blue hover:text-accent-blue-hover hover:-translate-y-0.5",
        )}
        aria-label={`Choose ${plan.name} plan`}
      >
        {plan.cta}
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
