import { BlurInText } from "@/components/text/blur-in-text";
import { BreathingText } from "@/components/text/breathing-text";
import { ClipDrawText } from "@/components/text/clip-draw-text";
import { ColorCycleText } from "@/components/text/color-cycle-text";
import { CountUp } from "@/components/text/count-up";
import { DigiClockText } from "@/components/text/digi-clock-text";
import { DualToneText } from "@/components/text/dual-tone-text";
import { ElasticText } from "@/components/text/elastic-text";
import { ExpandText } from "@/components/text/expand-text";
import { FireText } from "@/components/text/fire-text";
import { FlickerInText } from "@/components/text/flicker-in-text";
import { FlipText } from "@/components/text/flip-text";
import { GhostText } from "@/components/text/ghost-text";
import { GlitchText } from "@/components/text/glitch-text";
import { GlowPulseText } from "@/components/text/glow-pulse-text";
import { GradientText } from "@/components/text/gradient-text";
import { GradientUnderline } from "@/components/text/gradient-underline";
import { GravityText } from "@/components/text/gravity-text";
import { HighlightText } from "@/components/text/highlight-text";
import { HolographicText } from "@/components/text/holographic-text";
import { KineticReveal } from "@/components/text/kinetic-reveal";
import { LettersPullUp } from "@/components/text/letters-pull-up";
import { LineReveal } from "@/components/text/line-reveal";
import { MagneticText } from "@/components/text/magnetic-text";
import { MorphingText } from "@/components/text/morphing-text";
import { NeonText } from "@/components/text/neon-text";
import { NumberTicker } from "@/components/text/number-ticker";
import { PerspectiveText } from "@/components/text/perspective-text";
import { PulseWaveText } from "@/components/text/pulse-wave-text";
import { RevolveText } from "@/components/text/revolve-text";
import { RippleText } from "@/components/text/ripple-text";
import { RisingText } from "@/components/text/rising-text";
import { RotatingText } from "@/components/text/rotating-text";
import { ScatterText } from "@/components/text/scatter-text";
import { ScrambleText } from "@/components/text/scramble-text";
import { ShadowText } from "@/components/text/shadow-text";
import { ShakeText } from "@/components/text/shake-text";
import { ShatterText } from "@/components/text/shatter-text";
import { ShinyText } from "@/components/text/shiny-text";
import { SplitColorText } from "@/components/text/split-color-text";
import { SplitFlap } from "@/components/text/split-flap";
import { SplitReveal } from "@/components/text/split-reveal";
import { StaggeredFade } from "@/components/text/staggered-fade";
import { StripedText } from "@/components/text/striped-text";
import { SwapCascade } from "@/components/text/swap-cascade";
import { TextPressure } from "@/components/text/text-pressure";
import { TextReveal } from "@/components/text/text-reveal";
import { TickerText } from "@/components/text/ticker-text";
import { TrackingIn } from "@/components/text/tracking-in";
import { TwinkleText } from "@/components/text/twinkle-text";
import { Typewriter } from "@/components/text/typewriter";
import { UnderlineDraw } from "@/components/text/underline-draw";
import { WarpInText } from "@/components/text/warp-in-text";
import { WavyText } from "@/components/text/wavy-text";
import { ZoomBlurText } from "@/components/text/zoom-blur-text";
import { DecryptText } from "@/components/text/decrypt-text";
import { FocusText } from "@/components/text/focus-text";
import { ScrollReveal } from "@/components/text/scroll-reveal";
import type { Category } from "@/registry/types";

const HEADING = "px-6 text-center text-3xl font-semibold sm:text-4xl";

