import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export interface LogoCloudProps {
  heading?: string;
  logos?: string[];
  className?: string;
}

const DEFAULT_LOGOS = [
  "Nebula",
  "Vertex",
  "Quanta",
  "Lumina",
  "Horizon",
  "Apex",
  "Drift",
  "Monolith",
];

/**
 * LogoCloud — a quiet marquee of customer wordmarks beneath a label. Uses
 * stylized text marks (no third-party brand assets).
 */
export function LogoCloud({
  heading = "Trusted by fast-moving teams",
  logos = DEFAULT_LOGOS,
  className,
}: LogoCloudProps) {
  return (
    <section className={cn("w-full", className)}>
      <p className="text-center text-sm text-muted">{heading}</p>
      <div className="mt-6">
        <Marquee duration={26}>
          {logos.map((logo) => (
            <span
              key={logo}
              className="mx-8 text-xl font-semibold tracking-tight text-muted/70"
            >
              {logo}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
