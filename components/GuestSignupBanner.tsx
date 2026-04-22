'use client';

import { Link } from '@/i18n/navigation';

interface GuestSignupBannerProps {
  isGuest: boolean;
}

export default function GuestSignupBanner({ isGuest }: GuestSignupBannerProps) {
  if (!isGuest) return null;

  return (
    <div className="w-full mb-8 p-4 bg-brand/10 border border-brand/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start sm:items-center gap-3">
        <span className="text-2xl leading-none">⌨️</span>
        <div>
          <p className="font-semibold text-foreground text-sm sm:text-base">
            Save your progress — create a free account
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Your progress is stored only on this device. Sign up to sync across devices and unlock all features.
          </p>
        </div>
      </div>
      <Link
        href="/register"
        className="shrink-0 px-6 py-2.5 bg-brand text-background rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-sm whitespace-nowrap"
      >
        Sign Up Free
      </Link>
    </div>
  );
}
