import { BlurInText } from "@/components/text/blur-in-text";
import { CountUp } from "@/components/text/count-up";
import { GlitchText } from "@/components/text/glitch-text";
import { GradientText } from "@/components/text/gradient-text";
import { HighlightText } from "@/components/text/highlight-text";
import { RotatingText } from "@/components/text/rotating-text";
import { ScrambleText } from "@/components/text/scramble-text";
import { ShinyText } from "@/components/text/shiny-text";
import { SplitReveal } from "@/components/text/split-reveal";
import { Typewriter } from "@/components/text/typewriter";
import { WavyText } from "@/components/text/wavy-text";
import { NumberTicker } from "@/components/text/number-ticker";
import { ScrollReveal } from "@/components/text/scroll-reveal";
import { FlipText } from "@/components/text/flip-text";
import { GradientUnderline } from "@/components/text/gradient-underline";
import { LettersPullUp } from "@/components/text/letters-pull-up";
import { TextReveal } from "@/components/text/text-reveal";
import { DecryptText } from "@/components/text/decrypt-text";
import { LineReveal } from "@/components/text/line-reveal";
import { TrackingIn } from "@/components/text/tracking-in";
import { FocusText } from "@/components/text/focus-text";
import { TextPressure } from "@/components/text/text-pressure";
import { UnderlineDraw } from "@/components/text/underline-draw";
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
  ],
};
