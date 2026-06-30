import { cn } from "@/lib/utils";

export interface AvatarStackProps {
  names: string[];
  /** Max avatars before collapsing into a +N chip. */
  max?: number;
  className?: string;
}

const GRADIENTS = [
  "from-brand to-brand-2",
  "from-brand-2 to-brand-3",
  "from-brand-3 to-brand",
  "from-indigo-500 to-brand",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * AvatarStack — overlapping avatar bubbles (colored initials) that fan apart
 * slightly on hover, with a +N chip when the list overflows.
 */
export function AvatarStack({ names, max = 4, className }: AvatarStackProps) {
  const shown = names.slice(0, max);
  const overflow = names.length - shown.length;

  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((name, i) => (
        <span
          key={i}
          title={name}
          className={cn(
            "grid size-10 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ring-2 ring-background transition-transform hover:-translate-y-1",
            GRADIENTS[i % GRADIENTS.length],
            i > 0 && "-ml-3",
          )}
        >
          {initials(name)}
        </span>
      ))}
      {overflow > 0 && (
        <span className="-ml-3 grid size-10 place-items-center rounded-full bg-surface text-sm font-semibold text-muted ring-2 ring-background">
          +{overflow}
        </span>
      )}
    </div>
  );
}
