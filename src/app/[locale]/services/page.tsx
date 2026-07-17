import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/data/services";
import { localePath, t } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { CtaBanner } from "@/components/shared/cta-banner";
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
    title: dict.meta.servicesTitle,
    description: dict.meta.servicesDesc,
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        badge={dict.services.badge}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      />
      <Section>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="group flex flex-col justify-between bg-card p-6 transition-colors hover:bg-elevated sm:p-8"
            >
              <div>
                <Link
                  href={localePath(locale, `/services/${s.slug}`)}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="font-mono text-[10px] tracking-widest text-muted">
                    MOD {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-accent" />
                </Link>
                <Link href={localePath(locale, `/services/${s.slug}`)}>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-accent">
                    {t(s.title, locale)}
                  </h2>
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(s.short, locale)}
                </p>
                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                  {s.submenu.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={localePath(locale, `/services/${s.slug}#${sub.slug}`)}
                        className="block border border-border/70 px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {t(sub.title, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.specs.map((sp) => (
                  <span
                    key={sp}
                    className="border border-border px-2 py-1 font-mono text-[10px] tracking-wide text-muted"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBanner
        locale={locale}
        title={dict.home.ctaTitle}
        subtitle={dict.home.ctaSubtitle}
        button={dict.services.detailCta}
      />
    </>
  );
}
