import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FAQBlockProps {
  heading?: string;
  items?: AccordionItem[];
  className?: string;
}

const DEFAULT_ITEMS: AccordionItem[] = [
  {
    title: "Is ONONC free to use?",
    content:
      "Yes — copy any component into your project and own it. There is no runtime dependency on this library.",
  },
  {
    title: "Does it work with my framework?",
    content:
      "The components are plain React + Tailwind. They drop into any React 18/19 app; the showcase ships on Next.js.",
  },
  {
    title: "How is accessibility handled?",
    content:
      "Interactive components ship keyboard support and ARIA roles, and every animation collapses under prefers-reduced-motion.",
  },
  {
    title: "Can I theme it?",
    content:
      "Everything reads from CSS variables, so you can restyle the whole kit by editing the design tokens.",
  },
];

/**
 * FAQBlock — a centered frequently-asked-questions section built on the
 * accessible Accordion.
 */
export function FAQBlock({
  heading = "Frequently asked questions",
  items = DEFAULT_ITEMS,
  className,
}: FAQBlockProps) {
  return (
    <section className={cn("mx-auto max-w-2xl", className)}>
      <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <div className="mt-8">
        <Accordion items={items} defaultIndex={0} />
      </div>
    </section>
  );
}
