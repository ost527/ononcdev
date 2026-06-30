# ONONC

An original, motion-first React component library for Next.js 16. Built from scratch with dark-first design tokens, performant canvas animations, and screen-reader friendly interactions.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion · Lucide React

---

## Quick Start

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Static build
npm run start        # Preview production build
npm run lint         # Run eslint
npm test             # Run vitest suite
```

The showcase site is fully static and renders at build time. No backend, no API routes, no dynamic data. Each component source is read at build time via `src/lib/source.ts` and embedded in the Code tab.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Design tokens (@theme), keyframes, utilities, light/dark variants
│   ├── layout.tsx               # Root layout: ScrollProgress + SiteHeader + {children} + FooterBlock + Toaster
│   ├── page.tsx                 # Landing: ShowcaseHero + category browse cards
│   └── [category]/
│       ├── layout.tsx           # Sidebar + content split for all category routes
│       ├── page.tsx             # Per-category view: renders ONLY that category's components
│       └── [id]/
│           └── page.tsx         # Per-component detail page with interactive playground (static export, dynamicParams=false)
├── components/
│   ├── backgrounds/             # ~32 ambient, animated canvases
│   ├── text/                    # ~23 typographic animation effects
│   ├── ui/                      # ~77 interactive components
│   ├── blocks/                  # ~119 composed section blocks (some are subcategories within blocks)
│   └── showcase/                # Showcase UI
│       ├── site-header.tsx      # Sticky header: brand link (/), category nav links (/<category>), theme toggle
│       ├── sidebar.tsx          # Sidebar (desktop rail) + MobileNav (mobile pills); fed plain {id,label,count}[] props
│       ├── showcase-hero.tsx    # Landing hero with CTAs linking to /backgrounds and /blocks
│       ├── code-block.tsx       # Syntax-highlighted code with copy button
│       ├── component-showcase.tsx  # Preview + Code tabs for category pages (grid cards)
│       ├── component-playground.tsx  # Detail page: tabs, viewport controls, resize handle, customize panel, props table
│       ├── playground-controls.tsx   # Customize controls using library primitives (Slider, Switch, SegmentedControl, etc.)
│       ├── theme-toggle.tsx     # Dark/light theme switcher
│       └── other showcase support files
├── lib/
│   ├── utils.ts                 # cn, clamp, mapRange, seededRandom, prefersReducedMotion
│   ├── use-canvas.ts            # Reusable canvas rAF hook
│   ├── use-hydrated.ts          # useSyncExternalStore mount guard for Next.js 16
│   └── source.ts                # Build-time fs reader for component sources
└── registry/
    ├── types.ts                 # Component registry types + PlaygroundSpec, Control, PropDoc types
    ├── backgrounds.tsx          # Backgrounds registry (~32 items)
    ├── text.tsx                 # Text registry (~23 items)
    ├── ui.tsx                   # UI registry (~77 items)
    ├── blocks.tsx               # Blocks registry (~119 items, some subcategories)
    ├── playground.tsx           # Per-component playgrounds: customize controls + render function + props (client module)
    ├── subcategories.ts         # Optional sub-category grouping within blocks (e.g., Features, Stats, Forms)
    └── index.ts                 # Central registry export: categories[], componentCount, allComponentParams(), findComponent()
```

**Architecture:** The showcase is a docs-style site with a shared chrome (header/footer/scroll-progress/toaster) in the root layout:
- **Landing** (/) — Category cards with browse CTAs
- **Per-category routes** (/backgrounds, /text, /ui, /blocks) — Sidebar + grid of component cards
  - **UI/Text/Backgrounds (cards):** Linked title + summary direct to detail pages
  - **Blocks (full-width list):** Plain title + summary (no link), inline Preview/Code tabs with ViewportToggle for responsive preview
- **Component detail routes** (/[category]/[id]) — Static-generated for backgrounds/text/ui components only; blocks have no detail pages. Each detail page is a playground with Preview/Code tabs, viewport presets (Desktop/Tablet/Mobile), responsive resize handle, optional live Customize panel, and Props table
- **Navigation** — Left Sidebar (desktop) + MobileNav pills (mobile); fed as plain {id,label,count}[] props from registry to keep preview tree server-side
- **Copy-Paste Integration** — Component sources embedded at build time; Code tab includes copy-to-clipboard

