"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { LightBeams } from "@/components/backgrounds/light-beams";
import { GradientText } from "@/components/text/gradient-text";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { cn } from "@/lib/utils";

export interface HeroWaitlistProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  placeholder?: string;
  ctaLabel?: string;
  /** Social-proof count, e.g. "2,000+". */
  count?: string;
  /** Names used for the social-proof avatar stack. */
  members?: string[];
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * HeroWaitlist — a launch hero over breathing light beams with an inline email
 * capture and social proof. The form is front-end only — nothing is sent
 * anywhere — so it is a safe, drop-in demo; wire `onSubmit` to your own
 * endpoint to collect addresses. Validation and status are announced politely.
 */
export function HeroWaitlist({
  eyebrow = "Launching this summer",
  title = "Be first through the",
  highlight = "door",
  description = "We're opening access in waves. Join the waitlist to claim early access, founder pricing, and a say in what we build next.",
  placeholder = "you@company.com",
  ctaLabel = "Join the waitlist",
  count = "2,000+",
  members = ["Ada Lin", "Ben Ortiz", "Chae Won", "Dev Rao", "Esme Roy"],
  className,
}: HeroWaitlistProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    // Front-end only: no network request is made. Swap in your own handler here.
    setStatus("done");
  };

  return (
    <LightBeams
      className={cn(
        "flex min-h-[32rem] items-center justify-center rounded-2xl border border-border px-6 py-20 text-center",
        className,
      )}
    >
      <div className="relative mx-auto max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-2 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-2" />
          </span>
          {eyebrow}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>

        {status === "done" ? (
          <div
            role="status"
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-brand/40 bg-surface/80 px-5 py-4 backdrop-blur"
          >
            <CheckCircle2 className="size-5 shrink-0 text-brand-2" />
            <p className="text-sm text-foreground">
              You&rsquo;re on the list — we&rsquo;ll reach out to{" "}
              <span className="font-semibold">{email}</span> soon.
            </p>
          </div>
        ) : (
          <>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <label htmlFor={id} className="sr-only">
                  Email address
                </label>
                <input
                  id={id}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={placeholder}
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? `${id}-error` : undefined}
                  className="w-full rounded-full border border-border bg-surface/80 py-3 pl-10 pr-4 text-sm text-foreground outline-none backdrop-blur transition-colors placeholder:text-muted-2 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
              >
                {ctaLabel}
                <ArrowRight className="size-4" />
              </button>
            </form>
            {status === "error" && (
              <p id={`${id}-error`} className="mt-2 text-sm text-brand-3">
                Please enter a valid email address.
              </p>
            )}
          </>
        )}

        {/* Social proof */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <AvatarStack names={members} max={4} />
          <p className="text-sm text-muted">
            Join <span className="font-semibold text-foreground">{count}</span>{" "}
            builders already in line
          </p>
        </div>
      </div>
    </LightBeams>
  );
}
