# Navbar Blocks

Eighteen production-grade navigation variants in the **Section Blocks** category, in
addition to the original `Navbar`. Each is an original design built on the Lumen
UI design tokens — responsive, keyboard-accessible, and `prefers-reduced-motion`
aware.

> This file is scoped to the navbar blocks so it can be maintained independently
> of the main `README.md`. Each component lives in `src/components/blocks/` and is
> registered in `src/registry/blocks.tsx`.

## At a glance

| Name | Registry id | Component | File |
|------|-------------|-----------|------|
| Navbar | `navbar-block` | `NavbarBlock` | `navbar-block.tsx` |
| Mega Menu Navbar | `navbar-mega-menu` | `NavbarMegaMenu` | `navbar-mega-menu.tsx` |
| Floating Navbar | `navbar-floating` | `NavbarFloating` | `navbar-floating.tsx` |
| Split Navbar | `navbar-split` | `NavbarSplit` | `navbar-split.tsx` |
| App Navbar | `navbar-app` | `NavbarApp` | `navbar-app.tsx` |
| Drawer Navbar | `navbar-drawer` | `NavbarDrawer` | `navbar-drawer.tsx` |
| Sticky Navbar | `navbar-sticky` | `NavbarSticky` | `navbar-sticky.tsx` |
| Command Navbar | `navbar-command` | `NavbarCommand` | `navbar-command.tsx` |
| Sidebar Navbar | `navbar-sidebar` | `NavbarSidebar` | `navbar-sidebar.tsx` |
| Announcement Navbar | `navbar-announce` | `NavbarAnnounce` | `navbar-announce.tsx` |
| Commerce Navbar | `navbar-commerce` | `NavbarCommerce` | `navbar-commerce.tsx` |
| Auto-hide Navbar | `navbar-autohide` | `NavbarAutoHide` | `navbar-autohide.tsx` |
| Segmented Navbar | `navbar-segmented` | `NavbarSegmented` | `navbar-segmented.tsx` |
| Docs Navbar | `navbar-docs` | `NavbarDocs` | `navbar-docs.tsx` |
| Bottom Tab Bar | `navbar-bottom` | `NavbarBottom` | `navbar-bottom.tsx` |
| Scrollspy Navbar | `navbar-scrollspy` | `NavbarScrollspy` | `navbar-scrollspy.tsx` |
| Multi-level Navbar | `navbar-multilevel` | `NavbarMultiLevel` | `navbar-multilevel.tsx` |
| Dashboard Navbar | `navbar-dashboard` | `NavbarDashboard` | `navbar-dashboard.tsx` |
| Locale Navbar | `navbar-locale` | `NavbarLocale` | `navbar-locale.tsx` |

## Variants

### Mega Menu Navbar — `NavbarMegaMenu`
A SaaS-grade bar with rich mega-menu dropdowns. Triggers open on hover-intent and
on click/Enter, expose `aria-expanded`/`aria-controls`, and close on Escape
(returning focus to the open trigger), outside click, or pointer-leave (with a
cleared close timeout). Each panel is a grid of icon + title + description links
plus an optional featured card. Collapses to a stacked, grouped menu on mobile.
- Props: `brand`, `items` (`{ label, href?, menu? }`), `ctaLabel`, `signInLabel`, `className`.

### Floating Navbar — `NavbarFloating`
A centered glass "island". A single highlight slides between links via shared-layout
`layoutId`, following hover and keyboard focus and settling on the active item; the
slide is disabled under reduced-motion. Collapses to a floating panel on small screens.
- Props: `brand`, `items`, `ctaLabel`, `className`.

### Split Navbar — `NavbarSplit`
An editorial header with the wordmark centered and links split to either side.
Links carry an animated gradient underline on hover and `focus-visible` (pure CSS).
Collapses to a centered brand with a toggle menu.
- Props: `brand`, `leftItems`, `rightItems`, `ctaLabel`, `className`.

