"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResizableProps {
  first: ReactNode;
  second: ReactNode;
  direction?: "horizontal" | "vertical";
  /** Initial size of the first pane, as a percentage. */
  defaultSize?: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  "aria-label"?: string;
}

/**
 * Resizable — two panes split by a draggable divider. The separator is a proper
 * WAI-ARIA window splitter: drag it, or focus it and use the arrow keys (Home/End
 * jump to the bounds). Sizes are clamped to [min, max]; aria-controls points at
 * the primary pane.
 */
export function Resizable({
  first,
  second,
  direction = "horizontal",
  defaultSize = 50,
  min = 15,
  max = 85,
  step = 2,
  className,
  ...aria
}: ResizableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [size, setSize] = useState(defaultSize);
  const paneId = useId();
  const isH = direction === "horizontal";

  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  const fromPointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = isH
      ? ((clientX - rect.left) / rect.width) * 100
      : ((clientY - rect.top) / rect.height) * 100;
    setSize(clamp(pct));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromPointer(e.clientX, e.clientY);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const dec = isH ? "ArrowLeft" : "ArrowUp";
    const inc = isH ? "ArrowRight" : "ArrowDown";
    if (e.key === dec) {
      e.preventDefault();
      setSize((s) => clamp(s - step));
    } else if (e.key === inc) {
      e.preventDefault();
      setSize((s) => clamp(s + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSize(min);
    } else if (e.key === "End") {
      e.preventDefault();
      setSize(max);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex overflow-hidden rounded-xl border border-border bg-surface",
        isH ? "flex-row" : "flex-col",
        className,
      )}
      style={{ touchAction: "none" }}
    >
      <div
        id={paneId}
        style={{ flexBasis: `${size}%` }}
        className="min-h-0 min-w-0 shrink-0 grow-0 overflow-auto"
      >
        {first}
      </div>
      <div
        role="separator"
        aria-controls={paneId}
        aria-orientation={isH ? "vertical" : "horizontal"}
        aria-valuenow={Math.round(size)}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={aria["aria-label"] ?? "Resize panels"}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        className={cn(
          "group relative flex shrink-0 items-center justify-center bg-border outline-none transition-colors focus-visible:bg-brand/40",
          isH ? "w-1.5 cursor-col-resize" : "h-1.5 cursor-row-resize",
        )}
      >
        <span
          className={cn(
            "grid place-items-center rounded bg-surface text-muted shadow ring-1 ring-border transition-colors group-hover:text-foreground",
            isH ? "h-7 w-3.5" : "h-3.5 w-7",
          )}
        >
          <GripVertical className={cn("size-3", !isH && "rotate-90")} />
        </span>
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">{second}</div>
    </div>
  );
}
