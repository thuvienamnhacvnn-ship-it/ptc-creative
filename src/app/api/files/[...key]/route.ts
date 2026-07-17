import { readFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { verifyFileToken } from "@/lib/upload";
import { hasPermission } from "@/lib/rbac";

type Params = { params: Promise<{ key: string[] }> };

export async function GET(req: Request, { params }: Params) {
  const { key } = await params;
  const storageKey = key.map(decodeURIComponent).join("/");
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  const session = await auth();
  const media = await prisma.mediaAsset.findUnique({ where: { storageKey } });
  if (!media) {
    return new Response("Not found", { status: 404 });
  }

  let allowed = false;
  if (media.visibility === "PUBLIC") allowed = true;
  if (session?.user?.id && media.userId === session.user.id) allowed = true;
  if (session?.user?.role && hasPermission(session.user.role, "quotes:manage")) allowed = true;
  if (token) {
    const v = verifyFileToken(token);
    if (v.ok && v.storageKey === storageKey) allowed = true;
  }

  if (!allowed) {
    return new Response("Forbidden", { status: 403 });
  }

  // Never execute — force download for non-images
  const root = process.env.UPLOAD_DIR ?? "./uploads";
  const absolute = path.join(process.cwd(), root, "private", ...storageKey.split("/"));
  try {
    const buf = await readFile(absolute);
    const isImage = media.mimeType.startsWith("image/") && media.extension !== "svg";
    return new Response(buf, {
      headers: {
        "Content-Type": isImage ? media.mimeType : "application/octet-stream",
        "Content-Disposition": `${isImage ? "inline" : "attachment"}; filename="${media.filename}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
