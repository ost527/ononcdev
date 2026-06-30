import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PulseRingsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of concentric rings in flight. */
  rings?: number;
  children?: ReactNode;
}

/**
 * PulseRings — concentric rings that expand and fade outward like sonar.
 * Pure CSS via the global `pulse-ring` keyframe; staggered by delay.
 */
export function PulseRings({
  className,
  rings = 5,
  children,
  ...props
}: PulseRingsProps) {
  const items = Array.from({ length: rings });
  const period = 2.8;
  return (
    <div
      className={cn(
        "relative isolate grid place-items-center overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
      >
        {items.map((_, i) => (
          <span
            key={i}
            className="animate-pulse-ring absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={
              {
                borderColor: "color-mix(in oklab, var(--brand) 55%, transparent)",
                animationDelay: `${-(i * period) / rings}s`,
                boxShadow:
                  "0 0 40px color-mix(in oklab, var(--brand) 30%, transparent) inset",
              } as CSSProperties
            }
          />
        ))}
        <span
          className="block h-3 w-3 rounded-full"
          style={{
            background: "var(--brand-ink)",
            boxShadow: "0 0 24px 6px color-mix(in oklab, var(--brand) 60%, transparent)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
