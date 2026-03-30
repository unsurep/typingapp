import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { deepMerge } from "@/lib/deep-merge";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const en = (await import("../messages/en.json")).default as Record<
    string,
    unknown
  >;

  if (locale === routing.defaultLocale) {
    return { locale, messages: en };
  }

  const loc = (await import(`../messages/${locale}.json`)).default as Record<
    string,
    unknown
  >;
  return { locale, messages: deepMerge(en, loc) };
});
