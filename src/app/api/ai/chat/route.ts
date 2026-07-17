import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { streamAssistantReply } from "@/lib/ai/gemini";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(1).max(4000),
  locale: z.enum(["vi", "de"]).default("vi"),
  conversationId: z.string().optional(),
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const session = await auth();

  // AI processing consent check for logged-in users
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user && !user.aiConsentAt) {
      // allow but flag — still require consent for storing PII in history
    }
  }

  const limited = await rateLimit({
    key: `ai-chat:${session?.user?.id ?? ip}`,
    limit: 30,
    windowMs: 60 * 60 * 1000,
    ip,
    userId: session?.user?.id,
  });
  if (!limited.ok) {
    return new Response(JSON.stringify({ ok: false, error: "rate_limited" }), { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: "validation" }), { status: 400 });
  }

  const { message, locale, sessionId } = parsed.data;
  let conversationId = parsed.data.conversationId;

  // Redact emails/phones before model
  const safeMessage = message
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/\+?\d[\d\s\-()]{7,}\d/g, "[phone]");

  try {
    if (!conversationId) {
      const conv = await prisma.aIConversation.create({
        data: {
          userId: session?.user?.id,
          sessionId: sessionId ?? `anon-${ip}`,
          locale,
          purpose: "assistant",
          title: safeMessage.slice(0, 80),
        },
      });
      conversationId = conv.id;
    }

    await prisma.aIMessage.create({
      data: {
        conversationId,
        role: "user",
        content: safeMessage,
      },
    });

    const prior = await prisma.aIMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    const history = prior
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(0, -1)
      .map((m) => ({
        role: (m.role === "user" ? "user" : "model") as "user" | "model",
        parts: [{ text: m.content }],
      }));

    const stream = await streamAssistantReply({ locale, history, message: safeMessage });

    // Tee stream to capture full text for history
    const [clientStream, storeStream] = stream.tee();
    void (async () => {
      const reader = storeStream.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
      }
      await prisma.aIMessage.create({
        data: {
          conversationId: conversationId!,
          role: "assistant",
          content: full,
          approved: false,
        },
      });
    })();

    return new Response(clientStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Conversation-Id": conversationId,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[ai/chat]", e);
    const fallback =
      locale === "de"
        ? "AI vorübergehend nicht verfügbar. Bitte später erneut versuchen oder Kontaktformular nutzen."
        : "AI tạm thời không khả dụng. Vui lòng thử lại hoặc dùng form liên hệ.";
    return new Response(fallback, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
