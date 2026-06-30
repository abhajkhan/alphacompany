import * as React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /** Name used for initials fallback and alt text */
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const sizeMap: Record<AvatarSize, { px: number; text: string }> = {
  xs: { px: 28, text: "text-xs" },
  sm: { px: 36, text: "text-sm" },
  md: { px: 44, text: "text-base" },
  lg: { px: 56, text: "text-lg" },
  xl: { px: 72, text: "text-xl" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function getColorFromName(name: string): string {
  // Deterministic color pick from accent palette
  const colors = [
    "bg-accent-blue/20 text-accent-blue",
    "bg-success/20 text-success",
    "bg-warning/20 text-warning",
    "bg-info/20 text-info",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Avatar = React.forwardRef<
  HTMLSpanElement,
  AvatarProps & React.HTMLAttributes<HTMLSpanElement>
>(({ name, src, size = "md", className, ...props }, ref) => {
  const [imgError, setImgError] = React.useState(false);
  const { px, text } = sizeMap[size];
  const showImage = src && !imgError;

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 rounded-[--radius-full] overflow-hidden select-none",
        !showImage && getColorFromName(name),
        !showImage && "border border-border-neutral",
        className,
      )}
      style={{ width: px, height: px }}
      aria-label={name}
      {...props}
    >
      {showImage ? (
        <Image
          src={src}
          alt={name}
          width={px}
          height={px}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={cn("font-semibold font-sans", text)} aria-hidden="true">
          {getInitials(name)}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";

export { Avatar };
