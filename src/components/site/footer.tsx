import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Logo } from "./logo";
import { Newsletter } from "./newsletter";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.6v-2.7C16.3 5 15.4 5 14.4 5c-2.5 0-4 1.5-4 4.2V11H8v3h2.4v7h3.1z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4 4h4v4H4V4zm0 6h4v10H4V10zm6 0h3.8v1.5h.1c.5-.9 1.8-1.8 3.6-1.8 3.9 0 4.6 2.5 4.6 5.8V20h-4v-3.9c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V20h-4V10z" />
    </svg>
  );
}

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 bg-bg-soft border-t border-border">
      <div className="absolute inset-x-0 top-0 h-1 accent-rule" />
      <div className="container-x py-16 md:py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-5">
          <Logo href={`/${locale}/`} />
          <p className="text-sm leading-relaxed text-fg-muted max-w-sm">
            {dict.brand.tagline}
          </p>
          <div className="flex flex-col gap-2 text-sm text-fg-muted">
            <a href="tel:+38978433882" className="inline-flex items-center gap-2 hover:text-brand transition">
              <Phone className="size-4 text-brand" />
              078 433 882
            </a>
            <a href="mailto:info@akvasystem.mk" className="inline-flex items-center gap-2 hover:text-brand transition">
              <Mail className="size-4 text-brand" />
              info@akvasystem.mk
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-brand" />
              {dict.contact.info.addressValue}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-2">
            {[
              { Icon: FacebookIcon, href: "#", label: "Facebook" },
              { Icon: InstagramIcon, href: "#", label: "Instagram" },
              { Icon: LinkedinIcon, href: "#", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-fg-muted hover:text-brand hover:border-brand/40 transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-semibold text-fg mb-4 tracking-[0.18em] uppercase">
            {dict.footer.explore}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: `/${locale}/services/`, label: dict.nav.services },
              { href: `/${locale}/products/`, label: dict.nav.products },
              { href: `/${locale}/projects/`, label: dict.nav.projects },
              { href: `/${locale}/about/`, label: dict.nav.about },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-muted hover:text-brand transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-semibold text-fg mb-4 tracking-[0.18em] uppercase">
            {dict.footer.company}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href={`/${locale}/about/`} className="text-fg-muted hover:text-brand transition">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact/`} className="text-fg-muted hover:text-brand transition">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs font-semibold text-fg mb-3 tracking-[0.18em] uppercase">
            {dict.footer.newsletter}
          </h4>
          <p className="text-sm text-fg-muted mb-4">{dict.footer.newsletterSubtitle}</p>
          <Newsletter subscribe={dict.footer.subscribe} />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col gap-3 md:flex-row items-center justify-between text-xs text-fg-dim">
          <p>© {year} Akva System ZZ · {dict.footer.rights}</p>
          <p className="font-mono">Gostivar · MK</p>
        </div>
      </div>
    </footer>
  );
}
