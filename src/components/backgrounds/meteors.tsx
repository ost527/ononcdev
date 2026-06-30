import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn, seededRandom } from "@/lib/utils";

export interface MeteorsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of meteors. */
  count?: number;
  children?: ReactNode;
}

/**
 * Meteors — streaks that fall diagonally across the field with glowing tails,
 * each on its own delay and duration. Deterministic layout for SSR safety.
 */
export function Meteors({
  className,
  count = 14,
  children,
  ...props
}: MeteorsProps) {
  const meteors = Array.from({ length: count }, (_, i) => {
    const r = seededRandom(i + 3);
    const r2 = seededRandom(i + 71);
    return {
      left: `${r * 100}%`,
      top: `${r2 * 40}%`,
      delay: `${(r * 8).toFixed(2)}s`,
      duration: `${(3 + r2 * 4).toFixed(2)}s`,
      length: `${40 + r * 60}px`,
    };
  });

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {meteors.map((m, i) => (
          <span
            key={i}
            className="absolute h-0.5 rounded-full"
            style={
              {
                left: m.left,
                top: m.top,
                width: m.length,
                background:
                  "linear-gradient(90deg, #fff, color-mix(in oklab, var(--brand) 60%, transparent) 40%, transparent)",
                animation: `meteor ${m.duration} linear ${m.delay} infinite`,
                ["--meteor-x" as string]: "-700px",
                ["--meteor-y" as string]: "700px",
                ["--meteor-angle" as string]: "215deg",
                boxShadow: "0 0 6px 1px color-mix(in oklab, var(--brand-ink) 50%, transparent)",
              } as CSSProperties
            }
          />
        ))}
      </div>
      {children}
    </div>
  );
}
