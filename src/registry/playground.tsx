"use client";

import { Alert, type AlertVariant } from "@/components/ui/alert";
import { Avatar, type AvatarStatus } from "@/components/ui/avatar";
import { Badge, type BadgeTone, type BadgeVariant } from "@/components/ui/badge";
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
import { DotMatrix } from "@/components/backgrounds/dot-matrix";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { Starfield } from "@/components/backgrounds/starfield";
import type { PlaygroundSpec, PlaygroundValues } from "@/registry/types";

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
      { type: "text", key: "text", label: "Label", default: "Badge" },
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
      { type: "text", key: "body", label: "Body", default: "Your invoice has been paid in full." },
      { type: "boolean", key: "dismissible", label: "Dismissible", default: true },
    ],
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
      { type: "boolean", key: "checked", label: "Checked", default: true },
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
      { type: "number", key: "value", label: "Default value", min: 0, max: 100, default: 60 },
      { type: "number", key: "min", label: "Min", min: 0, max: 50, default: 0, variant: "stepper" },
      { type: "number", key: "max", label: "Max", min: 50, max: 200, default: 100, variant: "stepper" },
      { type: "number", key: "step", label: "Step", min: 1, max: 25, default: 1, variant: "stepper" },
    ],
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
      { type: "number", key: "value", label: "Default value", min: 0, max: 10, default: 3, variant: "stepper" },
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
      { type: "text", key: "keys", label: "Keys (comma-separated)", default: "⌘, K" },
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
      { type: "number", key: "value", label: "Default value", min: 0, max: 100, default: 2, variant: "stepper" },
      { type: "number", key: "min", label: "Min", min: 0, max: 50, default: 0, variant: "stepper" },
      { type: "number", key: "max", label: "Max", min: 1, max: 100, default: 10, variant: "stepper" },
      { type: "number", key: "step", label: "Step", min: 1, max: 10, default: 1, variant: "stepper" },
    ],
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
      { type: "text", key: "text", label: "Text", default: "Gradient text" },
      { type: "number", key: "speed", label: "Speed", min: 2, max: 20, unit: "s", default: 8 },
    ],
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
      { type: "text", key: "text", label: "Text", default: "Shiny text" },
      { type: "number", key: "speed", label: "Speed", min: 1, max: 10, unit: "s", default: 3 },
    ],
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
      { type: "text", key: "text", label: "Text", default: "Wiped into view" },
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
      { type: "text", key: "text", label: "Text", default: "Tracking in" },
      { type: "number", key: "duration", label: "Duration", min: 0.4, max: 3, step: 0.1, unit: "s", default: 1 },
    ],
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
      { type: "text", key: "words", label: "Words (comma-separated)", default: "designers, developers, founders" },
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
      { type: "text", key: "words", label: "Words (comma-separated)", default: "Design, Build, Ship, Repeat" },
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
      { type: "text", key: "text", label: "Text", default: "highlight" },
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
      { type: "text", key: "text", label: "Text", default: "Hover this link" },
    ],
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
      { type: "text", key: "text", label: "Text", default: "important" },
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
      { type: "text", key: "text", label: "Text", default: "HOLOGRAM" },
      { type: "number", key: "speed", label: "Speed", min: 1, max: 10, step: 0.5, unit: "s", default: 3.5 },
    ],
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
      { type: "text", key: "text", label: "Text", default: "SHADOW" },
      { type: "color", key: "color", label: "Glow color", default: "#8b5cf6" },
    ],
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
      { type: "text", key: "text", label: "Text", default: "Breathe" },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 8, step: 0.5, unit: "s", default: 4 },
      { type: "number", key: "scale", label: "Scale", min: 1.01, max: 1.2, step: 0.01, default: 1.04 },
    ],
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
      { type: "text", key: "text", label: "Text", default: "Pulse" },
      { type: "color", key: "color", label: "Glow color", default: "#8b5cf6" },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 5, step: 0.2, unit: "s", default: 2.2 },
    ],
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
      { type: "text", key: "text", label: "Text", default: "Breaking - UPDATES - rolling - continuously -" },
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
      { type: "text", key: "words", label: "Words (comma-separated)", default: "fluid, smooth, elegant" },
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
      { type: "text", key: "words", label: "Words (comma-separated)", default: "DEPARTING, ARRIVING, BOARDING" },
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
      { type: "text", key: "text", label: "Text", default: "Wave passing through" },
      { type: "color", key: "color", label: "Wave color", default: "#22d3ee" },
      { type: "number", key: "duration", label: "Duration", min: 1, max: 6, step: 0.2, unit: "s", default: 3 },
    ],
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
  "particle-field": {
    controls: [
      { type: "number", key: "density", label: "Density", min: 2, max: 24, default: 9 },
      { type: "number", key: "linkDistance", label: "Link distance", min: 60, max: 220, unit: "px", default: 130 },
      { type: "color", key: "color", label: "Color", default: "#8ba0ff" },
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
      { type: "color", key: "color", label: "Color", default: "#96aaff" },
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
      { type: "color", key: "color", label: "Color", default: "#d2dcff" },
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
};
