'use client';

import React, { useState, useCallback } from "react";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import { TYPING_TEXTS } from "@/lib/texts";

export default function PracticePage() {
    const [textIndex, setTextIndex] = useState(0);
    const [resetKey, setResetKey] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Metrics state
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState<number | null>(null);

    const handleProgress = useCallback((result: TypingResult) => {
        setWpm(result.netWpm);
        setAccuracy(result.accuracy);
        setErrors(result.errors);
        setTimeElapsed(result.duration);
    }, []);

    const handleComplete = useCallback((result: TypingResult) => {
        setWpm(result.netWpm);
        setAccuracy(result.accuracy);
        setErrors(result.errors);
        setTimeElapsed(result.duration);
        setIsComplete(true);
    }, []);

    const resetMetrics = () => {
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setTimeElapsed(null);
        setIsComplete(false);
    };

    const handleRestart = () => {
        setResetKey(prev => prev + 1);
        resetMetrics();
    };

    const handleChangeText = () => {
        const nextIndex = (textIndex + 1) % TYPING_TEXTS.length;

        setTextIndex(nextIndex);
        setResetKey(prev => prev + 1);
        resetMetrics();
    };

    // Format time display
    const timeDisplay = timeElapsed === null
        ? "Free Mode"
        : `${Math.floor(timeElapsed / 60)}:${Math.floor(timeElapsed % 60).toString().padStart(2, '0')}`;

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">

            {/* Header Info */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Typing Practice
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Warm up your fingers and improve your accuracy in free practice mode.
                </p>
            </div>

            {/* Main Typing Container */}
            <TypingArea
                key={resetKey}
                text={TYPING_TEXTS[textIndex]}
                onProgress={handleProgress}
                onComplete={handleComplete}
            />

            {/* Stats Bar */}
            <div className="w-full mt-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4">
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">WPM</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{wpm}</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Accuracy</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{accuracy}%</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Errors</span>
                    <span className={`text-3xl font-bold ${errors > 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{errors}</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Time</span>
                    <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white pt-1">{timeDisplay}</span>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleRestart}
                    className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white"
                >
                    Restart
                </button>
                <button
                    onClick={handleChangeText}
                    className="px-8 py-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white"
                >
                    Change Text
                </button>
                <button
                    onClick={handleChangeText}
                    disabled={!isComplete}
                    className={`px-8 py-3 rounded-full font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-blue-400 ${isComplete
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed opacity-60"
                        }`}
                >
                    Next Test
                </button>
            </div>

        </div>
    );
}
