import { BadgeCheck, Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "./product-card";
import { products } from "@/lib/data/products";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

// A curated spread of Midea models: entry → mid-range → flagship.
function pickMidea() {
  const midea = products.filter((p) => p.brand === "Midea");
  const byPrice = [...midea].sort((a, b) => a.priceMkd - b.priceMkd);
  if (byPrice.length < 3) return byPrice;
  return [byPrice[0], byPrice[Math.floor(byPrice.length / 2)], byPrice[byPrice.length - 1]];
}

export function MideaSpotlight({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = pickMidea();
  const m = dict.home.midea;
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand/10 bg-brand-tint">
      <div className="absolute inset-x-0 top-0 h-1 accent-rule" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 100% 0%, rgba(57,83,164,0.12) 0%, transparent 60%), radial-gradient(50% 70% at 0% 100%, rgba(239,61,58,0.08) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative p-7 md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Messaging */}
          <div className="lg:col-span-5">
            <Eyebrow variant="accent">{m.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-fg text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.06] tracking-tight">
              {m.title}
            </h2>
            <p className="mt-5 text-base md:text-lg text-fg-muted leading-relaxed">
              {m.subtitle}
            </p>
            <ul className="mt-6 grid gap-2.5">
              {m.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm md:text-[0.95rem] text-fg">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="size-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={`/${locale}/products/?brand=Midea`} variant="primary" withArrow>
                {m.cta}
              </Button>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-2">
                <BadgeCheck className="size-4 text-brand" />
                {m.partner}
              </span>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
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
        </div>
      </div>
    </div>
  );
}
