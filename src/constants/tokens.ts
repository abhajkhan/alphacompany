/**
 * Alpha Company Design System Tokens
 *
 * This file serves as the single source of truth for all design tokens
 * consumed by JavaScript/TypeScript code (e.g., Framer Motion, GSAP, Canvas).
 */

export const COLORS = {
  background: {
    primary: "#050505",
    secondary: "#101010",
  },
  surface: {
    default: "#171717",
    hover: "#202020",
  },
  border: {
    neutral: "#2A2A2A",
  },
  divider: {
    neutral: "#343434",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#C7C7C7",
    muted: "#8D8D8D",
    disabled: "#666666",
  },
  accent: {
    blue: "#3B82F6",
    blueHover: "#60A5FA",
    blueActive: "#2563EB",
  },
  semantic: {
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#0EA5E9",
  },
} as const;

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "96px",
  "5xl": "128px",
  "6xl": "160px",
} as const;

export const BORDER_RADIUS = {
  none: "0px",
  sm: "6px",
  md: "12px",
  lg: "18px",
  xl: "24px",
  full: "9999px",
} as const;

export const FONTS = {
  sans: "var(--font-space-grotesk)",
  secondary: "var(--font-inter)",
  mono: "var(--font-jetbrains-mono)",
} as const;

export const NAVIGATION_SPEC = {
  scroll: {
    triggerStart: 64, // px
    triggerEnd: 80, // px
    duration: 300, // ms
    easing: "easeOutQuart", // cubic-bezier(0.16, 1, 0.3, 1) or equivalent
  },
  style: {
    default: {
      background: "transparent",
      blur: "0px",
      border: "none",
      shadow: "none",
      logoScale: 1.0,
      textColor: "#FFFFFF",
    },
    scrolled: {
      background: "rgba(5, 5, 5, 0.82)",
      blur: "16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      shadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
      logoScale: 0.94,
      textColor: "#FFFFFF",
      textHoverColor: "#3B82F6",
    },
  },
  mobile: {
    menuOpen: {
      background: "#050505",
      blur: "20px",
      fadeDuration: 250, // ms
    },
  },
} as const;
