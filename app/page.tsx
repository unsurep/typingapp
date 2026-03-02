"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { motion, Variants } from "framer-motion";
import { useTypewriter, Cursor } from 'react-simple-typewriter'

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

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const loggedIn = !!user;
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        showWarningToast();
      }
    }
    checkAuth();
  }, []);

  const showWarningToast = () => {
    toast.custom((t) => (
      <div className="w-[356px] sm:w-[500px] bg-yellow-50 dark:bg-zinc-900/95 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-yellow-800 dark:text-yellow-200 text-sm shadow-xl gap-4 pointer-events-auto">
        <div className="flex items-start sm:items-center">
          <svg className="w-5 h-5 mr-3 shrink-0 mt-0.5 sm:mt-0 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          <span className="leading-snug">You need to login before you can take tests and earn certificates.</span>
        </div>
        <button
          onClick={() => {
            toast.dismiss(t as string | number);
            router.push("/login");
          }}
          className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/60 hover:bg-yellow-200 dark:hover:bg-yellow-900/80 rounded-lg transition-colors whitespace-nowrap font-semibold border border-yellow-200 dark:border-yellow-800 shrink-0"
        >
          Sign In
        </button>
      </div>
    ), {
      duration: 10000,
      id: 'auth-warning-toast' // prevent duplicate toasts
    });
  };

  const handleTestClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showWarningToast();
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] w-full items-center justify-center relative">
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
          Elevate your <span className="text-brand animate-pulse">Typing</span> experience
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl text-muted max-w-2xl mx-auto font-mono"
        >
          Minimalist, customizable, and smooth typing tests for professionals.
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
            Start Test <span className="ml-2">→</span>
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-foreground bg-transparent border-2 border-border rounded-full hover:border-foreground transition-all"
          >
            Practice Free
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-4 sm:gap-8">
          {[
            { label: '30s / 60s / 120s Tests', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Real-time Accuracy', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Premium Stats', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
          ].map((feature, i) => (
            <div key={i} className="inline-flex items-center px-4 py-2 rounded-full bg-muted/10 text-sm font-medium text-muted border border-border">
              <svg className="w-4 h-4 mr-2 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
              {feature.label}
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* 4. SEO Content Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="pb-10 pt-10 max-w-4xl mx-auto px-4 text-center opacity-60 hover:opacity-100 transition-opacity"
      >
        <p className="text-xs leading-relaxed text-muted">
          Our modern <strong>typing test</strong> provides accurate assessments of your WPM. Stand out with a verified <strong>typing certificate</strong> today.
        </p>
      </motion.section>
    </div>
  );
}
