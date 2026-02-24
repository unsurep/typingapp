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
  title: {
    default: "TypeApp | Typing Speed Test & Lessons",
    template: "%s | TypeApp",
  },
  description:
    "Test your typing speed, take engaging lessons, track your WPM, and earn certificates with TypeApp.",
  keywords: [
    "typing test",
    "typing speed",
    "WPM",
    "learn to type",
    "touch typing",
    "typing practice",
    "typing certificate",
  ],
  authors: [{ name: "TypeApp" }],
  openGraph: {
    title: "TypeApp | Typing Speed Test & Lessons",
    description:
      "Test your typing speed, take engaging lessons, track your WPM, and earn certificates with TypeApp.",
    url: "https://typeapp.example.com",
    siteName: "TypeApp",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeApp | Typing Speed Test & Lessons",
    description:
      "Test your typing speed, take engaging lessons, track your WPM, and earn certificates with TypeApp.",
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
