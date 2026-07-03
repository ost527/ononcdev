"use client";

import { useEffect, useRef, useState } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export type PreloaderVariant = "counter" | "bar" | "dots";
export type PreloaderReveal = "up" | "down" | "split" | "fade";
export type PreloaderBackdrop = "ink" | "surface" | "brand";

export interface PreloaderProps {
  /** Simulated load time in seconds. */
  duration?: number;
  /** Progress readout style. */
  variant?: PreloaderVariant;
  /** How the curtain exits once loading completes. */
  reveal?: PreloaderReveal;
  /** Curtain surface. */
  backdrop?: PreloaderBackdrop;
  /** Accent color for the counter / bar / dots (any CSS color). */
  accent?: string;
  /** Status label announced to assistive tech. */
  label?: string;
  /** Show the numeric percentage. */
  showPercent?: boolean;
  /** Called once, when the curtain starts revealing. */
  onComplete?: () => void;
  className?: string;
}

const EXIT_S = 0.7;
const HOLD_MS = 180;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const BACKDROP: Record<PreloaderBackdrop, { panel: string; text: string }> = {
  ink: { panel: "bg-[#0a0c14]", text: "text-white" },
  surface: { panel: "bg-surface", text: "text-foreground" },
  brand: {
    panel: "bg-gradient-to-br from-brand via-brand-2 to-brand-3",
    text: "text-white",
  },
};

/**
 * Preloader — a page-load curtain that counts progress up, holds a beat, then
 * reveals the page beneath (slide, split or fade). Progress is written
 * straight to the DOM inside rAF (no per-frame re-renders) and the whole
 * overlay unmounts after the exit. Reduced-motion users skip the count and
 * get a quick fade. Remount (e.g. with a `key`) to replay.
 */
export function Preloader({
  duration = 2.2,
  variant = "counter",
  reveal = "up",
  backdrop = "ink",
  accent = "var(--brand)",
  label = "Loading",
  showPercent = true,
  onComplete,
  className,
}: PreloaderProps) {
  const [phase, setPhase] = useState<"loading" | "revealing" | "hidden">(
    "loading",
  );
  // False on the server and first client paint (markup stays identical);
  // flipped in the effect, well before the reveal can start.
  const [reduceMotion, setReduceMotion] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    let raf = 0;
    let holdTimer = 0;
    let hideTimer = 0;
    const reduce = prefersReducedMotion();
    const total = Math.max(0.2, duration) * 1000;
    let start = 0;

    const paint = (p: number) => {
      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(p * 100));
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const finish = () => {
      paint(1);
      holdTimer = window.setTimeout(() => {
        setReduceMotion(reduce);
        setPhase("revealing");
        onCompleteRef.current?.();
        hideTimer = window.setTimeout(
          () => setPhase("hidden"),
          EXIT_S * 1000 + 60,
        );
      }, HOLD_MS);
    };

    if (reduce) {
      finish();
    } else {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / total);
        paint(easeInOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
        else finish();
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(holdTimer);
      window.clearTimeout(hideTimer);
    };
  }, [duration]);

  if (phase === "hidden") return null;

  const revealing = phase === "revealing";
  // Reduced-motion exits fade regardless of the configured reveal.
  const fadeOnly = reveal === "fade" || reduceMotion;
  const skin = BACKDROP[backdrop];
  const panelTransition = {
    transition: `transform ${EXIT_S}s cubic-bezier(0.76, 0, 0.24, 1), opacity ${EXIT_S}s ease`,
  };
  const exitStyle = (translate: string) =>
    revealing
      ? fadeOnly
        ? { opacity: 0, ...panelTransition }
        : { transform: translate, ...panelTransition }
      : panelTransition;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!revealing}
      className={cn(
        "absolute inset-0 z-30 overflow-hidden",
        skin.text,
        revealing && "pointer-events-none",
        className,
      )}
    >
      <span className="sr-only">{revealing ? "Loaded" : `${label}…`}</span>
      {reveal === "split" ? (
        <>
          <div
            aria-hidden
            className={cn("absolute inset-x-0 top-0 h-1/2", skin.panel)}
            style={exitStyle("translateY(-100%)")}
          />
          <div
            aria-hidden
            className={cn("absolute inset-x-0 bottom-0 h-1/2", skin.panel)}
            style={exitStyle("translateY(100%)")}
          />
        </>
      ) : (
        <div
          aria-hidden
          className={cn("absolute inset-0", skin.panel)}
          style={exitStyle(reveal === "down" ? "translateY(100%)" : "translateY(-100%)")}
        />
      )}

      {/* Progress readout */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300",
          revealing && "opacity-0",
        )}
      >
        {variant === "counter" && (
          <div className="flex items-end gap-1 font-semibold tabular-nums tracking-tight">
            <span ref={counterRef} className="text-6xl" style={{ color: accent }}>
              0
            </span>
            {showPercent && <span className="pb-1.5 text-xl opacity-60">%</span>}
          </div>
        )}
        {variant === "bar" && (
          <div className="w-1/2 max-w-64">
            <div className="h-1 overflow-hidden rounded-full bg-current/15">
              <div
                ref={barRef}
                className="h-full w-full origin-left rounded-full"
                style={{ background: accent, transform: "scaleX(0)" }}
              />
            </div>
          </div>
        )}
        {variant === "dots" && (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-2.5 animate-bounce rounded-full motion-reduce:animate-none"
                style={{ background: accent, animationDelay: `${i * 0.14}s` }}
              />
            ))}
          </div>
        )}
        <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-60">
          {label}
          {variant !== "counter" && showPercent && (
            <span className="ml-2 tabular-nums">
              <span ref={counterRef}>0</span>%
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
