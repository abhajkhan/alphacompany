import * as React from "react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// LoadingState
// Supports: skeleton (preferred) and spinner (short tasks only)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Skeleton primitives
// ---------------------------------------------------------------------------

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width as Tailwind class or explicit value */
  width?: string;
  height?: string;
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-[--radius-sm] bg-surface animate-pulse",
        className,
      )}
      style={style}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const spinnerSizes = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
};

export function Spinner({ size = "md", label = "Loading…", className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex", className)}>
      <span
        className={cn(
          "rounded-full border-border-neutral border-t-accent-blue animate-spin",
          spinnerSizes[size],
        )}
        aria-hidden="true"
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Skeleton card (matches card dimensions)
// ---------------------------------------------------------------------------

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-surface border border-border-neutral rounded-[20px] p-8 flex flex-col gap-4",
        className,
      )}
    >
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/4 mt-2" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton article card
// ---------------------------------------------------------------------------

export function SkeletonArticle({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-surface border border-border-neutral rounded-[20px] overflow-hidden flex flex-col gap-0",
        className,
      )}
    >
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 flex flex-col gap-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Full-page loading state
// ---------------------------------------------------------------------------

export function PageLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="min-h-screen flex items-center justify-center bg-background-primary"
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-text-muted font-sans animate-pulse">Loading…</p>
      </div>
    </div>
  );
}
