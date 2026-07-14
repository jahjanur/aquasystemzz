import { Star, Quote } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/data/testimonials";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export function Testimonials({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <div>
      <SectionHeader
        eyebrow={<Eyebrow>{dict.testimonialsBlock.eyebrow}</Eyebrow>}
        title={dict.testimonialsBlock.title}
        subtitle={dict.testimonialsBlock.subtitle}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
            <figure className="relative h-full surface-card rounded-2xl p-7 flex flex-col">
              <Quote className="size-6 text-accent/30" />
              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="size-4 fill-amber-400 stroke-amber-500" />
                ))}
              </div>
              <blockquote className="mt-4 text-[0.97rem] leading-relaxed text-fg flex-1">
                "{t.quote[locale]}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-3 text-white font-semibold text-sm">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-fg truncate">
                    {t.role[locale]}
                  </div>
                  <div className="text-xs text-fg-muted truncate">
                    {t.location} · {t.product}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