### App Navbar — `NavbarApp`
A product/dashboard top bar: brand, a workspace switcher menu, a keyboard-hinted
search field, primary nav, a notification button with an unread badge, and an
avatar profile menu. Both menus use an internal accessible `MenuButton`
(roving `tabIndex`, Arrow/Home/End, Tab-to-close, Escape returns focus to the
trigger, outside-click close); workspace items are `menuitemradio` with
`aria-checked`. The `⌘K` hint is `aria-hidden`.
- Props: `brand`, `items`, `workspaces`, `userName`, `notificationCount`, `className`.

### Drawer Navbar — `NavbarDrawer`
A minimal bar whose menu opens a premium slide-in drawer. The drawer is scoped to
the section (not a full-page portal) so it previews in context: it dims the page
with a backdrop, moves focus to its close button on open, returns focus to the
trigger on close, and closes on Escape or backdrop click. Link reveal staggers in
and degrades to a fade under reduced-motion.
- Props: `brand`, `items`, `secondaryItems`, `ctaLabel`, `className`.

### Sticky Navbar — `NavbarSticky`
A header that condenses as the page scrolls — gaining a glass background, border,
and shadow while its padding and logo tighten — with a gradient scroll-progress
line beneath. The block embeds a focusable, scrollable demo region so the effect
previews in place.
- Props: `brand`, `items`, `ctaLabel`, `className`.

### Command Navbar — `NavbarCommand`
A nav whose search opens an inline command palette. The palette is a `role="dialog"`
wrapping an accessible combobox (`input role="combobox"` + `ul role="listbox"` with
`role="option"` items). `⌘K`/`Ctrl-K` or the search button opens it; ↑/↓ move the
active option (`aria-activedescendant`), Enter selects, Escape closes and restores
focus to the trigger, and an outside click dismisses it. Results are grouped and
filtered live.
- Props: `brand`, `items`, `groups` (`{ label, items }`), `ctaLabel`, `className`.

### Sidebar Navbar — `NavbarSidebar`
A vertical navigation rail that collapses to an icon-only strip. A single highlight
glides between items (shared-layout `layoutId`, scoped with `useId`, disabled under
reduced-motion); labels stay in the accessibility tree as `sr-only` text plus a
`title` tooltip when collapsed, and items expose `aria-current`. A user chip sits at
the foot. The content pane beside it is demo scaffolding.
- Props: `brand`, `items` (`{ label, icon, badge? }`), `userName`, `userEmail`, `className`.

### Announcement Navbar — `NavbarAnnounce`
A two-tier header: a dismissible gradient announcement strip above the main nav.
Dismissing collapses the strip (height + fade, or a plain fade under reduced-motion)
and leaves the nav in place. The nav collapses to a toggle menu on small screens.
- Props: `brand`, `items`, `announcement`, `announcementCtaLabel`, `ctaLabel`, `signInLabel`, `className`.

### Commerce Navbar — `NavbarCommerce`
A two-row storefront header: brand, product search, account, and a cart button whose
badge reflects total quantity. The cart opens a mini-cart popover (`role="dialog"`)
with quantity steppers and remove controls; it moves focus to its close button on
open, restores focus to the trigger on close (and keeps focus inside the dialog after
a row is removed), and dismisses on Escape or outside click. The category bar
collapses on mobile.
- Props: `brand`, `categories`, `initialCart` (`{ id, name, price, qty }[]`), `className`.

### Auto-hide Navbar — `NavbarAutoHide`
A sticky header that slides away when scrolling down and reveals on the first
scroll up (always shown near the top), gaining a glass backdrop once scrolled.
Reacts to scroll *direction*, not just position. The block embeds a focusable
scroll region; under reduced-motion the bar never hides.
- Props: `brand`, `items`, `ctaLabel`, `className`.

