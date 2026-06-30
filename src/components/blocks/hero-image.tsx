import { ArrowRight, Star } from "lucide-react";
import { GradientText } from "@/components/text/gradient-text";
import { cn } from "@/lib/utils";

export interface HeroImageProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

/**
 * HeroImage — a full-bleed, image-style hero built from layered CSS gradients
 * (no asset required) with a slowly drifting light. Overlay copy sits on a
 * content-anchored dark scrim plus a text-shadow halo so it stays AA-legible
 * over the bright artwork. Server-renderable; freezes under reduced motion.
 * Swap the gradient layers for a real next/image background when you have one.
 */
export function HeroImage({
  eyebrow = "New collection",
  title = "Design that feels like",
  highlight = "golden hour",
  description = "Warm, cinematic, and unmistakably yours. A hero that puts the mood first and lets the message glow.",
  primaryLabel = "Explore",
  secondaryLabel = "Watch film",
  className,
}: HeroImageProps) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[36rem] items-end overflow-hidden rounded-2xl border border-border-strong",
        className,
      )}
    >
      {/* Scene base. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(45% 35% at 50% 60%, color-mix(in oklab, var(--brand-3) 75%, transparent), transparent 70%)",
            "radial-gradient(60% 45% at 78% 30%, color-mix(in oklab, var(--brand) 55%, transparent), transparent 72%)",
            "linear-gradient(180deg, #0a0a1f 0%, color-mix(in oklab, var(--brand-ink) 45%, #0a0a1f) 38%, color-mix(in oklab, var(--brand-3) 35%, #160b24) 64%, #06060f 100%)",
          ].join(","),
        }}
      />
      {/* Drifting light. */}
      <div
        aria-hidden
        className="animate-float absolute -right-10 top-6 size-72 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-2) 55%, transparent), transparent 70%)",
        }}
      />
      {/* Fine grain. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Content-anchored scrim for legibility. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, rgba(4,4,12,0.9) 0%, rgba(4,4,12,0.55) 35%, transparent 100%)",
        }}
      />

      {/* Overlay copy. */}
      <div className="relative z-10 w-full max-w-2xl p-8 text-left [text-shadow:0_1px_3px_rgba(0,0,0,0.7)] sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <Star className="size-3 fill-current" />
          {eyebrow}
        </span>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>
        <p className="mt-5 max-w-lg text-pretty text-base text-white/85 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#"
            className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
