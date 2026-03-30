"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, Variants } from "framer-motion";

interface LessonCardProps {
    id: number;
    title: string;
    focus: string;
    shortDesc: string;
    progress: number;
    locked?: boolean;
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function LessonCard({ id, title, focus, shortDesc, progress, locked }: LessonCardProps) {
    const t = useTranslations("LessonCard");

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: locked ? 0 : -5 }}
            className={`flex flex-col group bg-white dark:bg-zinc-900 border rounded-xl shadow-sm transition-all duration-300 p-6 relative overflow-hidden ${
                locked
                    ? 'border-gray-200 dark:border-zinc-800 opacity-70'
                    : 'border-gray-200 dark:border-zinc-800 hover:shadow-brand/20 hover:border-brand/50'
            }`}
        >
            {/* Subtle glow effect on hover */}
            {!locked && (
                <div className="absolute inset-0 bg-linear-to-br from-brand/0 to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}

            {/* Lock badge */}
            {locked && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full z-10">
                    <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-500">{t("premium")}</span>
                </div>
            )}

            {/* Card Content Top */}
            <div className="grow mb-6 relative z-10">
                <h2 className={`text-xl font-bold mb-1 transition-colors duration-300 ${locked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white group-hover:text-brand'}`}>
                    {title}
                </h2>
                <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-md mb-4 border border-gray-200 dark:border-zinc-700 group-hover:border-brand/30 transition-colors">
                    {focus}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {shortDesc}
                </p>
            </div>

            {/* Progress Section */}
            <div className="mb-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{t("courseProgress")}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{locked ? '—' : `${progress}%`}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    {!locked && (
                        <div
                            className="h-full bg-brand rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    )}
                </div>
            </div>

            {/* Button */}
            {locked ? (
                <Link
                    href="/checkout"
                    className="w-full relative inline-flex justify-center items-center py-2.5 px-4 bg-brand text-black border border-brand rounded-lg font-semibold text-sm hover:bg-amber-400 transition-all z-10 shadow-sm"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {t("unlockCta")}
                </Link>
            ) : (
                <Link
                    href={`/lessons/${id}`}
                    className="w-full relative inline-flex justify-center items-center py-2.5 px-4 bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-lg font-medium text-sm hover:bg-brand transition-all overflow-hidden group/btn shadow-sm hover:text-background hover:border-brand z-10 hover:shadow-brand/30"
                >
                    <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <span className="relative z-10 flex items-center">
                        {t("startLesson")} <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>
            )}
        </motion.div>
    );
}
