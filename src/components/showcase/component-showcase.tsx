"use client";

import {
  Fragment,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Code2, Eye, Moon, RotateCcw, SlidersHorizontal } from "lucide-react";
import { CodeBlock } from "@/components/showcase/code-block";
import {
  VIEWPORT_WIDTHS,
  type Viewport,
  ViewportToggle,
} from "@/components/showcase/viewport-toggle";
import { cn } from "@/lib/utils";

export interface ComponentShowcaseProps {
  name: string;
  description: string;
  code: string;
  preview: ReactNode;
  tags?: string[];
  layout?: "card" | "block";
  frameClassName?: string;
  bleed?: boolean;
  /** When true, the card is badged as having live Customize controls. */
  customizable?: boolean;
  /** When set, the title + summary link to the component detail page. */
  href?: string;
  /** Extra classes for the block-layout desktop preview wrapper (reserve height). */
  previewClassName?: string;
  /** Extra inset around the block-layout preview frame, in pixels. */
  previewPadding?: number;
  /** Whether to draw the block-layout preview frame border. */
  previewBorder?: boolean;
}

type Tab = "preview" | "code";

/** Preview/Code tab switch — used by the full-width block layout only. */
function TabSwitch({
  tab,
  setTab,
  baseId,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  baseId: string;
}) {
  const tabClass = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors",
      active ? "bg-surface text-foreground" : "text-muted",
    );
  // Roving focus (WAI-ARIA Tabs pattern): Arrow/Home/End move + activate a tab.
  const order: Tab[] = ["preview", "code"];
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = order.indexOf(tab);
    let next: Tab | undefined;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = order[(idx + 1) % order.length];
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = order[(idx - 1 + order.length) % order.length];
    } else if (e.key === "Home") {
      next = order[0];
    } else if (e.key === "End") {
      next = order[order.length - 1];
    }
    if (next) {
      e.preventDefault();
      setTab(next);
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
    }
  };
  return (
    <div
      role="tablist"
      aria-label="View"
      onKeyDown={onKeyDown}
      className="inline-flex rounded-lg border border-border bg-background p-0.5 text-xs"
    >
      <button
        id={`${baseId}-tab-preview`}
        role="tab"
        aria-selected={tab === "preview"}
        aria-controls={`${baseId}-panel`}
        tabIndex={tab === "preview" ? 0 : -1}
        onClick={() => setTab("preview")}
        className={tabClass(tab === "preview")}
      >
        <Eye className="size-3.5" />
        Preview
      </button>
      <button
        id={`${baseId}-tab-code`}
        role="tab"
        aria-selected={tab === "code"}
        aria-controls={`${baseId}-panel`}
        tabIndex={tab === "code" ? 0 : -1}
        onClick={() => setTab("code")}
        className={tabClass(tab === "code")}
      >
        <Code2 className="size-3.5" />
        Code
      </button>
    </div>
  );
}

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ViewportPreviewFrame({
  children,
  refreshKey,
  onHeightChange,
}: {
  children: ReactNode;
  refreshKey: number;
  onHeightChange?: (height: number) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) return;
    doc.open();
    doc.write(
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>',
    );
    doc.close();

    const syncTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      doc.documentElement.classList.toggle("dark", isDark);
      doc.body.classList.toggle("dark", isDark);
    };

    // Measure the body's scroll overflow only: documentElement.scrollHeight is
    // clamped to the iframe viewport height, so once the frame grows (e.g. a
    // mobile menu opens) it could never shrink back after the content collapsed.
    const syncHeight = () => {
      const nextHeight = Math.max(doc.body.scrollHeight, 1);
      setHeight(nextHeight);
      onHeightChange?.(nextHeight);
    };

    let heightFrame = 0;
    const scheduleSyncHeight = () => {
      cancelAnimationFrame(heightFrame);
      heightFrame = requestAnimationFrame(syncHeight);
    };

    const charset = doc.createElement("meta");
    charset.setAttribute("charset", "utf-8");
    const viewport = doc.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1";
    const frameStyle = doc.createElement("style");
    frameStyle.textContent =
      "html,body{-ms-overflow-style:none;scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none}";
    const styleNodes = Array.from(
      document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>(
        'link[rel="stylesheet"], style',
      ),
      (node) => {
        const clone = node.cloneNode(true) as HTMLLinkElement | HTMLStyleElement;
        if (node instanceof HTMLLinkElement && clone instanceof HTMLLinkElement) {
          clone.href = node.href;
        }
        return clone;
      },
    );
    doc.head.replaceChildren(charset, viewport, ...styleNodes, frameStyle);
    doc.documentElement.className = "";
    doc.body.className = "";
    doc.body.style.margin = "0";
    doc.body.style.width = "100%";
    doc.body.style.background = "transparent";
    const mount = doc.createElement("div");
    doc.body.replaceChildren(mount);

    syncTheme();
    setMountNode(mount);
    syncHeight();

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleSyncHeight);
    resizeObserver?.observe(doc.documentElement);
    resizeObserver?.observe(doc.body);
    resizeObserver?.observe(mount);

    // Absolutely-positioned overlays (dropdown menus, popovers) change the
    // body's scroll overflow without resizing any observed box, so DOM
    // mutations must retrigger the measurement too.
    const mutationObserver = new MutationObserver(scheduleSyncHeight);
    mutationObserver.observe(doc.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    scheduleSyncHeight();

    return () => {
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      themeObserver.disconnect();
      cancelAnimationFrame(heightFrame);
    };
  }, [onHeightChange, refreshKey]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Component preview"
        className="block w-full border-0"
        style={{ height }}
      />
      {mountNode && createPortal(<Fragment key={refreshKey}>{children}</Fragment>, mountNode)}
    </>
  );
}

