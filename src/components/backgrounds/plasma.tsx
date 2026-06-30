import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PlasmaProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Plasma — vivid blurred color fields that pan while their hue slowly rotates,
 * giving a living, lava-lamp feel. Pure CSS.
 */
export function Plasma({ className, children, ...props }: PlasmaProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ animation: "hue 14s linear infinite" }}
      >
        <div
          className="animate-gradient absolute inset-[-20%] opacity-80 blur-2xl"
          style={
            {
              backgroundImage: [
                "radial-gradient(35% 45% at 20% 30%, #8b5cf6, transparent 60%)",
                "radial-gradient(40% 45% at 80% 25%, #22d3ee, transparent 60%)",
                "radial-gradient(45% 50% at 65% 80%, #fb7185, transparent 60%)",
                "radial-gradient(40% 45% at 25% 75%, #4f46e5, transparent 60%)",
              ].join(","),
              backgroundSize: "180% 180%",
            } as CSSProperties
          }
        />
      </div>
      {children}
    </div>
  );
}
