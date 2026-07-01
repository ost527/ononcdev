import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShadowTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Glow color for the layered shadows (default: brand). */
  color?: string;
  children: ReactNode;
}

/**
 * ShadowText — multi-layered colored text-shadows that shift and pulse,
 * creating a dimensional glow around the text. Pure CSS; freezes under
 * reduced-motion. Stays readable via the crisp foreground layer.
 */
export function ShadowText({
  className,
  color = "var(--brand)",
  children,
  ...props
}: ShadowTextProps) {
  return (
    <span
      className={cn("inline-block select-none", className)}
      style={
        {
          color: "#ffffff",
          textShadow: [
            `0 0 10px ${color}`,
            `0 0 28px ${color}`,
            `0 0 52px ${color}`,
            `4px 0 20px var(--brand-2, #22d3ee)`,
            `-4px 0 20px var(--brand-3, #fb7185)`,
          ].join(", "),
          animation: "shadow-pulse 2.8s ease-in-out infinite alternate",
        } as CSSProperties
      }
      {...props}
    >
      <style>{`
        @keyframes shadow-pulse {
          0% {
            text-shadow:
              0 0 8px ${color},
              0 0 22px ${color},
              0 0 44px ${color},
              4px 0 16px var(--brand-2, #22d3ee),
              -4px 0 16px var(--brand-3, #fb7185);
          }
          50% {
            text-shadow:
              0 0 14px ${color},
              0 0 36px ${color},
              0 0 64px ${color},
              6px 0 28px var(--brand-2, #22d3ee),
              -6px 0 28px var(--brand-3, #fb7185);
          }
          100% {
            text-shadow:
              0 0 8px ${color},
              0 0 22px ${color},
              0 0 44px ${color},
              4px 0 16px var(--brand-2, #22d3ee),
              -4px 0 16px var(--brand-3, #fb7185);
          }
        }
      `}</style>
      {children}
    </span>
  );
}
