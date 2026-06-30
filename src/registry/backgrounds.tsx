import { AuroraBackground } from "@/components/backgrounds/aurora-background";
import { DotMatrix } from "@/components/backgrounds/dot-matrix";
import { FlowGrid } from "@/components/backgrounds/flow-grid";
import { GradientMesh } from "@/components/backgrounds/gradient-mesh";
import { LightBeams } from "@/components/backgrounds/light-beams";
import { Meteors } from "@/components/backgrounds/meteors";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { Plasma } from "@/components/backgrounds/plasma";
import { PulseRings } from "@/components/backgrounds/pulse-rings";
import { Starfield } from "@/components/backgrounds/starfield";
import { Waves } from "@/components/backgrounds/waves";
import { FlowingLines } from "@/components/backgrounds/flowing-lines";
import { SpotlightCursor } from "@/components/backgrounds/spotlight-cursor";
import { MatrixRain } from "@/components/backgrounds/matrix-rain";
import { Ripple } from "@/components/backgrounds/ripple";
import type { Category } from "@/registry/types";

export const backgrounds: Category = {
  id: "backgrounds",
  label: "Backgrounds",
  blurb:
    "Ambient, animated canvases to sit behind your content. GPU-friendly and they pause when off-screen.",
  items: [
    {
      id: "aurora-background",
      name: "Aurora",
      description: "Soft gradient halos that drift like the northern lights.",
      sourcePath: "components/backgrounds/aurora-background.tsx",
      tags: ["CSS", "ambient"],
      bleed: true,
      preview: <AuroraBackground className="h-full w-full" />,
    },
    {
      id: "gradient-mesh",
      name: "Gradient Mesh",
      description: "A panning multi-point color mesh finished with fine grain.",
      sourcePath: "components/backgrounds/gradient-mesh.tsx",
      tags: ["CSS", "grain"],
      bleed: true,
      preview: <GradientMesh className="h-full w-full" />,
    },
    {
      id: "particle-field",
      name: "Particle Field",
      description: "Drifting particles that link to neighbors and the cursor.",
      sourcePath: "components/backgrounds/particle-field.tsx",
      tags: ["canvas", "interactive"],
      bleed: true,
      preview: <ParticleField className="h-full w-full" />,
    },
    {
      id: "dot-matrix",
      name: "Dot Matrix",
      description: "A grid of dots that swell and brighten near the pointer.",
      sourcePath: "components/backgrounds/dot-matrix.tsx",
      tags: ["canvas", "interactive"],
      bleed: true,
      preview: <DotMatrix className="h-full w-full" />,
    },
    {
      id: "starfield",
      name: "Starfield",
      description: "Twinkling stars drifting with subtle cursor parallax.",
      sourcePath: "components/backgrounds/starfield.tsx",
      tags: ["canvas", "parallax"],
      bleed: true,
      preview: <Starfield className="h-full w-full" />,
    },
    {
      id: "waves",
      name: "Waves",
      description: "Layered sine waves scrolling across the lower edge.",
      sourcePath: "components/backgrounds/waves.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Waves className="h-full w-full" />,
    },
    {
      id: "meteors",
      name: "Meteors",
      description: "Glowing meteors streaking diagonally on staggered timers.",
      sourcePath: "components/backgrounds/meteors.tsx",
      tags: ["CSS"],
      bleed: true,
      preview: <Meteors className="h-full w-full" />,
    },
    {
      id: "plasma",
      name: "Plasma",
      description: "Vivid blurred color fields panning while the hue rotates.",
      sourcePath: "components/backgrounds/plasma.tsx",
      tags: ["CSS"],
      bleed: true,
      preview: <Plasma className="h-full w-full" />,
    },
    {
      id: "flow-grid",
      name: "Flow Grid",
      description: "A tilted perspective grid scrolling toward the horizon.",
      sourcePath: "components/backgrounds/flow-grid.tsx",
      tags: ["CSS", "3D"],
      bleed: true,
      preview: <FlowGrid className="h-full w-full" />,
    },
    {
      id: "light-beams",
      name: "Light Beams",
      description: "Vertical shafts of light, each breathing on its own cadence.",
      sourcePath: "components/backgrounds/light-beams.tsx",
      tags: ["CSS"],
      bleed: true,
      preview: <LightBeams className="h-full w-full" />,
    },
    {
      id: "pulse-rings",
      name: "Pulse Rings",
      description: "Concentric rings expanding outward like sonar.",
      sourcePath: "components/backgrounds/pulse-rings.tsx",
      tags: ["CSS"],
      bleed: true,
      preview: <PulseRings className="h-full w-full" />,
    },
    {
      id: "flowing-lines",
      name: "Flowing Lines",
      description: "Silk-like lines waving with layered motion and cursor pull.",
      sourcePath: "components/backgrounds/flowing-lines.tsx",
      tags: ["canvas", "interactive"],
      bleed: true,
      preview: <FlowingLines className="h-full w-full" />,
    },
    {
      id: "spotlight-cursor",
      name: "Spotlight Cursor",
      description: "A hidden dot grid revealed only inside a cursor spotlight.",
      sourcePath: "components/backgrounds/spotlight-cursor.tsx",
      tags: ["pointer", "mask"],
      bleed: true,
      preview: <SpotlightCursor className="h-full w-full" />,
    },
    {
      id: "ripple",
      name: "Ripple",
      description: "Click anywhere to emit an expanding concentric ring.",
      sourcePath: "components/backgrounds/ripple.tsx",
      tags: ["pointer", "interactive"],
      bleed: true,
      preview: <Ripple className="h-full w-full" />,
    },
    {
      id: "matrix-rain",
      name: "Matrix Rain",
      description: "Columns of glyphs falling with glowing fading trails.",
      sourcePath: "components/backgrounds/matrix-rain.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <MatrixRain className="h-full w-full" />,
    },
  ],
};
