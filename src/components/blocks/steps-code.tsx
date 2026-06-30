"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CodeStep {
  title: string;
  description: string;
  code: string;
}

export interface StepsCodeProps {
  eyebrow?: string;
  heading?: string;
  steps?: CodeStep[];
  className?: string;
}

const DEFAULT_STEPS: CodeStep[] = [
  {
    title: "Create your app",
    description: "Scaffold a fresh Next.js project to build on.",
    code: "npx create-next-app@latest my-app",
  },
  {
    title: "Add the dependencies",
    description: "Pull in motion and lucide-react alongside Tailwind.",
    code: "npm install motion lucide-react",
  },
  {
    title: "Drop in a component",
    description: "Copy any component's source, then import it where you need it.",
    code: 'import { StepsCode } from "@/components/blocks/steps-code";',
  },
  {
    title: "Run it",
    description: "Start the dev server and see it live.",
    code: "npm run dev",
  },
];

function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Terminal className="size-3.5" />
          terminal
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          {copied ? (
            <Check className="size-3.5 text-brand-2" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-sm">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
}

/**
 * StepsCode — a developer quickstart. Each step pairs a short instruction with
 * a terminal-style snippet and a copy button (with copied feedback), threaded
 * along a gradient rail.
 */
export function StepsCode({
  eyebrow = "Quickstart",
  heading = "Up and running in four commands",
  steps = DEFAULT_STEPS,
  className,
}: StepsCodeProps) {
  return (
    <section className={cn("mx-auto max-w-2xl", className)}>
      <div>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      </div>

      <ol className="mt-12">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-sm font-semibold text-brand-ink">
                  {i + 1}
                </span>
                {!isLast && (
                  <span
                    aria-hidden
                    className="my-2 w-px flex-1 bg-gradient-to-b from-brand/50 via-border to-border"
                  />
                )}
              </div>
              <div className={cn("min-w-0 flex-1", isLast ? "pb-0" : "pb-8")}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                <CodeSnippet code={step.code} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
