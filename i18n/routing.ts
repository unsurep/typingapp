import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "es", "de", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // SEO: don't auto-redirect based on Accept-Language or a stored locale
  // cookie — Google explicitly recommends against this for hreflang sites
  // (https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).
  // Locale is now decided purely by the URL prefix; the language switcher
  // still works via explicit links.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
