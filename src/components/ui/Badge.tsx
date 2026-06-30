import * as React from "react";
import { cn } from "@/utils/cn";
import type { StatusVariant } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BadgeVariant = StatusVariant | "outline" | "tech";
type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// ---------------------------------------------------------------------------
// Variant maps
// ---------------------------------------------------------------------------

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-success/15 text-success border border-success/30",
  warning: "bg-warning/15 text-warning border border-warning/30",
  danger: "bg-danger/15 text-danger border border-danger/30",
  info: "bg-info/15 text-info border border-info/30",
  neutral: "bg-surface text-text-secondary border border-border-neutral",
  outline: "bg-transparent text-text-secondary border border-border-neutral",
  tech: "bg-background-secondary text-accent-blue border border-accent-blue/20",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", size = "md", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-[--radius-full] font-sans font-medium tracking-wide",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
