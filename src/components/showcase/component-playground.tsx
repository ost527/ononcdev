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
import { Code2, Eye, RotateCcw } from "lucide-react";
import { CodeBlock } from "@/components/showcase/code-block";
import {
  ControlField,
  initialValues,
} from "@/components/showcase/playground-controls";
import {
  VIEWPORT_WIDTHS,
  ViewportToggle,
} from "@/components/showcase/viewport-toggle";
import { playgrounds } from "@/registry/playground";
import type { ControlValue, PlaygroundValues } from "@/registry/types";
import { cn } from "@/lib/utils";

export interface PlaygroundMeta {
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  description: string;
  tags?: string[];
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
type PanelTab = "customize" | "props";

/** Preset frame widths; `desktop` fills the available width. */
const PRESETS = VIEWPORT_WIDTHS;
const MIN_WIDTH = 280;
const STAGE_HEIGHT = 460;

const VIEW_ORDER: View[] = ["preview", "code"];
const PANEL_ORDER: PanelTab[] = ["customize", "props"];

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
 * ComponentPlayground — the component detail experience: a Preview/Code stage
 * with PC / Tablet / Mobile viewport switching, a Refresh button that remounts
 * the preview, a draggable + keyboard-accessible resize handle, and a per-card
 * Customize panel (driven by `playgrounds`) alongside a Props table.
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
  const [panel, setPanel] = useState<PanelTab>(
    controls.length ? "customize" : "props",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

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

  const isFluid = mode === "desktop" || width === null;
  const clampedWidth =
    width === null ? maxWidth : Math.min(width, maxWidth || width);
  const frameWidth = isFluid ? "100%" : `${clampedWidth}px`;
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

  const tabBtn = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors",
      active ? "bg-surface text-foreground shadow-sm" : "text-muted",
    );

  return (
    <div className="space-y-6">
      {/* Preview / Code stage */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
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
            <div className="flex items-center gap-2">
              <ViewportToggle value={mode} onChange={setPreset} />
              {maxWidth > 0 && (
                <span className="hidden min-w-[3.5rem] text-right font-mono text-xs tabular-nums text-muted sm:inline">
                  {effWidth}px
                </span>
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
                <div className="relative mx-auto" style={{ width: frameWidth }}>
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
                          : "flex items-center justify-center overflow-auto p-6",
                      )}
                    >
                      {previewNode}
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
            <div className="p-3">
              <CodeBlock code={code} />
            </div>
          )}
        </div>
      </div>

      {/* Customize / Props panel */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-2">
          <div
            role="tablist"
            aria-label="Component options"
            onKeyDown={(e) =>
              roveTabs(e, PANEL_ORDER, panel, setPanel, (v) => `${baseId}-tab-${v}`)
            }
            className="inline-flex rounded-lg border border-border bg-background p-0.5 text-xs"
          >
            <button
              id={`${baseId}-tab-customize`}
              role="tab"
              aria-selected={panel === "customize"}
              aria-controls={`${baseId}-panel`}
              tabIndex={panel === "customize" ? 0 : -1}
              onClick={() => setPanel("customize")}
              className={tabBtn(panel === "customize")}
            >
              Customize
            </button>
            <button
              id={`${baseId}-tab-props`}
              role="tab"
              aria-selected={panel === "props"}
              aria-controls={`${baseId}-panel`}
              tabIndex={panel === "props" ? 0 : -1}
              onClick={() => setPanel("props")}
              className={tabBtn(panel === "props")}
            >
              Props
            </button>
          </div>
          {panel === "customize" && controls.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          )}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${panel}`}
          className="p-4 sm:p-5"
        >
          {panel === "customize" ? (
            controls.length > 0 ? (
              <div key={resetKey} className="grid gap-5 sm:grid-cols-2">
                {controls.map((control) => (
                  <ControlField
                    key={control.key}
                    control={control}
                    value={values[control.key]}
                    onChange={(v) => setValue(control.key, v)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">
                This component has no live options to customize — it renders the
                same in every state. See the{" "}
                <button
                  type="button"
                  onClick={() => setPanel("props")}
                  className="font-medium text-brand-ink underline-offset-2 hover:underline"
                >
                  Props
                </button>{" "}
                tab for its full API.
              </p>
            )
          ) : (
            <PropsTable id={meta.id} />
          )}
        </div>
      </div>
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
