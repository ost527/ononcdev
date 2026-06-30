"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarClock } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export interface HeroCountdownProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  /** Launch target as an ISO date-time string. */
  targetDate?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

/**
 * HeroCountdown — a launch hero with a live countdown to a target date. The
 * digits render as placeholders until after hydration (so server and client
 * markup match), then tick every second. The clock is hidden from assistive
 * tech in favor of a plain-text launch date.
 */
export function HeroCountdown({
  eyebrow = "Countdown to launch",
  title = "Something new is",
  highlight = "almost here",
  description = "We're putting the final touches on it. Mark your calendar — early adopters get founder pricing for life.",
  targetDate = "2027-01-01T00:00:00",
  primaryLabel = "Notify me",
  secondaryLabel = "Preview features",
  className,
}: HeroCountdownProps) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const target = new Date(targetDate).getTime();
  const [time, setTime] = useState(() => remaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[32rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background px-6 py-20 text-center",
        className,
      )}
    >
      {/* Soft brand glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] -z-10 size-[34rem] max-w-[120%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 42%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <CalendarClock className="size-3.5 text-brand-2" />
          {eyebrow}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>

        {/* Countdown */}
        <div
          aria-hidden
          className="mt-9 flex items-start justify-center gap-2 sm:gap-4"
        >
          {units.map((u, i) => (
            <div key={u.label} className="flex items-start gap-2 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="grid size-16 place-items-center rounded-xl border border-border bg-surface tabular-nums sm:size-20">
                  <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {hydrated ? pad(u.value) : "--"}
                  </span>
                </div>
                <span className="mt-2 text-xs uppercase tracking-wide text-muted">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="pt-3 text-2xl font-semibold text-muted-2 sm:pt-4 sm:text-3xl">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="sr-only">Launching on {targetDate.slice(0, 10)}.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {secondaryLabel}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
