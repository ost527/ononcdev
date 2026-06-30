import { ArrowUpRight, BookOpen, Clock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogPost {
  category: string;
  title: string;
  readTime: string;
  date: string;
  href?: string;
}

export interface BentoBlogProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  posts?: [BlogPost, BlogPost, BlogPost, BlogPost];
  className?: string;
}

const DEFAULT_POSTS: [BlogPost, BlogPost, BlogPost, BlogPost] = [
  {
    category: "Engineering",
    title: "Designing interruptible animation that always feels responsive",
    readTime: "8 min",
    date: "Jun 24",
  },
  {
    category: "Design",
    title: "A token system you can restyle in seconds",
    readTime: "5 min",
    date: "Jun 18",
  },
  {
    category: "Accessibility",
    title: "Reduced-motion without losing personality",
    readTime: "6 min",
    date: "Jun 11",
  },
  {
    category: "Craft",
    title: "Why we cap canvas DPR at 2",
    readTime: "4 min",
    date: "Jun 03",
  },
];

const CATEGORIES = [
  { name: "Engineering", count: 24 },
  { name: "Design", count: 18 },
  { name: "Accessibility", count: 9 },
  { name: "Craft", count: 12 },
  { name: "Motion", count: 7 },
];

function PostCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.href ?? "#"}
      className="group/card flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-0.5 hover:border-border-strong"
    >
      <span className="text-[11px] font-medium uppercase tracking-wider text-brand-ink">
        {post.category}
      </span>
      <h3 className="mt-2 line-clamp-3 font-semibold leading-snug tracking-tight">
        {post.title}
      </h3>
      <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted">
        <Clock className="size-3.5" aria-hidden />
        {post.readTime} · {post.date}
      </div>
    </a>
  );
}

/**
 * BentoBlog — an editorial content bento: a featured cover story, post cards, a
 * "latest" list, topic chips, a newsletter CTA, and an archive link. Server-safe
 * (no client JS); the featured cover uses a CSS mesh gradient with a scrim and
 * text-shadow so the white headline stays legible.
 */
export function BentoBlog({
  eyebrow = "Writing",
  heading = "Notes from the workshop",
  subheading = "Essays on interface, motion, and the craft of building for the web.",
  posts = DEFAULT_POSTS,
  className,
}: BentoBlogProps) {
  const [featured, p1, p2, p3] = posts;

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-wider text-brand-ink">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted">
          {subheading}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem]">
        {/* Featured cover story */}
        <a
          href={featured.href ?? "#"}
          aria-label={`${featured.category}: ${featured.title}`}
          className="group/feat relative block min-h-[20rem] overflow-hidden rounded-2xl border border-border sm:col-span-2 lg:row-span-2"
        >
          <span
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover/feat:scale-105"
            style={{
              background:
                "radial-gradient(at 22% 22%, #a78bfa 0px, transparent 55%), radial-gradient(at 82% 12%, #22d3ee 0px, transparent 50%), radial-gradient(at 65% 90%, #fb7185 0px, transparent 55%), linear-gradient(135deg, #2e1065, #0b0d18)",
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          />
          <div className="relative flex h-full flex-col justify-end p-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur">
              {featured.category}
            </span>
            <h3 className="mt-3 max-w-md text-balance text-2xl font-semibold tracking-tight text-white">
              {featured.title}
            </h3>
            <div className="mt-4 flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-semibold text-white"
              >
                AR
              </span>
              <span className="text-sm text-white/85">
                Ava Reed · {featured.readTime} · {featured.date}
              </span>
            </div>
          </div>
        </a>

        {/* Two post cards */}
        <PostCard post={p1} />
        <PostCard post={p2} />

        {/* Topics */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-medium">Topics</h3>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <span
                key={c.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted"
              >
                {c.name}
                <span className="text-muted-2">{c.count}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Third post card */}
        <PostCard post={p3} />

        {/* Newsletter CTA */}
        <div className="relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand-2) 40%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <h3 className="text-lg font-semibold tracking-tight">
              The Friday digest
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted">
              One thoughtful email a week — new essays, no noise.
            </p>
          </div>
          <a
            href="#"
            className="relative inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            <Mail className="size-4" />
            Subscribe
          </a>
        </div>

        {/* Archive */}
        <a
          href="#"
          className="group/arch flex min-h-[12rem] flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-0.5 hover:border-border-strong sm:col-span-2"
        >
          <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink">
            <BookOpen className="size-5" />
          </span>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-2xl font-semibold tracking-tight">
                120 articles
              </div>
              <p className="text-sm text-muted">Five years of writing.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
              Browse the archive
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/arch:-translate-y-0.5 group-hover/arch:translate-x-0.5" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
