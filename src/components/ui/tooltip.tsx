"use client";

import { type ReactNode, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip text. */
  label: string;
  children: ReactNode;
  side?: Side;
  className?: string;
}

const SIDE_STYLES: Record<Side, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

/**
 * Tooltip — shows a label on hover and on keyboard focus, linked to the trigger
 * via aria-describedby and exposed with role="tooltip".
 */
export function Tooltip({ label, children, side = "top", className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.14 }}
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground shadow-lg",
              SIDE_STYLES[side],
              className,
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
