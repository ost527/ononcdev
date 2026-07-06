# NOTICE

ONONC is an independent work; its components are implemented from scratch in this
repository. This notice records the prior art that inspired parts of the catalog
and states precisely what ONONC does and does not use.

## Acknowledged prior art (concepts & names — not code)

- **shadcn/ui** — ONONC adopts the copy-paste **registry protocol** (the
  `/r/<id>.json` format and the `npx shadcn add <url>` install flow) and the
  `cn()` styling idiom. ONONC does **not** vendor shadcn source and does **not**
  depend on Radix UI.
- **React Bits** (https://reactbits.dev, © David Haz) — a number of ONONC
  background, text, and interactive components share the **concept and name** of a
  React Bits component. ONONC's implementations are independent (see below); no
  React Bits source is copied, vendored, or redistributed.
- **Aceternity UI** and **Magic UI** — further inspiration for motion-component
  concepts.

## React Bits licensing note

React Bits is distributed under the **MIT + Commons Clause v1.0** license
(source-available, not OSI open-source). The Commons Clause permits use inside an
application or product but **prohibits selling, sublicensing, or redistributing
the React Bits components themselves — including as a "ported version."**

ONONC therefore does **not** copy, vendor, or port React Bits source. Where a
component shares a name or visual concept, it is an independent reimplementation.
This is corroborated by ONONC's dependencies (`clsx`, `tailwind-merge`,
`lucide-react`, `motion`, `next`, `react`, `react-dom`, `prism-react-renderer`) — ONONC uses
**none** of the libraries React Bits' equivalents are built on (`three`, `ogl`,
`@react-three/fiber`, `gsap`, `lenis`):

- React Bits' WebGL components (Silk, Ballpit, Dither, Liquid Chrome, Circular
  Gallery, Metaballs) use `three` / `ogl` / `@react-three/fiber` + GLSL shaders;
  ONONC's equivalents are independent 2D-canvas or CSS implementations.
- React Bits' Card Swap / Flowing Menu use `gsap`, and Scroll Stack uses `lenis`;
  ONONC uses Framer Motion / plain rAF instead, with different structure.

See [docs/originality-audit.md](docs/originality-audit.md) for the full
component-level breakdown, including three simpler components (Star Border, Glare
Hover, Elastic Slider) confirmed by a line-by-line read to be independent reimplementations, and
Card Stack — the closest match; it corresponds to React Bits' free `Stack` but is likewise an independent reimplementation.

If you believe any ONONC component reproduces React Bits (or React Bits Pro)
code, please open an issue so it can be corrected or removed.
