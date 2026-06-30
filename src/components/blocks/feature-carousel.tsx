"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Gauge,
  Globe,
  Palette,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CarouselFeature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureCarouselProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: CarouselFeature[];
  className?: string;
}

const DEFAULT_FEATURES: CarouselFeature[] = [
  {
    title: "Blazing fast",
    description: "Sub-50ms responses from the edge, every request.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Secure by default",
    description: "Encryption, scoped roles, and a tamper-proof audit log.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Always on",
    description: "Replicated across regions with automatic failover.",
    icon: <Gauge className="size-5" />,
  },
  {
    title: "Fully themeable",
    description: "Every color flows from tokens — restyle in seconds.",
    icon: <Palette className="size-5" />,
  },
  {
    title: "Automate anything",
    description: "Compose triggers and actions into flows that never sleep.",
    icon: <Workflow className="size-5" />,
  },
  {
    title: "Global edge",
    description: "Served from the region nearest each visitor.",
    icon: <Globe className="size-5" />,
  },
  {
    title: "Smart alerts",
    description: "Routed to the right channel the moment things drift.",
    icon: <Bell className="size-5" />,
  },
  {
    title: "Built to scale",
    description: "Linear, predictable performance from one user to millions.",
    icon: <Cpu className="size-5" />,
  },
];

/**
 * FeatureCarousel — an accessible, scroll-snapping pager of feature cards. The
 * track is keyboard-focusable (arrow keys scroll it natively); the prev/next
 * buttons disable at the ends and scroll smoothly, falling back to an instant
 * jump under reduced motion.
 */
export function FeatureCarousel({
  eyebrow = "Capabilities",
  heading = "Everything in one place",
  subheading = "Swipe, scroll, or use the arrows to explore the toolkit.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureCarouselProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Track scroll position to enable/disable the controls. State is only set
  // from event/observer callbacks (never synchronously in the effect body).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cl = el.scrollLeft > 4;
      const cr = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
      setCanLeft((p) => (p === cl ? p : cl));
      setCanRight((p) => (p === cr ? p : cr));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByDir = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.85,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-muted">{subheading}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            disabled={!canLeft}
            aria-label="Previous features"
            className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-border-strong hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            disabled={!canRight}
            aria-label="Next features"
            className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-border-strong hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        role="group"
        aria-label={`${heading} — scrollable list`}
        tabIndex={0}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((f, i) => (
          <li
            key={i}
            className="shrink-0 basis-[82%] snap-start sm:basis-[46%] lg:basis-[31%]"
          >
            <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
              <span className="grid size-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-ink transition-colors duration-300 group-hover:text-brand-2">
                {f.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {f.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
