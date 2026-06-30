import type { ReactNode } from "react";
import { Boxes, Gauge, Layers, ShieldCheck, Wand2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Tailwind grid-span classes for this cell. */
  span?: string;
}

export interface BentoGridProps {
  items?: BentoItem[];
  className?: string;
}

const DEFAULT_ITEMS: BentoItem[] = [
  {
    title: "Motion-first by design",
    description:
      "Every component is built around fluid, interruptible animation — not bolted on afterwards.",
    icon: <Wand2 className="size-5" />,
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "Composable",
    description: "Small primitives snap together into larger blocks.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "Accessible",
    description: "Keyboard paths, ARIA, and reduced-motion respected.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Fast",
    description:
      "GPU-friendly effects that pause when off-screen to save battery.",
    icon: <Gauge className="size-5" />,
    span: "sm:col-span-2",
  },
  {
    title: "Zero lock-in",
    description: "Plain React + Tailwind. Copy what you need, own it.",
    icon: <Boxes className="size-5" />,
  },
];

/**
 * BentoGrid — an editorial, asymmetric grid of feature cards. Each cell is a
 * SpotlightCard so the whole board lights up under the cursor.
 */
export function BentoGrid({ items = DEFAULT_ITEMS, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[11rem]",
        className,
      )}
    >
      {items.map((item, i) => (
        <SpotlightCard
          key={i}
          className={cn("flex flex-col justify-between", item.span)}
        >
          <span className="grid size-10 place-items-center rounded-xl border border-border bg-background text-brand-ink">
            {item.icon}
          </span>
          <div className="mt-4">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.description}</p>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}
