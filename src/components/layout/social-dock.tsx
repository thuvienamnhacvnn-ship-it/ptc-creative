"use client";

import { Phone, Sparkles } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useAi } from "@/components/providers/ai-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

type DockItem = {
  id: string;
  label: { vi: string; de: string };
  href?: string;
  onClick?: () => void;
  external?: boolean;
  accent?: boolean;
  icon: React.ReactNode;
};

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14 8h2.5V5.5H14c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5V13H10.5v6h3v-6H16l.5-2.5H13.5V9c0-.55.45-1 1-1z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 4c.4 2.2 1.9 3.8 4 4.2v2.4c-1.4-.05-2.7-.5-3.8-1.3v5.9c0 3.4-2.7 6.1-6.1 6.1S4.5 18.6 4.5 15.2s2.7-6.1 6.1-6.1c.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.1-.9-.1-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5V4h2.4z" />
    </svg>
  );
}

function IconZalo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3.2C7.05 3.2 3 6.7 3 11c0 2.4 1.25 4.55 3.2 6l-.7 3.3 3.55-1.15c.9.25 1.85.4 2.95.4 4.95 0 9-3.5 9-7.8S16.95 3.2 12 3.2zm4.35 10.55h-2.1l-2.35-3.05v3.05H9.65V8.9h2.1l2.35 3.05V8.9h2.25v4.85z" />
    </svg>
  );
}

export function SocialDock({ locale }: { locale: Locale }) {
  const { setOpen } = useAi();
  const tel = SITE.phoneE164 || SITE.phone.replace(/[^\d+]/g, "");

  const items: DockItem[] = [
    {
      id: "phone",
      label: { vi: "Gọi điện", de: "Anrufen" },
      href: `tel:${tel}`,
      icon: <Phone className="h-4 w-4" strokeWidth={1.75} />,
    },
    {
      id: "zalo",
      label: { vi: "Zalo", de: "Zalo" },
      href: SITE.social.zalo,
      external: true,
      icon: <IconZalo className="h-4 w-4" />,
    },
    {
      id: "facebook",
      label: { vi: "Facebook", de: "Facebook" },
      href: SITE.social.facebook,
      external: true,
      icon: <IconFacebook className="h-4 w-4" />,
    },
    {
      id: "instagram",
      label: { vi: "Instagram", de: "Instagram" },
      href: SITE.social.instagram,
      external: true,
      icon: <IconInstagram className="h-4 w-4" />,
    },
    {
      id: "tiktok",
      label: { vi: "TikTok", de: "TikTok" },
      href: SITE.social.tiktok,
      external: true,
      icon: <IconTikTok className="h-4 w-4" />,
    },
    {
      id: "ai",
      label: { vi: "Trợ lý ảo", de: "AI-Assistent" },
      onClick: () => setOpen(true),
      accent: true,
      icon: <Sparkles className="h-4 w-4" strokeWidth={1.75} />,
    },
  ];

  return (
    <aside
      aria-label={locale === "de" ? "Schnellkontakt" : "Liên hệ nhanh"}
      className={cn(
        "fixed right-0 top-1/2 z-40 -translate-y-1/2",
        "flex flex-col border border-r-0 border-border bg-[#0a1220]/95 shadow-craft backdrop-blur-md",
        /* clear mobile bottom bar */
        "max-lg:bottom-20 max-lg:top-auto max-lg:translate-y-0"
      )}
    >
      {items.map((item, i) => {
        const label = item.label[locale];
        const base = cn(
          "group relative flex h-11 w-11 items-center justify-center border-b border-border text-foreground/75 transition-colors last:border-b-0",
          "hover:bg-elevated hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
          item.accent && "bg-accent text-white hover:bg-accent-hover hover:text-white"
        );

        const tooltip = (
          <span
            className={cn(
              "pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap",
              "border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground shadow-craft",
              "opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            )}
          >
            {label}
          </span>
        );

        if (item.onClick) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={base}
              aria-label={label}
              title={label}
            >
              {tooltip}
              {item.icon}
            </button>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            className={base}
            aria-label={label}
            title={label}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : undefined)}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {tooltip}
            {item.icon}
          </a>
        );
      })}
    </aside>
  );
}
