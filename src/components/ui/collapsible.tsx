"use client";

import { type ReactNode, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollapsibleProps {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Collapsible — a single show/hide disclosure. The trigger is a button with
 * aria-expanded + aria-controls; the content stays mounted (so aria-controls
 * always resolves) and animates its height open/closed.
 */
export function Collapsible({
  label,
  children,
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-1 py-2 text-left text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <motion.div
        id={id}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
        className="overflow-hidden"
      >
        <div className="px-1 pb-2 pt-1 text-sm text-muted">{children}</div>
      </motion.div>
    </div>
  );
}
