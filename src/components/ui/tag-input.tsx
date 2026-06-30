"use client";

import { type KeyboardEvent, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagInputProps {
  defaultTags?: string[];
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  className?: string;
}

/**
 * TagInput — type and press Enter (or comma) to add a chip; click the × or
 * press Backspace on an empty field to remove the last one.
 */
export function TagInput({
  defaultTags = [],
  placeholder = "Add a tag…",
  onChange,
  className,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [input, setInput] = useState("");

  const update = (next: string[]) => {
    setTags(next);
    onChange?.(next);
  };
  const add = (raw: string) => {
    const tag = raw.trim();
    if (tag && !tags.includes(tag)) update([...tags, tag]);
    setInput("");
  };
  const removeAt = (i: number) => update(tags.filter((_, idx) => idx !== i));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeAt(tags.length - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex w-72 flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface p-1.5 focus-within:border-brand",
        className,
      )}
    >
      <ul className="contents">
        {tags.map((tag, i) => (
          <li
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-brand/15 py-1 pl-2.5 pr-1 text-sm text-foreground"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => removeAt(i)}
              className="grid size-4 place-items-center rounded text-muted transition-colors hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </li>
        ))}
      </ul>
      <input
        value={input}
        placeholder={tags.length ? "" : placeholder}
        aria-label="Add a tag"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="min-w-[6rem] flex-1 bg-transparent px-1.5 py-1 text-sm outline-none"
      />
    </div>
  );
}
