import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM ?? "PTC Creative <noreply@ptc-creative.de>";

type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(payload: MailPayload): Promise<{ ok: boolean; id?: string }> {
  if (!resendKey) {
    console.info("[email:dev]", {
      to: payload.to,
      subject: payload.subject,
      text: payload.text ?? payload.html.replace(/<[^>]+>/g, " ").slice(0, 500),
    });
    return { ok: true, id: "dev-console" };
  }

  const resend = new Resend(resendKey);
  const result = await resend.emails.send({
    from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  });

  if (result.error) {
    console.error("[email]", result.error);
    return { ok: false };
  }
  return { ok: true, id: result.data?.id };
}

export function verificationEmail(locale: "vi" | "de", name: string, url: string) {
  if (locale === "de") {
    return {
      subject: "E-Mail bestätigen — PTC Creative",
      html: `<p>Hallo ${name},</p><p>bitte bestätigen Sie Ihre E-Mail:</p><p><a href="${url}">${url}</a></p><p>Der Link ist 24 Stunden gültig.</p>`,
      text: `Hallo ${name}, bitte bestätigen Sie Ihre E-Mail: ${url}`,
    };
  }
  return {
    subject: "Xác thực email — PTC Creative",
    html: `<p>Xin chào ${name},</p><p>Vui lòng xác thực email của bạn:</p><p><a href="${url}">${url}</a></p><p>Liên kết có hiệu lực 24 giờ.</p>`,
    text: `Xin chào ${name}, vui lòng xác thực email: ${url}`,
  };
}

export function resetPasswordEmail(locale: "vi" | "de", name: string, url: string) {
  if (locale === "de") {
    return {
      subject: "Passwort zurücksetzen — PTC Creative",
      html: `<p>Hallo ${name},</p><p>Passwort zurücksetzen:</p><p><a href="${url}">${url}</a></p><p>Gültig 1 Stunde. Wenn Sie das nicht waren, ignorieren Sie diese E-Mail.</p>`,
      text: `Hallo ${name}, Passwort zurücksetzen: ${url}`,
    };
  }
  return {
    subject: "Đặt lại mật khẩu — PTC Creative",
    html: `<p>Xin chào ${name},</p><p>Đặt lại mật khẩu tại:</p><p><a href="${url}">${url}</a></p><p>Liên kết có hiệu lực 1 giờ. Nếu không phải bạn, hãy bỏ qua email này.</p>`,
    text: `Xin chào ${name}, đặt lại mật khẩu: ${url}`,
  };
}
