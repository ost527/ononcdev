"use client";

import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StickyNavItem {
  label: string;
  href?: string;
}

export interface NavbarStickyProps {
  brand?: string;
  items?: StickyNavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: StickyNavItem[] = [
  { label: "Overview" },
  { label: "Features" },
  { label: "Pricing" },
  { label: "Docs" },
];

/**
 * NavbarSticky — a header that condenses as the page scrolls: it gains a glass
 * background, border, and shadow while its padding and logo tighten, with a
 * gradient scroll-progress line beneath. The block embeds a scrollable demo
 * region (focusable for keyboard scrolling) so the effect previews in place.
 */
export function NavbarSticky({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  className,
}: NavbarStickyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > 12);
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      tabIndex={0}
      role="region"
      aria-label="Sticky navbar demo — scroll to condense the header"
      className={cn(
        "relative h-[26rem] overflow-y-auto rounded-2xl border border-border bg-background",
        className,
      )}
    >
      <header
        className={cn(
          "sticky top-0 z-20 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-surface/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-5 transition-all duration-300",
            scrolled ? "py-2.5" : "py-4",
          )}
        >
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span
              className={cn(
                "grid place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white transition-all duration-300",
                scrolled ? "size-7" : "size-9",
              )}
            >
              <Sparkles className={cn("transition-all duration-300", scrolled ? "size-4" : "size-5")} />
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

          <button
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-brand font-semibold text-white transition-all duration-300 hover:bg-brand/90",
              scrolled ? "px-3.5 py-1.5 text-sm" : "px-4 py-2 text-sm",
            )}
          >
            {ctaLabel}
            <ArrowRight className="size-3.5" />
          </button>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-brand-ink via-brand-2 to-brand-3"
          style={{ width: `${progress}%` }}
        />
      </header>

      {/* Demo page content so the header has something to scroll over */}
      <div className="px-6 pb-10">
        <section className="flex flex-col items-start py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted">
            <Sparkles className="size-3.5 text-brand-ink" />
            Scroll the panel
          </span>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold tracking-tight">
            A header that earns its place at the top.
          </h2>
          <p className="mt-3 max-w-md text-pretty text-muted">
            As you scroll, the bar tightens and lifts off the page with a glass
            backdrop and a progress line — quietly, never in the way.
          </p>
        </section>

        {["Performance", "Accessibility", "Motion", "Theming"].map((title, i) => (
          <section
            key={title}
            className="border-t border-border py-8"
          >
            <h3 className="text-lg font-medium">
              {String(i + 1).padStart(2, "0")} — {title}
            </h3>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Built to feel considered at every breakpoint. Each section here is
              filler to give the sticky header room to react to your scroll.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
