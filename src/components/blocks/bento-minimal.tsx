import { cn } from "@/lib/utils";

export interface MinimalCell {
  title: string;
  description: string;
  /** Tailwind grid-span classes. */
  span?: string;
  /** Larger type treatment for the lead cell. */
  lead?: boolean;
}

export interface BentoMinimalProps {
  eyebrow?: string;
  heading?: string;
  cells?: MinimalCell[];
  className?: string;
}

const DEFAULT_CELLS: MinimalCell[] = [
  {
    title: "Less, but better.",
    description:
      "Every element earns its place. We remove until only the essential remains — then we refine that.",
    span: "sm:col-span-2 lg:row-span-2",
    lead: true,
  },
  { title: "Clarity over cleverness", description: "Plain intent beats clever abstraction." },
  { title: "Motion with meaning", description: "Animation guides attention, never distracts." },
  { title: "Built to last", description: "Tokens and primitives that age gracefully." },
  { title: "Accessible to all", description: "Keyboard, contrast, and reduced-motion first." },
  {
    title: "Crafted in the open",
    description: "Readable source you can own and adapt — no lock-in.",
    span: "sm:col-span-2",
  },
  {
    title: "Quiet by default",
    description: "Restraint now, so the important moments can speak later.",
    span: "sm:col-span-2",
  },
];

/**
 * BentoMinimal — a quiet, editorial counterpoint to the louder bentos. Hairline
 * cells, oversized ghost numerals, and a single brand accent that grows on
 * hover. Server-safe (no client JS) — all interaction is pure CSS, so it works
 * anywhere and respects reduced-motion via the global transition reset.
 */
export function BentoMinimal({
  eyebrow = "Principles",
  heading = "A system with a point of view",
  cells = DEFAULT_CELLS,
  className,
}: BentoMinimalProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-wider text-brand-ink">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem]">
        {cells.map((cell, i) => (
          <div
            key={cell.title}
            className={cn(
              "group relative flex min-h-[12rem] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong",
              cell.span,
            )}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-5 select-none text-7xl font-bold leading-none text-foreground/[0.045] transition-colors duration-300 group-hover:text-brand/10"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative mt-auto">
              <h3
                className={cn(
                  "font-semibold tracking-tight",
                  cell.lead ? "text-2xl sm:text-3xl" : "text-lg",
                )}
              >
                {cell.title}
              </h3>
              <p
                className={cn(
                  "mt-1 text-muted",
                  cell.lead ? "max-w-md text-base leading-relaxed" : "text-sm",
                )}
              >
                {cell.description}
              </p>
              <span
                aria-hidden
                className="mt-4 block h-px w-8 bg-brand transition-all duration-300 group-hover:w-16"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
