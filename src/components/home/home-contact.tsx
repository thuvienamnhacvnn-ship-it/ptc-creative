"use client";

import type { ComponentType } from "react";
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
 * §11 Contact — lean signal + form on shared space void
 */
export function HomeContact({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.contact;

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div className="contact-board relative flex h-full min-h-0 w-full flex-col">
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="contact-board__ping absolute inset-0 rounded-full bg-accent opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
                  11 · {dict.nav.contact}
                </p>
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {c.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/42">
                {c.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent/90 uppercase sm:inline">
                {c.badge}
              </span>
              <Link
                href={localePath(locale, "/contact")}
                className="group inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/55 transition-colors hover:border-accent/40 hover:text-white"
              >
                {dict.common.viewAll}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          <div className="mt-2.5 grid min-h-0 flex-1 gap-2.5 lg:grid-cols-12 lg:gap-3">
            <aside className="flex min-h-0 flex-col gap-2 lg:col-span-4">
              <div className="flex shrink-0 items-center gap-2 border border-white/[0.08] bg-transparent px-3 py-2">
                <Radio className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                <p className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
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
                <div className="border border-white/[0.08] bg-transparent p-3">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5 text-accent/90" />
                    <p className="font-mono text-[10px] tracking-[0.12em] text-white/35 uppercase">
                      {c.infoHours}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm text-white/75">
                    {t(SITE.hours, locale)}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/35">
                    Berlin · PTC Creative ·{" "}
                    {locale === "de"
                      ? "Antwort in Geschäftszeiten"
                      : "Phản hồi trong giờ làm việc"}
                  </p>
                </div>
              </div>

              <div className="hidden border border-white/[0.07] bg-white/[0.03] p-3 sm:block">
                <p className="font-mono text-[9px] tracking-[0.14em] text-white/30 uppercase">
                  {locale === "de" ? "Pipeline" : "Quy trình brief"}
                </p>
                <ol className="mt-2 space-y-1 text-[11px] text-white/45">
                  <li className="flex gap-2">
                    <span className="font-mono text-accent/90">01</span>
                    {locale === "de" ? "Brief senden" : "Gửi brief"}
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-accent/90">02</span>
                    {locale === "de"
                      ? "Stack-Richtung in 24–48h"
                      : "Hướng stack trong 24–48h"}
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-accent/90">03</span>
                    {locale === "de"
                      ? "Angebot & Kickoff"
                      : "Báo giá & kickoff"}
                  </li>
                </ol>
              </div>
            </aside>

            <div className="flex min-h-0 flex-col border border-white/[0.08] bg-transparent lg:col-span-8">
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.07] px-4 py-2.5 sm:px-5">
                <div className="flex items-center gap-2">
                  <Send className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                  <p className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
                    {c.badge}
                  </p>
                </div>
                <p className="hidden font-mono text-[10px] text-white/28 sm:block">
                  {locale === "de" ? "Pflichtfelder *" : "Trường bắt buộc *"}
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4 no-scrollbar sm:p-5">
                <ContactForm locale={locale} dict={dict} variant="board" />
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
      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/12 bg-white/[0.04] text-white/70">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] tracking-[0.12em] text-white/32 uppercase">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm text-white/80">
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
          "flex items-center gap-3 border border-white/[0.08] bg-transparent p-2.5 transition-colors",
          "hover:border-accent/35 hover:bg-white/[0.03]"
        )}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 border border-white/[0.08] bg-transparent p-2.5">
      {inner}
    </div>
  );
}
