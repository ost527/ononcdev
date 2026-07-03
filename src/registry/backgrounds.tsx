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
import { FlowField } from "@/components/backgrounds/flow-field";
import { AuroraRibbons } from "@/components/backgrounds/aurora-ribbons";
import { GridBeams } from "@/components/backgrounds/grid-beams";
import { Vortex } from "@/components/backgrounds/vortex";
import { TopographicLines } from "@/components/backgrounds/topographic-lines";
import { Embers } from "@/components/backgrounds/embers";
import { Snowfall } from "@/components/backgrounds/snowfall";
import { Fireflies } from "@/components/backgrounds/fireflies";
import { Bokeh } from "@/components/backgrounds/bokeh";
import { HexGrid } from "@/components/backgrounds/hex-grid";
import { WarpStars } from "@/components/backgrounds/warp-stars";
import { WaveInterference } from "@/components/backgrounds/wave-interference";
import { Rain } from "@/components/backgrounds/rain";
import { Metaballs } from "@/components/backgrounds/metaballs";
import { OrbitingDots } from "@/components/backgrounds/orbiting-dots";
import { Halftone } from "@/components/backgrounds/halftone";
import { RadarSweep } from "@/components/backgrounds/radar-sweep";
import { DnaHelix } from "@/components/backgrounds/dna-helix";
import { Lightning } from "@/components/backgrounds/lightning";
import { Smoke } from "@/components/backgrounds/smoke";
import { Cells } from "@/components/backgrounds/cells";
import { NeonTunnel } from "@/components/backgrounds/neon-tunnel";
import { Equalizer } from "@/components/backgrounds/equalizer";
import { SpiralGalaxy } from "@/components/backgrounds/spiral-galaxy";
import { Caustics } from "@/components/backgrounds/caustics";
import { MeshWave } from "@/components/backgrounds/mesh-wave";
import { Confetti } from "@/components/backgrounds/confetti";
import { Triangles } from "@/components/backgrounds/triangles";
import { MagneticField } from "@/components/backgrounds/magnetic-field";
import { Sparkles } from "@/components/backgrounds/sparkles";
import { Kaleidoscope } from "@/components/backgrounds/kaleidoscope";
import { TronTrails } from "@/components/backgrounds/tron-trails";
import { Oscilloscope } from "@/components/backgrounds/oscilloscope";
import { Bubbles } from "@/components/backgrounds/bubbles";
import { GodRays } from "@/components/backgrounds/god-rays";
import { Pinwheel } from "@/components/backgrounds/pinwheel";
import { Plexus } from "@/components/backgrounds/plexus";
import { PerlinClouds } from "@/components/backgrounds/perlin-clouds";
import { LiquidBlob } from "@/components/backgrounds/liquid-blob";
import { Scanlines } from "@/components/backgrounds/scanlines";
import { InkDrops } from "@/components/backgrounds/ink-drops";
import { DataStream } from "@/components/backgrounds/data-stream";
import { Fireworks } from "@/components/backgrounds/fireworks";
import { Boids } from "@/components/backgrounds/boids";
import { ClothFlag } from "@/components/backgrounds/cloth-flag";
import { AuroraCurtains } from "@/components/backgrounds/aurora-curtains";
import { VoronoiFill } from "@/components/backgrounds/voronoi-fill";
import { Comets } from "@/components/backgrounds/comets";
import type { Category } from "@/registry/types";

