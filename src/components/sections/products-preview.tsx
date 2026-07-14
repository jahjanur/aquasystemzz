import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { products } from "@/lib/data/products";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export function ProductsPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = products.filter((p) => p.highlight).slice(0, 4);
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div className="max-w-2xl">
          <Eyebrow>{dict.home.productsEyebrow}</Eyebrow>
          <h2 className="mt-5 text-fg text-4xl md:text-5xl font-semibold leading-[1.05]">
            {dict.home.productsTitle}
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            {dict.home.productsSubtitle}
          </p>
        </div>
        <Button href={`/${locale}/products/`} variant="outline" withArrow>
          {dict.common.viewAll}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <ProductCard
              product={p}
              href={`/${locale}/products/${p.slug}/`}
              fromLabel={dict.products.card.from}
              detailsLabel={dict.products.card.viewDetails}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