export const text: Category = {
  id: "text",
  label: "Text Animations",
  blurb:
    "Typographic effects that draw the eye — reveals, gradients, decoding, and counters. All stay screen-reader friendly.",
  items: [
    {
      id: "gradient-text",
      name: "Gradient Text",
      description: "A living gradient that pans across the letters.",
      sourcePath: "components/text/gradient-text.tsx",
      tags: ["CSS"],
      preview: <GradientText className={HEADING}>Gradient in motion</GradientText>,
    },
    {
      id: "shiny-text",
      name: "Shiny Text",
      description: "A glare that sweeps across muted text on a loop.",
      sourcePath: "components/text/shiny-text.tsx",
      tags: ["CSS"],
      preview: <ShinyText className={HEADING}>Polished &amp; shiny</ShinyText>,
    },
    {
      id: "split-reveal",
      name: "Split Reveal",
      description: "Words slide up from behind a mask, staggered, on view.",
      sourcePath: "components/text/split-reveal.tsx",
      tags: ["motion", "scroll"],
      preview: <SplitReveal text="Reveal word by word" className={HEADING} />,
    },
    {
      id: "blur-in-text",
      name: "Blur In",
      description: "Words resolve from a soft blur as they fade in.",
      sourcePath: "components/text/blur-in-text.tsx",
      tags: ["motion", "scroll"],
      preview: <BlurInText text="Focus, word by word" className={HEADING} />,
    },
    {
      id: "typewriter",
      name: "Typewriter",
      description: "Types and deletes through a rotating list of phrases.",
      sourcePath: "components/text/typewriter.tsx",
      tags: ["loop"],
      preview: (
        <div className="px-6 text-center text-2xl font-semibold sm:text-3xl">
          I build{" "}
          <Typewriter
            words={["interfaces", "interactions", "experiences"]}
            className="text-brand-ink"
          />
        </div>
      ),
    },
    {
      id: "rotating-text",
      name: "Rotating Text",
      description: "Swaps through words in a vertical slot.",
      sourcePath: "components/text/rotating-text.tsx",
      tags: ["motion", "loop"],
      preview: (
        <div className="px-6 text-center text-2xl font-semibold sm:text-3xl">
          Made for{" "}
          <RotatingText
            words={["designers", "developers", "founders"]}
            className="text-brand-ink"
          />
        </div>
      ),
    },
    {
      id: "scramble-text",
      name: "Scramble Text",
      description: "Glyphs flicker and lock into the final string.",
      sourcePath: "components/text/scramble-text.tsx",
      tags: ["hover"],
      preview: (
        <ScrambleText
          text="DECODE / ON / HOVER"
          trigger="hover"
          className="cursor-default px-6 text-center font-mono text-2xl font-semibold sm:text-3xl"
        />
      ),
    },
    {
      id: "glitch-text",
      name: "Glitch Text",
      description: "Two color channels jitter and clip for a CRT glitch.",
      sourcePath: "components/text/glitch-text.tsx",
      tags: ["CSS"],
      preview: <GlitchText text="GLITCH" className="px-6 text-center text-4xl sm:text-5xl" />,
    },
    {
      id: "wavy-text",
      name: "Wavy Text",
      description: "Each letter rides a continuous sine wave.",
      sourcePath: "components/text/wavy-text.tsx",
      tags: ["CSS"],
      preview: <WavyText text="riding the wave" className={HEADING} />,
    },
    {
      id: "highlight-text",
      name: "Highlight Text",
      description: "A marker stroke sweeps in behind the text on view.",
      sourcePath: "components/text/highlight-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <div className={HEADING}>
          Notice the <HighlightText>highlight</HighlightText>
        </div>
      ),
    },
    {
      id: "count-up",
      name: "Count Up",
      description: "Eases a number to its target the first time it's seen.",
      sourcePath: "components/text/count-up.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <CountUp to={14820} prefix="$" className="px-6 text-center text-4xl font-semibold sm:text-5xl" />
      ),
    },
    {
      id: "number-ticker",
      name: "Number Ticker",
      description: "Odometer digits that roll to the target on view.",
      sourcePath: "components/text/number-ticker.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <NumberTicker value={102938} className="px-6 text-center text-4xl font-semibold sm:text-5xl" />
      ),
    },
    {
      id: "scroll-reveal",
      name: "Scroll Reveal",
      description: "Words light up one by one as the line scrolls through view.",
      sourcePath: "components/text/scroll-reveal.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <ScrollReveal
          text="Each word lights up as you scroll."
          className="px-6 text-center"
        />
      ),
    },
    {
      id: "flip-text",
      name: "Flip Text",
      description: "Each character flips up into place on view.",
      sourcePath: "components/text/flip-text.tsx",
      tags: ["motion", "3D"],
      preview: <FlipText text="Flip into view" className={HEADING} />,
    },
    {
      id: "gradient-underline",
      name: "Gradient Underline",
      description: "A gradient underline that grows in on hover and focus.",
      sourcePath: "components/text/gradient-underline.tsx",
      tags: ["CSS", "link"],
      preview: (
        <GradientUnderline href="#" className="text-2xl sm:text-3xl">
          Hover this link
        </GradientUnderline>
      ),
    },
    {
      id: "letters-pull-up",
      name: "Letters Pull-Up",
      description: "Each letter springs up and fades in, staggered, on view.",
      sourcePath: "components/text/letters-pull-up.tsx",
      tags: ["motion", "scroll"],
      preview: <LettersPullUp text="Letter by letter" className={HEADING} />,
    },
    {
      id: "text-reveal",
      name: "Text Reveal",
      description: "A clip-path mask wipes the text into view.",
      sourcePath: "components/text/text-reveal.tsx",
      tags: ["motion", "scroll"],
      preview: <TextReveal className={HEADING}>Wiped into view</TextReveal>,
    },
    {
      id: "decrypt-text",
      name: "Decrypt Text",
      description: "Characters resolve out of random glyphs in scattered order.",
      sourcePath: "components/text/decrypt-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <DecryptText
          text="DECRYPTING SIGNAL"
          className="px-6 text-center font-mono text-2xl font-semibold sm:text-3xl"
        />
      ),
    },
    {
      id: "line-reveal",
      name: "Line Reveal",
      description: "Each line slides up from behind a mask, in sequence.",
      sourcePath: "components/text/line-reveal.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <LineReveal
          lines={["Designed in lines,", "revealed in sequence."]}
          className={HEADING}
        />
      ),
    },
    {
      id: "tracking-in",
      name: "Tracking In",
      description: "Letter-spacing expands out of a blur as the text fades in.",
      sourcePath: "components/text/tracking-in.tsx",
      tags: ["motion", "scroll"],
      preview: <TrackingIn className={HEADING}>Tracking in</TrackingIn>,
    },
    {
      id: "focus-text",
      name: "Focus Text",
      description: "Focus rolls across the words, blurring all but the active one.",
      sourcePath: "components/text/focus-text.tsx",
      tags: ["motion", "loop"],
      preview: (
        <FocusText
          words={["Design", "Build", "Ship", "Repeat"]}
          className={HEADING}
        />
      ),
    },
    {
      id: "text-pressure",
      name: "Text Pressure",
      description: "Letters swell and thicken toward the cursor.",
      sourcePath: "components/text/text-pressure.tsx",
      tags: ["pointer"],
      preview: (
        <TextPressure
          text="Hover the pressure"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },
    {
      id: "underline-draw",
      name: "Underline Draw",
      description: "A hand-drawn gradient underline draws in beneath the text.",
      sourcePath: "components/text/underline-draw.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <div className={HEADING}>
          The <UnderlineDraw>important</UnderlineDraw> part
        </div>
      ),
    },

    // ── New components ──────────────────────────────────────────────

    // --- CSS-based ---
    {
      id: "neon-text",
      name: "Neon Text",
      description: "Glowing sign text with a subtle flicker and deep blur halo.",
      sourcePath: "components/text/neon-text.tsx",
      tags: ["CSS"],
      preview: (
        <NeonText
          text="NEON"
          className="px-6 text-center text-4xl font-bold sm:text-5xl"
        />
      ),
    },
    {
      id: "holographic-text",
      name: "Holographic Text",
      description: "Iridescent text whose colors shift through the spectrum continuously.",
      sourcePath: "components/text/holographic-text.tsx",
      tags: ["CSS"],
      preview: (
        <HolographicText className={`${HEADING} text-4xl sm:text-5xl`}>
          HOLOGRAM
        </HolographicText>
      ),
    },
    {
      id: "shadow-text",
      name: "Shadow Text",
      description: "Multi-layered colored shadows that pulse and create dimensional depth.",
      sourcePath: "components/text/shadow-text.tsx",
      tags: ["CSS"],
      preview: (
        <ShadowText className={`${HEADING} text-4xl sm:text-5xl`}>
          SHADOW
        </ShadowText>
      ),
    },
    {
      id: "breathing-text",
      name: "Breathing Text",
      description: "Text gently expands and contracts like a breathing rhythm.",
      sourcePath: "components/text/breathing-text.tsx",
      tags: ["CSS"],
      preview: (
        <BreathingText className={`${HEADING} text-4xl sm:text-5xl`}>
          Breathe
        </BreathingText>
      ),
    },
    {
      id: "ghost-text",
      name: "Ghost Text",
      description: "Ethereal text that fades in and out like an apparition, with a subtle drift.",
      sourcePath: "components/text/ghost-text.tsx",
      tags: ["CSS"],
      preview: (
        <GhostText
          text="Ghostly presence"
          className={`${HEADING} text-3xl sm:text-4xl`}
        />
      ),
    },
    {
      id: "glow-pulse-text",
      name: "Glow Pulse Text",
      description: "Expanding glow rings pulse outward from the text like a heartbeat.",
      sourcePath: "components/text/glow-pulse-text.tsx",
      tags: ["CSS"],
      preview: (
        <GlowPulseText className={`${HEADING} text-4xl sm:text-5xl`}>
          Pulse
        </GlowPulseText>
      ),
    },
    {
      id: "ticker-text",
      name: "Ticker Text",
      description: "News-ticker style scrolling text that loops seamlessly.",
      sourcePath: "components/text/ticker-text.tsx",
      tags: ["CSS"],
      preview: (
        <TickerText
          className="text-2xl font-semibold sm:text-3xl"
          speed={18}
        >
          Breaking • UPDATES • rolling • continuously •
        </TickerText>
      ),
    },
    {
      id: "striped-text",
      name: "Striped Text",
      description: "Animated diagonal stripes flow through the letters.",
      sourcePath: "components/text/striped-text.tsx",
      tags: ["CSS"],
      preview: (
        <StripedText className={`${HEADING} text-4xl sm:text-5xl`}>
          Stripes
        </StripedText>
      ),
    },

    // --- Motion / scroll-reveal ---
    {
      id: "staggered-fade",
      name: "Staggered Fade",
      description: "Each character fades, slides, and rotates into place one by one.",
      sourcePath: "components/text/staggered-fade.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <StaggeredFade
          text="Staggered and rotated"
          className={HEADING}
        />
      ),
    },
    {
      id: "rising-text",
      name: "Rising Text",
      description: "Each character rises up from below with a spring settle.",
      sourcePath: "components/text/rising-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <RisingText
          text="Rise into view"
          className={HEADING}
        />
      ),
    },
    {
      id: "kinetic-reveal",
      name: "Kinetic Reveal",
      description: "Words burst in with scale, rotation, and blur in a springy sequence.",
      sourcePath: "components/text/kinetic-reveal.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <KineticReveal
          text="Energy in motion"
          className={HEADING}
        />
      ),
    },
    {
      id: "fire-text",
      name: "Fire Text",
      description: "Letters flicker with flame-like scale, opacity, and blur in a continuous loop.",
      sourcePath: "components/text/fire-text.tsx",
      tags: ["motion", "loop"],
      preview: (
        <FireText
          text="Flickering flame"
          className={`${HEADING} text-3xl sm:text-4xl`}
        />
      ),
    },
    {
      id: "clip-draw-text",
      name: "Clip-Draw Text",
      description: "SVG stroke outline draws in character-by-character, then fills.",
      sourcePath: "components/text/clip-draw-text.tsx",
      tags: ["motion", "SVG"],
      preview: (
        <ClipDrawText
          text="Drawn outline"
          className={`${HEADING} text-4xl sm:text-5xl`}
        />
      ),
    },

    // --- Looping & typing ---
    {
      id: "morphing-text",
      name: "Morphing Text",
      description: "Each word scales down while the next scales up in a smooth morph.",
      sourcePath: "components/text/morphing-text.tsx",
      tags: ["motion", "loop"],
      preview: (
        <div className="px-6 text-center text-2xl font-semibold sm:text-3xl">
          It&rsquo;s{" "}
          <MorphingText
            words={["fluid", "smooth", "elegant"]}
            className="text-brand-ink"
          />
        </div>
      ),
    },
    {
      id: "split-flap",
      name: "Split Flap",
      description: "Retro split-flap display. Each word flips down like a departure board.",
      sourcePath: "components/text/split-flap.tsx",
      tags: ["motion", "loop"],
      preview: (
        <div className="px-6 text-center text-2xl font-semibold sm:text-3xl font-mono">
          <SplitFlap
            words={["DEPARTING", "ARRIVING", "BOARDING"]}
            className="text-brand-ink"
          />
        </div>
      ),
    },

    // --- Pointer-reactive ---
    {
      id: "scatter-text",
      name: "Scatter Text",
      description: "Characters fly apart and reassemble on hover like scattered cards.",
      sourcePath: "components/text/scatter-text.tsx",
      tags: ["motion", "hover"],
      preview: (
        <ScatterText
          text="Hover to scatter"
          className="px-6 text-center text-2xl font-semibold sm:text-3xl"
        />
      ),
    },
    {
      id: "perspective-text",
      name: "Perspective Text",
      description: "Text tilts in 3D towards the mouse with a parallax glow.",
      sourcePath: "components/text/perspective-text.tsx",
      tags: ["pointer"],
      preview: (
        <PerspectiveText
          text="Tilt toward cursor"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },
    {
      id: "elastic-text",
      name: "Elastic Text",
      description: "Letters stretch toward the pointer like a rubber band.",
      sourcePath: "components/text/elastic-text.tsx",
      tags: ["pointer"],
      preview: (
        <ElasticText
          text="Stretch me"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },
    {
      id: "ripple-text",
      name: "Ripple Text",
      description: "Letters undulate away from the cursor like ripples on water.",
      sourcePath: "components/text/ripple-text.tsx",
      tags: ["pointer"],
      preview: (
        <RippleText
          text="Drop a ripple"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },

    // ── Second batch ─────────────────────────────────────────────────

    // --- CSS-based ---
    {
      id: "twinkle-text",
      name: "Twinkle Text",
      description: "Each character twinkles with staggered random delays like starlight.",
      sourcePath: "components/text/twinkle-text.tsx",
      tags: ["CSS"],
      preview: (
        <TwinkleText
          text="Twinkle little star"
          className={HEADING}
        />
      ),
    },
    {
      id: "pulse-wave-text",
      name: "Pulse Wave Text",
      description: "A brightness wave sweeps left to right through the text in a loop.",
      sourcePath: "components/text/pulse-wave-text.tsx",
      tags: ["CSS"],
      preview: (
        <PulseWaveText className={`${HEADING} text-4xl sm:text-5xl`}>
          Wave passing through
        </PulseWaveText>
      ),
    },
    {
      id: "color-cycle-text",
      name: "Color Cycle Text",
      description: "Each character independently cycles through the brand palette.",
      sourcePath: "components/text/color-cycle-text.tsx",
      tags: ["CSS"],
      preview: (
        <ColorCycleText
          text="Color cycling"
          className={HEADING}
        />
      ),
    },
    {
      id: "flicker-in-text",
      name: "Flicker In Text",
      description: "Rapid stroboscopic on/off flicker before text stabilizes, like dying neon.",
      sourcePath: "components/text/flicker-in-text.tsx",
      tags: ["CSS"],
      preview: (
        <FlickerInText
          text="Flickering in..."
          className={HEADING}
        />
      ),
    },

    // --- Motion / scroll-reveal ---
    {
      id: "revolve-text",
      name: "Revolve Text",
      description: "Each character does a 360 spin on its own axis, staggered on view.",
      sourcePath: "components/text/revolve-text.tsx",
      tags: ["motion", "3D"],
      preview: (
        <RevolveText
          text="Spin into place"
          className={HEADING}
        />
      ),
    },
    {
      id: "gravity-text",
      name: "Gravity Text",
      description: "Letters drop in from above with heavy bounce physics and wobble settle.",
      sourcePath: "components/text/gravity-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <GravityText
          text="Heavy drop"
          className={HEADING}
        />
      ),
    },
    {
      id: "zoom-blur-text",
      name: "Zoom Blur Text",
      description: "Characters zoom in from a huge distant scale with extreme motion blur.",
      sourcePath: "components/text/zoom-blur-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <ZoomBlurText
          text="Zooming from afar"
          className={HEADING}
        />
      ),
    },
    {
      id: "warp-in-text",
      name: "Warp In Text",
      description: "Characters warp in from a compressed, skewed state with an energetic snap.",
      sourcePath: "components/text/warp-in-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <WarpInText
          text="Warp distortion"
          className={HEADING}
        />
      ),
    },
    {
      id: "expand-text",
      name: "Expand Text",
      description: "Text expands from compressed letter-spacing into natural breathing room.",
      sourcePath: "components/text/expand-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <ExpandText
          text="Unfolding wide open"
          className={`${HEADING} text-2xl sm:text-3xl`}
        />
      ),
    },
    {
      id: "dual-tone-text",
      name: "Dual Tone Text",
      description: "Two text layers slide apart vertically as you scroll.",
      sourcePath: "components/text/dual-tone-text.tsx",
      tags: ["motion", "scroll"],
      preview: (
        <DualToneText
          topText="Above the fold"
          bottomText="Below the surface"
          className={HEADING}
        />
      ),
    },

    // --- Looping & scrambling ---
    {
      id: "swap-cascade",
      name: "Swap Cascade",
      description: "Random glyphs cascade left to right, locking into the target text.",
      sourcePath: "components/text/swap-cascade.tsx",
      tags: ["motion", "loop"],
      preview: (
        <SwapCascade
          text="Decoding signal..."
          className="px-6 text-center font-mono text-2xl font-semibold sm:text-3xl"
        />
      ),
    },
    {
      id: "digi-clock-text",
      name: "Digi-Clock Text",
      description: "Characters flip through glyphs like a digital clock, then resolve.",
      sourcePath: "components/text/digi-clock-text.tsx",
      tags: ["motion"],
      preview: (
        <DigiClockText
          text="ARRIVING"
          className="px-6 text-center font-mono text-2xl font-semibold sm:text-3xl"
        />
      ),
    },

    // --- Pointer-reactive ---
    {
      id: "shake-text",
      name: "Shake Text",
      description: "Text vibrates with random micro-displacements on pointer move.",
      sourcePath: "components/text/shake-text.tsx",
      tags: ["pointer"],
      preview: (
        <ShakeText
          text="Make me shake"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },
    {
      id: "shatter-text",
      name: "Shatter Text",
      description: "Characters shatter outward and reform on hover, like breaking glass.",
      sourcePath: "components/text/shatter-text.tsx",
      tags: ["motion", "hover"],
      preview: (
        <ShatterText
          text="Hover to shatter"
          className="px-6 text-center text-2xl font-semibold sm:text-3xl"
        />
      ),
    },
    {
      id: "magnetic-text",
      name: "Magnetic Text",
      description: "Each letter is pulled toward the cursor like iron filings to a magnet.",
      sourcePath: "components/text/magnetic-text.tsx",
      tags: ["pointer"],
      preview: (
        <MagneticText
          text="Pull me closer"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },
    {
      id: "split-color-text",
      name: "Split Color Text",
      description: "Text is split horizontally at the cursor: top half in one color, bottom in another.",
      sourcePath: "components/text/split-color-text.tsx",
      tags: ["pointer"],
      preview: (
        <SplitColorText
          text="Split at cursor"
          className="px-6 text-center text-3xl font-bold sm:text-4xl"
        />
      ),
    },
  ],
};
