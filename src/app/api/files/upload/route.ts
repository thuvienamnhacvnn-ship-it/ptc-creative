import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sanitizeSvg, storePrivateFile, validateUpload } from "@/lib/upload";
import { hasPermission } from "@/lib/rbac";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !hasPermission(session.user.role, "portal:access")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const ip = clientIp(req.headers);
  const limited = await rateLimit({
    key: `upload:${session.user.id}`,
    limit: 40,
    windowMs: 60 * 60 * 1000,
    ip,
    userId: session.user.id,
  });
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const quoteRequestId = String(form.get("quoteRequestId") ?? "") || undefined;

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }

  const check = validateUpload({ name: file.name, type: file.type, size: file.size });
  if (!check.ok) {
    return NextResponse.json({ ok: false, error: check.error }, { status: 400 });
  }

  if (quoteRequestId) {
    const qr = await prisma.quoteRequest.findUnique({ where: { id: quoteRequestId } });
    if (!qr || qr.userId !== session.user.id) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }
  }

  let buffer = Buffer.from(await file.arrayBuffer());
  if (check.ext === "svg") {
    buffer = Buffer.from(sanitizeSvg(buffer.toString("utf8")), "utf8");
  }

  const stored = await storePrivateFile(buffer, file.name, check.ext);

  const media = await prisma.mediaAsset.create({
    data: {
      userId: session.user.id,
      kind:
        ["jpg", "jpeg", "png", "webp", "svg"].includes(check.ext)
          ? "IMAGE"
          : ["dxf", "dwg"].includes(check.ext)
            ? "CAD"
            : check.ext === "zip"
              ? "ARCHIVE"
              : "DOCUMENT",
      visibility: "PRIVATE",
      filename: file.name,
      storageKey: stored.storageKey,
      mimeType: file.type || "application/octet-stream",
      extension: check.ext,
      sizeBytes: buffer.length,
      url: stored.url,
    },
  });

  if (quoteRequestId) {
    await prisma.quoteRequestFile.create({
      data: { quoteRequestId, mediaId: media.id },
    });
  }

  return NextResponse.json({
    ok: true,
    data: {
      id: media.id,
      filename: media.filename,
      sizeBytes: media.sizeBytes,
      url: media.url,
    },
  });
}
