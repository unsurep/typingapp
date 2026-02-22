interface StatsBarProps {
    wpm?: number;
    accuracy?: number;
    errors?: number;
    time?: string;
}

export default function StatsBar({ wpm = 0, accuracy = 100, errors = 0, time = "00:00" }: StatsBarProps = {}) {
    return (
        <div className="w-full mt-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between lg:justify-around gap-4 sm:gap-6">

            {/* WPM Stat */}
            <div className="flex flex-col items-center flex-1 min-w-[80px]">
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">WPM</span>
                <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white pt-1">{wpm}</span>
            </div>

            <div className="hidden sm:block w-px h-10 sm:h-12 bg-gray-200 dark:bg-zinc-800"></div>

            {/* Accuracy Stat */}
            <div className="flex flex-col items-center flex-1 min-w-[80px]">
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">Accuracy</span>
                <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white pt-1">{accuracy}%</span>
            </div>

            <div className="hidden sm:block w-px h-10 sm:h-12 bg-gray-200 dark:bg-zinc-800"></div>

            {/* Errors Stat */}
            <div className="flex flex-col items-center flex-1 min-w-[80px]">
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">Errors</span>
                <span className="text-3xl sm:text-4xl font-bold text-red-500 pt-1">{errors}</span>
            </div>

            <div className="hidden sm:block w-px h-10 sm:h-12 bg-gray-200 dark:bg-zinc-800"></div>

            {/* Time Stat */}
            <div className="flex flex-col items-center flex-1 min-w-[80px]">
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-1">Time</span>
                <span className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white pt-1 sm:pt-2">{time}</span>
            </div>

        </div>
    );
}
