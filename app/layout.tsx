import type { Metadata } from "next";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
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
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
