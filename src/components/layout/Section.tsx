import * as React from "react";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Section
// Wraps a page section with the correct vertical rhythm from the Design System.
// Desktop: 120px, Tablet: 96px, Mobile: 72px
// ---------------------------------------------------------------------------

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Use a different semantic element */
  as?: "section" | "div" | "article" | "aside";
  /** Override default background */
  background?: "primary" | "secondary" | "surface" | "none";
}

const backgroundClasses: Record<string, string> = {
  primary: "bg-background-primary",
  secondary: "bg-background-secondary",
  surface: "bg-surface",
  none: "",
};

export function Section({
  as: As = "section",
  background = "none",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <As
      className={cn(
        "py-[72px] md:py-24 lg:py-[120px]",
        backgroundClasses[background],
        className,
      )}
      {...props}
    >
      {children}
    </As>
  );
}
