"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface ColorPickerProps {
  defaultValue?: string;
  onChange?: (hex: string) => void;
  className?: string;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

const SWATCHES = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#0f172a",
];

const clampPct = (n: number) => Math.min(100, Math.max(0, n));

function hsvToRgb({ h, s, v }: HSV) {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g] = [c, x];
  else if (h < 120) [r, g] = [x, c];
  else if (h < 180) [g, b] = [c, x];
  else if (h < 240) [g, b] = [x, c];
  else if (h < 300) [r, b] = [x, c];
  else [r, b] = [c, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function hexToHsv(hex: string): HSV | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return { h, s: Math.round(max === 0 ? 0 : (d / max) * 100), v: Math.round(max * 100) };
}

/**
 * ColorPicker — an HSV picker: a saturation/brightness area, a hue slider, a hex
 * field and preset swatches. The area and hue slider are pointer-draggable and
 * keyboard-operable (arrow keys), and the hex input accepts typed values. Calls
 * onChange with the hex string. Uncontrolled via defaultValue.
 */
export function ColorPicker({
  defaultValue = "#8b5cf6",
  onChange,
  className,
}: ColorPickerProps) {
  const [hsv, setHsv] = useState<HSV>(() => hexToHsv(defaultValue) ?? { h: 258, s: 65, v: 96 });
  const [text, setText] = useState(defaultValue);
  const svRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hexId = useId();
  const hex = rgbToHex(hsvToRgb(hsv));

  const apply = (next: HSV) => {
    setHsv(next);
    const nextHex = rgbToHex(hsvToRgb(next));
    setText(nextHex);
    onChange?.(nextHex);
  };

  const svFromPointer = (clientX: number, clientY: number) => {
    const rect = svRef.current?.getBoundingClientRect();
    if (!rect) return;
    apply({
      ...hsv,
      s: Math.round(clampPct(((clientX - rect.left) / rect.width) * 100)),
      v: Math.round(clampPct(100 - ((clientY - rect.top) / rect.height) * 100)),
    });
  };

  const onSvPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    svFromPointer(e.clientX, e.clientY);
  };
  const onSvPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) svFromPointer(e.clientX, e.clientY);
  };
  const onSvPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onSvKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      apply({ ...hsv, s: clampPct(hsv.s + step) });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      apply({ ...hsv, s: clampPct(hsv.s - step) });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      apply({ ...hsv, v: clampPct(hsv.v + step) });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      apply({ ...hsv, v: clampPct(hsv.v - step) });
    }
  };

  const onHueKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 15 : 2;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      apply({ ...hsv, h: Math.min(360, hsv.h + step) });
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      apply({ ...hsv, h: Math.max(0, hsv.h - step) });
    } else if (e.key === "Home") {
      e.preventDefault();
      apply({ ...hsv, h: 0 });
    } else if (e.key === "End") {
      e.preventDefault();
      apply({ ...hsv, h: 360 });
    }
  };

  const hueDragging = useRef(false);
  const hueRef = useRef<HTMLDivElement>(null);
  const hueFromPointer = (clientX: number) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    apply({ ...hsv, h: Math.round(clampPct(((clientX - rect.left) / rect.width) * 100) * 3.6) });
  };

  return (
    <div className={cn("w-60 select-none rounded-xl border border-border bg-surface p-3", className)}>
      <div
        ref={svRef}
        role="slider"
        tabIndex={0}
        aria-label="Color saturation and brightness"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={hsv.v}
        aria-valuetext={hex}
        onPointerDown={onSvPointerDown}
        onPointerMove={onSvPointerMove}
        onPointerUp={onSvPointerUp}
        onKeyDown={onSvKeyDown}
        className="relative h-36 w-full touch-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
        style={{
          backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
          backgroundImage:
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
        }}
      >
        <span
          aria-hidden
          className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%`, backgroundColor: hex }}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span
          aria-hidden
          className="size-9 shrink-0 rounded-lg border border-border"
          style={{ backgroundColor: hex }}
        />
        <div className="flex-1">
          <div
            ref={hueRef}
            role="slider"
            tabIndex={0}
            aria-label="Hue"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={hsv.h}
            onPointerDown={(e) => {
              hueDragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              hueFromPointer(e.clientX);
            }}
            onPointerMove={(e) => hueDragging.current && hueFromPointer(e.clientX)}
            onPointerUp={(e) => {
              hueDragging.current = false;
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onKeyDown={onHueKeyDown}
            className="relative h-3 w-full touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
            }}
          >
            <span
              aria-hidden
              className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow"
              style={{ left: `${(hsv.h / 360) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <label className="sr-only" htmlFor={hexId}>
          Hex color
        </label>
        <input
          id={hexId}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const parsed = hexToHsv(e.target.value);
            if (parsed) apply(parsed);
          }}
          spellCheck={false}
          className="w-24 rounded-lg border border-border bg-background px-2 py-1.5 font-mono text-xs uppercase outline-none focus-visible:border-brand"
        />
        <div className="flex flex-1 flex-wrap justify-end gap-1.5">
          {SWATCHES.map((sw) => (
            <button
              key={sw}
              type="button"
              aria-label={`Select ${sw}`}
              onClick={() => {
                const parsed = hexToHsv(sw);
                if (parsed) apply(parsed);
              }}
              className="size-5 rounded-full border border-border outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand/60"
              style={{ backgroundColor: sw }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
