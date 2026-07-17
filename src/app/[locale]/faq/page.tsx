import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { faqItems } from "@/data/faq";
import { t } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/shared/faq-accordion";
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
    title: dict.meta.faqTitle,
    description: dict.meta.faqDesc,
    path: "/faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: t(item.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(item.answer, locale),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        badge={dict.faq.badge}
        title={dict.faq.title}
        subtitle={dict.faq.subtitle}
      />
      <Section>
        <FaqAccordion locale={locale} />
      </Section>
      <CtaBanner
        locale={locale}
        title={dict.faq.stillTitle}
        subtitle={dict.faq.subtitle}
        button={dict.faq.stillCta}
      />
    </>
  );
}
