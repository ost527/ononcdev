"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { clamp, cn, prefersReducedMotion } from "@/lib/utils";

export interface ScrollStackItem {
  /** Card heading. */
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** CSS background for the card (gradient, color, or url()). Falls back to a token surface. */
  background?: string;
}

export interface ScrollStackProps {
  /** Cards to stack, top to bottom. Defaults to a built-in gradient set. */
  items?: ScrollStackItem[];
  /** Card height in pixels. */
  itemHeight?: number;
  /** Sticky top offset for the first card, in pixels. */
  topOffset?: number;
  /** Extra sticky-top added per card index so stacked cards peek, in pixels. */
  stagger?: number;
  /** Scale reduction applied to a card as the next one scrolls over it. */
  scaleStep?: number;
  /** Vertical gap between cards while scrolling, in pixels. */
  gap?: number;
  /** Degrees of rotation applied to a card as it settles to the back (0 disables). */
  rotate?: number;
  /** Card corner radius in pixels. */
  radius?: number;
  /** Height of the internal scroll viewport, in pixels. */
  height?: number;
  /** Accessible name for the stack region. */
  label?: string;
  /** Extra classes merged onto the root element. */
  className?: string;
}

const DEFAULT_ITEMS: ScrollStackItem[] = [
  {
    title: "Analytics",
    subtitle: "Realtime insight across every surface",
    background: "linear-gradient(150deg,#7c3aed,#22d3ee)",
  },
  {
    title: "Automation",
    subtitle: "Flows that run themselves",
    background: "linear-gradient(150deg,#fb7185,#f59e0b)",
  },
  {
    title: "Collaboration",
    subtitle: "Ship together, in one place",
    background: "linear-gradient(150deg,#0ea5e9,#10b981)",
  },
  {
    title: "Security",
    subtitle: "Locked down by default",
    background: "linear-gradient(150deg,#a855f7,#ec4899)",
  },
];

/**
 * ScrollStack — a deck of cards that pin and stack as you scroll an internal,
 * fixed-height viewport (so it works standalone, not just on the page scroll).
 * Each card sticks a little lower than the last, and as the following card
 * scrolls over it the covered card eases down in scale (and optionally rotates)
 * to build depth. Transforms are written directly to the card refs from an
 * rAF-throttled scroll listener, so there is no re-render. Reduced-motion users
 * keep the sticky stacking but see no scale/rotate motion.
 */
export function ScrollStack({
  items = DEFAULT_ITEMS,
  itemHeight = 260,
  topOffset = 32,
  stagger = 14,
  scaleStep = 0.05,
  gap = 28,
  rotate = 0,
  radius = 20,
  height = 420,
  label = "Scroll stack",
  className,
}: ScrollStackProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (items.length === 0) return;
    if (prefersReducedMotion()) return;

    const travel = Math.max(1, itemHeight + gap);
    let raf = 0;
    let ticking = false;

    const update = () => {
      const vpTop = viewport.getBoundingClientRect().top;
      const cards = cardRefs.current;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (!card) continue;
        const next = cards[i + 1];
        // The last (front) card never has a card scrolling over it.
        if (!next) {
          card.style.transform = "";
          continue;
        }
        const pinnedTop = topOffset + (i + 1) * stagger;
        const nextTopRel = next.getBoundingClientRect().top - vpTop;
        const progress = clamp(1 - (nextTopRel - pinnedTop) / travel, 0, 1);
        const scale = 1 - progress * scaleStep;
        const rot = rotate * progress;
        card.style.transform = rot
          ? `scale(${scale}) rotate(${rot}deg)`
          : `scale(${scale})`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items, itemHeight, topOffset, stagger, scaleStep, gap, rotate]);

  // Trailing room so the last card can reach its pinned position and the
  // stack fully forms before the viewport bottoms out.
  const spacer = Math.max(0, height - itemHeight - topOffset);

  return (
    <section role="region" aria-label={label} className={cn("w-full", className)}>
      <p className="mb-2 flex items-center justify-center gap-1 text-xs text-muted">
        <span>Scroll</span>
        <ChevronDown
          aria-hidden
          className="size-3.5 animate-bounce motion-reduce:animate-none"
        />
      </p>

      <div
        ref={viewportRef}
        style={{ height }}
        className="relative overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background/40 px-4"
      >
        {items.map((item, i) => (
          <article
            key={`${item.title}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn(
              "sticky flex flex-col justify-end overflow-hidden border border-border p-6 shadow-xl will-change-transform",
              item.background ? "text-white" : "bg-surface text-foreground",
            )}
            style={{
              top: topOffset + i * stagger,
              height: itemHeight,
              marginBottom: gap,
              borderRadius: radius,
              transformOrigin: "center top",
              zIndex: i + 1,
              background: item.background,
            }}
          >
            <p className="text-xl font-semibold tracking-tight">{item.title}</p>
            {item.subtitle && (
              <p
                className={cn(
                  "mt-1 text-sm",
                  item.background ? "text-white/80" : "text-muted",
                )}
              >
                {item.subtitle}
              </p>
            )}
          </article>
        ))}
        {spacer > 0 && <div aria-hidden style={{ height: spacer }} />}
      </div>
    </section>
  );
}
