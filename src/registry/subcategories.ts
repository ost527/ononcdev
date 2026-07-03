import type { Category, CategoryId, RegistryItem } from "@/registry/types";

/**
 * A second navigation level: each top-level Category is partitioned into
 * ordered, titled sub-groups for display. Membership is declared here (not on
 * the registry items) and resolved against each item's `sourcePath` slug, so
 * this layer never has to edit the 200+ registry entries and new components
 * fall into a trailing "More" group automatically.
 */
export interface SubGroup {
  /** Slug, unique within its category — used as the section anchor id. */
  id: string;
  label: string;
  items: RegistryItem[];
}

interface SubGroupDef {
  id: string;
  label: string;
  /** Exact component slugs (the `sourcePath` filename, no extension). */
  slugs?: readonly string[];
  /** Slug families: matches `slug === p` or `slug.startsWith(p + "-")`. */
  prefixes?: readonly string[];
}

/** Label of the trailing catch-all group for items no def claims. */
const FALLBACK_LABEL = "More";

/** Component slug = its source filename without extension (stable + unique). */
function slugOf(item: RegistryItem): string {
  const file = item.sourcePath.split("/").pop() ?? "";
  return file.replace(/\.[jt]sx?$/, "");
}

function defMatches(slug: string, def: SubGroupDef): boolean {
  if (def.slugs?.includes(slug)) return true;
  if (def.prefixes?.some((p) => slug === p || slug.startsWith(`${p}-`))) {
    return true;
  }
  return false;
}

/**
 * Declarative sub-group definitions per category, in display order.
 * - backgrounds / text / ui: curated slug lists (stable set).
 * - blocks: id-prefix families (so any new `hero-*`, `navbar-*`, … auto-group),
 *   plus a curated list of standalone page sections.
 */
