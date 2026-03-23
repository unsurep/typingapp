import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.typingverified.com"),
  title: {
    default: "Typingverified | Typing Speed Test & Lessons",
    template: "%s | Typingverified",
  },
  description:
    "Test your typing speed, take engaging lessons, track your WPM, and earn certificates with Typingverified.",
  keywords: [
    "typing test",
    "typing speed",
    "WPM",
    "learn to type",
    "touch typing",
    "typing practice",
    "typing certificate",
  ],
  authors: [{ name: "Typingverified" }],
  openGraph: {
    title: "Typingverified | Typing Speed Test & Lessons",
    description:
      "Test your typing speed, take engaging lessons, track your WPM, and earn certificates with Typingverified.",
    url: "https://www.typingverified.com",
    siteName: "Typingverified",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typingverified | Typing Speed Test & Lessons",
    description:
      "Test your typing speed, take engaging lessons, track your WPM, and earn certificates with Typingverified.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <Script
        id="gtm"
        strategy="afterInteractive"
      >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5PW9M8G');`}</Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M5PW9M8G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
