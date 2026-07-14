import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CTA } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: dict.services.pageTitle, description: dict.services.pageSubtitle };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <>
      <PageHeader
        eyebrow={dict.home.servicesEyebrow}
        title={dict.services.pageTitle}
        subtitle={dict.services.pageSubtitle}
      />
      <Section className="pt-6">
        <ServicesGrid locale={locale as Locale} dict={dict} variant="page" />
      </Section>
      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
