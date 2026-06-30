import { describe, expect, it } from "vitest";
import { clamp, cn, mapRange, seededRandom } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
  it("drops falsy values", () => {
    expect(cn("text-sm", false && "hidden", undefined, "font-bold")).toBe(
      "text-sm font-bold",
    );
  });
});

describe("clamp", () => {
  it("returns the value inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it("clamps below and above", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe("mapRange", () => {
  it("remaps linearly", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
  });
  it("guards against a zero-width input range", () => {
    expect(mapRange(5, 4, 4, 1, 9)).toBe(1);
  });
});

describe("seededRandom", () => {
  it("is deterministic for the same seed", () => {
    expect(seededRandom(42)).toBe(seededRandom(42));
  });
  it("differs across seeds and stays in [0, 1)", () => {
    const a = seededRandom(1);
    const b = seededRandom(2);
    expect(a).not.toBe(b);
    for (const v of [a, b, seededRandom(999)]) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
