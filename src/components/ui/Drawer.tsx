"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Side the drawer slides in from */
  side?: "right" | "left";
  children: React.ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Drawer({ open, onClose, title, side = "right", children, className }: DrawerProps) {
  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock body scroll when open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const titleId = React.useId();

  const slideVariant = {
    hidden: { x: side === "right" ? "100%" : "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: side === "right" ? "100%" : "-100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            className={cn(
              "fixed top-0 bottom-0 z-50 flex flex-col",
              "w-full max-w-sm",
              "bg-background-primary border-border-neutral",
              side === "right" ? "right-0 border-l" : "left-0 border-r",
              className,
            )}
            variants={slideVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-divider-neutral">
              {title ? (
                <h2 id={titleId} className="text-lg font-semibold text-text-primary font-sans">
                  {title}
                </h2>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="p-1.5 rounded-[--radius-sm] text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
