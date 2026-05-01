import { headers } from "next/headers";

/**
 * Public origin for absolute URLs (e.g. GitHub markdown). Uses the incoming
 * request host first so local dev matches the tab even when NEXT_PUBLIC_APP_URL
 * points at production.
 */
export async function getPublicOrigin(): Promise<string> {
  const h = await headers();
  const host = (h.get("x-forwarded-host") ?? h.get("host") ?? "").split(",")[0]?.trim();
  const forwardedProto = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto =
    forwardedProto ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  if (host) {
    return `${proto}://${host}`.replace(/\/$/, "");
  }
  const fromEnv = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;
  return "";
}
