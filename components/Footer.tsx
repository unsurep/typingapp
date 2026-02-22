import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <nav className="flex space-x-6">
                        <Link
                            href="/about"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; 2026 TypingTestForJobs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
