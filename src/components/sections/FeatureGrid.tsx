"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import type { ServiceItem } from "@/types";
import { ServiceCard } from "@/components/ui/Cards";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FeatureGridProps {
  items: ServiceItem[];
  /** 3 or 6 item grid per Design System */
  columns?: 3 | 4;
  className?: string;
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FeatureGrid({ items, columns = 3, className }: FeatureGridProps) {
  const gridCols = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4",
        gridCols,
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      role="list"
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={itemVariants} role="listitem">
          <ServiceCard service={item} className="h-full" />
        </motion.div>
      ))}
    </motion.div>
  );
}
