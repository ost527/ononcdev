"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

const ACCENT: Record<ToastVariant, string> = {
  default: "var(--brand)",
  success: "#34d399",
  error: "var(--brand-3)",
  info: "var(--brand-2)",
};

let counter = 0;
let store: ToastItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return store;
}

function dismiss(id: number) {
  store = store.filter((t) => t.id !== id);
  emit();
}

/** Push a toast onto the stack. Auto-dismisses after `duration` ms. */
export function toast(
  message: string,
  opts?: { variant?: ToastVariant; duration?: number },
) {
  const id = ++counter;
  store = [...store, { id, message, variant: opts?.variant ?? "default" }];
  emit();
  setTimeout(() => dismiss(id), opts?.duration ?? 3500);
  return id;
}

/** Mount once near the root to render queued toasts. */
export function Toaster({ className }: { className?: string }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-[120] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="pointer-events-auto flex items-start gap-3 overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-lg"
          >
            <span
              aria-hidden
              className="mt-1 size-2 shrink-0 rounded-full"
              style={{ background: ACCENT[item.variant] }}
            />
            <p className="flex-1 text-sm text-foreground">{item.message}</p>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Dismiss notification"
              className="grid size-6 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
