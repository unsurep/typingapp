import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
      params,
}: {
      params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
      const { locale } = await params;
      const basePath = locale === "en" ? "" : `/${locale}`;
      return {
              title: "Privacy Policy | Typingverified",
              description:
                        "Read how Typingverified collects and uses data, handles cookies, serves Google AdSense advertising, and protects your privacy rights.",
              alternates: {
                        canonical: `https://www.typingverified.com${basePath}/privacy`,
                        languages: {
                                    en: "https://www.typingverified.com/privacy",
                                    fr: "https://www.typingverified.com/fr/privacy",
                                    es: "https://www.typingverified.com/es/privacy",
                                    de: "https://www.typingverified.com/de/privacy",
                                    pt: "https://www.typingverified.com/pt/privacy",
                        },
              },
      };
}

export default async function PrivacyPage() {
      return (
              <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />
              
                    <div className="mb-10 text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                      Privacy{" "}
                                      <span className="text-brand">Policy</span>span>
                            </h1>h1>
                            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                      Last updated: May 13, 2026
                            </p>
                    </div>
              
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
                            Welcome to Typingverified (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This Privacy Policy explains what
                            information we collect when you use our website at{" "}
                            <a href="https://www.typingverified.com" className="underline underline-offset-2 hover:text-brand">
                                      typingverified.com
                            </a>
                            , how we use and protect that information, and the choices available to you. By using our
                            website, you agree to the practices described in this policy. If you do not agree, please
                            discontinue your use of the site.
                    </p>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      1. Information We Collect
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      <strong>Account Information.</strong> When you create an account, we collect your name and
                                      email address. This information is used to create and manage your account, issue certificates,
                                      and send you important service-related communications.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      <strong>Usage and Performance Data.</strong> We collect data about how you interact with the
                                      platform, including lesson progress, typing test scores (WPM and accuracy), test timestamps,
                                      and which features you use. This data is used to determine certificate eligibility and to
                                      improve the platform.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      <strong>Payment Information.</strong> If you purchase a digital product such as a
                                      Typingverified badge, payment is processed by a third-party payment provider. We do not
                                      store your full card number or banking details on our servers.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      <strong>Cookies and Tracking Technologies.</strong> We use cookies, web beacons, and similar
                                      tracking technologies to operate the site, maintain your session, remember preferences, and
                                      serve relevant advertising through Google AdSense. You may control cookie settings through
                                      your browser, but disabling cookies may affect some site functionality.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      <strong>Log Data.</strong> When you visit our site, our servers automatically record standard
                                      log information including your IP address, browser type and version, operating system, referring
                                      URL, pages visited, and the date and time of your request. This data is used for security,
                                      analytics, and troubleshooting.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      2. How We Use Your Information
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                                      <li>To create and manage your account and verify your identity.</li>
                                      <li>To track lesson and test progress and determine when you have earned a certificate.</li>
                                      <li>To process badge purchases and fulfil digital product orders.</li>
                                      <li>To display relevant advertisements through Google AdSense on free-tier pages.</li>
                                      <li>To send service-related emails such as account confirmation, certificate issuance notifications, and support replies.</li>
                                      <li>To monitor, maintain, and improve the performance and security of the platform.</li>
                                      <li>To comply with applicable legal obligations.</li>
                            </ul>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We do not use your personal data for automated decision-making or profiling in ways that
                                      produce legal or similarly significant effects on you.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      3. Google AdSense and Third-Party Advertising
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      Typingverified uses Google AdSense, a service provided by Google LLC, to display
                                      advertisements. Google AdSense uses cookies — including the DoubleClick cookie — and web
                                      beacons to serve ads based on your prior visits to our website and other websites across the
                                      internet. Interest-based advertising allows Google and its partners to show you ads that are
                                      more likely to be relevant to your interests.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your
                                      visit to our site and other sites on the internet. Typingverified does not control what data
                                      Google collects or how Google uses it for advertising purposes. For more information, please
                                      review{" "}
                                      <a
                                                      href="https://policies.google.com/technologies/partner-sites"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="underline underline-offset-2 hover:text-brand"
                                                    >
                                                  Google&apos;s Privacy &amp; Terms
                                      </a>
                                      .
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      <strong>Opt out of personalized advertising.</strong> You can opt out of personalized ads
                                      served by Google by visiting{" "}
                                      <a
                                                      href="https://adssettings.google.com"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="underline underline-offset-2 hover:text-brand"
                                                    >
                                                  Google Ads Settings
                                      </a>
                                      . You may also opt out of interest-based advertising from participating third-party
                                      advertisers by visiting{" "}
                                      <a
                                                      href="https://optout.aboutads.info/"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="underline underline-offset-2 hover:text-brand"
                                                    >
                                                  aboutads.info
                                      </a>
                                      . Opting out does not mean you will no longer see ads — it means the ads you see will not be
                                      based on your browsing history.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We do not pass any personally identifiable information (such as your name or email address)
                                      to Google AdSense or any advertising partner.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      4. Cookies
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      Cookies are small text files placed on your device when you visit a website. We use the
                                      following categories of cookies:
                            </p>
                            <ul className="list-disc pl-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                                      <li>
                                                  <strong>Strictly necessary cookies:</strong> Required to operate core site functionality,
                                                  including user authentication and session management. The site cannot function properly
                                                  without these.
                                      </li>
                                      <li>
                                                  <strong>Functional cookies:</strong> Used to remember your preferences such as language
                                                  selection and dark mode settings.
                                      </li>
                                      <li>
                                                  <strong>Analytics cookies:</strong> Help us understand how visitors interact with the site,
                                                  which pages are most visited, and where users encounter issues. We use this data in
                                                  aggregate form to improve the platform.
                                      </li>
                                      <li>
                                                  <strong>Advertising cookies:</strong> Placed by Google AdSense to enable interest-based
                                                  advertising as described in Section 3. These cookies track your browsing activity across
                                                  websites to serve relevant ads.
                                      </li>
                            </ul>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      You can manage or disable cookies through your browser settings. Most browsers allow you to
                                      refuse new cookies, delete existing cookies, or be notified when cookies are set. Note that
                                      disabling cookies may affect your ability to log in and use certain features of the site.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      5. Data Sharing and Disclosure
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We do not sell, rent, or trade your personal data. We may share your information only in
                                      the following limited circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                                      <li>
                                                  <strong>Service providers:</strong> We work with trusted third-party vendors (such as our
                                                  database provider, payment processor, and hosting infrastructure) who process data on our
                                                  behalf and are bound by confidentiality obligations.
                                      </li>
                                      <li>
                                                  <strong>Legal requirements:</strong> We may disclose your information if required to do so
                                                  by law, court order, or government authority, or if we believe disclosure is necessary to
                                                  protect the rights, property, or safety of Typingverified, our users, or others.
                                      </li>
                                      <li>
                                                  <strong>Business transfers:</strong> If Typingverified is acquired, merged, or its assets
                                                  are transferred, your data may be transferred as part of that transaction. We will notify
                                                  you of any such change through a prominent notice on our website.
                                      </li>
                            </ul>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We do not share your email address, typing scores, or certificate records with any
                                      advertising network. Certificate verification (Section 8 below) is publicly accessible by
                                      design — anyone with your certificate code can confirm its authenticity — but no other
                                      personal information is exposed in the verification result beyond what appears on your
                                      certificate.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      6. Your Rights and Choices
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      Depending on your location and applicable law, you may have the following rights regarding
                                      your personal data:
                            </p>
                            <ul className="list-disc pl-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                                      <li>
                                                  <strong>Access:</strong> Request a copy of the personal data we hold about you.
                                      </li>
                                      <li>
                                                  <strong>Correction:</strong> Request correction of inaccurate or incomplete data.
                                      </li>
                                      <li>
                                                  <strong>Deletion:</strong> Request deletion of your account and associated personal data.
                                                  Note that some data may be retained for legal compliance or fraud prevention.
                                      </li>
                                      <li>
                                                  <strong>Objection:</strong> Object to the processing of your data for direct marketing or
                                                  other purposes based on legitimate interests.
                                      </li>
                                      <li>
                                                  <strong>Data portability:</strong> Request a machine-readable copy of your data in certain
                                                  circumstances.
                                      </li>
                                      <li>
                                                  <strong>Withdraw consent:</strong> Where processing is based on consent, you may withdraw
                                                  that consent at any time without affecting the lawfulness of prior processing.
                                      </li>
                            </ul>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      To exercise any of these rights, please contact us using the details in Section 10. We will
                                      respond to verified requests within 30 days. We may need to verify your identity before
                                      processing your request.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      7. Data Retention
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We retain your personal data for as long as your account is active or as needed to provide
                                      you with services. Specifically:
                            </p>
                            <ul className="list-disc pl-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                                      <li>Account data is retained for the lifetime of your account.</li>
                                      <li>
                                                  Certificate records are retained indefinitely to enable ongoing verification by employers
                                                  and institutions.
                                      </li>
                                      <li>
                                                  Log data is typically retained for up to 90 days for security and diagnostic purposes.
                                      </li>
                                      <li>
                                                  If you request account deletion, we will delete or anonymise your personal data within 30
                                                  days, except where retention is required by law.
                                      </li>
                            </ul>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      8. Security
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We take reasonable administrative, technical, and physical measures to protect your personal
                                      data against unauthorised access, disclosure, alteration, and destruction. These measures
                                      include encrypted connections (HTTPS), access controls on our databases, and regular security
                                      reviews.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      However, no method of transmission over the internet or method of electronic storage is
                                      completely secure. While we strive to protect your personal data, we cannot guarantee its
                                      absolute security. If you believe your account has been compromised, please contact us
                                      immediately at{" "}
                                      <a href="mailto:support@typingverified.com" className="underline underline-offset-2 hover:text-brand">
                                                  support@typingverified.com
                                      </a>
                                      .
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      9. Children&apos;s Privacy
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      Typingverified is not directed at children under the age of 13, and we do not knowingly
                                      collect personal data from children under 13. If you are a parent or guardian and believe
                                      your child has provided us with personal information without your consent, please contact us
                                      at{" "}
                                      <a href="mailto:support@typingverified.com" className="underline underline-offset-2 hover:text-brand">
                                                  support@typingverified.com
                                      </a>{" "}
                                      and we will take steps to delete that information promptly. Users between the ages of 13 and
                                      18 should review this policy with a parent or guardian before using the site.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      10. Changes to This Policy
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      We may update this Privacy Policy from time to time to reflect changes in our practices,
                                      technology, legal requirements, or other factors. When we make material changes, we will
                                      update the &quot;Last updated&quot; date at the top of this page and, where appropriate, notify
                                      registered users by email. We encourage you to review this policy periodically. Your
                                      continued use of Typingverified after any changes constitutes your acceptance of the updated
                                      policy.
                            </p>
                    </section>
              
                    <hr className="border-gray-200 dark:border-gray-700 mb-8" />
              
                    <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                      11. Contact Us
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                      If you have any questions, concerns, or requests regarding this Privacy Policy or the way we
                                      handle your data, please contact us:
                            </p>
                            <ul className="list-none text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2">
                                      <li>
                                                  <strong>Email:</strong>{" "}
                                                  <a href="mailto:support@typingverified.com" className="underline underline-offset-2 hover:text-brand">
                                                                support@typingverified.com
                                                  </a>
                                      </li>
                                      <li>
                                                  <strong>Website:</strong>{" "}
                                                  <a href="https://www.typingverified.com/contact" className="underline underline-offset-2 hover:text-brand">
                                                                typingverified.com/contact
                                                  </a>
                                      </li>
                            </ul>
                            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                      We aim to respond to all privacy-related enquiries within 5 business days.
                            </p>
                    </section>
              </div>
            );
}
