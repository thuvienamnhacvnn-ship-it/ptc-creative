"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  resetPasswordAction,
  type ActionResult,
} from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";

const ERROR_MAP: Record<string, { vi: string; de: string }> = {
  validation: { vi: "Vui lòng kiểm tra lại form.", de: "Bitte Formular prüfen." },
  rate_limited: { vi: "Quá nhiều thử. Đợi rồi thử lại.", de: "Zu viele Versuche. Bitte warten." },
  email_taken: { vi: "Email đã được sử dụng.", de: "E-Mail bereits vergeben." },
  invalid_credentials: { vi: "Email hoặc mật khẩu không đúng.", de: "E-Mail oder Passwort falsch." },
  email_not_verified: {
    vi: "Email chưa xác thực. Kiểm tra hộp thư.",
    de: "E-Mail nicht bestätigt. Posteingang prüfen.",
  },
  invalid_token: { vi: "Liên kết không hợp lệ hoặc hết hạn.", de: "Link ungültig oder abgelaufen." },
};

function errMsg(code: string | undefined, locale: Locale) {
  if (!code) return null;
  return ERROR_MAP[code]?.[locale] ?? code;
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  children,
}: {
  label: string;
  name?: string;
  type?: string;
  required?: boolean;
  error?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label className="spec mb-1.5 block">{label}</label>
      {children ?? (
        <input
          name={name}
          type={type}
          required={required}
          className="h-11 w-full border border-border bg-background px-3 text-sm outline-none ring-accent focus:ring-2"
        />
      )}
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}

export function LoginForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(loginAction, null as ActionResult | null);

  useEffect(() => {
    if (state?.ok) router.push(localePath(locale, "/dashboard"));
  }, [state, router, locale]);

  return (
    <form action={action} className="mt-8 space-y-4 border border-border bg-card p-6">
      <Field label={dict.auth.email} name="email" type="email" required />
      <Field label={dict.auth.password} name="password" type="password" required />
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-muted">
          <input type="checkbox" name="remember" className="accent-accent" />
          {dict.auth.remember}
        </label>
        <Link href={localePath(locale, "/forgot-password")} className="text-accent">
          {dict.auth.forgot}
        </Link>
      </div>
      {state && !state.ok && (
        <p className="border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {errMsg(state.error, locale)}
        </p>
      )}
      {state?.ok && (
        <p className="border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
          {dict.auth.successLogin}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? dict.common.loading : dict.auth.loginCta}
      </Button>
      <p className="text-center text-sm text-muted">
        {dict.auth.noAccount}{" "}
        <Link href={localePath(locale, "/register")} className="font-medium text-accent">
          {dict.auth.registerCta}
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [accountType, setAccountType] = useState<"PERSONAL" | "BUSINESS">("PERSONAL");
  const [state, action, pending] = useActionState(registerAction, null as ActionResult | null);

  return (
    <form action={action} className="mt-8 space-y-4 border border-border bg-card p-6">
      <input type="hidden" name="preferredLocale" value={locale} />
      <Field label={dict.auth.name} name="name" required />
      <Field label={dict.auth.email} name="email" type="email" required />
      <Field label={locale === "de" ? "Telefon" : "Số điện thoại"} name="phone" required />
      <Field label={dict.auth.password} name="password" type="password" required />
      <Field label={dict.auth.confirmPassword} name="confirmPassword" type="password" required />
      <div>
        <p className="spec mb-1.5">{locale === "de" ? "Kontotyp" : "Loại tài khoản"}</p>
        <div className="flex gap-2">
          {(["PERSONAL", "BUSINESS"] as const).map((t) => (
            <label
              key={t}
              className={`flex-1 cursor-pointer border px-3 py-2 text-center text-sm ${
                accountType === t ? "border-accent bg-accent-muted" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value={t}
                className="sr-only"
                checked={accountType === t}
                onChange={() => setAccountType(t)}
              />
              {t === "PERSONAL"
                ? locale === "de"
                  ? "Privat"
                  : "Cá nhân"
                : locale === "de"
                  ? "Unternehmen"
                  : "Doanh nghiệp"}
            </label>
          ))}
        </div>
      </div>
      {accountType === "BUSINESS" && (
        <Field label={dict.auth.company} name="companyName" required />
      )}
      <Field
        label={locale === "de" ? "Adresse" : "Địa chỉ"}
        name="address"
        required
      />
      <label className="flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" name="termsAccepted" className="mt-0.5 accent-accent" required />
        <span>
          {locale === "de"
            ? "Ich akzeptiere die AGB und Nutzungsbedingungen."
            : "Tôi đồng ý điều khoản sử dụng (AGB)."}
        </span>
      </label>
      <label className="flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" name="privacyAccepted" className="mt-0.5 accent-accent" required />
        <span>
          {locale === "de"
            ? "Ich habe die Datenschutzerklärung gelesen."
            : "Tôi đã đọc và đồng ý Datenschutz."}
        </span>
      </label>
      {state && !state.ok && (
        <p className="border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {errMsg(state.error, locale)}
        </p>
      )}
      {state?.ok && (
        <p className="border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
          {locale === "de"
            ? "Registrierung erfolgreich. Bitte E-Mail bestätigen."
            : "Đăng ký thành công. Vui lòng xác thực email."}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? dict.common.loading : dict.auth.registerCta}
      </Button>
      <p className="text-center text-sm text-muted">
        {dict.auth.hasAccount}{" "}
        <Link href={localePath(locale, "/login")} className="font-medium text-accent">
          {dict.auth.loginCta}
        </Link>
      </p>
    </form>
  );
}

export function ForgotForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(forgotPasswordAction, null as ActionResult | null);
  return (
    <form action={action} className="mt-8 space-y-4 border border-border bg-card p-6">
      <Field label={dict.auth.email} name="email" type="email" required />
      {state?.ok && (
        <p className="border border-success/30 bg-success/10 px-3 py-2 text-sm text-success">
          {locale === "de"
            ? "Falls die E-Mail existiert, wurde ein Link gesendet."
            : "Nếu email tồn tại, liên kết đã được gửi."}
        </p>
      )}
      {state && !state.ok && (
        <p className="text-sm text-danger">{errMsg(state.error, locale)}</p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? dict.common.loading : locale === "de" ? "Link senden" : "Gửi liên kết"}
      </Button>
    </form>
  );
}

export function ResetForm({
  locale,
  dict,
  token,
}: {
  locale: Locale;
  dict: Dictionary;
  token: string;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(resetPasswordAction, null as ActionResult | null);
  useEffect(() => {
    if (state?.ok) {
      const t = setTimeout(() => router.push(localePath(locale, "/login")), 1200);
      return () => clearTimeout(t);
    }
  }, [state, router, locale]);

  return (
    <form action={action} className="mt-8 space-y-4 border border-border bg-card p-6">
      <input type="hidden" name="token" value={token} />
      <Field label={dict.auth.password} name="password" type="password" required />
      <Field label={dict.auth.confirmPassword} name="confirmPassword" type="password" required />
      {state && !state.ok && (
        <p className="text-sm text-danger">{errMsg(state.error, locale)}</p>
      )}
      {state?.ok && (
        <p className="text-sm text-success">
          {locale === "de" ? "Passwort aktualisiert." : "Đã cập nhật mật khẩu."}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? dict.common.loading : locale === "de" ? "Speichern" : "Lưu mật khẩu"}
      </Button>
    </form>
  );
}
