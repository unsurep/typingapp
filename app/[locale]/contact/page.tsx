"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations("Contact");
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        } else {
            const data = await res.json();
            setErrorMsg(data.error || t("errorGeneric"));
            setStatus("error");
        }
    }

    return (
        <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {t("heroTitleBefore")}{" "}
                    <span className="text-brand">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t("heroSubtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <section className="md:col-span-1 space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                        {t("detailsTitle")}
                    </h2>
                    <div className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        <div>
                            <span className="font-semibold">{t("emailLabel")}</span>{" "}
                            <a
                                href="mailto:support@typingverified.com"
                                className="underline underline-offset-2"
                            >
                                support@typingverified.com
                            </a>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                        {t.rich("privacyHint", {
                            privacy: (chunks) => (
                                <Link href="/privacy" className="underline underline-offset-2">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </section>

                <section className="md:col-span-2">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            {t("formTitle")}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{t("formIntro")}</p>

                        {status === "success" ? (
                            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 text-sm text-green-700 dark:text-green-400">
                                {t("successMessage")}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                            {t("labelName")}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder={t("placeholderName")}
                                            required
                                            className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                            {t("labelEmail")}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder={t("placeholderEmail")}
                                            required
                                            className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                        {t("labelSubject")}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder={t("placeholderSubject")}
                                        required
                                        className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                        {t("labelMessage")}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder={t("placeholderMessage")}
                                        required
                                        className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm sm:text-base text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/60 resize-none"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-sm text-red-500">{errorMsg}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="inline-flex cursor-pointer items-center justify-center px-6 py-2.5 rounded-full bg-brand text-black font-semibold text-sm shadow-sm hover:bg-amber-400 transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? t("sending") : t("sendButton")}
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
