"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show a dismiss (×) button */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Chip is in an inactive/deselected state */
  inactive?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, dismissible = false, onDismiss, inactive = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-[--radius-full]",
          "text-sm font-medium font-sans border transition-colors duration-200",
          inactive
            ? "bg-transparent text-text-muted border-border-neutral"
            : "bg-surface text-text-secondary border-border-neutral hover:border-accent-blue hover:text-text-primary",
          className,
        )}
        {...props}
      >
        {children}
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Remove"
            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <X size={10} aria-hidden="true" />
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";

export { Chip };
