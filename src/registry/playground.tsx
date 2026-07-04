"use client";

import { Alert, type AlertVariant } from "@/components/ui/alert";
import { Avatar, type AvatarStatus } from "@/components/ui/avatar";
import { Badge, type BadgeTone, type BadgeVariant } from "@/components/ui/badge";
import { ChromaCard } from "@/components/ui/chroma-card";
import {
  DeviceMockup,
  type DeviceFrame,
  type DeviceVariant,
  type PhoneNotch,
} from "@/components/ui/device-mockup";
import { Globe } from "@/components/ui/globe";
import { InfiniteGallery } from "@/components/ui/infinite-gallery";
import {
  Preloader,
  type PreloaderBackdrop,
  type PreloaderReveal,
  type PreloaderVariant,
} from "@/components/ui/preloader";
import {
  SmoothCursor,
  type SmoothCursorVariant,
} from "@/components/ui/smooth-cursor";
import { SwipeCards } from "@/components/ui/swipe-cards";
import { BlurInText } from "@/components/text/blur-in-text";
import { BreathingText } from "@/components/text/breathing-text";
import { ClipDrawText } from "@/components/text/clip-draw-text";
import { ColorCycleText } from "@/components/text/color-cycle-text";
import { CountUp } from "@/components/text/count-up";
import { DecryptText } from "@/components/text/decrypt-text";
import { DigiClockText } from "@/components/text/digi-clock-text";
import { DualToneText } from "@/components/text/dual-tone-text";
import { ElasticText } from "@/components/text/elastic-text";
import { ExpandText } from "@/components/text/expand-text";
import { FireText } from "@/components/text/fire-text";
import { FlickerInText } from "@/components/text/flicker-in-text";
import { FlipText } from "@/components/text/flip-text";
import { FocusText } from "@/components/text/focus-text";
import { GhostText } from "@/components/text/ghost-text";
import { GlitchText } from "@/components/text/glitch-text";
import { GlowPulseText } from "@/components/text/glow-pulse-text";
import { GradientText } from "@/components/text/gradient-text";
import { GradientUnderline } from "@/components/text/gradient-underline";
import { GravityText } from "@/components/text/gravity-text";
import { HighlightText } from "@/components/text/highlight-text";
import { HolographicText } from "@/components/text/holographic-text";
import { KineticReveal } from "@/components/text/kinetic-reveal";
import { LettersPullUp } from "@/components/text/letters-pull-up";
import { LineReveal } from "@/components/text/line-reveal";
import { MagneticText } from "@/components/text/magnetic-text";
import { MorphingText } from "@/components/text/morphing-text";
import { NeonText } from "@/components/text/neon-text";
import { NumberTicker } from "@/components/text/number-ticker";
import { PerspectiveText } from "@/components/text/perspective-text";
import { PulseWaveText } from "@/components/text/pulse-wave-text";
import { RevolveText } from "@/components/text/revolve-text";
import { RippleText } from "@/components/text/ripple-text";
import { RisingText } from "@/components/text/rising-text";
import { RotatingText } from "@/components/text/rotating-text";
import { ScrollReveal } from "@/components/text/scroll-reveal";
import { ScatterText } from "@/components/text/scatter-text";
import { ScrambleText } from "@/components/text/scramble-text";
import { ShadowText } from "@/components/text/shadow-text";
import { ShakeText } from "@/components/text/shake-text";
import { ShatterText } from "@/components/text/shatter-text";
import { ShinyText } from "@/components/text/shiny-text";
import { SplitColorText } from "@/components/text/split-color-text";
import { SplitFlap } from "@/components/text/split-flap";
import { SplitReveal } from "@/components/text/split-reveal";
import { StaggeredFade } from "@/components/text/staggered-fade";
import { StripedText } from "@/components/text/striped-text";
import { SwapCascade } from "@/components/text/swap-cascade";
import { TextPressure } from "@/components/text/text-pressure";
import { TextReveal } from "@/components/text/text-reveal";
import { TickerText } from "@/components/text/ticker-text";
import { TrackingIn } from "@/components/text/tracking-in";
import { TwinkleText } from "@/components/text/twinkle-text";
import { Typewriter } from "@/components/text/typewriter";
import { UnderlineDraw } from "@/components/text/underline-draw";
import { WarpInText } from "@/components/text/warp-in-text";
import { WavyText } from "@/components/text/wavy-text";
import { ZoomBlurText } from "@/components/text/zoom-blur-text";
import { Kbd } from "@/components/ui/kbd";
import { NumberInput } from "@/components/ui/number-input";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Rating } from "@/components/ui/rating";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Spinner, type SpinnerSize } from "@/components/ui/spinner";
import { StatCard } from "@/components/ui/stat-card";
import { Switch } from "@/components/ui/switch";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";
import { AuroraCurtains } from "@/components/backgrounds/aurora-curtains";
import { AuroraRibbons } from "@/components/backgrounds/aurora-ribbons";
import { Boids } from "@/components/backgrounds/boids";
import { Bokeh } from "@/components/backgrounds/bokeh";
import { Bubbles } from "@/components/backgrounds/bubbles";
import { Caustics } from "@/components/backgrounds/caustics";
import { Cells } from "@/components/backgrounds/cells";
import { ClothFlag } from "@/components/backgrounds/cloth-flag";
import { Comets } from "@/components/backgrounds/comets";
import { Confetti } from "@/components/backgrounds/confetti";
import { DataStream } from "@/components/backgrounds/data-stream";
import { DnaHelix } from "@/components/backgrounds/dna-helix";
import { DotMatrix } from "@/components/backgrounds/dot-matrix";
import { Embers } from "@/components/backgrounds/embers";
import { Equalizer } from "@/components/backgrounds/equalizer";
import { Ferrofluid } from "@/components/backgrounds/ferrofluid";
import { Silk } from "@/components/backgrounds/silk";
import { Squares } from "@/components/backgrounds/squares";
import { LetterGlitch } from "@/components/backgrounds/letter-glitch";
import { Ballpit } from "@/components/backgrounds/ballpit";
import { Fireflies } from "@/components/backgrounds/fireflies";
import { Fireworks } from "@/components/backgrounds/fireworks";
import { FlowField } from "@/components/backgrounds/flow-field";
import { FlowGrid } from "@/components/backgrounds/flow-grid";
import { FlowingLines } from "@/components/backgrounds/flowing-lines";
import { GodRays } from "@/components/backgrounds/god-rays";
import { GridBeams } from "@/components/backgrounds/grid-beams";
import { Halftone } from "@/components/backgrounds/halftone";
import { HexGrid } from "@/components/backgrounds/hex-grid";
import { InkDrops } from "@/components/backgrounds/ink-drops";
import { Kaleidoscope } from "@/components/backgrounds/kaleidoscope";
import { LightBeams } from "@/components/backgrounds/light-beams";
import { Lightning } from "@/components/backgrounds/lightning";
import { LiquidBlob } from "@/components/backgrounds/liquid-blob";
import { MagneticField } from "@/components/backgrounds/magnetic-field";
import { MatrixRain } from "@/components/backgrounds/matrix-rain";
import { MeshWave } from "@/components/backgrounds/mesh-wave";
import { Metaballs } from "@/components/backgrounds/metaballs";
import { Meteors } from "@/components/backgrounds/meteors";
import { NeonTunnel } from "@/components/backgrounds/neon-tunnel";
import { OrbitingDots } from "@/components/backgrounds/orbiting-dots";
import { Oscilloscope } from "@/components/backgrounds/oscilloscope";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { PerlinClouds } from "@/components/backgrounds/perlin-clouds";
import { Pinwheel } from "@/components/backgrounds/pinwheel";
import { Plexus } from "@/components/backgrounds/plexus";
import { PulseRings } from "@/components/backgrounds/pulse-rings";
import { RadarSweep } from "@/components/backgrounds/radar-sweep";
import { Rain } from "@/components/backgrounds/rain";
import { Scanlines } from "@/components/backgrounds/scanlines";
import { Smoke } from "@/components/backgrounds/smoke";
import { Snowfall } from "@/components/backgrounds/snowfall";
import { Sparkles } from "@/components/backgrounds/sparkles";
import { SpiralGalaxy } from "@/components/backgrounds/spiral-galaxy";
import { SpotlightCursor } from "@/components/backgrounds/spotlight-cursor";
import { Starfield } from "@/components/backgrounds/starfield";
import { TopographicLines } from "@/components/backgrounds/topographic-lines";
import { Triangles } from "@/components/backgrounds/triangles";
import { TronTrails } from "@/components/backgrounds/tron-trails";
import { VoronoiFill } from "@/components/backgrounds/voronoi-fill";
import { Vortex } from "@/components/backgrounds/vortex";
import { WarpStars } from "@/components/backgrounds/warp-stars";
import { WaveInterference } from "@/components/backgrounds/wave-interference";
import { Waves } from "@/components/backgrounds/waves";
import type {
  ControlValue,
  PlaygroundSpec,
  PlaygroundValues,
} from "@/registry/types";

/* Small typed accessors so render functions stay terse. */
const n = (v: PlaygroundValues, k: string) => Number(v[k]);
const s = (v: PlaygroundValues, k: string) => String(v[k]);
const bool = (v: PlaygroundValues, k: string) => Boolean(v[k]);

/** Convert "#rrggbb" to an "r,g,b" triplet for the canvas backgrounds. */
function hexRgb(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "139,160,255";
  const int = parseInt(m[1], 16);
  return `${(int >> 16) & 255},${(int >> 8) & 255},${int & 255}`;
}

/* ------------------- Usage-snippet emission shorthands -------------------
 * `code` metadata consumed by `buildUsage` (src/lib/playground.ts): how each
 * control maps into the generated live Usage snippet.
 */

/** The control value is the element's children, not an attribute. */
const asChildren = { children: true } as const;

/** Hex color control that the component consumes as an "r,g,b" triplet. */
const rgb = {
  format: (value: ControlValue) => hexRgb(String(value)),
} as const;

const splitList = (value: ControlValue) =>
  String(value)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

/** Comma-separated text control emitted as a `string[]` attribute. */
const list = (prop: string) =>
  ({
    prop,
    format: (value: ControlValue) => ({
      raw: `{[${splitList(value)
        .map((part) => JSON.stringify(part))
        .join(", ")}]}`,
    }),
  }) as const;

/** "#rrggbb" -> "r, g, b" for `[number, number, number]` tuple props. */
const hexTuple = (hex: string) => hexRgb(hex).split(",").join(", ");

const SIZE_OPTIONS = [
  { label: "sm", value: "sm" },
  { label: "md", value: "md" },
  { label: "lg", value: "lg" },
] as const;

/**
 * Per-component playground specs, keyed by registry `id`. This is a client
 * module: each `render` is a function (closures over the live control values),
 * which is why it cannot live in the server-imported registry. Components
 * without an entry still get the viewport / refresh / resize / Code tooling on
 * the detail page — they just have no live Customize options yet.
 */
