import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StripedTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colors to stripe through (default: brand spectrum). */
  colors?: string[];
  /** Stripe angle in degrees. */
  angle?: number;
  /** Seconds for one full cycle. */
  speed?: number;
  children: ReactNode;
}

/**
 * StripedText — animated diagonal stripes flow through the text via
 * background-clip. Pure CSS; freezes under reduced-motion.
 */
export function StripedText({
  className,
  colors = ["var(--brand)", "var(--brand-2)", "var(--brand-3)", "var(--brand-ink)"],
  angle = 45,
  speed = 4,
  children,
  ...props
}: StripedTextProps) {
  const stops = colors
    .flatMap((c, i, arr) => {
      const start = (i / arr.length) * 100;
      const end = ((i + 1) / arr.length) * 100;
      return [`${c} ${start}%`, `${c} ${end}%`];
    })
    .join(", ");

  return (
    <span
      className={cn("inline-block select-none", className)}
      style={
        {
          backgroundImage: `repeating-linear-gradient(${angle}deg, ${stops})`,
          backgroundSize: "200% 200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          animation: `stripe-march ${speed}s linear infinite`,
        } as CSSProperties
      }
      {...props}
    >
      <style>{`
        @keyframes stripe-march {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
      {children}
    </span>
  );
}