### Segmented Navbar — `NavbarSegmented`
A full-width bar whose primary navigation is a segmented control: a single pill
slides behind the active item (shared-layout `layoutId`, scoped with `useId`,
disabled under reduced-motion). Each item is a tab with icon + label and
`aria-current`; collapses to a stacked menu on mobile.
- Props: `brand`, `items` (`{ label, icon, href? }`), `ctaLabel`, `className`.

### Docs Navbar — `NavbarDocs`
A documentation header: brand with an accessible version switcher
(`menuitemradio`, keyboard + Escape + outside-click), primary nav, a search
field, a self-contained theme toggle (`aria-pressed`; a local demo control that
does not change the page theme), and a "Star" count. Collapses to a toggle menu
on mobile.
- Props: `brand`, `items`, `versions`, `stars`, `className`.

### Bottom Tab Bar — `NavbarBottom`
A mobile app-style bottom tab bar with a raised center action. The active tab is
colored and carries a sliding indicator bar (shared-layout `layoutId`, scoped
with `useId`, disabled under reduced-motion); tabs expose `aria-current`. Shown
inside a phone-style frame for preview.
- Props: `brand`, `tabs` (`{ label, icon }`), `actionLabel`, `className`.

### Scrollspy Navbar — `NavbarScrollspy`
A one-page section navigation. An `IntersectionObserver` (scoped to the embedded
scroll region) tracks which section sits in the upper viewport band and marks its
link `aria-current` with a sliding underline; clicking a link smooth-scrolls to
that section (instant under reduced-motion). The scroll region is focusable.
- Props: `brand`, `sections` (`{ id, label, heading, body }`), `ctaLabel`, `className`.

### Multi-level Navbar — `NavbarMultiLevel`
A drill-down menu with nested submenus. Items with children push a new level that
slides in, with a back button and the current level's title; Escape steps back one
level then closes, an outside click closes, focus moves into the panel on open and
to the first item on each level change, and returns to the trigger on close. Level
transitions collapse to a fade under reduced-motion.
- Props: `brand`, `items` (`{ label, icon?, href?, children? }`), `ctaLabel`, `className`.

### Dashboard Navbar — `NavbarDashboard`
An application header with a breadcrumb trail (last crumb `aria-current="page"`),
a search and notification cluster, and a secondary tab row whose underline slides
to the active tab (shared-layout `layoutId`, scoped with `useId`, disabled under
reduced-motion). The tab row scrolls horizontally on small screens.
- Props: `brand`, `breadcrumb`, `tabs`, `userName`, `notificationCount`, `className`.

### Locale Navbar — `NavbarLocale`
A marketing bar with accessible language and currency switchers. Each switcher is
a single-select menu (`menuitemradio` + `aria-checked`) with full keyboard support
(Arrow/Home/End/Tab/Escape), outside-click close, and focus return to its trigger.
Collapses to a toggle menu (switchers included) on mobile.
- Props: `brand`, `items`, `languages`, `currencies` (`{ value, label, hint? }`), `ctaLabel`, `className`.

## Shared conventions
- **Client components** (`"use client"`) that compose only Lumen UI design tokens
  (`border-border`, `bg-surface`, `text-muted`, `from-brand`/`to-brand-2`, `brand-ink`, …).
- **Motion** via `motion/react`; every JS-driven animation is gated by
  `useReducedMotion()`, and CSS transitions inherit the global reduced-motion guard.
- **Accessibility**: semantic landmarks, `aria-current`/`aria-expanded`/`aria-controls`
  where applicable, full keyboard support for menus/dialogs/listboxes, visible
  `focus-visible` indicators, focus management with return-to-trigger, and
  `aria-hidden` on decorative glyphs and `kbd` hints.
- **Responsive**: each variant has a considered mobile treatment (toggle menu,
  floating panel, drawer, or collapsed rail).

## Verification
- `npm run build` — exit 0 (type-check + static generation of `/blocks`).
- `npm run lint` — 0 problems.
- `npm test` — registry test validates unique ids and that every `sourcePath` exists.
- Independent strict review of all ten components: **GO**.
