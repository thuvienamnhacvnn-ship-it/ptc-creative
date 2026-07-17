import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function audit(opts: {
  userId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  meta?: Prisma.InputJsonValue;
  ip?: string | null;
  quoteRequestId?: string | null;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: opts.userId ?? undefined,
        action: opts.action,
        entity: opts.entity,
        entityId: opts.entityId,
        meta: opts.meta,
        ip: opts.ip ?? undefined,
        quoteRequestId: opts.quoteRequestId ?? undefined,
      },
    });
  } catch (e) {
    console.warn("[audit]", e);
  }
}
