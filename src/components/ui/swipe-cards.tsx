"use client";

import { type KeyboardEvent, useState } from "react";
import { Heart, RotateCcw, X } from "lucide-react";
import {
  animate,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface SwipeCardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  /** CSS background for the card's visual header (gradient, color, or url()). */
  background?: string;
  tags?: string[];
}

export interface SwipeCardsProps {
  /** Cards to deal, front to back. Defaults to a built-in gradient set. */
  items?: SwipeCardItem[];
  /** Recycle swiped cards to the back so the deck never empties. */
  loop?: boolean;
  /** Max tilt (deg) applied as the front card is dragged sideways. */
  swipeRotation?: number;
  /** How many cards peek behind the front one (1–3). */
  stackDepth?: number;
  /** Show the "Keep"/"Pass" stamps that fade in as you drag. */
  showStamps?: boolean;
  /** Show the circular Pass/Keep control buttons below the deck. */
  showControls?: boolean;
  /** Fires when a card leaves the deck, with the direction it went. */
  onSwipe?: (id: SwipeCardItem["id"], direction: "left" | "right") => void;
  /** Accessible name for the deck. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: SwipeCardItem[] = [
  { id: "aurora", title: "Aurora", subtitle: "Northern drift", background: "linear-gradient(135deg,#7c3aed,#22d3ee)", tags: ["Calm", "Gradient"] },
  { id: "ember", title: "Ember", subtitle: "Slow burn", background: "linear-gradient(135deg,#fb7185,#f59e0b)", tags: ["Warm", "Bold"] },
  { id: "tide", title: "Tide", subtitle: "Deep current", background: "linear-gradient(135deg,#0ea5e9,#10b981)", tags: ["Cool", "Fresh"] },
  { id: "nova", title: "Nova", subtitle: "Bright pulse", background: "linear-gradient(135deg,#a855f7,#ec4899)", tags: ["Vivid", "Loud"] },
  { id: "dusk", title: "Dusk", subtitle: "Last light", background: "linear-gradient(135deg,#6366f1,#0ea5e9)", tags: ["Moody", "Soft"] },
];

/** Offset (px) or velocity (px/s) past which a release counts as a throw. */
const THROW_DISTANCE = 120;
const THROW_VELOCITY = 500;
/** Where a thrown card flies to, safely offscreen. */
const EXIT_X = 640;

/**
 * SwipeCards — a draggable card deck you fling left or right. The front card
 * follows the pointer and tilts; release it past a threshold (or flick it) to
 * send it away and reveal the next, with a spring restack. Fully operable
 * without a pointer via the Pass/Keep buttons and the ← / → arrow keys, and it
 * degrades to instant transitions under reduced-motion. Only the front card is
 * interactive; the rest are inert and hidden from assistive tech.
 */
export function SwipeCards({
  items = DEFAULT_ITEMS,
  loop = true,
  swipeRotation = 18,
  stackDepth = 2,
  showStamps = true,
  showControls = true,
  onSwipe,
  label = "Swipeable card deck",
  className,
}: SwipeCardsProps) {
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [busy, setBusy] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-EXIT_X, EXIT_X], [-swipeRotation, swipeRotation]);
  const keepOpacity = useTransform(x, [24, THROW_DISTANCE], [0, 1]);
  const passOpacity = useTransform(x, [-THROW_DISTANCE, -24], [1, 0]);

  const empty = order.length === 0;

  const commit = (direction: "left" | "right") => {
    const frontId = items[order[0]].id;
    setOrder((o) => (loop ? [...o.slice(1), o[0]] : o.slice(1)));
    x.set(0);
    setBusy(false);
    onSwipe?.(frontId, direction);
  };

  const fling = (direction: "left" | "right") => {
    if (busy || empty) return;
    setBusy(true);
    if (prefersReducedMotion()) {
      commit(direction);
      return;
    }
    animate(x, direction === "right" ? EXIT_X : -EXIT_X, {
      type: "spring",
      stiffness: 260,
      damping: 28,
    }).then(() => commit(direction));
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (busy) return;
    const thrown =
      Math.abs(info.offset.x) > THROW_DISTANCE ||
      Math.abs(info.velocity.x) > THROW_VELOCITY;
    if (thrown) fling(info.offset.x > 0 ? "right" : "left");
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      fling("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      fling("right");
    }
  };

  const restart = () => {
    if (busy) return;
    x.set(0);
    setOrder(items.map((_, i) => i));
  };

  // Front + `stackDepth` peeking cards + one invisible buffer for smooth entry.
  const visible = order.slice(0, stackDepth + 2);

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      <div
        role="group"
        aria-roledescription="Card deck"
        aria-label={label}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative h-80 w-64 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <span className="sr-only">
          Drag a card sideways, or use the Left and Right arrow keys to pass or keep it.
        </span>

        {empty ? (
          <div className="absolute inset-0 grid place-items-center rounded-3xl border border-dashed border-border">
            <div className="flex flex-col items-center gap-3 text-sm text-muted">
              That&apos;s everyone.
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-2"
              >
                <RotateCcw className="size-3.5" />
                Restart
              </button>
            </div>
          </div>
        ) : (
          visible.map((cardIndex, depth) => {
            const item = items[cardIndex];
            const isFront = depth === 0;
            return (
              <motion.div
                key={item.id}
                aria-hidden={!isFront}
                className={cn(
                  "absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-xl",
                  isFront
                    ? "cursor-grab touch-none active:cursor-grabbing"
                    : "pointer-events-none",
                )}
                style={
                  isFront
                    ? { x, rotate, zIndex: stackDepth + 2 }
                    : { zIndex: stackDepth + 2 - depth }
                }
                initial={false}
                animate={{
                  scale: 1 - depth * 0.05,
                  y: depth * 16,
                  opacity: depth <= stackDepth ? 1 : 0,
                }}
                transition={
                  prefersReducedMotion()
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 300, damping: 30 }
                }
                drag={isFront && !busy ? "x" : false}
                dragSnapToOrigin={false}
                onDragEnd={isFront ? handleDragEnd : undefined}
              >
                <div
                  className="h-40 w-full shrink-0"
                  style={{ background: item.background }}
                />

                {isFront && showStamps && (
                  <>
                    <motion.span
                      aria-hidden
                      style={{ opacity: keepOpacity }}
                      className="pointer-events-none absolute left-4 top-4 rounded-md border-2 border-emerald-400 px-2 py-0.5 text-sm font-bold uppercase tracking-wider text-emerald-400 [transform:rotate(-12deg)]"
                    >
                      Keep
                    </motion.span>
                    <motion.span
                      aria-hidden
                      style={{ opacity: passOpacity }}
                      className="pointer-events-none absolute right-4 top-4 rounded-md border-2 border-rose-400 px-2 py-0.5 text-sm font-bold uppercase tracking-wider text-rose-400 [transform:rotate(12deg)]"
                    >
                      Pass
                    </motion.span>
                  </>
                )}

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    {item.subtitle && (
                      <p className="mt-0.5 text-sm text-muted">{item.subtitle}</p>
                    )}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {showControls && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fling("left")}
            disabled={empty}
            aria-label="Pass"
            className="grid size-12 place-items-center rounded-full border border-border bg-surface text-rose-400 shadow-sm transition-colors hover:border-rose-400/60 hover:bg-rose-400/10 disabled:pointer-events-none disabled:opacity-40"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => fling("right")}
            disabled={empty}
            aria-label="Keep"
            className="grid size-12 place-items-center rounded-full border border-border bg-surface text-emerald-400 shadow-sm transition-colors hover:border-emerald-400/60 hover:bg-emerald-400/10 disabled:pointer-events-none disabled:opacity-40"
          >
            <Heart className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
