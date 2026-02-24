"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
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
          <span className="leading-snug">You need to login before you can take tests and lessons, and earn the certificate.</span>
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
    <div className="flex flex-col min-h-screen w-full">
      {/* 1. Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Professional Typing Tests for Job Applications
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Practice, test, and earn a verifiable typing certificate.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/test"
            onClick={handleTestClick}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl"
          >
            Start 60s Test
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-black bg-white border-2 border-gray-200 rounded-full hover:border-black dark:bg-black dark:text-white dark:border-zinc-700 dark:hover:border-zinc-400 transition-all font-semibold"
          >
            Practice Free
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 dark:bg-zinc-800/50 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-zinc-800">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            30s / 60s / 120s Tests
          </div>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 dark:bg-zinc-800/50 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-zinc-800">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Real-time Accuracy
          </div>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 dark:bg-zinc-800/50 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-zinc-800">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Employer Verification
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-y border-gray-100 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            How It Works
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-gray-900 dark:text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Practice</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build your speed and accuracy with our structured lessons and practice texts.
              </p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-white dark:text-black">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Take Timed Test</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Challenge yourself with 30s, 60s, or 120s typing tests under pressure.
              </p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-gray-900 dark:text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Get Certificate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn a verifiable typing certificate to prove your skills to prospective employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Test Duration Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Choose Your Test Duration
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/test?duration=30"
            onClick={handleTestClick}
            className="px-6 py-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all shadow-sm"
          >
            30 Second Test
          </Link>
          <Link
            href="/test?duration=60"
            onClick={handleTestClick}
            className="px-6 py-3 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all shadow-sm"
          >
            1 Minute Test
          </Link>
          <Link
            href="/test?duration=120"
            onClick={handleTestClick}
            className="px-6 py-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all shadow-sm"
          >
            2 Minute Test
          </Link>
        </div>
      </section>

      {/* 4. SEO Content Section */}
      <section className="pb-20 pt-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Whether you're preparing for an interview or just looking to improve, our <strong>typing test for jobs</strong> provides the accurate assessment you need. Our most popular <strong>1 minute typing test</strong> gives you a rapid evaluation of your WPM (Words Per Minute) and accuracy. If you need proof for your resume, you can earn a <strong>typing certificate online</strong> upon passing. Stand out from the crowd with a verified <strong>typing test with certificate</strong> that employers trust.
        </p>
      </section>
    </div>
  );
}
