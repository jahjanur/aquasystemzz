import { ShieldCheck, Award, Clock, Headphones } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const items = [
  { key: "warranty" as const, icon: ShieldCheck, tone: "brand" as const },
  { key: "certified" as const, icon: Award, tone: "accent" as const },
  { key: "fast" as const, icon: Clock, tone: "brand" as const },
  { key: "support" as const, icon: Headphones, tone: "accent" as const },
];

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <SectionHeader
        eyebrow={<Eyebrow>{dict.whyUs.eyebrow}</Eyebrow>}
        title={dict.whyUs.title}
        subtitle={dict.whyUs.subtitle}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => {
          const t = dict.whyUs.items[it.key];
          return (
            <Reveal key={it.key} delay={i * 0.06}>
              <div className="group relative h-full surface-card rounded-2xl p-7 overflow-hidden">
                <div
                  className={
                    "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity " +
                    (it.tone === "accent" ? "bg-accent/15" : "bg-brand/15")
                  }
                />
                <div
                  className={
                    "relative inline-flex items-center justify-center size-12 rounded-xl border " +
                    (it.tone === "accent"
                      ? "bg-accent-tint border-accent/20 text-accent"
                      : "bg-brand-tint border-brand/15 text-brand")
                  }
                >
                  <it.icon className="size-5" />
                </div>
                <h3 className="relative mt-6 text-lg font-semibold text-fg">
                  {t.title}
                </h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-fg-muted">
                  {t.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
