"use client";

import { use, useActionState, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { upsertQuoteRequestAction } from "@/actions/quotes";
import type { ActionResult } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/types";

const CATEGORIES = ["CNC", "WERBETECHNIK", "PRINTING", "BRANDING", "WEBSITE", "MARKETING"] as const;

export default function NewQuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  if (!isLocale(raw)) return null;
  const locale = raw as Locale;
  const router = useRouter();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("CNC");
  const [state, action, pending] = useActionState(
    async (prev: ActionResult | null, fd: FormData) => {
      const res = await upsertQuoteRequestAction(prev, fd);
      if (res.ok && res.id) {
        router.push(localePath(locale, `/dashboard/quotes/${res.id}`));
      }
      return res;
    },
    null as ActionResult | null
  );

  const isProd = category === "CNC" || category === "PRINTING" || category === "WERBETECHNIK";

  const labels = useMemo(
    () =>
      locale === "de"
        ? {
            title: "Neue Angebotsanfrage",
            cat: "Leistungsgruppe",
            saveDraft: "Als Entwurf",
            submit: "Absenden",
            product: "Produkttyp",
            material: "Material",
            finish: "Finish",
          }
        : {
            title: "Yêu cầu báo giá mới",
            cat: "Nhóm dịch vụ",
            saveDraft: "Lưu nháp",
            submit: "Gửi yêu cầu",
            product: "Loại sản phẩm",
            material: "Vật liệu",
            finish: "Hoàn thiện",
          },
    [locale]
  );

  return (
    <div className="border-b border-border py-10">
      <Container className="max-w-3xl">
        <p className="spec">Quote Request</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{labels.title}</h1>

        <form action={action} className="mt-8 space-y-6 border border-border bg-card p-6">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="categoryCode" value={category} />

          <div>
            <label className="spec mb-2 block">{labels.cat}</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`border px-3 py-1.5 font-mono text-xs ${
                    category === c ? "border-accent bg-accent-muted text-accent" : "border-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <Field name="title" label={locale === "de" ? "Titel" : "Tiêu đề"} required />
          <Field name="description" label={locale === "de" ? "Beschreibung" : "Mô tả"} textarea />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="budgetRange" label={locale === "de" ? "Budget" : "Ngân sách"} />
            <Field name="timeline" label="Timeline" />
            <Field name="companyName" label={locale === "de" ? "Unternehmen" : "Công ty"} />
            <Field name="contactPhone" label={locale === "de" ? "Telefon" : "Điện thoại"} />
            <Field name="location" label={locale === "de" ? "Standort" : "Địa điểm"} />
            <Field name="deadline" label="Deadline" type="date" />
          </div>

          {isProd && (
            <div className="space-y-4 border-t border-border pt-4">
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">
                Production specs
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="productType" label={labels.product} required />
                <Field name="material" label={labels.material} required />
                <Field name="widthMm" label="Width (mm)" type="number" required />
                <Field name="heightMm" label="Height (mm)" type="number" required />
                <Field name="depthMm" label="Depth (mm)" type="number" />
                <Field name="thicknessMm" label={locale === "de" ? "Dicke (mm)" : "Độ dày (mm)"} type="number" required />
                <Field name="quantity" label={locale === "de" ? "Menge" : "Số lượng"} type="number" required />
                <Field name="color" label={locale === "de" ? "Farbe" : "Màu sắc"} required />
                <Field name="processType" label={locale === "de" ? "Bearbeitung" : "Kiểu gia công"} required />
                <Field name="finish" label={labels.finish} required />
                <Field name="designFileNote" label={locale === "de" ? "Designdatei" : "File thiết kế"} />
                <div>
                  <label className="spec mb-1.5 block">
                    {locale === "de" ? "Lieferung / Montage" : "Giao hàng / Lắp đặt"}
                  </label>
                  <select name="deliveryMode" className="h-11 w-full border border-border bg-background px-3 text-sm">
                    <option value="delivery">{locale === "de" ? "Lieferung" : "Giao hàng"}</option>
                    <option value="installation">{locale === "de" ? "Montage" : "Lắp đặt"}</option>
                    <option value="pickup">{locale === "de" ? "Abholung" : "Nhận tại xưởng"}</option>
                  </select>
                </div>
              </div>
              <Field name="notes" label={locale === "de" ? "Notizen" : "Ghi chú"} textarea />
            </div>
          )}

          {category === "WEBSITE" && (
            <div className="space-y-4 border-t border-border pt-4">
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">Website</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="industry" label={locale === "de" ? "Branche" : "Ngành nghề"} required />
                <div>
                  <label className="spec mb-1.5 block">{locale === "de" ? "Website-Typ" : "Loại website"}</label>
                  <select name="siteType" className="h-11 w-full border border-border bg-background px-3 text-sm">
                    <option value="corporate">Corporate</option>
                    <option value="landing">Landing</option>
                    <option value="booking">Booking</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="redesign">Redesign</option>
                  </select>
                </div>
                <Field name="pageCount" label={locale === "de" ? "Seitenanzahl" : "Số trang"} type="number" required />
                <Field name="budget" label={locale === "de" ? "Budget" : "Ngân sách"} />
                <Field name="referenceSites" label={locale === "de" ? "Referenz-Websites" : "Website tham khảo"} />
              </div>
              <CheckboxGroup
                name="goals"
                label={locale === "de" ? "Ziele" : "Mục tiêu"}
                options={["leads", "brand", "booking", "sales"]}
              />
              <CheckboxGroup
                name="features"
                label={locale === "de" ? "Features" : "Tính năng"}
                options={["cms", "multilang", "seo", "forms", "booking", "shop"]}
              />
              <CheckboxGroup
                name="languages"
                label={locale === "de" ? "Sprachen" : "Ngôn ngữ"}
                options={["de", "vi", "en"]}
              />
            </div>
          )}

          {category === "MARKETING" && (
            <div className="space-y-4 border-t border-border pt-4">
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">Marketing</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="industry" label={locale === "de" ? "Branche" : "Ngành"} required />
                <Field name="customerArea" label={locale === "de" ? "Zielregion" : "Khu vực khách"} required />
                <Field name="websiteUrl" label="Website" />
                <Field name="adBudget" label={locale === "de" ? "Ad-Budget" : "Ngân sách ads"} />
                <Field name="campaignDuration" label={locale === "de" ? "Kampagnendauer" : "Thời gian chiến dịch"} />
              </div>
              <CheckboxGroup name="goals" label={locale === "de" ? "Ziele" : "Mục tiêu"} options={["awareness", "leads", "traffic", "retention"]} />
              <CheckboxGroup name="currentChannels" label={locale === "de" ? "Aktuelle Kanäle" : "Kênh hiện tại"} options={["google", "meta", "instagram", "offline", "none"]} />
              <CheckboxGroup name="kpis" label="KPI" options={["cpl", "roas", "traffic", "bookings"]} />
            </div>
          )}

          {category === "BRANDING" && (
            <div className="space-y-4 border-t border-border pt-4">
              <Field name="projectScope" label={locale === "de" ? "Scope" : "Phạm vi"} required />
              <div>
                <label className="spec mb-1.5 block">{locale === "de" ? "Bestehende Marke" : "Brand hiện có"}</label>
                <select name="hasExistingBrand" className="h-11 w-full border border-border bg-background px-3 text-sm">
                  <option value="no">No</option>
                  <option value="partial">Partial</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <CheckboxGroup name="deliverables" label="Deliverables" options={["logo", "ci", "guidelines", "packaging", "stationery"]} />
            </div>
          )}

          {state && !state.ok && (
            <p className="border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {state.error === "validation"
                ? locale === "de"
                  ? "Bitte Pflichtfelder prüfen."
                  : "Vui lòng kiểm tra các trường bắt buộc."
                : state.error}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              type="submit"
              disabled={pending}
              variant="outline"
              onClick={() => {
                const el = document.getElementById("quote-status") as HTMLInputElement | null;
                if (el) el.value = "DRAFT";
              }}
            >
              {labels.saveDraft}
            </Button>
            <Button
              type="submit"
              disabled={pending}
              onClick={() => {
                const el = document.getElementById("quote-status") as HTMLInputElement | null;
                if (el) el.value = "SUBMITTED";
              }}
            >
              {pending ? "…" : labels.submit}
            </Button>
          </div>
          <input type="hidden" name="status" id="quote-status" defaultValue="DRAFT" />
        </form>
      </Container>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="spec mb-1.5 block" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          className="w-full border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className="h-11 w-full border border-border bg-background px-3 text-sm outline-none ring-accent focus:ring-2"
        />
      )}
    </div>
  );
}

function CheckboxGroup({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div>
      <p className="spec mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-1.5 border border-border px-2 py-1.5 text-xs">
            <input type="checkbox" name={name} value={o} className="accent-accent" />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}
