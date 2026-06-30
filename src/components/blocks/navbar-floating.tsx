"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingNavItem {
  label: string;
  href?: string;
}

export interface NavbarFloatingProps {
  brand?: string;
  items?: FloatingNavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: FloatingNavItem[] = [
  { label: "Home" },
  { label: "Features" },
  { label: "Docs" },
  { label: "Pricing" },
  { label: "Blog" },
];

/**
 * NavbarFloating — a centered, glass "island" navigation pill. A single
 * highlight slides between links (shared-layout `layoutId`) following hover and
 * keyboard focus, settling back on the active item. Collapses to a floating
 * panel on small screens. The slide is disabled under reduced-motion.
 */
export function NavbarFloating({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  className,
}: NavbarFloatingProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const highlighted = hovered ?? active;

  return (
    <div className={cn("flex justify-center px-2", className)}>
      <nav aria-label="Primary" className="w-full max-w-2xl">
        <div className="flex items-center gap-1 rounded-full border border-border bg-surface/70 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
          <a
            href="#"
            className="ml-1 flex shrink-0 items-center gap-2 pr-1 font-semibold"
          >
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white">
              <Sparkles className="size-4" />
            </span>
            <span className="hidden sm:inline">{brand}</span>
          </a>

          <div
            className="relative hidden flex-1 items-center justify-center gap-0.5 md:flex"
            onPointerLeave={() => setHovered(null)}
          >
            {items.map((item, i) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                aria-current={active === i ? "page" : undefined}
                onClick={() => setActive(i)}
                onPointerEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  highlighted === i ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {highlighted === i && (
                  <motion.span
                    layoutId="floating-nav-highlight"
                    aria-hidden
                    className="absolute inset-0 -z-0 rounded-full border border-border bg-background"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          <button className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 md:inline-flex">
            {ctaLabel}
            <ArrowRight className="size-3.5" />
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="mt-2 overflow-hidden rounded-3xl border border-border bg-surface/90 p-2 shadow-xl backdrop-blur-xl md:hidden"
            >
              {items.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  aria-current={active === i ? "page" : undefined}
                  onClick={() => {
                    setActive(i);
                    setOpen(false);
                  }}
                  className={cn(
                    "block rounded-2xl px-4 py-2.5 text-sm transition-colors",
                    active === i
                      ? "bg-background text-foreground"
                      : "text-muted hover:bg-background hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <button className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white">
                {ctaLabel}
                <ArrowRight className="size-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
