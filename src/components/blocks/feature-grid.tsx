import type { ReactNode } from "react";
import {
  Blocks,
  MousePointerClick,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureGridProps {
  heading?: string;
  subheading?: string;
  features?: Feature[];
  className?: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "Interactive",
    description: "Pointer, scroll, and hover-reactive effects that feel direct.",
    icon: <MousePointerClick className="size-5" />,
  },
  {
    title: "Themeable",
    description: "Driven by CSS variables — restyle the whole kit in seconds.",
    icon: <Palette className="size-5" />,
  },
  {
    title: "Performant",
    description: "Capped DPR, off-screen pausing, and GPU-friendly transforms.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Responsive",
    description: "Fluid layouts that hold up from phones to ultrawide.",
    icon: <Smartphone className="size-5" />,
  },
  {
    title: "Composable",
    description: "Mix primitives into your own bespoke sections.",
    icon: <Blocks className="size-5" />,
  },
  {
    title: "Delightful",
    description: "Thoughtful micro-interactions on every surface.",
    icon: <Sparkles className="size-5" />,
  },
];

/**
 * FeatureGrid — a titled three-column grid of capabilities. Cards lift and
 * reveal a brand ring on hover.
 */
export function FeatureGrid({
  heading = "Everything you need to ship",
  subheading = "A complete toolkit of building blocks, designed to work together.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-muted">{subheading}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink transition-colors group-hover:text-brand-2">
              {f.icon}
            </span>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
