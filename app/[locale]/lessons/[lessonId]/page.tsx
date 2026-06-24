'use client';

import React, { use, useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import TypingKeyboard from "@/components/TypingKeyboard";
import { toast } from "sonner";
import { getLessons } from "@/lib/lessons";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { getPerformanceLevel } from "@/utils/performance";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { useGuestProgress } from "@/hooks/useGuestProgress";
import GuestSignupBanner from "@/components/GuestSignupBanner";

const STEP_ICON: Record<string, string> = {
    place: "👆",
    key: "🔑",
    drill: "🔁",
    words: "📝",
    sentence: "📄",
};

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
    const { getLessonCompletedTasks, saveTaskCompletion } = useGuestProgress();

    const lessons = getLessons(locale);

    // Find the lesson. If invalid ID, redirect to 404 page
    const lesson = lessons.find(l => l.id === parsedId);
    if (!lesson) {
        notFound();
    }

    const totalTasks = lesson.steps.length;
    const [activeTaskIndex, setActiveTaskIndex] = useState(0);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [taskScores, setTaskScores] = useState<Record<number, { wpm: number, accuracy: number, userInput?: string }>>({});

    const [isLessonPassed, setIsLessonPassed] = useState(false);
    const [isTaskPassed, setIsTaskPassed] = useState(false);
    const [attemptId, setAttemptId] = useState(0);
    const [isLoadingInit, setIsLoadingInit] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const [activeChar, setActiveChar] = useState<string | null>(null);
    const [metrics, setMetrics] = useState<TypingResult>({
        grossWpm: 0,
        netWpm: 0,
        accuracy: 100,
        errors: 0,
        duration: 0,
        userInput: ''
    });

    const activeStep = lesson.steps[activeTaskIndex];

    const resetMetrics = () => setMetrics({ grossWpm: 0, netWpm: 0, accuracy: 100, errors: 0, duration: 0, userInput: '' });

    const applyTaskScore = (index: number) => {
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
            resetMetrics();
        }
    };

    const goToStep = (index: number) => {
        setActiveTaskIndex(index);
        setIsTaskPassed(completedTasks.includes(index) || isLessonPassed);
        setAttemptId(prev => prev + 1);
        applyTaskScore(index);
    };

    useEffect(() => {
        async function fetchInitialProgress() {
            try {
                const authRes = await fetch('/api/auth/me');
                const authData = await authRes.json();

                // All lessons are open during AdSense review period

                // Guest: load progress from localStorage
                if (!authData.authenticated) {
                    setIsGuest(true);
                    const guestCompleted = getLessonCompletedTasks(parsedId);
                    setCompletedTasks(guestCompleted);
                    const allDone = lesson && guestCompleted.length >= lesson.steps.length;
                    if (allDone) {
                        setIsLessonPassed(true);
                        setIsTaskPassed(true);
                        setActiveTaskIndex(0);
                    } else {
                        const nextIter = lesson?.steps.findIndex((_, i) => !guestCompleted.includes(i));
                        const startingIndex = (nextIter !== undefined && nextIter !== -1) ? nextIter : 0;
                        setActiveTaskIndex(startingIndex);
                    }
                    setIsLoadingInit(false);
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
                        const nextIter = lesson?.steps.findIndex((_, i) => !fetchedCompletedTasks.includes(i));
                        let startingIndex = 0;
                        if (nextIter !== undefined && nextIter !== -1) {
                            startingIndex = nextIter;
                        }
                        setActiveTaskIndex(startingIndex);

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
            toast.error(`Accuracy too low (${finalMetrics.accuracy}%). You need 90% to pass this step!`);
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
            toast.success(`Step ${activeTaskIndex + 1} Passed!`);
        }

        setIsTaskPassed(true);

        // Auto-advance to the next step shortly after passing, so the learner
        // sees the success feedback first. The Next button remains as a fallback.
        if (!isLessonNowCompleted && activeTaskIndex < totalTasks - 1) {
            const advanceFrom = activeTaskIndex;
            setTimeout(() => {
                setActiveTaskIndex(prev => {
                    if (prev !== advanceFrom) return prev; // user already navigated away
                    const nextIndex = prev + 1;
                    setIsTaskPassed(completedTasks.includes(nextIndex));
                    setAttemptId(a => a + 1);
                    applyTaskScore(nextIndex);
                    return nextIndex;
                });
            }, 900);
        }

        // Persist progress for guests via localStorage
        if (isGuest) {
            saveTaskCompletion(parsedId, activeTaskIndex);
        }

        // Try saving to DB
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
            setTaskScores(saveRes.taskScores);
        }
    };

    const handleRestartTask = () => {
        setIsTaskPassed(completedTasks.includes(activeTaskIndex));
        setAttemptId(prev => prev + 1);
        resetMetrics();
    };

    const handleNextTask = () => {
        if (activeTaskIndex < totalTasks - 1) {
            goToStep(activeTaskIndex + 1);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const completedCount = isLessonPassed ? totalTasks : completedTasks.length;

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

            {/* Main Lesson Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">{lesson.stage}</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {lesson.title.split(':').map((part, index, array) => (
                            <React.Fragment key={index}>
                                {index === array.length - 1 ? <span className="text-brand">{part}</span> : part + ':'}
                            </React.Fragment>
                        ))}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-zinc-700">
                            {lesson.focus}
                        </span>
                        <span className="inline-block px-3 py-1 bg-brand/10 text-sm font-semibold text-brand rounded-md border border-brand/20">
                            {t("goalLabel")}: {lesson.goalWpm} {t("wpm")}
                        </span>
                    </div>
                </div>

                {/* Completion Badge */}
                {isLoadingInit ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 rounded-lg shadow-sm shrink-0 animate-pulse">
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
                        <span className="text-sm font-semibold">{t("stepOf", { n: activeTaskIndex + 1, total: totalTasks })}</span>
                    </div>
                )}
            </div>

            {/* Step progress dots */}
            <div className="w-full flex flex-wrap gap-1.5 mb-6">
                {lesson.steps.map((step, i) => {
                    const done = completedTasks.includes(i) || isLessonPassed;
                    const active = activeTaskIndex === i;
                    return (
                        <button
                            key={i}
                            onClick={() => goToStep(i)}
                            title={`${t("stepType." + step.type)} - ${t("stepOf", { n: i + 1, total: totalTasks })}`}
                            className={`group flex items-center justify-center h-9 min-w-9 px-2.5 rounded-lg text-sm font-bold transition-all border ${active
                                ? 'bg-brand text-background border-transparent shadow-md shadow-brand/20 scale-105'
                                : done
                                    ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                                    : 'bg-white text-gray-400 border-gray-200 hover:border-brand/40 dark:bg-zinc-900 dark:text-gray-500 dark:border-zinc-800'
                                }`}
                        >
                            {done && !active ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <span className="text-xs">{i + 1}</span>
                            )}
                        </button>
                    );
                })}
                <div className="ml-auto self-center text-xs font-medium text-gray-500 dark:text-gray-400">
                    {completedCount}/{totalTasks}
                </div>
            </div>

            {/* Guest signup nudge */}
            <GuestSignupBanner isGuest={isGuest} />

            {/* Instruction / coaching box */}
            <div className="w-full mb-5 p-4 sm:p-5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg leading-none">{STEP_ICON[activeStep.type]}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">{t("stepType." + activeStep.type)}</span>
                </div>
                <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                    {activeStep.instruction}
                </p>
            </div>

            {/* Main Typing Container */}
            {isLoadingInit ? (
                <div className="w-full h-48 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 animate-pulse flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{t("loadingState")}</span>
                </div>
            ) : (
                <div key={attemptId}>
                    <TypingArea
                        text={activeStep.text}
                        initialUserInput={metrics.userInput}
                        disabled={isTaskPassed}
                        onProgress={handleProgress}
                        onComplete={handleComplete}
                        onActiveCharChange={setActiveChar}
                    />
                </div>
            )}

            {/* Interactive keyboard guide */}
            {!isLoadingInit && (
                <div className="w-full mt-2 mb-5">
                    <TypingKeyboard
                        targetKeys={activeStep.keys}
                        nextChar={isTaskPassed ? null : activeChar}
                    />
                </div>
            )}

            {/* Pass criteria hint */}
            <p className="w-full mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
                {t("passCriteriaBefore")}
                <span className="font-bold text-gray-700 dark:text-gray-300">{t("passCriteriaHighlight")}</span>
                {t("passCriteriaAfter")}
            </p>

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
