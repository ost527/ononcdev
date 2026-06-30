"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Plug,
  RefreshCw,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarqueeCapability {
  label: string;
  icon?: ReactNode;
}

export interface FeatureMarqueeProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  capabilities?: MarqueeCapability[];
  /** Seconds for one full loop of each row. */
  duration?: number;
  className?: string;
}

const DEFAULT_CAPABILITIES: MarqueeCapability[] = [
  { label: "Real-time sync", icon: <RefreshCw className="size-4" /> },
  { label: "Edge runtime", icon: <Cpu className="size-4" /> },
  { label: "Global CDN", icon: <Globe className="size-4" /> },
  { label: "SSO & SCIM", icon: <Lock className="size-4" /> },
  { label: "Audit logs", icon: <ShieldCheck className="size-4" /> },
  { label: "Webhooks", icon: <Plug className="size-4" /> },
  { label: "Live analytics", icon: <BarChart3 className="size-4" /> },
  { label: "Automations", icon: <Workflow className="size-4" /> },
  { label: "Typed SDKs", icon: <Code2 className="size-4" /> },
  { label: "Auto-scaling", icon: <Zap className="size-4" /> },
  { label: "Managed storage", icon: <Database className="size-4" /> },
  { label: "Composable UI", icon: <Layers className="size-4" /> },
  { label: "Smart alerts", icon: <Bell className="size-4" /> },
  { label: "Cloud backups", icon: <Cloud className="size-4" /> },
  { label: "Uptime monitoring", icon: <Activity className="size-4" /> },
];

function Pill({ capability }: { capability: MarqueeCapability }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/90">
      {capability.icon && (
        <span className="text-brand-2">{capability.icon}</span>
      )}
      {capability.label}
    </span>
  );
}

/**
 * MarqueeRow — two identical groups, each at least the container's width and
 * animated a full width, give a seamless loop. Reduced motion is handled purely
 * in CSS (no structural swap, so no hydration mismatch): the animation is
 * neutralized and a full-width group stays in view.
 */
function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: MarqueeCapability[];
  reverse?: boolean;
  duration: number;
}) {
  const groupClass = cn(
    "flex min-w-full shrink-0 items-center justify-around gap-3 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:[animation:none]",
    reverse && "[animation-direction:reverse]",
  );
  const style = {
    paddingInlineEnd: "0.75rem",
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;
  return (
    <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className={groupClass} style={style}>
        {items.map((c, i) => (
          <Pill key={i} capability={c} />
        ))}
      </div>
      <div className={groupClass} style={style} aria-hidden>
        {items.map((c, i) => (
          <Pill key={i} capability={c} />
        ))}
      </div>
    </div>
  );
}

/**
 * FeatureMarquee — two opposing rows of capability pills that drift past on a
 * loop and pause on hover. Honors reduced motion via CSS, keeping a full row of
 * pills visible without animation.
 */
export function FeatureMarquee({
  eyebrow = "All included",
  heading = "Batteries fully included",
  subheading = "Dozens of capabilities ship in the box — here's a taste.",
  capabilities = DEFAULT_CAPABILITIES,
  duration = 42,
  className,
}: FeatureMarqueeProps) {
  const mid = Math.ceil(capabilities.length / 2);
  const rowOne = capabilities.slice(0, mid);
  const rowTwo = capabilities.slice(mid);

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

      <div className="mt-10 space-y-4">
        <MarqueeRow items={rowOne} duration={duration} />
        {rowTwo.length > 0 && (
          <MarqueeRow items={rowTwo} reverse duration={duration} />
        )}
      </div>
    </section>
  );
}
