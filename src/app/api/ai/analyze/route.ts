import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { generateBrief, generateRecommendation } from "@/lib/ai/gemini";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  idea: z.string().min(5).max(4000),
  locale: z.enum(["vi", "de"]).default("vi"),
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const session = await auth();

  const limited = await rateLimit({
    key: `ai:${session?.user?.id ?? ip}`,
    limit: 20,
    windowMs: 60 * 60 * 1000,
    ip,
    userId: session?.user?.id,
  });
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const brief = await generateBrief(parsed.data.idea, parsed.data.locale);
  const rec = await generateRecommendation(parsed.data.idea, parsed.data.locale);

  try {
    await prisma.aIConversation.create({
      data: {
        userId: session?.user?.id,
        sessionId: parsed.data.sessionId ?? `anon-${ip}`,
        locale: parsed.data.locale,
        purpose: "assistant",
        messages: {
          create: [
            { role: "user", content: parsed.data.idea },
            {
              role: "assistant",
              content: JSON.stringify({ brief, rec }),
              structured: { brief, rec },
              approved: false,
            },
          ],
        },
      },
    });
  } catch {
    // non-fatal
  }

  return NextResponse.json({
    ok: true,
    data: {
      brief: brief,
      modules: brief.requestedServices,
      missing: brief.missingInformation,
      recommendation: rec,
    },
  });
}
