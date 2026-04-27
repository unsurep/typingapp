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
        const progressPercentage = Math.round((completedCount / lesson.tasks.length) * 100);
        return {
            ...lesson,
            progress: progressPercentage,
            totalTasks: lesson.tasks.length,
            locked: !isPremium && lesson.id > 2,
        };
    });

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

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">

                {lessonsWithProgress.map((lesson) => (
                    <LessonCard
                        key={lesson.id}
                        {...lesson}
                    />
                ))}

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
