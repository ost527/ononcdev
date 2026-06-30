import type { ReactNode } from "react";
import {
  Boxes,
  Code2,
  Cpu,
  Globe,
  Lock,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MinimalFeature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureMinimalProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: MinimalFeature[];
  className?: string;
}

const DEFAULT_FEATURES: MinimalFeature[] = [
  {
    title: "Edge runtime",
    description: "Ship close to your users with cold starts measured in milliseconds.",
    icon: <Cpu className="size-5" />,
  },
  {
    title: "Global by default",
    description: "Replicated across regions so the first byte is always nearby.",
    icon: <Globe className="size-5" />,
  },
  {
    title: "Typed end to end",
    description: "From the database to the button, types follow the data the whole way.",
    icon: <Code2 className="size-5" />,
  },
  {
    title: "Encrypted at rest",
    description: "Everything is sealed in transit and on disk — no exceptions, no toggles.",
    icon: <Lock className="size-5" />,
  },
  {
    title: "Instant rollbacks",
    description: "Every deploy is immutable, so reverting is a single click away.",
    icon: <RefreshCw className="size-5" />,
  },
  {
    title: "Zero lock-in",
    description: "Plain React and Tailwind. Copy what you need and own it outright.",
    icon: <Boxes className="size-5" />,
  },
];

/**
 * FeatureMinimal — an understated, editorial capability grid. Cells share
 * hairline dividers (no card chrome); each lights a top accent and tints on
 * hover. Server-safe: no client JavaScript, animation comes from pure CSS.
 */
export function FeatureMinimal({
  eyebrow = "Platform",
  heading = "Everything, quietly handled",
  subheading = "The unglamorous infrastructure work, done right so you never have to think about it.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureMinimalProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-muted">{subheading}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg border border-border bg-background text-brand-ink transition-colors duration-300 group-hover:text-brand-2">
                {f.icon}
              </span>
              <h3 className="text-base font-semibold">{f.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
