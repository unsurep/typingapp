import React, { Suspense } from 'react';
import { redirect, Link } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/server';
import { checkCertificateEligibility } from '@/lib/server/certificate';
import type { AppLocale } from '@/i18n/routing';
import ConfettiCelebration from '@/components/ConfettiCelebration';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        robots: { index: false, follow: false },
    };
}

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard' });
    const supabase = await createClient();

    // Server-side auth check
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    // Protect the route
    if (error || !user) {
        redirect({ href: '/login', locale });
    }

    const authUser = user!;

    // Attempt to parse out their name or fallback to email
    const displayName = authUser.user_metadata?.full_name || authUser.email;

    // 1. Fetch Total Tests Taken
    const { count: testsTakenCount } = await supabase
        .from('test_results')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', authUser.id);

    // 2. Fetch Best WPM & Accuracy
    const { data: topTest } = await supabase
        .from('test_results')
        .select('net_wpm, accuracy')
        .eq('user_id', authUser.id)
        .order('net_wpm', { ascending: false })
        .order('accuracy', { ascending: false })
        .limit(1);

    const bestWpmDisplay = topTest && topTest.length > 0 ? topTest[0].net_wpm : '--';
    const bestAccDisplay = topTest && topTest.length > 0 ? `${topTest[0].accuracy}%` : '--';

    // 3. Fetch Completed Lessons Count
    const { count: lessonsCompletedCount } = await supabase
        .from('lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', authUser.id)
        .eq('completed', true);

    // 4. Fetch Recent Tests (Latest 5)
    const { data: recentTests } = await supabase
        .from('test_results')
        .select('id, net_wpm, accuracy, duration_seconds, created_at')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false })
        .limit(5);

    // 5. Fetch Existing Certificates + profile badge status
    const [{ data: existingCerts }, { data: profileBadge }] = await Promise.all([
        supabase
            .from('certificates')
            .select('certificate_code')
            .eq('user_id', authUser.id),
        supabase
            .from('profiles')
            .select('has_badge')
            .eq('id', authUser.id)
            .single(),
    ]);

    // 6. Fetch Eligibility
    const eligibility = await checkCertificateEligibility(authUser.id);

    const hasCertificate = existingCerts && existingCerts.length > 0 && eligibility.eligible;
    const certificateCode = hasCertificate ? existingCerts[0].certificate_code : null;
    const hasBadge = profileBadge?.has_badge ?? false;

    return (
        <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 relative animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Suspense fallback={null}>
                <ConfettiCelebration />
            </Suspense>

            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-[600px] h-[60vw] max-h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                    {t('heroTitleBefore')} <span className="text-brand">{t('heroTitleHighlight')}</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-mono">
                    {t('greeting', { name: String(displayName ?? '') })}
                </p>
                {authUser.email && (
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        {t('signedInAs')}{' '}
                        <span className="font-mono text-gray-700 dark:text-gray-300">{authUser.email}</span>
                    </p>
                )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{t('metricTestsTaken')}</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{testsTakenCount || 0}</p>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-900/30 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-2">{t('metricBestWpm')}</h3>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{bestWpmDisplay}</p>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-900/30 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-green-500 dark:text-green-400 uppercase tracking-wider mb-2">{t('metricBestAccuracy')}</h3>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">{bestAccDisplay}</p>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{t('metricLessonsCompleted')}</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{lessonsCompletedCount || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                {/* Recent Tests Table */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('recentTestsHeading')}</h2>
                    {recentTests && recentTests.length > 0 ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                            <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                                {recentTests.map((test) => (
                                    <li key={test.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-900/50 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {t('wpmWithUnit', { value: test.net_wpm })}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(test.created_at).toLocaleDateString(locale, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-gray-400 uppercase tracking-wider">{t('labelAccuracy')}</span>
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">{test.accuracy}%</span>
                                            </div>
                                            <div className="hidden sm:flex flex-col items-end">
                                                <span className="text-xs text-gray-400 uppercase tracking-wider">{t('labelDuration')}</span>
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                    {t('durationSeconds', { seconds: test.duration_seconds })}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm text-center">
                            <p className="text-gray-500 dark:text-gray-400">{t('emptyTests')}</p>
                            <Link href="/test" className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                                {t('takeTestNow')}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Column: Certification & WPM Reference */}
                <div className="flex flex-col gap-8">
                    {/* WPM Reference Panel */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('wpmReferenceHeading')}</h2>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label={t('ariaTierBeginner')}>&#x1F534;</span>
                                        <span className="font-bold text-red-700 dark:text-red-500">{t('tierBeginner')}</span>
                                    </div>
                                    <span className="text-sm font-bold text-red-600 dark:text-red-400">{t('tierRangeBeginner')}</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label={t('ariaTierAverage')}>&#x1F7E1;</span>
                                        <span className="font-bold text-yellow-700 dark:text-yellow-500">{t('tierAverage')}</span>
                                    </div>
                                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{t('tierRangeAverage')}</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label={t('ariaTierGood')}>&#x1F7E2;</span>
                                        <span className="font-bold text-green-700 dark:text-green-500">{t('tierGood')}</span>
                                    </div>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{t('tierRangeGood')}</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label={t('ariaTierPro')}>&#x1F535;</span>
                                        <span className="font-bold text-blue-700 dark:text-blue-500">{t('tierPro')}</span>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{t('tierRangePro')}</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label={t('ariaTierElite')}>&#x1F7E3;</span>
                                        <span className="font-bold text-purple-700 dark:text-purple-500">{t('tierElite')}</span>
                                    </div>
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{t('tierRangeElite')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Certification Status Panel */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('certHeading')}</h2>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center flex-1 justify-center">

                            {hasCertificate ? (
                                <>
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('certifiedTitle')}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t('certifiedDesc')}</p>
                                    <Link
                                        href={`/verify/${certificateCode}`}
                                        className="w-full flex justify-center py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
                                    >
                                        {t('viewCertificate')}
                                    </Link>
                                    {/* Badge upsell */}
                                    <div className="mt-3 flex flex-col items-center gap-1 w-full">
                                        {hasBadge ? (
                                            <Link
                                                href="/badge"
                                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl bg-brand text-black font-bold text-sm hover:bg-amber-400 transition-colors shadow-sm"
                                            >
                                                <span>&#127885;</span>
                                                {t('certViewBadge')}
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/badge-checkout"
                                                    className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl bg-brand text-black font-bold text-sm hover:bg-amber-400 transition-colors shadow-sm"
                                                >
                                                    <span>&#127885;</span>
                                                    {t('certGetBadge')}
                                                </Link>
                                                <p className="text-xs text-gray-400 dark:text-gray-500">{t('certGetBadgeNote')}</p>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : eligibility.eligible ? (
                                <>
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('eligibleTitle')}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t('eligibleDesc')}</p>
                                    <form action="/api/certificates/issue" method="POST" className="w-full">
                                        <button
                                            type="submit"
                                            className="w-full justify-center py-3 px-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            {t('issueCertificate')}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('notEligibleTitle')}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                                        {t('notEligibleDesc')}
                                    </p>
                                    <button
                                        disabled
                                        className="w-full py-3 px-4 bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 rounded-xl font-bold cursor-not-allowed border border-gray-200 dark:border-zinc-700"
                                    >
                                        {t('keepPracticing')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center border-t border-gray-200 dark:border-zinc-800 pt-8 mt-4">
                <form action="/api/auth/logout" method="POST">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 rounded-full font-bold hover:bg-red-50 dark:hover:bg-red-950/30 border border-gray-200 dark:border-zinc-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-200 dark:hover:border-red-900"
                    >
                        {t('signOut')}
                    </button>
                </form>
            </div>
        </div>
    );
}
