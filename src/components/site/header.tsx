"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  const links: { href: string; label: string }[] = [
    { href: `/${locale}/`, label: dict.nav.home },
    { href: `/${locale}/services/`, label: dict.nav.services },
    { href: `/${locale}/products/`, label: dict.nav.products },
    { href: `/${locale}/projects/`, label: dict.nav.projects },
    { href: `/${locale}/about/`, label: dict.nav.about },
    { href: `/${locale}/blog/`, label: dict.nav.blog },
    { href: `/${locale}/contact/`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}/`) return pathname === href || pathname === `/${locale}`;
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <>
      <div
        className="bg-fg text-white text-xs relative"
        style={{
          backgroundImage:
            "radial-gradient(40% 100% at 90% 50%, rgba(239,61,58,0.18) 0%, transparent 70%), radial-gradient(40% 100% at 10% 50%, rgba(57,83,164,0.22) 0%, transparent 70%)",
        }}
      >
        <div className="container-x relative flex items-center justify-between gap-3 py-2">
          <a
            href="tel:+38978433882"
            className="inline-flex items-center gap-1.5 text-white/85 hover:text-white transition"
          >
            <Phone className="size-3.5 text-accent" />
            <span className="font-medium">078 433 882</span>
          </a>
          <div className="hidden md:flex items-center gap-2 text-white/70">
            <span className="text-white/40">·</span>
            <MapPin className="size-3.5 text-accent/80" />
            Gostivar
            <span className="text-white/30">·</span>
            <Clock className="size-3.5 text-accent/80" />
            {dict.contact.info.hoursValue}
          </div>
          <div className="ml-auto shrink-0">
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-all",
          scrolled
            ? "border-b border-border shadow-[0_8px_30px_-20px_rgba(13,21,48,0.18)]"
            : "border-b border-transparent",
        )}
      >
        <div className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
          <Logo href={`/${locale}/`} />
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 text-[0.92rem] font-medium transition rounded-full",
                  isActive(l.href)
                    ? "text-brand"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute inset-x-3 -bottom-1 h-[3px] rounded-full accent-rule" />
                )}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button href={`/${locale}/contact/`} size="sm" variant="primary" withArrow>
              {dict.nav.getQuote}
            </Button>
          </div>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-full border border-border text-fg"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container-x py-6 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base transition",
                    isActive(l.href)
                      ? "bg-brand-soft text-brand"
                      : "text-fg-muted hover:bg-bg-soft hover:text-fg",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Button
                href={`/${locale}/contact/`}
                size="md"
                variant="primary"
                withArrow
                className="mt-4 w-full"
              >
                {dict.nav.getQuote}
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
