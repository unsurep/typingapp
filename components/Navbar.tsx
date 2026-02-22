"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 dark:bg-black dark:border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex flex-shrink-0 items-center">
                        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            TypingTest
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/practice"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            Practice
                        </Link>
                        <Link
                            href="/test"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            Tests
                        </Link>
                        <Link
                            href="/lessons"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            Lessons
                        </Link>
                        <Link
                            href="/certificate"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            Certificate
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Login
                        </Link>
                    </nav>
                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:hover:text-gray-300 transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800 shadow-lg">
                    <Link
                        href="/practice"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Practice
                    </Link>
                    <Link
                        href="/test"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Tests
                    </Link>
                    <Link
                        href="/lessons"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Lessons
                    </Link>
                    <Link
                        href="/certificate"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Certificate
                    </Link>
                    <Link
                        href="/login"
                        className="block w-full text-center mt-4 px-4 py-2 rounded-md text-base font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
}
