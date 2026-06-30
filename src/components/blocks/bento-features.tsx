"use client";

import { type ReactNode, Fragment } from "react";
import {
  Accessibility,
  Check,
  CloudOff,
  FileText,
  Filter,
  Monitor,
  MousePointer2,
  RefreshCw,
  Search,
  Send,
  Settings,
  Smartphone,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface BentoFeaturesProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

function Cell({
  className,
  children,
  variants,
  accent = "var(--brand)",
}: {
  className?: string;
  children: ReactNode;
  variants?: Variants;
  accent?: string;
}) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-0.5 hover:border-border-strong",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      {children}
    </motion.div>
  );
}

function NodeTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background text-brand-ink">
      {children}
    </span>
  );
}

/** A connecting wire with a pulse that travels along it (still under reduced-motion). */
function Wire({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative mx-1 h-px flex-1 bg-border-strong">
      <motion.span
        aria-hidden
        className="absolute -top-1 size-2 rounded-full bg-brand shadow-[0_0_10px_var(--brand)]"
        style={{ left: 0 }}
        initial={reduce ? false : { left: "0%", opacity: 0 }}
        animate={reduce ? undefined : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}

const PIPELINE = [
  { icon: <Zap className="size-5" />, label: "Trigger" },
  { icon: <Filter className="size-5" />, label: "Filter" },
  { icon: <Send className="size-5" />, label: "Action" },
];

const COMMANDS = [
  { icon: <FileText className="size-4" />, label: "Create new document", keys: "C" },
  { icon: <UserPlus className="size-4" />, label: "Invite a teammate", keys: "I" },
  { icon: <Settings className="size-4" />, label: "Open settings", keys: "," },
];

const SWATCHES = [
  "bg-brand",
  "bg-brand-2",
  "bg-brand-3",
  "bg-indigo-500",
  "bg-emerald-500",
];

/**
 * BentoFeatures — a feature-storytelling bento. Instead of metrics, each cell
 * carries a small, bespoke product mock: an automation pipeline with a pulse
 * that travels the wires, a ⌘K command palette, live collaboration cursors, a
 * theming swatch row, cross-device sync, and accessibility/offline notes. Cells
 * fade and lift in with a stagger; every animation rests when motion is reduced.
 */
export function BentoFeatures({
  eyebrow = "Capabilities",
  heading = "Built for the way you work",
  subheading = "Thoughtful features that compound — each one designed to disappear into your flow.",
  className,
}: BentoFeaturesProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted">
          <Sparkles className="size-3.5 text-brand-ink" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted">
          {subheading}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]"
      >
        {/* Automation pipeline — hero */}
        <Cell variants={item} className="min-h-[18rem] sm:col-span-2 lg:row-span-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-2">
            Automation
          </span>
          <div className="mt-8 flex items-center">
            {PIPELINE.map((step, i) => (
              <Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2">
                  <NodeTile>{step.icon}</NodeTile>
                  <span className="text-[11px] text-muted">{step.label}</span>
                </div>
                {i < PIPELINE.length - 1 ? <Wire reduce={reduce} /> : null}
              </Fragment>
            ))}
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-semibold tracking-tight">
              Automate the busywork
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Chain triggers, filters, and actions into pipelines that run
              themselves — no glue code, no babysitting.
            </p>
          </div>
        </Cell>

        {/* Command palette */}
        <Cell variants={item} accent="var(--brand-2)" className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Search className="size-4 text-brand-ink" />
              Command palette
            </div>
            <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted">
              ⌘K
            </kbd>
          </div>
          <div className="mt-3 rounded-lg border border-border bg-background p-1.5">
            <ul className="space-y-0.5">
              {COMMANDS.map((c, i) => (
                <li
                  key={c.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm",
                    i === 0 ? "bg-surface-2 text-foreground" : "text-muted",
                  )}
                >
                  <span className="text-brand-ink">{c.icon}</span>
                  <span className="flex-1 truncate">{c.label}</span>
                  <kbd className="rounded border border-border px-1 font-mono text-[10px] text-muted-2">
                    {c.keys}
                  </kbd>
                </li>
              ))}
            </ul>
          </div>
        </Cell>

        {/* Collaboration cursors */}
        <Cell variants={item} className="min-h-[12rem]">
          <div aria-hidden className="relative flex-1">
            <span
              className="absolute left-1 top-2 inline-flex animate-float items-center gap-1"
            >
              <MousePointer2 className="size-4 -scale-x-100 fill-brand text-brand" />
              <span className="rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-medium text-white">
                Mara
              </span>
            </span>
            <span
              className="absolute bottom-1 right-2 inline-flex animate-float items-center gap-1 [animation-delay:0.8s]"
            >
              <MousePointer2 className="size-4 fill-brand-2 text-brand-2" />
              <span className="rounded-md bg-brand-2 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Devon
              </span>
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-base font-semibold">Real-time together</h3>
            <p className="mt-1 text-sm text-muted">
              Live cursors, presence, and instant sync.
            </p>
          </div>
        </Cell>

        {/* Theming swatches */}
        <Cell variants={item} accent="var(--brand-3)" className="min-h-[12rem]">
          <div className="flex gap-2">
            {SWATCHES.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "size-8 rounded-lg",
                  s,
                  i === 0 && "ring-2 ring-brand ring-offset-2 ring-offset-surface",
                )}
              />
            ))}
          </div>
          <div className="mt-auto">
            <h3 className="text-base font-semibold">Make it yours</h3>
            <p className="mt-1 text-sm text-muted">
              Restyle the whole kit from a handful of tokens.
            </p>
          </div>
        </Cell>

        {/* Cross-device sync */}
        <Cell variants={item} accent="var(--brand-2)" className="sm:col-span-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <RefreshCw className="size-4 text-brand-ink" />
            Synced everywhere
          </div>
          <div className="mt-auto flex items-center justify-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <NodeTile>
                <Monitor className="size-5" />
              </NodeTile>
              <span className="text-[11px] text-muted">Desktop</span>
            </div>
            <div className="relative mb-5 h-px flex-1 bg-border-strong">
              <span className="absolute left-1/2 top-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-brand-2">
                <Check className="size-3.5" />
              </span>
              <motion.span
                aria-hidden
                className="absolute -top-1 size-2 rounded-full bg-brand-2"
                initial={reduce ? false : { left: "0%", opacity: 0 }}
                animate={
                  reduce ? undefined : { left: ["0%", "100%"], opacity: [0, 1, 0] }
                }
                transition={
                  reduce
                    ? undefined
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <NodeTile>
                <Smartphone className="size-5" />
              </NodeTile>
              <span className="text-[11px] text-muted">Mobile</span>
            </div>
          </div>
        </Cell>

        {/* Accessibility */}
        <Cell variants={item} className="min-h-[12rem]">
          <NodeTile>
            <Accessibility className="size-5" />
          </NodeTile>
          <div className="mt-auto">
            <h3 className="text-base font-semibold">Accessible by default</h3>
            <p className="mt-1 text-sm text-muted">
              Keyboard paths, ARIA, and reduced-motion — built in.
            </p>
          </div>
        </Cell>

        {/* Offline */}
        <Cell variants={item} accent="var(--brand-3)" className="min-h-[12rem]">
          <NodeTile>
            <CloudOff className="size-5" />
          </NodeTile>
          <div className="mt-auto">
            <h3 className="text-base font-semibold">Works offline</h3>
            <p className="mt-1 text-sm text-muted">
              Local-first — edits sync the moment you reconnect.
            </p>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
