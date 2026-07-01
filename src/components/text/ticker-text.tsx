import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TickerTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Seconds for one full scroll cycle. */
  speed?: number;
  /** Direction of scroll. */
  direction?: "left" | "right";
  /** Pause on hover (default true). */
  pauseOnHover?: boolean;
  children: ReactNode;
}

/**
 * TickerText — a news-ticker style scrolling text. Content is duplicated so
 * the loop is seamless. Pure CSS marquee; freezes under reduced-motion.
 */
export function TickerText({
  className,
  speed = 16,
  direction = "left",
  pauseOnHover = true,
  children,
  ...props
}: TickerTextProps) {
  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap",
        pauseOnHover && "[&:hover_>_span]:[animation-play-state:paused]",
        className,
      )}
      {...props}
    >
      <span
        className="inline-block"
        style={
          {
            animation: `ticker-scroll ${speed}s linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        {children}
        {/* Duplicate for seamless loop */}
        <span aria-hidden className="mx-8">
          {children}
        </span>
      </span>
    </div>
  );
}
