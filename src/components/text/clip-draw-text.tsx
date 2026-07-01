"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface ClipDrawTextProps {
  text: string;
  className?: string;
  /** Stroke color. */
  color?: string;
  /** Seconds between each character. */
  stagger?: number;
  delay?: number;
}

/**
 * ClipDrawText — each character's outline is drawn stroke-by-stroke using
 * SVG text with stroke-dasharray animation. On scroll, the outline "draws in"
 * and fills. Accessible via aria-label on the wrapper.
 */
export function ClipDrawText({
  text,
  className,
  color = "var(--brand)",
  stagger = 0.06,
  delay = 0,
}: ClipDrawTextProps) {
  const fill: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: stagger * text.length * 0.35 + delay, duration: 0.4 },
    },
  };

  return (
    <motion.span
      className={cn("relative inline-flex", className)}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="clip-draw-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="var(--brand-2)" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="0.8em"
          className="fill-transparent"
          stroke="url(#clip-draw-grad)"
          strokeWidth="1.5"
          strokeDasharray="200 300"
          strokeLinecap="round"
          strokeLinejoin="round"
          fontSize="inherit"
          fontWeight="inherit"
          fontFamily="inherit"
          letterSpacing="inherit"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="0"
            dur={`${stagger * text.length * 0.5 + 0.8}s`}
            begin={`${delay}s`}
            fill="freeze"
          />
          {text}
        </text>
      </svg>
      {/* Fill that appears after stroke completes */}
      <motion.span
        variants={fill}
        aria-hidden
        className="relative"
        style={
          {
            backgroundImage: `linear-gradient(100deg, ${color}, var(--brand-2))`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          } as React.CSSProperties
        }
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
