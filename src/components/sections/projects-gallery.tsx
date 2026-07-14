"use client";

import * as React from "react";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";
import { projects, type ProjectCategory } from "@/lib/data/projects";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const categoryOrder: ProjectCategory[] = [
  "residential",
  "commercial",
  "industrial",
  "hospitality",
];

export function ProjectsGallery({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = React.useState<ProjectCategory | "all">("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <Tab active={active === "all"} onClick={() => setActive("all")}>
          {dict.projects.all}
        </Tab>
        {categoryOrder.map((c) => (
          <Tab key={c} active={active === c} onClick={() => setActive(c)}>
            {dict.projects.categories[c]}
          </Tab>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <ProjectCard project={p} locale={locale} dict={dict} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition",
        active
          ? "border-brand bg-brand text-white"
          : "border-border bg-white text-fg-muted hover:border-brand/40 hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}
