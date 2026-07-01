import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlowPulseTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Glow color (default: brand). */
  color?: string;
  /** Seconds for one pulse cycle. */
  duration?: number;
  children: ReactNode;
}

/**
 * GlowPulseText — text with an expanding/contracting glow halo like a
 * heartbeat. Two rings pulse outward alternating, creating depth. Pure CSS;
 * freezes under reduced-motion.
 */
export function GlowPulseText({
  className,
  color = "var(--brand)",
  duration = 2.2,
  children,
  ...props
}: GlowPulseTextProps) {
  return (
    <span
      className={cn("relative inline-block select-none", className)}
      {...props}
    >
      {/* Outer pulse ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={
          {
            color: "transparent",
            WebkitTextStroke: `1px ${color}`,
            textStroke: `1px ${color}`,
            animation: `glow-ring-a ${duration}s ease-out infinite`,
          } as CSSProperties
        }
      >
        {children}
      </span>
      {/* Inner pulse ring — offset timing */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={
          {
            color: "transparent",
            WebkitTextStroke: `2px ${color}`,
            textStroke: `2px ${color}`,
            animation: `glow-ring-b ${duration}s ease-out ${duration / 2}s infinite`,
          } as CSSProperties
        }
      >
        {children}
      </span>
      <span className="relative">{children}</span>
      <style>{`
        @keyframes glow-ring-a {
          0% { opacity: 0.7; transform: scale(0.96); }
          100% { opacity: 0; transform: scale(1.08); }
        }
        @keyframes glow-ring-b {
          0% { opacity: 0.5; transform: scale(0.94); }
          100% { opacity: 0; transform: scale(1.06); }
        }
      `}</style>
    </span>
  );
}
