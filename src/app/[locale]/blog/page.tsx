import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSortedPosts } from "@/lib/data/blog";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { CTA } from "@/components/sections/cta";
import { BlogCard } from "@/components/sections/blog-card";
import { JsonLd, breadcrumbSchema } from "@/components/site/json-ld";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.blog.pageTitle,
    description: dict.blog.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/`])),
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const posts = getSortedPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, url: `/${locale}/` },
          { name: dict.blog.pageTitle, url: `/${locale}/blog/` },
        ])}
      />
      <PageHeader
        eyebrow={dict.blog.eyebrow}
        title={dict.blog.pageTitle}
        subtitle={dict.blog.pageSubtitle}
      />
      <Section className="pt-10 md:pt-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale as Locale} dict={dict} />
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
