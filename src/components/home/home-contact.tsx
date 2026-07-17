"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { SITE } from "@/lib/constants";
import { localePath, t } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/shared/contact-form";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeContact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();

  return (
    <Section className="home-stage-fill flex h-full flex-col justify-center border-0 py-0" contained={false}>
      <Container className="home-stage-scroll flex h-full max-h-full flex-col justify-center py-2 sm:py-3">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease }}
          className="mb-4 max-w-2xl sm:mb-5"
        >
          <p className="spec mb-1.5 text-emerald-300">11 — {dict.nav.contact}</p>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
            {dict.contact.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{dict.contact.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <InfoRow
              icon={MapPin}
              label={dict.contact.infoAddress}
              value={t(SITE.address, locale)}
            />
            <InfoRow
              icon={Mail}
              label={dict.contact.infoEmail}
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <InfoRow
              icon={Phone}
              label={dict.contact.infoPhone}
              value={SITE.phone}
              href={`tel:${SITE.phoneE164}`}
            />
            <div className="bg-white/[0.03] p-4">
              <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                {dict.contact.infoHours}
              </p>
              <p className="mt-2 text-sm text-foreground">{t(SITE.hours, locale)}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">Berlin · PTC Creative</p>
            </div>
            <Button
              href={localePath(locale, "/contact")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {dict.home.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white/[0.03] p-5 sm:p-7 lg:col-span-8">
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-elevated/40">
        <Icon className="h-4 w-4 text-accent" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{label}</p>
        <p className="mt-0.5 truncate text-sm text-foreground">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 border border-border bg-card/50 p-3 transition-colors hover:border-accent/40"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 border border-border bg-card/50 p-3">{content}</div>
  );
}
