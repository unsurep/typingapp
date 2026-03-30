"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Nav");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-[var(--announcement-height,0px)] z-50 mt-[var(--announcement-height,0px)] backdrop-blur-md bg-white/70 border-b border-gray-100/50 dark:bg-[#111111]/70 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex shrink-0 items-center"
          >
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2"
            >
              <span className="text-brand">{"{ "}</span>
              {t("brand")}
              <span className="text-brand">{" }"}</span>
            </Link>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-8">
              <Link
                href="/practice"
                className="text-sm text-white hover:text-[#f4bf3c] font-medium   transition-colors"
              >
                {t("practice")}
              </Link>
              <Link
                href="/test"
                className="text-sm font-medium text-white hover:text-[#f4bf3c]  transition-colors"
              >
                {t("tests")}
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-white hover:text-[#f4bf3c]  transition-colors"
              >
                {t("blog")}
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    href="/lessons"
                    className="text-sm font-medium text-white hover:text-[#f4bf3c]  transition-colors"
                  >
                    {t("lessons")}
                  </Link>
                  <Link
                    href="/certificate"
                    className="text-sm font-medium text-white hover:text-[#f4bf3c]  transition-colors"
                  >
                    {t("certificate")}
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <div className="flex items-center space-x-6">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-white hover:text-[#f4bf3c]  transition-colors"
                  >
                    {t("dashboard")}
                  </Link>
                  <form action="/api/auth/logout" method="POST" className="inline">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center cursor-pointer px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-[#f4bf3c] transition-colors"
                    >
                      {t("logout")}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-foreground/25 bg-transparent text-foreground hover:bg-muted dark:border-white/25 dark:hover:bg-white/10 transition-colors"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-foreground/90 transition-colors"
                  >
                    {t("signup")}
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pl-2 border-l border-border/50">

            {/* Language Toggle */}
              <LanguageSwitcher />
              <div>
                <Image src="/typing.svg" alt="Logo" width={50} height={50} />
              </div>
            </div>
          </nav>
          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher />
            <Image src="/typing.svg" alt="Logo" width={40} height={40} />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">{t("openMenu")}</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
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
            <div className="px-2 pt-2 pb-3 space-y-1  sm:px-3 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 shadow-lg">
              <Link
                href="/practice"
                className="block px-3 py-2  rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("practice")}
              </Link>
              <Link
                href="/test"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("tests")}
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("blog")}
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    href="/lessons"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("lessons")}
                  </Link>
                  <Link
                    href="/certificate"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("certificate")}
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
                    {t("dashboard")}
                  </Link>
                  <form action="/api/auth/logout" method="POST" className="w-full mt-4">
                    <button
                      type="submit"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer"
                    >
                      {t("logout")}
                    </button>
                  </form>
                </>
              ) : (
                <div className="mt-4 w-full space-y-2">
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-2 rounded-md text-base font-medium border border-foreground/25 bg-transparent text-foreground hover:bg-muted dark:border-white/25 dark:hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("signup")}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