/**
 * DarkOnlyBadge — marks components designed for dark backgrounds only. Driven
 * by the `bleed` flag: full-bleed previews are forced onto a dark stage (the
 * `bleed && "dark"` frame below) because those components — the ambient
 * backgrounds — use fixed glow colors tuned for a dark backdrop and are not
 * theme-adaptive. The icon is decorative; the text carries the meaning.
 */
function DarkOnlyBadge() {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border-strong bg-background px-2 py-0.5 text-[11px] font-medium text-foreground"
      title="Designed for dark backgrounds"
    >
      <Moon className="size-3 text-brand-ink" aria-hidden />
      Dark only
    </span>
  );
}

/**
 * CustomizeBadge — marks components whose detail page exposes live "Customize"
 * controls (their playground spec has a non-empty `controls` array). The icon
 * is decorative; the text carries the meaning.
 */
function CustomizeBadge() {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border-strong bg-background/85 px-2 py-0.5 text-[11px] font-medium text-brand-ink shadow-sm backdrop-blur-sm"
      title="Has live Customize controls"
    >
      <SlidersHorizontal className="size-3" aria-hidden />
      Customizable
    </span>
  );
}

/** Component name — links to the detail page when `href` is set. */
function Heading({
  href,
  name,
  className,
}: {
  href?: string;
  name: string;
  className?: string;
}) {
  return (
    <h3 className={className}>
      {href ? (
        <Link href={href} className="transition-colors hover:text-brand-ink">
          {name}
        </Link>
      ) : (
        name
      )}
    </h3>
  );
}

/** Summary line — also links to the detail page when `href` is set. */
function Summary({ href, description }: { href?: string; description: string }) {
  if (href) {
    return (
      <Link
        href={href}
        className="block text-sm text-muted transition-colors hover:text-foreground"
      >
        {description}
      </Link>
    );
  }
  return <p className="text-sm text-muted">{description}</p>;
}

/**
 * ComponentShowcase — a grid card (preview + linked title/summary that open the
 * detail page) or a full-width block (with inline Preview/Code tabs). The
 * card list intentionally has no inline tabs or Customize button: that tooling
 * lives on the component detail page.
 */
