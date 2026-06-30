import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes, resolving conflicts (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number to the [min, max] range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Linearly remap a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Deterministic pseudo-random in [0, 1) from a numeric seed (mulberry32). */
export function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** SSR-safe read of the user's reduced-motion preference. */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
