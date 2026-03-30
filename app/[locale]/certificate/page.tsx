import CertificatePreview from "@/components/CertificatePreview";
import CheckEligibilityButton from "@/components/CheckEligibilityButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { premiumFreeWindowActive } from "@/lib/server/premiumFree";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Certificate" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        robots: { index: false, follow: false },
    };
}

export default async function CertificatePage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Certificate" });
    const tVerify = await getTranslations({ locale, namespace: "VerifyCertificate" });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Protect route: only authenticated users can access certificate page
    if (!user) {
        redirect({ href: "/login", locale });
    }

    const authUser = user!;

    // Only premium users can access the certificate
    const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', authUser.id)
        .single();

    if (!profile?.is_premium) {
        // Allow certificate access during the free-mium window.
        if (!premiumFreeWindowActive()) {
            redirect({ href: "/checkout", locale });
        }
    }

    // Attempt to load an existing certificate for the current user
    const { data: certificate, error: certError } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

    const hasCertificate = !!certificate;

    const displayName =
        // prefer the name that was saved with the certificate, if any
        (certificate?.full_name as string) ||
        (authUser.user_metadata as { full_name?: string } | null)?.full_name ||
        authUser.email ||
        "Certified Candidate";

    return (
        <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header Info */}
            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("heroTitleBefore")} <span className="text-brand">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {t("heroSubtitle")}
                </p>
            </div>

            {/* Locked State Alert Box */}
            {!hasCertificate && (
                <div className="max-w-3xl mx-auto w-full mb-16 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
                    <div className="shrink-0 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                        {/* Lock Icon */}
                        <svg className="w-8 h-8 text-amber-600 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">
                            {t("lockedTitle")}
                        </h3>
                        <p className="text-sm md:text-base text-amber-800 dark:text-amber-200/80 mb-6 leading-relaxed">
                            {t.rich("lockedDesc", {
                                wpm: (chunks) => <span className="font-bold">{chunks}</span>,
                                accuracy: (chunks) => <span className="font-bold">{chunks}</span>,
                            })}
                        </p>
                        <CheckEligibilityButton />
                    </div>
                </div>
            )}

            <div className="w-full flex items-center justify-center mb-8">
                <div className="h-px bg-gray-200 dark:bg-zinc-800 w-full max-w-sm"></div>
                <span className="px-4 text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0">
                    {t("previewLabel")}
                </span>
                <div className="h-px bg-gray-200 dark:bg-zinc-800 w-full max-w-sm"></div>
            </div>

            {/* Certificate Preview */}
            <div className="flex justify-center">
                {hasCertificate ? (
                    <CertificatePreview
                        name={displayName}
                        netSpeed={certificate.net_wpm}
                        accuracy={certificate.accuracy}
                        duration={certificate.duration_seconds}
                        certificateId={certificate.certificate_code}
                        issuedDate={new Date(certificate.issued_at).toLocaleDateString(locale, {
                            month: "short",
                            year: "numeric",
                        })}
                        labels={{
                            title: tVerify("labelsTitle"),
                            subtitle: tVerify("labelsSubtitle"),
                            presentedTo: tVerify("labelsPresentedTo"),
                            body: tVerify("labelsBody"),
                            netSpeed: tVerify("labelsNetSpeed"),
                            accuracy: tVerify("labelsAccuracy"),
                            duration: tVerify("labelsDuration"),
                            seconds: tVerify("labelsSeconds"),
                            director: tVerify("labelsDirector"),
                            certificateId: tVerify("labelsCertificateId"),
                            issuedPrefix: tVerify("labelsIssuedPrefix"),
                            grade: tVerify("labelsGrade"),
                        }}
                    />
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p className="italic">{t("emptyPreview")}</p>
                    </div>
                )}
            </div>

            {/* Action Buttons Below Certificate */}
            <div className="mt-12 flex justify-center pb-20">
                <button
                    disabled={!hasCertificate}
                    className="relative px-8 py-3.5 bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 rounded-full font-bold cursor-not-allowed flex items-center shadow-inner transition-colors overflow-hidden group/btn"
                >
                    <svg className="w-5 h-5 mr-2 opacity-50 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="relative z-10">{t("downloadPdf")}</span>
                </button>
            </div>

        </div>
    );
}