export const playgrounds: Record<string, PlaygroundSpec> = {
  /* ----------------------------- Components ----------------------------- */
  badge: {
    controls: [
      { type: "text", key: "text", label: "Label", default: "Badge", code: asChildren },
      {
        type: "select",
        key: "variant",
        label: "Variant",
        default: "soft",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Soft", value: "soft" },
          { label: "Outline", value: "outline" },
        ],
      },
      {
        type: "select",
        key: "tone",
        label: "Tone",
        default: "brand",
        variant: "select",
        options: [
          { label: "Brand", value: "brand" },
          { label: "Neutral", value: "neutral" },
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Danger", value: "danger" },
        ],
      },
      { type: "boolean", key: "dot", label: "Status dot", default: false },
    ],
    render: (v) => (
      <Badge
        variant={s(v, "variant") as BadgeVariant}
        tone={s(v, "tone") as BadgeTone}
        dot={bool(v, "dot")}
      >
        {s(v, "text") || "Badge"}
      </Badge>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Badge label content." },
      { name: "variant", type: '"solid" | "soft" | "outline"', default: '"soft"', description: "Visual style." },
      { name: "tone", type: '"brand" | "neutral" | "success" | "warning" | "danger"', default: '"brand"', description: "Semantic color." },
      { name: "dot", type: "boolean", default: "false", description: "Show a leading status dot tinted to the tone." },
      { name: "className", type: "string", description: "Extra classes for the badge." },
    ],
  },

  alert: {
    controls: [
      {
        type: "select",
        key: "variant",
        label: "Variant",
        default: "success",
        options: [
          { label: "Info", value: "info" },
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Danger", value: "danger" },
        ],
      },
      { type: "text", key: "title", label: "Title", default: "Payment received" },
      { type: "text", key: "body", label: "Body", default: "Your invoice has been paid in full.", code: asChildren },
      { type: "boolean", key: "dismissible", label: "Dismissible", default: true },
    ],
    usage: { extra: 'className="w-80"' },
    render: (v) => (
      <Alert
        className="w-80"
        variant={s(v, "variant") as AlertVariant}
        title={s(v, "title") || undefined}
        dismissible={bool(v, "dismissible")}
      >
        {s(v, "body")}
      </Alert>
    ),
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "Semantic style + icon; danger announces assertively." },
      { name: "title", type: "ReactNode", description: "Bold heading line." },
      { name: "children", type: "ReactNode", description: "Body content." },
      { name: "dismissible", type: "boolean", default: "false", description: "Render a close button that animates the alert out." },
      { name: "onDismiss", type: "() => void", description: "Called after the alert is dismissed." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  spinner: {
    controls: [
      { type: "select", key: "size", label: "Size", default: "md", options: [...SIZE_OPTIONS] },
      { type: "text", key: "label", label: "Label", default: "Loading…", placeholder: "(screen-reader only)" },
    ],
    render: (v) => (
      <Spinner size={s(v, "size") as SpinnerSize} label={s(v, "label") || undefined} />
    ),
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Ring size." },
      { name: "label", type: "string", description: 'Optional visible text; otherwise an sr-only "Loading…" is announced.' },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  switch: {
    controls: [
      { type: "boolean", key: "checked", label: "Checked", default: true, code: { prop: "defaultChecked" } },
      { type: "boolean", key: "disabled", label: "Disabled", default: false },
      { type: "text", key: "label", label: "Accessible label", default: "Enable notifications" },
    ],
    render: (v) => (
      <Switch
        defaultChecked={bool(v, "checked")}
        disabled={bool(v, "disabled")}
        label={s(v, "label")}
      />
    ),
    props: [
      { name: "checked", type: "boolean", description: "Controlled on/off state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Fired on toggle." },
      { name: "disabled", type: "boolean", default: "false", description: "Disable interaction." },
      { name: "label", type: "string", description: "Accessible label (aria-label)." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  slider: {
    controls: [
      { type: "number", key: "value", label: "Default value", min: 0, max: 100, default: 60, code: { prop: "defaultValue" } },
      { type: "number", key: "min", label: "Min", min: 0, max: 50, default: 0, variant: "stepper" },
      { type: "number", key: "max", label: "Max", min: 50, max: 200, default: 100, variant: "stepper" },
      { type: "number", key: "step", label: "Step", min: 1, max: 25, default: 1, variant: "stepper" },
    ],
    usage: { extra: 'aria-label="Value" className="w-64"' },
    render: (v) => (
      <Slider
        aria-label="Value"
        className="w-64"
        defaultValue={n(v, "value")}
        min={n(v, "min")}
        max={n(v, "max")}
        step={n(v, "step")}
      />
    ),
    props: [
      { name: "min", type: "number", default: "0", description: "Lower bound." },
      { name: "max", type: "number", default: "100", description: "Upper bound." },
      { name: "step", type: "number", default: "1", description: "Increment for drag + keyboard." },
      { name: "value", type: "number", description: "Controlled value." },
      { name: "defaultValue", type: "number", default: "50", description: "Initial value when uncontrolled." },
      { name: "onValueChange", type: "(value: number) => void", description: "Fired as the value changes." },
      { name: "className", type: "string", description: "Extra classes (e.g. width)." },
    ],
  },

  "progress-ring": {
    controls: [
      { type: "number", key: "value", label: "Value", min: 0, max: 100, unit: "%", default: 72 },
      { type: "number", key: "size", label: "Size", min: 64, max: 240, step: 4, unit: "px", default: 120 },
      { type: "number", key: "stroke", label: "Stroke", min: 4, max: 24, unit: "px", default: 10 },
    ],
    render: (v) => (
      <ProgressRing value={n(v, "value")} size={n(v, "size")} stroke={n(v, "stroke")} />
    ),
    props: [
      { name: "value", type: "number", default: "72", description: "Target percentage (0–100). Eases up on view." },
      { name: "size", type: "number", default: "120", description: "Diameter in pixels." },
      { name: "stroke", type: "number", default: "10", description: "Ring thickness in pixels." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "progress-bar": {
    controls: [
      { type: "number", key: "value", label: "Value", min: 0, max: 100, unit: "%", default: 68 },
      { type: "text", key: "label", label: "Label", default: "Storage" },
      { type: "boolean", key: "showValue", label: "Show value", default: true },
    ],
    usage: { extra: 'className="w-72"' },
    render: (v) => (
      <ProgressBar
        className="w-72"
        value={n(v, "value")}
        label={s(v, "label") || undefined}
        showValue={bool(v, "showValue")}
      />
    ),
    props: [
      { name: "value", type: "number", required: true, description: "Target value (0–100). Fills on view." },
      { name: "label", type: "string", description: "Optional caption above the bar." },
      { name: "showValue", type: "boolean", default: "true", description: "Show the percentage readout." },
      { name: "className", type: "string", description: "Extra classes (e.g. width)." },
    ],
  },

  rating: {
    controls: [
      { type: "number", key: "max", label: "Max stars", min: 3, max: 10, default: 5, variant: "stepper" },
      { type: "number", key: "value", label: "Default value", min: 0, max: 10, default: 3, variant: "stepper", code: { prop: "defaultValue" } },
    ],
    render: (v) => <Rating max={n(v, "max")} defaultValue={n(v, "value")} />,
    props: [
      { name: "max", type: "number", default: "5", description: "Number of stars." },
      { name: "defaultValue", type: "number", default: "0", description: "Initial rating." },
      { name: "onChange", type: "(value: number) => void", description: "Fired when the rating changes." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  avatar: {
    controls: [
      { type: "text", key: "name", label: "Name", default: "Mara Vance" },
      { type: "select", key: "size", label: "Size", default: "lg", options: [...SIZE_OPTIONS] },
      {
        type: "select",
        key: "status",
        label: "Status",
        default: "online",
        variant: "select",
        code: { omitWhen: "none" },
        options: [
          { label: "None", value: "none" },
          { label: "Online", value: "online" },
          { label: "Offline", value: "offline" },
          { label: "Busy", value: "busy" },
          { label: "Away", value: "away" },
        ],
      },
    ],
    render: (v) => {
      const status = s(v, "status");
      return (
        <Avatar
          name={s(v, "name") || "Mara Vance"}
          size={s(v, "size") as "sm" | "md" | "lg"}
          status={status === "none" ? undefined : (status as AvatarStatus)}
        />
      );
    },
    props: [
      { name: "name", type: "string", required: true, description: "Display name — used for the label and initials fallback." },
      { name: "src", type: "string", description: "Image URL; falls back to initials on error." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Avatar size." },
      { name: "status", type: '"online" | "offline" | "busy" | "away"', description: "Optional status dot." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  separator: {
    controls: [
      {
        type: "select",
        key: "orientation",
        label: "Orientation",
        default: "horizontal",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
      },
      { type: "text", key: "label", label: "Label (horizontal)", default: "OR" },
    ],
    usage: {
      element: (v) =>
        s(v, "orientation") === "vertical"
          ? '<Separator orientation="vertical" className="h-12" />'
          : `<Separator${s(v, "label") ? ` label=${JSON.stringify(s(v, "label"))}` : ""} />`,
    },
    render: (v) => {
      const orientation = s(v, "orientation") as "horizontal" | "vertical";
      if (orientation === "vertical") {
        return (
          <div className="flex h-24 items-center gap-4 text-sm text-muted">
            <span>Email</span>
            <Separator orientation="vertical" className="h-12" />
            <span>SMS</span>
          </div>
        );
      }
      return (
        <div className="w-72">
          <Separator label={s(v, "label") || undefined} />
        </div>
      );
    },
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Divider direction." },
      { name: "label", type: "ReactNode", description: "Optional centered label (horizontal only)." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "segmented-control": {
    controls: [
      {
        type: "text",
        key: "options",
        label: "Options (comma-separated)",
        default: "Day, Week, Month",
        hint: "The first option is selected by default.",
        code: list("options"),
      },
    ],
    render: (v) => {
      const opts = s(v, "options")
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
      const options = opts.length ? opts : ["Day"];
      return <SegmentedControl options={options} defaultValue={options[0]} />;
    },
    props: [
      { name: "options", type: "string[]", required: true, description: "The selectable options." },
      { name: "value", type: "string", description: "Controlled selected option." },
      { name: "defaultValue", type: "string", default: "options[0]", description: "Initial selection when uncontrolled." },
      { name: "onValueChange", type: "(value: string) => void", description: "Fired on selection." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "stat-card": {
    controls: [
      { type: "text", key: "label", label: "Label", default: "Revenue" },
      { type: "text", key: "value", label: "Value", default: "$48.2k" },
      { type: "number", key: "delta", label: "Delta", min: -100, max: 100, unit: "%", default: 12 },
      { type: "text", key: "hint", label: "Hint", default: "vs last week" },
    ],
    usage: { extra: "data={[8, 12, 9, 15, 13, 19, 17, 24]}" },
    render: (v) => (
      <StatCard
        label={s(v, "label")}
        value={s(v, "value")}
        delta={n(v, "delta")}
        hint={s(v, "hint") || undefined}
        data={[8, 12, 9, 15, 13, 19, 17, 24]}
      />
    ),
    props: [
      { name: "label", type: "string", required: true, description: "Metric name." },
      { name: "value", type: "ReactNode", required: true, description: "The prominent value." },
      { name: "delta", type: "number", description: "Period-over-period % change; sign drives arrow + color." },
      { name: "hint", type: "string", description: 'Small qualifier, e.g. "vs last week".' },
      { name: "data", type: "number[]", description: "Sparkline series, animated on view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  kbd: {
    controls: [
      { type: "text", key: "keys", label: "Keys (comma-separated)", default: "⌘, K", code: list("keys") },
    ],
    render: (v) => {
      const keys = s(v, "keys")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      return <Kbd keys={keys.length ? keys : ["⌘", "K"]} />;
    },
    props: [
      { name: "keys", type: "string[]", required: true, description: 'Keys to render, e.g. ["⌘", "K"].' },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "number-input": {
    controls: [
      { type: "number", key: "value", label: "Default value", min: 0, max: 100, default: 2, variant: "stepper", code: { prop: "defaultValue" } },
      { type: "number", key: "min", label: "Min", min: 0, max: 50, default: 0, variant: "stepper" },
      { type: "number", key: "max", label: "Max", min: 1, max: 100, default: 10, variant: "stepper" },
      { type: "number", key: "step", label: "Step", min: 1, max: 10, default: 1, variant: "stepper" },
    ],
    usage: { extra: 'aria-label="Quantity"' },
    render: (v) => (
      <NumberInput
        aria-label="Quantity"
        defaultValue={n(v, "value")}
        min={n(v, "min")}
        max={n(v, "max")}
        step={n(v, "step")}
      />
    ),
    props: [
      { name: "value", type: "number", description: "Controlled value." },
      { name: "defaultValue", type: "number", default: "0", description: "Initial value when uncontrolled." },
      { name: "min", type: "number", default: "-Infinity", description: "Lower clamp." },
      { name: "max", type: "number", default: "Infinity", description: "Upper clamp." },
      { name: "step", type: "number", default: "1", description: "Increment for −/+ and arrows." },
      { name: "onValueChange", type: "(value: number) => void", description: "Fired on change." },
    ],
  },

  /* ------------------------------- Text -------------------------------- */
  "gradient-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Gradient text", code: asChildren },
      { type: "number", key: "speed", label: "Speed", min: 2, max: 20, unit: "s", default: 8 },
    ],
    usage: { extra: 'className="text-4xl font-bold"' },
    render: (v) => (
      <GradientText speed={n(v, "speed")} className="text-4xl font-bold">
        {s(v, "text") || "Gradient text"}
      </GradientText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Text to fill with the gradient." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Gradient stops, left to right (CSS colors)." },
      { name: "speed", type: "number", default: "8", description: "Animation duration in seconds." },
      { name: "className", type: "string", description: "Extra classes (size, weight, …)." },
    ],
  },

  "shiny-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Shiny text", code: asChildren },
      { type: "number", key: "speed", label: "Speed", min: 1, max: 10, unit: "s", default: 3 },
    ],
    usage: { extra: 'className="text-4xl font-bold"' },
    render: (v) => (
      <ShinyText speed={n(v, "speed")} className="text-4xl font-bold">
        {s(v, "text") || "Shiny text"}
      </ShinyText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Text to sweep the glare across." },
      { name: "speed", type: "number", default: "3", description: "Sweep duration in seconds." },
      { name: "className", type: "string", description: "Extra classes (size, weight, …)." },
    ],
  },

  typewriter: {
    controls: [
      { type: "number", key: "typingSpeed", label: "Typing speed", min: 20, max: 200, unit: "ms", default: 70 },
      { type: "number", key: "deletingSpeed", label: "Deleting speed", min: 10, max: 150, unit: "ms", default: 38 },
      { type: "number", key: "pauseTime", label: "Pause", min: 300, max: 3000, step: 100, unit: "ms", default: 1400 },
      { type: "boolean", key: "loop", label: "Loop", default: true },
    ],
    usage: {
      extra:
        'words={["build interfaces", "ship faster", "delight users"]} className="text-3xl font-semibold"',
    },
    render: (v) => (
      <Typewriter
        className="text-3xl font-semibold"
        words={["build interfaces", "ship faster", "delight users"]}
        typingSpeed={n(v, "typingSpeed")}
        deletingSpeed={n(v, "deletingSpeed")}
        pauseTime={n(v, "pauseTime")}
        loop={bool(v, "loop")}
      />
    ),
    props: [
      { name: "words", type: "string[]", required: true, description: "Phrases to cycle through." },
      { name: "typingSpeed", type: "number", default: "70", description: "Per-character typing delay (ms)." },
      { name: "deletingSpeed", type: "number", default: "38", description: "Per-character deleting delay (ms)." },
      { name: "pauseTime", type: "number", default: "1400", description: "Pause once a word is fully typed (ms)." },
      { name: "loop", type: "boolean", default: "true", description: "Loop back to the first word." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "count-up": {
    controls: [
      { type: "number", key: "to", label: "To", min: 0, max: 100000, step: 100, default: 1234, variant: "stepper" },
      { type: "number", key: "duration", label: "Duration", min: 0.2, max: 6, step: 0.2, unit: "s", default: 1.6 },
      { type: "number", key: "decimals", label: "Decimals", min: 0, max: 3, default: 0, variant: "stepper" },
      { type: "text", key: "prefix", label: "Prefix", default: "", placeholder: "e.g. $" },
      { type: "text", key: "suffix", label: "Suffix", default: "", placeholder: "e.g. +" },
      { type: "boolean", key: "separator", label: "Thousands separator", default: true },
    ],
    render: (v) => (
      <CountUp
        className="text-5xl font-bold"
        to={n(v, "to")}
        duration={n(v, "duration")}
        decimals={n(v, "decimals")}
        prefix={s(v, "prefix")}
        suffix={s(v, "suffix")}
        separator={bool(v, "separator")}
      />
    ),
    props: [
      { name: "to", type: "number", required: true, description: "Target value." },
      { name: "from", type: "number", default: "0", description: "Starting value." },
      { name: "duration", type: "number", default: "1.6", description: "Tween duration in seconds." },
      { name: "decimals", type: "number", default: "0", description: "Decimal places." },
      { name: "prefix", type: "string", description: 'Leading string, e.g. "$".' },
      { name: "suffix", type: "string", description: 'Trailing string, e.g. "+".' },
      { name: "separator", type: "boolean", default: "true", description: "Group thousands with commas." },
    ],
  },

  "split-reveal": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Reveal word by word" },
      {
        type: "select",
        key: "by",
        label: "Split by",
        default: "word",
        options: [
          { label: "Word", value: "word" },
          { label: "Character", value: "char" },
        ],
      },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.08 },
    ],
    render: (v) => (
      <SplitReveal
        key={`${s(v, "by")}:${n(v, "stagger")}`}
        text={s(v, "text") || "Reveal word by word"}
        by={s(v, "by") as "word" | "char"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to reveal." },
      { name: "by", type: '"word" | "char"', default: '"word"', description: "Split granularity." },
      { name: "stagger", type: "number", default: "0.08", description: "Seconds between each token." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first token (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "blur-in-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Focus, word by word" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.3, step: 0.01, unit: "s", default: 0.09 },
    ],
    render: (v) => (
      <BlurInText
        key={n(v, "stagger")}
        text={s(v, "text") || "Focus, word by word"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to reveal." },
      { name: "stagger", type: "number", default: "0.09", description: "Seconds between each word." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first word (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "flip-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Flip into view" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.04 },
    ],
    render: (v) => (
      <FlipText
        key={n(v, "stagger")}
        text={s(v, "text") || "Flip into view"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to flip in." },
      { name: "stagger", type: "number", default: "0.04", description: "Seconds between each character." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "letters-pull-up": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Letter by letter" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.04 },
    ],
    render: (v) => (
      <LettersPullUp
        key={n(v, "stagger")}
        text={s(v, "text") || "Letter by letter"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to pull up." },
      { name: "stagger", type: "number", default: "0.04", description: "Seconds between each letter." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first letter (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "text-reveal": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Wiped into view", code: asChildren },
      {
        type: "select",
        key: "direction",
        label: "Direction",
        default: "left",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Up", value: "up" },
          { label: "Down", value: "down" },
        ],
      },
      { type: "number", key: "duration", label: "Duration", min: 0.3, max: 2.5, step: 0.1, unit: "s", default: 0.9 },
    ],
    usage: { extra: 'className="text-4xl font-bold"' },
    render: (v) => (
      <TextReveal
        key={`${s(v, "direction")}:${n(v, "duration")}`}
        direction={s(v, "direction") as "left" | "right" | "up" | "down"}
        duration={n(v, "duration")}
        className="text-4xl font-bold"
      >
        {s(v, "text") || "Wiped into view"}
      </TextReveal>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to wipe in." },
      { name: "direction", type: '"left" | "right" | "up" | "down"', default: '"left"', description: "Direction the wipe travels from." },
      { name: "duration", type: "number", default: "0.9", description: "Wipe duration in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before the wipe (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "line-reveal": {
    controls: [
      { type: "text", key: "line1", label: "Line 1", default: "Designed in lines," },
      { type: "text", key: "line2", label: "Line 2", default: "revealed in sequence." },
      { type: "number", key: "stagger", label: "Stagger", min: 0.05, max: 0.5, step: 0.05, unit: "s", default: 0.15 },
    ],
    usage: {
      element: (v) =>
        `<LineReveal\n  lines={[${JSON.stringify(s(v, "line1"))}, ${JSON.stringify(s(v, "line2"))}]}\n  stagger={${n(v, "stagger")}}\n  className="text-4xl font-bold"\n/>`,
    },
    render: (v) => (
      <LineReveal
        key={n(v, "stagger")}
        lines={[s(v, "line1") || "Designed in lines,", s(v, "line2") || "revealed in sequence."]}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "lines", type: "string[]", required: true, description: "Each string is one line, revealed in sequence." },
      { name: "stagger", type: "number", default: "0.15", description: "Seconds between each line." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first line (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "tracking-in": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Tracking in", code: asChildren },
      { type: "number", key: "duration", label: "Duration", min: 0.4, max: 3, step: 0.1, unit: "s", default: 1 },
    ],
    usage: { extra: 'className="text-4xl font-bold"' },
    render: (v) => (
      <TrackingIn key={n(v, "duration")} duration={n(v, "duration")} className="text-4xl font-bold">
        {s(v, "text") || "Tracking in"}
      </TrackingIn>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to track in." },
      { name: "duration", type: "number", default: "1", description: "Animation duration in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before it starts (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "scroll-reveal": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Each word lights up as you scroll." },
    ],
    render: (v) => (
      <ScrollReveal text={s(v, "text") || "Each word lights up as you scroll."} className="text-center" />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The paragraph whose words light up on scroll." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "decrypt-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "DECRYPTING SIGNAL" },
      { type: "number", key: "speed", label: "Speed", min: 10, max: 120, step: 5, unit: "ms", default: 40 },
      { type: "boolean", key: "sequential", label: "Sequential", default: false },
      {
        type: "select",
        key: "trigger",
        label: "Trigger",
        default: "view",
        options: [
          { label: "On view", value: "view" },
          { label: "On hover", value: "hover" },
          { label: "On mount", value: "mount" },
        ],
      },
    ],
    render: (v) => (
      <DecryptText
        key={`${n(v, "speed")}:${bool(v, "sequential")}:${s(v, "trigger")}`}
        text={s(v, "text") || "DECRYPTING SIGNAL"}
        speed={n(v, "speed")}
        sequential={bool(v, "sequential")}
        trigger={s(v, "trigger") as "view" | "hover" | "mount"}
        className="font-mono text-3xl font-semibold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to decrypt to." },
      { name: "glyphs", type: "string", default: "A–Z 0–9 symbols", description: "Glyph pool shown while encrypted." },
      { name: "speed", type: "number", default: "40", description: "Milliseconds per reveal step." },
      { name: "sequential", type: "boolean", default: "false", description: "Reveal left-to-right instead of scattered." },
      { name: "trigger", type: '"view" | "hover" | "mount"', default: '"view"', description: "What starts the effect." },
    ],
  },

  "rotating-text": {
    controls: [
      { type: "text", key: "words", label: "Words (comma-separated)", default: "designers, developers, founders", code: list("words") },
      { type: "number", key: "interval", label: "Interval", min: 800, max: 4000, step: 100, unit: "ms", default: 2200 },
    ],
    render: (v) => {
      const words = s(v, "words").split(",").map((w) => w.trim()).filter(Boolean);
      return (
        <div className="text-3xl font-semibold">
          Made for{" "}
          <RotatingText
            key={n(v, "interval")}
            words={words.length ? words : ["designers"]}
            interval={n(v, "interval")}
            className="text-brand-ink"
          />
        </div>
      );
    },
    props: [
      { name: "words", type: "string[]", required: true, description: "Words to rotate through." },
      { name: "interval", type: "number", default: "2200", description: "Milliseconds each word is shown." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "scramble-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "DECODE / ON / HOVER" },
      { type: "number", key: "speed", label: "Speed", min: 10, max: 120, step: 5, unit: "ms", default: 40 },
      {
        type: "select",
        key: "trigger",
        label: "Trigger",
        default: "hover",
        options: [
          { label: "On view", value: "view" },
          { label: "On hover", value: "hover" },
          { label: "On mount", value: "mount" },
        ],
      },
    ],
    render: (v) => (
      <ScrambleText
        key={`${n(v, "speed")}:${s(v, "trigger")}`}
        text={s(v, "text") || "DECODE / ON / HOVER"}
        speed={n(v, "speed")}
        trigger={s(v, "trigger") as "view" | "hover" | "mount"}
        className="cursor-default font-mono text-3xl font-semibold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "Target text to decode to." },
      { name: "glyphs", type: "string", default: "A–Z 0–9 symbols", description: "Glyph pool used while scrambling." },
      { name: "speed", type: "number", default: "40", description: "Milliseconds per animation step." },
      { name: "framesPerChar", type: "number", description: "Frames each character stays scrambled before locking." },
      { name: "trigger", type: '"view" | "hover" | "mount"', default: '"hover"', description: "What starts the effect." },
    ],
  },

  "focus-text": {
    controls: [
      { type: "text", key: "words", label: "Words (comma-separated)", default: "Design, Build, Ship, Repeat", code: list("words") },
      { type: "number", key: "interval", label: "Interval", min: 600, max: 3000, step: 100, unit: "ms", default: 1500 },
    ],
    render: (v) => {
      const words = s(v, "words").split(",").map((w) => w.trim()).filter(Boolean);
      return (
        <FocusText
          key={n(v, "interval")}
          words={words.length ? words : ["Design"]}
          interval={n(v, "interval")}
          className="text-4xl font-bold"
        />
      );
    },
    props: [
      { name: "words", type: "string[]", required: true, description: "Words that read as a phrase." },
      { name: "interval", type: "number", default: "1500", description: "Milliseconds each word stays in focus." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "glitch-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "GLITCH" },
    ],
    render: (v) => (
      <GlitchText text={s(v, "text") || "GLITCH"} className="text-5xl font-bold" />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to glitch." },
      { name: "className", type: "string", description: "Extra classes (size, weight, …)." },
    ],
  },

  "wavy-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "riding the wave" },
      { type: "number", key: "duration", label: "Duration", min: 0.8, max: 4, step: 0.1, unit: "s", default: 1.8 },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.06 },
    ],
    render: (v) => (
      <WavyText
        key={`${n(v, "duration")}:${n(v, "stagger")}`}
        text={s(v, "text") || "riding the wave"}
        duration={n(v, "duration")}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "duration", type: "number", default: "1.8", description: "Seconds for one full bob cycle." },
      { name: "stagger", type: "number", default: "0.06", description: "Seconds of delay added per letter." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "highlight-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "highlight", code: asChildren },
      { type: "color", key: "color", label: "Marker color", default: "#c4b5fd" },
      { type: "number", key: "delay", label: "Delay", min: 0, max: 2, step: 0.1, unit: "s", default: 0.1 },
    ],
    render: (v) => (
      <div className="text-4xl font-bold">
        Notice the{" "}
        <HighlightText key={`${s(v, "color")}:${n(v, "delay")}`} color={s(v, "color")} delay={n(v, "delay")}>
          {s(v, "text") || "highlight"}
        </HighlightText>
      </div>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to highlight." },
      { name: "color", type: "string", default: "brand tint", description: "Marker color (CSS color)." },
      { name: "delay", type: "number", default: "0", description: "Delay before the sweep (seconds)." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "gradient-underline": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Hover this link", code: asChildren },
    ],
    usage: { extra: 'href="#" className="text-3xl"' },
    render: (v) => (
      <GradientUnderline href="#" className="text-3xl">
        {s(v, "text") || "Hover this link"}
      </GradientUnderline>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The link content." },
      { name: "href", type: "string", description: "Anchor destination (standard anchor props supported)." },
      { name: "className", type: "string", description: "Extra classes (size, weight, …)." },
    ],
  },

  "number-ticker": {
    controls: [
      { type: "number", key: "value", label: "Value", min: 0, max: 1000000, step: 1000, default: 102938, variant: "stepper" },
    ],
    render: (v) => (
      <NumberTicker value={n(v, "value")} className="text-5xl font-bold" />
    ),
    props: [
      { name: "value", type: "number", required: true, description: "Target value; digits roll to it on view." },
      { name: "className", type: "string", description: "Extra classes (size, weight, …)." },
    ],
  },

  "text-pressure": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Hover the pressure" },
      { type: "number", key: "radius", label: "Radius", min: 60, max: 260, step: 10, unit: "px", default: 130 },
      { type: "number", key: "maxScale", label: "Max scale", min: 0.2, max: 1.5, step: 0.1, default: 0.6 },
    ],
    render: (v) => (
      <TextPressure
        text={s(v, "text") || "Hover the pressure"}
        radius={n(v, "radius")}
        maxScale={n(v, "maxScale")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "radius", type: "number", default: "130", description: "Pixel radius of influence around the pointer." },
      { name: "maxScale", type: "number", default: "0.6", description: "Maximum extra scale applied to the closest letter." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "underline-draw": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "important", code: asChildren },
      { type: "number", key: "duration", label: "Duration", min: 0.3, max: 2.5, step: 0.1, unit: "s", default: 0.8 },
    ],
    render: (v) => (
      <div className="text-4xl font-bold">
        The{" "}
        <UnderlineDraw key={n(v, "duration")} duration={n(v, "duration")}>
          {s(v, "text") || "important"}
        </UnderlineDraw>{" "}
        part
      </div>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to underline." },
      { name: "duration", type: "number", default: "0.8", description: "Draw duration in seconds." },
      { name: "delay", type: "number", default: "0", description: "Delay before the draw (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "neon-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "NEON" },
      { type: "color", key: "color", label: "Glow color", default: "#22d3ee" },
      { type: "number", key: "flicker", label: "Flicker", min: 0, max: 1, step: 0.1, default: 0.3 },
    ],
    render: (v) => (
      <NeonText
        key={s(v, "color") + ":" + n(v, "flicker")}
        text={s(v, "text") || "NEON"}
        color={s(v, "color")}
        flicker={n(v, "flicker")}
        className="text-5xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The sign text." },
      { name: "color", type: "string", default: '"var(--brand-2)"', description: "Glow color." },
      { name: "flicker", type: "number", default: "0.3", description: "Flicker intensity 0-1. 0 = steady." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "holographic-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "HOLOGRAM", code: asChildren },
      { type: "number", key: "speed", label: "Speed", min: 1, max: 10, step: 0.5, unit: "s", default: 3.5 },
    ],
    usage: { extra: 'className="text-5xl font-bold"' },
    render: (v) => (
      <HolographicText key={n(v, "speed")} speed={n(v, "speed")} className="text-5xl font-bold">
        {s(v, "text") || "HOLOGRAM"}
      </HolographicText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to fill." },
      { name: "speed", type: "number", default: "3.5", description: "Speed of the hue rotation in seconds." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "shadow-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "SHADOW", code: asChildren },
      { type: "color", key: "color", label: "Glow color", default: "#8b5cf6" },
    ],
    usage: { extra: 'className="text-5xl font-bold"' },
    render: (v) => (
      <ShadowText key={s(v, "color")} color={s(v, "color")} className="text-5xl font-bold">
        {s(v, "text") || "SHADOW"}
      </ShadowText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to shadow." },
      { name: "color", type: "string", default: '"var(--brand)"', description: "Glow color for the layered shadows." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "breathing-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Breathe", code: asChildren },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 8, step: 0.5, unit: "s", default: 4 },
      { type: "number", key: "scale", label: "Scale", min: 1.01, max: 1.2, step: 0.01, default: 1.04 },
    ],
    usage: { extra: 'className="text-5xl font-bold"' },
    render: (v) => (
      <BreathingText
        key={n(v, "duration") + ":" + n(v, "scale")}
        duration={n(v, "duration")}
        scale={n(v, "scale")}
        className="text-5xl font-bold"
      >
        {s(v, "text") || "Breathe"}
      </BreathingText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to animate." },
      { name: "duration", type: "number", default: "4", description: "Seconds for one full breath cycle." },
      { name: "scale", type: "number", default: "1.04", description: "Maximum scale factor." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "ghost-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Ghostly presence" },
      { type: "number", key: "duration", label: "Duration", min: 1.5, max: 6, step: 0.2, unit: "s", default: 3.4 },
    ],
    render: (v) => (
      <GhostText
        key={n(v, "duration")}
        text={s(v, "text") || "Ghostly presence"}
        duration={n(v, "duration")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "duration", type: "number", default: "3.4", description: "Seconds for one apparition cycle." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "glow-pulse-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Pulse", code: asChildren },
      { type: "color", key: "color", label: "Glow color", default: "#8b5cf6" },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 5, step: 0.2, unit: "s", default: 2.2 },
    ],
    usage: { extra: 'className="text-5xl font-bold"' },
    render: (v) => (
      <GlowPulseText
        key={s(v, "color") + ":" + n(v, "duration")}
        color={s(v, "color")}
        duration={n(v, "duration")}
        className="text-5xl font-bold"
      >
        {s(v, "text") || "Pulse"}
      </GlowPulseText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to animate." },
      { name: "color", type: "string", default: '"var(--brand)"', description: "Glow color." },
      { name: "duration", type: "number", default: "2.2", description: "Seconds for one pulse cycle." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "ticker-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Breaking - UPDATES - rolling - continuously -", code: asChildren },
      { type: "number", key: "speed", label: "Speed", min: 6, max: 40, step: 2, unit: "s", default: 18 },
      {
        type: "select",
        key: "direction",
        label: "Direction",
        default: "left",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      { type: "boolean", key: "pauseOnHover", label: "Pause on hover", default: true },
    ],
    usage: { extra: 'className="w-full text-3xl font-semibold"' },
    render: (v) => (
      <TickerText
        key={n(v, "speed") + ":" + s(v, "direction") + ":" + bool(v, "pauseOnHover")}
        speed={n(v, "speed")}
        direction={s(v, "direction") as "left" | "right"}
        pauseOnHover={bool(v, "pauseOnHover")}
        className="w-full text-3xl font-semibold"
      >
        {s(v, "text") || "Breaking - UPDATES - rolling - continuously -"}
      </TickerText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The scrolling content." },
      { name: "speed", type: "number", default: "16", description: "Seconds for one full scroll cycle." },
      { name: "direction", type: '"left" | "right"', default: '"left"', description: "Direction of scroll." },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "Pause the scroll on hover." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "striped-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Stripes" },
      { type: "number", key: "angle", label: "Angle", min: 0, max: 180, step: 5, unit: "deg", default: 45 },
      { type: "number", key: "speed", label: "Speed", min: 1, max: 10, step: 0.5, unit: "s", default: 4 },
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<StripedText\n  colors={[${JSON.stringify(s(v, "colorA"))}, ${JSON.stringify(s(v, "colorB"))}]}\n  angle={${n(v, "angle")}}\n  speed={${n(v, "speed")}}\n  className="text-5xl font-bold"\n>\n  ${s(v, "text")}\n</StripedText>`,
    },
    render: (v) => (
      <StripedText
        key={n(v, "angle") + ":" + n(v, "speed") + ":" + s(v, "colorA") + ":" + s(v, "colorB")}
        angle={n(v, "angle")}
        speed={n(v, "speed")}
        colors={[s(v, "colorA"), s(v, "colorB")]}
        className="text-5xl font-bold"
      >
        {s(v, "text") || "Stripes"}
      </StripedText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to stripe." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Colors to stripe through." },
      { name: "angle", type: "number", default: "45", description: "Stripe angle in degrees." },
      { name: "speed", type: "number", default: "4", description: "Seconds for one full cycle." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "staggered-fade": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Staggered and rotated" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.04 },
      { type: "number", key: "rotate", label: "Rotate", min: 0, max: 45, step: 1, unit: "deg", default: 12 },
    ],
    render: (v) => (
      <StaggeredFade
        key={n(v, "stagger") + ":" + n(v, "rotate")}
        text={s(v, "text") || "Staggered and rotated"}
        stagger={n(v, "stagger")}
        rotate={n(v, "rotate")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.04", description: "Seconds between each character entry." },
      { name: "rotate", type: "number", default: "12", description: "Initial rotation in degrees." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "rising-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Rise into view" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.03 },
      { type: "number", key: "rise", label: "Rise", min: 10, max: 80, step: 2, unit: "px", default: 32 },
    ],
    render: (v) => (
      <RisingText
        key={n(v, "stagger") + ":" + n(v, "rise")}
        text={s(v, "text") || "Rise into view"}
        stagger={n(v, "stagger")}
        rise={n(v, "rise")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.03", description: "Seconds between each character." },
      { name: "rise", type: "number", default: "32", description: "Vertical rise distance in px." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "kinetic-reveal": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Energy in motion" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.04, max: 0.3, step: 0.01, unit: "s", default: 0.1 },
    ],
    render: (v) => (
      <KineticReveal
        key={n(v, "stagger")}
        text={s(v, "text") || "Energy in motion"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.1", description: "Seconds between each word." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first word (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "fire-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Flickering flame" },
      { type: "number", key: "duration", label: "Duration", min: 0.8, max: 4, step: 0.1, unit: "s", default: 1.6 },
    ],
    render: (v) => (
      <FireText
        key={n(v, "duration")}
        text={s(v, "text") || "Flickering flame"}
        duration={n(v, "duration")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "duration", type: "number", default: "1.6", description: "Seconds for one full flicker cycle per letter." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "clip-draw-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Drawn outline" },
      { type: "color", key: "color", label: "Stroke color", default: "#8b5cf6" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.06 },
    ],
    render: (v) => (
      <ClipDrawText
        key={s(v, "color") + ":" + n(v, "stagger")}
        text={s(v, "text") || "Drawn outline"}
        color={s(v, "color")}
        stagger={n(v, "stagger")}
        className="text-5xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to draw." },
      { name: "color", type: "string", default: '"var(--brand)"', description: "Stroke color." },
      { name: "stagger", type: "number", default: "0.06", description: "Seconds between each character." },
      { name: "delay", type: "number", default: "0", description: "Delay before the draw (seconds)." },
    ],
  },

  "morphing-text": {
    controls: [
      { type: "text", key: "words", label: "Words (comma-separated)", default: "fluid, smooth, elegant", code: list("words") },
      { type: "number", key: "interval", label: "Interval", min: 1000, max: 5000, step: 200, unit: "ms", default: 2600 },
    ],
    render: (v) => {
      const words = s(v, "words").split(",").map((w) => w.trim()).filter(Boolean);
      return (
        <div className="text-3xl font-semibold">
          It&rsquo;s{" "}
          <MorphingText
            key={n(v, "interval")}
            words={words.length ? words : ["fluid"]}
            interval={n(v, "interval")}
            className="text-brand-ink"
          />
        </div>
      );
    },
    props: [
      { name: "words", type: "string[]", required: true, description: "Words to cycle through." },
      { name: "interval", type: "number", default: "2600", description: "Display time per word in ms." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "split-flap": {
    controls: [
      { type: "text", key: "words", label: "Words (comma-separated)", default: "DEPARTING, ARRIVING, BOARDING", code: list("words") },
      { type: "number", key: "interval", label: "Interval", min: 1200, max: 5000, step: 200, unit: "ms", default: 2800 },
    ],
    render: (v) => {
      const words = s(v, "words").split(",").map((w) => w.trim()).filter(Boolean);
      return (
        <div className="font-mono text-3xl font-semibold">
          <SplitFlap
            key={n(v, "interval")}
            words={words.length ? words : ["DEPARTING"]}
            interval={n(v, "interval")}
            className="text-brand-ink"
          />
        </div>
      );
    },
    props: [
      { name: "words", type: "string[]", required: true, description: "Words to cycle through, split-flap style." },
      { name: "interval", type: "number", default: "2800", description: "Display time per word in ms." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "scatter-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Hover to scatter" },
      {
        type: "select",
        key: "trigger",
        label: "Trigger",
        default: "hover",
        options: [
          { label: "On hover", value: "hover" },
          { label: "On view", value: "inView" },
        ],
      },
    ],
    render: (v) => (
      <ScatterText
        key={s(v, "trigger")}
        text={s(v, "text") || "Hover to scatter"}
        trigger={s(v, "trigger") as "hover" | "inView"}
        className="text-3xl font-semibold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to scatter." },
      { name: "trigger", type: '"hover" | "inView"', default: '"hover"', description: "What starts the scatter." },
      { name: "repeat", type: "boolean", default: "false", description: "If trigger=inView, whether to repeat." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "perspective-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Tilt toward cursor" },
      { type: "number", key: "tilt", label: "Tilt", min: 4, max: 40, step: 2, unit: "deg", default: 16 },
    ],
    render: (v) => (
      <PerspectiveText
        text={s(v, "text") || "Tilt toward cursor"}
        tilt={n(v, "tilt")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "tilt", type: "number", default: "16", description: "Maximum tilt in degrees." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "elastic-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Stretch me" },
      { type: "number", key: "radius", label: "Radius", min: 60, max: 240, step: 10, unit: "px", default: 120 },
      { type: "number", key: "maxScale", label: "Max scale", min: 0.2, max: 1.2, step: 0.1, default: 0.5 },
    ],
    render: (v) => (
      <ElasticText
        text={s(v, "text") || "Stretch me"}
        radius={n(v, "radius")}
        maxScale={n(v, "maxScale")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "radius", type: "number", default: "120", description: "Radius of elastic influence around the pointer (px)." },
      { name: "maxScale", type: "number", default: "0.5", description: "Maximum extra scale applied to letters near the cursor." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "ripple-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Drop a ripple" },
      { type: "number", key: "radius", label: "Radius", min: 50, max: 220, step: 10, unit: "px", default: 100 },
      { type: "number", key: "amplitude", label: "Amplitude", min: 4, max: 40, step: 2, unit: "px", default: 14 },
    ],
    render: (v) => (
      <RippleText
        text={s(v, "text") || "Drop a ripple"}
        radius={n(v, "radius")}
        amplitude={n(v, "amplitude")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "radius", type: "number", default: "100", description: "Radius of the ripple wave in px." },
      { name: "amplitude", type: "number", default: "14", description: "Maximum vertical displacement of letters." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "twinkle-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Twinkle little star" },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 5, step: 0.2, unit: "s", default: 2.2 },
    ],
    render: (v) => (
      <TwinkleText
        key={n(v, "duration")}
        text={s(v, "text") || "Twinkle little star"}
        duration={n(v, "duration")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "duration", type: "number", default: "2.2", description: "Base duration per character in seconds." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "pulse-wave-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Wave passing through", code: asChildren },
      { type: "color", key: "color", label: "Wave color", default: "#22d3ee" },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 6, step: 0.2, unit: "s", default: 3 },
    ],
    usage: { extra: 'className="text-4xl font-bold text-muted"' },
    render: (v) => (
      <PulseWaveText
        key={s(v, "color") + ":" + n(v, "duration")}
        color={s(v, "color")}
        duration={n(v, "duration")}
        className="text-4xl font-bold text-muted"
      >
        {s(v, "text") || "Wave passing through"}
      </PulseWaveText>
    ),
    props: [
      { name: "children", type: "ReactNode", required: true, description: "The text to animate." },
      { name: "color", type: "string", default: '"var(--brand-2)"', description: "Glow color of the wave crest." },
      { name: "duration", type: "number", default: "3", description: "Seconds for one full wave cycle." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "color-cycle-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Color cycling" },
      { type: "number", key: "duration", label: "Duration", min: 2, max: 8, step: 0.5, unit: "s", default: 4 },
    ],
    render: (v) => (
      <ColorCycleText
        key={n(v, "duration")}
        text={s(v, "text") || "Color cycling"}
        duration={n(v, "duration")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "duration", type: "number", default: "4", description: "Seconds for one full cycle per character." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "flicker-in-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Flickering in..." },
    ],
    render: (v) => (
      <FlickerInText text={s(v, "text") || "Flickering in..."} className="text-4xl font-bold" />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to flicker in." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "revolve-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Spin into place" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.05 },
    ],
    render: (v) => (
      <RevolveText
        key={n(v, "stagger")}
        text={s(v, "text") || "Spin into place"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.05", description: "Seconds between each character." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "gravity-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Heavy drop" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.04 },
      { type: "number", key: "drop", label: "Drop", min: 20, max: 120, step: 5, unit: "px", default: 60 },
    ],
    render: (v) => (
      <GravityText
        key={n(v, "stagger") + ":" + n(v, "drop")}
        text={s(v, "text") || "Heavy drop"}
        stagger={n(v, "stagger")}
        drop={n(v, "drop")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.04", description: "Seconds between each character." },
      { name: "drop", type: "number", default: "60", description: "Drop height in px." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "zoom-blur-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Zooming from afar" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.05 },
      { type: "number", key: "fromScale", label: "From scale", min: 1.5, max: 8, step: 0.5, default: 4 },
    ],
    render: (v) => (
      <ZoomBlurText
        key={n(v, "stagger") + ":" + n(v, "fromScale")}
        text={s(v, "text") || "Zooming from afar"}
        stagger={n(v, "stagger")}
        fromScale={n(v, "fromScale")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.05", description: "Seconds between each character." },
      { name: "fromScale", type: "number", default: "4", description: "Starting scale." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "warp-in-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Warp distortion" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.02, max: 0.2, step: 0.01, unit: "s", default: 0.04 },
    ],
    render: (v) => (
      <WarpInText
        key={n(v, "stagger")}
        text={s(v, "text") || "Warp distortion"}
        stagger={n(v, "stagger")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.04", description: "Seconds between each character." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first character (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "expand-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Unfolding wide open" },
      { type: "number", key: "stagger", label: "Stagger", min: 0.05, max: 0.3, step: 0.01, unit: "s", default: 0.12 },
    ],
    render: (v) => (
      <ExpandText
        key={n(v, "stagger")}
        text={s(v, "text") || "Unfolding wide open"}
        stagger={n(v, "stagger")}
        className="text-3xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "stagger", type: "number", default: "0.12", description: "Seconds between each word." },
      { name: "delay", type: "number", default: "0", description: "Delay before the first word (seconds)." },
      { name: "repeat", type: "boolean", default: "false", description: "Replay every time it scrolls into view." },
    ],
  },

  "dual-tone-text": {
    controls: [
      { type: "text", key: "topText", label: "Top text", default: "Above the fold" },
      { type: "text", key: "bottomText", label: "Bottom text", default: "Below the surface" },
    ],
    render: (v) => (
      <DualToneText
        topText={s(v, "topText") || "Above the fold"}
        bottomText={s(v, "bottomText") || "Below the surface"}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "topText", type: "string", required: true, description: "The upper text layer." },
      { name: "bottomText", type: "string", required: true, description: "The lower text layer." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "swap-cascade": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Decoding signal..." },
    ],
    render: (v) => (
      <SwapCascade
        key={s(v, "text")}
        text={s(v, "text") || "Decoding signal..."}
        className="font-mono text-3xl font-semibold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to resolve to." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "digi-clock-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "ARRIVING" },
      { type: "number", key: "duration", label: "Duration", min: 0.8, max: 5, step: 0.2, unit: "s", default: 2 },
    ],
    render: (v) => (
      <DigiClockText
        key={s(v, "text") + ":" + n(v, "duration")}
        text={s(v, "text") || "ARRIVING"}
        duration={n(v, "duration")}
        className="font-mono text-3xl font-semibold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to resolve to." },
      { name: "duration", type: "number", default: "2", description: "Seconds before the scramble resolves." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "shake-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Make me shake" },
      { type: "number", key: "intensity", label: "Intensity", min: 1, max: 8, step: 0.5, unit: "px", default: 2.5 },
    ],
    render: (v) => (
      <ShakeText
        text={s(v, "text") || "Make me shake"}
        intensity={n(v, "intensity")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "intensity", type: "number", default: "2.5", description: "Shake intensity in px." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "shatter-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Hover to shatter" },
      {
        type: "select",
        key: "trigger",
        label: "Trigger",
        default: "hover",
        options: [
          { label: "On hover", value: "hover" },
          { label: "On click", value: "click" },
        ],
      },
    ],
    render: (v) => (
      <ShatterText
        key={s(v, "trigger")}
        text={s(v, "text") || "Hover to shatter"}
        trigger={s(v, "trigger") as "hover" | "click"}
        className="text-3xl font-semibold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to shatter." },
      { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "What starts the shatter." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "magnetic-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Pull me closer" },
      { type: "number", key: "pull", label: "Pull", min: 4, max: 40, step: 2, unit: "px", default: 14 },
      { type: "number", key: "radius", label: "Radius", min: 60, max: 280, step: 10, unit: "px", default: 150 },
    ],
    render: (v) => (
      <MagneticText
        text={s(v, "text") || "Pull me closer"}
        pull={n(v, "pull")}
        radius={n(v, "radius")}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to animate." },
      { name: "pull", type: "number", default: "14", description: "Maximum pixel displacement toward the cursor." },
      { name: "radius", type: "number", default: "150", description: "Radius of magnetic influence." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  "split-color-text": {
    controls: [
      { type: "text", key: "text", label: "Text", default: "Split at cursor" },
    ],
    render: (v) => (
      <SplitColorText
        text={s(v, "text") || "Split at cursor"}
        className="text-4xl font-bold"
      />
    ),
    props: [
      { name: "text", type: "string", required: true, description: "The text to split." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },

  /* ---------------------------- Backgrounds ---------------------------- */
  silk: {
    controls: [
      { type: "number", key: "scale", label: "Fold size", group: "Weave", min: 0.3, max: 3, step: 0.1, default: 1 },
      { type: "number", key: "warp", label: "Warp", group: "Weave", min: 0, max: 2, step: 0.05, default: 1 },
      { type: "number", key: "detail", label: "Detail", group: "Weave", min: 4, max: 16, step: 1, unit: "px", default: 8, hint: "Smaller = smoother surface, heavier." },
      { type: "number", key: "speed", label: "Speed", group: "Motion", min: 0, max: 3, step: 0.1, default: 1 },
      { type: "color", key: "colorA", label: "Color 1", group: "Appearance", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", group: "Appearance", default: "#22d3ee" },
      { type: "number", key: "sheen", label: "Sheen", group: "Appearance", min: 0, max: 1, step: 0.05, default: 0.6 },
    ],
    usage: {
      element: (v) =>
        `<Silk colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} scale={${n(v, "scale")}} speed={${n(v, "speed")}} sheen={${n(v, "sheen")}} warp={${n(v, "warp")}} detail={${n(v, "detail")}} className="h-full w-full" />`,
    },
    render: (v) => (
      <Silk
        className="h-full w-full"
        colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]}
        scale={n(v, "scale")}
        speed={n(v, "speed")}
        sheen={n(v, "sheen")}
        warp={n(v, "warp")}
        detail={n(v, "detail")}
      />
    ),
    props: [
      { name: "colors", type: "[string, string]", default: "['139,92,246','34,211,238']", description: "The two silk colors, blended across the folds, as r,g,b." },
      { name: "scale", type: "number", default: "1", description: "Fold size — higher spreads the weave wider." },
      { name: "speed", type: "number", default: "1", description: "Flow speed multiplier (0 = frozen)." },
      { name: "sheen", type: "number", default: "0.6", description: "Sheen sharpness — tighter, brighter highlights (0–1)." },
      { name: "warp", type: "number", default: "1", description: "How much the weave warps and ripples (0–2)." },
      { name: "detail", type: "number", default: "8", description: "Shading cell size in px (smaller = smoother, heavier)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  squares: {
    controls: [
      { type: "number", key: "size", label: "Square size", group: "Grid", min: 16, max: 100, step: 2, unit: "px", default: 44 },
      { type: "number", key: "speed", label: "Speed", group: "Motion", min: 0, max: 3, step: 0.1, default: 1 },
      {
        type: "select",
        key: "direction",
        label: "Direction",
        group: "Motion",
        default: "diagonal",
        options: [
          { label: "Diagonal", value: "diagonal" },
          { label: "Up", value: "up" },
          { label: "Down", value: "down" },
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      { type: "color", key: "lineColor", label: "Line color", group: "Appearance", default: "#8ba0ff", code: rgb },
      { type: "color", key: "hoverColor", label: "Hover color", group: "Appearance", default: "#c4b5fd", code: rgb },
      { type: "number", key: "reach", label: "Cursor reach", group: "Interaction", min: 60, max: 300, step: 10, unit: "px", default: 150 },
    ],
    render: (v) => (
      <Squares
        className="h-full w-full"
        size={n(v, "size")}
        speed={n(v, "speed")}
        direction={s(v, "direction") as "diagonal" | "up" | "down" | "left" | "right"}
        lineColor={hexRgb(s(v, "lineColor"))}
        hoverColor={hexRgb(s(v, "hoverColor"))}
        reach={n(v, "reach")}
      />
    ),
    props: [
      { name: "size", type: "number", default: "44", description: "Square size in pixels." },
      { name: "speed", type: "number", default: "1", description: "Drift speed (0 = still)." },
      { name: "direction", type: '"diagonal" | "up" | "down" | "left" | "right"', default: '"diagonal"', description: "Direction the grid scrolls." },
      { name: "lineColor", type: "string", default: '"139,160,255"', description: "Grid line color as r,g,b." },
      { name: "hoverColor", type: "string", default: '"196,181,253"', description: "Fill color of squares lit near the cursor, as r,g,b." },
      { name: "reach", type: "number", default: "150", description: "Cursor influence radius in px." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "letter-glitch": {
    controls: [
      { type: "number", key: "fontSize", label: "Font size", group: "Grid", min: 10, max: 40, step: 1, unit: "px", default: 18 },
      { type: "number", key: "glitchSpeed", label: "Glitch speed", group: "Motion", min: 1, max: 60, step: 1, default: 18 },
      { type: "color", key: "colorA", label: "Color 1", group: "Appearance", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", group: "Appearance", default: "#22d3ee" },
      { type: "color", key: "colorC", label: "Color 3", group: "Appearance", default: "#fb7185" },
      { type: "number", key: "glow", label: "Glow", group: "Appearance", min: 0, max: 1, step: 0.05, default: 0.9 },
      { type: "number", key: "vignette", label: "Vignette", group: "Appearance", min: 0, max: 1, step: 0.05, default: 0.7 },
    ],
    usage: {
      element: (v) =>
        `<LetterGlitch colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}", "${hexRgb(s(v, "colorC"))}"]} fontSize={${n(v, "fontSize")}} glitchSpeed={${n(v, "glitchSpeed")}} glow={${n(v, "glow")}} vignette={${n(v, "vignette")}} className="h-full w-full" />`,
    },
    render: (v) => (
      <LetterGlitch
        className="h-full w-full"
        colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB")), hexRgb(s(v, "colorC"))]}
        fontSize={n(v, "fontSize")}
        glitchSpeed={n(v, "glitchSpeed")}
        glow={n(v, "glow")}
        vignette={n(v, "vignette")}
      />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Glyph colors as r,g,b (each cell picks one)." },
      { name: "fontSize", type: "number", default: "18", description: "Monospace glyph size in px (drives the cell size)." },
      { name: "glitchSpeed", type: "number", default: "18", description: "How frantically cells mutate (higher = more churn)." },
      { name: "glow", type: "number", default: "0.9", description: "Glyph brightness / opacity (0–1)." },
      { name: "vignette", type: "number", default: "0.7", description: "Edge darkening toward the corners (0–1)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  ballpit: {
    controls: [
      { type: "number", key: "count", label: "Balls", group: "Balls", min: 5, max: 80, step: 1, default: 40 },
      { type: "number", key: "size", label: "Ball size", group: "Balls", min: 8, max: 40, step: 1, unit: "px", default: 18 },
      { type: "number", key: "gravity", label: "Gravity", group: "Physics", min: 0, max: 3, step: 0.1, default: 1 },
      { type: "number", key: "bounce", label: "Bounce", group: "Physics", min: 0, max: 1, step: 0.05, default: 0.75 },
      { type: "number", key: "pointerForce", label: "Cursor force", group: "Physics", min: 0, max: 3, step: 0.1, default: 1 },
      { type: "color", key: "colorA", label: "Color 1", group: "Appearance", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", group: "Appearance", default: "#22d3ee" },
      { type: "color", key: "colorC", label: "Color 3", group: "Appearance", default: "#fb7185" },
      { type: "number", key: "gloss", label: "Gloss", group: "Appearance", min: 0, max: 1, step: 0.05, default: 0.7 },
    ],
    usage: {
      element: (v) =>
        `<Ballpit count={${n(v, "count")}} size={${n(v, "size")}} gravity={${n(v, "gravity")}} bounce={${n(v, "bounce")}} pointerForce={${n(v, "pointerForce")}} gloss={${n(v, "gloss")}} colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}", "${hexRgb(s(v, "colorC"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <Ballpit
        className="h-full w-full"
        count={n(v, "count")}
        size={n(v, "size")}
        gravity={n(v, "gravity")}
        bounce={n(v, "bounce")}
        pointerForce={n(v, "pointerForce")}
        gloss={n(v, "gloss")}
        colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB")), hexRgb(s(v, "colorC"))]}
      />
    ),
    props: [
      { name: "count", type: "number", default: "40", description: "Number of balls (capped at 80)." },
      { name: "gravity", type: "number", default: "1", description: "Downward gravity strength (0 = weightless)." },
      { name: "bounce", type: "number", default: "0.75", description: "Bounciness of walls + collisions (0 = dead, 1 = elastic)." },
      { name: "size", type: "number", default: "18", description: "Base ball radius in px." },
      { name: "pointerForce", type: "number", default: "1", description: "How hard the cursor shoves nearby balls." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Ball colors as r,g,b." },
      { name: "gloss", type: "number", default: "0.7", description: "Glossy top-lit shading strength (0–1)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  ferrofluid: {
    controls: [
      { type: "number", key: "spikes", label: "Spikes", group: "Form", min: 0, max: 18, step: 1, default: 9 },
      { type: "number", key: "spikeLength", label: "Spike length", group: "Form", min: 0, max: 1.5, step: 0.05, default: 0.55 },
      { type: "number", key: "droplets", label: "Droplets", group: "Form", min: 0, max: 8, step: 1, default: 4 },
      { type: "number", key: "coreSize", label: "Core size", group: "Form", min: 0.1, max: 0.4, step: 0.01, default: 0.22 },
      { type: "number", key: "threshold", label: "Surface tension", group: "Form", min: 0.5, max: 1.6, step: 0.05, default: 1, hint: "Lower fuses blobs from farther apart." },
      { type: "number", key: "speed", label: "Speed", group: "Motion", min: 0, max: 2.5, step: 0.1, default: 1 },
      { type: "number", key: "wobble", label: "Wobble", group: "Motion", min: 0, max: 1, step: 0.05, default: 0.6 },
      { type: "number", key: "spin", label: "Spin", group: "Motion", min: -1, max: 1, step: 0.05, unit: "turn/s", default: 0.12 },
      { type: "boolean", key: "pointerReactive", label: "Follow pointer", group: "Magnet", default: true },
      { type: "number", key: "magnetStrength", label: "Magnet strength", group: "Magnet", min: 0, max: 1, step: 0.05, default: 0.6 },
      { type: "number", key: "magnetReach", label: "Magnet reach", group: "Magnet", min: 100, max: 500, step: 10, unit: "px", default: 260 },
      { type: "color", key: "color", label: "Fluid color", group: "Appearance", default: "#8e74ff", code: rgb },
      { type: "color", key: "highlight", label: "Highlight", group: "Appearance", default: "#bae6ff", code: rgb },
      { type: "number", key: "glow", label: "Glow", group: "Appearance", min: 0, max: 1, step: 0.05, default: 0.55 },
      { type: "number", key: "sheen", label: "Sheen", group: "Appearance", min: 0, max: 1, step: 0.05, default: 0.6 },
    ],
    render: (v) => (
      <Ferrofluid
        className="h-full w-full"
        spikes={n(v, "spikes")}
        spikeLength={n(v, "spikeLength")}
        droplets={n(v, "droplets")}
        coreSize={n(v, "coreSize")}
        threshold={n(v, "threshold")}
        speed={n(v, "speed")}
        wobble={n(v, "wobble")}
        spin={n(v, "spin")}
        pointerReactive={bool(v, "pointerReactive")}
        magnetStrength={n(v, "magnetStrength")}
        magnetReach={n(v, "magnetReach")}
        color={hexRgb(s(v, "color"))}
        highlight={hexRgb(s(v, "highlight"))}
        glow={n(v, "glow")}
        sheen={n(v, "sheen")}
      />
    ),
    props: [
      { name: "color", type: "string", default: '"142,116,255"', description: 'Body color of the fluid as "r,g,b".' },
      { name: "highlight", type: "string", default: '"186,230,255"', description: 'Specular / rim sheen color as "r,g,b".' },
      { name: "spikes", type: "number", default: "9", description: "Number of magnetic spikes growing from the core." },
      { name: "spikeLength", type: "number", default: "0.55", description: "How far spikes reach past the core (fraction of its radius)." },
      { name: "droplets", type: "number", default: "4", description: "Free droplets that orbit and merge back into the mass." },
      { name: "coreSize", type: "number", default: "0.22", description: "Core radius as a fraction of the smaller canvas edge." },
      { name: "threshold", type: "number", default: "1", description: "Metaball merge iso level; lower = gooier, higher = tighter." },
      { name: "wobble", type: "number", default: "0.6", description: "How much each spike pulses in and out (0–1)." },
      { name: "speed", type: "number", default: "1", description: "Master animation speed multiplier (0 = frozen)." },
      { name: "spin", type: "number", default: "0.12", description: "Rotation of the spike crown, in turns per second." },
      { name: "glow", type: "number", default: "0.55", description: "Outer glow / bloom intensity around the silhouette (0–1)." },
      { name: "sheen", type: "number", default: "0.6", description: "Strength of the top-lit specular sheen (0–1)." },
      { name: "pointerReactive", type: "boolean", default: "true", description: "Draw the fluid toward the pointer like a magnet." },
      { name: "magnetStrength", type: "number", default: "0.6", description: "How hard the mass leans toward the pointer (0–1)." },
      { name: "magnetReach", type: "number", default: "260", description: "Pointer distance (px) within which the tendril reaches out." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "particle-field": {
    controls: [
      { type: "number", key: "density", label: "Density", min: 2, max: 24, default: 9 },
      { type: "number", key: "linkDistance", label: "Link distance", min: 60, max: 220, unit: "px", default: 130 },
      { type: "color", key: "color", label: "Color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <ParticleField
        className="h-full w-full"
        density={n(v, "density")}
        linkDistance={n(v, "linkDistance")}
        color={hexRgb(s(v, "color"))}
      />
    ),
    props: [
      { name: "density", type: "number", default: "9", description: "Approx. particles per 100k px². Higher = denser." },
      { name: "linkDistance", type: "number", default: "130", description: "Max distance (px) at which particles link." },
      { name: "color", type: "string", default: '"139,160,255"', description: 'Particle + link color as "r,g,b".' },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "dot-matrix": {
    controls: [
      { type: "number", key: "gap", label: "Gap", min: 14, max: 60, unit: "px", default: 28 },
      { type: "number", key: "dotRadius", label: "Dot radius", min: 0.5, max: 4, step: 0.1, unit: "px", default: 1.3 },
      { type: "number", key: "reach", label: "Cursor reach", min: 60, max: 260, unit: "px", default: 130 },
      { type: "color", key: "color", label: "Color", default: "#96aaff", code: rgb },
    ],
    render: (v) => (
      <DotMatrix
        className="h-full w-full"
        gap={n(v, "gap")}
        dotRadius={n(v, "dotRadius")}
        reach={n(v, "reach")}
        color={hexRgb(s(v, "color"))}
      />
    ),
    props: [
      { name: "gap", type: "number", default: "28", description: "Spacing between dots in pixels." },
      { name: "dotRadius", type: "number", default: "1.3", description: "Base dot radius in pixels." },
      { name: "reach", type: "number", default: "130", description: "Influence radius of the cursor in pixels." },
      { name: "color", type: "string", default: '"150,170,255"', description: 'Dot color as "r,g,b".' },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  starfield: {
    controls: [
      { type: "number", key: "density", label: "Density", min: 4, max: 40, default: 14 },
      { type: "color", key: "color", label: "Color", default: "#d2dcff", code: rgb },
    ],
    render: (v) => (
      <Starfield
        className="h-full w-full"
        density={n(v, "density")}
        color={hexRgb(s(v, "color"))}
      />
    ),
    props: [
      { name: "density", type: "number", default: "14", description: "Approx. stars per 100k px²." },
      { name: "color", type: "string", default: '"210,220,255"', description: 'Star color as "r,g,b".' },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "aurora-background": {
    controls: [
      { type: "number", key: "blur", label: "Blur", min: 20, max: 160, unit: "px", default: 80 },
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
      { type: "color", key: "colorC", label: "Color 3", default: "#fb7185" },
    ],
    usage: {
      element: (v) =>
        `<AuroraBackground\n  blur={${n(v, "blur")}}\n  colors={[${JSON.stringify(s(v, "colorA"))}, ${JSON.stringify(s(v, "colorB"))}, ${JSON.stringify(s(v, "colorC"))}]}\n  className="h-full w-full"\n/>`,
    },
    render: (v) => (
      <AuroraBackground
        className="h-full w-full"
        blur={n(v, "blur")}
        colors={[s(v, "colorA"), s(v, "colorB"), s(v, "colorC")] as [string, string, string]}
      />
    ),
    props: [
      { name: "colors", type: "[string, string, string]", default: "brand spectrum", description: "The three aurora halo colors." },
      { name: "blur", type: "number", default: "80", description: "Strength of the blur halo in pixels." },
      { name: "children", type: "ReactNode", description: "Content layered above the halos." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "flow-field": {
    controls: [
      { type: "number", key: "density", label: "Density", min: 2, max: 24, default: 9 },
    ],
    render: (v) => (
      <FlowField density={n(v, "density")} className="h-full w-full" />
    ),
    props: [
      { name: "density", type: "number", default: "9", description: "Approx. particles per 100k px² (capped)." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Trail colors as r,g,b (cycled per particle)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "aurora-ribbons": {
    controls: [
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<AuroraRibbons colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <AuroraRibbons colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Ribbon colors as r,g,b (back to front)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "warp-stars": {
    controls: [
      { type: "number", key: "count", label: "Count", min: 40, max: 400, step: 20, default: 120 },
      { type: "color", key: "color", label: "Color", default: "#d2dcff", code: rgb },
    ],
    render: (v) => (
      <WarpStars count={n(v, "count")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "120", description: "Number of stars." },
      { name: "color", type: "string", default: '"210,220,255"', description: "Star color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  vortex: {
    controls: [
      { type: "number", key: "count", label: "Particles", min: 20, max: 200, step: 10, default: 80 },
    ],
    render: (v) => (
      <Vortex count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "80", description: "Number of orbiting particles." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "grid-beams": {
    controls: [
      { type: "number", key: "size", label: "Cell size", min: 30, max: 120, step: 5, unit: "px", default: 65 },
    ],
    render: (v) => (
      <GridBeams size={n(v, "size")} className="h-full w-full" />
    ),
    props: [
      { name: "size", type: "number", default: "65", description: "Grid cell size in pixels." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  "hex-grid": {
    controls: [
      { type: "number", key: "size", label: "Radius", min: 12, max: 48, step: 2, unit: "px", default: 24 },
      { type: "color", key: "color", label: "Color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <HexGrid size={n(v, "size")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "size", type: "number", default: "24", description: "Hexagon radius in pixels." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Cell color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  embers: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 10, max: 120, step: 5, default: 50 },
    ],
    render: (v) => (
      <Embers count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "50", description: "Number of embers." },
      { name: "colors", type: "string[]", default: "warm tones", description: "Ember colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  fireflies: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 8, max: 80, step: 4, default: 30 },
    ],
    render: (v) => (
      <Fireflies count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "30", description: "Number of fireflies." },
      { name: "colors", type: "string[]", default: "warm glow", description: "Firefly colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  bokeh: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 4, max: 30, step: 2, default: 12 },
    ],
    render: (v) => (
      <Bokeh count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "12", description: "Number of orbs." },
      { name: "colors", type: "string[]", default: "brand tones", description: "Orb colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  snowfall: {
    controls: [
      { type: "number", key: "density", label: "Density", min: 2, max: 30, default: 12 },
    ],
    render: (v) => (
      <Snowfall density={n(v, "density")} className="h-full w-full" />
    ),
    props: [
      { name: "density", type: "number", default: "12", description: "Approx. flakes per 100k px² (capped)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  rain: {
    controls: [
      { type: "number", key: "density", label: "Density", min: 4, max: 40, default: 18 },
      { type: "color", key: "color", label: "Color", default: "#a5cfff", code: rgb },
    ],
    render: (v) => (
      <Rain density={n(v, "density")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "density", type: "number", default: "18", description: "Approx. drops per 100k px² (capped)." },
      { name: "color", type: "string", default: '"165,207,255"', description: "Streak color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "spiral-galaxy": {
    controls: [
      { type: "number", key: "count", label: "Particles", min: 100, max: 800, step: 50, default: 300 },
    ],
    render: (v) => (
      <SpiralGalaxy count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "300", description: "Number of particles." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
      { name: "className", type: "string", description: "Extra classes for the wrapper." },
    ],
  },

  metaballs: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 3, max: 20, step: 1, default: 8 },
    ],
    render: (v) => (
      <Metaballs count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "8", description: "Number of metaballs." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Ball colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  sparkles: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 10, max: 120, step: 5, default: 50 },
    ],
    render: (v) => (
      <Sparkles count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "50", description: "Number of sparkles." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Sparkle colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  confetti: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 10, max: 100, step: 5, default: 40 },
    ],
    render: (v) => (
      <Confetti count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "40", description: "Number of confetti pieces." },
      { name: "colors", type: "string[]", default: "rainbow", description: "Piece colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  comets: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 2, max: 20, step: 1, default: 8 },
    ],
    render: (v) => (
      <Comets count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "8", description: "Number of comets." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Comet colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  fireworks: {
    controls: [
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<Fireworks colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <Fireworks colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Spark colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "matrix-rain": {
    controls: [
      { type: "number", key: "fontSize", label: "Font size", min: 10, max: 28, step: 2, unit: "px", default: 14 },
      { type: "color", key: "color", label: "Color", default: "#22d3ee", code: rgb },
    ],
    render: (v) => (
      <MatrixRain fontSize={n(v, "fontSize")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "fontSize", type: "number", default: "14", description: "Font size (px) — also the column width." },
      { name: "color", type: "string", default: '"34,211,238"', description: "Glyph color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "god-rays": {
    controls: [
      { type: "number", key: "rays", label: "Rays", min: 2, max: 16, step: 1, default: 7 },
      { type: "color", key: "color", label: "Color", default: "#ffe8a0", code: rgb },
    ],
    render: (v) => (
      <GodRays rays={n(v, "rays")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "rays", type: "number", default: "7", description: "Number of light shafts." },
      { name: "color", type: "string", default: '"255,232,160"', description: "Ray color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "neon-tunnel": {
    controls: [
      { type: "number", key: "layers", label: "Layers", min: 3, max: 20, step: 1, default: 10 },
      { type: "color", key: "from", label: "Inner color", default: "#8b5cf6" },
      { type: "color", key: "to", label: "Outer color", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<NeonTunnel layers={${n(v, "layers")}} from={[${hexTuple(s(v, "from"))}]} to={[${hexTuple(s(v, "to"))}]} className="h-full w-full" />`,
    },
    render: (v) => {
      const fb = s(v, "from").replace("#", ""); const tb = s(v, "to").replace("#", "");
      return <NeonTunnel layers={n(v, "layers")} from={[parseInt(fb.slice(0,2),16),parseInt(fb.slice(2,4),16),parseInt(fb.slice(4,6),16)]} to={[parseInt(tb.slice(0,2),16),parseInt(tb.slice(2,4),16),parseInt(tb.slice(4,6),16)]} className="h-full w-full" />;
    },
    props: [
      { name: "layers", type: "number", default: "10", description: "Number of concentric layers." },
      { name: "from", type: "[number, number, number]", default: "brand violet", description: "Inner color as [r,g,b]." },
      { name: "to", type: "[number, number, number]", default: "brand cyan", description: "Outer color as [r,g,b]." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "mesh-wave": {
    controls: [
      { type: "number", key: "cols", label: "Cols", min: 6, max: 40, step: 2, default: 16 },
      { type: "number", key: "rows", label: "Rows", min: 6, max: 30, step: 2, default: 14 },
      { type: "color", key: "color", label: "Color", default: "#a0a8ff", code: rgb },
    ],
    render: (v) => (
      <MeshWave cols={n(v, "cols")} rows={n(v, "rows")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "cols", type: "number", default: "16", description: "Grid columns." },
      { name: "rows", type: "number", default: "14", description: "Grid rows." },
      { name: "color", type: "string", default: '"160,168,255"', description: "Line color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  bubbles: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 4, max: 30, step: 2, default: 14 },
      { type: "color", key: "color", label: "Color", default: "#a0c8ff", code: rgb },
    ],
    render: (v) => (
      <Bubbles count={n(v, "count")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "14", description: "Number of bubbles." },
      { name: "color", type: "string", default: '"160,200,255"', description: "Bubble color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "liquid-blob": {
    controls: [
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<LiquidBlob colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <LiquidBlob colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "[string, string]", default: "['139,92,246','34,211,238']", description: "The two blob colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  meteors: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 4, max: 30, step: 2, default: 14 },
    ],
    render: (v) => (
      <Meteors count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "14", description: "Number of meteors." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "light-beams": {
    controls: [
      { type: "number", key: "count", label: "Count", min: 3, max: 20, step: 1, default: 9 },
    ],
    render: (v) => (
      <LightBeams count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "9", description: "Number of beams." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "pulse-rings": {
    controls: [
      { type: "number", key: "rings", label: "Rings", min: 2, max: 12, step: 1, default: 5 },
    ],
    render: (v) => (
      <PulseRings rings={n(v, "rings")} className="h-full w-full" />
    ),
    props: [
      { name: "rings", type: "number", default: "5", description: "Number of concentric rings in flight." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "spotlight-cursor": {
    controls: [
      { type: "number", key: "radius", label: "Radius", min: 60, max: 400, step: 20, unit: "px", default: 180 },
    ],
    render: (v) => (
      <SpotlightCursor radius={n(v, "radius")} className="h-full w-full" />
    ),
    props: [
      { name: "radius", type: "number", default: "180", description: "Spotlight radius in pixels." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  waves: {
    controls: [
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<Waves colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <Waves colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Wave layer colors as r,g,b (back to front)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "topographic-lines": {
    controls: [
      { type: "number", key: "gap", label: "Gap", min: 10, max: 60, step: 2, unit: "px", default: 28 },
      { type: "color", key: "color", label: "Line color", default: "#8ba0ff", code: rgb },
      { type: "color", key: "accent", label: "Accent color", default: "#c4b5fd", code: rgb },
    ],
    render: (v) => (
      <TopographicLines gap={n(v, "gap")} color={hexRgb(s(v, "color"))} accent={hexRgb(s(v, "accent"))} className="h-full w-full" />
    ),
    props: [
      { name: "gap", type: "number", default: "28", description: "Vertical gap between contour lines in pixels." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Line color as r,g,b." },
      { name: "accent", type: "string", default: '"196,181,253"', description: "Accent color (every 5th line) as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "wave-interference": {
    controls: [
      { type: "number", key: "gap", label: "Gap", min: 10, max: 50, step: 2, unit: "px", default: 24 },
      { type: "color", key: "color", label: "Dot color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <WaveInterference gap={n(v, "gap")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "gap", type: "number", default: "24", description: "Dot grid spacing in pixels." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Dot color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "orbiting-dots": {
    controls: [
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<OrbitingDots colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <OrbitingDots colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Orbit colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "dna-helix": {
    controls: [
      { type: "color", key: "colorA", label: "Strand 1", default: "#8b7cff" },
      { type: "color", key: "colorB", label: "Strand 2", default: "#5eeaff" },
    ],
    usage: {
      element: (v) =>
        `<DnaHelix colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <DnaHelix colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "[string, string]", default: "['139,124,255','94,234,255']", description: "The two strand colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "radar-sweep": {
    controls: [
      { type: "color", key: "color", label: "Sweep color", default: "#22d3ee", code: rgb },
    ],
    render: (v) => (
      <RadarSweep color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "color", type: "string", default: '"34,211,238"', description: "Sweep color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  halftone: {
    controls: [
      { type: "number", key: "gap", label: "Gap", min: 6, max: 40, step: 2, unit: "px", default: 16 },
      { type: "color", key: "color", label: "Dot color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <Halftone gap={n(v, "gap")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "gap", type: "number", default: "16", description: "Dot grid spacing in pixels." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Dot color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  lightning: {
    controls: [
      { type: "color", key: "color", label: "Bolt color", default: "#c4b5fd", code: rgb },
    ],
    render: (v) => (
      <Lightning color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "color", type: "string", default: '"196,181,253"', description: "Bolt glow color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  cells: {
    controls: [
      { type: "number", key: "seeds", label: "Seeds", min: 6, max: 40, step: 2, default: 15 },
    ],
    render: (v) => (
      <Cells seeds={n(v, "seeds")} className="h-full w-full" />
    ),
    props: [
      { name: "seeds", type: "number", default: "15", description: "Number of Voronoi seeds." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Cell colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  equalizer: {
    controls: [
      { type: "number", key: "barWidth", label: "Bar width", min: 10, max: 50, step: 2, unit: "px", default: 24 },
      { type: "color", key: "colorA", label: "Top color", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Bottom color", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<Equalizer barWidth={${n(v, "barWidth")}} colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <Equalizer barWidth={n(v, "barWidth")} colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "barWidth", type: "number", default: "24", description: "Approximate bar width (incl. gap) in pixels." },
      { name: "colors", type: "[string, string]", default: "brand spectrum", description: "Top and bottom gradient colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  smoke: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 2, max: 16, step: 1, default: 6 },
      { type: "color", key: "color", label: "Fog color", default: "#c4b5fd", code: rgb },
    ],
    render: (v) => (
      <Smoke count={n(v, "count")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "6", description: "Number of smoke puffs." },
      { name: "color", type: "string", default: '"196,181,253"', description: "Fog color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  caustics: {
    controls: [
      { type: "number", key: "step", label: "Step", min: 4, max: 24, step: 1, unit: "px", default: 10 },
      { type: "color", key: "color", label: "Color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <Caustics step={n(v, "step")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "step", type: "number", default: "10", description: "Grid step in pixels (smaller = finer, heavier)." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Light color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "magnetic-field": {
    controls: [
      { type: "number", key: "lines", label: "Lines", min: 4, max: 30, step: 2, default: 14 },
      { type: "color", key: "color", label: "Color", default: "#8b5cf6", code: rgb },
    ],
    render: (v) => (
      <MagneticField lines={n(v, "lines")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "lines", type: "number", default: "14", description: "Number of field lines traced from the + pole." },
      { name: "color", type: "string", default: '"139,92,246"', description: "Field-line color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  triangles: {
    controls: [
      { type: "number", key: "size", label: "Cell size", min: 30, max: 120, step: 5, unit: "px", default: 60 },
    ],
    render: (v) => (
      <Triangles size={n(v, "size")} className="h-full w-full" />
    ),
    props: [
      { name: "size", type: "number", default: "60", description: "Cell size in pixels." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Triangle colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  kaleidoscope: {
    controls: [
      { type: "number", key: "segments", label: "Segments", min: 4, max: 20, step: 1, default: 8 },
    ],
    render: (v) => (
      <Kaleidoscope segments={n(v, "segments")} className="h-full w-full" />
    ),
    props: [
      { name: "segments", type: "number", default: "8", description: "Number of mirrored segments." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Petal colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "tron-trails": {
    controls: [
      { type: "number", key: "heads", label: "Heads", min: 2, max: 20, step: 1, default: 8 },
      { type: "number", key: "cell", label: "Cell", min: 20, max: 80, step: 5, unit: "px", default: 40 },
    ],
    render: (v) => (
      <TronTrails heads={n(v, "heads")} cell={n(v, "cell")} className="h-full w-full" />
    ),
    props: [
      { name: "heads", type: "number", default: "8", description: "Number of moving heads." },
      { name: "cell", type: "number", default: "40", description: "Grid cell size in pixels." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Trail colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  oscilloscope: {
    controls: [
      { type: "color", key: "colorA", label: "Wave 1", default: "#22d3ee" },
      { type: "color", key: "colorB", label: "Wave 2", default: "#8b5cf6" },
    ],
    usage: {
      element: (v) =>
        `<Oscilloscope colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <Oscilloscope colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Waveform colors as r,g,b (one line each)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  pinwheel: {
    controls: [
      { type: "number", key: "sectors", label: "Sectors", min: 3, max: 18, step: 1, default: 8 },
    ],
    render: (v) => (
      <Pinwheel sectors={n(v, "sectors")} className="h-full w-full" />
    ),
    props: [
      { name: "sectors", type: "number", default: "8", description: "Number of sectors (blades)." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Blade colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  plexus: {
    controls: [
      { type: "number", key: "density", label: "Density", min: 4, max: 30, default: 12 },
      { type: "color", key: "color", label: "Color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <Plexus density={n(v, "density")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "density", type: "number", default: "12", description: "Approx. nodes per 100k px² (capped)." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Node + line color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "perlin-clouds": {
    controls: [
      { type: "number", key: "step", label: "Step", min: 3, max: 20, step: 1, unit: "px", default: 8 },
      { type: "color", key: "color", label: "Cloud color", default: "#8b5cf6", code: rgb },
    ],
    render: (v) => (
      <PerlinClouds step={n(v, "step")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "step", type: "number", default: "8", description: "Grid step in pixels." },
      { name: "color", type: "string", default: '"139,92,246"', description: "Cloud color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "ink-drops": {
    controls: [
      { type: "number", key: "count", label: "Count", min: 2, max: 16, step: 1, default: 7 },
    ],
    render: (v) => (
      <InkDrops count={n(v, "count")} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "7", description: "Number of ink drops." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Drop colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "data-stream": {
    controls: [
      { type: "number", key: "gap", label: "Gap", min: 16, max: 60, step: 2, unit: "px", default: 32 },
    ],
    render: (v) => (
      <DataStream gap={n(v, "gap")} className="h-full w-full" />
    ),
    props: [
      { name: "gap", type: "number", default: "32", description: "Lane spacing in pixels." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Lane colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  scanlines: {
    controls: [
      { type: "number", key: "bands", label: "Bands", min: 2, max: 16, step: 1, default: 6 },
    ],
    render: (v) => (
      <Scanlines bands={n(v, "bands")} className="h-full w-full" />
    ),
    props: [
      { name: "bands", type: "number", default: "6", description: "Number of glitch bands." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  boids: {
    controls: [
      { type: "number", key: "count", label: "Count", min: 10, max: 120, step: 5, default: 50 },
      { type: "color", key: "color", label: "Color", default: "#8ba0ff", code: rgb },
    ],
    render: (v) => (
      <Boids count={n(v, "count")} color={hexRgb(s(v, "color"))} className="h-full w-full" />
    ),
    props: [
      { name: "count", type: "number", default: "50", description: "Number of boids." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Boid color as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "aurora-curtains": {
    controls: [
      { type: "color", key: "colorA", label: "Color 1", default: "#8b5cf6" },
      { type: "color", key: "colorB", label: "Color 2", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<AuroraCurtains colors={["${hexRgb(s(v, "colorA"))}", "${hexRgb(s(v, "colorB"))}"]} className="h-full w-full" />`,
    },
    render: (v) => (
      <AuroraCurtains colors={[hexRgb(s(v, "colorA")), hexRgb(s(v, "colorB"))]} className="h-full w-full" />
    ),
    props: [
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Curtain colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "cloth-flag": {
    controls: [
      { type: "number", key: "cols", label: "Cols", min: 20, max: 100, step: 5, default: 50 },
      { type: "number", key: "rows", label: "Rows", min: 20, max: 80, step: 5, default: 40 },
      { type: "color", key: "from", label: "Left color", default: "#8b5cf6" },
      { type: "color", key: "to", label: "Right color", default: "#22d3ee" },
    ],
    usage: {
      element: (v) =>
        `<ClothFlag cols={${n(v, "cols")}} rows={${n(v, "rows")}} from={[${hexTuple(s(v, "from"))}]} to={[${hexTuple(s(v, "to"))}]} className="h-full w-full" />`,
    },
    render: (v) => {
      const fb = s(v, "from").replace("#", ""); const tb = s(v, "to").replace("#", "");
      return <ClothFlag cols={n(v, "cols")} rows={n(v, "rows")} from={[parseInt(fb.slice(0,2),16),parseInt(fb.slice(2,4),16),parseInt(fb.slice(4,6),16)]} to={[parseInt(tb.slice(0,2),16),parseInt(tb.slice(2,4),16),parseInt(tb.slice(4,6),16)]} className="h-full w-full" />;
    },
    props: [
      { name: "cols", type: "number", default: "50", description: "Grid columns." },
      { name: "rows", type: "number", default: "40", description: "Grid rows." },
      { name: "from", type: "[number, number, number]", default: "brand violet", description: "Left edge color as [r,g,b]." },
      { name: "to", type: "[number, number, number]", default: "brand cyan", description: "Right edge color as [r,g,b]." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "voronoi-fill": {
    controls: [
      { type: "number", key: "seeds", label: "Seeds", min: 6, max: 40, step: 2, default: 17 },
      { type: "number", key: "step", label: "Step", min: 4, max: 20, step: 1, unit: "px", default: 8 },
    ],
    render: (v) => (
      <VoronoiFill seeds={n(v, "seeds")} step={n(v, "step")} className="h-full w-full" />
    ),
    props: [
      { name: "seeds", type: "number", default: "17", description: "Number of Voronoi seeds." },
      { name: "step", type: "number", default: "8", description: "Grid step in pixels." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Cell colors as r,g,b." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "flow-grid": {
    controls: [
      { type: "number", key: "size", label: "Cell size", min: 30, max: 120, step: 5, unit: "px", default: 56 },
      { type: "color", key: "lineColor", label: "Line color", default: "#8b5cf6" },
    ],
    render: (v) => (
      <FlowGrid size={n(v, "size")} lineColor={s(v, "lineColor")} className="h-full w-full" />
    ),
    props: [
      { name: "size", type: "number", default: "56", description: "Grid cell size in pixels." },
      { name: "lineColor", type: "string", default: "brand violet", description: "Line color (CSS color string)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  "flowing-lines": {
    controls: [
      { type: "number", key: "lines", label: "Lines", min: 4, max: 40, step: 2, default: 16 },
    ],
    render: (v) => (
      <FlowingLines lines={n(v, "lines")} className="h-full w-full" />
    ),
    props: [
      { name: "lines", type: "number", default: "16", description: "Number of flowing lines." },
      { name: "colors", type: "string[]", default: "brand spectrum", description: "Line colors as r,g,b (cycled)." },
      { name: "children", type: "ReactNode", description: "Content layered above the canvas." },
    ],
  },

  /* ---------------------- Interactive showcase (ui) ---------------------- */

  "chroma-card": {
    controls: [
      { type: "number", key: "sheen", label: "Sheen strength", group: "Effect", min: 0, max: 1, step: 0.05, default: 0.55 },
      { type: "number", key: "hueRange", label: "Hue travel", group: "Effect", min: 0, max: 360, step: 10, unit: "°", default: 220, hint: "How far the sheen hue shifts across the card." },
      { type: "number", key: "rgbShift", label: "RGB shift", group: "Effect", min: 0, max: 14, step: 1, unit: "px", default: 5 },
      { type: "boolean", key: "glare", label: "Specular glare", group: "Effect", default: true },
      { type: "number", key: "tilt", label: "Tilt", group: "Interaction", min: 0, max: 25, step: 1, unit: "°", default: 10 },
      { type: "number", key: "scale", label: "Hover scale", group: "Interaction", min: 1, max: 1.15, step: 0.01, default: 1.03 },
      { type: "number", key: "duration", label: "Settle duration", group: "Interaction", min: 0.1, max: 1.5, step: 0.1, unit: "s", default: 0.5 },
      { type: "number", key: "radius", label: "Corner radius", group: "Card", min: 0, max: 36, step: 2, unit: "px", default: 20 },
      { type: "boolean", key: "glow", label: "Drop glow", group: "Card", default: true },
      { type: "color", key: "glowColor", label: "Glow color", group: "Card", default: "#8b5cf6" },
    ],
    usage: {
      element: (v) =>
        `<ChromaCard tilt={${n(v, "tilt")}} scale={${n(v, "scale")}} rgbShift={${n(v, "rgbShift")}} sheen={${n(v, "sheen")}} hueRange={${n(v, "hueRange")}} radius={${n(v, "radius")}} glare={${bool(v, "glare")}} glow={${bool(v, "glow")}} glowColor="${s(v, "glowColor")}" duration={${n(v, "duration")}} className="w-72 p-6">
  Your card content
</ChromaCard>`,
    },
    render: (v) => (
      <ChromaCard
        tilt={n(v, "tilt")}
        scale={n(v, "scale")}
        rgbShift={n(v, "rgbShift")}
        sheen={n(v, "sheen")}
        hueRange={n(v, "hueRange")}
        radius={n(v, "radius")}
        glare={bool(v, "glare")}
        glow={bool(v, "glow")}
        glowColor={s(v, "glowColor")}
        duration={n(v, "duration")}
        className="w-72 p-6"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-2">
          Holo pass
        </p>
        <h3 className="mt-2 text-xl font-semibold">Aurora Nine</h3>
        <p className="mt-1 text-sm text-muted">
          Tilt me — the sheen shifts hue with the pointer.
        </p>
        <div className="mt-5 flex items-center justify-between text-xs text-muted-2">
          <span className="font-mono">#0042</span>
          <span className="rounded-full bg-brand/15 px-2 py-0.5 font-medium text-brand-ink">
            Rare
          </span>
        </div>
      </ChromaCard>
    ),
    props: [
      { name: "tilt", type: "number", default: "10", description: "Max tilt toward the pointer, in degrees." },
      { name: "scale", type: "number", default: "1.03", description: "Scale applied while hovered." },
      { name: "rgbShift", type: "number", default: "5", description: "Chromatic red/cyan fringe offset on hover, in pixels." },
      { name: "sheen", type: "number", default: "0.55", description: "Holographic sheen strength (0–1)." },
      { name: "hueRange", type: "number", default: "220", description: "How far the sheen hue travels with the pointer, in degrees." },
      { name: "radius", type: "number", default: "20", description: "Corner radius in pixels." },
      { name: "glare", type: "boolean", default: "true", description: "Pointer-tracking specular highlight." },
      { name: "glow", type: "boolean", default: "true", description: "Soft colored drop glow beneath the card while hovered." },
      { name: "glowColor", type: "string", default: '"var(--brand)"', description: "Glow color (any CSS color)." },
      { name: "duration", type: "number", default: "0.5", description: "Settle transition on pointer enter/leave, in seconds." },
      { name: "children", type: "ReactNode", description: "Card content.", required: true },
    ],
  },

  "device-mockup": {
    controls: [
      { type: "select", key: "variant", label: "Device", group: "Device", options: [
        { label: "Phone", value: "phone" },
        { label: "Tablet", value: "tablet" },
        { label: "Browser", value: "browser" },
      ], default: "phone" },
      { type: "number", key: "width", label: "Width", group: "Device", min: 160, max: 560, step: 10, unit: "px", default: 240 },
      { type: "select", key: "notch", label: "Camera cutout", group: "Screen", options: [
        { label: "Island", value: "island" },
        { label: "Notch", value: "notch" },
        { label: "None", value: "none" },
      ], default: "island", hint: "Phone frames only." },
      { type: "text", key: "url", label: "Address bar", group: "Screen", default: "ononc.dev", hint: "Browser frames only." },
      { type: "boolean", key: "glare", label: "Glass glare", group: "Screen", default: true },
      { type: "select", key: "frame", label: "Finish", group: "Finish", options: [
        { label: "Graphite", value: "graphite" },
        { label: "Silver", value: "silver" },
        { label: "Midnight", value: "midnight" },
      ], default: "graphite" },
      { type: "boolean", key: "shadow", label: "Drop shadow", group: "Finish", default: true },
    ],
    render: (v) => (
      <DeviceMockup
        variant={s(v, "variant") as DeviceVariant}
        frame={s(v, "frame") as DeviceFrame}
        notch={s(v, "notch") as PhoneNotch}
        url={s(v, "url")}
        width={n(v, "width")}
        shadow={bool(v, "shadow")}
        glare={bool(v, "glare")}
      />
    ),
    props: [
      { name: "variant", type: '"phone" | "browser" | "tablet"', default: '"phone"', description: "Which device chrome to draw." },
      { name: "frame", type: '"graphite" | "silver" | "midnight"', default: '"graphite"', description: "Hardware finish of the frame." },
      { name: "notch", type: '"island" | "notch" | "none"', default: '"island"', description: "Camera cutout style (phone only)." },
      { name: "url", type: "string", default: '"ononc.dev"', description: "Address-bar text (browser only)." },
      { name: "width", type: "number", default: "per device", description: "Frame width in pixels; height follows the device aspect ratio." },
      { name: "shadow", type: "boolean", default: "true", description: "Soft drop shadow beneath the device." },
      { name: "glare", type: "boolean", default: "false", description: "Diagonal glass reflection across the screen." },
      { name: "children", type: "ReactNode", description: "Screen content; a neutral placeholder renders when omitted." },
    ],
  },

  "infinite-gallery": {
    controls: [
      { type: "number", key: "tileWidth", label: "Tile width", group: "Tiles", min: 100, max: 260, step: 4, unit: "px", default: 168 },
      { type: "number", key: "tileHeight", label: "Tile height", group: "Tiles", min: 72, max: 200, step: 4, unit: "px", default: 112 },
      { type: "number", key: "gap", label: "Gap", group: "Tiles", min: 4, max: 32, step: 2, unit: "px", default: 12 },
      { type: "number", key: "radius", label: "Corner radius", group: "Tiles", min: 0, max: 28, step: 2, unit: "px", default: 14 },
      { type: "boolean", key: "hoverLift", label: "Lift on hover", group: "Tiles", default: true },
      { type: "number", key: "cols", label: "Pattern columns", group: "Pattern", min: 2, max: 6, step: 1, default: 4 },
      { type: "number", key: "rows", label: "Pattern rows", group: "Pattern", min: 2, max: 5, step: 1, default: 3 },
      { type: "number", key: "speed", label: "Drift speed", group: "Motion", min: 0, max: 120, step: 4, unit: "px/s", default: 24 },
      { type: "number", key: "angle", label: "Drift angle", group: "Motion", min: 0, max: 360, step: 15, unit: "°", default: 135 },
      { type: "number", key: "friction", label: "Throw friction", group: "Motion", min: 0.8, max: 0.98, step: 0.01, default: 0.92, hint: "Higher glides further after release." },
    ],
    usage: { extra: 'className="h-96 w-full"' },
    render: (v) => (
      <div className="h-[380px] w-[560px] overflow-hidden rounded-2xl border border-border">
        <InfiniteGallery
          tileWidth={n(v, "tileWidth")}
          tileHeight={n(v, "tileHeight")}
          gap={n(v, "gap")}
          radius={n(v, "radius")}
          hoverLift={bool(v, "hoverLift")}
          cols={n(v, "cols")}
          rows={n(v, "rows")}
          speed={n(v, "speed")}
          angle={n(v, "angle")}
          friction={n(v, "friction")}
        />
      </div>
    ),
    props: [
      { name: "items", type: "ReactNode[]", default: "gradient set", description: "Tile faces, cycled across the wall (rendered decoratively)." },
      { name: "tileWidth", type: "number", default: "168", description: "Tile width in pixels." },
      { name: "tileHeight", type: "number", default: "112", description: "Tile height in pixels." },
      { name: "gap", type: "number", default: "12", description: "Gap between tiles in pixels." },
      { name: "cols", type: "number", default: "4", description: "Base pattern columns, tiled infinitely." },
      { name: "rows", type: "number", default: "3", description: "Base pattern rows, tiled infinitely." },
      { name: "speed", type: "number", default: "24", description: "Idle drift speed in px/s (0 disables)." },
      { name: "angle", type: "number", default: "135", description: "Idle drift direction in degrees." },
      { name: "friction", type: "number", default: "0.92", description: "Inertia decay per frame after a throw (0–0.99)." },
      { name: "radius", type: "number", default: "14", description: "Tile corner radius in pixels." },
      { name: "hoverLift", type: "boolean", default: "true", description: "Scale tiles up slightly on hover." },
      { name: "label", type: "string", default: '"Infinite gallery"', description: "Accessible name for the pannable region." },
    ],
  },

  "smooth-cursor": {
    controls: [
      { type: "select", key: "variant", label: "Parts", group: "Cursor", options: [
        { label: "Dot + ring", value: "both" },
        { label: "Ring", value: "ring" },
        { label: "Dot", value: "dot" },
      ], default: "both" },
      { type: "number", key: "size", label: "Ring size", group: "Cursor", min: 16, max: 72, step: 2, unit: "px", default: 34 },
      { type: "number", key: "dotSize", label: "Dot size", group: "Cursor", min: 3, max: 14, step: 1, unit: "px", default: 6 },
      { type: "color", key: "color", label: "Color", group: "Style", default: "#8b5cf6" },
      { type: "boolean", key: "blend", label: "Difference blend", group: "Style", default: false },
      { type: "boolean", key: "hideNative", label: "Hide native cursor", group: "Style", default: true },
      { type: "number", key: "smooth", label: "Smoothing", group: "Motion", min: 0.04, max: 0.4, step: 0.02, default: 0.14, hint: "Lower floats further behind the pointer." },
      { type: "number", key: "trail", label: "Trail ghosts", group: "Motion", min: 0, max: 8, step: 1, default: 4 },
      { type: "number", key: "growScale", label: "Hover growth", group: "Motion", min: 1, max: 3, step: 0.1, default: 1.8, unit: "×" },
    ],
    usage: {
      element: (v) =>
        `<SmoothCursor variant="${s(v, "variant")}" size={${n(v, "size")}} dotSize={${n(v, "dotSize")}} smooth={${n(v, "smooth")}} trail={${n(v, "trail")}} growScale={${n(v, "growScale")}} blend={${bool(v, "blend")}} color="${s(v, "color")}" hideNative={${bool(v, "hideNative")}} className="h-96">
  Your hover area
</SmoothCursor>`,
    },
    render: (v) => (
      <div className="h-[360px] w-[560px] overflow-hidden rounded-2xl border border-border bg-background">
        <SmoothCursor
          variant={s(v, "variant") as SmoothCursorVariant}
          size={n(v, "size")}
          dotSize={n(v, "dotSize")}
          smooth={n(v, "smooth")}
          trail={n(v, "trail")}
          growScale={n(v, "growScale")}
          blend={bool(v, "blend")}
          color={s(v, "color")}
          hideNative={bool(v, "hideNative")}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <p className="text-sm text-muted">Move around, then hover a target.</p>
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
              >
                Hover me
              </button>
              <button
                type="button"
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
              >
                Or me
              </button>
            </div>
          </div>
        </SmoothCursor>
      </div>
    ),
    props: [
      { name: "variant", type: '"both" | "ring" | "dot"', default: '"both"', description: "Which cursor parts to draw." },
      { name: "size", type: "number", default: "34", description: "Ring diameter in pixels." },
      { name: "dotSize", type: "number", default: "6", description: "Dot diameter in pixels." },
      { name: "smooth", type: "number", default: "0.14", description: "Ring follow smoothing (0.02 = floaty, 0.4 = tight)." },
      { name: "trail", type: "number", default: "0", description: "Number of ghost dots trailing the cursor (0 disables)." },
      { name: "growScale", type: "number", default: "1.8", description: "Ring growth over links, buttons and [data-cursor-hover]." },
      { name: "blend", type: "boolean", default: "false", description: "Blend the cursor with what's underneath (difference)." },
      { name: "color", type: "string", default: '"var(--brand)"', description: "Cursor color (any CSS color)." },
      { name: "hideNative", type: "boolean", default: "true", description: "Hide the native cursor inside the area." },
      { name: "children", type: "ReactNode", description: "The hover area the cursor lives in.", required: true },
    ],
  },

  "swipe-cards": {
    controls: [
      { type: "boolean", key: "loop", label: "Loop deck", group: "Deck", default: true },
      { type: "number", key: "stackDepth", label: "Cards behind", group: "Deck", min: 1, max: 3, step: 1, default: 2 },
      { type: "number", key: "swipeRotation", label: "Swipe tilt", group: "Motion", min: 0, max: 30, step: 2, unit: "°", default: 18 },
      { type: "boolean", key: "showStamps", label: "Keep / Pass stamps", group: "Overlay", default: true },
      { type: "boolean", key: "showControls", label: "Control buttons", group: "Overlay", default: true },
    ],
    usage: {
      element: (v) =>
        `<SwipeCards loop={${bool(v, "loop")}} stackDepth={${n(v, "stackDepth")}} swipeRotation={${n(v, "swipeRotation")}} showStamps={${bool(v, "showStamps")}} showControls={${bool(v, "showControls")}} />`,
    },
    render: (v) => (
      <SwipeCards
        loop={bool(v, "loop")}
        stackDepth={n(v, "stackDepth")}
        swipeRotation={n(v, "swipeRotation")}
        showStamps={bool(v, "showStamps")}
        showControls={bool(v, "showControls")}
      />
    ),
    props: [
      { name: "items", type: "SwipeCardItem[]", default: "gradient set", description: "Cards to deal, front to back ({ id, title, subtitle?, background?, tags? })." },
      { name: "loop", type: "boolean", default: "true", description: "Recycle swiped cards to the back so the deck never empties." },
      { name: "swipeRotation", type: "number", default: "18", description: "Max tilt (deg) as the front card is dragged sideways." },
      { name: "stackDepth", type: "number", default: "2", description: "How many cards peek behind the front one (1–3)." },
      { name: "showStamps", type: "boolean", default: "true", description: "Show the Keep/Pass stamps that fade in as you drag." },
      { name: "showControls", type: "boolean", default: "true", description: "Show the circular Pass/Keep buttons below the deck." },
      { name: "onSwipe", type: "(id, direction) => void", description: "Fires when a card leaves the deck, with its swipe direction." },
      { name: "label", type: "string", default: '"Swipeable card deck"', description: "Accessible name for the deck." },
    ],
  },

  preloader: {
    controls: [
      { type: "number", key: "duration", label: "Duration", group: "Loading", min: 0.5, max: 6, step: 0.1, unit: "s", default: 2.2, hint: "Use Refresh Preview to replay." },
      { type: "select", key: "variant", label: "Readout", group: "Loading", options: [
        { label: "Counter", value: "counter" },
        { label: "Bar", value: "bar" },
        { label: "Dots", value: "dots" },
      ], default: "counter" },
      { type: "text", key: "label", label: "Label", group: "Loading", default: "Loading" },
      { type: "boolean", key: "showPercent", label: "Show percent", group: "Loading", default: true },
      { type: "select", key: "reveal", label: "Curtain exit", group: "Reveal", options: [
        { label: "Up", value: "up" },
        { label: "Down", value: "down" },
        { label: "Split", value: "split" },
        { label: "Fade", value: "fade" },
      ], default: "up" },
      { type: "select", key: "backdrop", label: "Backdrop", group: "Style", options: [
        { label: "Ink", value: "ink" },
        { label: "Surface", value: "surface" },
        { label: "Brand", value: "brand" },
      ], default: "ink" },
      { type: "color", key: "accent", label: "Accent", group: "Style", default: "#8b5cf6" },
    ],
    usage: {
      element: (v) =>
        `<Preloader duration={${n(v, "duration")}} variant="${s(v, "variant")}" reveal="${s(v, "reveal")}" backdrop="${s(v, "backdrop")}" accent="${s(v, "accent")}" label={${JSON.stringify(s(v, "label"))}} showPercent={${bool(v, "showPercent")}} />`,
    },
    render: (v) => (
      <div className="relative h-[360px] w-[560px] overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h3 className="text-xl font-semibold">Page content</h3>
          <p className="text-sm text-muted">Revealed when loading completes.</p>
        </div>
        <Preloader
          duration={n(v, "duration")}
          variant={s(v, "variant") as PreloaderVariant}
          reveal={s(v, "reveal") as PreloaderReveal}
          backdrop={s(v, "backdrop") as PreloaderBackdrop}
          accent={s(v, "accent")}
          label={s(v, "label")}
          showPercent={bool(v, "showPercent")}
        />
      </div>
    ),
    props: [
      { name: "duration", type: "number", default: "2.2", description: "Simulated load time in seconds." },
      { name: "variant", type: '"counter" | "bar" | "dots"', default: '"counter"', description: "Progress readout style." },
      { name: "reveal", type: '"up" | "down" | "split" | "fade"', default: '"up"', description: "How the curtain exits once loading completes." },
      { name: "backdrop", type: '"ink" | "surface" | "brand"', default: '"ink"', description: "Curtain surface." },
      { name: "accent", type: "string", default: '"var(--brand)"', description: "Accent color for the counter / bar / dots." },
      { name: "label", type: "string", default: '"Loading"', description: "Status label announced to assistive tech." },
      { name: "showPercent", type: "boolean", default: "true", description: "Show the numeric percentage." },
      { name: "onComplete", type: "() => void", description: "Called once, when the curtain starts revealing." },
    ],
  },

  globe: {
    controls: [
      { type: "number", key: "dots", label: "Dots", group: "Sphere", min: 120, max: 1200, step: 20, default: 520 },
      { type: "number", key: "dotSize", label: "Dot size", group: "Sphere", min: 0.8, max: 3, step: 0.1, unit: "px", default: 1.6 },
      { type: "color", key: "color", label: "Dot color", group: "Sphere", default: "#8ba0ff", code: rgb },
      { type: "boolean", key: "atmosphere", label: "Atmosphere", group: "Sphere", default: true },
      { type: "number", key: "arcs", label: "Arcs", group: "Arcs", min: 0, max: 14, step: 1, default: 6 },
      { type: "color", key: "accent", label: "Arc color", group: "Arcs", default: "#c4b5fd", code: rgb },
      { type: "number", key: "speed", label: "Spin speed", group: "Motion", min: 0, max: 60, step: 2, unit: "°/s", default: 14 },
      { type: "number", key: "tilt", label: "Tilt", group: "Motion", min: 0, max: 45, step: 1, unit: "°", default: 18 },
      { type: "boolean", key: "draggable", label: "Drag to spin", group: "Motion", default: true },
    ],
    usage: { extra: 'className="size-96"' },
    render: (v) => (
      <Globe
        dots={n(v, "dots")}
        dotSize={n(v, "dotSize")}
        color={hexRgb(s(v, "color"))}
        atmosphere={bool(v, "atmosphere")}
        arcs={n(v, "arcs")}
        accent={hexRgb(s(v, "accent"))}
        speed={n(v, "speed")}
        tilt={n(v, "tilt")}
        draggable={bool(v, "draggable")}
        className="h-[380px] w-[380px]"
      />
    ),
    props: [
      { name: "dots", type: "number", default: "520", description: "Number of surface dots." },
      { name: "dotSize", type: "number", default: "1.6", description: "Dot radius in pixels." },
      { name: "speed", type: "number", default: "14", description: "Auto-rotation speed in degrees per second." },
      { name: "tilt", type: "number", default: "18", description: "Axial tilt in degrees." },
      { name: "color", type: "string", default: '"139,160,255"', description: "Dot color as r,g,b." },
      { name: "accent", type: "string", default: '"196,181,253"', description: "Arc color as r,g,b." },
      { name: "arcs", type: "number", default: "6", description: "Number of animated connection arcs (0 disables)." },
      { name: "atmosphere", type: "boolean", default: "true", description: "Soft atmosphere glow and rim light." },
      { name: "draggable", type: "boolean", default: "true", description: "Allow dragging to spin the globe (with inertia)." },
      { name: "label", type: "string", default: '"Rotating dotted globe"', description: "Accessible description of the visual." },
    ],
  },
};