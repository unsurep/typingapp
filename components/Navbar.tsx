"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "@/app/login/actions";
import { ModeToggle } from "@/components/ModeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50 dark:bg-[#111111]/70 dark:border-white/5"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex shrink-0 items-center"
                    >
                        <Link href="/" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <span className="text-brand">{"{ "}</span>
                            TypingTest
                            <span className="text-brand">{" }"}</span>
                        </Link>
                    </motion.div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/practice"
                            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                        >
                            Practice
                        </Link>
                        <Link
                            href="/test"
                            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                        >
                            Tests
                        </Link>
                        {isLoggedIn && (
                            <>
                                <Link
                                    href="/lessons"
                                    className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                                >
                                    Lessons
                                </Link>
                                <Link
                                    href="/certificate"
                                    className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                                >
                                    Certificate
                                </Link>
                            </>
                        )}
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-6">
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => logout()}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-foreground/90 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-foreground/90 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                        <div className="pl-2 border-l border-border/50">
                            <ModeToggle />
                        </div>
                    </nav>
                    {/* Mobile menu button */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <ModeToggle />
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden"
                        id="mobile-menu"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 shadow-lg">
                            <Link
                                href="/practice"
                                className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Practice
                            </Link>
                            <Link
                                href="/test"
                                className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Tests
                            </Link>
                            {isLoggedIn && (
                                <>
                                    <Link
                                        href="/lessons"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Lessons
                                    </Link>
                                    <Link
                                        href="/certificate"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Certificate
                                    </Link>
                                </>
                            )}
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            logout();
                                        }}
                                        className="block w-full text-center mt-4 px-4 py-2 rounded-md text-base font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block w-full text-center mt-4 px-4 py-2 rounded-md text-base font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
