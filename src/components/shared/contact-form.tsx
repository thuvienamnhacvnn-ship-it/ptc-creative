"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { services } from "@/data/services";
import { SITE } from "@/lib/constants";
import { t } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contact;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <h3 className="mt-4 text-xl font-semibold">{c.formSuccessTitle}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">{c.formSuccessDesc}</p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
          }}
        >
          OK
        </Button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            {c.formName} *
          </label>
          <input
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            {c.formEmail} *
          </label>
          <input
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            {c.formPhone}
          </label>
          <input
            className={field}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            {c.formCompany}
          </label>
          <input
            className={field}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          {c.formService}
        </label>
        <select
          className={field}
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
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          {c.formMessage} *
        </label>
        <textarea
          className={`${field} min-h-[140px] resize-y`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">{c.formError}</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        <a
          href={`mailto:${SITE.email}?subject=Anfrage%20PTC%20Creative&body=${encodeURIComponent(form.message || "")}`}
          className="text-center text-sm text-muted hover:text-accent"
        >
          {dict.common.or} mailto:{SITE.email}
        </a>
      </div>
    </form>
  );
}
