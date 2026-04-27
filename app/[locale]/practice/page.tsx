'use client';

import React, { useState, useCallback, useMemo } from "react";
import { useLocale } from "next-intl";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import AdSlot from "@/components/AdSlot";
import StatsBar from "@/components/StatsBar";
import KeyboardHandGuide from "@/components/KeyboardHandGuide";
import { getTypingTexts } from "@/lib/texts";
import type { AppLocale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function PracticePage() {
    const locale = useLocale() as AppLocale;
    const typingTexts = useMemo(() => getTypingTexts(locale), [locale]);
    const t = useTranslations("Practice");

    const [textIndex, setTextIndex] = useState(0);
    const [resetKey, setResetKey] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

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
        setHasStarted(false);
    };

    const handleRestart = () => {
        setResetKey(prev => prev + 1);
        resetMetrics();
    };

    const handleChangeText = () => {
        const nextIndex = (textIndex + 1) % typingTexts.length;

        setTextIndex(nextIndex);
        setResetKey(prev => prev + 1);
        resetMetrics();
    };

    // Format time display
    const timeDisplay = timeElapsed === null
        ? t("freeMode")
        : `${Math.floor(timeElapsed / 60)}:${Math.floor(timeElapsed % 60).toString().padStart(2, '0')}`;

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header Info */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("titleBefore")} <span className="text-brand">{t("titleHighlight")}</span>
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 font-mono">
                    {t("subtitle")}
                </p>
            </div>

            {/* Main Typing Container */}
            <div className="relative">
                <TypingArea
                    key={resetKey}
                    text={typingTexts[textIndex]}
                    onStart={() => setHasStarted(true)}
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

            {/* Stats Bar */}
            <div className="w-full mt-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4 hover:border-brand/30 hover:shadow-brand/20 transition-all duration-300">
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{t("wpm")}</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{wpm}</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{t("accuracy")}</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{accuracy}%</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{t("errors")}</span>
                    <span className={`text-3xl font-bold ${errors > 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{errors}</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{t("time")}</span>
                    <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white pt-1">{timeDisplay}</span>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleRestart}
                    className="px-8 py-3 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-brand/50 hover:text-brand dark:hover:text-brand cursor-pointer transition-all shadow-sm focus:outline-none"
                >
                    {t("restart")}
                </button>
                <button
                    onClick={handleChangeText}
                    className="px-8 py-3 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-brand/50 hover:text-brand dark:hover:text-brand cursor-pointer transition-all shadow-sm focus:outline-none"
                >
                    {t("changeText")}
                </button>
                <button
                    onClick={handleChangeText}
                    disabled={!isComplete}
                    className={`relative px-8 py-3 rounded-full font-medium overflow-hidden transition-all shadow-sm cursor-pointer focus:outline-none select-none group/btn ${isComplete
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
                        {t("nextTest")} <span className={`ml-2 transition-transform ${isComplete ? 'group-hover/btn:translate-x-1' : ''}`}>→</span>
                    </span>
                </button>
            </div>

            <AdSlot
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRACTICE}
                className="mt-10 w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 p-3"
            />

            {/* SEO Content Section */}
            <section className="mt-20 max-w-3xl mx-auto w-full">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Free Typing Practice — No Timer, No Pressure</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Typing practice mode lets you type at your own pace without a countdown. There&apos;s no timer running and no score at the end — just you, the text, and the feedback from your fingers. This makes it the ideal environment for building the kind of relaxed, accurate muscle memory that timed tests can&apos;t develop on their own.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Your WPM, accuracy, and error count are tracked in real time so you can see how you&apos;re doing as you go. When you finish a passage, you can move to the next text or restart the same one. Repeating the same passage several times in a row is one of the most effective ways to lock in problem sequences and smooth out rhythm breaks.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">How to Get the Most from Practice Sessions</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    The goal in practice mode isn&apos;t to type as fast as possible — it&apos;s to type as correctly as possible at a speed that feels slightly challenging but sustainable. If your accuracy drops below 95%, slow down until it stabilizes. Speed follows accuracy, not the other way around.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Focus on keeping your fingers on the home row (ASDF and JKL;) and reaching for every key without looking down. The first week of correcting your finger placement will feel slow and uncomfortable — that&apos;s normal. By the second week, the new patterns start to feel natural, and speed climbs automatically.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Practice vs. Test Mode</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Use practice mode to build your technique — correct finger placement, home row positioning, accuracy over speed. Use test mode to benchmark your progress once a week. Most people improve fastest when they spend 80% of their time in practice mode and 20% in test mode. The practice builds the habit; the test measures it.
                </p>
            </section>

        </div>
    );
}
