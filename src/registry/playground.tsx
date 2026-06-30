"use client";

import { Alert, type AlertVariant } from "@/components/ui/alert";
import { Avatar, type AvatarStatus } from "@/components/ui/avatar";
import { Badge, type BadgeTone, type BadgeVariant } from "@/components/ui/badge";
import { CountUp } from "@/components/text/count-up";
import { GradientText } from "@/components/text/gradient-text";
import { Kbd } from "@/components/ui/kbd";
import { NumberInput } from "@/components/ui/number-input";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Rating } from "@/components/ui/rating";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Separator } from "@/components/ui/separator";
import { ShinyText } from "@/components/text/shiny-text";
import { Slider } from "@/components/ui/slider";
import { Spinner, type SpinnerSize } from "@/components/ui/spinner";
import { StatCard } from "@/components/ui/stat-card";
import { Switch } from "@/components/ui/switch";
import { Typewriter } from "@/components/text/typewriter";
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
