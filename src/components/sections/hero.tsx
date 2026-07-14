import { Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RatingBadge } from "@/components/ui/rating-badge";
import { HeroCalculator } from "./hero-calculator";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

const brandLogos: { name: string; src: string }[] = [
  { name: "Daikin", src: "/brands/daikin.svg" },
  { name: "Mitsubishi Electric", src: "/brands/mitsubishi.svg" },
  { name: "Toshiba", src: "/brands/toshiba.svg" },
  { name: "Panasonic", src: "/brands/panasonic.svg" },
  { name: "LG", src: "/brands/lg.svg" },
  { name: "Samsung", src: "/brands/samsung.svg" },
  { name: "Midea", src: "/brands/midea.svg" },
  { name: "Haier", src: "/brands/haier.svg" },
  { name: "Hisense", src: "/brands/hisense.svg" },
];

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden hero-mesh pt-12 md:pt-16 pb-20 md:pb-24">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 relative lg:pt-6">
            <Eyebrow>{dict.home.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 text-fg text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.6rem] leading-[1.02] font-semibold tracking-[-0.03em]">
              {dict.home.heroTitle.replace(/\.$/, "")}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-4 text-2xl md:text-3xl font-display text-fg-muted">
              <Underlined>{dict.brand.tagline.split(".")[0].trim()}</Underlined>
            </p>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-fg-muted">
              {dict.home.heroSubtitle}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href={`/${locale}/contact/`} size="lg" variant="accent" withArrow>
                {dict.home.heroCtaPrimary}
              </Button>
              <a
                href="tel:+38978433882"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 h-14 text-base font-medium text-fg hover:border-brand hover:text-brand transition group"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-tint text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Phone className="size-4" />
                </span>
                078 433 882
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <RatingBadge label={dict.rating.label} reviews={dict.rating.reviews} />
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
                {[
                  dict.process.steps.visit.title,
                  dict.whyUs.items.fast.title,
                  dict.whyUs.items.warranty.title,
                ].map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-success" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <HeroCalculator dict={dict} locale={locale} />
          </div>
        </div>

        <div className="relative mt-20 md:mt-24">
          <div className="text-center text-xs uppercase tracking-[0.22em] text-fg-dim mb-6 font-semibold">
            {dict.home.trustedBy}
          </div>
          <div className="relative scroll-mask">
            <div className="flex items-center gap-12 md:gap-16 marquee whitespace-nowrap">
              {[...brandLogos, ...brandLogos].map((b, i) => (
                <span
                  key={`${b.name}-${i}`}
                  className="shrink-0 inline-flex items-center"
                  title={b.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.src}
                    alt={b.name}
                    loading="lazy"
                    className="h-7 md:h-9 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition select-none"
                    draggable={false}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 w-full h-[0.32em] text-accent"
      >
        <path
          d="M2 8 C 50 2, 150 2, 198 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
