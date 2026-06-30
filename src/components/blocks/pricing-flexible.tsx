"use client";

import { type ChangeEvent, type KeyboardEvent, useId, useState } from "react";
import { ArrowRight, Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingFlexibleProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  /** Preset monthly amounts shown as chips. */
  presets?: number[];
  /** The preset marked "Suggested" and used as the initial amount. */
  suggested?: number;
  currency?: string;
  period?: string;
  perks?: string[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_PRESETS = [5, 15, 30, 50];
const DEFAULT_PERKS = [
  "Every feature unlocked",
  "Full source on GitHub",
  "Your name in the credits",
  "Cancel or change anytime",
];

/**
 * PricingFlexible — a pay-what-you-want card: preset amount chips (an
 * accessible radiogroup) plus a custom amount input, both driving the CTA.
 */
export function PricingFlexible({
  eyebrow = "Pay what you want",
  heading = "Support the project on your terms",
  subheading = "Choose a monthly amount that feels right — every tier unlocks everything.",
  presets = DEFAULT_PRESETS,
  suggested = 15,
  currency = "$",
  period = "/mo",
  perks = DEFAULT_PERKS,
  ctaLabel = "Continue",
  className,
}: PricingFlexibleProps) {
  const baseId = useId();
  const [amount, setAmount] = useState(suggested);
  const selectedIndex = presets.indexOf(amount);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    let next: number;
    if (selectedIndex < 0) {
      next = 0; // no preset selected (custom amount) → first arrow selects chip 0
    } else {
      const dir = e.key === "ArrowRight" ? 1 : -1;
      next = (selectedIndex + dir + presets.length) % presets.length;
    }
    setAmount(presets[next]);
    document.getElementById(`${baseId}-preset-${next}`)?.focus();
  };

  const onCustom = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    setAmount(Number.isNaN(raw) ? 0 : Math.max(0, Math.min(9999, Math.round(raw))));
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-border bg-surface p-7 sm:p-8">
        <span className="text-sm font-medium text-foreground">Choose your monthly amount</span>

        <div
          role="radiogroup"
          aria-label="Preset amount"
          onKeyDown={onKeyDown}
          className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
        >
          {presets.map((preset, i) => {
            const isSelected = preset === amount;
            return (
              <button
                key={preset}
                id={`${baseId}-preset-${i}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected || (selectedIndex < 0 && i === 0) ? 0 : -1}
                onClick={() => setAmount(preset)}
                className={cn(
                  "relative rounded-xl border px-4 py-3 text-sm font-semibold tabular-nums transition-colors",
                  isSelected
                    ? "border-brand bg-brand/10 text-brand-ink"
                    : "border-border text-foreground hover:border-border-strong",
                )}
              >
                {currency}
                {preset}
                {preset === suggested && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-white">
                    Suggested
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <label htmlFor={`${baseId}-custom`} className="text-sm text-muted">
            Or enter a custom amount
          </label>
          <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background px-4 transition-colors focus-within:border-brand">
            <span className="text-muted">{currency}</span>
            <input
              id={`${baseId}-custom`}
              type="number"
              inputMode="numeric"
              min={0}
              max={9999}
              value={amount}
              onChange={onCustom}
              className="w-full bg-transparent py-3 pl-1 text-base font-semibold tabular-nums outline-none"
            />
            <span className="text-sm text-muted">{period}</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          <Heart className="size-4" />
          {ctaLabel} — {currency}
          {amount}
          {period}
          <ArrowRight className="size-4" />
        </button>

        <ul className="mt-6 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
              <span className="text-foreground/90">{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
