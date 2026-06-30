"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  BarChart3,
  Check,
  Gauge,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface TabFeature {
  /** Short label shown in the tab. */
  label: string;
  /** Secondary line under the label (desktop only). */
  tagline?: string;
  icon?: ReactNode;
  /** Panel heading. */
  title: string;
  description: string;
  points?: string[];
  /** Panel visual; defaults to a built-in branded mock by position. */
  visual?: ReactNode;
}

export interface FeatureTabsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: TabFeature[];
  /** Auto-advance the active tab. Pauses on hover/focus and off-screen. */
  autoplay?: boolean;
  /** Auto-advance interval (ms). */
  interval?: number;
  className?: string;
}

/* ---------- Built-in panel visuals (token-driven, no images) ------------- */

function AnalyticsMock() {
  const bars = [38, 60, 46, 72, 54, 88];
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-28 rounded-full bg-foreground/15" />
        <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold text-brand-ink">
          Live
        </span>
      </div>
      <div className="flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-brand/25 to-brand-2/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function AutomationMock() {
  const rows = ["On new signup", "Verify & enrich", "Notify the team"];
  return (
    <div className="w-full space-y-2.5">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
        >
          <span className="grid size-6 place-items-center rounded-md bg-brand/15 text-xs font-semibold text-brand-ink">
            {i + 1}
          </span>
          <span className="text-xs font-medium text-foreground/80">{r}</span>
        </div>
      ))}
    </div>
  );
}

function SecurityMock() {
  const rows = ["SSO enforced", "Audit log on", "Data encrypted"];
  return (
    <div className="w-full space-y-2.5">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5"
        >
          <span className="text-xs font-medium text-foreground/80">{r}</span>
          <span className="flex h-4 w-7 items-center rounded-full bg-brand/70 px-0.5">
            <span className="size-3 translate-x-2.5 rounded-full bg-white" />
          </span>
        </div>
      ))}
    </div>
  );
}

