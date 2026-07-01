"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface FireTextProps {
  text: string;
  className?: string;
  /** Seconds for one full flicker cycle per letter. */
  duration?: number;
}

/**
 * FireText — letters flicker with flame-like scale, opacity, color, and blur
 * shifts, each offset slightly. Uses motion variants inside a container that
 * animates continuously. Accessible via aria-label.
 */
export function FireText({
  text,
  className,
  duration = 1.6,
}: FireTextProps) {
  const chars = Array.from(text);

  const container: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.07,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const flame = (i: number): Variants => ({
    animate: {
      scale: [1, 1.06, 0.96, 1.04, 0.98, 1],
      opacity: [0.85, 1, 0.8, 1, 0.88, 0.85],
      filter: [
        "blur(0px)",
        "blur(0.6px)",
        "blur(0px)",
        "blur(0.4px)",
        "blur(0px)",
        "blur(0px)",
      ],
      transition: {
        duration,
        delay: i * 0.02,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  });

  return (
    <motion.span
      variants={container}
      animate="animate"
      aria-label={text}
      className={cn(
        "inline-flex select-none",
        "[&_span]:[text-shadow:0_0_10px_var(--brand-3),0_0_24px_var(--brand-3),0_0_40px_rgba(225,29,98,0.5)]",
        className,
      )}
      style={
        {
          color: "#ffcc80",
        } as CSSProperties
      }
    >
      {chars.map((char, i) => (
        <Fragment key={i}>
          <motion.span
            variants={flame(i)}
            aria-hidden
            className="inline-block"
            style={{ whiteSpace: "pre", textShadow: "0 0 12px var(--brand-3)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
