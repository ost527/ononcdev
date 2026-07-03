"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AutoHideNavItem {
  label: string;
  href?: string;
}

export interface NavbarAutoHideProps {
  brand?: string;
  items?: AutoHideNavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: AutoHideNavItem[] = [
  { label: "Overview" },
  { label: "Features" },
  { label: "Pricing" },
  { label: "Docs" },
];

/**
 * NavbarAutoHide — a sticky header that slides away when scrolling down and
 * reveals on the first scroll up (and is always shown near the top), gaining a
 * glass backdrop once scrolled. The block embeds a focusable scroll region so
 * the behavior previews in place. Under reduced-motion the bar never hides.
 */
export function NavbarAutoHide({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  className,
}: NavbarAutoHideProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const y = el.scrollTop;
    setScrolled(y > 8);
    if (y < 64) setHidden(false);
    else if (y > lastY.current + 4) setHidden(true);
    else if (y < lastY.current - 4) setHidden(false);
    lastY.current = y;
  };

  const effectiveHidden = reduce ? false : hidden;

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      tabIndex={0}
      role="region"
      aria-label="Auto-hide navbar demo — scroll down to hide, up to reveal"
      className={cn(
        "relative h-[26rem] overflow-y-auto rounded-2xl border border-border bg-background [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <header
        className={cn(
          "sticky top-0 z-20 transition-all duration-300",
          effectiveHidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "border-b border-border bg-surface/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
              <Sparkles className="size-4" />
            </span>
            {brand}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {items.map((item, i) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                aria-current={active === i ? "page" : undefined}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  active === i ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="flex flex-col gap-1 border-t border-border bg-surface/95 px-5 py-3 backdrop-blur-xl md:hidden">
            {items.map((item, i) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                aria-current={active === i ? "page" : undefined}
                onClick={() => {
                  setActive(i);
                  setMobileOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  active === i
                    ? "bg-background font-medium text-foreground"
                    : "text-muted hover:bg-background hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="px-6 pb-10">
        <section className="flex flex-col items-start py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted">
            <Sparkles className="size-3.5 text-brand-ink" />
            Scroll this panel
          </span>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold tracking-tight">
            Out of the way when you read, back when you need it.
          </h2>
          <p className="mt-3 max-w-md text-pretty text-muted">
            Scroll down and the bar tucks away to give content the full stage;
            the slightest scroll up brings it right back.
          </p>
        </section>

        {["Reading", "Focus", "Navigation", "Rhythm", "Polish"].map((title, i) => (
          <section key={title} className="border-t border-border py-8">
            <h3 className="text-lg font-medium">
              {String(i + 1).padStart(2, "0")} — {title}
            </h3>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Filler content so the panel scrolls. The header reacts to scroll
              direction, not just position.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
