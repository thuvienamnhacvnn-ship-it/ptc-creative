import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { AiProvider } from "@/components/providers/ai-provider";
import { AiPanel } from "@/components/ai/ai-panel";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { SocialDock } from "@/components/layout/social-dock";
import { organizationJsonLd } from "@/lib/seo";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "de" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <AiProvider>
        <div className="flex min-h-screen flex-col pb-16 lg:pb-0" lang={locale}>
          <Header locale={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
          <MobileActionBar locale={locale} dict={dict} />
          <SocialDock locale={locale} />
          <AiPanel locale={locale} dict={dict} />
          <CookieConsent locale={locale} />
        </div>
      </AiProvider>
    </>
  );
}
