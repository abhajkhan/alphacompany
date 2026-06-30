"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import type { StatItem } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StatisticProps {
  stat: StatItem;
  className?: string;
}

export interface StatisticGridProps {
  stats: StatItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Animated number counter
// ---------------------------------------------------------------------------

function AnimatedNumber({ value }: { value: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Try to extract numeric part for animation
  const numericMatch = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  const numericPart = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericMatch ? numericMatch[2] : value;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 20, stiffness: 80 });
  const [displayValue, setDisplayValue] = React.useState("0");

  React.useEffect(() => {
    if (isInView && numericPart !== null) {
      motionValue.set(numericPart);
    }
  }, [isInView, numericPart, motionValue]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      if (numericPart !== null) {
        const formatted = Number.isInteger(numericPart)
          ? Math.round(v).toLocaleString()
          : v.toFixed(1);
        setDisplayValue(formatted + suffix);
      }
    });
    return unsubscribe;
  }, [springValue, numericPart, suffix]);

  if (numericPart === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} aria-label={value}>
      {isInView ? displayValue : "0" + suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Single Statistic
// ---------------------------------------------------------------------------

export function Statistic({ stat, className }: StatisticProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="font-sans font-bold text-text-primary leading-none text-4xl md:text-5xl tracking-tight">
        <AnimatedNumber value={stat.value} />
        {stat.suffix && (
          <span className="text-accent-blue ml-0.5">{stat.suffix}</span>
        )}
      </p>
      <p className="text-sm text-text-muted font-sans">{stat.label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Statistic grid (layout)
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StatisticGrid({ stats, className }: StatisticGridProps) {
  return (
    <motion.div
      className={cn("grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {stats.map((stat, i) => (
        <motion.div key={i} variants={itemVariants}>
          <Statistic stat={stat} />
        </motion.div>
      ))}
    </motion.div>
  );
}
