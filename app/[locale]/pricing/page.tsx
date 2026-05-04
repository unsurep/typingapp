import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import {
    isStripeTestTriggerEnabled,
    isStripeCheckoutEnabled,
} from "@/lib/server/premiumFree";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Pricing" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function PricingPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: AppLocale }>;
    searchParams: Promise<{ cancelled?: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Pricing" });
    const { cancelled } = await searchParams;

    const strong = (chunks: ReactNode) => <strong>{chunks}</strong>;

    const stripeCheckoutEnabled = isStripeCheckoutEnabled()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isPremiumDb = false
    let hasCertificate = false
    let hasBadge = false
    if (user) {
        const [{ data: profile }, { data: certificate }] = await Promise.all([
            supabase
                .from("profiles")
                .select("is_premium, has_badge")
                .eq("id", user.id)
                .single(),
            supabase
                .from("certificates")
                .select("certificate_code")
                .eq("user_id", user.id)
                .single(),
        ])
        isPremiumDb = profile?.is_premium ?? false
        hasBadge = profile?.has_badge ?? false
        hasCertificate = !!certificate
    }

    const premiumCardIsActive = isPremiumDb
    const stripeTestToken = process.env.STRIPE_TEST_TRIGGER_TOKEN?.trim()
    const hasTestTriggerToken = isStripeTestTriggerEnabled() && Boolean(stripeTestToken)
    const premiumCheckoutHref = hasTestTriggerToken
        ? `/checkout?test_checkout=1&token=${encodeURIComponent(stripeTestToken!)}`
        : stripeCheckoutEnabled
            ? "/checkout"
            : "/contact"

    return (
        <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[140px] rounded-full pointer-events-none -z-10" />

            {/* Cancelled payment notice */}
            {cancelled && (
                <div className="mb-8 max-w-xl mx-auto w-full px-4 py-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-300 text-center">
                    {t("cancelledBanner")}
                </div>
            )}

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("heroTitleBefore")}{" "}
                    <span className="text-brand">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t("heroSubtitle")}
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Free plan */}
                <div className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {t("freemiumTitleFreemium")}
                        </h2>
                        <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                            {t("freemiumSubtitleNormal")}
                        </p>
                    </div>

                    <div className="mt-4 mb-6">
                        <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            {t("priceZero")}
                        </span>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {t("priceSuffixForever")}
                        </span>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>{t("freemiumBulletLessonsNormal")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>{t("freemiumBulletTestsNormal")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>
                                {t.rich("freemiumBulletPractice", {
                                    practice: (chunks) => <strong>{chunks}</strong>,
                                })}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>{t.rich("freemiumBulletCertNormal", { strong })}</span>
                        </li>
                    </ul>

                    <Link
                        href="/practice"
                        className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-brand/70 hover:text-brand dark:hover:text-brand transition-colors"
                    >
                        {t("freemiumCta")}
                    </Link>
                </div>

                {/* Premium plan */}
                <div
                    className={`relative bg-linear-to-b from-brand/10 via-white/80 to-white dark:from-brand/20 dark:via-zinc-900 dark:to-zinc-900 border rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col ${
                        premiumCardIsActive
                            ? "border-emerald-500/70 dark:border-emerald-400/60 ring-2 ring-emerald-500/30 dark:ring-emerald-400/25 shadow-emerald-500/10"
                            : "border-brand/60 dark:border-brand/70 shadow-brand/20"
                    }`}
                >
                    <div
                        className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${
                            premiumCardIsActive
                                ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                                : "bg-brand text-black"
                        }`}
                    >
                        {premiumCardIsActive ? t("badgeCurrent") : t("badgeBest")}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {t("premiumTitle")}
                        </h2>
                        <p className="mt-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                            {t("premiumSubtitle")}
                        </p>
                    </div>

                    <div className="mt-4 mb-6">
                        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                            {t("pricePremium")}
                        </span>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {t("priceSuffixOnetime")}
                        </span>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{t("premiumBullet1")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{t.rich("premiumBullet2", { strong })}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{t.rich("premiumBullet3", { strong })}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{t("premiumBullet4")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{t("premiumBullet5")}</span>
                        </li>
                    </ul>

                    {isPremiumDb ? (
                        <button
                            type="button"
                            disabled
                            aria-disabled="true"
                            aria-label={t("ariaOnPremium")}
                            className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-semibold text-sm cursor-not-allowed border border-zinc-300 dark:border-zinc-600"
                        >
                            <span aria-hidden className="text-emerald-600 dark:text-emerald-400">&#10003;</span>
                            {t("ctaOnPremium")}
                        </button>
                    ) : (
                        <Link
                            href={premiumCheckoutHref}
                            className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors"
                            aria-label={t("ctaUpgrade")}
                        >
                            {t("ctaUpgrade")}
                        </Link>
                    )}
                </div>
            </div>

            {/* Badge Add-on — always visible */}
            <div className="mt-10 max-w-2xl mx-auto w-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0">{t("badgeAddonSectionLabel")}</span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div className={`relative bg-white dark:bg-zinc-900 border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-5 ${!hasCertificate ? "border-gray-200 dark:border-zinc-800 opacity-75" : "border-gray-200 dark:border-zinc-800"}`}>
                    <div className="shrink-0 w-12 h-12 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-xl">
                        &#127885;
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                            {t("badgeAddonTitle")}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t("badgeAddonDesc")}
                        </p>
                        {!hasCertificate && (
                            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                                {t("badgeAddonLockedNote")}
                            </p>
                        )}
                    </div>
                    <div className="shrink-0 flex flex-col items-start sm:items-end gap-1">
                        {hasBadge ? (
                            <Link
                                href="/badge"
                                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-brand text-black text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm"
                            >
                                {t("badgeAddonCta")}
                            </Link>
                        ) : hasCertificate ? (
                            <Link
                                href="/badge-checkout"
                                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-brand text-black text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm"
                            >
                                {t("badgeAddonBuyCta")}
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-gray-500 text-sm font-bold cursor-not-allowed"
                            >
                                {t("badgeAddonBuyCta")}
                            </button>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-500">{t("badgeAddonNote")}</span>
                    </div>
                </div>
            </div>
            {/* Etsy banner */}
            <div className="mt-10 max-w-2xl mx-auto w-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0">Also available on Etsy</span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-xl">
                        🛍️
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Typing Worksheet Pack — 50 Sheets</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Prefer to buy a standalone copy? Grab the printable worksheet pack directly on Etsy.</p>
                    </div>
                    <a
                        href="https://etsy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        Get the Worksheet Pack — $4.99 on Etsy →
                    </a>
                </div>
            </div>
        </div>
    );
}
