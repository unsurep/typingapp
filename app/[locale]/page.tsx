"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, Variants } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const t = useTranslations("Home");
  const faqItems = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
    { question: t("faq4Q"), answer: t("faq4A") },
    { question: t("faq5Q"), answer: t("faq5A") },
    { question: t("faq6Q"), answer: t("faq6A") },
    { question: t("faq7Q"), answer: t("faq7A") },
  ];
  // React simple typewriter
  // const [text] = useTypewriter({
  //   words: ['g', 'g', 'g', 'g'],
  //   loop: 0,
  //   typeSpeed: 100,
  //   deleteSpeed: 50,
  //   delaySpeed: 2000
  // })

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const languageBadges = ["English", "Français", "Español", "Deutsch", "Português"];

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const loggedIn = !!user;
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        setShowAuthWarning(true);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (showAuthWarning) {
      root.style.setProperty("--announcement-height", "3.25rem");
    } else {
      root.style.setProperty("--announcement-height", "0px");
    }
    return () => {
      root.style.removeProperty("--announcement-height");
    };
  }, [showAuthWarning]);

  const handleTestClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthWarning(true);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] w-full flex-col items-center">
      {showAuthWarning && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed left-0 right-0 top-0 z-60 flex min-h-13 items-center justify-center border-b border-black/10 bg-brand px-10 text-neutral-950 shadow-sm sm:px-14"
        >
          <p className="mx-auto max-w-4xl text-center text-xs leading-snug sm:text-sm">
            {t("authWarning")}{" "}
            <Link
              href="/login"
              onClick={() => setShowAuthWarning(false)}
              className="cursor-pointer font-semibold text-neutral-950 underline decoration-2 underline-offset-2 hover:text-black"
            >
              {t("signIn")}
            </Link>
          </p>
          <button
            type="button"
            onClick={() => setShowAuthWarning(false)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-neutral-950 transition-colors hover:bg-black/15"
            aria-label={t("close")}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      )}

      {/* Background gradient orb effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 dark:bg-brand/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-10 pb-16 w-full max-w-5xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight"
        >
          {t("heroBefore")}{" "}
          <span className="text-brand animate-pulse">{t("heroHighlight")}</span>{" "}
          {t("heroAfter")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl text-muted max-w-2xl mx-auto font-mono"
        >
          {t("heroSubtitle")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-5 flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            {t("heroLanguagesLine")}
          </p>
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-2 p-0">
            {languageBadges.map((lang) => (
              <li key={lang}>
                <span className="inline-block rounded-md border border-border/40 bg-muted/20 px-2 py-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
                  {lang}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
          <Link
            href="/test"
            onClick={handleTestClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-background bg-brand rounded-full hover:bg-brand/90 transition-all shadow-lg hover:shadow-brand/30 hover:shadow-xl overflow-hidden "
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {t("startTest")} <span className="ml-2">→</span>
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-foreground bg-transparent border-2 border-border rounded-full hover:border-brand/60 hover:bg-brand/10 dark:hover:bg-brand/20 transition-all duration-300"
          >
            {t("practiceFree")}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-4 sm:gap-8">
          {[
            { labelKey: "featTests" as const, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { labelKey: "featAccuracy" as const, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { labelKey: "featStats" as const, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
          ].map((feature, i) => (
            <div key={i} className="inline-flex items-center px-4 py-2 rounded-full bg-muted/10 text-sm font-medium text-muted border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10">
              <svg className="w-4 h-4 mr-2 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
              {t(feature.labelKey)}
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* 2. Homepage Content Additions */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16 space-y-12">
        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("whatIsTitle")}</h2>
          <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>{t("whatIsP1")}</p>
            <p>{t("whatIsP2")}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("howTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-sm font-semibold text-brand">{t("howStep1Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("howStep1Body")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-sm font-semibold text-brand">{t("howStep2Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("howStep2Body")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-sm font-semibold text-brand">{t("howStep3Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("howStep3Body")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("whoTitle")}</h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>{t("who1")}</li>
            <li>{t("who2")}</li>
            <li>{t("who3")}</li>
            <li>{t("who4")}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("whyTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">{t("why1Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("why1Body")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">{t("why2Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("why2Body")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">{t("why3Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("why3Body")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">{t("why4Title")}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("why4Body")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("faqTitle")}</h2>
          <p className="mt-4 max-w-3xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("faqIntro")}
          </p>
          <div className="mt-6 rounded-xl border border-border bg-background/60 px-5">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("ctaTitle")}</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t("ctaBody")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/test"
              onClick={handleTestClick}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-background bg-brand rounded-full hover:bg-brand/90 transition-all shadow-md"
            >
              {t("ctaTest")} <span className="ml-2">→</span>
            </Link>
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-foreground bg-transparent border-2 border-border rounded-full hover:border-brand/60 hover:bg-brand/10 dark:hover:bg-brand/20 transition-all duration-300"
            >
              {t("ctaLessons")} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
