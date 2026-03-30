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
    const t = await getTranslations({ locale, namespace: "Terms" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Terms" });

    const ext = (href: string) => (chunks: ReactNode) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {chunks}
        </a>
    );

    const richLinks = {
        site: ext("https://www.typingverified.com"),
        pricing: (chunks: ReactNode) => (
            <Link href="/pricing" className={linkClass}>
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

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">{t.rich("intro", richLinks)}</p>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s1Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s1p1")}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s2Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">{t("s2ProvidesIntro")}</p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s2Item1")}</li>
                    <li>{t("s2Item2")}</li>
                    <li>{t("s2Item3")}</li>
                    <li>{t("s2Item4")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s3Title")}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s3Item1")}</li>
                    <li>{t("s3Item2")}</li>
                    <li>{t("s3Item3")}</li>
                    <li>{t("s3Item4")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s4Title")}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s4Item1")}</li>
                    <li>{t("s4Item2")}</li>
                    <li>{t("s4Item3")}</li>
                    <li>{t("s4Item4")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s5Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">{t("s5NotIntro")}</p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s5Item1")}</li>
                    <li>{t("s5Item2")}</li>
                    <li>{t("s5Item3")}</li>
                    <li>{t("s5Item4")}</li>
                    <li>{t("s5Item5")}</li>
                    <li>{t("s5Item6")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s6Title")}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s6Item1")}</li>
                    <li>{t.rich("s6Item2", richLinks)}</li>
                    <li>{t("s6Item3")}</li>
                    <li>{t("s6Item4")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s7Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s7p1")}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s8Title")}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s8Item1")}</li>
                    <li>{t("s8Item2")}</li>
                    <li>{t("s8Item3")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s9Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">{t("s9DisclaimerIntro")}</p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>{t("s9Item1")}</li>
                    <li>{t("s9Item2")}</li>
                    <li>{t("s9Item3")}</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s10Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s10p1")}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s11Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s11p1")}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s12Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s12p1")}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s13Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t("s13p1")}</p>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("s14Title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">{t("s14Intro")}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {t.rich("s14Email", richLinks)}
                    <br />
                    {t.rich("s14Website", richLinks)}
                </p>
            </section>
        </div>
    );
}
