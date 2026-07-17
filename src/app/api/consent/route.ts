import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clientIp } from "@/lib/rate-limit";

const schema = z.object({
  type: z.enum(["cookies", "privacy", "terms", "ai_processing", "marketing"]),
  granted: z.boolean(),
  version: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await prisma.consentLog.create({
      data: {
        userId: session?.user?.id,
        type: parsed.data.type,
        granted: parsed.data.granted,
        version: parsed.data.version ?? "1.0",
        ip: clientIp(req.headers),
        userAgent: req.headers.get("user-agent")?.slice(0, 300),
      },
    });
  } catch {
    // DB may be offline in local bootstrap
  }

  return NextResponse.json({ ok: true });
}
