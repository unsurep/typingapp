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
                            href="/terms"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy;{" "}
                        <Link
                            href="/admin/signin"
                            className="text-inherit underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-brand/50 rounded-sm"
                        >
                            2026
                        </Link>{" "}
                        Typingverified. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
