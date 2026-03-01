"use client";

import { motion, Variants } from "framer-motion";

interface CertificatePreviewProps {
    name?: string;
    netSpeed?: number | string;
    accuracy?: number | string;
    duration?: number | string;
    certificateId?: string;
    issuedDate?: string;
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CertificatePreview({
    name = "John Doe",
    netSpeed = "42",
    accuracy = "97",
    duration = "60",
    certificateId = "TTJ-12345",
    issuedDate = "Oct 2026"
}: CertificatePreviewProps) {
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5 }}
            className="w-full max-w-4xl mx-auto bg-[#fafafa] dark:bg-[#e8e8e8] border-[12px] border-white dark:border-zinc-200 rounded-lg shadow-xl p-8 sm:p-12 md:p-20 relative overflow-hidden text-black mx-4 hover:shadow-brand/20 transition-all duration-300 group hover:border-brand/50"
        >

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-brand/0 to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Subtle background pattern or watermark effect */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {/* Certificate Content */}
            <div className="relative z-10 flex flex-col items-center border-[3px] border-gray-300/60 p-8 sm:p-12 h-full">

                {/* Logo Text */}
                <div className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-gray-400 mb-12 uppercase text-center">
                    TypingTestForJobs
                </div>

                <p className="text-sm sm:text-base text-gray-500 uppercase tracking-[0.3em] mb-4 text-center">
                    This Certifies That
                </p>

                {/* Name */}
                <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 border-b-2 border-gray-300 pb-4 mb-8 px-4 sm:px-16 text-center">
                    {name}
                </h2>

                <p className="text-base sm:text-lg text-gray-600 font-serif text-center max-w-2xl mb-12 italic">
                    has successfully demonstrated professional typing proficiency and met the rigorous standards set forth by the examination board.
                </p>

                {/* Stats Display */}
                <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-8 mb-16">
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1 text-center">Net Speed</span>
                        <span className="text-4xl font-black text-gray-900 text-center">{netSpeed} <span className="text-xl font-bold text-gray-500">WPM</span></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1 text-center">Accuracy</span>
                        <span className="text-4xl font-black text-gray-900 text-center">{accuracy}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1 text-center">Duration</span>
                        <span className="text-4xl font-black text-gray-900 text-center">{duration}s</span>
                    </div>
                </div>

                {/* Footer Area */}
                <div className="w-full flex justify-between items-end mt-auto pt-8">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Certificate ID</span>
                        <span className="text-sm font-mono text-gray-600 font-semibold">{certificateId}</span>
                        <span className="text-xs text-gray-400 mt-2">Issued: {issuedDate}</span>
                    </div>

                    {/* Mock QR Target */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-gray-300 rounded-md flex justify-center items-center shadow-sm shrink-0">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
