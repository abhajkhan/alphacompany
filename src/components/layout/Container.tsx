import * as React from "react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Container
// Enforces max-w-[1280px] centered layout with responsive padding per grid spec.
// ---------------------------------------------------------------------------

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove the max-width constraint */
  fluid?: boolean;
}

export function Container({ className, fluid = false, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-5 sm:px-8 lg:px-10",
        !fluid && "max-w-[1280px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
