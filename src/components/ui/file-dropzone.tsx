"use client";

import { type DragEvent, useRef, useState } from "react";
import { File as FileIcon, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileDropzoneProps {
  multiple?: boolean;
  accept?: string;
  onFiles?: (files: File[]) => void;
  className?: string;
}

/**
 * FileDropzone — drag files in or click to browse, with a selected-file list.
 * NOTE: front-end only — it surfaces the chosen File objects via `onFiles` and
 * uploads nothing. Wire `onFiles` to your own authenticated upload.
 */
export function FileDropzone({
  multiple = true,
  accept,
  onFiles,
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handle = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    setFiles(arr);
    onFiles?.(arr);
  };

  const onDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragging(false);
    handle(e.dataTransfer.files);
  };

  return (
    <div className={cn("w-72", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          dragging
            ? "border-brand bg-brand/5"
            : "border-border bg-surface hover:border-border-strong",
        )}
      >
        <UploadCloud
          className={cn("size-7", dragging ? "text-brand-ink" : "text-muted")}
        />
        <span className="text-sm font-medium">Drop files or click to browse</span>
        <span className="text-xs text-muted">
          Front-end demo — nothing is uploaded
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        aria-label="Choose files"
        className="sr-only"
        onChange={(e) => handle(e.target.files)}
      />
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              <FileIcon className="size-4 shrink-0 text-muted" />
              <span className="flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-muted">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() =>
                  setFiles((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="shrink-0 text-muted transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
