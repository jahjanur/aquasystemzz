import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Wrench } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { products } from "@/lib/data/products";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";
import { formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} · ${product.brand}`,
    description: `${product.brand} ${product.name} — ${formatNumber(product.capacityBtu)} BTU · ${product.energyClass}`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <section className="relative overflow-hidden hero-mesh">
        <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
        <div className="container-x relative pt-6 md:pt-8 pb-12 md:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm mb-6 md:mb-8"
          >
            <Link
              href={`/${locale}/products/`}
              className="inline-flex items-center gap-1.5 text-fg-muted hover:text-brand transition"
            >
              <ArrowLeft className="size-3.5" /> {dict.products.pageTitle}
            </Link>
            <span className="text-fg-dim">/</span>
            <span className="text-fg-dim hidden md:inline">{product.brand}</span>
            <span className="text-fg-dim hidden md:inline">/</span>
            <span className="text-fg font-medium truncate">{product.name}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="relative aspect-square rounded-[2rem] bg-white border border-border overflow-hidden shadow-[0_30px_70px_-30px_rgba(13,21,48,0.25)]">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-10"
              />
            ) : null}
            <span className="absolute top-5 right-5 inline-flex items-center rounded-full bg-brand text-white px-3 py-1 text-xs font-semibold">
              {product.energyClass}
            </span>
            {product.sku && (
              <span className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/95 border border-border px-3 py-1 text-[0.7rem] font-medium text-fg-muted">
                SKU · {product.sku}
              </span>
            )}
          </div>

          <div>
            <Eyebrow>{product.brand}</Eyebrow>
            <h1 className="mt-5 text-fg text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
              {product.name}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {product.capacityBtu > 0 && (
                <Tag>{formatNumber(product.capacityBtu)} BTU</Tag>
              )}
              <Tag>
                {product.roomSizeM2[0]}–{product.roomSizeM2[1]} m²
              </Tag>
              <Tag>{dict.products.categories[product.category]}</Tag>
            </div>

            {product.features && product.features.length > 0 && (
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-fg">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand-tint text-brand">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 rounded-2xl bg-white border border-border p-5 shadow-sm">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs uppercase tracking-widest text-fg-dim font-semibold">
                    {dict.products.card.from}
                  </div>
                  <div className="text-3xl md:text-4xl font-semibold text-brand">
                    {formatNumber(product.priceMkd)} ден
                  </div>
                  <div className="text-sm text-fg-muted mt-0.5">
                    ≈ € {formatNumber(product.priceFromEur)}
                  </div>
                </div>
                <Button href={`/${locale}/contact/`} variant="accent" size="md" withArrow>
                  {dict.nav.getQuote}
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-bg-soft border border-border p-4 flex items-center gap-3">
                <ShieldCheck className="size-5 text-brand" />
                <div className="text-sm">
                  <div className="text-fg font-semibold">5+ year warranty</div>
                  <div className="text-fg-dim">Authorised partner</div>
                </div>
              </div>
              <div className="rounded-xl bg-bg-soft border border-border p-4 flex items-center gap-3">
                <Wrench className="size-5 text-brand" />
                <div className="text-sm">
                  <div className="text-fg font-semibold">Pro installation</div>
                  <div className="text-fg-dim">Certified technicians</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <Section>
        <CTA locale={locale as Locale} dict={dict} />
      </Section>
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-bg-soft px-3 py-1 text-fg-muted font-medium">
      {children}
    </span>
  );
}
