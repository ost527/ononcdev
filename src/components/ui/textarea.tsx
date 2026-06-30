"use client";

import {
  type ChangeEvent,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** Minimum visible rows before content grows the field. */
  minRows?: number;
  /** Maximum rows the field grows to before it scrolls. */
  maxRows?: number;
  /** Show a live character counter (requires maxLength). */
  showCount?: boolean;
}

/**
 * Textarea — an auto-resizing multiline field. It grows with its content from
 * minRows up to maxRows, then scrolls. With maxLength + showCount it renders a
 * polite live character counter. Height is driven by direct DOM measurement, so
 * it works controlled or uncontrolled.
 */
export function Textarea({
  minRows = 3,
  maxRows = 10,
  showCount = false,
  className,
  value,
  defaultValue,
  maxLength,
  onChange,
  ...props
}: TextareaProps) {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [internalCount, setInternalCount] = useState(
    String(defaultValue ?? "").length,
  );
  const count = value !== undefined ? String(value).length : internalCount;

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || 20;
    const paddingY =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const borderY =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const maxHeight = lineHeight * maxRows + paddingY + borderY;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight + borderY, maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight + borderY > maxHeight ? "auto" : "hidden";
  }, [maxRows]);

  // Resize on mount and whenever a controlled value changes.
  useEffect(() => {
    resize();
  }, [resize, value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalCount(e.target.value.length);
    resize();
    onChange?.(e);
  };

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        rows={minRows}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={handleChange}
        aria-describedby={showCount && maxLength ? `${id}-count` : undefined}
        className={cn(
          "block w-full resize-none rounded-xl border border-border bg-surface px-3 py-2 text-sm leading-5 text-foreground outline-none transition-colors placeholder:text-muted-2 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40",
          className,
        )}
        {...props}
      />
      {showCount && maxLength && (
        <div
          id={`${id}-count`}
          aria-live="polite"
          className="mt-1 text-right text-xs tabular-nums text-muted"
        >
          {count}/{maxLength}
        </div>
      )}
    </div>
  );
}
