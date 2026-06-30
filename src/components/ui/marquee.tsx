"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  /** Scroll direction. */
  reverse?: boolean;
  /** Pause while hovered. */
  pauseOnHover?: boolean;
  /** Gap between items (CSS length). */
  gap?: string;
  /** Fade the edges into the background. */
  fade?: boolean;
}

/**
 * Marquee — an endlessly scrolling row. Two identical groups, each carrying a
 * trailing gap and animated a full width, give a seamless loop with no hitch.
 */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
  pauseOnHover = true,
  gap = "1.5rem",
  fade = true,
}: MarqueeProps) {
  const groupClass = cn(
    "animate-marquee flex min-w-full shrink-0 items-center justify-around",
    pauseOnHover && "group-hover:[animation-play-state:paused]",
    reverse && "[animation-direction:reverse]",
  );
  const styleVars = {
    gap,
    paddingInlineEnd: gap,
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div className={groupClass} style={styleVars}>
        {children}
      </div>
      <div className={groupClass} style={styleVars} aria-hidden>
        {children}
      </div>
    </div>
  );
}
