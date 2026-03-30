import { Link } from '@/i18n/navigation'
import { Metadata } from "next";
import { createClient } from '@/utils/supabase/server'
import {
    getPremiumFreeDaysRemaining,
    isStripeCheckoutEnabled,
    premiumFreeWindowActive,
} from '@/lib/server/premiumFree'
import PremiumWaitlistForm from '@/components/PremiumWaitlistForm'

export const metadata: Metadata = {
    title: "Pricing",
    description:
        "See Typingverified pricing for free and premium plans, including ad-supported access, lesson limits, and certificate availability.",
};

export default async function PricingPage({
    searchParams,
}: {
    searchParams: Promise<{ cancelled?: string }>
}) {
    const { cancelled } = await searchParams

    const trialActive = premiumFreeWindowActive()
    const daysRemaining = getPremiumFreeDaysRemaining()
    const stripeCheckoutEnabled = isStripeCheckoutEnabled()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isPremiumDb = false
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('is_premium')
            .eq('id', user.id)
            .single()
        isPremiumDb = profile?.is_premium ?? false
    }

    const premiumCtaAvailable = !trialActive && stripeCheckoutEnabled
    const premiumCardIsActive = !trialActive && isPremiumDb

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
                    Start practicing for free, then upgrade when you are ready to unlock the full Typingverified
                    experience.
                </p>
            </div>

            {trialActive && (
                <div className="mb-10 max-w-xl mx-auto w-full px-4 py-3 rounded-xl bg-brand/10 border border-brand/20 text-sm text-brand text-center">
                    Premium access is free for {daysRemaining} day{daysRemaining === 1 ? '' : 's'}. It ends soon.
                </div>
            )}

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Freemium plan */}
                <div className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {trialActive ? 'Free-mium' : 'Freemium'}
                        </h2>
                        <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                            {trialActive
                                ? 'Full lessons + certificate access for free for 30 days.'
                                : 'Get started with core typing tools at no cost.'}
                        </p>
                    </div>

                    <div className="mt-4 mb-6">
                        <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            $0
                        </span>
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {trialActive ? '/ 30 days' : '/ forever'}
                        </span>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>
                                Ad-supported — the free tier displays relevant ads to keep the service free. Upgrade
                                to Premium for an ad-free experience.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>
                                {trialActive
                                    ? 'Full course access during the free-mium period.'
                                    : 'Access to the first 2 lessons to learn the basics.'}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>
                                {trialActive ? <>All lessons and tasks unlocked (no premium lockouts).</> : <>Run
                                    60s / 120s typing tests to check your speed.</>}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>Full access to the <strong>Practice</strong> page.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>
                                {trialActive ? (
                                    <>
                                        <strong>Certificate included</strong> — complete lessons + pass the test.
                                    </>
                                ) : (
                                    <>
                                        <strong>No certificate</strong> on the Freemium plan.
                                    </>
                                )}
                            </span>
                        </li>
                    </ul>

                    <Link
                        href="/dashboard?upgraded=true"
                        className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-brand/70 hover:text-brand dark:hover:text-brand transition-colors"
                    >
                        Continue with Freemium
                    </Link>
                </div>

                {/* Premium plan */}
                <div
                    className={`relative bg-linear-to-b from-brand/10 via-white/80 to-white dark:from-brand/20 dark:via-zinc-900 dark:to-zinc-900 border rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col ${
                        premiumCardIsActive
                            ? 'border-emerald-500/70 dark:border-emerald-400/60 ring-2 ring-emerald-500/30 dark:ring-emerald-400/25 shadow-emerald-500/10'
                            : 'border-brand/60 dark:border-brand/70 shadow-brand/20'
                    }`}
                >
                    <div
                        className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${
                            premiumCardIsActive
                                ? 'bg-emerald-600 dark:bg-emerald-500 text-white'
                                : 'bg-brand text-black'
                        }`}
                    >
                        {premiumCardIsActive ? 'Current plan' : trialActive ? 'Coming soon' : 'Best for serious learners'}
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

                    {premiumCtaAvailable ? (
                        isPremiumDb ? (
                            <button
                                type="button"
                                disabled
                                aria-disabled="true"
                                aria-label="You already have the Premium plan"
                                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-semibold text-sm cursor-not-allowed border border-zinc-300 dark:border-zinc-600"
                            >
                                <span aria-hidden className="text-emerald-600 dark:text-emerald-400">✓</span>
                                You&apos;re on Premium
                            </button>
                        ) : (
                            <Link
                                href="/checkout"
                                className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors"
                            >
                                Upgrade to Premium
                            </Link>
                        )
                    ) : (
                        <div className="mt-auto">
                            <button
                                type="button"
                                disabled
                                aria-disabled="true"
                                aria-label="Premium checkout is coming soon"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-semibold text-sm cursor-not-allowed border border-zinc-300 dark:border-zinc-600"
                            >
                                Premium coming soon
                            </button>

                            {/* <PremiumWaitlistForm /> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
