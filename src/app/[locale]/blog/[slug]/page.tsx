import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Check } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  blogPosts,
  getPost,
  getPostContent,
  getRelatedPosts,
} from "@/lib/data/blog";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CTA } from "@/components/sections/cta";
import { BlogCard } from "@/components/sections/blog-card";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/site/json-ld";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(slug);
  if (!post) return {};
  const c = getPostContent(post, locale as Locale);
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}/`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/${slug}/`])),
    },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url: `${SITE_URL}/${locale}/blog/${slug}/`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const dict = getDictionary(locale as Locale);
  const c = getPostContent(post, locale as Locale);
  const related = getRelatedPosts(slug);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: c.title,
            description: c.description,
            url: `/${locale}/blog/${slug}/`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            inLanguage: locale,
          }),
          breadcrumbSchema([
            { name: dict.nav.home, url: `/${locale}/` },
            { name: dict.blog.pageTitle, url: `/${locale}/blog/` },
            { name: c.title, url: `/${locale}/blog/${slug}/` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden hero-mesh">
        <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
        <div className="container-x relative pt-8 md:pt-12 pb-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href={`/${locale}/blog/`}
              className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-brand transition"
            >
              <ArrowLeft className="size-3.5" /> {dict.blog.backToBlog}
            </Link>
          </nav>
          <div className="max-w-3xl">
            <Eyebrow variant={post.category === "heating" ? "accent" : "brand"}>
              {dict.blog.categories[post.category]}
            </Eyebrow>
            <h1 className="mt-5 text-fg text-4xl md:text-5xl font-semibold leading-[1.08] tracking-tight">
              {c.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-dim">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readingMinutes} {dict.blog.minRead}
              </span>
            </div>
          </div>
        </div>
      </section>

      <article className="container-x py-12 md:py-16">
        <div className="max-w-3xl">
          {c.sections.map((section, i) => (
            <div key={i} className={i > 0 ? "mt-10" : ""}>
              {section.heading && (
                <h2 className="text-2xl md:text-3xl font-semibold text-fg tracking-tight">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="mt-4 text-[1.06rem] leading-relaxed text-fg-muted"
                >
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[1.02rem] text-fg">
                      <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                        <Check className="size-3" />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <Section bg="soft" className="py-16 md:py-20">
          <h2 className="mb-8 text-2xl md:text-3xl font-semibold text-fg tracking-tight">
            {dict.blog.relatedTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} locale={locale as Locale} dict={dict} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}
