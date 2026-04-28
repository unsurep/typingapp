import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ConsentModeDefaultScript from "@/components/ConsentModeDefaultScript";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  pt: "pt_PT",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const keywords = t("keywords")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL("https://www.typingverified.com"),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords,
    authors: [{ name: "Typingverified" }],
    openGraph: {
      title: t("titleDefault"),
      description: t("description"),
      url: "https://www.typingverified.com",
      siteName: "Typingverified",
      locale: OG_LOCALE[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "google-adsense-account": "ca-pub-3325996870387748",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ConsentModeDefaultScript />
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar isLoggedIn={!!user} />
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer locale={locale} />
            <Toaster
              position="bottom-right"
              richColors
              offset={{ bottom: 120, right: 16 }}
            />
            <CookieBanner />
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-1TYMJZK2S3" />
      </body>
    </html>
  );
}
