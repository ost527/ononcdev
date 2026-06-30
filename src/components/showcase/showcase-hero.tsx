"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { GradientText } from "@/components/text/gradient-text";
import { SplitReveal } from "@/components/text/split-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function ShowcaseHero({ count }: { count: number }) {
  const router = useRouter();

  return (
    <ParticleField className="flex min-h-[78vh] items-center justify-center bg-background px-4 pb-24 pt-20 text-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <Sparkles className="size-3.5 text-brand-ink" />
          {count} original components
        </span>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
          <SplitReveal text="Components that feel" />{" "}
          <GradientText>alive.</GradientText>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg">
          An original, motion-first React kit — animated backgrounds, text
          effects, interactive components, and ready-made section blocks for
          Next.js.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            onClick={() => router.push("/backgrounds")}
            aria-label="Explore components"
          >
            Explore components
            <ArrowRight className="size-4" />
          </MagneticButton>
          <Link
            href="/blocks"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            See section blocks
          </Link>
        </div>
      </div>
    </ParticleField>
  );
}
