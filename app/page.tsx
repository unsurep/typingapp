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

  const handleTestClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showWarningToast();
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] w-full items-center relative">
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
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-foreground bg-transparent border-2 border-border rounded-full hover:border-brand/60 hover:bg-brand/10 dark:hover:bg-brand/20 transition-all duration-300"
          >
            Practice Free
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-4 sm:gap-8">
          {[
            { label: '60s / 120s Tests', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Real-time Accuracy', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Premium Stats', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
          ].map((feature, i) => (
            <div key={i} className="inline-flex items-center px-4 py-2 rounded-full bg-muted/10 text-sm font-medium text-muted border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md hover:shadow-brand/10">
              <svg className="w-4 h-4 mr-2 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
              {feature.label}
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* 2. Homepage Content Additions */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16 space-y-12">
        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Is Typingverified?</h2>
          <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Typingverified is a free typing speed test and lesson platform designed to help you build real,
              measurable typing skills. Whether you&apos;re a beginner who wants to stop hunting and pecking, or a
              professional who needs to prove their WPM to an employer, Typingverified gives you the tools to
              practice, improve, and get certified.
            </p>
            <p>
              Unlike basic online typing tests, Typingverified combines structured lessons, real-time feedback, and a
              verifiable certificate - all in a clean, distraction-free interface built for serious learners.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-sm font-semibold text-brand">Step 1 - Practice</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Warm up with unlimited free-form typing practice. No pressure, no timer - just you and the keyboard,
                building muscle memory at your own pace.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-sm font-semibold text-brand">Step 2 - Complete the Lessons</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Work through 10 structured lessons, each with multiple tasks designed to progressively improve your
                speed and accuracy. Every task requires at least 90% accuracy and a minimum speed to pass.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-sm font-semibold text-brand">Step 3 - Get Certified</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Once you&apos;ve completed all lessons and passed the final 60-second typing test (35 WPM / 95%
                accuracy), download your official Typingverified certificate - ready to attach to your resume or share
                with employers.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Who Is This For?</h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>Job seekers who need to prove their typing speed during the hiring process</li>
            <li>Students looking to build a professional skill before entering the workforce</li>
            <li>Remote workers who want to boost productivity by typing faster and with fewer errors</li>
            <li>Anyone who spends time at a keyboard and wants to get better at it</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why Typingverified?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">Accurate WPM Measurement</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                We calculate net WPM - subtracting errors from your gross speed - so your result reflects your
                real-world productivity, not just how fast you mash keys.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">Real-time Feedback</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Watch your speed and accuracy update live as you type. Instant feedback helps you learn which habits
                to correct.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">Structured Lessons That Work</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Our 10-lesson curriculum is built to take you from beginner habits to professional-grade speed, one
                step at a time.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg hover:shadow-brand/10">
              <p className="text-base font-semibold text-foreground">A Certificate Worth Sharing</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Your Typingverified certificate includes your name, WPM, accuracy, and issue date. It&apos;s a clean,
                professional credential you can include in job applications.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/5 p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Start Free Today</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            No credit card required. Practice as a guest or create a free account to save your progress, track your
            improvement, and work toward your typing certificate.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/test"
              onClick={handleTestClick}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-background bg-brand rounded-full hover:bg-brand/90 transition-all shadow-md"
            >
              Start Your Free Typing Test <span className="ml-2">→</span>
            </Link>
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-foreground bg-transparent border-2 border-border rounded-full hover:border-brand/60 hover:bg-brand/10 dark:hover:bg-brand/20 transition-all duration-300"
            >
              Begin Lessons <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
