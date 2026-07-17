import { prisma } from "@/lib/prisma";

/**
 * Sliding-window rate limiter backed by Postgres.
 * Fails open if DB is unavailable (logs warning).
 */
export async function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
  ip?: string | null;
  userId?: string | null;
}): Promise<{ ok: boolean; remaining: number }> {
  const since = new Date(Date.now() - opts.windowMs);
  try {
    const count = await prisma.rateLimitHit.count({
      where: {
        key: opts.key,
        createdAt: { gte: since },
        ...(opts.ip ? { ip: opts.ip } : {}),
      },
    });

    if (count >= opts.limit) {
      return { ok: false, remaining: 0 };
    }

    await prisma.rateLimitHit.create({
      data: {
        key: opts.key,
        ip: opts.ip ?? undefined,
        userId: opts.userId ?? undefined,
      },
    });

    // opportunistic cleanup (1% of requests)
    if (Math.random() < 0.01) {
      await prisma.rateLimitHit.deleteMany({
        where: { createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      });
    }

    return { ok: true, remaining: Math.max(0, opts.limit - count - 1) };
  } catch (e) {
    console.warn("[rate-limit] unavailable", e);
    return { ok: true, remaining: opts.limit };
  }
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
