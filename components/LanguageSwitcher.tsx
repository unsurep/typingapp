"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function onChange(next: string) {
    if (next === locale) return;
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  const currentLabel = useMemo(
    () => localeNames[locale] ?? locale.toUpperCase(),
    [locale],
  );

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!wrapperRef.current) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!wrapperRef.current.contains(target)) setOpen(false);
    }

    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center gap-1.5 rounded-md border border-gray-100/50 bg-white/70 backdrop-blur-md px-1.5 py-0.5 min-w-0 dark:border-white/5 dark:bg-[#111111]/70"
    >
      <Globe
        className="h-3.5 w-3.5 text-muted shrink-0"
        aria-hidden
      />

      <span className="text-xs font-medium text-foreground truncate max-w-[90px]">
        {currentLabel}
      </span>

      <button
        type="button"
        aria-label={t("label")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ml-0.5 inline-flex items-center justify-center p-0.5 rounded-sm text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50"
      >
        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t("label")}
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-md border border-gray-100/50 bg-white/90 backdrop-blur-xl shadow-lg overflow-hidden dark:border-white/10 dark:bg-[#111111]/90"
        >
          {routing.locales.map((loc) => {
            const label = localeNames[loc] ?? loc.toUpperCase();
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                role="menuitem"
                onClick={() => onChange(loc)}
                className={[
                  "w-full text-left px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-brand/10 dark:hover:bg-brand/20",
                  isActive
                    ? "text-brand bg-brand/10 dark:bg-brand/20"
                    : "text-foreground",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
