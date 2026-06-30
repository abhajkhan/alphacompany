"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CTABannerProps {
  heading?: React.ReactNode;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CTABanner({
  heading = (
    <>
      Ready to Build Something
      <br />
      Exceptional?
    </>
  ),
  subheading = "Whether you're starting with an idea or improving an existing platform, Alpha Company is ready to help.",
  primaryLabel = "Start a Project",
  primaryHref = "/contact",
  secondaryLabel = "Explore Our Work",
  secondaryHref = "/case-studies",
  className,
}: CTABannerProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className={cn(
        "relative overflow-hidden bg-background-secondary border-t border-b border-divider-neutral",
        "py-[120px] lg:min-h-[60vh] flex items-center",
        className,
      )}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          className="relative text-center flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="cta-heading"
            className="font-sans font-bold text-text-primary leading-[110%] text-4xl sm:text-5xl lg:text-6xl"
          >
            {heading}
          </h2>

          {subheading && (
            <p className="text-base sm:text-lg text-text-secondary font-sans">
              {subheading}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href={primaryHref} tabIndex={-1}>
              <Button variant="primary" size="lg" showArrow>
                {primaryLabel}
              </Button>
            </Link>
            {secondaryLabel && (
              <Link href={secondaryHref ?? "#"} tabIndex={-1}>
                <Button variant="secondary" size="lg">
                  {secondaryLabel}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
