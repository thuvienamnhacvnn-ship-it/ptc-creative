"use client";

import Link from "next/link";
import { ArrowUpRight, CircleHelp, MessageCircle, Sparkles } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { faqItems } from "@/data/faq";
import { localePath } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { useAi } from "@/components/providers/ai-provider";

/**
 * §10 FAQ — lean Q&A on shared space void
 */
export function HomeFaq({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { setOpen } = useAi();

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div className="faq-board relative flex h-full min-h-0 w-full flex-col">
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2">
                <CircleHelp
                  className="h-3.5 w-3.5 text-white/50"
                  strokeWidth={1.75}
                />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
                  10 · {dict.nav.faq}
                </p>
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.faq.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/42">
                {dict.faq.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/35 sm:inline">
                {faqItems.length} Q&A
              </span>
              <Link
                href={localePath(locale, "/faq")}
                className="group inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/55 transition-colors hover:border-white/20 hover:text-white"
              >
                {dict.common.viewAll}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          <div className="mt-2.5 grid min-h-0 flex-1 gap-2.5 lg:grid-cols-12 lg:gap-3">
            <div className="flex min-h-0 flex-col overflow-hidden border border-white/[0.08] bg-transparent lg:col-span-8 xl:col-span-9">
              <FaqAccordion
                locale={locale}
                limit={6}
                variant="board"
                className="flex h-full min-h-0 flex-col"
              />
            </div>

            <aside className="flex shrink-0 flex-col gap-2.5 lg:col-span-4 xl:col-span-3">
              <div className="flex flex-1 flex-col border border-white/[0.08] bg-transparent p-4 sm:p-5">
                <span className="flex h-9 w-9 items-center justify-center border border-white/12 bg-white/[0.04] text-white/70">
                  <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-white">
                  {dict.faq.stillTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/42">
                  {locale === "de"
                    ? "Brief in eigenen Worten — AI skizziert Stack und nächste Schritte."
                    : "Gửi brief bằng lời của bạn — AI phác stack và bước tiếp theo."}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mt-4 inline-flex min-h-10 items-center justify-center gap-1.5 bg-accent px-3 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {dict.faq.stillCta}
                </button>
                <Link
                  href={localePath(locale, "/contact")}
                  className="mt-2 inline-flex min-h-10 items-center justify-center gap-1.5 border border-white/12 text-sm text-white/55 transition-colors hover:border-white/22 hover:text-white"
                >
                  {dict.nav.contact}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="hidden border border-white/[0.07] bg-white/[0.03] p-3 sm:block">
                <p className="font-mono text-[9px] tracking-[0.14em] text-white/30 uppercase">
                  {locale === "de" ? "Abdeckung" : "Phạm vi FAQ"}
                </p>
                <ul className="mt-2 space-y-1 text-[11px] text-white/40">
                  <li>· {locale === "de" ? "Fertigung & Timeline" : "Sản xuất & timeline"}</li>
                  <li>· {locale === "de" ? "Web & i18n" : "Website & đa ngôn ngữ"}</li>
                  <li>· {locale === "de" ? "Richtpreise" : "Báo giá tham khảo"}</li>
                  <li>· {locale === "de" ? "Montage DE" : "Lắp đặt tại Đức"}</li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </Section>
  );
}