function SpeedMock() {
  const spark = [30, 52, 40, 66, 58, 80, 72, 96];
  return (
    <div className="w-full space-y-4">
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tracking-tight">28</span>
        <span className="text-sm text-muted">ms p95</span>
      </div>
      <div className="flex h-20 items-end gap-1.5">
        {spark.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-brand-2/30 to-brand/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const MOCKS = [
  <AnalyticsMock key="a" />,
  <AutomationMock key="w" />,
  <SecurityMock key="s" />,
  <SpeedMock key="p" />,
];

const DEFAULT_FEATURES: TabFeature[] = [
  {
    label: "Analytics",
    tagline: "Dashboards & reporting",
    icon: <BarChart3 className="size-5" />,
    title: "Decisions, backed by live data",
    description:
      "Every metric that matters, updating as it happens. Build a view once and share it with the whole team.",
    points: ["Streaming charts", "Saved segments", "Scheduled exports"],
  },
  {
    label: "Automation",
    tagline: "Triggers & actions",
    icon: <Workflow className="size-5" />,
    title: "Put the routine on autopilot",
    description:
      "Chain triggers, conditions, and actions into flows that run themselves — reliably, around the clock.",
    points: ["Visual builder", "Native connectors", "Full run history"],
  },
  {
    label: "Security",
    tagline: "Access & audit",
    icon: <ShieldCheck className="size-5" />,
    title: "Locked down, end to end",
    description:
      "Enterprise controls without the enterprise overhead. Every action is scoped, logged, and reversible.",
    points: ["SSO & SCIM", "Granular roles", "Tamper-proof audit log"],
  },
  {
    label: "Performance",
    tagline: "Speed & scale",
    icon: <Gauge className="size-5" />,
    title: "Fast at any size",
    description:
      "Sub-50ms responses from the edge, holding steady as traffic climbs from your first user to your millionth.",
    points: ["Global edge", "Smart caching", "Linear scaling"],
  },
];

/**
 * FeatureTabs — an interactive, accessible feature explorer. The tablist
 * supports roving focus and arrow-key navigation; panels crossfade on change.
 * Optional autoplay advances the active tab, driven by a progress bar that
 * holds its position when paused on hover, focus, off-screen, or reduced motion.
 */
export function FeatureTabs({
  eyebrow = "Product tour",
  heading = "One platform, every angle",
  subheading = "Step through the core of the product — or let it walk you through itself.",
  features = DEFAULT_FEATURES,
  autoplay = true,
  interval = 5000,
  className,
}: FeatureTabsProps) {
  const baseId = useId();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Hover and focus are tracked separately so that leaving with the pointer
  // never resumes autoplay while a keyboard user is still focused inside.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const count = features.length;
  // Clamp so a shrinking `features` prop can never index out of bounds.
  const safeActive = Math.min(active, Math.max(0, count - 1));
  const paused = hovered || focused;
  const autoplayEnabled = autoplay && !reduce && count > 1;
  const playing = autoplayEnabled && inView && !paused;

  // Single source of truth for the autoplay clock (0 → 1). The progress bar
  // reads it directly, and reaching 1 is what advances the tab — so the bar and
  // the advance can never drift, and pausing simply freezes both.
  const progress = useMotionValue(0);
  const progressHeight = useTransform(progress, (v) => `${v * 100}%`);

  // Reset the clock whenever the active tab changes (declared before the play
  // effect so it runs first on a tab change).
  useEffect(() => {
    progress.set(0);
  }, [safeActive, progress]);

  // While playing, animate the remaining fraction to 1 at a steady rate; on
  // completion advance the tab. Pausing stops the animation, holding position.
  useEffect(() => {
    if (!playing) return;
    const remaining = interval * (1 - progress.get());
    const controls = animate(progress, 1, {
      duration: Math.max(0, remaining) / 1000,
      ease: "linear",
      onComplete: () => setActive((a) => (a + 1) % count),
    });
    return () => controls.stop();
  }, [playing, interval, count, safeActive, progress]);

  const focusTab = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    let next: number | null = null;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (safeActive + 1) % count;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (safeActive - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    focusTab(next);
  };

  const current = features[safeActive];
  const panelId = `${baseId}-panel`;

  // Nothing to render without features (guard placed after all hooks).
  if (count === 0) return null;

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

      <div
        ref={rootRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setFocused(false);
          }
        }}
        className="mt-12 grid gap-4 lg:grid-cols-[20rem_1fr] lg:gap-6"
      >
        <div
          role="tablist"
          aria-label={heading}
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {features.map((f, i) => {
            const selected = i === safeActive;
            return (
              <button
                key={i}
                type="button"
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={cn(
                  "group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-colors lg:w-full",
                  selected
                    ? "border-border bg-surface"
                    : "border-transparent text-muted hover:bg-surface/60 hover:text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 overflow-hidden rounded-full bg-border"
                >
                  {selected &&
                    (autoplayEnabled ? (
                      <motion.span
                        className="block w-full bg-gradient-to-b from-brand to-brand-2"
                        style={{ height: progressHeight }}
                      />
                    ) : (
                      <span className="block h-full w-full bg-gradient-to-b from-brand to-brand-2" />
                    ))}
                </span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg border border-border transition-colors",
                    selected
                      ? "bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-2"
                      : "bg-background text-brand-ink",
                  )}
                >
                  {f.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {f.label}
                  </span>
                  {f.tagline && (
                    <span className="mt-0.5 hidden truncate text-xs text-muted lg:block">
                      {f.tagline}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-tab-${safeActive}`}
          tabIndex={0}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:min-h-[22rem]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={safeActive}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
              className="grid items-center gap-8 sm:grid-cols-2"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted">
                  {current.description}
                </p>
                {current.points && current.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {current.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-2">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-foreground/90">{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className="flex items-center justify-center rounded-xl border border-border bg-background/60 p-5"
                aria-hidden
              >
                {current.visual ?? MOCKS[safeActive % MOCKS.length]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
