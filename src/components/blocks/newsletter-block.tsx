"use client";

import { type FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsletterBlockProps {
  heading?: string;
  description?: string;
  className?: string;
  /** Optional async submit handler. Front-end only by default (no network). */
  onSubscribe?: (email: string) => void;
}

/**
 * NewsletterBlock — a subscribe form with inline email validation and a success
 * state. NOTE: this is front-end only — it does not POST anywhere. Wire
 * `onSubscribe` (or your own action) to a real, authenticated endpoint.
 */
export function NewsletterBlock({
  heading = "Stay in the loop",
  description = "Get new components and templates in your inbox. No spam, unsubscribe anytime.",
  className,
  onSubscribe,
}: NewsletterBlockProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSubscribe?.(email);
    setDone(true);
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-surface p-8 text-center sm:p-12",
        className,
      )}
    >
      <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>

      {done ? (
        <p className="mt-6 inline-flex items-center gap-2 text-brand-2" role="status">
          <CheckCircle2 className="size-5" />
          Thanks — you&apos;re on the list!
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-6 max-w-md">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              aria-invalid={!!error}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-brand"
            />
            <button
              type="submit"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              Subscribe
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm text-brand-3">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
