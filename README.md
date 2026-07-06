# ONONC

An original, motion-first React component library for Next.js 16. Components are implemented from scratch — no Radix, no UI dependencies — with dark-first design tokens, performant canvas animations, and screen-reader friendly interactions. Distribution (the shadcn registry protocol) and much of the catalog naming draw on prior art; see [docs/originality-audit.md](docs/originality-audit.md) for an honest, component-level breakdown.

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
│   ├── ai-agents/
│   │   └── page.tsx             # "For AI agents" docs page explaining why ONONC suits coding agents; links to llms.txt endpoints
│   ├── resources/
│   │   └── page.tsx             # "Recommended resources" board: curated external design systems & component libraries (10 sites with descriptions, tags, outbound links)
│   ├── changelog/
│   │   └── page.tsx             # Changelog page listing all releases with version history and feature highlights (GitHub-visible CHANGELOG.md synced)
│   ├── llms.txt/
│   │   └── route.ts             # Static route handler serving machine-readable index of all components
│   ├── llms-full.txt/
│   │   └── route.ts             # Static route handler serving index + full component sources inlined
│   ├── r/
│   │   └── [name]/route.ts      # shadcn-compatible static registry: /r/<id>.json with bundled sources + dependencies
│   ├── robots.ts                # robots.txt route handler (allow all, Host, Sitemap)
│   ├── sitemap.ts               # sitemap.xml route handler (227 URLs: home, changelog, ai-agents, resources, llms.txt, all categories, all non-block detail pages)
│   └── [category]/
│       ├── layout.tsx           # Sidebar + content split for all category routes
│       ├── page.tsx             # Per-category view: renders ONLY that category's components
│       └── [id]/
│           └── page.tsx         # Per-component detail page with interactive playground (static export, dynamicParams=false)
├── components/
│   ├── backgrounds/             # 72 ambient, animated canvases
│   ├── text/                    # 58 typographic animation effects
│   ├── ui/                      # 87 interactive components
│   ├── blocks/                  # 119 composed section blocks (some are subcategories within blocks)
│   └── showcase/                # Showcase UI
│       ├── site-header.tsx      # Sticky header: brand link (/), category nav links (/<category>), theme toggle
│       ├── sidebar.tsx          # Sidebar (desktop rail) + MobileNav (mobile pills); fed plain {id,label,count}[] props
│       ├── showcase-hero.tsx    # Landing hero with CTAs linking to /backgrounds and /blocks
│       ├── code-block.tsx       # Syntax-highlighted code with copy button
│       ├── component-showcase.tsx  # Preview + Code tabs for category pages (grid cards)
│       ├── component-playground.tsx  # Detail page: tabs, viewport controls, resize handle, customize panel, props table
│       ├── playground-controls.tsx   # Customize controls using library primitives (Slider, Switch, SegmentedControl, etc.)
│       ├── copy-for-ai.tsx      # Button copying AI-ready install prompt on detail pages
│       ├── theme-toggle.tsx     # Dark/light theme switcher
│       └── other showcase support files
├── lib/
│   ├── utils.ts                 # cn, clamp, mapRange, seededRandom, prefersReducedMotion
│   ├── use-canvas.ts            # Reusable canvas rAF hook
│   ├── use-hydrated.ts          # useSyncExternalStore mount guard for Next.js 16
│   ├── source.ts                # Build-time fs reader for component sources
│   ├── llms.ts                  # Build-time registry → llms.txt/llms-full.txt generator
│   ├── registry-json.ts         # Build-time registry → /r/<id>.json shadcn-compatible registry generator
│   └── site.ts                  # SITE_URL + absoluteUrl() for metadata and LLM endpoints
└── registry/
    ├── types.ts                 # Component registry types + PlaygroundSpec, Control, PropDoc types
    ├── backgrounds.tsx          # Backgrounds registry (72 items)
    ├── text.tsx                 # Text registry (58 items)
    ├── ui.tsx                   # UI registry (87 items)
    ├── blocks.tsx               # Blocks registry (119 items, some subcategories)
    ├── playground.tsx           # Per-component playgrounds: customize controls + render function + props (client module)
    ├── subcategories.ts         # Optional sub-category grouping within blocks (e.g., Features, Stats, Forms)
    └── index.ts                 # Central registry export: categories[], componentCount, allComponentParams(), findComponent()
