"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Drawer — a panel that slides in from the edge. Portaled, closes on Escape and
 * backdrop click, locks body scroll, and manages focus like a dialog.
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  className,
}: DrawerProps) {
  const mounted = useHydrated();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      cancelAnimationFrame(id);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[105]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className={cn(
              "absolute inset-y-0 flex w-80 max-w-[85vw] flex-col border-border bg-surface p-6 shadow-2xl focus:outline-none",
              side === "right" ? "right-0 border-l" : "left-0 border-r",
              className,
            )}
          >
            <div className="flex items-center justify-between">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="ml-auto grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 flex-1 overflow-auto text-sm text-muted">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
