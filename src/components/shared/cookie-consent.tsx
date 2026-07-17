"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";
import { localePath } from "@/lib/utils";

const KEY = "ptc-cookie-consent-v1";

export function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = async (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "essential");
    } catch {
      /* ignore */
    }
    setVisible(false);
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "cookies", granted, version: "1.0" }),
    }).catch(() => null);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-card p-4 shadow-craft sm:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {locale === "de"
            ? "Wir verwenden Cookies für essenzielle Funktionen und optional Analytics. Details in der "
            : "Chúng tôi dùng cookie cho chức năng thiết yếu và analytics tuỳ chọn. Chi tiết tại "}
          <Link href={localePath(locale, "/legal/privacy")} className="text-accent underline">
            Datenschutz
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => void save(false)}>
            {locale === "de" ? "Nur essenziell" : "Chỉ thiết yếu"}
          </Button>
          <Button size="sm" onClick={() => void save(true)}>
            {locale === "de" ? "Akzeptieren" : "Đồng ý"}
          </Button>
        </div>
      </div>
    </div>
  );
}
