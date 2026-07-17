import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CircleHelp,
  Factory,
  Layers,
  Mail,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { ABOUT_LINKS, BLOG_CATEGORY_LINKS, PORTFOLIO_LINKS } from "@/data/platform";
import { localePath, t, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

type Props = { locale: Locale; dict: Dictionary };

export function PlatformMap({ locale, dict }: Props) {
  const h = dict.home;
  const pillars = [
    {
      code: "01",
      title: h.mapAbout,
      href: localePath(locale, "/about"),
      icon: Users,
      items: ABOUT_LINKS.map((l) => ({
        href: localePath(locale, l.href),
        label: t(l.title, locale),
      })),
    },
    {
      code: "02",
      title: h.mapServices,
      href: localePath(locale, "/services"),
      icon: Factory,
      items: services.map((s) => ({
        href: localePath(locale, `/services/${s.slug}`),
        label: t(s.title, locale),
      })),
    },
    {
      code: "03",
      title: h.mapSolutions,
      href: localePath(locale, "/solutions"),
      icon: MapPin,
      items: industries.map((i) => ({
        href: localePath(locale, `/solutions/${i.slug}`),
        label: t(i.title, locale),
      })),
    },
    {
      code: "04",
      title: h.mapPortfolio,
      href: localePath(locale, "/portfolio"),
      icon: Layers,
      items: PORTFOLIO_LINKS.map((l) => ({
        href: localePath(locale, l.href),
        label: t(l.title, locale),
      })),
    },
    {
      code: "05",
      title: h.mapPricing,
      href: localePath(locale, "/pricing"),
      icon: Tag,
      items: [
        { href: localePath(locale, "/pricing"), label: h.mapPricingHint },
        { href: localePath(locale, "/contact"), label: dict.nav.getQuote },
      ],
    },
    {
      code: "06",
      title: h.mapBlog,
      href: localePath(locale, "/blog"),
      icon: BookOpen,
      items: BLOG_CATEGORY_LINKS.map((l) => ({
        href: localePath(locale, l.href),
        label: t(l.title, locale),
      })),
    },
    {
      code: "07",
      title: h.mapFaq,
      href: localePath(locale, "/faq"),
      icon: CircleHelp,
      items: [
        { href: localePath(locale, "/faq"), label: h.mapFaqHint },
        { href: localePath(locale, "/contact"), label: dict.nav.contact },
      ],
    },
    {
      code: "08",
      title: h.mapContact,
      href: localePath(locale, "/contact"),
      icon: Mail,
      items: [
        { href: localePath(locale, "/contact"), label: dict.nav.getQuote },
        { href: localePath(locale, "/login"), label: dict.nav.login },
      ],
    },
  ];

  return (
    <Section id="platform" className="border-b border-border">
      <Container>
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="spec mb-3">01 — Platform</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {h.mapTitle}
            </h2>
            <p className="mt-3 text-muted leading-relaxed">{h.mapSubtitle}</p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted uppercase">
            <Briefcase className="h-3.5 w-3.5 text-accent" />
            {h.mapBadge}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.code}
                className="group flex flex-col border border-border bg-card/60 transition-colors hover:border-accent/40 hover:bg-elevated/40"
              >
                <Link
                  href={p.href}
                  className="flex items-start justify-between gap-2 border-b border-border/80 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted">{p.code}</span>
                      <Icon className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <h3 className="mt-1.5 text-sm font-semibold tracking-tight">{p.title}</h3>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                </Link>
                <ul className="flex flex-1 flex-col gap-0.5 px-2 py-2">
                  {p.items.slice(0, 6).map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-2 py-1.5 text-xs text-muted transition-colors",
                          "hover:bg-white/[0.03] hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
