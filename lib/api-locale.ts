import type { NextRequest } from "next/server";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";

export function getLocaleFromRequest(req: NextRequest): AppLocale {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (hasLocale(routing.locales, cookie)) {
    return cookie;
  }
  return routing.defaultLocale;
}
