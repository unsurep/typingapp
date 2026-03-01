'use client';

import React, { useState, useCallback } from "react";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import { TYPING_TEXTS } from "@/lib/texts";
import { motion } from "framer-motion";

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
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header Info */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Typing <span className="text-brand">Practice</span>
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 font-mono">
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
            <div className="w-full mt-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4 hover:border-brand/30 hover:shadow-brand/20 transition-all duration-300">
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
                    className="px-8 py-3 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-brand/50 hover:text-brand dark:hover:text-brand transition-all shadow-sm focus:outline-none"
                >
                    Restart
                </button>
                <button
                    onClick={handleChangeText}
                    className="px-8 py-3 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-brand/50 hover:text-brand dark:hover:text-brand transition-all shadow-sm focus:outline-none"
                >
                    Change Text
                </button>
                <button
                    onClick={handleChangeText}
                    disabled={!isComplete}
                    className={`relative px-8 py-3 rounded-full font-medium overflow-hidden transition-all shadow-sm focus:outline-none select-none group/btn ${isComplete
                        ? "bg-brand text-background hover:shadow-brand/30"
                        : "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed opacity-60"
                        }`}
                >
                    {isComplete && (
                        <motion.span
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    )}
                    <span className="relative z-10 flex items-center justify-center">
                        Next Test <span className={`ml-2 transition-transform ${isComplete ? 'group-hover/btn:translate-x-1' : ''}`}>→</span>
                    </span>
                </button>
            </div>

        </div>
    );
}
