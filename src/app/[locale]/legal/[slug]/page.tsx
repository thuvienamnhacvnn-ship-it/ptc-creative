import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getLegal, dbAvailable } from "@/lib/cms";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/types";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  let page: Awaited<ReturnType<typeof getLegal>> = null;
  if (await dbAvailable()) {
    page = await getLegal(slug, locale);
  }

  if (!page) {
    // Fallback legal stubs when DB empty
    const stubs: Record<string, { vi: { title: string; body: string }; de: { title: string; body: string } }> = {
      privacy: {
        vi: {
          title: "Datenschutz",
          body: "Chính sách bảo mật PTC Creative (mẫu GDPR). Cập nhật qua CMS Admin trước production.",
        },
        de: {
          title: "Datenschutzerklärung",
          body: "Datenschutzerklärung PTC Creative (DSGVO-Muster). Vor Produktion im Admin CMS aktualisieren.",
        },
      },
      imprint: {
        vi: { title: "Impressum", body: "Impressum theo pháp luật Đức — bổ sung thông tin pháp lý thực tế." },
        de: { title: "Impressum", body: "Impressum nach DE-Recht — mit echten Firmendaten ersetzen." },
      },
      terms: {
        vi: { title: "AGB", body: "Điều khoản sử dụng (AGB) mẫu cho nền tảng PTC Creative." },
        de: { title: "AGB", body: "Allgemeine Geschäftsbedingungen (Muster) der PTC Creative Plattform." },
      },
      cookies: {
        vi: { title: "Cookie Settings", body: "Cài đặt cookie — thiết yếu luôn bật; analytics tuỳ chọn." },
        de: { title: "Cookie-Einstellungen", body: "Cookie-Einstellungen — essenziell immer an; Analytics optional." },
      },
    };
    const s = stubs[slug];
    if (!s) notFound();
    page = { title: s[locale].title, body: s[locale].body, slug, seo: null };
  }

  return (
    <div className="border-b border-border py-14">
      <Container className="max-w-3xl">
        <p className="spec">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{page.title}</h1>
        <div className="prose-ptc mt-8 whitespace-pre-wrap text-sm">{page.body}</div>
      </Container>
    </div>
  );
}
