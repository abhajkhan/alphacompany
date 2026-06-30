import * as React from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmptyStateProps {
  icon?: React.ReactNode;
  heading: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EmptyState({
  icon,
  heading,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center text-center gap-5 py-16 px-6",
        "border border-dashed border-border-neutral rounded-[--radius-xl]",
        className,
      )}
    >
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center rounded-[--radius-lg] bg-surface text-text-muted">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-sans font-semibold text-lg text-text-primary">{heading}</p>
        {description && (
          <p className="text-sm text-text-muted font-sans max-w-sm mx-auto">{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