---

## Components

The showcase renders over 250 component detail pages (via static export), covering components across four categories computed by `src/registry/index.ts`. The component count is derived at build time from the registry and embedded in the landing page.

### Backgrounds (15)
Ambient, GPU-friendly canvases that pause when off-screen or motion is reduced.

- **Aurora** — Soft gradient halos drifting like northern lights (CSS)
- **Gradient Mesh** — Panning multi-point color mesh with fine grain (CSS)
- **Particle Field** — Drifting particles linking to neighbors and cursor (canvas)
- **Dot Matrix** — Grid of dots swelling near the pointer (canvas)
- **Flow Grid** — Tilted perspective grid scrolling toward the horizon (CSS 3D)
- **Light Beams** — Vertical shafts of light breathing independently (CSS)
- **Pulse Rings** — Concentric rings expanding like sonar (CSS)
- **Starfield** — Twinkling stars drifting with subtle cursor parallax (canvas)
- **Waves** — Layered sine waves scrolling across the lower edge (canvas)
- **Meteors** — Glowing meteors streaking diagonally on staggered timers (CSS)
- **Plasma** — Vivid blurred color fields panning while hue rotates (CSS)
- **Flowing Lines** — Silk-like lines waving with layered motion and cursor pull (canvas)
- **Spotlight Cursor** — A hidden dot grid revealed only inside a cursor spotlight (pointer)
- **Ripple** — Click anywhere to emit an expanding concentric ring (pointer)
- **Matrix Rain** — Columns of glyphs falling with glowing fading trails (canvas)

### Text Animations (23)
Typographic effects that remain screen-reader friendly.

- **Gradient Text** — Living gradient panning across letters (CSS)
- **Shiny Text** — Glare sweeping across muted text on loop (CSS)
- **Split Reveal** — Words sliding up from behind a mask, staggered on view (motion)
- **Blur In** — Words resolve from a soft blur as they fade in (motion)
- **Typewriter** — Typing and deleting through rotating phrases (loop)
- **Rotating Text** — Swaps through words in a vertical slot (motion)
- **Scramble Text** — Glyphs flickering and locking into the final string (hover/view)
- **Glitch Text** — Two color channels jitter and clip for a CRT glitch (CSS)
- **Wavy Text** — Each letter rides a continuous sine wave (CSS)
- **Highlight Text** — A marker stroke sweeps in behind text on view (motion)
- **Count Up** — Number easing to target on first view (motion)
- **Number Ticker** — Odometer digits rolling to target on view (motion)
- **Scroll Reveal** — Words light up one by one as the line scrolls through view (motion)
- **Flip Text** — Each character flips up into place on view (motion 3D)
- **Gradient Underline** — A gradient underline that grows in on hover and focus (CSS link)
- **Letters Pull-Up** — Each letter springs up and fades in, staggered, on view (motion)
- **Text Reveal** — A clip-path mask wipes the text into view (motion)
- **Decrypt Text** — Characters resolve out of random glyphs in scattered order (motion)
- **Line Reveal** — Each line slides up from behind a mask, in sequence (motion)
- **Tracking In** — Letter-spacing expands out of a blur as the text fades in (motion)
- **Focus Text** — Focus rolls across the words, blurring all but the active one (loop)
- **Text Pressure** — Letters swell and thicken toward the cursor (pointer)
- **Underline Draw** — A hand-drawn gradient underline draws in beneath the text (motion)

### Components (63)
Interactive building blocks with pointer reactivity, keyboard support, and reduced-motion awareness.

