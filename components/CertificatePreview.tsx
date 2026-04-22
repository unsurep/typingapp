"use client";

import { motion, Variants } from "framer-motion";
import { getPerformanceLevel } from "@/utils/performance";

interface CertificatePreviewProps {
    name: string;
    netSpeed: number | string;
    accuracy: number | string;
    duration: number | string;
    certificateId: string;
    issuedDate: string;
    labels?: {
        title: string;
        subtitle: string;
        presentedTo: string;
        body: string;
        netSpeed: string;
        accuracy: string;
        duration: string;
        seconds: string;
        director: string;
        certificateId: string;
        issuedPrefix: string;
        grade: string;
    };
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CertificatePreview({
    name,
    netSpeed,
    accuracy,
    duration,
    certificateId,
    issuedDate,
    labels
}: CertificatePreviewProps) {
    const speed =
        typeof netSpeed === "string" ? Number(netSpeed) : (netSpeed ?? 0);
    const safeSpeed = Number.isFinite(speed) ? speed : 0;
    const performance = getPerformanceLevel(safeSpeed);

    const gradeLetter =
        performance.key === "beginner"
            ? "C"
            : performance.key === "average" || performance.key === "good"
              ? "B"
              : "A";

    const badgeBgClass =
        gradeLetter === "A"
            ? "bg-[#1857b6]"
            : gradeLetter === "B"
              ? "bg-[#f4bf3c]"
              : "bg-[#f35454]";

    const badgeTextClass =
        gradeLetter === "B" ? "text-[#5b2e33]" : "text-white";

    const text = labels ?? {
        title: "Certificate",
        subtitle: "Of Completion",
        presentedTo: "this certificate presented to",
        body: "has successfully demonstrated professional typing proficiency and met the rigorous standards set forth by the examination board.",
        netSpeed: "Net Speed",
        accuracy: "Accuracy",
        duration: "Duration",
        seconds: "seconds",
        director: "Director",
        certificateId: "Certificate ID",
        issuedPrefix: "Issued",
        grade: "Grade",
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            className="w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8"
        >
            <div className="relative flex h-full w-full overflow-hidden rounded-2xl bg-[#fdf5e6] shadow-xl border border-[#f3ddba]">
                {/* Left decorative column */}
                <div className="hidden sm:flex w-24 lg:w-32 flex-col">
                    <div className="flex-1 bg-[#f4bf3c]" />
                    <div className="flex-1 grid grid-rows-4 grid-cols-2 gap-0">
                        <div className="bg-[#f15b5b]" />
                        <div className="bg-[#1f6feb]" />
                        <div className="bg-[#f4bf3c]" />
                        <div className="bg-[#1f6feb]" />
                        <div className="bg-[#f5d7b7]" />
                        <div className="bg-[#f15b5b]" />
                        <div className="bg-[#1f6feb]" />
                        <div className="bg-[#f4bf3c]" />
                    </div>
                </div>

                {/* Main certificate body */}
                <div className="relative flex-1 px-6 sm:px-10 py-8 sm:py-10 flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-block px-4 py-1 text-xs tracking-[0.35em] uppercase text-[#c26a39]">
                            Typingverified
                        </div>

                        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.18em] text-[#1857b6] drop-shadow-[3px_4px_0px_rgba(0,0,0,0.22)] uppercase">
                            {text.title}
                        </h1>

                        <div className="mt-3 inline-flex items-center justify-center px-6 sm:px-10 py-2 bg-[#f35454] text-white text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase rounded-full">
                            {text.subtitle}
                        </div>
                    </div>

                    {/* Recipient section */}
                    <div className="mt-4 text-center">
                        <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#c48a5e] mb-4">
                            {text.presentedTo}
                        </p>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.08em] text-[#5b2e33] pb-2 border-b-4 border-[#e8b26a] inline-block px-4">
                            {name}
                        </h2>
                    </div>

                    {/* Body text */}
                    <p className="mt-6 sm:mt-8 text-sm sm:text-base text-[#7c5c46] font-serif text-center max-w-2xl mx-auto leading-relaxed">
                        {text.body}
                    </p>

                    {/* Stats row */}
                    <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto text-center">
                        <div>
                            <div className="text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-[#bb8a5c] mb-1">
                                {text.netSpeed}
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#5b2e33]">
                                {netSpeed}
                                <span className="ml-1 text-sm sm:text-base font-semibold text-[#a36b4b]">WPM</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-[#bb8a5c] mb-1">
                                {text.accuracy}
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#5b2e33]">
                                {accuracy}
                                <span className="ml-1 text-sm sm:text-base font-semibold text-[#a36b4b]">%</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-[#bb8a5c] mb-1">
                                {text.duration}
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#5b2e33]">
                                {duration}
                                <span className="ml-1 text-sm sm:text-base font-semibold text-[#a36b4b]">{text.seconds}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer with signature and badge */}
                    <div className="mt-auto pt-10 flex items-end justify-between gap-6">
                        <div>
                            {/* <div className="h-10 mb-2 flex items-center">
                                <span className="inline-block h-px w-32 bg-[#c79a65]" />
                            </div> */}
                            <div className="text-sm font-semibold text-[#5b2e33]">
                                Louis U
                            </div>
                            <div className="text-xs uppercase tracking-[0.25em] text-[#b27e4f]">
                                {text.director}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-end text-right">
                                    <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[#c49864]">
                                        {text.certificateId}
                                    </span>
                                    <span className="text-xs sm:text-sm font-mono font-semibold text-[#5b2e33]">
                                        {certificateId}
                                    </span>
                                    <span className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#c49864]">
                                        {text.issuedPrefix} {issuedDate}
                                    </span>
                                    <span className="mt-1 text-[0.55rem] font-mono text-[#a36b4b]">
                                        typingverified.com/verify/{certificateId}
                                    </span>
                                </div>

                                {/* Badge */}
                                <div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center shadow-md ${badgeBgClass} ${badgeTextClass}`}
                                >
                                    <span className="text-lg sm:text-xl font-black">
                                        {gradeLetter}
                                    </span>
                                    <span className="text-[0.55rem] uppercase tracking-[0.18em]">
                                        {text.grade}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
