export default function TermsPage() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Terms of <span className="text-brand">Service</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Last updated: March 26, 2026
                </p>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
                Please read these Terms of Service (&quot;Terms&quot;) carefully before using Typingverified
                (&quot;the Service&quot;). By accessing or using our website at{" "}
                <a
                    href="https://www.typingverified.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                >
                    https://www.typingverified.com
                </a>
                , you agree to be bound by these Terms.
            </p>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    1. Acceptance of Terms
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    By creating an account or using any part of Typingverified, you confirm that you are at least 13
                    years of age and agree to these Terms. If you do not agree, please do not use the Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    2. Description of Service
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">Typingverified provides:</p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Free and premium typing practice lessons</li>
                    <li>Timed typing speed tests (60s and 120s)</li>
                    <li>
                        A verifiable typing certificate upon completing all lessons and passing the final test
                    </li>
                    <li>User accounts to save progress and results</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    3. User Accounts
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                    <li>You agree to provide accurate information when creating your account.</li>
                    <li>You must notify us immediately of any unauthorized use of your account.</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    4. Certificates
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        Certificates are issued only to users who complete all 10 lessons (with at least 90% accuracy
                        and minimum Average WPM per task) and pass the final 60-second test with at least 35 WPM net
                        speed and 95% accuracy.
                    </li>
                    <li>Certificates are personal and non-transferable.</li>
                    <li>
                        We reserve the right to revoke certificates if we determine they were obtained fraudulently.
                    </li>
                    <li>
                        Typingverified certificates are intended as personal skill validation tools and do not
                        constitute professional or government-recognized qualifications.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    5. Acceptable Use
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Attempt to cheat, automate, or manipulate typing tests or lesson scoring</li>
                    <li>Use bots, scripts, or automated tools on the platform</li>
                    <li>Attempt to access other users&apos; accounts or data</li>
                    <li>Upload or transmit malicious code or content</li>
                    <li>Use the Service for any unlawful purpose</li>
                    <li>Resell or redistribute any part of the Service without our written permission</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    6. Freemium and Paid Plans
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        The Freemium plan provides full access to lessons, tests, and certificates for a limited trial
                        period at no cost.
                    </li>
                    <li>
                        Paid Premium plans (when available) are subject to the pricing shown on our{" "}
                        <a
                            href="https://www.typingverified.com/pricing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            Pricing page
                        </a>
                        .
                    </li>
                    <li>All payments are processed securely. We do not store payment card details.</li>
                    <li>Fees paid are non-refundable except where required by applicable law.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    7. Advertising
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    The free tier of Typingverified displays advertisements served by Google AdSense and potentially
                    other third-party networks. By using the free tier, you consent to the display of such
                    advertisements. Premium users enjoy an ad-free experience.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    8. Intellectual Property
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        All content on Typingverified - including lessons, test prompts, UI design, branding, and
                        certificate templates - is owned by Typingverified and protected by applicable copyright and
                        intellectual property laws.
                    </li>
                    <li>
                        You may not copy, reproduce, or distribute our content without prior written permission.
                    </li>
                    <li>Your typing results and certificate belong to you, and you may share them freely.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    9. Disclaimers
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
                    kind, express or implied. We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Uninterrupted or error-free availability of the Service</li>
                    <li>That your certificate will be accepted by any employer or institution</li>
                    <li>Specific results from using our lessons or tests</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    10. Limitation of Liability
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    To the maximum extent permitted by law, Typingverified shall not be liable for any indirect,
                    incidental, special, or consequential damages arising from your use of or inability to use the
                    Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    11. Termination
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We reserve the right to suspend or terminate your access to the Service at any time, with or
                    without notice, if you violate these Terms or for any other reason at our discretion.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    12. Changes to These Terms
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We may update these Terms from time to time. Changes will be posted on this page with a revised
                    &quot;Last updated&quot; date. Continued use of the Service after changes constitutes your
                    acceptance of the new Terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    13. Governing Law
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    These Terms are governed by and construed in accordance with applicable laws. Any disputes shall
                    be resolved in the appropriate courts of the jurisdiction where Typingverified operates.
                </p>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    14. Contact Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                    If you have questions about these Terms, please reach out:
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                        href="mailto:support@typingverified.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        support@typingverified.com
                    </a>
                    <br />
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                        href="https://www.typingverified.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        https://www.typingverified.com/contact
                    </a>
                </p>
            </section>
        </div>
    );
}
