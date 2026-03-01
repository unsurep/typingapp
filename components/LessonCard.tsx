"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface LessonCardProps {
    id: number;
    title: string;
    focus: string;
    shortDesc: string;
    progress: number;
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function LessonCard({ id, title, focus, shortDesc, progress }: LessonCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5 }}
            className="flex flex-col group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-brand/20 transition-all duration-300 p-6 hover:border-brand/50 relative overflow-hidden"
        >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-brand/0 to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Card Content Top */}
            <div className="grow mb-6 relative z-10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand transition-colors duration-300">
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
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Course Progress</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Button */}
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
                    Start Lesson <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                </span>
            </Link>
        </motion.div>
    );
}
