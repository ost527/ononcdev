import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryTile {
  eyebrow: string;
  title: string;
  description?: string;
  /** Layered CSS background (mesh gradient) for the tile. */
  background: string;
  /** Tailwind grid-span classes. */
  span?: string;
  href?: string;
}

export interface BentoGalleryProps {
  heading?: string;
  subheading?: string;
  actionLabel?: string;
  tiles?: GalleryTile[];
  className?: string;
}

const DEFAULT_TILES: GalleryTile[] = [
  {
    eyebrow: "Editorial",
    title: "Designing in motion",
    description:
      "A study of rhythm, easing, and restraint across a living interface.",
    span: "col-span-2 row-span-2",
    background:
      "radial-gradient(at 18% 22%, #a78bfa 0px, transparent 55%), radial-gradient(at 82% 8%, #22d3ee 0px, transparent 50%), radial-gradient(at 60% 92%, #8b5cf6 0px, transparent 55%), linear-gradient(135deg, #2e1065, #0b0d18)",
  },
  {
    eyebrow: "Showcase",
    title: "Selected work",
    description: "Twelve projects, one consistent design language.",
    span: "col-span-2",
    background:
      "radial-gradient(at 20% 80%, #fb7185 0px, transparent 55%), radial-gradient(at 85% 20%, #8b5cf6 0px, transparent 50%), linear-gradient(135deg, #4c0519, #0b0d18)",
  },
  {
    eyebrow: "Studio",
    title: "Behind the build",
    background:
      "radial-gradient(at 25% 20%, #22d3ee 0px, transparent 52%), radial-gradient(at 78% 78%, #0ea5e9 0px, transparent 55%), linear-gradient(135deg, #083344, #0b0d18)",
  },
  {
    eyebrow: "Type",
    title: "Letters in space",
    background:
      "radial-gradient(at 30% 28%, #6366f1 0px, transparent 55%), radial-gradient(at 80% 12%, #a78bfa 0px, transparent 50%), linear-gradient(135deg, #1e1b4b, #0b0d18)",
  },
  {
    eyebrow: "Color",
    title: "Palettes that pulse",
    background:
      "radial-gradient(at 22% 25%, #fbbf24 0px, transparent 50%), radial-gradient(at 82% 80%, #fb7185 0px, transparent 55%), linear-gradient(135deg, #422006, #0b0d18)",
  },
  {
    eyebrow: "Field notes",
    title: "On craft",
    background:
      "radial-gradient(at 25% 25%, #34d399 0px, transparent 50%), radial-gradient(at 80% 72%, #22d3ee 0px, transparent 55%), linear-gradient(135deg, #022c22, #0b0d18)",
  },
  {
    eyebrow: "Journal",
    title: "Writing about the web",
    description: "Essays on interface, motion, and taste.",
    span: "col-span-2",
    background:
      "radial-gradient(at 18% 30%, #8b5cf6 0px, transparent 55%), radial-gradient(at 85% 75%, #e11d62 0px, transparent 52%), linear-gradient(135deg, #2e1065, #0b0d18)",
  },
];

/**
 * BentoGallery — an editorial media wall. Each tile is a layered CSS mesh
 * gradient (no image assets, so it stays crisp at any size and ships nothing
 * to download); the artwork zooms gently and the caption resolves on hover or
 * keyboard focus. A strong bottom scrim plus a text-shadow keep the white
 * captions legible over even the brightest tiles.
 */
export function BentoGallery({
  heading = "From the studio",
  subheading = "A living gallery of work, words, and experiments.",
  actionLabel = "View gallery",
  tiles = DEFAULT_TILES,
  className,
}: BentoGalleryProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-muted">{subheading}</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
        >
          {actionLabel}
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="mt-8 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[12rem]">
        {tiles.map((tile) => (
          <a
            key={`${tile.eyebrow}-${tile.title}`}
            href={tile.href ?? "#"}
            aria-label={`${tile.eyebrow}: ${tile.title}`}
            className={cn(
              "group relative block overflow-hidden rounded-2xl border border-border",
              tile.span,
            )}
          >
            {/* artwork */}
            <span
              aria-hidden
              className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ background: tile.background }}
            />
            {/* legibility scrim */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
            />
            {/* hover ring */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-white/25 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* corner action */}
            <span
              aria-hidden
              className="absolute right-3 top-3 grid size-8 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              <ArrowUpRight className="size-4" />
            </span>

            <div className="relative flex h-full flex-col justify-end p-5 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              <span className="text-[11px] font-medium uppercase tracking-wider text-white/80">
                {tile.eyebrow}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {tile.title}
              </h3>
              {tile.description ? (
                <p className="mt-1 max-w-sm translate-y-1 text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {tile.description}
                </p>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
