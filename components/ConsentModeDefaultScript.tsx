import Script from "next/script";

/**
 * Google Consent Mode v2 — runs before gtag.js (@next/third-parties GoogleAnalytics).
 * Defaults deny storage until CookieConsentBanner calls consent update on accept / returning visitors.
 */
export default function ConsentModeDefaultScript() {
  return (
    <Script id="google-consent-mode-default" strategy="beforeInteractive">
      {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
`}
    </Script>
  );
}
