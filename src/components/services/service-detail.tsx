"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Check,
  ChevronRight,
  Layers,
  MessageCircle,
  Phone,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { Locale, ServiceItem } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { services } from "@/data/services";
import { getIcon } from "@/lib/icons";
import { localePath, t, tList, cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

/** Icons gợi ý theo keyword submenu */
function subIcon(slug: string, title: string): LucideIcon {
  const s = `${slug} ${title}`.toLowerCase();
  if (s.includes("laser")) return Sparkles;
  if (s.includes("holz") || s.includes("wood") || s.includes("acrylic") || s.includes("acryl"))
    return Boxes;
  if (s.includes("logo") || s.includes("brand") || s.includes("identity")) return Target;
  if (s.includes("web") || s.includes("landing") || s.includes("commerce")) return Layers;
  if (s.includes("ads") || s.includes("seo") || s.includes("social") || s.includes("google"))
    return Sparkles;
  if (s.includes("print") || s.includes("uv") || s.includes("menu") || s.includes("catalogue"))
    return Layers;
  if (s.includes("lightbox") || s.includes("decal") || s.includes("letter") || s.includes("chữ"))
    return Boxes;
  return BadgeCheck;
}

type Props = {
  service: ServiceItem;
  locale: Locale;
  dict: Dictionary;
};

export function ServiceDetail({ service, locale, dict }: Props) {
  const reduce = useReducedMotion();
  const Icon = getIcon(service.icon);
  const color = service.color;
  const caps = tList(service.capabilities, locale);
  const benefits = tList(service.benefits, locale);
  const [activeGallery, setActiveGallery] = useState(0);
  const [activeModule, setActiveModule] = useState(0);

  const related = useMemo(
    () => services.filter((s) => s.slug !== service.slug).slice(0, 3),
    [service.slug]
  );

  const folder =
    service.slug === "cnc-manufacturing" ? "cnc" : service.slug;

  const navItems = [
    { id: "overview", label: locale === "de" ? "Überblick" : "Tổng quan" },
    { id: "modules", label: locale === "de" ? "Module" : "Hạng mục" },
    { id: "scope", label: locale === "de" ? "Leistung" : "Phạm vi" },
    { id: "gallery", label: locale === "de" ? "Galerie" : "Hình ảnh" },
    { id: "consult", label: dict.services.consultCta },
  ];

  return (
    <div className="svc-detail relative pb-28">
      {/* ─── HERO ─── */}
      <header className="relative min-h-[min(78vh,720px)] overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <ServiceImage
            candidates={[service.cover, ...service.gallery]}
            color={color}
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, #03060df2 0%, #03060dd9 38%, ${color}33 72%, #03060dcc 100%), linear-gradient(180deg, #03060d99 0%, transparent 40%, #03060deb 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-tech-grid-fine opacity-[0.08]" />
          {!reduce && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
                <div
                  className="svc-hero-beam h-full w-1/3"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <Container className="relative z-[1] flex min-h-[min(78vh,720px)] flex-col justify-end pb-10 pt-24 sm:pb-14 sm:pt-28">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link
              href={localePath(locale, "/services")}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {dict.nav.services}
            </Link>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              className="lg:col-span-7"
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={stagger}
            >
              <motion.div
                variants={itemUp}
                className="mb-4 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase backdrop-blur-md"
                style={{
                  borderColor: `${color}66`,
                  color,
                  background: `${color}14`,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {dict.services.badge}
              </motion.div>

              <motion.h1
                variants={itemUp}
                className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
              >
                {t(service.title, locale)}
              </motion.h1>

              <motion.div
                variants={itemUp}
                className="mt-4 h-px w-16 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                }}
              />

              <motion.p
                variants={itemUp}
                className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
              >
                {t(service.description, locale)}
              </motion.p>

              <motion.div variants={itemUp} className="mt-5 flex flex-wrap gap-2">
                {service.specs.map((sp) => (
                  <span
                    key={sp}
                    className="border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/65 backdrop-blur-sm"
                  >
                    {sp}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={itemUp} className="mt-8 flex flex-wrap gap-2.5">
                <ConsultButton locale={locale} dict={dict} color={color} />
                <Link
                  href="#modules"
                  className="inline-flex h-11 items-center gap-2 border border-white/20 bg-white/[0.04] px-5 text-sm font-medium text-white/85 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.08]"
                >
                  {locale === "de" ? "Module entdecken" : "Khám phá hạng mục"}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating glass stats */}
            <motion.div
              className="grid grid-cols-2 gap-2 lg:col-span-5"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55, ease }}
            >
              {[
                {
                  k: locale === "de" ? "Module" : "Hạng mục",
                  v: String(service.submenu.length).padStart(2, "0"),
                },
                {
                  k: locale === "de" ? "Leistungen" : "Năng lực",
                  v: String(caps.length).padStart(2, "0"),
                },
                {
                  k: locale === "de" ? "Vorteile" : "Giá trị",
                  v: String(benefits.length).padStart(2, "0"),
                },
                {
                  k: "Hub",
                  v: "Berlin",
                },
              ].map((stat) => (
                <div
                  key={stat.k}
                  className="border border-white/12 bg-black/35 p-4 backdrop-blur-md transition-colors hover:border-white/25"
                >
                  <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
                    {stat.k}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    {stat.v}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </header>

      {/* ─── Sticky sub-nav ─── */}
      <nav className="sticky top-14 z-30 border-b border-border/80 bg-[#060b14]/88 backdrop-blur-xl sm:top-16">
        <Container>
          <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 border border-transparent px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-white/10 hover:text-foreground"
                style={{
                  // accent on hover via CSS var
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${color}55`;
                  e.currentTarget.style.color = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.color = "";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* ─── OVERVIEW strip ─── */}
      <section id="overview" className="scroll-mt-28 border-b border-border">
        <Container className="py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 lg:grid-cols-12"
          >
            <motion.div variants={itemUp} className="lg:col-span-4">
              <p
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color }}
              >
                01 — Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {locale === "de" ? "Fachlicher Überblick" : "Tổng quan chuyên sâu"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(service.short, locale)}
              </p>
            </motion.div>
            <motion.div
              variants={itemUp}
              className="grid gap-3 sm:grid-cols-3 lg:col-span-8"
            >
              {[
                {
                  icon: Layers,
                  title: locale === "de" ? "System" : "Hệ thống",
                  desc:
                    locale === "de"
                      ? "End-to-end vom Briefing bis zur Umsetzung."
                      : "End-to-end từ brief đến triển khai thực tế.",
                },
                {
                  icon: Target,
                  title: locale === "de" ? "Präzision" : "Chính xác",
                  desc:
                    locale === "de"
                      ? "Deutsche Standards, messbare Qualität."
                      : "Chuẩn kỹ thuật Đức, chất lượng đo được.",
                },
                {
                  icon: Sparkles,
                  title: locale === "de" ? "Impact" : "Tác động",
                  desc:
                    locale === "de"
                      ? "Marke sichtbar, messbar, skalierbar."
                      : "Thương hiệu thấy được, đo được, scale được.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group/ov relative overflow-hidden border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.6)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-400 group-hover/ov:scale-x-100"
                    style={{ background: color }}
                  />
                  <card.icon className="h-5 w-5" style={{ color }} />
                  <h3 className="mt-3 text-sm font-semibold">{card.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{card.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ─── MODULES ─── */}
      <section id="modules" className="scroll-mt-28 border-b border-border bg-elevated/20">
        <Container className="py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color }}
              >
                02 — Modules
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {dict.common.features}
              </h2>
              <p className="mt-2 max-w-lg text-sm text-muted">
                {locale === "de"
                  ? "Wählen Sie ein Modul — Fokus und Illustration wechseln mit."
                  : "Chọn hạng mục — nội dung và hình minh họa đổi theo."}
              </p>
            </div>
            <span className="font-mono text-[10px] text-muted uppercase">
              {String(activeModule + 1).padStart(2, "0")} /{" "}
              {String(service.submenu.length).padStart(2, "0")}
            </span>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-12">
            {/* Module list */}
            <motion.div
              className="flex flex-col gap-1.5 lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {service.submenu.map((sub, i) => {
                const SubIcon = subIcon(sub.slug, t(sub.title, locale));
                const on = i === activeModule;
                return (
                  <motion.button
                    key={sub.slug}
                    type="button"
                    variants={itemUp}
                    onClick={() => setActiveModule(i)}
                    id={sub.slug}
                    className={cn(
                      "group/mod flex scroll-mt-32 items-center gap-3 border px-3 py-3 text-left transition-all duration-300",
                      on
                        ? "border-transparent bg-card shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]"
                        : "border-border bg-transparent hover:border-white/15 hover:bg-card/40"
                    )}
                    style={
                      on
                        ? {
                            boxShadow: `inset 3px 0 0 ${color}, 0 12px 40px -20px ${color}55`,
                          }
                        : undefined
                    }
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300",
                        on
                          ? "border-transparent text-white"
                          : "border-border text-muted group-hover/mod:text-foreground"
                      )}
                      style={on ? { background: color } : undefined}
                    >
                      <SubIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "truncate text-sm font-semibold",
                            on ? "text-foreground" : "text-foreground/85"
                          )}
                        >
                          {t(sub.title, locale)}
                        </span>
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-all",
                        on ? "translate-x-0.5 opacity-100" : "opacity-30"
                      )}
                      style={on ? { color } : undefined}
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Active module panel */}
            <div className="relative min-h-[280px] overflow-hidden border border-border bg-card lg:col-span-7">
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse 70% 60% at 80% 20%, ${color}55, transparent 60%)`,
                }}
              />
              <div className="relative grid h-full gap-0 sm:grid-cols-2">
                <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-full">
                  <ServiceImage
                    candidates={[
                      service.gallery[activeModule % service.gallery.length],
                      service.cover,
                      ...service.gallery,
                    ]}
                    color={color}
                    alt={t(service.submenu[activeModule].title, locale)}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, transparent 40%, #0c1524ee 100%)`,
                    }}
                  />
                </div>
                <div className="relative flex flex-col justify-center p-5 sm:p-6 lg:p-7">
                  <p
                    className="font-mono text-[10px] tracking-[0.16em] uppercase"
                    style={{ color }}
                  >
                    Module {String(activeModule + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    {t(service.submenu[activeModule].title, locale)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t(service.short, locale)}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {caps.slice(0, 3).map((c) => (
                      <li key={c} className="flex gap-2 text-xs text-muted sm:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <ConsultButton
                    locale={locale}
                    dict={dict}
                    color={color}
                    className="mt-6 w-fit"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── SCOPE ─── */}
      <section id="scope" className="scroll-mt-28 border-b border-border">
        <Container className="py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <p
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color }}
            >
              03 — Scope & Value
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.common.capabilities} & {dict.common.benefits}
            </h2>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="border border-border bg-card p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4" style={{ color }} />
                <h3 className="text-lg font-semibold">{dict.common.capabilities}</h3>
              </div>
              <ul className="space-y-2.5">
                {caps.map((c, i) => (
                  <motion.li
                    key={c}
                    variants={itemUp}
                    className="group/cap flex gap-3 border border-transparent px-2 py-2 transition-all hover:border-border hover:bg-elevated/40"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center font-mono text-[10px]"
                      style={{ color, background: `${color}18` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-muted group-hover/cap:text-foreground">
                      {c}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="border border-border bg-card p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" style={{ color }} />
                <h3 className="text-lg font-semibold">{dict.common.benefits}</h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {benefits.map((b) => (
                  <motion.div
                    key={b}
                    variants={itemUp}
                    className="relative overflow-hidden border border-border bg-elevated/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
                  >
                    <div
                      className="absolute left-0 top-0 h-full w-0.5"
                      style={{ background: color }}
                    />
                    <Check className="mb-2 h-4 w-4" style={{ color }} />
                    <p className="text-sm leading-relaxed text-muted">{b}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── GALLERY bento ─── */}
      <section id="gallery" className="scroll-mt-28 border-b border-border bg-elevated/15">
        <Container className="py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color }}
              >
                04 — Gallery
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {locale === "de" ? "Referenzbilder" : "Hình ảnh minh họa"}
              </h2>
            </div>
            <p className="font-mono text-[10px] text-muted">
              /media/services/{folder}/
            </p>
          </motion.div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {service.gallery.slice(0, 4).map((src, i) => {
              const featured = i === activeGallery;
              return (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => setActiveGallery(i)}
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease }}
                  className={cn(
                    "group/gal relative overflow-hidden border border-border bg-card text-left",
                    i === 0
                      ? "aspect-[16/10] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[320px]"
                      : "aspect-[4/3]",
                    featured && "ring-1"
                  )}
                  style={
                    featured
                      ? { outline: `1px solid ${color}` }
                      : undefined
                  }
                >
                  <ServiceImage
                    candidates={[src, src.replace(".png", ".jpg"), service.cover]}
                    color={color}
                    alt={`${t(service.title, locale)} ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/gal:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
                    <span
                      className="font-mono text-[10px] tracking-wider uppercase"
                      style={{ color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="translate-y-1 text-xs text-white/0 transition-all group-hover/gal:translate-y-0 group-hover/gal:text-white/80">
                      View
                    </span>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-400 group-hover/gal:scale-x-100"
                    style={{ background: color }}
                  />
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── RELATED ─── */}
      <section className="border-b border-border">
        <Container className="py-12 sm:py-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                Related
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {locale === "de" ? "Weitere Leistungen" : "Dịch vụ liên quan"}
              </h2>
            </div>
            <Link
              href={localePath(locale, "/services")}
              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
            >
              {dict.nav.allServices}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((s) => {
              const RIcon = getIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={localePath(locale, `/services/${s.slug}`)}
                  className="group/rel flex items-center gap-3 border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center border"
                    style={{ borderColor: `${s.color}55`, color: s.color, background: `${s.color}14` }}
                  >
                    <RIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold group-hover/rel:text-white">
                      {t(s.title, locale)}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted">
                      {t(s.short, locale)}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover/rel:translate-x-0.5 group-hover/rel:-translate-y-0.5 group-hover/rel:text-accent" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── CONSULT band ─── */}
      <section id="consult" className="scroll-mt-28">
        <Container className="py-12 sm:py-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="relative overflow-hidden border p-6 sm:p-8 lg:p-10"
            style={{
              borderColor: `${color}40`,
              background: `linear-gradient(125deg, ${color}18 0%, #0a1220 45%, #060b14 100%)`,
            }}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `${color}33` }} />
            <div className="pointer-events-none absolute inset-0 bg-tech-grid-fine opacity-[0.06]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color }}
                >
                  Consult · Berlin
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {dict.services.consultTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {dict.services.consultSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ConsultButton locale={locale} dict={dict} color={color} large />
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="inline-flex h-12 items-center gap-2 border border-white/15 bg-black/30 px-5 text-sm font-medium text-white/85 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
                >
                  <Phone className="h-4 w-4" style={{ color }} />
                  {SITE.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Sticky consult */}
      <div className="fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-5 lg:bottom-8 lg:right-6">
        <a
          href={`tel:${SITE.phoneE164}`}
          className="flex h-11 w-11 items-center justify-center border border-white/15 bg-[#060b14]/92 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105"
          style={{ boxShadow: `0 8px 28px -8px ${color}88` }}
          aria-label="Call"
        >
          <Phone className="h-4 w-4" style={{ color }} />
        </a>
        <Link
          href={localePath(locale, "/contact")}
          className="svc-consult-fab inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.03]"
          style={{
            background: color,
            borderColor: color,
            boxShadow: `0 12px 32px -10px ${color}aa`,
          }}
        >
          <MessageCircle className="h-4 w-4" />
          {dict.services.consultCta}
        </Link>
      </div>
    </div>
  );
}

function ConsultButton({
  locale,
  dict,
  color,
  large,
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  color: string;
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={localePath(locale, "/contact")}
      className={cn(
        "group/cbtn relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold text-white transition-all hover:brightness-110",
        large ? "h-12 px-6 text-base" : "h-11 px-5 text-sm",
        className
      )}
      style={{
        background: color,
        boxShadow: `0 10px 28px -10px ${color}99`,
      }}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover/cbtn:translate-x-full" />
      <MessageCircle className="relative h-4 w-4" />
      <span className="relative">{dict.services.consultCta}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform group-hover/cbtn:translate-x-0.5" />
    </Link>
  );
}

function ServiceImage({
  candidates,
  color,
  alt,
  className,
}: {
  candidates: string[];
  color: string;
  alt: string;
  className?: string;
}) {
  const list = candidates.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(list.length === 0);
  const src = !failed ? list[idx] : null;

  const onError = useCallback(() => {
    setIdx((i) => {
      if (i + 1 < list.length) return i + 1;
      setFailed(true);
      return i;
    });
  }, [list.length]);

  if (!src) {
    return (
      <div
        className={cn(className, "flex items-center justify-center font-mono text-[10px] uppercase")}
        style={{
          background: `linear-gradient(145deg, ${color}40, #070c16 70%)`,
          color: `${color}cc`,
        }}
      >
        media
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={src} src={src} alt={alt} className={className} onError={onError} />
  );
}
