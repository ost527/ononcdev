import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

/** Shared 1200x630 social image, rendered to a static PNG at build time. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "ONONC — Original animated component library";

const DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 88px",
          background: "#06070d",
          color: "#e9ebf5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient brand glows */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.45), rgba(139,92,246,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: -180,
            width: 820,
            height: 820,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.34), rgba(34,211,238,0) 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8a91a8",
          }}
        >
          Component Library
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 210,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 1,
              backgroundImage:
                "linear-gradient(100deg, #a78bfa 0%, #22d3ee 52%, #fb7185 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ONONC
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 44,
              fontWeight: 600,
              color: "#e9ebf5",
              maxWidth: 900,
            }}
          >
            Original, motion-first React components for Next.js
          </div>
        </div>

        {/* Footer: categories + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#8a91a8" }}>
            Backgrounds · Text · Components · Blocks
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 30,
              fontWeight: 600,
              color: "#c4b5fd",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
              }}
            />
            {DOMAIN}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
