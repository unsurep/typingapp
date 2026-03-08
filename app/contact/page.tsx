import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background gradient orb effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Get in <span className="text-brand">Touch</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Have a question, spotted an issue, or want to share feedback about TypingTestForJobs?
                    Use the contact details below or send us a quick message through the form.
                </p>
            </div>

            {/* Contact details + form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Info column */}
                <section className="md:col-span-1 space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                        Contact details
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        You can reach us using the email and phone placeholders below. These are examples you
                        can replace with your real support details when you are ready.
                    </p>
                    <div className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        <div>
                            <span className="font-semibold">Email:</span>{" "}
                            <a
                                href="mailto:support@typingtestforjobs.com"
                                className="underline underline-offset-2"
                            >
                                support@typingtestforjobs.com
                            </a>
                        </div>
                        <div>
                            <span className="font-semibold">Phone:</span>{" "}
                            <span>+1 (555) 123‑4567</span>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                        For account or data questions, you can also review our{" "}
                        <Link href="/privacy" className="underline underline-offset-2">
                            Privacy
                        </Link>{" "}
                        page.
                    </p>
                </section>

                {/* Form column */}
                <section className="md:col-span-2">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Send us a message
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                            Fill in your details and a short message. This is a demo form and does not
                            yet send emails, but it shows the fields your users will expect.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Type your message here..."
                                    className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors focus:outline-none"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

