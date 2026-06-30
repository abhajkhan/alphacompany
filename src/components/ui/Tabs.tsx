"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  /** Optional icon */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onTabChange?: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Tabs({
  items,
  defaultActiveId,
  orientation = "horizontal",
  className,
  onTabChange,
}: TabsProps) {
  const [activeId, setActiveId] = React.useState(defaultActiveId ?? items[0]?.id);

  function handleActivate(id: string) {
    setActiveId(id);
    onTabChange?.(id);
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    const enabledItems = items.filter((i) => !i.disabled);
    const currentEnabledIdx = enabledItems.findIndex((i) => i.id === items[index].id);

    if (orientation === "horizontal") {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = enabledItems[(currentEnabledIdx + 1) % enabledItems.length];
        handleActivate(next.id);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = enabledItems[(currentEnabledIdx - 1 + enabledItems.length) % enabledItems.length];
        handleActivate(prev.id);
      }
    } else {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = enabledItems[(currentEnabledIdx + 1) % enabledItems.length];
        handleActivate(next.id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = enabledItems[(currentEnabledIdx - 1 + enabledItems.length) % enabledItems.length];
        handleActivate(prev.id);
      }
    }
  }

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div
      className={cn(
        orientation === "vertical" ? "flex gap-8" : "flex flex-col",
        className,
      )}
    >
      {/* Tab list */}
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          orientation === "vertical"
            ? "flex flex-col gap-1 shrink-0 w-48 border-r border-divider-neutral pr-4"
            : "flex flex-row border-b border-divider-neutral",
        )}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              aria-disabled={item.disabled}
              disabled={item.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !item.disabled && handleActivate(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative flex items-center gap-2 font-sans text-sm font-medium transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-inset",
                orientation === "vertical"
                  ? "w-full text-left px-3 py-2.5 rounded-[--radius-sm]"
                  : "px-4 py-3 -mb-px",
                isActive
                  ? "text-text-primary"
                  : "text-text-muted hover:text-text-secondary",
                item.disabled && "opacity-40 cursor-not-allowed",
              )}
            >
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              {item.label}
              {/* Active indicator */}
              {isActive && orientation === "horizontal" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
              {isActive && orientation === "vertical" && (
                <motion.div
                  layoutId="tab-indicator-v"
                  className="absolute inset-0 bg-surface rounded-[--radius-sm]"
                  style={{ zIndex: -1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className="flex-1 min-w-0">
        {items.map((item) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`tabpanel-${item.id}`}
            aria-labelledby={`tab-${item.id}`}
            hidden={item.id !== activeId}
            tabIndex={0}
            className="focus:outline-none"
          >
            {item.id === activeId && item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
