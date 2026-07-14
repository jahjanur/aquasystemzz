import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ProductsCatalog } from "@/components/sections/products-catalog";
import { CTA } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: dict.products.pageTitle, description: dict.products.pageSubtitle };
}

export default async function ProductsPage({
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
        eyebrow={dict.home.productsEyebrow}
        title={dict.products.pageTitle}
        subtitle={dict.products.pageSubtitle}
      />
      <Section className="pt-6">
        <ProductsCatalog locale={locale as Locale} dict={dict} />
      </Section>
      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
