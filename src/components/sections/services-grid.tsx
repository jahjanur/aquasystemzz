import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { services, type ServiceKey } from "@/lib/data/services";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const tone: Record<ServiceKey, "brand" | "accent"> = {
  residential: "brand",
  commercial: "brand",
  heatPumps: "accent",
  ventilation: "brand",
  maintenance: "accent",
  design: "brand",
};

export function ServicesGrid({
  locale,
  dict,
  variant = "home",
}: {
  locale: Locale;
  dict: Dictionary;
  variant?: "home" | "page";
}) {
  return (
    <div>
      {variant === "home" && (
        <SectionHeader
          eyebrow={<Eyebrow>{dict.home.servicesEyebrow}</Eyebrow>}
          title={dict.home.servicesTitle}
          subtitle={dict.home.servicesSubtitle}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => {
          const item = dict.services.items[s.key];
          const t = tone[s.key];
          return (
            <Reveal key={s.key} delay={i * 0.05}>
              <Link
                href={`/${locale}/services/`}
                className="group relative block surface-card rounded-2xl p-7 md:p-8 h-full"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center size-12 rounded-xl border",
                      t === "accent"
                        ? "bg-accent-tint border-accent/20 text-accent"
                        : "bg-brand-tint border-brand/15 text-brand",
                    )}
                  >
                    <s.icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-5 text-fg-dim group-hover:text-brand transition" />
                </div>
                <h3 className="mt-7 text-xl font-semibold text-fg">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
                  {item.desc}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
