import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { RegisterForm } from "@/components/auth/auth-forms";
import type { Locale } from "@/types";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="border-b border-border py-16 sm:py-20">
      <Container className="max-w-md">
        <p className="spec">Auth</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{dict.auth.registerTitle}</h1>
        <p className="mt-2 text-sm text-muted">{dict.auth.registerSubtitle}</p>
        <RegisterForm locale={locale} dict={dict} />
      </Container>
    </div>
  );
}
