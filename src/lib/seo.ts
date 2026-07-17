import type { Metadata } from "next";
import type { Locale } from "@/types";
import { SITE } from "./constants";

export function buildMetadata({
  locale,
  title,
  description,
  path = "",
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  const url = `${SITE.url}/${locale}${clean}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        vi: `${SITE.url}/vi${clean}`,
        de: `${SITE.url}/de${clean}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: locale === "vi" ? "vi_VN" : "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.tagline.vi,
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
  };
}
