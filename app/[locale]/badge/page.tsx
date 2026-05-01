import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BadgeActions from "@/components/BadgeActions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Badge" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: false },
  };
}

export default async function BadgePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Badge" });
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: "/login?redirect=/badge", locale });
  }

  const authUser = user!;

  // Load profile + certificate in parallel
  const [{ data: profile }, { data: certificate }] = await Promise.all([
    supabase
      .from("profiles")
      .select("has_badge")
      .eq("id", authUser.id)
      .single(),
    supabase
      .from("certificates")
      .select("certificate_code, net_wpm, accuracy")
      .eq("user_id", authUser.id)
      .single(),
  ]);

  const hasBadge = profile?.has_badge ?? false;
  const hasCertificate = !!certificate;

  const code = certificate?.certificate_code ?? "";
  const badgePath = hasCertificate
    ? `/api/badge?code=${encodeURIComponent(code)}`
    : null;

  const badgeAbsoluteUrl =
    hasCertificate && badgePath
      ? `https://www.typingverified.com${badgePath}`
      : null;

  const verifyPath = hasCertificate
    ? `https://www.typingverified.com/verify/${encodeURIComponent(code)}`
    : null;
  const verifyAbsoluteUrl = verifyPath;

  const markdownSnippet =
    badgeAbsoluteUrl && verifyAbsoluteUrl
      ? `[![TypingVerified Badge](${badgeAbsoluteUrl})](${verifyAbsoluteUrl})`
      : null;

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {t("heroTitleBefore")}{" "}
          <span className="text-brand">{t("heroTitleHighlight")}</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
          {t("heroSubtitle")}
        </p>
      </div>

      {/* No certificate state */}
      {!hasCertificate && (
        <div className="max-w-xl mx-auto w-full bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 text-center shadow-sm">
          <div className="text-amber-500 mb-4">
            <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">
            {t("noCertTitle")}
          </h2>
          <p className="text-sm text-amber-800 dark:text-amber-200/80 mb-6">
            {t("noCertDesc")}
          </p>
          <Link
            href="/certificate"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm hover:bg-amber-400 transition-colors"
          >
            {t("getCertCta")}
          </Link>
        </div>
      )}

      {/* Has certificate but has not purchased badge */}
      {hasCertificate && !hasBadge && (
        <div className="max-w-xl mx-auto w-full flex flex-col items-center gap-6">
          {/* Blurred badge teaser */}
          <div className="w-full relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badgePath!}
              alt="Badge preview"
              className="w-full blur-sm scale-105 pointer-events-none select-none"
              draggable={false}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
              <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl px-8 py-6 text-center shadow-xl max-w-xs">
                <div className="text-brand text-3xl mb-2">&#127885;</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                  {t("unlockTitle")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t("unlockDesc")}
                </p>
                <Link
                  href="/badge-checkout"
                  className="inline-flex items-center justify-center w-full px-6 py-2.5 rounded-full bg-brand text-black font-bold text-sm hover:bg-amber-400 transition-colors"
                >
                  {t("unlockCta")}
                </Link>
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                  {t("unlockNotePrefix")} {t("unlockNoteSuffix")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Has certificate AND has purchased badge */}
      {hasCertificate && hasBadge && (
        <div className="flex flex-col items-center gap-8">
          {/* Badge label */}
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0">
              {t("badgePreviewLabel")}
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
          </div>

          {/* Badge image preview */}
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-zinc-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badgePath!}
              alt="Your TypingVerified Badge"
              className="w-full"
            />
          </div>

          {/* Download / copy / verify actions */}
          <BadgeActions
            badgeUrl={badgeAbsoluteUrl!}
            markdownSnippet={markdownSnippet!}
            verifyPath={verifyPath!}
            verifyAbsoluteUrl={verifyAbsoluteUrl}
            labels={{
              downloadPng: t("downloadPng"),
              githubSectionTitle: t("githubSectionTitle"),
              githubSectionDesc: t("githubSectionDesc"),
              copyMarkdown: t("copyMarkdown"),
              copied: t("copied"),
              linkedinSectionTitle: t("linkedinSectionTitle"),
              linkedinSectionDesc: t("linkedinSectionDesc"),
              verifySectionTitle: t("verifySectionTitle"),
              verifySectionDesc: t("verifySectionDesc"),
              verifyOpenLink: t("verifyOpenLink"),
              verifyCopyUrl: t("verifyCopyUrl"),
              verifyCopiedUrl: t("verifyCopiedUrl"),
            }}
          />
        </div>
      )}
    </div>
  );
}
