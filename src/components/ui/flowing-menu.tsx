"use client";

import { cn, prefersReducedMotion } from "@/lib/utils";

/** A single row in the {@link FlowingMenu}. */
export interface FlowingMenuItem {
  /** Text shown at rest and repeated in the hover marquee. */
  label: string;
  /** Destination URL. Renders the row as a link; omit to render a button. */
  href?: string;
}

/** Props for {@link FlowingMenu}. */
export interface FlowingMenuProps {
  /** Rows to render, top to bottom. Defaults to {@link DEFAULT_ITEMS}. */
  items?: FlowingMenuItem[];
  /** Height of each row in pixels. */
  rowHeight?: number;
  /** Seconds for one full marquee loop. */
  speed?: number;
  /** Hover band background, as a hex color. */
  accent?: string;
  /** Text color on the hover band, as a hex color. */
  accentText?: string;
  /** Times the label repeats within one marquee track. */
  repeat?: number;
  /** Corner radius of the outer container, in pixels. */
  radius?: number;
  /** Accessible name for the menu's nav element. */
  label?: string;
  /** Additional class names for the root element. */
  className?: string;
}

/** Default rows shown when no `items` prop is supplied. */
export const DEFAULT_ITEMS: FlowingMenuItem[] = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

/**
 * FlowingMenu — a vertical list of menu rows. On hover or keyboard focus, a
 * colored band slides in from below and a horizontal marquee of the repeated
 * label flows across it. Degrades to a static, centered label with no slide
 * or marquee under `prefers-reduced-motion: reduce`.
 */
export function FlowingMenu({
  items = DEFAULT_ITEMS,
  rowHeight = 72,
  speed = 12,
  accent = "#8b5cf6",
  accentText = "#0b0d18",
  repeat = 8,
  radius = 0,
  label = "Flowing menu",
  className,
}: FlowingMenuProps) {
  const reduce = prefersReducedMotion();

  return (
    <nav
      aria-label={label}
      className={cn(
        "w-full divide-y divide-border overflow-hidden border-y border-border",
        className,
      )}
      style={{ borderRadius: radius }}
    >
      {items.length === 0 ? null : (
        <ul className="m-0 list-none p-0">
          {items.map((item, i) => {
            const track = Array.from({ length: Math.max(1, repeat) })
              .map(() => item.label)
              .join(" ● ");

            const content = (
              <>
                <span className="relative z-[1] text-lg font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-transparent group-focus-visible:text-transparent">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 flex items-center overflow-hidden",
                    reduce
                      ? "translate-y-0 justify-center opacity-100"
                      : "translate-y-[101%] opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                  )}
                  style={{ background: accent, color: accentText }}
                >
                  {reduce ? (
                    <span className="whitespace-nowrap text-lg font-medium">
                      {item.label}
                    </span>
                  ) : (
                    <span className="flex w-max shrink-0">
                      {[0, 1].map((copy) => (
                        <span
                          key={copy}
                          className="flex shrink-0 items-center whitespace-nowrap px-3 text-lg font-medium"
                          style={{
                            animation: `marquee ${speed}s linear infinite`,
                          }}
                        >
                          {track} ●
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </>
            );

            const rowClass = cn(
              "group relative flex w-full items-center justify-center overflow-hidden focus:outline-none focus-visible:outline-none",
            );

            return (
              <li key={`${item.label}-${i}`} style={{ height: rowHeight }}>
                {item.href ? (
                  <a href={item.href} className={rowClass}>
                    {content}
                  </a>
                ) : (
                  <button type="button" className={rowClass}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
