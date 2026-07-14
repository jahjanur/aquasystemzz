import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import { projects } from "@/lib/data/projects";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export function ProjectsPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const items = projects.slice(0, 4);
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div className="max-w-2xl">
          <Eyebrow>{dict.home.projectsEyebrow}</Eyebrow>
          <h2 className="mt-5 text-fg text-4xl md:text-5xl font-semibold leading-[1.05]">
            {dict.home.projectsTitle}
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            {dict.home.projectsSubtitle}
          </p>
        </div>
        <Button href={`/${locale}/projects/`} variant="outline" withArrow>
          {dict.common.viewAll}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <ProjectCard project={p} locale={locale} dict={dict} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
