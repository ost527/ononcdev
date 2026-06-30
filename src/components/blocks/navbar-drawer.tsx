"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowUpRight, AtSign, Globe, Menu, Rss, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerNavItem {
  label: string;
  href?: string;
}

export interface NavbarDrawerProps {
  brand?: string;
  items?: DrawerNavItem[];
  secondaryItems?: DrawerNavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: DrawerNavItem[] = [
  { label: "Work" },
  { label: "Services" },
  { label: "Studio" },
  { label: "Journal" },
  { label: "Contact" },
];
const DEFAULT_SECONDARY: DrawerNavItem[] = [
  { label: "Support" },
  { label: "Changelog" },
  { label: "Privacy" },
];

/**
 * NavbarDrawer — a minimal bar whose menu opens a premium slide-in drawer. The
 * drawer is scoped to this section (not a full-page overlay) so it previews in
 * context: it dims the page with a backdrop, moves focus to its close button on
 * open, returns focus to the trigger on close, and closes on Escape or backdrop
 * click. Link reveal staggers in, and collapses to a fade under reduced-motion.
 */
export function NavbarDrawer({
  brand = "Lumen",
  items = DEFAULT_ITEMS,
  secondaryItems = DEFAULT_SECONDARY,
  ctaLabel = "Start a project",
  className,
}: NavbarDrawerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // Honor reduced-motion: no stagger, no horizontal slide — links just appear.
  const listVariants: Variants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
      };
  const itemVariants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 16 },
        show: {
          opacity: 1,
          x: 0,
          transition: { type: "spring", stiffness: 320, damping: 30 },
        },
      };

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div
      className={cn(
        "relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:inline-block">
            {ctaLabel}
          </button>
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="drawer-nav-panel"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
          >
            <Menu className="size-4" />
            Menu
          </button>
        </div>
      </div>

      {/* Faux page context so the drawer previews against real content */}
      <div className="relative z-0 flex flex-1 flex-col justify-center px-5 pb-10 pt-4">
        <span className="text-xs font-medium uppercase tracking-widest text-brand-ink">
          Design studio
        </span>
        <h2 className="mt-2 max-w-md text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Interfaces with intent, crafted end to end.
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Open the menu to explore the full navigation drawer.
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm"
          />
        )}
        {open && (
          <motion.div
            key="drawer-panel"
            id="drawer-nav-panel"
            role="dialog"
            aria-label="Site menu"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="absolute inset-y-0 right-0 z-30 flex w-[min(20rem,88%)] flex-col border-l border-border bg-surface p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-2">
                Menu
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-8 place-items-center rounded-lg text-muted outline-none transition-colors hover:bg-background hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <motion.nav
              aria-label="Site"
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="mt-4 flex flex-col"
            >
              {items.map((item, i) => (
                <motion.a
                  key={item.label}
                  variants={itemVariants}
                  href={item.href ?? "#"}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-3 border-b border-border py-3 text-lg font-medium text-foreground"
                >
                  <span className="w-6 text-xs font-normal tabular-nums text-muted-2">
                    0{i + 1}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight className="size-4 -translate-x-1 self-center text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                </motion.a>
              ))}
            </motion.nav>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {secondaryItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  className="text-xs text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <button className="w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90">
                {ctaLabel}
              </button>
              <div className="mt-4 flex gap-2">
                {[
                  { Icon: Globe, label: "Website" },
                  { Icon: AtSign, label: "Email" },
                  { Icon: Rss, label: "Blog feed" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
