import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export default async function Footer({ locale }: { locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "Footer" });

  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("contact")}
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("blog")}
            </Link>
            <Link
              href="/verify"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("verify")}
            </Link>
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy;{" "}
            <Link
              href="/admin/signin"
              className="text-inherit underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-brand/50 rounded-sm"
            >
              2026
            </Link>{" "}
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
