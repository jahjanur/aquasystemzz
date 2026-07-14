import { Phone, BadgeCheck, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";
import { ConsultationButton } from "@/components/site/consultation-button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export function CTA({ dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-fg text-white">
      {/* radial brand+accent mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 12% 18%, rgba(57,83,164,0.55) 0%, transparent 60%), radial-gradient(40% 50% at 95% 85%, rgba(239,61,58,0.45) 0%, transparent 60%), radial-gradient(35% 35% at 70% 25%, rgba(57,83,164,0.30) 0%, transparent 60%)",
        }}
      />
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 80%)",
        }}
      />
      {/* accent rule top */}
      <div className="absolute inset-x-0 top-0 h-px accent-rule" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-8 md:p-12 lg:p-16 items-center">
        {/* LEFT */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/80">
            <Sparkles className="size-3 text-accent" />
            {dict.sticky.promo}
          </div>
          <h3 className="mt-5 text-white text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight">
            {dict.home.ctaTitle}
          </h3>
          <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            {dict.home.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <ConsultationButton dict={dict} size="lg">
              {dict.home.ctaButton}
            </ConsultationButton>
            <a
              href="tel:+38978433882"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white h-14 px-7 text-base font-medium hover:bg-white/10 hover:border-white/30 transition group"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-accent">
                <Phone className="size-4" />
              </span>
              078 433 882
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/70">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" />
              {dict.whyUs.items.warranty.title}
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock className="size-4 text-accent" />
              {dict.whyUs.items.fast.title}
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              Gostivar
            </div>
          </div>
        </div>

        {/* RIGHT — visual cluster */}
        <div className="lg:col-span-5 relative">
          <div className="relative grid grid-cols-2 gap-3 max-w-md mx-auto lg:ml-auto lg:mr-0">
            {/* big quote stat */}
            <div className="col-span-2 rounded-2xl bg-white text-fg p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-24 rounded-full bg-accent/15 blur-2xl" />
              <div className="relative">
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-fg-dim font-semibold">
                  Quote response
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-display font-semibold text-brand tabular-nums tracking-tight">
                    48
                  </span>
                  <span className="text-2xl font-display font-semibold text-fg-muted">
                    h
                  </span>
                </div>
                <div className="mt-1 text-sm text-fg-muted">
                  Site visit · measurement · price.
                </div>
              </div>
            </div>

            {/* Midea partner */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4">
              <BadgeCheck className="size-6 text-accent" />
              <div className="mt-2 text-sm font-display font-semibold leading-tight">
                {dict.home.midea.partner}
              </div>
            </div>

            {/* warranty */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4">
              <div className="text-2xl font-display font-semibold tabular-nums text-accent">
                5<span className="text-lg font-medium text-white/60"> yr</span>
              </div>
              <div className="text-[0.7rem] uppercase tracking-widest text-white/50 font-semibold mt-1">
                {dict.common.warranty}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
