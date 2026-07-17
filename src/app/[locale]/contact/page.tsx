import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/shared/contact-form";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildMetadata({
    locale: raw,
    title: dict.meta.contactTitle,
    description: dict.meta.contactDesc,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const c = dict.contact;

  const info = [
    { icon: Mail, label: c.infoEmail, value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: c.infoPhone, value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: c.infoAddress, value: SITE.address[locale] },
    { icon: Clock, label: c.infoHours, value: SITE.hours[locale] },
  ];

  return (
    <>
      <PageHero badge={c.badge} title={c.title} subtitle={c.subtitle} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm locale={locale} dict={dict} />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">{c.infoTitle}</h2>
              <ul className="mt-5 space-y-5">
                {info.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-muted text-accent">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs font-medium tracking-wide text-muted uppercase">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="mt-0.5 text-sm font-medium hover:text-accent">
                          {item.value}
                        </a>
                      ) : (
                        <div className="mt-0.5 text-sm font-medium">{item.value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border bg-elevated/50 p-6 text-center text-sm text-muted">
              {c.mapPlaceholder}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
