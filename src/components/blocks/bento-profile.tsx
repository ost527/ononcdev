"use client";

import { type ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Globe,
  Mail,
  MapPin,
  Rss,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface ProfileLink {
  icon: ReactNode;
  label: string;
  sub?: string;
  href?: string;
}

export interface BentoProfileProps {
  name?: string;
  handle?: string;
  bio?: string;
  location?: string;
  role?: string;
  links?: [ProfileLink, ProfileLink, ProfileLink, ProfileLink];
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

function LinkTile({
  link,
  variants,
}: {
  link: ProfileLink;
  variants?: Variants;
}) {
  return (
    <motion.a
      href={link.href ?? "#"}
      aria-label={link.label}
      variants={variants}
      className="group/tile flex min-h-[12rem] flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-0.5 hover:border-border-strong"
    >
      <span className="grid size-10 place-items-center rounded-xl border border-border bg-background text-brand-ink">
        {link.icon}
      </span>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-medium">{link.label}</div>
          {link.sub ? (
            <div className="truncate text-xs text-muted">{link.sub}</div>
          ) : null}
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted transition-all duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:text-brand-ink" />
      </div>
    </motion.a>
  );
}

const DEFAULT_LINKS: [ProfileLink, ProfileLink, ProfileLink, ProfileLink] = [
  { icon: <Globe className="size-5" />, label: "Website", sub: "ava.design" },
  { icon: <Mail className="size-5" />, label: "Email", sub: "say hello" },
  { icon: <FileText className="size-5" />, label: "Résumé", sub: "PDF · 2026" },
  { icon: <Rss className="size-5" />, label: "Journal", sub: "weekly notes" },
];

const EQ_BARS = [0.4, 0.85, 0.55, 1, 0.7];

/**
 * BentoProfile — a "link-in-bio" personal bento: a profile identity cell, a set
 * of outbound link tiles, a now-playing card with an animated equalizer, a
 * follower count, and a featured call-to-action. Link tiles are real anchors
 * with accessible names; the equalizer rests under reduced-motion.
 */
export function BentoProfile({
  name = "Ava Reed",
  handle = "@avareed",
  bio = "Design engineer crafting calm, motion-first interfaces. Currently building Lumen UI.",
  location = "Lisbon, PT",
  role = "Design Engineer",
  links = DEFAULT_LINKS,
  className,
}: BentoProfileProps) {
  const reduce = useReducedMotion();
  const tiles = links;
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem]"
      >
        {/* Profile identity — hero */}
        <Cell variants={item} className="min-h-[18rem] sm:col-span-2 lg:row-span-2">
          <div className="flex items-center gap-4">
            <span className="relative">
              <span
                aria-hidden
                className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xl font-semibold text-white"
              >
                {initials}
              </span>
              <span
                aria-hidden
                className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-surface bg-emerald-500"
              />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
              <p className="text-sm text-muted">{handle}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted">
            {bio}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted">
              <MapPin className="size-3.5 text-brand-ink" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted">
              <Sparkles className="size-3.5 text-brand-ink" />
              {role}
            </span>
          </div>
        </Cell>

        {/* Two link tiles */}
        <LinkTile link={tiles[0]} variants={item} />
        <LinkTile link={tiles[1]} variants={item} />

        {/* Now playing */}
        <Cell variants={item} accent="var(--brand-2)" className="min-h-[12rem]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-muted-2">
              Now playing
            </span>
            <div className="flex h-5 items-end gap-0.5" aria-hidden>
              {EQ_BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-brand"
                  style={{ height: `${h * 100}%`, transformOrigin: "bottom" }}
                  initial={false}
                  animate={
                    reduce ? undefined : { scaleY: [h, 1, 0.4, 0.85, h] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: 1.1 + i * 0.18,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                />
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <div className="truncate font-medium">Midnight City</div>
            <div className="truncate text-sm text-muted">M83</div>
          </div>
        </Cell>

        {/* Followers */}
        <Cell variants={item} className="min-h-[12rem]">
          <span className="text-[11px] uppercase tracking-wider text-muted-2">
            Audience
          </span>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={128} suffix="k" />
            </div>
            <p className="text-sm text-muted">Followers across platforms</p>
          </div>
        </Cell>

        {/* Featured CTA */}
        <Cell variants={item} accent="var(--brand-3)" className="sm:col-span-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand) 40%, transparent), transparent 70%)",
            }}
          />
          <span className="relative text-[11px] uppercase tracking-wider text-muted-2">
            Featured
          </span>
          <div className="relative mt-auto flex items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Book a 1:1 mentoring call
              </h3>
              <p className="mt-1 text-sm text-muted">
                30 minutes on design, motion, or careers.
              </p>
            </div>
            <a
              href="#"
              aria-label="Book a call"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
            >
              <CalendarDays className="size-4" />
              Book
            </a>
          </div>
        </Cell>

        {/* Two more link tiles */}
        <LinkTile link={tiles[2]} variants={item} />
        <LinkTile link={tiles[3]} variants={item} />
      </motion.div>
    </section>
  );
}
