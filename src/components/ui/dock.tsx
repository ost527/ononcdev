"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface DockItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItem[];
  className?: string;
  /** Resting icon size (px). */
  baseSize?: number;
  /** Peak icon size at the cursor (px). */
  magnify?: number;
  /** Distance (px) over which magnification falls off. */
  range?: number;
}

function DockButton({
  mouseX,
  item,
  baseSize,
  magnify,
  range,
}: {
  mouseX: MotionValue<number>;
  item: DockItem;
  baseSize: number;
  magnify: number;
  range: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    const center = rect ? rect.x + rect.width / 2 : 0;
    return val - center;
  });
  const sizeTarget = useTransform(
    distance,
    [-range, 0, range],
    [baseSize, magnify, baseSize],
  );
  const size = useSpring(sizeTarget, {
    stiffness: 320,
    damping: 22,
    mass: 0.2,
  });

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      onClick={item.onClick}
      aria-label={item.label}
      className="group/item relative grid aspect-square shrink-0 place-items-center rounded-2xl border border-border bg-surface text-foreground/80 transition-colors hover:text-foreground"
    >
      <span className="grid h-1/2 w-1/2 place-items-center">{item.icon}</span>
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-90 rounded-md border border-border bg-background px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-all group-hover/item:scale-100 group-hover/item:opacity-100">
        {item.label}
      </span>
    </motion.button>
  );
}

/**
 * Dock — a row of icon buttons that magnify based on cursor proximity, like
 * the macOS dock. Each item is a real button with an accessible label.
 */
export function Dock({
  items,
  className,
  baseSize = 48,
  magnify = 80,
  range = 140,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      onPointerMove={(e) => mouseX.set(e.clientX)}
      onPointerLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex items-end gap-3 rounded-3xl border border-border bg-surface/60 px-4 pb-3 pt-2 backdrop-blur-xl",
        className,
      )}
    >
      {items.map((item, i) => (
        <DockButton
          key={i}
          mouseX={mouseX}
          item={item}
          baseSize={baseSize}
          magnify={magnify}
          range={range}
        />
      ))}
    </div>
  );
}
