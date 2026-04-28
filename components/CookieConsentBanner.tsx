"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Script from "next/script";

type StoredConsent = "accepted" | "declined" | null;

const CONSENT_STORAGE_KEY = "cookie_consent";
const LEGACY_CONSENT_STORAGE_KEY = "tv_cookie_consent";

const ADSENSE_CLIENT_ID = "ca-pub-3325996870387748";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredConsent(): StoredConsent {
  if (typeof window === "undefined") return null;
  const raw =
    window.localStorage.getItem(CONSENT_STORAGE_KEY) ??
    window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
  return raw === "accepted" || raw === "declined" ? raw : null;
}

function persistConsent(value: "accepted" | "declined") {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.localStorage.setItem(LEGACY_CONSENT_STORAGE_KEY, value);
}

function grantAllConsentViaGtag() {
  if (typeof window === "undefined") return;
  const payload = {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  };
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", payload);
  } else {
    window.dataLayer.push(["consent", "update", payload]);
  }
}

export default function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  const acceptRef = useRef<HTMLButtonElement>(null);
  const [consent, setConsent] = useState<StoredConsent>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const handleAccept = useCallback(() => {
    persistConsent("accepted");
    setConsent("accepted");
    setShowBanner(false);
    grantAllConsentViaGtag();
  }, []);

  const handleDecline = useCallback(() => {
    persistConsent("declined");
    setConsent("declined");
    setShowBanner(false);
  }, []);

  useEffect(() => {
    const normalizedConsent = readStoredConsent();
    setConsent(normalizedConsent);
    setShowBanner(normalizedConsent === null);
    setIsHydrated(true);

    if (normalizedConsent === "accepted") {
      grantAllConsentViaGtag();
    }
  }, []);

  useEffect(() => {
    if (!showBanner || !isHydrated) return;
    const id = window.setTimeout(() => {
      acceptRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [showBanner, isHydrated]);

  useEffect(() => {
    if (!showBanner) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDecline();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showBanner, handleDecline]);

  const shouldLoadAdsense = isHydrated && consent === "accepted";

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
        <section
          role="dialog"
          aria-modal={false}
          aria-labelledby="cookie-consent-heading"
          aria-describedby="cookie-consent-desc"
          className="fixed bottom-0 left-0 right-0 z-100 border-t border-border bg-zinc-900 text-zinc-100 shadow-2xl dark:bg-zinc-950"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6 lg:items-center lg:px-8">
            <div className="sr-only">
              <h2 id="cookie-consent-heading">{t("regionLabel")}</h2>
            </div>
            <p id="cookie-consent-desc" className="m-0 w-full text-sm leading-relaxed sm:min-w-0 sm:flex-1">
              {t("defaultHint")} {t("agreeContinue")}{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 text-brand hover:text-brand/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                {t("privacyPolicy")}
              </Link>
              .
            </p>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:shrink-0 sm:flex-row">
              <button
                ref={acceptRef}
                type="button"
                onClick={handleAccept}
                aria-label={t("acceptAria")}
                className="w-full rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 sm:w-auto sm:py-2"
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={handleDecline}
                aria-label={t("declineAria")}
                className="w-full rounded-md border border-zinc-600 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 sm:w-auto sm:py-2"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
