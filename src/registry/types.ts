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
  /** When true the preview fills the frame edge-to-edge (backgrounds). */
  bleed?: boolean;
}

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  items: RegistryItem[];
}
