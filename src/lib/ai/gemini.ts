import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiBriefSchema, aiRecommendationSchema, type AiBrief, type AiRecommendation } from "@/lib/validations/ai";

const SYSTEM_RULES = `
You are PTC Creative AI assistant (Germany): CNC, Werbetechnik, Printing, Branding, Website, Marketing.
Rules:
- Reply in the user locale (vi or de) only.
- NEVER invent prices or discounts.
- NEVER commit to deadlines or legal/tax advice.
- Never claim official legal/tax counsel.
- If unsure, ask follow-up questions.
- Label preliminary recommendations as preliminary.
- Do not request unnecessary personal data.
`;

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced?.[1] ?? text.match(/\{[\s\S]*\}/)?.[0];
  if (!raw) throw new Error("NO_JSON");
  return JSON.parse(raw);
}

export function hasGeminiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

function getModel() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  });
}

export async function streamAssistantReply(opts: {
  locale: "vi" | "de";
  history: { role: "user" | "model"; parts: { text: string }[] }[];
  message: string;
}): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();
  const model = getModel();

  if (!model) {
    const fallback =
      opts.locale === "de"
        ? "Der AI-Dienst ist vorübergehend im Fallback-Modus. PTC Creative bietet CNC, Werbetechnik, Printing, Branding, Website und Marketing. Bitte beschreiben Sie Branche, Standort und Ziel — ohne Preis-/Terminzusagen hier. (Vorläufige Info)"
        : "AI đang ở chế độ fallback. PTC Creative cung cấp CNC, Werbetechnik, Printing, Branding, Website và Marketing. Hãy mô tả ngành, địa điểm và mục tiêu — không có cam kết giá/deadline tại đây. (Thông tin sơ bộ)";
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallback));
        controller.close();
      },
    });
  }

  try {
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_RULES }] },
        {
          role: "model",
          parts: [
            {
              text:
                opts.locale === "de"
                  ? "Verstanden. Ich antworte auf Deutsch und halte die Regeln ein."
                  : "Đã hiểu. Tôi sẽ trả lời đúng locale và tuân thủ quy tắc.",
            },
          ],
        },
        ...opts.history,
      ],
    });

    const result = await chat.sendMessageStream(opts.message);
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const t = chunk.text();
            if (t) controller.enqueue(encoder.encode(t));
          }
          controller.close();
        } catch (e) {
          const msg =
            opts.locale === "de"
              ? "\n\n[Fallback] Stream unterbrochen. Bitte erneut versuchen."
              : "\n\n[Fallback] Stream bị gián đoạn. Vui lòng thử lại.";
          controller.enqueue(encoder.encode(msg));
          controller.close();
        }
      },
    });
  } catch {
    const msg =
      opts.locale === "de"
        ? "AI vorübergehend nicht verfügbar (Fallback)."
        : "AI tạm thời không khả dụng (fallback).";
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(msg));
        controller.close();
      },
    });
  }
}

export async function generateBrief(idea: string, locale: "vi" | "de"): Promise<AiBrief> {
  const fallback: AiBrief = {
    industry: "",
    location: locale === "de" ? "Deutschland" : "Đức",
    requestedServices: ["branding", "website"],
    goals: [locale === "de" ? "Markenaufbau" : "Xây dựng thương hiệu"],
    estimatedScope: [locale === "de" ? "Vorläufige Einschätzung" : "Ước lượng sơ bộ"],
    missingInformation: [
      locale === "de" ? "Budget-Rahmen" : "Khung ngân sách",
      locale === "de" ? "Timeline" : "Timeline",
      locale === "de" ? "Standort" : "Địa điểm",
    ],
    followUpQuestions: [
      locale === "de" ? "Welche Stadt/Region?" : "Thành phố/khu vực nào?",
      locale === "de" ? "Welche Kanäle sind priorisiert?" : "Kênh nào được ưu tiên?",
    ],
  };

  const q = idea.toLowerCase();
  if (q.includes("restaurant") || q.includes("nhà hàng")) {
    fallback.industry = "restaurant";
    fallback.requestedServices = ["branding", "print", "signage", "website", "marketing"];
  } else if (q.includes("nail")) {
    fallback.industry = "nail";
    fallback.requestedServices = ["branding", "signage", "website", "marketing"];
  }

  const model = getModel();
  if (!model) return fallback;

  try {
    const prompt = `${SYSTEM_RULES}
Locale: ${locale}
User free text: """${idea}"""
Return ONLY JSON matching:
{"industry":"","location":"","requestedServices":[],"goals":[],"estimatedScope":[],"missingInformation":[],"followUpQuestions":[]}`;
    const res = await model.generateContent(prompt);
    const parsed = aiBriefSchema.safeParse(extractJson(res.response.text()));
    return parsed.success ? parsed.data : fallback;
  } catch {
    return fallback;
  }
}

