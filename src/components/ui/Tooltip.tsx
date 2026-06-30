"use client";

import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// We use Radix UI's Tooltip primitive for robust keyboard + pointer handling.
// Fallback: if Radix is not available, we export a simplified CSS version.
// ---------------------------------------------------------------------------

// Check if Radix is available at import time
const RadixAvailable = !!RadixTooltip.Root;

export interface TooltipProps {
  /** The trigger element */
  children: React.ReactElement;
  /** Tooltip label content */
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 300,
  className,
}: TooltipProps) {
  if (!RadixAvailable) {
    // No-op fallback: render the trigger child without a tooltip
    return children;
  }

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 px-3 py-1.5 rounded-[--radius-sm]",
              "bg-surface border border-border-neutral",
              "text-xs font-medium text-text-primary font-sans",
              "shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=top]:slide-in-from-bottom-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              className,
            )}
          >
            {content}
            <RadixTooltip.Arrow className="fill-border-neutral" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
