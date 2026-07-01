"use client";

import { type ReactNode, useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface BentoDevProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  /** The snippet copied by the editor cell. */
  snippet?: string;
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

const DEFAULT_SNIPPET = `import { ONONC } from "ononc";

const ui = new ONONC({ theme: "dark" });
await ui.mount("#app");`;

const ENDPOINTS = [
  { method: "GET", path: "/v1/components", tone: "text-emerald-500" },
  { method: "POST", path: "/v1/components", tone: "text-brand-2" },
  { method: "DELETE", path: "/v1/components/:id", tone: "text-brand-3" },
];

const SDKS = ["TypeScript", "Python", "Go", "Ruby", "Rust", "PHP"];

const EVENTS = [
  { name: "build.succeeded", status: 200 },
  { name: "deploy.created", status: 200 },
  { name: "component.published", status: 201 },
];

/**
 * BentoDev — a developer-experience bento. A copy-to-clipboard code editor sits
 * beside REST endpoints, SDK languages, a live latency readout, a webhook event
 * log, a rate-limit meter, and a docs CTA. Cells fade and lift in with a
 * stagger; the editor's copy works with a graceful clipboard fallback.
 */
export function BentoDev({
  eyebrow = "Developers",
  heading = "An API you'll actually enjoy",
  subheading = "Typed SDKs, predictable REST, and copy-paste examples for every endpoint.",
  snippet = DEFAULT_SNIPPET,
  className,
}: BentoDevProps) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
    } catch {
      /* clipboard unavailable — leave the button state unchanged */
    }
  };

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
          <Terminal className="size-3.5 text-brand-ink" />
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
        {/* Code editor — hero */}
        <Cell variants={item} className="min-h-[20rem] sm:col-span-2 lg:row-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-brand-3/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-muted-2">
                  app.ts
                </span>
              </div>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy code"}
                className="grid size-7 place-items-center rounded-md border border-border text-muted transition-colors hover:text-foreground"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
              <code>
                <span className="text-brand-3">import</span>
                <span className="text-foreground"> {"{ ONONC }"} </span>
                <span className="text-brand-3">from</span>
                <span className="text-brand-2"> &quot;ononc&quot;</span>
                <span className="text-foreground">;</span>
                {"\n\n"}
                <span className="text-brand-3">const</span>
                <span className="text-foreground"> ui </span>
                <span className="text-brand-3">=</span>
                <span className="text-brand-3"> new</span>
                <span className="text-brand-ink"> ONONC</span>
                <span className="text-foreground">({"{ "}theme: </span>
                <span className="text-brand-2">&quot;dark&quot;</span>
                <span className="text-foreground"> {"}"});</span>
                {"\n"}
                <span className="text-brand-3">await</span>
                <span className="text-foreground"> ui.</span>
                <span className="text-brand-ink">mount</span>
                <span className="text-foreground">(</span>
                <span className="text-brand-2">&quot;#app&quot;</span>
                <span className="text-foreground">);</span>
              </code>
            </pre>
          </div>
          <div className="mt-auto pt-5">
            <h3 className="text-xl font-semibold tracking-tight">
              Integrate in minutes
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Install the package, drop in your key, and render. No build config,
              no boilerplate.
            </p>
          </div>
        </Cell>

        {/* API endpoints */}
        <Cell variants={item} accent="var(--brand-2)" className="sm:col-span-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Zap className="size-4 text-brand-ink" />
            RESTful by design
          </div>
          <div className="mt-auto flex flex-col gap-1.5">
            {ENDPOINTS.map((ep) => (
              <div
                key={`${ep.method} ${ep.path}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 font-mono text-[12.5px]"
              >
                <span className={cn("w-14 shrink-0 font-semibold", ep.tone)}>
                  {ep.method}
                </span>
                <span className="truncate text-muted">{ep.path}</span>
              </div>
            ))}
          </div>
        </Cell>

        {/* SDK languages */}
        <Cell variants={item} className="min-h-[12rem]">
          <h3 className="text-sm font-medium">SDKs everywhere</h3>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {SDKS.map((sdk) => (
              <span
                key={sdk}
                className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted"
              >
                {sdk}
              </span>
            ))}
          </div>
        </Cell>

        {/* Latency */}
        <Cell variants={item} accent="var(--brand-2)" className="min-h-[12rem]">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Edge network
          </span>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={42} suffix="ms" />
            </div>
            <p className="text-sm text-muted">Median global latency</p>
          </div>
        </Cell>

        {/* Webhook events */}
        <Cell variants={item} accent="var(--brand-3)" className="sm:col-span-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Webhook className="size-4 text-brand-ink" />
            Real-time webhooks
          </div>
          <div className="mt-auto flex flex-col gap-1.5">
            {EVENTS.map((e) => (
              <div
                key={e.name}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs"
              >
                <span className="truncate text-muted">{e.name}</span>
                <span className="ml-auto shrink-0 rounded border border-emerald-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </Cell>

        {/* Rate limit */}
        <Cell variants={item} className="min-h-[12rem]">
          <h3 className="text-sm font-medium">Generous limits</h3>
          <div className="mt-auto">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-2xl font-semibold tracking-tight">
                <CountUp to={10} suffix="k" />
              </span>
              <span className="text-xs text-muted">req / min</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-2"
                style={{ width: "32%" }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </Cell>

        {/* Docs CTA */}
        <Cell variants={item} accent="var(--brand-3)" className="min-h-[12rem]">
          <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink">
            <BookOpen className="size-5" />
          </span>
          <div className="mt-auto">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-base font-semibold"
            >
              Read the docs
              <ArrowUpRight className="size-4 text-brand-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-1 text-sm text-muted">
              Guides, references, and recipes.
            </p>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
