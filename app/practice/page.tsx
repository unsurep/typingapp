import TypingArea from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";

export default function PracticePage() {
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
            <TypingArea text="The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Typing fast and accurately is an essential skill for modern jobs." />

            {/* Stats Bar */}
            <div className="w-full mt-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4">
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">WPM</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">0</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Accuracy</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">100%</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Errors</span>
                    <span className="text-3xl font-bold text-red-500">0</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">Time</span>
                    <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white pt-1">Free Mode</span>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white">
                    Restart
                </button>
                <button className="px-8 py-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 rounded-full font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white">
                    Change Text
                </button>
            </div>

        </div>
    );
}
