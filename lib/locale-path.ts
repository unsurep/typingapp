import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

/** Prefix for non-default locales, e.g. `/fr`, used when building redirects in Route Handlers. */
export function getLocalePrefixFromRequest(req: NextRequest): string {
  const locale = req.cookies.get("NEXT_LOCALE")?.value;
  if (!locale || locale === routing.defaultLocale) return "";
  return `/${locale}`;
}

export function localizedPath(path: string, req: NextRequest): string {
  const prefix = getLocalePrefixFromRequest(req);
  if (path === "/") {
    return prefix || "/";
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  return prefix ? `${prefix}${p}` : p;
}
