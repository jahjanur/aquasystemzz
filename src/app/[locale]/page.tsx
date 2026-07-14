import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/hero";
import { WhyUs } from "@/components/sections/why-us";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProductsPreview } from "@/components/sections/products-preview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Section } from "@/components/ui/section";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <>
      <Hero locale={locale as Locale} dict={dict} />

      <Section className="py-16 md:py-20">
        <Stats dict={dict} />
      </Section>

      <Section bg="soft">
        <WhyUs dict={dict} />
      </Section>

      <Section>
        <ServicesGrid locale={locale as Locale} dict={dict} />
      </Section>

      <Section bg="soft">
        <Process dict={dict} />
      </Section>

      <Section>
        <ProductsPreview locale={locale as Locale} dict={dict} />
      </Section>

      <Section bg="soft">
        <ProjectsPreview locale={locale as Locale} dict={dict} />
      </Section>

      <Section>
        <Testimonials dict={dict} locale={locale as Locale} />
      </Section>

      <Section bg="soft">
        <FAQ dict={dict} />
      </Section>

      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
