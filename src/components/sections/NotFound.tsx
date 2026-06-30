import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NotFoundProps {
  /** Override the error code */
  code?: string;
  heading?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NotFound({
  code = "404",
  heading = "Page not found.",
  description = "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
  primaryLabel = "Back to Home",
  primaryHref = "/",
  className,
}: NotFoundProps) {
  return (
    <div
      className={cn(
        "min-h-[60vh] flex flex-col items-center justify-center text-center gap-8 py-24 px-6",
        className,
      )}
    >
      {/* Large code */}
      <p
        className="font-sans font-bold text-text-primary/5 select-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 18rem)", lineHeight: 1 }}
        aria-hidden="true"
      >
        {code}
      </p>

      <div className="flex flex-col items-center gap-4 -mt-16">
        <h1 className="font-sans font-bold text-3xl sm:text-4xl text-text-primary">
          {heading}
        </h1>
        <p className="text-base text-text-secondary font-sans max-w-md">{description}</p>

        <Link href={primaryHref} tabIndex={-1} className="mt-4">
          <Button variant="primary" size="md" showArrow>
            <ArrowLeft size={16} aria-hidden="true" className="mr-1" />
            {primaryLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
