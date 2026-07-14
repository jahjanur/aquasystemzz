import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { StickyMobileCTA } from "@/components/site/sticky-cta";
import { JsonLd, localBusinessSchema, webSiteSchema } from "@/components/site/json-ld";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { default: `${dict.brand.name} — ${dict.brand.tagline}`, template: `%s · ${dict.brand.name}` },
    description: dict.home.heroSubtitle,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <>
      <JsonLd data={[localBusinessSchema(), webSiteSchema()]} />
      <Header locale={locale as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
      <StickyMobileCTA dict={dict} />
    </>
  );
}
