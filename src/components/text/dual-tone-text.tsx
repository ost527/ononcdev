"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface DualToneTextProps {
  topText: string;
  bottomText: string;
  className?: string;
}

/**
 * DualToneText — two text layers slide apart vertically as the user scrolls,
 * revealing a split-color effect. The top layer moves up while the bottom
 * moves down. Accessible via separate aria labels on each layer.
 */
export function DualToneText({
  topText,
  bottomText,
  className,
}: DualToneTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const topY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-32%"]);
  const bottomY = useTransform(scrollYProgress, [0, 0.5], ["0%", "32%"]);
  const topOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0.3]);
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0.3]);

  return (
    <div
      ref={ref}
      className={cn("relative text-center", className)}
    >
      <motion.span
        aria-label={topText}
        className="block text-brand-ink"
        style={{ y: topY, opacity: topOpacity }}
      >
        {topText}
      </motion.span>
      <motion.span
        aria-label={bottomText}
        className="block text-brand-2"
        style={{ y: bottomY, opacity: bottomOpacity }}
      >
        {bottomText}
      </motion.span>
    </div>
  );
}
