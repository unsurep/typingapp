import CertificatePreview from "@/components/CertificatePreview";

export default function CertificatePage() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Header Info */}
            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Your Professional Certificate
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Earn a verified certification of your typing proficiency to share directly with employers.
                </p>
            </div>

            {/* Locked State Alert Box */}
            <div className="max-w-3xl mx-auto w-full mb-16 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
                <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                    {/* Lock Icon */}
                    <svg className="w-8 h-8 text-amber-600 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">
                        Certificate Locked
                    </h3>
                    <p className="text-sm md:text-base text-amber-800 dark:text-amber-200/80 mb-6 leading-relaxed">
                        Complete all lessons and pass a 60 second test with <span className="font-bold">35+ WPM</span> and <span className="font-bold">95% accuracy</span> to unlock your certificate.
                    </p>
                    <button className="inline-flex justify-center items-center px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 dark:focus:ring-offset-zinc-900">
                        Check Eligibility
                    </button>
                </div>
            </div>

            <div className="w-full flex items-center justify-center mb-8">
                <div className="h-px bg-gray-200 dark:bg-zinc-800 w-full max-w-sm"></div>
                <span className="px-4 text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0">
                    Preview
                </span>
                <div className="h-px bg-gray-200 dark:bg-zinc-800 w-full max-w-sm"></div>
            </div>

            {/* Mock Certificate Container (A4 Portrait/Landscape stylized) */}
            <CertificatePreview
                name="John Doe"
                netSpeed="42"
                accuracy="97"
                duration="60"
                certificateId="TTJ-12345"
                issuedDate="Oct 2026"
            />

            {/* Action Buttons Below Certificate */}
            <div className="mt-12 flex justify-center pb-20">
                <button
                    disabled={true}
                    className="px-8 py-3.5 bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 rounded-full font-bold cursor-not-allowed flex items-center shadow-inner transition-colors"
                >
                    <svg className="w-5 h-5 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                </button>
            </div>

        </div>
    );
}
