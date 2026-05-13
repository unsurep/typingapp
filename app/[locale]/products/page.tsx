import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Products" });
    return {
          title: t("metaTitle"),
          description: t("metaDescription"),
          alternates: { canonical: 'https://www.typingverified.com/products' },
    };
}

export default async function ProductsPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Products" });

  const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

  let hasCertificate = false;
    let hasBadge = false;

  if (user) {
        const [{ data: certificate }, { data: profile }] = await Promise.all([
                supabase
                  .from("certificates")
                  .select("certificate_code")
                  .eq("user_id", user.id)
                  .single(),
                supabase
                  .from("profiles")
                  .select("has_badge")
                  .eq("id", user.id)
                  .single(),
              ]);
        hasCertificate = !!certificate;
        hasBadge = profile?.has_badge ?? false;
  }

  return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        
              <div className="mb-10 text-center">
                      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {t("heroTitleBefore")}{" "}
                                <span className="text-brand">{t("heroTitleHighlight")}</span>
                      </h1>
                      <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t("heroSubtitle")}
                      </p>
              </div>
        
              <ul className="space-y-6 list-none p-0 m-0">
                      <li>
                                <article className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-stretch gap-6">
                                            <div className="shrink-0 w-14 h-14 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-2xl">
                                                          &#127885;
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col">
                                                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {t("badgeCardTitle")}
                                                          </h2>
                                                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                                            {t("badgeCardDesc")}
                                                          </p>
                                            
                                              {hasCertificate && !hasBadge ? (
                          <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{t("badgePriceUnlocked")}</p>
                        ) : (
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{t("badgePrice")}</p>
                                                          )}
                                                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-6">{t("badgeReq")}</p>
                                            
                                                          <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-3">
                                                            {hasBadge ? (
                            <Link
                                                  href="/badge"
                                                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand text-black text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm"
                                                >
                                                <span>&#127885;</span>
                              {t("ctaViewBadge")}
                            </Link>
                          ) : hasCertificate ? (
                            <Link
                                                  href="/badge-checkout"
                                                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand text-black text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm"
                                                >
                                                <span>&#127885;</span>
                              {t("ctaBuyBadge")}
                            </Link>
                          ) : (
                            <Link
                                                  href="/lessons"
                                                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand text-black text-sm font-bold hover:bg-amber-400 transition-colors shadow-sm"
                                                >
                              {t("ctaLessons")}
                            </Link>
                                                                          )}
                                                          </div>
                                            </div>
                                </article>
                      </li>
                      <li>
                                <article className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-stretch gap-6">
                                            <div className="shrink-0 w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-2xl">
                                                          🛍️
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col">
                                                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {t("worksheetCardTitle")}
                                                          </h2>
                                                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                                                            {t("worksheetCardDesc")}
                                                          </p>
                                                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                                                          50 printable typing worksheets to practise at your own pace — also available as a standalone purchase on Etsy.
                                                          </p>
                                                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">$4.99 on Etsy · included free with Premium</p>
                                                          <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-3">
                                                                          <a
                                                                                              href="https://www.etsy.com/shop/MasebasDigitalNest"
                                                                                              target="_blank"
                                                                                              rel="noopener noreferrer"
                                                                                              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm"
                                                                                            >
                                                                                            Get the Worksheet Pack — $4.99 on Etsy →
                                                                          </a>
                                                          </div>
                                            </div>
                                </article>
                      </li>
              </ul>
        
              <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">{t("moreSoon")}</p>
        
              <section className="mt-16 prose dark:prose-invert max-w-none">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About Typingverified Digital Products</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Typingverified offers a focused suite of digital products designed to help you build, prove, and showcase your typing skills. Whether you are preparing for a job that requires a minimum WPM, studying for a certification exam, or simply want to track your improvement over time, our products give you the credentials and tools to do it effectively.
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The LinkedIn and GitHub Typing Badge</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                                The Typingverified badge is a verifiable digital credential you can add to your LinkedIn profile, GitHub bio, or personal portfolio. It signals to recruiters and collaborators that your typing speed has been independently verified — not self-reported. The badge links back to your public certificate so anyone can confirm its authenticity instantly. It is available exclusively to users who have already earned a Typingverified certificate, ensuring every badge represents a genuine, tested result.
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Typing Worksheet Pack</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                                The printable typing worksheet pack includes 50 structured exercises for offline practice. Each worksheet targets a specific skill area: number rows, punctuation, programming symbols, and high-frequency word patterns that rarely appear in standard tests. The pack is sold on Etsy and bundled free with Typingverified Pro membership.
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why Verified Typing Credentials Matter</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                                Self-reported typing speeds are common on resumes, but employers have no reliable way to verify them. A Typingverified certificate and badge change that. Your score is measured under controlled conditions, stored server-side, and accessible via a public verification URL. A hiring manager can confirm your claimed WPM in under ten seconds. For roles in data entry, medical transcription, legal support, remote customer service, and executive assistance, a verified typing credential is a meaningful differentiator that can move your application to the top of the shortlist.
                      </p>
              </section>
        
        </div>
      );
}
