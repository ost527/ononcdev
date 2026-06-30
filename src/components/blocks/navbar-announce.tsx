"use client";

import { type ReactNode, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Megaphone, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnnounceNavItem {
  label: string;
  href?: string;
}

export interface NavbarAnnounceProps {
  brand?: string;
  items?: AnnounceNavItem[];
  announcement?: ReactNode;
  announcementCtaLabel?: string;
  ctaLabel?: string;
  signInLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: AnnounceNavItem[] = [
  { label: "Features" },
  { label: "Solutions" },
  { label: "Pricing" },
  { label: "Docs" },
];

/**
 * NavbarAnnounce — a two-tier header: a dismissible gradient announcement strip
 * above the main navigation. Dismissing collapses the strip (height + fade, or
 * a plain fade under reduced-motion) and leaves the nav in place. The nav
 * collapses to a toggle menu on small screens.
 */
export function NavbarAnnounce({
  brand = "Lumen",
  items = DEFAULT_ITEMS,
  announcement = "Lumen UI 1.1 is here — six new navigation blocks.",
  announcementCtaLabel = "See what's new",
  ctaLabel = "Get started",
  signInLabel = "Sign in",
  className,
}: NavbarAnnounceProps) {
  const [showStrip, setShowStrip] = useState(true);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {showStrip && (
          <motion.div
            key="announce-strip"
            role="region"
            aria-label="Announcement"
            initial={false}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-border bg-gradient-to-r from-brand/15 via-brand-2/10 to-brand-3/15"
          >
            <div className="flex items-center gap-x-3 px-4 py-2.5 text-sm">
              <Megaphone className="size-4 shrink-0 text-brand-ink" aria-hidden />
              <p className="min-w-0 flex-1 truncate text-foreground">
                {announcement}
                <a
                  href="#"
                  className="ml-2 hidden font-medium text-brand-ink hover:underline sm:inline-flex sm:items-center sm:gap-0.5"
                >
                  {announcementCtaLabel}
                  <ArrowRight className="size-3.5" />
                </a>
              </p>
              <button
                type="button"
                onClick={() => setShowStrip(false)}
                aria-label="Dismiss announcement"
                className="grid size-7 shrink-0 place-items-center rounded-md text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav aria-label="Primary">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
              <Sparkles className="size-4" />
            </span>
            {brand}
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {signInLabel}
            </a>
            <button
              type="button"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {ctaLabel}
            </button>
          </div>

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

        {open && (
          <div className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <a
                href="#"
                className="rounded-full border border-border px-4 py-2 text-center text-sm font-medium text-foreground"
              >
                {signInLabel}
              </a>
              <button
                type="button"
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
