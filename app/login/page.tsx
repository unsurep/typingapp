import React from 'react';
import Link from 'next/link';
import { login } from './actions';

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const error = resolvedParams?.error as string | undefined;
    const message = resolvedParams?.message as string | undefined;

    return (
        <div className="flex flex-col flex-1 w-full max-w-md mx-auto py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-500 relative">
            {/* Background gradient orb effect */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 dark:bg-brand/15 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-10 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Enter your details to sign in.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                {message && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <p className="text-sm text-blue-600 dark:text-blue-400">{message}</p>
                    </div>
                )}

                {/* Form */}
                <form action={login} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-shadow"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-shadow"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white cursor-pointer mt-4"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Toggle */}
                <div className="mt-8 text-center">
                    <Link
                        href="/signup"
                        className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
