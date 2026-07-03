"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Check,
  Code2,
  Eye,
  Grip,
  LayoutGrid,
  Link2,
  Moon,
  RotateCcw,
  Shuffle,
  Square,
  Sun,
  SunMoon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { CodeBlock } from "@/components/showcase/code-block";
import {
  ControlField,
  initialValues,
} from "@/components/showcase/playground-controls";
import {
  VIEWPORT_WIDTHS,
  ViewportToggle,
} from "@/components/showcase/viewport-toggle";
import {
  buildUsage,
  countModified,
  decodePlaygroundState,
  encodePlaygroundState,
  randomizeValues,
} from "@/lib/playground";
import { playgrounds } from "@/registry/playground";
import type { Control, ControlValue, PlaygroundValues } from "@/registry/types";
import { cn } from "@/lib/utils";

export interface PlaygroundMeta {
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  description: string;
  tags?: string[];
  /** Source path relative to `src/`, used for the generated Usage import. */
  sourcePath?: string;
  /** Full-bleed, dark-only background component. */
  bleed?: boolean;
}

export interface ComponentPlaygroundProps {
  meta: PlaygroundMeta;
  /** Component source for the Code tab. */
  code: string;
  /** Static preview used when the component has no playground spec. */
  fallbackPreview: ReactNode;
}

type View = "preview" | "code";
type Mode = "mobile" | "tablet" | "desktop" | "custom";
type PreviewTheme = "site" | "light" | "dark";
type Backdrop = "plain" | "dots" | "grid";

/** Preset frame widths; `desktop` fills the available width. */
const PRESETS = VIEWPORT_WIDTHS;
const MIN_WIDTH = 280;
const STAGE_HEIGHT = 460;

const VIEW_ORDER: View[] = ["preview", "code"];

const THEME_ORDER: PreviewTheme[] = ["site", "light", "dark"];
const THEME_META: Record<PreviewTheme, { label: string; icon: typeof Sun }> = {
  site: { label: "Site theme", icon: SunMoon },
  light: { label: "Light", icon: Sun },
  dark: { label: "Dark", icon: Moon },
};

const BACKDROP_ORDER: Backdrop[] = ["plain", "dots", "grid"];
const BACKDROP_META: Record<Backdrop, { label: string; icon: typeof Square }> = {
  plain: { label: "Plain", icon: Square },
  dots: { label: "Dots", icon: Grip },
  grid: { label: "Grid", icon: LayoutGrid },
};
const BACKDROP_CLASS: Record<Exclude<Backdrop, "plain">, string> = {
  dots: "[background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:16px_16px]",
  grid: "[background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:24px_24px]",
};

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5] as const;
const ZOOM_DEFAULT = 2; // index of 1×

/**
 * Roving-focus keyboard handler for a tablist (WAI-ARIA Tabs pattern):
 * Arrow keys move + activate the adjacent tab, Home/End jump to the ends.
 */
function roveTabs<T extends string>(
  e: KeyboardEvent<HTMLElement>,
  values: readonly T[],
  current: T,
  set: (v: T) => void,
  idOf: (v: T) => string,
) {
  const idx = values.indexOf(current);
  let next: T | undefined;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    next = values[(idx + 1) % values.length];
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    next = values[(idx - 1 + values.length) % values.length];
  } else if (e.key === "Home") {
    next = values[0];
  } else if (e.key === "End") {
    next = values[values.length - 1];
  }
  if (next !== undefined) {
    e.preventDefault();
    set(next);
    document.getElementById(idOf(next))?.focus();
  }
}

/**
 * Partition controls into titled sections by their `group`, preserving
 * first-appearance order. Ungrouped controls form a leading untitled section.
 */
function groupControls(
  controls: readonly Control[],
): { title: string | null; controls: Control[] }[] {
  const sections: { title: string | null; controls: Control[] }[] = [];
  for (const control of controls) {
    const title = control.group ?? null;
    const last = sections.find((s) => s.title === title);
    if (last) last.controls.push(control);
    else sections.push({ title, controls: [control] });
  }
  return sections;
}

/** Small bordered icon button used in the stage + Customize toolbars. */
function ToolButton({
  label,
  onClick,
  disabled,
  bordered = true,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-7 place-items-center rounded-md text-muted transition-colors hover:text-foreground",
        bordered && "rounded-lg border border-border bg-background",
        disabled && "cursor-default text-muted-2/50 hover:text-muted-2/50",
      )}
    >
      {children}
    </button>
  );
}

/**
 * ComponentPlayground — the component detail experience: a Preview/Code stage
 * with viewport presets, preview theme / backdrop / zoom tools, a Refresh
 * button and a draggable + keyboard-accessible resize handle; alongside a
 * sticky Customize rail (randomize, shareable URL state, per-control reset and
 * a live generated Usage snippet) and the Props reference.
 */
