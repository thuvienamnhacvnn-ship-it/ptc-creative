"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { services } from "@/data/services";
import { SITE } from "@/lib/constants";
import { t, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  locale: Locale;
  dict: Dictionary;
  /** Dark glass style for home stage */
  variant?: "page" | "board";
  className?: string;
};

export function ContactForm({
  locale,
  dict,
  variant = "page",
  className,
}: Props) {
  const c = dict.contact;
  const board = variant === "board";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  // Prefill module from ?module= query when present
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search);
    const mod = q.get("module") ?? "";
    if (mod && services.some((s) => s.slug === mod || s.slug.includes(mod))) {
      const match =
        services.find((s) => s.slug === mod) ??
        services.find((s) => s.slug.includes(mod));
      if (match) setForm((f) => ({ ...f, service: match.slug }));
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center px-6 py-12 text-center sm:py-14",
          board
            ? "border border-emerald-400/25 bg-emerald-500/5"
            : "rounded-2xl border border-border bg-card"
        )}
      >
        <CheckCircle2
          className={cn("h-11 w-11", board ? "text-emerald-400" : "text-accent")}
        />
        <h3
          className={cn(
            "mt-4 text-lg font-semibold sm:text-xl",
            board && "text-white"
          )}
        >
          {c.formSuccessTitle}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-sm text-sm",
            board ? "text-white/55" : "text-muted"
          )}
        >
          {c.formSuccessDesc}
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setStatus("idle");
            setForm({
              name: "",
              email: "",
              phone: "",
              company: "",
              service: "",
              message: "",
            });
          }}
        >
          OK
        </Button>
      </div>
    );
  }

  const field = board
    ? "w-full border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25"
    : "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  const labelCls = board
    ? "mb-1.5 block text-[11px] font-medium tracking-wide text-white/45"
    : "mb-1.5 block text-xs font-medium text-muted";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-3.5",
        board
          ? "p-0"
          : "space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8",
        className
      )}
    >
      {!board && (
        <div className="mb-1">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            {c.badge}
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5">
        <Field label={`${c.formName} *`} labelCls={labelCls}>
          <input
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            autoComplete="name"
          />
        </Field>
        <Field label={`${c.formEmail} *`} labelCls={labelCls}>
          <input
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="email"
          />
        </Field>
        <Field label={c.formPhone} labelCls={labelCls}>
          <input
            className={field}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            autoComplete="tel"
          />
        </Field>
        <Field label={c.formCompany} labelCls={labelCls}>
          <input
            className={field}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            autoComplete="organization"
          />
        </Field>
      </div>

      <Field label={c.formService} labelCls={labelCls}>
        <select
          className={cn(field, board && "bg-black/50")}
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        >
          <option value="">{c.formSelectService}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {t(s.title, locale)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={`${c.formMessage} *`} labelCls={labelCls}>
        <textarea
          className={cn(field, "min-h-[100px] resize-y sm:min-h-[110px]")}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          placeholder={
            locale === "de"
              ? "Branche, Standort, Ziel, Timeline…"
              : "Ngành, địa điểm, mục tiêu, timeline…"
          }
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-400">{c.formError}</p>
      )}

      <div className="flex flex-col gap-2.5 pt-0.5 sm:flex-row sm:items-center sm:justify-between">
        {board ? (
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {dict.common.loading}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {c.formSubmit}
              </>
            )}
          </button>
        ) : (
          <Button type="submit" size="lg" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {dict.common.loading}
              </>
            ) : (
              c.formSubmit
            )}
          </Button>
        )}
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(
            locale === "de" ? "Anfrage PTC Creative" : "Brief PTC Creative"
          )}&body=${encodeURIComponent(form.message || "")}`}
          className={cn(
            "text-center text-xs sm:text-sm",
            board
              ? "text-white/40 hover:text-emerald-300"
              : "text-muted hover:text-accent"
          )}
        >
          {dict.common.or} {SITE.email}
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  labelCls,
  children,
}: {
  label: string;
  labelCls: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}
