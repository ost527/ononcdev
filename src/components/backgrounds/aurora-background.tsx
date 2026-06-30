import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Override the three aurora colors (CSS color strings). */
  colors?: [string, string, string];
  /** Strength of the blur halo in pixels. */
  blur?: number;
  children?: ReactNode;
}

/**
 * AuroraBackground — soft, slowly drifting gradient halos behind content.
 * Pure CSS (GPU-friendly), honors prefers-reduced-motion via the global rule.
 */
export function AuroraBackground({
  className,
  colors = ["var(--brand)", "var(--brand-2)", "var(--brand-3)"],
  blur = 80,
  children,
  ...props
}: AuroraBackgroundProps) {
  const [a, b, c] = colors;
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ filter: `blur(${blur}px)` } as CSSProperties}
      >
        <span
          className="animate-aurora absolute -top-1/3 left-[-10%] h-[60%] w-[55%] rounded-full opacity-60 mix-blend-screen"
          style={{ background: a, animationDelay: "-2s" }}
        />
        <span
          className="animate-aurora absolute top-[10%] right-[-12%] h-[65%] w-[50%] rounded-full opacity-55 mix-blend-screen"
          style={{ background: b, animationDelay: "-8s", animationDuration: "20s" }}
        />
        <span
          className="animate-aurora absolute bottom-[-25%] left-[20%] h-[60%] w-[60%] rounded-full opacity-45 mix-blend-screen"
          style={{ background: c, animationDelay: "-5s", animationDuration: "24s" }}
        />
      </div>
      {/* Top vignette + grain for depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, transparent 40%, rgba(6,7,13,0.85) 100%)",
        }}
      />
      {children}
    </div>
  );
}
