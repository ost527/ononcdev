import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GradientMeshProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * GradientMesh — a layered radial-gradient mesh that slowly pans, finished
 * with a faint SVG grain so large color fields don't band. Pure CSS.
 */
export function GradientMesh({
  className,
  children,
  ...props
}: GradientMeshProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <div
        aria-hidden
        className="animate-gradient pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(40% 55% at 18% 22%, color-mix(in oklab, var(--brand) 70%, transparent), transparent 70%)",
            "radial-gradient(45% 50% at 82% 18%, color-mix(in oklab, var(--brand-2) 60%, transparent), transparent 70%)",
            "radial-gradient(50% 60% at 70% 88%, color-mix(in oklab, var(--brand-3) 55%, transparent), transparent 72%)",
            "radial-gradient(45% 55% at 25% 85%, color-mix(in oklab, #4f46e5 60%, transparent), transparent 72%)",
          ].join(","),
          backgroundSize: "200% 200%",
          opacity: 0.7,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {children}
    </div>
  );
}
