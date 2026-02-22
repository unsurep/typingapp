'use client';

import React, { useState, useCallback } from "react";
import TypingArea, { TypingResult } from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";

const PRACTICE_TEXTS = [
    "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Typing fast and accurately is an essential skill for modern jobs.",
    "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions.",
    "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    "A journey of a thousand miles begins with a single step. Success is not final, failure is not fatal: it is the courage to continue that counts. Believe you can and you're halfway there.",
    "Water is the most common liquid on Earth. It covers about 71% of the Earth's surface. Safe drinking water is essential to humans and other lifeforms even though it provides no calories or organic nutrients.",
    "The Milky Way is the galaxy that includes our Solar System. The name describes the galaxy's appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye.",
    "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static type definitions to JavaScript, allowing developers to catch errors early.",
    "In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values.",
    "Photography is the art, application and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material.",
    "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents."
];

export default function PracticePage() {
    const [textIndex, setTextIndex] = useState(0);
    const [resetKey, setResetKey] = useState(0);

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
    }, []);

    const resetMetrics = () => {
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setTimeElapsed(null);
    };

    const handleRestart = () => {
        setResetKey(prev => prev + 1);
        resetMetrics();
    };

    const handleChangeText = () => {
        const nextIndex = (textIndex + 1) % PRACTICE_TEXTS.length;

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
                text={PRACTICE_TEXTS[textIndex]}
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
            </div>

        </div>
    );
}
