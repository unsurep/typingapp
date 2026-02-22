import Link from "next/link";

interface LessonCardProps {
    id: number;
    title: string;
    focus: string;
    shortDesc: string;
    progress: number;
}

export default function LessonCard({ id, title, focus, shortDesc, progress }: LessonCardProps) {
    return (
        <div className="flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            {/* Card Content Top */}
            <div className="flex-grow mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {title}
                </h2>
                <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-md mb-4 border border-gray-200 dark:border-zinc-700">
                    {focus}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {shortDesc}
                </p>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Course Progress</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black dark:bg-white rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Button */}
            <Link
                href={`/lessons/${id}`}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-lg font-medium text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-black dark:hover:border-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white shadow-sm"
            >
                Start Lesson
            </Link>
        </div>
    );
}
