import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  role: string;
}

export interface TeamGridProps {
  heading?: string;
  subheading?: string;
  members?: TeamMember[];
  className?: string;
}

const GRADIENTS = [
  "from-brand to-brand-2",
  "from-brand-2 to-brand-3",
  "from-brand-3 to-brand",
  "from-indigo-500 to-brand",
  "from-brand to-brand-3",
  "from-brand-2 to-indigo-500",
];

const DEFAULT_MEMBERS: TeamMember[] = [
  { name: "Mara Vance", role: "Founder & CEO" },
  { name: "Devon Park", role: "Head of Design" },
  { name: "Iris Cho", role: "Lead Engineer" },
  { name: "Leo Mendez", role: "Product" },
  { name: "Sana Rao", role: "Developer Advocate" },
  { name: "Tom Reyes", role: "Motion Designer" },
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
 * TeamGrid — a responsive grid of team member cards, each with a gradient
 * initial avatar, name, and role.
 */
export function TeamGrid({
  heading = "Meet the team",
  subheading = "The people building ONONC.",
  members = DEFAULT_MEMBERS,
  className,
}: TeamGridProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-muted">{subheading}</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {members.map((member, i) => (
          <div
            key={member.name}
            className="rounded-2xl border border-border bg-surface p-5 text-center transition-colors hover:border-border-strong"
          >
            <span
              aria-hidden
              className={cn(
                "mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br text-xl font-semibold text-white",
                GRADIENTS[i % GRADIENTS.length],
              )}
            >
              {initials(member.name)}
            </span>
            <h3 className="mt-3 font-semibold">{member.name}</h3>
            <p className="text-sm text-muted">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
