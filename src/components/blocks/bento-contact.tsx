import {
  ArrowUpRight,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ContactChannel {
  icon: ReactNode;
  label: string;
  sub: string;
  href?: string;
}

export interface BentoContactProps {
  heading?: string;
  subheading?: string;
  email?: string;
  location?: string;
  address?: string;
  className?: string;
}

function ChannelTile({ channel }: { channel: ContactChannel }) {
  return (
    <a
      href={channel.href ?? "#"}
      aria-label={channel.label}
      className="group/ch flex min-h-[12rem] flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-0.5 hover:border-border-strong"
    >
      <span className="grid size-10 place-items-center rounded-xl border border-border bg-background text-brand-ink">
        {channel.icon}
      </span>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-medium">{channel.label}</div>
          <div className="truncate text-xs text-muted">{channel.sub}</div>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted transition-all duration-300 group-hover/ch:-translate-y-0.5 group-hover/ch:translate-x-0.5 group-hover/ch:text-brand-ink" />
      </div>
    </a>
  );
}

/**
 * BentoContact — a "get in touch" bento: an intro, channel tiles (email, chat,
 * help center), an availability card, an abstract map tile with a pulsing pin,
 * and an email CTA. Server-safe; the map is pure CSS (no third-party embed,
 * nothing to load) and the pin's pulse rests under reduced-motion.
 */
export function BentoContact({
  heading = "Let's build something together",
  subheading = "Questions, partnerships, or just saying hi — pick whichever channel suits you.",
  email = "hello@ononc.dev",
  location = "Lisbon HQ",
  address = "Rua da Prata 12",
  className,
}: BentoContactProps) {
  const channels: ContactChannel[] = [
    { icon: <Mail className="size-5" />, label: "Email us", sub: email },
    {
      icon: <MessageCircle className="size-5" />,
      label: "Live chat",
      sub: "Avg. 2 min reply",
    },
    {
      icon: <LifeBuoy className="size-5" />,
      label: "Help center",
      sub: "Guides & answers",
    },
  ];

  return (
    <section className={cn("w-full", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem]">
        {/* Intro — hero */}
        <div className="flex min-h-[18rem] flex-col rounded-2xl border border-border bg-surface p-6 sm:col-span-2 lg:row-span-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Online now
          </span>
          <div className="mt-auto">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 max-w-md text-pretty text-muted">{subheading}</p>
          </div>
        </div>

        {/* Email + chat channels */}
        <ChannelTile channel={channels[0]} />
        <ChannelTile channel={channels[1]} />

        {/* Availability */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-medium">Office hours</h3>
          <div className="mt-auto">
            <div className="text-lg font-semibold tracking-tight">Mon–Fri</div>
            <p className="text-sm text-muted">9:00 – 18:00 WET</p>
            <p className="mt-1 text-xs text-muted-2">
              Typically replies in 2 hours
            </p>
          </div>
        </div>

        {/* Help center channel */}
        <ChannelTile channel={channels[2]} />

        {/* Abstract map */}
        <div className="relative flex min-h-[12rem] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-brand/50" />
            <span className="relative grid size-9 place-items-center rounded-full bg-brand text-white shadow-[0_8px_20px_-6px_var(--brand)]">
              <MapPin className="size-5" />
            </span>
          </span>
          <div className="relative">
            <div className="font-medium">{location}</div>
            <p className="text-sm text-muted">{address}</p>
          </div>
        </div>

        {/* Email CTA */}
        <div className="relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand) 40%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <h3 className="text-lg font-semibold tracking-tight">
              Prefer email?
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Drop us a line — we read and reply to every message.
            </p>
          </div>
          <a
            href={`mailto:${email}`}
            className="relative inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            <Send className="size-4" />
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}
