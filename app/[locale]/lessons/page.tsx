import { Link } from "@/i18n/navigation";
import LessonCard from "@/components/LessonCard";
import GuestSignupBanner from "@/components/GuestSignupBanner";
import { createClient } from "@/utils/supabase/server";
import { getLessons } from "@/lib/lessons";
import type { AppLocale } from "@/i18n/routing";
import { premiumFreeWindowActive } from "@/lib/server/premiumFree";
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
        title: "Learn to Type — A Step-by-Step Touch Typing Course for Beginners",
        description: "A beginner-friendly typing course that starts with finger placement on the home row and builds key-by-key to full sentences. Interactive keyboard guide, 90% accuracy to advance. Free to start.",
                alternates: {
                                    canonical: 'https://www.typingverified.com/lessons',
                
        languages: {
          'x-default': 'https://www.typingverified.com/lessons',
          'en': 'https://www.typingverified.com/lessons',
          'fr': 'https://www.typingverified.com/fr/lessons',
          'es': 'https://www.typingverified.com/es/lessons',
          'de': 'https://www.typingverified.com/de/lessons',
          'pt': 'https://www.typingverified.com/pt/lessons',
        },
      },
        robots: { index: true, follow: true },
};

export default async function LessonsPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "LessonsList" });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Guests can view lessons — only fetch progress/premium for logged-in users
    let isPremium = false;
    const progressMap = new Map<number, number>();

    if (user) {
        const [{ data: profile }, { data: progressList }] = await Promise.all([
            supabase.from('profiles').select('is_premium').eq('id', user.id).single(),
            supabase.from('lesson_progress').select('lesson_id, completed_tasks').eq('user_id', user.id),
        ]);

        isPremium = (profile?.is_premium ?? false) || premiumFreeWindowActive();

        if (progressList) {
            progressList.forEach(p => {
                const completedCount = p.completed_tasks ? p.completed_tasks.length : 0;
                progressMap.set(Number(p.lesson_id), completedCount);
            });
        }
    }

    const lessons = getLessons(locale);

    const lessonsWithProgress = lessons.map(lesson => {
        const completedCount = progressMap.get(lesson.id) || 0;
        const progressPercentage = Math.round((completedCount / lesson.steps.length) * 100);
        return {
            ...lesson,
            progress: progressPercentage,
            totalTasks: lesson.steps.length,
            locked: false, // Open access — all lessons free during AdSense review period
        };
    });

    // Group lessons into their stages to render a sequential journey map.
    const stages = Array.from(
        lessonsWithProgress.reduce((map, lesson) => {
            const list = map.get(lesson.stageId) ?? [];
            list.push(lesson);
            map.set(lesson.stageId, list);
            return map;
        }, new Map<number, typeof lessonsWithProgress>())
    ).sort((a, b) => a[0] - b[0]);

    return (
        <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Guest signup banner */}
            <GuestSignupBanner isGuest={!user} />

            {/* Header Info */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("titleBefore")} <span className="text-brand">{t("titleHighlight")}</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-mono">
                    {t("subtitle")}
                </p>
            </div>

            {/* Journey map: stage by stage */}
            <div className="relative mb-20 flex flex-col gap-14">
                {/* Vertical spine connecting the stages (desktop) */}
                <div className="hidden md:block absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand/40 via-brand/20 to-transparent -z-0" />

                {stages.map(([stageId, stageLessons], si) => {
                    const doneInStage = stageLessons.filter(l => l.progress >= 100).length;
                    return (
                        <section key={stageId} className="relative">
                            {/* Stage header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="shrink-0 w-10 h-10 rounded-full bg-brand text-background flex items-center justify-center font-extrabold shadow-md shadow-brand/30 relative z-10">
                                    {si + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                                        {t("stageLabel", { n: si + 1 })}
                                    </span>
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {stageLessons[0].stage}
                                        </h2>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {t("lessonsCount", { done: doneInStage, total: stageLessons.length })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Lessons in this stage */}
                            <div className="md:pl-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {stageLessons.map((lesson) => (
                                    <LessonCard key={lesson.id} {...lesson} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* SEO Content Section */}
            <section className="max-w-3xl mx-auto w-full mb-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Structured Typing Lessons for Every Level</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    These typing lessons are designed to teach touch typing from the ground up — starting with home row fundamentals and progressing through every key on the keyboard. Each lesson builds on the last, introducing new keys only once the previous ones are comfortable. This structured approach is significantly faster than unguided practice, because it targets the specific skills you haven&apos;t developed yet rather than repeating what you already know.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Touch typing — the ability to type without looking at the keyboard — is what separates fast typists from average ones. It&apos;s not a natural skill; it&apos;s a learned one. The lessons here teach you which finger is responsible for which key, how to keep your hands anchored to the home row, and how to extend to reach letters without losing your position.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">How the Lessons Are Structured</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Each lesson contains a series of tasks that progressively introduce new key combinations, finger stretches, and common letter patterns. You can track your progress through each lesson and pick up where you left off. The first two lessons are free for all users — they cover the home row and the most common keys in the English language, which alone account for the majority of keystrokes in everyday typing.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Who These Lessons Are For</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    If you currently type with two fingers, hunt and peck, or regularly look at the keyboard, these lessons will change how you type permanently. Even if you already type at a moderate speed, working through the structured lessons will identify and fix the finger assignment errors that are quietly capping your maximum WPM. Most users see measurable improvement within the first week of consistent daily practice.
                </p>
            </section>

        </div>
    );
}
