"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";
import { GradientText } from "@/components/text/gradient-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

export interface HeroBlockProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase appended after the title, rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

/**
 * HeroBlock — a centered marketing hero over an aurora field, with an eyebrow
 * pill, gradient highlight, and call-to-action buttons. Content animates in.
 */
export function HeroBlock({
  eyebrow = "Introducing ONONC",
  title = "Build interfaces that feel",
  highlight = "alive.",
  description = "A set of original, motion-first React components — backgrounds, text effects, and polished blocks — ready to drop into your Next.js app.",
  primaryLabel = "Get started",
  secondaryLabel = "Browse components",
  className,
}: HeroBlockProps) {
  return (
    <AuroraBackground
      className={cn("flex min-h-[32rem] items-center justify-center rounded-2xl px-6 py-20", className)}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
        >
          <Sparkles className="size-3.5 text-brand-ink" />
          {eyebrow}
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {title} <GradientText>{highlight}</GradientText>
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg"
        >
          {description}
        </motion.p>
        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton aria-label={primaryLabel}>
            {primaryLabel}
            <ArrowRight className="size-4" />
          </MagneticButton>
          <button className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface">
            {secondaryLabel}
          </button>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}