export const backgrounds: Category = {
  id: "backgrounds",
  label: "Backgrounds",
  blurb:
    "Ambient, animated canvases to sit behind your content. GPU-friendly and they pause when off-screen.",
  items: [
    {
      id: "flow-field",
      name: "Flow Field",
      description: "Particles drift along an invisible flow field, leaving glowing trails.",
      sourcePath: "components/backgrounds/flow-field.tsx",
      tags: ["canvas", "flow field", "interactive"],
      bleed: true,
      preview: <FlowField className="h-full w-full" />,
    },
    {
      id: "aurora-ribbons",
      name: "Aurora Ribbons",
      description: "Luminous ribbons of light weave and drift like the aurora.",
      sourcePath: "components/backgrounds/aurora-ribbons.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <AuroraRibbons className="h-full w-full" />,
    },
    {
      id: "vortex",
      name: "Vortex",
      description: "Particles swirl around a drifting center that follows your cursor.",
      sourcePath: "components/backgrounds/vortex.tsx",
      tags: ["canvas", "interactive"],
      bleed: true,
      preview: <Vortex className="h-full w-full" />,
    },
    {
      id: "grid-beams",
      name: "Grid Beams",
      description: "Pulses of light race along the lines of a faint grid.",
      sourcePath: "components/backgrounds/grid-beams.tsx",
      tags: ["canvas", "grid"],
      bleed: true,
      preview: <GridBeams className="h-full w-full" />,
    },
    {
      id: "topographic-lines",
      name: "Topographic Lines",
      description: "Contour lines that morph like a living topographic map.",
      sourcePath: "components/backgrounds/topographic-lines.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <TopographicLines className="h-full w-full" />,
    },
    {
      id: "embers",
      name: "Embers",
      description: "Warm embers rise and flicker out into the dark.",
      sourcePath: "components/backgrounds/embers.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Embers className="h-full w-full" />,
    },
    {
      id: "warp-stars",
      name: "Warp Stars",
      description: "Stars streaking outward from the center like hyperspace.",
      sourcePath: "components/backgrounds/warp-stars.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <WarpStars className="h-full w-full" />,
    },
    {
      id: "wave-interference",
      name: "Wave Interference",
      description: "A dot field rippling from orbiting wave sources.",
      sourcePath: "components/backgrounds/wave-interference.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <WaveInterference className="h-full w-full" />,
    },
    {
      id: "bokeh",
      name: "Bokeh",
      description: "Soft, out-of-focus orbs of colored light drifting by.",
      sourcePath: "components/backgrounds/bokeh.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <Bokeh className="h-full w-full" />,
    },
    {
      id: "fireflies",
      name: "Fireflies",
      description: "Glowing dots that wander and blink in the dark.",
      sourcePath: "components/backgrounds/fireflies.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Fireflies className="h-full w-full" />,
    },
    {
      id: "hex-grid",
      name: "Hex Grid",
      description: "A honeycomb grid that lights up near the cursor.",
      sourcePath: "components/backgrounds/hex-grid.tsx",
      tags: ["canvas", "interactive"],
      bleed: true,
      preview: <HexGrid className="h-full w-full" />,
    },
    {
      id: "snowfall",
      name: "Snowfall",
      description: "Depth-layered snow drifting gently downward.",
      sourcePath: "components/backgrounds/snowfall.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Snowfall className="h-full w-full" />,
    },
    {
      id: "metaballs",
      name: "Metaballs",
      description: "Soft blobs of color drift and merge like a lava lamp.",
      sourcePath: "components/backgrounds/metaballs.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <Metaballs className="h-full w-full" />,
    },
    {
      id: "orbiting-dots",
      name: "Orbiting Dots",
      description: "Concentric rings of dots orbiting a glowing core.",
      sourcePath: "components/backgrounds/orbiting-dots.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <OrbitingDots className="h-full w-full" />,
    },
    {
      id: "dna-helix",
      name: "DNA Helix",
      description: "A rotating double helix of paired strands and rungs.",
      sourcePath: "components/backgrounds/dna-helix.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <DnaHelix className="h-full w-full" />,
    },
    {
      id: "radar-sweep",
      name: "Radar Sweep",
      description: "A rotating sweep lighting up blips over concentric rings.",
      sourcePath: "components/backgrounds/radar-sweep.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <RadarSweep className="h-full w-full" />,
    },
    {
      id: "halftone",
      name: "Halftone",
      description: "A halftone dot grid swelling with a moving wave.",
      sourcePath: "components/backgrounds/halftone.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Halftone className="h-full w-full" />,
    },
    {
      id: "rain",
      name: "Rain",
      description: "Angled rain streaks falling with a sense of depth.",
      sourcePath: "components/backgrounds/rain.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Rain className="h-full w-full" />,
    },
    {
      id: "spiral-galaxy",
      name: "Spiral Galaxy",
      description: "Spiral arms of stars rotating around a glowing core.",
      sourcePath: "components/backgrounds/spiral-galaxy.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <SpiralGalaxy className="h-full w-full" />,
    },
    {
      id: "neon-tunnel",
      name: "Neon Tunnel",
      description: "Concentric neon frames zooming outward like a tunnel.",
      sourcePath: "components/backgrounds/neon-tunnel.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <NeonTunnel className="h-full w-full" />,
    },
    {
      id: "lightning",
      name: "Lightning",
      description: "Branching bolts strike and fade with an electric glow.",
      sourcePath: "components/backgrounds/lightning.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Lightning className="h-full w-full" />,
    },
    {
      id: "cells",
      name: "Cells",
      description: "Glowing Voronoi cell edges shifting as their seeds drift.",
      sourcePath: "components/backgrounds/cells.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Cells className="h-full w-full" />,
    },
    {
      id: "equalizer",
      name: "Equalizer",
      description: "Sine-driven bars rising and falling like a visualizer.",
      sourcePath: "components/backgrounds/equalizer.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Equalizer className="h-full w-full" />,
    },
    {
      id: "smoke",
      name: "Smoke",
      description: "Soft fog drifting upward and slowly dissipating.",
      sourcePath: "components/backgrounds/smoke.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <Smoke className="h-full w-full" />,
    },
    {
      id: "mesh-wave",
      name: "Mesh Wave",
      description: "A tilted wireframe surface undulating in 3D.",
      sourcePath: "components/backgrounds/mesh-wave.tsx",
      tags: ["canvas", "3D"],
      bleed: true,
      preview: <MeshWave className="h-full w-full" />,
    },
    {
      id: "caustics",
      name: "Caustics",
      description: "Rippling webs of light, like sun through water.",
      sourcePath: "components/backgrounds/caustics.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Caustics className="h-full w-full" />,
    },
    {
      id: "magnetic-field",
      name: "Magnetic Field",
      description: "Dipole field lines streaming between two orbiting poles.",
      sourcePath: "components/backgrounds/magnetic-field.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <MagneticField className="h-full w-full" />,
    },
    {
      id: "triangles",
      name: "Triangles",
      description: "A low-poly mesh shimmering with a moving wave.",
      sourcePath: "components/backgrounds/triangles.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Triangles className="h-full w-full" />,
    },
    {
      id: "sparkles",
      name: "Sparkles",
      description: "Twinkling points with a soft cross-flare glint.",
      sourcePath: "components/backgrounds/sparkles.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Sparkles className="h-full w-full" />,
    },
    {
      id: "confetti",
      name: "Confetti",
      description: "Colorful confetti fluttering down.",
      sourcePath: "components/backgrounds/confetti.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Confetti className="h-full w-full" />,
    },
    {
      id: "kaleidoscope",
      name: "Kaleidoscope",
      description: "Orbiting petals mirrored into shifting radial symmetry.",
      sourcePath: "components/backgrounds/kaleidoscope.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Kaleidoscope className="h-full w-full" />,
    },
    {
      id: "tron-trails",
      name: "Tron Trails",
      description: "Heads race a grid, turning at right angles, leaving light trails.",
      sourcePath: "components/backgrounds/tron-trails.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <TronTrails className="h-full w-full" />,
    },
    {
      id: "god-rays",
      name: "God Rays",
      description: "Volumetric light shafts shimmering from a drifting source.",
      sourcePath: "components/backgrounds/god-rays.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <GodRays className="h-full w-full" />,
    },
    {
      id: "oscilloscope",
      name: "Oscilloscope",
      description: "Glowing waveform lines sweeping across a scope grid.",
      sourcePath: "components/backgrounds/oscilloscope.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Oscilloscope className="h-full w-full" />,
    },
    {
      id: "pinwheel",
      name: "Pinwheel",
      description: "Rotating conic color sectors like a spinning pinwheel.",
      sourcePath: "components/backgrounds/pinwheel.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Pinwheel className="h-full w-full" />,
    },
    {
      id: "bubbles",
      name: "Bubbles",
      description: "Wobbling bubbles drifting up with a glassy highlight.",
      sourcePath: "components/backgrounds/bubbles.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Bubbles className="h-full w-full" />,
    },
    {
      id: "plexus",
      name: "Plexus",
      description: "A rotating 3D node network connected by depth-faded lines.",
      sourcePath: "components/backgrounds/plexus.tsx",
      tags: ["canvas", "3D"],
      bleed: true,
      preview: <Plexus className="h-full w-full" />,
    },
    {
      id: "liquid-blob",
      name: "Liquid Blob",
      description: "Organic blobs morphing and merging like liquid.",
      sourcePath: "components/backgrounds/liquid-blob.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <LiquidBlob className="h-full w-full" />,
    },
    {
      id: "perlin-clouds",
      name: "Perlin Clouds",
      description: "Soft fractal clouds drifting and dissolving.",
      sourcePath: "components/backgrounds/perlin-clouds.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <PerlinClouds className="h-full w-full" />,
    },
    {
      id: "ink-drops",
      name: "Ink Drops",
      description: "Ink blots blooming and fading on staggered timers.",
      sourcePath: "components/backgrounds/ink-drops.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <InkDrops className="h-full w-full" />,
    },
    {
      id: "data-stream",
      name: "Data Stream",
      description: "Lanes of bright dashes streaming downward.",
      sourcePath: "components/backgrounds/data-stream.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <DataStream className="h-full w-full" />,
    },
    {
      id: "scanlines",
      name: "Scanlines",
      description: "CRT scanlines with drifting chromatic glitch bands.",
      sourcePath: "components/backgrounds/scanlines.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Scanlines className="h-full w-full" />,
    },
    {
      id: "boids",
      name: "Boids",
      description: "A flocking swarm steering by separation, alignment, and cohesion.",
      sourcePath: "components/backgrounds/boids.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Boids className="h-full w-full" />,
    },
    {
      id: "fireworks",
      name: "Fireworks",
      description: "Rockets burst into showers of falling sparks.",
      sourcePath: "components/backgrounds/fireworks.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Fireworks className="h-full w-full" />,
    },
    {
      id: "comets",
      name: "Comets",
      description: "Comets arc across the sky with glowing curved tails.",
      sourcePath: "components/backgrounds/comets.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <Comets className="h-full w-full" />,
    },
    {
      id: "aurora-curtains",
      name: "Aurora Curtains",
      description: "Vertical curtains of light shimmering like the aurora.",
      sourcePath: "components/backgrounds/aurora-curtains.tsx",
      tags: ["canvas", "ambient"],
      bleed: true,
      preview: <AuroraCurtains className="h-full w-full" />,
    },
    {
      id: "cloth-flag",
      name: "Cloth Flag",
      description: "A flag-like mesh rippling and self-shading in the wind.",
      sourcePath: "components/backgrounds/cloth-flag.tsx",
      tags: ["canvas", "3D"],
      bleed: true,
      preview: <ClothFlag className="h-full w-full" />,
    },
    {
      id: "voronoi-fill",
      name: "Voronoi Fill",
      description: "Filled Voronoi regions drifting like stained glass.",
      sourcePath: "components/backgrounds/voronoi-fill.tsx",
      tags: ["canvas"],
      bleed: true,
      preview: <VoronoiFill className="h-full w-full" />,
    },
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
