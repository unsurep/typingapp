'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface TypingResult {
    grossWpm: number;
    netWpm: number;
    accuracy: number;
    errors: number;
    duration: number; // in seconds
}

interface TypingAreaProps {
    text: string;
    disabled?: boolean;
    onComplete?: (result: TypingResult) => void;
    onProgress?: (result: TypingResult) => void;
    onStart?: () => void;
}

export default function TypingArea({ text, disabled = false, onComplete, onProgress, onStart }: TypingAreaProps) {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
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
            duration: elapsedSeconds
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

    // Auto-focus on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Render characters with styling
    const renderCharacters = () => {
        return text.split('').map((char, index) => {
            let stateClass = 'text-gray-500 dark:text-gray-400'; // Default un-typed

            if (index < userInput.length) {
                const isCorrect = userInput[index] === char;
                stateClass = isCorrect
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            } else if (index === userInput.length) {
                // Current character cursor indicator
                stateClass = 'text-gray-900 dark:text-white underline decoration-2 underline-offset-4';
            }

            return (
                <span key={index} className={stateClass}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div
            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col cursor-text relative"
            onClick={handleContainerClick}
        >
            {/* Display Area */}
            <div className="bg-gray-50 dark:bg-black p-6 md:p-8">
                <p className="text-xl md:text-2xl font-mono leading-relaxed select-none wrap-break-word whitespace-pre-wrap">
                    {renderCharacters()}
                </p>
            </div>

            {/* Hidden Input Area */}
            <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={disabled}
                className="opacity-0 absolute inset-0 w-full h-full resize-none pointer-events-none"
                spellCheck={false}
                autoComplete="off"
            />
        </div>
    );
}
