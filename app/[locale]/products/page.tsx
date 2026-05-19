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
          alternates: { canonical: 'https://www.typingverified.com/products', 
        languages: {
          'x-default': 'https://www.typingverified.com/products',
          'en': 'https://www.typingverified.com/products',
          'fr': 'https://www.typingverified.com/fr/products',
          'es': 'https://www.typingverified.com/es/products',
          'de': 'https://www.typingverified.com/de/products',
          'pt': 'https://www.typingverified.com/pt/products',
        },
      },
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
                                                          Ã°ÂÂÂÃ¯Â¸Â
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col">
                                                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {t("worksheetCardTitle")}
                                                          </h2>
                                                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                                                            {t("worksheetCardDesc")}
                                                          </p>
                                                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                                                          50 printable typing worksheets to practise at your own pace Ã¢ÂÂ also available as a standalone purchase on Etsy.
                                                          </p>
                                                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">$4.99 on Etsy ÃÂ· included free with Premium</p>
                                                          <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-3">
                                                                          <a
                                                                                              href="https://www.etsy.com/shop/MasebasDigitalNest"
                                                                                              target="_blank"
                                                                                              rel="noopener noreferrer"
                                                                                              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm"
                                                                                            >
                                                                                            Get the Worksheet Pack Ã¢ÂÂ $4.99 on Etsy Ã¢ÂÂ
                                                                          </a>
                                                          </div>
                                            </div>
                                </article>
                      </li>
              </ul>
        
              <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">{t("moreSoon")}</p>
        
      <section className="mt-16 space-y-10">
      
                <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About Typingverified Digital Products</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          Typingverified offers a focused suite of digital products designed to extend and enhance the value of your typing certificate. Every product on this page is optional Ã¢ÂÂ the core typing tests, lessons, and certificate are always free. What you find here are tools that help you present your verified skill more effectively, practise more efficiently, and stand out in hiring and professional contexts where typing proficiency is a real differentiator.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                          Each product is built around the same principle as the certificate itself: verifiability. We do not offer generic typing tools. Everything here ties directly to your earned credential or supports the structured practice path that leads to it.
                            </p>
                </div>
      
                <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The LinkedIn and GitHub Typing Badge</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          The Typingverified badge is a verifiable digital credential you can embed directly on your LinkedIn profile and in your GitHub README. It displays your net WPM score, accuracy percentage, and grade Ã¢ÂÂ all tied to a certificate that anyone can independently verify at typingverified.com/verify.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          Unlike a self-reported typing speed on a resume, the badge cannot be fabricated. It links back to a real certificate record stored on our servers, issued only after completing all ten structured lessons and passing a timed 60-second test under controlled conditions. Recruiters, hiring managers, and collaborators can confirm its authenticity with a single click.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          The badge is available as a one-time purchase of $2.99 for users who have already earned a Typingverified certificate. Once purchased, you receive a personalised badge image and embed code optimised for LinkedIn, GitHub, and any Markdown-based profile. There are no subscriptions, no renewals, and no expiry Ã¢ÂÂ the badge is yours permanently.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                          The badge is particularly valuable for software developers, data entry professionals, virtual assistants, transcriptionists, customer service representatives, and anyone applying for roles where typing speed and accuracy are assessed. Adding a verified credential to your profile signals not just the skill, but the discipline to earn a standardised, proctored certificate.
                            </p>
                </div>
      
                <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Typing Worksheet Pack</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          The printable typing worksheet pack includes 50 structured exercises for offline practice. Each worksheet targets a specific aspect of typing proficiency Ã¢ÂÂ home row placement, finger reach patterns, punctuation accuracy, number row fluency, and speed-building drills. The exercises are designed to complement the online lessons rather than duplicate them, giving you a way to reinforce muscle memory away from a screen.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                          The worksheets are formatted for standard A4 and US Letter paper. They are especially useful for learners who prefer working through structured paper exercises, teachers running typing curriculum in classrooms, and professionals who want targeted drills for specific weaknesses identified during practice sessions.
                            </p>
                </div>
      
                <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why Verified Typing Credentials Matter</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          Self-reported typing speeds are common on resumes, but employers have no reliable way to verify them. A candidate who lists 75 WPM with no supporting evidence is indistinguishable from one who genuinely types at that speed Ã¢ÂÂ until they are tested on the job. This creates friction in hiring and uncertainty for both sides.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                          A Typingverified certificate and badge solve this by providing a standardised, independently verifiable record. The test is timed, the scoring uses net WPM (errors count against you), and the result is stored server-side where it cannot be altered. Employers who receive a Typingverified credential can confirm it instantly without contacting the candidate or arranging a separate test.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                          As remote work continues to expand, written communication speed and accuracy have become more important across a wider range of roles. A verified typing credential is a low-cost, high-signal addition to any professional profile Ã¢ÂÂ particularly for roles in administration, legal, medical, customer service, and software development where keyboard fluency directly affects output quality and speed.
                            </p>
                </div>
      
      </section>        
        </div>
      );
}
