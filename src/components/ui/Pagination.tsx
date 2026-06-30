"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  /** Maximum page number buttons to show (excluding ellipsis) */
  siblingCount?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helper — generate page range
// ---------------------------------------------------------------------------

function getPageRange(current: number, total: number, siblings: number): (number | "…")[] {
  const totalShown = siblings * 2 + 5; // siblings + current + 2 edges + 2 ellipsis slots

  if (total <= totalShown) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblings, 1);
  const rightSiblingIndex = Math.min(current + siblings, total);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  const result: (number | "…")[] = [1];

  if (showLeftEllipsis) result.push("…");
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) result.push(i);
  if (showRightEllipsis) result.push("…");
  result.push(total);

  return result;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, siblingCount);

  const buttonBase =
    "inline-flex items-center justify-center h-9 min-w-9 px-2 rounded-[--radius-sm] text-sm font-medium font-sans transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue";

  return (
    <nav
      aria-label="Pagination navigation"
      className={cn("flex items-center gap-1", className)}
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          buttonBase,
          "text-text-secondary hover:text-text-primary hover:bg-surface",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        )}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="inline-flex items-center justify-center h-9 w-9 text-text-muted text-sm"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              buttonBase,
              page === currentPage
                ? "bg-accent-blue text-white"
                : "text-text-secondary hover:text-text-primary hover:bg-surface",
            )}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={cn(
          buttonBase,
          "text-text-secondary hover:text-text-primary hover:bg-surface",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        )}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
