import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Review how Typingverified collects and uses data, handles cookies, Google AdSense advertising, and your privacy rights and choices.",
};

export default function PrivacyPage() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Privacy <span className="text-brand">Policy</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Last updated: March 26, 2026
                </p>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
                Welcome to Typingverified. This Privacy Policy explains what information we collect, how we use it,
                and your rights regarding your data. By using our website, you agree to the practices described here.
            </p>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    1. Information We Collect
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">We collect the following types of information:</p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Information</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    When you register or sign in, we collect your name and email address to create and manage your
                    account.
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Usage Data</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We collect your lesson progress, task completion status, WPM scores, accuracy rates, and test
                    results to track your improvement and unlock your certificate.
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Certificate Data</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    When you earn a certificate, we store your name, WPM, accuracy, and issue date so you can
                    re-download and share it.
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Cookies and Tracking Technologies
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We use cookies and similar tracking technologies to operate the site, remember your session, and
                    serve relevant advertising. Cookies are small text files stored on your device. You can instruct
                    your browser to refuse cookies, but some parts of the site may not function properly without them.
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Third-Party Advertising Cookies
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We use Google AdSense to display advertisements on our site. Google and its partners may use
                    cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this and
                    other websites. These cookies allow Google to show you personalized ads across the web.
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Cookie Consent Controls
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    When you visit our site, we display a cookie consent banner that allows you to accept or decline
                    advertising cookies. We load Google AdSense only after you click &quot;Accept.&quot; If you decline,
                    advertising cookies are not activated during that session. You may see the consent banner again on
                    future visits so you can update your choice.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        You can opt out of personalized advertising by visiting{" "}
                        <a
                            href="https://adssettings.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            Google&apos;s Ads Settings
                        </a>{" "}
                        or{" "}
                        <a
                            href="http://www.aboutads.info"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            www.aboutads.info
                        </a>
                        .
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    2. How We Use Your Information
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Create and manage your account</li>
                    <li>Track and display your lesson and test progress</li>
                    <li>Determine when you have earned a certificate</li>
                    <li>Allow you to generate, download, and share your typing certificate</li>
                    <li>Display relevant advertisements through Google AdSense</li>
                    <li>Improve the performance and features of our platform</li>
                    <li>Respond to your support or contact requests</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    3. Google AdSense and Third-Party Advertising
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We participate in Google AdSense, an advertising service provided by Google LLC. Google AdSense
                    uses cookies and web beacons to serve ads based on a user&apos;s prior visits to our website and
                    other websites on the Internet.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on
                        your visit to our site and/or other sites on the Internet.
                    </li>
                    <li>
                        You can opt out of personalized advertising at{" "}
                        <a
                            href="https://adssettings.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            https://adssettings.google.com
                        </a>
                        .
                    </li>
                    <li>
                        For more information on how Google uses data when you use our site, visit{" "}
                        <a
                            href="https://policies.google.com/technologies/partner-sites"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            https://policies.google.com/technologies/partner-sites
                        </a>
                        .
                    </li>
                </ul>
                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We do not control the cookies placed by Google AdSense and are not responsible for their content
                    or accuracy.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    4. Data Sharing
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    We do not sell your personal data. We may share your data only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        <span className="font-semibold">Service providers:</span> We use trusted backend services to
                        store and process your data securely. These providers are bound by confidentiality agreements.
                    </li>
                    <li>
                        <span className="font-semibold">Legal requirements:</span> We may disclose your data if
                        required by law or in response to valid legal requests.
                    </li>
                    <li>
                        <span className="font-semibold">Business transfers:</span> If Typingverified is acquired or
                        merged, your data may be transferred as part of that transaction.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    5. Guest Users
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    If you use Typingverified without signing in, your session data is temporary and not permanently
                    stored. Guest users cannot earn or download certificates.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    6. Data Retention
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We retain your data for as long as your account is active. If you request account deletion, we
                    will remove your personal data from our systems within a reasonable timeframe.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    7. Your Rights and Choices
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                        <span className="font-semibold">Access:</span> Request a copy of the data we hold about you.
                    </li>
                    <li>
                        <span className="font-semibold">Correction:</span> Ask us to correct inaccurate information.
                    </li>
                    <li>
                        <span className="font-semibold">Deletion:</span> Request deletion of your account and
                        associated data.
                    </li>
                    <li>
                        <span className="font-semibold">Opt-out of personalized ads:</span> Use{" "}
                        <a
                            href="https://adssettings.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            Google&apos;s Ads Settings
                        </a>{" "}
                        to manage ad personalization.
                    </li>
                </ul>
                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    To exercise any of these rights, contact us via our{" "}
                    <a
                        href="https://www.typingverified.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        Contact page
                    </a>
                    .
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    8. Children&apos;s Privacy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Typingverified is not directed at children under the age of 13. We do not knowingly collect
                    personal information from children under 13. If you believe a child has provided us with personal
                    data, please contact us and we will delete it promptly.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">9. Security</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We take reasonable technical and organizational measures to protect your data from unauthorized
                    access, loss, or misuse. However, no internet transmission is completely secure, and we cannot
                    guarantee absolute security.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    10. Changes to This Policy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last
                    updated&quot; date at the top of this page. We encourage you to review this page periodically.
                </p>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    11. Contact Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                    If you have any questions about this Privacy Policy, please contact us:
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

