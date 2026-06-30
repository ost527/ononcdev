import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface Stat {
  value: number;
  /** Text appended after the number, e.g. "k+", "%". */
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

export interface StatsBandProps {
  stats?: Stat[];
  className?: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: 48, suffix: "+", label: "Components" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
  { value: 12, suffix: "k", label: "Developers" },
  { value: 60, suffix: "fps", label: "Buttery smooth" },
];

/**
 * StatsBand — a band of headline metrics that count up the first time they
 * scroll into view.
 */
export function StatsBand({ stats = DEFAULT_STATS, className }: StatsBandProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <CountUp
              to={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          </div>
          <div className="mt-1 text-sm text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
