"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface SplitRevealProps {
  /** The text to reveal. */
  text: string;
  className?: string;
  /** Split granularity. */
  by?: "word" | "char";
  /** Seconds between each token. */
  stagger?: number;
  /** Delay before the first token (seconds). */
  delay?: number;
  /** Replay every time it scrolls into view (default: once). */
  repeat?: boolean;
}

/**
 * SplitReveal — each word or character slides up from behind a mask, staggered,
 * when the element scrolls into view. The full string stays screen-readable.
 */
export function SplitReveal({
  text,
  className,
  by = "word",
  stagger = by === "word" ? 0.08 : 0.028,
  delay = 0,
  repeat = false,
}: SplitRevealProps) {
  const tokens = by === "word" ? text.split(" ") : Array.from(text);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const item: Variants = {
    hidden: { y: "115%" },
    show: {
      y: 0,
      transition: { type: "spring", stiffness: 240, damping: 24 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.3 }}
      aria-label={text}
      className={cn("inline", className)}
    >
      {tokens.map((tok, i) => {
        if (by === "char" && tok === " ") {
          return <span key={i}>{"\u00A0"}</span>;
        }
        return (
          <Fragment key={i}>
            <span
              aria-hidden
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
            >
              <motion.span variants={item} className="inline-block">
                {tok}
              </motion.span>
            </span>
            {by === "word" && i < tokens.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </motion.span>
  );
}
