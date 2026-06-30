"use client";

import { useId, useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { cn } from "@/lib/utils";

export interface HeroAIProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  placeholder?: string;
  /** Quick-fill suggestion chips. */
  suggestions?: string[];
  /** Canned response revealed on submit (front-end only). */
  answer?: string;
  className?: string;
}

const DEFAULT_SUGGESTIONS = [
  "Design a pricing page",
  "Write release notes",
  "Draft a cold email",
  "Explain this code",
];

type Status = "idle" | "loading" | "done";

/**
 * HeroAI — an AI-product hero with a prompt composer, quick-fill suggestions,
 * and a simulated assistant reply. It is front-end only: submitting reveals a
 * canned answer after a short "thinking" beat (skipped under reduced motion) —
 * no request is sent. Wire `handleSubmit` to your model to make it real.
 */
export function HeroAI({
  eyebrow = "Meet your AI copilot",
  title = "Describe it. Lumen",
  highlight = "builds it",
  description = "Turn a sentence into shippable UI. Ask for a section, a flow, or a whole page — and refine it in plain language.",
  placeholder = "Ask anything — e.g. “Design a pricing page”",
  suggestions = DEFAULT_SUGGESTIONS,
  answer = "Here's a conversion-focused pricing page: three tiers (Starter, Pro, Scale) with a monthly/annual toggle, the Pro plan highlighted, and a short FAQ to handle objections. Want me to drop in the components?",
  className,
}: HeroAIProps) {
  const reduce = useReducedMotion();
  const id = useId();
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setStatus("loading");
    // Front-end demo only: reveal the canned answer after a short beat.
    window.setTimeout(() => setStatus("done"), reduce ? 0 : 750);
  };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 text-center sm:px-10 lg:py-20",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18%] -z-10 size-[32rem] max-w-[120%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, var(--brand), var(--brand-2), var(--brand-3), var(--brand))",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <Sparkles className="size-3.5 text-brand-ink" />
          {eyebrow}
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>
      </motion.div>

      {/* Prompt composer */}
      <div className="mx-auto mt-9 max-w-xl text-left">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-2xl border border-border bg-surface p-2 shadow-[0_20px_60px_-30px_var(--brand)] focus-within:border-brand"
        >
          <Sparkles className="ml-2 size-4 shrink-0 text-brand-ink" />
          <label htmlFor={id} className="sr-only">
            Ask the AI copilot
          </label>
          <input
            id={id}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (status === "done") setStatus("idle");
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-2"
          />
          <button
            type="submit"
            aria-label="Generate"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            <Wand2 className="size-4" />
            <span className="hidden sm:inline">Generate</span>
          </button>
        </form>

        {/* Suggestion chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setPrompt(s);
                if (status === "done") setStatus("idle");
              }}
              className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Response */}
        <div aria-live="polite" className="mt-5">
          {status === "loading" && (
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-4 py-3 text-sm text-muted">
              <span className="flex gap-1">
                <span className="size-1.5 animate-pulse rounded-full bg-brand-2" />
                <span
                  className="size-1.5 animate-pulse rounded-full bg-brand-2"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="size-1.5 animate-pulse rounded-full bg-brand-2"
                  style={{ animationDelay: "0.4s" }}
                />
              </span>
              Generating…
            </div>
          )}
          {status === "done" && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-left"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white">
                <Sparkles className="size-3.5" />
              </span>
              <p className="text-sm leading-relaxed text-foreground/90">{answer}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
