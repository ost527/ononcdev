"use client";

import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  /** The element users hover or focus to reveal the card. */
  trigger: ReactNode;
  children: ReactNode;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
  panelClassName?: string;
}

/**
 * HoverCard — reveals a rich preview panel when the trigger is hovered or
 * keyboard-focused, with small open/close delays so it doesn't flicker between
 * the trigger and the card. Escape dismisses it. A supplementary, sighted-user
 * enhancement (the panel is exposed as a tooltip region).
 */
export function HoverCard({
  trigger,
  children,
  openDelay = 150,
  closeDelay = 120,
  className,
  panelClassName,
}: HoverCardProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timers = useRef<{ open?: ReturnType<typeof setTimeout>; close?: ReturnType<typeof setTimeout> }>({});

  const clearTimers = () => {
    if (timers.current.open) clearTimeout(timers.current.open);
    if (timers.current.close) clearTimeout(timers.current.close);
  };
  const show = (delay = openDelay) => {
    clearTimers();
    timers.current.open = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimers();
    timers.current.close = setTimeout(() => setOpen(false), closeDelay);
  };

  useEffect(() => clearTimers, []);

  // Associate the panel with the trigger for screen readers while it is open.
  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": open ? id : undefined,
      })
    : trigger;

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      onFocus={() => show(0)}
      onBlur={hide}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          clearTimers();
          setOpen(false);
        }
      }}
    >
      {triggerNode}
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            onMouseEnter={() => show(0)}
            onMouseLeave={hide}
            className={cn(
              "absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-surface p-4 text-sm text-muted shadow-xl",
              panelClassName,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
