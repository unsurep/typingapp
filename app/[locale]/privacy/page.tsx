import { Metadata } from "next";

const link = "underline underline-offset-2 text-gray-600 dark:text-gray-400 hover:text-brand";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Review how Typingverified collects and uses data, handles cookies, Google AdSense advertising, and your privacy rights and choices.",
};

export default function PrivacyPage() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Privacy <span className="text-brand">Policy</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Last updated: March 29, 2026
                </p>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
                Welcome to Typingverified. This Privacy Policy explains what information we collect, how we use it, and
                your rights regarding your data. By using our website, you agree to the practices described here.
            </p>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    1. Information We Collect
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    Account Information: When you register, we collect your name and email address.
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    Usage Data: We collect lesson progress, WPM scores, accuracy rates, and test results.
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    Cookies and Tracking: We use cookies to operate the site, remember your session, and serve relevant
                    advertising.
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    Third-Party Advertising Cookies: We use Google AdSense to display advertisements. Google and its
                    partners may use cookies, including the DoubleClick cookie, to serve ads based on your prior visits
                    to this and other websites.
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
                    Opt out of personalized ads:{" "}
                    <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        https://adssettings.google.com
                    </a>
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    How Google uses data:{" "}
                    <a
                        href="https://policies.google.com/technologies/partner-sites"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        https://policies.google.com/technologies/partner-sites
                    </a>
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Create and manage your account</li>
                    <li>Track your lesson and test progress</li>
                    <li>Determine when you have earned a certificate</li>
                    <li>Display relevant advertisements through Google AdSense</li>
                    <li>Improve the platform and respond to support requests</li>
                </ul>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    3. Google AdSense and Third-Party Advertising
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    We participate in Google AdSense, provided by Google LLC. Google AdSense uses cookies and web
                    beacons to serve ads based on prior visits to our website and other websites.
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1">
                    Opt out of personalized ads:{" "}
                    <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        https://adssettings.google.com
                    </a>
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    More info:{" "}
                    <a
                        href="https://policies.google.com/technologies/partner-sites"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        https://policies.google.com/technologies/partner-sites
                    </a>
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Sharing</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We do not sell your personal data. We may share data only with trusted service providers, when
                    required by law, or in the event of a business transfer.
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Access, correct, or delete your data at any time</li>
                    <li>
                        Opt out of personalized ads via{" "}
                        <a
                            href="https://adssettings.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            https://adssettings.google.com
                        </a>
                    </li>
                    <li>
                        Contact us at{" "}
                        <a
                            href="https://www.typingverified.com/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            https://www.typingverified.com/contact
                        </a>
                    </li>
                </ul>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    6. Children&apos;s Privacy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Typingverified is not directed at children under 13. We do not knowingly collect data from children
                    under 13.
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    7. Changes to This Policy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We will update the Last updated date when this policy changes.
                </p>
            </section>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />

            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                    Email:{" "}
                    <a
                        href="mailto:support@typingverified.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        support@typingverified.com
                    </a>
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Website:{" "}
                    <a
                        href="https://www.typingverified.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        https://www.typingverified.com/contact
                    </a>
                </p>
            </section>
        </div>
    );
}
