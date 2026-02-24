import React from 'react';
import Link from 'next/link';
import { signup } from '@/app/login/actions';
import PasswordInput from '@/components/PasswordInput';

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const error = resolvedParams?.error as string | undefined;

    return (
        <div className="flex flex-col flex-1 w-full max-w-md mx-auto py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                        Create an Account
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Sign up to start tracking your typing progress.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form action={signup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-shadow"
                            placeholder="John Doe"
                        />
                    </div>

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

                    <PasswordInput />

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-gray-900 dark:focus:ring-white mt-4"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer Toggle */}
                <div className="mt-8 text-center">
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                    >
                        Already have an account? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
