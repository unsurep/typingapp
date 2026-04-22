'use client';

import React, { use, useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import { toast } from "sonner";
import { getLessons } from "@/lib/lessons";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { getPerformanceLevel } from "@/utils/performance";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

// In Next.js 15, dynamic route parameters must be awaited or unwrapped via `use()`
export default function LessonPage({ params }: { params: Promise<{ locale: string; lessonId: string }> }) {
    const { lessonId, locale: loc } = use(params);
    const localeFromIntl = useLocale();
    /** URL segment `[locale]` is the source of truth for which lesson file to load; then intl (e.g. cookie) as fallback. */
    const locale = (
        hasLocale(routing.locales, loc)
            ? loc
            : hasLocale(routing.locales, localeFromIntl)
              ? localeFromIntl
              : routing.defaultLocale
    ) as AppLocale;
    const parsedId = parseInt(lessonId, 10);
    const router = useRouter();
    const t = useTranslations("LessonDetail");
    const tPerf = useTranslations("LessonDetail.performanceLevel");

    const lessons = getLessons(locale);

    // Find the lesson. If invalid ID, redirect to 404 page
    const lesson = lessons.find(l => l.id === parsedId);
    if (!lesson) {
        notFound();
    }

    const totalTasks = lesson.tasks.length;
    const [activeTaskIndex, setActiveTaskIndex] = useState(0);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [taskScores, setTaskScores] = useState<Record<number, { wpm: number, accuracy: number, userInput?: string }>>({});

    const [isLessonPassed, setIsLessonPassed] = useState(false);
    const [isTaskPassed, setIsTaskPassed] = useState(false);
    const [attemptId, setAttemptId] = useState(0);
    const [isLoadingInit, setIsLoadingInit] = useState(true);
    const [metrics, setMetrics] = useState<TypingResult>({
        grossWpm: 0,
        netWpm: 0,
        accuracy: 100,
        errors: 0,
        duration: 0,
        userInput: ''
    });

    useEffect(() => {
        async function fetchInitialProgress() {
            try {
                const authRes = await fetch('/api/auth/me');
                const authData = await authRes.json();

                // Lessons 3+ require premium
                if (parsedId > 2 && !authData.isPremium) {
                    router.replace("/checkout");
                    return;
                }

                const progressRes = await fetch(
                    `/api/lessons/progress?lessonId=${parsedId}`
                );
                const res = await progressRes.json();
                if (res.success) {
                    const fetchedCompletedTasks = res.completedTasks || [];
                    setCompletedTasks(fetchedCompletedTasks);

                    if (res.taskScores) {
                        setTaskScores(res.taskScores);
                    }

                    if (res.passed) {
                        setIsLessonPassed(true);
                        setIsTaskPassed(true);
                        setActiveTaskIndex(0);

                        // Set metrics for the first task if they exist
                        if (res.taskScores && res.taskScores[0]) {
                            setMetrics({
                                grossWpm: res.taskScores[0].wpm,
                                netWpm: res.taskScores[0].wpm,
                                accuracy: res.taskScores[0].accuracy,
                                errors: 0,
                                duration: 0,
                                userInput: res.taskScores[0].userInput || ''
                            });
                        }
                    } else {
                        // Find first incomplete task
                        const nextIter = lesson?.tasks.findIndex((_, i) => !fetchedCompletedTasks.includes(i));
                        let startingIndex = 0;
                        if (nextIter !== undefined && nextIter !== -1) {
                            startingIndex = nextIter;
                        }
                        setActiveTaskIndex(startingIndex);

                        // Set metrics for the starting task if they exist
                        if (res.taskScores && res.taskScores[startingIndex]) {
                            setMetrics({
                                grossWpm: res.taskScores[startingIndex].wpm,
                                netWpm: res.taskScores[startingIndex].wpm,
                                accuracy: res.taskScores[startingIndex].accuracy,
                                errors: 0,
                                duration: 0,
                                userInput: res.taskScores[startingIndex].userInput || ''
                            });
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch initial progress", err);
            } finally {
                setIsLoadingInit(false);
            }
        }
        fetchInitialProgress();
    }, [parsedId, lesson, router]);

    const handleProgress = (result: TypingResult) => {
        setMetrics(result);
    };

    const handleComplete = async (finalMetrics: TypingResult) => {
        setMetrics(finalMetrics);

        if (finalMetrics.accuracy < 90) {
            toast.error(`Accuracy too low (${finalMetrics.accuracy}%). You need 90% to pass this task!`);
            return;
        }

        const updatedCompletedTasks = [...completedTasks];
        if (!updatedCompletedTasks.includes(activeTaskIndex)) {
            updatedCompletedTasks.push(activeTaskIndex);
            setCompletedTasks(updatedCompletedTasks);
        }

        const isLessonNowCompleted = updatedCompletedTasks.length >= totalTasks;

        if (isLessonNowCompleted) {
            toast.success("Lesson Fully Completed!");
            setIsLessonPassed(true);
        } else {
            toast.success(`Task ${activeTaskIndex + 1} Passed!`);
        }

        setIsTaskPassed(true);

        // Try scaling DB
        const saveResponse = await fetch("/api/lessons/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lessonId: parsedId,
                taskIndex: activeTaskIndex,
                totalTasks,
                metrics: finalMetrics,
            }),
        });
        const saveRes = await saveResponse.json();

        if (!saveRes.success && saveRes.reason !== 'guest') {
            toast.error("Warning: Could not save your progress to the database. Have you updated your Supabase Schema?");
            console.error("Save failed:", saveRes.reason);
        } else if (saveRes.success && saveRes.taskScores) {
            // Update local state with the new task scores returned from the server
            setTaskScores(saveRes.taskScores);
        }
    };

    const handleRestartTask = () => {
        setIsTaskPassed(completedTasks.includes(activeTaskIndex));
        setAttemptId(prev => prev + 1);
        setMetrics({
            grossWpm: 0,
            netWpm: 0,
            accuracy: 100,
            errors: 0,
            duration: 0,
            userInput: ''
        });
    }

    const handleNextTask = () => {
        if (activeTaskIndex < totalTasks - 1) {
            const nextIndex = activeTaskIndex + 1;
            setActiveTaskIndex(nextIndex);
            setIsTaskPassed(completedTasks.includes(nextIndex));
            setAttemptId(prev => prev + 1);

            if (taskScores[nextIndex]) {
                setMetrics({
                    grossWpm: taskScores[nextIndex].wpm,
                    netWpm: taskScores[nextIndex].wpm,
                    accuracy: taskScores[nextIndex].accuracy,
                    errors: 0,
                    duration: 0,
                    userInput: taskScores[nextIndex].userInput || ''
                });
            } else {
                setMetrics({
                    grossWpm: 0,
                    netWpm: 0,
                    accuracy: 100,
                    errors: 0,
                    duration: 0,
                    userInput: ''
                });
            }
        }
    }

    const selectTask = (index: number) => {
        setActiveTaskIndex(index);
        setIsTaskPassed(completedTasks.includes(index) || isLessonPassed);
        setAttemptId(prev => prev + 1);

        if (taskScores[index]) {
            setMetrics({
                grossWpm: taskScores[index].wpm,
                netWpm: taskScores[index].wpm,
                accuracy: taskScores[index].accuracy,
                errors: 0,
                duration: 0,
                userInput: taskScores[index].userInput || ''
            });
        } else {
            setMetrics({
                grossWpm: 0,
                netWpm: 0,
                accuracy: 100,
                errors: 0,
                duration: 0,
                userInput: ''
            });
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Top Header Navigation */}
            <Link href="/lessons" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 font-medium mb-8 flex items-center transition-colors w-fit">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t("backToLessons")}
            </Link>

            {/* Main Lesson Header with Locked Badge */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {lesson.title.split(':').map((part, index, array) => (
                            <React.Fragment key={index}>
                                {index === array.length - 1 ? <span className="text-brand">{part}</span> : part + ':'}
                            </React.Fragment>
                        ))}
                    </h1>
                    <span className="inline-block mt-3 px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-zinc-700">
                        {lesson.focus}
                    </span>
                </div>

                {/* Locked Completion Badge */}
                {isLoadingInit ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 rounded-lg shadow-sm shrink-0 animate-pulse">
                        <svg className="w-4 h-4 animate-spin -ml-1 mr-1 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm font-semibold">{t("checking")}</span>
                    </div>
                ) : isLessonPassed ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-green-600 dark:text-green-400 rounded-lg shadow-sm shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold">{t("lessonCompleted")}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 rounded-lg shadow-sm shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-sm font-semibold">{t("lessonIncomplete")}</span>
                    </div>
                )}
            </div>

            {/* Task Tabs */}
            <div className="w-full flex flex-wrap gap-2 mb-6">
                {lesson.tasks.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => selectTask(i)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${activeTaskIndex === i
                            ? 'bg-brand text-background border-transparent shadow-md shadow-brand/20'
                            : completedTasks.includes(i) || isLessonPassed
                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-zinc-900 dark:text-gray-400 dark:border-zinc-800 dark:hover:border-brand/30 transition-all'
                            }`}
                    >
                        {t("taskLabel", { n: i + 1 })}
                        {(completedTasks.includes(i) || isLessonPassed) && (
                            <svg className="w-4 h-4 inline-block ml-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>

            {/* Pass Criteria Info Box */}
            <div className="w-full mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex items-start gap-3 shadow-sm">
                <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 leading-relaxed">
                    {t("passCriteriaBefore")}
                    <span className="font-bold">{t("passCriteriaHighlight")}</span>
                    {t("passCriteriaAfter")}
                </p>
            </div>

            {/* Main Typing Container */}
            {isLoadingInit ? (
                <div className="w-full h-64 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 animate-pulse flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{t("loadingState")}</span>
                </div>
            ) : (
                <div key={attemptId}>
                    <TypingArea
                        text={lesson.tasks[activeTaskIndex]}
                        initialUserInput={metrics.userInput}
                        disabled={isTaskPassed}
                        onProgress={handleProgress}
                        onComplete={handleComplete}
                    />
                </div>
            )}

            {/* Performance Badge & Stats Bar Area */}
            <div className="w-full mt-6">
                <AnimatePresence>
                    {isTaskPassed && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 16 }}
                            exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                            className="flex justify-center w-full overflow-hidden"
                        >
                            <div className={`px-6 py-2 rounded-full border border-solid flex items-center gap-2 font-bold tracking-wide backdrop-blur-sm ${getPerformanceLevel(metrics.netWpm).colorClass}`}>
                                <span className="text-lg leading-none">{getPerformanceLevel(metrics.netWpm).icon}</span>
                                {t("performancePrefix")} {tPerf(getPerformanceLevel(metrics.netWpm).key)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4 hover:border-brand/30 hover:shadow-brand/20 transition-all duration-300">
                    <div className="flex flex-col items-center flex-1 min-w-[80px]">
                        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">{t("wpm")}</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.netWpm}</span>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex flex-col items-center flex-1 min-w-[80px]">
                        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">{t("accuracy")}</span>
                        <span className={`text-3xl font-bold ${metrics.accuracy < 90 && metrics.accuracy > 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{metrics.accuracy}%</span>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex flex-col items-center flex-1 min-w-[80px]">
                        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">{t("errors")}</span>
                        <span className={`text-3xl font-bold ${metrics.errors > 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{metrics.errors}</span>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex flex-col items-center flex-1 min-w-[80px]">
                        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">{t("time")}</span>
                        <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white pt-1">{formatTime(metrics.duration)}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleRestartTask}
                    className="px-8 py-3 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-brand/50 hover:text-brand dark:hover:text-brand transition-all shadow-sm focus:outline-none"
                >
                    {t("restartTask")}
                </button>
                {isTaskPassed && activeTaskIndex < totalTasks - 1 && (
                    <button
                        onClick={handleNextTask}
                        className="relative px-8 py-3 bg-brand text-background rounded-full font-medium overflow-hidden transition-all shadow-sm focus:outline-none select-none group/btn hover:shadow-brand/30"
                    >
                        <motion.span
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                            {t("nextTask")} <span className="ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
                        </span>
                    </button>
                )}
                {isLessonPassed && activeTaskIndex === totalTasks - 1 && (
                    <Link
                        href="/lessons"
                        className="relative inline-flex px-8 py-3 bg-brand text-background rounded-full font-medium overflow-hidden transition-all shadow-sm focus:outline-none select-none group/btn hover:shadow-brand/30"
                    >
                        <motion.span
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                            {t("nextLesson")} <span className="ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
                        </span>
                    </Link>
                )}
            </div>

        </div>
    );
}
