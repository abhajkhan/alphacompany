"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import type { TechItem } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TechnologyGridProps {
  items: TechItem[];
  /** Group by category with labeled sections */
  grouped?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Tech pill
// ---------------------------------------------------------------------------

function TechPill({ item }: { item: TechItem }) {
  return (
    <motion.div
      whileHover={{ y: -2, borderColor: "rgba(59,130,246,0.5)" }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-3 px-4 py-3 bg-surface border border-border-neutral rounded-[--radius-lg] cursor-default"
      role="listitem"
    >
      {/* Icon/Monogram */}
      <div
        className="w-8 h-8 rounded-[--radius-sm] bg-background-secondary flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <span className="text-xs font-mono font-bold text-accent-blue">
          {item.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-text-primary font-sans truncate group-hover:text-accent-blue-hover transition-colors">
          {item.name}
        </span>
        {item.description && (
          <span className="text-xs text-text-muted font-sans truncate">{item.description}</span>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Category label
// ---------------------------------------------------------------------------

const categoryLabels: Record<TechItem["category"], string> = {
  language: "Languages",
  framework: "Frameworks",
  cloud: "Cloud",
  devops: "DevOps",
  ai: "AI & ML",
  database: "Databases",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export function TechnologyGrid({ items, grouped = false, className }: TechnologyGridProps) {
  if (grouped) {
    const groups = items.reduce<Record<string, TechItem[]>>((acc, item) => {
      const key = categoryLabels[item.category];
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    return (
      <div className={cn("flex flex-col gap-10", className)}>
        {Object.entries(groups).map(([category, groupItems]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted font-sans mb-4">
              {category}
            </h3>
            <motion.div
              role="list"
              aria-label={category}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {groupItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <TechPill item={item} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      role="list"
      aria-label="Technology stack"
      className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item) => (
        <motion.div key={item.name} variants={itemVariants}>
          <TechPill item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
