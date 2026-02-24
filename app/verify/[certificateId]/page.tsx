import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

async function fetchCertificate(certificateId: string) {
    try {
        const supabase = await createClient();
        const { data: certificate, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('certificate_code', certificateId)
            .single();

        if (error || !certificate) return null;

        return certificate;
    } catch (error) {
        console.error("Failed to fetch certificate:", error);
        return null;
    }
}

export default async function VerificationPage({ params }: { params: Promise<{ certificateId: string }> }) {
    const { certificateId } = await params;

    // Fetch certificate data from the API
    const certificate = await fetchCertificate(certificateId);
    const isValid = certificate !== null;

    return (
        <div className="flex flex-col min-h-[85vh] items-center justify-center p-4 sm:p-8 w-full max-w-6xl mx-auto">

            {isValid ? (
                /* Valid Certificate State */
                <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border-t-8 border-t-green-500 border-x border-b border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 sm:p-12 animate-in fade-in zoom-in duration-300">

                    <div className="flex flex-col items-center">
                        {/* Success Icon */}
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
                            Verified Certificate
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                            This certificate is officially recognized and issued by TypingTestForJobs.
                        </p>
                    </div>

                    {/* Details Block */}
                    <div className="bg-gray-50 dark:bg-black rounded-xl p-6 border border-gray-100 dark:border-zinc-800 flex flex-col gap-5">
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Recipient ID</span>
                            <span className="text-base font-bold text-gray-900 dark:text-white font-mono">{certificate.user_id.split('-')[0].toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Net WPM</span>
                            <span className="text-base font-bold text-gray-900 dark:text-white">{certificate.net_wpm} WPM</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 pb-4">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Accuracy</span>
                            <span className="text-base font-bold text-gray-900 dark:text-white">{certificate.accuracy}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Issued</span>
                            <span className="text-base font-bold text-gray-900 dark:text-white">
                                {new Date(certificate.issued_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col items-center">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Certificate ID</span>
                        <span className="font-mono text-gray-900 dark:text-gray-300 font-bold">{certificateId.toUpperCase()}</span>
                    </div>

                </div>
            ) : (
                /* Invalid Certificate State */
                <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-t-8 border-t-red-500 border-x border-b border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 sm:p-12 animate-in fade-in zoom-in duration-300">

                    <div className="flex flex-col items-center">
                        {/* Error Icon */}
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
                            Certificate Not Found
                        </h1>
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-xl border border-red-100 dark:border-red-800/50 mb-8 w-full">
                            <p className="text-sm md:text-base text-center font-medium leading-relaxed">
                                The certificate code entered is invalid or has been revoked. Please check the ID and try again.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="w-full inline-flex justify-center items-center py-3.5 px-4 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 font-semibold rounded-xl transition-colors shadow-sm"
                    >
                        Return to Homepage
                    </Link>
                </div>
            )}

        </div>
    );
}
