'use client';

import Link from "next/link";
import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import { toast } from "sonner";
import { saveLessonProgress, getLessonProgress } from "../actions";
import { lessons } from "@/lib/lessons";
import { createClient } from '@/utils/supabase/client';

// In Next.js 15, dynamic route parameters must be awaited or unwrapped via `use()`
export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = use(params);
    const parsedId = parseInt(lessonId, 10);

    // Find the lesson. If invalid ID, redirect to 404 page
    const lesson = lessons.find(l => l.id === parsedId);
    if (!lesson) {
        notFound();
    }

    const [isPassed, setIsPassed] = useState(false);
    const [isLoadingInit, setIsLoadingInit] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const [metrics, setMetrics] = useState<TypingResult>({
        grossWpm: 0,
        netWpm: 0,
        accuracy: 100,
        errors: 0,
        duration: 0
    });

    useEffect(() => {
        async function fetchInitialProgress() {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setIsGuest(true);
                }

                const res = await getLessonProgress(parsedId);
                if (res.success && res.passed) {
                    setIsPassed(true);
                }
            } catch (err) {
                console.error("Failed to fetch initial progress", err);
            } finally {
                setIsLoadingInit(false);
            }
        }
        fetchInitialProgress();
    }, [parsedId]);

    const handleProgress = (result: TypingResult) => {
        setMetrics(result);
    };

    const handleComplete = async (finalMetrics: TypingResult) => {
        setMetrics(finalMetrics);

        if (finalMetrics.accuracy < 90) {
            toast.error(`Accuracy too low (${finalMetrics.accuracy}%). You need 90% to pass!`);
            return;
        }

        toast.success("Lesson Passed!");
        setIsPassed(true);

        // Lazily synchronize DB via Server Action
        await saveLessonProgress(parsedId, finalMetrics);
    };

    const handleRestart = () => {
        setIsPassed(false);
        setMetrics({
            grossWpm: 0,
            netWpm: 0,
            accuracy: 100,
            errors: 0,
            duration: 0
        });
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">

            {/* Top Header Navigation */}
            <Link href="/lessons" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 font-medium mb-8 flex items-center transition-colors w-fit">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Lessons
            </Link>

            {isGuest && (
                <div className="mb-8 bg-yellow-50 dark:bg-zinc-900/40 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-yellow-800 dark:text-yellow-200 text-sm shadow-sm gap-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <span>You are practicing as a guest. <strong>Your lesson progress will not be saved.</strong></span>
                    </div>
                    <Link href="/login" className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 hover:bg-yellow-200 dark:hover:bg-yellow-900/60 rounded-lg transition-colors whitespace-nowrap font-semibold border border-yellow-200 dark:border-yellow-800">
                        Sign In to Save
                    </Link>
                </div>
            )}

            {/* Main Lesson Header with Locked Badge */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {lesson.title}
                    </h1>
                    <span className="inline-block mt-3 px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-zinc-700">
                        {lesson.focus}
                    </span>
                </div>

                {/* Locked Completion Badge */}
                {isPassed ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-green-600 dark:text-green-400 rounded-lg shadow-sm shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold">Completed</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 rounded-lg shadow-sm shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-sm font-semibold">Locked</span>
                    </div>
                )}
            </div>

            {/* Pass Criteria Info Box */}
            <div className="w-full mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex items-start gap-3 shadow-sm">
                <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 leading-relaxed">
                    You must reach <span className="font-bold">90% accuracy</span> and complete the text to pass this lesson.
                </p>
            </div>

            {/* Main Typing Container */}
            {isLoadingInit ? (
                <div className="w-full h-64 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 animate-pulse flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Loading lesson state...</span>
                </div>
            ) : (
                <div key={isPassed ? 'clean' : 'dirty'}>
                    <TypingArea
                        text={lesson.text}
                        disabled={isPassed}
                        onProgress={handleProgress}
                        onComplete={handleComplete}
                    />
                </div>
            )}

            {/* Stats Bar */}
            <div className="w-full mt-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4">
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">WPM</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.netWpm}</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">Accuracy</span>
                    <span className={`text-3xl font-bold ${metrics.accuracy < 90 && metrics.accuracy > 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{metrics.accuracy}%</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">Errors</span>
                    <span className={`text-3xl font-bold ${metrics.errors > 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{metrics.errors}</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">Time</span>
                    <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white pt-1">{formatTime(metrics.duration)}</span>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleRestart}
                    className="px-8 py-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white">
                    Restart
                </button>
                {isPassed && (
                    <Link
                        href="/lessons"
                        className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white"
                    >
                        Next Lesson
                    </Link>
                )}
            </div>

        </div>
    );
}
