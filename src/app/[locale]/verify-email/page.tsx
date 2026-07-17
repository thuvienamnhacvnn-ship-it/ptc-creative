import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { verifyEmailAction } from "@/actions/auth";
import { Container } from "@/components/ui/container";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/types";

export default async function VerifyEmailPage({
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
  const result = token ? await verifyEmailAction(token) : { ok: false, error: "invalid_token" };

  return (
    <div className="border-b border-border py-16 sm:py-20">
      <Container className="max-w-md">
        <p className="spec">Auth</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {locale === "de" ? "E-Mail-Bestätigung" : "Xác thực email"}
        </h1>
        {result.ok ? (
          <p className="mt-4 border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
            {locale === "de"
              ? "E-Mail bestätigt. Sie können sich anmelden."
              : "Email đã xác thực. Bạn có thể đăng nhập."}
          </p>
        ) : (
          <p className="mt-4 border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {locale === "de"
              ? "Link ungültig oder abgelaufen."
              : "Liên kết không hợp lệ hoặc hết hạn."}
          </p>
        )}
        <Link href={localePath(locale, "/login")} className="mt-6 inline-block text-sm text-accent">
          → Login
        </Link>
      </Container>
    </div>
  );
}