- **Magnetic Button** — Springs toward cursor, snaps back on leave (motion)
- **Shimmer Button** — Band of light orbiting the border (CSS)
- **Ripple Button** — Emits a ripple from the exact press point (pointer)
- **Tilt Card** — 3D tilt toward pointer with tracking glare (motion 3D)
- **Spotlight Card** — Radial glow following cursor surface (pointer)
- **Dock** — macOS-style icons magnifying by proximity (motion)
- **Marquee** — Seamless infinite scroller, pausing on hover (CSS loop)
- **Carousel** — Looping slides with arrows, dots, arrow-key support (a11y)
- **Accordion** — Accessible disclosure list with smooth height transitions (a11y)
- **Tabs** — Accessible tablist with sliding underline indicator (a11y)
- **Tooltip** — Shows on hover and keyboard focus, linked via aria (a11y)
- **Switch** — Accessible toggle with a spring thumb (a11y)
- **Segmented Control** — Single-select with a pill that slides to the choice (a11y)
- **Modal** — Portaled dialog with focus management and Escape to close (a11y)
- **Toast** — Imperative toasts via a tiny store and a Toaster (aria-live)
- **Command Palette** — ⌘K launcher with live filtering and full keyboard nav (a11y)
- **Dropdown Menu** — Menu button with roving focus, Escape, and outside-click (a11y)
- **Popover** — Floating panel of arbitrary content with focus return (a11y)
- **Drawer** — Slide-in side panel with focus management and Escape (a11y)
- **OTP Input** — Segmented code entry with auto-advance and paste (form)
- **Slider** — Range input with pointer drag and keyboard control (a11y)
- **Rating** — Star rating with hover preview and arrow-key adjust (a11y)
- **Stepper** — Multi-step progress with completed and active states (progress)
- **Progress Ring** — Radial dial that eases to its value on view (motion)
- **Scroll Progress** — Gradient bar tied to scroll position (motion)
- **Image Compare** — Before/after wipe with draggable, keyboardable handle (pointer)
- **Avatar Stack** — Overlapping avatars with an overflow +N chip (layout)
- **Breadcrumbs** — Accessible trail with chevrons and aria-current (a11y)
- **Skeleton** — Shimmering placeholders for loading states (loading)
- **Combobox** — Searchable select with full keyboard nav and ARIA combobox role (a11y)
- **Pagination** — Page navigator with ellipsis, aria-current, and boundary guards (a11y)
- **Toggle Group** — Single or multi-select button group with aria-pressed (a11y)
- **Tag Input** — Free-form tag entry: Enter/comma to add, Backspace/× to remove (form)
- **File Dropzone** — Drag-and-drop file picker; front-end only, no uploads (form)
- **Progress Bar** — Horizontal fill bar with role=progressbar, eases on view (motion)
- **Checkbox** — Tri-state checkbox with an indeterminate option and labels (a11y, form)
- **Radio Group** — Single-select with roving focus and arrow-key navigation (a11y, form)
- **Select** — Listbox-style picker with type-ahead and full keyboard nav (a11y)
- **Number Input** — Numeric stepper with clamp, step, and keyboard control (a11y, form)
- **Textarea** — Auto-resizing multiline field with an optional character counter (form)
- **Badge** — Compact status label in solid, soft, and outline variants (display)
- **Alert** — Semantic callouts for info, success, warning, and errors (feedback, a11y)
- **Spinner** — Accessible loading indicator in three sizes (feedback)
- **Hover Card** — Rich preview revealed on hover or keyboard focus, with delay (overlay)
- **Context Menu** — Right-click menu at the pointer with keyboard navigation (a11y, portal)
- **Date Picker** — Calendar popover with WAI-ARIA grid keyboard navigation (a11y)
- **Stat Card** — KPI tile with a trend delta and an animated sparkline (display, motion)
- **Resizable** — Split panels with a draggable, keyboard-resizable divider (pointer, a11y)
- **Tree View** — Expandable hierarchy with roving focus and arrow-key navigation (a11y)
- **Toolbar** — Grouped controls with roving focus and aria-pressed toggles (a11y)
- **Menubar** — Application menu bar with arrow-key navigation between menus (a11y)
- **Data Table** — Sortable columns with aria-sort and optional row selection (a11y, data)
- **Color Picker** — HSV picker with a saturation area, hue slider, hex input, and swatches (form, pointer)
- **Calendar** — Inline month grid for single or range selection (a11y, keyboard)
- **Kbd** — Keyboard key caps for documenting shortcuts (display)
- **Card** — Composable content surface with header, content, and footer (layout, display)
- **Avatar** — User image with initials fallback and an optional status dot (display)
- **Separator** — Thin divider, horizontal or vertical, with an optional label (layout)
- **Collapsible** — A single show/hide disclosure with an animated height (a11y, disclosure)
- **Scroll Area** — A bounded scroll container with a custom, themed scrollbar (pointer, layout)
- **Empty State** — A centered placeholder for empty content with an action (display, feedback)
- **Multi-Select** — Searchable multi-select with removable chips and keyboard navigation (a11y, form)
- **Time Picker** — Pick an hour, minute, and AM/PM with spinbutton segments (a11y, form)

