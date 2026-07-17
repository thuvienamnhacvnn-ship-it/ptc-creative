"use client";

import type { CSSProperties, ComponentType } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Radio,
  Send,
} from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { SITE } from "@/lib/constants";
import { localePath, t, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/shared/contact-form";

/**
 * Contact home stage — “Bắt đầu dự án với PTC”
 * · Signal panel (info channels)
 * · Brief form board
 */
export function HomeContact({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.contact;
  const accent = "#34d399";

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="contact-board relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={{ ["--ca"]: accent } as CSSProperties}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#061412]" />
          <div className="absolute -left-[10%] top-[5%] h-[50%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.18),transparent_68%)] blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[45%] w-[40%] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),transparent_70%)] blur-3xl" />
          <div className="contact-board__grid absolute inset-0 opacity-[0.05]" />
        </div>

        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header */}
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="contact-board__ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
                  11 · {dict.nav.contact}
                </p>
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {c.title}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/48">
                {c.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-emerald-300/90 uppercase sm:inline">
                {c.badge}
              </span>
              <Link
                href={localePath(locale, "/contact")}
                className="group inline-flex items-center gap-1.5 border border-white/12 bg-black/30 px-3 py-2 text-sm text-white/60 transition-colors hover:border-emerald-400/40 hover:text-white"
              >
                {dict.common.viewAll}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          {/* Body */}
          <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-12 lg:gap-4">
            {/* Signal / channels */}
            <aside className="flex min-h-0 flex-col gap-2.5 lg:col-span-4 xl:col-span-4">
              <div className="flex shrink-0 items-center gap-2 border border-white/[0.08] bg-black/35 px-3 py-2">
                <Radio className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.75} />
                <p className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
                  {c.infoTitle}
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto no-scrollbar">
                <Channel
                  icon={MapPin}
                  label={c.infoAddress}
                  value={t(SITE.address, locale)}
                />
                <Channel
                  icon={Mail}
                  label={c.infoEmail}
                  value={SITE.email}
                  href={`mailto:${SITE.email}`}
                />
                <Channel
                  icon={Phone}
                  label={c.infoPhone}
                  value={SITE.phone}
                  href={`tel:${SITE.phoneE164}`}
                />
                <div className="border border-white/[0.08] bg-black/30 p-3.5">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5 text-emerald-400/90" />
                    <p className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
                      {c.infoHours}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    {t(SITE.hours, locale)}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/40">
                    Berlin · PTC Creative ·{" "}
                    {locale === "de"
                      ? "Antwort in Geschäftszeiten"
                      : "Phản hồi trong giờ làm việc"}
                  </p>
                </div>
              </div>

              {/* Steps micro */}
              <div className="hidden border border-white/[0.07] bg-white/[0.03] p-3 sm:block">
                <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">
                  {locale === "de" ? "Pipeline" : "Quy trình brief"}
                </p>
                <ol className="mt-2 space-y-1.5 text-[11px] text-white/50">
                  <li className="flex gap-2">
                    <span className="font-mono text-emerald-400/90">01</span>
                    {locale === "de" ? "Brief senden" : "Gửi brief"}
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-emerald-400/90">02</span>
                    {locale === "de"
                      ? "Stack-Richtung in 24–48h"
                      : "Hướng stack trong 24–48h"}
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-emerald-400/90">03</span>
                    {locale === "de"
                      ? "Angebot & Kickoff"
                      : "Báo giá & kickoff"}
                  </li>
                </ol>
              </div>
            </aside>

            {/* Form panel */}
            <div className="flex min-h-0 flex-col border border-white/[0.09] bg-black/40 lg:col-span-8 xl:col-span-8">
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.07] px-4 py-2.5 sm:px-5">
                <div className="flex items-center gap-2">
                  <Send className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.75} />
                  <p className="font-mono text-[10px] tracking-[0.14em] text-white/50 uppercase">
                    {c.badge}
                  </p>
                </div>
                <p className="hidden font-mono text-[10px] text-white/30 sm:block">
                  {locale === "de" ? "Pflichtfelder *" : "Trường bắt buộc *"}
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4 no-scrollbar sm:p-5">
                <ContactForm
                  locale={locale}
                  dict={dict}
                  variant="board"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function Channel({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] tracking-[0.12em] text-white/35 uppercase">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm text-white/85">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "flex items-center gap-3 border border-white/[0.08] bg-black/30 p-3 transition-colors",
          "hover:border-emerald-400/35 hover:bg-emerald-400/[0.04]"
        )}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 border border-white/[0.08] bg-black/30 p-3">
      {inner}
    </div>
  );
}
