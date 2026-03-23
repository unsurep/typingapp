"use client";

import { useEffect, useState } from "react";

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
};

export default function AdminContactMessages({
    messages,
}: {
    messages: ContactMessage[];
}) {
    const [selected, setSelected] = useState<ContactMessage | null>(null);

    useEffect(() => {
        if (!selected) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelected(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selected]);

    return (
        <>
            <div className="mb-6 text-left">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Latest messages
                </h2>

                {messages.length === 0 ? (
                    <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-800 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            No contact messages yet.
                        </p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {messages.map((m) => (
                            <li
                                key={m.id}
                                className="p-0 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    className="w-full text-left p-5 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors"
                                    onClick={() => setSelected(m)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Name
                                            </p>
                                            <p className="mt-1 font-semibold text-gray-900 dark:text-white wrap-break-word">
                                                {m.name}
                                            </p>
                                        </div>
                                        <div className="min-w-0 sm:text-right">
                                            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Subject
                                            </p>
                                            <p className="mt-1 font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                                                {m.subject}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => {
                        // Close only when the backdrop is clicked.
                        if (e.target === e.currentTarget) {
                            setSelected(null);
                        }
                    }}
                >
                    <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <h3
                                        className="text-xl font-bold text-gray-900 dark:text-white truncate"
                                        title={selected.subject}
                                    >
                                        {selected.subject}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(selected.created_at).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                    aria-label="Close"
                                >
                                    <span className="text-gray-700 dark:text-gray-200 text-lg leading-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="px-6 pt-5 pb-6 flex flex-col max-h-[80vh]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Name
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white wrap-break-word">
                                        {selected.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {selected.email}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                    Message
                                </p>

                                <div className="border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/40 p-4 flex-1 min-h-[120px] overflow-auto">
                                    <p className="whitespace-pre-wrap wrap-break-word text-sm text-gray-800 dark:text-gray-200">
                                        {selected.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

