"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { cn } from "@/utils/cn";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { NAVIGATION_SPEC } from "@/constants/tokens";
import type { NavItem } from "@/types";

// ---------------------------------------------------------------------------
// Navigation items
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const { scrollY } = useScroll();

  const { triggerStart, triggerEnd } = NAVIGATION_SPEC.scroll;

  // Detect prefers-reduced-motion
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Interpolated motion values (64–80px range)
  const bgAlpha = useTransform(scrollY, [triggerStart, triggerEnd], [0, 0.82]);
  const blurPx  = useTransform(scrollY, [triggerStart, triggerEnd], [0, 16]);
  const borderAlpha = useTransform(scrollY, [triggerStart, triggerEnd], [0, 0.06]);
  const logoScale   = useTransform(scrollY, [triggerStart, triggerEnd], [1, 0.94]);
  const shadowAlpha = useTransform(scrollY, [triggerStart, triggerEnd], [0, 0.18]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <NavbarInner
          prefersReducedMotion={prefersReducedMotion}
          bgAlpha={bgAlpha}
          blurPx={blurPx}
          borderAlpha={borderAlpha}
          logoScale={logoScale}
          shadowAlpha={shadowAlpha}
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen((o) => !o)}
        />
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <MobileMenu
          items={NAV_ITEMS}
          prefersReducedMotion={prefersReducedMotion}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// NavbarInner
// ---------------------------------------------------------------------------

interface NavbarInnerProps {
  prefersReducedMotion: boolean;
  bgAlpha: MotionValue<number>;
  blurPx: MotionValue<number>;
  borderAlpha: MotionValue<number>;
  logoScale: MotionValue<number>;
  shadowAlpha: MotionValue<number>;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

function NavbarInner({
  prefersReducedMotion,
  bgAlpha,
  blurPx,
  borderAlpha,
  logoScale,
  shadowAlpha,
  mobileOpen,
  onMobileToggle,
}: NavbarInnerProps) {
  // Build CSS values from motion values using template strings
  const background = useMotionTemplate`rgba(5, 5, 5, ${bgAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;
  const borderBottomColor = useMotionTemplate`rgba(255, 255, 255, ${borderAlpha})`;
  const boxShadow = useMotionTemplate`0 8px 24px rgba(0, 0, 0, ${shadowAlpha})`;

  const motionStyle = prefersReducedMotion ? {} : { background, backdropFilter, borderBottomColor, boxShadow };
  const reducedStyle = prefersReducedMotion
    ? { transition: "none" } // Jumps abruptly — handled by scroll event below
    : {};

  return (
    <motion.div
      className="border-b border-transparent"
      style={motionStyle}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <Container>
        <div className="relative h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            style={prefersReducedMotion ? {} : { scale: logoScale }}
            className="origin-left"
          >
            <Link
              href="/"
              aria-label="Alpha Company — Home"
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
            >
              <AlphaLogo />
              <span className="font-sans font-semibold text-lg text-text-primary tracking-tight">
                Alpha<span className="text-accent-blue">.</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-accent-blue-hover transition-colors duration-200 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" tabIndex={-1}>
              <Button variant="primary" size="sm" showArrow>
                Start a Project
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={onMobileToggle}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
          >
            {mobileOpen
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />
            }
          </button>
        </div>
      </Container>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Mobile full-screen menu
// ---------------------------------------------------------------------------

function MobileMenu({
  items,
  prefersReducedMotion,
  onClose,
}: {
  items: NavItem[];
  prefersReducedMotion: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-30 flex flex-col bg-background-primary lg:hidden"
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
    >
      <div className="h-20" aria-hidden="true" />
      <nav
        className="flex-1 flex flex-col justify-center px-6 gap-2"
        aria-label="Mobile navigation"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.href}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="block py-3 text-2xl font-semibold text-text-primary hover:text-accent-blue transition-colors font-sans focus:outline-none focus-visible:underline"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: items.length * 0.06, duration: 0.3 }
          }
          className="mt-6"
        >
          <Link href="/contact" onClick={onClose}>
            <Button variant="primary" size="lg" showArrow className="w-full justify-center">
              Start a Project
            </Button>
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Alpha logo mark (inline SVG)
// ---------------------------------------------------------------------------

function AlphaLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="6" fill="#3B82F6" fillOpacity="0.15" />
      <path
        d="M14 6L21 21H7L14 6Z"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="9.5" y1="16" x2="18.5" y2="16" stroke="#3B82F6" strokeWidth="1.5" />
    </svg>
  );
}
