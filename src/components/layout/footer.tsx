import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { SITE } from "@/lib/constants";
import { localePath, t } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const nav = [
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/solutions"), label: dict.nav.solutions },
    { href: localePath(locale, "/portfolio"), label: dict.nav.portfolio },
    { href: localePath(locale, "/pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "/blog"), label: dict.nav.blog },
    { href: localePath(locale, "/faq"), label: dict.nav.faq },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  const legal = [
    { href: localePath(locale, "/legal/imprint"), label: dict.footer.imprint },
    { href: localePath(locale, "/legal/privacy"), label: dict.footer.privacy },
    { href: localePath(locale, "/legal/terms"), label: dict.footer.terms },
    { href: localePath(locale, "/legal/cookies"), label: dict.footer.cookies },
  ];

  return (
    <footer className="relative border-t border-border bg-blue-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:pr-16">
        {/* Brand + CTA */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Link href={localePath(locale)} className="inline-flex shrink-0 items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center border border-accent bg-accent text-[9px] font-bold text-white">
                PTC
              </span>
              <span className="text-[13px] font-semibold tracking-tight">PTC Creative</span>
            </Link>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <p className="hidden max-w-sm truncate text-[11px] text-white/40 sm:block">
              Berlin · {dict.footer.tagline}
            </p>
          </div>
          <Button
            href={localePath(locale, "/contact")}
            size="sm"
            className="h-8 w-fit shrink-0 px-3 text-xs"
          >
            {dict.footer.ctaButton}
          </Button>
        </div>

        {/* Compact nav */}
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-3.5">
          {nav.map((l, i) => (
            <span key={l.href} className="inline-flex items-center gap-3">
              {i > 0 && <span className="hidden text-white/15 sm:inline" aria-hidden>
                ·
              </span>}
              <Link
                href={l.href}
                className="text-[12px] text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Contact + legal */}
        <div className="flex flex-col gap-2.5 border-t border-white/10 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-white/35">
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">
              {SITE.email}
            </a>
            <span className="text-white/15">·</span>
            <a href={`tel:${SITE.phoneE164}`} className="transition-colors hover:text-accent">
              {SITE.phone}
            </a>
            <span className="hidden text-white/15 sm:inline">·</span>
            <span className="hidden sm:inline">{t(SITE.hours, locale)}</span>
          </div>

          <div className="flex flex-col gap-1.5 sm:items-end">
            <div className="flex flex-wrap gap-x-2.5 gap-y-1">
              {legal.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono text-[9px] tracking-wider text-white/30 uppercase transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <p className="text-[10px] text-white/30">
              © {year} {SITE.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
