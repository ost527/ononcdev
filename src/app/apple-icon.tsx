import { ImageResponse } from "next/og";

// Required for `output: export` — baked to a static PNG at build time.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #a78bfa 0%, #22d3ee 52%, #fb7185 100%)",
        }}
      >
        {/* Soft top-left gloss for a dimensional, premium finish */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 58%)",
          }}
        />
        {/* Subtle depth toward the base */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 100%)",
          }}
        />
        {/* Brand "O" ring with a center pulse dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 108,
            height: 108,
            borderRadius: 108,
            border: "18px solid #ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 24,
              height: 24,
              borderRadius: 24,
              background: "#ffffff",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
