import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  time: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface TimelineProps {
  heading?: string;
  entries?: TimelineEntry[];
  className?: string;
}

const DEFAULT_ENTRIES: TimelineEntry[] = [
  { time: "2023", title: "The idea", description: "Sketched a motion-first kit that didn't look like everyone else's." },
  { time: "2024", title: "First components", description: "Backgrounds, text effects, and the canvas lifecycle hook landed." },
  { time: "2025", title: "Section blocks", description: "Composed primitives into drop-in hero, pricing, and footer blocks." },
  { time: "Today", title: "Copy & ship", description: "Browse, grab the source, and make it yours." },
];

/**
 * Timeline — a vertical, rail-and-node timeline of milestones.
 */
export function Timeline({
  heading = "How we got here",
  entries = DEFAULT_ENTRIES,
  className,
}: TimelineProps) {
  return (
    <section className={cn("mx-auto max-w-2xl", className)}>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <ol className="relative mt-8 border-l border-border">
        {entries.map((entry, i) => (
          <li key={i} className="relative ml-6 pb-8 last:pb-0">
            <span className="absolute -left-[1.95rem] top-0.5 grid size-6 place-items-center rounded-full border border-border bg-surface text-brand-ink">
              {entry.icon ?? (
                <span className="size-2 rounded-full bg-brand" />
              )}
            </span>
            <time className="text-xs font-medium uppercase tracking-wide text-brand-ink">
              {entry.time}
            </time>
            <h3 className="mt-1 font-semibold">{entry.title}</h3>
            <p className="mt-1 text-sm text-muted">{entry.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
