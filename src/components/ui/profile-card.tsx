"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { clamp, cn, prefersReducedMotion } from "@/lib/utils";

export interface ProfileCardProps {
  /** Full name shown on the card and used to derive the avatar initials. */
  name?: string;
  /** Role or subtitle rendered beneath the name. */
  title?: string;
  /** Social handle, rendered as `@handle`. */
  handle?: string;
  /** Short availability label shown beside the status dot (e.g. "Online"). */
  status?: string;
  /** Avatar image URL; when omitted (or on load error) initials over a color→color2 gradient are shown. */
  avatarUrl?: string;
  /** Maximum pointer tilt in degrees; `0` disables the tilt entirely. */
  tilt?: number;
  /** Holographic sheen overlay intensity, clamped to 0–1. */
  sheen?: number;
  /** Render a moving specular highlight that tracks the pointer. */
  glare?: boolean;
  /** Render a soft, blurred colored glow behind the card. */
  behindGlow?: boolean;
  /** Primary accent color (hex) used across the gradients. */
  color?: string;
  /** Secondary accent color (hex) used across the gradients. */
  color2?: string;
  /** Corner radius in pixels. */
  radius?: number;
  /** Render the contact button. */
  showContact?: boolean;
  /** Text label for the contact button. */
  contactLabel?: string;
  /** Called when the contact button is activated. */
  onContact?: () => void;
  /** Extra classes merged onto the root element. */
  className?: string;
}

/**
 * ProfileCard — a premium profile card that tilts toward the pointer with a
 * holographic sheen, an optional moving glare, and a soft glow behind it. A
 * single pointer handler writes CSS variables (`--px`/`--py` in 0–1 and the
 * tilt degrees `--rx`/`--ry`) straight to the card, so it reacts without any
 * React re-render. Reduced-motion users get a static, centered card with no
 * tilt and no moving highlights.
 */
export function ProfileCard({
  name = "Ava Bennett",
  title = "Product Designer",
  handle = "avabennett",
  status = "Online",
  avatarUrl,
  tilt = 12,
  sheen = 0.6,
  glare = true,
  behindGlow = true,
  color = "#8b5cf6",
  color2 = "#22d3ee",
  radius = 22,
  showContact = true,
  contactLabel = "Message",
  onContact,
  className,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const showImage = !!avatarUrl && !imgError;

  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "?";

  const handleMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (prefersReducedMotion()) return;
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const px = clamp((e.clientX - r.left) / r.width, 0, 1);
    const py = clamp((e.clientY - r.top) / r.height, 0, 1);
    card.style.setProperty("--px", String(px));
    card.style.setProperty("--py", String(py));
    if (tilt > 0) {
      card.style.setProperty("--ry", `${(px - 0.5) * 2 * tilt}deg`);
      card.style.setProperty("--rx", `${(0.5 - py) * 2 * tilt}deg`);
    }
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--px", "0.5");
    card.style.setProperty("--py", "0.5");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      aria-label={`${name} — ${title}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("relative mx-auto w-full max-w-[320px]", className)}
    >
      {behindGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 blur-2xl"
          style={{
            borderRadius: radius + 14,
            backgroundImage: `linear-gradient(135deg, ${color}, ${color2})`,
            opacity: 0.4,
          }}
        />
      )}

      <div
        ref={cardRef}
        className="relative overflow-hidden border border-border bg-surface transition-transform duration-200 ease-out will-change-transform [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
        style={{ borderRadius: radius }}
      >
        {/* (a) holographic sheen — accent colors, position shifts with the pointer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
          style={{
            opacity: clamp(sheen, 0, 1),
            backgroundImage: `radial-gradient(80% 80% at calc(var(--px,0.5)*100%) calc(var(--py,0.5)*100%), color-mix(in srgb, ${color2} 45%, transparent), transparent 55%), conic-gradient(from calc((var(--px,0.5) + var(--py,0.5)) * 180deg) at 50% 50%, color-mix(in srgb, ${color} 55%, transparent), color-mix(in srgb, ${color2} 55%, transparent), color-mix(in srgb, ${color} 55%, transparent), color-mix(in srgb, ${color2} 55%, transparent), color-mix(in srgb, ${color} 55%, transparent))`,
          }}
        />

        {/* (b) moving specular glare */}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at calc(var(--px,0.5)*100%) calc(var(--py,0.5)*100%), rgba(255,255,255,0.5), transparent 45%)`,
            }}
          />
        )}

        <div className="relative flex flex-col items-center gap-3 p-6 text-center">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- portable, framework-agnostic avatar
            <img
              src={avatarUrl}
              alt=""
              onError={() => setImgError(true)}
              className="size-20 rounded-full object-cover ring-2 ring-border-strong"
            />
          ) : (
            <div
              aria-hidden
              className="grid size-20 place-items-center rounded-full text-xl font-semibold text-white ring-2 ring-border-strong"
              style={{
                backgroundImage: `linear-gradient(135deg, ${color}, ${color2})`,
              }}
            >
              {initials}
            </div>
          )}

          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted">{title}</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-2">@{handle}</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
              />
              <span className="text-muted">{status}</span>
            </span>
          </div>

          {showContact && (
            <button
              type="button"
              onClick={onContact}
              aria-label={`${contactLabel} — ${name}`}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              style={{
                backgroundImage: `linear-gradient(135deg, ${color}, ${color2})`,
              }}
            >
              <MessageCircle aria-hidden className="size-4" />
              {contactLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
