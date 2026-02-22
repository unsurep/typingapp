interface ResultCardProps {
    wpm?: number;
    accuracy?: number;
    errors?: number;
    duration?: number;
    timeLeft?: number;
    onRetry?: () => void;
}

export default function ResultCard({ wpm = 0, accuracy = 100, errors = 0, duration = 60, timeLeft, onRetry }: ResultCardProps) {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* Top Banner Area */}
            <div className="bg-gray-50 dark:bg-black px-8 py-10 text-center border-b border-gray-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Test Complete</h2>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-7xl font-black text-gray-900 dark:text-white tracking-tighter shadow-sm">{wpm}</span>
                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300 mt-1">Net WPM</span>
                </div>
            </div>

            {/* Grid Stats Area */}
            <div className={`grid ${timeLeft !== undefined ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'} divide-x divide-y md:divide-y-0 divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800`}>
                <div className="p-6 text-center flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Accuracy</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{accuracy}%</span>
                </div>
                <div className="p-6 text-center flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Errors</span>
                    <span className="text-2xl font-bold text-red-500">{errors}</span>
                </div>
                {timeLeft !== undefined && (
                    <div className="p-6 text-center flex flex-col justify-center border-t md:border-t-0 border-gray-200 dark:border-zinc-800">
                        <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Time Left</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timeLeft}s</span>
                    </div>
                )}
                <div className="p-6 text-center flex flex-col justify-center border-t md:border-t-0 border-gray-200 dark:border-zinc-800">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Duration</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{duration}s</span>
                </div>
            </div>

            {/* Action Footer */}
            <div className="bg-gray-50 dark:bg-black px-8 py-6 flex justify-center border-t border-gray-200 dark:border-zinc-800">
                <button
                    onClick={onRetry}
                    className="w-full sm:w-auto px-10 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white">
                    Try Again
                </button>
            </div>

        </div>
    );
}
