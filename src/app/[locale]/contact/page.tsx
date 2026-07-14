import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: dict.contact.pageTitle, description: dict.contact.pageSubtitle };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.pageTitle}
        title={dict.contact.pageTitle}
        subtitle={dict.contact.pageSubtitle}
      />

      <Section className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          <ContactForm dict={dict} />

          <div className="space-y-4">
            <ContactRow
              icon={MapPin}
              label={dict.contact.info.address}
              value={dict.contact.info.addressValue}
            />
            <ContactRow
              icon={Phone}
              label={dict.contact.info.phone}
              value="078 433 882"
              href="tel:+38978433882"
            />
            <ContactRow
              icon={Mail}
              label={dict.contact.info.email}
              value="info@akvasystem.mk"
              href="mailto:info@akvasystem.mk"
            />
            <ContactRow
              icon={Clock}
              label={dict.contact.info.hours}
              value={dict.contact.info.hoursValue}
            />

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-sm">
              <iframe
                title="Akva System ZZ — Brakja Blazhevski 9, Gostivar"
                src="https://www.google.com/maps?q=Brakja+Blazhevski+9,+Gostivar,+1230,+North+Macedonia&hl=mk&z=16&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Brakja+Blazhevski+9,+Gostivar,+1230"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5 text-xs font-medium text-fg shadow-sm hover:bg-bg-soft transition"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="surface-card rounded-2xl p-5 flex items-start gap-4">
      <div className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-tint border border-brand/15">
        <Icon className="size-5 text-brand" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-fg-dim font-semibold">
          {label}
        </div>
        <div className="text-fg font-medium mt-1">{value}</div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
