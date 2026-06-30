"use client";

import { type ReactNode, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  LayoutGrid,
  Menu,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SegmentedNavItem {
  label: string;
  icon: ReactNode;
  href?: string;
}

export interface NavbarSegmentedProps {
  brand?: string;
  items?: SegmentedNavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: SegmentedNavItem[] = [
  { label: "Overview", icon: <Sparkles className="size-4" /> },
  { label: "Features", icon: <LayoutGrid className="size-4" /> },
  { label: "Insights", icon: <BarChart3 className="size-4" /> },
  { label: "Docs", icon: <BookOpen className="size-4" /> },
];

/**
 * NavbarSegmented — a full-width bar whose primary navigation is a segmented
 * control: a single pill slides behind the active item (shared-layout
 * `layoutId`, scoped with `useId`, disabled under reduced-motion). Each item is
 * a tab with `aria-current`; the control collapses to a stacked menu on mobile.
 */
export function NavbarSegmented({
  brand = "Lumen",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  className,
}: NavbarSegmentedProps) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-border bg-background p-1 md:flex">
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <button
                key={item.label}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(i)}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${baseId}-seg`}
                    aria-hidden
                    className="absolute inset-0 -z-0 rounded-full bg-surface shadow-sm ring-1 ring-border"
                    transition={
                      reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative z-10 text-brand-ink">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Star"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-background sm:inline-flex"
          >
            <Star className="size-4 text-brand-3" />
            2.4k
          </button>
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:inline-flex"
          >
            {ctaLabel}
            <ArrowRight className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-3 py-3 md:hidden">
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-current={active === i ? "page" : undefined}
              onClick={() => {
                setActive(i);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                active === i
                  ? "bg-background font-medium text-foreground"
                  : "text-muted hover:bg-background hover:text-foreground",
              )}
            >
              <span className="text-brand-ink">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="mt-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </nav>
  );
}
