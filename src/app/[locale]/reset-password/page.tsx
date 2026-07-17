import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/container";
import { ResetForm } from "@/components/auth/auth-forms";
import type { Locale } from "@/types";

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale: raw } = await params;
  const { token } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  if (!token) {
    return (
      <div className="border-b border-border py-16">
        <Container className="max-w-md">
          <p className="text-danger">
            {locale === "de" ? "Token fehlt." : "Thiếu token."}
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="border-b border-border py-16 sm:py-20">
      <Container className="max-w-md">
        <p className="spec">Auth</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {locale === "de" ? "Neues Passwort" : "Đặt lại mật khẩu"}
        </h1>
        <ResetForm locale={locale} dict={dict} token={token} />
      </Container>
    </div>
  );
}
