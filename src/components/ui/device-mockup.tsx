import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DeviceVariant = "phone" | "browser" | "tablet";
export type DeviceFrame = "graphite" | "silver" | "midnight";
export type PhoneNotch = "island" | "notch" | "none";

export interface DeviceMockupProps {
  /** Which device chrome to draw. */
  variant?: DeviceVariant;
  /** Hardware finish of the frame. */
  frame?: DeviceFrame;
  /** Camera cutout style (phone only). */
  notch?: PhoneNotch;
  /** Address-bar text (browser only). */
  url?: string;
  /** Frame width in pixels; height follows the device's aspect ratio. */
  width?: number;
  /** Soft drop shadow beneath the device. */
  shadow?: boolean;
  /** Diagonal glass reflection across the screen. */
  glare?: boolean;
  /** Screen content; a neutral placeholder renders when omitted. */
  children?: ReactNode;
  className?: string;
}

/** Hardware finishes: bezel / edge highlight / screen backdrop. */
const FINISH: Record<DeviceFrame, { bezel: string; edge: string; screen: string }> = {
  graphite: { bezel: "#3a3d46", edge: "#61646e", screen: "#101218" },
  silver: { bezel: "#d7dae2", edge: "#f4f6fa", screen: "#14161d" },
  midnight: { bezel: "#171923", edge: "#3c4051", screen: "#0b0d14" },
};

function PlaceholderScreen() {
  return (
    <div
      aria-hidden
      className="flex h-full w-full flex-col justify-end gap-2 bg-gradient-to-br from-brand via-brand-2 to-brand-3 p-4"
    >
      <div className="h-2 w-1/2 rounded-full bg-white/70" />
      <div className="h-2 w-1/3 rounded-full bg-white/40" />
    </div>
  );
}

function Glare() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        background:
          "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.04) 56%, transparent 62%)",
      }}
    />
  );
}

/**
 * DeviceMockup — presentational phone, tablet and browser frames drawn in
 * pure CSS, for showcasing screenshots and live UI. The chrome is decorative
 * (hidden from assistive tech); only your screen content is exposed.
 */
export function DeviceMockup({
  variant = "phone",
  frame = "graphite",
  notch = "island",
  url = "ononc.dev",
  width,
  shadow = true,
  glare = false,
  children,
  className,
}: DeviceMockupProps) {
  const finish = FINISH[frame];
  const screen = children ?? <PlaceholderScreen />;
  const shadowStyle = shadow
    ? { boxShadow: "0 30px 60px -18px rgba(8, 10, 20, 0.5)" }
    : undefined;

  if (variant === "browser") {
    return (
      <figure
        aria-label="Browser window mockup"
        className={cn("m-0", className)}
        style={{ width: width ?? 480 }}
      >
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: finish.edge, background: finish.bezel, ...shadowStyle }}
        >
          <div aria-hidden className="flex items-center gap-2 px-3.5 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span
              className="ml-3 flex-1 truncate rounded-md px-3 py-1 text-center font-mono text-[11px]"
              style={{ background: finish.screen, color: "rgba(255,255,255,0.55)" }}
            >
              {url}
            </span>
          </div>
          <div
            className="relative aspect-[16/10] overflow-hidden"
            style={{ background: finish.screen }}
          >
            {glare && <Glare />}
            {screen}
          </div>
        </div>
      </figure>
    );
  }

  const isPhone = variant === "phone";
  return (
    <figure
      aria-label={isPhone ? "Phone mockup" : "Tablet mockup"}
      className={cn("m-0", className)}
      style={{ width: width ?? (isPhone ? 240 : 380) }}
    >
      <div
        className={cn("relative border-4", isPhone ? "rounded-[2.6rem]" : "rounded-[1.9rem]")}
        style={{
          borderColor: finish.bezel,
          background: finish.bezel,
          boxShadow: `inset 0 0 0 2px ${finish.edge}${shadow ? ", 0 30px 60px -18px rgba(8, 10, 20, 0.5)" : ""}`,
        }}
      >
        {/* Side buttons */}
        <span
          aria-hidden
          className="absolute -left-[6px] top-[22%] h-10 w-[3px] rounded-l"
          style={{ background: finish.edge }}
        />
        <span
          aria-hidden
          className="absolute -right-[6px] top-[30%] h-14 w-[3px] rounded-r"
          style={{ background: finish.edge }}
        />
        <div
          className={cn(
            "relative overflow-hidden",
            isPhone ? "aspect-[9/19] rounded-[2.2rem]" : "aspect-[3/4] rounded-[1.5rem]",
          )}
          style={{ background: finish.screen }}
        >
          {isPhone && notch !== "none" && (
            <span
              aria-hidden
              className={cn(
                "absolute left-1/2 z-20 -translate-x-1/2 bg-black",
                notch === "island"
                  ? "top-2.5 h-[18px] w-[36%] rounded-full"
                  : "top-0 h-[22px] w-[52%] rounded-b-2xl",
              )}
            />
          )}
          {glare && <Glare />}
          <div className="absolute inset-0">{screen}</div>
          <span
            aria-hidden
            className="absolute bottom-1.5 left-1/2 z-20 h-1 w-1/3 -translate-x-1/2 rounded-full bg-white/40"
          />
        </div>
      </div>
    </figure>
  );
}