```

**Architecture:** The showcase is a docs-style site with a shared chrome (header/footer/scroll-progress/toaster) in the root layout:
- **Landing** (/) — Category cards with browse CTAs
- **Per-category routes** (/backgrounds, /text, /ui, /blocks) — Sidebar + grid of component cards
  - **UI/Text/Backgrounds (cards):** Linked title + summary direct to detail pages
  - **Blocks (full-width list):** Plain title + summary (no link), inline Preview/Code tabs with ViewportToggle for responsive preview
- **Component detail routes** (/[category]/[id]) — Static-generated for all non-block components (217 total: backgrounds, text, ui); blocks have no detail pages (/blocks/<id> returns 404). Each detail page is a playground with Preview/Code tabs, viewport presets (Desktop/Tablet/Mobile), responsive resize handle, optional live Customize panel, and Props table
- **Navigation** — Left Sidebar (desktop) + MobileNav pills (mobile); fed as plain {id,label,count}[] props from registry to keep preview tree server-side
- **Copy-Paste Integration** — Component sources embedded at build time; Code tab includes copy-to-clipboard

---

## Components

The registry defines 336 components across four categories (computed by `src/registry/index.ts`). Detail/playground pages are statically generated for all non-block components (backgrounds 72 + text 58 + ui 87 = 217 total). Blocks have no per-component detail page; they are listed inline on the /blocks category page. The component count is derived at build time from the registry and embedded in the landing page.

### Backgrounds (72)
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
- **Ferrofluid** — A magnetic liquid-metal blob with metaball spikes that reaches a tendril toward the cursor (canvas)
- **Silk** — Flowing folds of satin catching the light as they drift (canvas)
- **Squares** — An endlessly drifting grid of squares that lights up under the cursor (canvas, interactive)
- **Letter Glitch** — A dense grid of monospace glyphs flickering through letters and colors (canvas)
- **Ballpit** — A pit of colorful balls under gravity that scatter away from the cursor (canvas, interactive)
- **Strands** — A glowing bundle of threads that flow like windblown hair and part around the cursor (canvas)
- **Liquid Chrome** — A sheet of molten, mirror-bright metal that folds and drags beneath the cursor (canvas)
- **Dither** — An animated plasma resolved into crisp retro bands through an ordered dither matrix (canvas)

### Text Animations (58)
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

### Components (87)
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
- **Card Swap** — A 3D card stack that auto-cycles the front card to the back, pausing on hover (motion, loop, 3D)
- **Avatar** — User image with initials fallback and an optional status dot (display)
- **Chroma Grid** — A desaturated grid that reveals each tile's color under a pointer spotlight (pointer, hover, reveal)
- **Circular Gallery** — A curved coverflow band you drag and throw; it bends along an arc and loops forever (motion, drag, 3D)
- **Separator** — Thin divider, horizontal or vertical, with an optional label (layout)
- **Collapsible** — A single show/hide disclosure with an animated height (a11y, disclosure)
- **Scroll Area** — A bounded scroll container with a custom, themed scrollbar (pointer, layout)
- **Empty State** — A centered placeholder for empty content with an action (display, feedback)
- **Multi-Select** — Searchable multi-select with removable chips and keyboard navigation (a11y, form)
- **Time Picker** — Pick an hour, minute, and AM/PM with spinbutton segments (a11y, form)
- **Pixel Card** — A surface that dissolves a mosaic of pixels into view on hover or focus (canvas, hover, a11y)
- **Rolling Gallery** — Cards mounted on a spinning 3D cylinder; drag to roll it, hover to pause (motion, drag, 3D)
- **Profile Card** — A profile card that tilts toward the pointer with a holographic sheen, moving glare, and a colored glow (pointer, 3D, hover)
- **Scroll Stack** — Cards that pin and scale into a stack as you scroll an internal viewport (scroll, motion, layout)
- **Card Stack** — A draggable deck; throw or (optionally) click the top card to send it to the back, with full keyboard cycling (motion, drag, a11y)
- **Magnet** — Wraps any element so it springs toward the pointer within an activation radius (pointer, motion, spring)
- **Flowing Menu** — Menu rows where a colored marquee band flows across on hover or keyboard focus (hover, loop, a11y)
- **Elastic Slider** — An accessible range slider that stretches elastically when dragged past its ends (pointer, a11y, spring)
- **Star Border** — A wrapper with an animated glowing gradient border that travels around the edge (hover, loop, css)
- **Glare Hover** — A surface that sweeps a diagonal glare highlight across its face on hover or focus (hover, css, reveal)

### Section Blocks (119)
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
- **Footer** — Brand and navigation links with optional socials row (layout)
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

### AI Coding Agents Support
A machine-readable index and dedicated docs page enable LLM coding agents to discover and compose ONONC components. Registry data is generated at build time and served as static exports.

- **/llms.txt** — Machine-readable component index (58 KB, 336 components). Lists each component with name, one-line description, absolute URL, source path, category tags, and one-command install command. Generated at build time from `src/lib/llms.ts` via the registry and served by `src/app/llms.txt/route.ts`
- **/llms-full.txt** — Index plus full component source code inlined in ```tsx fences (1.28 MB). Reuses `src/lib/source.ts` for source extraction, served by `src/app/llms-full.txt/route.ts`
- **/r/<id>.json** — shadcn-compatible static registry (336 items). Each component bundles its complete source plus all transitively imported internal files (@/lib helpers, sibling components) with correct shadcn `type` and `target` alias placeholders (@lib/ @ui/ @components/), and lists real npm dependencies (clsx, tailwind-merge, motion, lucide-react; react/react-dom/next are peers and omitted). Enables one-command install: `npx shadcn@latest add https://dev.ononc.com/r/<id>.json`. Generated at build time from `src/lib/registry-json.ts` and served by static route handler `src/app/r/[name]/route.ts`. Output emitted to `out/r/<id>.json` by `next build`
  > **Note:** Components installed standalone via `npx shadcn@latest add .../r/<id>.json` assume the consumer has ONONC's `globals.css` design tokens present in their project. Additionally, a few components rely on globals.css `@keyframes` — **star-border** requires `star-spin`, and **flowing-menu** reuses `marquee` — which are NOT bundled in the registry JSON. Without these keyframes, the animation will be static (no error, no animation). This is by-design: ONONC components are meant to be modified and integrated into design systems, not used as isolated package-locked third-party UI. For full fidelity, copy the component source and tokens directly from the detail pages.
