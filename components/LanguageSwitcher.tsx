"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Native names for dropdown options (more than ~4 locales). */
const localeNames: Record<string, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Language");

  function onChange(next: string) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-background/50 px-1.5 py-0.5 min-w-0">
      <Globe
        className="h-3.5 w-3.5 text-muted-foreground shrink-0"
        aria-hidden
      />
      <label htmlFor="tv-locale" className="sr-only">
        {t("label")}
      </label>
      <select
        id="tv-locale"
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("label")}
        className="max-w-38 sm:max-w-none cursor-pointer rounded-sm bg-transparent py-0.5 pl-1 pr-6 text-xs font-medium text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-brand/50"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc] ?? loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
