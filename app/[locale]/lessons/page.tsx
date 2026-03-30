import { Link } from "@/i18n/navigation";
import LessonCard from "@/components/LessonCard";
import { createClient } from "@/utils/supabase/server";
import { getLessons } from "@/lib/lessons";
import { redirect } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { premiumFreeWindowActive } from "@/lib/server/premiumFree";
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
    robots: { index: false, follow: false },
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

    // Protect route: only authenticated users can access lessons
    if (!user) {
        redirect({ href: "/login", locale });
    }

    const authUser = user!;

    // Fetch premium status and progress in parallel
    const [{ data: profile }, { data: progressList }] = await Promise.all([
        supabase.from('profiles').select('is_premium').eq('id', authUser.id).single(),
        supabase.from('lesson_progress').select('lesson_id, completed_tasks').eq('user_id', authUser.id),
    ]);

    const isPremium = (profile?.is_premium ?? false) || premiumFreeWindowActive();

    const progressMap = new Map<number, number>();
    if (progressList) {
        progressList.forEach(p => {
            const completedCount = p.completed_tasks ? p.completed_tasks.length : 0;
            progressMap.set(Number(p.lesson_id), completedCount);
        });
    }

    const lessons = getLessons(locale);

    const lessonsWithProgress = lessons.map(lesson => {
        const completedCount = progressMap.get(lesson.id) || 0;
        const progressPercentage = Math.round((completedCount / lesson.tasks.length) * 100);
        return {
            ...lesson,
            progress: progressPercentage,
            locked: !isPremium && lesson.id > 2,
        };
    });

    return (
        <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

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

        </div>
    );
}
