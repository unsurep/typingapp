"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, Variants } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  ];
  // React simple typewriter
  // const [text] = useTypewriter({
  //   words: ['g', 'g', 'g', 'g'],
  //   loop: 0,
  //   typeSpeed: 100,
  //   deleteSpeed: 50,
  //   delaySpeed: 2000
  // })

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);

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

  const handleTestClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthWarning(true);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] w-full items-center relative">
      {showAuthWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45" onClick={() => setShowAuthWarning(false)} />
          <div className="relative w-full max-w-[520px] bg-yellow-50 dark:bg-zinc-900/95 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-xl p-5 text-yellow-800 dark:text-yellow-200 text-sm shadow-2xl">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 shrink-0 mt-0.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span className="leading-snug">{t("authWarning")}</span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowAuthWarning(false)}
                className="px-4 py-2 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-transparent hover:bg-yellow-100/70 dark:hover:bg-yellow-900/40 font-semibold transition-colors"
              >
                {t("close")}
              </button>
              <button
                onClick={() => {
                  setShowAuthWarning(false);
                  router.push("/login");
                }}
                className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/60 hover:bg-yellow-200 dark:hover:bg-yellow-900/80 rounded-lg transition-colors whitespace-nowrap font-semibold border border-yellow-200 dark:border-yellow-800"
              >
                {t("signIn")}
              </button>
            </div>
          </div>
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
