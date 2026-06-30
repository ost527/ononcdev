import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * ShimmerButton — a pill button ringed by a slowly rotating conic gradient,
 * so a band of light continuously orbits the border. Pure CSS animation.
 */
export function ShimmerButton({
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex overflow-hidden rounded-full p-[1.5px] focus:outline-none",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="animate-spin-slow absolute inset-[-250%]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 80deg, var(--brand-2) 110deg, var(--brand) 150deg, var(--brand-3) 190deg, transparent 230deg 360deg)",
        }}
      />
      <span className="relative inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors group-hover:bg-surface/80">
        {children}
      </span>
    </button>
  );
}
