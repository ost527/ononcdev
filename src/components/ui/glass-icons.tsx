"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { Bell, Heart, Home, Search, Settings, User } from "lucide-react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface GlassIconItem {
  label: string;
  /** Icon node (e.g. a lucide icon). Rendered decoratively. */
  icon?: ReactNode;
  /** CSS gradient/color for the tile's colored glow. */
  gradient?: string;
}

export interface GlassIconsProps {
  /** Tiles in the grid. Defaults to a built-in lucide icon set. */
  items?: GlassIconItem[];
  /** Number of columns. */
  columns?: number;
  /** Gap between tiles in pixels. */
  gap?: number;
  /** Tile size (square) in pixels. */
  size?: number;
  /** Tile corner radius in pixels. */
  radius?: number;
  /** Max pointer tilt in degrees (0 disables). */
  tilt?: number;
  /** Fires with the selected tile index. */
  onSelect?: (index: number) => void;
  /** Accessible name for the group. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: GlassIconItem[] = [
  { label: "Home", icon: <Home className="size-7" />, gradient: "linear-gradient(150deg,#7c3aed,#22d3ee)" },
  { label: "Search", icon: <Search className="size-7" />, gradient: "linear-gradient(150deg,#0ea5e9,#10b981)" },
  { label: "Alerts", icon: <Bell className="size-7" />, gradient: "linear-gradient(150deg,#f59e0b,#ef4444)" },
  { label: "Likes", icon: <Heart className="size-7" />, gradient: "linear-gradient(150deg,#fb7185,#a855f7)" },
  { label: "Settings", icon: <Settings className="size-7" />, gradient: "linear-gradient(150deg,#6366f1,#0ea5e9)" },
  { label: "Profile", icon: <User className="size-7" />, gradient: "linear-gradient(150deg,#84cc16,#14b8a6)" },
];

/**
 * GlassIcons — a grid of frosted-glass icon tiles floating over their own
 * colored glow, each a real button. Pointer movement tilts a tile in 3D
 * (written to CSS variables, no re-render) and hover/focus lifts it and
 * intensifies the glow. Tilt is skipped for reduced-motion users; the hover
 * lift rides CSS transitions that the global reduced-motion rule neutralizes.
 */
export function GlassIcons({
  items = DEFAULT_ITEMS,
  columns = 3,
  gap = 16,
  size = 96,
  radius = 22,
  tilt = 14,
  onSelect,
  label = "Glass icons",
  className,
}: GlassIconsProps) {
  const handleMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (tilt === 0 || prefersReducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gy", `${(px - 0.5) * 2 * tilt}deg`);
    el.style.setProperty("--gx", `${(0.5 - py) * 2 * tilt}deg`);
  };
  const handleLeave = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty("--gx", "0deg");
    e.currentTarget.style.setProperty("--gy", "0deg");
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("grid w-fit", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {items.map((item, i) => (
        <button
          key={`${item.label}-${i}`}
          type="button"
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          onClick={() => onSelect?.(i)}
          className="group flex flex-col items-center gap-2.5 outline-none"
        >
          <span
            className={cn(
              "relative grid place-items-center transition-transform duration-200 ease-out will-change-transform",
              "group-hover:-translate-y-1 group-focus-visible:-translate-y-1",
              "[transform-style:preserve-3d] [transform:perspective(700px)_rotateX(var(--gx,0deg))_rotateY(var(--gy,0deg))]",
              "group-focus-visible:ring-2 group-focus-visible:ring-brand/60",
            )}
            style={{ width: size, height: size, borderRadius: radius }}
          >
            {/* Colored glow behind the glass. */}
            <span
              aria-hidden
              className="absolute inset-1.5 rounded-[inherit] opacity-70 blur-md transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: item.gradient ?? "linear-gradient(150deg,#7c3aed,#22d3ee)" }}
            />
            {/* Frosted glass face. */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-[inherit] border border-white/25 bg-white/10 backdrop-blur-md"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -8px 18px rgba(0,0,0,0.28)",
              }}
            />
            {/* Top sheen. */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-gradient-to-b from-white/35 to-transparent"
            />
            <span className="relative z-10 text-white drop-shadow-sm">
              {item.icon}
            </span>
          </span>
          <span className="text-xs font-medium text-muted transition-colors group-hover:text-foreground">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
