"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { localePath, t, cn } from "@/lib/utils";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { ABOUT_LINKS } from "@/data/platform";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { useAi } from "@/components/providers/ai-provider";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setOpen: setAiOpen } = useAi();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: localePath(locale, "/portfolio"), label: dict.nav.portfolio },
    { href: localePath(locale, "/pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "/blog"), label: dict.nav.blog },
    { href: localePath(locale, "/faq"), label: dict.nav.faq },
  ];

  return (
    <header
      className={cn(
        "header-shell sticky top-0 z-50 transition-all duration-300",
        scrolled ? "header-shell--scrolled" : "header-shell--top"
      )}
    >
      <div className="header-shell__line" aria-hidden />

      <div className="mx-auto flex h-[3.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-14 sm:px-6 lg:h-16 lg:px-8">
        <Logo locale={locale} compact />

        <nav className="hidden items-center gap-0.5 xl:flex">
          <NavDropdown
            open={aboutOpen}
            setOpen={setAboutOpen}
            href={localePath(locale, "/about")}
            label={dict.nav.about}
          >
            <div className="header-dropdown w-56">
              {ABOUT_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={localePath(locale, l.href)}
                  className="header-dropdown__item"
                >
                  {t(l.title, locale)}
                </Link>
              ))}
            </div>
          </NavDropdown>

          <NavDropdown
            open={servicesOpen}
            setOpen={setServicesOpen}
            href={localePath(locale, "/services")}
            label={dict.nav.services}
          >
            <div className="header-dropdown w-[min(92vw,42rem)] p-2.5">
              <div className="grid grid-cols-2 gap-1 lg:grid-cols-3">
                {services.map((s, i) => (
                  <Link
                    key={s.slug}
                    href={localePath(locale, `/services/${s.slug}`)}
                    className="header-dropdown__card group/item"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-[#6b8ab0] transition-colors group-hover/item:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] font-medium text-[#d7e4f5] transition-colors group-hover/item:text-white">
                        {t(s.title, locale)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 pl-6 text-[11px] text-[#6b8ab0] transition-colors group-hover/item:text-[#9eb6d4]">
                      {t(s.short, locale)}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                href={localePath(locale, "/services")}
                className="header-dropdown__cta mt-2"
              >
                {dict.nav.allServices} →
              </Link>
            </div>
          </NavDropdown>

          <NavDropdown
            open={solutionsOpen}
            setOpen={setSolutionsOpen}
            href={localePath(locale, "/solutions")}
            label={dict.nav.solutions}
          >
            <div className="header-dropdown w-72">
              <div className="grid grid-cols-2 gap-0.5 p-1">
                {industries.map((i) => (
                  <Link
                    key={i.slug}
                    href={localePath(locale, `/solutions/${i.slug}`)}
                    className="header-dropdown__item"
                  >
                    {t(i.title, locale)}
                  </Link>
                ))}
              </div>
              <Link
                href={localePath(locale, "/solutions")}
                className="header-dropdown__cta mx-1.5 mb-1.5"
              >
                {dict.nav.allSolutions} →
              </Link>
            </div>
          </NavDropdown>

          {links.map((l) => (
            <Link key={l.href} href={l.href} className="header-nav-link">
              <span>{l.label}</span>
              <span className="header-nav-link__bar" aria-hidden />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LocaleSwitcher locale={locale} variant="header" />
          <ThemeToggle variant="header" />

          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className="header-btn header-btn--ghost hidden lg:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover/hbtn:rotate-12 group-hover/hbtn:scale-110" />
            <span>{dict.nav.openAi}</span>
          </button>

          <Link
            href={localePath(locale, "/contact")}
            className="header-btn header-btn--primary hidden sm:inline-flex"
          >
            <span className="header-btn__shine" aria-hidden />
            <span className="relative z-[1]">{dict.nav.getQuote}</span>
          </Link>

          <button
            type="button"
            className="header-btn header-btn--icon xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#1e3a5f]/60 bg-[#07111f]/98 xl:hidden">
          <div className="mx-auto max-h-[70vh] max-w-7xl space-y-0.5 overflow-y-auto px-4 py-3 sm:px-6">
            <MobileGroup label={dict.nav.about}>
              {ABOUT_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={localePath(locale, l.href)}
                  className="block px-3 py-2 text-sm text-[#9eb6d4] transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {t(l.title, locale)}
                </Link>
              ))}
            </MobileGroup>
            <MobileGroup label={dict.nav.services}>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={localePath(locale, `/services/${s.slug}`)}
                  className="block px-3 py-2 text-sm text-[#9eb6d4] transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {t(s.title, locale)}
                </Link>
              ))}
            </MobileGroup>
            <MobileGroup label={dict.nav.solutions}>
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={localePath(locale, `/solutions/${i.slug}`)}
                  className="block px-3 py-2 text-sm text-[#9eb6d4] transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {t(i.title, locale)}
                </Link>
              ))}
            </MobileGroup>
            {[
              ...links,
              { href: localePath(locale, "/contact"), label: dict.nav.contact },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-3 py-2.5 text-sm font-medium text-[#d7e4f5] transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavDropdown({
  open,
  setOpen,
  href,
  label,
  children,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className={cn("header-nav-link header-nav-link--drop", open && "is-open")}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-250",
            open && "rotate-180 text-accent"
          )}
        />
        <span className="header-nav-link__bar" aria-hidden />
      </Link>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2 animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-[#e8eef8]"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180 text-accent")} />
      </button>
      {open && <div className="mb-1 ml-2 border-l border-[#1e3a5f] pl-2">{children}</div>}
    </div>
  );
}
