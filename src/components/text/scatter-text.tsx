"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScatterTextProps {
  text: string;
  className?: string;
  /** Trigger: "hover" or "inView" (default: hover). */
  trigger?: "hover" | "inView";
  /** If trigger=inView, whether to repeat. */
  repeat?: boolean;
}

/**
 * ScatterText — on hover, characters fly apart with random offsets and blur,
 * then reassemble when the cursor leaves. On trigger=inView, scatters once
 * on scroll then settles. Accessible via aria-label.
 */
export function ScatterText({
  text,
  className,
  trigger = "hover",
  repeat = false,
}: ScatterTextProps) {
  const chars = Array.from(text);
  const [scattered, setScattered] = useState(false);

  // Seed per character for deterministic random offsets.
  const seededRandom = (seed: number) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return (
    <motion.span
      aria-label={text}
      className={cn("inline-flex", className)}
      onMouseEnter={() => trigger === "hover" && setScattered(true)}
      onMouseLeave={() => trigger === "hover" && setScattered(false)}
      {...(trigger === "inView"
        ? {
            onViewportEnter: () => {
              setScattered(true);
              setTimeout(() => setScattered(false), 800);
            },
          }
        : {})}
    >
      <AnimatePresence>
        {chars.map((char, i) => {
          const r1 = seededRandom(i * 7 + 1);
          const r2 = seededRandom(i * 13 + 3);
          const dx = (r1 - 0.5) * 80;
          const dy = (r2 - 0.5) * 60 - 10;
          const rot = (r1 - 0.5) * 90;

          return (
            <Fragment key={i}>
              <motion.span
                aria-hidden
                className="inline-block"
                style={{ whiteSpace: "pre" }}
                animate={
                  scattered
                    ? {
                        x: dx,
                        y: dy,
                        rotate: rot,
                        scale: 0.8 + r1 * 0.4,
                        opacity: 0.5,
                        filter: "blur(4px)",
                      }
                    : {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  mass: 0.6,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </Fragment>
          );
        })}
      </AnimatePresence>
    </motion.span>
  );
}
