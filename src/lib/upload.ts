import { createHash, randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const ALLOWED_EXTENSIONS = [
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "svg",
  "ai",
  "eps",
  "psd",
  "dxf",
  "dwg",
  "zip",
] as const;

export const ALLOWED_MIME: Record<string, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  webp: ["image/webp"],
  svg: ["image/svg+xml"],
  ai: ["application/postscript", "application/pdf", "application/illustrator"],
  eps: ["application/postscript", "application/eps", "image/x-eps"],
  psd: ["image/vnd.adobe.photoshop", "application/x-photoshop", "application/octet-stream"],
  dxf: ["application/dxf", "image/vnd.dxf", "application/octet-stream"],
  dwg: ["application/acad", "image/vnd.dwg", "application/octet-stream"],
  zip: ["application/zip", "application/x-zip-compressed"],
};

export function maxUploadBytes(): number {
  const mb = Number(process.env.MAX_UPLOAD_MB ?? "15");
  return Math.max(1, mb) * 1024 * 1024;
}

export function getExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function validateUpload(file: {
  name: string;
  type: string;
  size: number;
}): { ok: true; ext: string } | { ok: false; error: string } {
  const ext = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
    return { ok: false, error: "extension_not_allowed" };
  }
  const mimes = ALLOWED_MIME[ext] ?? [];
  // Some CAD browsers send empty/octet-stream — allow octet-stream for CAD/archive only
  if (file.type && !mimes.includes(file.type) && file.type !== "application/octet-stream") {
    return { ok: false, error: "mime_not_allowed" };
  }
  if (file.size > maxUploadBytes()) {
    return { ok: false, error: "file_too_large" };
  }
  if (file.size <= 0) {
    return { ok: false, error: "file_empty" };
  }
  return { ok: true, ext };
}

/** Basic SVG sanitizer — strips scripts/events. Still served private by default. */
export function sanitizeSvg(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/<foreignObject[\s\S]*?>[\s\S]*?<\/foreignObject>/gi, "");
}

export async function storePrivateFile(
  buffer: Buffer,
  originalName: string,
  ext: string
): Promise<{ storageKey: string; absolutePath: string; url: string }> {
  const root = process.env.UPLOAD_DIR ?? "./uploads";
  const day = new Date().toISOString().slice(0, 10);
  const hash = createHash("sha256").update(randomBytes(16)).digest("hex").slice(0, 24);
  const safeBase = originalName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const storageKey = path.posix.join(day, `${hash}-${safeBase}`);
  const dir = path.join(process.cwd(), root, "private", day);
  await mkdir(dir, { recursive: true });
  const absolutePath = path.join(dir, `${hash}-${safeBase}`);
  await writeFile(absolutePath, buffer);
  // App route serves via signed token — never direct static for private
  const url = `/api/files/${encodeURIComponent(storageKey)}`;
  return { storageKey, absolutePath, url };
}

export function signFileToken(storageKey: string, userId: string, ttlMs = 15 * 60 * 1000): string {
  const exp = Date.now() + ttlMs;
  const secret = process.env.AUTH_SECRET ?? "dev";
  const payload = `${storageKey}:${userId}:${exp}`;
  const sig = createHash("sha256").update(`${payload}:${secret}`).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyFileToken(
  token: string
): { ok: true; storageKey: string; userId: string } | { ok: false } {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const parts = raw.split(":");
    if (parts.length < 4) return { ok: false };
    const sig = parts.pop()!;
    const exp = parts.pop()!;
    const userId = parts.pop()!;
    const storageKey = parts.join(":");
    if (Date.now() > Number(exp)) return { ok: false };
    const secret = process.env.AUTH_SECRET ?? "dev";
    const payload = `${storageKey}:${userId}:${exp}`;
    const expected = createHash("sha256").update(`${payload}:${secret}`).digest("hex");
    if (expected !== sig) return { ok: false };
    return { ok: true, storageKey, userId };
  } catch {
    return { ok: false };
  }
}
