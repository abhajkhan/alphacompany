"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { FAQItem } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>([]);

  function toggle(id: string) {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  }

  return (
    <div className={cn("divide-y divide-divider-neutral", className)} role="list">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} role="listitem">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className={cn(
                "w-full flex items-center justify-between gap-4 py-5 text-left",
                "font-sans text-base font-medium",
                "text-text-primary transition-colors duration-200",
                "hover:text-accent-blue-hover",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-inset",
              )}
            >
              <span>{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="shrink-0 text-text-muted"
                aria-hidden="true"
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-8 text-base text-text-secondary font-sans leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ convenience wrapper
// ---------------------------------------------------------------------------

export function FAQ({ items, className }: { items: FAQItem[]; className?: string }) {
  const accordionItems: AccordionItem[] = items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  return <Accordion items={accordionItems} className={className} />;
}
