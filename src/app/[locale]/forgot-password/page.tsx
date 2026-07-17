import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { ForgotForm } from "@/components/auth/auth-forms";
import type { Locale } from "@/types";

export default async function ForgotPasswordPage({
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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {locale === "de" ? "Passwort vergessen" : "Quên mật khẩu"}
        </h1>
        <ForgotForm locale={locale} dict={dict} />
      </Container>
    </div>
  );
}
