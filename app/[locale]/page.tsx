import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";
import { Suspense } from "react";
import HomepageClient from "@/components/HomepageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const basePath = locale === "en" ? "" : `/${locale}`;
  return {
    alternates: {
      canonical: `https://www.typingverified.com${basePath}`,
      languages: {
        en: "https://www.typingverified.com",
        fr: "https://www.typingverified.com/fr",
        es: "https://www.typingverified.com/es",
        de: "https://www.typingverified.com/de",
        pt: "https://www.typingverified.com/pt",
      },
    },
  };
}

export default function Home() {
  return (
    <Suspense>
      <HomepageClient />
    </Suspense>
  );
}
