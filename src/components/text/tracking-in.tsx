"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TrackingInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  repeat?: boolean;
}

/**
 * TrackingIn — the text expands from tight, blurred letter-spacing into place as
 * it fades in (the classic "tracking-in" title effect), on view. The text is
 * real and fully accessible; reduced motion shows it settled.
 */
export function TrackingIn({
  children,
  className,
  delay = 0,
  duration = 0.9,
  repeat = false,
}: TrackingInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      initial={
        reduce
          ? { opacity: 1, letterSpacing: "0em", filter: "blur(0px)" }
          : { opacity: 0, letterSpacing: "-0.5em", filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, letterSpacing: "0em", filter: "blur(0px)" }}
      viewport={{ once: !repeat, amount: 0.5 }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
