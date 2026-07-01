"use client";

import { type KeyboardEvent, type ReactNode, useId, useState } from "react";
import Link from "next/link";
import { Code2, Eye, Moon, SlidersHorizontal } from "lucide-react";
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
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
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
}: ComponentShowcaseProps) {
  const baseId = useId();
  const [tab, setTab] = useState<Tab>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");

  if (layout === "block") {
    const panelProps = {
      role: "tabpanel" as const,
      id: `${baseId}-panel`,
      "aria-labelledby": `${baseId}-tab-${tab}`,
    };
    const width = VIEWPORT_WIDTHS[viewport];
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Heading href={href} name={name} className="text-lg font-medium" />
            <Summary href={href} description={description} />
          </div>
          <div className="flex items-center gap-2">
            {tab === "preview" && (
              <ViewportToggle value={viewport} onChange={setViewport} />
            )}
            <TabSwitch tab={tab} setTab={setTab} baseId={baseId} />
          </div>
        </div>
        <div {...panelProps}>
          {tab === "code" ? (
            <CodeBlock code={code} />
          ) : width === null ? (
            // Desktop: reserve space (previewClassName) so a downward-opening
            // menu doesn't overlap the next block in the list.
            previewClassName ? (
              <div className={cn("relative", previewClassName)}>{preview}</div>
            ) : (
              preview
            )
          ) : (
            <div className="overflow-x-hidden">
              <div
                className={cn(
                  "mx-auto overflow-hidden rounded-xl border border-border transition-[width] duration-300",
                  previewClassName,
                )}
                style={{ width: `${width}px`, maxWidth: "100%" }}
              >
                {preview}
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
        {bleed ? <div className="absolute inset-0">{preview}</div> : preview}
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
