'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface TypingResult {
    grossWpm: number;
    netWpm: number;
    accuracy: number;
    errors: number;
    duration: number; // in seconds
    userInput?: string; // Optional typed text history for saving
}

interface TypingAreaProps {
    text: string;
    disabled?: boolean;
    initialUserInput?: string;
    onComplete?: (result: TypingResult) => void;
    onProgress?: (result: TypingResult) => void;
    onStart?: () => void;
}

export default function TypingArea({ text, disabled = false, initialUserInput = '', onComplete, onProgress, onStart }: TypingAreaProps) {
    const [userInput, setUserInput] = useState(initialUserInput);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Focus the hidden text area when clicking anywhere in the container
    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const calculateMetrics = (start: number, end: number, input: string): TypingResult => {
        const elapsedSeconds = (end - start) / 1000;

        let errors = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== text[i]) {
                errors++;
            }
        }

        const totalTypedCharacters = input.length;

        // If elapsed time is less than 1 second, avoid division by near-zero or returning inflated spikes.
        if (elapsedSeconds < 1 || totalTypedCharacters === 0) {
            return {
                grossWpm: 0,
                netWpm: 0,
                accuracy: 0,
                errors,
                duration: elapsedSeconds
            };
        }

        const durationMin = elapsedSeconds / 60;

        // grossWPM = (totalTypedCharacters / 5) / (elapsedSeconds / 60)
        const grossWpm = Math.round((totalTypedCharacters / 5) / durationMin);

        // netWPM = grossWPM - (errors / (elapsedSeconds / 60))
        const netWpm = Math.max(0, Math.round(grossWpm - (errors / durationMin)));

        // accuracy = ((totalTypedCharacters - errors) / totalTypedCharacters) * 100
        const correctCharacters = totalTypedCharacters - errors;
        const accuracyRaw = (correctCharacters / totalTypedCharacters) * 100;
        const accuracy = Number(accuracyRaw.toFixed(2));

        return {
            grossWpm,
            netWpm,
            accuracy,
            errors,
            duration: elapsedSeconds,
            userInput: input
        };
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Prevent typing beyond the prompt length
        if (value.length > text.length) {
            return;
        }

        // Prevent backspacing or deleting characters
        if (value.length < userInput.length) {
            return;
        }

        let currentStartTime = startTime;

        // Start timer on first character typed
        if (!currentStartTime && value.length > 0) {
            currentStartTime = Date.now();
            setStartTime(currentStartTime);
            if (onStart) onStart();
        }

        setUserInput(value);

        // Check for completion
        if (value.length === text.length && !endTime) {
            const end = Date.now();
            setEndTime(end);

            if (currentStartTime) {
                const metrics = calculateMetrics(currentStartTime, end, value);
                if (onComplete) onComplete(metrics);
            }
        } else if (currentStartTime) {
            // Live keystroke updates
            const metrics = calculateMetrics(currentStartTime, Date.now(), value);
            if (onProgress) onProgress(metrics);
        }
    };

    // Live interval updates for elapsed time if user pauses
    useEffect(() => {
        if (!startTime || endTime) return;

        const intervalId = setInterval(() => {
            const metrics = calculateMetrics(startTime, Date.now(), userInput);
            if (onProgress) onProgress(metrics);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startTime, endTime, userInput, onProgress]);


    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
    };

    // Keep input synchronized with initial prop updates (e.g. tab switching)
    useEffect(() => {
        setUserInput(initialUserInput);
    }, [initialUserInput]);

    // Auto-focus on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [initialUserInput]); // Auto focus when a new lesson test initializes

    // Global keydown listener to refocus when typing starts anywhere on the page
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // Ignore if we are already focused or if disabled
            if (isFocused || disabled) return;

            // Only capture single character keys (letters, numbers, space)
            // Avoid capturing Escape, Enter, Tab, meta keys, etc.
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isFocused, disabled]);

    // Render characters with styling
    const renderCharacters = () => {
        return text.split('').map((char, index) => {
            const isCurrent = index === userInput.length;
            let stateClass = 'text-muted/60 dark:text-muted/40'; // Default un-typed

            if (index < userInput.length) {
                const isCorrect = userInput[index] === char;
                stateClass = isCorrect
                    ? 'text-green-600 font-semibold dark:text-green-400'
                    : 'text-red-600 font-semibold dark:text-red-400';
            }

            return (
                <span key={index} className={cn("relative", stateClass)}>
                    {/* The character itself */}
                    <span
                        className={cn(
                            "opacity-100 transition-colors duration-200",
                            index < userInput.length && userInput[index] !== char && "text-red-600 border-b-2 border-red-600 border-opacity-50 dark:text-red-400 dark:border-red-400"
                        )}
                    >
                        {char}
                    </span>

                    {/* The smooth Caret */}
                    {isCurrent && (
                        <motion.div
                            layoutId="caret"
                            className={cn(
                                "absolute bg-brand w-[2px] md:w-[3px] rounded-full",
                                !isFocused && "opacity-50" // Dim the caret slightly when unfocused
                            )}
                            style={{
                                left: "-1px",
                                top: "10%",
                                height: "80%",
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                </span>
            );
        });
    };

    return (
        <div
            className="w-full relative rounded-2xl overflow-hidden flex flex-col cursor-text group border-2 border-yellow-400 dark:border-yellow-500"
            onClick={handleContainerClick}
        >
            {/* Display Area without blur effect */}
            <div className={cn(
                "p-6 md:p-8 transition-all duration-300 ease-in-out relative",
                "bg-transparent"
            )}>
                <div className="text-xl md:text-3xl font-mono leading-relaxed select-none wrap-break-word whitespace-pre-wrap tracking-wide">
                    {renderCharacters()}
                </div>
            </div>

            {/* Hidden Input Area */}
            <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                onPaste={handlePaste}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                className="opacity-0 absolute inset-0 w-full h-full resize-none pointer-events-none"
                spellCheck={false}
                autoComplete="off"
            />
        </div>
    );
}
