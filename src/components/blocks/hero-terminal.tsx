"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Copy, TerminalSquare } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { cn } from "@/lib/utils";

export interface HeroTerminalProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  titleAfter?: string;
  description?: string;
  /** The install command shown in the copyable field. */
  command?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

type LineKind = "command" | "comment" | "output" | "success";
interface Line {
  kind: LineKind;
  text: string;
}

const LINES: Line[] = [
  { kind: "command", text: "npm create lumen@latest my-app" },
  { kind: "comment", text: "# scaffolding a fresh workspace…" },
  { kind: "output", text: "✓ 82 components linked" },
  { kind: "output", text: "✓ Tailwind v4 + tokens configured" },
  { kind: "command", text: "cd my-app && npm run dev" },
  { kind: "success", text: "▲ Ready on http://localhost:3000" },
];

const FULL_SCRIPT =
  "Terminal demo: scaffold a project with npm create lumen, install dependencies, then run npm run dev to start the server.";

function lineColor(kind: LineKind) {
  switch (kind) {
    case "command":
      return "text-foreground";
    case "comment":
      return "text-muted-2";
    case "success":
      return "text-brand-2";
    default:
      return "text-muted";
  }
}

/**
 * HeroTerminal — a developer-facing hero. The left column carries the pitch and
 * a copy-to-clipboard install command; the right is a terminal window that
 * types its session out line by line. Typing is skipped (shown in full) under
 * prefers-reduced-motion, and the animated pane is hidden from screen readers
 * in favor of a static description.
 */
export function HeroTerminal({
  eyebrow = "Developer-first",
  title = "Go from zero to",
  highlight = "production",
  titleAfter = "in minutes.",
  description = "A typed, tree-shakeable component layer with sensible defaults. Install once, theme with CSS variables, and ship interfaces that feel hand-crafted.",
  command = "npm i lumen-ui",
  primaryLabel = "Read the docs",
  secondaryLabel = "Browse components",
  className,
}: HeroTerminalProps) {
  const reduce = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const done = lineIndex >= LINES.length;

  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    // Reduced motion: reveal the whole session at once.
    if (reduce) {
      const t = setTimeout(() => setLineIndex(LINES.length), 0);
      return () => clearTimeout(t);
    }
    const current = LINES[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (charIndex < current.text.length) {
      const speed = current.kind === "command" ? 46 : 14;
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else {
      const pause = current.kind === "command" ? 420 : 150;
      timeout = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, pause);
    }
    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex, reduce]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard API unavailable — silently ignore. */
    }
  };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 sm:px-10 lg:py-20",
        className,
      )}
    >
      {/* Soft brand glow, bottom-right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 -z-10 size-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-2) 40%, transparent), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Copy column */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <TerminalSquare className="size-3.5 text-brand-2" />
            {eyebrow}
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title} <GradientText>{highlight}</GradientText> {titleAfter}
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-base text-muted sm:text-lg">
            {description}
          </p>

          {/* Copyable install command */}
          <div className="mt-8 flex max-w-sm items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 font-mono text-sm">
            <span aria-hidden className="select-none text-brand-2">
              $
            </span>
            <code className="flex-1 truncate text-foreground">{command}</code>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Copied" : "Copy install command"}
              className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {copied ? (
                <Check className="size-4 text-brand-2" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>
          <span aria-live="polite" className="sr-only">
            {copied ? "Install command copied to clipboard" : ""}
          </span>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
            >
              {primaryLabel}
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              {secondaryLabel}
            </button>
          </div>
        </div>

        {/* Terminal window */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
            <span className="size-2.5 rounded-full bg-brand-3/70" />
            <span className="size-2.5 rounded-full bg-brand/60" />
            <span className="size-2.5 rounded-full bg-brand-2/60" />
            <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] text-muted">
              <TerminalSquare className="size-3.5" />
              zsh — lumen
            </span>
          </div>

          {/* Typed session (decorative; described for assistive tech below). */}
          <div
            aria-hidden
            className="min-h-[14rem] space-y-1.5 p-5 font-mono text-[13px] leading-relaxed"
          >
            {LINES.map((line, i) => {
              if (i > lineIndex) return null;
              const text =
                i < lineIndex ? line.text : line.text.slice(0, charIndex);
              const showCaret =
                i === lineIndex || (done && i === LINES.length - 1);
              return (
                <div key={i} className={cn("flex gap-2", lineColor(line.kind))}>
                  {line.kind === "command" && (
                    <span className="select-none text-brand-2">❯</span>
                  )}
                  <span className="whitespace-pre-wrap break-all">
                    {text}
                    {showCaret && (
                      <span className="animate-blink ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-brand-2 align-middle" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="sr-only">{FULL_SCRIPT}</p>
        </motion.div>
      </div>
    </section>
  );
}
