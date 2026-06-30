"use client";

import {
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

/**
 * ScrollArea — a bounded scroll container with a custom, themed vertical
 * scrollbar. The native viewport scrolls (so keyboard scrolling and screen
 * readers work); the overlay thumb is decorative and pointer-draggable.
 */
export function ScrollArea({ children, className }: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const [thumb, setThumb] = useState({ height: 0, top: 0, visible: false });

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) {
      setThumb((t) => (t.visible ? { ...t, visible: false } : t));
      return;
    }
    const height = Math.max((clientHeight / scrollHeight) * clientHeight, 24);
    const maxTop = clientHeight - height;
    const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;
    setThumb({ height, top, visible: true });
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // ResizeObserver fires once on observe — that initial callback does the
    // first measure, so we never call setState synchronously in this effect.
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    drag.current = { startY: e.clientY, startScroll: el.scrollTop };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    const d = drag.current;
    if (!el || !d) return;
    const maxTop = el.clientHeight - thumb.height;
    if (maxTop <= 0) return;
    const scrollPerPx = (el.scrollHeight - el.clientHeight) / maxTop;
    el.scrollTop = d.startScroll + (e.clientY - d.startY) * scrollPerPx;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        ref={viewportRef}
        onScroll={measure}
        tabIndex={0}
        className="size-full overflow-auto outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-brand/40 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {thumb.visible && (
        <div aria-hidden className="absolute inset-y-1 right-1 w-2">
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ height: thumb.height, transform: `translateY(${thumb.top}px)` }}
            className="w-full cursor-grab rounded-full bg-border-strong transition-colors hover:bg-brand/50 active:cursor-grabbing"
          />
        </div>
      )}
    </div>
  );
}
