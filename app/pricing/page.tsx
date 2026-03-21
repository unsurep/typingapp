import Link from 'next/link'

export default async function PricingPage({
    searchParams,
}: {
    searchParams: Promise<{ cancelled?: string }>
}) {
    const { cancelled } = await searchParams

    return (
        <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[140px] rounded-full pointer-events-none -z-10" />

            {/* Cancelled payment notice */}
            {cancelled && (
                <div className="mb-8 max-w-xl mx-auto w-full px-4 py-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-300 text-center">
                    Payment was cancelled — no charge was made. You can upgrade whenever you&apos;re ready.
                </div>
            )}

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Simple <span className="text-brand">Pricing</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Start practicing for free, then upgrade when you are ready to unlock the full TypingTestForJobs
                    experience.
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Freemium plan */}
                <div className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Freemium
                        </h2>
                        <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                            Get started with core typing tools at no cost.
                        </p>
                    </div>

                    <div className="mt-4 mb-6">
                        <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            $0
                        </span>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/ forever</span>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>Ad‑supported experience while you practice and test.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>Access to the first <strong>2 lessons</strong> to learn the basics.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>Full access to the <strong>Practice</strong> page.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>Run 60s / 120s typing tests to check your speed.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span><strong>No certificate</strong> unlock on the Freemium plan.</span>
                        </li>
                    </ul>

                    <Link
                        href="/dashboard"
                        className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-brand/70 hover:text-brand dark:hover:text-brand transition-colors"
                    >
                        Continue with Freemium
                    </Link>
                </div>

                {/* Premium plan */}
                <div className="relative bg-gradient-to-b from-brand/10 via-white/80 to-white dark:from-brand/20 dark:via-zinc-900 dark:to-zinc-900 border border-brand/60 dark:border-brand/70 rounded-2xl p-6 sm:p-8 shadow-lg shadow-brand/20 flex flex-col">
                    <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-brand text-black text-xs font-semibold tracking-wide shadow-sm">
                        Best for serious learners
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Premium
                        </h2>
                        <p className="mt-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                            Unlock the full course, certificate path, and an ad‑free experience.
                        </p>
                    </div>

                    <div className="mt-4 mb-6">
                        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                            $3.99
                        </span>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/ one‑time</span>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span><strong>No ads</strong> — focus fully on your typing.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>Access to <strong>all lessons and tasks</strong> in the course.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>Unlimited access to practice and timed tests.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span><strong>Certificate included</strong> — complete all lessons and the final test to unlock and download your official certificate.</span>
                        </li>
                    </ul>

                    <Link
                        href="/checkout"
                        className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors"
                    >
                        Upgrade to Premium
                    </Link>
                </div>
            </div>
        </div>
    );
}
