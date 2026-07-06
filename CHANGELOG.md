# Changelog

All notable changes to **ONONC** are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions are
date-stamped development batches. A rendered version lives at
[dev.ononc.com/docs/changelog](https://dev.ononc.com/docs/changelog).

## [1.15] — 2026-07-07 — Mobile hamburger menu (in review)

### Added
- **Mobile hamburger navigation** — Below the Tailwind `md` breakpoint (<768px), the header's inline category nav is now hidden and a hamburger button (aria-label="Open menu") appears on the right of the sticky header next to the theme toggle. Pressing it opens a right-side Drawer (role=dialog) listing the 4 category nav links with active-route highlighting via `aria-current="page"`. The drawer closes on navigation, Escape keypress, or backdrop click with focus restoration.
- New `src/components/showcase/mobile-menu.tsx` — a 'use client' component rendering the hamburger button (md:hidden) and reusing the library's existing Drawer primitive (src/components/ui/drawer.tsx, side="right"). Links close the drawer on click and preserve body-scroll lock during the animation.
- Updated `src/components/showcase/site-header.tsx` — now renders `<MobileMenu items={categories.map(c=>({id,label}))} />` in the header's right cluster after ThemeToggle, following the same RSC + plain-props pattern as Sidebar/MobileNav. No public API or contract changes to SiteHeader.

### Verified
- tsc 0 errors; eslint 0 errors (6 pre-existing text/* warnings only); vitest 72 files / 261 tests pass; next build exit 0 (578 static pages).
- Review gate = GO (0 Critical / 0 Major).
- QA gate = PASS (headless Chromium): mobile-only visibility, right-side slide-in animation, 4 correct nav links, navigate+close behavior, close via X/Escape/backdrop, body-scroll lock, focus trap on open/restore on close, active-route highlight, desktop no-regression, zero console errors.

### Status
- Implementation complete and verified; awaiting user Go/No-Go before commit and deployment.

## [1.14] — 2026-07-07 — Documentation section + footer refresh

### Added
- New `/docs` documentation section with a collapsible left sidebar: Getting Started, Installation, Theming, and Usage.

### Changed
- The footer's 'Contact' column is now 'Support' with a link to the docs, and the contact email moved to the footer's bottom bar.
- For AI agents, Resources, and Changelog moved under `/docs` (now `/docs/ai-agents`, `/docs/resources`, `/docs/changelog`) so they share the docs sidebar.

## [1.13] — 2026-07-06 — Friendlier design-token guidance + footer contact

### Added
- Every component detail page now shows an always-visible "Styled with ONONC's design tokens — shadcn add installs them for you" hint linking to the Design tokens guide (`/introduction#design-tokens`).
- Surfaced the contact email `ononc@ononc.com` in the footer.

### Changed
- The detail-page Code/Usage tabs and the `/blocks` Code tab link "design tokens" to the guide, and the Copy-for-AI prompt now explains that `shadcn add` writes the tokens + keyframes into your `globals.css` (with a hand-copy `/r/ononc-theme.json` fallback) — so both humans and coding agents know styling is included.
- Brought the on-site `/changelog` page back in sync with this file (the v1.11 and v1.12 entries were missing from it).

### Verified
- tsc 0; eslint 0 errors (6 pre-existing text/* warnings); vitest 72 files / 261 tests; next build exit 0. Review = GO; QA = PASS (a headless browser confirmed the tab-gated notes render with working links, and the footer mailto renders in-place on every page).

## [1.12] — 2026-07-06 — Registry ships design tokens (consumer styling fix)

### Fixed
- Components now render styled after `npx shadcn@latest add …/r/<id>.json` — previously ~231/336 components compiled but emitted zero CSS in consumer projects (tokens and keyframes were embedded only in ONONC's globals.css). Now every registry item carries ONONC's design tokens via shadcn `cssVars` (theme → @theme, light → :root, dark → .dark) and `css` (@keyframes nested in @layer base + @utility text-gradient/glass/site-shell), so `shadcn add` writes the tokens into the consumer's globals.css automatically. No manual token-copy step required.

### Added
- Standalone `/r/ononc-theme.json` (registry:theme item, 0 component files) installs ONLY the design tokens: `npx shadcn@latest add https://dev.ononc.com/r/ononc-theme.json` for projects that want to share tokens without adding a component.

### Verified
- tsc --noEmit 0 errors; eslint 0 errors (6 pre-existing text/* warnings); vitest 72 files / 261 tests pass (2 new tests in src/lib/registry-json.test.ts assert badge carries cssVars+css incl. @keyframes star-spin/spin + @utility text-gradient, and EVERY registry item has cssVars+css); next build exit 0.
- Emitted artifacts: out/r now has 337 JSON files (336 component items + ononc-theme.json).
- Real-system QA PASS: single `shadcn add badge.json` (also glitch-text, star-border) dropped component files AND injected tokens+keyframes into consumer globals.css (26→291 lines); standalone ononc-theme.json added tokens with 0 component files; consumer `next build` exited 0; compiled CSS contained REAL resolved rules (e.g. `.bg-surface{background-color:var(--surface)}`, `@keyframes star-spin`, `:root`/`.dark` token blocks) — direct proof the pre-fix "compiles but emits zero CSS" bug is fixed.
- **Caveat:** The shipped theme includes generic token names (background, foreground, border, muted, ring); installing into a project that already defines them overrides those values — reconcile/scope in your design system as needed.

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

[1.10]: https://dev.ononc.com/docs/changelog
[1.9]: https://dev.ononc.com/docs/changelog
[1.8]: https://dev.ononc.com/docs/changelog
[1.7]: https://dev.ononc.com/docs/changelog
[1.6]: https://dev.ononc.com/docs/changelog
[1.5]: https://dev.ononc.com/docs/changelog
[1.4]: https://dev.ononc.com/docs/changelog
[1.3]: https://dev.ononc.com/docs/changelog
[1.2]: https://dev.ononc.com/docs/changelog
[1.1]: https://dev.ononc.com/docs/changelog
[1.0]: https://dev.ononc.com/docs/changelog
