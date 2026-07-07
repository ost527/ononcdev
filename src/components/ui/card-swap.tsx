"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface CardSwapItem {
  title: string;
  subtitle?: string;
  tag?: string;
  /** CSS background for the card's banner (gradient, color, or url()). */
  background?: string;
}

export interface CardSwapProps {
  /** Cards in the stack, front to back. Defaults to a built-in gradient set. */
  items?: CardSwapItem[];
  /** Card width in pixels. */
  cardWidth?: number;
  /** Card height in pixels. */
  cardHeight?: number;
  /** Seconds each card stays in front before the stack advances. */
  delay?: number;
  /** Horizontal shift per card deeper in the stack, in pixels. */
  offsetX?: number;
  /** Vertical shift per card deeper in the stack, in pixels. */
  offsetY?: number;
  /** Rotation per card deeper in the stack, in degrees. */
  skew?: number;
  /** Scale reduction per card deeper in the stack. */
  scaleStep?: number;
  /** Pause the rotation while the pointer is over the stack. */
  pauseOnHover?: boolean;
  /** Card corner radius in pixels. */
  radius?: number;
  /** Accessible name for the stack. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: CardSwapItem[] = [
  { title: "Analytics", subtitle: "Realtime insight", tag: "Live", background: "linear-gradient(150deg,#7c3aed,#22d3ee)" },
  { title: "Automation", subtitle: "Flows that run themselves", tag: "New", background: "linear-gradient(150deg,#fb7185,#f59e0b)" },
  { title: "Collaboration", subtitle: "Ship together", tag: "Team", background: "linear-gradient(150deg,#0ea5e9,#10b981)" },
  { title: "Security", subtitle: "Locked down by default", tag: "SOC 2", background: "linear-gradient(150deg,#a855f7,#ec4899)" },
];

/**
 * CardSwap — a compact 3D stack of cards that cycles on its own: the front
 * card tucks to the back on a timer while the rest slide forward, looping
 * forever. Hovering pauses it. Card depth is derived from a single rotation
 * counter, and each card springs to its new slot with Framer Motion. The timer
 * pauses off-screen and never starts for reduced-motion users, who see a
 * static stack.
 */
export function CardSwap({
  items = DEFAULT_ITEMS,
  cardWidth = 320,
  cardHeight = 210,
  delay = 3,
  offsetX = 26,
  offsetY = 22,
  skew = -5,
  scaleStep = 0.06,
  pauseOnHover = true,
  radius = 20,
  label = "Auto-rotating card stack",
  className,
}: CardSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [step, setStep] = useState(0);

  const n = Math.max(1, items.length);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion() || n <= 1) return;

    let timer = 0;
    let visible = false;
    const tick = () => {
      if (!paused.current) setStep((s) => s + 1);
    };
    const startTimer = () => {
      if (!timer) timer = window.setInterval(tick, Math.max(400, delay * 1000));
    };
    const stopTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible && !document.hidden) startTimer();
        else stopTimer();
      },
      { threshold: 0.05 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) stopTimer();
      else if (visible) startTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopTimer();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [delay, n]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="Auto-rotating card stack"
      aria-label={label}
      onPointerEnter={() => {
        if (pauseOnHover) paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      className={cn(
        "relative grid w-full place-items-center [perspective:1400px]",
        className,
      )}
      style={{
        maxWidth: cardWidth + Math.abs(offsetX) * (n - 1) + 24,
        height: cardHeight + offsetY * (n - 1) + 24,
      }}
    >
      <div
        className="relative [transform-style:preserve-3d]"
        style={{ width: cardWidth, height: cardHeight }}
      >
        {items.map((item, i) => {
          const depth = ((i - step) % n + n) % n;
          return (
            <motion.div
              key={`${item.title}-${i}`}
              className="absolute inset-0 flex flex-col overflow-hidden border border-border bg-surface shadow-xl"
              style={{ borderRadius: radius, zIndex: n - depth }}
              initial={false}
              animate={{
                x: depth * offsetX,
                y: depth * offsetY,
                rotate: depth * skew,
                scale: 1 - depth * scaleStep,
                opacity: depth > 3 ? 0 : 1,
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 30 }
              }
            >
              <div
                className="relative h-1/2 w-full shrink-0"
                style={{
                  background:
                    item.background ?? "linear-gradient(150deg,#7c3aed,#22d3ee)",
                }}
              >
                {item.tag && (
                  <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1 px-5">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-sm text-muted">{item.subtitle}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
