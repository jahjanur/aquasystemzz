import { Award, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Stats } from "@/components/sections/stats";
import { CTA } from "@/components/sections/cta";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: dict.about.pageTitle, description: dict.about.pageSubtitle };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const valueIcons = {
    quality: ShieldCheck,
    precision: Sparkles,
    support: Wrench,
  } as const;

  return (
    <>
      <PageHeader
        eyebrow="Akva System ZZ"
        title={dict.about.pageTitle}
        subtitle={dict.about.pageSubtitle}
      />

      <Section className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted">
              {dict.about.intro}
            </p>
            <div className="mt-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-fg">
                {dict.about.missionTitle}
              </h3>
              <p className="mt-4 text-lg text-fg-muted leading-relaxed">
                {dict.about.missionText}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-border bg-gradient-to-br from-brand-tint via-white to-accent-tint">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-white border border-border shadow-sm">
                  <Award className="size-8 text-accent" />
                </div>
                <div className="mt-6 text-5xl md:text-6xl font-display font-semibold text-fg tracking-tight">
                  {dict.common.since} 2013
                </div>
                <div className="mt-3 text-fg-muted text-sm uppercase tracking-[0.2em] font-semibold">
                  Gostivar · MK
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-16" bg="soft">
        <Stats dict={dict} />
      </Section>

      <Section>
        <h3 className="text-3xl md:text-4xl font-semibold text-fg mb-10 max-w-2xl">
          {dict.about.valuesTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(Object.keys(dict.about.values) as Array<keyof typeof dict.about.values>).map(
            (key, i) => {
              const Icon = valueIcons[key];
              const v = dict.about.values[key];
              const accent = key === "precision";
              return (
                <Reveal key={key} delay={i * 0.05}>
                  <div className="surface-card rounded-2xl p-7 h-full">
                    <div
                      className={
                        "inline-flex size-12 items-center justify-center rounded-xl border " +
                        (accent
                          ? "bg-accent-tint border-accent/20 text-accent"
                          : "bg-brand-tint border-brand/15 text-brand")
                      }
                    >
                      <Icon className="size-5" />
                    </div>
                    <h4 className="mt-5 text-xl font-semibold text-fg">
                      {v.title}
                    </h4>
                    <p className="mt-3 text-fg-muted leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            },
          )}
        </div>
      </Section>

      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
