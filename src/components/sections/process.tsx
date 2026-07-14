import { ClipboardList, Ruler, Wrench } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const steps = [
  { key: "visit" as const, icon: ClipboardList, idx: "01" },
  { key: "design" as const, icon: Ruler, idx: "02" },
  { key: "install" as const, icon: Wrench, idx: "03" },
];

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <SectionHeader
        eyebrow={<Eyebrow>{dict.process.eyebrow}</Eyebrow>}
        title={dict.process.title}
        subtitle={dict.process.subtitle}
        align="center"
      />
      <div className="relative">
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 relative">
          {steps.map((s, i) => {
            const t = dict.process.steps[s.key];
            return (
              <Reveal key={s.key} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-brand/10 blur-md" />
                    <div className="relative inline-flex size-24 items-center justify-center rounded-full bg-white border border-border shadow-[0_20px_40px_-20px_rgba(13,21,48,0.25)]">
                      <s.icon className="size-9 text-brand" />
                    </div>
                  </div>
                  <span className="mt-5 inline-flex items-center justify-center rounded-full bg-brand text-white text-[0.65rem] font-semibold tracking-[0.18em] px-2.5 py-1">
                    {s.idx}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-fg">{t.title}</h3>
                  <p className="mt-2 max-w-xs text-fg-muted leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
