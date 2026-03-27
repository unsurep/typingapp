'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import KeyboardHandGuide from "@/components/KeyboardHandGuide";
import ResultCard from "@/components/ResultCard";
import AdSlot from "@/components/AdSlot";
import { toast } from 'sonner';
import Link from 'next/link';
import { TYPING_TEXTS } from '@/lib/texts';
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_METRICS: TypingResult = {
    grossWpm: 0,
    netWpm: 0,
    accuracy: 100,
    errors: 0,
    duration: 0
};

async function postTestResult(payload: {
    duration_seconds: number;
    gross_wpm: number;
    net_wpm: number;
    accuracy: number;
    errors: number;
}) {
    const res = await fetch("/api/test/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
}

function TestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const durationParam = searchParams.get('duration');
    const initialDuration = durationParam ? parseInt(durationParam, 10) : 60;

    const [duration, setDuration] = useState(initialDuration);
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [hasStarted, setHasStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [metrics, setMetrics] = useState<TypingResult>(INITIAL_METRICS);
    const [isGuest, setIsGuest] = useState(false);
    // Seed initial text randomly without a mount-time state update.
    const [textIndex, setTextIndex] = useState(() =>
        Math.floor(Math.random() * TYPING_TEXTS.length)
    );
    const [isDurationMenuOpen, setIsDurationMenuOpen] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (!data.authenticated) {
                setIsGuest(true);
            }
        }
        checkAuth();
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (hasStarted && !isComplete && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && hasStarted && !isComplete) {
            // Defer state update to avoid 'Cannot update a component while rendering a different component'
            // or React's synchronous state update in effect warnings
            const timeoutId = setTimeout(() => {
                setIsComplete(true);

                // Fire API tracking implicitly
                postTestResult({
                    duration_seconds: duration,
                    gross_wpm: metrics.grossWpm,
                    net_wpm: metrics.netWpm,
                    accuracy: metrics.accuracy,
                    errors: metrics.errors
                }).then((res) => {
                    if (res && res.success) {
                        toast.success('Test result saved!');
                    } else if (res && !res.success && res.reason !== 'guest') {
                        toast.error('Failed to save test result to the database.');
                    }
                }).catch(() => {
                    toast.error('An unexpected error occurred while saving.');
                });

            }, 0);
            return () => clearTimeout(timeoutId);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [hasStarted, isComplete, timeLeft, duration, metrics]);

    const handleStart = () => {
        if (!hasStarted) {
            setHasStarted(true);
        }
    };

    const handleProgress = (result: TypingResult) => {
        setMetrics(result);
    };

    const handleComplete = (result: TypingResult) => {
        setMetrics(result);
        setIsComplete(true);

        postTestResult({
            duration_seconds: duration,
            gross_wpm: result.grossWpm,
            net_wpm: result.netWpm,
            accuracy: result.accuracy,
            errors: result.errors
        }).then((res) => {
            if (res && res.success) {
                toast.success('Test result saved!');
            } else if (res && !res.success && res.reason !== 'guest') {
                toast.error('Failed to save test result to the database.');
            }
        }).catch(() => {
            toast.error('An unexpected error occurred while saving.');
        });
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleReset = () => {
        setHasStarted(false);
        setIsComplete(false);
        setTimeLeft(duration);
        setMetrics(INITIAL_METRICS);

        // Pick a different random text
        setTextIndex(prevIndex => {
            if (TYPING_TEXTS.length <= 1) return prevIndex;
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * TYPING_TEXTS.length);
            } while (nextIndex === prevIndex);
            return nextIndex;
        });

        setResetKey(prev => prev + 1);
    };

    const handleDurationChange = (newDuration: number) => {
        // Prevent mid-test duration changes to avoid confusion
        if (hasStarted && !isComplete) return;
        if (newDuration === duration) return;

        setDuration(newDuration);
        setHasStarted(false);
        setIsComplete(false);
        setTimeLeft(newDuration);
        setMetrics(INITIAL_METRICS);

        // Pick a different random text when switching durations
        setTextIndex(prevIndex => {
            if (TYPING_TEXTS.length <= 1) return prevIndex;
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * TYPING_TEXTS.length);
            } while (nextIndex === prevIndex);
            return nextIndex;
        });

        setResetKey(prev => prev + 1);

        // Sync chosen duration into the URL for shareability/persistence
        const params = new URLSearchParams(searchParams.toString());
        params.set('duration', String(newDuration));
        router.replace(`?${params.toString()}`, { scroll: false });
        setIsDurationMenuOpen(false);
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {isGuest && (
                <div className="mb-8 bg-yellow-50 dark:bg-zinc-900/40 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-yellow-800 dark:text-yellow-200 text-sm shadow-sm gap-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <span>You are practicing as a guest. <strong>Your results will not be saved.</strong></span>
                    </div>
                    <Link href="/login" className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 hover:bg-yellow-200 dark:hover:bg-yellow-900/60 rounded-lg transition-colors whitespace-nowrap font-semibold border border-yellow-200 dark:border-yellow-800">
                        Sign In to Save
                    </Link>
                </div>
            )}

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Typing <span className="text-brand">Test</span>
                </h1>
                <div className="relative flex items-center sm:items-end">
                    <button
                        type="button"
                        onClick={() => setIsDurationMenuOpen(prev => !prev)}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <span>{duration} Seconds</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${isDurationMenuOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isDurationMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg py-1 text-sm z-10">
                            <button
                                type="button"
                                onClick={() => handleDurationChange(60)}
                                className={`w-full text-left px-3 py-1.5 rounded-t-xl transition-colors ${duration === 60
                                    ? 'bg-brand/10 text-brand'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                60 seconds
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDurationChange(120)}
                                className={`w-full text-left px-3 py-1.5 rounded-b-xl transition-colors ${duration === 120
                                    ? 'bg-brand/10 text-brand'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                120 seconds
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {!isComplete ? (
                <>
                    {/* Main Typing Interface */}

                    {/* Big Timer */}
                    <div className="text-center mb-8">
                        <h2 className={`text-6xl md:text-7xl font-mono font-bold tracking-tighter ${timeLeft <= 10 && hasStarted ? 'text-red-500 animate-pulse' : 'text-black dark:text-white'}`}>
                            {formatTime(timeLeft)}
                        </h2>
                    </div>

                    {/* Main Typing Interface & Stats */}
                    <div className="relative">
                        <TypingArea
                            key={resetKey}
                            text={TYPING_TEXTS[textIndex]}
                            disabled={isComplete}
                            onStart={handleStart}
                            onProgress={handleProgress}
                            onComplete={handleComplete}
                        />
                    </div>

                    {/* Hand Placement Guide overlay */}
                    <AnimatePresence>
                        {!hasStarted && (
                            <KeyboardHandGuide />
                        )}
                    </AnimatePresence>

                    <StatsBar
                        wpm={metrics.netWpm}
                        accuracy={metrics.accuracy}
                        errors={metrics.errors}
                        time={formatTime(metrics.duration)}
                    />

                    <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                        <button
                            onClick={handleReset}
                            className="px-8 py-3 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-brand/50 hover:text-brand dark:hover:text-brand transition-all shadow-sm focus:outline-none cursor-pointer"
                        >
                            Restart
                        </button>
                    </div>
                </>
            ) : (
                <div className="mt-8 xl:mt-12">
                    <ResultCard wpm={metrics.netWpm} accuracy={metrics.accuracy} errors={metrics.errors} duration={duration} timeLeft={timeLeft} onRetry={handleReset} />
                    <AdSlot
                        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULTS}
                        className="mt-8 w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 p-3"
                    />
                </div>
            )}

        </div>
    );
}

export default function TestPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-xl font-mono">Loading Test...</div>}>
            <TestContent />
        </Suspense>
    );
}
