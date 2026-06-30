import type { ReactNode } from "react";
import { Check, Code2, Rocket, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChecklistGroup {
  title: string;
  icon?: ReactNode;
  items: string[];
}

export interface FeatureChecklistProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  groups?: ChecklistGroup[];
  className?: string;
}

const DEFAULT_GROUPS: ChecklistGroup[] = [
  {
    title: "Build",
    icon: <Code2 className="size-5" />,
    items: [
      "TypeScript-first APIs",
      "Tailwind token theming",
      "Copy-paste source",
      "Tree-shakeable exports",
      "SSR & RSC ready",
    ],
  },
  {
    title: "Ship",
    icon: <Rocket className="size-5" />,
    items: [
      "Static-export friendly",
      "Zero runtime dependencies",
      "Edge-ready output",
      "Light & dark themes",
      "Accessible by default",
    ],
  },
  {
    title: "Scale",
    icon: <TrendingUp className="size-5" />,
    items: [
      "Horizontal by design",
      "Off-screen pausing",
      "DPR-capped canvases",
      "Reduced-motion aware",
      "60fps transforms",
    ],
  },
];

/**
 * FeatureChecklist — an "everything included" section: capabilities grouped into
 * labelled columns of checkmarked items. Server-safe (no client JavaScript);
 * all styling comes from design tokens, so it adapts to light and dark themes.
 */
export function FeatureChecklist({
  eyebrow = "What's included",
  heading = "Everything in the box",
  subheading = "No add-ons, no upsells — every plan ships with the full toolkit.",
  groups = DEFAULT_GROUPS,
  className,
}: FeatureChecklistProps) {
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-border bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-ink">
                {group.icon}
              </span>
              <h3 className="text-base font-semibold">{group.title}</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {group.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-2">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
