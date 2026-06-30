"use client";

import type { PointerEvent } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export interface HeroSpotlightProps {
  badge?: string;
  announcement?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Wordmarks shown in the "trusted by" marquee. */
  brands?: string[];
  className?: string;
}

const DEFAULT_BRANDS = [
  "Northwind",
  "Acme Co",
  "Globex",
  "Initech",
  "Umbra",
  "Hooli",
  "Soylent",
  "Vandelay",
];

/**
 * HeroSpotlight — a focused, centered hero where a soft spotlight follows the
 * pointer and reveals a fine dot grid beneath. Carries an announcement
 * pill-link, a gradient headline, dual CTAs, and a quiet trusted-by marquee.
 * Under reduced motion the spotlight rests, centered, with no follow.
 */
export function HeroSpotlight({
  badge = "New",
  announcement = "Realtime collaboration just landed",
  title = "The canvas where ideas",
  highlight = "move at the speed of thought",
  description = "Design, prototype, and ship in one fluid space. Built for teams who care about the details — down to the last pixel and millisecond.",
  primaryLabel = "Get started",
  secondaryLabel = "Book a demo",
  brands = DEFAULT_BRANDS,
  className,
}: HeroSpotlightProps) {
  const reduce = useReducedMotion();
  // Spotlight position in percentages; springs give it gentle inertia.
  const mx = useMotionValue(50);
  const my = useMotionValue(38);
  const sx = useSpring(mx, { stiffness: 120, damping: 24, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 120, damping: 24, mass: 0.5 });
  const mask = useMotionTemplate`radial-gradient(280px circle at ${sx}% ${sy}%, #000 0%, transparent 72%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const dots =
    "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--brand-ink) 60%, transparent) 1px, transparent 0)";

  return (
    <section
      onPointerMove={handleMove}
      className={cn(
        "relative isolate flex min-h-[34rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-background px-6 py-20 text-center",
        className,
      )}
    >
      {/* Dim base dot grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{ backgroundImage: dots, backgroundSize: "24px 24px" }}
      />
      {/* Bright dot grid, revealed only inside the moving spotlight. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: dots,
          backgroundSize: "24px 24px",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      {/* Warm center wash for depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Announcement pill-link */}
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1 pl-1 pr-3 text-sm backdrop-blur transition-colors hover:border-border-strong"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
            <Sparkles className="size-3" />
            {badge}
          </span>
          <span className="text-muted">{announcement}</span>
          <ArrowRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {title}{" "}
          <GradientText className="block sm:inline">{highlight}</GradientText>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            {secondaryLabel}
          </button>
        </div>
      </motion.div>

      {/* Trusted-by marquee */}
      <div className="mt-16 w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-2">
          Trusted by fast-moving teams
        </p>
        <Marquee className="mt-5" duration={32} pauseOnHover>
          {brands.map((brand) => (
            <span
              key={brand}
              className="mx-6 text-lg font-semibold tracking-tight text-muted/70 transition-colors hover:text-foreground"
            >
              {brand}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
