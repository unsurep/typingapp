"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

type CookieConsent = "accepted" | "declined" | null;

const CONSENT_STORAGE_KEY = "tv_cookie_consent";
const ADSENSE_CLIENT_ID = "ca-pub-3325996870387748";

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY) as CookieConsent;
    const normalizedConsent =
      savedConsent === "accepted" || savedConsent === "declined" ? savedConsent : null;

    setConsent(normalizedConsent);
    setShowBanner(normalizedConsent !== "accepted");
    setIsHydrated(true);
  }, []);

  const shouldLoadAdsense = isHydrated && consent === "accepted";

  const bannerMessage = useMemo(
    () =>
      consent === "declined"
        ? "You previously declined cookies. You can accept to enable ad-supported features."
        : "We use cookies to operate this site and serve relevant ads via Google AdSense.",
    [consent]
  );

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    setConsent("accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
    setConsent("declined");
    setShowBanner(false);
  };

  return (
    <>
      {shouldLoadAdsense ? (
        <Script
          id="adsense-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      ) : null}

      {showBanner ? (
        <div className="fixed bottom-0 left-0 right-0 z-9999 border-t border-border bg-zinc-900 text-zinc-100 shadow-2xl dark:bg-zinc-950">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6 lg:items-center lg:px-8">
            <p className="m-0 w-full text-sm leading-relaxed sm:min-w-0 sm:flex-1">
              <span className="mr-2">🍪</span>
              {bannerMessage} By continuing, you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2 text-brand hover:text-brand/80">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:shrink-0 sm:flex-row">
              <button
                type="button"
                onClick={handleAccept}
                className="w-full rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:w-auto sm:py-2"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="w-full rounded-md border border-zinc-600 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 sm:w-auto sm:py-2"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
