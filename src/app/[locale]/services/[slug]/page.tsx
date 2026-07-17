import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { services, getService } from "@/data/services";
import { t } from "@/lib/utils";
import { ServiceDetail } from "@/components/services/service-detail";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return services.flatMap((s) =>
    ["vi", "de"].map((locale) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale: raw,
    title: `${t(service.title, raw)} | PTC Creative`,
    description: t(service.short, raw),
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const service = getService(slug);
  if (!service) notFound();
  const dict = getDictionary(locale);

  return <ServiceDetail service={service} locale={locale} dict={dict} />;
}
