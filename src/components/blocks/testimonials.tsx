import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  handle: string;
}

export interface TestimonialsProps {
  testimonials?: Testimonial[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: "This shaved a week off our launch. The motion just works.", name: "Mara Vance", handle: "@maradraws" },
  { quote: "Finally a component kit that doesn't feel like every other site.", name: "Devon Park", handle: "@devbuilds" },
  { quote: "The spotlight and tilt cards are stupidly satisfying.", name: "Iris Cho", handle: "@irisux" },
  { quote: "Dropped the hero in and our bounce rate fell. Real.", name: "Leo Mendez", handle: "@leoships" },
  { quote: "Reduced-motion support out of the box — accessibility win.", name: "Sana Rao", handle: "@sana_a11y" },
  { quote: "Performance held up even with three canvases on one page.", name: "Tom Reyes", handle: "@tomperf" },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-3 w-80 shrink-0 rounded-2xl border border-border bg-surface p-6">
      <blockquote className="text-sm leading-relaxed text-foreground/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-semibold text-white"
        >
          {t.name.charAt(0)}
        </span>
        <span className="text-sm">
          <span className="block font-medium">{t.name}</span>
          <span className="block text-muted">{t.handle}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials — two marquee rows scrolling in opposite directions, pausing on
 * hover so quotes stay readable.
 */
export function Testimonials({
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsProps) {
  const mid = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, mid);
  const rowB = testimonials.slice(mid);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Marquee duration={32}>
        {rowA.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </Marquee>
      <Marquee duration={36} reverse>
        {rowB.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </Marquee>
    </div>
  );
}
