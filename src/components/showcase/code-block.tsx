"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

/** Syntax-highlighted, copyable code block. */
export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.trim();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable (e.g. insecure context) */
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border",
        className,
      )}
      style={{ background: "#0a0c16" }}
    >
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/90 px-2.5 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
      >
        {copied ? (
          <Check className="size-3.5 text-brand-2" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <Highlight code={trimmed} language={language} theme={themes.vsDark}>
        {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              cls,
              "max-h-[26rem] overflow-auto p-4 text-[13px] leading-relaxed",
            )}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  <span className="mr-4 inline-block w-6 shrink-0 select-none text-right text-muted-2">
                    {i + 1}
                  </span>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token });
                    return <span key={key} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
