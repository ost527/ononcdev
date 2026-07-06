# ONONC — Originality Audit

**Date:** 2026-07-06
**Purpose:** Answer, honestly and with evidence, the criticism that ONONC is a "shadcn 택갈이" (a reskin/rebadge of shadcn/ui). This document is deliberately self-critical. It is published in the public repo because the repo is already public — transparency defends the project better than silence.

---

## TL;DR verdict

**Taken literally, "shadcn 택갈이" is false.** ONONC shares **no code** with shadcn/ui. It has **no Radix UI** dependency (shadcn's entire behavior/a11y layer), **no `class-variance-authority`**, and its interactive primitives are **hand-rolled from scratch** (own ARIA, keyboard, focus, and motion).

**But the criticism has a real kernel.** ONONC deliberately borrows three things from the ecosystem, and this is what makes it *look* derivative at a glance:

1. **Distribution & tooling** — the shadcn registry protocol, `cn()`, copy-paste philosophy.
2. **The classic-primitive catalog** — which components exist and what they're named tracks shadcn/ui.
3. **The motion/eye-candy catalog** — Backgrounds, Text animations, and several interactive UI components take their **concepts and names** from the **React Bits / Aceternity / Magic UI** lineage.

So the accurate one-line framing is: **ONONC borrows its *what* (which components exist, what they're called, how they install) from well-known prior art, and is original in its *how* (independent implementations, motion-first engineering, a11y/reduced-motion discipline, AI-agent tooling, and one cohesive dark-first system).**

---

## React Bits licensing reality (verified 2026-07-06)

React Bits is **not** plain MIT / OSI open source. Its `LICENSE.md` is
**"MIT + Commons Clause License Condition v1.0"** (© David Haz). It grants use
*"as part of an application, website, or product"* but adds:

> "You may use this Software … so long as you do **not** sell, sublicense, or
> redistribute the components themselves — whether alone, in a bundle, or **as a
> ported version.**"

This is the crux, because ONONC's core model *is* redistributing components
(copy-paste, `/r/<id>.json`, `llms-full.txt`). The Commons Clause restricts React
Bits' **code** (the "Software"); it does not, and legally cannot, restrict
independent reimplementations of the *ideas, visual concepts, or names* (not
protected by copyright). **So the whole question reduces to: are ONONC's
same-named components independent reimplementations, or ported React Bits code?**

### Independence evidence — React Bits free source vs ONONC (2026-07-06)

Compared against the real React Bits source (`github.com/DavidHDev/react-bits`,
`ts-tailwind` variant). ONONC depends on none of `three` / `ogl` /
`@react-three/fiber` / `gsap` / `lenis`, which corroborates the table:

| ONONC component | React Bits impl | ONONC impl | Independent? |
|---|---|---|---|
| Silk, Dither, Liquid Chrome, Metaballs | WebGL — `three` / `ogl` / `@react-three/fiber` + GLSL | 2D-canvas (`useCanvas`) | Yes — different technology, zero shared deps |
| Ballpit | `three` + `gsap`, 3D (876 lines) | 2D-canvas (185 lines) | Yes |
| Circular Gallery | `ogl` WebGL (826 lines) | CSS transforms (rotateY/translateX) | Yes |
| Letter Glitch | Canvas2D; `lettersAndSymbols`, hex `#2b4539/#61dca3/#61b3dc`, `getRandomColor` | Canvas2D; `GLYPHS`, brand `"139,92,246…"` palette, different structure | Yes — same obvious technique, different code/identifiers/colors |
| Card Swap | `gsap` (220 lines) | Framer Motion (192 lines) | Yes |
| Flowing Menu | `gsap` (187 lines) | pure CSS (138 lines) | Yes |
| Scroll Stack | `lenis` smooth-scroll (349 lines) | rAF scroll listener (195 lines) | Yes |
| Profile Card | plain react (647 lines) | magic-bento CSS-var pattern (208 lines) | Yes |
| Magnet | plain react (85 lines) | Framer Motion springs (93 lines) | Likely |
| Star Border | 2 translating radial-gradient spans (keyframes `star-movement-top/bottom`) | 1 rotating conic-gradient (`star-spin`, its ShimmerButton mechanic) + `color-mix`, plus a reduced-motion path | Yes — different mechanic & keyframe |
| Glare Hover | JS mutates `backgroundPosition` on `onMouseEnter/Leave` via a ref | pure-CSS `group-hover` / `focus-within` sweep, no JS, extends `HTMLAttributes` | Yes — different technique |
| Elastic Slider | Framer `useMotionValue` + sigmoid `decay()`; no keyboard, no ARIA | Framer `useSpring` + different stretch math; full `role="slider"` + Arrow/Home/End/PageUp/PageDown | Yes — shared Framer idea, different code, ONONC adds a11y |
| Card Stack | React Bits **free** `Stack` — Framer drag, a `CardRotate` 3D tilt, `Math.random` rotate, autoplay/mobile logic, image cards | Framer drag, **translate**-stacking (no 3D tilt), **deterministic** `seededRandom` tilt, full keyboard a11y, title/subtitle content cards | Independent reimplementation — the **closest** of the set; it originally overlapped React Bits' `Stack` API but has been deliberately diverged: ONONC uses its own `cycleOnClick` prop and `dragElastic=0.4`, sharing only the generic `sensitivity` prop, and differs in structure, math, content, and a11y |

**Correction:** ONONC's changelog labelled 8 components "React Bits **Pro**–Inspired,"
but 7 of those 8 names exist in the **free** React Bits repo (only *Card Stack*
does not). The "Pro" label is inaccurate and is being corrected to avoid implying
that a paid product's code was used.

---

## Method & confidence

What was checked (high confidence):

- **Dependency graph** — `package.json`: runtime deps are `clsx`, `tailwind-merge`, `lucide-react`, `motion`, `next`, `react`, `react-dom`, `prism-react-renderer`. **No `@radix-ui/*`. No `class-variance-authority`.**
- **Code scan** — a repo-wide search for `radix|shadcn|cva|class-variance-authority`: **zero** Radix/cva matches; every `shadcn` reference is about the *registry distribution format* (`/r/<id>.json`, `npx shadcn@latest add`), never a component import.
- **Spot-check of the primitives that overlap shadcn most** — `accordion.tsx`, `switch.tsx`, `tabs.tsx` are independent implementations (`useState`/`useId`, `grid-template-rows` height transition, `inert`, hand-wired `role`/`aria-*`, roving `tabindex`, Framer Motion `layoutId`). shadcn's equivalents delegate to `*Primitive.Root` from Radix — a structurally different approach.
- **No `components.json`** in the repo: ONONC does not consume shadcn; it only *emits* a shadcn-compatible registry for consumers.

What was **not** exhaustively verified (stated for honesty):

- Not all 336 components were read line-by-line.
- React Bits **free** source WAS compared on 2026-07-06 (dependencies + rendering technique across ~14 components — see the matrix above); this is a structural comparison, not a token-level forensic diff. React Bits **Pro** source is paywalled and was **not** accessed; however, Pro sells full page *templates/blocks* (heroes, pricing, features) — not these individual components, which are all in the free repo — so no ONONC component maps to a Pro-exclusive item. (ONONC's own marketing *blocks* are generic section archetypes, independent of any specific template product.) Aceternity / Magic UI were not diffed. Star Border, Glare Hover, Elastic Slider, and Card Stack were then read line-by-line against the free React Bits source (2026-07-06); all are independent reimplementations — Card Stack is the closest (it shares the concept and some API surface with the free `Stack`).

---

## Layer-by-layer breakdown

| Layer | Borrowed from | What's borrowed | What's original | Shared code? |
|---|---|---|---|---|
| Distribution & install | shadcn/ui | Registry JSON (`/r/<id>.json`), `npx shadcn add <url>`, `@/lib`·`@/ui` alias placeholders, copy-paste-not-npm philosophy | The build-time generator (`registry-json.ts`) with transitive-import bundling; per-component "Copy for AI" | No — uses shadcn's **open, published protocol** |
| Styling idiom | shadcn/ui (popularized) | `cn()` = `clsx` + `tailwind-merge`; Tailwind utility classes | Dark-first token system in `globals.css` (`@theme`), brand spectrum, keyframes | No |
| Classic UI primitives | shadcn/ui (catalog & naming) | *Which* primitives exist and their names (Accordion, Tabs, Switch, Tooltip, Dialog→Modal, Popover, Command Palette, Dropdown Menu, Select, Checkbox, Radio Group, Slider, …) | **Every implementation** — no Radix; hand-rolled state machines, ARIA, keyboard nav, focus mgmt; Framer Motion polish | No |
| Motion backgrounds | React Bits / Aceternity | Concepts & names (Aurora, Silk, Squares, Ballpit, Letter Glitch, Liquid Chrome, Dither, Metaballs, Particles, Waves, Threads/Strands, …) | Independent canvas implementations on a shared `useCanvas` hook; reduced-motion single-frame, off-screen pause, DPR cap | No evidence of copied source |
| Text animations | React Bits / Aceternity | Concepts & names (Split/Blur/Shiny/Gradient Text, Decrypt, Scramble, Count Up, Rotating Text, Text Pressure, …) | Independent implementations; screen-reader-safe (semantic text + `aria-*`) | No evidence of copied source |
| Interactive UI (galleries/cards) | React Bits (free repo) | Concepts & names (Circular/Rolling Gallery, Card Swap, Chroma Grid, Pixel Card, Profile Card, Scroll Stack, Magnet, Flowing Menu, Elastic Slider, Star Border, Glare Hover) | Independent implementations; keyboard + reduced-motion support added | No evidence of copied source |
| Section blocks (119) | Generic marketing-page patterns | Common section archetypes (Hero, Pricing, Bento, Steps, Testimonials, FAQ, …) | Original composition from ONONC's own primitives | No |
| AI-agent tooling | — (novel here) | — | `llms.txt` / `llms-full.txt`, per-component shadcn registry, Copy-for-AI, `/ai-agents` docs, playground/customize infra | Original |

---

## What is genuinely original

1. **Radix-free, from-scratch implementations.** A reskin keeps Radix and swaps class names. ONONC re-implements every interactive primitive's state, ARIA, keyboard, and focus behavior itself. This is materially *more* engineering than a shadcn theme, not less.
2. **Motion-first engineering discipline.** A shared `useCanvas` lifecycle hook (off-screen pause via IntersectionObserver, tab-hidden pause, DPR cap, reduced-motion single-frame), used by the canvas-based backgrounds; the CSS-only ambient effects degrade through the same reduced-motion rules.
3. **Accessibility & reduced-motion as a default**, including for the "eye-candy" components that prior-art libraries often ship without a11y.
4. **A unified dark-first design-token system** (`globals.css` `@theme`) spanning all four categories.
5. **AI-agent tooling** — `llms.txt`, `llms-full.txt`, a per-component shadcn-compatible registry with transitive bundling, and a Copy-for-AI flow. This aggregation is not something shadcn or React Bits ship.
6. **Breadth + cohesion.** shadcn = ~50 headless-styled primitives. React Bits = motion eye-candy. ONONC's original contribution is combining *boring primitives + eye-candy + marketing blocks + agent tooling* into one consistent system.

---

## Where the criticism is fair — the honest risk register

These are the "팩폭" points a critic could legitimately raise. Concede the true ones; that is what makes the rebuttal credible.

1. **"The component names are ~1:1 with React Bits / shadcn."** — **Largely true** for the Backgrounds, Text, and interactive-UI catalog (React Bits) and the classic primitives (shadcn). The *selection and naming* are not novel. Mitigation: independent implementations + explicit attribution (below).
2. **"It's shadcn-compatible, therefore it's shadcn."** — **False, but understandable.** The shadcn registry is an *open protocol* designed to accept third-party URLs; Magic UI, Aceternity, and others are compatible too. Compatibility is interoperability, not derivation.
3. **"'Built from scratch' is overclaiming."** — **Partly fair.** It is accurate for the *implementations* (no Radix/cva/copied source) but sits awkwardly next to a catalog whose *ideas and names* are clearly from prior art. Recommendation: tighten the wording to *"components implemented from scratch — no Radix, no UI dependencies"* rather than implying the concepts are novel.
4. **"The value is just aggregation."** — **Partly true, and that's fine.** Aggregation + consistent a11y/motion engineering + agent tooling is a legitimate contribution; it should be *named as such* instead of implying pure novelty.

---

## Recommendation (feeds the public messaging change)

1. **Publish a "Prior art & how ONONC differs" section** on `/ai-agents` (and a shorter nod on the landing). Name shadcn (distribution) and React Bits / Aceternity / Magic UI (motion concepts) as prior art, then state the differentiators (Radix-free from-scratch, motion-first, a11y/reduced-motion, unified tokens, agent tooling, cohesion). Transparency neutralizes the "택갈이" charge.
2. **Tighten the "Built from scratch" claim** in the README to be precise about *what* is from scratch (implementations) vs. what is prior art (catalog/naming/distribution).
3. **Keep this audit in the repo.** A project that audits its own originality reads as mature, not defensive.
4. The site already links to React Bits and peers on `/resources` — extend that existing honesty into an explicit acknowledgements note.

---

## Attribution & acknowledgements

ONONC is built on ideas from, and interoperates with, prior art it gratefully acknowledges:

- **shadcn/ui** — the copy-paste distribution model and the registry protocol ONONC's `/r/<id>.json` targets.
- **React Bits / Aceternity UI / Magic UI** — the motion-component lineage that inspired many Background, Text, and interactive-UI *concepts and names*.
- **Radix UI** — the accessibility patterns ONONC re-implements independently (ONONC does **not** depend on Radix).

All ONONC components are independently implemented in this repository; no source from the above projects is vendored or copied.
