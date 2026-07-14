import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { CTA } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: dict.projects.pageTitle, description: dict.projects.pageSubtitle };
}

export default async function ProjectsPage({
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
        eyebrow={dict.home.projectsEyebrow}
        title={dict.projects.pageTitle}
        subtitle={dict.projects.pageSubtitle}
      />
      <Section className="pt-6">
        <ProjectsGallery locale={locale as Locale} dict={dict} />
      </Section>
      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
