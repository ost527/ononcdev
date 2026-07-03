import type { ReactNode } from "react";

export type CategoryId = "backgrounds" | "text" | "ui" | "blocks";

export interface RegistryItem {
  /** Stable slug, unique within the library. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line description of what it does. */
  description: string;
  /** Source file path relative to `src/`, shown in the Code tab. */
  sourcePath: string;
  /** Short capability tags shown on the card. */
  tags?: string[];
  /** Live preview rendered inside the showcase frame. */
  preview: ReactNode;
  /** Tailwind classes controlling the preview frame (e.g. height). */
  frameClassName?: string;
  /**
   * Extra classes for the block-layout preview wrapper (desktop view). Used to
   * reserve vertical space beneath navbars whose menus open downward (absolutely
   * positioned), so an open dropdown never overlaps the next block in the list.
   */
  previewClassName?: string;
  /** Extra inset applied around the block-layout preview frame, in pixels. */
  previewPadding?: number;
  /** Whether the block-layout preview frame should draw its outer border. */
  previewBorder?: boolean;
  /** When true the preview fills the frame edge-to-edge (backgrounds). */
  bleed?: boolean;
}

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  items: RegistryItem[];
}

/* ----------------------------------------------------------------------------
 * Playground (component-detail) types
 *
 * These describe the per-component "Customize" controls and "Props" docs shown
 * on the component detail page. They are pure data/types so they are safe to
 * import from both server and client modules. The actual `render` functions
 * live in the client module `src/registry/playground.tsx` (a function cannot be
 * passed across the server/client boundary).
 * ------------------------------------------------------------------------- */

/** A single value produced by a Customize control. */
export type ControlValue = string | number | boolean;

/** Map of control `key` -> current value, passed to `PlaygroundSpec.render`. */
export type PlaygroundValues = Record<string, ControlValue>;

/**
 * How a control is emitted into the generated "Usage" snippet. By default a
 * control becomes an attribute named after its `key` with the raw value.
 */
export interface ControlCodeMeta {
  /** Emit the value as the element's children instead of an attribute. */
  children?: boolean;
  /** Attribute name when it differs from the control key. */
  prop?: string;
  /** Skip the attribute when the value equals this sentinel. */
  omitWhen?: ControlValue;
  /** Never emit this control into the snippet. */
  hidden?: boolean;
  /**
   * Map the raw control value to what is emitted: return a string / number /
   * boolean to be quoted normally, or `{ raw }` for a verbatim attribute value
   * (e.g. `{["a", "b"]}`).
   */
  format?: (value: ControlValue) => ControlValue | { raw: string };
}

/** Per-spec options for the generated "Usage" snippet. */
export interface UsageMeta {
  /** JSX tag name; defaults to the PascalCase of the component id. */
  name?: string;
  /** Literal attributes always appended verbatim, e.g. `className="w-80"`. */
  extra?: string;
  /** Replace the generated element entirely (the import line is kept). */
  element?: (values: PlaygroundValues) => string;
}

interface BaseControl {
  /** Unique key within a spec; conventionally the prop name it maps to. */
  key: string;
  /** Human-readable label shown in the Customize panel. */
  label: string;
  /** Optional helper text rendered beneath the control. */
  hint?: string;
  /**
   * Titled section this control belongs to in the Customize panel (e.g.
   * "Interaction"). Controls sharing a group cluster under one heading, in
   * first-appearance order; ungrouped controls render first, untitled.
   */
  group?: string;
  /** Usage-snippet emission overrides for this control. */
  code?: ControlCodeMeta;
}

/** A numeric control rendered as a Slider (default) or a NumberInput. */
export interface NumberControl extends BaseControl {
  type: "number";
  min: number;
  max: number;
  step?: number;
  default: number;
  variant?: "slider" | "stepper";
  /** Unit suffix shown in the value readout, e.g. "px" or "s". */
  unit?: string;
}

/** A boolean control rendered as a Switch. */
export interface BooleanControl extends BaseControl {
  type: "boolean";
  default: boolean;
}

/** A single-choice control rendered as a SegmentedControl or a Select. */
export interface SelectControl extends BaseControl {
  type: "select";
  options: readonly { label: string; value: string }[];
  default: string;
  /** "segmented" (default when <= 4 options) or "select". */
  variant?: "segmented" | "select";
}

/** A color control rendered as a swatch that reveals a ColorPicker. */
export interface ColorControl extends BaseControl {
  type: "color";
  /** Hex string, e.g. "#8b5cf6". */
  default: string;
}

/** A free-text control rendered as a text input. */
export interface TextControl extends BaseControl {
  type: "text";
  default: string;
  placeholder?: string;
}

export type Control =
  | NumberControl
  | BooleanControl
  | SelectControl
  | ColorControl
  | TextControl;

/** A documented prop row shown in the Props table. */
export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

/**
 * Per-component playground spec. Defined in the client module
 * `src/registry/playground.tsx`, keyed by the component's registry `id`.
 */
export interface PlaygroundSpec {
  /** Customize controls; omit/empty when there are no live options. */
  controls?: readonly Control[];
  /** Build the live preview node from the current control values. */
  render: (values: PlaygroundValues) => ReactNode;
  /** Props documentation rows for the Props tab. */
  props?: readonly PropDoc[];
  /** Options for the generated live "Usage" snippet. */
  usage?: UsageMeta;
}
