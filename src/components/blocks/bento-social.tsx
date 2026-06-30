"use client";

import { type ReactNode } from "react";
import {
  Aperture,
  Boxes,
  Command,
  Hexagon,
  Orbit,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  gradient: string;
}

export interface BentoSocialProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  testimonials?: [Testimonial, Testimonial, Testimonial];
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

function Avatar({ name, gradient }: { name: string; gradient: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold text-white",
        gradient,
      )}
    >
      {name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}

const DEFAULT_TESTIMONIALS: [Testimonial, Testimonial, Testimonial] = [
  {
    quote:
      "ONONC let us ship a genuinely polished product in weeks, not months. Motion, accessibility, and theming were already handled — we just composed.",
    name: "Mara Vance",
    role: "VP Engineering, Northwind",
    gradient: "from-brand to-brand-2",
  },
  {
    quote: "The most thoughtful component set we've adopted. It just feels right.",
    name: "Devon Park",
    role: "Design Lead, Aperture",
    gradient: "from-brand-2 to-brand-3",
  },
  {
    quote: "Reduced-motion and keyboard support out of the box saved us an entire audit.",
    name: "Iris Cho",
    role: "Staff Engineer, Vertex",
    gradient: "from-brand-3 to-brand",
  },
];

const LOGOS = [
  { icon: <Hexagon className="size-4" />, name: "Northwind" },
  { icon: <Command className="size-4" />, name: "Aperture" },
  { icon: <Aperture className="size-4" />, name: "Vertex" },
  { icon: <Boxes className="size-4" />, name: "Nimbus" },
  { icon: <Orbit className="size-4" />, name: "Umbra" },
];

/**
 * BentoSocial — a social-proof bento: one featured testimonial, two supporting
 * quotes, an aggregate star rating, a wordmark logo row, and headline stats.
 * Quotes use semantic figure/blockquote/figcaption; cells fade and lift in with
 * a stagger that settles instantly under reduced-motion.
 */
export function BentoSocial({
  eyebrow = "Loved by teams",
  heading = "Don't just take our word for it",
  subheading = "Thousands of teams build their interfaces on ONONC.",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: BentoSocialProps) {
  const reduce = useReducedMotion();
  const [featured, second, third] = testimonials;

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
          <Sparkles className="size-3.5 text-brand-ink" />
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
        {/* Featured testimonial */}
        <Cell
          variants={item}
          className="min-h-[20rem] sm:col-span-2 lg:row-span-2"
        >
          <Quote className="size-9 text-brand/30" aria-hidden />
          <figure className="mt-auto">
            <blockquote className="text-balance text-xl font-medium leading-relaxed sm:text-2xl">
              “{featured.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Avatar name={featured.name} gradient={featured.gradient} />
              <span>
                <span className="block text-sm font-semibold">
                  {featured.name}
                </span>
                <span className="block text-sm text-muted">{featured.role}</span>
              </span>
            </figcaption>
          </figure>
        </Cell>

        {/* Supporting quote — second */}
        <Cell variants={item} accent="var(--brand-2)" className="min-h-[12rem]">
          <figure className="flex h-full flex-col">
            <blockquote className="text-sm leading-relaxed text-foreground">
              “{second.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-2.5 pt-4">
              <Avatar name={second.name} gradient={second.gradient} />
              <span>
                <span className="block text-xs font-semibold">{second.name}</span>
                <span className="block text-xs text-muted">{second.role}</span>
              </span>
            </figcaption>
          </figure>
        </Cell>

        {/* Supporting quote — third */}
        <Cell variants={item} accent="var(--brand-3)" className="min-h-[12rem]">
          <figure className="flex h-full flex-col">
            <blockquote className="text-sm leading-relaxed text-foreground">
              “{third.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-2.5 pt-4">
              <Avatar name={third.name} gradient={third.gradient} />
              <span>
                <span className="block text-xs font-semibold">{third.name}</span>
                <span className="block text-xs text-muted">{third.role}</span>
              </span>
            </figcaption>
          </figure>
        </Cell>

        {/* Aggregate rating */}
        <Cell variants={item} className="min-h-[12rem]">
          <div className="flex gap-0.5" role="img" aria-label="Rated 4.9 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-brand text-brand" aria-hidden />
            ))}
          </div>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={4.9} decimals={1} />
              <span className="text-lg text-muted">/5</span>
            </div>
            <p className="text-sm text-muted">From 2,400 reviews</p>
          </div>
        </Cell>

        {/* Customers stat */}
        <Cell variants={item} accent="var(--brand-2)" className="min-h-[12rem]">
          <span className="text-[11px] uppercase tracking-wider text-muted-2">
            Customers
          </span>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={10} suffix="k+" />
            </div>
            <p className="text-sm text-muted">Teams shipping with ONONC</p>
          </div>
        </Cell>

        {/* Logo row */}
        <Cell variants={item} className="justify-between sm:col-span-2">
          <p className="text-[11px] uppercase tracking-wider text-muted-2">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
            {LOGOS.map((logo) => (
              <span
                key={logo.name}
                className="inline-flex items-center gap-1.5 text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-foreground"
              >
                <span aria-hidden className="text-brand-ink">{logo.icon}</span>
                {logo.name}
              </span>
            ))}
          </div>
        </Cell>

        {/* Recommend stat */}
        <Cell variants={item} accent="var(--brand-3)" className="sm:col-span-2">
          <div className="flex h-full items-center gap-5">
            <div className="text-5xl font-semibold tracking-tight text-brand-ink">
              <CountUp to={98} suffix="%" />
            </div>
            <p className="text-pretty text-muted">
              of teams would recommend ONONC to a colleague.
            </p>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
