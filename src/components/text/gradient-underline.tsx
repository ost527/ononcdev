import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GradientUnderlineProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/**
 * GradientUnderline — a link with a gradient underline that grows in from the
 * left on hover and keyboard focus. Pure CSS via an animated background-size.
 */
export function GradientUnderline({
  className,
  children,
  ...props
}: GradientUnderlineProps) {
  return (
    <a
      className={cn(
        "relative inline-block font-medium text-foreground no-underline",
        "bg-[linear-gradient(90deg,var(--brand),var(--brand-2))] bg-[length:0%_2px] bg-[position:0_100%] bg-no-repeat",
        "transition-[background-size] duration-300 ease-out hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
