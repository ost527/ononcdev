"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  /** Display name — used for the accessible label and the initials fallback. */
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  status?: AvatarStatus;
  className?: string;
}

const SIZES: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};

const STATUS: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-muted-2",
  busy: "bg-rose-500",
  away: "bg-amber-500",
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Avatar — a circular user image that falls back to initials if no src is given
 * or the image fails to load, with an optional status dot. The accessible name
 * is always the person's name.
 */
export function Avatar({ name, src, size = "md", status, className }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = !!src && !errored;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 font-medium text-foreground ring-1 ring-border",
        SIZES[size],
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- portable, framework-agnostic avatar
        <img
          src={src}
          alt={name}
          onError={() => setErrored(true)}
          className="size-full object-cover"
        />
      ) : (
        <>
          <span aria-hidden>{initials(name)}</span>
          <span className="sr-only">{name}</span>
        </>
      )}
      {status && (
        <span
          role="img"
          aria-label={`Status: ${status}`}
          className={cn(
            "absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-surface",
            STATUS[status],
          )}
        />
      )}
    </span>
  );
}
