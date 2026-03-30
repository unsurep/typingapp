import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn what Typingverified is, how our typing lessons and timed tests work, and how to unlock a verified typing certificate.",
};

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    About <span className="text-brand">Typingverified</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Typingverified is a clean, focused typing app designed to help you build real typing speed
                    and accuracy for modern work. You can practice freely, follow step-by-step lessons, and take
                    timed tests to prove your skills.
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
                            className="underline underline-offset-2 text-brand hover:text-brand/80"
                        >
                            support@typingverified.com
                        </a>
                    </p>
                    <p>
                        <span className="font-medium text-gray-800 dark:text-gray-300">{t("websiteLabel")} </span>
                        <Link href="/contact" className="underline underline-offset-2 text-brand hover:text-brand/80">
                            https://www.typingverified.com/contact
                        </Link>
                    </p>
                </div>
            </section>

            {/* How to use the app */}
            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    How to use the app
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    You can move between practice, lessons, and tests depending on what you need:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        <span className="font-semibold">Practice</span>: use the{" "}
                        <Link href="/practice" className="underline underline-offset-2">
                            Practice
                        </Link>{" "}
                        page to warm up your fingers with unlimited, low‑pressure typing.
                    </li>
                    <li>
                        <span className="font-semibold">Lessons</span>: go to{" "}
                        <Link href="/lessons" className="underline underline-offset-2">
                            Lessons
                        </Link>{" "}
                        and work through each lesson task by task. Every task expects at least{" "}
                        <span className="font-semibold">90% accuracy</span> and an{" "}
                        <span className="font-semibold">Average (31–50 WPM) or higher</span> speed to count as
                        passed.
                    </li>
                    <li>
                        <span className="font-semibold">Typing Test</span>: on the{" "}
                        <Link href="/test" className="underline underline-offset-2">
                            Test
                        </Link>{" "}
                        page you can run 60‑second or 120‑second timed tests and see your net WPM, accuracy, and
                        errors in real time.
                    </li>
                </ul>
            </section>

            {/* How to unlock your certificate */}
            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    How to unlock your certificate
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    Your certificate is meant to prove that you can type quickly and accurately in a real work
                    setting. To unlock it, you need to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        <span className="font-semibold">Finish all lessons</span>: complete all{" "}
                        <span className="font-semibold">10 lessons</span>. Every task in every lesson must be
                        passed with at least <span className="font-semibold">90% accuracy</span> and an{" "}
                        <span className="font-semibold">Average (31–50 WPM) or better</span> score so the lesson
                        is fully marked as completed.
                    </li>
                    <li>
                        <span className="font-semibold">Pass a strict 60‑second test</span>: while logged in, take
                        a 60‑second test and reach at least{" "}
                        <span className="font-semibold">35 WPM net speed</span> and{" "}
                        <span className="font-semibold">95% accuracy</span> in the same run.
                    </li>
                    <li>
                        Once both conditions are met, visit the{" "}
                        <Link href="/certificate" className="underline underline-offset-2">
                            Certificate
                        </Link>{" "}
                        page to generate and download your professional typing certificate.
                    </li>
                </ul>
            </section>

            {/* Account & progress note */}
            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Saving your progress
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Progress, lesson results, and certificates are tied to your{" "}
                    <span className="font-semibold">logged‑in account</span>. You can practice as a guest, but
                    guest sessions do not save results and cannot unlock a certificate. For the best experience,
                    sign in, complete your lessons, and then take your final 60‑second test.
                </p>
            </section>
        </div>
    );
}

