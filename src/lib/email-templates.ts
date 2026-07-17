import type { Locale } from "@/types";

type Mail = { subject: string; html: string; text: string };

function wrap(body: string) {
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.5;color:#121316">${body}<hr style="border:none;border-top:1px solid #e2dfd8;margin:24px 0"/><p style="font-size:12px;color:#6b6e76">PTC Creative · Deutschland</p></div>`;
}

export const emails = {
  verifyAccount(locale: Locale, name: string, url: string): Mail {
    if (locale === "de") {
      return {
        subject: "E-Mail bestätigen — PTC Creative",
        html: wrap(`<p>Hallo ${name},</p><p>bitte bestätigen Sie Ihre E-Mail:</p><p><a href="${url}">${url}</a></p><p>Gültig 24 Stunden.</p>`),
        text: `Hallo ${name}, E-Mail bestätigen: ${url}`,
      };
    }
    return {
      subject: "Xác thực email — PTC Creative",
      html: wrap(`<p>Xin chào ${name},</p><p>Vui lòng xác thực email:</p><p><a href="${url}">${url}</a></p><p>Hiệu lực 24 giờ.</p>`),
      text: `Xin chào ${name}, xác thực email: ${url}`,
    };
  },

  resetPassword(locale: Locale, name: string, url: string): Mail {
    if (locale === "de") {
      return {
        subject: "Passwort zurücksetzen — PTC Creative",
        html: wrap(`<p>Hallo ${name},</p><p><a href="${url}">Passwort zurücksetzen</a></p><p>Gültig 1 Stunde.</p>`),
        text: `Passwort zurücksetzen: ${url}`,
      };
    }
    return {
      subject: "Đặt lại mật khẩu — PTC Creative",
      html: wrap(`<p>Xin chào ${name},</p><p><a href="${url}">Đặt lại mật khẩu</a></p><p>Hiệu lực 1 giờ.</p>`),
      text: `Đặt lại mật khẩu: ${url}`,
    };
  },

  contactReceived(locale: Locale, name: string): Mail {
    if (locale === "de") {
      return {
        subject: "Kontaktanfrage erhalten — PTC Creative",
        html: wrap(`<p>Hallo ${name},</p><p>wir haben Ihre Nachricht erhalten und melden uns in Kürze.</p>`),
        text: `Hallo ${name}, Kontaktanfrage erhalten.`,
      };
    }
    return {
      subject: "Đã nhận liên hệ — PTC Creative",
      html: wrap(`<p>Xin chào ${name},</p><p>Chúng tôi đã nhận tin nhắn và sẽ phản hồi sớm.</p>`),
      text: `Xin chào ${name}, đã nhận liên hệ.`,
    };
  },

  quoteSubmitted(locale: Locale, name: string, reference: string): Mail {
    if (locale === "de") {
      return {
        subject: `Angebotsanfrage ${reference} bestätigt`,
        html: wrap(`<p>Hallo ${name},</p><p>Ihre Anfrage <strong>${reference}</strong> wurde eingereicht.</p>`),
        text: `Anfrage ${reference} eingereicht.`,
      };
    }
    return {
      subject: `Xác nhận yêu cầu ${reference}`,
      html: wrap(`<p>Xin chào ${name},</p><p>Yêu cầu <strong>${reference}</strong> đã được gửi.</p>`),
      text: `Yêu cầu ${reference} đã gửi.`,
    };
  },

  quoteNeedsInfo(locale: Locale, name: string, reference: string, note: string): Mail {
    if (locale === "de") {
      return {
        subject: `Weitere Infos nötig — ${reference}`,
        html: wrap(`<p>Hallo ${name},</p><p>zu ${reference} benötigen wir:</p><p>${note}</p>`),
        text: `Weitere Infos zu ${reference}: ${note}`,
      };
    }
    return {
      subject: `Cần bổ sung thông tin — ${reference}`,
      html: wrap(`<p>Xin chào ${name},</p><p>Với ${reference} chúng tôi cần:</p><p>${note}</p>`),
      text: `Cần bổ sung ${reference}: ${note}`,
    };
  },

  quoteReady(locale: Locale, name: string, reference: string): Mail {
    if (locale === "de") {
      return {
        subject: `Neues Angebot — ${reference}`,
        html: wrap(`<p>Hallo ${name},</p><p>ein Angebot zu ${reference} liegt in Ihrem Workspace bereit.</p>`),
        text: `Neues Angebot zu ${reference}.`,
      };
    }
    return {
      subject: `Báo giá mới — ${reference}`,
      html: wrap(`<p>Xin chào ${name},</p><p>Báo giá cho ${reference} đã có trong Workspace.</p>`),
      text: `Báo giá mới ${reference}.`,
    };
  },

  quoteExpiring(locale: Locale, name: string, reference: string): Mail {
    if (locale === "de") {
      return {
        subject: `Angebot läuft bald ab — ${reference}`,
        html: wrap(`<p>Hallo ${name},</p><p>das Angebot ${reference} läuft bald ab.</p>`),
        text: `Angebot ${reference} läuft bald ab.`,
      };
    }
    return {
      subject: `Báo giá sắp hết hạn — ${reference}`,
      html: wrap(`<p>Xin chào ${name},</p><p>Báo giá ${reference} sắp hết hạn.</p>`),
      text: `Báo giá ${reference} sắp hết hạn.`,
    };
  },

  projectCreated(locale: Locale, name: string, reference: string): Mail {
    if (locale === "de") {
      return {
        subject: `Projekt gestartet — ${reference}`,
        html: wrap(`<p>Hallo ${name},</p><p>Projekt ${reference} wurde angelegt.</p>`),
        text: `Projekt ${reference} gestartet.`,
      };
    }
    return {
      subject: `Dự án mới — ${reference}`,
      html: wrap(`<p>Xin chào ${name},</p><p>Dự án ${reference} đã được tạo.</p>`),
      text: `Dự án ${reference} đã tạo.`,
    };
  },

  projectUpdate(locale: Locale, name: string, title: string, status: string): Mail {
    if (locale === "de") {
      return {
        subject: `Projekt-Update — ${title}`,
        html: wrap(`<p>Hallo ${name},</p><p>Status: <strong>${status}</strong></p>`),
        text: `Projekt ${title}: ${status}`,
      };
    }
    return {
      subject: `Cập nhật dự án — ${title}`,
      html: wrap(`<p>Xin chào ${name},</p><p>Trạng thái: <strong>${status}</strong></p>`),
      text: `Dự án ${title}: ${status}`,
    };
  },

  appointment(locale: Locale, name: string, title: string, when: string): Mail {
    if (locale === "de") {
      return {
        subject: `Termin — ${title}`,
        html: wrap(`<p>Hallo ${name},</p><p>${title}<br/>${when}</p>`),
        text: `Termin ${title} um ${when}`,
      };
    }
    return {
      subject: `Lịch hẹn — ${title}`,
      html: wrap(`<p>Xin chào ${name},</p><p>${title}<br/>${when}</p>`),
      text: `Lịch hẹn ${title} lúc ${when}`,
    };
  },

  adminNewLead(name: string, email: string, source: string): Mail {
    return {
      subject: `[Lead] ${name} — ${source}`,
      html: wrap(`<p>Neuer Lead</p><p>${name} · ${email}<br/>Source: ${source}</p>`),
      text: `Lead ${name} ${email} ${source}`,
    };
  },
};
