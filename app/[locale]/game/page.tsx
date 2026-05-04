import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import TypingGame from "@/components/TypingGame";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Fallback strings in case the namespace hasn't been added to messages yet
  let title = "Falling Words — Typing Game";
  let description =
    "Test your typing speed in this fast-paced falling-words game. Type words before they hit the bottom, climb the leaderboard!";
  try {
    const t = await getTranslations({ locale, namespace: "Game" });
    title = t("metaTitle");
    description = t("metaDescription");
  } catch { /* namespace not yet translated — use defaults above */ }

  return { title, description };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  // locale resolved but not strictly needed here — game is client-side
  await params;

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Typing <span className="text-yellow-400">Game</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Best played on a keyboard · words get faster every 10 you destroy
        </p>
      </div>

      <TypingGame />
    </div>
  );
}