export function ComponentShowcase({
  name,
  description,
  code,
  preview,
  tags,
  layout = "card",
  frameClassName,
  bleed,
  customizable,
  href,
  previewClassName,
  previewPadding = 0,
  previewBorder = false,
}: ComponentShowcaseProps) {
  const baseId = useId();
  const [tab, setTab] = useState<Tab>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const desktopPreviewRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const [previewHeight, setPreviewHeight] = useState(1);

  useEffect(() => {
    if (layout !== "block") return;

    const frame = desktopPreviewRef.current;
    if (!frame) return;

    const desktopPreviewWidth = 1024 + previewPadding * 2;
    const syncScale = () => {
      const availableWidth = frame.getBoundingClientRect().width;
      setPreviewScale(
        Math.min(1, availableWidth > 0 ? availableWidth / desktopPreviewWidth : 1),
      );
    };

    syncScale();

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(syncScale);
    resizeObserver?.observe(frame);

    return () => {
      resizeObserver?.disconnect();
    };
  }, [layout, previewPadding]);

  if (layout === "block") {
    const panelProps = {
      role: "tabpanel" as const,
      id: `${baseId}-panel`,
      "aria-labelledby": `${baseId}-tab-${tab}`,
    };
    const width = VIEWPORT_WIDTHS[viewport];
    const previewFrameWidth =
      width === null ? 1024 + previewPadding * 2 : width + previewPadding * 2;
    const previewBoxHeight = (previewHeight + previewPadding * 2) * previewScale;
    const refreshPreview = () => setRefreshKey((key) => key + 1);
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div>
            <Heading href={href} name={name} className="text-lg font-medium" />
            <Summary href={href} description={description} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabSwitch tab={tab} setTab={setTab} baseId={baseId} />
            {tab === "preview" && (
              <div className="flex items-center gap-2">
                <ViewportToggle value={viewport} onChange={setViewport} />
                <button
                  type="button"
                  onClick={refreshPreview}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Refresh</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div {...panelProps}>
          {tab === "code" ? (
            <CodeBlock code={code} />
          ) : (
            <div
              ref={desktopPreviewRef}
              className={cn(
                "relative overflow-hidden",
                viewport === "desktop" && previewClassName,
              )}
            >
              <div
                className="relative"
                style={{
                  height: `${previewBoxHeight}px`,
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 flex justify-center"
                  style={{
                    transform: previewScale < 1 ? `scale(${previewScale})` : undefined,
                    transformOrigin: "top center",
                  }}
                >
                  <div
                    className={cn(
                      "shrink-0 overflow-hidden transition-[width] duration-300",
                      previewBorder && "rounded-xl border border-border",
                    )}
                    style={{
                      width: previewFrameWidth,
                      maxWidth: "none",
                      padding: previewPadding,
                    }}
                  >
                    <ViewportPreviewFrame
                      refreshKey={refreshKey}
                      onHeightChange={setPreviewHeight}
                    >
                      {preview}
                    </ViewportPreviewFrame>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong">
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-background",
          bleed && "dark",
          frameClassName ?? "h-64",
        )}
      >
        {/* The preview must be the sole child of an element created in this
            client component: the RSC-deserialized (lazy) preview element
            loses its static-children validation mark, so rendering it bare
            inside this multi-child array trips React's missing-"key" warning,
            blamed on ComponentShowcase. `contents` keeps frame flex layout. */}
        <div className={bleed ? "absolute inset-0" : "contents"}>{preview}</div>
        {customizable && (
          <div className="pointer-events-none absolute right-2 top-2 z-10">
            <CustomizeBadge />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
        <div className="flex items-start justify-between gap-2">
          <Heading href={href} name={name} className="min-w-0 font-medium" />
          {bleed && <DarkOnlyBadge />}
        </div>
        <Summary href={href} description={description} />
        <Tags tags={tags} />
      </div>
    </div>
  );
}
