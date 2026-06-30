"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

/**
 * ThemeToggle — flips the `.dark` class on <html> and persists the choice. The
 * current theme is read from the class via useSyncExternalStore (no
 * setState-in-effect), so a MutationObserver keeps the icon in sync.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      aria-pressed={hydrated ? !dark : undefined}
      className={cn(
        "grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground",
        className,
      )}
    >
      <Sun className={cn("size-4", hydrated && dark ? "block" : "hidden")} />
      <Moon className={cn("size-4", hydrated && !dark ? "block" : "hidden")} />
    </button>
  );
}