- **/ai-agents** — Standalone docs page (`src/app/ai-agents/page.tsx`) explaining why ONONC suits LLM coding agents: real copy-paste source, plain React + Tailwind, predictable structure, machine-readable llms.txt, one-command shadcn install, no additional dependencies, and full reduced-motion/a11y support. Includes JSON-LD breadcrumb and links to all endpoints, plus an "Original work, honest about its lineage" section that acknowledges prior art (shadcn's registry protocol; React Bits/Aceternity/Magic UI concepts) and states ONONC's differentiators — see [docs/originality-audit.md](docs/originality-audit.md). Linked from the footer "Get started" section
- **Copy for AI button** — `src/components/showcase/copy-for-ai.tsx` on each component detail page; copies a ready prompt including the install command, docs URL, and component source for immediate agent use
- **Site configuration** — `src/lib/site.ts` defines `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, defaults to `https://dev.ononc.com`) and `absoluteUrl()` helper used for component links in llms.txt and registry URLs, and for `metadataBase` in `src/app/layout.tsx`. Production domain is `dev.ononc.com`. URLs are 404-safe: component links point to `/[category]/[id]` detail page for all non-block components; only blocks link to their category page instead
- **Search engine and metadata** — `src/app/robots.ts` serves robots.txt (allow all, Host, Sitemap) and `src/app/sitemap.ts` serves sitemap.xml (227 URLs: home, changelog, ai-agents, resources, llms.txt, all 4 categories, and all 217 non-block detail pages)
- **Static export output** — Emitted to `out/llms.txt`, `out/llms-full.txt`, `out/ai-agents.html`, `out/robots.txt`, `out/sitemap.xml`, and `out/r/*.json` (336 files) by `next build` (with `output: "export"`)
- **Tests** — Validated by `src/lib/llms.test.ts` (llms.txt/llms-full.txt generation) and `src/lib/registry-json.test.ts` (all 336 items, dependency validation against package.json, transitive import bundling)

### Component Detail Playground
Each component has a dedicated detail page (/[category]/[id]) with an interactive playground — explore variants, customize props live, and preview changes in real-time.

- **Static Generation** — All non-block components pre-rendered at build time via `generateStaticParams()` (217 detail pages: backgrounds 72 + text 58 + ui 87); `dynamicParams=false` prevents stale 404s. Blocks have no detail pages; /blocks/<id> returns 404
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
- **Coverage** — 54 test files, 182 tests passing:
  - `src/lib/utils.test.ts` — helpers (cn, clamp, mapRange, seededRandom, prefersReducedMotion)
  - `src/lib/llms.test.ts` — llms.txt/llms-full.txt generation validation
  - `src/lib/registry-json.test.ts` — registry-json generation (all 336 items, dependency validation against package.json, transitive import bundling)
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
✅ **Build** — `npm run build` succeeds (static prerender of / + 4 category SSG routes + 217 non-block detail pages + /_not-found; exits 0)  
✅ **Lint** — `npm run lint` = 0 errors (eslint flat config; 6 pre-existing warnings in src/components/text/*)  
✅ **Runtime** — `next start` returns HTTP 200 for /, /backgrounds, /text, /ui, /blocks, /ai-agents, and all 217 component detail routes; /llms.txt, /llms-full.txt, /robots.txt, and /sitemap.xml serve static exports; /r/<id>.json shadcn registry endpoints available for all 336 components; 404 for /blocks/<id>; no hydration errors; all components present; category scoping confirmed  
✅ **Tests** — `npm test` = 72 files, 259 tests passing (registry test validates all entries + sourcePath existence; llms.txt/llms-full.txt generation validated; registry-json generation validated with dependency checks; playground specs validated with updated detail-page rules; component-playground interface tested)

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


### v1.9 Batch (2026-07-05) — Recommended Resources Board
- ✅ **Recommended resources page** — New `/resources` static route (`src/app/resources/page.tsx`) serving a curated board of 10 third-party design systems and component libraries (React Bits, React Bits Pro, Mantine UI, 21st.dev, Cloudscape, Primer React, Carbon Design System, Material Web, Fluent UI, Astryx), each with description, tags, and outbound links (target=_blank rel=noopener noreferrer). Data-driven via RESOURCES[] array for easy editing.
- ✅ **Metadata & discoverability** — Includes BreadcrumbList + ItemList JSON-LD for SEO. Linked from footer 'Get started' column (`src/app/layout.tsx` footerColumns) and added to sitemap (`src/app/sitemap.ts`). Prerenders to `out/resources.html`.
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors (my files), next build exit 0 (/resources prerendered to out/resources.html, included in out/sitemap.xml)

### v1.10 Batch (2026-07-06) — Milestone 1: 8 Premium Interactive Components (React Bits–inspired, independent implementations)
- ✅ **Profile Card** — Tilting 3D card with holographic sheen and moving glare; pointer-reactive with colored glow. Grouped Customize (5 Appearance/Motion/Interaction controls) + Props + detail page + /r/profile-card.json; real contact button interaction + reduced-motion support
- ✅ **Scroll Stack** — Cards that pin and scale into a stack as the user scrolls an internal viewport; smooth layout transitions. Grouped Customize (4 Stack/Motion controls) + Props + detail page + /r/scroll-stack.json; full scroll-aware lifecycle
- ✅ **Card Stack** — Draggable deck with throw physics or click-to-cycle; full keyboard cycling on a single roving-focus group (never aria-hidden). Grouped Customize (3 Physics/Motion/Appearance) + Props + detail page + /r/card-stack.json; a11y (keyboard: Tab/Shift-Tab/Space/Enter/ArrowKeys)
- ✅ **Magnet** — Reusable wrapper spring-physics component that pulls any child toward the pointer within a customizable radius. Grouped Customize (4 Motion/Physics/Appearance) + Props + detail page + /r/magnet.json; reduced-motion respects prefers-reduced-motion
- ✅ **Flowing Menu** — Menu rows where a marquee band flows across on hover or keyboard focus; smooth loop with a single accessible name. Grouped Customize (5 Appearance/Motion/Loop) + Props + detail page + /r/flowing-menu.json; keyboard navigation + a11y (aria-label/role)
- ✅ **Elastic Slider** — Accessible range slider (role=slider) with elastic spring when dragged past bounds; full keyboard support (Arrow/Home/End/PageUp/PageDown). Grouped Customize (5 Physics/Motion/Appearance) + Props + detail page + /r/elastic-slider.json; a11y compliance verified
- ✅ **Star Border** — Wrapper with animated glowing gradient border that travels around the edge on a looping path; uses @keyframes star-spin. Grouped Customize (4 Motion/Appearance) + Props + detail page + /r/star-border.json; CSS-only with reduced-motion collapse
- ✅ **Glare Hover** — Surface that sweeps a diagonal glare highlight across its face on hover or focus; non-trapping overlay with reveal effect. Grouped Customize (6 Motion/Appearance/Glow) + Props + detail page + /r/glare-hover.json; merged style props to avoid cascade issues
- ✅ **Subgrouping** — All 8 wired into ui registry with logical tags: buttons (magnet, star-border), cards (profile-card, glare-hover), interactive (scroll-stack, card-stack, flowing-menu), inputs (elastic-slider)
- ✅ **Rich Customize specs** — Each component has 4–6 grouped controls (color pickers, number sliders, boolean toggles, text inputs, select dropdowns) + Usage code snippet + full Props table; all defaults satisfy min≤value≤max bounds
- ✅ **Shadcn registry bundling** — All 8 emit `/r/<id>.json` with full component source + transitive @/lib/@ui/@components/ imports; dependencies: motion, lucide-react, clsx, tailwind-merge; note: standalone installs assume consumer has globals.css design tokens; star-border requires @keyframes star-spin and flowing-menu reuses @keyframes marquee (not bundled, so animation static until tokens present)
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors (6 pre-existing text/* warnings), 72 test files / 257 tests passing, next build exit 0 (521 static pages; emitted out/ui/{profile-card,scroll-stack,card-stack,magnet,flowing-menu,elastic-slider,star-border,glare-hover}.html + out/r/{profile-card,scroll-stack,card-stack,magnet,flowing-menu,elastic-slider,star-border,glare-hover}.json); registry now totals 336 components (Backgrounds 72 + Text 58 + UI 87 + Blocks 119)
- ✅ **QA status** — Review GO after fixing 1 Major (card-stack keyboard a11y roving-focus correction) + 2 Minor (flowing-menu reduced-motion name persistence, glare-hover style merge for specificity). QA PASS. **Status: NOT YET COMMITTED OR DEPLOYED (awaiting user check-in)**

### v1.2 Batch (2026-07-01) — Component Detail Playground Feature
- ✅ **Component detail playground** — New `/[category]/[id]` route with static generation of all backgrounds/text/ui components (157 total routes: home + _not-found + 4 category SSG routes + non-blocks detail pages); features Preview/Code tabs, viewport presets (Desktop/Tablet/Mobile), refresh button, draggable/keyboard-accessible resize handle, optional Customize panel, and Props table
- ✅ **Blocks have no detail pages** — /blocks category page lists blocks inline only (title/summary, no detail page link; /blocks/<id> returns 404). Enforced by `hasDetailPage(categoryId)` in registry; detail route's `generateStaticParams()` uses `detailPageParams()` which filters out blocks
- ✅ **Inline ViewportToggle for blocks** — Each block on /blocks shows a shared ViewportToggle (new src/components/showcase/viewport-toggle.tsx; Desktop=full / Tablet=768px / Mobile=390px) next to its Preview/Code tabs
- ✅ **Customize controls** — dogfood library components (Slider, Switch, SegmentedControl, Select, NumberInput, ColorPicker) to showcase interactive patterns
- ✅ **Playground specs** — Per-component specs in `src/registry/playground.tsx` (client module); ~22 components have full Customize + Props coverage; graceful fallback for components without specs
- ✅ **Grid card updates** — UI/text/backgrounds grid cards show title + summary linking to detail page only; blocks render plain title/summary (no link) with inline Preview/Code tabs + ViewportToggle
- ✅ **SegmentedControl a11y** — Now accepts optional `aria-label` / `aria-labelledby` props (backward compatible)
- ✅ **New tests** — `src/registry/playground.test.ts` and `src/components/showcase/component-playground.test.tsx`; suite now 44 files, 109 tests

### v1.3 Batch (2026-07-04) — AI Coding Agents Support (Phase 1)
- ✅ **Machine-readable LLM index** — `/llms.txt` endpoint (58 KB, 308 components) generated at build time by `src/lib/llms.ts`, listing each component with name, one-line description, absolute URL, source path, and category tags. Served by static route handler `src/app/llms.txt/route.ts`
- ✅ **LLM index with full source** — `/llms-full.txt` endpoint (1.28 MB) combines the llms.txt header with complete component source code inlined in ```tsx fences. Generated by `src/app/llms-full.txt/route.ts`, reusing `src/lib/source.ts` for extraction
- ✅ **AI agents docs page** — New `/ai-agents` route (`src/app/ai-agents/page.tsx`) explains why ONONC suits coding agents (real copy-paste source, plain React + Tailwind, predictable structure, machine-readable index, no install dependencies, full reduced-motion/a11y support). Includes JSON-LD breadcrumb and links to both endpoints. Linked from footer "Get started" section
- ✅ **Site configuration** — New `src/lib/site.ts` module defines `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, defaults to `https://dev.ononc.com`) and `absoluteUrl()` helper for generating component links in llms.txt and for `metadataBase` in `src/app/layout.tsx`. Production domain: `dev.ononc.com`
- ✅ **404-safe URLs** — Component links point to `/[category]/[id]` detail page only when that page is generated (backgrounds/text/ui); blocks and non-customizable components link to their category page instead
- ✅ **Static export support** — Outputs emitted to `out/llms.txt`, `out/llms-full.txt`, and `out/ai-agents.html` by `next build` with `output: "export"`
- ✅ **Test coverage** — New `src/lib/llms.test.ts` validates llms.txt/llms-full.txt generation and structure
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors, 45 test files with 177/177 tests passing, next build exit 0 (151 total static routes)

### v1.4 Batch (2026-07-04) — AI Coding Agents Support (Phase 2)
- ✅ **shadcn-compatible static registry** — `/r/<id>.json` endpoint (308 items) generated at build time by `src/lib/registry-json.ts`, serving each component with its complete source bundled alongside all transitively imported internal files (@/lib helpers, sibling components). Each item uses correct shadcn `type` and `target` alias placeholders (@lib/ @ui/ @components/) and lists real npm dependencies (clsx, tailwind-merge, motion, lucide-react; peers omitted). Served by static route handler `src/app/r/[name]/route.ts`, emitted to `out/r/<id>.json` by `next build`. Enables one-command install: `npx shadcn@latest add https://dev.ononc.com/r/<id>.json`. VERIFIED with real shadcn CLI (badge + hero-block component imports resolved correctly, deps added, styling intact)
- ✅ **Per-component "Copy for AI" button** — New `src/components/showcase/copy-for-ai.tsx` on each detail page; copies a ready prompt with install command, docs URL, and component source for agent use. Every `/llms.txt` entry now carries its `npx shadcn@latest add …/r/<id>.json` install command for universal agent coverage
- ✅ **Search engine metadata** — New `src/app/robots.ts` serves robots.txt (allow all, Host, Sitemap); new `src/app/sitemap.ts` serves sitemap.xml (147 URLs: home, ai-agents intro, llms.txt, all 4 categories, all detail pages for backgrounds/text/ui)
- ✅ **Registry-json test suite** — New `src/lib/registry-json.test.ts` validates all 308 items, asserts every dependency is a real package in package.json, verifies transitive bundling
- ✅ **Static export output** — Outputs emitted to `out/robots.txt`, `out/sitemap.xml`, and `out/r/*.json` (308 files) by `next build` with `output: "export"`
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors, 46 test files with 182/182 tests passing, next build exit 0 (out/ contains llms.txt, llms-full.txt, ai-agents.html, robots.txt, sitemap.xml, r/*.json ×308)

### v1.6 Batch (2026-07-04) — Silk, Squares, Letter Glitch, Ballpit Background Components
- ✅ **Silk background** — Flowing folds of satin catching the light as they drift; interference-field shading tinted between two colors with a sharpened highlight ramp. Wired into backgrounds registry with 7 Customize controls (3 Weave, 1 Motion, 3 Appearance groups) + Props table; detail page at `/backgrounds/silk`; grouped in "Gradients & aurora" in `src/registry/subcategories.ts`
- ✅ **Squares background** — An endlessly drifting grid of squares that fades into the dark at the edges, with cells lighting up as the cursor passes over them; supports diagonal/up/down/left/right drift directions. Wired into backgrounds registry with 6 Customize controls (1 Grid, 2 Motion, 2 Appearance, 1 Interaction group) + Props table; detail page at `/backgrounds/squares`; grouped in "Grids & geometry"
- ✅ **Letter Glitch background** — A dense grid of monospace glyphs continuously flipping to new letters and colors; only the handful of cells that change each frame are repainted over a baked, vignetted backdrop, and the whole grid is repainted fresh after every resize (or once under reduced motion) rather than reusing stale cell geometry. Wired into backgrounds registry with 7 Customize controls (1 Grid, 1 Motion, 5 Appearance groups) + Props table; detail page at `/backgrounds/letter-glitch`; grouped in "Weather & code"
- ✅ **Ballpit background** — A pit of colorful balls under gravity that bounce off the walls and each other, and scatter away from the cursor; equal-mass elastic collisions resolved pairwise (ball count capped at 80 to keep the O(n²) pass cheap). Wired into backgrounds registry with 9 Customize controls (2 Balls, 3 Physics, 4 Appearance groups) + Props table; detail page at `/backgrounds/ballpit`; grouped in "Particles & stars"
- ✅ **Contract checks** — All 4 playground specs verified: every control maps to its matching component prop; every number control satisfies min≤default≤max; hex color controls convert to "r,g,b" via the shared `hexRgb` helper; the multi-color specs (silk, letter-glitch, ballpit) emit a valid `colors` array in their Usage snippets
- ✅ **Registry count** — Backgrounds category now has 67 items (up from 63); total registry across all 4 categories is 313 components (`componentCount` in `src/registry/index.ts`)
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors (6 pre-existing text warnings), 54 test files with 182/182 tests passing, next build exit 0 (out/ contains `out/backgrounds/{silk,squares,letter-glitch,ballpit}.html` and `out/r/{silk,squares,letter-glitch,ballpit}.json`, each JSON bundling full component source plus transitive `@/lib` deps with only real npm dependencies)

### v1.5 Batch (2026-07-04) — Ferrofluid Background Component
- ✅ **Ferrofluid background** — Magnetic liquid-metal blob with metaball spikes that reaches a tendril toward the cursor; canvas-driven with pointer reactivity. Wired into backgrounds registry with 15 Customize controls (5 Form, 3 Motion, 3 Magnet, 4 Appearance groups) + Props table; 15 grouped playground controls satisfy min≤default≤max bounds; color conversion verified (hex→rgb); reduced-motion path renders valid single analytic frame; edge cases traced (spikes=0, droplets=0, threshold/magnetReach bounds, speed=0); all pass static checks
- ✅ **Component detail page** — `/backgrounds/ferrofluid` static route generated; `out/backgrounds/ferrofluid.html` (97,773 bytes) and `out/r/ferrofluid.json` (19,756 bytes) bundled with transitive deps + shadcn alias placeholders
- ✅ **Subcategories** — Ferrofluid added to "Fields & flow" group in `src/registry/subcategories.ts`
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors (6 pre-existing text warnings), 54 test files with 182/182 tests passing, next build exit 0 (158 total routes: +1 for /backgrounds/ferrofluid detail page)

### v1.8 Batch (2026-07-05) — Strands, Liquid Chrome, Dither Background Components
- ✅ **Strands background** — A luminous bundle of fine threads that flow like windblown hair; each strand is a superposition of two travelling sine waves with per-strand depth parallax (thickness/opacity/speed), additive 'lighter' glow, and the cursor gently parts the strands. Wired into backgrounds registry with grouped Customize + Props + /backgrounds/strands detail page + /r/strands.json; grouped in "Fields & flow" in `src/registry/subcategories.ts`; useCanvas hook with reduced-motion single-frame + off-screen pause
- ✅ **Liquid Chrome background** — A sheet of molten, mirror-bright metal: coordinate space domain-warped through itself twice to fold smooth gradients into liquid ridges, with a sharpened specular highlight ramp; the cursor drags the surface beneath. Wired into backgrounds registry with grouped Customize + Props + /backgrounds/liquid-chrome detail page + /r/liquid-chrome.json; grouped in "Gradients & aurora"; useCanvas hook lifecycle
- ✅ **Dither background** — An animated plasma pushed through an ordered Bayer 4x4 dither matrix, resolving the gradient into crisp retro bands of stippled pixels between two colours across quantised tones (non-interactive). Wired into backgrounds registry with grouped Customize + Props + /backgrounds/dither detail page + /r/dither.json; grouped in "Gradients & aurora"; useCanvas hook with reduced-motion single-frame
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors (my files only), 66 tests passing in src/registry + src/lib, next build exit 0 (501 static pages; emitted out/backgrounds/{strands,liquid-chrome,dither}.html + out/r/{strands,liquid-chrome,dither}.json with full transitive deps + shadcn alias placeholders)

### v1.7 Batch (2026-07-04) — Interactive Showcase UI Components (Circular Gallery, Rolling Gallery, Card Swap, Chroma Grid, Pixel Card)
- ✅ **Circular Gallery** — A curved coverflow band you drag and throw; it bends along an arc and loops forever. Wired into ui registry with grouped Customize + Props + live Usage playground spec, a customizable id + "Interactive showcase" subcategory slug; full keyboard and reduced-motion awareness; canvas/rAF loops pause off-screen
- ✅ **Rolling Gallery** — Cards mounted on a spinning 3D cylinder; drag to roll it, hover to pause. Wired into ui registry with grouped Customize + Props + live Usage playground spec, a customizable id + "Interactive showcase" subcategory slug; full keyboard and reduced-motion awareness; canvas/rAF loops pause off-screen
- ✅ **Card Swap** — A 3D card stack that auto-cycles the front card to the back, pausing on hover. Wired into ui registry with grouped Customize + Props + live Usage playground spec, a customizable id + "Interactive showcase" subcategory slug; full keyboard and reduced-motion awareness
- ✅ **Chroma Grid** — A desaturated grid that reveals each tile's color under a pointer spotlight. Wired into ui registry with grouped Customize + Props + live Usage playground spec, a customizable id + "Interactive showcase" subcategory slug; full keyboard and reduced-motion awareness; pointer reactivity
- ✅ **Pixel Card** — A surface that dissolves a mosaic of pixels into view on hover or focus. Wired into ui registry with grouped Customize + Props + live Usage playground spec, a customizable id + "Interactive showcase" subcategory slug; canvas-driven with a11y smoke test; rAF loops pause off-screen and on reduced-motion
- ✅ **Component detail pages** — All 5 routes statically generated at `/ui/{id}`, each emitting `out/ui/{id}.html` and `out/r/{id}.json` with full transitive deps + shadcn alias placeholders
- ✅ **Component count** — Components (ui) category now has 75 items; total registry now 318 (Backgrounds 67 + Text 58 + UI 75 + Blocks 118)
- ✅ **Build & test verification** — tsc 0 errors, eslint 0 errors (6 pre-existing text/* warnings), 59 files with 202/202 tests passing, next build exit 0 (out/ contains ui/{circular-gallery,rolling-gallery,card-swap,chroma-grid,pixel-card}.html and out/r/{circular-gallery,rolling-gallery,card-swap,chroma-grid,pixel-card}.json)

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


---

## License & Attribution

ONONC is released under the [MIT License](LICENSE) — free to use, copy, modify, and redistribute, including commercially, with no restrictions beyond preserving the copyright notice.

See [NOTICE.md](NOTICE.md) for prior-art attribution (shadcn's registry protocol; React Bits / Aceternity / Magic UI concepts) and an explicit statement that ONONC's components are independent reimplementations that copy or vendor no third-party source. [docs/originality-audit.md](docs/originality-audit.md) has the full, honest component-level breakdown — including that React Bits is MIT + Commons Clause and how ONONC's same-named components differ in implementation.
