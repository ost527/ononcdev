import { ArrowUpRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CreativeProject {
  title: string;
  role: string;
  year: string;
  background: string;
  span?: string;
  href?: string;
}

export interface BentoCreativeProps {
  name?: string;
  bio?: string;
  skills?: string[];
  projects?: [CreativeProject, CreativeProject, CreativeProject];
  className?: string;
}

const DEFAULT_PROJECTS: [CreativeProject, CreativeProject, CreativeProject] = [
  {
    title: "Aperture",
    role: "Brand & Web",
    year: "2026",
    background:
      "radial-gradient(at 25% 20%, #a78bfa 0px, transparent 55%), radial-gradient(at 80% 75%, #22d3ee 0px, transparent 55%), linear-gradient(135deg, #2e1065, #0b0d18)",
  },
  {
    title: "Northwind",
    role: "Product Design",
    year: "2025",
    background:
      "radial-gradient(at 22% 78%, #fb7185 0px, transparent 55%), radial-gradient(at 82% 18%, #8b5cf6 0px, transparent 52%), linear-gradient(135deg, #4c0519, #0b0d18)",
  },
  {
    title: "ONONC OS",
    role: "Design System & Motion",
    year: "2026",
    background:
      "radial-gradient(at 18% 30%, #34d399 0px, transparent 52%), radial-gradient(at 85% 70%, #22d3ee 0px, transparent 55%), linear-gradient(135deg, #022c22, #0b0d18)",
    span: "sm:col-span-2",
  },
];

const DEFAULT_SKILLS = [
  "Brand",
  "Web",
  "Product",
  "Motion",
  "3D",
  "Design Systems",
  "Strategy",
];

function ProjectTile({ project }: { project: CreativeProject }) {
  return (
    <a
      href={project.href ?? "#"}
      aria-label={`${project.title} — ${project.role}, ${project.year}`}
      className={cn(
        "group relative block min-h-[12rem] overflow-hidden rounded-2xl border border-border",
        project.span,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ background: project.background }}
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
      />
      <span
        aria-hidden
        className="absolute right-3 top-3 grid size-8 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <ArrowUpRight className="size-4" />
      </span>
      <div className="relative flex h-full flex-col justify-end p-5 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/80">
            {project.role}
          </span>
          <span className="text-[11px] tabular-nums text-white/70">
            {project.year}
          </span>
        </div>
        <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
      </div>
    </a>
  );
}

/**
 * BentoCreative — a portfolio/agency bento. An oversized intro sits beside
 * gradient project tiles (with role and year), a skills cloud, a headline
 * stat, and a contact call-to-action. Server-safe; the only motion is a CSS
 * hover zoom that the global reduced-motion reset neutralizes.
 */
export function BentoCreative({
  name = "Studio ONONC",
  bio = "An independent design & engineering studio crafting interfaces with motion, restraint, and a point of view.",
  skills = DEFAULT_SKILLS,
  projects = DEFAULT_PROJECTS,
  className,
}: BentoCreativeProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem]">
        {/* Intro */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6 sm:col-span-2 lg:row-span-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </span>
          <div className="mt-auto">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {name}
            </h2>
            <p className="mt-3 max-w-md text-pretty text-muted">{bio}</p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink"
            >
              View selected work
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        {/* First two projects */}
        <ProjectTile project={projects[0]} />
        <ProjectTile project={projects[1]} />

        {/* Skills */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-medium">Capabilities</h3>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Stat */}
        <div className="flex min-h-[12rem] flex-col justify-between rounded-2xl border border-border bg-surface p-6">
          <div>
            <div className="text-3xl font-semibold tracking-tight">80+</div>
            <p className="text-sm text-muted">Projects shipped</p>
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tight">12</div>
            <p className="text-sm text-muted">Years of craft</p>
          </div>
        </div>

        {/* Third project (wide) */}
        <ProjectTile project={projects[2]} />

        {/* Contact CTA */}
        <div className="relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand) 40%, transparent), transparent 70%)",
            }}
          />
          <h3 className="relative text-xl font-semibold tracking-tight">
            Have a project in mind?
          </h3>
          <div className="relative flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
            >
              <Mail className="size-4" />
              Start a conversation
            </a>
            <span className="text-sm text-muted">hello@studioononc.dev</span>
          </div>
        </div>
      </div>
    </section>
  );
}
