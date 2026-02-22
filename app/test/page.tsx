'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import ResultCard from "@/components/ResultCard";
import { toast } from 'sonner';
import { saveTestResult } from './actions';

function TestContent() {
    const searchParams = useSearchParams();
    const durationParam = searchParams.get('duration');
    const initialDuration = durationParam ? parseInt(durationParam, 10) : 60;

    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [hasStarted, setHasStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [metrics, setMetrics] = useState<TypingResult>({
        grossWpm: 0,
        netWpm: 0,
        accuracy: 100,
        errors: 0,
        duration: 0
    });

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
                saveTestResult({
                    duration_seconds: initialDuration,
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
    }, [hasStarted, isComplete, timeLeft]);

    const handleStart = () => {
        if (!hasStarted) {
            setHasStarted(true);
        }
    };

    const handleProgress = (result: TypingResult) => {
        setMetrics(result);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleReset = () => {
        setHasStarted(false);
        setIsComplete(false);
        setTimeLeft(initialDuration);
        setMetrics({
            grossWpm: 0,
            netWpm: 0,
            accuracy: 100,
            errors: 0,
            duration: 0
        });
        setResetKey(prev => prev + 1);
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Typing Test
                </h1>
                <div className="px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm">
                    {initialDuration} Seconds
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
                    <TypingArea
                        key={resetKey}
                        text="The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Typing fast and accurately is an essential skill for modern jobs."
                        disabled={isComplete}
                        onStart={handleStart}
                        onProgress={handleProgress}
                    />
                    <StatsBar
                        wpm={metrics.netWpm}
                        accuracy={metrics.accuracy}
                        errors={metrics.errors}
                        time={formatTime(metrics.duration)}
                    />

                    {/* Bottom Buttons */}
                    <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                        <button className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white">
                            Start Test
                        </button>
                        <button onClick={handleReset} className="px-8 py-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white">
                            Restart
                        </button>
                    </div>
                </>
            ) : (
                <div className="mt-8 xl:mt-12">
                    <ResultCard wpm={metrics.netWpm} accuracy={metrics.accuracy} errors={metrics.errors} duration={initialDuration} onRetry={handleReset} />
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
