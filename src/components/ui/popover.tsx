"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface PopoverProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
}

/**
 * Popover — a trigger that reveals a floating panel of arbitrary content.
 * Closes on Escape and outside click, returning focus to the trigger.
 */
export function Popover({ label, children, className, panelClassName }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
      >
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute left-0 z-50 mt-2 w-64 rounded-xl border border-border bg-surface p-4 text-sm shadow-xl",
              panelClassName,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
