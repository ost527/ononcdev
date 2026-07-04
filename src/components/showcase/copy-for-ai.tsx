"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CopyForAiProps {
  /** The fully-formed prompt (install command + docs + source) to copy. */
  prompt: string;
  className?: string;
}

/**
 * Copies a ready-to-paste prompt for an AI coding agent — the shadcn install
 * command, the docs URL, and the component's source — so the agent can add the
 * component in one step.
 */
export function CopyForAi({ prompt, className }: CopyForAiProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable (e.g. insecure context) */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied AI prompt" : "Copy prompt for AI agent"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
    >
      {copied ? (
        <Check className="size-4 text-brand-2" aria-hidden />
      ) : (
        <Sparkles className="size-4 text-muted" aria-hidden />
      )}
      {copied ? "Copied" : "Copy for AI"}
    </button>
  );
}
