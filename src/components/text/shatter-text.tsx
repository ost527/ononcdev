"use client";

import { Fragment, useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ShatterTextProps {
  text: string;
  className?: string;
  /** Trigger: "hover" (default) or "click". */
  trigger?: "hover" | "click";
}

/**
 * ShatterText — on trigger, each character flies outward in a random
 * direction with blur, then reassembles. Feels like glass shattering and
 * reforming. Accessible via aria-label.
 */
export function ShatterText({
  text,
  className,
  trigger = "hover",
}: ShatterTextProps) {
  const [active, setActive] = useState(false);
  const chars = Array.from(text);

  const mulberry32 = (seed: number) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const enter = useCallback(() => setActive(true), []);
  const leave = useCallback(() => setActive(false), []);

  const events =
    trigger === "hover"
      ? { onMouseEnter: enter, onMouseLeave: leave }
      : { onClick: () => setActive((p) => !p) };

  return (
    <span
      aria-label={text}
      className={cn("inline-flex cursor-default select-none", className)}
      {...events}
    >
      {chars.map((char, i) => {
        const r1 = mulberry32(i * 19 + 5);
        const r2 = mulberry32(i * 23 + 11);
        const angle = r1 * Math.PI * 2;
        const dist = 30 + r2 * 50;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const rot = (r1 - 0.5) * 180;

        return (
          <Fragment key={i}>
            <motion.span
              aria-hidden
              className="inline-block"
              style={{ whiteSpace: "pre" }}
              animate={
                active
                  ? { x: dx, y: dy, rotate: rot, scale: 0.7, opacity: 0.3, filter: "blur(3px)" }
                  : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={{ type: "spring", stiffness: 140, damping: 12, mass: 0.5 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </Fragment>
        );
      })}
    </span>
  );
}
