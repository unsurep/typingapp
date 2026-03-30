import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

const linkClass =
    "underline underline-offset-2 text-gray-600 dark:text-gray-400 hover:text-brand";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Privacy" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Privacy" });

    const ext = (href: string) => (chunks: ReactNode) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {chunks}
        </a>
    );

    const richLinks = {
        adsSettings: ext("https://adssettings.google.com"),
        googlePartner: ext("https://policies.google.com/technologies/partner-sites"),
        contactPage: (chunks: ReactNode) => (
            <Link href="/contact" className={linkClass}>
                {chunks}
            </Link>
        ),
        email: (chunks: ReactNode) => (
            <a href="mailto:support@typingverified.com" className={linkClass}>
                {chunks}
            </a>
        ),
        website: (chunks: ReactNode) => (
            <Link href="/contact" className={linkClass}>
                {chunks}
            </Link>
        ),
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("heroTitleBefore")}{" "}
                    <span className="text-brand">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t("lastUpdated")}
                </p>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">{t("intro")}</p>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s1Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("s1Account")}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("s1Usage")}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("s1Cookies")}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("s1Ads")}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
                    {t.rich("s1OptOut", richLinks)}
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    {t.rich("s1GoogleData", richLinks)}
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s2Title")}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s2Item1")}</li>
                    <li>{t("s2Item2")}</li>
                    <li>{t("s2Item3")}</li>
                    <li>{t("s2Item4")}</li>
                    <li>{t("s2Item5")}</li>
                </ul>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s3Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("s3p1")}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
                    {t.rich("s3OptOut", richLinks)}
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    {t.rich("s3MoreInfo", richLinks)}
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s4Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s4p1")}</p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s5Title")}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s5Item1")}</li>
                    <li>{t.rich("s5Item2", richLinks)}</li>
                    <li>{t.rich("s5Item3", richLinks)}</li>
                </ul>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s6Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s6p1")}</p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s7Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s7p1")}</p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("s8Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                    {t.rich("s8Email", richLinks)}
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {t.rich("s8Website", richLinks)}
                </p>
            </section>
        </div>
    );
}
