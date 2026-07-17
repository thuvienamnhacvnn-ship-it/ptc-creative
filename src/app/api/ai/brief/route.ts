import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { generateBrief } from "@/lib/ai/gemini";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { aiBriefSchema } from "@/lib/validations/ai";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  idea: z.string().min(5).max(4000),
  locale: z.enum(["vi", "de"]).default("vi"),
});

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const session = await auth();
  const limited = await rateLimit({
    key: `ai-brief:${session?.user?.id ?? ip}`,
    limit: 20,
    windowMs: 60 * 60 * 1000,
    ip,
    userId: session?.user?.id,
  });
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const brief = await generateBrief(parsed.data.idea, parsed.data.locale);
  const validated = aiBriefSchema.safeParse(brief);
  if (!validated.success) {
    return NextResponse.json({ ok: false, error: "invalid_ai_output" }, { status: 502 });
  }

  try {
    const conv = await prisma.aIConversation.create({
      data: {
        userId: session?.user?.id,
        sessionId: `brief-${ip}`,
        locale: parsed.data.locale,
        purpose: "brief",
        title: "AI Brief",
        messages: {
          create: [
            { role: "user", content: parsed.data.idea },
            {
              role: "assistant",
              content: JSON.stringify(validated.data),
              structured: validated.data,
              approved: false,
            },
          ],
        },
      },
    });
    return NextResponse.json({
      ok: true,
      data: validated.data,
      conversationId: conv.id,
      editable: true,
      notice:
        parsed.data.locale === "de"
          ? "Vorläufig — bitte vor dem Senden prüfen und bearbeiten."
          : "Sơ bộ — vui lòng kiểm tra và chỉnh sửa trước khi gửi.",
    });
  } catch {
    return NextResponse.json({
      ok: true,
      data: validated.data,
      editable: true,
    });
  }
}
