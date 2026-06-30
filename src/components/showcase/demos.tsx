"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Home,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { CommandPalette } from "@/components/ui/command-palette";
import { Drawer } from "@/components/ui/drawer";
import { Modal } from "@/components/ui/modal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Stepper } from "@/components/ui/stepper";
import { toast } from "@/components/ui/toast";

/** Trigger + dialog demo for the Modal showcase card. */
export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
      >
        Open dialog
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Welcome to Lumen UI">
        <p>
          A fully accessible dialog — press Escape, click the backdrop, or use a
          button to close. Focus is moved in and restored for you.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}

const TOAST_BUTTON =
  "rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background";

/** Trigger buttons for the Toast showcase card (Toaster is mounted at root). */
export function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className={TOAST_BUTTON}
        onClick={() => toast("Your changes have been saved.", { variant: "success" })}
      >
        Success
      </button>
      <button
        type="button"
        className={TOAST_BUTTON}
        onClick={() => toast("Something went wrong.", { variant: "error" })}
      >
        Error
      </button>
      <button
        type="button"
        className={TOAST_BUTTON}
        onClick={() => toast("A new update is available.", { variant: "info" })}
      >
        Info
      </button>
    </div>
  );
}

/** ⌘K trigger + palette demo. */
export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-muted transition-colors hover:bg-background"
      >
        <Search className="size-4" />
        Search…
        <kbd className="ml-6 rounded border border-border px-1.5 py-0.5 text-[10px]">
          ⌘K
        </kbd>
      </button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={[
          { id: "home", label: "Go to Home", icon: <Home className="size-4" />, shortcut: "G H" },
          { id: "profile", label: "Open Profile", icon: <User className="size-4" /> },
          { id: "settings", label: "Open Settings", icon: <Settings className="size-4" />, shortcut: "," },
          { id: "new", label: "Create new project", icon: <Sparkles className="size-4" />, shortcut: "C" },
          { id: "docs", label: "Read the docs", icon: <ArrowRight className="size-4" /> },
        ]}
      />
    </>
  );
}

/** Self-contained scroll container with its own progress bar. */
export function ScrollProgressDemo() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="relative h-56 w-72 overflow-auto rounded-xl border border-border bg-surface"
    >
      <ScrollProgress containerRef={ref} />
      <div className="space-y-3 p-5 pt-7 text-sm text-muted">
        <p className="font-medium text-foreground">Scroll me ↓</p>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1}. The bar at the top fills as this panel scrolls.
          </p>
        ))}
      </div>
    </div>
  );
}

/** Controlled Stepper with next/back controls. */
export function StepperDemo() {
  const steps = ["Account", "Profile", "Billing", "Done"];
  const [current, setCurrent] = useState(1);
  return (
    <div className="w-full max-w-md">
      <Stepper steps={steps} current={current} />
      <div className="mt-6 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className="rounded-full border border-border px-4 py-1.5 text-sm font-medium disabled:opacity-50"
          disabled={current === 0}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
          disabled={current === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/** Trigger + slide-in drawer demo. */
export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-background"
      >
        Open drawer
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
        <p>Slide-in panel from the edge. Escape, the backdrop, or the × close it.</p>
        <p className="mt-3">Focus moves into the panel and returns on close.</p>
      </Drawer>
    </>
  );
}
