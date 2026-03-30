import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });

    const listClass =
        "list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400";
    const linkInline = "underline underline-offset-2";
    const strong = (chunks: ReactNode) => (
        <span className="font-semibold">{chunks}</span>
    );

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("heroTitleBefore")}{" "}
                    <span className="text-brand">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t("heroIntro")}
                </p>
            </div>

            <section className="mb-10 rounded-2xl border border-border bg-muted/5 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t("bioTitle")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {t("bioP1")}
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {t("bioP2")}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t("contactHeading")}</p>
                <div className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <p>
                        <span className="font-medium text-gray-800 dark:text-gray-300">{t("emailLabel")} </span>
                        <a
                            href="mailto:support@typingverified.com"
                            className={`${linkInline} text-brand hover:text-brand/80`}
                        >
                            support@typingverified.com
                        </a>
                    </p>
                    <p>
                        <span className="font-medium text-gray-800 dark:text-gray-300">{t("websiteLabel")} </span>
                        <Link href="/contact" className={`${linkInline} text-brand hover:text-brand/80`}>
                            https://www.typingverified.com/contact
                        </Link>
                    </p>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("useTitle")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("useIntro")}</p>
                <ul className={listClass}>
                    <li>
                        {t.rich("useItem1", {
                            label: strong,
                            practice: (chunks) => (
                                <Link href="/practice" className={linkInline}>
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </li>
                    <li>
                        {t.rich("useItem2", {
                            label: strong,
                            lessons: (chunks) => (
                                <Link href="/lessons" className={linkInline}>
                                    {chunks}
                                </Link>
                            ),
                            acc: strong,
                            avg: strong,
                        })}
                    </li>
                    <li>
                        {t.rich("useItem3", {
                            label: strong,
                            test: (chunks) => (
                                <Link href="/test" className={linkInline}>
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("certTitle")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{t("certIntro")}</p>
                <ul className={listClass}>
                    <li>
                        {t.rich("certItem1", {
                            label: strong,
                            count: strong,
                            acc: strong,
                            avg: strong,
                        })}
                    </li>
                    <li>
                        {t.rich("certItem2", {
                            label: strong,
                            wpm: strong,
                            acc: strong,
                        })}
                    </li>
                    <li>
                        {t.rich("certItem3", {
                            certificate: (chunks) => (
                                <Link href="/certificate" className={linkInline}>
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t("progressTitle")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {t.rich("progressBody", {
                        account: strong,
                    })}
                </p>
            </section>
        </div>
    );
}
