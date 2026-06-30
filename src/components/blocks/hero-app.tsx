"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Home,
  Search,
  Star,
  User,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

export interface HeroAppProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  /** Rating shown beside the stars, e.g. "4.9". */
  rating?: string;
  ratingCount?: string;
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 18 },
  },
};

const ROWS = [
  { name: "Spotify", sub: "Subscription", amount: "-$9.99", out: true },
  { name: "Payday", sub: "Acme Inc.", amount: "+$3,200", out: false },
  { name: "Coffee", sub: "Blue Bottle", amount: "-$4.50", out: true },
];

/**
 * HeroApp — a mobile-app landing hero: pitch and store buttons on the left, a
 * 3D-tilting phone mock running an abstract wallet screen on the right, with a
 * floating notification. The store buttons are inert demo links.
 */
export function HeroApp({
  eyebrow = "Now on iOS & Android",
  title = "Your money, finally",
  highlight = "in focus",
  description = "Track spending, split bills, and grow savings — in an app that feels effortless. Bank-grade security, zero clutter.",
  rating = "4.9",
  ratingCount = "12k ratings",
  className,
}: HeroAppProps) {
  const reduce = useReducedMotion();
  const reveal = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.3 },
      };

  const storeBtn =
    "inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 sm:px-10 lg:py-20",
        className,
      )}
    >
      {/* Soft brand glow, right side. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 42%, transparent), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Copy column */}
        <motion.div {...reveal} className="max-w-xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
          >
            <Wallet className="size-3.5 text-brand-2" />
            {eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {title} <GradientText>{highlight}</GradientText>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-pretty text-base text-muted sm:text-lg"
          >
            {description}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href="#" className={storeBtn} aria-label="Download on the App Store">
              <Download className="size-5" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] opacity-80">
                  Download on the
                </span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a href="#" className={storeBtn} aria-label="Get it on Google Play">
              <Download className="size-5" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] opacity-80">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-2 text-sm text-muted"
          >
            <div className="flex items-center gap-0.5 text-brand-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span>
              <span className="font-semibold text-foreground">{rating}</span> ·{" "}
              {ratingCount}
            </span>
          </motion.div>
        </motion.div>

        {/* Phone mock column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 }}
          className="relative mx-auto"
        >
          <TiltCard max={6} glare={false} className="w-[260px]">
            <div className="rounded-[2.6rem] border-[6px] border-border-strong bg-background p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="relative overflow-hidden rounded-[2.1rem] bg-surface">
                {/* Notch */}
                <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-background" />
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-medium text-muted">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-muted" />
                    <span className="size-1.5 rounded-full bg-muted" />
                    <span className="h-2 w-4 rounded-[3px] border border-muted" />
                  </span>
                </div>

                {/* App content */}
                <div className="space-y-4 px-4 pb-4 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-muted">Good morning</p>
                      <p className="text-sm font-semibold">Jordan</p>
                    </div>
                    <span className="size-8 rounded-full bg-gradient-to-br from-brand to-brand-2" />
                  </div>

                  {/* Balance card */}
                  <div
                    className="rounded-2xl p-4 text-white"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--brand-ink), var(--brand-2))`,
                    }}
                  >
                    <p className="text-[11px] opacity-80">Total balance</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">
                      $12,480.50
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium">
                        <ArrowUpRight className="size-3" /> Send
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium">
                        <ArrowDownLeft className="size-3" /> Request
                      </span>
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="space-y-2">
                    {ROWS.map((r) => (
                      <div key={r.name} className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid size-8 place-items-center rounded-full",
                            r.out
                              ? "bg-brand-3/15 text-brand-3"
                              : "bg-brand-2/15 text-brand-2",
                          )}
                        >
                          {r.out ? (
                            <ArrowUpRight className="size-4" />
                          ) : (
                            <ArrowDownLeft className="size-4" />
                          )}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs font-medium">{r.name}</p>
                          <p className="text-[10px] text-muted">{r.sub}</p>
                        </div>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            r.out ? "text-foreground" : "text-brand-2",
                          )}
                        >
                          {r.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom tab bar */}
                <div className="flex items-center justify-around border-t border-border px-4 py-3 text-muted">
                  <Home className="size-5 text-brand-ink" />
                  <Search className="size-5" />
                  <Wallet className="size-5" />
                  <User className="size-5" />
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Floating notification */}
          <div
            className="animate-float absolute -left-4 top-10 flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-lg backdrop-blur"
            style={{ animationDelay: "-2s" }}
          >
            <span className="grid size-6 place-items-center rounded-full bg-brand-2/15 text-brand-2">
              <ArrowDownLeft className="size-3.5" />
            </span>
            <span className="text-xs font-medium">
              Payment received{" "}
              <span className="text-brand-2">+$240</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