### Section Blocks (17)
Composed, drop-in page sections built from the primitives above.

- **Navbar** — Responsive navigation that collapses to a mobile menu (composed)
- **Hero** — Animated marketing hero over aurora field (motion)
- **Logo Cloud** — A quiet marquee of customer wordmarks (loop)
- **Bento Grid** — Editorial asymmetric grid of spotlight feature cards (layout)
- **Feature Grid** — Titled three-column grid of capabilities (layout)
- **Feature Cards** — Elevated capability cards with a gradient hover ring and staggered scroll reveal (motion)
- **Feature Spotlight** — Alternating rows pairing copy and a checklist with branded mock visuals (motion)
- **Feature Tabs** — Interactive tabbed tour with autoplay, a progress indicator, and full keyboard navigation (a11y)
- **Feature Sticky Split** — A sticky intro and CTA beside a scroll-revealed feature list (layout)
- **Feature Highlights** — Understated hairline-divider grid of capabilities; server-safe, pure-CSS hover (layout)
- **Feature Media Cards** — Feature cards each topped with a branded mock visual and a staggered reveal (motion)
- **Feature Carousel** — Accessible scroll-snap pager of feature cards with bound-aware prev/next controls (a11y)
- **Feature Marquee** — Two opposing rows of capability pills that loop and pause on hover (loop)
- **Feature Accordion** — Icon-led disclosure accordion that expands one capability at a time, inline (a11y)
- **Feature Panels** — Interactive panels that expand on hover, focus, or tap to reveal each feature (a11y)
- **Feature Checklist** — Server-safe "everything included" section of grouped checkmark columns (layout)
- **Steps** — Numbered how-it-works sequence with a connector line (layout)
- **Stats Band** — Headline metrics counting up on view (motion)
- **Pricing** — Three comparable tiers with highlighted plan (layout)
- **Testimonials** — Opposing marquee rows of quote cards (loop)
- **FAQ** — Frequently-asked questions built on the Accordion (a11y)
- **Newsletter** — Subscribe form with validation (front-end only) (form)
- **Comparison Table** — Feature matrix comparing plans with a highlighted column (layout)
- **Timeline** — A vertical rail-and-node timeline of milestones (layout)
- **CTA Section** — Closing call-to-action over animated mesh (motion)
- **Footer** — Four-region footer with brand, links, and socials (layout)
- **Banner** — Dismissible announcement bar with gradient wash and CTA (composed)
- **Team Grid** — Responsive grid of team member cards with avatar and role (layout)

---

## Key Features

### Copy-Paste Code Snippets
Every component's real source is embedded in the showcase at build time via `src/lib/source.ts`. The Code tab uses Prism React Renderer to highlight syntax and includes a Copy button for easy paste into your own projects.

- **Source Read at Build Time** — `src/lib/source.ts` (async fs operation) reads each component file and stores source code in the registry
- **Code Block Component** — `src/components/showcase/code-block.tsx` renders highlighted code with Prism and handles copy-to-clipboard
- **Component Showcase** — `src/components/showcase/component-showcase.tsx` provides side-by-side Preview and Code tabs
- **Page.tsx** — Async server component that orchestrates registry read and passes sources to showcase

### Component Detail Playground
Each component has a dedicated detail page (/[category]/[id]) with an interactive playground — explore variants, customize props live, and preview changes in real-time.

