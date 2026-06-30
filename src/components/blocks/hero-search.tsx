"use client";

import { useId, useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { cn } from "@/lib/utils";

export interface HeroSearchProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** Popular query chips shown beneath the field. */
  tags?: string[];
  className?: string;
}

const DEFAULT_TAGS = ["Dashboards", "Auth", "Pricing", "Onboarding", "AI chat"];

/**
 * HeroSearch — a search-led landing hero (docs, marketplace, templates). The
 * field is a labelled search form; submitting is a no-op (front-end only) and
 * the popular chips fill the query. Wire `onSubmit` to your own search.
 */
export function HeroSearch({
  eyebrow = "10,000+ building blocks",
  title = "Find the perfect",
  highlight = "starting point",
  description = "Search a growing library of production-ready sections, flows, and full pages — copy, paste, and make them yours.",
  placeholder = "Search components, blocks, templates…",
  buttonLabel = "Search",
  tags = DEFAULT_TAGS,
  className,
}: HeroSearchProps) {
  const reduce = useReducedMotion();
  const id = useId();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end only: no navigation or fetch. Wire this to your search.
  };

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[30rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background px-6 py-20 text-center",
        className,
      )}
    >
      {/* Faint dotted grid + glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border-strong) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(120% 110% at 50% 0%, #000 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 110% at 50% 0%, #000 35%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18%] -z-10 size-[30rem] max-w-[120%] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 40%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-2xl"
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

        {/* Search field */}
        <form
          role="search"
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-full border border-border bg-surface p-1.5 pl-4 shadow-[0_20px_60px_-30px_var(--brand)] focus-within:border-brand"
        >
          <Search className="size-5 shrink-0 text-muted" />
          <label htmlFor={id} className="sr-only">
            Search
          </label>
          <input
            id={id}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-2"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            {buttonLabel}
          </button>
        </form>

        {/* Popular tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-2">
            <TrendingUp className="size-3.5" />
            Popular
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="rounded-full border border-border bg-surface/60 px-3 py-1 text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
