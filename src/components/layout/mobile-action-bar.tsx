"use client";

import Link from "next/link";
import { FlaskConical, MessageSquare, Sparkles, Rocket } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { localePath, cn } from "@/lib/utils";
import { useAi } from "@/components/providers/ai-provider";

export function MobileActionBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { setOpen } = useAi();

  const items = [
    { href: localePath(locale, "/contact"), label: dict.mobile.start, icon: Rocket },
    { href: localePath(locale, "/#project-lab"), label: dict.mobile.lab, icon: FlaskConical },
    { label: dict.mobile.ai, icon: Sparkles, onClick: () => setOpen(true) },
    { href: localePath(locale, "/contact"), label: dict.mobile.contact, icon: MessageSquare },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-[rgba(6,11,20,0.92)] backdrop-blur-xl lg:hidden safe-bottom">
      <nav className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 pt-2">
        {items.map((item) => {
          const Icon = item.icon;
          const className = cn(
            "flex flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[10px] font-medium text-muted transition-colors",
            "hover:text-foreground active:bg-elevated"
          );
          if (item.onClick) {
            return (
              <button key={item.label} type="button" onClick={item.onClick} className={className}>
                <Icon className="h-5 w-5 text-accent" />
                {item.label}
              </button>
            );
          }
          return (
            <Link key={item.label} href={item.href!} className={className}>
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
