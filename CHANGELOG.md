# Changelog

All notable changes to **ONONC** are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions are
date-stamped development batches. A rendered version lives at
[dev.ononc.com/changelog](https://dev.ononc.com/changelog).

## [1.11] — 2026-07-06 — All non-block components now have detail pages

### Changed
- Every non-block component (backgrounds 72 + text 58 + ui 87 = 217) now gets its own `/[category]/[id]` detail page, making its full source always viewable on the Code tab.
- The **Customizable badge** is now decoupled from detail-page links: it still marks only components with live Customize controls (isCustomizable), while detail-page links exist for all non-blocks.
- Updated `src/registry/index.ts` `componentHasDetailPage()` to drop the isCustomizable gate; updated `src/app/(docs)/[category]/page.tsx` to drive the badge from isCustomizable separately; updated `src/registry/playground.test.ts` detail-scope tests to reflect the new rule.
- Blocks still have no per-block detail page (`/blocks/<id>` still returns 404); only blocks fall back to their category page.
- Sitemap now emits 227 URLs (217 non-block detail pages + /blocks category + 9 other routes).

### Verified
- tsc --noEmit 0 errors; eslint 0 errors (6 pre-existing text/* warnings); vitest 72 files / 259 tests pass; next build exit 0.
- The `/[category]/[id]` route now emits 217 detail pages; `out/blocks` has 0 detail HTML; `out/sitemap.xml` has 227 `<loc>` entries.
- llms.txt now emits per-component detail URLs for non-block components and the /blocks category URL for blocks.

## [1.10] — 2026-07-06 — 8 premium interactive components (React Bits–inspired, independent implementations)

### Added
- **Profile Card, Scroll Stack, Card Stack, Magnet, Flowing Menu, Elastic Slider, Star Border, Glare Hover** — eight premium interactive components.
- Each ships 4–6 grouped Customize controls, a Props table, a detail page, and a shadcn registry entry at `/r/<id>.json`.
- Full keyboard accessibility and `prefers-reduced-motion` support across all eight.
- Registry now totals **336 components** — Backgrounds 72 · Text 58 · Components 87 · Blocks 119.

## [1.9] — 2026-07-05 — Recommended resources board

### Added
- New **/resources** page: a curated board of 10 third-party design systems and component libraries, each with a description, tags, and outbound link.
- `BreadcrumbList` + `ItemList` JSON-LD for SEO; linked from the footer and added to the sitemap.

## [1.8] — 2026-07-05 — Strands, Liquid Chrome & Dither backgrounds

### Added
- **Strands** — a luminous bundle of threads that flow like windblown hair and part around the cursor.
- **Liquid Chrome** — a sheet of molten, mirror-bright metal that folds and drags beneath the pointer.
- **Dither** — an animated plasma resolved into crisp retro bands through an ordered Bayer matrix.
- Each with grouped Customize + Props + detail page + shadcn registry JSON; reduced-motion single-frame and off-screen pause.

## [1.7] — 2026-07-04 — Interactive showcase components

### Added
- **Circular Gallery, Rolling Gallery, Card Swap, Chroma Grid, Pixel Card.**
- Each with grouped Customize + Props + a live Usage playground; keyboard and reduced-motion aware, with rAF loops that pause off-screen.

## [1.6] — 2026-07-04 — Silk, Squares, Letter Glitch & Ballpit backgrounds

### Added
- **Silk** — flowing folds of satin catching the light as they drift.
- **Squares** — an endlessly drifting grid that lights up under the cursor.
- **Letter Glitch** — a dense grid of monospace glyphs flickering through letters and colors.
- **Ballpit** — colorful balls under gravity that collide and scatter away from the cursor.

## [1.5] — 2026-07-04 — Ferrofluid background

### Added
- **Ferrofluid** — a magnetic liquid-metal blob with metaball spikes that reaches a tendril toward the cursor.
- 15 grouped Customize controls (Form, Motion, Magnet, Appearance) plus a Props table and detail page.

## [1.4] — 2026-07-04 — AI coding agents support (Phase 2)

### Added
- shadcn-compatible static registry: `/r/<id>.json` for every component, bundling full source plus every internal file it imports.
- One-command install — `npx shadcn@latest add https://dev.ononc.com/r/<id>.json` — verified against the real shadcn CLI.
- Per-component “Copy for AI” button, plus `robots.txt` and `sitemap.xml`.

## [1.3] — 2026-07-04 — AI coding agents support (Phase 1)

### Added
- Machine-readable `/llms.txt` and `/llms-full.txt` indexes generated at build time.
- New **/ai-agents** docs page explaining why ONONC suits coding agents.
- Site configuration (`SITE_URL`, `absoluteUrl`) and 404-safe component URLs.

## [1.2] — 2026-07-01 — Component detail playground

### Added
- New `/[category]/[id]` detail routes with Preview/Code tabs, viewport presets, a draggable/keyboard-resizable handle, a live Customize panel, and a Props table.
- Blocks are listed inline (no detail page) with a shared ViewportToggle next to their Preview/Code tabs.

## [1.1] — 2026-06-30 — 12 new components

### Added
- **Backgrounds:** Ripple, Matrix Rain.
- **Text:** Flip Text, Gradient Underline.
- **Components:** Combobox, Pagination, Toggle Group, Tag Input, File Dropzone, Progress Bar.
- **Blocks:** Banner, Team Grid — all with full ARIA and reduced-motion support.

## [1.0] — 2026-06-30 — Release candidate

### Added
- First stable showcase: dark-first design tokens and motion-first components across Backgrounds, Text, Components, and Blocks.

### Fixed
- Command-palette focus restoration, reduced-motion JS gaps, modal/drawer effect stability, tooltip Escape handling, progress-ring ARIA, showcase tabs ARIA, and segmented-control index-based IDs.

[1.10]: https://dev.ononc.com/changelog
[1.9]: https://dev.ononc.com/changelog
[1.8]: https://dev.ononc.com/changelog
[1.7]: https://dev.ononc.com/changelog
[1.6]: https://dev.ononc.com/changelog
[1.5]: https://dev.ononc.com/changelog
[1.4]: https://dev.ononc.com/changelog
[1.3]: https://dev.ononc.com/changelog
[1.2]: https://dev.ononc.com/changelog
[1.1]: https://dev.ononc.com/changelog
[1.0]: https://dev.ononc.com/changelog