- **Static Generation** — Backgrounds/text/ui components (all non-block components) pre-rendered at build time via `generateStaticParams()` (157 total static routes: home + _not-found + 4 category pages + all backgrounds/text/ui detail pages); `dynamicParams=false` prevents stale 404s. Blocks have no detail pages; /blocks/<id> returns 404
- **Playground Interface** — Per-component page (`src/components/showcase/component-playground.tsx`) with:
  - **Preview / Code tabs** — Switch between live component and syntax-highlighted source (roving-tabindex, WAI-ARIA Tabs pattern)
  - **Viewport presets** — Desktop (full width), Tablet (768px), Mobile (390px); buttons toggle viewport context
  - **Refresh Preview button** — Remounts the preview to replay reveal animations and re-seed canvas backgrounds
  - **Draggable resize handle** — `role=separator`; drag or use Arrow/Home/End keys to resize; clamps to [280px, container width]; centered symmetric resize
  - **Customize panel** — Live controls to modify component props (only for components with specs; graceful "no live options" message otherwise)
  - **Props table** — API documentation for the component (only for components with specs; "props coming soon" message otherwise)
- **Customize Controls** — Built with ONONC's own components (Slider, Switch, SegmentedControl, Select, NumberInput, ColorPicker) to showcase interactive patterns
- **Playground Specs** — Per-component specs live in `src/registry/playground.tsx` (client module), keyed by registry id. Types: `Control`, `PropDoc`, `PlaygroundSpec` in `src/registry/types.ts`; helpers: `allComponentParams()`, `findComponent()` in `src/registry/index.ts`
- **Coverage** — ~22 components across all 4 categories have full Customize + Props specs (badge, alert, spinner, switch, slider, progress-ring, progress-bar, rating, avatar, separator, segmented-control, stat-card, kbd, number-input, gradient-text, shiny-text, typewriter, count-up, particle-field, dot-matrix, starfield, aurora-background); expanding specs to remaining components is the planned next step

### Light & Dark Theme
Color tokens are dual-mode. The showcase defaults to dark theme with a header toggle for user preference (stored in localStorage).

- **CSS Custom Properties** — `src/app/globals.css` defines `:root` (light tokens) and `.dark` (dark tokens) via CSS variable sets
- **Class-Based Switching** — `src/app/layout.tsx` sets `className="dark"` by default and provides a no-flash inline script to prevent theme flicker on hard reload
- **Theme Toggle** — `src/components/showcase/theme-toggle.tsx` reads localStorage and triggers class swap
- **All Colors Adapt** — Background, surface, foreground, muted, border, and brand spectrum all have light/dark variants

### Test Suite
Vitest is configured for unit tests of helpers and component smoke tests. Run with `npm test`.

- **Config** — `vitest.config.ts` with jsdom environment and React import detection
- **Setup** — `vitest.setup.ts` for test utilities and global mocks (e.g., IntersectionObserver)
- **Coverage** — 44 test files, 109 tests passing:
  - `src/lib/utils.test.ts` — helpers (cn, clamp, mapRange, seededRandom, prefersReducedMotion)
  - `src/registry/registry.test.ts` — registry structure validation (asserts all entries and every sourcePath file exists)
  - `src/registry/playground.test.ts` — playground specs validation
  - `src/components/showcase/component-playground.test.tsx` — playground interface tests
  - `src/components/ui/{switch,accordion,breadcrumbs,carousel,combobox,pagination,toggle-group,tag-input,file-dropzone,progress-bar}.test.ts` — a11y smoke tests for interactive components

---

## Design System

### Color Tokens (Dark-first)
Defined in `src/app/globals.css` as CSS custom properties and exported to Tailwind v4 via `@theme`:

