"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScrollspySection {
  id: string;
  label: string;
  heading: string;
  body: string;
}

export interface NavbarScrollspyProps {
  brand?: string;
  sections?: ScrollspySection[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_SECTIONS: ScrollspySection[] = [
  { id: "overview", label: "Overview", heading: "Overview", body: "A one-page layout where the navigation tracks your reading position." },
  { id: "features", label: "Features", heading: "Features", body: "As each section scrolls into the upper band, its link lights up." },
  { id: "pricing", label: "Pricing", heading: "Pricing", body: "Click a link to glide smoothly to its section (instant under reduced-motion)." },
  { id: "faq", label: "FAQ", heading: "FAQ", body: "The active indicator slides between links with shared-layout motion." },
  { id: "contact", label: "Contact", heading: "Contact", body: "Built for landing pages and long-form, single-page documents." },
];

/**
 * NavbarScrollspy — a one-page section navigation. An IntersectionObserver
 * (scoped to the embedded scroll region) tracks which section is in the upper
 * viewport band and marks its link `aria-current`, with a sliding underline
 * indicator. Clicking a link smooth-scrolls to that section (instant under
 * reduced-motion). The scroll region is focusable for keyboard scrolling.
 */
export function NavbarScrollspy({
  brand = "ONONC",
  sections = DEFAULT_SECTIONS,
  ctaLabel = "Get started",
  className,
}: NavbarScrollspyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const visible = useRef<boolean[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          visible.current[idx] = entry.isIntersecting;
        }
        const first = visible.current.findIndex(Boolean);
        if (first >= 0) setActiveIndex(first);
      },
      { root, rootMargin: "0px 0px -55% 0px", threshold: 0 },
    );
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections.length]);

  const goTo = (i: number) => {
    setActiveIndex(i);
    const el = sectionRefs.current[i];
    const root = scrollRef.current;
    if (el && root) {
      root.scrollTo({
        top: el.offsetTop - 52,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  };

  return (
    <div
      ref={scrollRef}
      tabIndex={0}
      role="region"
      aria-label="Scrollspy navbar demo — scroll to track sections"
      className={cn(
        "relative h-[26rem] overflow-y-auto rounded-2xl border border-border bg-background",
        className,
      )}
    >
      <nav
        aria-label="On this page"
        className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-4 px-4 py-2.5">
          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
              <Sparkles className="size-4" />
            </span>
            {brand}
          </span>
          <div className="flex flex-1 items-center gap-0.5 overflow-x-auto">
            {sections.map((section, i) => (
              <button
                key={section.id}
                type="button"
                aria-current={activeIndex === i ? "true" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "relative shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
                  activeIndex === i ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {activeIndex === i && (
                  <motion.span
                    layoutId={`${baseId}-spy`}
                    aria-hidden
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand to-brand-2"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {section.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="hidden shrink-0 rounded-full bg-brand px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:inline-block"
          >
            {ctaLabel}
          </button>
        </div>
      </nav>

      <div className="px-6">
        {sections.map((section, i) => (
          <section
            key={section.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            data-idx={i}
            aria-label={section.label}
            className="flex min-h-[15rem] scroll-mt-14 flex-col justify-center border-b border-border py-10 last:border-b-0"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-brand-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{section.heading}</h2>
            <p className="mt-2 max-w-md text-pretty text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
