"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import type { ProcessStep } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TimelineProps {
  steps: ProcessStep[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
  }),
};

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn(className)}>
      {/* Desktop: vertical timeline */}
      <div className="hidden md:block">
        <VerticalTimeline steps={steps} />
      </div>

      {/* Mobile: horizontal scrollable cards */}
      <div className="md:hidden">
        <HorizontalTimeline steps={steps} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Vertical Timeline (Desktop)
// ---------------------------------------------------------------------------

function VerticalTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative flex flex-col gap-0" aria-label="Engineering process">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <motion.li
            key={step.step}
            custom={i}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex gap-6"
          >
            {/* Connector column */}
            <div className="flex flex-col items-center">
              {/* Step dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-[--radius-full] border border-accent-blue/40 bg-background-primary shrink-0 z-10">
                <span className="text-xs font-mono text-accent-blue font-semibold">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              {/* Vertical line */}
              {!isLast && (
                <div className="w-px flex-1 bg-gradient-to-b from-accent-blue/30 to-transparent mt-1" />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-12", isLast && "pb-0")}>
              <h3 className="font-sans font-semibold text-xl text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-base text-text-secondary font-sans leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// Horizontal Timeline (Mobile)
// ---------------------------------------------------------------------------

function HorizontalTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
      aria-label="Engineering process"
      role="list"
    >
      {steps.map((step, i) => (
        <motion.div
          key={step.step}
          role="listitem"
          custom={i}
          variants={stepVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="snap-start shrink-0 w-64 bg-surface border border-border-neutral rounded-[--radius-lg] p-5 flex flex-col gap-3"
        >
          <span className="font-mono text-xs text-accent-blue font-semibold">
            {String(step.step).padStart(2, "0")}
          </span>
          <h3 className="font-sans font-semibold text-base text-text-primary">
            {step.title}
          </h3>
          <p className="text-sm text-text-secondary font-sans leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