- **Background** — `#06070d` (deepest surface)
- **Surface** — `#0b0d18` (content layer)
- **Foreground** — `#e9ebf5` (text)
- **Muted** — `#8a91a8`, `#5b6178` (secondary text)
- **Border** — `rgba(255,255,255,0.08)` and `0.14` (structure)
- **Brand Spectrum** — Violet (#8b5cf6) → Indigo (#22d3ee) → Rose (#fb7185)

### Utilities & Keyframes
- `text-gradient` — Expressive multi-color gradient fill
- `glass` — Frosted-glass effect with backdrop blur
- Custom animation keyframes: `marquee`, `aurora`, `grid-pan`, `shimmer`, `pulse-ring`, `ring`, `blink`, etc.
- Font stack: Geist (with fallbacks)
- Border radius: `2rem` (4xl)

### Accessibility & Performance
- **Reduced Motion Guard** — All animations collapse to 0.001ms under `prefers-reduced-motion: reduce`
- **Canvas Components** — Pause off-screen via IntersectionObserver and on tab-hidden via visibilitychange
- **DPR Capping** — Canvas rendering respects device pixel ratio (capped at 2 for performance)
- **Keyboard Support** — All interactive components (combobox, pagination, toggle-group, tag-input, carousel, dock) fully keyboard-navigable
- **Screen Reader Safe** — Text animations preserve semantic HTML and aria labels; interactive controls carry full ARIA roles and properties

---

## Key Helpers

### `src/lib/utils.ts`
- `cn()` — Tailwind class merging (via clsx + tailwind-merge)
- `clamp(val, min, max)` — Numeric bounds
- `mapRange(val, inMin, inMax, outMin, outMax)` — Linear interpolation
- `seededRandom(seed)` — Deterministic random for reproducible animations
- `prefersReducedMotion()` — Detects prefers-reduced-motion setting

### `src/lib/use-canvas.ts`
Reusable React hook for canvas-based components:
- Automatic ResizeObserver for responsive scaling
- IntersectionObserver to pause off-screen
- Visibilitychange listener for tab-hidden pause
- Device pixel ratio support (capped at 2)
- Optional pointer tracking (mouse/touch)
- Respects prefers-reduced-motion (renders single frame)

---

## Development Notes

### Building a New Component
1. Place component in `src/components/{category}/your-component.tsx`
2. Export as a named React component (client or server safe)
3. Add registry entry in `src/registry/{category}.tsx`
4. Ensure reduced-motion support and off-screen pause (for canvas)
5. Test in showcase before deploying

### Animations & Motion
- Prefer CSS keyframes for ambient effects (aurora, grid-pan, ring)
- Use Framer Motion for interactive, pointer-driven effects
- Canvas animations: use `useCanvas` hook for lifecycle management
- All motion degrades gracefully under `prefers-reduced-motion: reduce`

### Canvas Performance
- Canvas components automatically pause when off-screen (IntersectionObserver)
- Also pause when browser tab is hidden (visibilitychange)
- DPR capped at 2x for battery/memory efficiency
- Optional pointer tracking (disabled by default for lower cost)

### Dark-First Design
- All color tokens are dark-first; light theme is not implemented
- Future extension: add light-mode CSS variable overrides to globals.css
- Brand spectrum is intentionally distinct from third-party kits

---

## Verification Status

✅ **Type Safety** — `npx tsc --noEmit` = 0 errors  
✅ **Build** — `npm run build` succeeds (static prerender of / + 4 category SSG routes + all backgrounds/text/ui detail pages + /_not-found; 157 total routes)  
✅ **Lint** — `npm run lint` = 0 (eslint flat config)  
✅ **Runtime** — `next start` returns HTTP 200 for /, /backgrounds, /text, /ui, /blocks, and component detail routes; 404 for unknown categories; no hydration errors; all components present; category scoping confirmed  
✅ **Tests** — `npm test` = 44 files, 107 tests passed (registry test validates all entries + sourcePath existence; playground specs validated; component-playground interface tested)

---

## Recently Resolved (v1.0 Release Candidate)

All critical and minor issues resolved as of 2026-06-30:
- ✅ **M1: Command Palette focus restoration** — `lastFocused` ref captures trigger element on open; restored in effect cleanup
- ✅ **m1: Reduced Motion JS gap** — `rotating-text.tsx` now skips interval; `scroll-reveal.tsx` uses `useReducedMotion()` to keep words fully visible under reduced-motion preference
- ✅ **m2: Modal/Drawer effect stability** — `onClose` stored in ref with its own update effect; `[open]` effect depends only on `[open]` to prevent spurious re-runs
- ✅ **m3: Tooltip Escape handler** — Tooltip now closes on Escape keydown
- ✅ **m4: Progress Ring ARIA** — Added `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- ✅ **m5: Component Showcase tabs ARIA** — Tabs now have complete ARIA: `role=tablist/tab`, `tabpanel` with `id`/`aria-controls`/`aria-labelledby`
- ✅ **m6: Segmented Control index-based IDs** — Uses index-based element IDs (`${baseId}-${i}`) so labels with spaces work correctly

### v1.2 Batch (2026-07-01) — Component Detail Playground Feature
- ✅ **Component detail playground** — New `/[category]/[id]` route with static generation of all backgrounds/text/ui components (157 total routes: home + _not-found + 4 category SSG routes + non-blocks detail pages); features Preview/Code tabs, viewport presets (Desktop/Tablet/Mobile), refresh button, draggable/keyboard-accessible resize handle, optional Customize panel, and Props table
- ✅ **Blocks have no detail pages** — /blocks category page lists blocks inline only (title/summary, no detail page link; /blocks/<id> returns 404). Enforced by `hasDetailPage(categoryId)` in registry; detail route's `generateStaticParams()` uses `detailPageParams()` which filters out blocks
- ✅ **Inline ViewportToggle for blocks** — Each block on /blocks shows a shared ViewportToggle (new src/components/showcase/viewport-toggle.tsx; Desktop=full / Tablet=768px / Mobile=390px) next to its Preview/Code tabs
- ✅ **Customize controls** — dogfood library components (Slider, Switch, SegmentedControl, Select, NumberInput, ColorPicker) to showcase interactive patterns
- ✅ **Playground specs** — Per-component specs in `src/registry/playground.tsx` (client module); ~22 components have full Customize + Props coverage; graceful fallback for components without specs
- ✅ **Grid card updates** — UI/text/backgrounds grid cards show title + summary linking to detail page only; blocks render plain title/summary (no link) with inline Preview/Code tabs + ViewportToggle
- ✅ **SegmentedControl a11y** — Now accepts optional `aria-label` / `aria-labelledby` props (backward compatible)
- ✅ **New tests** — `src/registry/playground.test.ts` and `src/components/showcase/component-playground.test.tsx`; suite now 44 files, 109 tests

### v1.1 Batch (2026-06-30) — 12 new components
- ✅ **Ripple background** — Click-to-emit ring via CSS `ring` keyframe; `onAnimationEnd` cleanup leak-free under reduced motion
- ✅ **Matrix Rain background** — `useCanvas`-driven; bounded glyph strings; no per-frame allocation leak; dt clamped
- ✅ **Flip Text** — Per-character 3D rotateX reveal on view; `aria-label` + `aria-hidden` chars
- ✅ **Gradient Underline** — RSC-safe `<a>` wrapper; gradient underline grows on hover and `focus-visible`
- ✅ **Combobox** — Full `role=combobox/listbox`; `aria-expanded`, `aria-controls`, `aria-activedescendant`; Arrow/Enter/Escape; outside-click cleanup
- ✅ **Pagination** — Ellipsis math correct for all page counts; `aria-current`; Prev/Next disabled at bounds
- ✅ **Toggle Group** — `role=group` + `aria-pressed`; single and multiple selection modes
- ✅ **Tag Input** — Enter/comma add; Backspace/× remove; deduplication; labeled
- ✅ **File Dropzone** — Front-end only (zero network calls); drag-state feedback; sr-only labeled `<input type="file">`
- ✅ **Progress Bar** — `role=progressbar` + `aria-valuenow`; `useInView` fill; no setState-in-effect
- ✅ **Banner block** — Dismissible announcement bar; gradient wash; CTA link
- ✅ **Team Grid block** — Responsive avatar + name + role grid; configurable heading

---

## Known Minor Issues (non-blocking)

None currently open. Recently resolved:

- ✅ **progress-bar.tsx** — `aria-label` now falls back to `"Progress"` when the `label` prop is omitted, so the progressbar always has an accessible name.
- ✅ **combobox.tsx** — The first ArrowDown while closed now only opens the list (no longer skips the first option); it advances only when already open.

---

## What's Next

- Per-component copy-paste docs (props tables, usage examples, customization tips)
- Behavioral unit tests for new interactive components (combobox keyboard nav, pagination ellipsis, toggle-group single/multiple, tag-input add/remove)
- `docs/architecture.md` — Data flow, component composition patterns, animation strategy (CSS vs. Framer Motion vs. canvas)
- `docs/decisions.md` — Dated decision log (dark-first rationale, motion lib choice, DPR cap, focus restoration pattern, etc.)
- Light theme visual regression testing (contrast, all surfaces)
- Cross-browser testing (Safari backdrop-filter, canvas DPR)
- CI/CD integration (automated type check, build, lint on PR)
- Optional: Figma design tokens sync, npm package export, Playwright E2E tests
