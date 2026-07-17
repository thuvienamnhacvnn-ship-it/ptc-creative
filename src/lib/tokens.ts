import { randomBytes, createHash } from "crypto";

export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function generateReference(prefix: string): string {
  const n = Date.now().toString(36).toUpperCase();
  const r = randomBytes(2).toString("hex").toUpperCase();
  return `${prefix}-${n}-${r}`;
}
