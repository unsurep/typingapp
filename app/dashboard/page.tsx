import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/login/actions';
import { checkCertificateEligibility, issueCertificate } from '@/app/certificate/actions';
import Link from 'next/link';

export default async function DashboardPage() {
    const supabase = await createClient();

    // Server-side auth check
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    // Protect the route
    if (error || !user) {
        redirect('/login');
    }

    // Attempt to parse out their name or fallback to email
    const displayName = user.user_metadata?.full_name || user.email;

    // 1. Fetch Total Tests Taken
    const { count: testsTakenCount } = await supabase
        .from('test_results')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

    // 2. Fetch Best WPM & Accuracy
    const { data: topTest } = await supabase
        .from('test_results')
        .select('net_wpm, accuracy')
        .eq('user_id', user.id)
        .order('net_wpm', { ascending: false })
        .order('accuracy', { ascending: false })
        .limit(1);

    const bestWpmDisplay = topTest && topTest.length > 0 ? topTest[0].net_wpm : '--';
    const bestAccDisplay = topTest && topTest.length > 0 ? `${topTest[0].accuracy}%` : '--';

    // 3. Fetch Completed Lessons Count
    const { count: lessonsCompletedCount } = await supabase
        .from('lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('completed', true);

    // 4. Fetch Recent Tests (Latest 5)
    const { data: recentTests } = await supabase
        .from('test_results')
        .select('id, net_wpm, accuracy, duration_seconds, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

    // 5. Fetch Existing Certificates
    const { data: existingCerts } = await supabase
        .from('certificates')
        .select('certificate_code')
        .eq('user_id', user.id);

    // 6. Fetch Eligibility
    const eligibility = await checkCertificateEligibility(user.id);

    const hasCertificate = existingCerts && existingCerts.length > 0 && eligibility.eligible;
    const certificateCount = existingCerts?.length || 0;
    const certificateCode = hasCertificate ? existingCerts[0].certificate_code : null;

    // Server action button wrapper
    const handleIssueCertificate = async () => {
        'use server';
        const res = await issueCertificate();
        if (res.success && res.certificateId) {
            redirect(`/verify/${res.certificateId}`);
        }
    };

    return (
        <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 relative animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Background gradient orb effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                    Typing <span className="text-brand">Dashboard</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-mono">
                    Hello, <span className="font-semibold text-gray-900 dark:text-gray-200">{displayName}</span>! Here's a summary of your typing journey.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Tests Taken</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{testsTakenCount || 0}</p>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-900/30 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-2">Best WPM</h3>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{bestWpmDisplay}</p>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-900/30 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-green-500 dark:text-green-400 uppercase tracking-wider mb-2">Best Accuracy</h3>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">{bestAccDisplay}</p>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Lessons Completed</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{lessonsCompletedCount || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                {/* Recent Tests Table */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Tests</h2>
                    {recentTests && recentTests.length > 0 ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                            <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                                {recentTests.map((test) => (
                                    <li key={test.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-900/50 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">{test.net_wpm} WPM</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(test.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-gray-400 uppercase tracking-wider">Accuracy</span>
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">{test.accuracy}%</span>
                                            </div>
                                            <div className="hidden sm:flex flex-col items-end">
                                                <span className="text-xs text-gray-400 uppercase tracking-wider">Duration</span>
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">{test.duration_seconds}s</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm text-center">
                            <p className="text-gray-500 dark:text-gray-400">You haven't taken any tests yet.</p>
                            <Link href="/test" className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                                Take a test now &rarr;
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Column: Certification & WPM Reference */}
                <div className="flex flex-col gap-8">
                    {/* WPM Reference Panel */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">WPM Reference</h2>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label="Beginner">🔴</span>
                                        <span className="font-bold text-red-700 dark:text-red-500">Beginner</span>
                                    </div>
                                    <span className="text-sm font-bold text-red-600 dark:text-red-400">0–30 WPM</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label="Average">🟡</span>
                                        <span className="font-bold text-yellow-700 dark:text-yellow-500">Average</span>
                                    </div>
                                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">31–50 WPM</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label="Good">🟢</span>
                                        <span className="font-bold text-green-700 dark:text-green-500">Good</span>
                                    </div>
                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">51–70 WPM</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label="Pro">🔵</span>
                                        <span className="font-bold text-blue-700 dark:text-blue-500">Pro</span>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">71–100 WPM</span>
                                </li>
                                <li className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl" role="img" aria-label="Elite">🟣</span>
                                        <span className="font-bold text-purple-700 dark:text-purple-500">Elite</span>
                                    </div>
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">100+ WPM</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Certification Status Panel */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Certification</h2>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center flex-1 justify-center">

                            {hasCertificate ? (
                                <>
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Certified</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">You have earned your official typing certificate.</p>
                                    <Link
                                        href={`/verify/${certificateCode}`}
                                        className="w-full flex justify-center py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
                                    >
                                        View Certificate
                                    </Link>
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
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Eligible for Certificate!</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">You meet all requirements to receive your official certificate.</p>
                                    <form action={handleIssueCertificate} className="w-full">
                                        <button
                                            type="submit"
                                            className="w-full justify-center py-3 px-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            ✨ Issue Certificate
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
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Not Yet Eligible</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                                        Keep practicing! Complete 5 lessons and hit 35 WPM / 95% Accuracy on a 60s test.
                                    </p>
                                    <button
                                        disabled
                                        className="w-full py-3 px-4 bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 rounded-xl font-bold cursor-not-allowed border border-gray-200 dark:border-zinc-700"
                                    >
                                        Keep Practicing
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center border-t border-gray-200 dark:border-zinc-800 pt-8 mt-4">
                <form action={logout}>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 rounded-full font-bold hover:bg-red-50 dark:hover:bg-red-950/30 border border-gray-200 dark:border-zinc-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-200 dark:hover:border-red-900"
                    >
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    );
}
