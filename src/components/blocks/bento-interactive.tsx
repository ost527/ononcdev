"use client";

import { type ReactNode, useEffect, useState } from "react";
import {
  ArrowRight,
  Box,
  Check,
  Copy,
  MousePointer2,
  Sparkles,
  Terminal,
  Wand2,
  Zap,
} from "lucide-react";
import { CountUp } from "@/components/text/count-up";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Switch } from "@/components/ui/switch";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

export interface BentoInteractiveProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  /** The command shown in the copy-to-clipboard cell. */
  command?: string;
  className?: string;
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink">
      {children}
    </span>
  );
}

/**
 * BentoInteractive — a bento that puts the library's interaction model on
 * display: a conic sheen that orbits a card edge, a cursor spotlight, a 3D
 * tilt, a magnetic call-to-action, a copy-to-clipboard command, and a live
 * toggle. Each cell is a real, working primitive — not a screenshot — and each
 * effect settles to a calm resting state when motion is reduced.
 */
export function BentoInteractive({
  eyebrow = "Interactive",
  heading = "Built to be touched",
  subheading = "Every surface reacts — to the pointer, to focus, to a tap. Hover, drag, and click around.",
  command = "npm i ononc",
  className,
}: BentoInteractiveProps) {
  const [copied, setCopied] = useState(false);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      /* clipboard unavailable — leave the button state unchanged */
    }
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

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Conic gradient border */}
        <div className="group relative min-h-[12rem] overflow-hidden rounded-2xl bg-border p-px sm:col-span-2">
          <span
            aria-hidden
            className="absolute -inset-[150%] animate-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, var(--brand) 70deg, var(--brand-2) 150deg, var(--brand-3) 220deg, transparent 320deg)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between rounded-[calc(1rem-1px)] bg-surface p-6">
            <IconTile>
              <Wand2 className="size-5" />
            </IconTile>
            <div>
              <h3 className="text-base font-semibold">Living gradient borders</h3>
              <p className="mt-1 max-w-sm text-sm text-muted">
                A conic sheen orbits the edge on a slow loop, then rests as a
                still gradient when motion is reduced.
              </p>
            </div>
          </div>
        </div>

        {/* Cursor spotlight */}
        <SpotlightCard className="min-h-[12rem]">
          <IconTile>
            <MousePointer2 className="size-5" />
          </IconTile>
          <h3 className="mt-4 text-base font-semibold">Cursor spotlight</h3>
          <p className="mt-1 text-sm text-muted">
            A soft glow tracks your pointer across the surface.
          </p>
        </SpotlightCard>

        {/* 3D tilt */}
        <TiltCard
          className="flex h-full min-h-[12rem] flex-col justify-between border border-border bg-surface p-6"
          max={10}
        >
          <IconTile>
            <Box className="size-5" />
          </IconTile>
          <div>
            <h3 className="text-base font-semibold">3D tilt</h3>
            <p className="mt-1 text-sm text-muted">
              Leans toward the cursor with a tracking glare.
            </p>
          </div>
        </TiltCard>

        {/* Copy command */}
        <div className="flex min-h-[12rem] flex-col justify-between rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <div className="flex items-center gap-1.5 text-muted">
            <Terminal className="size-4" />
            <span className="text-xs font-medium">Quickstart</span>
          </div>
          <div>
            <p className="text-sm text-muted">Install in seconds</p>
            <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <code className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
                <span className="text-brand-2">$</span> {command}
              </code>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy command"}
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Magnetic CTA */}
        <div className="flex min-h-[12rem] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-sm text-muted">Buttons that lean in</p>
          <MagneticButton aria-label="Get started">
            Get started
            <ArrowRight className="size-4" />
          </MagneticButton>
        </div>

        {/* Live toggle */}
        <div className="flex min-h-[12rem] flex-col justify-between rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              <span
                aria-hidden
                className={cn(
                  "size-2 rounded-full transition-colors",
                  live ? "bg-emerald-500" : "bg-muted-2",
                )}
              />
              {live ? "Live" : "Paused"}
            </span>
            <Switch
              checked={live}
              onCheckedChange={setLive}
              label="Toggle live updates"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-2xl font-semibold tracking-tight">
              <Zap className="size-5 text-brand-ink" />
              <CountUp to={live ? 1240 : 0} />
            </div>
            <p className="text-sm text-muted">
              {live ? "Events streaming in" : "Stream paused"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
