import { AtSign, Globe, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterColumn {
  heading: string;
  links: string[];
}

export interface FooterBlockProps {
  brand?: string;
  tagline?: string;
  columns?: FooterColumn[];
  className?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  { heading: "Product", links: ["Components", "Blocks", "Templates", "Changelog"] },
  { heading: "Resources", links: ["Docs", "Guides", "Showcase", "Figma"] },
  { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
];

/**
 * FooterBlock — a four-region footer: brand + tagline + socials alongside
 * columns of navigation links, with a legal strip beneath.
 */
export function FooterBlock({
  brand = "ONONC",
  tagline = "Original, motion-first components for the modern web.",
  columns = DEFAULT_COLUMNS,
  className,
}: FooterBlockProps) {
  return (
    <footer
      className={cn(
        "w-full rounded-2xl border border-border bg-surface p-8 sm:p-10",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center">
            <span className="text-lg font-bold tracking-tight">{brand}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{tagline}</p>
          <div className="mt-4 flex gap-2">
            <a
              href="#"
              aria-label="Website"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
            >
              <Globe className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Social"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
            >
              <AtSign className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Blog feed"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
            >
              <Rss className="size-4" />
            </a>
          </div>
        </div>
        {columns.map((col, i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold">{col.heading}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a
                    href="#"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
        <span>Built with Next.js & Tailwind.</span>
      </div>
    </footer>
  );
}
