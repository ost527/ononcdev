"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.15, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

export interface ScrollRevealProps {
  text: string;
  className?: string;
}

/**
 * ScrollReveal — a paragraph whose words light up one by one, tied to how far
 * the element has scrolled through the viewport. The text stays readable via
 * aria-label.
 */
export function ScrollReveal({ text, className }: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      aria-label={text}
      className={cn("flex flex-wrap text-2xl font-medium sm:text-3xl", className)}
    >
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          reduce={reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}