const DEFS: Record<CategoryId, readonly SubGroupDef[]> = {
  backgrounds: [
    {
      id: "particles",
      label: "Particles & stars",
      slugs: [
        "particle-field", "starfield", "warp-stars", "sparkles", "fireflies",
        "bokeh", "embers", "snowfall", "confetti", "comets", "fireworks",
        "ink-drops", "spiral-galaxy", "orbiting-dots", "plexus", "boids",
        "metaballs", "bubbles", "dot-matrix",
      ],
    },
    {
      id: "gradients",
      label: "Gradients & aurora",
      slugs: [
        "aurora-background", "aurora-ribbons", "aurora-curtains", "gradient-mesh",
        "plasma", "mesh-wave", "perlin-clouds", "smoke", "liquid-blob",
        "god-rays", "light-beams", "caustics", "meteors",
      ],
    },
    {
      id: "geometry",
      label: "Grids & geometry",
      slugs: [
        "grid-beams", "flow-grid", "hex-grid", "topographic-lines", "halftone",
        "scanlines", "triangles", "voronoi-fill", "cells", "kaleidoscope",
        "pinwheel", "spotlight-cursor",
      ],
    },
    {
      id: "fields",
      label: "Fields & flow",
      slugs: [
        "flow-field", "flowing-lines", "magnetic-field", "vortex", "tron-trails",
        "neon-tunnel", "dna-helix",
      ],
    },
    {
      id: "waves",
      label: "Waves & pulses",
      slugs: [
        "waves", "wave-interference", "pulse-rings", "oscilloscope",
        "equalizer", "radar-sweep",
      ],
    },
    {
      id: "weather",
      label: "Weather & code",
      slugs: ["rain", "lightning", "matrix-rain", "data-stream", "cloth-flag"],
    },
  ],
  text: [
    {
      id: "styled",
      label: "Gradient & styled",
      slugs: [
        "gradient-text", "shiny-text", "gradient-underline", "underline-draw",
        "highlight-text", "glitch-text", "wavy-text", "neon-text",
        "holographic-text", "shadow-text", "breathing-text", "ghost-text",
        "glow-pulse-text", "ticker-text", "striped-text", "twinkle-text",
        "pulse-wave-text", "color-cycle-text", "flicker-in-text",
      ],
    },
    {
      id: "reveal",
      label: "Reveal on view",
      slugs: [
        "split-reveal", "blur-in-text", "flip-text", "letters-pull-up",
        "text-reveal", "line-reveal", "tracking-in", "scroll-reveal",
        "decrypt-text", "staggered-fade", "rising-text", "kinetic-reveal",
        "clip-draw-text", "revolve-text", "gravity-text", "zoom-blur-text",
        "warp-in-text", "expand-text", "dual-tone-text",
      ],
    },
    {
      id: "loop",
      label: "Looping & typing",
      slugs: [
        "typewriter", "rotating-text", "scramble-text", "focus-text",
        "fire-text", "morphing-text", "split-flap", "swap-cascade",
        "digi-clock-text",
      ],
    },
    {
      id: "numbers",
      label: "Numbers",
      slugs: ["count-up", "number-ticker"],
    },
    {
      id: "pointer",
      label: "Pointer-reactive",
      slugs: [
        "text-pressure", "scatter-text", "perspective-text",
        "elastic-text", "ripple-text", "shake-text", "shatter-text",
        "magnetic-text", "split-color-text",
      ],
    },
  ],
  ui: [
    {
      id: "buttons",
      label: "Buttons & actions",
      slugs: [
        "magnetic-button", "shimmer-button", "ripple-button", "toggle-group",
      ],
    },
    {
      id: "cards",
      label: "Cards & surfaces",
      slugs: ["card", "tilt-card", "spotlight-card", "hover-card", "stat-card"],
    },
    {
      id: "interactive",
      label: "Interactive showcase",
      slugs: [
        "chroma-card", "device-mockup", "infinite-gallery", "smooth-cursor",
        "preloader", "globe", "swipe-cards",
      ],
    },
    {
      id: "inputs",
      label: "Inputs & forms",
      slugs: [
        "switch", "checkbox", "radio-group", "select", "multi-select",
        "combobox", "slider", "otp-input", "number-input", "textarea",
        "tag-input", "file-dropzone", "rating", "color-picker", "date-picker",
        "time-picker", "calendar",
      ],
    },
    {
      id: "navigation",
      label: "Navigation",
      slugs: [
        "tabs", "breadcrumbs", "pagination", "segmented-control", "dock",
        "command-palette", "dropdown-menu", "menubar", "toolbar", "stepper",
      ],
    },
    {
      id: "overlays",
      label: "Overlays",
      slugs: ["modal", "drawer", "popover", "tooltip", "context-menu"],
    },
    {
      id: "data",
      label: "Data display",
      slugs: [
        "data-table", "tree-view", "avatar", "avatar-stack", "badge", "kbd",
        "marquee", "carousel", "image-compare", "separator",
      ],
    },
    {
      id: "feedback",
      label: "Feedback & progress",
      slugs: [
        "toast", "spinner", "skeleton", "alert", "progress-ring", "progress-bar",
        "scroll-progress", "empty-state",
      ],
    },
    {
      id: "layout",
      label: "Layout & disclosure",
      slugs: ["accordion", "collapsible", "resizable", "scroll-area"],
    },
  ],
  blocks: [
    { id: "heroes", label: "Heroes", prefixes: ["hero"] },
    { id: "navbars", label: "Navigation bars", prefixes: ["navbar"] },
    { id: "features", label: "Feature sections", prefixes: ["feature"] },
    { id: "bento", label: "Bento grids", prefixes: ["bento"] },
    { id: "pricing", label: "Pricing", prefixes: ["pricing"] },
    { id: "steps", label: "Steps & flows", prefixes: ["steps"] },
    {
      id: "sections",
      label: "Page sections",
      slugs: [
        "logo-cloud", "stats-band", "testimonials", "faq-block",
        "newsletter-block", "comparison-table", "timeline", "banner-block",
        "team-grid", "cta-section", "footer-block",
      ],
    },
  ],
};

/**
 * Partition a category's items into ordered sub-groups. Each item is placed in
 * the FIRST def (in declared order) that claims its slug; anything unclaimed
 * collects into a trailing "More" group so every item always renders. Empty
 * groups are dropped. Item order within a group follows the registry order.
 */
export function groupItems(category: Category): SubGroup[] {
  const defs = DEFS[category.id] ?? [];
  const buckets = defs.map((def) => ({ def, items: [] as RegistryItem[] }));
  const more: RegistryItem[] = [];

  for (const item of category.items) {
    const slug = slugOf(item);
    const bucket = buckets.find((b) => defMatches(slug, b.def));
    if (bucket) bucket.items.push(item);
    else more.push(item);
  }

  const groups: SubGroup[] = buckets
    .filter((b) => b.items.length > 0)
    .map((b) => ({ id: b.def.id, label: b.def.label, items: b.items }));

  if (more.length > 0) {
    groups.push({ id: "more", label: FALLBACK_LABEL, items: more });
  }
  return groups;
}
