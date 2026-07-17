import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { generateRecommendation } from "@/lib/ai/gemini";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { aiRecommendationSchema } from "@/lib/validations/ai";

const bodySchema = z.object({
  idea: z.string().min(5).max(4000),
  locale: z.enum(["vi", "de"]).default("vi"),
});

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const session = await auth();
  const limited = await rateLimit({
    key: `ai-rec:${session?.user?.id ?? ip}`,
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

  const rec = await generateRecommendation(parsed.data.idea, parsed.data.locale);
  const validated = aiRecommendationSchema.safeParse(rec);
  if (!validated.success) {
    return NextResponse.json({ ok: false, error: "invalid_ai_output" }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: validated.data,
    preliminary: true,
  });
}
