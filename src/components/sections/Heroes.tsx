"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/layout/Container";

// ---------------------------------------------------------------------------
// Shared animation
// ---------------------------------------------------------------------------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ---------------------------------------------------------------------------
// HeroDefault — homepage hero
// ---------------------------------------------------------------------------

export interface HeroDefaultProps {
  headline?: React.ReactNode;
  supporting?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function HeroDefault({
  headline = (
    <>
      Engineering the
      <br />
      <span className="text-accent-blue">Future.</span>
    </>
  ),
  supporting = "We design, build, and scale software products that help ambitious businesses move faster and grow with confidence.",
  primaryLabel = "Start a Project",
  primaryHref = "/contact",
  secondaryLabel = "Explore Our Work",
  secondaryHref = "/case-studies",
  className,
}: HeroDefaultProps) {
  return (
    <section
      aria-label="Hero"
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden",
        "bg-background-primary",
        className,
      )}
    >
      {/* Architectural grid background */}
      <HeroGrid />

      {/* Radial accent glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-32 pb-24">
        <motion.div
          className="max-w-3xl flex flex-col gap-8"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Eye-brow label */}
          <motion.div variants={fadeUp}>
            <Badge variant="tech" size="md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" aria-hidden="true" />
              Engineering Studio
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-sans font-bold text-text-primary leading-[105%] text-[clamp(3rem,7vw,6rem)]"
          >
            {headline}
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-text-secondary font-sans leading-relaxed max-w-xl"
          >
            {supporting}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
            <Link href={primaryHref} tabIndex={-1}>
              <Button variant="primary" size="lg" showArrow>
                {primaryLabel}
              </Button>
            </Link>
            <Link href={secondaryHref} tabIndex={-1}>
              <Button variant="secondary" size="lg">
                {secondaryLabel}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-xs text-text-muted font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// HeroProduct — individual product hero
// ---------------------------------------------------------------------------

export interface HeroProductProps {
  productName: string;
  tagline: string;
  description: string;
  status?: "live" | "beta" | "coming-soon";
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imageUrl?: string;
  className?: string;
}

const statusConfig = {
  live: { label: "Live", variant: "success" as const },
  beta: { label: "Beta", variant: "info" as const },
  "coming-soon": { label: "Coming Soon", variant: "neutral" as const },
};

export function HeroProduct({
  productName,
  tagline,
  description,
  status = "live",
  primaryLabel = "Request a Demo",
  primaryHref = "/contact",
  secondaryLabel = "View Documentation",
  secondaryHref = "#",
  imageUrl,
  className,
}: HeroProductProps) {
  const s = statusConfig[status];

  return (
    <section
      aria-label={`${productName} hero`}
      className={cn(
        "relative pt-32 pb-0 overflow-hidden bg-background-primary",
        className,
      )}
    >
      <HeroGrid />

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto pb-12"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Badge variant={s.variant} size="md">{s.label}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-sans font-bold text-text-primary leading-[105%] text-[clamp(2.5rem,6vw,5rem)]"
          >
            {tagline}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-text-secondary font-sans max-w-xl">
            {description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryHref} tabIndex={-1}>
              <Button variant="primary" size="lg" showArrow>{primaryLabel}</Button>
            </Link>
            <Link href={secondaryHref} tabIndex={-1}>
              <Button variant="secondary" size="lg">{secondaryLabel}</Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Product screenshot */}
        {imageUrl && (
          <motion.div
            className="relative mx-auto max-w-5xl rounded-t-[--radius-xl] overflow-hidden border-t border-l border-r border-border-neutral"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="h-8 bg-surface border-b border-border-neutral flex items-center px-4 gap-2" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <Image
              src={imageUrl}
              alt={`${productName} application screenshot`}
              width={1200}
              height={720}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// HeroArticle — blog/insights article hero
// ---------------------------------------------------------------------------

export interface HeroArticleProps {
  category: string;
  title: string;
  summary?: string;
  author?: string;
  authorRole?: string;
  publishedAt?: string;
  readingTime?: number;
  className?: string;
}

export function HeroArticle({
  category,
  title,
  summary,
  author,
  authorRole,
  publishedAt,
  readingTime,
  className,
}: HeroArticleProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  return (
    <section
      aria-label="Article hero"
      className={cn(
        "relative pt-32 pb-16 bg-background-primary border-b border-divider-neutral overflow-hidden",
        className,
      )}
    >
      <HeroGrid opacity={0.015} />

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl mx-auto flex flex-col gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Category */}
          <motion.div variants={fadeUp}>
            <Badge variant="tech" size="md">{category}</Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="font-sans font-bold text-text-primary leading-[110%] text-[clamp(2rem,5vw,3.5rem)]"
          >
            {title}
          </motion.h1>

          {/* Summary */}
          {summary && (
            <motion.p variants={fadeUp} className="text-lg text-text-secondary font-sans leading-relaxed">
              {summary}
            </motion.p>
          )}

          {/* Meta */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 pt-4 border-t border-divider-neutral text-sm text-text-muted font-sans"
          >
            {author && (
              <span>
                <span className="text-text-secondary font-medium">{author}</span>
                {authorRole && ` — ${authorRole}`}
              </span>
            )}
            {formattedDate && (
              <time dateTime={publishedAt}>{formattedDate}</time>
            )}
            {readingTime && (
              <span>{readingTime} min read</span>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared: architectural grid background
// ---------------------------------------------------------------------------

function HeroGrid({ opacity = 0.025 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
