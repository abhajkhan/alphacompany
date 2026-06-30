"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant.
   * primary — Electric Blue background (main CTA)
   * secondary — Outline with neutral border
   * ghost — No border, surface hover
   * danger — Red for destructive actions
   */
  variant?: ButtonVariant;
  /** Size preset controlling padding and font size */
  size?: ButtonSize;
  /** Replaces children with a spinner and disables the button */
  isLoading?: boolean;
  /** Loading label announced to screen readers (replaces children text) */
  loadingLabel?: string;
  /** Show a trailing arrow icon (primary & secondary only) */
  showArrow?: boolean;
  /** Renders an anchor tag instead of a button */
  asChild?: boolean;
}

// ---------------------------------------------------------------------------
// Variant maps (Tailwind classes using design-system tokens)
// ---------------------------------------------------------------------------

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent-blue text-white",
    "hover:bg-accent-blue-hover hover:-translate-y-0.5",
    "focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
    "active:bg-accent-blue-active active:translate-y-0",
    "disabled:bg-text-disabled disabled:cursor-not-allowed",
  ].join(" "),

  secondary: [
    "bg-transparent text-text-primary border border-border-neutral",
    "hover:border-accent-blue hover:text-accent-blue-hover hover:-translate-y-0.5",
    "focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
    "active:translate-y-0",
    "disabled:border-text-disabled disabled:text-text-disabled disabled:cursor-not-allowed",
  ].join(" "),

  ghost: [
    "bg-transparent text-text-secondary",
    "hover:bg-surface hover:text-text-primary",
    "focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
    "disabled:text-text-disabled disabled:cursor-not-allowed",
  ].join(" "),

  danger: [
    "bg-danger text-white",
    "hover:bg-danger/90 hover:-translate-y-0.5",
    "focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
    "active:bg-danger/80 active:translate-y-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-[--radius-md]",
  md: "h-11 px-7 text-base gap-2 rounded-[--radius-md]",
  lg: "h-14 px-8 text-lg gap-2.5 rounded-[--radius-md]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingLabel = "Loading…",
      showArrow = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center font-sans font-medium",
          "transition-all duration-200 ease-out",
          "select-none whitespace-nowrap",
          "focus:outline-none focus-visible:outline-none",
          // Variant + size
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading ? (
          <>
            <Loader2
              className="animate-spin"
              size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
              aria-hidden="true"
            />
            <span className="sr-only">{loadingLabel}</span>
            <span aria-hidden="true">{children}</span>
          </>
        ) : (
          <>
            {children}
            {showArrow && (variant === "primary" || variant === "secondary") && (
              <motion.span
                className="inline-flex"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
              >
                <ArrowRight size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
              </motion.span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
