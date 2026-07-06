import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  /** Internal route ("/…", "#…") renders a next/link; mailto:/tel: render an in-place anchor; anything else opens in a new tab. */
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface FooterBlockProps {
  brand?: string;
  tagline?: string;
  columns?: FooterColumn[];
  /** Optional social icons. None are shown unless real links are supplied. */
  socials?: FooterSocial[];
  /**
   * Small note shown opposite the copyright line. Accepts a string or any
   * node, so consumers can drop in a link (e.g. a contact `mailto:`).
   */
  note?: React.ReactNode;
  className?: string;
}

/**
 * Sensible defaults that point at real routes only — never dead "#" links.
 * Consumers should pass their own `columns` for their own site map.
 */
const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Library",
    links: [
      { label: "Backgrounds", href: "/backgrounds" },
      { label: "Text Animations", href: "/text" },
      { label: "Components", href: "/ui" },
      { label: "Section Blocks", href: "/blocks" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Introduction", href: "/introduction" },
      { label: "Overview", href: "/" },
    ],
  },
];

/** True for same-site targets that should use client-side navigation. */
function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

/** mailto:/tel: links open the mail or phone handler in place — never a new tab. */
function isMailOrTel(href: string): boolean {
  return href.startsWith("mailto:") || href.startsWith("tel:");
}

/**
 * Renders an internal next/link, an in-place mailto:/tel: anchor, or an
 * external (new-tab) anchor, based on the href.
 */
function FooterAnchor({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  if (isInternal(href)) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (isMailOrTel(href)) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

/**
 * FooterBlock — brand + tagline (with optional socials) beside columns of
 * real navigation links, over a legal strip. Every link resolves to an actual
 * destination; there are no placeholder buttons.
 */
export function FooterBlock({
  brand = "ONONC",
  tagline = "Original, motion-first components for the modern web.",
  columns = DEFAULT_COLUMNS,
  socials,
  note = "Built with Next.js & Tailwind.",
  className,
}: FooterBlockProps) {
  return (
    <footer
      className={cn(
        "w-full rounded-2xl border border-border bg-surface p-8 sm:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <span className="text-lg font-bold tracking-tight">{brand}</span>
          <p className="mt-3 text-sm leading-relaxed text-muted">{tagline}</p>
          {socials && socials.length > 0 ? (
            <div className="mt-5 flex gap-2">
              {socials.map((social) => (
                <FooterAnchor
                  key={social.label}
                  href={social.href}
                  ariaLabel={social.label}
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <social.icon className="size-4" aria-hidden />
                </FooterAnchor>
              ))}
            </div>
          ) : null}
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-12 gap-y-8 sm:gap-x-16"
        >
          {columns.map((col) => (
            <div key={col.heading} className="min-w-28">
              <h3 className="text-sm font-semibold text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor
                      href={link.href}
                      className="rounded-sm text-sm text-muted outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
                    >
                      {link.label}
                    </FooterAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </span>
        {note ? <span>{note}</span> : null}
      </div>
    </footer>
  );
}
