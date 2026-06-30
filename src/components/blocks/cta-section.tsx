import { ArrowRight } from "lucide-react";
import { GradientMesh } from "@/components/backgrounds/gradient-mesh";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

export interface CTASectionProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  className?: string;
}

/**
 * CTASection — a high-contrast closing call-to-action set over an animated
 * gradient mesh, anchored by a shimmer button.
 */
export function CTASection({
  title = "Ready to make it move?",
  description = "Drop these components into your next build and ship something people remember.",
  ctaLabel = "Start building",
  className,
}: CTASectionProps) {
  return (
    <GradientMesh
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-border px-6 py-20 text-center",
        className,
      )}
    >
      <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-lg text-pretty text-muted">{description}</p>
      <ShimmerButton className="mt-8">
        {ctaLabel}
        <ArrowRight className="size-4" />
      </ShimmerButton>
    </GradientMesh>
  );
}
