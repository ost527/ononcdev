import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn, seededRandom } from "@/lib/utils";

export interface LightBeamsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of beams. */
  count?: number;
  children?: ReactNode;
}

/**
 * LightBeams — soft vertical shafts of light raining from the top edge, each
 * breathing on its own cadence. Deterministic layout (seeded) so SSR matches.
 */
export function LightBeams({
  className,
  count = 9,
  children,
  ...props
}: LightBeamsProps) {
  const beams = Array.from({ length: count }, (_, i) => {
    const r = seededRandom(i + 1);
    const r2 = seededRandom(i + 99);
    return {
      left: `${(i / count) * 100 + r * 6}%`,
      width: `${1 + r2 * 2.5}px`,
      delay: `${-(r * 6).toFixed(2)}s`,
      duration: `${4 + r2 * 4}s`,
      opacity: 0.25 + r * 0.45,
      hue: i % 3,
    };
  });
  const palette = ["var(--brand-ink)", "var(--brand-2)", "var(--brand-3)"];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-x-0 -top-1/4 h-1/2"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--brand) 35%, transparent), transparent 70%)",
          }}
        />
        {beams.map((b, i) => (
          <span
            key={i}
            className="animate-pulse absolute top-0 h-full origin-top"
            style={
              {
                left: b.left,
                width: b.width,
                opacity: b.opacity,
                animationDelay: b.delay,
                animationDuration: b.duration,
                background: `linear-gradient(to bottom, ${palette[b.hue]}, transparent 80%)`,
                filter: "blur(0.5px)",
              } as CSSProperties
            }
          />
        ))}
      </div>
      {children}
    </div>
  );
}
