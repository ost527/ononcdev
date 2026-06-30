"use client";

import { type ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  /** Render a close button; the alert animates out and calls onDismiss. */
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const VARIANTS: Record<
  AlertVariant,
  { icon: typeof Info; ring: string; tint: string; accent: string }
> = {
  info: {
    icon: Info,
    ring: "border-brand/30",
    tint: "bg-brand/10",
    accent: "text-brand-ink",
  },
  success: {
    icon: CircleCheck,
    ring: "border-emerald-500/30",
    tint: "bg-emerald-500/10",
    accent: "text-emerald-600 dark:text-emerald-300",
  },
  warning: {
    icon: TriangleAlert,
    ring: "border-amber-500/30",
    tint: "bg-amber-500/10",
    accent: "text-amber-600 dark:text-amber-300",
  },
  danger: {
    icon: CircleAlert,
    ring: "border-rose-500/30",
    tint: "bg-rose-500/10",
    accent: "text-rose-600 dark:text-rose-300",
  },
};

/**
 * Alert — a semantic callout (info / success / warning / danger) with a tinted
 * surface and matching icon. Errors announce assertively (role="alert"); the
 * rest are polite status messages. Optionally dismissible with an exit
 * animation.
 */
export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [open, setOpen] = useState(true);
  const config = VARIANTS[variant];
  const Icon = config.icon;

  const dismiss = () => {
    setOpen(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role={variant === "danger" ? "alert" : "status"}
          initial={false}
          exit={{ opacity: 0, scale: 0.98, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.18 }}
          className={cn(
            "flex gap-3 overflow-hidden rounded-xl border p-4 text-sm",
            config.ring,
            config.tint,
            className,
          )}
        >
          <Icon className={cn("mt-0.5 size-5 shrink-0", config.accent)} />
          <div className="min-w-0 flex-1">
            {title && (
              <p className="font-semibold text-foreground">{title}</p>
            )}
            {children && (
              <div className={cn("text-muted", title && "mt-0.5")}>
                {children}
              </div>
            )}
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="-mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
