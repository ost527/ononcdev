"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Modal — an accessible dialog rendered in a portal. Closes on Escape and
 * backdrop click, locks body scroll, focuses the panel on open, and restores
 * focus to the trigger on close.
 */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(id);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className={cn(
              "relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl focus:outline-none",
              className,
            )}
          >
            {title && (
              <h2 className="mb-2 pr-8 text-lg font-semibold">{title}</h2>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            <div className="text-sm text-muted">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
