import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = project.title[locale];
  const summary = project.summary[locale];
  const categoryLabel = dict.projects.categories[project.category];

  return (
    <Link
      href={`/${locale}/projects/`}
      className="group relative block surface-card rounded-2xl overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectVisual hue={project.cover.hue} pattern={project.cover.pattern} />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="rounded-full bg-white/95 backdrop-blur border border-border px-2.5 py-1 text-[0.7rem] uppercase tracking-widest font-semibold text-fg">
            {categoryLabel}
          </span>
          <span className="rounded-full bg-white/80 backdrop-blur px-2.5 py-1 text-[0.7rem] text-fg-muted">
            {project.year}
          </span>
        </div>
        <ArrowUpRight className="absolute top-4 right-4 size-5 text-white/90 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
      </div>
      <div className="p-6">
        <div className="text-xs text-fg-dim font-semibold uppercase tracking-widest mb-1.5">
          {project.location}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-fg leading-tight group-hover:text-brand transition">
          {title}
        </h3>
        <p className="mt-2 text-sm text-fg-muted line-clamp-2">{summary}</p>
      </div>
    </Link>
  );
}

function ProjectVisual({
  hue,
  pattern,
}: {
  hue: number;
  pattern: "grid" | "rings" | "vent";
}) {
  const bg = `radial-gradient(120% 100% at 30% 0%, hsl(${hue} 60% 55% / 0.7) 0%, transparent 55%), linear-gradient(180deg, hsl(${hue} 55% 38%) 0%, hsl(${hue + 10} 50% 22%) 100%)`;
  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      {pattern === "grid" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}
      {pattern === "rings" && (
        <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 200 200">
          <defs>
            <radialGradient id={`r-${hue}`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[20, 40, 60, 80, 100].map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.4"
            />
          ))}
          <circle cx="100" cy="100" r="100" fill={`url(#r-${hue})`} />
        </svg>
      )}
      {pattern === "vent" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 12px)",
          }}
        />
      )}
    </div>
  );
}
