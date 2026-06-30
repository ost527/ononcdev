"use client";

import { type ReactNode, useId, useState } from "react";
import { Code2, Eye } from "lucide-react";
import { CodeBlock } from "@/components/showcase/code-block";
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
}

type Tab = "preview" | "code";

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
  return (
    <div
      role="tablist"
      aria-label="View"
      className="inline-flex rounded-lg border border-border bg-background p-0.5 text-xs"
    >
      <button
        id={`${baseId}-tab-preview`}
        role="tab"
        aria-selected={tab === "preview"}
        aria-controls={`${baseId}-panel`}
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

/** Preview/Code tabbed showcase for a single component. */
export function ComponentShowcase({
  name,
  description,
  code,
  preview,
  tags,
  layout = "card",
  frameClassName,
  bleed,
}: ComponentShowcaseProps) {
  const baseId = useId();
  const [tab, setTab] = useState<Tab>("preview");
  const panelProps = {
    role: "tabpanel" as const,
    id: `${baseId}-panel`,
    "aria-labelledby": `${baseId}-tab-${tab}`,
  };

  if (layout === "block") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
          <TabSwitch tab={tab} setTab={setTab} baseId={baseId} />
        </div>
        <div {...panelProps}>
          {tab === "preview" ? preview : <CodeBlock code={code} />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong">
      <div className="flex items-center justify-end border-b border-border p-2">
        <TabSwitch tab={tab} setTab={setTab} baseId={baseId} />
      </div>
      <div {...panelProps}>
        {tab === "preview" ? (
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden bg-background",
              bleed && "dark",
              frameClassName ?? "h-64",
            )}
          >
            {bleed ? <div className="absolute inset-0">{preview}</div> : preview}
          </div>
        ) : (
          <div className="p-3">
            <CodeBlock code={code} className="max-h-80" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted">{description}</p>
        <Tags tags={tags} />
      </div>
    </div>
  );
}
