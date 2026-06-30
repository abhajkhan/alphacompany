import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className="flex items-center flex-wrap gap-x-1 gap-y-0.5"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex items-center gap-1"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className={cn(
                    "text-sm font-medium font-sans text-text-muted",
                    "hover:text-text-primary transition-colors duration-200",
                    "focus:outline-none focus-visible:underline focus-visible:text-accent-blue",
                  )}
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  className="text-sm font-medium font-sans text-text-secondary"
                  aria-current={isLast ? "page" : undefined}
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  className="text-text-disabled shrink-0"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
