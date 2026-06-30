"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SectionHeaderProps {
  /** Small label shown above the main heading */
  label?: string;
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  align?: "left" | "center";
  /** Animate on scroll into view */
  animate?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SectionHeader({
  label,
  heading,
  subheading,
  align = "left",
  animate = true,
  className,
}: SectionHeaderProps) {
  const commonClass = cn(
    "flex flex-col",
    align === "center" ? "items-center text-center" : "items-start text-left",
    "gap-4 max-w-3xl",
    align === "center" && "mx-auto",
    className,
  );

  if (!animate) {
    return (
      <div className={commonClass}>
        {label && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-blue font-sans">
            <span className="w-5 h-px bg-accent-blue" aria-hidden="true" />
            {label}
          </span>
        )}
        <h2 className="font-sans font-bold text-text-primary leading-[110%] text-4xl md:text-5xl lg:text-[56px]">
          {heading}
        </h2>
        {subheading && (
          <p className="text-base md:text-lg text-text-secondary font-sans leading-relaxed max-w-2xl">
            {subheading}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={commonClass}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {label && (
        <motion.span
          variants={fadeUpVariants}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-blue font-sans"
        >
          <span className="w-5 h-px bg-accent-blue" aria-hidden="true" />
          {label}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUpVariants}
        className="font-sans font-bold text-text-primary leading-[110%] text-4xl md:text-5xl lg:text-[56px]"
      >
        {heading}
      </motion.h2>

      {subheading && (
        <motion.p
          variants={fadeUpVariants}
          className="text-base md:text-lg text-text-secondary font-sans leading-relaxed max-w-2xl"
        >
          {subheading}
        </motion.p>
      )}
    </motion.div>
  );
}
