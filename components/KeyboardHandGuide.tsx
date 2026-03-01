'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Key = ({ label, isHomeRow = false, widthClass = "w-10 sm:w-12 xl:w-14" }: { label: string, isHomeRow?: boolean, widthClass?: string }) => {
    return (
        <div className={`
            ${widthClass} h-10 sm:h-12 xl:h-14 
            rounded-lg shadow-sm border-b-4 flex items-center justify-center text-xs sm:text-sm font-semibold select-none transition-all
            ${isHomeRow
                ? 'bg-brand/10 dark:bg-brand/20 border-brand/50 text-brand shadow-brand/20'
                : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400'
            }
        `}>
            {label}
        </div>
    );
};

export default function KeyboardHandGuide() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center justify-center mt-8 mb-4 pointer-events-none"
        >
            <div className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
                </span>
                Rest your fingers on the highlighted <span className="text-brand font-bold">Home Row</span> to begin
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 p-4 sm:p-6 bg-gray-50/50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800/50 shadow-inner backdrop-blur-sm">

                {/* Top Row */}
                <div className="flex justify-center gap-1.5 sm:gap-2">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => (
                        <Key key={k} label={k} />
                    ))}
                </div>

                {/* Home Row - Indented slightly */}
                <div className="flex justify-center gap-1.5 sm:gap-2 ml-4 sm:ml-6">
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'].map(k => (
                        <Key key={k} label={k} isHomeRow={['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'].includes(k)} />
                    ))}
                </div>

                {/* Bottom Row - Indented more */}
                <div className="flex justify-center gap-1.5 sm:gap-2 ml-10 sm:ml-16">
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map(k => (
                        <Key key={k} label={k} />
                    ))}
                </div>

                {/* Spacebar Row */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                    <Key label="" widthClass="w-[200px] sm:w-[280px] xl:w-[320px]" />
                </div>
            </div>

        </motion.div>
    );
}
