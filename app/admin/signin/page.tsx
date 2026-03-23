import React from "react";
import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import SignInLoadingButton from "@/components/SignInLoadingButton";

export default async function AdminSignInPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const error = resolvedParams?.error as string | undefined;

    return (
        <div className="flex flex-col flex-1 w-full max-w-md mx-auto py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-500 relative">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 dark:bg-brand/15 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-10 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                        Admin Sign In
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Sign in with your administrator account.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                <form action="/api/admin/login" method="POST" className="space-y-6">
                    <div>
                        <label
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-shadow"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <PasswordInput />

                    <SignInLoadingButton
                        label="Sign In"
                        loadingLabel="Signing in..."
                        className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white cursor-pointer mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </form>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
