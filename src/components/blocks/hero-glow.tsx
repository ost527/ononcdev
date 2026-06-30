import { ArrowRight, Circle } from "lucide-react";
import { GradientText } from "@/components/text/gradient-text";
import { cn } from "@/lib/utils";

export interface HeroGlowProps {
  announcement?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

/**
 * HeroGlow — a centered hero anchored by a large, slowly drifting conic glow,
 * with a framed app screenshot mock peeking up from below and fading into the
 * page. Fully server-renderable (no client JS); life comes from CSS only, so
 * it freezes gracefully under prefers-reduced-motion.
 */
export function HeroGlow({
  announcement = "Lumen 2.0 is here",
  title = "Your whole workflow, in one",
  highlight = "luminous workspace",
  description = "Plan, build, and launch without switching tabs. A single, fast surface for the work that matters — beautifully out of your way.",
  primaryLabel = "Start building",
  secondaryLabel = "See what's new",
  className,
}: HeroGlowProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 pt-16 sm:pt-20",
        className,
      )}
    >
      {/* Drifting conic glow orb. */}
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute left-1/2 top-[-18%] -z-10 size-[40rem] max-w-[120%] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, var(--brand), var(--brand-2), var(--brand-3), var(--brand))",
        }}
      />
      {/* Fine top grid lines for structure. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(#000, transparent)",
          WebkitMaskImage: "linear-gradient(#000, transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-sm text-muted backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Circle className="size-2 fill-brand-2 text-brand-2" />
          {announcement}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>

      {/* Framed app screenshot mock, fading into the page. */}
      <div className="relative mx-auto mt-14 max-w-4xl">
        <div className="overflow-hidden rounded-t-2xl border border-border-strong border-b-0 bg-surface shadow-[0_-10px_60px_-20px_var(--brand)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
            <span className="size-2.5 rounded-full bg-brand-3/70" />
            <span className="size-2.5 rounded-full bg-brand/60" />
            <span className="size-2.5 rounded-full bg-brand-2/60" />
            <span className="mx-auto rounded-md border border-border bg-surface px-6 py-0.5 text-[11px] text-muted">
              lumen.dev
            </span>
          </div>
          {/* Abstract app layout */}
          <div className="grid grid-cols-[72px_1fr] gap-0 sm:grid-cols-[96px_1fr]">
            <div className="flex flex-col gap-3 border-r border-border bg-background/40 p-4">
              <span className="size-8 rounded-lg bg-gradient-to-br from-brand to-brand-2" />
              <span className="h-2 w-full rounded-full bg-border-strong" />
              <span className="h-2 w-3/4 rounded-full bg-border-strong" />
              <span className="h-2 w-full rounded-full bg-border-strong" />
              <span className="h-2 w-2/3 rounded-full bg-border-strong" />
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="h-3 w-32 rounded-full bg-border-strong" />
                <span className="h-7 w-20 rounded-full bg-brand/30" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-background/50 p-4"
                  >
                    <span className="block h-2 w-10 rounded-full bg-border-strong" />
                    <span className="mt-3 block h-5 w-16 rounded-md bg-gradient-to-r from-brand/40 to-brand-2/30" />
                  </div>
                ))}
              </div>
              <div className="flex h-28 items-end gap-2 rounded-xl border border-border bg-background/50 p-4">
                {[40, 65, 35, 80, 55, 92, 48, 70].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand/30 to-brand-2/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Fade the mock into the page bottom. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
        />
      </div>
    </section>
  );
}
