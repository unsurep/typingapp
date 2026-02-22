import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { createClient } from "@/utils/supabase/server";
import { lessons } from "@/lib/lessons";

export default async function LessonsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch progress if authenticated
    let completedLessonIds = new Set<number>();

    if (user) {
        const { data: progressList } = await supabase
            .from('lesson_progress')
            .select('lesson_id')
            .eq('user_id', user.id)
            .eq('completed', true);

        if (progressList) {
            progressList.forEach(p => completedLessonIds.add(p.lesson_id));
        }
    }

    const lessonsWithProgress = lessons.map(lesson => ({
        ...lesson,
        progress: completedLessonIds.has(lesson.id) ? 100 : 0
    }));

    return (
        <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Header Info */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Typing Lessons
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Master your keyboard skills step-by-step. Go from standard home row techniques to typing complex professional vocabulary without looking.
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
