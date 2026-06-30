"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { StatusVariant } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: StatusVariant;
  duration?: number;
}

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const icons: Record<StatusVariant, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-success shrink-0" />,
  warning: <AlertTriangle size={18} className="text-warning shrink-0" />,
  danger: <XCircle size={18} className="text-danger shrink-0" />,
  info: <Info size={18} className="text-info shrink-0" />,
  neutral: <Info size={18} className="text-text-muted shrink-0" />,
};

// ---------------------------------------------------------------------------
// Toast item
// ---------------------------------------------------------------------------

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  const variant = toast.variant ?? "neutral";

  React.useEffect(() => {
    const duration = toast.duration ?? 4000;
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex items-start gap-3 w-full max-w-sm pointer-events-auto",
        "bg-surface border border-border-neutral rounded-[--radius-lg]",
        "px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
      )}
    >
      {icons[variant]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary font-sans">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-sm text-text-secondary font-sans">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="p-0.5 text-text-muted hover:text-text-primary transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Context & Provider
// ---------------------------------------------------------------------------

interface ToastContextValue {
  toast: (msg: Omit<ToastMessage, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...msg, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
