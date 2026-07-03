import type {
  Control,
  ControlValue,
  PlaygroundValues,
  UsageMeta,
} from "@/registry/types";

/* ----------------------------------------------------------------------------
 * Pure helpers behind the component-detail Customize panel: the generated
 * "Usage" snippet, shareable URL state, and value randomization. Kept free of
 * React so they are trivially unit-testable.
 * ------------------------------------------------------------------------- */

/** "particle-field" -> "ParticleField". */
export function pascalCase(id: string): string {
  return id
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

/** "components/ui/badge.tsx" -> '@/components/ui/badge'. */
export function importPathFromSource(sourcePath: string): string {
  return `@/${sourcePath.replace(/\.(t|j)sx?$/, "")}`;
}

/** Characters that force a JSX string attribute into expression form. */
const NEEDS_EXPR_ATTR = /["\\\n]/;
/** Characters that force JSX children into expression form. */
const NEEDS_EXPR_CHILD = /[{}<>]/;

function attrFor(name: string, value: ControlValue | { raw: string }): string {
  if (typeof value === "object") return `${name}=${value.raw}`;
  if (typeof value === "boolean") return value ? name : `${name}={false}`;
  if (typeof value === "number") return `${name}={${value}}`;
  return NEEDS_EXPR_ATTR.test(value)
    ? `${name}={${JSON.stringify(value)}}`
    : `${name}="${value}"`;
}

export interface UsageInput {
  id: string;
  /** Source path relative to `src/`, used for the import line. */
  sourcePath?: string;
  /** Full-bleed background components get `className="h-full w-full"`. */
  bleed?: boolean;
  controls: readonly Control[];
  usage?: UsageMeta;
}

/**
 * Build the live Usage snippet for a component from its current Customize
 * values: an import line plus a JSX element whose attributes mirror the
 * controls (respecting each control's `code` emission metadata).
 */
export function buildUsage(input: UsageInput, values: PlaygroundValues): string {
  const name = input.usage?.name ?? pascalCase(input.id);
  const importLine = input.sourcePath
    ? `import { ${name} } from "${importPathFromSource(input.sourcePath)}";`
    : null;

  const element = input.usage?.element
    ? input.usage.element(values)
    : buildElement(name, input, values);

  return importLine ? `${importLine}\n\n${element}` : element;
}

function buildElement(
  name: string,
  input: UsageInput,
  values: PlaygroundValues,
): string {
  const attrs: string[] = [];
  let children: string | null = null;

  for (const control of input.controls) {
    const meta = control.code;
    if (meta?.hidden) continue;
    const value = values[control.key] ?? control.default;
    if (meta?.omitWhen !== undefined && value === meta.omitWhen) continue;
    if (meta?.children) {
      children = String(value);
      continue;
    }
    // An empty string is never a meaningful attribute value.
    if (value === "") continue;
    const prop = meta?.prop ?? control.key;
    attrs.push(attrFor(prop, meta?.format ? meta.format(value) : value));
  }

  const extra = input.usage?.extra ?? (input.bleed ? 'className="h-full w-full"' : undefined);
  if (extra) attrs.push(extra);

  const opening = `<${name}${attrs.length ? ` ${attrs.join(" ")}` : ""}`;
  if (children === null) return `${opening} />`;

  const body = NEEDS_EXPR_CHILD.test(children)
    ? `{${JSON.stringify(children)}}`
    : children;
  return `${opening}>\n  ${body}\n</${name}>`;
}

/* ------------------------------- URL state ------------------------------- */

/** Entries that differ from each control's default. */
export function diffValues(
  controls: readonly Control[],
  values: PlaygroundValues,
): PlaygroundValues {
  const diff: PlaygroundValues = {};
  for (const control of controls) {
    const value = values[control.key];
    if (value !== undefined && value !== control.default) diff[control.key] = value;
  }
  return diff;
}

/** Number of controls whose value differs from its default. */
export function countModified(
  controls: readonly Control[],
  values: PlaygroundValues,
): number {
  return Object.keys(diffValues(controls, values)).length;
}

/**
 * Encode the non-default values as a compact URL-safe string, or `null` when
 * everything is at its default (no param needed).
 */
export function encodePlaygroundState(
  controls: readonly Control[],
  values: PlaygroundValues,
): string | null {
  const diff = diffValues(controls, values);
  if (!Object.keys(diff).length) return null;
  return encodeURIComponent(JSON.stringify(diff));
}

const MAX_TEXT_LENGTH = 300;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

/**
 * Decode + validate a shared state param against the controls. Unknown keys
 * are dropped, numbers are clamped into range, selects must match an option.
 * Returns a full value map (defaults + valid overrides), or `null` when the
 * param is unusable.
 */
export function decodePlaygroundState(
  controls: readonly Control[],
  raw: string,
): PlaygroundValues | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }
  const entries = parsed as Record<string, unknown>;

  const result: PlaygroundValues = {};
  let applied = false;
  for (const control of controls) {
    result[control.key] = control.default;
    const value = entries[control.key];
    if (value === undefined) continue;
    const sanitized = sanitizeValue(control, value);
    if (sanitized !== undefined) {
      result[control.key] = sanitized;
      applied = true;
    }
  }
  return applied ? result : null;
}

function sanitizeValue(control: Control, value: unknown): ControlValue | undefined {
  switch (control.type) {
    case "number": {
      const num = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(num)) return undefined;
      return Math.min(control.max, Math.max(control.min, num));
    }
    case "boolean":
      return typeof value === "boolean" ? value : undefined;
    case "select":
      return typeof value === "string" &&
        control.options.some((o) => o.value === value)
        ? value
        : undefined;
    case "color":
      return typeof value === "string" && HEX_COLOR.test(value)
        ? value.toLowerCase()
        : undefined;
    case "text":
      return typeof value === "string" ? value.slice(0, MAX_TEXT_LENGTH) : undefined;
  }
}

/* ------------------------------- Randomize ------------------------------- */

function hslToHex(h: number, s: number, l: number): string {
  const lightness = l / 100;
  const a = (s / 100) * Math.min(lightness, 1 - lightness);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

/** Decimal places of a step like 0.05 -> 2. */
function decimalsOf(step: number): number {
  const text = String(step);
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : text.length - dot - 1;
}

/**
 * Produce a random-but-valid value set: numbers snap to their step within
 * [min, max], selects pick a random option, colors get a vivid random hue.
 * Text controls keep their current value (random text is never useful).
 */
export function randomizeValues(
  controls: readonly Control[],
  current: PlaygroundValues,
  random: () => number = Math.random,
): PlaygroundValues {
  const next: PlaygroundValues = {};
  for (const control of controls) {
    switch (control.type) {
      case "number": {
        const step = control.step ?? 1;
        const steps = Math.floor((control.max - control.min) / step);
        const value = control.min + step * Math.floor(random() * (steps + 1));
        next[control.key] = Number(
          Math.min(control.max, value).toFixed(decimalsOf(step)),
        );
        break;
      }
      case "boolean":
        next[control.key] = random() < 0.5;
        break;
      case "select": {
        const index = Math.floor(random() * control.options.length);
        next[control.key] = control.options[index].value;
        break;
      }
      case "color":
        next[control.key] = hslToHex(
          Math.floor(random() * 360),
          70 + Math.floor(random() * 25),
          55 + Math.floor(random() * 15),
        );
        break;
      case "text":
        next[control.key] = current[control.key] ?? control.default;
        break;
    }
  }
  return next;
}