export async function generateRecommendation(
  idea: string,
  locale: "vi" | "de"
): Promise<AiRecommendation> {
  const disclaimer =
    locale === "de"
      ? "Vorläufige Empfehlung — keine Preis- oder Terminbindung. Finales Angebot nach Briefing."
      : "Đề xuất sơ bộ — không cam kết giá hoặc deadline. Báo giá chính thức sau brief.";

  const fallback: AiRecommendation = {
    disclaimer,
    services: [
      {
        code: "BRD",
        title: "Branding",
        priority: "high",
        reason: locale === "de" ? "Identitätsbasis" : "Nền tảng nhận diện",
      },
      {
        code: "WEB",
        title: "Website",
        priority: "medium",
        reason: locale === "de" ? "Digitale Präsenz" : "Hiện diện số",
      },
    ],
    roadmap: [
      {
        phase: "1",
        steps: [locale === "de" ? "Brief & Scope" : "Brief & Scope", locale === "de" ? "Konzept" : "Concept"],
      },
      {
        phase: "2",
        steps: [locale === "de" ? "Produktion / Build" : "Sản xuất / Build", locale === "de" ? "Launch" : "Launch"],
      },
    ],
    preparation: [
      locale === "de" ? "Logo/Assets falls vorhanden" : "Logo/asset nếu có",
      locale === "de" ? "Maße / Standortfotos" : "Kích thước / ảnh địa điểm",
    ],
    nextSteps: [
      locale === "de" ? "Brief im Portal speichern" : "Lưu brief trên portal",
      locale === "de" ? "Angebotsanfrage senden" : "Gửi yêu cầu báo giá",
    ],
  };

  const model = getModel();
  if (!model) return fallback;

  try {
    const prompt = `${SYSTEM_RULES}
Locale: ${locale}
Idea: """${idea}"""
Return ONLY JSON:
{"disclaimer":"...","services":[{"code":"","title":"","priority":"high|medium|low","reason":""}],"roadmap":[{"phase":"","steps":[]}],"preparation":[],"nextSteps":[]}
disclaimer must state preliminary recommendation.`;
    const res = await model.generateContent(prompt);
    const parsed = aiRecommendationSchema.safeParse(extractJson(res.response.text()));
    return parsed.success ? parsed.data : fallback;
  } catch {
    return fallback;
  }
}

export async function adminAiTask(
  task: "translate" | "service_desc" | "meta" | "faq" | "blog_outline" | "lead_summary" | "quote_summary" | "lead_score" | "next_action",
  input: string,
  locale: "vi" | "de"
): Promise<string> {
  const model = getModel();
  const prefix =
    locale === "de"
      ? "[Entwurf — Admin-Freigabe erforderlich]\n"
      : "[Bản nháp — cần Admin duyệt]\n";

  if (!model) {
    return prefix + (locale === "de" ? `Fallback für Task ${task}:\n${input.slice(0, 500)}` : `Fallback task ${task}:\n${input.slice(0, 500)}`);
  }

  try {
    const res = await model.generateContent(`${SYSTEM_RULES}
Admin task: ${task}
Locale: ${locale}
Input: """${input}"""
Output plain text. Mark as draft requiring approval. No prices/deadlines.`);
    return prefix + res.response.text();
  } catch {
    return prefix + input.slice(0, 800);
  }
}
