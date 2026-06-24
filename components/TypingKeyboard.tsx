'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Live on-screen keyboard for the guided lessons.
 * - Colour-codes keys by the finger that should press them (standard
 *   touch-typing colour chart, mirrored across both hands).
 * - Emphasises the lesson's target keys.
 * - Pulses the single next key the learner should press.
 */

type FingerId = 'LP' | 'LR' | 'LM' | 'LI' | 'RI' | 'RM' | 'RR' | 'RP' | 'TH';

const FINGER: Record<string, FingerId> = {
    '`': 'LP', '1': 'LP', q: 'LP', a: 'LP', z: 'LP',
    '2': 'LR', w: 'LR', s: 'LR', x: 'LR',
    '3': 'LM', e: 'LM', d: 'LM', c: 'LM',
    '4': 'LI', '5': 'LI', r: 'LI', f: 'LI', v: 'LI', t: 'LI', g: 'LI', b: 'LI',
    '6': 'RI', '7': 'RI', y: 'RI', h: 'RI', n: 'RI', u: 'RI', j: 'RI', m: 'RI',
    '8': 'RM', i: 'RM', k: 'RM', ',': 'RM',
    '9': 'RR', o: 'RR', l: 'RR', '.': 'RR',
    '0': 'RP', '-': 'RP', '=': 'RP', p: 'RP', '[': 'RP', ']': 'RP', ';': 'RP', "'": 'RP', '/': 'RP',
    ' ': 'TH',
};

// Finger → colour (mirrored across hands, as on classic typing charts).
const FINGER_COLOR: Record<FingerId, string> = {
    LP: '#f43f5e', RP: '#f43f5e', // pinkie — rose
    LR: '#f59e0b', RR: '#f59e0b', // ring — amber
    LM: '#10b981', RM: '#10b981', // middle — emerald
    LI: '#3b82f6', RI: '#3b82f6', // index — blue
    TH: '#94a3b8', // thumb — slate
};

const ROWS: string[][] = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];
const HOME_KEYS = new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
const ROW_INDENT = ['', 'ml-3 sm:ml-5', 'ml-5 sm:ml-8', 'ml-8 sm:ml-12'];

interface Props {
    /** Keys emphasised for this step (lowercase). */
    targetKeys?: string[];
    /** The next character the learner must type (raw char from the text). */
    nextChar?: string | null;
    /** Hide the finger-colour legend. */
    hideLegend?: boolean;
}

function Cap({ ch }: { ch: string }) {
    if (ch === ';') return <>;</>;
    return <>{ch.toUpperCase()}</>;
}

export default function TypingKeyboard({ targetKeys = [], nextChar, hideLegend }: Props) {
    const target = new Set(targetKeys.map((k) => k.toLowerCase()));
    const next = nextChar ? nextChar.toLowerCase() : null;
    const needsShift = !!nextChar && /[A-Z]/.test(nextChar);
    const nextIsSpace = nextChar === ' ';

    const renderKey = (ch: string, widthClass = 'w-8 sm:w-10') => {
        const finger = FINGER[ch];
        const color = finger ? FINGER_COLOR[finger] : '#94a3b8';
        const isTarget = target.has(ch);
        const isNext = next === ch;
        const isHome = HOME_KEYS.has(ch);

        return (
            <div
                key={ch}
                className={`relative ${widthClass} h-8 sm:h-10 rounded-md border-b-2 flex items-center justify-center text-[11px] sm:text-xs font-semibold select-none transition-all`}
                style={{
                    backgroundColor: isNext ? color : isTarget ? `${color}22` : undefined,
                    borderColor: isTarget || isNext ? color : undefined,
                    color: isNext ? '#fff' : isTarget ? color : undefined,
                }}
            >
                {/* neutral fallback styling when not active */}
                {!isTarget && !isNext && (
                    <span className="absolute inset-0 rounded-md border-b-2 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 -z-0" />
                )}
                <span className="relative z-10 flex items-center gap-0.5">
                    <Cap ch={ch} />
                    {isHome && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-0.5 rounded-full" style={{ backgroundColor: color }} />}
                </span>
                {isNext && (
                    <motion.span
                        layoutId="next-key-ring"
                        className="absolute -inset-1 rounded-lg border-2 pointer-events-none"
                        style={{ borderColor: color }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                    />
                )}
            </div>
        );
    };

    const modifier = (label: string, widthClass: string, active: boolean) => (
        <div
            className={`${widthClass} h-8 sm:h-10 rounded-md border-b-2 flex items-center justify-center text-[9px] sm:text-[10px] font-semibold select-none uppercase tracking-wide transition-all ${
                active
                    ? 'bg-brand text-background border-brand'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border-gray-200 dark:border-zinc-700'
            }`}
        >
            {label}
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <div className="flex flex-col gap-1 sm:gap-1.5 p-3 sm:p-4 bg-gray-50/70 dark:bg-zinc-900/60 rounded-2xl border border-gray-100 dark:border-zinc-800/60 shadow-inner backdrop-blur-sm overflow-x-auto max-w-full">
                {ROWS.map((row, i) => (
                    <div key={i} className={`flex gap-1 sm:gap-1.5 ${ROW_INDENT[i]}`}>
                        {i === 2 && modifier('caps', 'w-10 sm:w-12', false)}
                        {i === 3 && modifier('shift', 'w-12 sm:w-14', needsShift)}
                        {row.map((ch) => renderKey(ch))}
                        {i === 3 && modifier('shift', 'w-12 sm:w-14', needsShift)}
                    </div>
                ))}
                {/* Spacebar row */}
                <div className="flex justify-center mt-0.5">
                    <div
                        className="h-8 sm:h-10 w-48 sm:w-64 rounded-md border-b-2 flex items-center justify-center text-[10px] font-medium select-none transition-all"
                        style={{
                            backgroundColor: nextIsSpace ? FINGER_COLOR.TH : undefined,
                            borderColor: nextIsSpace ? FINGER_COLOR.TH : undefined,
                            color: nextIsSpace ? '#fff' : undefined,
                        }}
                    >
                        <span className={nextIsSpace ? '' : 'text-gray-400 dark:text-zinc-500'}>space</span>
                    </div>
                </div>
            </div>

            {!hideLegend && (
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    {([['LP', 'pinkie'], ['LR', 'ring'], ['LM', 'middle'], ['LI', 'index'], ['TH', 'thumb']] as [FingerId, string][]).map(
                        ([f, label]) => (
                            <span key={f} className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FINGER_COLOR[f] }} />
                                {label}
                            </span>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
