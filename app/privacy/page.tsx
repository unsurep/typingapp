import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Privacy at <span className="text-brand">TypingTestForJobs</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    We keep things simple. This page explains, in plain language, what we collect, why we collect it,
                    and how we use your data when you use this app.
                </p>
            </div>

            {/* What we collect */}
            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    What we collect
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    When you use TypingTestForJobs, we only collect what we need to run the app and save your progress:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        <span className="font-semibold">Account details</span> – basic information from your sign‑up or
                        sign‑in (for example, email and name) so we can attach progress and certificates to you.
                    </li>
                    <li>
                        <span className="font-semibold">Lesson progress</span> – which lessons and tasks you have
                        completed, your best WPM and accuracy per task, and whether a lesson is fully passed.
                    </li>
                    <li>
                        <span className="font-semibold">Test results</span> – your typing test scores like net WPM,
                        accuracy, errors, and test duration.
                    </li>
                    <li>
                        <span className="font-semibold">Certificates</span> – your certificate ID, name shown on the
                        certificate, WPM, accuracy and issue date so you can share and re‑download it later.
                    </li>
                </ul>
            </section>

            {/* How we use your data */}
            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    How we use your data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We use this information only to make the app work for you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>To remember your lesson progress and best scores over time.</li>
                    <li>To decide when you have unlocked your certificate.</li>
                    <li>To show, verify, and let you download your certificate.</li>
                </ul>
                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We do <span className="font-semibold">not</span> sell your data or use it for unrelated advertising.
                </p>
            </section>

            {/* Guests vs logged-in users */}
            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Guests vs logged‑in users
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    You can type as a guest, but guest sessions are temporary. We do not permanently store guest
                    progress or issue certificates for guest accounts. To save your results and unlock a certificate,
                    you need to{" "}
                    <Link href="/login" className="underline underline-offset-2">
                        sign in
                    </Link>
                    .
                </p>
            </section>

            {/* Your choices */}
            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Your choices and control
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        You can stop using the app at any time. Your existing data will remain tied to your account for
                        future logins unless you request otherwise.
                    </li>
                    <li>
                        If you want your account or data removed, you can contact us using the{" "}
                        <Link href="/contact" className="underline underline-offset-2">
                            Contact
                        </Link>{" "}
                        page and we will help you.
                    </li>
                </ul>
            </section>

            {/* Data storage note */}
            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    How we store your data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Your data is stored securely using our managed backend services. We aim to keep only what is
                    necessary for lessons, tests, and certificates, and to protect it with sensible technical and
                    access controls.
                </p>
            </section>
        </div>
    );
}

