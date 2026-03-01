import { motion, Variants } from "framer-motion";
import { getPerformanceLevel } from "@/utils/performance";

interface ResultCardProps {
    wpm?: number;
    accuracy?: number;
    errors?: number;
    duration?: number;
    timeLeft?: number;
    onRetry?: () => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ResultCard({ wpm = 0, accuracy = 100, errors = 0, duration = 60, timeLeft, onRetry }: ResultCardProps) {
    const performance = getPerformanceLevel(wpm);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl mx-auto bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden"
        >

            {/* Top Banner Area */}
            <div className="bg-muted/10 px-8 py-10 text-center border-b border-border/50">
                <motion.h2 variants={itemVariants} className="text-xl font-bold text-muted uppercase tracking-widest mb-2">Test Complete</motion.h2>
                <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-6">
                    <span className="text-7xl md:text-8xl font-black text-brand tracking-tighter drop-shadow-[0_0_15px_rgba(226,183,20,0.4)] dark:drop-shadow-[0_0_15px_rgba(226,183,20,0.6)]">{wpm}</span>
                    <span className="text-lg font-semibold text-muted font-mono mt-1 mb-6">Net WPM</span>

                    {/* Performance Level Badge */}
                    <motion.div
                        className={`mt-4 px-6 py-2 rounded-full border border-solid flex items-center gap-2 font-bold tracking-wide backdrop-blur-sm ${performance.colorClass}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-lg leading-none">{performance.icon}</span>
                        Performance Level: {performance.label}
                    </motion.div>
                </motion.div>
            </div>

            {/* Grid Stats Area */}
            <div className={`grid ${timeLeft !== undefined ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'} divide-x divide-y md:divide-y-0 divide-border/50 bg-background/50 border-b border-border/50`}>
                <motion.div variants={itemVariants} className="p-6 text-center flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Accuracy</span>
                    <span className="text-3xl font-bold text-foreground">{accuracy}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="p-6 text-center flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Errors</span>
                    <span className="text-3xl font-bold text-error">{errors}</span>
                </motion.div>
                {timeLeft !== undefined && (
                    <motion.div variants={itemVariants} className="p-6 text-center flex flex-col justify-center border-t md:border-t-0 border-border/50">
                        <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Time Left</span>
                        <span className="text-3xl font-bold text-foreground">{timeLeft}s</span>
                    </motion.div>
                )}
                <motion.div variants={itemVariants} className="p-6 text-center flex flex-col justify-center border-t md:border-t-0 border-border/50">
                    <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Duration</span>
                    <span className="text-3xl font-bold text-foreground">{duration}s</span>
                </motion.div>
            </div>

            {/* Action Footer */}
            <div className="bg-muted/10 px-8 py-6 flex justify-center border-t border-border/50">
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRetry}
                    className="relative w-full md:w-auto px-12 py-4 bg-brand text-background rounded-full font-bold overflow-hidden transition-all shadow-lg hover:shadow-brand/30 focus:outline-none group/btn"
                >
                    <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                    </span>
                </motion.button>
            </div>

        </motion.div>
    );
}