export function ComponentPlayground({
  meta,
  code,
  fallbackPreview,
}: ComponentPlaygroundProps) {
  const spec = playgrounds[meta.id];
  const controls = useMemo(() => spec?.controls ?? [], [spec]);
  const baseId = useId();

  const [view, setView] = useState<View>("preview");
  const [mode, setMode] = useState<Mode>("desktop");
  const [width, setWidth] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [values, setValues] = useState<PlaygroundValues>(() =>
    initialValues(controls),
  );
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>("site");
  const [backdrop, setBackdrop] = useState<Backdrop>("plain");
  const [zoomIdx, setZoomIdx] = useState(ZOOM_DEFAULT);
  const [linkCopied, setLinkCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const copyTimer = useRef<number | null>(null);

  // Track the available width so presets can be clamped and the readout is live.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setMaxWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Hydrate shared state from the `?p=` param once (post-paint, keeps SSG HTML stable).
  useEffect(() => {
    if (!controls.length) return;
    const id = requestAnimationFrame(() => {
      const raw = new URLSearchParams(window.location.search).get("p");
      if (!raw) return;
      const decoded = decodePlaygroundState(controls, raw);
      if (decoded) {
        setValues(decoded);
        setResetKey((k) => k + 1);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [controls]);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const isFluid = mode === "desktop" || width === null;
  const clampedWidth =
    width === null ? maxWidth : Math.min(width, maxWidth || width);
  const frameMaxWidth =
    maxWidth > 0 ? `${isFluid ? maxWidth : clampedWidth}px` : "100%";
  const effWidth = Math.round(isFluid ? maxWidth : clampedWidth);

  const setPreset = (next: "mobile" | "tablet" | "desktop") => {
    setMode(next);
    setWidth(PRESETS[next]);
  };

  const refresh = () => setRefreshKey((k) => k + 1);

  const reset = () => {
    setValues(initialValues(controls));
    setResetKey((k) => k + 1);
    setRefreshKey((k) => k + 1);
  };

  const randomize = () => {
    setValues((prev) => randomizeValues(controls, prev));
    setResetKey((k) => k + 1);
  };

  const share = async () => {
    const encoded = encodePlaygroundState(controls, values);
    const url = new URL(window.location.href);
    if (encoded) url.searchParams.set("p", encoded);
    else url.searchParams.delete("p");
    window.history.replaceState(null, "", url.toString());
    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      /* clipboard unavailable (e.g. insecure context) */
    }
    setLinkCopied(true);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setLinkCopied(false), 1600);
  };

  const setValue = useCallback(
    (key: string, value: ControlValue) =>
      setValues((prev) => ({ ...prev, [key]: value })),
    [],
  );

  // --- Resize handle (pointer + keyboard) ---
  const resizeTo = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    // Centered frame: dragging the right edge grows symmetrically.
    const next = Math.round(
      Math.max(MIN_WIDTH, Math.min(rect.width, (clientX - center) * 2)),
    );
    setWidth(next);
    setMode("custom");
  };
  const onHandleDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeTo(e.clientX);
  };
  const onHandleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) resizeTo(e.clientX);
  };
  const onHandleUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const onHandleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!maxWidth) return;
    const step = e.shiftKey ? 64 : 16;
    const current = width ?? maxWidth;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setWidth(Math.max(MIN_WIDTH, current - step));
      setMode("custom");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setWidth(Math.min(maxWidth || current, current + step));
      setMode("custom");
    } else if (e.key === "Home") {
      e.preventDefault();
      setWidth(MIN_WIDTH);
      setMode("custom");
    } else if (e.key === "End") {
      e.preventDefault();
      setPreset("desktop");
    }
  };

  const previewNode = spec ? spec.render(values) : fallbackPreview;
  const valuesHash = JSON.stringify(values);
  const modifiedCount = countModified(controls, values);
  const zoom = ZOOM_LEVELS[zoomIdx];
  const usageCode = controls.length
    ? buildUsage(
        {
          id: meta.id,
          sourcePath: meta.sourcePath,
          bleed: meta.bleed,
          controls,
          usage: spec?.usage,
        },
        values,
      )
    : null;

  const cycleTheme = () =>
    setPreviewTheme(
      (t) => THEME_ORDER[(THEME_ORDER.indexOf(t) + 1) % THEME_ORDER.length],
    );
  const cycleBackdrop = () =>
    setBackdrop(
      (b) =>
        BACKDROP_ORDER[(BACKDROP_ORDER.indexOf(b) + 1) % BACKDROP_ORDER.length],
    );

  const ThemeIcon = THEME_META[previewTheme].icon;
  const BackdropIcon = BACKDROP_META[backdrop].icon;

  const tabBtn = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors",
      active ? "bg-surface text-foreground shadow-sm" : "text-muted",
    );

  return (
    <div className="space-y-6">
      {/* Preview / Code stage */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-2">
          <div
            role="tablist"
            aria-label="View"
            onKeyDown={(e) =>
              roveTabs(e, VIEW_ORDER, view, setView, (v) => `${baseId}-tab-${v}`)
            }
            className="inline-flex rounded-lg border border-border bg-background p-0.5 text-xs"
          >
            <button
              id={`${baseId}-tab-preview`}
              role="tab"
              aria-selected={view === "preview"}
              aria-controls={`${baseId}-stage`}
              tabIndex={view === "preview" ? 0 : -1}
              onClick={() => setView("preview")}
              className={tabBtn(view === "preview")}
            >
              <Eye className="size-3.5" />
              Preview
            </button>
            <button
              id={`${baseId}-tab-code`}
              role="tab"
              aria-selected={view === "code"}
              aria-controls={`${baseId}-stage`}
              tabIndex={view === "code" ? 0 : -1}
              onClick={() => setView("code")}
              className={tabBtn(view === "code")}
            >
              <Code2 className="size-3.5" />
              Code
            </button>
          </div>

          {view === "preview" && (
            <div className="flex flex-wrap items-center gap-2">
              {maxWidth > 0 && (
                <span className="hidden min-w-[3.5rem] text-right font-mono text-xs tabular-nums text-muted sm:inline">
                  {effWidth}px
                </span>
              )}
              <ViewportToggle value={mode} onChange={setPreset} />
              {!meta.bleed && (
                <>
                  <ToolButton
                    label={`Preview theme: ${THEME_META[previewTheme].label}`}
                    onClick={cycleTheme}
                  >
                    <ThemeIcon className="size-4" />
                  </ToolButton>
                  <ToolButton
                    label={`Preview backdrop: ${BACKDROP_META[backdrop].label}`}
                    onClick={cycleBackdrop}
                  >
                    <BackdropIcon className="size-4" />
                  </ToolButton>
                  <div className="inline-flex items-center rounded-lg border border-border bg-background p-0.5">
                    <ToolButton
                      label="Zoom out"
                      bordered={false}
                      disabled={zoomIdx === 0}
                      onClick={() => setZoomIdx((z) => Math.max(0, z - 1))}
                    >
                      <ZoomOut className="size-4" />
                    </ToolButton>
                    <button
                      type="button"
                      aria-label="Reset zoom"
                      title="Reset zoom"
                      onClick={() => setZoomIdx(ZOOM_DEFAULT)}
                      className="px-1 font-mono text-[11px] tabular-nums text-muted transition-colors hover:text-foreground"
                    >
                      {Math.round(zoom * 100)}%
                    </button>
                    <ToolButton
                      label="Zoom in"
                      bordered={false}
                      disabled={zoomIdx === ZOOM_LEVELS.length - 1}
                      onClick={() =>
                        setZoomIdx((z) => Math.min(ZOOM_LEVELS.length - 1, z + 1))
                      }
                    >
                      <ZoomIn className="size-4" />
                    </ToolButton>
                  </div>
                </>
              )}
              <button
                type="button"
                onClick={refresh}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">Refresh Preview</span>
                <span className="sm:hidden">Refresh</span>
              </button>
            </div>
          )}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-stage`}
          aria-labelledby={`${baseId}-tab-${view}`}
        >
          {view === "preview" ? (
            <div className="p-4 sm:p-6">
              <div ref={containerRef} className="relative w-full">
                <div
                  className="relative mx-auto w-full transition-[max-width] duration-300 ease-out"
                  style={{ maxWidth: frameMaxWidth }}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl border border-border bg-background"
                    style={{ height: STAGE_HEIGHT }}
                  >
                    <div
                      key={`${refreshKey}:${valuesHash}`}
                      className={cn(
                        "absolute inset-0",
                        meta.bleed
                          ? "dark"
                          : cn(
                              "no-scrollbar flex items-center justify-center overflow-auto bg-background p-6 text-foreground",
                              previewTheme !== "site" && previewTheme,
                            ),
                      )}
                    >
                      {!meta.bleed && backdrop !== "plain" && (
                        <div
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute inset-0",
                            BACKDROP_CLASS[backdrop],
                          )}
                        />
                      )}
                      {meta.bleed ? (
                        previewNode
                      ) : (
                        <div
                          className="relative transition-transform duration-200"
                          style={
                            zoom !== 1 ? { transform: `scale(${zoom})` } : undefined
                          }
                        >
                          {previewNode}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Resize handle (desktop pointer + keyboard). */}
                  <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label="Resize preview width"
                    aria-valuemin={maxWidth ? MIN_WIDTH : undefined}
                    aria-valuemax={maxWidth || undefined}
                    aria-valuenow={maxWidth ? effWidth : undefined}
                    tabIndex={0}
                    onPointerDown={onHandleDown}
                    onPointerMove={onHandleMove}
                    onPointerUp={onHandleUp}
                    onKeyDown={onHandleKey}
                    className="group absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 cursor-ew-resize touch-none place-items-center rounded-full p-2 outline-none sm:grid"
                  >
                    <span className="h-12 w-1.5 rounded-full bg-border-strong transition-colors group-hover:bg-brand group-focus-visible:bg-brand" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 p-3 sm:p-4">
              {usageCode && (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      Usage
                    </h3>
                    <p className="text-xs text-muted">
                      Reflects your Customize options — works once the component
                      file below is in your project.
                    </p>
                  </div>
                  <CodeBlock code={usageCode} />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {meta.sourcePath ? (
                      <code className="font-mono text-[13px]">
                        src/{meta.sourcePath}
                      </code>
                    ) : (
                      "Component source"
                    )}
                  </h3>
                  <p className="text-xs text-muted">
                    Copy this file into your project — no package install
                    needed.
                  </p>
                </div>
                <CodeBlock code={code} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customize panel */}
      <section
        aria-label="Customize"
        className="overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 pl-4 pr-2">
          <h2 className="text-sm font-semibold text-foreground">Customize</h2>
          {controls.length > 0 && (
            <div className="flex items-center gap-0.5">
              <ToolButton
                label="Randomize options"
                bordered={false}
                onClick={randomize}
              >
                <Shuffle className="size-3.5" />
              </ToolButton>
              <ToolButton
                label={linkCopied ? "Link copied" : "Copy shareable link"}
                bordered={false}
                onClick={share}
              >
                {linkCopied ? (
                  <Check className="size-3.5 text-brand-2" />
                ) : (
                  <Link2 className="size-3.5" />
                )}
              </ToolButton>
              <button
                type="button"
                onClick={reset}
                disabled={modifiedCount === 0}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                  modifiedCount > 0
                    ? "text-muted hover:text-foreground"
                    : "cursor-default text-muted-2/60",
                )}
              >
                <RotateCcw className="size-3.5" />
                Reset
                {modifiedCount > 0 ? ` (${modifiedCount})` : ""}
              </button>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-5">
          {controls.length > 0 ? (
            <div key={resetKey} className="space-y-6">
              {groupControls(controls).map((section, i) => (
                <section
                  key={section.title ?? `_${i}`}
                  aria-label={section.title ?? undefined}
                  className="space-y-3"
                >
                  {section.title && (
                    <h3 className="text-[11px] font-semibold uppercase tracking-wide text-muted-2">
                      {section.title}
                    </h3>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.controls.map((control) => (
                      <ControlField
                        key={control.key}
                        control={control}
                        value={values[control.key]}
                        onChange={(v) => setValue(control.key, v)}
                        onReset={() => setValue(control.key, control.default)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              This component has no live options to customize — it renders the
              same in every state. See the Props table for its full API.
            </p>
          )}
        </div>
      </section>

      {/* Props reference */}
      <section
        aria-label="Props"
        className="overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div className="border-b border-border px-4 py-2.5">
          <h2 className="text-sm font-semibold text-foreground">Props</h2>
        </div>
        <div className="p-4 sm:p-5">
          <PropsTable id={meta.id} />
        </div>
      </section>
    </div>
  );
}

/** The Props table for a component, from its playground spec. */
function PropsTable({ id }: { id: string }) {
  const props = playgrounds[id]?.props;
  if (!props?.length) {
    return (
      <p className="text-sm text-muted">
        Props documentation for this component is on the way. The full,
        type-checked API lives in the source on the Code tab.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-2">
            <th className="py-2 pr-4 font-medium">Prop</th>
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 pr-4 font-medium">Default</th>
            <th className="py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-border/60 align-top">
              <td className="whitespace-nowrap py-2.5 pr-4">
                <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {p.name}
                </code>
                {p.required && (
                  <span className="ml-1 text-brand-3" title="Required">
                    *
                  </span>
                )}
              </td>
              <td className="py-2.5 pr-4">
                <code className="font-mono text-xs text-brand-ink">
                  {p.type}
                </code>
              </td>
              <td className="py-2.5 pr-4">
                <code className="font-mono text-xs text-muted">
                  {p.default ?? "—"}
                </code>
              </td>
              <td className="py-2.5 text-muted">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
